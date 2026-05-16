import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const POLL_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes

export function useCompanyGate() {
  const { user, profile, loading: authLoading } = useAuth();
  const [isOnHold, setIsOnHold] = useState(false);
  const [checking, setChecking] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async (userId: string) => {
    const { data, error } = await (supabase
      .from('profiles') as any)
      .select('company_id, companies!profiles_company_id_fkey(is_active)')
      .eq('id', userId)
      .single();

    if (error || !data) return;

    const company = Array.isArray(data.companies) ? data.companies[0] : data.companies;
    setIsOnHold(!company || company.is_active === false);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const role = profile?.primary_role as string | undefined;

    if (!user || role !== 'user' || !profile?.company_id) {
      setIsOnHold(false);
      setChecking(false);
      return;
    }

    setChecking(true);
    check(user.id).finally(() => setChecking(false));

    intervalRef.current = setInterval(() => check(user.id), POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user?.id, profile?.company_id, profile?.primary_role, authLoading, check]);

  return { isOnHold, checking };
}
