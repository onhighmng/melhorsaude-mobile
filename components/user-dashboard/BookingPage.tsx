import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Calendar, Clock, Video, Phone, User } from 'lucide-react';
import { useState } from 'react';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface BookingPageProps {
  pillarType: 'mental' | 'fisico' | 'financeira' | 'juridica';
  sessionType: 'video' | 'phone';
  onBack: () => void;
  onConfirm: (date: string, time: string) => void;
  onNavigateToRecursos?: () => void;
}

const specialistData = {
  mental: {
    name: "Dra. Ana Silva",
    title: "Psicologia Clínica"
  },
  fisico: {
    name: "Dr. João Santos",
    title: "Medicina Desportiva"
  },
  financeira: {
    name: "Dra. Maria Costa",
    title: "Consultoria Financeira"
  },
  juridica: {
    name: "Dr. Pedro Alves",
    title: "Direito Civil"
  }
};

export function BookingPage({ 
  pillarType,
  sessionType,
  onBack,
  onConfirm,
  onNavigateToRecursos
}: BookingPageProps) {
  
  const specialist = specialistData[pillarType];
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)); // November 2024
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedDate, setConfirmedDate] = useState<string>('');
  const [confirmedTime, setConfirmedTime] = useState<string>('');

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const dateStr = `${selectedDate} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
      setConfirmedDate(dateStr);
      setConfirmedTime(selectedTime);
      setShowConfirmation(true);
    }
  };

  const handleBackToBooking = () => {
    setShowConfirmation(false);
  };

  // Confirmation Page
  if (showConfirmation) {
    return (
      <div className="h-screen overflow-hidden flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-center font-poppins text-[#0a0a0a] mb-1 text-[32px] font-light tracking-wide">Sessão Agendada com Sucesso!</h1>
          <p className="text-center font-poppins text-[#474747] mb-6">
            A sua sessão foi agendada. Receberá uma confirmação por email em breve.
          </p>

          {/* Booking Details Card */}
          <div className="rounded-[28px] p-6 mb-4 shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
            <h2 className="font-poppins text-[#0a0a0a] text-[20px] font-light mb-4">Detalhes da Sessão</h2>
            
            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Specialist */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-black/5" style={{ background: CARD }}>
                  <User className="w-5 h-5 text-[#474747]" />
                </div>
                <div>
                  <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Especialista</p>
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light mt-1">{specialist.name}</p>
                  <p className="font-poppins text-[#474747] text-[12px]">{specialist.title}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-black/5" style={{ background: CARD }}>
                  <Clock className="w-5 h-5 text-[#474747]" />
                </div>
                <div>
                  <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Horário</p>
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light mt-1">{confirmedTime}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-black/5" style={{ background: CARD }}>
                  <Calendar className="w-5 h-5 text-[#474747]" />
                </div>
                <div>
                  <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Data</p>
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light mt-1">{confirmedDate}</p>
                </div>
              </div>

              {/* Session Type */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-black/5" style={{ background: CARD }}>
                  {sessionType === 'video' ? (
                    <Video className="w-5 h-5 text-[#474747]" />
                  ) : (
                    <Phone className="w-5 h-5 text-[#474747]" />
                  )}
                </div>
                <div>
                  <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Tipo de Sessão</p>
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light mt-1">
                    {sessionType === 'video' ? 'Online (Vídeo)' : 'Telefone'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onNavigateToRecursos}
              className="font-poppins text-[#0a0a0a] px-8 py-3 rounded-full transition-all shadow-sm bg-white"
              style={{ border: `1px solid ${CARD_EL}` }}
            >
              Recursos
            </button>
            <button
              onClick={() => onConfirm(confirmedDate, confirmedTime)}
              className="font-poppins text-[#ffffff] px-8 py-3 rounded-full transition-all shadow-sm bg-[#1565C0]"
              style={{ border: '1px solid #1565C0' }}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Booking Page
  return (
    <div className="min-h-screen p-3 md:p-6" style={{ background: BG }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-3 w-full">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-poppins text-[#0a0a0a] mb-1 text-[24px] font-light tracking-wide">Agendar Sessão</h1>
            <p className="font-poppins text-[#474747] text-[13px] md:text-[14px]">
              {specialist.name} - {specialist.title}
              <span className="text-[#a3a3a3] ml-2 hidden md:inline">
                ({sessionType === 'video' ? 'Online (vídeo)' : 'Telefone'})
              </span>
            </p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-poppins text-[#474747] hover:text-[#0a0a0a] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Voltar</span>
          </button>
        </div>
      </div>

      {/* Main Content - Side by Side on Desktop, Stacked on Mobile */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Calendar Card */}
        <div className="rounded-[28px] p-4 md:p-6 w-full md:max-w-md shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-[#ecece7] rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#474747]" />
            </button>
            
            <h2 className="font-poppins text-[#0a0a0a] text-[16px] font-light">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-[#ecece7] rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#474747]" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="font-poppins text-center text-[#474747] py-2 text-[12px] font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateClick(day)}
                disabled={!day}
                className={`
                  font-poppins aspect-square rounded-full flex items-center justify-center transition-all text-sm md:text-base font-semibold
                  ${!day ? 'invisible' : ''}
                  ${day && selectedDate === day 
                    ? 'bg-[#1565C0] text-white shadow-sm' 
                    : 'hover:bg-[#ecece7] text-[#0a0a0a]'
                  }
                  ${day && day < new Date().getDate() && currentMonth.getMonth() === new Date().getMonth()
                    ? 'opacity-40 cursor-not-allowed text-[#a3a3a3]'
                    : ''
                  }
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots - Always visible */}
        <div className="rounded-[28px] p-4 md:p-6 w-full md:max-w-md shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
          <h3 className="font-poppins text-[#0a0a0a] text-[18px] font-light mb-4">Horários Disponíveis</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                disabled={!selectedDate}
                className={`
                  font-poppins py-3 px-4 rounded-full transition-all font-semibold
                  ${selectedTime === time
                    ? 'bg-[#1565C0] text-white shadow-sm'
                    : !selectedDate 
                    ? 'bg-[#f2f1ef] text-[#a3a3a3] cursor-not-allowed'
                    : 'bg-white text-[#474747] hover:bg-[#ecece7]'
                  }
                `}
                style={{ border: selectedTime === time ? '1px solid #1565C0' : !selectedDate ? 'none' : `1px solid ${CARD_EL}` }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Button - Centered on Mobile, Right on Desktop */}
      {selectedDate && selectedTime && (
        <div className="max-w-6xl mx-auto mt-6 flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20 md:pb-0">
          <button
            onClick={handleConfirm}
            className="font-poppins font-bold bg-[#1565C0] text-white px-6 py-3 rounded-full hover:bg-[#1565C0]/90 transition-all shadow-sm"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}