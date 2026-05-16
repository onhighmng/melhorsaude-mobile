import { useCallback, useState } from 'react';

// Simplified hook that does nothing, effectively disabling web push notifications
// as we have migrated to in-app notifications.

type PushPermissionStatus =
  | 'idle'
  | 'checking'
  | 'pending'
  | 'granted'
  | 'denied'
  | 'unsupported'
  | 'error';

interface UsePushNotificationsResult {
  status: PushPermissionStatus;
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  enable: () => Promise<void>;
  subscription: PushSubscription | null;
}

export const usePushNotifications = (): UsePushNotificationsResult => {
  const [status] = useState<PushPermissionStatus>('idle');
  const [error] = useState<string | null>(null);

  // Always return false for support to prevent any UI from trying to activate it
  const isSupported = false;

  const enable = useCallback(async () => {
    console.log('Web Push Notifications are currently disabled in favor of in-app notifications.');
  }, []);

  return {
    status,
    isSupported,
    isSubscribed: false,
    isLoading: false,
    error,
    enable,
    subscription: null,
  };
};

export default usePushNotifications;


