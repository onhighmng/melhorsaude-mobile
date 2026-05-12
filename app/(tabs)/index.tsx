import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Alert, Modal, ActivityIndicator, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Questionnaire } from '@/components/Questionnaire';
import { SessionBooking } from '@/components/SessionBooking';
import { questionnaireData } from '@/data/questionnaireData';
import { FONT_PACIFICO, FONT_POPPINS_500, FONT_JAKARTA_700 } from '@/lib/fonts';

const { width: SW } = Dimensions.get('window');

const logoSymbol = require('@/assets/images/logo-symbol.png');
const moodCardBg  = require('@/assets/images/mood-card-bg.png');
const pillarMental     = require('@/assets/images/pillar-mental.png');
const pillarFisico     = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica   = require('@/assets/images/pillar-juridica.png');

const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';

const PILLARS = [
  { id: 'mental',     label: 'Saúde Mental',      sub: 'Psicológico',  image: pillarMental,     topColor: '#9dbfd4', accent: '#1565C0' },
  { id: 'fisico',     label: 'Bem-estar',          sub: 'Físico',       image: pillarFisico,     topColor: '#fcc066', accent: '#FB923C' },
  { id: 'financeira', label: 'Assistência',        sub: 'Financeira',   image: pillarFinanceira, topColor: '#8bbeb8', accent: '#34D399' },
  { id: 'juridica',   label: 'Assistência',        sub: 'Jurídica',     image: pillarJuridica,   topColor: '#d8a4c4', accent: '#F472B6' },
];

const MOODS = [
  { id: 'very-sad', emoji: '🙁', bg: '#DBEAFE', leftPct: 0.27, topPct: 0.30 },
  { id: 'sad',      emoji: '😡', bg: '#FFE2E2', leftPct: 0.53, topPct: 0.30 },
  { id: 'neutral',  emoji: '😐', bg: '#F3F4F6', leftPct: 0.79, topPct: 0.30 },
  { id: 'good',     emoji: '😊', bg: '#FEF9C2', leftPct: 0.53, topPct: 0.60 },
  { id: 'great',    emoji: '😃', bg: '#FFF085', leftPct: 0.79, topPct: 0.60 },
];

interface Specialist { id: string; name: string }

