"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "a", value: 275, fill: "#EC4899" },
  { name: "b", value: 250, fill: "#A855F7" },
  { name: "c", value: 225, fill: "#EF4444" },
  { name: "d", value: 200, fill: "#F59E0B" },
  { name: "e", value: 175, fill: "#10B981" },
  { name: "f", value: 150, fill: "#06B6D4" },
  { name: "g", value: 125, fill: "#3B82F6" },
  { name: "h", value: 100, fill: "#374151" },
];

export function TeamRadialChart() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[160px]">
      <ResponsiveContainer width={140} height={140} minWidth={140} minHeight={140}>
        <RadialBarChart 
          data={chartData} 
          innerRadius={20} 
          outerRadius={70}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar 
            cornerRadius={10} 
            dataKey="value" 
            background 
            className="drop-shadow-lg" 
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
