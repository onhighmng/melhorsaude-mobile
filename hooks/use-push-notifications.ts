import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} catch (e) {
  console.warn('Push notifications not available');
}

async function registerPushToken(userId: string) {
  if (Platform.OS === 'web') return;

  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;

    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') return;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    const tokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );

    await supabase
      .from('push_subscriptions')
      .upsert(
        { user_id: userId, subscription: { expo_token: tokenData.data } },
        { onConflict: 'user_id' }
      );
  } catch (error) {
    console.warn('Push token registration failed:', error);
  }
}

// Maps the screen value sent in notification data to an app route
function resolveRoute(screen: string, data?: Record<string, unknown>): string {
  switch (screen) {
    case 'daily-pulse':
      return '/(tabs)/';
    case 'pulse-break': {
      const sessionId = data?.session_id as string | undefined;
      const interventionType = data?.intervention_type as string | undefined;
      if (sessionId && interventionType) {
        return `/pulse-break?session_id=${encodeURIComponent(sessionId)}&intervention_type=${encodeURIComponent(interventionType)}`;
      }
      return '/(tabs)/';
    }
    case 'weekly-pulse':
      return '/(tabs)/?pulse=1';
    default:
      return '/(tabs)/';
  }
}

export function usePushNotifications(userId: string | undefined) {
  const router = useRouter();
  const notificationListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
  const responseListener = useRef<ReturnType<typeof Notifications.addNotificationResponseReceivedListener>>();

  useEffect(() => {
    if (!userId) return;

    registerPushToken(userId);

    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      // No-op — notification banner is shown automatically
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as Record<string, unknown> | undefined;
      const screen = data?.screen as string | undefined;
      const route = resolveRoute(screen ?? '', data);
      router.push(route as any);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [userId]);
}
