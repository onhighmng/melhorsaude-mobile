import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { getPillarColor, getPillarName } from '@/lib/pillarUtils';

interface PillarDistribution {
  pillar_code: string;
  pillar_name: string;
  session_count: number;
  percentage: number;
  color: string;
}

interface UsageTrend {
  month: string;
  total_sessions: number;
  completed_sessions: number;
  cancelled_sessions: number;
}

interface EmployeeActivity {
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
  active_percentage: number;
}

export function useCompanyReports() {
  const { profile } = useAuth();
  const [pillarDistribution, setPillarDistribution] = useState<PillarDistribution[]>([]);
  const [usageTrends, setUsageTrends] = useState<UsageTrend[]>([]);
  const [employeeActivity, setEmployeeActivity] = useState<EmployeeActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.company_id) {
      fetchReportData();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchReportData = async () => {
    if (!profile?.company_id) return;

    try {
      setLoading(true);

      // Fetch pillar distribution
      await fetchPillarDistribution();

      // Fetch usage trends (last 6 months)
      await fetchUsageTrends();

      // Fetch employee activity
      await fetchEmployeeActivity();

      setError(null);
    } catch (err: any) {
      console.error('Error fetching report data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPillarDistribution = async () => {
    if (!profile?.company_id) return;

    try {
      // Query bookings by company employees grouped by pillar
      const { data: employeeRows, error: employeeError } = await supabase
        .from('company_employees')
        .select('user_id')
        .eq('company_id', profile.company_id);

      if (employeeError) throw employeeError;

      let ids = (employeeRows || [])
        .map(row => row.user_id)
        .filter((id): id is string => Boolean(id));

      if (ids.length === 0) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id')
          .eq('company_id', profile.company_id);

        if (fallbackError) throw fallbackError;
        ids = (fallbackProfiles || []).map(row => row.id);
      }

      if (ids.length === 0) {
        setPillarDistribution([]);
        return;
      }

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('primary_pillar, status, metadata')
        .in('user_id', ids);

      if (bookingsError) throw bookingsError;

      // Count by pillar
      const pillarCounts: Record<string, number> = {};
      (bookings || []).forEach((b) => {
        if (!isRelevantStatus(b.status)) return;
        const metadata = (b.metadata || {}) as Record<string, any>;
        const rawPillar =
          b.primary_pillar ||
          metadata?.diagnostic_pillar ||
          metadata?.pillar_code;
        if (rawPillar) {
          const normalized = normalizePillarCode(rawPillar);
          pillarCounts[normalized] = (pillarCounts[normalized] || 0) + 1;
        }
      });

      const total = Object.values(pillarCounts).reduce((sum, count) => sum + count, 0);

      const distribution = Object.entries(pillarCounts)
        .map(([code, count]) => {
          const displayName = getPillarName(code);
          return {
            pillar_code: code,
            pillar_name: displayName,
            session_count: count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
            color: getPillarColor(code)
          };
        })
        .sort((a, b) => b.session_count - a.session_count);

      setPillarDistribution(distribution);
    } catch (err) {
      console.error('Error fetching pillar distribution:', err);
      throw err;
    }
  };

  const fetchUsageTrends = async () => {
    if (!profile?.company_id) return;

    try {
      // Get last 6 months of data
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: employeeRows, error: employeeError } = await supabase
        .from('company_employees')
        .select('user_id')
        .eq('company_id', profile.company_id);

      if (employeeError) throw employeeError;

      let ids = (employeeRows || [])
        .map(row => row.user_id)
        .filter((id): id is string => Boolean(id));

      if (ids.length === 0) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id')
          .eq('company_id', profile.company_id);

        if (fallbackError) throw fallbackError;
        ids = (fallbackProfiles || []).map(row => row.id);
      }

      if (ids.length === 0) {
        setUsageTrends([]);
        return;
      }

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('booking_date, status')
        .in('user_id', ids)
        .gte('booking_date', sixMonthsAgo.toISOString().split('T')[0]);

      if (bookingsError) throw bookingsError;

      // Group by month
      const monthlyData: Record<
        string,
        { total: number; completed: number; cancelled: number; label: string }
      > = {};

      bookings.forEach(booking => {
        const date = new Date(booking.booking_date);
        if (Number.isNaN(date.getTime())) {
          return;
        }
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleString('pt-PT', {
          month: 'short',
          year: 'numeric',
        });

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { total: 0, completed: 0, cancelled: 0, label };
        }

        const normalizedStatus = booking.status?.toLowerCase() || '';
        const isCancelled = normalizedStatus === 'cancelled' || normalizedStatus === 'canceled';
        const countsTowardsUtilization = isRelevantStatus(booking.status);

        if (countsTowardsUtilization || isCancelled) {
          monthlyData[monthKey].total += 1;
        }
        if (normalizedStatus === 'completed') monthlyData[monthKey].completed++;
        if (isCancelled) monthlyData[monthKey].cancelled++;
      });

      const trends = Object.entries(monthlyData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([_, data]) => ({
          month: data.label,
          total_sessions: data.total,
          completed_sessions: data.completed,
          cancelled_sessions: data.cancelled,
        }));

      setUsageTrends(trends);
    } catch (err) {
      console.error('Error fetching usage trends:', err);
      throw err;
    }
  };

  const fetchEmployeeActivity = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('company_employees')
        .select('is_active')
        .eq('company_id', profile.company_id);

      if (error) throw error;

      let total = data.length;
      let active = data.filter(e => e.is_active === null || e.is_active === true).length;

      if (total === 0) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id')
          .eq('company_id', profile.company_id);

        if (fallbackError) throw fallbackError;
        total = fallbackProfiles.length;
        active = total;
      }
      const inactive = total - active;

      setEmployeeActivity({
        total_employees: total,
        active_employees: active,
        inactive_employees: inactive,
        active_percentage: total > 0 ? Math.round((active / total) * 100) : 0
      });
    } catch (err) {
      console.error('Error fetching employee activity:', err);
      throw err;
    }
  };

  return {
    pillarDistribution,
    usageTrends,
    employeeActivity,
    loading,
    error,
    refetch: fetchReportData,
  };
}

const LEGACY_PILLAR_MAP: Record<string, string> = {
  PSYCH: 'psychological',
  PHYSICAL: 'physical',
  FINANCIAL: 'financial',
  LEGAL: 'legal_social',
};

function normalizePillarCode(code: string): string {
  if (!code) return 'other';
  const trimmed = code.trim();
  if (LEGACY_PILLAR_MAP[trimmed]) {
    return LEGACY_PILLAR_MAP[trimmed];
  }
  return trimmed.toLowerCase();
}

const EXCLUDED_STATUSES = new Set(['cancelled', 'canceled', 'declined', 'no_show', 'no-show']);

function isRelevantStatus(status?: string | null) {
  if (!status) return true;
  return !EXCLUDED_STATUSES.has(status.toLowerCase());
}
