import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  ScrollView, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Question } from '@/data/questionnaireData';
import { FONT_POPPINS, FONT_JAKARTA_700 } from '@/lib/fonts';

const { width: SW } = Dimensions.get('window');

const PILLAR_COLORS: Record<string, string> = {
  mental: '#1565C0',
  fisico: '#FB923C',
  financeira: '#34D399',
  juridica: '#F472B6',
};

const PILLAR_LABELS: Record<string, string> = {
  mental: 'Saúde Mental',
  fisico: 'Bem-estar Físico',
  financeira: 'Assistência Financeira',
  juridica: 'Assistência Jurídica',
};

const PILLAR_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  mental: 'heart',
  fisico: 'body',
  financeira: 'wallet',
  juridica: 'scale',
};

interface Props {
  pillarId: string;
  questions: Question[];
  onBack: () => void;
  onComplete: (answers: number[]) => void;
}

export function Questionnaire({ pillarId, questions, onBack, onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const color = PILLAR_COLORS[pillarId] || '#1565C0';
  const label = PILLAR_LABELS[pillarId] || 'Questionário';
  const icon = PILLAR_ICONS[pillarId] || 'heart';
  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const progress = (currentQ + 1) / questions.length;

  const animateTransition = (nextQ: number, direction: number, callback: () => void) => {
    Animated.timing(slideAnim, {
      toValue: -direction * SW,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      callback();
      slideAnim.setValue(direction * SW);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleContinue = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    if (isLast) {
      onComplete(newAnswers);
      return;
    }
    animateTransition(currentQ + 1, 1, () => {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    });
  };

  const handleBack = () => {
    if (currentQ === 0) {
      onBack();
      return;
    }
    animateTransition(currentQ - 1, -1, () => {
      setCurrentQ(currentQ - 1);
      setSelectedOption(answers[currentQ - 1] ?? null);
      setAnswers(answers.slice(0, currentQ - 1));
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color + '18', paddingTop: insets.top }]}>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color={color} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <View style={[styles.pillarBadge, { backgroundColor: color + '22' }]}>
                <Ionicons name={icon} size={14} color={color} />
                <Text style={[styles.pillarLabel, { color }]}>{label}</Text>
              </View>
            </View>
            <View style={[styles.counter, { backgroundColor: color + '22' }]}>
              <Text style={[styles.counterText, { color }]}>{currentQ + 1}/{questions.length}</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: color, width: `${progress * 100}%` },
              ]}
            />
          </View>
      </View>

      {/* Question */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          <Text style={styles.questionText}>{q.question}</Text>

          <View style={styles.options}>
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={[
                    styles.option,
                    isSelected && { borderColor: color, backgroundColor: color + '10' },
                  ]}
                  onPress={() => setSelectedOption(i)}
                >
                  <View style={[styles.radio, isSelected && { borderColor: color }]}>
                    {isSelected && <View style={[styles.radioDot, { backgroundColor: color }]} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && { color: '#0a0a0a', fontWeight: '600' }]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            { backgroundColor: color },
            selectedOption === null && styles.continueBtnDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedOption === null}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>
            {isLast ? 'Ver Especialistas' : 'Continuar'}
          </Text>
          {!isLast && <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 6 }} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingBottom: 16 },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  pillarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
  },
  pillarLabel: { fontSize: 13, fontWeight: '700' },
  counter: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 1000,
  },
  counterText: { fontSize: 13, fontWeight: '700' },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  questionText: {
    fontSize: 24,
    fontFamily: FONT_POPPINS,
    color: '#0a0a0a',
    lineHeight: 34,
    marginBottom: 32,
  },
  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  optionText: { fontSize: 16, fontFamily: FONT_POPPINS, color: '#474747', flex: 1, lineHeight: 22 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  continueBtn: {
    height: 56,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnDisabled: { opacity: 0.35 },
  continueBtnText: { fontSize: 17, fontFamily: FONT_JAKARTA_700, color: '#ffffff' },
});
