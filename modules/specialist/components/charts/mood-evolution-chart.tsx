import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

export function MoodEvolutionChart() {
  const { t } = useLanguage();
  
  // Emotional mood data - shows how many employees selected each emotion
  // Current week vs Previous week comparison
  const emotionalData = [
    { emotion: "😃", label: t('chart.veryHappy'), currentWeek: 145, previousWeek: 120, fullMark: 200 },
    { emotion: "😊", label: t('chart.happy'), currentWeek: 98, previousWeek: 85, fullMark: 200 },
    { emotion: "😐", label: t('chart.neutral'), currentWeek: 42, previousWeek: 65, fullMark: 200 },
    { emotion: "🙁", label: t('chart.sad'), currentWeek: 18, previousWeek: 35, fullMark: 200 },
    { emotion: "😡", label: t('chart.frustrated'), currentWeek: 12, previousWeek: 28, fullMark: 200 },
  ];

  // Calculate the overall mood score (1-5 scale)
  const calculateMoodScore = (data: typeof emotionalData) => {
    const weights = { "😃": 5, "😊": 4, "😐": 3, "🙁": 2, "😡": 1 };
    let totalWeight = 0;
    let totalCount = 0;
    
    data.forEach(item => {
      const weight = weights[item.emotion as keyof typeof weights];
      totalWeight += weight * item.currentWeek;
      totalCount += item.currentWeek;
    });
    
    return (totalWeight / totalCount).toFixed(1);
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 4.5) return '😃';
    if (score >= 3.5) return '😊';
    if (score >= 2.5) return '😐';
    if (score >= 1.5) return '🙁';
    return '😡';
  };

  const currentMoodScore = parseFloat(calculateMoodScore(emotionalData));
  const totalEmployees = emotionalData.reduce((sum, item) => sum + item.currentWeek, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-2xl mb-2">{payload[0].payload.emotion}</p>
          <p className="text-gray-900 font-semibold mb-1">{payload[0].payload.label}</p>
          <p className="text-sm text-blue-600 font-medium">
            {t('chart.current')}: {payload[0].value} {t('chart.collaborators')}
          </p>
          <p className="text-sm text-gray-500">
            {t('chart.previous')}: {payload[1]?.value || 0} {t('chart.collaborators')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6 shadow-lg max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {t('chart.teamEmotionalState')}
          </h2>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            {totalEmployees} {t('chart.collaborators')}
          </p>
        </div>
        <div className="text-center bg-gray-800/50 rounded-lg p-3 min-w-[90px]">
          <p className="text-xs text-gray-400 mb-1">{t('chart.current')}</p>
          <div className="text-3xl mb-1">{getMoodEmoji(currentMoodScore)}</div>
          <p className="text-sm font-bold text-white">{currentMoodScore}/5</p>
        </div>
      </div>
      
      <div className="w-full flex justify-center" style={{ height: '320px' }}>
        <RadarChart width={480} height={320} data={emotionalData}>
          <Tooltip content={<CustomTooltip />} />
          <PolarAngleAxis 
            dataKey="emotion" 
            tick={{ fill: '#9ca3af', fontSize: 20 }}
            tickLine={false}
          />
          <PolarGrid stroke="#374151" />
          <Radar 
            dataKey="previousWeek" 
            stroke="#6b7280" 
            fill="#6b7280" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar 
            dataKey="currentWeek" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.5}
            strokeWidth={2}
          />
        </RadarChart>
      </div>
      
      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-center gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-gray-300">{t('chart.current')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gray-500"></div>
            <span className="text-gray-300">{t('chart.previous')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}