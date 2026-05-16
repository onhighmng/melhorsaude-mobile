import { cn } from "@/lib/utils";
import Frame from '../imports/Frame2147239078';
import HeaderSection from '../imports/Frame2147239083-109-899';
import { TeamBarChart } from '../team-bar-chart';
import { TeamRadialChart } from '../team-radial-chart';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface BentoCardProps {
    title: string;
    subtitle: string;
    bgColor: string;
    image?: string;
    rotation: string;
    hoverScale: string;
    hoverRotation: string;
    className?: string;
    onClick: () => void;
    showGraph?: boolean;
    showRadialChart?: boolean;
    sessionsData?: { used: number; total: number };
    sessionsLabel: string;
}

const BentoCard = ({
    title,
    subtitle,
    bgColor,
    image,
    rotation,
    hoverScale,
    hoverRotation,
    className,
    onClick,
    showGraph = false,
    showRadialChart = false,
    sessionsData,
    sessionsLabel,
}: BentoCardProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out h-[330px] relative rounded-xl flex flex-col items-center justify-between px-5 py-6 cursor-pointer",
                bgColor,
                className
            )}
        >
            <div className="flex flex-col items-center justify-center gap-1 z-10 w-full">
                <p className="text-lg text-base-content">{subtitle}</p>
                <h3
                    className="text-3xl font-semibold text-center px-6 py-2 bg-base-content/90 text-white rounded-full"
                >
                    {title}
                </h3>
            </div>

            {showGraph ? (
                <div className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: '160px', minWidth: '200px' }}>
                    <TeamBarChart />
                </div>
            ) : showRadialChart ? (
                <div className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: '160px', minWidth: '200px' }}>
                    <TeamRadialChart />
                </div>
            ) : (
                <div className="w-full h-40 rounded-xl overflow-hidden relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    {sessionsData && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="text-white text-center">
                                <div className="text-5xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    {sessionsData.used} / {sessionsData.total}
                                </div>
                                <div className="text-sm mt-1 opacity-90">{sessionsLabel}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </button>
    );
};

export const ColorfulBentoGrid = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { company } = useCompany();
    const [sessionStats, setSessionStats] = useState({ used: 0, total: 0, available: 0 });
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            if (!company?.id) return;

            try {
                // Fetch employee count
                const { count: empCount } = await supabase
                    .from('company_employees')
                    .select('*', { count: 'exact', head: true })
                    .eq('company_id', company.id)
                    .eq('is_active', true);

                setEmployeeCount(empCount || 0);

                // Fetch session statistics
                const { data: bookings } = await supabase
                    .from('bookings')
                    .select('id, status')
                    .eq('company_id', company.id);

                const usedSessions = bookings?.filter(b => b.status === 'completed').length || 0;

                // Calculate total from company quota (assuming monthly_total_quota exists)
                const totalQuota = (company as any).monthly_total_quota || 100;

                setSessionStats({
                    used: usedSessions,
                    total: totalQuota,
                    available: totalQuota - usedSessions
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, [company, user]);

    return (
        <section className="bg-white rounded-3xl p-4 xl:p-8 my-16 max-w-6xl xl:max-w-[1200px] mx-auto xl:scale-[1.12] xl:origin-top">
            {/* Header Section */}
            <div className="relative my-12 h-[174px] mb-32">
                <HeaderSection />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:items-start md:justify-start gap-4">
                <BentoCard
                    title={t('card.team.title')}
                    subtitle={t('card.team.subtitle')}
                    bgColor="bg-[#4A90E2]/20"
                    rotation="-rotate-1"
                    hoverScale="md:hover:scale-105"
                    hoverRotation="hover:rotate-1"
                    className="md:col-span-2"
                    onClick={() => onNavigate('Relatórios e Impacto')}
                    showGraph={true}
                    sessionsLabel={t('card.sessions.label')}
                />

                <BentoCard
                    title={t('card.sessions.title')}
                    subtitle={t('card.sessions.subtitle')}
                    bgColor="bg-[#5BA3F5]/20"
                    image="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjYxMDAxOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    rotation="rotate-6"
                    hoverScale="md:hover:scale-105"
                    hoverRotation="hover:rotate-3"
                    onClick={() => onNavigate('Sessões')}
                    sessionsData={{ used: sessionStats.used, total: sessionStats.total }}
                    sessionsLabel={t('card.sessions.label')}
                />

                <BentoCard
                    title={t('card.truth.title')}
                    subtitle={t('card.truth.subtitle')}
                    bgColor="bg-[#3D7BC7]/20"
                    rotation="-rotate-3"
                    hoverScale="md:hover:scale-105"
                    hoverRotation="hover:-rotate-3"
                    onClick={() => onNavigate('Recursos')}
                    showRadialChart={true}
                    sessionsLabel={t('card.sessions.label')}
                />

                <BentoCard
                    title={t('card.profile.title')}
                    subtitle={t('card.profile.subtitle')}
                    bgColor="bg-[#6BB6FF]/20"
                    image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uaW5nfGVufDF8fHx8MTc2NjE3MzM1MXww&ixlib=rb-4.1.0&q=80&w=1080"
                    rotation="rotate-6"
                    hoverScale="md:hover:scale-105"
                    hoverRotation="hover:rotate-4"
                    onClick={() => onNavigate('Colaboradores')}
                    sessionsLabel={t('card.sessions.label')}
                />

                <div className="h-[330px] relative rounded-xl overflow-hidden">
                    <Frame />
                </div>
            </div>
        </section>
    );
};
