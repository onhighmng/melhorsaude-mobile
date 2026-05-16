import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { Lightbulb, Plus, X } from 'lucide-react';
import { FinancialData } from '../App';

interface SuggestionsCardProps {
  data: FinancialData;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  onUpdate: (data: FinancialData) => void;
}

export function SuggestionsCard({ data, totalIncome, totalExpenses, balance, onUpdate }: SuggestionsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTalent, setNewTalent] = useState('');

  const addTalent = () => {
    if (newTalent.trim()) {
      onUpdate({
        ...data,
        talents: [...data.talents, newTalent.trim()]
      });
      setNewTalent('');
    }
  };

  const removeTalent = (index: number) => {
    onUpdate({
      ...data,
      talents: data.talents.filter((_, i) => i !== index)
    });
  };

  // Get top 2 expense reduction suggestions
  const expenseReductionSuggestions = Object.entries(data.expenses)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => {
      const categoryNames: { [key: string]: string } = {
        casa: 'Casa',
        alimentacao: 'Alimentação',
        transporte: 'Transporte',
        educacao: 'Educação',
        dividas: 'Dívidas',
        lazer: 'Lazer',
        saude: 'Saúde',
        outros: 'Outros'
      };
      return {
        category: categoryNames[category] || category,
        current: value,
        reduction: value * 0.15
      };
    })
    .sort((a, b) => b.current - a.current)
    .slice(0, 2);

  const talentSuggestions: { [key: string]: string } = {
    'cozinha': 'Vende refeições ou bolos caseiros',
    'bolos': 'Bolos por encomenda para festas',
    'costura': 'Costura e arranjos de roupa',
    'ensinar': 'Explicações ou cursos online',
    'matemática': 'Explicações de matemática',
    'inglês': 'Aulas de inglês particulares',
    'programar': 'Desenvolve sites pequenos',
    'fotografia': 'Fotos de eventos',
    'pintura': 'Vende obras ou dá aulas',
    'música': 'Aulas ou toques em eventos',
    'maquilhagem': 'Maquilhagem para eventos',
    'cabelo': 'Penteados e tratamentos',
    'artesanato': 'Vende produtos artesanais'
  };

  const getTalentSuggestion = (talent: string) => {
    const lowerTalent = talent.toLowerCase();
    for (const [key, suggestion] of Object.entries(talentSuggestions)) {
      if (lowerTalent.includes(key)) {
        return suggestion;
      }
    }
    return 'Monetiza através de serviços ou vendas';
  };

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
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-[#2C3E3A]">Sugestões</h2>
            <p className="text-sm text-[#6B7D78]">Caminho para o equilíbrio</p>
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

      {/* Quick Preview when collapsed */}
      {!isExpanded && expenseReductionSuggestions.length > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-[#FFF8E5] rounded-2xl p-4 border border-[#FFE5A0]/30">
            <p className="text-sm text-[#6B7D78]">
              💡 Reduzir <strong>{expenseReductionSuggestions[0].category}</strong> em 15% = {' '}
              <strong className="text-[#2C3E3A]">
                +{expenseReductionSuggestions[0].reduction.toLocaleString('pt-MZ', { maximumFractionDigits: 0 })} MZN
              </strong>
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
            <p className="text-sm text-[#6B7D78] leading-relaxed">
              Não se trata de cortar o que gostas, mas de escolher melhor.
            </p>

            {/* Expense Reduction Suggestions */}
            {expenseReductionSuggestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm text-[#2C3E3A]">📉 Reduzir Despesas</h3>
                {expenseReductionSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-[#FFF8E5] rounded-2xl p-4 border border-[#FFE5A0]/30">
                    <p className="text-[#2C3E3A] mb-2">{suggestion.category}</p>
                    <p className="text-sm text-[#6B7D78]">
                      Reduzir 15%: <strong className="text-[#2C3E3A]">
                        +{suggestion.reduction.toLocaleString('pt-MZ', { maximumFractionDigits: 0 })} MZN/mês
                      </strong>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Debt Management */}
            {data.expenses.dividas > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm text-[#2C3E3A]">💳 Dívidas</h3>
                <div className="bg-[#FFE5E5] rounded-2xl p-4 border border-[#FFB5B5]/30">
                  <p className="text-sm text-[#6B7D78] space-y-2">
                    <span className="block">• Renegociar taxas e prazos</span>
                    <span className="block">• Pagar primeiro juros altos</span>
                    <span className="block">• Evitar novas dívidas</span>
                  </p>
                </div>
              </div>
            )}

            {/* Talent Monetization */}
            <div className="space-y-3">
              <h3 className="text-sm text-[#2C3E3A]">✨ Monetiza Talentos</h3>
              
              {/* Add Talent */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTalent}
                  onChange={(e) => setNewTalent(e.target.value)}
                  placeholder="Ex: cozinhar, ensinar..."
                  onKeyPress={(e) => e.key === 'Enter' && addTalent()}
                  className="flex-1 px-4 py-3 bg-[#F8F9F5] border border-[#E8EDE8] rounded-2xl text-sm text-[#2C3E3A] placeholder-[#A8B9B3] focus:outline-none focus:ring-2 focus:ring-[#A8C5BD]/30 focus:border-[#A8C5BD] transition-all"
                />
                <button
                  onClick={addTalent}
                  className="w-12 h-12 bg-gradient-to-br from-[#A8C5BD] to-[#8BB4A8] rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Talent List */}
              {data.talents.length > 0 ? (
                <div className="space-y-2">
                  {data.talents.map((talent, index) => (
                    <div key={index} className="bg-[#E8F5F2] rounded-2xl p-4 border border-[#A8C5BD]/20">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[#2C3E3A]">{talent}</p>
                        <button
                          onClick={() => removeTalent(index)}
                          className="text-[#6B7D78] hover:text-[#C85A5A] transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-[#6B7D78]">
                        💡 {getTalentSuggestion(talent)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#F8F9F5] rounded-2xl p-6 text-center">
                  <p className="text-sm text-[#6B7D78]">
                    Adiciona os teus talentos para receber sugestões
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}