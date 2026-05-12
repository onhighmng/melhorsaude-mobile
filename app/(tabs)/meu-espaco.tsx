import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Linking, Alert, Dimensions, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings, Booking } from '@/hooks/use-bookings';
import { useResources } from '@/hooks/use-resources';
import { MoodHistoryPage } from '@/components/MoodHistoryPage';
import { RateSessionsPage } from '@/components/RateSessionsPage';
import { RecursosPage } from '@/components/RecursosPage';
import { SessionBooking } from '@/components/SessionBooking';
import { supabase } from '@/lib/supabase';
import { FONT_PACIFICO, FONT_POPPINS_500, FONT_JAKARTA_700 } from '@/lib/fonts';

const { width: SW } = Dimensions.get('window');
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';

const pillarMental     = require('@/assets/images/pillar-mental.png');
const pillarFisico     = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica   = require('@/assets/images/pillar-juridica.png');

const PILLAR_IMAGES: Record<string, any> = {
  PSYCH: pillarMental, PHYSICAL: pillarFisico, FINANCIAL: pillarFinanceira, LEGAL: pillarJuridica,
  mental: pillarMental, fisico: pillarFisico, financeira: pillarFinanceira, juridica: pillarJuridica,
};

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: '#9dbfd4', PHYSICAL: '#fcc066', FINANCIAL: '#8bbeb8', LEGAL: '#d8a4c4',
  mental: '#9dbfd4', fisico: '#fcc066', financeira: '#8bbeb8', juridica: '#d8a4c4',
};

const PILLAR_ACCENT: Record<string, string> = {
  PSYCH: '#1565C0', PHYSICAL: '#FB923C', FINANCIAL: '#34D399', LEGAL: '#F472B6',
  mental: '#1565C0', fisico: '#FB923C', financeira: '#34D399', juridica: '#F472B6',
};

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental', PHYSICAL: 'Bem-estar Físico', FINANCIAL: 'Assistência Financeira', LEGAL: 'Assistência Jurídica',
};

