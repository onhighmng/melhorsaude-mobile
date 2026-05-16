import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
import { DisplayInvite } from './types';

export function useInviteCodes() {
  const { user, profile } = useAuth();
  const [invites, setInvites] = useState<DisplayInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvites = useCallback(async () => {
    let companyId = profile?.company_id;

    // If profile not loaded, try to fetch it
    if (!companyId && user) {
      logger.warn('fetchInvites: Profile not loaded, fetching fresh...');
      const { data: freshProfile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      companyId = freshProfile?.company_id;
      logger.debug('fetchInvites: Fresh company_id', { companyId });
    }

    if (!companyId) {
      logger.error('fetchInvites: No company_id available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      logger.debug('Fetching invites for company', { companyId });

      const { data, error } = await supabase
        .from('company_invites')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map database columns to display format
      const mappedInvites: DisplayInvite[] = (data || []).map(invite => {
        const now = new Date();
        // company_invites uses accepted_by/accepted_at, not used_by/used_at
        const acceptedBy = invite.accepted_by ?? invite.used_by ?? null;
        const acceptedAt = invite.accepted_at ?? invite.used_at ?? null;
        const accepted = Boolean(acceptedBy || acceptedAt);
        const expired = invite.expires_at ? new Date(invite.expires_at) < now : false;

        // Determine status: if accepted, it's used; if expired, it's expired; otherwise check status field or default to pending
        let derivedStatus: string;
        if (accepted) {
          derivedStatus = 'used';
        } else if (expired) {
          derivedStatus = 'expired';
        } else {
          // Check if status field says 'used' even if accepted_by is null (data inconsistency)
          derivedStatus = invite.status === 'used' ? 'used' : invite.status || 'pending';
        }

        logger.debug('Mapping invite', {
          code: invite.invite_code,
          acceptedBy,
          acceptedAt,
          accepted,
          expired,
          statusFromDB: invite.status,
          derivedStatus
        });

        return {
          id: invite.id,
          invite_code: invite.invite_code,
          status: derivedStatus,
          used_by: acceptedBy,
          used_at: acceptedAt,
          expires_at: invite.expires_at,
          created_at: invite.created_at
        };
      });

      logger.info('Fetched invites', { count: mappedInvites.length });
      logger.debug('Mapped invites with statuses', { invites: mappedInvites.map(i => ({ code: i.invite_code, status: i.status, used_by: i.used_by })) });
      setInvites(mappedInvites);
      setError(null);
    } catch (err: unknown) {
      logger.error('Error fetching invites', { error: err });
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [profile, user]);

  useEffect(() => {
    if (profile?.company_id) {
      fetchInvites();

      // Set up real-time subscription to listen for changes
      const channel = supabase
        .channel(`company-invites-${profile.company_id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'company_invites',
            filter: `company_id=eq.${profile.company_id}`
          },
          (payload) => {
            logger.debug('Real-time update for company_invites', { payload });
            // Refetch invites when there's a change
            fetchInvites();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setLoading(false);
    }
  }, [profile?.company_id, fetchInvites]);

  const generateInviteCode = async (): Promise<string | null> => {
    logger.debug('Generate Invite Code - Debug Info', {
      userExists: !!user,
      userId: user?.id,
      profileExists: !!profile,
      companyId: profile?.company_id,
      primaryRole: profile?.primary_role
    });

    if (!user || !profile?.company_id) {
      logger.error('Cannot generate invite code: missing user or company_id', {
        userExists: !!user,
        profileExists: !!profile,
        companyId: profile?.company_id
      });

      // Try to refetch profile if user exists but profile doesn't
      if (user && !profile?.company_id) {
        logger.warn('Attempting to refetch profile...');
        const { data: freshProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        logger.debug('Fresh profile data', { freshProfile });

        if (freshProfile?.company_id) {
          logger.info('Found company_id in fresh fetch', { companyId: freshProfile.company_id });
          // Use the fresh company_id
          try {
            const { data, error } = await supabase
              .rpc('generate_company_invite', {
                p_company_id: freshProfile.company_id
              });

            if (error) throw error;
            if (!data) throw new Error('No code returned from database function');

            logger.info('Successfully generated invite code', { code: data });
            await fetchInvites();
            return data;
          } catch (err: unknown) {
            logger.error('Error generating invite code', { error: err });
            throw err;
          }
        }
      }

      return null;
    }

    try {
      logger.info('Generating invite code for company', { companyId: profile.company_id });

      // Call the database function to generate invite code
      const { data, error } = await supabase
        .rpc('generate_company_invite', {
          p_company_id: profile.company_id
        });

      if (error) {
        logger.error('Error from generate_company_invite', { error });
        throw error;
      }

      if (!data) {
        throw new Error('No code returned from database function');
      }

      logger.info('Successfully generated invite code', { code: data });

      // Refresh the list to show the new code
      await fetchInvites();

      return data;
    } catch (err: unknown) {
      logger.error('Error generating invite code', { error: err });
      throw err;
    }
  };

  return {
    invites,
    loading,
    error,
    generateInviteCode,
    refetch: fetchInvites,
  };
}
