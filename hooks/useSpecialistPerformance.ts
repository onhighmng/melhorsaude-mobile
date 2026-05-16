import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';
import { isUrgentCallBooking } from '@/utils/bookingMetadata';
import { Booking } from './useSpecialistBookings';

export interface PerformanceMetrics {
    total_sessions_this_month: number;
    total_sessions_last_month: number;
    growth_percentage: number;
    pending_calls: number;
    urgent_calls: number;
    weekly_distribution: {
        day: string;
        count: number;
    }[];
    todays_sessions: Booking[];
}

const getErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';

// Helper duplicated securely to avoid circular deps or heavy imports
const buildSpecialistIds = (primaryId?: string | null, fallbackId?: string | null) => {
    const ids = new Set<string>();
    if (primaryId) ids.add(primaryId);
    if (fallbackId) ids.add(fallbackId);
    return Array.from(ids);
};

const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((value, index) => value === sortedB[index]);
};

export function useSpecialistPerformance() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
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
            setMetrics(null);
            setLoading(false);
            return;
        }

        if (lastUserIdRef.current !== user.id) {
            lastUserIdRef.current = user.id;
            specialistIdentifiersRef.current = [];
            specialistIdCacheRef.current = [];
            hasLoadedRef.current = false;
            setSpecialistIdentifiers([]);
        }
    }, [user?.id]);

    const fetchPerformance = React.useCallback(
        async (options?: { silent?: boolean }) => {
            if (!user) return;

            const formatDateForQuery = (date: Date) => {
                return new Date(
                    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
                )
                    .toISOString()
                    .split('T')[0];
            };

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
                        logger.error('Specialist not found for user', { userId: user.id, error: specialistError });
                    }

                    specialistIds = buildSpecialistIds(specialistData?.id, user.id);

                    if (specialistIds.length === 0) {
                        logger.warn('No specialist identifiers available for performance metrics', { userId: user.id });
                        setMetrics({
                            pending_calls: 0,
                            urgent_calls: 0,
                            total_sessions_this_month: 0,
                            total_sessions_last_month: 0,
                            growth_percentage: 0,
                            weekly_distribution: [],
                            todays_sessions: []
                        });
                        setError(null);
                        if (shouldShowLoading) {
                            setLoading(false);
                        }
                        hasLoadedRef.current = true;
                        return;
                    }

                    specialistIdCacheRef.current = specialistIds;
                }

                if (!arraysEqual(specialistIdentifiersRef.current, specialistIds)) {
                    specialistIdentifiersRef.current = specialistIds;
                    setSpecialistIdentifiers(specialistIds);
                }

                logger.debug('Fetching performance for specialist identifiers', { specialistIds });

                const now = new Date();
                const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todayPlusSeven = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

                const { data: thisMonth, error: thisMonthError } = await (supabase
                    .from('bookings') as any)
                    .select('id, metadata')
                    .in('specialist_id', specialistIds)
                    .gte('booking_date', formatDateForQuery(currentMonthStart))
                    .lte('booking_date', formatDateForQuery(currentMonthEnd));

                if (thisMonthError) throw thisMonthError;

                const { data: lastMonth, error: lastMonthError } = await (supabase
                    .from('bookings') as any)
                    .select('id, metadata')
                    .in('specialist_id', specialistIds)
                    .gte('booking_date', formatDateForQuery(lastMonthStart))
                    .lte('booking_date', formatDateForQuery(lastMonthEnd));

                if (lastMonthError) throw lastMonthError;

                const statusFilter: Database['public']['Enums']['booking_status'][] = ['pending', 'confirmed'];
                const { data: pendingCalls, error: pendingError } = await (supabase
                    .from('bookings') as any)
                    .select('id, created_at, metadata')
                    .in('specialist_id', specialistIds)
                    .in('status', statusFilter)
                    .contains('metadata', { request_type: 'urgent_call' });

                if (pendingError) throw pendingError;

                const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const urgentCalls = (pendingCalls || []).filter(
                    (call: any) => new Date(call.created_at) > oneDayAgo
                ).length;

                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                const { data: weekBookings, error: weekError } = await (supabase
                    .from('bookings') as any)
                    .select('booking_date, metadata')
                    .in('specialist_id', specialistIds)
                    .gte('booking_date', formatDateForQuery(weekStart));

                if (weekError) throw weekError;

                const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                const weeklyDistribution = dayNames.map((day, index) => {
                    const count = (weekBookings || []).filter((booking: any) => {
                        if (isUrgentCallBooking(booking)) return false;
                        const bookingDate = new Date(booking.booking_date);
                        return bookingDate.getDay() === index;
                    }).length;
                    return { day, count };
                });

                const { data: upcomingSessions, error: upcomingError } = await (supabase
                    .from('bookings') as any)
                    .select(`
            *,
            user:profiles!bookings_user_id_fkey (full_name, email, phone)
            `)
                    .in('specialist_id', specialistIds)
                    .gte('booking_date', formatDateForQuery(today))
                    .lte('booking_date', formatDateForQuery(todayPlusSeven))
                    .in('status', ['confirmed', 'pending'])
                    .order('booking_date', { ascending: true })
                    .order('start_time', { ascending: true })
                    .limit(10);

                if (upcomingError) throw upcomingError;

                const thisMonthCount = (thisMonth || []).filter((booking: any) => !isUrgentCallBooking(booking)).length;
                const lastMonthCount = (lastMonth || []).filter((booking: any) => !isUrgentCallBooking(booking)).length;
                const growthPercentage = lastMonthCount > 0
                    ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
                    : 0;

                const upcomingSessionList = ((upcomingSessions as unknown) as Booking[]) || [];
                const upcomingSessionFiltered = upcomingSessionList.filter(
                    (session) => !isUrgentCallBooking(session)
                );

                setMetrics({
                    total_sessions_this_month: thisMonthCount,
                    total_sessions_last_month: lastMonthCount,
                    growth_percentage: growthPercentage,
                    pending_calls: (pendingCalls || []).length,
                    urgent_calls: urgentCalls,
                    weekly_distribution: weeklyDistribution,
                    todays_sessions: upcomingSessionFiltered
                });

                setError(null);
            } catch (err) {
                logger.error('Error fetching performance', { error: err });
                setError(getErrorMessage(err));
            } finally {
                if (shouldShowLoading) {
                    setLoading(false);
                }
                hasLoadedRef.current = true;
            }
        },
        [user]
    );

    useEffect(() => {
        if (user) {
            fetchPerformance();
        } else {
            setLoading(false);
            setMetrics(null);
        }
    }, [user, fetchPerformance]);

    useEffect(() => {
        if (specialistIdentifiers.length === 0) return;

        const channels = specialistIdentifiers.map((id) =>
            supabase
                .channel(`specialist-performance-${id}`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'bookings',
                        filter: `specialist_id=eq.${id}`,
                    },
                    () => {
                        fetchPerformance({ silent: true });
                    }
                )
                .subscribe()
        );

        return () => {
            channels.forEach((channel) => {
                supabase.removeChannel(channel);
            });
        };
    }, [specialistIdentifiers, fetchPerformance]);

    return {
        metrics,
        loading,
        error,
        refetch: fetchPerformance,
    };
}
