import { ArrowLeft, Brain, Activity, Wallet, Scale } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { PillarQuestionnaire } from '@/data/questionnaireData';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

const PILLAR_META = {
  mental:     { Icon: Brain,    accent: '#1565C0', label: 'Saúde Mental' },
  fisico:     { Icon: Activity, accent: '#FB923C', label: 'Bem-estar Físico' },
  financeira: { Icon: Wallet,   accent: '#34D399', label: 'Assistência Financeira' },
  juridica:   { Icon: Scale,    accent: '#F472B6', label: 'Assistência Jurídica' },
} as const;

interface QuestionnaireProps {
  pillarId: 'mental' | 'fisico' | 'financeira' | 'juridica';
  questions: PillarQuestionnaire;
  onBack: () => void;
  onComplete: () => void;
}

export function Questionnaire({ pillarId, questions, onBack, onComplete }: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const meta  = PILLAR_META[pillarId];
  const total = questions.questions.length;
  const q     = questions.questions[currentIndex];
  const pct   = ((currentIndex) / total) * 100;

  const handleContinue = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (currentIndex < total - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(answers[currentIndex - 1] ?? null);
      setAnswers(answers.slice(0, -1));
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header bar */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: `${meta.accent}10`, borderBottom: `1px solid ${meta.accent}20` }}
      >
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={handleBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${meta.accent}30` }}
          >
            <ArrowLeft size={17} style={{ color: meta.accent }} />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div
              className="size-8 rounded-full flex items-center justify-center bg-white shadow-sm"
              style={{ border: `1px solid ${meta.accent}20` }}
            >
              <meta.Icon size={16} style={{ color: meta.accent }} />
            </div>
            <span className="font-pacifico text-[#0a0a0a] font-light text-[18px]">{meta.label}</span>
          </div>
          <span className="font-poppins text-[#474747] text-[13px] font-semibold">
            {currentIndex + 1}/{total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <div
            animate={{ width: `${pct + (100 / total)}%` }}

            className="h-full rounded-full"
            style={{ background: meta.accent }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 px-5 pt-8 pb-36 overflow-y-auto">
        
          <div
            key={currentIndex}




          >
            {/* Step indicator */}
            <span
              className="inline-block font-poppins text-[11px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-[4px] mb-4"
              style={{ background: `${meta.accent}15`, color: meta.accent }}
            >
              Pergunta {currentIndex + 1}
            </span>

            {/* Question text */}
            <p className="font-poppins text-[#0a0a0a] text-[24px] font-light tracking-wide leading-snug mb-8">
              {q.text}
            </p>

            {/* Answer options */}
            <div className="flex flex-col gap-3">
              {q.options.map((option, i) => {
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
 
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-[28px] text-left transition-all shadow-sm bg-white"
                    style={{
                      border: isSelected
                        ? `1.5px solid ${meta.accent}`
                        : `1px solid ${CARD_EL}`,
                      background: isSelected ? `${meta.accent}0a` : '#ffffff',
                    }}
                  >
                    {/* Circle indicator */}
                    <div
                      className="size-5 rounded-full flex items-center justify-center shrink-0 transition-all bg-white"
                      style={{
                        border: isSelected ? `5px solid ${meta.accent}` : `2px solid ${CARD_EL}`,
                      }}
                    />
                    <span
                      className="font-poppins text-[14px] font-semibold leading-snug flex-1"
                      style={{ color: isSelected ? '#0a0a0a' : '#474747' }}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 pb-10 pt-4 pointer-events-none"
        style={{ background: `linear-gradient(to top, transparent 70%, transparent)` }}
      >
        <button
          onClick={handleContinue}
          disabled={selected === null}
          className="w-full py-4 rounded-[28px] font-poppins font-bold text-[15px] transition-all active:scale-[0.98] pointer-events-auto shadow-sm"
          style={{
            background: selected !== null ? meta.accent : CARD_EL,
            color: selected !== null ? '#fff' : '#474747',
          }}
        >
          {currentIndex < total - 1 ? 'Continuar →' : 'Ver Especialistas'}
        </button>
      </div>
    </div>
  );
}
