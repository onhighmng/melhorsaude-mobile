import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Linking, Alert, Dimensions, RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Video, Phone, Star, TrendingUp, ChevronRight, Smile, Play, FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings, Booking } from '@/hooks/use-bookings';
import { useResources } from '@/hooks/use-resources';
import { MoodHistoryPage } from '@/components/MoodHistoryPage';
import { HealthProgressPage } from '@/components/HealthProgressPage';
import { RateSessionsPage } from '@/components/RateSessionsPage';
import { RecursosPage } from '@/components/RecursosPage';
import { SessionBooking } from '@/components/SessionBooking';
import { PulseCheckinScreen } from '@/components/PulseCheckinScreen';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { usePulse } from '@/hooks/use-pulse';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS, GRADIENT } from '@/lib/design-tokens';

const { width: SW } = Dimensions.get('window');

const pillarMental     = require('@/assets/images/pillar-mental.png');
const pillarFisico     = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica   = require('@/assets/images/pillar-juridica.png');

const PILLAR_IMAGES: Record<string, any> = {
  PSYCH: pillarMental, PHYSICAL: pillarFisico, FINANCIAL: pillarFinanceira, LEGAL: pillarJuridica,
  mental: pillarMental, fisico: pillarFisico, financeira: pillarFinanceira, juridica: pillarJuridica,
};

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: COLORS.PILLAR_MENTAL_LIGHT, PHYSICAL: COLORS.PILLAR_FISICO_LIGHT, FINANCIAL: COLORS.PILLAR_FINANCEIRA_LIGHT, LEGAL: COLORS.PILLAR_JURIDICA_LIGHT,
  mental: COLORS.PILLAR_MENTAL_LIGHT, fisico: COLORS.PILLAR_FISICO_LIGHT, financeira: COLORS.PILLAR_FINANCEIRA_LIGHT, juridica: COLORS.PILLAR_JURIDICA_LIGHT,
};

const PILLAR_ACCENT: Record<string, string> = {
  PSYCH: COLORS.PILLAR_MENTAL, PHYSICAL: COLORS.PILLAR_FISICO, FINANCIAL: COLORS.PILLAR_FINANCEIRA, LEGAL: COLORS.PILLAR_JURIDICA,
  mental: COLORS.PILLAR_MENTAL, fisico: COLORS.PILLAR_FISICO, financeira: COLORS.PILLAR_FINANCEIRA, juridica: COLORS.PILLAR_JURIDICA,
};

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental', PHYSICAL: 'Bem-estar Físico', FINANCIAL: 'Assistência Financeira', LEGAL: 'Assistência Jurídica',
};

