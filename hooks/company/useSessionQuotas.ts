import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
import { SessionQuota } from './types';

export function useSessionQuotas() {
  const { profile } = useAuth();
  const [quotas, setQuotas] = useState<SessionQuota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.company_id) {
      fetchQuotas();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchQuotas = async () => {
    if (!profile?.company_id) return;

    try {
      setLoading(true);

      // Note: session_quotas table doesn't exist, using user_personal_quotas instead
      // This fetches quotas for all employees in the company
      const { data: employees, error: empError } = await supabase
        .from('profiles')
        .select('id')
        .eq('company_id', profile.company_id);

      if (empError) throw empError;

      const employeeIds = (employees || [])
        .map(e => e.id)
        .filter((id): id is string => Boolean(id));

      if (employeeIds.length === 0) {
        setQuotas([]);
        setError(null);
        return;
      }

      const { data, error } = await supabase
        .from('user_personal_quotas')
        .select('*')
        .in('user_id', employeeIds)
        .order('user_id', { ascending: true });

      if (error) throw error;
      setQuotas(data || []);
      setError(null);
    } catch (err: unknown) {
      logger.error('Error fetching session quotas', { error: err });
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    quotas,
    loading,
    error,
    refetch: fetchQuotas,
  };
}
