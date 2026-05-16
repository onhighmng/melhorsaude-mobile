import { HorizontalBarChart } from '../ui/horizontal-bar-chart';
import { useLanguage } from '../../contexts/LanguageContext';

const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function ResourcesPerPillarChart() {
  const { t } = useLanguage();

  // Resources consumed per pillar (articles, videos, guides, etc.)
  { key: `${t('pillar_mental')} 🧠`, data: 234, color: '#3b82f6', icon: '🧠', name: t('pillar_mental') },
  { key: `${t('pillar_physical')} 💪`, data: 198, color: '#10b981', icon: '💪', name: t('pillar_physical') },
  { key: `${t('pillar_financial')} 💰`, data: 167, color: '#f59e0b', icon: '💰', name: t('pillar_financial') },
  { key: `${t('pillar_legal')} ⚖️`, data: 89, color: '#ef4444', icon: '⚖️', name: t('pillar_legal') },

  const totalResources = resourceData.reduce((sum, item) => sum + (item.data || 0), 0);

  return (
    <div>
      <div className="bg-black rounded-xl border border-gray-800 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {t('chart.weeklyActivity')}
        </h2>
        <p className="text-gray-400 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t('chart.weeklyDescription')}
        </p>

        <HorizontalBarChart
          data={resourceData}
          colors={chartColors}
          height={250}
        />
      </div>

      {/* Summary with Percentages - Separated from card */}
      <div className="mt-6 pt-6 border-t-2 border-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-bold text-black">{t('chart.sessions')}</span>
          <span className="text-2xl font-bold text-black">{totalResources}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {resourceData.map((pillar) => {
            const percentage = ((pillar.data / totalResources) * 100).toFixed(1);
            return (
              <div key={pillar.name} className="flex items-center gap-2">
                <span className="text-2xl">{pillar.icon}</span>
                <div>
                  <p className="text-base font-bold text-black">{pillar.name}</p>
                  <p className="text-sm font-semibold text-gray-700">{pillar.data} ({percentage}%)</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}