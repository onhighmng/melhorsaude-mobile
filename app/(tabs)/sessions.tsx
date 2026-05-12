import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl, Linking,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBookings, Booking } from '@/hooks/use-bookings';

const PILLAR_COLOR: Record<string, string> = {
  PSYCH: '#DBEAFE', PHYSICAL: '#FEF3C7', FINANCIAL: '#D1FAE5', LEGAL: '#FCE7F3',
};
const PILLAR_TEXT: Record<string, string> = {
  PSYCH: '#1D4ED8', PHYSICAL: '#B45309', FINANCIAL: '#065F46', LEGAL: '#9D174D',
};
const STATUS_LABEL: Record<string, string> = {
  confirmed: 'Confirmado', pending: 'Pendente', rescheduled: 'Reagendado', completed: 'Concluído',
};
const STATUS_COLOR: Record<string, string> = {
  confirmed: '#10B981', pending: '#F59E0B', rescheduled: '#8B5CF6', completed: '#64748B',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });
}

function SessionCard({ booking, pillarLabel }: { booking: Booking; pillarLabel: Record<string, string> }) {
  const pillar = booking.primary_pillar ?? 'PSYCH';
  const specialist = booking.specialist?.profile?.full_name ?? 'Especialista';
  const meetingIcon = booking.meeting_type === 'video' ? 'videocam-outline' : 'call-outline';

  const handleJoin = () => {
    if (booking.meeting_link) Linking.openURL(booking.meeting_link);
  };

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={[styles.pillarBadge, { backgroundColor: PILLAR_COLOR[pillar] }]}>
          <Text style={[styles.pillarBadgeText, { color: PILLAR_TEXT[pillar] }]}>
            {pillarLabel[pillar] ?? pillar}
          </Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[booking.status] }]} />
        <Text style={[styles.statusText, { color: STATUS_COLOR[booking.status] }]}>
          {STATUS_LABEL[booking.status] ?? booking.status}
        </Text>
      </View>

      <View style={styles.sessionBody}>
        <View style={styles.sessionDateBlock}>
          <Ionicons name="calendar-outline" size={16} color="#64748B" />
          <Text style={styles.sessionDate}>{formatDate(booking.booking_date)}</Text>
        </View>
        <View style={styles.sessionDateBlock}>
          <Ionicons name="time-outline" size={16} color="#64748B" />
          <Text style={styles.sessionDate}>{booking.start_time.slice(0, 5)}</Text>
        </View>
        <View style={styles.sessionDateBlock}>
          <Ionicons name={meetingIcon} size={16} color="#64748B" />
          <Text style={styles.sessionDate}>
            {booking.meeting_type === 'video' ? 'Vídeo' : booking.meeting_type === 'phone' ? 'Telefone' : 'Presencial'}
          </Text>
        </View>
      </View>

      <View style={styles.sessionFooter}>
        <View style={styles.specialistRow}>
          <View style={styles.specialistAvatar}>
            <Text style={styles.specialistAvatarText}>{specialist[0]?.toUpperCase()}</Text>
          </View>
          <Text style={styles.specialistName}>{specialist}</Text>
        </View>
        {booking.meeting_link && booking.status === 'confirmed' && (
          <TouchableOpacity style={styles.joinBtn} onPress={handleJoin} activeOpacity={0.8}>
            <Ionicons name="videocam" size={14} color="#fff" />
            <Text style={styles.joinBtnText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function SessionsScreen() {
  const insets = useSafeAreaInsets();
  const { upcoming, past, loading, refetch, pillarLabel } = useBookings();
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const sessions = tab === 'upcoming' ? upcoming : past;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sessões</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'upcoming' && styles.tabBtnActive]}
          onPress={() => setTab('upcoming')}
        >
          <Text style={[styles.tabLabel, tab === 'upcoming' && styles.tabLabelActive]}>Próximas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'past' && styles.tabBtnActive]}
          onPress={() => setTab('past')}
        >
          <Text style={[styles.tabLabel, tab === 'past' && styles.tabLabelActive]}>Anteriores</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />}
        >
          {sessions.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyTitle}>
                {tab === 'upcoming' ? 'Sem sessões agendadas' : 'Sem sessões anteriores'}
              </Text>
              <Text style={styles.emptyBody}>
                {tab === 'upcoming' ? 'Acede ao portal para agendar a tua próxima sessão.' : 'As tuas sessões passadas aparecerão aqui.'}
              </Text>
            </View>
          ) : (
            sessions.map((b) => (
              <SessionCard key={b.id} booking={b} pillarLabel={pillarLabel} />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 },

  tabBar: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  tabLabel: { fontSize: 14, fontWeight: '500', color: '#94A3B8' },
  tabLabelActive: { color: '#0F172A', fontWeight: '600' },

  sessionCard: { backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  sessionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  pillarBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  pillarBadgeText: { fontSize: 12, fontWeight: '600' },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginLeft: 'auto' },
  statusText: { fontSize: 12, fontWeight: '600' },

  sessionBody: { flexDirection: 'row', gap: 16, marginBottom: 14 },
  sessionDateBlock: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sessionDate: { fontSize: 13, color: '#475569', fontWeight: '500' },

  sessionFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  specialistRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  specialistAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  specialistAvatarText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  specialistName: { fontSize: 13, color: '#475569', fontWeight: '500' },
  joinBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  joinBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#0F172A', marginBottom: 8 },
  emptyBody: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 22 },
});
