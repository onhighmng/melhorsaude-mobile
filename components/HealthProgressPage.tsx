import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '@/lib/design-tokens';

interface PulseLog {
  id: string;
  energy: number;
  stress: number;
  humor: number;
  overall_score: number;
  created_at: string;
}

interface MoodEntry {
  id: string;
  mood_index: number;
  created_at: string;
}

interface Props {
  onBack: () => void;
  onLogPulse?: () => void;
}

const SCORE_LABELS: Record<number, string> = {
  1: 'Precisa de atenção', 2: 'Abaixo do ideal', 3: 'Neutro', 4: 'Bom', 5: 'Excelente',
};
const MOOD_EMOJIS: Record<number, string> = {
  1: '🙁', 2: '😡', 3: '😐', 4: '😊', 5: '😄',
};
const MOOD_LABELS: Record<number, string> = {
  1: 'Muito Mal', 2: 'Mal', 3: 'Neutro', 4: 'Bem', 5: 'Excelente',
};

function scoreColor(s: number) {
  return s >= 4 ? '#10B981' : s >= 3 ? '#D97706' : '#EF4444';
}
function scoreBg(s: number) {
  return s >= 4 ? '#D1FAE5' : s >= 3 ? '#FEF9C2' : '#FEE2E2';
}

function TrendIcon({ current, previous }: { current: number; previous: number }) {
  if (current > previous) return <TrendingUp size={16} color="#10B981" />;
  if (current < previous) return <TrendingDown size={16} color="#EF4444" />;
  return <Minus size={16} color="#9CA3AF" />;
}

