import { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Layout, FileText, Play, Music, Clock, Library } from 'lucide-react-native';
import { useResources, Resource } from '@/hooks/use-resources';
import { ResourceViewer } from '@/components/ResourceViewer';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '@/lib/design-tokens';

interface Props {
  onBack: () => void;
}

const PILLAR_FILTERS = [
  { id: 'all',       label: 'Todos',     color: COLORS.PRIMARY },
  { id: 'PSYCH',     label: 'Mental',    color: COLORS.PILLAR_MENTAL },
  { id: 'PHYSICAL',  label: 'Físico',    color: COLORS.PILLAR_FISICO },
  { id: 'FINANCIAL', label: 'Finanças',  color: COLORS.PILLAR_FINANCEIRA },
  { id: 'LEGAL',     label: 'Jurídico',  color: COLORS.PILLAR_JURIDICA },
];

const TYPE_FILTERS = [
  { id: 'all',     label: 'Tudo' },
  { id: 'article', label: 'Artigos' },
  { id: 'video',   label: 'Vídeos' },
  { id: 'audio',   label: 'Áudio' },
];

const PILLAR_COLORS: Record<string, string> = {
  PSYCH:     COLORS.PILLAR_MENTAL,
  PHYSICAL:  COLORS.PILLAR_FISICO,
  FINANCIAL: COLORS.PILLAR_FINANCEIRA,
  LEGAL:     COLORS.PILLAR_JURIDICA,
};

const TYPE_LABELS: Record<string, string> = {
  article: 'Artigo',
  video:   'Vídeo',
  audio:   'Áudio',
};

function TypeIcon({ type, size, color }: { type: string; size: number; color: string }) {
  if (type === 'video')   return <Play   size={size} color={color} />;
  if (type === 'audio')   return <Music  size={size} color={color} />;
  return                         <FileText size={size} color={color} />;
}

