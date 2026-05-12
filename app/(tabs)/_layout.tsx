import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, Dimensions } from 'react-native';

const TAB_WIDTH = 232;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
          left: (SCREEN_WIDTH - TAB_WIDTH) / 2,
          width: TAB_WIDTH,
          height: 60,
          borderRadius: 32,
          backgroundColor: 'rgba(255,255,255,0.97)',
          borderTopWidth: 0,
          elevation: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.14,
          shadowRadius: 24,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.07)',
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          height: 60,
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
          tabBarActiveBackgroundColor: '#1565C0',
          tabBarItemStyle: {
            height: 60,
            borderRadius: 32,
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
            height: 60,
            borderRadius: 32,
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
            height: 60,
            borderRadius: 32,
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
            height: 60,
            borderRadius: 32,
          },
        }}
      />
      {/* Hidden tabs */}
      <Tabs.Screen name="explore"   options={{ href: null }} />
      <Tabs.Screen name="sessions"  options={{ href: null }} />
      <Tabs.Screen name="resources" options={{ href: null }} />
      <Tabs.Screen name="profile"   options={{ href: null }} />
    </Tabs>
  );
}
