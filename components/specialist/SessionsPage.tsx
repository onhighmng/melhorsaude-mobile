import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { SessionModal } from './SessionModal';
import { AvailabilityModal } from './AvailabilityModal';
import { useSpecialistBookings } from '@/hooks/useSpecialistData';
// DISABLED: import from 'sonner';
// DISABLED: import from 'react-router-dom';
import { extractBookingMetadata, getUserPhoneFromBooking, isPhoneSession } from '@/utils/bookingMetadata';
import { sendSessionCompletedEmail } from '@/lib/emailNotifications';

const parseBookingDate = (dateString: string | null): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split('-').map(part => Number(part));
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  if (!year || !month || !day) return null;
  const localDate = new Date(year, month - 1, day, 12, 0, 0, 0);
  return Number.isNaN(localDate.getTime()) ? null : localDate;
};

const PILLAR_COLORS: Record<string, string> = {
  psychological: 'bg-blue-100 text-blue-700',
  physical: 'bg-yellow-100 text-yellow-700',
  financial: 'bg-green-100 text-green-700',
  legal_social: 'bg-purple-100 text-purple-700',
  // Legacy codes for backward compatibility
  PSYCH: 'bg-blue-100 text-blue-700',
  PHYSICAL: 'bg-yellow-100 text-yellow-700',
  FINANCIAL: 'bg-green-100 text-green-700',
  LEGAL: 'bg-purple-100 text-purple-700',
};

const PILLAR_NAMES: Record<string, string> = {
  psychological: 'Saúde Mental',
  physical: 'Bem-Estar Físico',
  financial: 'Assistência Financeira',
  legal_social: 'Assistência Jurídica',
  // Legacy codes for backward compatibility
  PSYCH: 'Saúde Mental',
  PHYSICAL: 'Bem-Estar Físico',
  FINANCIAL: 'Assistência Financeira',
  LEGAL: 'Assistência Jurídica',
};

interface CalendarEvent {
  date: number;
  type: 'individual' | 'group' | 'completed' | 'scheduled';
  color: string;
}

