import { ArrowLeft } from 'lucide-react';
import { MoodEvolutionChart } from './charts/mood-evolution-chart';
import { PillarUsageChart } from './charts/pillar-usage-chart';
import { ResourcesPerPillarChart } from './charts/resources-per-pillar-chart';
import { TextShimmer } from './ui/text-shimmer';
import { useLanguage } from '@/contexts/LanguageContext';

export function Recursos({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { t } = useLanguage();

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
            <button
                onClick={() => onNavigate('Dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('nav.back')}</span>
            </button>
            <h1 className="text-6xl md:text-7xl mb-3 font-bold" style={{ fontFamily: 'Pacifico, cursive' }}>
                {t('truth.title')}
            </h1>
            <p className="text-gray-600 mb-8 text-xl md:text-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t('truth.description')}
            </p>

            {/* Charts Grid */}
            <div className="space-y-6">
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Left - Animated Text */}
                    <div className="flex items-center justify-center p-8 border-l-4 border-blue-500 pl-12">
                        <TextShimmer
                            duration={3}
                            className="text-2xl md:text-3xl leading-relaxed [--base-color:theme(colors.blue.900)] [--base-gradient-color:theme(colors.blue.400)]"
                            as="p"
                            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' } as React.CSSProperties}
                        >
                            {t('truth.insight')}
                        </TextShimmer>
                    </div>

                    {/* Top Right - Mood Evolution Chart */}
                    <div>
                        <MoodEvolutionChart />
                    </div>

                    {/* Bottom Left - Pillar Usage Chart */}
                    <div>
                        <PillarUsageChart />
                    </div>

                    {/* Bottom Right - Resources Per Pillar Chart */}
                    <div>
                        <ResourcesPerPillarChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
