import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, Dimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

const TAB_WIDTH = 232;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const { isModalVisible } = useModal();
  const [hideTabBar, setHideTabBar] = useState(false);

  useEffect(() => {
    setHideTabBar(isModalVisible);
  }, [isModalVisible]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarStyle: {
          position: 'absolute',
          bottom: hideTabBar ? -100 : (20 + (Platform.OS === 'ios' ? insets.bottom : 0)),
          left: 0,
          right: 0,
          marginHorizontal: (SCREEN_WIDTH - TAB_WIDTH) / 2,
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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: { height: 0 },
        tabBarIconStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 48, height: 42, borderRadius: 24,
              backgroundColor: focused ? '#1565C0' : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={focused ? '#ffffff' : '#a3a3a3'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="assistente"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 48, height: 42, borderRadius: 24,
              backgroundColor: focused ? '#1565C0' : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} size={22} color={focused ? '#ffffff' : '#a3a3a3'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="meu-espaco"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 48, height: 42, borderRadius: 24,
              backgroundColor: focused ? '#1565C0' : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'grid' : 'grid-outline'} size={22} color={focused ? '#ffffff' : '#a3a3a3'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 48, height: 42, borderRadius: 24,
              backgroundColor: focused ? '#1565C0' : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={focused ? '#ffffff' : '#a3a3a3'} />
            </View>
          ),
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
