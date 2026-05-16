import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Alert, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/hooks/use-bookings';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '@/lib/design-tokens';
import { ArrowLeft, Star, Check } from 'lucide-react-native';

const { width: SW } = Dimensions.get('window');

interface Props {
  onBack: () => void;
  past: Booking[];
  loading: boolean;
}

interface RatingState {
  [bookingId: string]: {
    stars: number;
    comment: string;
    submitted: boolean;
    submitting: boolean;
  };
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)} activeOpacity={0.7}>
          <Star
            size={32}
            color={value >= star ? COLORS.MOOD_STRESS : '#D1D5DB'}
            fill={value >= star ? COLORS.MOOD_STRESS : 'transparent'}
            strokeWidth={1.5}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: COLORS.PILLAR_MENTAL,
  PHYSICAL: COLORS.PILLAR_FISICO,
  FINANCIAL: COLORS.PILLAR_FINANCEIRA,
  LEGAL: COLORS.PILLAR_JURIDICA,
};

export function RateSessionsPage({ onBack, past, loading }: Props) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [ratings, setRatings] = useState<RatingState>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const unrated = past.filter(b => b.status === 'completed' && !b.metadata?.request_type && !(b.session_feedback?.length));

  const handleSubmit = async (booking: any) => {
    const r = ratings[booking.id];
    if (!r || r.stars === 0) {
      Alert.alert('Avaliação', 'Selecciona pelo menos uma estrela.');
      return;
    }

    setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitting: true } }));

    try {
      const { error } = await supabase.from('session_feedback').insert({
        booking_id: booking.id,
        user_id: user?.id,
        specialist_id: booking.specialist?.id,
        overall_rating: r.stars,
        positive_feedback: r.stars >= 4 ? r.comment : null,
        improvement_suggestions: r.stars < 4 ? r.comment : null,
        submitted_at: new Date().toISOString(),
      });

      if (error) {
        Alert.alert('Erro', error.message);
        setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitting: false } }));
      } else {
        track.sessionRated(r.stars, booking.primary_pillar || 'PSYCH', !!(r.comment?.trim()));
        setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitted: true, submitting: false } }));
        Alert.alert('Sucesso', 'Obrigado pela tua avaliação!');
      }
    } catch (err: any) {
      track.sessionRatingFailed(err.message || 'unknown');
      Alert.alert('Erro', err.message || 'Falha ao guardar avaliação');
      setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitting: false } }));
    }
  };

  const setRating = (id: string, stars: number) => {
    setRatings(prev => ({ ...prev, [id]: { stars, comment: prev[id]?.comment || '', submitted: false, submitting: false } }));
  };

  const setComment = (id: string, comment: string) => {
    setRatings(prev => ({ ...prev, [id]: { ...prev[id], comment, stars: prev[id]?.stars || 0, submitted: false, submitting: false } }));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerInner}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft color={COLORS.TEXT_PRIMARY} size={22} />
          </TouchableOpacity>
          <Text style={styles.title}>Avaliar Sessões</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 48 }} color={COLORS.PRIMARY} size="large" />
      ) : unrated.length === 0 ? (
        <View style={styles.empty}>
          <Star size={48} color="#D1D5DB" strokeWidth={1} />
          <Text style={styles.emptyTitle}>Sem sessões para avaliar</Text>
          <Text style={styles.emptyText}>Quando tiveres sessões completas, aparecerão aqui.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {unrated.map((booking: any) => {
            const r = ratings[booking.id];
            const isExpanded = expanded === booking.id;
            const color = PILLAR_COLORS[booking.primary_pillar || 'PSYCH'] || COLORS.PRIMARY;
            const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
            const date = new Date(booking.booking_date).toLocaleDateString('pt-PT', {
              day: 'numeric', month: 'short', year: 'numeric',
            });

            return (
              <View key={booking.id} style={styles.card}>
                {/* Card header */}
                <TouchableOpacity
                  style={styles.cardHeader}
                  onPress={() => {
                    if (!isExpanded) track.sessionRatingOpened(booking.primary_pillar || 'PSYCH', specialistName);
                    setExpanded(isExpanded ? null : booking.id);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={[styles.colorDot, { backgroundColor: color + '40' }]}>
                    <View style={[styles.colorDotInner, { backgroundColor: color }]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardSpecialist}>{specialistName}</Text>
                    <Text style={styles.cardDate}>{date} · {booking.start_time?.slice(0, 5)}</Text>
                  </View>
                  {r?.submitted ? (
                    <View style={[styles.ratedBadge, { backgroundColor: '#D1FAE5' }]}>
                      <Check size={14} color={COLORS.SUCCESS} strokeWidth={2.5} />
                      <Text style={styles.ratedText}>Avaliado</Text>
                    </View>
                  ) : (
                    <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                  )}
                </TouchableOpacity>

                {/* Expanded rating form */}
                {isExpanded && !r?.submitted && (
                  <View style={styles.ratingForm}>
                    <View style={styles.divider} />
                    <Text style={styles.ratingLabel}>Como foi a tua sessão?</Text>
                    <StarRating
                      value={r?.stars || 0}
                      onChange={(s) => setRating(booking.id, s)}
                    />
                    <TextInput
                      style={styles.commentInput}
                      placeholder={r?.stars && r.stars >= 4 ? 'O que correu bem?...' : 'Como podemos melhorar?...'}
                      value={r?.comment || ''}
                      onChangeText={(text) => setComment(booking.id, text)}
                      multiline
                      numberOfLines={3}
                      maxLength={200}
                      placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                      style={[styles.submitBtn, r?.submitting && styles.submitBtnDisabled]}
                      onPress={() => handleSubmit(booking)}
                      disabled={r?.submitting || !r?.stars}
                    >
                      {r?.submitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.submitBtnText}>Guardar Avaliação</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BG },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DIVIDER,
    backgroundColor: COLORS.BG,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: SPACING.xl },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg },
  emptyTitle: { fontSize: 18, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY, marginTop: SPACING.md },
  emptyText: { fontSize: 14, fontFamily: TYPOGRAPHY.POPPINS_400, color: COLORS.TEXT_SECONDARY, marginTop: SPACING.sm, textAlign: 'center' },
  card: {
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
    marginBottom: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDotInner: { width: 14, height: 14, borderRadius: 7 },
  cardSpecialist: { fontSize: 16, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY },
  cardDate: { fontSize: 13, fontFamily: TYPOGRAPHY.POPPINS_400, color: COLORS.TEXT_SECONDARY, marginTop: 2 },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  ratedText: { fontSize: 12, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.SUCCESS },
  expandIcon: { fontSize: 14, color: COLORS.TEXT_SECONDARY },
  ratingForm: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },
  divider: { height: 1, backgroundColor: COLORS.CARD_EL, marginBottom: SPACING.lg },
  ratingLabel: { fontSize: 14, fontFamily: TYPOGRAPHY.POPPINS_600, color: COLORS.TEXT_PRIMARY, marginBottom: SPACING.md },
  starsContainer: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.lg },
  commentInput: {
    backgroundColor: COLORS.BG,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 14,
    fontFamily: TYPOGRAPHY.POPPINS_400,
    color: COLORS.TEXT_PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.CARD_EL,
    marginBottom: SPACING.lg,
    maxHeight: 100,
  },
  submitBtn: {
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#CCC', opacity: 0.6 },
  submitBtnText: { fontSize: 15, fontFamily: TYPOGRAPHY.POPPINS_600, color: '#fff' },
});
