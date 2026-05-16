import { FlowButton } from '@/components/ui/flow-button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface OnboardingQuestionProps {
  onBack: () => void;
  onNext: (selectedIndex: number) => void;
}

export function OnboardingQuestion({ onBack, onNext }: OnboardingQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    {
      text: "Quero reduzir o stress e dormir melhor.",
      bgColor: "bg-[#E8F4FD]",
      hoverColor: "hover:bg-[#D4EAFC]",
      borderColor: "border-[#4A90E2]/20",
      textColor: "text-[#2C5282]"
    },
    {
      text: "Quero sentir-me com mais energia.",
      bgColor: "bg-[#FFF4E6]",
      hoverColor: "hover:bg-[#FFE8CC]",
      borderColor: "border-[#FF9500]/20",
      textColor: "text-[#8B5A00]"
    },
    {
      text: "Quero organizar as minhas finanças.",
      bgColor: "bg-[#E8F9F1]",
      hoverColor: "hover:bg-[#D1F4E0]",
      borderColor: "border-[#34C759]/20",
      textColor: "text-[#1E6F3F]"
    },
    {
      text: "Quero resolver questões jurídicas que me preocupam.",
      bgColor: "bg-[#F5E8FD]",
      hoverColor: "hover:bg-[#EBDAFC]",
      borderColor: "border-[#AF52DE]/20",
      textColor: "text-[#6B2D9E]"
    }
  ];

  const handleContinue = () => {
    if (selectedOption !== null) {
      onNext(selectedOption);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 py-8">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-2xl w-full text-center space-y-6">
          {/* Question */}
          <h1 className="text-4xl md:text-5xl text-[#1D1D1F] tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            O que mais queres melhorar neste momento?
          </h1>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left px-6 py-4 rounded-2xl border ${option.borderColor} ${option.bgColor} ${option.hoverColor} transition-all duration-300 ${option.textColor} text-base md:text-lg ${selectedOption === index ? 'ring-2 ring-[#4A90E2]' : ''
                  }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex justify-between items-center pb-4 max-w-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#4A90E2] hover:text-[#4A90E2]/80 transition-colors text-base"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <FlowButton
          text="Continuar"
          onClick={handleContinue}
          disabled={selectedOption === null}
        />
      </div>
    </div>
  );
}