import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface MoodEntry {
  id: string;
  mood_type: string;
  created_at: string;
}

const MOOD_META: Record<string, { emoji: string; label: string; color: string }> = {
  'very-sad': { emoji: '🙁', label: 'Muito Triste', color: '#BFDBFE' },
  sad:        { emoji: '😡', label: 'Frustrado',   color: '#FECACA' },
  neutral:    { emoji: '😐', label: 'Neutro',       color: '#F3F4F6' },
  good:       { emoji: '😊', label: 'Bem',          color: '#FEF3C7' },
  great:      { emoji: '😃', label: 'Ótimo',        color: '#D1FAE5' },
};

const MOOD_ORDER = ['very-sad', 'sad', 'neutral', 'good', 'great'];

type FilterPeriod = 'all' | 'week' | 'month';

interface Props {
  onBack: () => void;
}

export function MoodHistoryPage({ onBack }: Props) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterPeriod>('all');

  useEffect(() => {
    if (!user?.id) return;
    let query = supabase
      .from('mood_logs')
      .select('id, mood_type, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (filter === 'week') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      query = query.gte('created_at', d.toISOString());
    } else if (filter === 'month') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      query = query.gte('created_at', d.toISOString());
    }

    query.limit(100).then(({ data }) => {
      setEntries((data || []) as MoodEntry[]);
      setLoading(false);
    });
  }, [user?.id, filter]);

  const moodCounts = MOOD_ORDER.reduce((acc, m) => {
    acc[m] = entries.filter(e => e.mood_type === m).length;
    return acc;
  }, {} as Record<string, number>);

  const mostFrequent = MOOD_ORDER.reduce((a, b) => moodCounts[a] >= moodCounts[b] ? a : b);
  const maxCount = Math.max(...Object.values(moodCounts), 1);

  const positiveCount = (moodCounts['good'] || 0) + (moodCounts['great'] || 0);
  const negativeCount = (moodCounts['very-sad'] || 0) + (moodCounts['sad'] || 0);
  const trend = entries.length === 0 ? 'stable' : positiveCount > negativeCount ? 'up' : negativeCount > positiveCount ? 'down' : 'stable';
  const trendPct = entries.length === 0 ? 0 : Math.round(((positiveCount - negativeCount) / entries.length) * 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={22} color="#0a0a0a" />
            </TouchableOpacity>
            <Text style={styles.title}>Histórico de Humor</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Filter tabs */}
          <View style={styles.filterRow}>
            {(['all', 'week', 'month'] as FilterPeriod[]).map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterTab, filter === f && styles.filterTabActive]}
                onPress={() => setFilter(f)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                  {f === 'all' ? 'Tudo' : f === 'week' ? 'Semana' : 'Mês'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 48 }} color="#1565C0" />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>{MOOD_META[mostFrequent]?.emoji || '😐'}</Text>
              <Text style={styles.statLabel}>Mais Frequente</Text>
              <Text style={styles.statValue}>{MOOD_META[mostFrequent]?.label || '—'}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons
                name={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove'}
                size={28}
                color={trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#9CA3AF'}
              />
              <Text style={styles.statLabel}>Tendência</Text>
              <Text style={[
                styles.statValue,
                { color: trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#474747' }
              ]}>
                {trend === 'stable' ? 'Estável' : `${trendPct > 0 ? '+' : ''}${trendPct}%`}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statBigNum}>{entries.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
              <Text style={styles.statValue}>registos</Text>
            </View>
          </View>

          {/* Distribution bar chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distribuição</Text>
            <View style={styles.chart}>
              {MOOD_ORDER.map((m) => {
                const count = moodCounts[m] || 0;
                const pct = maxCount > 0 ? (count / maxCount) : 0;
                const meta = MOOD_META[m];
                return (
                  <View key={m} style={styles.chartRow}>
                    <Text style={styles.chartEmoji}>{meta.emoji}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          { width: `${Math.max(pct * 100, 2)}%`, backgroundColor: meta.color === '#F3F4F6' ? '#D1D5DB' : meta.color },
                        ]}
                      />
                    </View>
                    <Text style={styles.chartCount}>{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* History list */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Histórico</Text>
            {entries.length === 0 ? (
              <Text style={styles.emptyText}>Sem registos para este período.</Text>
            ) : (
              entries.map((e) => {
                const meta = MOOD_META[e.mood_type] || MOOD_META.neutral;
                const date = new Date(e.created_at);
                return (
                  <View key={e.id} style={styles.historyRow}>
                    <View style={[styles.historyEmoji, { backgroundColor: meta.color }]}>
                      <Text style={{ fontSize: 20 }}>{meta.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyMood}>{meta.label}</Text>
                      <Text style={styles.historyDate}>
                        {date.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff',
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f1ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#0a0a0a' },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 1000,
    backgroundColor: '#f2f1ef',
  },
  filterTabActive: { backgroundColor: '#1565C0' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#474747' },
  filterTextActive: { color: '#ffffff' },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#f2f1ef',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: { fontSize: 28 },
  statBigNum: { fontSize: 28, fontWeight: '700', color: '#0a0a0a' },
  statLabel: { fontSize: 10, fontWeight: '700', color: '#474747', opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1 },
  statValue: { fontSize: 13, fontWeight: '700', color: '#0a0a0a', textAlign: 'center' },
  section: {
    backgroundColor: '#f2f1ef',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0a0a0a', marginBottom: 16 },
  chart: { gap: 12 },
  chartRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chartEmoji: { fontSize: 20, width: 28 },
  barTrack: { flex: 1, height: 10, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },
  chartCount: { width: 24, fontSize: 13, fontWeight: '700', color: '#474747', textAlign: 'right' },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  historyEmoji: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyMood: { fontSize: 15, fontWeight: '600', color: '#0a0a0a' },
  historyDate: { fontSize: 12, color: '#474747', marginTop: 2 },
  emptyText: { fontSize: 14, color: '#474747', textAlign: 'center', paddingVertical: 20 },
});
