import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { logger } from '@/utils/logger';

interface PlatformStats {
  total_companies: number;
  active_companies: number;
  total_users: number;
  total_specialists: number;
  active_specialists: number;
  total_sessions_this_month: number;
  total_sessions_last_month: number;
  platform_utilization_rate: number;
  average_satisfaction: number;
  growth_rate: number;
}

interface PlatformMetrics {
  total_companies: number;
  active_companies: number;
  total_users: number;
  total_specialists: number;
  active_specialists: number;
  sessions_this_month: number;
  completed_sessions: number;
  average_rating: number;
}

interface AdminContextType {
  platformStats: PlatformStats | null;
  loadingStats: boolean;
  error: string | null;
  fetchPlatformStats: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user, profile, loading: loadingAuth } = useAuth();
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatformStats = useCallback(async () => {
    if (!user || !profile || profile.primary_role !== 'admin') {
      setLoadingStats(false);
      return;
    }

    setLoadingStats(true);
    setError(null);

    try {
      logger.debug('AdminContext - Fetching platform stats');

      const now = new Date();

      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];

      const [{ data: metricsData, error: metricsError }, { count: sessionsLastMonth, error: sessionsLastMonthError }] = await Promise.all([
        supabase.rpc('get_platform_metrics'),
        supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed')
          .gte('booking_date', lastMonthStart)
          .lte('booking_date', lastMonthEnd),
      ]);

      logger.debug('Platform metrics response', { metricsData });
      logger.debug('Sessions last month', { sessionsLastMonth });

      if (metricsError) {
        logger.error('Metrics error', { error: metricsError });
        throw metricsError;
      }
      if (sessionsLastMonthError) {
        logger.error('Sessions error', { error: sessionsLastMonthError });
        throw sessionsLastMonthError;
      }

      const metrics = (Array.isArray(metricsData) ? metricsData[0] : metricsData) as unknown as PlatformMetrics;

      const totalCompanies = metrics?.total_companies ?? 0;
      const activeCompanies = metrics?.active_companies ?? 0;
      const totalUsers = metrics?.total_users ?? 0;
      const totalSpecialists = metrics?.total_specialists ?? 0;
      const activeSpecialists = metrics?.active_specialists ?? 0;
      const sessionsThisMonth = metrics?.sessions_this_month ?? 0;
      const completedSessions = metrics?.completed_sessions ?? sessionsThisMonth ?? 0;

      const rawAverage = metrics?.average_rating ?? 0;
      const averageRating = Number(rawAverage) || 0;

      const utilizationRate =
        totalUsers > 0 ? Math.round((completedSessions / totalUsers) * 100) : 0;

      const lastMonthSessions = sessionsLastMonth ?? 0;
      const growthRate =
        lastMonthSessions > 0
          ? Math.round(((sessionsThisMonth - lastMonthSessions) / lastMonthSessions) * 100)
          : 0;

      setPlatformStats({
        total_companies: totalCompanies,
        active_companies: activeCompanies,
        total_users: totalUsers,
        total_specialists: totalSpecialists,
        active_specialists: activeSpecialists,
        total_sessions_this_month: sessionsThisMonth,
        total_sessions_last_month: lastMonthSessions,
        platform_utilization_rate: utilizationRate,
        average_satisfaction: Number(averageRating.toFixed(1)),
        growth_rate: growthRate,
      });

      setError(null);
    } catch (err: unknown) {
      logger.error('Error fetching platform stats', { error: err });
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingStats(false);
    }
  }, [user, profile]);

  useEffect(() => {
    if (!loadingAuth) {
      fetchPlatformStats();
    }
  }, [loadingAuth, fetchPlatformStats]);

  // Realtime subscription for admin dashboard updates
  useEffect(() => {
    if (!user || !profile || profile.primary_role !== 'admin') return;

    logger.debug('Setting up realtime subscriptions for admin dashboard');

    let debounceTimer: NodeJS.Timeout;

    const debouncedFetch = () => {
      logger.debug('Admin stats update queued (debounced 5s)');
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        logger.debug('Executing debounced admin stats update');
        fetchPlatformStats();
      }, 5000);
    };

    // Generic handler for all subscriptions
    const handleChange = (payload: any) => {
      logger.debug('Realtime event received', {
        table: payload.table,
        eventType: payload.eventType
      });
      debouncedFetch();
    };

    // Subscribe to companies changes
    const companiesChannel = supabase
      .channel('admin-companies-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'companies' },
        handleChange
      )
      .subscribe();

    // Subscribe to profiles changes (affects user counts)
    const profilesChannel = supabase
      .channel('admin-profiles-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        handleChange
      )
      .subscribe();

    // Subscribe to specialists changes
    const specialistsChannel = supabase
      .channel('admin-specialists-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'specialists' },
        handleChange
      )
      .subscribe();

    // Subscribe to bookings changes (affects session counts)
    const bookingsChannel = supabase
      .channel('admin-bookings-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        handleChange
      )
      .subscribe();

    // Subscribe to session_feedback changes (affects average rating)
    const feedbackChannel = supabase
      .channel('admin-feedback-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'session_feedback' },
        handleChange
      )
      .subscribe();

    // Subscribe to company_employees changes (affects active companies count)
    const employeesChannel = supabase
      .channel('admin-employees-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'company_employees' },
        handleChange
      )
      .subscribe();

    return () => {
      logger.debug('Cleaning up admin realtime subscriptions');
      clearTimeout(debounceTimer);
      supabase.removeChannel(companiesChannel);
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(specialistsChannel);
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(feedbackChannel);
      supabase.removeChannel(employeesChannel);
    };
  }, [user, profile, fetchPlatformStats]);

  const value = {
    platformStats,
    loadingStats,
    error,
    fetchPlatformStats,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

