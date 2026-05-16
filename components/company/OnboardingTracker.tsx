import { useState, useEffect } from 'react';
import { StatisticsCard5 } from './ui/statistics-card-5';
import { Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCompany } from '@/contexts/CompanyContext';

interface CodeStats {
    total: number;
    generated: number;
    used: number;
    unused: number;
}

export function OnboardingTracker() {
    const { company } = useCompany();
    const [codeStats, setCodeStats] = useState<CodeStats>({
        total: 50,
        generated: 0,
        used: 0,
        unused: 0,
    });

    useEffect(() => {
        const fetchCodeStats = async () => {
            if (!company) return;

            try {
                const { data: codes, error } = await supabase
                    .from('access_codes')
                    .select('is_used')
                    .eq('company_id', company.id as any)
                    .eq('role', 'employee');

                if (error) throw error;

                const generated = codes?.length || 0;
                const used = codes?.filter((c: any) => c.is_used).length || 0;
                const unused = generated - used;
                const total = company.monthly_total_quota || 50;

                setCodeStats({
                    total,
                    generated,
                    used,
                    unused
                });
            } catch (error) {
                console.error('Error fetching code stats:', error);
            }
        };

        fetchCodeStats();
    }, [company]);

    const usedCount = codeStats.used;
    const unusedCount = codeStats.unused;
    const notGeneratedCount = codeStats.total - codeStats.generated;

    // Currency data representing code distribution
    const statusDistribution = [
        { code: 'Usados', percent: Math.round((usedCount / codeStats.total) * 100), color: 'bg-green-500' },
        { code: 'Disponíveis', percent: Math.round((unusedCount / codeStats.total) * 100), color: 'bg-blue-500' },
        { code: 'Por Gerar', percent: Math.round((notGeneratedCount / codeStats.total) * 100), color: 'bg-gray-400' },
    ].filter(item => item.percent > 0); // Only show items with actual percentage

    const usageRate = ((usedCount / codeStats.total) * 100).toFixed(1);

    return (
        <div className="flex items-center justify-center">
            <StatisticsCard5
                title="Estado dos Códigos"
                balance={`${usedCount}/${codeStats.total}`}
                delta={parseFloat(usageRate)}
                currencies={statusDistribution}
                buttonText="Ver Códigos"
                buttonIcon={Tag}
                className="max-w-full"
            />
        </div>
    );
}
