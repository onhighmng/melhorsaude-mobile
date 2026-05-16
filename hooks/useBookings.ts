
// DISABLED: import from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';
import { isUrgentCallBooking } from '@/utils/bookingMetadata';

type Booking = Database['public']['Tables']['bookings']['Row'];
type Specialist = Database['public']['Tables']['specialists']['Row'] & {
  profile: Database['public']['Tables']['profiles']['Row'];
};
type SessionFeedback = Database['public']['Tables']['session_feedback']['Row'];

type SpecialistWithDetails = Specialist & {
  profile?: {
    full_name: string;
    avatar_url: string | null;
  } | null;
  specialist_pillars?: Array<{
    pillar_code: string;
  }>;
};

export type BookingWithRelations = Booking & {
  specialist: SpecialistWithDetails | null;
  feedback?: SessionFeedback | null;
};

// Fetch function separated for clearer testing/usage
async function fetchBookingsData(userId: string) {
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Fetch upcoming
  const { data: upcomingData, error: upcomingError } = await (supabase
    .from('bookings') as any)
    .select(`
      *,
      meeting_link,
      specialist:specialists (
        *,
        profile:profiles (*)
      ),
      feedback:session_feedback (*)
    `)
    .eq('user_id', userId)
    .gte('booking_date', today)
    .in('status', ['confirmed', 'rescheduled', 'pending'])
    .order('booking_date', { ascending: true })
    .order('start_time', { ascending: true })
    .limit(10);

  if (upcomingError) throw upcomingError;

  // Fetch past
  const { data: pastData, error: pastError } = await (supabase
    .from('bookings') as any)
    .select(`
      *,
      meeting_link,
      specialist:specialists (
        *,
        profile:profiles!specialists_user_id_fkey (
          full_name,
          avatar_url
        ),
        specialist_pillars (pillar_code)
      ),
      feedback:session_feedback (*)
    `)
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .order('booking_date', { ascending: false })
    .order('start_time', { ascending: false })
    .limit(20);

  if (pastError) throw pastError;

  const normalizeFeedback = (records: BookingWithRelations[] | null) =>
    (records || []).map(record => ({
      ...record,
      feedback: Array.isArray(record.feedback) ? record.feedback[0] : record.feedback,
    }));

  const upcoming = normalizeFeedback(upcomingData as BookingWithRelations[] || [])
    .filter((booking) => {
      const meta = typeof booking.metadata === 'string'
        ? JSON.parse(booking.metadata)
        : booking.metadata;
      return meta?.request_type !== 'urgent_call';
    });

  const past = normalizeFeedback(pastData as BookingWithRelations[] || [])
    .filter((booking) => {
      const meta = typeof booking.metadata === 'string'
        ? JSON.parse(booking.metadata)
        : booking.metadata;
      return meta?.request_type !== 'urgent_call';
    });

  return { upcoming, past };
}

