import { useState, useEffect } from 'react';
// DISABLED: import from 'motion/react';
import { BookOpen, Bookmark, Share2 } from 'lucide-react';

interface Insight {
  id: number;
  content: string;
  author?: string;
}

const insights: Insight[] = [
  { id: 1, content: 'Poupar é dar-te liberdade.', author: 'Melhor Saúde' },
  { id: 2, content: 'Começa pequeno — a consistência vence o impulso.' },
  { id: 3, content: 'A riqueza não é ter muito dinheiro; é ter muitas opções.', author: 'Chris Rock' },
  { id: 4, content: 'Não poupes o que sobra depois de gastar; gasta o que sobra depois de poupar.', author: 'Warren Buffett' },
  { id: 5, content: 'O dinheiro é um excelente servo, mas um péssimo mestre.', author: 'P.T. Barnum' },
  { id: 6, content: 'Antes de comprares algo, espera 24 horas.' },
  { id: 7, content: 'Cria um fundo de emergência equivalente a 3-6 meses das tuas despesas.' },
  { id: 8, content: 'Investe em ti mesmo. Educação e saúde trazem retornos a longo prazo.' },
  { id: 9, content: 'Celebra pequenas vitórias financeiras. Cada decisão inteligente conta.' },
  { id: 10, content: 'A verdadeira liberdade financeira é ter controlo sobre o teu tempo.', author: 'Tony Robbins' }
];

export function InsightsCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<Insight>(insights[0]);
  const [savedInsights, setSavedInsights] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedInsights');
    return saved ? JSON.parse(saved) : [];
  });

  // Auto-shuffle effect
  useEffect(() => {
    const interval = setInterval(() => {
      shuffleInsight();
    }, 6000); // Change insight every 6 seconds

    return () => clearInterval(interval);
  }, [currentInsight]); // Re-run when currentInsight changes

  useEffect(() => {
    localStorage.setItem('savedInsights', JSON.stringify(savedInsights));
  }, [savedInsights]);

  const shuffleInsight = () => {
    let newInsight;
    do {
      newInsight = insights[Math.floor(Math.random() * insights.length)];
    } while (newInsight.id === currentInsight.id && insights.length > 1);
    setCurrentInsight(newInsight);
  };

  const toggleSave = () => {
    if (savedInsights.includes(currentInsight.id)) {
      setSavedInsights(savedInsights.filter(id => id !== currentInsight.id));
    } else {
      setSavedInsights([...savedInsights, currentInsight.id]);
    }
  };

  const shareInsight = async () => {
    const text = currentInsight.author 
      ? `"${currentInsight.content}" - ${currentInsight.author}`
      : currentInsight.content;
    
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

  const isSaved = savedInsights.includes(currentInsight.id);

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
          <div className="w-12 h-12 bg-gradient-to-br from-[#C5B8E8] to-[#B0A0D8] rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-[#2C3E3A]">Educar</h2>
            <p className="text-sm text-[#6B7D78]">Insights financeiros</p>
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

      {/* Quick preview when collapsed */}
      {!isExpanded && (
        <div className="px-6 pb-6">
          
            <div
              key={currentInsight.id}




              className="bg-gradient-to-br from-[#F5F0FF] to-[#EDE5FF] rounded-2xl p-4 border border-[#C5B8E8]/20"
            >
              <p className="text-sm text-[#6B7D78] italic">
                "{currentInsight.content}"
              </p>
              {currentInsight.author && (
                <p className="text-xs text-[#A8B9B3] mt-2">— {currentInsight.author}</p>
              )}
            </div>
          
        </div>
      )}

      {/* Expandable Content */}
      {isExpanded && (
        <div




          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4 border-t border-[#E8EDE8]/30 pt-6">
            {/* Current Insight */}
            
              <div
                key={currentInsight.id}




                className="bg-gradient-to-br from-[#F5F0FF] to-[#EDE5FF] rounded-2xl p-6 border border-[#C5B8E8]/20"
              >
                <p className="text-[#2C3E3A] leading-relaxed mb-3">
                  {currentInsight.content}
                </p>
                {currentInsight.author && (
                  <p className="text-sm text-[#6B7D78] italic">
                    — {currentInsight.author}
                  </p>
                )}
              </div>
            

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={toggleSave}
                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  isSaved 
                    ? 'bg-gradient-to-r from-[#FFD88A] to-[#FFC86A] text-[#2C3E3A]' 
                    : 'bg-[#F8F9F5] text-[#6B7D78]'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Guardado' : 'Guardar'}
              </button>
              <button
                onClick={shareInsight}
                className="w-12 h-12 bg-[#F8F9F5] text-[#6B7D78] rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Saved Insights */}
            {savedInsights.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-[#E8EDE8]/30">
                <p className="text-xs text-[#6B7D78] flex items-center gap-2">
                  <Bookmark className="w-3 h-3" />
                  Guardados ({savedInsights.length})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedInsights.map(id => {
                    const insight = insights.find(i => i.id === id);
                    if (!insight) return null;
                    
                    return (
                      <button
                        key={id}
                        onClick={() => setCurrentInsight(insight)}
                        className="w-full text-left bg-[#F8F9F5] rounded-xl p-3 active:bg-[#F0F4F1] transition-colors"
                      >
                        <p className="text-sm text-[#2C3E3A] line-clamp-2">
                          {insight.content}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}