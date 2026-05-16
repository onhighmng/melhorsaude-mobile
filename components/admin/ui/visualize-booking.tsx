import React, { useState } from 'react';
// DISABLED: import from 'motion/react';
import { Columns3, Grid } from 'lucide-react';

export type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed';

export type AppointmentInfo = {
  id: string;
  date: string;
  time: string;
  company: string;
  employee: string;
  specialist: string;
  pillar: string;
  status: AppointmentStatus;
  location: string;
};

export type DayType = {
  day: string;
  classNames: string;
  appointments?: AppointmentInfo[];
};

interface DayProps {
  classNames: string;
  day: DayType;
  onHover: (day: string | null) => void;
  onClick: (appointments: AppointmentInfo[], dayNumber: string) => void;
}

const Day: React.FC<DayProps> = ({ classNames, day, onHover, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (appointments?: AppointmentInfo[]) => {
    if (!appointments || appointments.length === 0) return classNames;
    
    // Prioritize showing status: cancelled > confirmed > completed
    const hasCancelled = appointments.some(a => a.status === 'cancelled');
    const hasConfirmed = appointments.some(a => a.status === 'confirmed');
    
    if (hasCancelled) return 'bg-[rgba(251,44,54,0.8)]';
    if (hasConfirmed) return 'bg-[rgba(0,201,80,0.8)]';
    return 'bg-[rgba(106,114,130,0.8)]';
  };
  
  return (
    <div
      className={`relative flex items-center justify-center ${getStatusColor(day.appointments)} cursor-pointer hover:ring-2 hover:ring-white/20 transition-all`}
      style={{ height: '96px', borderRadius: 16 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(day.day);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(null);
      }}
      onClick={() => {
        if (day.appointments && day.appointments.length > 0) {
          onClick(day.appointments, day.day);
        }
      }}
      id={`day-${day.day}`}
    >
      <div className="flex flex-col items-center justify-center">
        {!(day.day[0] === '+' || day.day[0] === '-') && (
          <span className="text-lg font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{day.day}</span>
        )}
      </div>
      {day.appointments && day.appointments.length > 0 && (
        <div
          className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#3f3f47] p-1 text-xs font-bold text-white"
 -meeting-count`}
          style={{
            borderRadius: 999,
          }}
        >
          {day.appointments.length}
        </div>
      )}

      
        {day.appointments && isHovered && (
          <div className="absolute inset-0 flex size-full items-center justify-center">
            <div
              className="flex size-12 items-center justify-center bg-[#3f3f47] p-1 text-sm font-bold text-white"
 -meeting-count`}
              style={{
                borderRadius: 999,
              }}
            >
              {day.appointments.length}
            </div>
          </div>
        )}
      
    </div>
  );
};

interface CalendarGridProps {
  days: DayType[];
  onHover: (day: string | null) => void;
  onDayClick: (appointments: AppointmentInfo[], dayNumber: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, onHover, onDayClick }) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <Day
          key={`${day.day}-${index}`}
          classNames={day.classNames}
          day={day}
          onHover={onHover}
          onClick={onDayClick}
        />
      ))}
    </div>
  );
};

interface InteractiveCalendarProps {
  days: DayType[];
  month: string;
  year: string;
  onAppointmentClick?: (appointment: AppointmentInfo) => void;
  selectedCompany?: string;
  selectedSpecialist?: string;
}

