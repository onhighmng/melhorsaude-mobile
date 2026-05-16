"use client";

import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

export function PillarUsageChart({ data }: { data?: any[] }) {
  const { t, language } = useLanguage();

  // Pillar usage data from props
  const chartData = data?.map((d: any) => ({
    month: d.month,
    mental: parseInt(d.mental || '0'),
    fisico: parseInt(d.fisico || '0'),
    financeiro: parseInt(d.financeiro || '0'),
    juridico: parseInt(d.juridico || '0')
  })) || [];

  const pillarConfig = {
    mental: { label: t('pillar_mental'), color: '#3b82f6' },
    fisico: { label: t('pillar_physical'), color: '#10b981' },
    financeiro: { label: t('pillar_financial'), color: '#f59e0b' },
    juridico: { label: t('pillar_legal'), color: '#ef4444' }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-3 border border-gray-800 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-white mb-2">{payload[0].payload.month}</p>
          <div className="space-y-1">
            {payload.map((entry: any) => {
              const config = pillarConfig[entry.dataKey as keyof typeof pillarConfig];
              return (
                <div key={entry.dataKey} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }}></div>
                    <span className="text-xs text-gray-300">{config.label}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: config.color }}>
                    {entry.value} {t('chart.sessions')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate trend percentage for mental health (most used pillar)
  const calculateTrend = () => {
    if (!chartData || chartData.length === 0) return "0";
    const firstMonth = chartData[0].mental;
    const lastMonth = chartData[chartData.length - 1].mental;
    if (firstMonth === 0) return "0"; // Avoid division by zero
    const percentChange = ((lastMonth - firstMonth) / firstMonth) * 100;
    return percentChange.toFixed(1);
  };

  const trendValue = calculateTrend();
  const isPositiveTrend = parseFloat(trendValue) > 0;

  return (
    <div>
      <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {t('chart.pillarUsage')}
            <Badge
              variant="outline"
              className={`${isPositiveTrend ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} border-none`}
            >
              <TrendingUp className={`h-3 w-3 ${!isPositiveTrend ? 'rotate-180' : ''}`} />
              <span>{isPositiveTrend ? '+' : ''}{trendValue}%</span>
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            {language === 'pt' ? 'Janeiro - Dezembro 2024' : 'January - December 2024'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="w-full flex justify-center" style={{ height: '300px' }}>
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey="mental"
                type="bump"
                stroke="#3b82f6"
                dot={false}
                strokeWidth={2}
                filter="url(#line-glow)"
              />
              <Line
                dataKey="fisico"
                type="bump"
                stroke="#eab308"
                dot={false}
                strokeWidth={2}
                filter="url(#line-glow)"
              />
              <Line
                dataKey="financeiro"
                type="bump"
                stroke="#10b981"
                dot={false}
                strokeWidth={2}
                filter="url(#line-glow)"
              />
              <Line
                dataKey="juridico"
                type="bump"
                stroke="#a855f7"
                dot={false}
                strokeWidth={2}
                filter="url(#line-glow)"
              />
              <defs>
                <filter
                  id="line-glow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </LineChart>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {Object.entries(pillarConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: config.color,
                boxShadow: `0 0 8px ${config.color}50`
              }}
            ></div>
            <span className="text-sm text-gray-700">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
