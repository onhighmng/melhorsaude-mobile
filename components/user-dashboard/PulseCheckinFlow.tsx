import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { Zap, Wind, Smile, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PulseStep {
  id: 'energy' | 'stress' | 'humor';
  title: string;
  subtitle: string;
  icon: any;
  color: string;
}

const STEPS: PulseStep[] = [
  { 
    id: 'energy', 
    title: 'Nível de Energia', 
    subtitle: 'Como te sentes fisicamente?', 
    icon: Zap, 
    color: '#3B82F6' 
  },
  { 
    id: 'stress', 
    title: 'Nível de Stress', 
    subtitle: 'Sentes-te sob pressão?', 
    icon: Wind, 
    color: '#F59E0B' 
  },
  { 
    id: 'humor', 
    title: 'Humor & Estabilidade', 
    subtitle: 'Como está o teu estado emocional?', 
    icon: Smile, 
    color: '#10B981' 
  },
];

interface PulseCheckinFlowProps {
  onComplete: (scores: { energy: number; stress: number; humor: number }) => void;
  onBack: () => void;
}

export function PulseCheckinFlow({ onComplete, onBack }: PulseCheckinFlowProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const currentStep = STEPS[currentStepIdx];

  const handleSelect = (value: number) => {
    const newScores = { ...scores, [currentStep.id]: value };
    setScores(newScores);

    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      onComplete(newScores as { energy: number; stress: number; humor: number });
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentStepIdx + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header / Progress Bar */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBack}
            className="size-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStepIdx ? 'w-8' : 'w-2 bg-gray-100'}`}
                style={{ background: i <= currentStepIdx ? currentStep.color : undefined }}
              />
            ))}
          </div>
          <div className="size-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 px-8 flex flex-col justify-center items-center text-center">
        
          <div
            key={currentStep.id}



            className="w-full flex flex-col items-center"
          >
            <div 
              className="size-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-current/10"
              style={{ background: `${currentStep.color}15`, color: currentStep.color }}
            >
              <currentStep.icon size={40} />
            </div>

            <h2 className="font-plus-jakarta text-[32px] font-bold text-[#0a0a0a] mb-2 leading-tight">
              {currentStep.title}
            </h2>
            <p className="font-poppins text-gray-500 text-[16px] mb-12">
              {currentStep.subtitle}
            </p>

            <div className="grid grid-cols-5 gap-3 w-full max-w-[340px]">
              {[1, 2, 3, 4, 5].map((num) => {
                const colors = ['#EF4444', '#F59E0B', '#FBBF24', '#84CC16', '#10B981'];
                const numColor = colors[num - 1];
                const isActive = scores[currentStep.id] === num;
                
                return (
                  <button
                    key={num}
                    onClick={() => handleSelect(num)}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center transition-all active:scale-90 group relative overflow-hidden shadow-sm"
                    style={{ 
                      background: isActive ? numColor : '#F9F9F9',
                      border: `2px solid ${isActive ? numColor : 'transparent'}`,
                      boxShadow: isActive ? `0 10px 20px -10px ${numColor}80` : undefined
                    }}
                  >
                    <span 
                      className={`font-plus-jakarta text-[22px] font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}
                      style={{ color: !isActive ? `${numColor}70` : undefined }}
                    >
                      {num}
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-between w-full max-w-[340px] px-2">
              <span className="font-poppins text-[12px] font-bold text-gray-300 uppercase tracking-widest">
                {currentStep.id === 'stress' ? 'Baixo' : 'Muito Mal'}
              </span>
              <span className="font-poppins text-[12px] font-bold text-gray-300 uppercase tracking-widest">
                {currentStep.id === 'stress' ? 'Alto' : 'Excelente'}
              </span>
            </div>
          </div>
        
      </div>

      <div className="p-10 flex justify-center">
        <p className="font-plus-jakarta text-[14px] text-gray-400 font-medium">
          Step {currentStepIdx + 1} of 3
        </p>
      </div>
    </div>
  );
}