const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  days,
  month,
  year,
  onAppointmentClick,
  selectedCompany,
  selectedSpecialist,
}) => {
  const [moreView, setMoreView] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDayHover = (day: string | null) => {
    setHoveredDay(day);
  };

  const handleDayClick = (appointments: AppointmentInfo[], dayNumber: string) => {
    setMoreView(true);
    setSelectedDay(dayNumber);
    // Scroll to the clicked day's appointments after a short delay
    setTimeout(() => {
      const element = document.getElementById(`appointment-day-${dayNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350);
    
    // Clear highlight after 3 seconds
    setTimeout(() => {
      setSelectedDay(null);
    }, 4000);
  };

  const filteredDays = React.useMemo(() => {
    if (!selectedCompany && !selectedSpecialist) return days;
    
    return days.map(day => {
      if (!day.appointments) return day;
      
      const filteredAppointments = day.appointments.filter(apt => {
        const matchesCompany = !selectedCompany || apt.company === selectedCompany;
        const matchesSpecialist = !selectedSpecialist || apt.specialist === selectedSpecialist;
        return matchesCompany && matchesSpecialist;
      });
      
      return {
        ...day,
        appointments: filteredAppointments.length > 0 ? filteredAppointments : undefined
      };
    });
  }, [days, selectedCompany, selectedSpecialist]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Confirmada</span>;
      case 'cancelled':
        return <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">Cancelada</span>;
      case 'completed':
        return <span className="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-medium text-gray-400">Concluída</span>;
    }
  };

  return (
    <div className="relative flex w-full flex-col lg:flex-row items-start justify-start gap-6">
      {/* Calendar Section */}
      <div className={`${moreView ? 'w-full lg:w-[48%]' : 'w-full'} transition-all duration-300 ease-in-out flex-shrink-0`}>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-3xl font-bold tracking-wider text-[#d4d4d8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {month} <span className="opacity-50">{year}</span>
            </h2>
            <button
              className="relative flex items-center gap-3 rounded-lg border border-[#52525c] px-1.5 py-1.5 bg-[rgba(39,39,42,0.5)] hover:bg-[rgba(39,39,42,0.8)] transition-colors"
              onClick={() => setMoreView(!moreView)}
            >
              <Grid className={`z-[2] w-5 h-5 ${!moreView ? 'text-zinc-800' : 'text-[#9f9fa9]'}`} />
              <Columns3 className={`z-[2] w-5 h-5 ${moreView ? 'text-zinc-800' : 'text-[#9f9fa9]'}`} />
              <div
                className="absolute left-0 top-0 h-full w-10 rounded-md bg-white/90 transition-transform duration-300"
                style={{
                  top: '50%',
                  transform: moreView
                    ? 'translateY(-50%) translateX(46px)'
                    : 'translateY(-50%) translateX(2px)',
                }}
              ></div>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="rounded-xl bg-[#323232] py-2 text-center text-sm font-medium text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {day}
              </div>
            ))}
          </div>
          <CalendarGrid days={filteredDays} onHover={handleDayHover} onDayClick={handleDayClick} />
        </div>
      </div>
      
      {/* Bookings Panel */}
      {moreView && (
        <div className="w-full lg:w-[48%] flex-shrink-0 flex flex-col">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col items-start justify-between">
              <h2 className="text-3xl font-bold tracking-wider text-[#d4d4d8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Marcações
              </h2>
              <p className="text-sm font-medium text-zinc-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Veja todas as consultas agendadas na plataforma
              </p>
            </div>
            <div
              className="flex flex-col items-start justify-start overflow-y-auto rounded-xl border-2 border-[#323232] shadow-lg bg-[#1a1a1a]"
              style={{ maxHeight: '700px' }}
            >
              {filteredDays
                .filter((day) => day.appointments && day.appointments.length > 0)
                .map((day) => (
                  <div
                    key={day.day}
                    id={`appointment-day-${day.day}`}
                    className={`w-full border-b-2 last:border-b-0 transition-all duration-500 relative ${
                      selectedDay === day.day 
                        ? 'border-[#00c950] bg-gradient-to-r from-[#00c950]/20 to-transparent' 
                        : 'border-[#323232]'
                    }`}
                  >
                    {/* Highlight Indicator - Animated Pulse */}
                    {selectedDay === day.day && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00c950] animate-pulse"></div>
                    )}
                    
                    {/* Day Header */}
                    <div className={`px-4 py-3 sticky top-0 z-10 transition-colors duration-300 ${
                      selectedDay === day.day 
                        ? 'bg-[#00c950]/10 border-b-2 border-[#00c950]' 
                        : 'bg-[#262626] border-b border-[#323232]'
                    }`}>
                      <div className="flex items-center gap-2">
                        {selectedDay === day.day && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                        <span className={`text-sm font-bold transition-colors ${
                          selectedDay === day.day ? 'text-[#00c950]' : 'text-white'
                        }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                          Dia {day.day}
                        </span>
                        {selectedDay === day.day && (
                          <span className="text-xs text-[#00c950] font-bold ml-2 animate-pulse" style={{ fontFamily: 'Inter, sans-serif' }}>
                            ← Aqui
                          </span>
                        )}
                      </div>
                    </div>
                    {day.appointments &&
                      day.appointments.map((appointment, idx) => (
                        <div
                          key={appointment.id}
                          className={`border-b border-[#323232] p-4 last:border-b-0 cursor-pointer transition-all duration-300 ${
                            selectedDay === day.day 
                              ? 'hover:bg-[#00c950]/10 bg-[#00c950]/5' 
                              : 'hover:bg-zinc-800/50'
                          }`}
                          onClick={() => onAppointmentClick?.(appointment)}
                          style={{
                            animation: selectedDay === day.day ? `slideIn 0.3s ease-out ${idx * 0.1}s both` : 'none'
                          }}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {appointment.date}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {appointment.time}
                              </span>
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>
                          <h3 className="mb-1 text-base font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {appointment.company}
                          </h3>
                          <p className="mb-1 text-sm text-zinc-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Colaborador: {appointment.employee}
                          </p>
                          <p className="mb-1 text-sm text-zinc-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Especialista: {appointment.specialist} ({appointment.pillar})
                          </p>
                          <div className="flex items-center text-blue-400 mt-1">
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{appointment.location}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InteractiveCalendar.displayName = 'InteractiveCalendar';

export default InteractiveCalendar;

const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
