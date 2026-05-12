import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Alert, Modal, ActivityIndicator, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/lib/supabase';

const { width: SW } = Dimensions.get('window');

const moodCardBg = require('@/assets/images/mood-card-bg.png');
const pillarMental = require('@/assets/images/pillar-mental.png');
const pillarFisico = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica = require('@/assets/images/pillar-juridica.png');

const CARD = '#f2f1ef';
const CARD_EL = '#ecece7';

const PILLARS = [
  { id: 'mental', label: 'Saúde Mental', sub: 'Psicológico', image: pillarMental, topColor: '#9dbfd4' },
  { id: 'fisico', label: 'Bem-estar', sub: 'Físico', image: pillarFisico, topColor: '#fcc066' },
  { id: 'financeira', label: 'Assistência', sub: 'Financeira', image: pillarFinanceira, topColor: '#8bbeb8' },
  { id: 'juridica', label: 'Assistência', sub: 'Jurídica', image: pillarJuridica, topColor: '#d8a4c4' },
];

const MOODS = [
  { id: 'very-sad', emoji: '🙁', bg: '#DBEAFE', leftPct: 0.26, topPct: 0.32 },
  { id: 'bad', emoji: '😡', bg: '#FFE2E2', leftPct: 0.52, topPct: 0.32 },
  { id: 'neutral', emoji: '😐', bg: '#F3F4F6', leftPct: 0.78, topPct: 0.32 },
  { id: 'good', emoji: '😊', bg: '#FEF9C2', leftPct: 0.52, topPct: 0.62 },
  { id: 'great', emoji: '😃', bg: '#FFF085', leftPct: 0.78, topPct: 0.62 },
];

