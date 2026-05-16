import { X, ChevronLeft, ChevronRight, Calendar, Clock, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'sonner';

interface AvailabilityModalProps {
  onClose: () => void;
}

interface DayAvailability {
  date: string;
  timeBlocks: {
    morning: boolean;   // 9AM-12PM
    afternoon: boolean; // 12PM-5PM
    evening: boolean;   // 5PM-9PM
  };
}

export function AvailabilityModal({ onClose }: AvailabilityModalProps) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [unavailability, setUnavailability] = useState<Map<string, DayAvailability>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Fetch initial availability
  useEffect(() => {
    async function fetchAvailability() {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('specialists')
          .select('availability')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching availability:', error);
          // Don't show toast on 404/empty, just assume empty
          return;
        }

        if (data?.availability) {
          // Check if it's an object we can convert to Map
          try {
            const loadedMap = new Map(Object.entries(data.availability as Record<string, DayAvailability>));
            setUnavailability(loadedMap);
          } catch (e) {
            console.error('Error parsing availability JSON:', e);
          }
        }
      } catch (err) {
        console.error('Unexpected error fetching availability:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAvailability();
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      const availObject = Object.fromEntries(unavailability);

      const { error } = await supabase
        .from('specialists')
        .update({ availability: availObject })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Disponibilidade atualizada com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Erro ao guardar disponibilidade. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, isPast: true });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      days.push({ day: i, isCurrentMonth: true, isPast });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPast: false });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const toggleDate = (day: number, isCurrentMonth: boolean, isPast: boolean) => {
    if (!isCurrentMonth || isPast) return;

    setSelectedDates(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const selectWeekdays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const weekdayDays: number[] = [];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Monday-Friday (1-5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && !isPast) {
        weekdayDays.push(i);
      }
    }
    setSelectedDates(weekdayDays);
  };

  const selectWeekends = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const weekendDays: number[] = [];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Saturday-Sunday (6, 0)
      if ((dayOfWeek === 0 || dayOfWeek === 6) && !isPast) {
        weekendDays.push(i);
      }
    }
    setSelectedDates(weekendDays);
  };

  const clearSelection = () => {
    setSelectedDates([]);
  };

  const toggleTimeBlock = (blockName: 'morning' | 'afternoon' | 'evening') => {
    if (selectedDates.length === 0) return;

    const newUnavailability = new Map(unavailability);

    // Apply to all selected dates
    selectedDates.forEach(day => {
      const dateKey = getDateKey(day);
      const current = newUnavailability.get(dateKey) || {
        date: dateKey,
        timeBlocks: { morning: false, afternoon: false, evening: false }
      };

      current.timeBlocks[blockName] = !current.timeBlocks[blockName];
      newUnavailability.set(dateKey, current);
    });

    setUnavailability(newUnavailability);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDates([]);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDates([]);
  };

  const hasAvailability = (day: number) => {
    const dateKey = getDateKey(day);
    const dayAvail = unavailability.get(dateKey);
    if (!dayAvail) return false;
    return dayAvail.timeBlocks.morning || dayAvail.timeBlocks.afternoon || dayAvail.timeBlocks.evening;
  };

  // Get time block state for selected dates
  const getTimeBlockState = (blockName: 'morning' | 'afternoon' | 'evening') => {
    if (selectedDates.length === 0) return false;

    // Check if ALL selected dates have this block enabled
    return selectedDates.every(day => {
      const dateKey = getDateKey(day);
      const dayAvail = unavailability.get(dateKey);
      return dayAvail?.timeBlocks[blockName] === true;
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 lg:p-4 transition-all duration-200 ${isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-none lg:rounded-3xl shadow-2xl w-full h-full lg:max-w-2xl lg:max-h-[85vh] overflow-hidden transition-all duration-200 flex flex-col ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-gray-900">Definir Disponibilidade</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {/* Instructions */}
          <div className="bg-red-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-900 mb-2">
              🔴 Por padrão, está disponível todos os dias
            </p>
            <p className="text-sm text-gray-900">
              Selecione os dias e horários em que NÃO está disponível
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={selectWeekdays}
              className="px-4 py-2 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl transition-all text-sm"
            >
              Dias úteis
            </button>
            <button
              onClick={selectWeekends}
              className="px-4 py-2 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl transition-all text-sm"
            >
              Fins de semana
            </button>
            {selectedDates.length > 0 && (
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-red-50 border-2 border-red-200 hover:border-red-500 text-red-600 hover:text-red-700 rounded-xl transition-all text-sm"
              >
                Limpar ({selectedDates.length})
              </button>
            )}
          </div>

          {/* Calendar Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-gray-900 capitalize">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-gray-50 rounded-2xl p-4">
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center py-2">
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayInfo, index) => {
                  const isSelected = selectedDates.includes(dayInfo.day) && dayInfo.isCurrentMonth;
                  const hasAvail = dayInfo.isCurrentMonth && hasAvailability(dayInfo.day);

                  return (
                    <button
                      key={index}
                      onClick={() => toggleDate(dayInfo.day, dayInfo.isCurrentMonth, dayInfo.isPast)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all relative ${!dayInfo.isCurrentMonth
                          ? 'text-gray-400 cursor-default'
                          : dayInfo.isPast
                            ? 'text-gray-400 cursor-not-allowed'
                            : isSelected
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : hasAvail
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'hover:bg-gray-200 text-gray-900'
                        }`}
                      disabled={!dayInfo.isCurrentMonth || dayInfo.isPast}
                    >
                      {dayInfo.day}
                      {hasAvail && !isSelected && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Blocks Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-600" />
              <h3 className="text-gray-900">
                {selectedDates.length > 0
                  ? `Horários para ${selectedDates.length} ${selectedDates.length === 1 ? 'dia selecionado' : 'dias selecionados'}`
                  : 'Selecione dias primeiro'}
              </h3>
            </div>

            {selectedDates.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => toggleTimeBlock('morning')}
                  className={`py-4 px-5 rounded-xl text-sm transition-all border-2 ${getTimeBlockState('morning')
                      ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Manhã</span>
                    <span className="text-xs opacity-80">09:00 - 12:00</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleTimeBlock('afternoon')}
                  className={`py-4 px-5 rounded-xl text-sm transition-all border-2 ${getTimeBlockState('afternoon')
                      ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tarde</span>
                    <span className="text-xs opacity-80">12:00 - 17:00</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleTimeBlock('evening')}
                  className={`py-4 px-5 rounded-xl text-sm transition-all border-2 ${getTimeBlockState('evening')
                      ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Noite</span>
                    <span className="text-xs opacity-80">17:00 - 21:00</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  Clique nos dias para começar a definir disponibilidade
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          {unavailability.size > 0 && (
            <div className="mt-6 bg-red-50 rounded-2xl p-4">
              <p className="text-sm text-red-800">
                ✓ Indisponibilidade definida para {unavailability.size} {unavailability.size === 1 ? 'dia' : 'dias'}
              </p>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="bg-white border-t border-gray-200 px-6 py-5 flex gap-3 justify-center">
          <button
            onClick={handleClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl transition-colors"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}