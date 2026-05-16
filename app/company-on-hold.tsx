import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const COPY = {
  pt: {
    tag: 'Subscrição Pausada',
    title: 'Conta Temporariamente\nSuspensa',
    body: 'A subscrição da sua empresa encontra-se atualmente em pausa.\n\nO acesso à plataforma está temporariamente indisponível. Por favor, contacte o administrador da sua empresa para mais informações e aguarde novas instruções.',
    button: 'Voltar ao Login',
    toggle: 'View in English',
  },
  en: {
    tag: 'Subscription on Hold',
    title: 'Account Temporarily\nSuspended',
    body: "Your company's subscription is currently on hold.\n\nAccess to the platform is temporarily unavailable. Please contact your company administrator for more information and await further instructions.",
    button: 'Back to Login',
    toggle: 'Ver em Português',
  },
} as const;

const BRAND = '#1565C0';

export default function CompanyOnHoldScreen() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const { signOut } = useAuth();
  const router = useRouter();
  const c = COPY[lang];

  const handleBack = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/melhor-saude-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Card */}
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>⏸️</Text>
          </View>

          {/* Tag */}
          <View style={styles.tagWrap}>
            <Text style={styles.tagText}>{c.tag}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{c.title}</Text>

          {/* Body */}
          <Text style={styles.body}>{c.body}</Text>

          {/* Back button */}
          <TouchableOpacity style={styles.button} onPress={handleBack} activeOpacity={0.85}>
            <Text style={styles.buttonText}>{c.button}</Text>
          </TouchableOpacity>

          {/* Language toggle */}
          <TouchableOpacity onPress={() => setLang(lang === 'pt' ? 'en' : 'pt')} activeOpacity={0.7}>
            <Text style={styles.toggleText}>{c.toggle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    height: 48,
    width: 120,
    marginBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 32,
  },
  tagWrap: {
    backgroundColor: '#fffbeb',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 16,
  },
  tagText: {
    color: '#d97706',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Pacifico_400Regular',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 20,
  },
  body: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_400Regular',
    color: '#474747',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    backgroundColor: BRAND,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: BRAND,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontWeight: '700',
  },
  toggleText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_400Regular',
    color: BRAND,
    opacity: 0.6,
  },
});
