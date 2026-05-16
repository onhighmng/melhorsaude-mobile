import { ArrowLeft, Video, Phone, CheckCircle2, Brain, Activity, Wallet, Scale, Loader2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

interface StepIndicatorProps {
  step: number;
  isCompleted: boolean;
  isActive: boolean;
  accent: string;
}

function StepIndicator({ step, isCompleted, isActive, accent }: StepIndicatorProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: step * 0.1 }}
    >
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-sm relative z-10"
        style={{
          background: isCompleted || isActive ? accent : '#e5e7eb',
          color: isCompleted || isActive ? '#fff' : '#9ca3af',
        }}
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
      >
        {isCompleted ? (
          <Check size={18} />
        ) : (
          <span>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface ProgressLineProps {
  isCompleted: boolean;
  isActive: boolean;
  accent: string;
}

function ProgressLine({ isCompleted, isActive, accent }: ProgressLineProps) {
  return (
    <motion.div
      className="h-12 w-1 relative overflow-hidden rounded-full"
      style={{ background: '#e5e7eb' }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: accent }}
        initial={{ height: 0 }}
        animate={{ height: isCompleted || isActive ? '100%' : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
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
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-8"
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

      {/* Main content with step indicators */}
      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-36">
        <div className="flex gap-8">
          {/* Step indicators column */}
          <div className="flex flex-col items-center shrink-0">
            {/* Step 1 */}
            <StepIndicator
              step={1}
              isCompleted={!!sessionType}
              isActive={!sessionType}
              accent={meta.accent}
            />
            <ProgressLine
              isCompleted={!!sessionType && !!selectedDate}
              isActive={!!sessionType && !selectedDate}
              accent={meta.accent}
            />

            {/* Step 2 */}
            <StepIndicator
              step={2}
              isCompleted={!!selectedDate && !!selectedTime}
              isActive={!!sessionType && !selectedDate}
              accent={meta.accent}
            />
            <ProgressLine
              isCompleted={!!selectedDate && !!selectedTime}
              isActive={!!selectedDate && !selectedTime}
              accent={meta.accent}
            />

            {/* Step 3 */}
            <StepIndicator
              step={3}
              isCompleted={!!selectedTime}
              isActive={!!selectedDate && !selectedTime}
              accent={meta.accent}
            />
          </div>

          {/* Content column */}
          <div className="flex-1">
            {/* Session type */}
            <div className="mb-12">
              <div className="grid grid-cols-2 gap-4">
                {([
                  { id: 'video' as const, Icon: Video, label: 'Videochamada', duration: '50 min' },
                  { id: 'voice' as const, Icon: Phone, label: 'Chamada de Voz', duration: '50 min' },
                ]).map(({ id, Icon, label, duration }) => {
                  const active = sessionType === id;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setSessionType(id)}
                      className="relative overflow-hidden rounded-[20px] transition-all active:scale-95 shadow-sm"
                      style={{
                        border: active ? `1.5px solid ${meta.accent}` : '1px solid #e5e7eb',
                        background: active ? `${meta.accent}0a` : '#ffffff',
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-col items-start p-4 gap-3">
                        {/* Left colored bar */}
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ background: meta.accent }}
                          initial={{ height: 0 }}
                          animate={{ height: active ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0 rounded-[12px] p-2.5"
                            style={{ background: active ? `${meta.accent}15` : '#f3f4f6' }}>
                            <Icon size={20} style={{ color: active ? meta.accent : '#6b7280' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-poppins font-semibold text-[13px] text-left"
                              style={{ color: active ? '#0a0a0a' : '#374151' }}>
                              {label}
                            </p>
                            <p className="font-poppins text-[11px] text-left"
                              style={{ color: active ? meta.accent : '#9ca3af' }}>
                              {duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Date selection */}
            {sessionType && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {dates.map((date) => {
                    const fd = formatDate(date);
                    const active = selectedDate === fd.iso;
                    return (
                      <motion.button
                        key={fd.iso}
                        onClick={() => { setSelectedDate(fd.iso); setSelectedTime(null); }}
                        className="flex flex-col items-center py-4 px-4 rounded-[20px] transition-all active:scale-95 shrink-0 shadow-sm bg-white relative overflow-hidden"
                        style={{
                          border: active ? `1.5px solid ${meta.accent}` : '1px solid #e5e7eb',
                          background: active ? `${meta.accent}0a` : '#ffffff',
                          minWidth: 70,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{ background: meta.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: active ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="font-poppins text-[10px] font-medium mb-1"
                          style={{ color: active ? meta.accent : '#9ca3af' }}>
                          {fd.dayName}
                        </span>
                        <span className="font-poppins text-[18px] font-light text-[#0a0a0a]">
                          {fd.day}
                        </span>
                        <span className="font-poppins text-[10px] font-medium mt-1"
                          style={{ color: active ? meta.accent : '#9ca3af' }}>
                          {fd.month}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Time slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  {loadingSlots && <Loader2 className="size-4 animate-spin" style={{ color: meta.accent }} />}
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((t) => {
                    const active = selectedTime === t;
                    const isBooked = bookedSlots.includes(t);
                    return (
                      <motion.button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        disabled={isBooked}
                        className={`py-3 rounded-[16px] font-poppins font-bold text-[13px] transition-all active:scale-95 shadow-sm relative overflow-hidden ${isBooked ? 'opacity-40 cursor-not-allowed' : ''}`}
                        style={{
                          background: active ? meta.accent : '#ffffff',
                          color: active ? '#fff' : (isBooked ? '#999' : '#0a0a0a'),
                          border: active ? 'none' : '1px solid #e5e7eb',
                        }}
                        whileHover={!isBooked ? { scale: 1.05 } : {}}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-[16px]"
                          style={{ background: meta.accent }}
                          initial={{ scale: 0 }}
                          animate={{ scale: active ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 -z-10"
                        />
                        {t}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 pb-10 pt-4 pointer-events-none"
        style={{ background: `linear-gradient(to top, white 70%, rgba(255,255,255,0.8))` }}
      >
        <div className="pointer-events-auto">
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 px-4 py-3 rounded-full flex items-center gap-2 shadow-sm"
              style={{ background: `${meta.accent}10`, border: `1px solid ${meta.accent}20` }}
            >
              <CheckCircle2 size={14} style={{ color: meta.accent }} />
              <span className="font-poppins text-[12px] font-semibold" style={{ color: meta.accent }}>
                {selectedDate} · {selectedTime} · {sessionType === 'video' ? 'Videochamada' : 'Chamada de Voz'}
              </span>
            </motion.div>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full py-4 rounded-[28px] font-poppins font-bold text-[15px] transition-all active:scale-[0.98] shadow-sm"
            style={{
              background: (selectedDate && selectedTime) ? meta.accent : '#e5e7eb',
              color: (selectedDate && selectedTime) ? '#fff' : '#9ca3af',
            }}
          >
            Confirmar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}
