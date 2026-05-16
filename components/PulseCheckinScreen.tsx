import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from '@/lib/design-tokens';
import { track } from '@/lib/analytics';

const { width: SW } = Dimensions.get('window');

interface Step {
  id: 'energy' | 'stress' | 'humor';
  title: string;
  subtitle: string;
  color: string;
  emoji: string;
}

const STEPS: Step[] = [
  { id: 'energy', title: 'Nível de Energia',    subtitle: 'Como te sentes fisicamente?',   color: '#3B82F6', emoji: '⚡' },
  { id: 'stress', title: 'Nível de Stress',      subtitle: 'Sentes-te sob pressão?',         color: '#F59E0B', emoji: '🌬' },
  { id: 'humor',  title: 'Humor & Estabilidade', subtitle: 'Como está o teu estado emocional?', color: '#10B981', emoji: '😊' },
];

const SCORE_COLORS = ['#EF4444', '#F59E0B', '#FBBF24', '#84CC16', '#10B981'];

interface Props {
  onComplete: (scores: { energy: number; stress: number; humor: number }) => void;
  onBack: () => void;
}

export function PulseCheckinScreen({ onComplete, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [stepIdx, setStepIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const step = STEPS[stepIdx];

  useEffect(() => { track.pulseCheckinStarted(); }, []);

  const animateNext = (cb: () => void) => {
    Animated.parallel([
      Animated.timing(opacityAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -30, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      cb();
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleSelect = (val: number) => {
    track.pulseStepCompleted(step.id, val);
    const newScores = { ...scores, [step.id]: val };
    setScores(newScores);

    if (stepIdx < STEPS.length - 1) {
      animateNext(() => setStepIdx(stepIdx + 1));
    } else {
      onComplete(newScores as { energy: number; stress: number; humor: number });
    }
  };

  const handleBack = () => {
    if (stepIdx > 0) {
      animateNext(() => setStepIdx(stepIdx - 1));
    } else {
      track.pulseAbandoned(step.id);
      onBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} activeOpacity={0.8}>
          <ArrowLeft size={20} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <View style={styles.stepDots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i <= stepIdx ? step.color : '#E5E7EB' },
                i <= stepIdx && { width: 24 },
              ]}
            />
          ))}
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Animated content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: opacityAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Icon */}
        <View style={[styles.iconBox, { backgroundColor: step.color + '18' }]}>
          <Text style={styles.iconEmoji}>{step.emoji}</Text>
        </View>

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.subtitle}>{step.subtitle}</Text>

        {/* Score buttons 1–5 */}
        <View style={styles.scoreRow}>
          {[1, 2, 3, 4, 5].map((num) => {
            const color = SCORE_COLORS[num - 1];
            const isSelected = scores[step.id] === num;
            return (
              <TouchableOpacity
                key={num}
                onPress={() => handleSelect(num)}
                activeOpacity={0.8}
                style={[
                  styles.scoreBtn,
                  {
                    backgroundColor: isSelected ? color : '#F9F9F9',
                    borderColor: isSelected ? color : 'transparent',
                    borderWidth: 2,
                    shadowColor: isSelected ? color : '#000',
                    shadowOpacity: isSelected ? 0.35 : 0.05,
                    shadowOffset: { width: 0, height: isSelected ? 8 : 2 },
                    shadowRadius: isSelected ? 12 : 4,
                    elevation: isSelected ? 6 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.scoreNum,
                    { color: isSelected ? '#fff' : color },
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Labels */}
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>
            {step.id === 'stress' ? 'Baixo' : 'Muito Mal'}
          </Text>
          <Text style={styles.labelText}>
            {step.id === 'stress' ? 'Alto' : 'Excelente'}
          </Text>
        </View>
      </Animated.View>

      {/* Step counter */}
      <Text style={[styles.stepCounter, { bottom: insets.bottom + 32 }]}>
        Passo {stepIdx + 1} de 3
      </Text>
    </View>
  );
}

const BTN_SIZE = (SW - 48 - 32) / 5;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {
    height: 6,
    width: 8,
    borderRadius: RADIUS.full,
    backgroundColor: '#E5E7EB',
    transition: 'all 0.3s',
  } as any,

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: 80,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  iconEmoji: { fontSize: 44 },
  title: {
    fontSize: 30,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.POPPINS_400,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.xxl + 8,
    lineHeight: 24,
  },

  scoreRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.lg,
  },
  scoreBtn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNum: {
    fontSize: 22,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.JAKARTA_700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  stepCounter: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 13,
    fontFamily: TYPOGRAPHY.POPPINS_500,
    color: '#9CA3AF',
  },
});
