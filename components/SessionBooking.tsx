import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { FONT_JAKARTA_700, FONT_POPPINS_500 } from '@/lib/fonts';

const { width: SW } = Dimensions.get('window');

const PILLAR_COLORS: Record<string, string> = {
  mental: '#1565C0',
  fisico: '#FB923C',
  financeira: '#34D399',
  juridica: '#F472B6',
};

const PILLAR_NAMES: Record<string, string> = {
  mental: 'Saúde Mental',
  fisico: 'Bem-estar Físico',
  financeira: 'Assistência Financeira',
  juridica: 'Assistência Jurídica',
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
  questionnaireAnswers?: number[];
}

function AnimatedStepLine({ completed, color }: { completed: boolean; color: string }) {
  const progress = useRef(new Animated.Value(completed ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(progress, { toValue: completed ? 1 : 0, duration: 400, useNativeDriver: false }).start();
  }, [completed]);
  return (
    <View style={styles.stepLine}>
      <Animated.View style={[{ height: '100%', borderRadius: 2, backgroundColor: completed ? color : '#e5e7eb', flex: progress as any }]} />
    </View>
  );
}

export function SessionBooking({ pillarId, specialistId, specialistName, onBack, onConfirm, rescheduleBookingId, questionnaireAnswers }: Props) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const color = PILLAR_COLORS[pillarId] || '#1565C0';
  const pillarName = PILLAR_NAMES[pillarId] || 'Sessão';
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

    const metadata: Record<string, unknown> = {};
    if (questionnaireAnswers?.length) metadata.questionnaire_answers = questionnaireAnswers;

    const { error } = await supabase.from('bookings').insert({
      user_id: user?.id,
      specialist_id: specialistId || null,
      booking_date: dateStr,
      start_time: selectedTime,
      end_time: endTime,
      meeting_type: sessionType,
      primary_pillar: PILLAR_CODES[pillarId] || 'PSYCH',
      status: 'pending',
      metadata: Object.keys(metadata).length ? metadata : undefined,
    });

    if (!error && rescheduleBookingId) {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', rescheduleBookingId);
    }

    setConfirming(false);

    if (error) {
      track.sessionBookingFailed(pillarId, error.message);
      Alert.alert('Erro', error.message);
      return;
    }

    track.sessionBooked(pillarId, sessionType, dateStr, !!rescheduleBookingId);
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
    const selectedDateObj = selectedDay !== null ? days[selectedDay] : null;
    const dateText = selectedDateObj ? `${selectedDateObj.label}, ${selectedDateObj.day} ${selectedDateObj.month}` : '';
    return (
      <LinearGradient colors={[color, color + 'cc']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.successScreen}>
        <Animated.View
          style={[
            styles.successCircle,
            {
              transform: [{ scale: checkAnim }],
              opacity: checkAnim,
            },
          ]}
        >
          <View style={styles.successInner}>
            <Ionicons name="checkmark" size={56} color="#fff" />
          </View>
        </Animated.View>
        <Text style={styles.successTitle}>Sessão Marcada!</Text>
        <Text style={styles.successSub}>A sua sessão foi confirmada com sucesso.</Text>
        {selectedTime && dateText && (
          <Text style={styles.successDate}>{dateText} · {selectedTime}</Text>
        )}
      </LinearGradient>
    );
  }

  const currentStep = !selectedDay ? 1 : !selectedTime ? 2 : 3;
  const canConfirm = selectedDay !== null && selectedTime !== null;
  const buttonLabel = !selectedDay ? 'Escolha um dia →' : !selectedTime ? 'Escolha um horário →' : 'Confirmar Sessão';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color, paddingTop: insets.top }]}>
        <View style={styles.headerInner}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color={color} />
          </TouchableOpacity>
          <View style={styles.specialistSection}>
            <View style={[styles.avatarDot, { backgroundColor: '#fff' }]}>
              <Text style={[styles.avatarLetter, { color }]}>{specialistName.charAt(0)}</Text>
            </View>
            <View style={styles.specialistInfo}>
              <Text style={styles.specialistName}>{specialistName}</Text>
              <Text style={styles.pillarSubtitle}>Sessão de {pillarName}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Step progress bar */}
      <View style={[styles.stepBar, { backgroundColor: color + '10' }]}>
        {[1, 2, 3].map((step, idx) => (
          <View key={step} style={styles.stepItem}>
            <View style={[
              styles.stepCircle,
              step <= currentStep && { backgroundColor: color },
              step > currentStep && { borderColor: '#d1d5db', borderWidth: 2 },
            ]}>
              {step < currentStep ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <Text style={[styles.stepNum, step === currentStep ? { color: '#fff' } : { color: '#9ca3af' }]}>{step}</Text>
              )}
            </View>
            {idx < 2 && <AnimatedStepLine completed={step < currentStep} color={color} />}
          </View>
        ))}
        <View style={styles.stepLabels}>
          <Text style={[styles.stepLabel, { color: currentStep >= 1 ? color : '#9ca3af' }]}>Tipo</Text>
          <Text style={[styles.stepLabel, { color: currentStep >= 2 ? color : '#9ca3af' }]}>Data</Text>
          <Text style={[styles.stepLabel, { color: currentStep >= 3 ? color : '#9ca3af' }]}>Horário</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Session type */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Tipo de Sessão</Text>
          <View style={styles.typeRow}>
            {(['video', 'voice'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeCard,
                  sessionType === type && { borderLeftColor: color, borderLeftWidth: 4, backgroundColor: color + '10' },
                ]}
                onPress={() => { track.sessionTypeSelected(type, pillarId); setSessionType(type); }}
                activeOpacity={0.8}
              >
                <View style={[styles.typeIconBox, sessionType === type && { backgroundColor: color + '22' }]}>
                  <Ionicons
                    name={type === 'video' ? 'videocam' : 'call'}
                    size={28}
                    color={sessionType === type ? color : '#9ca3af'}
                  />
                </View>
                <View>
                  <Text style={[styles.typeText, sessionType === type && { color, fontWeight: '700' }]}>
                    {type === 'video' ? 'Videochamada' : 'Chamada de Voz'}
                  </Text>
                  <Text style={styles.typeSubtext}>50 min</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Escolha o Dia</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
            {days.map((d, i) => {
              const isToday = i === 0;
              const isSelected = selectedDay === i;
              return (
                <View key={i} style={styles.dayWrapper}>
                  {isToday && <Text style={styles.todayLabel}>Hoje</Text>}
                  <TouchableOpacity
                    style={[
                      styles.dayCard,
                      isSelected && { backgroundColor: color },
                    ]}
                    onPress={() => { track.sessionDaySelected(pillarId, i); setSelectedDay(i); setSelectedTime(null); }}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.dayName, isSelected && { color: '#fff' }]}>{d.label}</Text>
                    <Text style={[styles.dayNum, isSelected && { color: '#fff' }]}>{d.day}</Text>
                    <Text style={[styles.dayMonth, isSelected && { color: 'rgba(255,255,255,0.8)' }]}>{d.month}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Time */}
        {selectedDay !== null && (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Escolha o Horário</Text>

            {/* AM slots */}
            <View>
              <Text style={styles.timeGroupLabel}>Manhã</Text>
              <View style={styles.timeGrid}>
                {TIME_SLOTS.slice(0, 3).map((slot) => {
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
                      onPress={() => { if (!isBooked) { track.sessionTimeSelected(pillarId, slot); setSelectedTime(slot); } }}
                      disabled={isBooked}
                      activeOpacity={0.8}
                    >
                      {!isBooked && <Ionicons name="time-outline" size={12} color={isSelected ? '#fff' : color} style={styles.timeIcon} />}
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
            </View>

            {/* PM slots */}
            <View style={{ marginTop: 12 }}>
              <Text style={styles.timeGroupLabel}>Tarde</Text>
              <View style={styles.timeGrid}>
                {TIME_SLOTS.slice(3).map((slot) => {
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
                      onPress={() => { if (!isBooked) { track.sessionTimeSelected(pillarId, slot); setSelectedTime(slot); } }}
                      disabled={isBooked}
                      activeOpacity={0.8}
                    >
                      {!isBooked && <Ionicons name="time-outline" size={12} color={isSelected ? '#fff' : color} style={styles.timeIcon} />}
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
            </View>
          </View>
        )}

        {/* Booking summary */}
        {canConfirm && (
          <View style={[styles.summary, { backgroundColor: color + '15', borderColor: color + '40' }]}>
            <Ionicons name="checkmark-circle" size={20} color={color} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.summaryTitle, { color }]}>Reserva Confirmada</Text>
              <Text style={styles.summaryText}>
                {days[selectedDay].label}, {days[selectedDay].day} {days[selectedDay].month} às {selectedTime}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            { backgroundColor: color },
            !canConfirm && { opacity: 0.4 },
          ]}
          onPress={handleConfirm}
          disabled={!canConfirm || confirming}
          activeOpacity={0.85}
        >
          {confirming
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.confirmBtnText}>{buttonLabel}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialistSection: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatarDot: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { fontSize: 20, fontWeight: '700' },
  specialistInfo: { flex: 1 },
  specialistName: { fontSize: 16, fontFamily: FONT_JAKARTA_700, color: '#fff', marginBottom: 2 },
  pillarSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: FONT_POPPINS_500 },

  stepBar: { paddingHorizontal: 20, paddingVertical: 12 },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' },
  stepNum: { fontSize: 12, fontFamily: FONT_JAKARTA_700 },
  stepLine: { flex: 1, height: 2, backgroundColor: '#e5e7eb', marginHorizontal: 4 },
  stepLabels: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: 8, gap: 8 },
  stepLabel: { fontSize: 11, fontFamily: FONT_JAKARTA_700, textTransform: 'uppercase', letterSpacing: 0.5 },

  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 140 },
  sectionBlock: { marginBottom: 24 },
  sectionLabel: { fontSize: 13, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a', marginBottom: 12 },
  typeRow: { flexDirection: 'row', gap: 12 },
  typeCard: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 14, backgroundColor: '#f9f9f9' },
  typeIconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  typeText: { fontSize: 14, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a' },
  typeSubtext: { fontSize: 12, color: '#9ca3af', marginTop: 2 },

  daysRow: { paddingRight: 20, gap: 10 },
  dayWrapper: { alignItems: 'center' },
  todayLabel: { fontSize: 10, fontFamily: FONT_JAKARTA_700, color: '#1565C0', marginBottom: 4, textTransform: 'uppercase' },
  dayCard: { width: 64, paddingVertical: 14, borderRadius: 16, alignItems: 'center', gap: 4, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#ffffff' },
  dayName: { fontSize: 11, fontFamily: FONT_JAKARTA_700, color: '#474747', textTransform: 'uppercase', letterSpacing: 0.5 },
  dayNum: { fontSize: 22, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a' },
  dayMonth: { fontSize: 11, fontFamily: FONT_POPPINS_500, color: '#9ca3af' },

  timeGroupLabel: { fontSize: 12, fontFamily: FONT_JAKARTA_700, color: '#474747', marginBottom: 8, textTransform: 'uppercase' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeSlot: { width: (SW - 40 - 20) / 3 - 7, paddingVertical: 14, borderRadius: 12, alignItems: 'center', gap: 4, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#ffffff' },
  timeIcon: { marginBottom: 2 },
  timeSlotBooked: { backgroundColor: '#f9f9f9', borderColor: '#f3f4f6' },
  timeText: { fontSize: 14, fontFamily: FONT_JAKARTA_700, color: '#0a0a0a' },
  timeTextBooked: { color: '#d1d5db', textDecorationLine: 'line-through' },

  summary: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  summaryTitle: { fontSize: 13, fontFamily: FONT_JAKARTA_700 },
  summaryText: { fontSize: 12, color: '#474747', marginTop: 2, fontFamily: FONT_POPPINS_500 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  confirmBtn: { height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  confirmBtnText: { fontSize: 16, fontFamily: FONT_JAKARTA_700, color: '#ffffff' },

  successScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  successCircle: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  successInner: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.3)' },
  successTitle: { fontSize: 28, fontFamily: FONT_JAKARTA_700, color: '#fff', marginBottom: 8, textAlign: 'center' },
  successSub: { fontSize: 16, color: 'rgba(255,255,255,0.95)', textAlign: 'center', lineHeight: 24, fontFamily: FONT_POPPINS_500 },
  successDate: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 16, fontFamily: FONT_POPPINS_500 },
});
