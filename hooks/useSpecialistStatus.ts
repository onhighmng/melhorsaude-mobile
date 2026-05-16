import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
// DISABLED: import from 'sonner';

export type SpecialistStatus = 'online' | 'offline' | 'busy';

export function useSpecialistStatus() {
    const { user } = useAuth();
    const [status, setStatus] = useState<SpecialistStatus>('offline');
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('specialists')
                .select('status')
                .eq('user_id', user.id)
                .single();

            if (error) {
                // If no row found, maybe not a specialist or first time
                logger.warn('Error fetching specialist status', { error });
            } else if (data) {
                setStatus(data.status as SpecialistStatus);
            }
        } catch (err) {
            logger.error('Error fetching specialist status', { error: err });
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async () => {
        if (!user) return;
        const newStatus = status === 'online' ? 'offline' : 'online';
        // Optimistic update
        const oldStatus = status;
        setStatus(newStatus);

        try {
            const { error, count } = await supabase
                .from('specialists')
                .update({ status: newStatus })
                .eq('user_id', user.id)
                .select(); // needed to get count if using count option, or just check error

            if (error) throw error;

            // Success msg optional? Maybe just on error.
        } catch (err) {
            logger.error('Error updating specialist status', { error: err });
            // Revert
            setStatus(oldStatus);
            toast.error('Erro ao atualizar status. Tente novamente.');
        }
    };

    useEffect(() => {
        if (user) {
            fetchStatus();

            // Subscribe to realtime changes
            const channel = supabase
                .channel(`specialist-status-${user.id}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'specialists',
                        filter: `user_id=eq.${user.id}`,
                    },
                    (payload) => {
                        if (payload.new && payload.new.status) {
                            setStatus(payload.new.status as SpecialistStatus);
                        }
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [user]);

    return { status, loading, toggleStatus };
}
