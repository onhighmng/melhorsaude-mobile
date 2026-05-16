import { Bell } from 'lucide-react';

interface NotificationsCardProps {
    setActiveTab: (tab: string) => void;
}

export function NotificationsCard({ setActiveTab }: NotificationsCardProps) {
    return (
        <button
            onClick={() => setActiveTab('settings')}
            className="w-full text-left bg-gradient-to-br from-[#E8F4F8] to-[#D6EEFF] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="space-y-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Bell className="w-8 h-8 text-gray-900" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                    <h3 className="text-gray-900">Notificações</h3>
                    <p className="text-gray-700 text-sm">
                        Fique atualizado com as suas últimas atividades
                    </p>
                </div>
            </div>
        </button>
    );
}
