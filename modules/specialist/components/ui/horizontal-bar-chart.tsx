'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Data Definitions and Validation
interface ChartCategoryData {
  key: string;
  data: number | null; // Allow null for raw data before validation
  // Optional color
  color?: string;
}

interface HorizontalBarChartProps {
  data: ChartCategoryData[];
  colors?: string[];
  height?: number;
  className?: string;
}

const defaultColors = ['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-slate-800 p-3 rounded-lg shadow-xl z-50">
        <p className="text-white font-medium text-sm mb-1">{label}</p>
        <p className="text-white text-sm">
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function HorizontalBarChart({
  data,
  colors = defaultColors,
  height = 250,
  className = ''
}: HorizontalBarChartProps): JSX.Element {
  // Validate and prepare chart data
  const validatedCategoryData = data.map((item, index) => ({
    name: item.key, // Map key to name for Recharts
    value: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
    fill: (colors && colors[index % colors.length]) || defaultColors[index % defaultColors.length]
  }));

  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={validatedCategoryData}
          margin={{
            top: 5,
            right: 30,
            left: 50, // Increased for labels
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: '#ffffff', fontSize: 12 }}
            width={100}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {validatedCategoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
