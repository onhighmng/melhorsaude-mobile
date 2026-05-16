import { ArrowLeft, Video, Phone, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useMemo } from 'react';
import InteractiveCalendar, { DayType, AppointmentInfo } from '../ui/visualize-booking';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useSpecialistBookings, Booking } from '@/hooks/useSpecialistBookings';
import { format, getDaysInMonth, startOfMonth, getDay, addMonths, subMonths } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

export function AgendaGlobal({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInfo | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPreDiagnosisOpen, setIsPreDiagnosisOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch real bookings
  const { bookings, loading, updateBooking, refetch } = useSpecialistBookings();

  // Scroll to top logic
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Transform bookings into calendar days
  const calendarDays = useMemo(() => {
    if (loading) return [];

    const now = currentDate;
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = getDaysInMonth(now);
    const startDay = getDay(startOfMonth(now)); // 0 = Sunday

    const days: DayType[] = [];

    // Empty start days
    for (let i = 0; i < startDay; i++) {
      days.push({ day: '', classNames: 'bg-zinc-700/20' });
    }

    // Map bookings by day
    const appointmentsByDay: Record<number, AppointmentInfo[]> = {};

    bookings.forEach(booking => {
      const date = new Date(booking.booking_date);
      // Filter for current month view (basic implementation)
      if (date.getMonth() === month && date.getFullYear() === year) {
        const day = date.getDate();
        if (!appointmentsByDay[day]) appointmentsByDay[day] = [];

        appointmentsByDay[day].push({
          id: booking.id,
          date: format(date, "EEEE, d MMM", { locale: language === 'pt' ? ptBR : enUS }),
          time: `${booking.start_time.slice(0, 5)} - ${booking.end_time?.slice(0, 5) || '??:??'}`,
          company: booking.company?.company_name || 'Empresa',
          employee: booking.user?.full_name || 'Colaborador',
          specialist: user?.user_metadata?.full_name || 'Eu', // Current user
          pillar: booking.pillar || 'Geral',
          status: booking.status as any,
          location: booking.meeting_link ? 'Online' : 'A definir',
          callType: 'video', // Default or check metadata
          meetingLink: booking.meeting_link || '',
          preDiagnosis: booking.notes ? [{ question: 'Notas/Sintomas', answer: booking.notes }] : []
        });
      }
    });

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i.toString().padStart(2, '0'),
        classNames: 'bg-[#1e1e1e]',
        appointments: appointmentsByDay[i] || []
      });
    }

    // Fill remaining grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: '', classNames: 'bg-zinc-700/20' });
    }

    return days;
  }, [bookings, loading, language, currentDate]);

  const handleAppointmentClick = (appointment: AppointmentInfo) => {
    setSelectedAppointment(appointment);
    setCurrentLink(appointment.meetingLink || '');
    setIsDetailsOpen(true);
  };

  const handleSaveLink = async () => {
    if (selectedAppointment) {
      const { success, error } = await updateBooking(selectedAppointment.id, {
        meeting_link: currentLink
      });

      if (success) {
        toast({ title: "Link salvo com sucesso!" });
        // Update local state temporarily reflected by refetch
        setSelectedAppointment(prev => prev ? ({ ...prev, meetingLink: currentLink }) : null);
      } else {
        toast({ title: "Erro ao salvar link", description: error || "Tente novamente.", variant: "destructive" });
      }
    }
  };

  const handleOpenPreDiagnosis = () => {
    setIsPreDiagnosisOpen(true);
  };

  const getPillarEmoji = (pillar: string) => {
    const pillarLower = pillar.toLowerCase();
    if (pillarLower.includes('mental')) return '🧠';
    if (pillarLower.includes('físic')) return '💪';
    if (pillarLower.includes('financ')) return '💰';
    if (pillarLower.includes('juríd') || pillarLower.includes('legal')) return '⚖️';
    return '🧠';
  };

  const handleCalendarSaveLink = async (id: string, link: string) => {
    const { success, error } = await updateBooking(id, { meeting_link: link });
    if (success) {
      toast({ title: "Link salvo com sucesso!" });
      // Optional: Manual refetch if needed, but updateBooking might handle local state optimistically or via refetch
      refetch();
    } else {
      toast({ title: "Erro ao salvar link", description: error || "Tente novamente.", variant: "destructive" });
    }
  };

  const handleConcludeSession = async (id: string) => {
    const { success, error } = await updateBooking(id, {
      status: 'completed' as any,
      // We could set completed_at here too if the API supports it, but simple status update is enough for now.
    });

    if (success) {
      toast({ title: "Sessão concluída com sucesso!", description: "A sessão foi contabilizada." });
      refetch();
    } else {
      toast({ title: "Erro ao concluir sessão", description: error || "Tente novamente.", variant: "destructive" });
    }
  };

  const currentMonthName = format(currentDate, 'MMMM', { locale: language === 'pt' ? ptBR : enUS }).toUpperCase();
  const currentYear = format(currentDate, 'yyyy');

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="min-h-screen h-auto overflow-y-auto p-6 bg-black">
      {/* Top Header - Back button and subtitle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('Dashboard')}
          className="flex items-center gap-2 text-[#99a1af] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-normal font-inter">Voltar</span>
        </button>

        <p className="text-[#99a1af] text-xl font-bold font-inter">
          Organize a sua semana. Prepare cada atendimento consultando o pré-diagnóstico e enviando o link de acesso.
        </p>
      </div>

      {/* Page Title & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-pacifico">
          Agenda de Consultas
        </h1>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={prevMonth} className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>
          <span className="text-white font-manrope text-lg min-w-[150px] text-center">
            {currentMonthName} {currentYear}
          </span>
          <Button variant="outline" size="icon" onClick={nextMonth} className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Color Legend Only */}
      <div className="mb-6 p-4 bg-[rgba(24,24,27,0.5)] rounded-[14px] border border-[#27272a]">
        <div className="flex items-center gap-8">
          <h3 className="text-white text-base font-bold font-manrope">
            Legenda
          </h3>

          {/* Color Legend Inline */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#00c950]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold font-inter">Confirmada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#6a7282]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold font-inter">Concluída</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#fb2c36]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold font-inter">Cancelada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar - Expands naturally */}
      <div className="pb-6 relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <InteractiveCalendar
            days={calendarDays}
            month={currentMonthName.slice(0, 3)}
            year={currentYear}
            onAppointmentClick={handleAppointmentClick}
            onSaveLink={handleCalendarSaveLink}
            onConcludeSession={handleConcludeSession}
          />
        )}
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-manrope font-bold">
              Detalhes da Sessão
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              {/* Horário */}
              <div>
                <p className="text-sm text-gray-500 mb-1 font-inter">
                  Horário:
                </p>
                <p className="font-medium font-inter">
                  {selectedAppointment.time}
                </p>
              </div>

              {/* Nome */}
              <div>
                <p className="text-sm text-gray-500 mb-1 font-inter">
                  Nome:
                </p>
                <p className="font-medium font-inter">
                  {selectedAppointment.employee}
                </p>
              </div>

              {/* Pilar de Apoio */}
              <div>
                <p className="text-sm text-gray-500 mb-1 font-inter">
                  Pilar de Apoio:
                </p>
                <p className="font-medium font-inter">
                  {getPillarEmoji(selectedAppointment.pillar)} {selectedAppointment.pillar}
                </p>
              </div>

              {/* Tipo de Chamada */}
              <div>
                <p className="text-sm text-gray-500 mb-1 font-inter">
                  Tipo:
                </p>
                <div className="flex items-center gap-2">
                  {selectedAppointment.callType === 'video' ? (
                    <>
                      <Video className="h-5 w-5 text-blue-500" />
                      <span className="font-medium font-inter">Videochamada</span>
                    </>
                  ) : (
                    <>
                      <Phone className="h-5 w-5 text-green-500" />
                      <span className="font-medium font-inter">Chamada</span>
                    </>
                  )}
                </div>
              </div>

              {/* Pré-Diagnóstico Button */}
              {selectedAppointment.preDiagnosis && selectedAppointment.preDiagnosis.length > 0 && (
                <div>
                  <Button
                    onClick={handleOpenPreDiagnosis}
                    variant="outline"
                    className="w-full font-inter"
                  >
                    Ler Pré-Diagnóstico
                  </Button>
                </div>
              )}

              {/* Link Input */}
              <div>
                <p className="text-sm text-gray-500 mb-2 font-inter">
                  Link da Sessão:
                </p>
                <Input
                  placeholder="Cole aqui o link (Zoom/Teams/Meet)"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                  className="mb-2 font-inter"
                />
                <Button
                  onClick={handleSaveLink}
                  className="w-full font-inter font-semibold"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pre-Diagnosis Dialog */}
      <Dialog open={isPreDiagnosisOpen} onOpenChange={setIsPreDiagnosisOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-manrope font-bold">
              Pré-Diagnóstico
            </DialogTitle>
            <DialogDescription className="font-inter">
              Respostas do questionário pré-sessão
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment?.preDiagnosis && (
            <div className="space-y-4 py-4">
              {selectedAppointment.preDiagnosis.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <p className="text-sm font-bold text-gray-700 mb-2 font-manrope">
                    {item.question}
                  </p>
                  <p className="text-sm text-gray-600 font-inter">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsPreDiagnosisOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
