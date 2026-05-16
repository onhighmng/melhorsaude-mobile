
import { useState, useEffect } from 'react';
import InteractiveCalendar, { DayType, AppointmentInfo } from '@/components/ui/visualize-booking';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'sonner';

export function AgendaPage({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<AppointmentInfo[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear().toString();

    const [isSpecialist, setIsSpecialist] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user) return;

            try {
                // Get specialist ID first
                console.log('Fetching specialist for user:', user.id);
                const { data: specialistData, error: specError } = await supabase
                    .from('specialists')
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                if (specError || !specialistData) {
                    console.warn('User is not a specialist:', user.id, specError);
                    setIsSpecialist(false);
                    return;
                }

                setIsSpecialist(true);
                console.log('Found specialist ID:', specialistData.id);

                const { data, error } = await supabase
                    .from('bookings')
                    .select(`
id,
    booking_date,
    start_time,
    status,
    meeting_type,
    topic,
    user_notes,
    profile: profiles!bookings_user_id_fkey(
        full_name,
        company_id,
        company: companies!profiles_company_id_fkey(
            company_name
        )
    )
                    `)
                    .eq('specialist_id', specialistData.id)
                    .gte('booking_date', new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0])
                    .lte('booking_date', new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0]);

                if (error) {
                    console.error('Error fetching bookings query:', error);
                    throw error;
                }

                console.log('Fetched bookings:', data?.length);

                const mapped: AppointmentInfo[] = (data || []).map((booking: any) => ({
                    id: booking.id,
                    date: booking.booking_date,
                    time: booking.start_time.slice(0, 5),
                    company: booking.profile?.company?.company_name || 'Particular',
                    employee: booking.profile?.full_name || 'Utilizador',
                    specialist: 'Você',
                    pillar: 'Geral',
                    status: booking.status as any,
                    location: booking.meeting_type === 'video' ? 'Videochamada' : 'Telefone',
                    callType: booking.meeting_type === 'video' ? 'video' : 'phone',
                    preDiagnosis: [
                        { question: "Tópico", answer: booking.topic || "Não especificado" },
                        { question: "Notas", answer: booking.user_notes || "Nenhuma nota" }
                    ]
                }));

                setAppointments(mapped);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [user, currentDate]);

    const generateDays = (): DayType[] => {
        const days: DayType[] = [];
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        let startDayOfWeek = firstDay.getDay();

        // Previous month padding
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ day: '', classNames: 'bg-transparent' });
        }

        // Current month days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayStr = i.toString();
            const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            const dayAppointments = appointments.filter(apt => apt.date === dateStr);

            let classNames = 'bg-[#27272a]';

            days.push({
                day: dayStr,
                classNames,
                appointments: dayAppointments.length > 0 ? dayAppointments : undefined
            });
        }

        return days;
    };

    const daysData = generateDays();

    if (isSpecialist === false) {
        return (
            <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-transparent flex flex-col items-center justify-center text-center">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors absolute top-8 left-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Voltar</span>
                </button>
                <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-red-900/50">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Acesso Restrito</h2>
                    <p className="text-gray-300">
                        Você não está registado como Especialista.<br />
                        Por favor, faça login com uma conta de especialista para ver esta agenda.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">User ID: {user?.id}</p>
                </div>
            </div>
        );
    }

    const handleUpdateLink = async (bookingId: string, link: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ meeting_link: link })
                .eq('id', bookingId);

            if (error) throw error;

            console.log('Meeting link updated successfully');
            toast.success('Link da sessão salvo com sucesso!');
        } catch (error) {
            console.error('Error updating meeting link:', error);
            toast.error('Erro ao salvar link. Tente novamente.');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-transparent">
            <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 font-manrope">Agenda Global</h1>
                <p className="text-gray-400">Gerencie as suas sessões e confirmações.</p>
            </div>

            <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-[#333]">
                <InteractiveCalendar
                    days={daysData}
                    month={month}
                    year={year}
                    onUpdateLink={handleUpdateLink}
                />
            </div>
        </div>
    );
}