export function useBookings() {
  const { user, profile } = useAuth(); // Destructure profile
  const queryClient = useQueryClient();

  // ... (useQuery remains same)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => fetchBookingsData(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 2, // 2 minutes fresh
    refetchInterval: 3000, // Poll every 3 seconds to ensure updates (fallback for realtime)
  });

  // Realtime Subscription
  useEffect(() => {
    if (!user) return;

    // Create a unique channel for this hook instance to avoid collisions
    const channelId = `bookings_updates_${user.id}`;

    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          logger.info('Realtime update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          logger.info('Subscribed to bookings updates', { channelId });
        } else if (status === 'CHANNEL_ERROR') {
          logger.warn('Realtime subscription failed, falling back to polling', { channelId });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  // ... (useQuery remains same)
  // ... (createBookingMutation remains same)
  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      // ... (reuse the logic for mapping types/pillars)
      // For brevity, putting basic mapping here.
      // NOTE: In a real refactor, we should move the mapping utility out.

      const dbMeetingType = bookingData.meeting_type === 'voice' ? 'phone' : (bookingData.meeting_type || 'video');
      const pillarMapping: Record<string, string> = {
        'mental': 'PSYCH', 'psychological': 'PSYCH',
        'fisico': 'PHYSICAL', 'físico': 'PHYSICAL', 'physical': 'PHYSICAL',
        'financeira': 'FINANCIAL', 'financeiro': 'FINANCIAL', 'financial': 'FINANCIAL',
        'juridica': 'LEGAL', 'jurídica': 'LEGAL', 'legal': 'LEGAL', 'legal_social': 'LEGAL'
      };
      const dbPillar = pillarMapping[bookingData.primary_pillar.toLowerCase()] || 'PSYCH';

      const [hours, minutes] = bookingData.start_time.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0);
      const endDate = new Date(startDate.getTime() + 50 * 60000);
      const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}:00`;

      const { data, error } = await supabase.functions.invoke('create-booking', {
        body: {
          specialist_id: bookingData.specialist_id,
          booking_date: bookingData.booking_date,
          start_time: bookingData.start_time,
          end_time: endTime,
          meeting_type: dbMeetingType,
          primary_pillar: dbPillar,
          metadata: {
            ...bookingData.metadata,
            notes: bookingData.notes
          }
        }
      });

      if (error) throw error;
      return data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  const createBooking = async (data: any) => {
    try {
      // 1. Direct Fresh Check for Company Status
      if (user?.id) {
        // Use explicit foreign key relationship to avoid PGRST201 error
        const { data: profileWithCompany, error: joinError } = await (supabase
          .from('profiles') as any)
          .select('company_id, companies!profiles_company_id_fkey(is_active)')
          .eq('id', user.id)
          .single();

        if (joinError) {
          console.error('Error checking company status:', joinError);
          // Fail safe: Block if we can't verify status due to error
          return {
            success: false,
            error: 'Erro a verificar estado da empresa. Por favor contacte o suporte.'
          };
        }

        if (profileWithCompany?.company_id) {
          const company = Array.isArray(profileWithCompany.companies)
            ? profileWithCompany.companies[0]
            : profileWithCompany.companies;

          // Case 1: Company data loaded and inactive -> Block
          if (company && company.is_active === false) {
            console.warn('Booking blocked: Company is inactive');
            return {
              success: false,
              error: 'A subscrição da sua empresa está atualmente em pausa. Contacte o administrador para mais informações.'
            };
          }

          // Case 2: Company ID exists but Company data missing (likely RLS hidden due to inactivity) -> Block
          if (!company) {
            console.warn('Booking blocked: Company data unavailable (likely inactive/hidden)');
            return {
              success: false,
              error: 'A subscrição da sua empresa está atualmente em pausa. Contacte o administrador para mais informações.'
            };
          }
        }
      }

      const result = await createBookingMutation.mutateAsync(data);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('createBooking - Error:', err);
      return { success: false, error: err.message || 'Error creating booking' };
    }
  };

  // Legacy API surface compatibility
  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await (supabase.from('bookings') as any)
        .update({ status: 'cancelled', cancellation_reason: 'User requested' })
        .eq('id', bookingId).eq('user_id', user?.id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const rateSession = async (bookingId: string, rating: number, comments?: string) => {
    // ... (Keep existing logic, simplified here)
    if (!user) return { success: false, error: 'Auth required' };

    try {
      const { data: existingFeedback } = await (supabase.from('session_feedback') as any).select('id').eq('booking_id', bookingId).maybeSingle();

      if (existingFeedback?.id) {
        await (supabase.from('session_feedback') as any).update({
          overall_rating: rating,
          positive_feedback: rating >= 4 ? comments : null,
          improvement_suggestions: rating < 4 ? comments : null,
          submitted_at: new Date().toISOString()
        }).eq('id', existingFeedback.id);
      } else {
        const session = [...(data?.upcoming || []), ...(data?.past || [])].find(b => b.id === bookingId);
        const specialistId = session?.specialist_id;

        await (supabase.from('session_feedback') as any).insert({
          booking_id: bookingId,
          user_id: user.id,
          specialist_id: specialistId,
          overall_rating: rating,
          positive_feedback: rating >= 4 ? comments : null,
          improvement_suggestions: rating < 4 ? comments : null,
          submitted_at: new Date().toISOString()
        });

        // Update specialist rating cached value if we have the specialist ID
        if (specialistId) {
          // Manual calculation of average
          const { data: ratings } = await (supabase.from('session_feedback') as any)
            .select('overall_rating')
            .eq('specialist_id', specialistId);

          if (ratings) {
            const valid = ratings.map((r: any) => r.overall_rating);
            const avg = valid.length ? valid.reduce((a: number, b: number) => a + b, 0) / valid.length : 0;

            await (supabase.from('specialists') as any).update({
              average_rating: avg,
              total_reviews: valid.length,
              updated_at: new Date().toISOString()
            }).eq('id', specialistId);
          }
        }
      }

      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const rescheduleBooking = async (
    bookingId: string,
    newDate: string,
    newTime: string,
    meetingType: 'video' | 'phone',
    specialistId?: string,
    pillar?: string
  ) => {
    try {
      const dbMeetingType = meetingType === 'voice' ? 'phone' : meetingType;

      // Calculate end time (assuming 60 min session for consistency with create)
      const [hours, minutes] = newTime.split(':').map(Number);
      const startDate = new Date(); // Only used for time calc logic shorthand if needed, but strict string concat is safer
      const endHour = hours + 1;
      const endTime = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

      // Map pillar to enum if provided
      let dbPillar = 'PSYCH';
      if (pillar) {
        const pillarMapping: Record<string, string> = {
          'mental': 'PSYCH', 'psychological': 'PSYCH',
          'fisico': 'PHYSICAL', 'físico': 'PHYSICAL', 'physical': 'PHYSICAL',
          'financeira': 'FINANCIAL', 'financeiro': 'FINANCIAL', 'financial': 'FINANCIAL',
          'juridica': 'LEGAL', 'jurídica': 'LEGAL', 'legal': 'LEGAL', 'legal_social': 'LEGAL'
        };
        dbPillar = pillarMapping[pillar.toLowerCase()] || 'PSYCH';
      }

      const { data: rpcData, error: rpcError } = await supabase.rpc('update_booking_reschedule', {
        p_booking_id: bookingId,
        p_specialist_id: specialistId, // Optional, can be null/undefined to keep existing? RPC checks it.
        p_primary_pillar: dbPillar,
        p_booking_date: newDate,
        p_start_time: newTime,
        p_end_time: endTime,
        p_meeting_type: dbMeetingType,
        p_metadata: {} // Can merge existing? RPC handles partial updates well usually but let's send empty if we don't want to change metadata specifically
      });

      if (rpcError) throw rpcError;

      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      return { success: true };
    } catch (err: any) {
      logger.error('Error rescheduling booking', { error: err });
      return { success: false, error: err.message || 'Error rescheduling booking' };
    }
  };


  return {
    upcomingBookings: data?.upcoming || [],
    pastBookings: data?.past || [],
    allBookings: [...(data?.upcoming || []), ...(data?.past || [])],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    cancelBooking,
    rateSession,
    createBooking,
    rescheduleBooking,
    refetch
  };
}
