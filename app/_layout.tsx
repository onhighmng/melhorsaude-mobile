import { useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { usePushNotifications } from '@/hooks/use-push-notifications';

function RootNavigator() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  usePushNotifications(session?.user?.id);

  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === '(auth)';
    if (!session && !inAuth) {
      router.replace('/(auth)/login');
    } else if (session && inAuth) {
      router.replace('/(tabs)');
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator color="#2563EB" size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
