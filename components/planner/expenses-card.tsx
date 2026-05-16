import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { PieChart, Check } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { FinancialData } from '../App';

interface ExpensesCardProps {
  data: FinancialData;
  onUpdate: (data: FinancialData) => void;
  totalIncome: number;
}

const expenseCategories = [
  { key: 'casa', label: 'Casa', color: '#A8C5BD', emoji: '🏠' },
  { key: 'alimentacao', label: 'Alimentação', color: '#FFE5A0', emoji: '🍽️' },
  { key: 'transporte', label: 'Transporte', color: '#A3D5FF', emoji: '🚗' },
  { key: 'educacao', label: 'Educação', color: '#C5B8E8', emoji: '📚' },
  { key: 'dividas', label: 'Dívidas', color: '#FFB5B5', emoji: '💳' },
  { key: 'lazer', label: 'Lazer', color: '#FFD4B8', emoji: '🎭' },
  { key: 'saude', label: 'Saúde', color: '#B8E8D4', emoji: '❤️' },
  { key: 'outros', label: 'Outros', color: '#D4D4D4', emoji: '📦' }
];

export function ExpensesCard({ data, onUpdate, totalIncome }: ExpensesCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expenses, setExpenses] = useState(data.expenses);
  const [saved, setSaved] = useState(false);

  const handleExpenseChange = (category: string, value: string) => {
    // Handle empty input
    if (value === '') {
      setExpenses({
        ...expenses,
        [category]: 0
      });
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setExpenses({
        ...expenses,
        [category]: numValue
      });
    }
  };

  const handleSave = () => {
    onUpdate({
      ...data,
      expenses
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 800);
    setTimeout(() => {
      setIsExpanded(false);
    }, 1200);
  };

  const totalExpenses = Object.values(data.expenses).reduce((sum, val) => sum + val, 0);
  const currentTotalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const hasExpenses = totalExpenses > 0;

  // Prepare chart data
  const chartData = expenseCategories
    .map(cat => ({
      name: cat.label,
      value: data.expenses[cat.key as keyof typeof data.expenses],
      color: cat.color
    }))
    .filter(item => item.value > 0);

  return (
    <div



      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-[#E8EDE8]/50 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between active:bg-[#F8F9F5]/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFE5A0] to-[#FFD88A] rounded-2xl flex items-center justify-center">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-[#2C3E3A]">Despesas</h2>
            <p className="text-sm text-[#6B7D78]">
              {hasExpenses 
                ? `${totalExpenses.toLocaleString('pt-MZ')} MZN`
                : 'Adicionar despesas'
              }
            </p>
          </div>
        </div>
        <div


          className="text-[#A8C5BD]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Chart Preview - Only show when collapsed and has data */}
      {!isExpanded && hasExpenses && (
        <div 




          className="px-6 pb-6 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-[#F8F9F5] via-white to-[#FEFDFB] rounded-2xl p-6 shadow-lg border border-[#E8EDE8]/30">
            {/* Chart */}
            <div className="relative">
              <ResponsiveContainer width="100%" height={280}>
                <RechartsPie>
                  <defs>
                    {chartData.map((entry, index) => (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.8} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#gradient-${index})`}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        const { cx, cy } = viewBox as { cx: number; cy: number };
                        return (
                          <g>
                            <text
                              x={cx}
                              y={cy - 10}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              style={{ fontSize: '11px', fill: '#6B7D78', fontWeight: '500' }}
                            >
                              Total Despesas
                            </text>
                            <text
                              x={cx}
                              y={cy + 12}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              style={{ fontSize: '20px', fill: '#2C3E3A', fontWeight: 'bold' }}
                            >
                              {totalExpenses.toLocaleString('pt-MZ', { maximumFractionDigits: 0 })}
                            </text>
                            <text
                              x={cx}
                              y={cy + 30}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              style={{ fontSize: '12px', fill: '#6B7D78', fontWeight: '500' }}
                            >
                              MZN
                            </text>
                          </g>
                        );
                      }}
                    />
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0];
                        const percentage = ((data.value as number) / totalExpenses * 100).toFixed(1);
                        return (
                          <div className="bg-white/98 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border-2 border-[#E8EDE8]">
                            <p className="text-[#2C3E3A] font-semibold mb-1">{data.name}</p>
                            <p className="text-sm text-[#6B7D78]">
                              {(data.value as number).toLocaleString('pt-MZ')} MZN
                            </p>
                            <p className="text-xs text-[#A8C5BD] font-semibold mt-1">
                              {percentage}% do total
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            
            {/* Legend with metrics */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {chartData.map(item => {
                const percentage = ((item.value / totalExpenses) * 100).toFixed(1);
                const category = expenseCategories.find(cat => cat.label === item.name);
                return (
                  <div 
                    key={item.name}
 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border-2 border-[#E8EDE8]/40 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full shadow-md" 
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)` 
                        }} 
                      />
                      <span className="text-xs text-[#6B7D78] font-medium">{category?.emoji} {item.name}</span>
                    </div>
                    <p className="text-[#2C3E3A] font-bold mb-1">
                      {item.value.toLocaleString('pt-MZ', { maximumFractionDigits: 0 })} MZN
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E8EDE8] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#A8C5BD] font-bold">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Expandable Content */}
      {isExpanded && (
        <div




          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4 border-t border-[#E8EDE8]/30 pt-6">
            <div>
              <p className="text-[#6B7D78] leading-relaxed text-[24px]">
                Para onde o teu dinheiro vai?
              </p>
              <p className="text-[#A8C5BD] leading-relaxed text-sm mt-2">
                Agora vês onde o teu dinheiro trabalha — e onde talvez trabalhe demais.
              </p>
            </div>

            {/* Expense Inputs */}
            <div className="space-y-3">
              {expenseCategories.map((category) => (
                <div key={category.key} className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <div className="flex-1">
                    <label className="text-xs text-[#6B7D78] mb-1 block">
                      {category.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={expenses[category.key as keyof typeof expenses] || ''}
                        onChange={(e) => handleExpenseChange(category.key, e.target.value)}
                        className="w-full pl-3 pr-12 py-2 bg-[#F8F9F5] border border-[#E8EDE8] rounded-xl text-[#2C3E3A] text-sm placeholder-[#A8B9B3] focus:outline-none focus:ring-2 focus:ring-[#FFE5A0]/30 focus:border-[#FFE5A0] transition-all"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7D78]">
                        MZN
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-gradient-to-br from-[#FFE5A0]/20 to-[#FFD88A]/20 rounded-2xl p-4 border border-[#FFE5A0]/30">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7D78]">Total:</span>
                <span className="text-[#2C3E3A]">
                  {currentTotalExpenses.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MZN
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-[#FFE5A0] to-[#FFD88A] text-[#2C3E3A] rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-sm"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Guardado
                </>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}