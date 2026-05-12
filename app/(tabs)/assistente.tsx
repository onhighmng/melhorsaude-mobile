import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CARD = '#f2f1ef';
const CARD_EL = '#ecece7';

const CHIPS = [
  { icon: 'brain-outline' as const, text: 'Não consigo desligar a cabeça' },
  { icon: 'body-outline' as const, text: 'Sinto o corpo todo preso' },
  { icon: 'wallet-outline' as const, text: 'Quero organizar-me financeiramente' },
  { icon: 'scale-outline' as const, text: 'Sinto-me injustiçado no trabalho' },
];

type Message = { text: string; isUser: boolean };

const AI_RESPONSE = 'Estou aqui para te apoiar. O que estás a sentir é completamente válido, e é importante que cuides de ti. Gostaria de te ajudar a encontrar o especialista certo para a tua situação. Podes partilhar um pouco mais sobre o que está a acontecer?';

export default function AssistenteScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;
    setShowChips(false);
    setInput('');
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1100));
    setIsTyping(false);
    setMessages(prev => [...prev, { text: AI_RESPONSE, isUser: false }]);
  };

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Assistente Virtual</Text>
        <Text style={styles.headerSub}>O teu apoio inteligente 24/7</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.messages, { paddingBottom: 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {isEmpty && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#1565C0" />
            </View>
            <Text style={styles.emptyTitle}>Como posso ajudar-te hoje?</Text>
            <Text style={styles.emptySub}>Partilha o que estás a sentir ou escolhe uma das sugestões abaixo.</Text>
          </View>
        )}

        {messages.map((m, i) => (
          <View key={i} style={[styles.bubble, m.isUser ? styles.bubbleUser : styles.bubbleAI]}>
            {!m.isUser && (
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles" size={12} color="#1565C0" />
              </View>
            )}
            <Text style={[styles.bubbleText, m.isUser ? styles.bubbleTextUser : styles.bubbleTextAI]}>
              {m.text}
            </Text>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.bubble, styles.bubbleAI]}>
            <ActivityIndicator size="small" color="#1565C0" />
          </View>
        )}
      </ScrollView>

      {showChips && isEmpty && (
        <View style={styles.chips}>
          {CHIPS.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.chip}
              onPress={() => handleSubmit(c.text)}
              activeOpacity={0.8}
            >
              <Ionicons name={c.icon} size={16} color="#474747" />
              <Text style={styles.chipText}>{c.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 100 }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escreve a tua mensagem..."
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={500}
          onSubmitEditing={() => handleSubmit(input)}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          onPress={() => handleSubmit(input)}
          disabled={!input.trim()}
        >
          <Ionicons name="arrow-up" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingHorizontal: 24, paddingBottom: 12, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#0a0a0a' },
  headerSub: { fontSize: 14, color: '#474747', marginTop: 2 },
  messages: { paddingHorizontal: 16, paddingTop: 16, flexGrow: 1 },
  emptyState: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24 },
  emptyIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#f2f1ef', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0a0a0a', textAlign: 'center', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#474747', textAlign: 'center', lineHeight: 20 },
  bubble: { maxWidth: '85%', borderRadius: 20, padding: 14, marginBottom: 10 },
  bubbleUser: { backgroundColor: '#1565C0', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleAI: { backgroundColor: '#f2f1ef', alignSelf: 'flex-start', borderBottomLeftRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 8 },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextAI: { color: '#0a0a0a', flex: 1 },
  aiBadge: { width: 20, height: 20, borderRadius: 6, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  chips: { paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f2f1ef', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  chipText: { fontSize: 14, color: '#0a0a0a', fontWeight: '500', flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 12, gap: 10, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f2f1ef', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#0a0a0a', maxHeight: 120, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1565C0', alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: '#d1d5db' },
});
