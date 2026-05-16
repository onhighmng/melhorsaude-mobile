import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
import { extractBookingMetadata, isUrgentCallBooking } from '@/utils/bookingMetadata';

type SessionFeedback = Database['public']['Tables']['session_feedback']['Row'] & {
  user?: {
    full_name: string | null;
  } | null;
};

interface PillarStats {
  pillar_code: string;
  pillar_name: string;
  case_count: number;
  color: string;
  bgColor: string;
}

interface MonthlyTrend {
  month: string;
  value: number;
}

interface SpecialistStats {
  internal_resolution_rate: number;
  referral_rate: number;
  pillar_breakdown: PillarStats[];
  monthly_trends: MonthlyTrend[];
  recent_feedback: SessionFeedback[];
  average_rating: number;
  total_feedback_count: number;
}

export function useSpecialistStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SpecialistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data: specialistData, error: specialistError } = await supabase
        .from('specialists')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (specialistError || !specialistData) {
        console.warn('Specialist record not found for stats', specialistError);
        setStats({
          internal_resolution_rate: 0,
          referral_rate: 0,
          pillar_breakdown: [],
          monthly_trends: [],
          recent_feedback: [],
          average_rating: 0,
          total_feedback_count: 0
        });
        setError(null);
        setLoading(false);
        return;
      }

      const statusFilter = ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'] as any;

      const { data: bookings, error: bookingsError } = await (supabase
        .from('bookings') as any)
        .select('id, primary_pillar, status, booking_date, metadata')
        .eq('specialist_id', specialistData.id)
        .in('status', statusFilter);

      if (bookingsError) throw bookingsError;

      // Calculate resolution vs referral rates
      const allBookings = (bookings as any[]) ?? [];
      const allRelevantBookings = allBookings.filter((booking) => !isUrgentCallBooking(booking));

      // Filter for finalized bookings only (completed or cancelled) for the resolution rate
      const finalizedBookings = allRelevantBookings.filter(
        (booking) => booking.status === 'completed' || booking.status === 'cancelled'
      );

      const completedBookings = finalizedBookings.filter(
        (booking) => booking.status === 'completed'
      );

      const totalHandled = finalizedBookings.length;
      const internalResolutionCount = completedBookings.length;
      const internalResolutionRate = totalHandled > 0
        ? Math.round((internalResolutionCount / totalHandled) * 100)
        : 0;
      const referralRate = totalHandled > 0 ? Math.max(0, 100 - internalResolutionRate) : 0;

      // Pillar breakdown
      const pillarCounts: Record<string, number> = {};
      allRelevantBookings.forEach(b => {
        const metadata = extractBookingMetadata((b as any).metadata);
        const rawPillar =
          b.primary_pillar ||
          metadata?.primary_pillar ||
          metadata?.diagnostic_pillar ||
          metadata?.pillar_code ||
          metadata?.pillar ||
          null;

        if (rawPillar) {
          const key = typeof rawPillar === 'string' ? rawPillar.toLowerCase() : rawPillar;
          pillarCounts[key] = (pillarCounts[key] || 0) + 1;
        }
      });

      const pillarMap: Record<string, { name: string; color: string; bgColor: string }> = {
        psychological: { name: 'Saúde Mental', color: 'text-blue-500', bgColor: 'bg-blue-50' },
        psych: { name: 'Saúde Mental', color: 'text-blue-500', bgColor: 'bg-blue-50' },
        physio: { name: 'Bem-Estar Físico', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
        physical: { name: 'Bem-Estar Físico', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
        financial: { name: 'Assistência Financeira', color: 'text-green-500', bgColor: 'bg-green-50' },
        legal_social: { name: 'Assistência Jurídica', color: 'text-purple-500', bgColor: 'bg-purple-50' },
        juridica: { name: 'Assistência Jurídica', color: 'text-purple-500', bgColor: 'bg-purple-50' },
        PSYCH: { name: 'Saúde Mental', color: 'text-blue-500', bgColor: 'bg-blue-50' },
        PHYSICAL: { name: 'Bem-Estar Físico', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
        FINANCIAL: { name: 'Assistência Financeira', color: 'text-green-500', bgColor: 'bg-green-50' },
        LEGAL: { name: 'Assistência Jurídica', color: 'text-purple-500', bgColor: 'bg-purple-50' }
      };

      const pillarBreakdown = Object.entries(pillarCounts).map(([code, count]) => ({
        pillar_code: code,
        pillar_name: pillarMap[code]?.name || pillarMap[code.toUpperCase()]?.name || code,
        case_count: count,
        color: pillarMap[code]?.color || pillarMap[code.toUpperCase()]?.color || 'text-gray-500',
        bgColor: pillarMap[code]?.bgColor || pillarMap[code.toUpperCase()]?.bgColor || 'bg-gray-50'
      }));

      // Monthly trends (last 4 months)
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const now = new Date();
      const monthlyData: Record<string, number> = {};

      for (let i = 3; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = monthNames[monthDate.getMonth()];
        monthlyData[monthKey] = 0;
      }

      allRelevantBookings.forEach(booking => {
        const bookingDate = new Date(booking.booking_date);
        const monthKey = monthNames[bookingDate.getMonth()];
        if (monthlyData.hasOwnProperty(monthKey)) {
          monthlyData[monthKey]++;
        }
      });

      const monthlyTrends = Object.entries(monthlyData).map(([month, value]) => ({
        month,
        value
      }));

      // Fetch feedback
      const { data: feedback, error: feedbackError } = await (supabase
        .from('session_feedback') as any)
        .select(`
          *,
          user:profiles (
            full_name
          )
        `)
        .eq('specialist_id', specialistData.id)
        .order('submitted_at', { ascending: false })
        .limit(10);

      if (feedbackError) throw feedbackError;

      // Calculate average rating
      const feedbackItems = (feedback as any[]) ?? [];
      const ratings = feedbackItems
        .map(f => f.overall_rating)
        .filter((r): r is number => typeof r === 'number');
      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

      setStats({
        internal_resolution_rate: internalResolutionRate,
        referral_rate: referralRate,
        pillar_breakdown: pillarBreakdown,
        monthly_trends: monthlyTrends,
        recent_feedback: feedbackItems,
        average_rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        total_feedback_count: ratings.length
      });

      setError(null);
    } catch (err: any) {
      console.error('Error fetching specialist stats:', err);
      setError(err.message);
      // Fallback
      setStats({
        internal_resolution_rate: 0,
        referral_rate: 0,
        pillar_breakdown: [],
        monthly_trends: [],
        recent_feedback: [],
        average_rating: 0,
        total_feedback_count: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}

