import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
import {
  CompanyAnalytics,
  canonicalizePillar,
  getPillarLabel,
  isRelevantStatus,
  formatDateForQuery,
} from './index';

export function useCompanyAnalytics() {
  const { profile } = useAuth();
  const [analytics, setAnalytics] = useState<CompanyAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.company_id) {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchAnalytics = async () => {
    if (!profile?.company_id) return;

    try {
      setLoading(true);

      const { data: companyEmployees, error: companyEmployeesError } = await supabase
        .from('company_employees')
        .select('user_id, is_active')
        .eq('company_id', profile.company_id);

      if (companyEmployeesError) throw companyEmployeesError;

      let employeeIds = (companyEmployees || [])
        .map((row) => row.user_id)
        .filter((id): id is string => Boolean(id));

      let activeEmployees = (companyEmployees || []).filter(
        (row) => row.is_active === null || row.is_active === true
      ).length;

      if (employeeIds.length === 0) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id')
          .eq('company_id', profile.company_id);

        if (fallbackError) throw fallbackError;

        employeeIds = (fallbackProfiles || []).map((row) => row.id);
        activeEmployees = employeeIds.length;
      }

      const totalEmployees = employeeIds.length;
      const inactiveEmployees = Math.max(totalEmployees - activeEmployees, 0);

      if (totalEmployees === 0) {
        setAnalytics({
          total_employees: 0,
          active_employees: 0,
          inactive_employees: 0,
          monthly_sessions: 0,
          lifetime_sessions: 0,
          sessions_by_pillar_month: [],
          sessions_by_pillar_lifetime: [],
          utilization_rate: 0,
          most_used_pillar: null,
          average_satisfaction: null,
        });
        setError(null);
        return;
      }

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const startDate = formatDateForQuery(startOfMonth);
      const endDateExclusive = formatDateForQuery(startOfNextMonth);

      const { data: monthlyBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, user_id, primary_pillar, status, booking_date, metadata')
        .in('user_id', employeeIds)
        .gte('booking_date', startDate)
        .lt('booking_date', endDateExclusive);

      if (bookingsError) throw bookingsError;

      const { data: lifetimeBookings, error: lifetimeBookingsError } = await supabase
        .from('bookings')
        .select('id, user_id, primary_pillar, status, booking_date, metadata')
        .in('user_id', employeeIds);

      if (lifetimeBookingsError) throw lifetimeBookingsError;

      const relevantMonthlyBookings = (monthlyBookings || []).filter((booking) =>
        isRelevantStatus(booking.status)
      );

      const relevantLifetimeBookings = (lifetimeBookings || []).filter((booking) =>
        isRelevantStatus(booking.status)
      );

      const buildSessionsByPillar = (bookingsList: typeof monthlyBookings) => {
        const map: Record<string, number> = {};
        bookingsList.forEach((booking) => {
          const metadata = (booking.metadata || {}) as Record<string, any>;
          const rawPillar =
            booking.primary_pillar ||
            metadata?.diagnostic_pillar ||
            metadata?.pillar_code;
          const pillar =
            canonicalizePillar(rawPillar) ||
            rawPillar ||
            'OUTRO';
          map[pillar] = (map[pillar] || 0) + 1;
        });

        const total = bookingsList.length;
        return Object.entries(map)
          .map(([pillar, count]) => ({
            pillar_code: pillar,
            session_count: count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
            label: getPillarLabel(pillar),
          }))
          .sort((a, b) => b.session_count - a.session_count);
      };

      const monthlySessionsByPillar = buildSessionsByPillar(relevantMonthlyBookings);
      const lifetimeSessionsByPillar = buildSessionsByPillar(relevantLifetimeBookings);

      const monthlySessions = relevantMonthlyBookings.length;
      const lifetimeSessions = relevantLifetimeBookings.length;

      const uniqueUsers = new Set(
        relevantLifetimeBookings
          .map((booking) => booking.user_id)
          .filter((id): id is string => Boolean(id))
      ).size;
      const utilizationRate = totalEmployees > 0 ? Math.round((uniqueUsers / totalEmployees) * 100) : 0;
      const mostUsedPillar = lifetimeSessionsByPillar[0]?.pillar_code || null;

      const { data: feedbackRows, error: feedbackError } = await supabase
        .from('session_feedback')
        .select('overall_rating')
        .in('user_id', employeeIds)
        .not('overall_rating', 'is', null);

      if (feedbackError) throw feedbackError;

      const ratings = (feedbackRows || [])
        .map((row) => row.overall_rating)
        .filter((value): value is number => typeof value === 'number');

      const averageSatisfaction =
        ratings.length > 0
          ? Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 10) / 10
          : null;

      logger.debug('[CompanyAnalytics] totals', {
        companyId: profile.company_id,
        employeeIds,
        monthlySessions,
        lifetimeSessions,
        lifetimeSessionsByPillar,
        utilizationRate,
      });

      setAnalytics({
        total_employees: totalEmployees,
        active_employees: activeEmployees,
        inactive_employees: inactiveEmployees,
        monthly_sessions: monthlySessions,
        lifetime_sessions: lifetimeSessions,
        sessions_by_pillar_month: monthlySessionsByPillar,
        sessions_by_pillar_lifetime: lifetimeSessionsByPillar,
        utilization_rate: utilizationRate,
        most_used_pillar: mostUsedPillar,
        average_satisfaction: averageSatisfaction,
      });
      setError(null);
    } catch (err: unknown) {
      logger.error('Error fetching company analytics', { error: err });
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Realtime subscription for analytics updates
  useEffect(() => {
    if (!profile?.company_id) return;

    logger.debug('Setting up realtime subscription for company analytics');

    // Subscribe to bookings changes (affects session counts)
    const bookingsChannel = supabase
      .channel(`company-analytics-bookings-${profile.company_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          logger.debug('Booking changed, refreshing analytics', { eventType: payload.eventType });
          fetchAnalytics();
        }
      )
      .subscribe();

    // Subscribe to session_feedback changes (affects average satisfaction)
    const feedbackChannel = supabase
      .channel(`company-analytics-feedback-${profile.company_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'session_feedback',
        },
        (payload) => {
          logger.debug('Feedback changed, refreshing analytics', { eventType: payload.eventType });
          fetchAnalytics();
        }
      )
      .subscribe();

    // Subscribe to company_employees changes (affects employee counts)
    const employeesChannel = supabase
      .channel(`company-analytics-employees-${profile.company_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'company_employees',
          filter: `company_id=eq.${profile.company_id}`
        },
        (payload) => {
          logger.debug('Employee changed, refreshing analytics', { eventType: payload.eventType });
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      logger.debug('Cleaning up analytics realtime subscriptions');
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(feedbackChannel);
      supabase.removeChannel(employeesChannel);
    };
  }, [profile?.company_id]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
