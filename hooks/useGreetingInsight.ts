import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export type GreetingInsightType = 'daily_welcome' | 'insight';

export interface GreetingInsightMetadata {
  message_id?: string | null;
  hour_bucket?: string;
  placeholders?: Record<string, number>;
  context?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface GreetingInsightResponse {
  type: GreetingInsightType;
  message: string;
  category?: string | null;
  metadata?: GreetingInsightMetadata;
}

interface UseGreetingInsightResult {
  insight: GreetingInsightResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  hourKey: string;
}

const HOUR_INTERVAL_MS = 60_000;

function getHourKey(date: Date) {
  return date.toISOString().slice(0, 13);
}

export function useGreetingInsight(): UseGreetingInsightResult {
  const { user } = useAuth();
  const [insight, setInsight] = useState<GreetingInsightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hourKey, setHourKey] = useState<string>(() => getHourKey(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setHourKey((current) => {
        const next = getHourKey(new Date());
        return current === next ? current : next;
      });
    }, HOUR_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const fetchInsight = useCallback(async () => {
    if (!user) {
      setInsight(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke<GreetingInsightResponse>('get-greeting-insight');

      if (fnError) {
        throw fnError;
      }

      setInsight(data ?? null);
    } catch (err) {
      console.error('Failed to retrieve greeting insight', err);
      setError('Não foi possível carregar a recomendação do momento.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight, hourKey]);

  const refresh = useCallback(async () => {
    await fetchInsight();
  }, [fetchInsight]);

  return useMemo(() => ({ insight, loading, error, refresh, hourKey }), [insight, loading, error, refresh, hourKey]);
}
