import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, Modal, Pressable,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '@/hooks/use-profile';
import { useBookings } from '@/hooks/use-bookings';

const MOODS = [
  { id: 'very-sad', emoji: '🙁', label: 'Mau' },
  { id: 'bad',      emoji: '😡', label: 'Irritado' },
  { id: 'neutral',  emoji: '😐', label: 'Neutro' },
  { id: 'good',     emoji: '😊', label: 'Bem' },
  { id: 'great',    emoji: '😃', label: 'Ótimo' },
];

const PILLARS = [
  { id: 'mental',     label: 'Saúde Mental',    sub: 'Psicológico',  color: '#DBEAFE', icon: '🧠' },
  { id: 'fisico',     label: 'Bem-estar',        sub: 'Físico',       color: '#FEF3C7', icon: '💪' },
  { id: 'financeira', label: 'Assistência',      sub: 'Financeira',   color: '#D1FAE5', icon: '💰' },
  { id: 'juridica',  label: 'Assistência',      sub: 'Jurídica',     color: '#FCE7F3', icon: '⚖️' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { profile } = useProfile();
  const { requestUrgentCall } = useBookings();

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [callLoading, setCallLoading] = useState(false);

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Utilizador';
  const today = new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  const handleMoodSelect = useCallback((id: string) => {
    setSelectedMood(id);
  }, []);

  const handleRequestCall = useCallback(async () => {
    setCallLoading(true);
    const result = await requestUrgentCall();
    setCallLoading(false);
    setCallModalVisible(false);
    if (result.success) {
      Alert.alert('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
    } else {
      Alert.alert('Erro', result.error ?? 'Não foi possível enviar o pedido.');
    }
  }, [requestUrgentCall]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {firstName}! 👋</Text>
            <Text style={styles.date}>{todayCapitalized}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{firstName[0]?.toUpperCase()}</Text>
          </View>
        </View>

        {/* Mood Check-In */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como estás hoje?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.moodBtn, selectedMood === m.id && styles.moodBtnActive]}
                onPress={() => handleMoodSelect(m.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={[styles.moodLabel, selectedMood === m.id && styles.moodLabelActive]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedMood && (
            <Text style={styles.moodConfirm}>
              Humor registado ✓
            </Text>
          )}
        </View>

        {/* 24/7 Call Button */}
        <TouchableOpacity
          style={styles.callCard}
          onPress={() => setCallModalVisible(true)}
          activeOpacity={0.85}
        >
          <View style={styles.callLeft}>
            <View style={styles.callIconWrap}>
              <Ionicons name="call" size={24} color="#fff" />
              <View style={styles.callBadge}>
                <Text style={styles.callBadgeText}>24/7</Text>
              </View>
            </View>
            <View>
              <Text style={styles.callTitle}>Apoio Imediato</Text>
              <Text style={styles.callSub}>Fala com um especialista agora</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {/* Pillar Grid */}
        <Text style={styles.sectionTitle}>O teu apoio</Text>
        <View style={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <TouchableOpacity key={p.id} style={[styles.pillarCard, { backgroundColor: p.color }]} activeOpacity={0.8}>
              <Text style={styles.pillarIcon}>{p.icon}</Text>
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarSub}>{p.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Urgent Call Confirmation Modal */}
      <Modal visible={callModalVisible} transparent animationType="slide" onRequestClose={() => setCallModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setCallModalVisible(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.modalHandle} />
            <View style={styles.modalIconWrap}>
              <Ionicons name="call" size={32} color="#2563EB" />
            </View>
            <Text style={styles.modalTitle}>Solicitar Apoio Imediato</Text>
            <Text style={styles.modalBody}>
              Deseja solicitar uma chamada urgente com um dos nossos especialistas? Alguém entrará em contacto consigo o mais brevemente possível.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleRequestCall}
              disabled={callLoading}
              activeOpacity={0.85}
            >
              {callLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.modalBtnText}>Solicitar Agora</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setCallModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  date: { fontSize: 13, color: '#64748B', marginTop: 2 },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#fff' },

  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#0F172A', marginBottom: 16 },

  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: { alignItems: 'center', padding: 8, borderRadius: 12, flex: 1, marginHorizontal: 2 },
  moodBtnActive: { backgroundColor: '#EFF6FF' },
  moodEmoji: { fontSize: 26 },
  moodLabel: { fontSize: 9, color: '#94A3B8', marginTop: 4, fontWeight: '500' },
  moodLabelActive: { color: '#2563EB' },
  moodConfirm: { fontSize: 12, color: '#10B981', fontWeight: '600', textAlign: 'center', marginTop: 12 },

  callCard: { backgroundColor: '#2563EB', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  callLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  callIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  callBadge: { position: 'absolute', top: -4, right: -8, backgroundColor: '#10B981', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  callBadgeText: { fontSize: 8, color: '#fff', fontWeight: '800' },
  callTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  callSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  pillarCard: { width: '47%', borderRadius: 20, padding: 20, minHeight: 120, justifyContent: 'space-between' },
  pillarIcon: { fontSize: 28 },
  pillarLabel: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginTop: 12 },
  pillarSub: { fontSize: 12, color: '#475569', marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 28, paddingBottom: 40, alignItems: 'center' },
  modalHandle: { width: 36, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, marginBottom: 24 },
  modalIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 12, textAlign: 'center' },
  modalBody: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  modalBtn: { backgroundColor: '#2563EB', borderRadius: 14, paddingVertical: 16, width: '100%', alignItems: 'center', marginBottom: 12, minHeight: 52, justifyContent: 'center' },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalCancelBtn: { paddingVertical: 12, width: '100%', alignItems: 'center' },
  modalCancelText: { color: '#64748B', fontSize: 15, fontWeight: '500' },
});
