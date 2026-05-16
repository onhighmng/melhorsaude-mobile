import { FlowButton } from '@/components/ui/flow-button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface EnergyWellbeingQuestionProps {
  onBack: () => void;
  onNext: (selectedConcerns: number[]) => void;
}

export function EnergyWellbeingQuestion({ onBack, onNext }: EnergyWellbeingQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const options = [
    {
      text: "Quero ter mais energia durante o dia.",
      bgColor: "bg-[#E8F4FD]",
      hoverColor: "hover:bg-[#D4EAFC]",
      borderColor: "border-[#4A90E2]/20",
      textColor: "text-[#2C5282]",
      selectedBg: "bg-[#4A90E2]",
      selectedText: "text-white"
    },
    {
      text: "Quero dormir melhor e acordar com disposição.",
      bgColor: "bg-[#FFF4E6]",
      hoverColor: "hover:bg-[#FFE8CC]",
      borderColor: "border-[#FF9500]/20",
      textColor: "text-[#8B5A00]",
      selectedBg: "bg-[#FF9500]",
      selectedText: "text-white"
    },
    {
      text: "Quero alimentar-me de forma mais saudável.",
      bgColor: "bg-[#E8F9F1]",
      hoverColor: "hover:bg-[#D1F4E0]",
      borderColor: "border-[#34C759]/20",
      textColor: "text-[#1E6F3F]",
      selectedBg: "bg-[#34C759]",
      selectedText: "text-white"
    },
    {
      text: "Quero voltar a mexer o corpo com regularidade.",
      bgColor: "bg-[#F5E8FD]",
      hoverColor: "hover:bg-[#EBDAFC]",
      borderColor: "border-[#AF52DE]/20",
      textColor: "text-[#6B2D9E]",
      selectedBg: "bg-[#AF52DE]",
      selectedText: "text-white"
    },
    {
      text: "Quero sentir-me melhor com o meu corpo.",
      bgColor: "bg-[#FFE8F0]",
      hoverColor: "hover:bg-[#FFD4E5]",
      borderColor: "border-[#FF2D55]/20",
      textColor: "text-[#C7254E]",
      selectedBg: "bg-[#FF2D55]",
      selectedText: "text-white"
    }
  ];

  const toggleOption = (index: number) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter(i => i !== index));
    } else {
      if (selectedOptions.length < 2) {
        setSelectedOptions([...selectedOptions, index]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 py-8">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Question */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl text-[#1D1D1F] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              O que mais queres melhorar no teu bem-estar físico?
            </h1>
            <p className="text-[#86868B] text-base md:text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              (escolhe até 2 opções)
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col items-center gap-3">
            {/* First row - 2 options */}
            <div className="flex flex-col md:flex-row justify-center gap-3 w-full max-w-3xl">
              {options.slice(0, 2).map((option, index) => {
                const isSelected = selectedOptions.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => toggleOption(index)}
                    className={`px-6 md:px-8 py-4 rounded-full border transition-all duration-300 text-sm md:text-lg w-full ${isSelected
                        ? `${option.selectedBg} ${option.selectedText} border-transparent`
                        : `${option.bgColor} ${option.textColor} ${option.borderColor} ${option.hoverColor}`
                      }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {/* Second row - 1 option */}
            <div className="flex justify-center w-full max-w-xl">
              {options.slice(2, 3).map((option, index) => {
                const actualIndex = index + 2;
                const isSelected = selectedOptions.includes(actualIndex);
                return (
                  <button
                    key={actualIndex}
                    onClick={() => toggleOption(actualIndex)}
                    className={`px-3 md:px-4 py-2 md:py-3 rounded-full border transition-all duration-300 text-sm md:text-base w-full text-center ${isSelected
                        ? `${option.selectedBg} ${option.selectedText} border-transparent`
                        : `${option.bgColor} ${option.textColor} ${option.borderColor} ${option.hoverColor}`
                      }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {/* Third row - 2 options */}
            <div className="flex flex-col md:flex-row justify-center gap-3 w-full max-w-3xl">
              {options.slice(3, 5).map((option, index) => {
                const actualIndex = index + 3;
                const isSelected = selectedOptions.includes(actualIndex);
                return (
                  <button
                    key={actualIndex}
                    onClick={() => toggleOption(actualIndex)}
                    className={`px-6 md:px-8 py-4 rounded-full border transition-all duration-300 text-sm md:text-lg w-full ${isSelected
                        ? `${option.selectedBg} ${option.selectedText} border-transparent`
                        : `${option.bgColor} ${option.textColor} ${option.borderColor} ${option.hoverColor}`
                      }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
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
          disabled={selectedOptions.length === 0}
          onClick={() => selectedOptions.length > 0 && onNext(selectedOptions)}
        />
      </div>
    </div>
  );
}