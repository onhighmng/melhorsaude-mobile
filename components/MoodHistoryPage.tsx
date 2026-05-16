import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SPACING, RADIUS } from '@/lib/design-tokens';

interface MoodEntry {
  id: string;
  mood_index: number;
  notes: string | null;
  created_at: string;
}

interface PulseEntry {
  id: string;
  energy: number;
  stress: number;
  humor: number;
  overall_score: number;
  created_at: string;
}

const MOOD_META = [
  { index: 1, emoji: '🙁', label: 'Muito Mal',  pastel: '#FECACA', vivid: '#EF4444' },
  { index: 2, emoji: '😡', label: 'Mal',         pastel: '#FED7AA', vivid: '#F97316' },
  { index: 3, emoji: '😐', label: 'Neutro',      pastel: '#E5E7EB', vivid: '#9CA3AF' },
  { index: 4, emoji: '😊', label: 'Bem',          pastel: '#FEF9C2', vivid: '#FBBF24' },
  { index: 5, emoji: '😄', label: 'Excelente',   pastel: '#D1FAE5', vivid: '#10B981' },
];

const HERO_GRADIENTS: Record<number, readonly [string, string, string]> = {
  1: ['#9f1239', '#e11d48', '#fb7185'],
  2: ['#9a3412', '#ea580c', '#fb923c'],
  3: ['#1e40af', '#2563eb', '#60a5fa'],
  4: ['#0f766e', '#0d9488', '#2dd4bf'],
  5: ['#065f46', '#059669', '#34d399'],
};
const PULSE_GRADIENT = ['#3730a3', '#4f46e5', '#818cf8'] as const;
const DEFAULT_GRADIENT = ['#1e40af', '#2563eb', '#60a5fa'] as const;

function moodByIndex(index: number) {
  return MOOD_META.find(m => m.index === index) ?? MOOD_META[2];
}

function dayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Hoje';
  if (d.toDateString() === yesterday.toDateString()) return 'Ontem';
  return d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
}

type FilterPeriod = 'all' | 'week' | 'month';
type ActiveTab = 'humor' | 'pulse';
interface Props { onBack: () => void; onLogMood?: (moodIndex: number) => void }

