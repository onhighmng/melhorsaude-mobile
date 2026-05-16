import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Brain, Heart, Wallet, Scale, ArrowRight, Send, Bot } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS, GRADIENT } from '@/lib/design-tokens';

const logoSymbol = require('@/assets/images/logo-symbol.png');

const CHIPS = [
  { icon: 'brain' as const, label: 'Não consigo desligar a cabeça' },
  { icon: 'heart' as const, label: 'Sinto o corpo todo preso' },
  { icon: 'wallet' as const, label: 'Quero organizar-me financeiramente' },
  { icon: 'scale' as const, label: 'Sinto-me injustiçado no trabalho' },
];

const AI_RESPONSE =
  'Estou aqui para te apoiar. O que estás a sentir é completamente válido, e é importante que cuides de ti. Gostaria de te ajudar a encontrar o especialista certo para a tua situação. Podes partilhar um pouco mais sobre o que está a acontecer?';

type Msg = { text: string; isUser: boolean; streaming?: boolean };

function TypingDots() {
  const d1 = useRef(new Animated.Value(0)).current;
  const d2 = useRef(new Animated.Value(0)).current;
  const d3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeBounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -6, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0,  duration: 280, useNativeDriver: true }),
          Animated.delay(600),
        ])
      );

    const a1 = makeBounce(d1, 0);
    const a2 = makeBounce(d2, 150);
    const a3 = makeBounce(d3, 300);
    a1.start(); a2.start(); a3.start();

    return () => { a1.stop(); a2.stop(); a3.stop(); };
  }, []);

  return (
    <View style={typingStyles.row}>
      {[d1, d2, d3].map((d, i) => (
        <Animated.View
          key={i}
          style={[typingStyles.dot, { transform: [{ translateY: d }] }]}
        />
      ))}
    </View>
  );
}

const typingStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#9CA3AF' },
});