export default function BemEstarScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [selectedMood, setSelectedMood]   = useState<string | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [requesting, setRequesting]       = useState(false);
  const [featuredResource, setFeaturedResource] = useState<{ title: string; thumbnail_url: string | null } | null>(null);
  const [moodSaved, setMoodSaved]         = useState(false);

  // Questionnaire / booking flow state
  const [activePillar, setActivePillar]     = useState<string | null>(null);
  const [showBooking, setShowBooking]       = useState(false);
  const [specialist, setSpecialist]         = useState<Specialist>({ id: '', name: 'Especialista' });
  const [loadingSpecialist, setLoadingSpecialist] = useState(false);

  const firstName = profile?.full_name?.split(' ')[0] || 'Olá';
  const cardH = (SW - 48) * (245 / 360);
  const moodSize = (SW - 48) * 0.155;

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

  const handlePillarPress = useCallback(async (pillarId: string) => {
    setLoadingSpecialist(true);
    // Fetch any available specialist
    const { data } = await supabase
      .from('specialists')
      .select('id, profile:profiles(full_name)')
      .limit(1)
      .maybeSingle();

    const s: Specialist = data
      ? { id: data.id, name: (data as any).profile?.full_name || 'Especialista' }
      : { id: '', name: 'Especialista' };

    setSpecialist(s);
    setLoadingSpecialist(false);
    setActivePillar(pillarId);
  }, []);

  const handleMoodSelect = useCallback(async (moodId: string) => {
    setSelectedMood(moodId);
    if (!user?.id) return;
    await supabase.from('mood_logs').insert({ user_id: user.id, mood_type: moodId });
    setMoodSaved(true);
    setTimeout(() => setMoodSaved(false), 2000);
  }, [user?.id]);

  const handleUrgentCall = useCallback(async () => {
    if (!user?.id) return;
    setRequesting(true);
    const now = new Date();
    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      specialist_id: null,
      booking_date: now.toISOString().split('T')[0],
      start_time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
      meeting_type: 'voice',
      primary_pillar: 'PSYCH',
      status: 'pending',
      metadata: { request_type: 'urgent_call', notes: 'Pedido de suporte imediato via app' },
    });
    setRequesting(false);
    setShowCallModal(false);
    if (error) Alert.alert('Erro', error.message);
    else Alert.alert('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
  }, [user?.id]);

  // ── Questionnaire screen overlay
  if (activePillar && !showBooking) {
    const data = questionnaireData[activePillar];
    if (!data) {
      setActivePillar(null);
      return null;
    }
    return (
      <Questionnaire
        pillarId={activePillar}
        questions={data.questions}
        onBack={() => setActivePillar(null)}
        onComplete={() => setShowBooking(true)}
      />
    );
  }

  // ── SessionBooking screen overlay
  if (showBooking && activePillar) {
    return (
      <SessionBooking
        pillarId={activePillar}
        specialistId={specialist.id}
        specialistName={specialist.name}
        onBack={() => setShowBooking(false)}
        onConfirm={() => {
          setShowBooking(false);
          setActivePillar(null);
          router.push('/(tabs)/meu-espaco');
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {loadingSpecialist && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#1565C0" size="large" />
        </View>
      )}

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header: logo + notification bell */}
        <View style={styles.topBar}>
          <Image source={logoSymbol} style={styles.logoSymbol} resizeMode="contain" />
          <TouchableOpacity
            style={styles.bellBtn}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Notificações', 'Sem notificações de momento.')}
          >
            <Ionicons name="notifications-outline" size={22} color="#0a0a0a" />
          </TouchableOpacity>
        </View>

        {/* ── Greeting */}
        <Text style={styles.greeting}>Olá, {firstName}! 👋</Text>
        <Text style={styles.greetingSub}>Como estás hoje?</Text>

        {/* ── PulseBar (3 stat pills) */}
        <TouchableOpacity
          style={styles.pulseBar}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Pulse Semanal', 'Responde ao teu check-in semanal de bem-estar.')}
        >
          <View style={styles.pulsePill}>
            <Ionicons name="moon-outline" size={14} color="#1565C0" />
            <Text style={styles.pulsePillText}>Sono</Text>
            <Text style={styles.pulsePillVal}>—</Text>
          </View>
          <View style={styles.pulseDivider} />
          <View style={styles.pulsePill}>
            <Ionicons name="happy-outline" size={14} color="#10B981" />
            <Text style={styles.pulsePillText}>Humor</Text>
            <Text style={styles.pulsePillVal}>{selectedMood ? '✓' : '—'}</Text>
          </View>
          <View style={styles.pulseDivider} />
          <View style={styles.pulsePill}>
            <Ionicons name="flame-outline" size={14} color="#FB923C" />
            <Text style={styles.pulsePillText}>Stress</Text>
            <Text style={styles.pulsePillVal}>—</Text>
          </View>
          <View style={styles.pulseArrow}>
            <Ionicons name="chevron-forward" size={16} color="#474747" />
          </View>
        </TouchableOpacity>

        {/* ── Featured Resource (BEFORE hero mood card) */}
        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
          {featuredResource?.thumbnail_url ? (
            <Image source={{ uri: featuredResource.thumbnail_url }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
          ) : (
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#9dbfd4' }]} />
          )}
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>Recurso em Destaque</Text>
            </View>
            {featuredResource?.title ? (
              <Text style={styles.featuredTitle} numberOfLines={2}>{featuredResource.title}</Text>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* ── Hero Mood Card */}
        <View style={[styles.heroCard, { height: cardH }]}>
          <Image
            source={moodCardBg}
            style={[StyleSheet.absoluteFillObject, { borderRadius: 28 }]}
            resizeMode="cover"
          />
          <View style={styles.heroCardOverlay} />
          <Text style={styles.heroTitle}>Como estás a{'\n'}sentir-te hoje?</Text>

          {moodSaved && (
            <View style={styles.moodSavedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.moodSavedText}>Humor registado!</Text>
            </View>
          )}

          {MOODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => handleMoodSelect(m.id)}
              activeOpacity={0.8}
              style={[
                styles.moodBtn,
                {
                  width: moodSize,
                  height: moodSize,
                  left: (SW - 48) * m.leftPct - moodSize / 2,
                  top: cardH * m.topPct,
                  backgroundColor: m.bg,
                  borderWidth: selectedMood === m.id ? 2.5 : 0,
                  borderColor: '#1565C0',
                  transform: [{ scale: selectedMood === m.id ? 1.12 : 1 }],
                },
              ]}
            >
              <Text style={{ fontSize: moodSize * 0.44 }}>{m.emoji}</Text>
            </TouchableOpacity>
          ))}

          {/* 24/7 call button */}
          <TouchableOpacity
            onPress={() => setShowCallModal(true)}
            activeOpacity={0.85}
            style={[
              styles.callBtn,
              {
                left: (SW - 48) * -0.01,
                top: cardH * 0.58,
                height: cardH * 0.38,
                width: (SW - 48) * 0.38,
              },
            ]}
          >
            <View style={styles.callInner}>
              <Ionicons name="call" size={moodSize * 0.42} color="#0046a2" />
              <View style={styles.badge247}>
                <Text style={styles.badge247Text}>24/7</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Pillar Grid */}
        <Text style={styles.sectionTitle}>O teu apoio</Text>
        <View style={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.85}
              style={[styles.pillarCard, { backgroundColor: p.topColor + '60' }]}
              onPress={() => handlePillarPress(p.id)}
            >
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarSub}>{p.sub}</Text>
              <Image source={p.image} style={styles.pillarImage} resizeMode="contain" />
              <View style={[styles.pillarArrow, { backgroundColor: p.accent }]}>
                <Ionicons name="arrow-forward" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Pulse CTA */}
        <TouchableOpacity
          style={styles.pulseCta}
          activeOpacity={0.85}
          onPress={() => Alert.alert('Pulse Semanal', 'Responde ao teu check-in semanal de bem-estar.')}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.ctaTag}>
              <Text style={styles.ctaTagText}>Pulse Semanal</Text>
            </View>
            <Text style={styles.ctaTitle}>Pronto para o teu check-in de 20s?</Text>
            <Text style={styles.ctaSub}>Ver detalhes do teu bem-estar</Text>
          </View>
          <View style={styles.ctaIcon}>
            <Ionicons name="flash" size={20} color="#1565C0" />
          </View>
        </TouchableOpacity>

        <Text style={styles.tagline}>Cuidar das pessoas, transforma empresas</Text>
      </ScrollView>

      {/* 24/7 Call Modal */}
      <Modal visible={showCallModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconBox}>
              <Ionicons name="call" size={28} color="#0046a2" />
            </View>
            <Text style={styles.modalTitle}>Suporte 24/7</Text>
            <Text style={styles.modalBody}>
              Um especialista entrará em contacto consigo brevemente. Deseja confirmar o pedido?
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowCallModal(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={handleUrgentCall}
                disabled={requesting}
              >
                {requesting
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.modalConfirmText}>Confirmar</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const PILLAR_CARD_W = (SW - 48 - 16) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  scroll: { paddingHorizontal: 24 },

  // Header
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoSymbol: { width: 40, height: 40 },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f1ef',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Greeting
  greeting: { fontSize: 30, fontFamily: FONT_PACIFICO, color: '#0a0a0a' },
  greetingSub: { fontSize: 15, fontFamily: FONT_POPPINS_500, color: '#474747', marginTop: 4, marginBottom: 16 },

  // PulseBar
  pulseBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 1000,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  pulsePill: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center' },
  pulsePillText: { fontSize: 12, fontWeight: '600', color: '#474747' },
  pulsePillVal: { fontSize: 12, fontWeight: '700', color: '#0a0a0a' },
  pulseDivider: { width: 1, height: 18, backgroundColor: CARD_EL },
  pulseArrow: { marginLeft: 8 },

  // Featured Resource
  featuredCard: {
    height: 200,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.38)' },
  featuredContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
  featuredTag: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 1000,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredTagText: { color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  featuredTitle: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 24 },

  // Hero Mood Card
  heroCard: {
    width: '100%',
    marginBottom: 24,
    position: 'relative',
    overflow: 'visible',
    borderRadius: 28,
  },
  heroCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  heroTitle: {
    position: 'absolute',
    left: '7%',
    top: '8%',
    width: '56%',
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 26,
    zIndex: 20,
  },
  moodSavedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 1000,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 30,
  },
  moodSavedText: { fontSize: 11, fontWeight: '700', color: '#10B981' },
  moodBtn: {
    position: 'absolute',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  callBtn: {
    position: 'absolute',
    backgroundColor: '#0046a2',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 8,
  },
  callInner: {
    width: '72%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge247: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#10B981',
    borderRadius: 1000,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badge247Text: { color: '#fff', fontSize: 9, fontWeight: '700' },

  // Pillars
  sectionTitle: {
    fontSize: 24,
    fontFamily: FONT_PACIFICO,
    color: '#1565C0',
    marginBottom: 16,
  },
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 20 },
  pillarCard: {
    width: PILLAR_CARD_W,
    height: 220,
    borderRadius: 32,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    position: 'relative',
  },
  pillarLabel: { fontSize: 18, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a', lineHeight: 22 },
  pillarSub: { fontSize: 13, fontFamily: FONT_POPPINS_500, color: '#474747', opacity: 0.8, marginTop: 2 },
  pillarImage: { flex: 1, width: '100%', marginTop: 8 },
  pillarArrow: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Pulse CTA
  pulseCta: {
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: CARD_EL,
    marginBottom: 12,
  },
  ctaTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    backgroundColor: CARD_EL,
  },
  ctaTagText: { fontSize: 10, fontWeight: '700', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: 1.5 },
  ctaTitle: { fontSize: 19, color: '#0a0a0a', lineHeight: 24, fontWeight: '400' },
  ctaSub: { fontSize: 13, color: '#474747', fontWeight: '500', marginTop: 6, textDecorationLine: 'underline' },
  ctaIcon: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  tagline: { fontSize: 13, color: '#474747', textAlign: 'center', marginBottom: 8, lineHeight: 20 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 28, padding: 28, width: SW - 64 },
  modalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#0a0a0a', marginBottom: 12, textAlign: 'center' },
  modalBody: { fontSize: 15, color: '#474747', lineHeight: 22, marginBottom: 24, textAlign: 'center' },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalCancel: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: { color: '#374151', fontWeight: '600', fontSize: 15 },
  modalConfirm: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#0046a2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
