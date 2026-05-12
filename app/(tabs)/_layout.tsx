import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20 + (Platform.OS === 'ios' ? insets.bottom : 0),
          left: '50%',
          transform: [{ translateX: -112 }],
          width: 224,
          height: 56,
          borderRadius: 32,
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.08)',
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          height: 56,
          padding: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={focused ? '#ffffff' : '#a3a3a3'}
            />
          ),
          tabBarActiveTintColor: '#ffffff',
          tabBarActiveBackgroundColor: '#1565C0',
          tabBarItemStyle: {
            height: 56,
            borderRadius: 32,
            margin: 0,
          },
        }}
      />
      <Tabs.Screen
        name="assistente"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubble' : 'chatbubble-outline'}
              size={22}
              color={focused ? '#ffffff' : '#a3a3a3'}
            />
          ),
          tabBarActiveBackgroundColor: '#1565C0',
          tabBarItemStyle: {
            height: 56,
            borderRadius: 32,
            margin: 0,
          },
        }}
      />
      <Tabs.Screen
        name="meu-espaco"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={22}
              color={focused ? '#ffffff' : '#a3a3a3'}
            />
          ),
          tabBarActiveBackgroundColor: '#1565C0',
          tabBarItemStyle: {
            height: 56,
            borderRadius: 32,
            margin: 0,
          },
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={focused ? '#ffffff' : '#a3a3a3'}
            />
          ),
          tabBarActiveBackgroundColor: '#1565C0',
          tabBarItemStyle: {
            height: 56,
            borderRadius: 32,
            margin: 0,
          },
        }}
      />
      {/* Hide old tabs */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="sessions" options={{ href: null }} />
      <Tabs.Screen name="resources" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
