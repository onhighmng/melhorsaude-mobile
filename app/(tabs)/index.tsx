import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Alert, Modal, ActivityIndicator, Dimensions, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProfile } from '@/hooks/use-profile';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { Questionnaire } from '@/components/Questionnaire';
import { SessionBooking } from '@/components/SessionBooking';
import { questionnaireData } from '@/data/questionnaireData';
import { PulseCheckinScreen } from '@/components/PulseCheckinScreen';
import { FONT_PACIFICO, FONT_POPPINS_500, FONT_JAKARTA_700 } from '@/lib/fonts';
import { COLORS, SPACING, RADIUS, SHADOWS, GRADIENT } from '@/lib/design-tokens';
import { usePulse } from '@/hooks/use-pulse';
import {
  Phone, Zap, AlertTriangle, TrendingDown, TrendingUp,
  CheckCircle2, ArrowRight,
} from 'lucide-react-native';
import Svg, { Defs, ClipPath, Path as SvgPath, Image as SvgImage } from 'react-native-svg';

const MOOD_INDEX: Record<string, number> = {
  'very-sad': 1, 'bad': 2, 'neutral': 3, 'good': 4, 'great': 5,
};

const { width: SW } = Dimensions.get('window');
const PILLAR_W = (SW - 40 - 16) / 2;

const logoSymbol   = require('@/assets/images/logo-symbol.png');
const moodCardBg   = require('@/assets/images/mood-card-bg.png');
const pillarMental     = require('@/assets/images/pillar-mental.png');
const pillarFisico     = require('@/assets/images/pillar-fisico.png');
const pillarFinanceira = require('@/assets/images/pillar-financeira.png');
const pillarJuridica   = require('@/assets/images/pillar-juridica.png');

const PILLARS = [
  { id: 'mental',     label: 'Saúde Mental',  sub: 'Psicológico',  img: pillarMental,     gradStart: '#9dbfd4', gradEnd: '#e2ecf2', accent: COLORS.PILLAR_MENTAL },
  { id: 'fisico',     label: 'Bem-estar',      sub: 'Físico',       img: pillarFisico,     gradStart: '#fcc066', gradEnd: '#f5efe6', accent: COLORS.PILLAR_FISICO },
  { id: 'financeira', label: 'Assistência',    sub: 'Financeira',   img: pillarFinanceira, gradStart: '#8bbeb8', gradEnd: '#dcecea', accent: COLORS.PILLAR_FINANCEIRA },
  { id: 'juridica',   label: 'Assistência',    sub: 'Jurídica',     img: pillarJuridica,   gradStart: '#d8a4c4', gradEnd: '#f3e4ed', accent: COLORS.PILLAR_JURIDICA },
];

const MOODS = [
  { id: 'very-sad', emoji: '🙁', bg: '#DBEAFE', leftPct: 0.26, topPct: 0.32 },
  { id: 'bad',      emoji: '😡', bg: '#FFE2E2', leftPct: 0.52, topPct: 0.32 },
  { id: 'neutral',  emoji: '😐', bg: '#F3F4F6', leftPct: 0.78, topPct: 0.32 },
  { id: 'good',     emoji: '😊', bg: '#FEF9C2', leftPct: 0.52, topPct: 0.62 },
  { id: 'great',    emoji: '😄', bg: '#FFF085', leftPct: 0.78, topPct: 0.62 },
];

interface Specialist { id: string; name: string }

