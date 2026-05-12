import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const redirectUri = makeRedirectUri({ scheme: 'melhorsaude', path: 'auth/callback' });
      console.log('[Google Auth] redirectUri:', redirectUri);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      console.log('[Google Auth] signInWithOAuth result:', { url: data?.url, error });

      if (error) return { error };
      if (!data?.url) return { error: new Error('Supabase did not return an OAuth URL. Check that the Google provider is enabled in the Supabase dashboard.') as AuthError };

      console.log('[Google Auth] Opening browser with URL:', data.url);
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
      console.log('[Google Auth] Browser result:', result);

      if (result.type === 'success') {
        console.log('[Google Auth] Exchanging code for session, URL:', result.url);
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(result.url);
        if (exchangeError) {
          console.log('[Google Auth] exchangeCodeForSession error:', exchangeError);
          return { error: exchangeError };
        }
        console.log('[Google Auth] Success!');
      } else {
        console.log('[Google Auth] Browser closed without success, type:', result.type);
      }

      return { error: null };
    } catch (err) {
      console.log('[Google Auth] Caught exception:', err);
      return { error: err as AuthError };
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
