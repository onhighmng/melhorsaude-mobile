import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';

export interface SessionFeedback {
    id: string;
    rating: number;
    positive_feedback: string | null;
    submitted_at: string | null;
    booking: {
        booking_date: string;
        start_time: string;
        primary_pillar: string | null;
        user: {
            full_name: string | null;
            company: {
                company_name: string | null;
            } | null;
        } | null;
    } | null;
}

const getErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';

export function useSpecialistFeedback() {
    const { user } = useAuth();
    const [feedbacks, setFeedbacks] = useState<SessionFeedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasLoadedRef = useRef(false);

    const fetchFeedback = React.useCallback(async (options?: { silent?: boolean; specialistId?: string }) => {
        // If specialistId is provided (Admin mode), we don't strictly need 'user' auth context, 
        // as long as RLS allows reading. But we keep the check for safety if needed, 
        // or remove it if admin can read without being logged in as that specialist.
        // For now, let's assume 'user' is the admin or the specialist themselves.
        if (!user) return;

        const shouldShowLoading = !options?.silent && !hasLoadedRef.current;
        const targetSpecialistId = options?.specialistId;

        try {
            if (shouldShowLoading) setLoading(true);

            let specialistIdToQuery = targetSpecialistId;

            // If no ID provided, assume we are finding the specialist record for the current user
            if (!specialistIdToQuery) {
                const { data: specialistData } = await supabase
                    .from('specialists')
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                if (!specialistData) {
                    setLoading(false);
                    return;
                }
                specialistIdToQuery = specialistData.id;
            }

            if (!specialistIdToQuery) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('session_feedback')
                .select(`
                    id,
                    rating,
                    positive_feedback,
                    submitted_at,
                    booking:bookings!inner (
                        booking_date,
                        start_time,
                        primary_pillar,
                        specialist_id,
                        user:profiles!bookings_user_id_fkey (
                            full_name,
                            company:companies!profiles_company_id_fkey (
                                company_name
                            )
                        )
                    )
                `)
                .eq('booking.specialist_id', specialistIdToQuery)
                .order('submitted_at', { ascending: false });

            if (error) throw error;

            setFeedbacks(data as unknown as SessionFeedback[]);
            setError(null);
        } catch (err) {
            logger.error('Error fetching feedback', { error: err });
            setError(getErrorMessage(err));
        } finally {
            hasLoadedRef.current = true;
            if (shouldShowLoading) setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchFeedback();
        } else {
            setLoading(false);
        }
    }, [user, fetchFeedback]);

    return { feedbacks, loading, error, refetch: fetchFeedback };
}
