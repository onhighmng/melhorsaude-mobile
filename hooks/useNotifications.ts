import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';
// DISABLED: import from 'sonner';

// Redefine locally if needed to match actual DB
export interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  action_url?: string | null;
  meta?: any;
  created_at: string;
}

export type NotificationEntry = NotificationRow;

interface UseNotificationsResult {
  notifications: NotificationEntry[];
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useNotifications(): UseNotificationsResult {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const profileId = profile?.id ?? null;

  const fetchNotifications = useCallback(async () => {
    if (!profileId) {
      setNotifications([]);
      return;
    }

    if (!isSupported) {
      setNotifications([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profileId)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST204') {
          console.warn('[notifications] Table not available, disabling notifications UI');
          setIsSupported(false);
          setNotifications([]);
          return;
        }
        throw error;
      }
      // Cast to match our interface
      setNotifications((data as any[]) ?? []);
    } catch (error) {
      console.error('[notifications] Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  }, [profileId, isSupported]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!profileId || !isSupported) return;

    const channel = supabase
      .channel('notifications-feed')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profileId}`,
        },
        (payload) => {
          setNotifications((prev) => {
            if (payload.eventType === 'INSERT' && payload.new) {
              const newNotification = payload.new as any; // Cast to any to avoid strict type checks on partials

              // Trigger in-app toast
              toast(newNotification.title || 'Nova notificação', {
                description: newNotification.body,
                action: newNotification.action_url ? {
                  label: 'Ver',
                  onClick: () => window.location.href = newNotification.action_url
                } : undefined,
              });

              // Add property if missing for consistency
              if (newNotification.read === undefined) newNotification.read = false;

              const next = [newNotification as NotificationEntry, ...prev];
              return dedupeNotifications(next);
            }

            if (payload.eventType === 'UPDATE' && payload.new) {
              const updated = payload.new as any;
              return prev.map((notification) =>
                notification.id === updated.id ? (updated as NotificationEntry) : notification
              );
            }

            if (payload.eventType === 'DELETE' && payload.old) {
              return prev.filter((notification) => notification.id !== payload.old.id);
            }

            return prev;
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          // no-op
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileId, isSupported]);

  const markAsRead = useCallback(
    async (id: string) => {
      if (!isSupported) return;
      try {
        await supabase.from('notifications').update({ read: true } as any).eq('id', id);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        );
      } catch (error) {
        console.error('[notifications] Failed to mark notification as read', error);
      }
    },
    []
  );

  const markAllAsRead = useCallback(async () => {
    if (!profileId || !isSupported) return;
    try {
      await supabase.from('notifications').update({ read: true } as any).eq('user_id', profileId);
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error('[notifications] Failed to mark all notifications as read', error);
    }
  }, [profileId, isSupported]);

  return useMemo(
    () => ({
      notifications,
      loading,
      markAsRead,
      markAllAsRead,
      refetch: fetchNotifications,
    }),
    [notifications, loading, markAsRead, markAllAsRead, fetchNotifications]
  );
}

function dedupeNotifications(rows: NotificationRow[]): NotificationRow[] {
  const seen = new Set<string>();
  const result: NotificationRow[] = [];
  for (const row of rows) {
    if (!seen.has(row.id)) {
      seen.add(row.id);
      result.push(row);
    }
  }
  return result;
}


