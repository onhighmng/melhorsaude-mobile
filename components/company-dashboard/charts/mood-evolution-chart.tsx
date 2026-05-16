import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MoodEvolutionChart({ data }: { data?: any[] }) {
  const { t } = useLanguage();

  // Transform backend data (month, avg_score) to chart format
  const chartData = data?.map((d: any) => ({
    month: d.month,
    score: parseFloat(d.avg_score)
  })) || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-blue-600 font-medium">
            {t('chart_score')}: {Math.min(payload[0].value, 5)}/5
          </p>
        </div>
      );
    }
    return null;
  };

  const currentScore = chartData.length > 0 ? chartData[chartData.length - 1].score : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="p-6 pb-0 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 icon-text-gap" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {t('truth_moodEvolution')}
          </h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t('chart_last6Months')}
          </p>
        </div>
        {chartData.length > 0 && (
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
            {Math.min(currentScore, 5).toFixed(1)} / 5
          </div>
        )}
      </div>

      <div className="w-full px-4" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[0, 5]}
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {chartData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-xl">
          <p className="text-gray-500 font-medium">{t('chart.noData')}</p>
        </div>
      )}
    </div>
  );
}
