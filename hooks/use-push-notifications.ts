import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from '@/lib/supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerPushToken(userId: string) {
  if (Platform.OS === 'web') return;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return;

  const projectId = Constants.expoConfig?.extra?.eas?.projectId
    ?? Constants.easConfig?.projectId;

  const tokenData = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined
  );

  const expoToken = tokenData.data;

  await supabase
    .from('push_subscriptions')
    .upsert(
      { user_id: userId, subscription: { expo_token: expoToken } },
      { onConflict: 'user_id' }
    );
}

export function usePushNotifications(userId: string | undefined) {
  const notificationListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
  const responseListener = useRef<ReturnType<typeof Notifications.addNotificationResponseReceivedListener>>();

  useEffect(() => {
    if (!userId) return;

    registerPushToken(userId);

    // Fires when a notification arrives while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(() => {});

    // Fires when user taps a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const screen = response.notification.request.content.data?.screen as string | undefined;
      if (screen) {
        // Navigation is handled by the app via expo-router
        // The screen value matches a route: /pulse, /weekly-pulse, /pulse-break
        console.log('Notification tapped, navigate to:', screen);
      }
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [userId]);
}
