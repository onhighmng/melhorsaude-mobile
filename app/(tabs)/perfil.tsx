import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/lib/supabase';
import { FONT_PACIFICO, FONT_POPPINS, FONT_POPPINS_500, FONT_JAKARTA_700 } from '@/lib/fonts';

const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';

type Language = 'pt' | 'en';

export default function PerfilScreen() {
  const { session, signOut } = useAuth();
  const { profile } = useProfile();
  const insets = useSafeAreaInsets();

  // Profile editing
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [name, setName]           = useState(profile?.full_name || '');
  const [phone, setPhone]         = useState(profile?.phone || '');

  // Password change
  const [showSecurity, setShowSecurity]   = useState(false);
  const [currentPw, setCurrentPw]         = useState('');
  const [newPw, setNewPw]                 = useState('');
  const [confirmPw, setConfirmPw]         = useState('');
  const [changingPw, setChangingPw]       = useState(false);

  // Language
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const email    = session?.user?.email || '';
  const initials = (name || email).charAt(0).toUpperCase() || 'U';

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name, phone })
      .eq('id', session?.user?.id);
    setSaving(false);
    if (error) Alert.alert('Erro', error.message);
    else setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (!newPw || !confirmPw) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (newPw !== confirmPw) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    if (newPw.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setChangingPw(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setChangingPw(false);
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
      setShowSecurity(false);
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Terminar Sessão',
      'Tens a certeza que queres terminar a sessão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Terminar', style: 'destructive', onPress: signOut },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 20, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header tag + title */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>CONFIGURAÇÕES</Text>
        </View>
        <Text style={styles.pageTitle}>O Meu Perfil</Text>

        {/* ── Avatar card */}
        <View style={styles.avatarCard}>
          <LinearGradient
            colors={['#1565C0', '#0046a2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarCircle}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.avatarName} numberOfLines={1}>{name || 'Utilizador'}</Text>
            <Text style={styles.avatarEmail} numberOfLines={1}>{email}</Text>
          </View>
        </View>

        {/* ── Personal Info */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionLabel}>INFORMAÇÕES ATUAIS</Text>
            {!isEditing && (
              <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)} activeOpacity={0.7}>
                <Ionicons name="pencil" size={12} color="#1565C0" />
                <Text style={styles.editBtnText}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View style={{ gap: 14 }}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>NOME</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Nome completo"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <TextInput
                  style={[styles.fieldInput, { opacity: 0.5 }]}
                  value={email}
                  editable={false}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>TELEFONE</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+258 ..."
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formBtns}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
                  {saving
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.saveBtnText}>Guardar</Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelEditBtn}
                  onPress={() => { setIsEditing(false); setName(profile?.full_name || ''); setPhone(profile?.phone || ''); }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelEditText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {[
                { icon: 'person-outline' as const, label: 'NOME',     value: name || '—'  },
                { icon: 'mail-outline'   as const, label: 'EMAIL',    value: email || '—' },
                { icon: 'call-outline'   as const, label: 'TELEFONE', value: phone || '—' },
              ].map((row, i, arr) => (
                <View key={row.label} style={[styles.infoRow, i < arr.length - 1 && styles.infoRowBorder]}>
                  <View style={styles.infoIconBox}>
                    <Ionicons name={row.icon} size={17} color="#1565C0" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>{row.label}</Text>
                    <Text style={styles.infoValue} numberOfLines={1}>{row.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Security */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionTop}
            onPress={() => setShowSecurity(!showSecurity)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.secIcon}>
                <Ionicons name="lock-closed" size={16} color="#1565C0" />
              </View>
              <Text style={styles.sectionTitle}>Segurança</Text>
            </View>
            <Ionicons name={showSecurity ? 'chevron-up' : 'chevron-down'} size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {showSecurity && (
            <View style={{ gap: 14, marginTop: 16 }}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>SENHA ATUAL</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={currentPw}
                  onChangeText={setCurrentPw}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>NOVA SENHA</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={newPw}
                  onChangeText={setNewPw}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>CONFIRMAR NOVA SENHA</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={confirmPw}
                  onChangeText={setConfirmPw}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={[styles.saveBtn, { marginTop: 4 }]}
                onPress={handleChangePassword}
                disabled={changingPw}
                activeOpacity={0.85}
              >
                {changingPw
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.saveBtnText}>Alterar Senha</Text>
                }
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── Language */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.secIcon}>
                <Ionicons name="globe-outline" size={16} color="#1565C0" />
              </View>
              <Text style={styles.sectionTitle}>Idioma</Text>
            </View>
          </View>
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langCard, language === 'pt' && styles.langCardActive]}
              onPress={() => setLanguage('pt')}
              activeOpacity={0.8}
            >
              <Text style={styles.langFlag}>🇵🇹</Text>
              <Text style={[styles.langText, language === 'pt' && styles.langTextActive]}>Português</Text>
              {language === 'pt' && <Ionicons name="checkmark-circle" size={18} color="#1565C0" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langCard, language === 'en' && styles.langCardActive]}
              onPress={() => setLanguage('en')}
              activeOpacity={0.8}
            >
              <Text style={styles.langFlag}>🇬🇧</Text>
              <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>English</Text>
              {language === 'en' && <Ionicons name="checkmark-circle" size={18} color="#1565C0" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.signOutText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scroll: { paddingHorizontal: 24 },

  tag: {
    backgroundColor: CARD_EL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagText: { fontSize: 10, fontFamily: FONT_JAKARTA_700, color: '#474747', letterSpacing: 2, textTransform: 'uppercase' },
  pageTitle: { fontSize: 36, fontFamily: FONT_PACIFICO, color: '#0a0a0a', marginBottom: 24 },

  // Avatar card
  avatarCard: {
    backgroundColor: CARD,
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 28, fontWeight: '900', color: '#fff' },
  avatarName: { fontSize: 20, fontFamily: FONT_JAKARTA_700, color: '#1a1a1a' },
  avatarEmail: { fontSize: 14, fontFamily: FONT_POPPINS, color: '#474747', opacity: 0.7, marginTop: 3 },

  // Section card
  section: {
    backgroundColor: CARD,
    borderRadius: 28,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    gap: 0,
  },
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#474747',
    letterSpacing: 2,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  secIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  editBtnText: { fontSize: 12, fontWeight: '700', color: '#1565C0' },

  // Info rows
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#474747',
    letterSpacing: 1.5,
    opacity: 0.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  infoValue: { fontSize: 15, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a' },

  // Edit form fields
  field: { gap: 6 },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#474747',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 4,
    opacity: 0.7,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#0a0a0a',
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  formBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cancelEditBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  cancelEditText: { color: '#0a0a0a', fontSize: 15, fontWeight: '700' },

  // Language
  langRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  langCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  langCardActive: { borderColor: '#1565C0', backgroundColor: '#EFF6FF' },
  langFlag: { fontSize: 22 },
  langText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#474747' },
  langTextActive: { color: '#1565C0' },

  // Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginTop: 8,
  },
  signOutText: { fontSize: 16, fontWeight: '700', color: '#ef4444' },
});
