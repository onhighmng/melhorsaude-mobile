import { useState, useEffect } from 'react';
import { useCompany } from '@/contexts/CompanyContext';
import { supabase } from '@/lib/supabase';

export interface SessionStats {
    used: number;
    reserved: number;
    available: number;
    total: number;
    loading: boolean;
}

export function useSessionStats() {
    const { company, employees } = useCompany();
    const [stats, setStats] = useState<SessionStats>({
        used: 0,
        reserved: 0,
        available: 0,
        total: 0,
        loading: true
    });

    useEffect(() => {
        let output = { used: 0, reserved: 0, available: 0, total: 0, loading: false };

        async function fetchSessionStats() {
            if (!company?.id) {
                setStats({ ...output, loading: false });
                return;
            }

            try {
                const seats = company.total_employees || 50;
                const perSeat = company.sessions_per_employee || 4;
                const totalContracted = seats * perSeat;

                const { data: bookings, error } = await supabase
                    .from('bookings')
                    .select('status')
                    .eq('company_id', company.id);

                if (error) {
                    console.error('Error fetching bookings:', error);
                    // Don't throw, just use defaults
                }

                const usedCount = bookings?.filter(b => ['confirmed', 'completed'].includes(b.status)).length || 0;
                const reservedCount = bookings?.filter(b => b.status === 'pending').length || 0;
                const availableCount = Math.max(0, totalContracted - usedCount - reservedCount);

                setStats({
                    used: usedCount,
                    reserved: reservedCount,
                    available: availableCount,
                    total: totalContracted,
                    loading: false
                });
            } catch (err) {
                console.error("Error in useSessionStats", err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        }

        fetchSessionStats();
    }, [company, employees.length]);

    return stats;
}
