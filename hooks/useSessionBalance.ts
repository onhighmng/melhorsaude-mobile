import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SessionBalance {
    company_quota: number;
    company_used: number;
    company_available: number;
    personal_quota: number;
    personal_used: number;
    personal_available: number;
    total_remaining: number;
}

export function useSessionBalance() {
    const { user } = useAuth();
    const [balance, setBalance] = useState<SessionBalance | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = async () => {
        if (!user) {
            setBalance(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .rpc('get_user_session_balance', { p_user_id: user.id });

            if (error) throw error;

            if (data && (data as any).length > 0) {
                setBalance((data as any)[0] as SessionBalance);
            } else {
                // If no data returned, assume no quota
                setBalance({
                    company_quota: 0,
                    company_used: 0,
                    company_available: 0,
                    personal_quota: 0,
                    personal_used: 0,
                    personal_available: 0,
                    total_remaining: 0,
                });
            }
            setError(null);
        } catch (err: any) {
            console.error('Error fetching session balance:', err);
            setError(err.message);
            // On error, assume no quota for safety
            setBalance({
                company_quota: 0,
                company_used: 0,
                company_available: 0,
                personal_quota: 0,
                personal_used: 0,
                personal_available: 0,
                total_remaining: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, [user]);

    return { balance, loading, error, refetch: fetchBalance };
}
