import { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Linking, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResources, Resource, ResourcePillar, ResourceType } from '@/hooks/use-resources';

interface Props {
  onBack: () => void;
}

const PILLAR_FILTERS: { id: string; label: string; color: string }[] = [
  { id: 'all',       label: 'Todos',     color: '#1565C0' },
  { id: 'PSYCH',     label: 'Mental',    color: '#1565C0' },
  { id: 'PHYSICAL',  label: 'Físico',    color: '#FB923C' },
  { id: 'FINANCIAL', label: 'Finanças',  color: '#34D399' },
  { id: 'LEGAL',     label: 'Jurídico',  color: '#F472B6' },
];

const TYPE_FILTERS: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all',     label: 'Tudo',    icon: 'grid-outline'   },
  { id: 'article', label: 'Artigos', icon: 'document-text-outline' },
  { id: 'video',   label: 'Vídeos',  icon: 'play-circle-outline'  },
  { id: 'audio',   label: 'Áudio',   icon: 'musical-notes-outline' },
];

const TYPE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  article: 'document-text',
  video: 'play-circle',
  audio: 'musical-notes',
};

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: '#1565C0',
  PHYSICAL: '#FB923C',
  FINANCIAL: '#34D399',
  LEGAL: '#F472B6',
};

const fallbackBg = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=220&fit=crop';

function ResourceCard({ resource }: { resource: Resource }) {
  const color = PILLAR_COLORS[resource.pillar || ''] || '#1565C0';

  const handlePress = async () => {
    const url = resource.video_url || resource.audio_url;
    if (url) {
      await Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.88}
    >
      {/* Thumbnail */}
      <View style={styles.thumb}>
        {resource.thumbnail_url ? (
          <Image source={{ uri: resource.thumbnail_url }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }]}>
            <Ionicons name={TYPE_ICONS[resource.content_type] || 'document-text'} size={32} color={color} />
          </View>
        )}
        {/* Type badge */}
        <View style={[styles.typeBadge, { backgroundColor: color }]}>
          <Ionicons name={TYPE_ICONS[resource.content_type] || 'document-text'} size={11} color="#fff" />
          <Text style={styles.typeBadgeText}>
            {resource.content_type === 'article' ? 'Artigo' : resource.content_type === 'video' ? 'Vídeo' : 'Áudio'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{resource.title_pt}</Text>
        {resource.summary_pt ? (
          <Text style={styles.cardSummary} numberOfLines={2}>{resource.summary_pt}</Text>
        ) : null}
        <View style={styles.cardMeta}>
          {resource.read_time_minutes ? (
            <View style={styles.metaPill}>
              <Ionicons name="time-outline" size={12} color="#474747" />
              <Text style={styles.metaText}>{resource.read_time_minutes} min</Text>
            </View>
          ) : null}
          {resource.pillar ? (
            <View style={[styles.metaPill, { backgroundColor: color + '18' }]}>
              <Text style={[styles.metaText, { color }]}>
                {PILLAR_FILTERS.find(p => p.id === resource.pillar)?.label || resource.pillar}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function RecursosPage({ onBack }: Props) {
  const { resources, loading } = useResources();
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const pillarOk = pillarFilter === 'all' || r.pillar === pillarFilter;
      const typeOk = typeFilter === 'all' || r.content_type === typeFilter;
      return pillarOk && typeOk;
    });
  }, [resources, pillarFilter, typeFilter]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={22} color="#0a0a0a" />
            </TouchableOpacity>
            <Text style={styles.title}>Recursos</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Pillar filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {PILLAR_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.filterPill,
                  pillarFilter === f.id && { backgroundColor: f.color },
                ]}
                onPress={() => setPillarFilter(f.id)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterPillText,
                  pillarFilter === f.id && { color: '#ffffff' },
                ]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Type filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.filterRow, { paddingBottom: 12 }]}
          >
            {TYPE_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.typeFilterPill,
                  typeFilter === f.id && styles.typeFilterPillActive,
                ]}
                onPress={() => setTypeFilter(f.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={f.icon}
                  size={14}
                  color={typeFilter === f.id ? '#1565C0' : '#474747'}
                />
                <Text style={[
                  styles.typeFilterText,
                  typeFilter === f.id && { color: '#1565C0' },
                ]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="library-outline" size={48} color="#D1D5DB" style={{ marginBottom: 12 }} />
            <Text style={styles.emptyText}>Sem recursos para este filtro.</Text>
          </View>
        ) : (
          filtered.map((r) => <ResourceCard key={r.id} resource={r} />)
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
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
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 8 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 1000,
    backgroundColor: '#f2f1ef',
  },
  filterPillText: { fontSize: 13, fontWeight: '600', color: '#474747' },
  typeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 1000,
    backgroundColor: '#f2f1ef',
  },
  typeFilterPillActive: { backgroundColor: '#EFF6FF' },
  typeFilterText: { fontSize: 13, fontWeight: '600', color: '#474747' },
  scroll: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: '#474747', textAlign: 'center' },
  card: {
    backgroundColor: '#f2f1ef',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  thumb: { height: 160, position: 'relative', backgroundColor: '#ecece7' },
  typeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#0a0a0a', lineHeight: 23, marginBottom: 6 },
  cardSummary: { fontSize: 13, color: '#474747', lineHeight: 19, marginBottom: 10 },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ecece7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1000,
  },
  metaText: { fontSize: 11, fontWeight: '600', color: '#474747' },
});
