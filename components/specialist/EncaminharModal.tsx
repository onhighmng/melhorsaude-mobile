import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EncaminharModalProps {
  sessionInfo: {
    userName: string;
    userEmail: string;
    originalPilar: string;
  };
  onClose: () => void;
  onConfirm: (referralData: {
    pilar: string;
    provider: string;
    date: string;
    time: string;
  }) => void;
}

const PILLARS = [
  { id: 'mental', name: 'Saúde Mental', color: 'bg-blue-100 text-blue-700' },
  { id: 'physical', name: 'Bem-Estar Físico', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'financial', name: 'Assistência Financeira', color: 'bg-green-100 text-green-700' },
  { id: 'legal', name: 'Assistência Jurídica', color: 'bg-purple-100 text-purple-700' },
];

const PROVIDERS = {
  mental: [
    { id: 'p1', name: 'Dr. João Silva', specialty: 'Psicólogo Clínico' },
    { id: 'p2', name: 'Dra. Maria Santos', specialty: 'Psiquiatra' },
    { id: 'p3', name: 'Dr. Pedro Costa', specialty: 'Terapeuta' },
  ],
  physical: [
    { id: 'p4', name: 'Dr. Ana Rodrigues', specialty: 'Nutricionista' },
    { id: 'p5', name: 'Dr. Carlos Mendes', specialty: 'Fisioterapeuta' },
    { id: 'p6', name: 'Dra. Sofia Oliveira', specialty: 'Personal Trainer' },
  ],
  financial: [
    { id: 'p7', name: 'Dr. Miguel Ferreira', specialty: 'Consultor Financeiro' },
    { id: 'p8', name: 'Dra. Teresa Alves', specialty: 'Contabilista' },
  ],
  legal: [
    { id: 'p9', name: 'Dr. Ricardo Pereira', specialty: 'Advogado' },
    { id: 'p10', name: 'Dra. Inês Martins', specialty: 'Advogada' },
  ],
};

const AVAILABLE_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export function EncaminharModal({ sessionInfo, onClose, onConfirm }: EncaminharModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPilar, setSelectedPilar] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    const defaultPillar = PILLARS.find(p => p.name === sessionInfo.originalPilar);
    if (defaultPillar) {
      setSelectedPilar(defaultPillar.id);
    }
  }, [sessionInfo.originalPilar]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleNext = () => {
    if (step === 1 && selectedPilar) setStep(2);
    else if (step === 2 && selectedProvider) setStep(3);
    else if (step === 3 && selectedDate && selectedTime) {
      // Confirm the referral
      const pilarName = PILLARS.find(p => p.id === selectedPilar)?.name || '';
      const providerName = PROVIDERS[selectedPilar as keyof typeof PROVIDERS]?.find(p => p.id === selectedProvider)?.name || '';
      
      onConfirm({
        pilar: pilarName,
        provider: providerName,
        date: selectedDate,
        time: selectedTime,
      });
      handleClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const today = new Date();
      const isPast = new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(dateStr)}
          disabled={isPast}
          className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isPast
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const canProceed = () => {
    if (step === 1) return selectedPilar !== null;
    if (step === 2) return selectedProvider !== null;
    if (step === 3) return selectedDate !== null && selectedTime !== null;
    return false;
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-200 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-pill transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h2 className="text-gray-900">Encaminhar Utilizador</h2>
              <p className="text-sm text-gray-500 mt-1">
                {sessionInfo.userName} • Passo {step} de 3
              </p>
              {sessionInfo.originalPilar && (
                <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  Pilar atual: {sessionInfo.originalPilar}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Step 1: Select Pillar */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-900 mb-2">Selecione o Pilar</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Escolha o pilar para o qual deseja encaminhar o utilizador
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PILLARS.map((pilar) => (
                  <button
                    key={pilar.id}
                    onClick={() => setSelectedPilar(pilar.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedPilar === pilar.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm ${pilar.color}`}>
                        {pilar.name}
                      </span>
                      {selectedPilar === pilar.id && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Provider */}
          {step === 2 && selectedPilar && (
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-900 mb-2">Selecione o Prestador</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Escolha o prestador disponível para este encaminhamento
                </p>
              </div>
              <div className="space-y-3">
                {PROVIDERS[selectedPilar as keyof typeof PROVIDERS]?.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                      selectedProvider === provider.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-900 mb-1">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.specialty}</p>
                      </div>
                      {selectedProvider === provider.id && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Date and Time */}
          {step === 3 && selectedProvider && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">Selecione Data e Hora</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Escolha uma data e hora disponível para o agendamento
                </p>
              </div>

              {/* Calendar */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-gray-900">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-white rounded-xl transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {renderCalendar()}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-gray-900 mb-4">Horários Disponíveis</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {AVAILABLE_TIMES.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-3 rounded-xl text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-blue-500 text-white'
                            : 'bg-white hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 rounded-b-3xl">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              canProceed()
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Confirmar Encaminhamento' : 'Continuar'}
            {step < 3 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}