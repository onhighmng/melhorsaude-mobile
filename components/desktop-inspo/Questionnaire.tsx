import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
// import svgPaths from "../imports/svg-zf43v5wy79"; // TODO: Locate this file or SVG paths
import imgMelhorSaudeTransparentLogo1 from "@/assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import { PillarQuestionnaire } from '@/data/questionnaireData';

// Placeholder for missing SVG paths import. 
// If specific SVGs are needed, we can extract them from the inspo project later.
const svgPaths = {
    p164dc300: "M9 0L11.0206 6.97943L18 9L11.0206 11.0206L9 18L6.97943 11.0206L0 9L6.97943 6.97943L9 0Z", // Star shape approximation
    p661b2d0: "M6 0L7.34708 4.65292L12 6L7.34708 7.34708L6 12L4.65292 7.34708L0 6L4.65292 4.65292L6 0Z" // smaller star
};


interface QuestionnaireProps {
    pillarId: 'mental' | 'fisico' | 'financeira' | 'juridica';
    questions: PillarQuestionnaire;
    onBack: () => void;
    onComplete: () => void;
}

export function Questionnaire({ pillarId, questions, onBack, onComplete }: QuestionnaireProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const currentQuestion = questions.questions[currentQuestionIndex];
    const totalQuestions = questions.questions.length;
    const pillarTitle = questions.title;
    const pillarColor = questions.color;

    const handleContinue = () => {
        if (selectedAnswer !== null) {
            const newAnswers = [...answers, selectedAnswer];

            if (currentQuestionIndex < totalQuestions - 1) {
                setAnswers(newAnswers);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                onComplete();
            }
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(answers[currentQuestionIndex - 1] ?? null);
            setAnswers(answers.slice(0, -1));
        } else {
            onBack();
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f5ec] pb-[120px]">
            {/* Top Section */}
            <div
                className="rounded-bl-[32px] rounded-br-[32px] p-6 pb-4 relative"
                style={{ backgroundColor: pillarColor }}
            >
                {/* Header with Back Button and Title */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={handleBack}
                        className="w-[40px] h-[40px] bg-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-colors shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>

                    <p className="font-['Fredoka:Medium',sans-serif] font-medium text-[24px] text-white flex-1 text-center mr-[40px]">
                        {pillarTitle}
                    </p>
                </div>

                {/* Question Number */}
                <div className="flex items-center justify-between text-white">
                    <p className="font-['Nunito:Bold',sans-serif] font-bold text-[14px]">
                        {String(currentQuestionIndex + 1).padStart(2, '0')} Questão
                    </p>
                    <p className="font-['Nunito:Medium',sans-serif] font-medium text-[12px]">
                        {currentQuestionIndex + 1} de {totalQuestions}
                    </p>
                </div>

                {/* Decorative Stars */}
                <svg className="absolute right-6 top-[86px] w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                    <path d={svgPaths.p164dc300} fill="#FFB518" />
                </svg>
                <svg className="absolute left-[85px] top-[50px] w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                    <path d={svgPaths.p661b2d0} fill="#FFB518" />
                </svg>
            </div>

            {/* Progress Bar */}
            <div className="px-[12px] mt-6">
                <div className="flex gap-[12px]">
                    {Array.from({ length: totalQuestions }).map((_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-[8px] rounded-full"
                            style={{
                                backgroundColor: index <= currentQuestionIndex ? '#FFB518' : 'white',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <div className="mx-[12px] mt-[70px] bg-white rounded-[24px] p-[22px]">
                <div className="flex gap-3">
                    <div
                        className="w-[4px] rounded-full shrink-0"
                        style={{ backgroundColor: pillarColor }}
                    />
                    <p className="font-['Roboto',sans-serif] text-[26px] text-black tracking-[-0.52px] leading-[1.1]">
                        {currentQuestion.question}
                    </p>
                </div>
            </div>

            {/* Answer Options */}
            <div className="mx-[12px] mt-[24px] space-y-[18px]">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full min-h-[60px] py-[16px] rounded-[28px] flex items-center px-[16px] transition-all ${selectedAnswer === index
                                ? 'bg-[rgba(6,171,221,0.08)] border-2 border-[' + pillarColor + ']'
                                : 'bg-white border-2 border-transparent'
                            }`}
                    >
                        <div
                            className={`w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 ${selectedAnswer === index ? 'bg-white' : 'bg-[#f5f5f5]'
                                }`}
                        >
                            {selectedAnswer === index && (
                                <div
                                    className="w-[14px] h-[14px] rounded-full"
                                    style={{ backgroundColor: pillarColor }}
                                />
                            )}
                        </div>
                        <p className="ml-[16px] font-['Inter',sans-serif] font-semibold text-[16px] text-black text-left">
                            {option}
                        </p>
                    </button>
                ))}
            </div>

            {/* Bottom Buttons */}
            <div className="fixed bottom-[20px] left-[12px] right-[12px] h-[77px] bg-black rounded-[100px] flex items-center px-[8px]">
                <button className="w-[64px] h-[61px] bg-white rounded-full flex items-center justify-center p-1">
                    <img
                        src={imgMelhorSaudeTransparentLogo1}
                        alt="Melhor Saúde"
                        className="w-full h-full object-contain"
                    />
                </button>
                <button
                    onClick={handleContinue}
                    disabled={selectedAnswer === null}
                    className="ml-[8px] flex-1 h-[61px] rounded-[1000px] flex items-center justify-center transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: pillarColor }}
                >
                    <p className="font-['Nunito:Medium',sans-serif] font-medium text-[16px] text-white">
                        Continuar
                    </p>
                </button>
            </div>
        </div>
    );
}
