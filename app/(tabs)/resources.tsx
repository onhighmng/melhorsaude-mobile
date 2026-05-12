import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, TextInput, Modal, Pressable,
  Dimensions, Linking,
} from 'react-native';
import { useState, useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useResources, Resource, ResourceType } from '@/hooks/use-resources';

const { width } = Dimensions.get('window');

const TYPE_TABS: { id: ResourceType | 'all'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all',     label: 'Todos',   icon: 'grid-outline' },
  { id: 'article', label: 'Artigos', icon: 'document-text-outline' },
  { id: 'video',   label: 'Vídeos',  icon: 'play-circle-outline' },
  { id: 'audio',   label: 'Áudio',   icon: 'headset-outline' },
];

const PILLAR_COLOR: Record<string, string> = {
  PSYCH: '#DBEAFE', PHYSICAL: '#FEF3C7', FINANCIAL: '#D1FAE5', LEGAL: '#FCE7F3',
};
const PILLAR_LABEL: Record<string, string> = {
  PSYCH: 'Mental', PHYSICAL: 'Físico', FINANCIAL: 'Financeiro', LEGAL: 'Jurídico',
};
const TYPE_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  article: 'document-text-outline',
  video: 'play-circle-outline',
  audio: 'headset-outline',
};
const TYPE_COLOR: Record<string, string> = {
  article: '#2563EB', video: '#7C3AED', audio: '#059669',
};

function ResourceCard({ item, onPress }: { item: Resource; onPress: (r: Resource) => void }) {
  const fallback = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.8}>
      <Image
        source={{ uri: item.thumbnail_url || fallback }}
        style={styles.cardImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.cardBody}>
        <View style={styles.cardMeta}>
          <View style={[styles.typeBadge, { backgroundColor: TYPE_COLOR[item.content_type] + '18' }]}>
            <Ionicons name={TYPE_ICON[item.content_type]} size={11} color={TYPE_COLOR[item.content_type]} />
            <Text style={[styles.typeBadgeText, { color: TYPE_COLOR[item.content_type] }]}>
              {item.content_type === 'article' ? 'Artigo' : item.content_type === 'video' ? 'Vídeo' : 'Áudio'}
            </Text>
          </View>
          {item.pillar && (
            <View style={[styles.pillarBadge, { backgroundColor: PILLAR_COLOR[item.pillar] }]}>
              <Text style={styles.pillarBadgeText}>{PILLAR_LABEL[item.pillar]}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title_pt}</Text>
        {item.summary_pt && (
          <Text style={styles.cardSummary} numberOfLines={2}>{item.summary_pt}</Text>
        )}
        {item.read_time_minutes && (
          <View style={styles.readTimeRow}>
            <Ionicons name="time-outline" size={12} color="#94A3B8" />
            <Text style={styles.readTime}>{item.read_time_minutes} min</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ResourceDetailModal({ resource, onClose }: { resource: Resource | null; onClose: () => void }) {
  if (!resource) return null;
  const fallback = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop';

  const handleOpen = () => {
    const url = resource.video_url || resource.audio_url;
    if (url) Linking.openURL(url);
  };

  return (
    <Modal visible={!!resource} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalSheet} onPress={() => {}}>
          <View style={styles.modalHandle} />
          <Image
            source={{ uri: resource.thumbnail_url || fallback }}
            style={styles.modalImage}
            contentFit="cover"
          />
          <View style={styles.modalBody}>
            <View style={styles.cardMeta}>
              <View style={[styles.typeBadge, { backgroundColor: TYPE_COLOR[resource.content_type] + '18' }]}>
                <Ionicons name={TYPE_ICON[resource.content_type]} size={11} color={TYPE_COLOR[resource.content_type]} />
                <Text style={[styles.typeBadgeText, { color: TYPE_COLOR[resource.content_type] }]}>
                  {resource.content_type === 'article' ? 'Artigo' : resource.content_type === 'video' ? 'Vídeo' : 'Áudio'}
                </Text>
              </View>
              {resource.pillar && (
                <View style={[styles.pillarBadge, { backgroundColor: PILLAR_COLOR[resource.pillar] }]}>
                  <Text style={styles.pillarBadgeText}>{PILLAR_LABEL[resource.pillar]}</Text>
                </View>
              )}
            </View>
            <Text style={styles.modalTitle}>{resource.title_pt}</Text>
            {resource.summary_pt && (
              <Text style={styles.modalSummary}>{resource.summary_pt}</Text>
            )}
            {(resource.video_url || resource.audio_url) && (
              <TouchableOpacity style={styles.openBtn} onPress={handleOpen} activeOpacity={0.85}>
                <Ionicons
                  name={resource.content_type === 'audio' ? 'headset' : 'play'}
                  size={18}
                  color="#fff"
                />
                <Text style={styles.openBtnText}>
                  {resource.content_type === 'audio' ? 'Ouvir' : 'Ver vídeo'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function ResourcesScreen() {
  const insets = useSafeAreaInsets();
  const { resources, loading } = useResources();
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Resource | null>(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchType = typeFilter === 'all' || r.content_type === typeFilter;
      const matchSearch = !search || r.title_pt.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [resources, typeFilter, search]);

  const handlePress = useCallback((r: Resource) => setSelected(r), []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recursos</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Type filter */}
      <View style={styles.typeFilterRow}>
        {TYPE_TABS.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.typeBtn, typeFilter === t.id && styles.typeBtnActive]}
            onPress={() => setTypeFilter(t.id)}
          >
            <Ionicons name={t.icon} size={14} color={typeFilter === t.id ? '#2563EB' : '#94A3B8'} />
            <Text style={[styles.typeBtnLabel, typeFilter === t.id && styles.typeBtnLabelActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ResourceCard item={item} onPress={handlePress} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📚</Text>
              <Text style={styles.emptyTitle}>Sem resultados</Text>
            </View>
          }
        />
      )}

      <ResourceDetailModal resource={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  searchInput: { flex: 1, fontSize: 14, color: '#0F172A' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  typeFilterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 12 },
  typeBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0' },
  typeBtnActive: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' },
  typeBtnLabel: { fontSize: 12, fontWeight: '500', color: '#94A3B8' },
  typeBtnLabelActive: { color: '#2563EB', fontWeight: '600' },

  list: { paddingHorizontal: 20, paddingBottom: 32 },

  card: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 16 },
  cardMeta: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeBadgeText: { fontSize: 11, fontWeight: '600' },
  pillarBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  pillarBadgeText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 6, lineHeight: 22 },
  cardSummary: { fontSize: 13, color: '#64748B', lineHeight: 19 },
  readTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  readTime: { fontSize: 11, color: '#94A3B8' },

  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, color: '#64748B', fontWeight: '500' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '90%', overflow: 'hidden' },
  modalHandle: { width: 36, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  modalImage: { width: '100%', height: 200 },
  modalBody: { padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 8 },
  modalSummary: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 20 },
  openBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#2563EB', borderRadius: 14, paddingVertical: 16, marginBottom: 12 },
  openBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  closeBtn: { alignItems: 'center', paddingVertical: 12 },
  closeBtnText: { fontSize: 15, color: '#64748B', fontWeight: '500' },
});
