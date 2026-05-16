import { X, CalendarCheck, Bell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
// DISABLED: import from 'react-router-dom';

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const mappedNotifications = useMemo(() => {
    return notifications.map((notification) => {
      const meta = (notification.meta ?? {}) as Record<string, any>;
      const bookingId = meta.booking_id as string | undefined;
      const relativeTime = (() => {
        try {
          return formatDistanceToNow(new Date(notification.created_at), {
            addSuffix: true,
            locale: pt,
          });
        } catch (error) {
          if (process.env.DEV) {
            console.debug("Falha ao formatar tempo relativo da notificação", error);
          }
          return '';
        }
      })();

      let accent = 'bg-purple-100 text-purple-600';
      let icon = Bell;
      let actionLabel: string | undefined;
      let actionHref = notification.action_url ?? undefined;

      if (bookingId && !actionHref) {
        actionHref = `/especialista/sessoes?highlight=${bookingId}`;
      }

      switch (notification.type) {
        case 'session_completed_specialist':
          accent = 'bg-green-100 text-green-600';
          icon = CheckCircle2;
          actionLabel = 'Ver sessão';
          break;
        case 'session_completed':
          accent = 'bg-blue-100 text-blue-600';
          icon = CalendarCheck;
          actionLabel = actionHref ? 'Detalhes' : undefined;
          break;
        default:
          accent = 'bg-orange-100 text-orange-600';
          icon = AlertCircle;
          break;
      }

      return {
        id: notification.id,
        title: notification.title,
        description: notification.body ?? '',
        timestamp: relativeTime,
        accent,
        icon,
        actionHref,
        actionLabel,
        isUnread: !notification.is_read,
      };
    });
  }, [notifications]);

  const hasUnread = useMemo(
    () => mappedNotifications.some((notification) => notification.isUnread),
    [mappedNotifications]
  );

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleClose}
      >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-gray-900">Notificações recentes</h2>
            <p className="text-sm text-gray-500 mt-1">
              Veja os alertas mais recentes sobre pedidos e sessões.
            </p>
            {hasUnread && (
              <button
                onClick={() => markAllAsRead()}
                className="mt-3 text-xs text-blue-600 hover:text-blue-700 transition-colors"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-pill">
          {loading ? (
            <div className="text-sm text-gray-500 text-center py-6">
              A carregar notificações...
            </div>
          ) : mappedNotifications.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6">
              Sem notificações no momento.
            </div>
          ) : (
            mappedNotifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`flex gap-3 rounded-2xl border px-4 py-4 transition-colors ${
                    notification.isUnread ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100 bg-gray-50/60'
                  } ${index !== mappedNotifications.length - 1 ? '' : ''}`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${notification.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-gray-900 text-sm font-medium">{notification.title}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{notification.timestamp}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {notification.description}
                    </p>
                    {(notification.actionLabel || notification.isUnread) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {notification.actionLabel && notification.actionHref && (
                          <button
                            onClick={async () => {
                              await markAsRead(notification.id);
                              handleClose();
                              navigate(notification.actionHref!);
                            }}
                            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            {notification.actionLabel}
                          </button>
                        )}
                        {notification.isUnread && (
                          <button
                            onClick={async () => {
                              await markAsRead(notification.id);
                            }}
                            className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                          >
                            Marcar como lida
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}