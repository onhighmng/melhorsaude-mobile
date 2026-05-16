import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { PostgrestError } from '@supabase/supabase-js';
import { logErrorSecurely } from '@/utils/errorHandling';

type Booking = Database['public']['Tables']['bookings']['Row'];
type Specialist = Database['public']['Tables']['specialists']['Row'];
type SessionFeedback = Database['public']['Tables']['session_feedback']['Row'];

export interface BookingWithDetails extends Booking {
  specialist: (Specialist & {
    profile?: {
      full_name: string;
      avatar_url: string | null;
    } | null;
    specialist_pillars?: Array<{
      pillar_code: string;
    }>;
  }) | null;
  feedback?: SessionFeedback | null;
}

export interface BookingFilter {
  userId: string;
  status?: Booking['status'][];
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export interface BookingServiceResult<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}

/**
 * Booking Service
 * Handles all booking-related operations
 */
export class BookingService {
  /**
   * Fetch upcoming bookings for a user
   */
  async getUpcomingBookings(
    userId: string,
    limit = 10
  ): Promise<BookingServiceResult<BookingWithDetails[]>> {
    try {
      const now = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
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
        `
        )
        .eq('user_id', userId)
        .gte('booking_date', now)
        .in('status', ['pending', 'confirmed', 'rescheduled'])
        .order('booking_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(limit);

      if (error) {
        return { data: null, error };
      }

      // Normalize feedback (might be array)
      const normalized = (data || []).map((booking) => ({
        ...booking,
        feedback: Array.isArray(booking.feedback) ? booking.feedback[0] : booking.feedback,
      })) as BookingWithDetails[];

      return { data: normalized, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }

  /**
   * Fetch past bookings for a user
   */
  async getPastBookings(
    userId: string,
    limit = 20
  ): Promise<BookingServiceResult<BookingWithDetails[]>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
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
        `
        )
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .order('booking_date', { ascending: false })
        .order('start_time', { ascending: false })
        .limit(limit);

      if (error) {
        return { data: null, error };
      }

      // Normalize feedback
      const normalized = (data || []).map((booking) => ({
        ...booking,
        feedback: Array.isArray(booking.feedback) ? booking.feedback[0] : booking.feedback,
      })) as BookingWithDetails[];

      return { data: normalized, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }

  /**
   * Get a single booking by ID
   */
  async getBookingById(
    bookingId: string
  ): Promise<BookingServiceResult<BookingWithDetails>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
          *,
          specialist:specialists (
            *,
            profile:profiles!specialists_user_id_fkey (
              full_name,
              avatar_url
            )
          ),
          feedback:session_feedback (*)
        `
        )
        .eq('id', bookingId)
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data: data as BookingWithDetails, error: null };
    } catch (err) {
      logErrorSecurely(err, 'BookingService.getBookingById');
      return { data: null, error: err as Error };
    }
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<BookingServiceResult<Booking>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }

  /**
   * Create a new booking
   */
  async createBooking(
    booking: Pick<
      Booking,
      | 'user_id'
      | 'specialist_id'
      | 'booking_date'
      | 'start_time'
      | 'end_time'
      | 'primary_pillar'
    >
  ): Promise<BookingServiceResult<Booking>> {
    try {
      // Check Company Status
      if (booking.user_id) {
        const { data: profileWithCompany } = await (supabase
          .from('profiles') as any)
          .select('company_id, companies!profiles_company_id_fkey(is_active)')
          .eq('id', booking.user_id)
          .single();

        if (profileWithCompany?.company_id) {
          const company = Array.isArray(profileWithCompany?.companies)
            ? profileWithCompany?.companies[0]
            : profileWithCompany?.companies;

          if (!company || company.is_active === false) {
            throw new Error('A subscrição da sua empresa está atualmente em pausa. Contacte o administrador para mais informações.');
          }
        }
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...booking,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }

  /**
   * Subscribe to booking changes for a user
   */
  subscribeToUserBookings(
    userId: string,
    callback: (payload: any) => void
  ): { unsubscribe: () => void } {
    const channel = supabase
      .channel(`bookings-user-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      },
    };
  }
}

// Export singleton instance
export const bookingService = new BookingService();