export function MoodHistoryPage({ onBack, onLogMood }: Props) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<ActiveTab>('humor');
  const [filter, setFilter] = useState<FilterPeriod>('all');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [pulseEntries, setPulseEntries] = useState<PulseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedMood, setLoggedMood] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const since = filter === 'week'
      ? new Date(Date.now() - 7 * 86400000).toISOString()
      : filter === 'month'
      ? new Date(Date.now() - 30 * 86400000).toISOString()
      : null;

    const moodQ = (supabase.from('mood_entries') as any)
      .select('id, mood_index, notes, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100);
    if (since) moodQ.gte('created_at', since);

    const pulseQ = (supabase.from('pulse_logs') as any)
      .select('id, energy, stress, humor, overall_score, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(60);
    if (since) pulseQ.gte('created_at', since);

    const [{ data: md }, { data: pd }] = await Promise.all([moodQ, pulseQ]);
    setMoodEntries((md || []) as MoodEntry[]);
    setPulseEntries((pd || []) as PulseEntry[]);
    setLoading(false);
  }, [user?.id, filter]);

  const handleInlineMoodLog = useCallback(async (moodIndex: number) => {
    if (!user?.id) return;
    setLoggedMood(moodIndex);
    const { error } = await (supabase.from('mood_entries') as any).insert({
      user_id: user.id,
      mood_index: moodIndex,
      notes: '',
    });
    if (!error) {
      track.moodLogged(MOOD_META[moodIndex - 1]?.label ?? 'unknown', moodIndex);
      setTimeout(() => {
        setLoggedMood(null);
        fetchData();
      }, 1200);
    } else {
      setLoggedMood(null);
    }
    if (onLogMood) onLogMood(moodIndex);
  }, [user?.id, onLogMood, fetchData]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { track.moodHistoryOpened(); }, []);

  const moodCounts = MOOD_META.reduce((acc, m) => {
    acc[m.index] = moodEntries.filter(e => e.mood_index === m.index).length;
    return acc;
  }, {} as Record<number, number>);
  const maxMoodCount = Math.max(...Object.values(moodCounts), 1);
  const bestIdx = MOOD_META.reduce((a, b) => (moodCounts[a.index] ?? 0) >= (moodCounts[b.index] ?? 0) ? a : b);
  const positiveCount = (moodCounts[4] ?? 0) + (moodCounts[5] ?? 0);
  const negativeCount = (moodCounts[1] ?? 0) + (moodCounts[2] ?? 0);
  const trend = moodEntries.length === 0 ? 'stable' : positiveCount > negativeCount ? 'up' : negativeCount > positiveCount ? 'down' : 'stable';
  const trendPct = moodEntries.length === 0 ? 0 : Math.round(((positiveCount - negativeCount) / moodEntries.length) * 100);

  const avgPulse = pulseEntries.length > 0
    ? {
        energy: Math.round(pulseEntries.reduce((s, e) => s + e.energy, 0) / pulseEntries.length * 10) / 10,
        stress: Math.round(pulseEntries.reduce((s, e) => s + e.stress, 0) / pulseEntries.length * 10) / 10,
        humor:  Math.round(pulseEntries.reduce((s, e) => s + e.humor,  0) / pulseEntries.length * 10) / 10,
      }
    : null;

  const heroGradient = tab === 'pulse'
    ? PULSE_GRADIENT
    : (moodEntries.length > 0 ? HERO_GRADIENTS[bestIdx.index] : DEFAULT_GRADIENT);

  return (
    <View style={styles.root}>
      <LinearGradient colors={[...heroGradient]} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Histórico de Humor</Text>
          <View style={{ width: 40 }} />
        </View>

        {tab === 'humor' && (
          <View style={styles.heroCenterBlock}>
            <Text style={styles.heroBigEmoji}>{bestIdx.emoji}</Text>
            <Text style={styles.heroMoodLabel}>{moodEntries.length > 0 ? bestIdx.label : 'Sem dados'}</Text>
            <Text style={styles.heroMoodSub}>{moodEntries.length} registos</Text>
          </View>
        )}
        {tab === 'pulse' && (
          <View style={styles.heroCenterBlock}>
            <Text style={styles.heroBigEmoji}>⚡</Text>
            <Text style={styles.heroMoodLabel}>Check-ins de Pulse</Text>
            <Text style={styles.heroMoodSub}>{pulseEntries.length} registos</Text>
          </View>
        )}

        {tab === 'humor' ? (
          <View style={styles.glassRow}>
            <View style={styles.glassCard}>
              <Text style={styles.glassEmoji}>{bestIdx.emoji}</Text>
              <Text style={styles.glassLabel}>Frequente</Text>
              <Text style={styles.glassValue}>{moodEntries.length > 0 ? bestIdx.label : '—'}</Text>
            </View>
            <View style={styles.glassCard}>
              {trend === 'up' ? <TrendingUp size={22} color="#fff" /> : trend === 'down' ? <TrendingDown size={22} color="#fff" /> : <Minus size={22} color="#fff" />}
              <Text style={styles.glassLabel}>Tendência</Text>
              <Text style={styles.glassValue}>{trend === 'stable' ? 'Estável' : `${trendPct > 0 ? '+' : ''}${trendPct}%`}</Text>
            </View>
            <View style={styles.glassCard}>
              <Text style={styles.glassBigNum}>{moodEntries.length}</Text>
              <Text style={styles.glassLabel}>Total</Text>
              <Text style={styles.glassValue}>registos</Text>
            </View>
          </View>
        ) : avgPulse ? (
          <View style={styles.glassRow}>
            <View style={styles.glassCard}>
              <TrendingUp size={22} color="#fff" />
              <Text style={styles.glassLabel}>Energia</Text>
              <Text style={styles.glassBigNum}>{avgPulse.energy}</Text>
            </View>
            <View style={styles.glassCard}>
              <AlertTriangle size={22} color="#fff" />
              <Text style={styles.glassLabel}>Stress</Text>
              <Text style={styles.glassBigNum}>{avgPulse.stress}</Text>
            </View>
            <View style={styles.glassCard}>
              <TrendingDown size={22} color="#fff" />
              <Text style={styles.glassLabel}>Humor</Text>
              <Text style={styles.glassBigNum}>{avgPulse.humor}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.heroControls}>
          <View style={styles.tabRow}>
            <TouchableOpacity style={[styles.tabBtn, tab === 'humor' && styles.tabBtnActive]} onPress={() => { track.moodHistoryTabChanged('humor'); setTab('humor'); }} activeOpacity={0.8}>
              <Text style={[styles.tabTxt, tab === 'humor' && styles.tabTxtActive]}>Humor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabBtn, tab === 'pulse' && styles.tabBtnActive]} onPress={() => { track.moodHistoryTabChanged('pulse'); setTab('pulse'); }} activeOpacity={0.8}>
              <Text style={[styles.tabTxt, tab === 'pulse' && styles.tabTxtActive]}>Pulse</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterRow}>
            {(['all', 'week', 'month'] as FilterPeriod[]).map((f) => (
              <TouchableOpacity key={f} style={[styles.filterTab, filter === f && styles.filterTabActive]} onPress={() => { track.moodHistoryFilterChanged(f); setFilter(f); }} activeOpacity={0.8}>
                <Text style={[styles.filterTxt, filter === f && styles.filterTxtActive]}>
                  {f === 'all' ? 'Tudo' : f === 'week' ? 'Semana' : 'Mês'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 48 }} color={heroGradient[1]} />
      ) : tab === 'humor' ? (
        <HumorTab entries={moodEntries} moodCounts={moodCounts} maxMoodCount={maxMoodCount} onLogMood={handleInlineMoodLog} loggedMood={loggedMood} />
      ) : (
        <PulseTab entries={pulseEntries} />
      )}
    </View>
  );
}