export default function BemEstarScreen() {
  const { profile } = useProfile();
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [featuredResource, setFeaturedResource] = useState<{ title: string; thumbnail_url: string | null } | null>(null);

  const firstName = profile?.full_name?.split(' ')[0] || 'Olá';
  const cardH = (SW - 48) * (245 / 360);
  const moodSize = (SW - 48) * 0.16;
  const fallbackImg = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop';

  useEffect(() => {
    supabase
      .from('resources')
      .select('title_pt, thumbnail_url')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setFeaturedResource({ title: data.title_pt, thumbnail_url: data.thumbnail_url });
      });
  }, []);

  const handleUrgentCall = useCallback(async () => {
    setRequesting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const now = new Date();
      const { error } = await supabase.from('bookings').insert({
        user_id: user?.id,
        specialist_id: null,
        booking_date: now.toISOString().split('T')[0],
        start_time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        meeting_type: 'voice',
        primary_pillar: 'mental',
        status: 'pending',
        metadata: { request_type: 'urgent_call', notes: 'Pedido de suporte imediato via app (Suporte 24/7)' },
      });
      setShowCallModal(false);
      if (error) Alert.alert('Erro', error.message);
      else Alert.alert('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
    } catch {
      Alert.alert('Erro', 'Ocorreu um erro ao processar o seu pedido.');
    } finally {
      setRequesting(false);
    }
  }, []);

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Olá, {firstName} 👋</Text>

        {/* Hero mood card */}
        <View style={[styles.heroCard, { height: cardH }]}>
          <Image
            source={moodCardBg}
            style={[StyleSheet.absoluteFillObject, { borderRadius: 24, bottom: '16%' }]}
            resizeMode="cover"
          />
          <Text style={styles.heroTitle}>Como estás a{'\n'}sentir-te hoje?</Text>

          {MOODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => setSelectedMood(m.id)}
              activeOpacity={0.8}
              style={[
                styles.moodBtn,
                {
                  width: moodSize,
                  height: moodSize,
                  left: (SW - 48) * m.leftPct,
                  top: cardH * m.topPct,
                  backgroundColor: m.bg,
                  borderWidth: selectedMood === m.id ? 2 : 0,
                  borderColor: '#1565C0',
                  transform: [{ scale: selectedMood === m.id ? 1.1 : 1 }],
                },
              ]}
            >
              <Text style={{ fontSize: moodSize * 0.45 }}>{m.emoji}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => setShowCallModal(true)}
            activeOpacity={0.85}
            style={[
              styles.callBtn,
              {
                left: (SW - 48) * -0.01,
                top: cardH * 0.6,
                height: cardH * 0.36,
                width: (SW - 48) * 0.38,
              },
            ]}
          >
            <View style={styles.callInner}>
              <Ionicons name="call" size={moodSize * 0.45} color="#0046a2" />
              <View style={styles.badge247}>
                <Text style={styles.badge247Text}>24/7</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pillars */}
        <Text style={styles.sectionTitle}>O teu apoio</Text>
        <View style={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.85}
              style={[styles.pillarCard, { backgroundColor: p.topColor + '55' }]}
            >
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarSub}>{p.sub}</Text>
              <Image source={p.image} style={styles.pillarImage} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.tagline}>Cuidar das pessoas, transforma empresas</Text>

        {/* Pulse CTA */}
        <TouchableOpacity style={styles.pulseCta} activeOpacity={0.85}>
          <View style={{ flex: 1 }}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Pulse Semanal</Text>
            </View>
            <Text style={styles.pulseTitle}>Pronto para o teu check-in de 20s?</Text>
            <Text style={styles.pulseSubtitle}>Ver detalhes do teu bem-estar</Text>
          </View>
          <View style={styles.pulseIcon}>
            <Ionicons name="flash" size={20} color="#1565C0" />
          </View>
        </TouchableOpacity>

        {/* Featured resource */}
        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
          <Image
            source={{ uri: featuredResource?.thumbnail_url || fallbackImg }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>Recurso em Destaque</Text>
            </View>
            {featuredResource && (
              <Text style={styles.featuredTitle} numberOfLines={2}>{featuredResource.title}</Text>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showCallModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Suporte 24/7</Text>
            <Text style={styles.modalBody}>Um especialista entrará em contacto consigo brevemente. Deseja confirmar o pedido?</Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowCallModal(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleUrgentCall} disabled={requesting}>
                {requesting ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalConfirmText}>Confirmar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scroll: { paddingHorizontal: 24 },
  greeting: { fontSize: 26, fontWeight: '700', color: '#0a0a0a', marginBottom: 8 },
  heroCard: { width: '100%', marginTop: 16, position: 'relative', overflow: 'visible', marginBottom: 0 },
  heroTitle: { position: 'absolute', left: '7%', top: '8%', width: '60%', fontSize: 20, fontWeight: '600', color: '#fff', lineHeight: 24, zIndex: 20 },
  moodBtn: { position: 'absolute', borderRadius: 1000, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  callBtn: { position: 'absolute', backgroundColor: '#0046a2', borderRadius: 32, alignItems: 'center', justifyContent: 'center', zIndex: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8 },
  callInner: { width: '72%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 1000, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge247: { position: 'absolute', top: -4, right: -8, backgroundColor: '#10B981', borderRadius: 1000, paddingHorizontal: 6, paddingVertical: 2 },
  badge247Text: { color: '#fff', fontSize: 9, fontWeight: '700' },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#1565C0', letterSpacing: -0.5, marginTop: 32, marginBottom: 16 },
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  pillarCard: { width: (SW - 48 - 16) / 2, height: 220, borderRadius: 32, padding: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  pillarLabel: { fontSize: 18, fontWeight: '700', color: '#0a0a0a', lineHeight: 22 },
  pillarSub: { fontSize: 13, fontWeight: '500', color: '#474747', opacity: 0.8, marginTop: 2 },
  pillarImage: { flex: 1, width: '100%', marginTop: 8 },
  tagline: { fontSize: 14, color: '#474747', textAlign: 'center', marginTop: 24, marginBottom: 0, lineHeight: 20 },
  pulseCta: { marginTop: 20, marginBottom: 16, borderRadius: 28, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: CARD, borderWidth: 1, borderColor: CARD_EL },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 8, backgroundColor: CARD_EL },
  tagText: { fontSize: 10, fontWeight: '700', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: 1.5 },
  pulseTitle: { fontSize: 20, color: '#0a0a0a', lineHeight: 24 },
  pulseSubtitle: { fontSize: 13, color: '#474747', fontWeight: '500', marginTop: 6, textDecorationLine: 'underline' },
  pulseIcon: { width: 48, height: 48, borderRadius: 28, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  featuredCard: { height: 220, borderRadius: 28, overflow: 'hidden', marginBottom: 16, position: 'relative' },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  featuredContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
  featuredTag: { backgroundColor: '#1565C0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 1000, alignSelf: 'flex-start', marginBottom: 8 },
  featuredTagText: { color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  featuredTitle: { color: '#fff', fontSize: 20, fontWeight: '600', lineHeight: 26 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 24, padding: 28, width: SW - 64 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#0a0a0a', marginBottom: 12 },
  modalBody: { fontSize: 15, color: '#474747', lineHeight: 22, marginBottom: 24 },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalCancel: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  modalCancelText: { color: '#374151', fontWeight: '600' },
  modalConfirm: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#0046a2', alignItems: 'center', justifyContent: 'center' },
  modalConfirmText: { color: '#fff', fontWeight: '600' },
});
