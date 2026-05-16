import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '@/lib/design-tokens';

const { width: SW } = Dimensions.get('window');

interface Props {
  sessionId: string;
  interventionType: string;
  onComplete: () => void;
  onSkip: () => void;
}

type Phase = 'prompt' | 'active' | 'recovery';

// ── Intervention content ──────────────────────────────────────────────────────

const INTERVENTIONS: Record<string, {
  icon: string;
  label: string;
  color: string;
  duration: number;
  steps: string[];
  breathe?: boolean;
}> = {
  breathing_reset: {
    icon: '🫁', label: 'Respiração', color: '#3B82F6', duration: 90,
    breathe: true,
    steps: ['Inspira lentamente pelo nariz...', 'Segura 3 segundos...', 'Expira devagar pela boca...', 'Repete o ciclo...'],
  },
  movement_reset: {
    icon: '⚡', label: 'Movimento', color: '#F59E0B', duration: 120,
    steps: ['Levanta-te da cadeira', 'Agita os braços levemente', 'Dá 5 passos', 'Estira o pescoço para cada lado', 'Respira fundo e senta-te'],
  },
  eye_recovery: {
    icon: '👁️', label: 'Descanso Visual', color: '#10B981', duration: 60,
    steps: ['Fecha os olhos suavemente', 'Olha para longe — a 6 metros', 'Pisca devagar 10 vezes', 'Faz círculos suaves com os olhos', 'Volta ao ecrã descansado'],
  },
  posture_reset: {
    icon: '🪑', label: 'Postura', color: '#8B5CF6', duration: 90,
    steps: ['Costas direitas, ombros para baixo', 'Pés no chão, joelhos a 90°', 'Queixo levemente para dentro', 'Relaxa os ombros', 'Mantém esta posição'],
  },
  calm_reset: {
    icon: '🧘', label: 'Calma', color: '#EC4899', duration: 120,
    steps: ['Fecha os olhos', 'Observa os teus pensamentos sem julgamento', 'Concentra-te na respiração', 'Deixa a tensão ir a cada expiração', 'Abre os olhos suavemente'],
  },
};

// ── Breathing circle animation ────────────────────────────────────────────────

function BreathingCircle({ color }: { color: string }) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 4000, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 0.6, duration: 4000, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.4, duration: 4000, useNativeDriver: true }),
        ]),
      ])
    );
    breathe.start();
    return () => breathe.stop();
  }, []);

  return (
    <View style={breathStyles.container}>
      <Animated.View style={[breathStyles.outerRing, { borderColor: color, transform: [{ scale }], opacity }]} />
      <Animated.View style={[breathStyles.innerCircle, { backgroundColor: color, transform: [{ scale }] }]} />
    </View>
  );
}

const breathStyles = StyleSheet.create({
  container: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },
  outerRing: { position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 2 },
  innerCircle: { width: 120, height: 120, borderRadius: 60, opacity: 0.25 },
});

// ── Countdown ring ────────────────────────────────────────────────────────────

