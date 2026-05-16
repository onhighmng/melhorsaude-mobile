import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { Wallet, Check } from 'lucide-react';
import { FinancialData } from '../App';

interface IncomeCardProps {
  data: FinancialData;
  onUpdate: (data: FinancialData) => void;
}

export function IncomeCard({ data, onUpdate }: IncomeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainSalary, setMainSalary] = useState(data.mainSalary > 0 ? data.mainSalary.toString() : '');
  const [additionalIncome, setAdditionalIncome] = useState(data.additionalIncome > 0 ? data.additionalIncome.toString() : '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const main = parseFloat(mainSalary) || 0;
    const additional = parseFloat(additionalIncome) || 0;
    
    onUpdate({
      ...data,
      mainSalary: main,
      additionalIncome: additional
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsExpanded(false);
    }, 1000);
  };

  const totalIncome = (parseFloat(mainSalary) || 0) + (parseFloat(additionalIncome) || 0);
  const hasIncome = data.mainSalary > 0 || data.additionalIncome > 0;

  return (
    <div


      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-[#E8EDE8]/50 overflow-hidden"
    >
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between active:bg-[#F8F9F5]/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#A3D5FF] to-[#7CB8E8] rounded-2xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-[#2C3E3A]">Rendimento</h2>
            <p className="text-sm text-[#6B7D78]">
              {hasIncome 
                ? `${(data.mainSalary + data.additionalIncome).toLocaleString('pt-MZ')} MZN`
                : 'Adicionar rendimento'
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

      {/* Expandable Content */}
      {isExpanded && (
        <div




          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4 border-t border-[#E8EDE8]/30 pt-6">
            <p className="text-[#6B7D78] leading-relaxed text-[24px]">
              Tudo começa com o que tens nas mãos.
            </p>

            {/* Main Salary */}
            <div className="space-y-2">
              <label className="text-sm text-[#2C3E3A]">
                Salário Principal
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7D78] text-sm">
                  MZN
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={mainSalary}
                  onChange={(e) => setMainSalary(e.target.value)}
                  className="w-full pl-16 pr-4 py-3 bg-[#F8F9F5] border border-[#E8EDE8] rounded-2xl text-[#2C3E3A] placeholder-[#A8B9B3] focus:outline-none focus:ring-2 focus:ring-[#A8C5BD]/30 focus:border-[#A8C5BD] transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Additional Income */}
            <div className="space-y-2">
              <label className="text-sm text-[#6B7D78]">
                Rendimentos Adicionais (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7D78] text-sm">
                  MZN
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={additionalIncome}
                  onChange={(e) => setAdditionalIncome(e.target.value)}
                  className="w-full pl-16 pr-4 py-3 bg-[#F8F9F5] border border-[#E8EDE8] rounded-2xl text-[#2C3E3A] placeholder-[#A8B9B3] focus:outline-none focus:ring-2 focus:ring-[#A8C5BD]/30 focus:border-[#A8C5BD] transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-br from-[#A3D5FF]/10 to-[#A8C5BD]/10 rounded-2xl p-4 border border-[#A3D5FF]/20">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7D78]">Total:</span>
                <span className="text-[#2C3E3A]">
                  {totalIncome.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MZN
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-[#A8C5BD] to-[#8BB4A8] text-white rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-sm"
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