export default function AssistenteScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages]   = useState<Msg[]>([]);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [messages, isTyping, streamingText]);

  const streamAIResponse = useCallback((fullText: string) => {
    setStreamingText('');
    let i = 0;
    streamRef.current = setInterval(() => {
      i++;
      setStreamingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(streamRef.current!);
        streamRef.current = null;
        setMessages(prev => [...prev, { text: fullText, isUser: false }]);
        setStreamingText('');
      }
    }, 30);
  }, []);

  useEffect(() => {
    return () => { if (streamRef.current) clearInterval(streamRef.current); };
  }, []);

  const handleSubmit = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowChips(false);
    setInput('');
    setMessages(prev => [...prev, { text: trimmed, isUser: true }]);
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200));
    setIsTyping(false);
    streamAIResponse(AI_RESPONSE);
  }, [streamAIResponse]);

  const isEmpty = messages.length === 0 && !isTyping && !streamingText;
  const isStreaming = !!streamingText;

  return (
    <LinearGradient colors={GRADIENT.BG_GRADIENT.colors} start={GRADIENT.BG_GRADIENT.start} end={GRADIENT.BG_GRADIENT.end} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
      {/* ── Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerLeft}>
          <Image source={logoSymbol} style={styles.headerLogo} resizeMode="contain" />
          <View>
            <Text style={styles.headerTitle}>Mensagens</Text>
            <Text style={styles.headerSub}>Assistente Virtual 24/7</Text>
          </View>
        </View>
        <View style={styles.onlineDot} />
      </View>

      {/* ── Messages */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.messages, { paddingBottom: 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Empty state */}
        {isEmpty && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <MessageCircle size={36} color={COLORS.PRIMARY} />
            </View>
            <Text style={styles.emptyTitle}>Como posso ajudar-te hoje?</Text>
            <Text style={styles.emptySub}>
              Partilha o que estás a sentir ou escolhe uma das sugestões abaixo.
            </Text>
          </View>
        )}

        {/* Message bubbles */}
        {messages.map((m, i) => (
          <View
            key={i}
            style={[styles.bubbleRow, m.isUser ? styles.bubbleRowUser : styles.bubbleRowAI]}
          >
            {!m.isUser && (
              <View style={styles.aiAvatar}>
                <MessageCircle size={14} color={COLORS.PRIMARY} />
              </View>
            )}
            <View style={[styles.bubble, m.isUser ? styles.bubbleUser : styles.bubbleAI]}>
              <Text style={[styles.bubbleText, m.isUser ? styles.bubbleTextUser : styles.bubbleTextAI]}>
                {m.text}
              </Text>
            </View>
          </View>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <View style={[styles.bubbleRow, styles.bubbleRowAI]}>
            <View style={styles.aiAvatar}>
              <Bot size={14} color="#1565C0" />
            </View>
            <View style={[styles.bubble, styles.bubbleAI]}>
              <TypingDots />
            </View>
          </View>
        )}

        {/* Streaming AI bubble */}
        {isStreaming && (
          <View style={[styles.bubbleRow, styles.bubbleRowAI]}>
            <View style={styles.aiAvatar}>
              <Bot size={14} color="#1565C0" />
            </View>
            <View style={[styles.bubble, styles.bubbleAI]}>
              <Text style={styles.bubbleTextAI}>
                {streamingText}
                <Text style={styles.cursor}>|</Text>
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── Chips */}
      {showChips && isEmpty && (
        <View style={styles.chips}>
          {CHIPS.map((c, i) => {
            const iconMap: Record<string, React.ReactNode> = {
              brain: <Brain size={15} color={COLORS.TEXT_SECONDARY} />,
              heart: <Heart size={15} color={COLORS.TEXT_SECONDARY} />,
              wallet: <Wallet size={15} color={COLORS.TEXT_SECONDARY} />,
              scale: <Scale size={15} color={COLORS.TEXT_SECONDARY} />,
            };
            return (
              <TouchableOpacity
                key={i}
                style={styles.chip}
                onPress={() => handleSubmit(c.label)}
                activeOpacity={0.8}
              >
                {iconMap[c.icon]}
                <Text style={styles.chipText}>{c.label}</Text>
                <ArrowRight size={14} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ── Input row */}
      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 96 }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escreve a tua mensagem..."
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={() => handleSubmit(input)}
          blurOnSubmit
        />
        <TouchableOpacity
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          onPress={() => handleSubmit(input)}
          disabled={!input.trim() || isTyping || isStreaming}
          activeOpacity={0.85}
        >
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  headerLogo: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontSize: 36, fontFamily: TYPOGRAPHY.PACIFICO, color: COLORS.TEXT_PRIMARY },
  headerSub: { fontSize: 12, fontFamily: TYPOGRAPHY.POPPINS_500, color: '#9CA3AF', marginTop: 1 },
  onlineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.SUCCESS },

  // Messages area
  messages: { paddingHorizontal: SPACING.md, paddingTop: 20, flexGrow: 1 },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: SPACING.lg },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.xl,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: { fontSize: 22, fontFamily: TYPOGRAPHY.PACIFICO, color: COLORS.TEXT_PRIMARY, textAlign: 'center', marginBottom: 10 },
  emptySub: { fontSize: 14, fontFamily: TYPOGRAPHY.POPPINS_400, color: COLORS.TEXT_SECONDARY, textAlign: 'center', lineHeight: 21 },

  // Bubbles
  bubbleRow: { marginBottom: SPACING.md, flexDirection: 'row', alignItems: 'flex-end', gap: SPACING.sm },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowAI:   { justifyContent: 'flex-start' },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.BG,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '82%',
    padding: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  bubbleUser: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: RADIUS.lg,
    borderBottomRightRadius: 4,
    ...SHADOWS.md,
  },
  bubbleAI: {
    backgroundColor: COLORS.BG,
    borderRadius: RADIUS.lg,
    borderBottomLeftRadius: 4,
    ...SHADOWS.sm,
  },
  bubbleText: { fontSize: 15, lineHeight: 22, fontFamily: TYPOGRAPHY.POPPINS_400 },
  bubbleTextUser: { color: '#ffffff' },
  bubbleTextAI:   { color: COLORS.TEXT_PRIMARY },
  cursor: { color: COLORS.PRIMARY, fontWeight: '200' },

  // Chips
  chips: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  chipText: { fontSize: 14, color: COLORS.TEXT_PRIMARY, fontWeight: '500', flex: 1 },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingTop: 10,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 11,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#D1D5DB' },
});
