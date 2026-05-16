import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { setSentryUser, clearSentryUser } from '@/lib/sentry';
import { posthog } from '@/lib/posthog';
import { track } from '@/lib/analytics';
import { logger } from '@/utils/logger';

WebBrowser.maybeCompleteAuthSession();

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
    metadata?: Record<string, any>
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);
  const profileRef = useRef<Profile | null>(null);
  const lastSessionUserIdRef = useRef<string | null>(null);
  const ongoingProfileFetch = useRef<{ userId: string; promise: Promise<Profile | null> } | null>(null);
  const initialSessionHandledRef = useRef(false);

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId: string) => {
    if (ongoingProfileFetch.current?.userId === userId) {
      return ongoingProfileFetch.current.promise;
    }

    const fetchPromise = (async () => {
      const previousProfile = profileRef.current && profileRef.current.id === userId ? profileRef.current : null;
      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const maxAttempts = 2;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          logger.debug('Fetching profile for user', { userId, attempt });

          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (error) {
            throw error;
          }

          if (!data) {
            logger.info('Profile not found, creating...');
            const { data: userData } = await supabase.auth.getUser();

            if (userData.user) {
              const { data: newProfile, error: insertError } = await (supabase
                .from('profiles') as any)
                .insert({
                  id: userId,
                  email: userData.user.email,
                  full_name: userData.user.user_metadata?.full_name || userData.user.email || '',
                  primary_role: userData.user.user_metadata?.role || 'user',
                  phone: userData.user.user_metadata?.phone || null
                })
                .select()
                .single();

              if (insertError) {
                throw insertError;
              }

              logger.info('Profile created', { profileId: newProfile.id });
              if (isMountedRef.current) {
                setProfile(newProfile);
              }
              return newProfile;
            }

            if (previousProfile) {
              logger.warn('No profile returned; using cached profile');
              return previousProfile;
            }

            if (isMountedRef.current) {
              setProfile(null);
            }
            return null;
          }

          logger.debug('Profile loaded successfully', { userId: data.id });

          // Heal profiles created by DB trigger without full_name
          let finalData = data;
          if (!data.full_name) {
            const { data: authData } = await supabase.auth.getUser();
            const metaName = authData?.user?.user_metadata?.full_name;
            if (metaName) {
              await (supabase.from('profiles') as any)
                .update({ full_name: metaName, updated_at: new Date().toISOString() })
                .eq('id', userId);
              finalData = { ...data, full_name: metaName };
            }
          }

          if (isMountedRef.current) {
            setProfile(finalData as unknown as Profile);
          }

          // Set Sentry user context for error tracking
          setSentryUser({
            id: data.id,
            email: data.email || undefined,
            role: data.primary_role || undefined,
            company_id: data.company_id || undefined,
          });

          posthog.identify(data.id, {
            email: data.email || undefined,
            name: finalData.full_name || undefined,
            role: data.primary_role || undefined,
            company_id: data.company_id || undefined,
          });

          return data;
        } catch (error) {
          logger.error('Error fetching profile', { error });

          if (attempt < maxAttempts) {
            await wait(250 * attempt);
            continue;
          }

          if (previousProfile) {
            logger.warn('Using cached profile due to repeated fetch failures');
            if (isMountedRef.current) {
              setProfile(previousProfile);
            }
            return previousProfile;
          }

          if (isMountedRef.current) {
            setProfile(null);
          }
          return null;
        }
      }

      return previousProfile;
    })();

    const cleanup = () => {
      if (ongoingProfileFetch.current?.promise === fetchPromise) {
        ongoingProfileFetch.current = null;
      }
    };
    fetchPromise.then(cleanup).catch(cleanup);

    ongoingProfileFetch.current = { userId, promise: fetchPromise };
    return fetchPromise;
  }, []);

  const handleSessionChange = useCallback(
    async (event: AuthChangeEvent, nextSession: Session | null) => {
      logger.debug('Auth state changed', { event });

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        if (isMountedRef.current) {
          setProfile(null);
          setLoading(false);
        }
        profileRef.current = null;
        lastSessionUserIdRef.current = null;

        // Clear Sentry and PostHog user context on logout
        clearSentryUser();
        posthog.reset();

        return;
      }

      const nextUserId = nextSession.user.id;
      const currentProfile = profileRef.current;

      let shouldFetchProfile = false;
      let showSpinner = false;
      const userChanged = lastSessionUserIdRef.current !== nextUserId;
      const profileMismatch = !currentProfile || currentProfile.id !== nextUserId;

      switch (event) {
        case 'INITIAL_SESSION':
          shouldFetchProfile = profileMismatch;
          showSpinner = profileMismatch;
          break;
        case 'SIGNED_IN':
          shouldFetchProfile = userChanged || profileMismatch;
          showSpinner = userChanged || profileMismatch;
          if (userChanged) track.userSignedIn(nextUserId, nextSession.user.app_metadata?.provider || 'email');
          break;
        case 'USER_UPDATED':
        case 'TOKEN_REFRESHED':
          shouldFetchProfile = true;
          break;
        default:
          break;
      }

      lastSessionUserIdRef.current = nextUserId;

      if (showSpinner) {
        if (isMountedRef.current) {
          setLoading(true);
        }
      }

      if (shouldFetchProfile) {
        await fetchProfile(nextUserId);
      }

      if (isMountedRef.current) {
        setLoading(false);
      }
    },
    [fetchProfile]
  );

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  // Initialize auth state
  useEffect(() => {
    logger.info('AuthContext initializing...');

    isMountedRef.current = true;

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMountedRef.current || initialSessionHandledRef.current) {
        return;
      }
      initialSessionHandledRef.current = true;
      handleSessionChange('INITIAL_SESSION', initialSession);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (event === 'INITIAL_SESSION') {
        if (initialSessionHandledRef.current) {
          return;
        }
        initialSessionHandledRef.current = true;
      }
      await handleSessionChange(event, nextSession);
    });

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [handleSessionChange]);

  // IDLE TIMEOUT LOGIC - Disabled for React Native (relies on DOM events)

  // Sign in - delegates to authService but maintains local state
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      // Profile will be fetched by auth state change listener
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  // Sign up - delegates to authService but maintains local state
  const signUp = useCallback(async (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
    metadata: Record<string, any> = {}
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            ...metadata,
          },
        },
      });

      if (error) return { error };

      // Profile will be created automatically by trigger
      // and fetched by auth state change listener
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const redirectTo = Linking.createURL('login');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });

      if (error) return { error };
      if (!data?.url) return { error: { message: 'No auth URL returned' } as AuthError };

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      if (result.type !== 'success') return { error: null };

      // Parse access_token + refresh_token from the hash fragment
      const fragment = result.url.split('#')[1] ?? result.url.split('?')[1] ?? '';
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) return { error: sessionError };
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);


  // Sign out - delegates to authService but maintains local state
  // Sign out - delegates to authService but maintains local state
  // Sign out - delegates to authService but maintains local state
  const signOut = useCallback(async () => {
    // Optimistic cleanup: Clear local state immediately to unblock the UI
    logger.debug('Signing out...', { optimistic: true });

    // Clear refs
    profileRef.current = null;
    lastSessionUserIdRef.current = null;

    // Clear state
    setUser(null);
    setProfile(null);
    setSession(null);

    // Clear Sentry and PostHog user context
    track.userSignedOut();
    clearSentryUser();
    posthog.reset();

    if (isMountedRef.current) {
      setLoading(false);
    }

    try {
      // Attempt backend signout (network call)
      await supabase.auth.signOut();
    } catch (error) {
      // Log but don't block - local session is already dead to us
      logger.error('Error during Supabase signOut (ignored):', error);
    }
  }, []);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [fetchProfile, user]);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const value = React.useMemo(() => ({
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    signInWithGoogle,
  }), [user, profile, session, loading, signIn, signUp, signOut, refreshProfile, signInWithGoogle]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