export function SessionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [highlightBookingId, setHighlightBookingId] = useState<string | null>(null);

  // Calculate date range for the current month
  const startDate = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    return start.toISOString().split('T')[0];
  }, [currentMonth]);

  const endDate = useMemo(() => {
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    return end.toISOString().split('T')[0];
  }, [currentMonth]);

  // Fetch bookings for current month
  const { bookings, loading, error, updateBooking } = useSpecialistBookings({
    startDate,
    endDate
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight');
    setHighlightBookingId(highlight);
  }, [location.search]);

  useEffect(() => {
    if (!highlightBookingId) return;
    const booking = bookings.find((item) => item.id === highlightBookingId);
    if (!booking) return;
    const bookingDate = parseBookingDate(booking.booking_date);
    if (!bookingDate) return;

    setCurrentMonth(new Date(bookingDate.getFullYear(), bookingDate.getMonth(), 1));
    setSelectedDate(bookingDate.getDate());
  }, [highlightBookingId, bookings]);

  const clearHighlight = () => {
    const params = new URLSearchParams(location.search);
    if (params.has('highlight')) {
      params.delete('highlight');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
    setHighlightBookingId(null);
  };

  // Format month name
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const currentMonthName = `${monthNames[currentMonth.getMonth()]}, ${currentMonth.getFullYear()}`;

  // Format date range
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const currentDateRange = `${dayNames[firstDay.getDay()]}, ${firstDay.getDate()} de ${monthNames[firstDay.getMonth()]} - ${dayNames[lastDay.getDay()]}, ${lastDay.getDate()} de ${monthNames[lastDay.getMonth()]}, ${currentMonth.getFullYear()}`;

  // Map pillar codes to colors (MUST use correct enum values!)
  const pillarColors = PILLAR_COLORS;
  const pillarNames = PILLAR_NAMES;

  // Get sessions for selected date
  const sessionsForDate = useMemo(() => {
    if (!selectedDate) return [];

    return bookings.filter(booking => {
      if (booking.status === 'cancelled') return false;
      const bookingDate = parseBookingDate(booking.booking_date);
      if (!bookingDate) return false;
      return (
        bookingDate.getFullYear() === currentMonth.getFullYear() &&
        bookingDate.getMonth() === currentMonth.getMonth() &&
        bookingDate.getDate() === selectedDate
      );
    });
  }, [bookings, selectedDate, currentMonth]);

  const formatTime = (time: string | null | undefined) => {
    if (!time) return null;
    const [hour, minute] = time.split(':');
    if (hour === undefined || minute === undefined) return null;
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
  };

  const formattedSessionsForDate = useMemo(() => {
    return sessionsForDate.map(booking => {
      const start = formatTime(booking.start_time);
      const end = formatTime(booking.end_time);
      const timeLabel = start && end ? `${start} - ${end}` : start || end || 'Horário não definido';
      const sessionMode = (booking.session_type || '').toLowerCase() === 'group' ? 'group' as const : 'individual' as const;
      const metadata = extractBookingMetadata(booking.metadata);
      const phoneSession = isPhoneSession(booking);
      const meetingTypeLabel = phoneSession
        ? 'Chamada telefónica'
        : booking.meeting_type === 'video'
          ? 'Sessão online'
          : 'Sessão';
      const phoneNumber =
        getUserPhoneFromBooking(booking as any) ||
        (typeof metadata?.user_phone === 'string' ? metadata.user_phone : null) ||
        (typeof metadata?.contact_phone === 'string' ? metadata.contact_phone : null);
      const diagnosticSessionId =
        (booking as any)?.diagnostic_session_id ||
        (metadata?.diagnostic_session_id as string | undefined) ||
        (metadata?.diagnosticSessionId as string | undefined) ||
        (metadata?.chat_session_id as string | undefined) ||
        null;



      const primaryPillar = booking.primary_pillar || (metadata?.diagnostic_pillar as string | undefined) || '';
      const normalizedPillar = primaryPillar.toString().toLowerCase();
      const userName =
        booking.user?.full_name ||
        (metadata?.user_full_name as string | undefined) ||
        booking.user?.email ||
        'Utilizador';
      const preDiagnostic = Array.isArray(metadata?.pre_diagnostic_responses)
        ? metadata.pre_diagnostic_responses
          .map((item: any) => ({
            question: typeof item?.question === 'string' ? item.question : '',
            answer: typeof item?.answer === 'string' ? item.answer : '',
            responseIndex: typeof item?.responseIndex === 'number' ? item.responseIndex : 0,
          }))
          .filter((entry) => entry.question || entry.answer)
        : [];

      return {
        id: booking.id,
        userName,
        userEmail: booking.user?.email || '',
        companyName: booking.company?.company_name || '',
        pillarLabel: pillarNames[normalizedPillar] || pillarNames[primaryPillar] || 'Pilar não definido',
        pillarColor: pillarColors[normalizedPillar] || pillarColors[primaryPillar] || 'bg-gray-100 text-gray-700',
        pillarCode: primaryPillar,
        meetingTypeLabel,
        timeLabel,
        meetingLink: phoneSession ? undefined : booking.meeting_link || (typeof metadata?.meeting_link === 'string' ? metadata.meeting_link : undefined),
        isPhoneSession: phoneSession,
        phoneNumber,
        sessionMode,
        isCompleted: booking.status === 'completed',
        diagnosticSessionId,
        preDiagnostic,
      };
    });
  }, [sessionsForDate, pillarNames, pillarColors]);

  const handleCompleteSession = async (
    bookingId: string
  ) => {
    // Confirmation is now handled in the UI component (SessionModal)
    const result = await updateBooking(bookingId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
    });



    if (result.success) {
      toast.success('Sessão concluída.');

      // Find booking details for email
      const booking = bookings.find(b => b.id === bookingId);
      if (booking && booking.user?.email) {
        try {
          await sendSessionCompletedEmail(booking.user.email, {
            userName: booking.user.full_name || 'Cliente',
            specialistName: 'Especialista da Melhor Saúde',
            date: new Date().toLocaleDateString('pt-PT'),
          });
        } catch (emailError) {
          console.error('Failed to send completion email:', emailError);
        }
      }

    } else {
      toast.error(
        result.error || 'Não foi possível concluir a sessão. Tente novamente.'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando sessões...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'not_specialist') {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Você não está registado como Especialista.<br />
            Esta área é exclusiva para profissionais de saúde.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calendar events from real bookings
  const calendarEvents: CalendarEvent[] = bookings.reduce((events: CalendarEvent[], booking) => {
    const bookingDate = parseBookingDate(booking.booking_date);
    if (!bookingDate) {
      return events;
    }
    const day = bookingDate.getDate();
    events.push({
      date: day,
      type: booking.status === 'completed' ? 'completed' as const : 'scheduled' as const,
      color: booking.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
    });
    return events;
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  // Note: oldSessions mock data removed - now using real bookings from useSpecialistBookings hook

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleUpdateLink = async (bookingId: string, link: string) => {
    console.log(`SessionsPage: Updating link for ${bookingId} to ${link}`);
    try {
      // logger.info('Updating meeting link for booking:', bookingId); 
      const result = await updateBooking(bookingId, { meeting_link: link.trim() || null });
      console.log('SessionsPage: Update result:', result);

      if (result.success) {
        toast.success('Link da sessão atualizado com sucesso!');
        // Booking will be refreshed automatically via real-time subscription
      } else {
        console.error('SessionsPage: Update failed:', result.error);
        toast.error(`Erro ao atualizar link: ${result.error || 'Erro desconhecido'}`);
      }
    } catch (error: any) {
      console.error('SessionsPage: Caught error:', error);
      toast.error(`Erro ao atualizar link: ${error?.message || 'Erro desconhecido'}`);
    }
  };

  const handleReferral = async (bookingId: string, referralData: {
    pilar: string;
    provider: string;
    date: string;
    time: string;
  }) => {
    const result = await updateBooking(bookingId, {
      is_referred: true,
      referred_to_pillar: referralData.pilar,
    } as any);
    if (result.success) {
      // Booking will be refreshed automatically
    }
  };

  const getPilarColor = (pillarCode: string) => {
    switch (pillarCode) {
      case 'PSYCH':
      case 'psychological':
      case 'mental':
        return 'bg-blue-500';
      case 'PHYSICAL':
      case 'physical':
      case 'fisico':
        return 'bg-yellow-500';
      case 'FINANCIAL':
      case 'financial':
      case 'financeira':
        return 'bg-green-500';
      case 'LEGAL':
      case 'legal_social':
      case 'juridica':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Generate calendar days dynamically
  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday
    const daysInMonth = lastDayOfMonth.getDate();

    // Previous month days
    const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month days to fill the grid (ensure 6 rows)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getEventsForDate = (date: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return [];
    return bookings.filter(booking => {
      if (booking.status === 'cancelled') return false;
      const bookingDate = parseBookingDate(booking.booking_date);
      if (!bookingDate) return false;
      return (
        bookingDate.getFullYear() === currentMonth.getFullYear() &&
        bookingDate.getMonth() === currentMonth.getMonth() &&
        bookingDate.getDate() === date
      );
    });
  };

  const handleDateClick = (date: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const dateSessions = getEventsForDate(date, isCurrentMonth);
    if (dateSessions.length > 0) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 pb-24 lg:pb-8 bg-blue-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-gray-900 mb-2 text-4xl font-bold font-source-serif-pro">Calendário Pessoal</h1>
          <p className="text-gray-600">Sessões futuras e passadas com tipo e estado</p>
        </div>

        {/* Calendar Container */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-4 lg:p-8 shadow-sm">
          {/* Calendar Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
            {/* Left - Month/Day Display */}
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="bg-gray-50 rounded-2xl px-3 py-2 lg:px-4 lg:py-3 text-center min-w-[60px] lg:min-w-[70px]">
                <div className="text-xs text-gray-600 uppercase tracking-wider">NOV</div>
                <div className="text-gray-900 mt-1">7</div>
              </div>
              <div>
                <h2 className="text-gray-900">{currentMonthName}</h2>
                <p className="text-sm text-gray-500">{currentDateRange}</p>
              </div>
            </div>

            {/* Right - Controls */}
            <div className="flex items-center gap-2 lg:gap-3 justify-between lg:justify-start">
              <div className="flex items-center gap-1 lg:gap-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setCurrentMonth(new Date());
                    setSelectedDate(null);
                  }}
                  className="px-3 py-2 lg:px-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm text-gray-700"
                >
                  Hoje
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => setShowAvailability(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors text-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                Disponibilidade
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-hidden">
            <div>
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 mb-2 lg:mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center py-2">
                    <span className="text-xs lg:text-sm text-gray-600">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {calendarDays.map((dayInfo, index) => {
                  const dayEvents = getEventsForDate(dayInfo.day, dayInfo.isCurrentMonth);
                  const today = new Date();
                  const isToday = dayInfo.day === today.getDate() &&
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear() &&
                    dayInfo.isCurrentMonth;

                  return (
                    <div
                      key={index}
                      className={`bg-white p-2 lg:p-4 min-h-[80px] lg:min-h-[100px] relative transition-colors ${!dayInfo.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                        } ${dayEvents.length > 0 && dayInfo.isCurrentMonth ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                      onClick={() => handleDateClick(dayInfo.day, dayInfo.isCurrentMonth)}
                    >
                      <div className={`text-xs lg:text-sm mb-1 lg:mb-2 ${isToday ? 'w-6 h-6 lg:w-7 lg:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs' : ''}`}>
                        {dayInfo.day}
                      </div>

                      {/* Event Dots - Real Bookings */}
                      {dayEvents.length > 0 && (
                        <div className="flex flex-wrap gap-1 lg:gap-1.5 mt-1 lg:mt-2">
                          {dayEvents.slice(0, 3).map((booking, idx) => (
                            <div
                              key={booking.id}
                              className={`w-4 h-4 lg:w-6 lg:h-6 rounded-full ${getPilarColor(booking.primary_pillar || '')} cursor-pointer hover:scale-110 transition-transform`}
                              title={`${booking.user?.full_name || 'Utilizador'} - ${pillarNames[booking.primary_pillar || ''] || booking.primary_pillar}`}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-gray-300 flex items-center justify-center text-[8px] lg:text-[10px] text-gray-700">
                              +{dayEvents.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 lg:mt-6 flex flex-wrap items-center gap-3 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs lg:text-sm text-gray-600">Saúde Mental</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-500"></div>
              <span className="text-xs lg:text-sm text-gray-600">Bem-Estar Físico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500"></div>
              <span className="text-xs lg:text-sm text-gray-600">Assistência Financeira</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-purple-500"></div>
              <span className="text-xs lg:text-sm text-gray-600">Assistência Jurídica</span>
            </div>
          </div>

          {/* Mobile Availability Button */}
          <div className="lg:hidden mt-4">
            <button
              onClick={() => setShowAvailability(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl transition-all shadow-sm"
            >
              <CalendarIcon className="w-5 h-5" />
              Gerir Disponibilidade
            </button>
          </div>
        </div>
      </div>

      {/* Session Modal */}
      {selectedDate && sessionsForDate.length > 0 && (
        <SessionModal
          date={selectedDate}
          month={currentMonthName}
          sessions={formattedSessionsForDate}
          highlightId={highlightBookingId ?? undefined}
          onClose={() => {
            setSelectedDate(null);
            clearHighlight();
          }}
          onUpdateLink={handleUpdateLink}
          onReferral={handleReferral}
          onCompleteSession={handleCompleteSession}
        />
      )}

      {/* Availability Modal */}
      {showAvailability && (
        <AvailabilityModal
          onClose={() => setShowAvailability(false)}
        />
      )}
    </div>
  );
}