import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type SessionNote = Database['public']['Tables']['session_notes']['Row'];
type SessionFeedback = Database['public']['Tables']['session_feedback']['Row'];

interface UserHistoryItem {
  user_id: string;
  user_name: string;
  user_email: string;
  total_sessions: number;
  last_session_date: string;
  bookings: (Booking & {
    notes?: SessionNote;
    feedback?: SessionFeedback;
  })[];
}

export function useUserHistory() {
  const { user } = useAuth();
  const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserHistory = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data: specialistData, error: specialistError } = await supabase
        .from('specialists')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (specialistError || !specialistData) {
        console.warn('Specialist record not found for user history', specialistError);
        setUserHistory([]);
        setError(null);
        setLoading(false);
        return;
      }

      // Fetch all bookings for this specialist
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          user:profiles!bookings_user_id_fkey (
            id,
            full_name,
            email
          ),
          company:companies!bookings_company_id_fkey (
            company_name
          ),
          notes:session_notes!session_notes_booking_id_fkey (*),
          feedback:session_feedback!session_feedback_booking_id_fkey (*)
        `)
        .eq('specialist_id', specialistData.id)
        .order('booking_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Group bookings by user
      const userMap = new Map<string, UserHistoryItem>();

      bookings.forEach((booking: any) => {
        const userId = booking.user_id;

        if (!userMap.has(userId)) {
          userMap.set(userId, {
            user_id: userId,
            user_name: booking.user?.full_name || 'Utilizador',
            user_email: booking.user?.email || '',
            total_sessions: 0,
            last_session_date: booking.booking_date,
            bookings: []
          });
        }

        const userItem = userMap.get(userId)!;
        userItem.total_sessions++;
        userItem.bookings.push(booking);

        // Update last session date if more recent
        if (new Date(booking.booking_date) > new Date(userItem.last_session_date)) {
          userItem.last_session_date = booking.booking_date;
        }
      });

      // Convert map to array and sort by last session date
      const historyArray = Array.from(userMap.values()).sort((a, b) =>
        new Date(b.last_session_date).getTime() - new Date(a.last_session_date).getTime()
      );

      setUserHistory(historyArray);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching user history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userHistory,
    loading,
    error,
    refetch: fetchUserHistory,
  };
}

