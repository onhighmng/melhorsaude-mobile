import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface PulseLog {
  id: string;
  energy: number;
  stress: number;
  humor: number;
  overall_score: number;
  created_at: string;
}

export function usePulse(userId: string | undefined) {
  const [lastPulse, setLastPulse] = useState<PulseLog | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLast = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data, error } = await (supabase.from('pulse_logs') as any)
      .select('id, energy, stress, humor, overall_score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) console.warn('[usePulse] fetch error:', error.message);
    setLastPulse(data || null);
    setLoading(false);
  }, [userId]);

  const savePulse = useCallback(async (energy: number, stress: number, humor: number) => {
    if (!userId) return;
    const overall_score = Math.round((energy + humor + (6 - stress)) / 3);
    const { error } = await (supabase.from('pulse_logs') as any)
      .insert({ user_id: userId, energy, stress, humor, overall_score, notes: '' });
    if (error) { console.warn('[usePulse] save error:', error.message); return; }
    await fetchLast();
    // Fire-and-forget: analyze scores and trigger a break if needed
    supabase.functions
      .invoke('analyze-pulse-for-breaks', { body: { user_id: userId } })
      .catch((err) => console.warn('[usePulse] analyze-pulse error:', err?.message));
  }, [userId, fetchLast]);

  useEffect(() => { fetchLast(); }, [fetchLast]);

  return { lastPulse, loading, savePulse, refetch: fetchLast };
}
