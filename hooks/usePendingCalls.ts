import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';

// We define a new type that matches the bookings table structure for urgent calls
export interface CallRequest {
    id: string;
    user_id: string;
    specialist_id: string | null;
    primary_pillar: string | null; // was pillar_code
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    meeting_type: string;
    topic: string;
    metadata: any;
    created_at: string;
    updated_at: string;
    user?: {
        full_name: string | null;
        email: string | null;
        phone: string | null;
    } | null;
    // Add compatibility field for UI that expects request_type at top level
    request_type?: string;
}

const getErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';

export function usePendingCalls() {
    const { user } = useAuth();
    const [calls, setCalls] = useState<CallRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const specialistIdRef = useRef<string | null>(null);
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (!user?.id) {
            specialistIdRef.current = null;
            hasLoadedRef.current = false;
            setCalls([]);
            setLoading(false);
        }
    }, [user?.id]);

    const fetchPendingCalls = React.useCallback(async (options?: { silent?: boolean }) => {
        if (!user) return;

        const shouldShowLoading = !options?.silent && !hasLoadedRef.current;

        try {
            if (shouldShowLoading) {
                setLoading(true);
            }

            // 1. We are looking for urgent calls in the bookings table
            // These calls have:
            // - status = 'pending' OR 'confirmed' (so we can see claimed calls)
            // - metadata->request_type = 'urgent_call'

            const { data, error } = await (supabase
                .from('bookings') as any)
                .select(`
                  *,
                  user:profiles!bookings_user_id_fkey (full_name, email, phone)
                `)
                .in('status', ['pending', 'confirmed'])
                .contains('metadata', { request_type: 'urgent_call' })
                .order('created_at', { ascending: true });

            if (error) throw error;

            logger.debug('Pending calls fetched', { count: data?.length || 0 });

            // Map data to ensure request_type exists at top level if UI needs it
            const mappedCalls = (data || []).map((booking: any) => ({
                ...booking,
                request_type: booking.metadata?.request_type || 'urgent_call'
            }));

            setCalls(mappedCalls as CallRequest[]);
            setError(null);
        } catch (err) {
            logger.error('Error fetching pending calls', { error: err });
            setError(getErrorMessage(err));
        } finally {
            hasLoadedRef.current = true;
            if (shouldShowLoading) {
                setLoading(false);
            }
        }
    }, [user]);

    const [specialistId, setSpecialistId] = useState<string | null>(null);

    // Fetch specialist ID on mount
    useEffect(() => {
        if (!user?.id) {
            setSpecialistId(null);
            return;
        }

        const fetchSpecialistId = async () => {
            try {
                const { data, error } = await (supabase
                    .from('specialists') as any)
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                if (data && !error) {
                    setSpecialistId(data.id);
                    specialistIdRef.current = data.id;
                }
            } catch (err) {
                logger.error('Error fetching specialist ID', { error: err });
            }
        };

        fetchSpecialistId();
    }, [user?.id]);

    useEffect(() => {
        if (user) {
            fetchPendingCalls();
        } else {
            setLoading(false);
            setCalls([]);
        }
    }, [user, fetchPendingCalls]);

    // Real-time subscription
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel(`pending-calls-bookings`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookings',
                },
                (payload) => {
                    // Check if it's an urgent call
                    // We check payload.new for INSERT/UPDATE
                    if ((payload.new as any)?.metadata?.request_type === 'urgent_call') {
                        fetchPendingCalls({ silent: true });
                    }
                    // We check payload.old for DELETE or if status changed away
                    else if ((payload.old as any)?.metadata?.request_type === 'urgent_call') {
                        fetchPendingCalls({ silent: true });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, fetchPendingCalls]);

    // Claim call function
    const claimCall = async (callId: string) => {
        if (!user?.id) return { success: false, error: 'User not authenticated' };

        // Use state or ref, but for safety fetch again if missing? 
        // Logic below already fetches it, let's keep it robust.

        try {
            // First, get the correct specialist_id for this user
            let targetSpecialistId = specialistId;

            if (!targetSpecialistId) {
                const { data: specialistData, error: specialistError } = await (supabase
                    .from('specialists') as any)
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                if (specialistError || !specialistData) {
                    logger.error('Specialist profile not found for user', { userId: user.id });
                    return { success: false, error: 'Perfil de especialista não encontrado.' };
                }
                targetSpecialistId = specialistData.id;
                setSpecialistId(targetSpecialistId); // Update state too
            }

            const { error } = await supabase
                .from('bookings')
                .update({
                    status: 'confirmed',
                    specialist_id: targetSpecialistId,
                    updated_at: new Date().toISOString()
                })
                .eq('id', callId)
                .eq('status', 'pending'); // Prevent race conditions - only claim if still pending

            if (error) throw error;

            fetchPendingCalls({ silent: true });
            return { success: true };
        } catch (err) {
            logger.error('Error claiming call', { callId, error: err });
            return { success: false, error: getErrorMessage(err) };
        }
    };

    // Update call status function
    const updateCallStatus = async (callId: string, status: 'confirmed' | 'completed' | 'cancelled') => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', callId);

            if (error) throw error;

            // Refetch to update UI locally (or let subscription handle it)
            fetchPendingCalls({ silent: true });

            return { success: true };
        } catch (err) {
            logger.error('Error updating call status', { callId, status, error: err });
            return { success: false, error: getErrorMessage(err) };
        }
    };

    return {
        calls,
        loading,
        error,
        specialistId,
        refetch: fetchPendingCalls,
        updateCallStatus,
        claimCall,
    };
}