export default function MeuEspacoScreen() {
  const insets = useSafeAreaInsets();
  const { upcoming, loading, refetch } = useBookings();
  const { resources } = useResources();
  const [refreshing, setRefreshing] = useState(false);
  const [showMoodHistory, setShowMoodHistory]   = useState(false);
  const [showRateSessions, setShowRateSessions] = useState(false);
  const [showRecursos, setShowRecursos]         = useState(false);
  const [rescheduling, setRescheduling]         = useState<Booking | null>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleCancel = useCallback((id: string) => {
    Alert.alert(
      'Cancelar Sessão',
      'Tens a certeza que queres cancelar esta sessão?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
            refetch();
          },
        },
      ]
    );
  }, [refetch]);

  // ── Sub-page overlays
  if (showMoodHistory)   return <MoodHistoryPage onBack={() => setShowMoodHistory(false)} />;
  if (showRateSessions)  return <RateSessionsPage onBack={() => setShowRateSessions(false)} />;
  if (showRecursos)      return <RecursosPage onBack={() => setShowRecursos(false)} />;
  if (rescheduling) {
    const pillarId = ({ PSYCH: 'mental', PHYSICAL: 'fisico', FINANCIAL: 'financeira', LEGAL: 'juridica' } as Record<string, string>)[rescheduling.primary_pillar || 'PSYCH'] || 'mental';
    return (
      <SessionBooking
        pillarId={pillarId}
        specialistId={rescheduling.specialist?.id || ''}
        specialistName={rescheduling.specialist?.profile?.full_name || 'Especialista'}
        rescheduleBookingId={rescheduling.id}
        onBack={() => setRescheduling(null)}
        onConfirm={() => { setRescheduling(null); refetch(); }}
      />
    );
  }

  const featuredResources = resources.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1565C0" />}
      >
        {/* ── Header */}
        <View style={styles.ctaTag}>
          <Text style={styles.ctaTagText}>O teu espaço pessoal</Text>
        </View>
        <Text style={styles.pageTitle}>Meu Espaço</Text>

        {/* ── Upcoming Sessions */}
        <Text style={styles.sectionLabel}>PRÓXIMAS SESSÕES</Text>
        {loading ? null : upcoming.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={36} color="#D1D5DB" style={{ marginBottom: 10 }} />
            <Text style={styles.emptyTitle}>Sem sessões agendadas</Text>
            <Text style={styles.emptyText}>Volta ao início e marca a tua primeira sessão.</Text>
          </View>
        ) : (
          upcoming.map((b) => <SessionCard key={b.id} booking={b} onCancel={handleCancel} onReschedule={setRescheduling} />)
        )}

        {/* ── Quick Actions */}
        <Text style={styles.sectionLabel}>AÇÕES RÁPIDAS</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => setShowMoodHistory(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: '#DBEAFE' }]}>
              <Text style={{ fontSize: 22 }}>😊</Text>
            </View>
            <Text style={styles.quickLabel}>Histórico de Humor</Text>
            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" style={{ marginTop: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => setShowRateSessions(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: '#FEF9C2' }]}>
              <Ionicons name="star" size={22} color="#FBBF24" />
            </View>
            <Text style={styles.quickLabel}>Avaliar Sessões</Text>
            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" style={{ marginTop: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => Alert.alert('Em breve', 'A secção de progresso estará disponível brevemente.')}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="trending-up" size={22} color="#10B981" />
            </View>
            <Text style={styles.quickLabel}>Progresso</Text>
            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" style={{ marginTop: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* ── Resources Preview */}
        {featuredResources.length > 0 && (
          <>
            <View style={styles.resourcesHeader}>
              <Text style={styles.sectionLabel}>RECURSOS</Text>
              <TouchableOpacity onPress={() => setShowRecursos(true)} activeOpacity={0.7}>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resourcesList}>
              {featuredResources.map((r) => (
                <TouchableOpacity key={r.id} style={styles.resourceCard} activeOpacity={0.85}>
                  <View style={styles.resourceIcon}>
                    <Ionicons
                      name={r.content_type === 'video' ? 'play-circle' : r.content_type === 'audio' ? 'musical-notes' : 'document-text'}
                      size={22}
                      color="#1565C0"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.resourceTitle} numberOfLines={2}>{r.title_pt}</Text>
                    {r.read_time_minutes ? (
                      <Text style={styles.resourceMeta}>{r.read_time_minutes} min</Text>
                    ) : null}
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function SessionCard({ booking, onCancel, onReschedule }: { booking: Booking; onCancel: (id: string) => void; onReschedule: (b: Booking) => void }) {
  const pillar = booking.primary_pillar || 'PSYCH';
  const color = PILLAR_COLORS[pillar] || '#9dbfd4';
  const accent = PILLAR_ACCENT[pillar] || '#1565C0';
  const image = PILLAR_IMAGES[pillar] || pillarMental;
  const pillarName = PILLAR_LABELS[pillar] || 'Saúde Mental';
  const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
  const date = new Date(booking.booking_date);
  const dateStr = date.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <View style={[styles.sessionCard, { backgroundColor: color + '55' }]}>
      <View style={styles.sessionTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sessionPillar}>{pillarName}</Text>
          <Text style={styles.sessionSpecialist}>{specialistName}</Text>
        </View>
        <View style={styles.sessionImg}>
          <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.sessionMeta}>
        <View style={styles.metaPill}>
          <Ionicons name="calendar-outline" size={13} color="#474747" />
          <Text style={styles.metaText}>{dateStr}</Text>
        </View>
        <View style={styles.metaPill}>
          <Ionicons name="time-outline" size={13} color="#474747" />
          <Text style={styles.metaText}>{booking.start_time?.slice(0, 5)}</Text>
        </View>
        <View style={styles.metaPill}>
          <Ionicons name={booking.meeting_type === 'video' ? 'videocam-outline' : 'call-outline'} size={13} color="#474747" />
          <Text style={styles.metaText}>{booking.meeting_type === 'video' ? 'Vídeo' : 'Chamada'}</Text>
        </View>
      </View>

      <View style={styles.sessionActions}>
        {booking.meeting_link && (
          <TouchableOpacity
            style={[styles.enterBtn, { backgroundColor: accent }]}
            onPress={() => Linking.openURL(booking.meeting_link!)}
            activeOpacity={0.85}
          >
            <Ionicons name="videocam" size={16} color="#fff" />
            <Text style={styles.enterBtnText}>Entrar na Sessão</Text>
          </TouchableOpacity>
        )}
        <View style={styles.secondaryBtns}>
          <TouchableOpacity
            style={styles.reagendarBtn}
            activeOpacity={0.8}
            onPress={() => onReschedule(booking)}
          >
            <Ionicons name="calendar-outline" size={15} color={accent} />
            <Text style={[styles.reagendarText, { color: accent }]}>Reagendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onCancel(booking.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scroll: { paddingHorizontal: 24 },

  ctaTag: {
    backgroundColor: CARD_EL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ctaTagText: { fontSize: 10, fontFamily: FONT_JAKARTA_700, color: '#474747', letterSpacing: 1.5, textTransform: 'uppercase' },
  pageTitle: { fontSize: 36, fontFamily: FONT_PACIFICO, color: '#0a0a0a', marginBottom: 28 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#474747',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },

  // Empty state
  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#0a0a0a', marginBottom: 6, textAlign: 'center' },
  emptyText: { fontSize: 13, color: '#474747', textAlign: 'center', lineHeight: 19 },

  // Session card
  sessionCard: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  sessionPillar: { fontSize: 22, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a', lineHeight: 26 },
  sessionSpecialist: { fontSize: 16, fontFamily: FONT_POPPINS_500, color: '#474747', marginTop: 2 },
  sessionImg: {
    width: SW * 0.22,
    height: SW * 0.22,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    overflow: 'hidden',
  },
  sessionMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 1000,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaText: { fontSize: 12, fontWeight: '700', color: '#474747' },
  sessionActions: { gap: 10 },
  enterBtn: {
    height: 52,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  enterBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtns: { flexDirection: 'row', gap: 10 },
  reagendarBtn: {
    flex: 1,
    height: 46,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  reagendarText: { fontSize: 14, fontWeight: '700' },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
  },
  cancelBtnText: { color: '#ef4444', fontSize: 14, fontWeight: '700' },

  // Quick Actions
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  quickCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: CARD_EL,
    gap: 8,
    minHeight: 110,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: { fontSize: 12, fontWeight: '700', color: '#0a0a0a', lineHeight: 16, flex: 1 },

  // Resources
  resourcesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#1565C0' },
  resourcesList: { gap: 10, marginBottom: 16 },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  resourceTitle: { fontSize: 14, fontWeight: '700', color: '#0a0a0a', lineHeight: 19, flex: 1 },
  resourceMeta: { fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginTop: 3 },
});
