import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface FullScreenModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    filters?: ReactNode;
}

export function FullScreenModal({ title, onClose, children, filters }: FullScreenModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in duration-200">
            <div className="w-full max-w-6xl h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[28px] font-bold text-[#1a1a1a] font-['Syne',sans-serif]">{title}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {filters && <div className="flex gap-2">{filters}</div>}
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors border border-gray-100"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
                    {children}
                </div>
            </div>
        </div>
    );
}
