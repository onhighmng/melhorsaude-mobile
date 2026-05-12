import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, SafeAreaView, ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const { width: SW } = Dimensions.get('window');

const PILLAR_COLORS: Record<string, string> = {
  mental: '#1565C0',
  fisico: '#FB923C',
  financeira: '#34D399',
  juridica: '#F472B6',
};

const PILLAR_CODES: Record<string, string> = {
  mental: 'PSYCH',
  fisico: 'PHYSICAL',
  financeira: 'FINANCIAL',
  juridica: 'LEGAL',
};

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

function getDays(): { date: Date; label: string; day: string; month: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString('pt-PT', { weekday: 'short' }).replace('.', ''),
      day: String(d.getDate()),
      month: d.toLocaleDateString('pt-PT', { month: 'short' }).replace('.', ''),
    });
  }
  return days;
}

interface Props {
  pillarId: string;
  specialistId: string;
  specialistName: string;
  onBack: () => void;
  onConfirm: () => void;
  rescheduleBookingId?: string;
}

export function SessionBooking({ pillarId, specialistId, specialistName, onBack, onConfirm, rescheduleBookingId }: Props) {
  const { user } = useAuth();
  const color = PILLAR_COLORS[pillarId] || '#1565C0';
  const days = getDays();

  const [sessionType, setSessionType] = useState<'video' | 'voice'>('video');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedDay === null) return;
    const dateStr = days[selectedDay].date.toISOString().split('T')[0];
    supabase
      .from('bookings')
      .select('start_time')
      .eq('specialist_id', specialistId)
      .eq('booking_date', dateStr)
      .in('status', ['confirmed', 'pending'])
      .then(({ data }) => {
        setBookedSlots((data || []).map((b: any) => b.start_time?.slice(0, 5)));
      });
  }, [selectedDay, specialistId]);

  const handleConfirm = async () => {
    if (selectedDay === null || !selectedTime) return;
    setConfirming(true);

    const dateStr = days[selectedDay].date.toISOString().split('T')[0];
    const [h, m] = selectedTime.split(':').map(Number);
    const endTime = `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

    const { error } = await supabase.from('bookings').insert({
      user_id: user?.id,
      specialist_id: specialistId || null,
      booking_date: dateStr,
      start_time: selectedTime,
      end_time: endTime,
      meeting_type: sessionType,
      primary_pillar: PILLAR_CODES[pillarId] || 'PSYCH',
      status: 'pending',
    });

    if (!error && rescheduleBookingId) {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', rescheduleBookingId);
    }

    setConfirming(false);

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    // Animate checkmark
    setShowSuccess(true);
    Animated.spring(checkAnim, {
      toValue: 1,
      tension: 80,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      onConfirm();
    }, 1800);
  };

  if (showSuccess) {
    return (
      <View style={styles.successScreen}>
        <Animated.View
          style={[
            styles.successCircle,
            { backgroundColor: color + '18' },
            {
              transform: [{ scale: checkAnim }],
              opacity: checkAnim,
            },
          ]}
        >
          <View style={[styles.successInner, { backgroundColor: color }]}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
        </Animated.View>
        <Text style={styles.successTitle}>Sessão Marcada!</Text>
        <Text style={styles.successSub}>A sua sessão foi confirmada com sucesso.</Text>
      </View>
    );
  }

  const canConfirm = selectedDay !== null && selectedTime !== null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color + '18' }]}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color={color} />
            </TouchableOpacity>
            <View style={styles.specialistBadge}>
              <View style={[styles.avatarDot, { backgroundColor: color }]}>
                <Text style={styles.avatarLetter}>{specialistName.charAt(0)}</Text>
              </View>
              <View>
                <Text style={[styles.specialistName, { color }]}>{specialistName}</Text>
                <View style={styles.availRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.availText}>Disponível</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Session type */}
        <Text style={styles.sectionLabel}>TIPO DE SESSÃO</Text>
        <View style={styles.typeRow}>
          {(['video', 'voice'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeCard,
                sessionType === type && { borderColor: color, backgroundColor: color + '0d' },
              ]}
              onPress={() => setSessionType(type)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={type === 'video' ? 'videocam-outline' : 'call-outline'}
                size={22}
                color={sessionType === type ? color : '#474747'}
              />
              <Text style={[styles.typeText, sessionType === type && { color, fontWeight: '700' }]}>
                {type === 'video' ? 'Videochamada' : 'Chamada de Voz'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date */}
        <Text style={styles.sectionLabel}>ESCOLHA O DIA</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {days.map((d, i) => {
            const isSelected = selectedDay === i;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dayCard,
                  isSelected && { backgroundColor: color, borderColor: color },
                ]}
                onPress={() => { setSelectedDay(i); setSelectedTime(null); }}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayName, isSelected && { color: '#fff' }]}>{d.label}</Text>
                <Text style={[styles.dayNum, isSelected && { color: '#fff' }]}>{d.day}</Text>
                <Text style={[styles.dayMonth, isSelected && { color: 'rgba(255,255,255,0.75)' }]}>{d.month}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time */}
        <Text style={styles.sectionLabel}>ESCOLHA O HORÁRIO</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedTime === slot;
            return (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlot,
                  isSelected && { backgroundColor: color, borderColor: color },
                  isBooked && styles.timeSlotBooked,
                ]}
                onPress={() => !isBooked && setSelectedTime(slot)}
                disabled={isBooked}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.timeText,
                  isSelected && { color: '#fff' },
                  isBooked && styles.timeTextBooked,
                ]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selection summary */}
        {canConfirm && (
          <View style={[styles.summary, { backgroundColor: color + '12', borderColor: color + '40' }]}>
            <Ionicons name="calendar-outline" size={16} color={color} />
            <Text style={[styles.summaryText, { color }]}>
              {days[selectedDay!].label}, {days[selectedDay!].day} {days[selectedDay!].month} às {selectedTime}
            </Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            { backgroundColor: color },
            !canConfirm && styles.confirmBtnDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!canConfirm || confirming}
          activeOpacity={0.85}
        >
          {confirming
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.confirmBtnText}>Confirmar Sessão</Text>
          }
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
    paddingBottom: 12,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialistBadge: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { fontSize: 16, fontWeight: '700', color: '#fff' },
  specialistName: { fontSize: 16, fontWeight: '700' },
  availRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  greenDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10B981' },
  availText: { fontSize: 12, color: '#10B981', fontWeight: '600' },
  scroll: { paddingHorizontal: 24, paddingTop: 24 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#474747',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
    opacity: 0.5,
  },
  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  typeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#ffffff',
  },
  typeText: { fontSize: 15, fontWeight: '500', color: '#474747' },
  daysRow: { paddingRight: 24, gap: 10, marginBottom: 24 },
  dayCard: {
    width: 60,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#ffffff',
  },
  dayName: { fontSize: 11, fontWeight: '700', color: '#474747', textTransform: 'uppercase', letterSpacing: 0.5 },
  dayNum: { fontSize: 22, fontWeight: '700', color: '#0a0a0a' },
  dayMonth: { fontSize: 11, fontWeight: '500', color: '#474747' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  timeSlot: {
    width: (SW - 48 - 30) / 4,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#ffffff',
  },
  timeSlotBooked: { backgroundColor: '#f9f9f9', borderColor: 'rgba(0,0,0,0.04)' },
  timeText: { fontSize: 14, fontWeight: '700', color: '#0a0a0a' },
  timeTextBooked: { color: '#d1d5db', textDecorationLine: 'line-through' },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  summaryText: { fontSize: 14, fontWeight: '600' },
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
  confirmBtn: {
    height: 56,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnDisabled: { opacity: 0.35 },
  confirmBtnText: { fontSize: 17, fontWeight: '700', color: '#ffffff' },
  successScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  successCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: { fontSize: 28, fontWeight: '700', color: '#0a0a0a', marginBottom: 8, textAlign: 'center' },
  successSub: { fontSize: 16, color: '#474747', textAlign: 'center', lineHeight: 24 },
});
