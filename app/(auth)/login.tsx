import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground, Image, ActivityIndicator, Alert, Modal,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const loginBg    = require('@/assets/images/login-bg.jpg');
const logoSymbol = require('@/assets/images/logo-symbol.png');
const logoText   = require('@/assets/images/logo-text.png');

export default function LoginScreen() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Forgot password
  const [showForgot, setShowForgot]       = useState(false);
  const [forgotEmail, setForgotEmail]     = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha o email e a senha.');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) Alert.alert('Erro ao entrar', error.message);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    setGoogleLoading(false);
    if (error) Alert.alert('Erro ao entrar com Google', error.message || 'Ocorreu um erro.');
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      Alert.alert('Erro', 'Insere o teu endereço de email.');
      return;
    }
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim());
    setForgotLoading(false);
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert(
        'Email enviado',
        'Verifica a tua caixa de entrada para redefinir a senha.',
        [{ text: 'OK', onPress: () => { setShowForgot(false); setForgotEmail(''); } }],
      );
    }
  };

  return (
    <ImageBackground source={loginBg} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.logoContainer}>
            <Image source={logoSymbol} style={styles.logoSymbol} resizeMode="contain" />
            <Image source={logoText} style={styles.logoText} resizeMode="contain" />
          </View>

          <Text style={styles.title}>Acesse sua conta</Text>

          <View style={styles.inputPill}>
            <TextInput
              style={styles.input}
              placeholder="Endereço de e-mail"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View style={[styles.inputPill, { marginTop: 12 }]}>
            <TextInput
              style={[styles.input, { paddingRight: 44 }]}
              placeholder="Senha"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotBtn} onPress={() => { setForgotEmail(email); setShowForgot(true); }}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleEmailLogin} disabled={loading} activeOpacity={0.85}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnPrimaryText}>Entrar</Text>}
          </TouchableOpacity>

          {/* Register */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>Registe-se aqui</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou continue com</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={[styles.btn, styles.btnGoogle]} onPress={handleGoogleLogin} disabled={googleLoading} activeOpacity={0.85}>
            {googleLoading ? (
              <ActivityIndicator color="#374151" />
            ) : (
              <>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleG}>G</Text>
                </View>
                <Text style={styles.btnGoogleText}>Continuar com Google</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.legalRow}>
            <Text style={styles.legalText}>Ao entrar, aceita os nossos </Text>
            <TouchableOpacity onPress={() => router.push('/terms' as never)}>
              <Text style={styles.legalLink}>Termos e Condições</Text>
            </TouchableOpacity>
            <Text style={styles.legalText}> e a </Text>
            <TouchableOpacity onPress={() => router.push('/privacy' as never)}>
              <Text style={styles.legalLink}>Política de Privacidade</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Forgot password modal */}
      <Modal visible={showForgot} transparent animationType="fade" onRequestClose={() => setShowForgot(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Redefinir senha</Text>
            <Text style={styles.modalSub}>Envia-nos o teu email e receberás um link para redefinir a senha.</Text>
            <View style={styles.modalInputPill}>
              <TextInput
                style={styles.modalInput}
                placeholder="Endereço de e-mail"
                placeholderTextColor="#9CA3AF"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoFocus
              />
            </View>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#000' }]}
              onPress={handleForgotPassword}
              disabled={forgotLoading}
              activeOpacity={0.85}
            >
              {forgotLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.modalBtnText}>Enviar link</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowForgot(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.15)' },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },
  logoContainer: { alignItems: 'center', marginBottom: 8, gap: 8 },
  logoSymbol: { width: 112, height: 112 },
  logoText: { width: '80%', height: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 32, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  inputPill: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1000, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4, justifyContent: 'center' },
  input: { paddingHorizontal: 20, paddingVertical: 16, fontSize: 16, color: '#000', textAlign: 'center', fontWeight: '500' },
  eyeBtn: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  forgotBtn: { alignSelf: 'center', marginTop: 12, marginBottom: 24 },
  forgotText: { color: '#fff', fontWeight: '600', fontSize: 15, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  btn: { borderRadius: 1000, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  btnPrimary: { backgroundColor: '#000', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 4 },
  btnPrimaryText: { color: '#fff', fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  registerText: { color: '#fff', fontSize: 14, fontWeight: '500', textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  registerLink: { color: '#fff', fontSize: 14, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  dividerText: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '500' },
  btnGoogle: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
  googleIcon: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  googleG: { fontSize: 16, fontWeight: '700', color: '#4285F4' },
  btnGoogleText: { color: '#374151', fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  legalRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 },
  legalText: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  legalLink: { color: '#fff', fontSize: 12, fontWeight: '700', textDecorationLine: 'underline' },

  // Forgot password modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalBox: { backgroundColor: '#fff', borderRadius: 24, padding: 28, width: '100%' },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 8 },
  modalSub: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 20 },
  modalInputPill: { backgroundColor: '#F3F4F6', borderRadius: 1000, marginBottom: 16 },
  modalInput: { paddingHorizontal: 20, paddingVertical: 14, fontSize: 15, color: '#111' },
  modalBtn: { height: 50, borderRadius: 1000, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  modalCancel: { alignItems: 'center', paddingVertical: 10 },
  modalCancelText: { fontSize: 15, color: '#9CA3AF', fontWeight: '600' },
});
