import { ArrowLeft, Video, Phone, Calendar, Clock, CheckCircle2, Brain, Activity, Wallet, Scale, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
// DISABLED: import from 'motion/react';
import { supabase } from '@/lib/supabase';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

const PILLAR_META = {
  mental:     { Icon: Brain,    accent: '#1565C0', label: 'Saúde Mental' },
  fisico:     { Icon: Activity, accent: '#FB923C', label: 'Bem-estar Físico' },
  financeira: { Icon: Wallet,   accent: '#34D399', label: 'Assistência Financeira' },
  juridica:   { Icon: Scale,    accent: '#F472B6', label: 'Assistência Jurídica' },
} as const;

interface SessionBookingProps {
  pillarId: string;
  specialistName: string;
  specialistId: string;
  onBack: () => void;
  onConfirm: (bookingDetails: {
    date: string;
    time: string;
    sessionType: 'video' | 'voice';
  }) => void;
}

export function SessionBooking({ pillarId, specialistName, specialistId, onBack, onConfirm }: SessionBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'video' | 'voice'>('video');
  const [confirmed, setConfirmed] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const meta = PILLAR_META[pillarId as keyof typeof PILLAR_META] ?? PILLAR_META.mental;

  const generateDates = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return d;
    });
  };

  const DAYS_PT  = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  const formatDate = (d: Date) => ({
    dayName: DAYS_PT[d.getDay()],
    day: d.getDate(),
    month: MONTHS_PT[d.getMonth()],
    iso: d.toISOString().split('T')[0],
  });

  const TIME_SLOTS = ['09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
  const dates      = generateDates();

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !specialistId) return;
      setLoadingSlots(true);
      setBookedSlots([]);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('start_time')
          .eq('specialist_id', specialistId)
          .eq('booking_date', selectedDate)
          .in('status', ['confirmed', 'pending', 'rescheduled']);
        if (error) throw error;
        if (data) {
          const slots = data.map(b => b.start_time.slice(0, 5));
          setBookedSlots(slots);
        }
      } catch (err) {
        console.error('Error checking availability:', err);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchAvailability();
  }, [selectedDate, specialistId]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      showErrorToast('Por favor, seleciona uma data e um horário.');
      return;
    }
    setConfirmed(true);
    setTimeout(() => {
      onConfirm({
        date: selectedDate,
        time: selectedTime,
        sessionType
      });
    }, 1800);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <div



          className="flex flex-col items-center text-center"
        >
          <div
            className="size-20 rounded-[24px] flex items-center justify-center mb-6 shadow-sm"
            style={{ background: `${meta.accent}15`, border: `1px solid ${meta.accent}30` }}
          >
            <CheckCircle2 size={40} style={{ color: meta.accent }} />
          </div>
          <h2 className="font-poppins text-[#0a0a0a] text-[26px] font-light tracking-wide mb-2">Sessão Agendada!</h2>
          <p className="font-poppins text-[#474747] text-[15px]">A confirmar detalhes…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: `${meta.accent}10`, borderBottom: `1px solid ${meta.accent}20` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${meta.accent}30` }}
          >
            <ArrowLeft size={17} style={{ color: meta.accent }} />
          </button>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full flex items-center justify-center bg-white shadow-sm"
              style={{ border: `1px solid ${meta.accent}20` }}>
              <meta.Icon size={16} style={{ color: meta.accent }} />
            </div>
            <span className="font-pacifico text-[#0a0a0a] font-light text-[18px]">{meta.label}</span>
          </div>
        </div>

        {/* Specialist badge */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[28px] bg-white shadow-sm"
          style={{ border: `1px solid ${meta.accent}20` }}>
          <div
            className="size-10 rounded-full flex items-center justify-center font-poppins font-black text-[16px] text-white shrink-0 shadow-sm"
            style={{ background: meta.accent }}
          >
            {specialistName.charAt(specialistName.indexOf('.') + 2) || specialistName.charAt(0)}
          </div>
          <div>
            <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider">Especialista</p>
            <p className="font-poppins text-[#0a0a0a] font-light text-[14px]">{specialistName}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-poppins text-[11px] text-[#474747] font-medium">Disponível</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-36">

        {/* Session type */}
        <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-3">Tipo de Sessão</p>
        <div className="grid grid-cols-2 gap-3 mb-7">
          {([
            { id: 'video' as const, Icon: Video, label: 'Videochamada' },
            { id: 'voice' as const, Icon: Phone, label: 'Chamada de Voz' },
          ]).map(({ id, Icon, label }) => {
            const active = sessionType === id;
            return (
              <button
                key={id}
                onClick={() => setSessionType(id)}
                className="flex flex-col items-center gap-2.5 py-5 rounded-[28px] transition-all active:scale-95 shadow-sm bg-white"
                style={{
                  border: active ? `1.5px solid ${meta.accent}` : `1px solid ${CARD_EL}`,
                  background: active ? `${meta.accent}0a` : '#ffffff',
                }}
              >
                <div className="size-10 rounded-full flex items-center justify-center border border-black/5"
                  style={{ background: active ? `${meta.accent}15` : CARD_EL }}>
                  <Icon size={18} style={{ color: active ? meta.accent : '#474747' }} />
                </div>
                <span className="font-poppins text-[13px] font-semibold"
                  style={{ color: active ? '#0a0a0a' : '#474747' }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Date selection */}
        <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-3">
          <Calendar size={11} className="inline mr-1.5" />
          Escolha uma Data
        </p>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none mb-7">
          {dates.map((date) => {
            const fd = formatDate(date);
            const active = selectedDate === fd.iso;
            return (
              <button
                key={fd.iso}
                onClick={() => { setSelectedDate(fd.iso); setSelectedTime(null); }}
                className="flex flex-col items-center py-4 px-3.5 rounded-[28px] transition-all active:scale-95 shrink-0 shadow-sm bg-white"
                style={{
                  border: active ? `1.5px solid ${meta.accent}` : `1px solid ${CARD_EL}`,
                  background: active ? `${meta.accent}0a` : '#ffffff',
                  minWidth: 64,
                }}
              >
                <span className="font-poppins text-[10px] font-medium mb-1"
                  style={{ color: active ? meta.accent : '#474747' }}>
                  {fd.dayName}
                </span>
                <span className="font-poppins text-[20px] font-light"
                  style={{ color: active ? '#0a0a0a' : '#0a0a0a' }}>
                  {fd.day}
                </span>
                <span className="font-poppins text-[10px] font-medium mt-1"
                  style={{ color: active ? meta.accent : '#474747' }}>
                  {fd.month}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider">
            <Clock size={11} className="inline mr-1.5" />
            Escolha um Horário
          </p>
          {loadingSlots && <Loader2 className="size-4 animate-spin text-gray-500" />}
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {TIME_SLOTS.map((t) => {
            const active = selectedTime === t;
            const isBooked = bookedSlots.includes(t);
            return (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                disabled={isBooked || !selectedDate}
                className={`py-3 rounded-full font-poppins font-bold text-[13px] transition-all active:scale-95 shadow-sm ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{
                  background: active ? meta.accent : '#ffffff',
                  color: active ? '#fff' : (isBooked ? '#999' : '#0a0a0a'),
                  border: active ? 'none' : `1px solid ${CARD_EL}`,
                  textDecoration: isBooked ? 'line-through' : 'none'
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
        {!selectedDate && (
          <p className="text-xs text-gray-400 mt-2 px-2 text-center">Selecione uma data primeiro.</p>
        )}
      </div>

      {/* Confirm CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 pb-10 pt-4 pointer-events-none"
        style={{ background: `linear-gradient(to top, transparent 70%, transparent)` }}
      >
        <div className="pointer-events-auto">
          {selectedDate && selectedTime && (
            <div


              className="mb-3 px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm"
              style={{ background: `${meta.accent}10`, border: `1px solid ${meta.accent}20` }}
            >
              <CheckCircle2 size={14} style={{ color: meta.accent }} />
              <span className="font-poppins text-[12px] font-semibold" style={{ color: meta.accent }}>
                {selectedDate} · {selectedTime} · {sessionType === 'video' ? 'Videochamada' : 'Chamada de Voz'}
              </span>
            </div>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full py-4 rounded-[28px] font-poppins font-bold text-[15px] transition-all active:scale-[0.98] shadow-sm"
            style={{
              background: (selectedDate && selectedTime) ? meta.accent : CARD_EL,
              color: (selectedDate && selectedTime) ? '#fff' : '#474747',
            }}
          >
            Confirmar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}