function CountdownDisplay({ seconds, total, color }: { seconds: number; total: number; color: string }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <View style={cdStyles.wrapper}>
      <Text style={[cdStyles.time, { color }]}>
        {mins > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${secs}s`}
      </Text>
      <Text style={cdStyles.label}>restantes</Text>
    </View>
  );
}

const cdStyles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginVertical: SPACING.lg },
  time: { fontSize: 48, fontFamily: TYPOGRAPHY.JAKARTA_700 },
  label: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginTop: 2 },
});

// ── Recovery check (before / after) ──────────────────────────────────────────

function RecoveryCheck({ onSubmit, color }: { onSubmit: (score: number) => void; color: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <View style={rcStyles.container}>
      <Text style={rcStyles.question}>Como te sentes agora?</Text>
      <Text style={rcStyles.sub}>Compara com antes da pausa</Text>
      <View style={rcStyles.row}>
        {[1, 2, 3, 4, 5].map((v) => (
          <TouchableOpacity
            key={v}
            onPress={() => setSelected(v)}
            style={[rcStyles.btn, { borderColor: selected === v ? color : 'transparent', backgroundColor: selected === v ? color : '#F3F4F6' }]}
            activeOpacity={0.8}
          >
            <Text style={[rcStyles.num, { color: selected === v ? '#fff' : COLORS.TEXT_PRIMARY }]}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={rcStyles.labels}>
        <Text style={rcStyles.labelTxt}>Mal</Text>
        <Text style={rcStyles.labelTxt}>Excelente</Text>
      </View>
      <TouchableOpacity
        style={[rcStyles.submit, { backgroundColor: selected ? color : '#E5E7EB' }]}
        disabled={!selected}
        onPress={() => selected && onSubmit(selected)}
        activeOpacity={0.85}
      >
        <Text style={[rcStyles.submitTxt, { color: selected ? '#fff' : '#9CA3AF' }]}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const rcStyles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: SPACING.xl },
  question: { fontSize: 24, fontFamily: TYPOGRAPHY.JAKARTA_700, color: COLORS.TEXT_PRIMARY, textAlign: 'center', marginBottom: SPACING.sm },
  sub: { fontSize: 14, color: COLORS.TEXT_SECONDARY, marginBottom: SPACING.xl },
  row: { flexDirection: 'row', gap: 12, marginBottom: SPACING.sm },
  btn: { width: 52, height: 52, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  num: { fontSize: 18, fontFamily: TYPOGRAPHY.JAKARTA_700 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: SPACING.xl },
  labelTxt: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  submit: { width: '100%', height: 52, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center' },
  submitTxt: { fontSize: 16, fontFamily: TYPOGRAPHY.JAKARTA_700 },
});

// ── Main component ────────────────────────────────────────────────────────────

export function PulseBreakFlow({ sessionId, interventionType, onComplete, onSkip }: Props) {
  const insets = useSafeAreaInsets();
  const config = INTERVENTIONS[interventionType] ?? INTERVENTIONS.breathing_reset;
  const [phase, setPhase] = useState<Phase>('prompt');
  const [secondsLeft, setSecondsLeft] = useState(config.duration);
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stepInterval = Math.floor(config.duration / config.steps.length);

  // Countdown + step cycling during active phase
  useEffect(() => {
    if (phase !== 'active') return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          setPhase('recovery');
          return 0;
        }
        return s - 1;
      });
      setStepIndex((i) => {
        const elapsed = config.duration - secondsLeft;
        return Math.min(Math.floor(elapsed / stepInterval), config.steps.length - 1);
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const handleAccept = async () => {
    await supabase
      .from('break_sessions')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', sessionId);
    setPhase('active');
  };

  const handleSkip = async () => {
    await supabase
      .from('break_sessions')
      .update({ status: 'skipped' })
      .eq('id', sessionId);
    onSkip();
  };

  const handleRecovery = async (afterScore: number) => {
    await supabase
      .from('break_sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', sessionId);

    await supabase.from('recovery_checks').insert({
      session_id: sessionId,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      after_score: afterScore,
    });

    onComplete();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* ── PROMPT phase ── */}
      {phase === 'prompt' && (
        <View style={styles.center}>
          <Text style={[styles.icon]}>{config.icon}</Text>
          <Text style={[styles.heading, { color: config.color }]}>{config.label}</Text>
          <Text style={styles.subheading}>Pausa de {config.duration}s</Text>
          <Text style={styles.description}>
            Detetámos que uma pequena pausa pode ajudar o teu bem-estar agora.
          </Text>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: config.color }]}
            onPress={handleAccept}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnTxt}>Fazer pausa agora</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipBtn}>
            <Text style={styles.skipTxt}>Agora não</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── ACTIVE phase ── */}
      {phase === 'active' && (
        <View style={styles.center}>
          {config.breathe ? (
            <BreathingCircle color={config.color} />
          ) : (
            <Text style={styles.icon}>{config.icon}</Text>
          )}
          <CountdownDisplay seconds={secondsLeft} total={config.duration} color={config.color} />
          <Text style={[styles.stepText, { color: config.color }]}>
            {config.steps[stepIndex]}
          </Text>
          <View style={[styles.progressBar, { marginTop: SPACING.xl }]}>
            <View style={[styles.progressFill, {
              backgroundColor: config.color,
              width: `${((config.duration - secondsLeft) / config.duration) * 100}%` as any,
            }]} />
          </View>
        </View>
      )}

      {/* ── RECOVERY phase ── */}
      {phase === 'recovery' && (
        <View style={styles.center}>
          <Text style={styles.icon}>✅</Text>
          <Text style={[styles.heading, { color: config.color }]}>Pausa concluída!</Text>
          <Text style={styles.subheading}>Ótimo trabalho.</Text>
          <RecoveryCheck onSubmit={handleRecovery} color={config.color} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.xl },
  icon: { fontSize: 72, marginBottom: SPACING.lg },
  heading: { fontSize: 28, fontFamily: TYPOGRAPHY.JAKARTA_700, textAlign: 'center', marginBottom: SPACING.sm },
  subheading: { fontSize: 16, color: COLORS.TEXT_SECONDARY, marginBottom: SPACING.md },
  description: { fontSize: 15, color: COLORS.TEXT_SECONDARY, textAlign: 'center', lineHeight: 22, marginBottom: SPACING.xl },
  primaryBtn: { width: SW - 48, height: 56, borderRadius: RADIUS.full, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  primaryBtnTxt: { fontSize: 17, fontFamily: TYPOGRAPHY.JAKARTA_700, color: '#fff' },
  skipBtn: { paddingVertical: SPACING.md },
  skipTxt: { fontSize: 14, color: COLORS.TEXT_SECONDARY },
  stepText: { fontSize: 20, fontFamily: TYPOGRAPHY.JAKARTA_700, textAlign: 'center', marginTop: SPACING.lg },
  progressBar: { width: SW - 48, height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
});
