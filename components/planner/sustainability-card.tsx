// DISABLED: import from 'motion/react';
import { Scale } from 'lucide-react';

interface SustainabilityCardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function SustainabilityCard({ totalIncome, totalExpenses, balance }: SustainabilityCardProps) {
  const getStatus = () => {
    if (totalIncome === 0) {
      return {
        type: 'empty',
        label: 'Adiciona os teus dados',
        emoji: '📊',
        color: '#A8B9B3',
        bgGradient: 'from-[#F8F9F5] to-[#F0F4F1]',
        message: 'Introduz o teu rendimento e despesas para ver a tua sustentabilidade financeira.'
      };
    }
    
    if (balance < 0) {
      return {
        type: 'unsustainable',
        label: 'Não Sustentável',
        emoji: '⚠️',
        color: '#FFB5B5',
        bgGradient: 'from-[#FFE5E5] to-[#FFD4D4]',
        message: 'Vamos ver juntos como mudar isso?'
      };
    } else if (balance < totalIncome * 0.1) {
      return {
        type: 'delicate',
        label: 'Equilíbrio Delicado',
        emoji: '⚡',
        color: '#FFD88A',
        bgGradient: 'from-[#FFF8E5] to-[#FFEDD4]',
        message: 'Atenção'
      };
    } else {
      return {
        type: 'sustainable',
        label: 'Sustentável',
        emoji: '✨',
        color: '#A8C5BD',
        bgGradient: 'from-[#E8F5F2] to-[#D8EBE5]',
        message: 'Boa!'
      };
    }
  };

  const status = getStatus();
  const percentage = totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;

  if (totalIncome === 0 && totalExpenses === 0) {
    return null;
  }

  return (
    <div



      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-[#E8EDE8]/50 overflow-hidden"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#A8C5BD] to-[#8BB4A8] rounded-2xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-[#2C3E3A]">Sustentabilidade</h2>
            <p className="text-sm text-[#6B7D78]">Como estás?</p>
          </div>
        </div>

        {/* Calculation Display */}
        {totalIncome > 0 && (
          <div className="bg-gradient-to-br from-[#F8F9F5] to-white rounded-2xl p-4 border border-[#E8EDE8]/50">
            <div className="flex items-center justify-between gap-3 text-center">
              <div className="flex-1">
                <p className="text-xs text-[#6B7D78] mb-1">Rendimento</p>
                <p className="text-[#2C3E3A] font-semibold">
                  {totalIncome.toLocaleString('pt-MZ')}
                </p>
              </div>
              <span className="text-[#A8C5BD]">−</span>
              <div className="flex-1">
                <p className="text-xs text-[#6B7D78] mb-1">Despesas</p>
                <p className="text-[#2C3E3A] font-semibold">
                  {totalExpenses.toLocaleString('pt-MZ')}
                </p>
              </div>
              <span className="text-[#A8C5BD]">=</span>
              <div className="flex-1">
                <p className="text-xs text-[#6B7D78] mb-1">Saldo</p>
                <p className={`font-bold ${balance >= 0 ? 'text-[#A8C5BD]' : 'text-[#FFB5B5]'}`}>
                  {balance.toLocaleString('pt-MZ')}
                </p>
              </div>
            </div>
            <p className="text-xs text-center text-[#A8B9B3] mt-3">
              {balance >= 0 
                ? `Sobram ${((balance / totalIncome) * 100).toFixed(1)}% do teu rendimento`
                : `Faltam ${Math.abs(balance).toLocaleString('pt-MZ')} MZN`
              }
            </p>
          </div>
        )}

        {/* Status Card */}
        <div className={`bg-gradient-to-br ${status.bgGradient} rounded-2xl p-6 border border-[${status.color}]/20`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{status.emoji}</span>
            <div className="flex-1">
              <h3 className="text-[#2C3E3A] mb-2">{status.label}</h3>
              <p className="text-sm text-[#6B7D78] leading-relaxed">
                {status.message}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalIncome > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7D78]">Despesas vs Rendimento</span>
              <span className="text-[#2C3E3A]">{percentage.toFixed(0)}%</span>
            </div>
            <div className="h-3 bg-[#F0F4F1] rounded-full overflow-hidden">
              <div

                animate={{ width: `${percentage}%` }}

                className="h-full rounded-full"
                style={{ backgroundColor: status.color }}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        {totalIncome > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F8F9F5] rounded-xl p-3 text-center">
              <p className="text-xs text-[#6B7D78] mb-1">Rendimento</p>
              <p className="text-sm text-[#2C3E3A]">
                {(totalIncome / 1000).toFixed(1)}k
              </p>
            </div>
            <div className="bg-[#F8F9F5] rounded-xl p-3 text-center">
              <p className="text-xs text-[#6B7D78] mb-1">Despesas</p>
              <p className="text-sm text-[#2C3E3A]">
                {(totalExpenses / 1000).toFixed(1)}k
              </p>
            </div>
            <div className={`rounded-xl p-3 text-center ${
              balance >= 0 ? 'bg-[#E8F5F2]' : 'bg-[#FFE5E5]'
            }`}>
              <p className="text-xs text-[#6B7D78] mb-1">Saldo</p>
              <p className={`text-sm ${balance >= 0 ? 'text-[#2C3E3A]' : 'text-[#C85A5A]'}`}>
                {(balance / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}