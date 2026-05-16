import { Calendar } from 'lucide-react';

interface SessionHistoryCardProps {
    setActiveTab: (tab: string) => void;
}

export function SessionHistoryCard({ setActiveTab }: SessionHistoryCardProps) {
    return (
        <button
            onClick={() => setActiveTab('journey')}
            className="w-full text-left bg-gradient-to-br from-[#F0F8FF] to-[#E8F4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="space-y-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-gray-900" />
                </div>

                {/* Title */}
                <div className="space-y-1">
                    <h3 className="text-gray-900">Histórico de Sessões</h3>
                    <p className="text-gray-600 text-sm">4 sessões concluídas</p>
                </div>
            </div>
        </button>
    );
}
