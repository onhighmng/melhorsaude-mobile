import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];

type SessionWithDetails = Booking & {
  user?: {
    full_name: string | null;
    email: string | null;
  } | null;
  company?: {
    company_name: string | null;
  } | null;
  specialist?: {
    id: string;
    profile?: {
      full_name: string | null;
    } | null;
  } | null;
};

export function useAdminSessions() {
  const [sessions, setSessions] = useState<SessionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          user:profiles!bookings_user_id_fkey (
            full_name,
            email
          ),
          company:companies!bookings_company_id_fkey (
            company_name
          ),
          specialist:specialists!bookings_specialist_id_fkey (
            id,
            profile:profiles!specialists_user_id_fkey (
              full_name
            )
          )
        `)
        .order('booking_date', { ascending: false })
        .order('start_time', { ascending: false })
        .limit(100);

      if (fetchError) throw fetchError;

      setSessions(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching sessions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', sessionId);

      if (updateError) throw updateError;

      await fetchSessions();
      return { success: true };
    } catch (err: any) {
      console.error('Error updating session status:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
    updateSessionStatus
  };
}

