import { useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
import { logErrorSecurely } from '@/utils/errorHandling';
// DISABLED: import from '@tanstack/react-query';

type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type UserGoal = Database['public']['Tables']['user_goals']['Row'];
type UserMilestone = Database['public']['Tables']['user_milestones']['Row'];

export interface SessionBalance {
  upcoming_sessions_count: number;
  sessions_completed: number;
}

type PersonalCheckpointId =
  | 'onboarding_completed'
  | 'spoke_with_specialist'
  | 'completed_first_session'
  | 'used_resources'
  | 'used_financial_tool'
  | 'rated_three_sessions'
  | 'completed_personal_goal';

interface PersonalCheckpointDefinition {
  id: PersonalCheckpointId;
  label: string;
  points: number;
  description?: string;
}

const PERSONAL_PROGRESS_CHECKPOINTS: PersonalCheckpointDefinition[] = [
  {
    id: 'onboarding_completed',
    label: 'Concluiu o onboarding',
    points: 10,
  },
  {
    id: 'spoke_with_specialist',
    label: 'Falou com um especialista',
    points: 15,
  },
  {
    id: 'completed_first_session',
    label: 'Fez a primeira sessão',
    points: 20,
  },
  {
    id: 'used_resources',
    label: 'Usou recursos da plataforma',
    points: 10,
  },
  {
    id: 'used_financial_tool',
    label: 'Usou ferramenta de finanças',
    points: 15,
  },
  {
    id: 'rated_three_sessions',
    label: 'Avaliou 3 sessões efetuadas',
    points: 20,
  },
  {
    id: 'completed_personal_goal',
    label: 'Atingiu 1 objetivo pessoal',
    points: 10,
  },
];

export function useUserProgress() {
  const { user, profile, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const progressPromise = (supabase
        .from('user_progress') as any)
        .select('*')
        .eq('user_id', user.id)
        .single();

      const goalsPromise = (supabase
        .from('user_goals') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const bookingsPromise = (supabase
        .from('bookings') as any)
        .select('id,status,meeting_type,completed_at,company_id,is_company_sponsored,booking_date')
        .eq('user_id', user.id)
        .order('booking_date', { ascending: false })
        .limit(50);

      const resourceViewsPromise = (supabase
        .from('content_views') as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('content_type', 'resource')
        .limit(1);

      const financialPlannerPromise = (supabase
        .from('financial_planner_data') as any)
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      const sessionFeedbackPromise = (supabase
        .from('session_feedback') as any)
        .select('id, overall_rating')
        .eq('user_id', user.id)
        .limit(3);

      const [
        { data: progressData, error: progressError },
        { data: goalsData, error: goalsError },
        { data: bookingsData, error: bookingsError },
        { data: resourceViewsData, error: resourceViewsError },
        { data: financialPlannerData, error: financialPlannerError },
        { data: sessionFeedbackData, error: sessionFeedbackError },
      ] = await Promise.all([
        progressPromise,
        goalsPromise,
        bookingsPromise,
        resourceViewsPromise,
        financialPlannerPromise,
        sessionFeedbackPromise,
      ]);

      if (progressError && progressError.code !== 'PGRST116') throw progressError;
      if (goalsError) throw goalsError;
      if (bookingsError) throw bookingsError;
      if (resourceViewsError) throw resourceViewsError;
      if (financialPlannerError) throw financialPlannerError;
      if (sessionFeedbackError) throw sessionFeedbackError;

      const allGoals = (goalsData || []) as UserGoal[];
      const completedGoalsCount = allGoals.filter(goal => goal.status === 'completed').length;

      // Calculate upcoming sessions count
      const allBookings = (bookingsData || []) as any[];
      const now = new Date().toISOString();
      const upcomingSessionsCount = allBookings.filter(booking => {
        if (!['confirmed', 'scheduled', 'pending'].includes(booking.status)) return false;
        if (booking.booking_date && booking.booking_date < now) return false;
        return true;
      }).length;

      // Auto-complete onboarding
      if (profile && !profile.onboarding_completed && allGoals.length > 0) {
        const { error: onboardingUpdateError } = await (supabase
          .from('profiles') as any)
          .update({
            onboarding_completed: true,
            onboarding_completed_at: profile.onboarding_completed_at ?? new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (!onboardingUpdateError) {
          // Trigger profile refresh in background
          refreshProfile();
        }
      }

      const hasOnboardingCompleted = Boolean(profile?.onboarding_completed);
      const hasAnySpecialistInteraction = allBookings.some(booking =>
        ['confirmed', 'completed', 'rescheduled'].includes(booking.status)
      );
      const completedSessionsCount = allBookings.filter(booking => booking.status === 'completed').length;
      const hasUsedResources = (resourceViewsData || []).length > 0;
      const hasUsedFinancialTool = (financialPlannerData || []).length > 0;
      const ratedSessionsCount = (sessionFeedbackData || []).filter(
        (feedback: any) => typeof feedback.overall_rating === 'number' && feedback.overall_rating > 0
      ).length;

      const computedMilestones: UserMilestone[] = PERSONAL_PROGRESS_CHECKPOINTS.map(
        ({ id, label, points }) => {
          let isCompleted = false;
          switch (id) {
            case 'onboarding_completed': isCompleted = hasOnboardingCompleted; break;
            case 'spoke_with_specialist': isCompleted = hasAnySpecialistInteraction; break;
            case 'completed_first_session': isCompleted = completedSessionsCount > 0; break;
            case 'used_resources': isCompleted = hasUsedResources; break;
            case 'used_financial_tool': isCompleted = hasUsedFinancialTool; break;
            case 'rated_three_sessions': isCompleted = ratedSessionsCount >= 3; break;
            case 'completed_personal_goal': isCompleted = completedGoalsCount > 0; break;
            default: isCompleted = false;
          }
          return {
            id: `personal-${id}`,
            user_id: user.id,
            milestone_label: label,
            milestone_type: 'personal_progress',
            milestone_description: null,
            points_awarded: points,
            is_completed: isCompleted,
            completed_at: null,
            created_at: null,
            metadata: null,
            badge_icon_url: null
          };
        }
      );

      const earnedPoints = computedMilestones.reduce((total, milestone) => {
        if (!milestone.is_completed) return total;
        return total + (milestone.points_awarded || 0);
      }, 0);

      // Upsert progress
      let finalProgress = progressData;
      if (progressData) {
        if ((progressData.total_points ?? 0) !== earnedPoints) {
          const { data: updated } = await (supabase.from('user_progress') as any)
            .update({ total_points: earnedPoints, updated_at: new Date().toISOString() })
            .eq('id', progressData.id)
            .select().single();
          if (updated) finalProgress = updated;
        }
      } else if (earnedPoints > 0) {
        const { data: inserted } = await (supabase.from('user_progress') as any)
          .insert({ user_id: user.id, total_points: earnedPoints, updated_at: new Date().toISOString() })
          .select().single();
        if (inserted) finalProgress = inserted;
      }

      const completedSessionsTotal = allBookings.filter(b => b.status === 'completed').length;

      const finalBalance: SessionBalance = {
        upcoming_sessions_count: upcomingSessionsCount,
        sessions_completed: completedSessionsTotal,
      };

      return {
        progress: finalProgress as UserProgress | null,
        goals: allGoals,
        milestones: computedMilestones,
        sessionBalance: finalBalance
      };
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const milestoneStats = useMemo(() => {
    const milestones = data?.milestones || [];
    if (milestones.length === 0) {
      const totalPoints = PERSONAL_PROGRESS_CHECKPOINTS.reduce((total, checkpoint) => total + checkpoint.points, 0);
      return { totalPoints, earnedPoints: 0, remainingPoints: totalPoints, completionPercentage: 0 };
    }

    const totalPoints = milestones.reduce((total, m) => total + (m.points_awarded || 0), 0);
    const earnedPoints = milestones.reduce((total, m) => m.is_completed ? total + (m.points_awarded || 0) : total, 0);
    const completionPercentage = totalPoints > 0 ? Math.min(100, Math.round((earnedPoints / totalPoints) * 100)) : 0;

    return {
      totalPoints,
      earnedPoints,
      remainingPoints: Math.max(totalPoints - earnedPoints, 0),
      completionPercentage
    };
  }, [data?.milestones]);

  const updateGoalStatusMutation = useMutation({
    mutationFn: async ({ goalId, updates }: { goalId: string, updates: Partial<UserGoal> }) => {
      if (!user) throw new Error('Utilizador não autenticado.');
      const { data, error } = await (supabase.from('user_goals') as any)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', goalId)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      return data as UserGoal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress', user?.id] });
    }
  });

  const addGoalMutation = useMutation({
    mutationFn: async (goal: Omit<UserGoal, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'current_value' | 'status'>) => {
      if (!user) throw new Error('Utilizador não autenticado.');
      const { data, error } = await (supabase.from('user_goals') as any)
        .insert({
          ...goal,
          user_id: user.id,
          status: 'active',
          current_value: 0,
          target_value: 1,
          target_unit: 'check',
        })
        .select()
        .single();
      if (error) throw error;
      return data as UserGoal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress', user?.id] });
    }
  });

  return {
    progress: data?.progress || null,
    goals: data?.goals || [],
    milestones: data?.milestones || [],
    sessionBalance: data?.sessionBalance || null,
    milestoneStats,
    loading: isLoading,
    error: error instanceof Error ? error.message : (error ? 'Unknown error' : null),
    refetch,
    updateGoalStatus: async (goalId: string, updates: Partial<UserGoal>) => {
      try {
        const goal = await updateGoalStatusMutation.mutateAsync({ goalId, updates });
        return { success: true, goal };
      } catch (err: any) {
        logErrorSecurely(err, 'useUserProgress.updateGoalStatus');
        return { success: false, error: err.message || 'Erro ao atualizar' };
      }
    },
    addGoal: async (goal: any) => {
      try {
        const newGoal = await addGoalMutation.mutateAsync(goal);
        return { success: true, goal: newGoal };
      } catch (err: any) {
        logErrorSecurely(err, 'useUserProgress.addGoal');
        return { success: false, error: err.message || 'Erro ao adicionar' };
      }
    }
  };
}