function CollapsibleSection({ title, sectionId, children }: { title: string; sectionId?: 'pulse_history' | 'mood'; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={() => { const next = !open; setOpen(next); if (next && sectionId) track.healthProgressSectionExpanded(sectionId); }} activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {open
          ? <ChevronUp size={18} color={COLORS.TEXT_SECONDARY} />
          : <ChevronDown size={18} color={COLORS.TEXT_SECONDARY} />}
      </TouchableOpacity>
      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
}

export function HealthProgressPage({ onBack, onLogPulse }: Props) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [pulseLogs, setPulseLogs] = useState<PulseLog[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const [pulseRes, moodRes] = await Promise.all([
      (supabase.from('pulse_logs') as any)
        .select('id, energy, stress, humor, overall_score, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10),
      (supabase.from('mood_entries') as any)
        .select('id, mood_index, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(14),
    ]);
    setPulseLogs(pulseRes.data || []);
    setMoodEntries(moodRes.data || []);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { track.healthProgressOpened(); }, []);

  const latest = pulseLogs[0] ?? null;
  const previous = pulseLogs[1] ?? null;
  const avgMood = moodEntries.length
    ? Math.round(moodEntries.reduce((s, e) => s + e.mood_index, 0) / moodEntries.length)
    : null;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });

  return (
    <View style={styles.container}>
      {/* ── Header + Hero */}
      <LinearGradient
        colors={['#fcc066', '#f5efe6']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft color={COLORS.TEXT_PRIMARY} size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Progresso da Saúde</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero score — only when data is ready */}
        {!loading && latest && (
          <View style={styles.heroCard}>
            {/* Big score */}
            <View style={styles.heroScoreBlock}>
              <Text style={styles.heroNumber}>{latest.overall_score}</Text>
              <Text style={styles.heroMax}>/5</Text>
              {previous && (
                <View style={styles.heroTrend}>
                  <TrendIcon current={latest.overall_score} previous={previous.overall_score} />
                </View>
              )}
            </View>

            {/* Label + date + pills */}
            <View style={styles.heroMeta}>
              <Text style={[styles.heroLabel, { color: scoreColor(latest.overall_score) }]}>
                {SCORE_LABELS[latest.overall_score] ?? 'Bom'}
              </Text>
              <Text style={styles.heroDate}>Último check-in · {formatDate(latest.created_at)}</Text>
              <View style={styles.pillRow}>
                <View style={styles.pill}><Text style={styles.pillText}>⚡ {latest.energy}/5</Text></View>
                <View style={styles.pill}><Text style={styles.pillText}>💨 {latest.stress}/5</Text></View>
                <View style={styles.pill}><Text style={styles.pillText}>🧠 {latest.humor}/5</Text></View>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 48 }} color={COLORS.PRIMARY} size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: 48 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Empty state */}
          {!latest && (
            <View style={styles.empty}>
              <TrendingUp size={48} color="#D1D5DB" strokeWidth={1} />
              <Text style={styles.emptyTitle}>Sem dados ainda</Text>
              <Text style={styles.emptyText}>
                Faz o teu primeiro check-in Pulse para ver o teu progresso aqui.
              </Text>
              {onLogPulse && (
                <TouchableOpacity style={styles.checkinBtn} onPress={onLogPulse} activeOpacity={0.85}>
                  <Text style={styles.checkinBtnText}>Fazer Check-in Pulse</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Check-in CTA when data exists */}
          {latest && onLogPulse && (
            <TouchableOpacity style={styles.checkinBannerBtn} onPress={onLogPulse} activeOpacity={0.85}>
              <Text style={styles.checkinBannerText}>⚡  Novo Check-in Pulse</Text>
            </TouchableOpacity>
          )}

          {/* Pulse history */}
          {pulseLogs.length > 0 && (
            <CollapsibleSection title="Histórico de Pulse" sectionId="pulse_history">
              {pulseLogs.map((log, i) => (
                <View
                  key={log.id}
                  style={[styles.historyRow, i < pulseLogs.length - 1 && styles.historyDivider]}
                >
                  <Text style={styles.historyDate}>{formatDate(log.created_at)}</Text>
                  <Text style={styles.historyScores}>⚡ {log.energy}  💨 {log.stress}  🧠 {log.humor}</Text>
                  <View style={[styles.scoreBadge, { backgroundColor: scoreBg(log.overall_score) }]}>
                    <Text style={[styles.scoreBadgeText, { color: scoreColor(log.overall_score) }]}>
                      {log.overall_score}/5
                    </Text>
                  </View>
                </View>
              ))}
            </CollapsibleSection>
          )}

          {/* Mood section */}
          {moodEntries.length > 0 && (
            <CollapsibleSection title="Humor Recente" sectionId="mood">
              {avgMood !== null && (
                <View style={styles.moodAvgRow}>
                  <Text style={styles.moodAvgEmoji}>{MOOD_EMOJIS[avgMood]}</Text>
                  <View>
                    <Text style={styles.moodAvgLabel}>Média de {moodEntries.length} registos</Text>
                    <Text style={styles.moodAvgValue}>{MOOD_LABELS[avgMood]}</Text>
                  </View>
                </View>
              )}
              <View style={styles.moodGrid}>
                {moodEntries.slice(0, 10).map((e) => (
                  <View key={e.id} style={styles.moodChip}>
                    <Text style={styles.moodEmoji}>{MOOD_EMOJIS[e.mood_index]}</Text>
                    <Text style={styles.moodDate}>{formatDate(e.created_at)}</Text>
                  </View>
                ))}
              </View>
            </CollapsibleSection>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },

  // Header
  header: { paddingBottom: SPACING.lg },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    flex: 1, textAlign: 'center', fontSize: 18,
    fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY,
  },

  // Hero card
  heroCard: {
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  heroScoreBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  heroNumber: {
    fontSize: 60,
    fontFamily: TYPOGRAPHY.POPPINS_600,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 68,
  },
  heroMax: {
    fontSize: 20,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 10,
  },
  heroTrend: { marginBottom: 12, marginLeft: 4 },
  heroMeta: { flex: 1, gap: 4 },
  heroLabel: { fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600 },
  heroDate: { fontSize: 11, color: COLORS.TEXT_SECONDARY },
  pillRow: { flexDirection: 'row', gap: 5, flexWrap: 'wrap', marginTop: 6 },
  pill: {
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pillText: { fontSize: 11, fontWeight: '700', color: COLORS.TEXT_PRIMARY },

  // Scroll
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },

  // Collapsible
  section: {
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
  },
  sectionTitle: { fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY },
  sectionBody: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },

  // Pulse history rows
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  historyDivider: { borderBottomWidth: 1, borderBottomColor: COLORS.CARD_EL },
  historyDate: { fontSize: 12, color: COLORS.TEXT_SECONDARY, width: 64 },
  historyScores: { flex: 1, fontSize: 13, color: COLORS.TEXT_PRIMARY },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full },
  scoreBadgeText: { fontSize: 12, fontWeight: '700' },

  // Mood
  moodAvgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.BG,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  moodAvgEmoji: { fontSize: 32 },
  moodAvgLabel: { fontSize: 11, color: COLORS.TEXT_SECONDARY },
  moodAvgValue: { fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  moodChip: {
    alignItems: 'center',
    backgroundColor: COLORS.BG,
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 52,
  },
  moodEmoji: { fontSize: 20, marginBottom: 2 },
  moodDate: { fontSize: 10, color: COLORS.TEXT_SECONDARY },

  // Empty
  empty: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: SPACING.xl },
  emptyTitle: {
    fontSize: 18, fontFamily: TYPOGRAPHY.POPPINS_600,
    color: COLORS.TEXT_PRIMARY, marginTop: SPACING.md,
  },
  emptyText: {
    fontSize: 14, color: COLORS.TEXT_SECONDARY,
    textAlign: 'center', marginTop: SPACING.sm, lineHeight: 20,
  },
  checkinBtn: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: RADIUS.full,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  checkinBtnText: { color: '#fff', fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600 },
  checkinBannerBtn: {
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
  },
  checkinBannerText: { fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.PRIMARY },
});