export default function MeuEspacoScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { upcoming, past, loading, refetch } = useBookings();
  const { resources, loading: resourcesLoading } = useResources();
  const { savePulse } = usePulse(user?.id);
  const [refreshing, setRefreshing] = useState(false);
  const [showMoodHistory, setShowMoodHistory]   = useState(false);
  const [showRateSessions, setShowRateSessions] = useState(false);
  const [showRecursos, setShowRecursos]         = useState(false);
  const [showHealthProgress, setShowHealthProgress] = useState(false);
  const [showPulseCheckin, setShowPulseCheckin] = useState(false);
  const [rescheduling, setRescheduling]         = useState<Booking | null>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleCancel = useCallback((id: string, pillar: string) => {
    Alert.alert(
      'Cancelar Sessão',
      'Tens a certeza que queres cancelar esta sessão?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            track.sessionCancelled(pillar);
            await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
            refetch();
          },
        },
      ]
    );
  }, [refetch]);

  // ── Sub-page overlays
  if (showPulseCheckin) {
    return (
      <PulseCheckinScreen
        onBack={() => setShowPulseCheckin(false)}
        onComplete={async (scores) => {
          const overall = Math.round((scores.energy + scores.stress + scores.humor) / 3);
          track.pulseCompleted(scores.energy, scores.stress, scores.humor, overall);
          await savePulse(scores.energy, scores.stress, scores.humor);
          setShowPulseCheckin(false);
        }}
      />
    );
  }
  if (showMoodHistory)      return <MoodHistoryPage onBack={() => setShowMoodHistory(false)} />;
  if (showHealthProgress)   return <HealthProgressPage onBack={() => setShowHealthProgress(false)} onLogPulse={() => setShowPulseCheckin(true)} />;
  if (showRateSessions)  return <RateSessionsPage onBack={() => setShowRateSessions(false)} past={past} loading={loading} />;
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
    <LinearGradient colors={GRADIENT.BG_GRADIENT.colors} start={GRADIENT.BG_GRADIENT.start} end={GRADIENT.BG_GRADIENT.end} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.PRIMARY} />}
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
            <Calendar size={36} color="#D1D5DB" style={{ marginBottom: 10 }} />
            <Text style={styles.emptyTitle}>Sem sessões agendadas</Text>
            <Text style={styles.emptyText}>Volta ao início e marca a tua primeira sessão.</Text>
          </View>
        ) : (
          upcoming.map((b) => (
            <SessionCard key={b.id} booking={b} onCancel={handleCancel} onReschedule={setRescheduling} />
          ))
        )}

        {/* ── Quick Actions */}
        <Text style={styles.sectionLabel}>AÇÕES RÁPIDAS</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCardWrapper}
            onPress={() => { track.quickActionTapped('mood_history'); setShowMoodHistory(true); }}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#9dbfd4', '#e2ecf2']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.quickCard}>
              <View style={styles.quickIcon}>
                <Smile size={28} color="#1565C0" />
              </View>
              <Text style={styles.quickLabel}>Histórico{'\n'}de Humor</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCardWrapper}
            onPress={() => { track.quickActionTapped('rate_sessions'); setShowRateSessions(true); }}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#d8a4c4', '#f3e4ed']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.quickCard}>
              <View style={styles.quickIcon}>
                <Star size={28} color="#9b4d7a" />
              </View>
              <Text style={styles.quickLabel}>Avaliar{'\n'}Sessões</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCardWrapper}
            onPress={() => { track.quickActionTapped('health_progress'); setShowHealthProgress(true); }}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#fcc066', '#f5efe6']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.quickCard}>
              <View style={styles.quickIcon}>
                <TrendingUp size={28} color="#b07000" />
              </View>
              <Text style={styles.quickLabel}>Progresso{'\n'}da Saúde</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── Resources and Exercises */}
        {!resourcesLoading && resources.length > 0 && (
          <>
            <View style={styles.resourcesHeader}>
              <View>
                <Text style={styles.resourcesTag}>Conteúdo</Text>
                <Text style={styles.resourcesTitle}>Recursos e Exercícios</Text>
              </View>
            </View>
            <View style={styles.resourcesList}>
              {resources.slice(0, 3).map((r) => (
                <TouchableOpacity key={r.id} style={styles.resourceCard} activeOpacity={0.85} onPress={() => { track.resourceCardTapped(r.title_pt, r.pillar_code ?? null, r.resource_type ?? null); setShowRecursos(true); }}>
                  {r.thumbnail_url && r.thumbnail_url.length > 0 ? (
                    <Image
                      source={{ uri: r.thumbnail_url }}
                      style={styles.resourceImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.resourceImage, { backgroundColor: COLORS.CARD_EL, alignItems: 'center', justifyContent: 'center' }]}>
                      {r.resource_type === 'video' ? (
                        <Play size={32} color={COLORS.PRIMARY} />
                      ) : (
                        <FileText size={32} color={COLORS.PRIMARY} />
                      )}
                    </View>
                  )}
                  <View style={styles.resourceContent}>
                    <View style={styles.resourceTag}>
                      <Text style={styles.resourceTagText}>{r.pillar_code === 'PSYCH' ? 'Mental' : r.pillar_code === 'PHYSICAL' ? 'Físico' : r.pillar_code === 'FINANCIAL' ? 'Finanças' : 'Jurídica'}</Text>
                    </View>
                    <View style={styles.resourceTextBox}>
                      <Text style={styles.resourceTitle} numberOfLines={2}>{r.title_pt}</Text>
                      {r.description_pt && (
                        <Text style={styles.resourceDesc} numberOfLines={2}>{r.description_pt}</Text>
                      )}
                    </View>
                    <Text style={styles.resourceLink}>Saber mais</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.viewMoreBtn}
              onPress={() => { track.resourcesViewAllTapped(); setShowRecursos(true); }}
              activeOpacity={0.85}
            >
              <Text style={styles.viewMoreText}>Ver todos os recursos</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function SessionCard({ booking, onCancel, onReschedule }: { booking: Booking; onCancel: (id: string, pillar: string) => void; onReschedule: (b: Booking) => void }) {
  const pillar = booking.primary_pillar || 'PSYCH';
  const color = PILLAR_COLORS[pillar] || '#9dbfd4';
  const accent = PILLAR_ACCENT[pillar] || '#1565C0';
  const image = PILLAR_IMAGES[pillar] || pillarMental;
  const pillarName = PILLAR_LABELS[pillar] || 'Saúde Mental';
  const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
  const date = new Date(booking.booking_date);
  const dateStr = date.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });

  const gradients: Record<string, [string, string]> = {
    PSYCH: ['#9dbfd4', '#e2ecf2'],
    mental: ['#9dbfd4', '#e2ecf2'],
    PHYSICAL: ['#fcc066', '#f5efe6'],
    fisico: ['#fcc066', '#f5efe6'],
    FINANCIAL: ['#8bbeb8', '#dcecea'],
    financeira: ['#8bbeb8', '#dcecea'],
    LEGAL: ['#d8a4c4', '#f3e4ed'],
    juridica: ['#d8a4c4', '#f3e4ed'],
  };
  const cardGradient = gradients[pillar] || ['#9dbfd4', '#e2ecf2'];

  return (
    <LinearGradient colors={cardGradient} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.sessionCard}>
      <View style={styles.sessionTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sessionPillar}>{pillarName}</Text>
          <Text style={styles.sessionSpecialist}>{specialistName}</Text>
        </View>
        <View style={[styles.sessionImg, { backgroundColor: cardGradient[0] }]}>
          <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.sessionMeta}>
        <View style={styles.metaPill}>
          <Calendar size={13} color="#474747" />
          <Text style={styles.metaText}>{dateStr}</Text>
        </View>
        <View style={styles.metaPill}>
          <Clock size={13} color="#474747" />
          <Text style={styles.metaText}>{booking.start_time?.slice(0, 5)}</Text>
        </View>
        <View style={styles.metaPill}>
          {booking.meeting_type === 'video' ? (
            <Video size={13} color="#474747" />
          ) : (
            <Phone size={13} color="#474747" />
          )}
          <Text style={styles.metaText}>{booking.meeting_type === 'video' ? 'Vídeo' : 'Chamada'}</Text>
        </View>
      </View>

      <View style={styles.sessionActions}>
        {booking.meeting_type !== 'phone' ? (
          <>
            <TouchableOpacity
              style={[styles.enterBtn, { backgroundColor: booking.meeting_link ? accent : 'rgba(255,255,255,0.35)' }]}
              onPress={() => {
                if (!booking.meeting_link) return;
                track.sessionEntered(booking.meeting_type || 'video', pillar);
                const url = /^https?:\/\//i.test(booking.meeting_link)
                  ? booking.meeting_link
                  : `https://${booking.meeting_link}`;
                Linking.openURL(url);
              }}
              activeOpacity={booking.meeting_link ? 0.85 : 1}
              disabled={!booking.meeting_link}
            >
              <Video size={16} color={booking.meeting_link ? '#fff' : '#6B7280'} />
              <Text style={[styles.enterBtnText, { color: booking.meeting_link ? '#fff' : '#6B7280' }]}>
                {booking.meeting_link ? 'Entrar na Sessão' : 'À espera do link…'}
              </Text>
            </TouchableOpacity>
            <View style={styles.secondaryBtns}>
              <TouchableOpacity style={styles.reagendarBtn} activeOpacity={0.8} onPress={() => { track.sessionRescheduleTapped(pillar); onReschedule(booking); }}>
                <Calendar size={15} color="#fff" />
                <Text style={styles.reagendarText}>Reagendar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(booking.id, pillar)} activeOpacity={0.8}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.secondaryBtns}>
            <TouchableOpacity style={styles.reagendarBtn} activeOpacity={0.8} onPress={() => { track.sessionRescheduleTapped(pillar); onReschedule(booking); }}>
              <Calendar size={15} color="#fff" />
              <Text style={styles.reagendarText}>Reagendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(booking.id, pillar)} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },
  scroll: { paddingHorizontal: SPACING.lg },

  ctaTag: {
    backgroundColor: COLORS.CARD_EL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  ctaTagText: { fontSize: 10, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_SECONDARY, letterSpacing: 1.5, textTransform: 'uppercase' },
  pageTitle: { fontSize: 36, fontFamily: TYPOGRAPHY.PACIFICO, color: COLORS.TEXT_PRIMARY, marginBottom: 28 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.5,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },

  // Empty state
  emptyCard: {
    backgroundColor: COLORS.CARD,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.TEXT_PRIMARY, marginBottom: 6, textAlign: 'center' },
  emptyText: { fontSize: 13, color: COLORS.TEXT_SECONDARY, textAlign: 'center', lineHeight: 19 },

  // Session card
  sessionCard: {
    borderRadius: 32,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.lg,
  },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md },
  sessionPillar: { fontSize: 22, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY, lineHeight: 26 },
  sessionSpecialist: { fontSize: 16, fontFamily: TYPOGRAPHY.POPPINS_500, color: COLORS.TEXT_SECONDARY, marginTop: 2 },
  sessionImg: {
    width: SW * 0.25,
    height: SW * 0.25,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sessionMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaText: { fontSize: 12, fontWeight: '700', color: COLORS.TEXT_SECONDARY },
  sessionActions: { gap: SPACING.sm },
  enterBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  enterBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtns: { flexDirection: 'row', gap: SPACING.sm },
  reagendarBtn: {
    flex: 1,
    height: 46,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#475569',
  },
  reagendarText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
  },
  cancelBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Quick Actions
  quickRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  quickCardWrapper: { flex: 1, borderRadius: 28, overflow: 'hidden', ...SHADOWS.sm },
  quickCard: {
    flex: 1,
    padding: SPACING.lg,
    gap: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIcon: {
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  quickLabel: { fontSize: 12, fontWeight: '700', color: COLORS.TEXT_PRIMARY, lineHeight: 16, textAlign: 'center' },

  // Resources
  resourcesHeader: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
  resourcesTag: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.5,
    marginBottom: SPACING.sm,
  },
  resourcesTitle: {
    fontSize: 24,
    fontFamily: TYPOGRAPHY.POPPINS_600,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 28,
  },
  resourcesList: { gap: SPACING.lg, marginBottom: SPACING.lg },
  resourceCard: {
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: COLORS.CARD,
    ...SHADOWS.sm,
  },
  resourceImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.CARD_EL,
  },
  resourceContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  resourceTag: {
    backgroundColor: COLORS.CARD_EL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  resourceTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  resourceTextBox: {
    gap: SPACING.sm,
  },
  resourceTitle: { fontSize: 20, fontWeight: '700', color: COLORS.TEXT_PRIMARY, lineHeight: 28 },
  resourceDesc: { fontSize: 16, color: COLORS.TEXT_SECONDARY, lineHeight: 24 },
  resourceLink: { fontSize: 14, fontWeight: '700', color: COLORS.TEXT_PRIMARY, textTransform: 'uppercase', marginTop: SPACING.md, textDecorationLine: 'underline' },
  resourceMeta: { fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginTop: 3 },
  viewMoreBtn: {
    width: '100%',
    height: 52,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    ...SHADOWS.sm,
  },
  viewMoreText: { fontSize: 16, fontWeight: '700', color: COLORS.TEXT_PRIMARY },
});
