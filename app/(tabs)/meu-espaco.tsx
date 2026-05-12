import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Alert, RefreshControl, Linking, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const { width: SW } = Dimensions.get('window');
const CARD = '#f2f1ef';
const CARD_EL = '#ecece7';

const pillarMental = require('@/assets/images/pillar-mental.png');
const pillarFisico = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica = require('@/assets/images/pillar-juridica.png');

function getPillarImage(pillar: string) {
  const p = pillar.toLowerCase();
  if (p.includes('mental')) return pillarMental;
  if (p.includes('fisico') || p.includes('físico')) return pillarFisico;
  if (p.includes('financeira')) return pillarFinanceira;
  if (p.includes('juridica') || p.includes('jurídica')) return pillarJuridica;
  return pillarMental;
}

function getPillarColor(pillar: string) {
  const p = pillar.toLowerCase();
  if (p.includes('mental')) return '#9dbfd4';
  if (p.includes('fisico') || p.includes('físico')) return '#fcc066';
  if (p.includes('financeira')) return '#8bbeb8';
  if (p.includes('juridica') || p.includes('jurídica')) return '#d8a4c4';
  return '#9dbfd4';
}

type Booking = {
  id: string;
  booking_date: string;
  start_time: string;
  status: string;
  meeting_type: string;
  primary_pillar: string;
  meeting_url?: string;
  specialist?: { profile?: { full_name?: string } };
};

export default function MeuEspacoScreen() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();
  const [upcomingSessions, setUpcomingSessions] = useState<Booking[]>([]);
  const [pastSessions, setPastSessions] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!session?.user?.id) return;
    const today = new Date().toISOString().split('T')[0];

    const [{ data: upcoming }, { data: past }] = await Promise.all([
      supabase
        .from('bookings')
        .select('*, specialist:specialists(profile:profiles(full_name))')
        .eq('user_id', session.user.id)
        .gte('booking_date', today)
        .order('booking_date', { ascending: true })
        .limit(10),
      supabase
        .from('bookings')
        .select('*, specialist:specialists(profile:profiles(full_name))')
        .eq('user_id', session.user.id)
        .lt('booking_date', today)
        .order('booking_date', { ascending: false })
        .limit(10),
    ]);

    setUpcomingSessions((upcoming || []) as Booking[]);
    setPastSessions((past || []) as Booking[]);
    setLoading(false);
    setRefreshing(false);
  }, [session?.user?.id]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancel = async (id: string) => {
    Alert.alert(
      'Cancelar Sessão',
      'Tens a certeza que queres cancelar esta sessão? Esta ação não pode ser desfeita.',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
            fetchBookings();
          },
        },
      ]
    );
  };

  const sessions = activeTab === 'upcoming' ? upcomingSessions : pastSessions;

  const SessionCard = ({ s }: { s: Booking }) => {
    const color = getPillarColor(s.primary_pillar || 'mental');
    const pillarName = s.primary_pillar
      ? s.primary_pillar.charAt(0).toUpperCase() + s.primary_pillar.slice(1)
      : 'Saúde Mental';
    const specialistName = s.specialist?.profile?.full_name || 'Especialista';
    const date = new Date(s.booking_date);
    const dateStr = date.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });

    return (
      <View style={[styles.sessionCard, { backgroundColor: color + '55' }]}>
        <View style={styles.sessionTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionPillar}>{pillarName}</Text>
            <Text style={styles.sessionSpecialist}>{specialistName}</Text>
          </View>
          <View style={styles.sessionImg}>
            <Image source={getPillarImage(s.primary_pillar || 'mental')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.sessionMeta}>
          <View style={styles.metaPill}>
            <Ionicons name="calendar-outline" size={14} color="#474747" />
            <Text style={styles.metaText}>{dateStr}</Text>
          </View>
          <View style={styles.metaPill}>
            <Ionicons name="time-outline" size={14} color="#474747" />
            <Text style={styles.metaText}>{s.start_time}</Text>
          </View>
          <View style={styles.metaPill}>
            <Ionicons name={s.meeting_type === 'video' ? 'videocam-outline' : 'call-outline'} size={14} color="#474747" />
            <Text style={styles.metaText}>{s.meeting_type === 'video' ? 'Vídeo' : 'Chamada'}</Text>
          </View>
        </View>

        {activeTab === 'upcoming' && (
          <View style={styles.sessionActions}>
            {s.meeting_url ? (
              <TouchableOpacity
                style={styles.enterBtn}
                onPress={() => Linking.openURL(s.meeting_url!)}
                activeOpacity={0.85}
              >
                <Ionicons name="videocam" size={16} color="#fff" />
                <Text style={styles.enterBtnText}>Entrar na Sessão</Text>
              </TouchableOpacity>
            ) : null}
            <View style={styles.sessionSecondaryBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancel(s.id)} activeOpacity={0.8}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>O Meu Espaço</Text>
        <View style={styles.tabToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'upcoming' && styles.toggleBtnActive]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.toggleText, activeTab === 'upcoming' && styles.toggleTextActive]}>Próximas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'past' && styles.toggleBtnActive]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.toggleText, activeTab === 'past' && styles.toggleTextActive]}>Passadas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchBookings(); }} />}
      >
        {loading ? null : sessions.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={48} color="#474747" style={{ opacity: 0.2, marginBottom: 12 }} />
            <Text style={styles.emptyText}>Não tens sessões {activeTab === 'upcoming' ? 'agendadas' : 'passadas'} de momento.</Text>
          </View>
        ) : (
          sessions.map(s => <SessionCard key={s.id} s={s} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 24, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#0a0a0a', marginBottom: 16 },
  tabToggle: { flexDirection: 'row', backgroundColor: CARD, borderRadius: 14, padding: 3 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 11, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#474747' },
  toggleTextActive: { color: '#0a0a0a' },
  scroll: { paddingHorizontal: 20, paddingTop: 20, gap: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 16, color: '#474747', textAlign: 'center' },
  sessionCard: { borderRadius: 32, padding: 24, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', marginBottom: 4 },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  sessionPillar: { fontSize: 24, fontWeight: '700', color: '#0a0a0a', lineHeight: 28 },
  sessionSpecialist: { fontSize: 18, fontWeight: '500', color: '#474747', marginTop: 2 },
  sessionImg: { width: SW * 0.25, height: SW * 0.25, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.8)', overflow: 'hidden', padding: 8 },
  sessionMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  metaPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 1000, paddingHorizontal: 12, paddingVertical: 7 },
  metaText: { fontSize: 13, fontWeight: '700', color: '#474747' },
  sessionActions: { gap: 10 },
  enterBtn: { backgroundColor: '#1565C0', height: 52, borderRadius: 1000, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  enterBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  sessionSecondaryBtns: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#ef4444', height: 48, borderRadius: 1000, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
