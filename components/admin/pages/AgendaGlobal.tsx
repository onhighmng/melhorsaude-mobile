import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import InteractiveCalendar, { DayType, AppointmentInfo, AppointmentStatus } from '../ui/visualize-booking';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function AgendaGlobal({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInfo | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Additional scroll to top after a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.scrollTo({ top: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch all bookings and filter options
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          start_time,
          status,
          meeting_type,
          primary_pillar,
          profile:profiles!bookings_user_id_fkey (
            full_name
          ),
          company:companies (
            company_name
          ),
          specialist:specialists (
            profile:profiles!specialists_user_id_fkey (
              full_name
            )
          )
        `);

      if (error) throw error;

      setBookings(data || []);

      // Extract unique companies and specialists
      const uniqueCompanies = [...new Set((data || []).map((b: any) => b.company?.company_name).filter(Boolean))];
      const uniqueSpecialists = [...new Set((data || []).map((b: any) => b.specialist?.profile?.full_name).filter(Boolean))];

      setCompanies(uniqueCompanies as string[]);
      setSpecialists(uniqueSpecialists as string[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate calendar days from bookings
  const calendarDays: DayType[] = generateCalendarDays(bookings);

  const handleAppointmentClick = (appointment: AppointmentInfo) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  const handleCancelAppointment = async () => {
    if (selectedAppointment) {
      try {
        const { error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' } as any)
          .eq('id', selectedAppointment.id as any);

        if (error) throw error;

        await fetchBookings();
        setIsDetailsOpen(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        alert(t('admin.globalAgenda.errorCancel'));
      }
    }
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-600 font-medium">{t('admin.globalAgenda.status.confirmed')}</span>;
      case 'cancelled':
        return <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-600 font-medium">{t('admin.globalAgenda.status.cancelled')}</span>;
      case 'completed':
        return <span className="rounded-full bg-gray-500/20 px-3 py-1 text-sm text-gray-600 font-medium">{t('admin.globalAgenda.status.completed')}</span>;
    }
  };

  return (
    <div className="min-h-screen h-auto overflow-y-auto p-6 bg-black">
      {/* Top Header - Back button and subtitle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('Dashboard')}
          className="flex items-center gap-2 text-[#99a1af] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{t('admin.globalAgenda.back')}</span>
        </button>

        <p className="text-[#99a1af] text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t('admin.globalAgenda.subtitle')}
        </p>
      </div>

      {/* Page Title */}
      <h1 className="text-white text-3xl mb-6" style={{ fontFamily: 'Pacifico, cursive' }}>
        {t('admin.globalAgenda.title')}
      </h1>

      {/* Filters Block */}
      <div className="mb-6 p-4 bg-[rgba(24,24,27,0.5)] rounded-[14px] border border-[#27272a]">
        {/* Filtros Heading with Color Legend */}
        <div className="flex items-center gap-8 mb-3">
          <h3 className="text-white text-base font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {t('admin.globalAgenda.filters')}
          </h3>

          {/* Color Legend Inline */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#00c950]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>{t('admin.globalAgenda.status.confirmed')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#6a7282]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>{t('admin.globalAgenda.status.completed')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#fb2c36]"></div>
              <span className="text-[#9f9fa9] text-xs font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>{t('admin.globalAgenda.status.cancelled')}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block mb-1.5 text-[#9f9fa9] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('admin.globalAgenda.company')}
            </label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="bg-[#27272a] border-[#3f3f46] text-[#717182] h-9">
                <SelectValue placeholder={t('admin.globalAgenda.allCompanies')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.globalAgenda.allCompanies')}</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1.5 text-[#9f9fa9] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('admin.globalAgenda.specialist')}
            </label>
            <Select value={selectedSpecialist} onValueChange={setSelectedSpecialist}>
              <SelectTrigger className="bg-[#27272a] border-[#3f3f46] text-[#717182] h-9">
                <SelectValue placeholder={t('admin.globalAgenda.allSpecialists')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.globalAgenda.allSpecialists')}</SelectItem>
                {specialists.map(specialist => (
                  <SelectItem key={specialist} value={specialist}>{specialist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCompany('');
                setSelectedSpecialist('');
              }}
              className="w-full bg-[#27272a] border-[#3f3f46] text-white hover:bg-[#3f3f46] h-9"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
            >
              {t('admin.globalAgenda.clearFilters')}
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar - Expands naturally */}
      <div className="pb-6">
        <InteractiveCalendar
          days={calendarDays}
          month={['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'][new Date().getMonth()]}
          year={new Date().getFullYear().toString()}
          onAppointmentClick={handleAppointmentClick}
          selectedCompany={selectedCompany === 'all' ? undefined : selectedCompany}
          selectedSpecialist={selectedSpecialist === 'all' ? undefined : selectedSpecialist}
        />
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
              {t('admin.globalAgenda.details')}
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('admin.globalAgenda.subtitle')}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Estado:</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Data</p>
                  <p className="font-medium">{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Hora</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Empresa</p>
                <p className="font-medium">{selectedAppointment.company}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Colaborador</p>
                <p className="font-medium">{selectedAppointment.employee}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Especialista</p>
                <p className="font-medium">{selectedAppointment.specialist}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Pilar</p>
                <p className="font-medium">{selectedAppointment.pillar}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Localização</p>
                <p className="font-medium">{selectedAppointment.location}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Fechar
            </Button>
            {selectedAppointment?.status === 'confirmed' && (
              <Button
                variant="destructive"
                onClick={handleCancelAppointment}
              >
                Cancelar Consulta
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to convert bookings to calendar days
function generateCalendarDays(bookings: any[]): DayType[] {
  const days: DayType[] = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add previous month days
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: `-${i + 1}`, classNames: 'bg-zinc-700/20' });
  }

  // Group bookings by day
  const bookingsByDay: Record<number, AppointmentInfo[]> = {};

  bookings.forEach((booking: any) => {
    const bookingDate = new Date(booking.booking_date);
    if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
      const day = bookingDate.getDate();

      if (!bookingsByDay[day]) {
        bookingsByDay[day] = [];
      }

      // Format the appointment info
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

      const formattedDate = `${dayNames[bookingDate.getDay()]}, ${day} ${monthNames[currentMonth]}`;

      bookingsByDay[day].push({
        id: booking.id,
        date: formattedDate,
        time: booking.start_time || 'Horário não definido',
        company: booking.company?.company_name || 'Empresa não definida',
        employee: booking.profile?.full_name || 'Colaborador não definido',
        specialist: booking.specialist?.profile?.full_name || 'Especialista não definido',
        pillar: booking.primary_pillar || 'Pilar não definido',
        status: booking.status as AppointmentStatus,
        location: booking.meeting_type || 'Localização não definida',
      });
    }
  });

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i.toString().padStart(2, '0'),
      classNames: 'bg-[#1e1e1e]',
      appointments: bookingsByDay[i],
    });
  }

  // Add next month days to complete the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: `+${i}`, classNames: 'bg-zinc-700/20' });
  }

  return days;
}


