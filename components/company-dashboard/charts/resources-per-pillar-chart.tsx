import { HorizontalBarChart } from '../ui/horizontal-bar-chart';
import { useLanguage } from '../contexts/LanguageContext';

const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function ResourcesPerPillarChart({ data }: { data?: any[] }) {
  const { t } = useLanguage();

  // Aggregate total usage per pillar from monthly history
  const aggregatedData = {
    mental: 0,
    physical: 0,
    financial: 0,
    legal: 0
  };

  if (data && Array.isArray(data)) {
    data.forEach((month: any) => {
      aggregatedData.mental += parseInt(month.mental || '0');
      aggregatedData.physical += parseInt(month.fisico || '0');
      aggregatedData.financial += parseInt(month.financeiro || '0');
      aggregatedData.legal += parseInt(month.juridico || '0');
    });
  }

  const resourceData = [
    { key: `${t('pillar_mental')} 🧠`, data: aggregatedData.mental, color: '#3b82f6', icon: '🧠', name: t('pillar_mental') },
    { key: `${t('pillar_physical')} 💪`, data: aggregatedData.physical, color: '#10b981', icon: '💪', name: t('pillar_physical') },
    { key: `${t('pillar_financial')} 💰`, data: aggregatedData.financial, color: '#f59e0b', icon: '💰', name: t('pillar_financial') },
    { key: `${t('pillar_legal')} ⚖️`, data: aggregatedData.legal, color: '#ef4444', icon: '⚖️', name: t('pillar_legal') },
  ];

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