// ── Humor tab ──────────────────────────────────────────────────────────────────

interface HumorTabProps {
  entries: MoodEntry[];
  moodCounts: Record<number, number>;
  maxMoodCount: number;
  onLogMood: (moodIndex: number) => void;
  loggedMood: number | null;
}

function AnimatedMoodBar({ emoji, label, count, targetPct, vivid, pastel, delay }: {
  emoji: string; label: string; count: number; targetPct: number;
  vivid: string; pastel: string; delay: number;
}) {
  const width = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(width, { toValue: targetPct, duration: 600, delay, useNativeDriver: false }).start();
  }, [targetPct, delay]);
  const animStyle = { width: width.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) };
  return (
    <View style={styles.chartRow}>
      <View style={styles.chartLeft}>
        <Text style={styles.chartEmoji}>{emoji}</Text>
        <Text style={styles.chartLabel}>{label}</Text>
      </View>
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { backgroundColor: vivid }, animStyle]} />
      </View>
      <View style={[styles.countBadge, { backgroundColor: pastel }]}>
        <Text style={[styles.countBadgeTxt, { color: vivid }]}>{count}</Text>
      </View>
    </View>
  );
}

function AnimatedMetricFill({ pct, color }: { pct: number; color: string }) {
  const width = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(width, { toValue: pct, duration: 500, useNativeDriver: false }).start();
  }, [pct]);
  const animStyle = { width: width.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) };
  return <Animated.View style={[styles.metricBarFill, { backgroundColor: color }, animStyle]} />;
}

