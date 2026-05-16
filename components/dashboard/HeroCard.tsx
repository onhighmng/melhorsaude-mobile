import { Calendar } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';

interface HeroCardProps {
    setActiveTab: (tab: string) => void;
}

export function HeroCard({ setActiveTab }: HeroCardProps) {
    const progress = 0;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A90E2] via-[#5BA3F5] to-[#7CB8FF] p-8 md:p-12 shadow-lg">
            {/* Decorative Rainbow Arcs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[60px] border-white/10" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[60px] border-white/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[80px] border-white/5" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between items-center text-white/90 text-sm">
                        <span>Progresso Pessoal</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Sessions Count */}
                <div className="space-y-1">
                    <div className="text-white text-7xl">9</div>
                    <div className="text-white/90">Sessões</div>
                </div>

                {/* CTA Button */}
                <FlowButton
                    text="Falar com Especialista"
                    onClick={() => setActiveTab('calendar')}
                />
            </div>
        </div>
    );
}
