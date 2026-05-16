import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Check, Clock } from 'lucide-react';
// DISABLED: import from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

export function NotificationsContent() {
    const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

    const unreadCount = notifications.filter(n => !n.is_read).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-24 md:pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-900 text-3xl md:text-4xl font-serif">Notificações</h1>
                    <p className="text-gray-600 mt-2">
                        Fique a par das suas últimas atualizações
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={() => markAllAsRead()}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <Check className="w-4 h-4" />
                        Marcar todas como lidas
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-gray-900 font-medium text-lg">Sem notificações</h3>
                        <p className="text-gray-500 mt-1">
                            Não tem notificações novas no momento.
                        </p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}


                            className={`relative p-4 md:p-6 rounded-2xl border transition-all ${notification.is_read
                                ? 'bg-white border-gray-100'
                                : 'bg-blue-50/50 border-blue-100 shadow-sm'
                                }`}
                            onClick={() => !notification.is_read && markAsRead(notification.id)}
                        >
                            <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'booking' ? 'bg-green-100 text-green-600' :
                                    notification.type === 'system' ? 'bg-blue-100 text-blue-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className={`font-medium text-base md:text-lg ${notification.is_read ? 'text-gray-900' : 'text-blue-900'
                                            }`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
                                            <Clock className="w-3 h-3" />
                                            {formatDistanceToNow(new Date(notification.created_at), {
                                                addSuffix: true,
                                                locale: pt,
                                            })}
                                        </span>
                                    </div>
                                    <p className={`mt-1 text-sm md:text-base ${notification.is_read ? 'text-gray-600' : 'text-blue-800'
                                        }`}>
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.is_read && (
                                    <div className="absolute top-6 right-6 w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