export default function BemEstarScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { setIsModalVisible } = useModal();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ pulse?: string }>();

  const logoAnim = useRef(new Animated.Value(100)).current;

  const [selectedMood, setSelectedMood]   = useState<string | null>(null);
  const [moodSaved, setMoodSaved]         = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [requesting, setRequesting]       = useState(false);
  const [featuredResource, setFeaturedResource] = useState<{ title: string; thumbnail_url: string | null } | null>(null);

  // Pillar → questionnaire → booking flow
  const [activePillar, setActivePillar]     = useState<string | null>(null);
  const [showBooking, setShowBooking]       = useState(false);
  const [specialist, setSpecialist]         = useState<Specialist>({ id: '', name: 'Especialista' });
  const [loadingSpecialist, setLoadingSpecialist] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<number[]>([]);

  // Pulse check-in overlay — also opened when navigated with ?pulse=1
  const [showPulseCheckin, setShowPulseCheckin] = useState(params.pulse === '1');

  // Open pulse check-in if notification deep-link arrives while screen is mounted
  useEffect(() => {
    if (params.pulse === '1') setShowPulseCheckin(true);
  }, [params.pulse]);

  const { lastPulse, savePulse } = usePulse(user?.id);

  const firstName = profile?.full_name?.split(' ')[0] || 'Olá';

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  const cardH = (SW - 40) * (245 / 360);
  const moodSize = (SW - 40) * 0.16;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(logoAnim, {
        toValue: 50,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, 1500);
    return () => clearTimeout(timer);
  }, [logoAnim]);

  useEffect(() => {
    supabase
      .from('resources')
      .select('title_pt, thumbnail_url')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.warn('Featured resource fetch error:', error.message);
          return;
        }
        if (data?.title_pt) {
          setFeaturedResource({ title: data.title_pt, thumbnail_url: data.thumbnail_url || null });
        }
      });
  }, []);

  // Set modal visibility when entering questionnaire or booking
  useEffect(() => {
    if (activePillar || showBooking) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [activePillar, showBooking, setIsModalVisible]);

  const PILLAR_CODE: Record<string, string> = {
    mental:     'PSYCH',
    fisico:     'PHYSICAL',
    financeira: 'FINANCIAL',
    juridica:   'LEGAL',
  };

  const handlePillarPress = useCallback(async (pillarId: string) => {
    track.pillarSelected(pillarId);
    setLoadingSpecialist(true);
    const pillarCode = PILLAR_CODE[pillarId] ?? pillarId.toUpperCase();

    // Round-robin: least recently assigned active specialist for this pillar
    const { data } = await supabase
      .from('specialists')
      .select('id, last_assigned_at, profile:profiles(full_name), specialist_pillars!inner(pillar_code)')
      .eq('is_active', true)
      .eq('specialist_pillars.pillar_code', pillarCode)
      .order('last_assigned_at', { ascending: true, nullsFirst: true })
      .limit(1)
      .maybeSingle();

    if (data?.id) {
      // Update assignment timestamp for round-robin fairness
      supabase
        .from('specialists')
        .update({ last_assigned_at: new Date().toISOString() })
        .eq('id', data.id)
        .then(() => {});
    }

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
    const moodIndex = MOOD_INDEX[moodId] ?? 3;
    const { error } = await (supabase.from('mood_entries') as any).insert({
      user_id: user.id,
      mood_index: moodIndex,
      notes: '',
    });
    if (error) { console.warn('[mood] insert error:', error.message); return; }
    track.moodLogged(moodId, moodIndex);
    setMoodSaved(true);
    setTimeout(() => setMoodSaved(false), 2000);
    supabase.functions
      .invoke('analyze-pulse-for-breaks', { body: { user_id: user.id } })
      .catch(() => {});
  }, [user?.id]);

  const handleUrgentCall = useCallback(async () => {
    if (!user?.id) return;
    track.urgentCallConfirmed();
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
      metadata: { request_type: 'urgent_call' },
    });
    setRequesting(false);
    setShowCallModal(false);
    if (error) {
      track.urgentCallFailed(error.message);
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Pedido enviado!', 'Um especialista entrará em contacto brevemente.');
    }
  }, [user?.id]);

  // ── Overlays
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

  if (activePillar && !showBooking) {
    const data = questionnaireData[activePillar];
    if (!data) { setActivePillar(null); return null; }
    return (
      <Questionnaire
        pillarId={activePillar}
        questions={data.questions}
        onBack={() => {
          track.questionnaireAbandoned(activePillar);
          setActivePillar(null);
        }}
        onComplete={(answers) => {
          track.questionnaireCompleted(activePillar);
          setQuestionnaireAnswers(answers);
          setShowBooking(true);
        }}
      />
    );
  }

  if (showBooking && activePillar) {
    return (
      <SessionBooking
        pillarId={activePillar}
        specialistId={specialist.id}
        specialistName={specialist.name}
        questionnaireAnswers={questionnaireAnswers}
        onBack={() => {
          setShowBooking(false);
        }}
        onConfirm={() => {
          setShowBooking(false);
          setActivePillar(null);
          setQuestionnaireAnswers([]);
          router.push('/(tabs)/meu-espaco');
        }}
      />
    );
  }

  return (
    <LinearGradient colors={GRADIENT.BG_GRADIENT.colors} start={GRADIENT.BG_GRADIENT.start} end={GRADIENT.BG_GRADIENT.end} style={s.container}>

      {loadingSpecialist && (
        <View style={s.loadingOverlay}>
          <ActivityIndicator color={COLORS.PRIMARY} size="large" />
        </View>
      )}

      <ScrollView
        contentContainerStyle={[s.scroll, { paddingTop: insets.top + 12, paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo header */}
        <View style={s.topBar}>
          <Animated.Image source={logoSymbol} style={[s.logo, { width: logoAnim, height: logoAnim }]} resizeMode="contain" />
        </View>

        {/* ── Greeting */}
        <Text style={s.greeting}>{getGreeting()}, {firstName} 👋</Text>

        {/* ── Pulse bar */}
        <View style={s.pulseBar}>
          {[
            { Icon: AlertTriangle, color: '#FBBF24', label: 'Stress',  val: lastPulse ? String(lastPulse.stress)  : '—' },
            { Icon: TrendingDown,  color: '#F87171', label: 'Energia', val: lastPulse ? String(lastPulse.energy)  : '—' },
            { Icon: TrendingUp,    color: '#34D399', label: 'Humor',   val: lastPulse ? String(lastPulse.humor)   : '—' },
          ].map(({ Icon, color, label, val }, i) => (
            <View key={label} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {i > 0 && <View style={s.pulseDivider} />}
              <TouchableOpacity
                style={s.pulsePill}
                onPress={() => setShowPulseCheckin(true)}
                activeOpacity={0.7}
              >
                <Icon color={color} size={12} strokeWidth={2.5} />
                <Text style={s.pillVal}>{val}</Text>
                <Text style={s.pillLabel}>{label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ── Featured resource card */}
        <TouchableOpacity style={s.featuredCard} activeOpacity={0.9} onPress={() => track.featuredResourceTapped(featuredResource?.title ?? null)}>
          {featuredResource?.thumbnail_url ? (
            <Image source={{ uri: featuredResource.thumbnail_url }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
          ) : (
            <LinearGradient colors={['#9dbfd4','#cde0ed']} style={StyleSheet.absoluteFillObject} />
          )}
          <LinearGradient
            colors={['transparent','rgba(0,0,0,0.72)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={s.featuredContent}>
            <View style={s.featuredTag}>
              <Text style={s.featuredTagTxt}>Recurso em Destaque</Text>
            </View>
            {featuredResource?.title ? (
              <Text style={s.featuredTitle} numberOfLines={2}>{featuredResource.title}</Text>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* ── Hero mood card */}
        <View style={[s.heroCard, { height: cardH }]}>
          {/* Sky image clipped to Figma concave shape: rounded rect with lower-left cutout */}
          {(() => {
            const W = SW - 40;
            const H = cardH;
            const cr = 24; // card corner radius
            const pW = W * 0.38; // phone button right edge (cutout width)
            const pY = H * 0.60; // phone button top (cutout height on left side)
            const clipId = 'skyClip';
            const d = [
              `M ${cr} 0`,
              `L ${W - cr} 0`,
              `A ${cr} ${cr} 0 0 1 ${W} ${cr}`,
              `L ${W} ${H - cr}`,
              `A ${cr} ${cr} 0 0 1 ${W - cr} ${H}`,
              `L ${pW} ${H}`,
              `Q 0 ${H} 0 ${pY}`,
              `L 0 ${cr}`,
              `A ${cr} ${cr} 0 0 1 ${cr} 0`,
              `Z`,
            ].join(' ');
            return (
              <Svg width={W} height={H} style={StyleSheet.absoluteFillObject} pointerEvents="none">
                <Defs>
                  <ClipPath id={clipId}>
                    <SvgPath d={d} />
                  </ClipPath>
                </Defs>
                <SvgImage
                  x={0} y={0} width={W} height={H}
                  href={Image.resolveAssetSource(moodCardBg).uri}
                  preserveAspectRatio="xMidYMid meet"
                  clipPath={`url(#${clipId})`}
                />
              </Svg>
            );
          })()}

          {/* "Como estás" label */}
          <Text style={s.heroTitle}>Como estás a{'\n'}sentir-te hoje?</Text>

          {/* Mood saved badge */}
          {moodSaved && (
            <View style={s.savedBadge}>
              <CheckCircle2 size={14} color={COLORS.SUCCESS} />
              <Text style={s.savedTxt}>Humor registado!</Text>
            </View>
          )}

          {/* Emoji mood buttons */}
          {MOODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => handleMoodSelect(m.id)}
              activeOpacity={0.8}
              style={[
                s.moodBtn,
                {
                  width: moodSize,
                  height: moodSize,
                  left: (SW - 40) * m.leftPct,
                  top: cardH * m.topPct,
                  backgroundColor: m.bg,
                  borderWidth: selectedMood === m.id ? 2.5 : 0,
                  borderColor: COLORS.PRIMARY,
                  transform: [{ scale: selectedMood === m.id ? 1.12 : 1 }],
                },
              ]}
            >
              <Text style={{ fontSize: moodSize * 0.44 }}>{m.emoji}</Text>
            </TouchableOpacity>
          ))}

          {/* 24/7 call button */}
          <TouchableOpacity
            onPress={() => { track.urgentCallTapped(); setShowCallModal(true); }}
            activeOpacity={0.85}
            style={[
              s.callBtn,
              {
                left: 0,
                top: cardH * 0.60,
                height: cardH * 0.34,
                width: (SW - 40) * 0.38,
              },
            ]}
          >
            <View style={s.callInner}>
              <Phone size={moodSize * 0.42} color={COLORS.PRIMARY_DARK} fill={COLORS.PRIMARY_DARK} />
              <View style={s.badge247}>
                <Text style={s.badge247Txt}>24/7</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Section: O teu apoio */}
        <Text style={s.sectionTitle}>O teu apoio</Text>

        {/* ── Pillar grid */}
        <View style={s.pillarGrid}>
          {PILLARS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={s.pillarCard}
              activeOpacity={0.85}
              onPress={() => handlePillarPress(p.id)}
            >
              <LinearGradient
                colors={[p.gradStart, p.gradEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={s.pillarLabel}>{p.label}</Text>
              <Text style={s.pillarSub}>{p.sub}</Text>
              <Image source={p.img} style={s.pillarImg} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Pulse CTA */}
        <TouchableOpacity
          style={s.pulseCta}
          activeOpacity={0.85}
          onPress={() => setShowPulseCheckin(true)}
        >
          <View style={{ flex: 1 }}>
            <View style={s.ctaTag}>
              <Text style={s.ctaTagTxt}>Pulse Semanal</Text>
            </View>
            <Text style={s.ctaTitle}>Pronto para o teu{'\n'}check-in de 20s?</Text>
            <Text style={s.ctaSub}>Ver detalhes do teu bem-estar</Text>
          </View>
          <View style={s.ctaIcon}>
            <Zap size={20} color={COLORS.PRIMARY} />
          </View>
        </TouchableOpacity>

        <Text style={s.tagline}>Cuidar das pessoas, transforma empresas</Text>
      </ScrollView>

      {/* ── 24/7 Call modal */}
      <Modal visible={showCallModal} transparent animationType="fade">
        <View style={s.overlay}>
          <View style={s.modalBox}>
            <View style={s.modalIcon}>
              <Phone size={26} color={COLORS.PRIMARY_DARK} fill={COLORS.PRIMARY_DARK} />
            </View>
            <Text style={s.modalTitle}>Suporte 24/7</Text>
            <Text style={s.modalBody}>
              Um especialista entrará em contacto brevemente. Deseja confirmar o pedido?
            </Text>
            <View style={s.modalBtns}>
              <TouchableOpacity style={s.modalCancel} onPress={() => { track.urgentCallCancelled(); setShowCallModal(false); }}>
                <Text style={s.modalCancelTxt}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.modalConfirm} onPress={handleUrgentCall} disabled={requesting}>
                {requesting
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.modalConfirmTxt}>Confirmar</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  scroll: { paddingHorizontal: 20 },

  // Header
  topBar: { alignItems: 'center', marginBottom: 20 },
  logo: {},
  // Greeting
  greetingRow: { marginBottom: 14 },
  greetingSub: { fontSize: 14, fontFamily: FONT_POPPINS_500, color: COLORS.TEXT_SECONDARY, marginBottom: 2 },
  greeting: { fontSize: 36, fontFamily: FONT_PACIFICO, color: COLORS.TEXT_PRIMARY, marginBottom: 14 },

  // Pulse bar
  pulseBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    ...SHADOWS.sm,
  },
  pulsePill: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center' },
  pulseDivider: { width: 1, height: 18, backgroundColor: COLORS.CARD_EL },
  pillVal: { fontSize: 12, fontFamily: FONT_JAKARTA_700, color: COLORS.TEXT_PRIMARY },
  pillLabel: { fontSize: 10, fontFamily: FONT_POPPINS_500, color: COLORS.TEXT_SECONDARY, textTransform: 'uppercase' },

  // Featured card
  featuredCard: {
    height: 200, borderRadius: 28, overflow: 'hidden',
    marginBottom: 16, ...SHADOWS.lg,
  },
  featuredContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
  featuredTag: {
    backgroundColor: COLORS.PRIMARY, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: RADIUS.full, alignSelf: 'flex-start', marginBottom: 8,
  },
  featuredTagTxt: { color: '#fff', fontSize: 10, fontFamily: FONT_JAKARTA_700, textTransform: 'uppercase', letterSpacing: 1 },
  featuredTitle: { color: '#fff', fontSize: 18, fontFamily: FONT_JAKARTA_700, lineHeight: 24 },

  // Hero mood card
  heroCard: {
    width: '100%', marginBottom: 24, position: 'relative',
  },
  heroTitle: {
    position: 'absolute', left: '7%', top: '8%', width: '65%',
    fontSize: Math.round((SW - 40) * 0.078), fontFamily: FONT_JAKARTA_700, color: '#fff', lineHeight: Math.round((SW - 40) * 0.088), zIndex: 20,
  },
  savedBadge: {
    position: 'absolute', top: 12, right: 12, flexDirection: 'row',
    alignItems: 'center', gap: 5, backgroundColor: '#fff',
    borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 5, zIndex: 30,
  },
  savedTxt: { fontSize: 11, fontFamily: FONT_JAKARTA_700, color: COLORS.SUCCESS },
  moodBtn: {
    position: 'absolute', borderRadius: RADIUS.full,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 10, ...SHADOWS.sm,
  },
  callBtn: {
    position: 'absolute', backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center',
    zIndex: 20, ...SHADOWS.lg,
  },
  callInner: {
    height: '72%', aspectRatio: 1, backgroundColor: '#fff',
    borderRadius: RADIUS.full, alignItems: 'center', justifyContent: 'center', position: 'relative',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  badge247: {
    position: 'absolute', top: -4, right: -8,
    backgroundColor: COLORS.SUCCESS, borderRadius: RADIUS.full,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  badge247Txt: { color: '#fff', fontSize: 9, fontFamily: FONT_JAKARTA_700 },

  // Pillars
  sectionTitle: {
    fontSize: 24, fontFamily: FONT_PACIFICO,
    color: COLORS.PRIMARY, marginBottom: 12,
  },
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 20 },
  pillarCard: {
    width: PILLAR_W, height: 220, borderRadius: RADIUS.xl,
    padding: 16, overflow: 'hidden', position: 'relative',
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', ...SHADOWS.lg,
  },
  pillarLabel: { fontSize: 18, fontFamily: FONT_JAKARTA_700, color: COLORS.TEXT_PRIMARY, lineHeight: 22 },
  pillarSub: { fontSize: 13, fontFamily: FONT_POPPINS_500, color: COLORS.TEXT_SECONDARY, opacity: 0.8, marginTop: 2 },
  pillarImg: { flex: 1, width: '100%', marginTop: 8 },
  pillarArrow: {
    position: 'absolute', bottom: 14, right: 14,
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },

  // Pulse CTA
  pulseCta: {
    borderRadius: RADIUS.xl, padding: SPACING.xl,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.CARD, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.CARD_EL, ...SHADOWS.sm,
  },
  ctaTag: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4,
    alignSelf: 'flex-start', marginBottom: 10, backgroundColor: COLORS.CARD_EL,
  },
  ctaTagTxt: { fontSize: 10, fontFamily: FONT_JAKARTA_700, color: COLORS.TEXT_PRIMARY, textTransform: 'uppercase', letterSpacing: 1.5 },
  ctaTitle: { fontSize: 19, color: COLORS.TEXT_PRIMARY, lineHeight: 24, fontFamily: FONT_POPPINS_500 },
  ctaSub: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginTop: 6, textDecorationLine: 'underline', fontFamily: FONT_POPPINS_500 },
  ctaIcon: {
    width: 48, height: 48, borderRadius: 28, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.CARD_EL,
  },
  tagline: { fontSize: 13, color: COLORS.TEXT_SECONDARY, textAlign: 'center', marginBottom: 12, lineHeight: 20, fontFamily: FONT_POPPINS_500 },

  // Call modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.xl, width: SW - 64, ...SHADOWS.lg },
  modalIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, alignSelf: 'center',
  },
  modalTitle: { fontSize: 22, fontFamily: FONT_JAKARTA_700, color: COLORS.TEXT_PRIMARY, marginBottom: 10, textAlign: 'center' },
  modalBody: { fontSize: 15, color: COLORS.TEXT_SECONDARY, lineHeight: 22, marginBottom: 24, textAlign: 'center', fontFamily: FONT_POPPINS_500 },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalCancel: {
    flex: 1, height: 50, borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center',
  },
  modalCancelTxt: { color: '#374151', fontFamily: FONT_JAKARTA_700, fontSize: 15 },
  modalConfirm: {
    flex: 1, height: 50, borderRadius: 14,
    backgroundColor: COLORS.PRIMARY_DARK, alignItems: 'center', justifyContent: 'center',
  },
  modalConfirmTxt: { color: '#fff', fontFamily: FONT_JAKARTA_700, fontSize: 15 },
});
