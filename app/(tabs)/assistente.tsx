import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_PACIFICO, FONT_POPPINS, FONT_POPPINS_500, FONT_JAKARTA_700 } from '@/lib/fonts';

const logoSymbol = require('@/assets/images/logo-symbol.png');

const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';

const CHIPS = [
  { icon: 'brain-outline'  as const, label: 'Não consigo desligar a cabeça' },
  { icon: 'body-outline'   as const, label: 'Sinto o corpo todo preso' },
  { icon: 'wallet-outline' as const, label: 'Quero organizar-me financeiramente' },
  { icon: 'scale-outline'  as const, label: 'Sinto-me injustiçado no trabalho' },
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
    <KeyboardAvoidingView
      style={styles.container}
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
              <Ionicons name="chatbubble-ellipses" size={36} color="#1565C0" />
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
                <Ionicons name="chatbubble-ellipses" size={14} color="#1565C0" />
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
              <Ionicons name="chatbubble-ellipses" size={14} color="#1565C0" />
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
              <Ionicons name="chatbubble-ellipses" size={14} color="#1565C0" />
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
          {CHIPS.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.chip}
              onPress={() => handleSubmit(c.label)}
              activeOpacity={0.8}
            >
              <Ionicons name={c.icon} size={15} color="#474747" />
              <Text style={styles.chipText}>{c.label}</Text>
              <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
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
          <Ionicons name="arrow-up" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: CARD_EL,
    backgroundColor: '#ffffff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerLogo: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontSize: 22, fontFamily: FONT_PACIFICO, color: '#0a0a0a' },
  headerSub: { fontSize: 12, fontFamily: FONT_POPPINS_500, color: '#9CA3AF', marginTop: 1 },
  onlineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' },

  // Messages area
  messages: { paddingHorizontal: 16, paddingTop: 20, flexGrow: 1 },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24 },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: { fontSize: 22, fontFamily: FONT_PACIFICO, color: '#0a0a0a', textAlign: 'center', marginBottom: 10 },
  emptySub: { fontSize: 14, fontFamily: FONT_POPPINS, color: '#474747', textAlign: 'center', lineHeight: 21 },

  // Bubbles
  bubbleRow: { marginBottom: 12, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowAI:   { justifyContent: 'flex-start' },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: CARD_EL,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '82%',
    padding: 14,
    paddingHorizontal: 16,
  },
  bubbleUser: {
    backgroundColor: '#1565C0',
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: CARD_EL,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 15, lineHeight: 22, fontFamily: FONT_POPPINS },
  bubbleTextUser: { color: '#ffffff' },
  bubbleTextAI:   { color: '#0a0a0a' },
  cursor: { color: '#1565C0', fontWeight: '200' },

  // Chips
  chips: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: CARD,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  chipText: { fontSize: 14, color: '#0a0a0a', fontWeight: '500', flex: 1 },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: CARD_EL,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: '#0a0a0a',
    maxHeight: 120,
    borderWidth: 1,
    borderColor: CARD_EL,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#D1D5DB' },
});
