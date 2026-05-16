import { Check } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';

interface CompletionPageProps {
  onContinue: () => void;
}

export function CompletionPage({ onContinue }: CompletionPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center animate-fade-in">
          <div className="relative">
            {/* Main icon circle */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#34C759]/30 border-2 border-[#34C759]">
              <Check className="relative w-8 h-8 text-[#34C759] stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl text-[#4A90E2] tracking-tight animate-fade-in"
          style={{
            fontFamily: 'Georgia, serif',
            animationDelay: '0.3s',
            animationFillMode: 'backwards'
          }}
        >
          O seu bem-estar começa aqui ✨
        </h1>

        {/* Continue Button */}
        <div className="flex justify-center pt-6 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          <FlowButton text="Continuar para Dashboard" onClick={onContinue} />
        </div>
      </div>
    </div>
  );
}