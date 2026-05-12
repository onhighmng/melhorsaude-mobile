import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, Switch,
} from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import Constants from 'expo-constants';

const PILLAR_LABEL: Record<string, string> = {
  PSYCH: 'Saúde Mental', PHYSICAL: 'Bem-estar Físico',
  FINANCIAL: 'Assistência Financeira', LEGAL: 'Assistência Jurídica',
};

interface RowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
  rightElement?: React.ReactNode;
}

function Row({ icon, iconColor, iconBg, label, value, onPress, showChevron = true, danger, rightElement }: RowProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
        {value && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      {rightElement ?? (showChevron && onPress && (
        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
      ))}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { profile, loading } = useProfile();
  const [signingOut, setSigningOut] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(true);

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  const handleSignOut = () => {
    Alert.alert(
      'Terminar Sessão',
      'Tens a certeza que queres sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setSigningOut(true);
            await signOut();
          },
        },
      ]
    );
  };

  const name = profile?.full_name ?? '—';
  const email = profile?.email ?? '—';
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

  const roleLabel: Record<string, string> = {
    user: 'Colaborador', specialist: 'Especialista', admin: 'Administrador', company_admin: 'Gestor de Empresa',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Perfil</Text>

        {/* Avatar + Name */}
        {loading ? (
          <ActivityIndicator color="#2563EB" style={{ marginVertical: 32 }} />
        ) : (
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials || '?'}</Text>
            </View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
            {profile?.primary_role && (
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {roleLabel[profile.primary_role] ?? profile.primary_role}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <View style={styles.card}>
            <Row icon="person-outline" iconColor="#2563EB" iconBg="#EFF6FF" label="Nome" value={name} />
            <View style={styles.divider} />
            <Row icon="mail-outline" iconColor="#7C3AED" iconBg="#F5F3FF" label="Email" value={email} />
            {profile?.phone && (
              <>
                <View style={styles.divider} />
                <Row icon="call-outline" iconColor="#059669" iconBg="#ECFDF5" label="Telefone" value={profile.phone} />
              </>
            )}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <View style={styles.card}>
            <Row
              icon="notifications-outline"
              iconColor="#F59E0B"
              iconBg="#FFFBEB"
              label="Notificações"
              showChevron={false}
              rightElement={
                <Switch
                  value={notifEnabled}
                  onValueChange={setNotifEnabled}
                  trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
                  thumbColor={notifEnabled ? '#2563EB' : '#94A3B8'}
                />
              }
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          <View style={styles.card}>
            <Row icon="help-circle-outline" iconColor="#64748B" iconBg="#F8FAFC" label="Centro de Ajuda" />
            <View style={styles.divider} />
            <Row icon="document-text-outline" iconColor="#64748B" iconBg="#F8FAFC" label="Termos de Serviço" />
            <View style={styles.divider} />
            <Row icon="shield-checkmark-outline" iconColor="#64748B" iconBg="#F8FAFC" label="Política de Privacidade" />
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.signOutRow} onPress={handleSignOut} disabled={signingOut} activeOpacity={0.7}>
              {signingOut ? (
                <ActivityIndicator color="#EF4444" />
              ) : (
                <>
                  <View style={[styles.rowIcon, { backgroundColor: '#FEF2F2' }]}>
                    <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                  </View>
                  <Text style={styles.signOutText}>Terminar Sessão</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>Melhor Saúde v{appVersion}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A', marginTop: 16, marginBottom: 8 },

  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginBottom: 14, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  avatarText: { fontSize: 30, fontWeight: '700', color: '#fff' },
  profileName: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  roleBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  roleBadgeText: { fontSize: 12, fontWeight: '600', color: '#2563EB' },

  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },

  card: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginLeft: 56 },

  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '500', color: '#0F172A' },
  rowLabelDanger: { color: '#EF4444' },
  rowValue: { fontSize: 13, color: '#64748B', marginTop: 1 },

  signOutRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  signOutText: { fontSize: 15, fontWeight: '600', color: '#EF4444' },

  version: { fontSize: 12, color: '#CBD5E1', textAlign: 'center', marginTop: 8 },
});
