import { useState } from 'react';
import { FullScreenModal } from './FullScreenModal';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, CheckCircle } from 'lucide-react';

interface NotificationHistoryModalProps {
    onClose: () => void;
}

// Explicit interface matching database usage
interface Notification {
    id: string;
    created_at: string;
    read: boolean;
    message?: string;
    title?: string;
    user_id?: string;
}

export function NotificationHistoryModal({ onClose }: NotificationHistoryModalProps) {
    const { notifications: rawNotifications, markAllAsRead, markAsRead } = useNotifications();
    const notifications = rawNotifications as unknown as Notification[];
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filteredNotifications = notifications.filter(n =>
        filter === 'all' ? true : !n.read
    );

    const handleMarkAll = async () => {
        await markAllAsRead();
    };

    return (
        <FullScreenModal
            title="Notificações"
            onClose={onClose}
            filters={
                <div className="flex gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Todas
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Não lidas
                        </button>
                    </div>
                </div>
            }
        >
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleMarkAll}
                        className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1.5"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Marcar todas como lidas
                    </button>
                </div>

                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-xl border transition-all hover:shadow-sm flex gap-4 ${notification.read ? 'bg-white border-gray-100' : 'bg-blue-50/50 border-blue-100'}`}
                                onClick={() => !notification.read && markAsRead(notification.id)}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.read ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm mb-1 ${notification.read ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                                        {notification.message || notification.title || 'Nova notificação'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(notification.created_at).toLocaleString('pt-PT')}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Sem notificações encontradas</p>
                        </div>
                    )}
                </div>
            </div>
        </FullScreenModal>
    );
}
