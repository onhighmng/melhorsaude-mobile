import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '@/components/ui/switch';
// DISABLED: import from 'sonner';
import { useSpecialistAvailability, TimeBlock } from '@/hooks/useSpecialistAvailability';

export function AuditoriaLogs({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('12:00');
  const [reason, setReason] = useState('');

  const { blocks, loading, addBlock, deleteBlock } = useSpecialistAvailability();

  const handleQuickBlock1Hour = async () => {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later

    await addBlock({
      startDate: now.toISOString().split('T')[0],
      startTime: now.toTimeString().substring(0, 5),
      endDate: end.toISOString().split('T')[0],
      endTime: end.toTimeString().substring(0, 5),
      reason: 'Pausa (Rápida)'
    });
  };

  const handleBlockRestOfDay = async () => {
    const now = new Date();

    await addBlock({
      startDate: now.toISOString().split('T')[0],
      startTime: now.toTimeString().substring(0, 5),
      endDate: now.toISOString().split('T')[0],
      endTime: '23:59',
      reason: 'Fechado por hoje'
    });
  };

  const handleCustomBlock = async () => {
    if (!startDate || !endDate) {
      toast.error('Por favor, selecione as datas.');
      return;
    }

    const success = await addBlock({
      startDate,
      startTime,
      endDate, // Note: current hook assumes single day block for simplicity, logic might need expansion for multi-day
      endTime,
      reason: reason || 'Personalizado'
    });

    if (success) {
      // Reset form
      setStartDate('');
      setEndDate('');
      setStartTime('09:00');
      setEndTime('12:00');
      setReason('');
      setShowCustomModal(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    await deleteBlock(id);
  };

  const formatBlockDisplay = (block: TimeBlock) => {
    const startDateObj = new Date(block.startDate);
    const endDateObj = new Date(block.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if it's today
    if (startDateObj.toDateString() === today.toDateString()) {
      return `Hoje: ${block.startTime} - ${block.endTime}`;
    }

    return `${block.startDate}: ${block.startTime} - ${block.endTime}`;
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen" style={{ backgroundColor: '#F5F3EE' }}>
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('nav.back')}</span>
      </button>

      <h1 className="text-3xl md:text-4xl mb-4 text-[#1a1a1a] font-pacifico">
        Gestão de Disponibilidade
      </h1>

      <p className="text-gray-600 mb-8 font-inter text-base">
        Controle a sua agenda. Bloqueie dias ou horários específicos para impedir novos agendamentos de vídeo e voz.
      </p>

      {/* Master Toggle Switch */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="mb-1 font-manrope font-bold text-lg">
              Aceitar Novos Agendamentos
            </h3>
            <p className="text-sm text-gray-600 font-inter">
              {isAcceptingBookings
                ? 'A sua agenda está aberta para marcações futuras.'
                : 'A sua agenda está temporariamente fechada. Ninguém pode marcar novas sessões até reativar.'}
            </p>
          </div>
          <Switch
            checked={isAcceptingBookings}
            onCheckedChange={setIsAcceptingBookings}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 !h-8 !w-14 [&>span]:!bg-white [&>span]:!h-6 [&>span]:!w-6 [&>span]:data-[state=checked]:!translate-x-7 [&>span]:data-[state=unchecked]:!translate-x-1"
          />
        </div>
      </div>

      {/* Quick Block Buttons */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
          Bloqueio Rápido
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Button A: Short Break (1 hour) */}
          <button
            onClick={handleQuickBlock1Hour}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="text-4xl mb-3">☕</div>
            <h3 className="text-xl mb-2 font-manrope font-bold">
              Pausa (1h)
            </h3>
            <p className="text-sm text-gray-600 font-inter">
              Bloqueia a próxima 1 hora
            </p>
            <p className="text-xs text-gray-500 mt-2 font-inter">
              Ideal para: Almoço ou urgência pessoal
            </p>
          </button>

          {/* Button B: Rest of the Day */}
          <button
            onClick={handleBlockRestOfDay}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="text-4xl mb-3">🌙</div>
            <h3 className="text-xl mb-2 font-manrope font-bold">
              Fechar por Hoje
            </h3>
            <p className="text-sm text-gray-600 font-inter">
              Bloqueia tudo até às 00:00
            </p>
            <p className="text-xs text-gray-500 mt-2 font-inter">
              Ideal para: Saída antecipada ou doença súbita
            </p>
          </button>

          {/* Button C: Custom Date */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-xl mb-2 font-manrope font-bold">
              Definir Data Específica
            </h3>
            <p className="text-sm text-gray-600 font-inter">
              Abre calendário personalizado
            </p>
            <p className="text-xs text-gray-500 mt-2 font-inter">
              Ideal para: Férias futuras ou consultas
            </p>
          </button>
        </div>
      </div>

      {/* Blocked Times List (Simplified) */}
      <div>
        <h2 className="text-2xl mb-4 font-manrope font-bold">
          Horários Bloqueados
        </h2>

        {blocks.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500 font-inter">
              A sua agenda está totalmente aberta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 font-inter">
                    {formatBlockDisplay(block)}
                  </p>
                  {block.reason && (
                    <p className="text-sm text-gray-500 mt-1 font-inter">
                      ({block.reason})
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remover"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Date Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-manrope font-bold">
                Definir Data Específica
              </h2>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 font-inter">
                Selecione o intervalo em que ficará incontactável. Estes horários desaparecerão automaticamente das opções de marcação dos utilizadores.
              </p>

              <div className="space-y-6">
                {/* Start Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 font-inter">
                      Data de Início
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full font-inter"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 font-inter">
                      Hora
                    </label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full font-inter"
                    />
                  </div>
                </div>

                {/* End Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 font-inter">
                      Data de Fim
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full font-inter"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 font-inter">
                      Hora
                    </label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full font-inter"
                    />
                  </div>
                </div>

                {/* Reason (Optional) */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 font-inter">
                    Motivo (Opcional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Consulta Médica / Férias / Almoço"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full font-inter"
                  />
                  <p className="mt-1 text-xs text-gray-500 font-inter">
                    Nota: O motivo fica apenas visível para a administração, não para o utilizador.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowCustomModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-inter font-semibold"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCustomBlock}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-inter font-semibold"
                  >
                    ⛔ Bloquear Horário
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
