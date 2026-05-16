import { ArrowLeft, Loader2 } from 'lucide-react';
import { TeamMoodRadarChart } from '../charts/team-mood-radar-chart';
import { PillarUsageChart } from '../charts/pillar-usage-chart';
import { ResourcesPerPillarChart } from '../charts/resources-per-pillar-chart';
import { TextShimmer } from '../ui/text-shimmer';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { useCompany } from '@/contexts/CompanyContext';
import { supabase } from '@/lib/supabase';

export function Recursos({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const { company } = useCompany();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!company?.id) return;
      try {
        const { data, error } = await supabase
          .rpc('get_company_analytics', { p_company_id: company.id });

        if (error) throw error;
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [company?.id]);

  const currentMoodScore = analytics?.mood_history?.length > 0
    ? parseFloat(analytics.mood_history[analytics.mood_history.length - 1].avg_score)
    : 0;

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

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
            <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
              <TextShimmer
                duration={3}
                className="text-2xl md:text-3xl leading-relaxed [--base-color:theme(colors.blue.900)] [--base-gradient-color:theme(colors.blue.400)]"
                as="p"
              >
                {t('truth.insight')}
              </TextShimmer>
            </div>
          </div>

          {/* Top Right - Mood Radar Chart */}
          <div>
            <TeamMoodRadarChart
              data={analytics?.mood_radar}
              totalEmployees={analytics?.active_employees || 0}
              currentScore={currentMoodScore}
            />
          </div>

          {/* Bottom Left - Pillar Usage Chart */}
          <div>
            <PillarUsageChart data={analytics?.pillar_distribution} />
          </div>

          {/* Bottom Right - Resources Per Pillar Chart */}
          <div>
            <ResourcesPerPillarChart data={analytics?.pillar_distribution} />
          </div>
        </div>
      </div>
    </div>
  );
}