function HumorTab({ entries, moodCounts, maxMoodCount, onLogMood, loggedMood }: HumorTabProps) {
  const [showAll, setShowAll] = useState(false);

  // Group entries by calendar day
  const groups: { label: string; entries: MoodEntry[] }[] = [];
  const seen: Record<string, number> = {};
  for (const e of entries) {
    const key = new Date(e.created_at).toDateString();
    if (seen[key] === undefined) {
      seen[key] = groups.length;
      groups.push({ label: dayLabel(e.created_at), entries: [] });
    }
    groups[seen[key]].entries.push(e);
  }

  const PREVIEW_DAYS = 2;
  const visibleGroups = showAll ? groups : groups.slice(0, PREVIEW_DAYS);
  const hiddenEntries = showAll ? 0 : groups.slice(PREVIEW_DAYS).reduce((s, g) => s + g.entries.length, 0);

  return (
    <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

      {/* ── Quick mood log */}
      <View style={styles.quickMoodCard}>
        <Text style={styles.quickMoodLabel}>Como te sentes agora?</Text>
        <View style={styles.quickMoodRow}>
          {MOOD_META.map((m) => {
            const isLogged = loggedMood === m.index;
            return (
              <TouchableOpacity
                key={m.index}
                onPress={() => onLogMood(m.index)}
                activeOpacity={0.7}
                style={[styles.quickMoodBtn, isLogged && { backgroundColor: m.pastel, transform: [{ scale: 1.18 }] }]}
              >
                <Text style={{ fontSize: 26 }}>{isLogged ? '✓' : m.emoji}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Horizontal bar chart with emojis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribuição</Text>
        <View style={styles.chart}>
          {MOOD_META.map((m, i) => {
            const count = moodCounts[m.index] || 0;
            const pct = maxMoodCount > 0 ? count / maxMoodCount : 0;
            const targetPct = Math.max(pct * 100, count > 0 ? 4 : 0);
            return (
              <AnimatedMoodBar
                key={m.index}
                emoji={m.emoji}
                label={m.label}
                count={count}
                targetPct={targetPct}
                vivid={m.vivid}
                pastel={m.pastel}
                delay={i * 120}
              />
            );
          })}
        </View>
      </View>

      {/* ── Day-grouped history */}
      <Text style={styles.sectionTitle}>Histórico</Text>
      {entries.length === 0 ? (
        <View style={styles.emptyBlock}>
          <Text style={{ fontSize: 44 }}>📭</Text>
          <Text style={styles.emptyTitle}>Sem registos</Text>
          <Text style={styles.emptyText}>Regista o teu humor na página inicial.</Text>
        </View>
      ) : (
        <>
          {visibleGroups.map((g) => (
            <View key={g.label}>
              <Text style={styles.dayHeader}>{g.label}</Text>
              <View style={styles.dayCards}>
                {g.entries.map((e) => {
                  const meta = moodByIndex(e.mood_index);
                  const time = new Date(e.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
                  return (
                    <View key={e.id} style={[styles.entryCard, { backgroundColor: meta.pastel }]}>
                      <Text style={styles.entryEmoji}>{meta.emoji}</Text>
                      <Text style={[styles.entryMood, { color: meta.vivid, flex: 1 }]}>{meta.label}</Text>
                      <Text style={styles.entryTime}>{time}</Text>
                      <View style={[styles.entryDot, { backgroundColor: meta.vivid }]} />
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          {!showAll && hiddenEntries > 0 && (
            <TouchableOpacity style={styles.showMoreBtn} onPress={() => setShowAll(true)} activeOpacity={0.8}>
              <Text style={styles.showMoreTxt}>Ver todos os registos  •  +{hiddenEntries} entradas</Text>
            </TouchableOpacity>
          )}
          {showAll && groups.length > PREVIEW_DAYS && (
            <TouchableOpacity style={styles.showMoreBtn} onPress={() => setShowAll(false)} activeOpacity={0.8}>
              <Text style={styles.showMoreTxt}>Mostrar menos</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

// ── Pulse tab ──────────────────────────────────────────────────────────────────

function PulseTab({ entries }: { entries: PulseEntry[] }) {
  return (
    <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {entries.length === 0 ? (
        <View style={styles.emptyBlock}>
          <Text style={{ fontSize: 44 }}>⚡</Text>
          <Text style={styles.emptyTitle}>Sem check-ins</Text>
          <Text style={styles.emptyText}>Faz o teu primeiro Pulse check-in na página inicial.</Text>
        </View>
      ) : entries.map((e) => {
        const date = new Date(e.created_at);
        const scoreColor = e.overall_score >= 4 ? '#10B981' : e.overall_score >= 3 ? '#FBBF24' : '#EF4444';
        return (
          <View key={e.id} style={styles.pulseCard}>
            {/* Top row: date + score ring */}
            <View style={styles.pulseCardTop}>
              <View>
                <Text style={styles.pulseDay}>{dayLabel(e.created_at)}</Text>
                <Text style={styles.pulseTime}>
                  {date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              {/* Score ring */}
              <View style={[styles.scoreRing, { borderColor: scoreColor }]}>
                <Text style={[styles.scoreRingNum, { color: scoreColor }]}>{e.overall_score}</Text>
                <Text style={styles.scoreRingLbl}>/ 5</Text>
              </View>
            </View>

            {/* Metric bars */}
            <View style={styles.pulseMetrics}>
              <PulseMetric label="Energia" value={e.energy}  color="#F87171" bg="#FEF2F2" />
              <PulseMetric label="Stress"  value={e.stress}  color="#FBBF24" bg="#FFFBEB" />
              <PulseMetric label="Humor"   value={e.humor}   color="#34D399" bg="#ECFDF5" />
            </View>
          </View>
        );
      })}
      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

function PulseMetric({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  return (
    <View style={[styles.metricPill, { backgroundColor: bg }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={[styles.metricBarTrack, { backgroundColor: color + '30' }]}>
        <AnimatedMetricFill pct={(value / 5) * 100} color={color} />
      </View>
      <Text style={[styles.metricNum, { color }]}>{value}<Text style={styles.metricOf}>/5</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f4f0' },

  // ── Hero (unchanged)
  hero: { paddingBottom: 0 },
  navRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingBottom: 16 },
  backBtn: { width: 38, height: 38, borderRadius: RADIUS.full, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#fff' },
  heroCenterBlock: { alignItems: 'center', paddingBottom: 20 },
  heroBigEmoji: { fontSize: 52 },
  heroMoodLabel: { fontSize: 22, fontWeight: '800', color: '#fff', marginTop: 6 },
  heroMoodSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  glassRow: { flexDirection: 'row', gap: 10, paddingHorizontal: SPACING.lg, paddingBottom: 20 },
  glassCard: { flex: 1, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 8, alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.30)' },
  glassEmoji: { fontSize: 24 },
  glassBigNum: { fontSize: 26, fontWeight: '800', color: '#fff' },
  glassLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.8 },
  glassValue: { fontSize: 12, fontWeight: '700', color: '#fff', textAlign: 'center' },
  heroControls: { backgroundColor: '#f5f4f0', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 16, paddingHorizontal: SPACING.lg, gap: 10, paddingBottom: 0 },
  tabRow: { flexDirection: 'row', gap: 8 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: RADIUS.full, backgroundColor: '#eceae4', alignItems: 'center' },
  tabBtnActive: { backgroundColor: COLORS.PRIMARY },
  tabTxt: { fontSize: 14, fontWeight: '700', color: '#9CA3AF' },
  tabTxtActive: { color: '#fff' },
  filterRow: { flexDirection: 'row', gap: 8, paddingBottom: 12 },
  filterTab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: RADIUS.full, backgroundColor: '#eceae4' },
  filterTabActive: { backgroundColor: COLORS.PRIMARY },
  filterTxt: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  filterTxtActive: { color: '#fff' },

  // ── Scroll
  scrollArea: { flex: 1, backgroundColor: '#f5f4f0' },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },

  // Quick mood log
  quickMoodCard: {
    backgroundColor: '#fff', borderRadius: 24, padding: SPACING.lg, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  quickMoodLabel: { fontSize: 13, fontWeight: '700', color: COLORS.TEXT_SECONDARY, marginBottom: 12, textAlign: 'center' },
  quickMoodRow: { flexDirection: 'row', justifyContent: 'space-around' },
  quickMoodBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },

  section: {
    backgroundColor: '#fff', borderRadius: 24, padding: SPACING.lg, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.TEXT_PRIMARY, marginBottom: 16 },

  // Horizontal bar chart
  chart: { gap: 10 },
  chartRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chartLeft: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 110 },
  chartEmoji: { fontSize: 20 },
  chartLabel: { fontSize: 12, fontWeight: '600', color: COLORS.TEXT_SECONDARY, flexShrink: 1 },
  barTrack: { flex: 1, height: 14, backgroundColor: '#F3F4F6', borderRadius: 7, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 7 },
  countBadge: { minWidth: 30, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7 },
  countBadgeTxt: { fontSize: 11, fontWeight: '800' },

  // Show more button
  showMoreBtn: {
    borderRadius: 18, paddingVertical: 14, paddingHorizontal: 20,
    backgroundColor: '#fff', alignItems: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  showMoreTxt: { fontSize: 14, fontWeight: '700', color: COLORS.PRIMARY },

  // Day-grouped history
  dayHeader: {
    fontSize: 12, fontWeight: '700', color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase', letterSpacing: 1.2,
    marginBottom: 8, marginTop: 4,
  },
  dayCards: { gap: 8, marginBottom: 16 },
  entryCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 18, paddingVertical: 12, paddingHorizontal: 14,
  },
  entryEmoji: { fontSize: 26 },
  entryMood: { fontSize: 15, fontWeight: '700' },
  entryTime: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  entryDot: { width: 8, height: 8, borderRadius: 4 },

  // Empty state
  emptyBlock: { alignItems: 'center', paddingVertical: 48, gap: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.TEXT_PRIMARY },
  emptyText: { fontSize: 14, color: COLORS.TEXT_SECONDARY, textAlign: 'center', lineHeight: 20 },

  // Pulse cards
  pulseCard: {
    backgroundColor: '#fff', borderRadius: 22, padding: 16, marginBottom: 12, gap: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  pulseCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pulseDay: { fontSize: 15, fontWeight: '800', color: COLORS.TEXT_PRIMARY },
  pulseTime: { fontSize: 12, color: COLORS.TEXT_SECONDARY, marginTop: 2 },

  // Score ring
  scoreRing: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 3,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scoreRingNum: { fontSize: 20, fontWeight: '900', lineHeight: 22 },
  scoreRingLbl: { fontSize: 9, fontWeight: '600', color: COLORS.TEXT_SECONDARY, lineHeight: 11 },

  // Metric bars
  pulseMetrics: { flexDirection: 'row', gap: 8 },
  metricPill: { flex: 1, borderRadius: 14, padding: 10, gap: 7 },
  metricLabel: { fontSize: 9, fontWeight: '700', color: COLORS.TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricBarTrack: { width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' },
  metricBarFill: { height: '100%', borderRadius: 4 },
  metricNum: { fontSize: 16, fontWeight: '800', lineHeight: 18 },
  metricOf: { fontSize: 10, fontWeight: '600', color: COLORS.TEXT_SECONDARY },
});
