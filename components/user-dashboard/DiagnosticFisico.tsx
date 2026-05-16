import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Activity } from 'lucide-react';

interface DiagnosticFisicoProps {
  onBack: () => void;
  onComplete: () => void;
}

export function DiagnosticFisico({ onBack, onComplete }: DiagnosticFisicoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<{ page1: number | null; page2: number | null }>({
    page1: null,
    page2: null,
  });

  const page1Question = "Como está o teu nível de energia no dia a dia?";
  const page1Options = [
    "Alto — sinto-me bem e ativo(a)",
    "Razoável — às vezes canso-me rápido",
    "Baixo — acordo cansado(a) frequentemente",
    "Muito baixo — evito esforço físico",
    "Não sei, mas sinto que algo está fora do normal"
  ];

  const page2Question = "Quais destas situações te descrevem melhor?";
  const page2Options = [
    "Durmo bem e como de forma equilibrada",
    "Tenho tentado melhorar o sono e alimentação",
    "Tenho maus hábitos (sono, alimentação, sedentarismo)",
    "Não cuido do meu corpo há muito tempo",
    "Quero mudar, mas não sei por onde começar"
  ];

  const handleSelectOption = (optionIndex: number) => {
    if (currentPage === 1) {
      setAnswers({ ...answers, page1: optionIndex });
    } else {
      setAnswers({ ...answers, page2: optionIndex });
    }
  };

  const handleNext = () => {
    if (currentPage === 1 && answers.page1 !== null) {
      setCurrentPage(2);
    } else if (currentPage === 2 && answers.page2 !== null) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    } else {
      onBack();
    }
  };

  const currentQuestion = currentPage === 1 ? page1Question : page2Question;
  const currentOptions = currentPage === 1 ? page1Options : page2Options;
  const currentAnswer = currentPage === 1 ? answers.page1 : answers.page2;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 font-poppins text-[#474747] hover:text-[#0a0a0a] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <div className="text-center space-y-3 pt-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm border border-[#1565C0]/10">
            <img src="/logo-icon.png" alt="" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="font-poppins text-[#1565C0] text-[24px] font-semibold tracking-tight">Bem-estar Físico</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${currentPage === 1 ? 'bg-[#F57C00]' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full ${currentPage === 2 ? 'bg-[#F57C00]' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-[28px] p-8 shadow-sm bg-[#f2f1ef]" style={{ border: `1px solid #ecece7` }}>
        <h2 className="font-poppins text-[#1565C0] text-[20px] font-semibold text-center mb-8">
          {currentQuestion}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              className={`w-full p-4 rounded-full text-left transition-all flex items-center gap-3 shadow-sm ${
                currentAnswer === index
                  ? 'bg-white border-2 border-[#10b981]'
                  : 'bg-white hover:bg-[#ecece7] border-2 border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                currentAnswer === index
                  ? 'border-[#10b981] bg-[#10b981]'
                  : 'border-[#ecece7]'
              }`}>
                {currentAnswer === index && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="font-poppins text-[#0a0a0a] font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          className="font-poppins flex-1 py-3 px-6 bg-[#f2f1ef] text-[#474747] rounded-full hover:bg-[#ecece7] transition-colors flex items-center justify-center gap-2 shadow-sm font-semibold"
          style={{ border: `1px solid #ecece7` }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{currentPage === 1 ? 'Voltar' : 'Anterior'}</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className={`font-poppins flex-1 py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm font-semibold ${
            currentAnswer === null
              ? 'bg-[#ecece7] text-[#a3a3a3] cursor-not-allowed'
              : 'bg-[#1565C0] text-white hover:bg-[#1565C0]/90'
          }`}
          style={{ border: currentAnswer === null ? 'none' : '1px solid #1565C0' }}
        >
          <span>{currentPage === 1 ? 'Próximo' : 'Concluir'}</span>
          {currentPage === 1 ? <ArrowRight className="w-5 h-5" /> : <Check className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}