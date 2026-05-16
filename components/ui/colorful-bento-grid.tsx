import { cn } from "@/lib/utils";
import { Brain, Activity, Wallet, Scale, ArrowRight } from 'lucide-react';

interface BentoCardProps {
    title: string;
    subtitle: string;
    bgColor: string;
    icon?: React.ReactNode;
    rotation: string;
    hoverScale: string;
    hoverRotation: string;
    className?: string;
    onClick: () => void;
    textColor?: string;
    colSpan?: string;
}

const BentoCard = ({
    title,
    subtitle,
    bgColor,
    icon,
    rotation,
    hoverScale,
    hoverRotation,
    className,
    onClick,
    textColor = 'text-[#101828]',
    colSpan = "",
}: BentoCardProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "overflow-hidden transition-all duration-300 ease-out relative rounded-[32px] flex flex-col items-between justify-between p-8 cursor-pointer shadow-sm hover:shadow-xl group",
                bgColor,
                rotation,
                hoverScale,
                hoverRotation,
                colSpan,
                className
            )}
        >
            <div className="flex justify-between items-start w-full z-10">
                <div className="flex flex-col items-start gap-2">
                    <h3 className={cn("text-[26px] font-bebas tracking-[0.07px] leading-tight", textColor)}>
                        {title}
                    </h3>
                    <p className={cn("text-xs font-inter font-medium opacity-80 text-left", textColor)}>
                        {subtitle}
                    </p>
                </div>
                <div className="bg-white/90 p-3 rounded-full shadow-sm">
                    {icon}
                </div>
            </div>

            <div className="w-full flex justify-end items-center mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <ArrowRight className={cn("w-5 h-5", textColor)} />
                </div>
            </div>
        </button>
    );
};

export const ColorfulBentoGrid = ({ onNavigate }: { onNavigate: (pillar: string) => void }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[353px] mx-auto pb-32">
            {/* Card 1: Saúde Mental */}
            <BentoCard
                title="Saúde Mental"
                subtitle="Apoio psicológico e bem-estar emocional."
                bgColor="bg-[#a8c8e8]"
                icon={<Brain className="w-6 h-6 text-[#101828]" />}
                rotation="rotate-[0deg]" // Reset rotation for grid but keep style
                hoverScale="active:scale-[0.98]"
                hoverRotation="hover:rotate-1"
                className="h-[180px] col-span-2"
                onClick={() => onNavigate('mental')}
            />

            {/* Card 2: Bem-estar Físico */}
            <BentoCard
                title="Bem-estar Físico"
                subtitle="Exercício e nutrição."
                bgColor="bg-[#f4c190]"
                icon={<Activity className="w-6 h-6 text-[#101828]" />}
                rotation="rotate-[0deg]"
                hoverScale="active:scale-[0.98]"
                hoverRotation="hover:-rotate-1"
                className="h-[200px]"
                onClick={() => onNavigate('fisico')}
            />

            {/* Card 3: Financeira */}
            <BentoCard
                title="Financeira"
                subtitle="Gestão e planeamento."
                bgColor="bg-[#8fcdc5]"
                icon={<Wallet className="w-6 h-6 text-[#101828]" />}
                rotation="rotate-[0deg]"
                hoverScale="active:scale-[0.98]"
                hoverRotation="hover:rotate-1"
                className="h-[200px]"
                onClick={() => onNavigate('financeira')}
            />

            {/* Card 4: Apoio Jurídico */}
            <BentoCard
                title="Apoio Jurídico"
                subtitle="Aconselhamento legal especializado."
                bgColor="bg-[#efa8c8]"
                icon={<Scale className="w-6 h-6 text-[#101828]" />}
                rotation="rotate-[0deg]"
                hoverScale="active:scale-[0.98]"
                hoverRotation="hover:-rotate-1"
                className="h-[160px] col-span-2"
                onClick={() => onNavigate('juridica')}
            />
        </div>
    );
};
