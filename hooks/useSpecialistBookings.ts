import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';
import { isUrgentCallBooking } from '@/utils/bookingMetadata';

export type Booking = Database['public']['Tables']['bookings']['Row'] & {
    user?: {
        full_name: string | null;
        email: string | null;
        phone: string | null;
    } | null;
    company?: {
        company_name: string | null;
    } | null;
};

export interface BookingFilters {
    status?: string[];
    startDate?: string;
    endDate?: string;
    limit?: number;
}

const getErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';



const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((value, index) => value === sortedB[index]);
};

export function useSpecialistBookings(filters?: BookingFilters) {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [specialistIdentifiers, setSpecialistIdentifiers] = useState<string[]>([]);
    const specialistIdentifiersRef = useRef<string[]>([]);
    const specialistIdCacheRef = useRef<string[]>([]);
    const hasLoadedRef = useRef(false);
    const lastUserIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!user?.id) {
            specialistIdentifiersRef.current = [];
            specialistIdCacheRef.current = [];
            hasLoadedRef.current = false;
            lastUserIdRef.current = null;
            setSpecialistIdentifiers([]);
            setBookings([]);
            setLoading(false);
            return;
        }

        if (lastUserIdRef.current !== user.id) {
            lastUserIdRef.current = user.id;
            specialistIdentifiersRef.current = [];
            specialistIdCacheRef.current = [];
            hasLoadedRef.current = false;
            setSpecialistIdentifiers([]);
            setBookings([]);
        }
    }, [user?.id]);

    const fetchBookings = React.useCallback(
        async (options?: { silent?: boolean }) => {
            if (!user) return;

            const shouldShowLoading = !options?.silent && !hasLoadedRef.current;
            if (shouldShowLoading) {
                setLoading(true);
            }

            try {
                let specialistIds = specialistIdCacheRef.current;

                if (specialistIds.length === 0) {
                    const { data: specialistData, error: specialistError } = await (supabase
                        .from('specialists') as any)
                        .select('id')
                        .eq('user_id', user.id)
                        .single();

                    if (specialistError || !specialistData) {
                        logger.warn('Specialist not found for user', { userId: user.id });
                        setError('not_specialist');
                        setLoading(false);
                        return;
                    }

                    // Only use the found specialist ID, do not fallback to user.id
                    specialistIds = [specialistData.id];

                    specialistIdCacheRef.current = specialistIds;
                }

                if (!arraysEqual(specialistIdentifiersRef.current, specialistIds)) {
                    specialistIdentifiersRef.current = specialistIds;
                    setSpecialistIdentifiers(specialistIds);
                }

                let query = (supabase
                    .from('bookings') as any) // Fix: Added "as any" to suppress type mismatch on complex query chains temporarily
                    .select(`
          *,
          user:profiles!bookings_user_id_fkey (full_name, email, phone),
          company:companies!bookings_company_id_fkey (company_name)
        `)
                    .in('specialist_id', specialistIds)
                    .order('booking_date', { ascending: true })
                    .order('start_time', { ascending: true });

                if (filters?.status && filters.status.length > 0) {
                    query = query.in(
                        'status',
                        filters.status
                    );
                }

                if (filters?.startDate) {
                    query = query.gte('booking_date', filters.startDate);
                }
                if (filters?.endDate) {
                    query = query.lte('booking_date', filters.endDate);
                }

                if (filters?.limit) {
                    query = query.limit(filters.limit);
                }

                const { data, error } = await query;

                if (error) throw error;

                logger.debug('Specialist bookings fetched', { count: data?.length || 0, specialistIds });

                const filteredBookings = (Array.isArray(data) ? data : []).filter(
                    (booking: any) => !isUrgentCallBooking(booking)
                );
                setBookings(((filteredBookings as unknown) as Booking[]) || []);
                setError(null);
            } catch (err) {
                logger.error('Error fetching bookings', { error: err });
                setError(getErrorMessage(err));
            } finally {
                if (shouldShowLoading) {
                    setLoading(false);
                }
                hasLoadedRef.current = true;
            }
        },
        [user, filters?.status, filters?.startDate, filters?.endDate, filters?.limit]
    );

    useEffect(() => {
        if (user) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [user, fetchBookings]);

    useEffect(() => {
        if (specialistIdentifiers.length === 0) return;

        const channels = specialistIdentifiers.map((id) =>
            supabase
                .channel(`specialist-bookings-${id}`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'bookings',
                        filter: `specialist_id=eq.${id}`,
                    },
                    () => {
                        fetchBookings({ silent: true });
                    }
                )
                .subscribe()
        );

        return () => {
            channels.forEach((channel) => {
                supabase.removeChannel(channel);
            });
        };
    }, [specialistIdentifiers, fetchBookings]);

    const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
        try {
            logger.debug('updateBooking called', { bookingId, updates });

            if ('meeting_link' in updates) {
                // @ts-ignore
                updates.meeting_link = updates.meeting_link?.trim() || null;
            }

            const { data, error } = await (supabase
                .from('bookings') as any)
                .update(updates)
                .eq('id', bookingId)
                .select('meeting_link')
                .single();

            if (error) {
                logger.error('Supabase update error', { error });
                throw error;
            }

            logger.info('Booking updated successfully', { data });

            // Refresh bookings
            await fetchBookings({ silent: true });
            return { success: true, error: null };
        } catch (err) {
            logger.error('Error updating booking', { error: err });
            return { success: false, error: getErrorMessage(err) };
        }
    };

    return {
        bookings,
        loading,
        error,
        refetch: fetchBookings,
        updateBooking,
    };
}
