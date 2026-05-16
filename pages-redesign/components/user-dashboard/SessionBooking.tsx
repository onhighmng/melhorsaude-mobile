import { ArrowLeft, Video, Phone, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { showErrorToast } from '../../lib/utils';
import { supabase } from '@/lib/supabase';
import svgPaths from "../../imports/svg-zf43v5wy79";

interface SessionBookingProps {
  pillarTitle: string;
  pillarColor: string;
  specialistName: string;
  specialistId: string;
  onBack: () => void;
  onConfirm: (bookingDetails: {
    date: string;
    time: string;
    sessionType: 'video' | 'voice';
  }) => void;
}

export function SessionBooking({
  pillarTitle,
  pillarColor,
  specialistName,
  specialistId,
  onBack,
  onConfirm
}: SessionBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'video' | 'voice'>('video');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Generate next 7 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    // Start from tomorrow
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();

  // Available time slots (standard hours)
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const formatDate = (date: Date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return {
      dayName: days[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()],
      fullDate: date.toISOString().split('T')[0]
    };
  };

  // Fetch booked slots when date or specialist changes
  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !specialistId) return;

      setLoadingSlots(true);
      setBookedSlots([]); // Reset while loading

      try {
        // Fetch all bookings for this specialist on this date
        // Note: we might need to handle timezone more carefully in prod
        const { data, error } = await supabase
          .from('bookings')
          .select('start_time')
          .eq('specialist_id', specialistId)
          .eq('booking_date', selectedDate)
          .in('status', ['confirmed', 'pending', 'rescheduled']);

        if (error) throw error;

        if (data) {
          // data is like [{ start_time: '14:00:00' }, ...]
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
    if (selectedDate && selectedTime) {
      onConfirm({
        date: selectedDate,
        time: selectedTime,
        sessionType
      });
    } else {
      showErrorToast('Por favor, selecione uma data e um horário.');
    }
  };

  const canConfirm = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-[#f6f5ec] pb-[120px]">
      {/* Top Section */}
      <div
        className="rounded-bl-[32px] rounded-br-[32px] p-6 pb-4 relative"
        style={{ backgroundColor: pillarColor }}
      >
        {/* Header with Back Button and Title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-[40px] h-[40px] bg-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <p className="font-['Fredoka:Medium',sans-serif] font-medium text-[24px] text-white flex-1 text-center mr-[40px]">
            {pillarTitle}
          </p>
        </div>

        {/* Specialist Info */}
        <div className="text-white text-center">
          <p className="font-['Nunito:Bold',sans-serif] font-bold text-[14px]">
            Especialista Atribuído
          </p>
          <p className="font-['Nunito:Medium',sans-serif] font-medium text-[18px] mt-1">
            {specialistName}
          </p>
        </div>

        {/* Decorative Stars */}
        <svg className="absolute right-6 top-[86px] w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
          <path d={svgPaths.p164dc300} fill="#FFB518" />
        </svg>
        <svg className="absolute left-[85px] top-[50px] w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
          <path d={svgPaths.p661b2d0} fill="#FFB518" />
        </svg>
      </div>

      {/* Session Type Selection */}
      <div className="mx-[12px] mt-6">
        <p className="font-['Manrope',sans-serif] text-[18px] text-black mb-3 px-2">
          Tipo de Sessão
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setSessionType('video')}
            className={`flex-1 h-[80px] rounded-[24px] flex flex-col items-center justify-center gap-2 transition-all ${sessionType === 'video'
              ? 'bg-[rgba(6,171,221,0.08)] border-2'
              : 'bg-white border-2 border-transparent'
              }`}
            style={sessionType === 'video' ? { borderColor: pillarColor } : {}}
          >
            <Video
              className="w-6 h-6"
              style={{ color: sessionType === 'video' ? pillarColor : '#666' }}
            />
            <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-black">
              Videochamada
            </p>
          </button>
          <button
            onClick={() => setSessionType('voice')}
            className={`flex-1 h-[80px] rounded-[24px] flex flex-col items-center justify-center gap-2 transition-all ${sessionType === 'voice'
              ? 'bg-[rgba(6,171,221,0.08)] border-2'
              : 'bg-white border-2 border-transparent'
              }`}
            style={sessionType === 'voice' ? { borderColor: pillarColor } : {}}
          >
            <Phone
              className="w-6 h-6"
              style={{ color: sessionType === 'voice' ? pillarColor : '#666' }}
            />
            <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-black">
              Chamada de Voz
            </p>
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mx-[12px] mt-8">
        <p className="font-['Manrope',sans-serif] text-[18px] text-black mb-3 px-2">
          Escolha uma Data
        </p>
        <div className="grid grid-cols-4 gap-3">
          {availableDates.map((date) => {
            const formattedDate = formatDate(date);
            const isSelected = selectedDate === formattedDate.fullDate;
            return (
              <button
                key={formattedDate.fullDate}
                onClick={() => {
                  setSelectedDate(formattedDate.fullDate);
                  setSelectedTime(null); // Reset time when date changes
                }}
                className={`h-[75px] rounded-[20px] flex flex-col items-center justify-center gap-1 transition-all ${isSelected
                  ? 'bg-[rgba(6,171,221,0.08)] border-2'
                  : 'bg-white border-2 border-transparent'
                  }`}
                style={isSelected ? { borderColor: pillarColor } : {}}
              >
                <p className="font-['Inter',sans-serif] text-[12px] text-[#666]">
                  {formattedDate.dayName}
                </p>
                <p
                  className="font-['Inter',sans-serif] font-bold text-[20px]"
                  style={{ color: isSelected ? pillarColor : '#000' }}
                >
                  {formattedDate.day}
                </p>
                <p className="font-['Inter',sans-serif] text-[11px] text-[#666]">
                  {formattedDate.month}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mx-[12px] mt-8">
        <div className="flex items-center justify-between mb-3 px-2">
          <p className="font-['Manrope',sans-serif] text-[18px] text-black">
            Escolha um Horário
          </p>
          {loadingSlots && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            const isBooked = bookedSlots.includes(time);

            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={isBooked || !selectedDate}
                className={`h-[56px] rounded-[20px] flex items-center justify-center transition-all ${isSelected
                  ? 'bg-[rgba(6,171,221,0.08)] border-2'
                  : isBooked
                    ? 'bg-gray-100 border-2 border-transparent opacity-50 cursor-not-allowed'
                    : 'bg-white border-2 border-transparent'
                  }`}
                style={isSelected ? { borderColor: pillarColor } : {}}
              >
                <p
                  className={`font-['Inter',sans-serif] font-semibold text-[16px] ${isBooked ? 'text-gray-400 line-through' : ''
                    }`}
                  style={{ color: isSelected ? pillarColor : (isBooked ? undefined : '#000') }}
                >
                  {time}
                </p>
              </button>
            );
          })}
        </div>
        {!selectedDate && (
          <p className="text-sm text-gray-400 mt-2 px-2 text-center">Selecione uma data primeiro.</p>
        )}
      </div>

      {/* Bottom Confirm Button */}
      <div className="fixed bottom-[20px] left-[12px] right-[12px]">

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="w-full h-[61px] rounded-[1000px] flex items-center justify-center transition-opacity disabled:opacity-50"
          style={{ backgroundColor: pillarColor }}
        >
          <p className="font-['Nunito:Medium',sans-serif] font-medium text-[16px] text-white">
            Confirmar Marcação
          </p>
        </button>
      </div>
    </div>
  );
}