import '@fontsource/bebas-neue';
import '@fontsource/figtree';
import { Phone } from 'lucide-react';
import { SessionTypeIcons } from './SessionTypeIcons';

interface PillarCardProps {
    title: string;
    color: string;
    rotation?: number;
    onClick?: () => void;
}

export function PillarCard({ title, color, rotation = 0, onClick }: PillarCardProps) {
    return (
        <div
            className="relative bg-white rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-8 cursor-pointer transition-transform hover:scale-[1.02]"
            style={{
                backgroundColor: color,
                transform: `rotate(${rotation}deg)`,
                height: '346px',
                width: '100%',
                maxWidth: '353px',
            }}
            onClick={onClick}
        >
            {/* Session type icons at top */}
            <div className="mb-6">
                <SessionTypeIcons />
            </div>

            {/* Title and arrow button */}
            <div className="flex justify-between items-start">
                <h3
                    className="text-[26px] leading-[32px] tracking-[0.0703px] text-[#101828] uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    {title}
                </h3>

                {/* Arrow button */}
                <div className="bg-white rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-14 h-14 flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.99892 6.99892H16.9974V16.9974" stroke="#101828" strokeWidth="1.99969" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.99892 16.9974L16.9974 6.99892" stroke="#101828" strokeWidth="1.99969" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
