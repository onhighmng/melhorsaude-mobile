import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  meeting_type: string;
  primary_pillar: string | null;
  meeting_link: string | null;
  metadata: any;
  specialist: {
    id: string;
    profile: { full_name: string | null; avatar_url: string | null } | null;
  } | null;
}

export function useBookings() {
  const { user } = useAuth();
  const [upcoming, setUpcoming] = useState<Booking[]>([]);
  const [past, setPast] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }

    const today = new Date().toISOString().split('T')[0];

    const [upcomingRes, pastRes] = await Promise.all([
      (supabase.from('bookings') as any)
        .select(`id, booking_date, start_time, end_time, status, meeting_type, primary_pillar, meeting_link, metadata, specialist:specialists(id, profile:profiles(full_name, avatar_url))`)
        .eq('user_id', user.id)
        .gte('booking_date', today)
        .in('status', ['confirmed', 'pending', 'rescheduled'])
        .not('metadata->>request_type', 'eq', 'urgent_call')
        .order('booking_date', { ascending: true })
        .limit(10),
      (supabase.from('bookings') as any)
        .select(`id, booking_date, start_time, end_time, status, meeting_type, primary_pillar, meeting_link, metadata, specialist:specialists(id, profile:profiles(full_name, avatar_url))`)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .not('metadata->>request_type', 'eq', 'urgent_call')
        .order('booking_date', { ascending: false })
        .limit(5),
    ]);

    setUpcoming((upcomingRes.data || []) as Booking[]);
    setPast((pastRes.data || []) as Booking[]);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // Realtime subscription — auto-refetch when any booking for this user changes
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`bookings:${user.id}`)
      .on(
        'postgres_changes' as any,
        { event: '*', schema: 'public', table: 'bookings', filter: `user_id=eq.${user.id}` },
        () => fetchBookings()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, fetchBookings]);

  const requestUrgentCall = useCallback(async () => {
    if (!user?.id) return { success: false, error: 'Not authenticated' };
    const now = new Date();
    const { data, error } = await supabase.functions.invoke('create-booking', {
      body: {
        specialist_id: null,
        booking_date: now.toISOString().split('T')[0],
        start_time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        end_time: `${String(now.getHours()).padStart(2, '0')}:${String((now.getMinutes() + 50) % 60).padStart(2, '0')}`,
        meeting_type: 'phone',
        primary_pillar: 'PSYCH',
        metadata: { request_type: 'urgent_call', notes: 'Pedido de suporte imediato via app móvel' },
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  }, [user?.id]);

  const pillarLabel: Record<string, string> = {
    PSYCH: 'Mental', PHYSICAL: 'Físico', FINANCIAL: 'Financeiro', LEGAL: 'Jurídico',
  };

  return { upcoming, past, loading, refetch: fetchBookings, requestUrgentCall, pillarLabel };
}
