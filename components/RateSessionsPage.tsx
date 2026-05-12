import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings, Booking } from '@/hooks/use-bookings';

interface Props {
  onBack: () => void;
}

interface RatingState {
  [bookingId: string]: {
    stars: number;
    comment: string;
    submitted: boolean;
    submitting: boolean;
  };
}

function StarRating({ value, onChange, color }: { value: number; onChange: (v: number) => void; color: string }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)} activeOpacity={0.7}>
          <Ionicons
            name={value >= star ? 'star' : 'star-outline'}
            size={28}
            color={value >= star ? '#FBBF24' : '#D1D5DB'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: '#1565C0',
  PHYSICAL: '#FB923C',
  FINANCIAL: '#34D399',
  LEGAL: '#F472B6',
};

export function RateSessionsPage({ onBack }: Props) {
  const { user } = useAuth();
  const { past, loading } = useBookings();
  const [ratings, setRatings] = useState<RatingState>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const unrated = past.filter(b => b.status === 'completed');

  const handleSubmit = async (booking: Booking) => {
    const r = ratings[booking.id];
    if (!r || r.stars === 0) return;

    setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitting: true } }));

    const { error } = await supabase.from('session_ratings').insert({
      booking_id: booking.id,
      user_id: user?.id,
      rating: r.stars,
      comment: r.comment || null,
    });

    if (error) {
      Alert.alert('Erro', error.message);
      setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitting: false } }));
    } else {
      setRatings(prev => ({ ...prev, [booking.id]: { ...prev[booking.id], submitted: true, submitting: false } }));
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
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={22} color="#0a0a0a" />
            </TouchableOpacity>
            <Text style={styles.title}>Avaliar Sessões</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 48 }} color="#1565C0" />
      ) : unrated.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="star-outline" size={48} color="#D1D5DB" style={{ marginBottom: 12 }} />
          <Text style={styles.emptyTitle}>Sem sessões para avaliar</Text>
          <Text style={styles.emptyText}>Quando tiveres sessões completas, aparecerão aqui.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {unrated.map((booking) => {
            const r = ratings[booking.id];
            const isExpanded = expanded === booking.id;
            const color = PILLAR_COLORS[booking.primary_pillar || 'PSYCH'] || '#1565C0';
            const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
            const date = new Date(booking.booking_date).toLocaleDateString('pt-PT', {
              day: 'numeric', month: 'short', year: 'numeric',
            });

            return (
              <View key={booking.id} style={styles.card}>
                {/* Card header */}
                <TouchableOpacity
                  style={styles.cardHeader}
                  onPress={() => setExpanded(isExpanded ? null : booking.id)}
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
                      <Ionicons name="checkmark" size={14} color="#10B981" />
                      <Text style={styles.ratedText}>Avaliado</Text>
                    </View>
                  ) : (
                    <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#9CA3AF" />
                  )}
                </TouchableOpacity>

                {/* Expanded rating form */}
                {isExpanded && !r?.submitted && (
                  <View style={styles.ratingForm}>
                    <View style={styles.divider} />
                    <Text style={styles.ratingLabel}>Como foi a sua sessão?</Text>
                    <StarRating
                      value={r?.stars || 0}
                      onChange={(s) => setRating(booking.id, s)}
                      color={color}
                    />
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Comentário opcional..."
                      placeholderTextColor="#9CA3AF"
                      value={r?.comment || ''}
                      onChangeText={(t) => setComment(booking.id, t)}
                      multiline
                      maxLength={300}
                    />
                    <TouchableOpacity
                      style={[
                        styles.submitBtn,
                        { backgroundColor: color },
                        (!r || r.stars === 0) && styles.submitBtnDisabled,
                      ]}
                      onPress={() => handleSubmit(booking)}
                      disabled={!r || r.stars === 0 || r.submitting}
                      activeOpacity={0.85}
                    >
                      {r?.submitting
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.submitBtnText}>Submeter Avaliação</Text>
                      }
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff',
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f1ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#0a0a0a' },
  scroll: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#0a0a0a', marginBottom: 8, textAlign: 'center' },
  emptyText: { fontSize: 14, color: '#474747', textAlign: 'center', lineHeight: 20 },
  card: {
    backgroundColor: '#f2f1ef',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 18,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDotInner: { width: 14, height: 14, borderRadius: 7 },
  cardSpecialist: { fontSize: 16, fontWeight: '700', color: '#0a0a0a' },
  cardDate: { fontSize: 13, color: '#474747', marginTop: 2 },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1000,
  },
  ratedText: { fontSize: 12, fontWeight: '700', color: '#10B981' },
  ratingForm: { paddingHorizontal: 18, paddingBottom: 18 },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.06)', marginBottom: 16 },
  ratingLabel: { fontSize: 14, fontWeight: '600', color: '#474747', marginBottom: 12 },
  stars: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  commentInput: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0a0a0a',
    minHeight: 80,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
    marginBottom: 14,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: 48,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.35 },
  submitBtnText: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
});
