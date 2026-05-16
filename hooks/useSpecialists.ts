
// DISABLED: import from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';

type Specialist = Database['public']['Tables']['specialists']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface SpecialistWithDetails extends Specialist {
  profile?: Partial<Profile>;
  session_count?: number;
  upcoming_sessions?: number;
  specialist_pillars?: { pillar_code: string | null }[];
}

async function fetchSpecialistsData() {
  logger.debug('Fetching specialists from DB');

  // 1. Fetch all specialists with profiles in one go
  const { data: specialistsData, error: specialistsError } = await (supabase
    .from('specialists') as any)
    .select(`
      *,
      profile:profiles!specialists_user_id_fkey (
        id,
        full_name,
        email,
        phone,
        avatar_url,
        metadata
      ),
      specialist_pillars (pillar_code)
    `)
    .order('created_at', { ascending: false });

  if (specialistsError) throw specialistsError;

  if (!specialistsData || specialistsData.length === 0) return [];

  const specialistIds = specialistsData.map((s: any) => s.id);

  // 2. Optimized: Fetch ALL relevant bookings for these specialists in ONE query
  // We only need status and specialist_id to count them.
  const today = new Date().toISOString().split('T')[0];

  const { data: bookingsData, error: bookingsError } = await supabase
    .from('bookings')
    .select('specialist_id, status, booking_date, created_at')
    .in('specialist_id', specialistIds)
    .in('status', ['completed', 'pending', 'confirmed']); // Only fetch relevant statuses

  if (bookingsError) throw bookingsError;

  // 3. Aggregate counts in memory (CPU is fast, DB network roundtrips are slow!)
  const statsMap = new Map<string, { completed: number; upcoming: number; last_assigned: string | null }>();

  // Initialize map
  specialistIds.forEach((id: string) => {
    statsMap.set(id, { completed: 0, upcoming: 0, last_assigned: null });
  });

  // Calculate totals
  bookingsData?.forEach((booking) => {
    const stats = statsMap.get(booking.specialist_id);
    if (!stats) return;

    // Track latest assignment time (Round Robin logic)
    if (booking.created_at) {
      if (!stats.last_assigned || new Date(booking.created_at) > new Date(stats.last_assigned)) {
        stats.last_assigned = booking.created_at;
      }
    }

    if (booking.status === 'completed') {
      stats.completed++;
    } else if (
      (booking.status === 'pending' || booking.status === 'confirmed') &&
      booking.booking_date >= today
    ) {
      stats.upcoming++;
    }
  });

  // 4. Merge stats back into specialist objects
  const specialistsWithDetails = specialistsData.map((specialist: any) => {
    const stats = statsMap.get(specialist.id) || { completed: 0, upcoming: 0, last_assigned: null };
    return {
      ...specialist,
      session_count: stats.completed,
      upcoming_sessions: stats.upcoming,
      last_assigned_at: stats.last_assigned
    } as SpecialistWithDetails;
  });

  return specialistsWithDetails;
}

export function useSpecialists(pillarCode?: string) {
  const queryClient = useQueryClient();

  const { data: allSpecialists = [], isLoading, error, refetch } = useQuery({
    queryKey: ['specialists'],
    queryFn: fetchSpecialistsData,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  // Client-side filtering logic
  const activeSpecialists = allSpecialists.filter(
    specialist => specialist.is_active !== false
  );

  const pillarAliases: Record<string, string[]> = {
    psychological: ['psychological', 'mental', 'saude_mental', 'PSYCH'],
    physical: ['physical', 'fisico', 'bem_estar_fisico', 'PHYSICAL'],
    financial: ['financial', 'financeira', 'assistencia_financeira', 'FINANCIAL'],
    legal_social: ['legal_social', 'juridica', 'assistencia_juridica', 'LEGAL', 'LEGAL_SOCIAL'],
  };

  let specialistsForUser = activeSpecialists;

  if (pillarCode) {
    const aliases = pillarAliases[pillarCode] || [pillarCode];
    specialistsForUser = activeSpecialists.filter(specialist =>
      specialist.specialist_pillars?.some((pillar: any) =>
        pillar && aliases.includes(pillar.pillar_code)
      )
    );
  }

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('specialists')
        .update({ is_active: isActive })
        .eq('id', id);
      if (error) throw error;
      return { id, isActive };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialists'] });
    }
  });

  const updateSpecialistStatus = async (specialistId: string, isActive: boolean) => {
    try {
      await updateStatusMutation.mutateAsync({ id: specialistId, isActive });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return {
    specialists: specialistsForUser,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
    updateSpecialistStatus
  };
}