function ResourceCard({ resource, onPress }: { resource: Resource; onPress: () => void }) {
  const color = PILLAR_COLORS[resource.pillar_code ?? ''] ?? COLORS.PRIMARY;
  const pillarLabel = PILLAR_FILTERS.find(p => p.id === resource.pillar_code)?.label;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      {/* Thumbnail */}
      <View style={styles.thumb}>
        {resource.thumbnail_url ? (
          <Image
            source={{ uri: resource.thumbnail_url }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, styles.thumbPlaceholder, { backgroundColor: color + '18' }]}>
            <TypeIcon type={resource.resource_type} size={36} color={color} />
          </View>
        )}

        {/* Play overlay for videos */}
        {resource.resource_type === 'video' && resource.thumbnail_url && (
          <View style={styles.playOverlay}>
            <View style={styles.playCircle}>
              <Play size={18} color="#fff" fill="#fff" />
            </View>
          </View>
        )}

        {/* Type badge */}
        <View style={[styles.typeBadge, { backgroundColor: color }]}>
          <TypeIcon type={resource.resource_type} size={10} color="#fff" />
          <Text style={styles.typeBadgeText}>{TYPE_LABELS[resource.resource_type] ?? resource.resource_type}</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{resource.title_pt}</Text>
        {resource.description_pt ? (
          <Text style={styles.cardDesc} numberOfLines={2}>{resource.description_pt}</Text>
        ) : null}
        <View style={styles.cardMeta}>
          {resource.duration_minutes ? (
            <View style={styles.metaPill}>
              <Clock size={12} color={COLORS.TEXT_SECONDARY} />
              <Text style={styles.metaText}>{resource.duration_minutes} min</Text>
            </View>
          ) : null}
          {pillarLabel ? (
            <View style={[styles.metaPill, { backgroundColor: color + '18' }]}>
              <Text style={[styles.metaText, { color }]}>{pillarLabel}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function RecursosPage({ onBack }: Props) {
  const { resources, loading } = useResources();
  const [pillarFilter, setPillarFilter] = useState('all');
  const [typeFilter, setTypeFilter]     = useState('all');
  const [viewing, setViewing]           = useState<Resource | null>(null);

  const filtered = useMemo(() => resources.filter((r) => {
    const pillarOk = pillarFilter === 'all' || r.pillar_code === pillarFilter;
    const typeOk   = typeFilter   === 'all' || r.resource_type === typeFilter;
    return pillarOk && typeOk;
  }), [resources, pillarFilter, typeFilter]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <ArrowLeft size={22} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
            <Text style={styles.title}>Recursos</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Pillar filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {PILLAR_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterPill, pillarFilter === f.id && { backgroundColor: f.color }]}
                onPress={() => setPillarFilter(f.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterPillText, pillarFilter === f.id && { color: '#fff' }]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Type filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.filterRow, { paddingBottom: 12 }]}>
            {TYPE_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[styles.typeFilterPill, typeFilter === f.id && styles.typeFilterPillActive]}
                onPress={() => setTypeFilter(f.id)}
                activeOpacity={0.8}
              >
                {f.id === 'all'     ? <Layout   size={14} color={typeFilter === f.id ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} />
                : f.id === 'article'? <FileText size={14} color={typeFilter === f.id ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} />
                : f.id === 'video'  ? <Play     size={14} color={typeFilter === f.id ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} />
                :                     <Music    size={14} color={typeFilter === f.id ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} />}
                <Text style={[styles.typeFilterText, typeFilter === f.id && { color: COLORS.PRIMARY }]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {loading ? null : filtered.length === 0 ? (
          <View style={styles.empty}>
            <Library size={48} color="#D1D5DB" style={{ marginBottom: 12 }} />
            <Text style={styles.emptyText}>Sem recursos para este filtro.</Text>
          </View>
        ) : (
          filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} onPress={() => setViewing(r)} />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* In-app viewer */}
      <ResourceViewer resource={viewing} onClose={() => setViewing(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },
  header: { borderBottomWidth: 1, borderBottomColor: COLORS.BORDER, backgroundColor: COLORS.BG },
  headerInner: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: 12, paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: RADIUS.full,
    backgroundColor: COLORS.CARD, alignItems: 'center', justifyContent: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY },
  filterRow: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.sm },
  filterPill: { paddingHorizontal: SPACING.md, paddingVertical: 7, borderRadius: RADIUS.full, backgroundColor: COLORS.CARD },
  filterPillText: { fontSize: 13, fontFamily: TYPOGRAPHY.JAKARTA_600, color: COLORS.TEXT_SECONDARY },
  typeFilterPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: SPACING.md, paddingVertical: 7,
    borderRadius: RADIUS.full, backgroundColor: COLORS.CARD,
  },
  typeFilterPillActive: { backgroundColor: '#EFF6FF' },
  typeFilterText: { fontSize: 13, fontFamily: TYPOGRAPHY.JAKARTA_600, color: COLORS.TEXT_SECONDARY },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, gap: SPACING.lg },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: COLORS.TEXT_SECONDARY, textAlign: 'center' },

  card: {
    backgroundColor: COLORS.CARD, borderRadius: RADIUS.xl,
    overflow: 'hidden', borderWidth: 1, borderColor: COLORS.BORDER,
  },
  thumb: { height: 180, position: 'relative', backgroundColor: COLORS.CARD_EL },
  thumbPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
  },
  playCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center', justifyContent: 'center',
    paddingLeft: 4,
  },
  typeBadge: {
    position: 'absolute', bottom: 10, left: 10,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.full,
  },
  typeBadgeText: { fontSize: 10, fontFamily: TYPOGRAPHY.JAKARTA_700, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody: { padding: SPACING.md },
  cardTitle: { fontSize: 17, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY, lineHeight: 23, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: COLORS.TEXT_SECONDARY, lineHeight: 19, marginBottom: 10 },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  metaPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.CARD_EL, paddingHorizontal: 10,
    paddingVertical: 5, borderRadius: RADIUS.full,
  },
  metaText: { fontSize: 11, fontFamily: TYPOGRAPHY.JAKARTA_600, color: COLORS.TEXT_SECONDARY },
});
