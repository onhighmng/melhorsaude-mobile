import { useState, useEffect } from 'react';
// DISABLED: import from 'motion/react';
import { History, TrendingUp, TrendingDown, Share2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MonthData {
  month: string;
  year: number;
  income: number;
  expenses: {
    casa: number;
    alimentacao: number;
    transporte: number;
    educacao: number;
    dividas: number;
    lazer: number;
    saude: number;
    outros: number;
  };
}

const expenseCategories = [
  { key: 'casa', color: '#A8C5BD' },
  { key: 'alimentacao', color: '#FFE5A0' },
  { key: 'transporte', color: '#A3D5FF' },
  { key: 'educacao', color: '#C5B8E8' },
  { key: 'dividas', color: '#FFB5B5' },
  { key: 'lazer', color: '#FFD4B8' },
  { key: 'saude', color: '#B8E8D4' },
  { key: 'outros', color: '#D4D4D4' }
];

const monthNames = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

export function HistoryCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<MonthData[]>(() => {
    const saved = localStorage.getItem('financialHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save current month data
  useEffect(() => {
    const saveCurrentMonth = () => {
      const currentData = localStorage.getItem('financialData');
      if (!currentData) return;

      const data = JSON.parse(currentData);
      const now = new Date();
      const fullMonthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];

      const existingIndex = history.findIndex(h => 
        h.year === now.getFullYear() && 
        fullMonthNames.indexOf(h.month) === now.getMonth()
      );

      const monthData: MonthData = {
        month: fullMonthNames[now.getMonth()],
        year: now.getFullYear(),
        income: data.mainSalary + data.additionalIncome,
        expenses: data.expenses
      };

      let newHistory;
      if (existingIndex >= 0) {
        newHistory = [...history];
        newHistory[existingIndex] = monthData;
      } else {
        newHistory = [monthData, ...history].slice(0, 12);
      }

      setHistory(newHistory);
      localStorage.setItem('financialHistory', JSON.stringify(newHistory));
    };

    if (history.length === 0) {
      saveCurrentMonth();
    }
  }, []);

  const prepareChartData = (monthData: MonthData) => {
    return expenseCategories
      .map(cat => ({
        value: monthData.expenses[cat.key as keyof typeof monthData.expenses],
        color: cat.color
      }))
      .filter(item => item.value > 0);
  };

  const calculateTotalExpenses = (expenses: MonthData['expenses']) => {
    return Object.values(expenses).reduce((sum, val) => sum + val, 0);
  };

  const calculateTrend = () => {
    if (history.length < 2) return null;

    const recent = history[0];
    const previous = history[1];

    const recentTotal = calculateTotalExpenses(recent.expenses);
    const previousTotal = calculateTotalExpenses(previous.expenses);

    if (previousTotal === 0) return null;

    const percentChange = ((recentTotal - previousTotal) / previousTotal) * 100;

    return {
      isPositive: percentChange < 0,
      percentage: Math.abs(percentChange).toFixed(1)
    };
  };

  const shareHistory = async () => {
    if (history.length === 0) return;

    const recent = history[0];
    const totalExpenses = calculateTotalExpenses(recent.expenses);
    const balance = recent.income - totalExpenses;
    
    const text = `📊 ${recent.month} ${recent.year}\nRendimento: ${recent.income.toLocaleString('pt-MZ')} MZN\nDespesas: ${totalExpenses.toLocaleString('pt-MZ')} MZN\nSaldo: ${balance.toLocaleString('pt-MZ')} MZN`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const trend = calculateTrend();

  if (history.length === 0 || history[0].income === 0) {
    return null;
  }

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
          <div className="w-12 h-12 bg-gradient-to-br from-[#A8B9B3] to-[#8FA39D] rounded-2xl flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-[#2C3E3A]">Histórico</h2>
            <p className="text-sm text-[#6B7D78]">
              {history.length} {history.length === 1 ? 'mês' : 'meses'}
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

      {/* Trend Preview */}
      {!isExpanded && trend && (
        <div className="px-6 pb-6">
          <div className={`rounded-2xl p-4 border flex items-center gap-3 ${
            trend.isPositive 
              ? 'bg-[#E8F5F2] border-[#A8C5BD]/30' 
              : 'bg-[#FFF8E5] border-[#FFE5A0]/30'
          }`}>
            {trend.isPositive ? (
              <TrendingDown className="w-5 h-5 text-[#A8C5BD]" />
            ) : (
              <TrendingUp className="w-5 h-5 text-[#FFD88A]" />
            )}
            <p className="text-sm text-[#6B7D78]">
              {trend.isPositive ? 'Reduziste ' : 'Aumentaste '}
              <strong className="text-[#2C3E3A]">{trend.percentage}%</strong> as despesas
            </p>
          </div>
        </div>
      )}

      {/* Expandable Content */}
      {isExpanded && (
        <div




          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4 border-t border-[#E8EDE8]/30 pt-6">
            {/* Trend Summary */}
            {trend && (
              <div className={`rounded-2xl p-4 border flex items-center justify-between ${
                trend.isPositive 
                  ? 'bg-[#E8F5F2] border-[#A8C5BD]/30' 
                  : 'bg-[#FFF8E5] border-[#FFE5A0]/30'
              }`}>
                <div className="flex items-center gap-3">
                  {trend.isPositive ? (
                    <TrendingDown className="w-6 h-6 text-[#A8C5BD]" />
                  ) : (
                    <TrendingUp className="w-6 h-6 text-[#FFD88A]" />
                  )}
                  <div>
                    <p className="text-[#2C3E3A]">
                      {trend.isPositive ? 'Boa!' : 'Atenção'}
                    </p>
                    <p className="text-sm text-[#6B7D78]">
                      {trend.percentage}% de {trend.isPositive ? 'redução' : 'aumento'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={shareHistory}
                  className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Share2 className="w-4 h-4 text-[#6B7D78]" />
                </button>
              </div>
            )}

            {/* History Grid */}
            <div className="grid grid-cols-2 gap-3">
              {history.slice(0, 4).map((monthData, index) => {
                const chartData = prepareChartData(monthData);
                const totalExpenses = calculateTotalExpenses(monthData.expenses);
                const balance = monthData.income - totalExpenses;
                const monthShort = monthNames[
                  ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].indexOf(monthData.month)
                ];

                return (
                  <div
                    key={`${monthData.year}-${monthData.month}`}



                    className="bg-[#F8F9F5] rounded-2xl p-4"
                  >
                    {/* Month Label */}
                    <div className="text-center mb-2">
                      <p className="text-sm text-[#2C3E3A]">{monthShort}</p>
                      <p className="text-xs text-[#6B7D78]">{monthData.year}</p>
                    </div>

                    {/* Mini Chart */}
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={100}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={35}
                            dataKey="value"
                          >
                            {chartData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[100px] flex items-center justify-center">
                        <p className="text-xs text-[#A8B9B3]">Sem dados</p>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="mt-2 pt-2 border-t border-[#E8EDE8]/30 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#6B7D78]">Saldo:</span>
                        <span className={balance >= 0 ? 'text-[#A8C5BD]' : 'text-[#C85A5A]'}>
                          {(balance / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}