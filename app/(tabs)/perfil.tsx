import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/lib/supabase';

const CARD = '#f2f1ef';
const CARD_EL = '#ecece7';

export default function PerfilScreen() {
  const { session, signOut } = useAuth();
  const { profile } = useProfile();
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const email = session?.user?.email || '';
  const initials = name.charAt(0).toUpperCase() || email.charAt(0).toUpperCase() || 'U';

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name, phone: phone })
      .eq('id', session?.user?.id);
    setSaving(false);
    if (error) Alert.alert('Erro', error.message);
    else setIsEditing(false);
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
        {/* Header tag */}
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>CONFIGURAÇÕES</Text>
          </View>
        </View>
        <Text style={styles.pageTitle}>O Meu Perfil</Text>

        {/* Avatar card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.avatarName} numberOfLines={1}>{name}</Text>
            <Text style={styles.avatarEmail} numberOfLines={1}>{email}</Text>
          </View>
        </View>

        {/* Personal info */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionLabel}>INFORMAÇÕES ATUAIS</Text>
            {!isEditing && (
              <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
                <Ionicons name="pencil" size={13} color="#1565C0" />
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
                  style={styles.fieldInput}
                  value={email}
                  editable={false}
                  placeholderTextColor="#9ca3af"
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
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
                  {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Guardar</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {[
                { icon: 'person-outline' as const, label: 'NOME', value: name },
                { icon: 'mail-outline' as const, label: 'EMAIL', value: email },
                { icon: 'call-outline' as const, label: 'TELEFONE', value: phone || '—' },
              ].map((row, i, arr) => (
                <View key={row.label} style={[styles.infoRow, i < arr.length - 1 && styles.infoRowBorder]}>
                  <View style={styles.infoIconBox}>
                    <Ionicons name={row.icon} size={18} color="#1565C0" />
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

        {/* Sign out */}
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
  tagRow: { marginBottom: 8 },
  tag: { backgroundColor: CARD_EL, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  tagText: { fontSize: 10, fontWeight: '700', color: '#474747', letterSpacing: 2, textTransform: 'uppercase' },
  pageTitle: { fontSize: 36, fontWeight: '700', color: '#0a0a0a', marginBottom: 24, letterSpacing: -0.5 },
  avatarCard: { backgroundColor: CARD, borderRadius: 32, padding: 28, flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  avatarCircle: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#1565C0', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatarText: { fontSize: 28, fontWeight: '900', color: '#fff' },
  avatarName: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', letterSpacing: -0.5 },
  avatarEmail: { fontSize: 15, color: '#474747', opacity: 0.7, marginTop: 2 },
  section: { backgroundColor: CARD, borderRadius: 32, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  sectionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#474747', letterSpacing: 2, opacity: 0.5, textTransform: 'uppercase' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 1000, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  editBtnText: { fontSize: 13, fontWeight: '700', color: '#1565C0' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingVertical: 16 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  infoIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', flexShrink: 0 },
  infoLabel: { fontSize: 10, fontWeight: '700', color: '#474747', letterSpacing: 1.5, opacity: 0.5, textTransform: 'uppercase', marginBottom: 2 },
  infoValue: { fontSize: 16, fontWeight: '700', color: '#0a0a0a', letterSpacing: -0.3 },
  field: { gap: 6 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: '#474747', letterSpacing: 2, textTransform: 'uppercase', marginLeft: 4 },
  fieldInput: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, fontSize: 15, color: '#0a0a0a', borderWidth: 1, borderColor: CARD_EL },
  formBtns: { flexDirection: 'row', gap: 12, paddingTop: 8 },
  saveBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#1565C0', alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cancelBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  cancelBtnText: { color: '#0a0a0a', fontSize: 15, fontWeight: '700' },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 18, borderWidth: 1, borderColor: '#fee2e2', marginTop: 8 },
  signOutText: { fontSize: 16, fontWeight: '600', color: '#ef4444' },
});
