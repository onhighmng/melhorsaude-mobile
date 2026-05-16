import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { Edit, User, Mail, Phone, Lock, Bell, ChevronUp, ChevronDown, Globe, CheckCircle2, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/lib/supabase';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS, GRADIENT } from '@/lib/design-tokens';

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

  // Language — initialise from profile metadata, persist on change
  const [language, setLanguage] = useState<Language>(
    (profile?.metadata as any)?.language ?? 'pt'
  );

  // Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; title: string; body: string; created_at: string; read: boolean }[]>([]);

  useEffect(() => {
    if (!showNotifications || !session?.user?.id) return;
    const userId = session.user.id;
    (supabase.from('notifications') as any)
      .select('id, title, body, created_at, read')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }: any) => {
        setNotifications(data || []);
        // Mark all unread as read
        const unreadIds = (data || []).filter((n: any) => !n.read).map((n: any) => n.id);
        if (unreadIds.length > 0) {
          (supabase.from('notifications') as any)
            .update({ read: true })
            .in('id', unreadIds)
            .then(() => {});
        }
      });
  }, [showNotifications, session?.user?.id]);

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
    if (!currentPw || !newPw || !confirmPw) {
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
    // Verify current password by re-signing in
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: session?.user?.email ?? '',
      password: currentPw,
    });
    if (verifyError) {
      setChangingPw(false);
      Alert.alert('Erro', 'Senha atual incorreta.');
      return;
    }
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
    <LinearGradient colors={GRADIENT.BG_GRADIENT.colors} start={GRADIENT.BG_GRADIENT.start} end={GRADIENT.BG_GRADIENT.end} style={styles.container}>
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
            colors={[COLORS.PRIMARY, COLORS.PRIMARY_DARK]}
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

        {/* ── Notifications */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionTop}
            onPress={() => setShowNotifications(!showNotifications)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.secIcon}>
                <Bell size={16} color={COLORS.PRIMARY} />
              </View>
              <Text style={styles.sectionTitle}>Notificações</Text>
            </View>
            {showNotifications ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
          </TouchableOpacity>

          {showNotifications && (
            <View style={{ marginTop: 12, gap: 10 }}>
              {notifications.length === 0 ? (
                <View style={styles.notifEmpty}>
                  <Bell size={28} color="#D1D5DB" />
                  <Text style={styles.notifEmptyText}>Sem notificações</Text>
                </View>
              ) : (
                notifications.map((n) => (
                  <View key={n.id} style={[styles.notifRow, !n.read && styles.notifRowUnread]}>
                    <View style={[styles.notifDot, !n.read && { backgroundColor: COLORS.PRIMARY }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.notifTitle}>{n.title}</Text>
                      {n.body ? <Text style={styles.notifBody} numberOfLines={2}>{n.body}</Text> : null}
                      <Text style={styles.notifDate}>
                        {new Date(n.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
        </View>

        {/* ── Personal Info */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionLabel}>INFORMAÇÕES ATUAIS</Text>
            {!isEditing && (
              <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)} activeOpacity={0.7}>
                <Edit size={12} color={COLORS.PRIMARY} />
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
                { icon: 'user', label: 'NOME',     value: name || '—' },
                { icon: 'mail', label: 'EMAIL',    value: email || '—' },
                { icon: 'phone', label: 'TELEFONE', value: phone || '—' },
              ].map((row, i, arr) => {
                const iconMap: Record<string, React.ReactNode> = {
                  user: <User size={17} color={COLORS.PRIMARY} />,
                  mail: <Mail size={17} color={COLORS.PRIMARY} />,
                  phone: <Phone size={17} color={COLORS.PRIMARY} />,
                };
                return (
                  <View key={row.label} style={[styles.infoRow, i < arr.length - 1 && styles.infoRowBorder]}>
                    <View style={styles.infoIconBox}>
                      {iconMap[row.icon]}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoLabel}>{row.label}</Text>
                      <Text style={styles.infoValue} numberOfLines={1}>{row.value}</Text>
                    </View>
                  </View>
                );
              })}
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
                <Lock size={16} color={COLORS.PRIMARY} />
              </View>
              <Text style={styles.sectionTitle}>Segurança</Text>
            </View>
            {showSecurity ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
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
                <Globe size={16} color={COLORS.PRIMARY} />
              </View>
              <Text style={styles.sectionTitle}>Idioma</Text>
            </View>
          </View>
          <View style={styles.langRow}>
            {(['pt', 'en'] as Language[]).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langCard, language === lang && styles.langCardActive]}
                onPress={async () => {
                  setLanguage(lang);
                  if (!session?.user?.id) return;
                  const currentMeta = (profile?.metadata as any) ?? {};
                  await supabase
                    .from('profiles')
                    .update({ metadata: { ...currentMeta, language: lang } })
                    .eq('id', session.user.id);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.langFlag}>{lang === 'pt' ? '🇵🇹' : '🇬🇧'}</Text>
                <Text style={[styles.langText, language === lang && styles.langTextActive]}>
                  {lang === 'pt' ? 'Português' : 'English'}
                </Text>
                {language === lang && <CheckCircle2 size={18} color={COLORS.PRIMARY} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <LogOut size={20} color={COLORS.ERROR} />
          <Text style={styles.signOutText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },
  scroll: { paddingHorizontal: SPACING.lg },

  tag: {
    backgroundColor: COLORS.CARD_EL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  tagText: { fontSize: 10, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_SECONDARY, letterSpacing: 2, textTransform: 'uppercase' },
  pageTitle: { fontSize: 36, fontFamily: TYPOGRAPHY.PACIFICO, color: COLORS.TEXT_PRIMARY, marginBottom: 24 },

  // Avatar card
  avatarCard: {
    backgroundColor: COLORS.CARD,
    borderRadius: 32,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
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
  avatarName: { fontSize: 20, fontFamily: TYPOGRAPHY.JAKARTA_700, color: '#1a1a1a' },
  avatarEmail: { fontSize: 14, fontFamily: TYPOGRAPHY.POPPINS_400, color: COLORS.TEXT_SECONDARY, opacity: 0.7, marginTop: 3 },

  // Section card
  section: {
    backgroundColor: COLORS.CARD,
    borderRadius: 28,
    padding: 22,
    marginBottom: 14,
    gap: 0,
    ...SHADOWS.md,
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
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 2,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.TEXT_PRIMARY },
  secIcon: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
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
    borderRadius: RADIUS.full,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  editBtnText: { fontSize: 12, fontWeight: '700', color: COLORS.PRIMARY },

  // Info rows
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.lg, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.BORDER },
  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 1.5,
    opacity: 0.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  infoValue: { fontSize: 15, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY },

  // Edit form fields
  field: { gap: 6 },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 4,
    opacity: 0.7,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
  },
  formBtns: { flexDirection: 'row', gap: SPACING.md, marginTop: 4 },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cancelEditBtn: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  cancelEditText: { color: COLORS.TEXT_PRIMARY, fontSize: 15, fontWeight: '700' },

  // Language
  langRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: 14 },
  langCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: COLORS.BORDER,
  },
  langCardActive: { borderColor: COLORS.PRIMARY, backgroundColor: '#EFF6FF' },
  langFlag: { fontSize: 22 },
  langText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.TEXT_SECONDARY },
  langTextActive: { color: COLORS.PRIMARY },

  // Notifications
  notifEmpty: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  notifEmptyText: { fontSize: 14, color: COLORS.TEXT_SECONDARY, fontFamily: TYPOGRAPHY.POPPINS_400 },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
  },
  notifRowUnread: { backgroundColor: '#EFF6FF' },
  notifDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginTop: 5, flexShrink: 0,
  },
  notifTitle: { fontSize: 14, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY, marginBottom: 2 },
  notifBody: { fontSize: 13, color: COLORS.TEXT_SECONDARY, lineHeight: 18 },
  notifDate: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },

  // Sign out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginTop: 8,
  },
  signOutText: { fontSize: 16, fontWeight: '700', color: COLORS.ERROR },
});
