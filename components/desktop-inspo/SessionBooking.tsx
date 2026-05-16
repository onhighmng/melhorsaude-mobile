import { ArrowLeft, Video, Phone } from 'lucide-react';
import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '@/utils/inspoToast';
// import svgPaths from "../imports/svg-zf43v5wy79";
import { useSpecialists } from '@/hooks/useSpecialists';
import { useBookings } from '@/hooks/useBookings';

// Placeholder for missing SVG paths
const svgPaths = {
    p164dc300: "M9 0L11.0206 6.97943L18 9L11.0206 11.0206L9 18L6.97943 11.0206L0 9L6.97943 6.97943L9 0Z",
    p661b2d0: "M6 0L7.34708 4.65292L12 6L7.34708 7.34708L6 12L4.65292 7.34708L0 6L4.65292 4.65292L6 0Z"
};

interface SessionBookingProps {
    pillarId: 'mental' | 'fisico' | 'financeira' | 'juridica';
    rescheduleSessionId?: string | null;
    onBack: () => void;
    onComplete: () => void;
}

export function SessionBooking({
    pillarId,
    rescheduleSessionId = null,
    onBack,
    onComplete
}: SessionBookingProps) {
    const { specialists } = useSpecialists();
    const { createBooking, rescheduleBooking } = useBookings();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [sessionType, setSessionType] = useState<'video' | 'voice'>('video');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter specialists by pillar with Round Robin (LRU) logic
    // specific to match Mobile implementation
    const getSpecialistForPillar = (pillar: string) => {
        if (!specialists.length) return null;

        const normalized = pillar.toLowerCase();
        let targetPillarCode = '';

        if (normalized.includes('mental')) targetPillarCode = 'mental';
        else if (normalized.includes('físic') || normalized.includes('fisico')) targetPillarCode = 'fisico';
        else if (normalized.includes('financ')) targetPillarCode = 'financeira';
        else if (normalized.includes('juríd') || normalized.includes('legal')) targetPillarCode = 'juridica';

        // Find matches
        const matches = specialists.filter(s =>
            s.is_active !== false &&
            s.specialist_pillars?.some((sp: any) => sp.pillar_code === targetPillarCode || sp.pillar_code === pillar)
        );

        if (matches.length > 0) {
            // True Round Robin (LRU - Least Recently Used)
            // 1. Shuffle to break absolute ties
            const shuffled = [...matches].sort(() => Math.random() - 0.5);

            // 2. Sort by Last Assigned Date (Ascending = Oldest First)
            const sorted = shuffled.sort((a: any, b: any) => {
                const timeA = a.last_assigned_at ? new Date(a.last_assigned_at).getTime() : 0;
                const timeB = b.last_assigned_at ? new Date(b.last_assigned_at).getTime() : 0;
                return timeA - timeB;
            });

            return sorted[0];
        }

        return null;
    };

    const specialist = getSpecialistForPillar(pillarId);

    // Define Pillar Details (Title + Color)
    const pillarDetails = {
        mental: { title: 'Saúde Mental', color: '#06ABDD' },
        fisico: { title: 'Bem-estar Físico', color: '#FF8C42' },
        financeira: { title: 'Assistência Financeira', color: '#4ECDC4' },
        juridica: { title: 'Assistência Jurídica', color: '#D8A4C4' },
    }[pillarId];


    // Generate next 7 days for date selection
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            // Skip weekends if desired, but let's keep it simple
            dates.push(date);
        }
        return dates;
    };

    const availableDates = generateDates();

    // Available time slots
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

    const handleConfirm = async () => {
        if (selectedDate && selectedTime && specialist) {
            setIsSubmitting(true);
            try {
                let result;
                const meetingType = sessionType === 'video' ? 'video' : 'phone';

                if (rescheduleSessionId) {
                    // RESCHEDULE existing booking (update, not create new)
                    result = await rescheduleBooking(
                        rescheduleSessionId,
                        selectedDate,
                        `${selectedTime}:00`,
                        meetingType,
                        specialist.id,
                        pillarId
                    );
                } else {
                    // CREATE new booking
                    result = await createBooking({
                        booking_date: selectedDate,
                        start_time: `${selectedTime}:00`,
                        meeting_type: meetingType,
                        primary_pillar: pillarId,
                        specialist_id: specialist.id,
                        metadata: {
                            notes: `Agendado via Nova Interface Desktop - ${sessionType === 'video' ? 'Videochamada' : 'Chamada de Voz'}`
                        }
                    });
                }

                if (!result.success) {
                    throw new Error(result.error || 'Booking failed');
                }

                showSuccessToast('Sucesso', rescheduleSessionId ? 'Sessão reagendada com sucesso!' : 'Sessão agendada com sucesso!');
                onComplete();
            } catch (error: any) {
                console.error(error);
                showErrorToast('Erro', error.message || 'Falha ao agendar sessão. Tente novamente.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            if (!specialist) {
                showErrorToast('Indisponível', 'Não há especialistas disponíveis para esta categoria no momento.');
            } else {
                showErrorToast('Atenção', 'Por favor, selecione uma data e um horário.');
            }
        }
    };

    const canConfirm = selectedDate && selectedTime && !isSubmitting;

    return (
        <div className="min-h-screen bg-[#f6f5ec] pb-[120px]">
            {/* Top Section */}
            <div
                className="rounded-bl-[32px] rounded-br-[32px] p-6 pb-4 relative"
                style={{ backgroundColor: pillarDetails?.color || '#000' }}
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
                        {pillarDetails?.title || 'Agendamento'}
                    </p>
                </div>

                {/* Specialist Info */}
                <div className="text-white text-center">
                    <p className="font-['Nunito:Bold',sans-serif] font-bold text-[14px]">
                        Especialista Atribuído
                    </p>
                    <p className="font-['Nunito:Medium',sans-serif] font-medium text-[18px] mt-1">
                        {specialist?.profile?.full_name || 'A atribuir...'}
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
                        style={sessionType === 'video' ? { borderColor: pillarDetails?.color } : {}}
                    >
                        <Video
                            className="w-6 h-6"
                            style={{ color: sessionType === 'video' ? pillarDetails?.color : '#666' }}
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
                        style={sessionType === 'voice' ? { borderColor: pillarDetails?.color } : {}}
                    >
                        <Phone
                            className="w-6 h-6"
                            style={{ color: sessionType === 'voice' ? pillarDetails?.color : '#666' }}
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
                                onClick={() => setSelectedDate(formattedDate.fullDate)}
                                className={`h-[75px] rounded-[20px] flex flex-col items-center justify-center gap-1 transition-all ${isSelected
                                    ? 'bg-[rgba(6,171,221,0.08)] border-2'
                                    : 'bg-white border-2 border-transparent'
                                    }`}
                                style={isSelected ? { borderColor: pillarDetails?.color } : {}}
                            >
                                <p className="font-['Inter',sans-serif] text-[12px] text-[#666]">
                                    {formattedDate.dayName}
                                </p>
                                <p
                                    className="font-['Inter',sans-serif] font-bold text-[20px]"
                                    style={{ color: isSelected ? pillarDetails?.color : '#000' }}
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
                <p className="font-['Manrope',sans-serif] text-[18px] text-black mb-3 px-2">
                    Escolha um Horário
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`h-[56px] rounded-[20px] flex items-center justify-center transition-all ${isSelected
                                    ? 'bg-[rgba(6,171,221,0.08)] border-2'
                                    : 'bg-white border-2 border-transparent'
                                    }`}
                                style={isSelected ? { borderColor: pillarDetails?.color } : {}}
                            >
                                <p
                                    className="font-['Inter',sans-serif] font-semibold text-[16px]"
                                    style={{ color: isSelected ? pillarDetails?.color : '#000' }}
                                >
                                    {time}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Confirm Button */}
            <div className="fixed bottom-[20px] left-[12px] right-[12px]">
                <button
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className="w-full h-[61px] rounded-[1000px] flex items-center justify-center transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: pillarDetails?.color }}
                >
                    <p className="font-['Nunito:Medium',sans-serif] font-medium text-[16px] text-white">
                        {isSubmitting ? 'A Agendar...' : 'Confirmar Marcação'}
                    </p>
                </button>
            </div>
        </div>
    );
}
