import { useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';
import { setSentryUser } from '@/lib/sentry';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UseProfileOptions {
  onProfileLoaded?: (profile: Profile | null) => void;
  isMounted: React.MutableRefObject<boolean>;
}

/**
 * Hook for fetching and managing user profiles
 * Extracted from AuthContext to reduce complexity
 */
export function useProfile({ onProfileLoaded, isMounted }: UseProfileOptions) {
  const profileRef = useRef<Profile | null>(null);
  const ongoingProfileFetch = useRef<{ userId: string; promise: Promise<Profile | null> } | null>(null);

  const fetchProfile = useCallback(
    async (userId: string): Promise<Profile | null> => {
      // Deduplicate concurrent requests for the same user
      if (ongoingProfileFetch.current?.userId === userId) {
        return ongoingProfileFetch.current.promise;
      }

      const fetchPromise = (async () => {
        const previousProfile = profileRef.current?.id === userId ? profileRef.current : null;
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

            // Profile not found - create it
            if (!data) {
              logger.info('Profile not found, creating...');
              const { data: userData } = await supabase.auth.getUser();

              if (userData.user) {
                const { data: newProfile, error: insertError } = await supabase
                  .from('profiles')
                  .insert({
                    id: userId,
                    email: userData.user.email,
                    full_name: userData.user.user_metadata?.full_name || userData.user.email || '',
                    primary_role: userData.user.user_metadata?.role || 'user',
                  })
                  .select()
                  .single();

                if (insertError) {
                  throw insertError;
                }

                logger.info('Profile created', { profileId: newProfile.id });

                profileRef.current = newProfile;

                if (isMounted.current && onProfileLoaded) {
                  onProfileLoaded(newProfile);
                }

                return newProfile;
              }

              // Fallback to cached profile if available
              if (previousProfile) {
                logger.warn('No profile returned; using cached profile');
                return previousProfile;
              }

              if (isMounted.current && onProfileLoaded) {
                onProfileLoaded(null);
              }

              return null;
            }

            // Profile found successfully
            logger.debug('Profile loaded successfully', { userId: data.id });

            profileRef.current = data;

            if (isMounted.current && onProfileLoaded) {
              onProfileLoaded(data);
            }

            // Set Sentry user context for error tracking
            setSentryUser({
              id: data.id,
              email: data.email || undefined,
              role: data.primary_role || undefined,
              company_id: data.company_id || undefined,
            });

            return data;
          } catch (error) {
            logger.error('Error fetching profile', { error, attempt });

            // Retry with exponential backoff
            if (attempt < maxAttempts) {
              await wait(250 * attempt);
              continue;
            }

            // Use cached profile as fallback
            if (previousProfile) {
              logger.warn('Using cached profile due to repeated fetch failures');
              if (isMounted.current && onProfileLoaded) {
                onProfileLoaded(previousProfile);
              }
              return previousProfile;
            }

            if (isMounted.current && onProfileLoaded) {
              onProfileLoaded(null);
            }

            return null;
          }
        }

        return previousProfile;
      })();

      // Cleanup ongoing fetch reference when promise settles
      const cleanup = () => {
        if (ongoingProfileFetch.current?.promise === fetchPromise) {
          ongoingProfileFetch.current = null;
        }
      };
      fetchPromise.then(cleanup).catch(cleanup);

      ongoingProfileFetch.current = { userId, promise: fetchPromise };
      return fetchPromise;
    },
    [onProfileLoaded, isMounted]
  );

  const setProfileRef = useCallback((profile: Profile | null) => {
    profileRef.current = profile;
  }, []);

  return {
    fetchProfile,
    setProfileRef,
    profileRef,
  };
}
