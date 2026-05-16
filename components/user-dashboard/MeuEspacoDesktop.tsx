import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, TrendingUp, Bell, BookOpen, Star, X, Video } from 'lucide-react';
import { useBookings } from '@/hooks/useBookings';
import { useMood } from '@/contexts/MoodContext';
import { SessionRatingPage } from './SessionRatingPage';
import { showSuccessToast, showConfirmToast } from '@/utils/toast';

interface MeuEspacoDesktopProps {
  setActiveTab: (tab: string) => void;
  onRebookSession?: (sessionTitle: string) => void;
  setIsQuestionnaireActive?: (active: boolean) => void;
}

export function MeuEspacoDesktop({ setActiveTab, onRebookSession, setIsQuestionnaireActive }: MeuEspacoDesktopProps) {
  const { t } = useLanguage();
  const { upcomingBookings, pastBookings, cancelBooking } = useBookings();
  const { moodHistory: moodEntries } = useMood();
  const [showRatingPage, setShowRatingPage] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [modalSession, setModalSession] = useState<any>(null);

  const handleRateSession = (session: any) => {
    setSelectedSession(session);
    setShowRatingPage(true);
  };

  const handleEnterSession = (session: any) => {
    setModalSession(session);
    setShowSessionModal(true);
  };

  const handleRescheduleFromModal = () => {
    setShowSessionModal(false);
    if (modalSession && onRebookSession) {
      onRebookSession(modalSession.pillar || 'Mental');
    }
  };

  const getMoodEmoji = (moodValue: number) => {
    if (moodValue >= 4.5) return '😄';
    if (moodValue >= 3.5) return '🙂';
    if (moodValue >= 2.5) return '😐';
    if (moodValue >= 1.5) return '🙁';
    return '😢';
  };

  if (showRatingPage && selectedSession) {
    return (
      <SessionRatingPage
        onBack={() => {
          setShowRatingPage(false);
          setSelectedSession(null);
        }}
      />
    );
  }

  return (
    <>
    <div className="bg-transparent h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <section className="px-[120px] py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-pacifico text-[42px] text-[#1a1a1a] tracking-tight mb-1">
                Meu Espaço
              </h1>
              <p className="font-plus-jakarta text-[17px] text-[#474747] opacity-70">
                Acompanhe o seu progresso e sessões agendadas
              </p>
            </div>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <section className="px-[120px] pb-3 flex-1 overflow-auto">
          {/* Row 1: Upcoming Sessions + Mood History */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Upcoming Sessions - 2 cols */}
            <div className="col-span-2 bg-gradient-to-br from-[#9dbfd4]/40 to-[#9dbfd4]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#003b8d]" />
                <h2 className="text-[18px] font-semibold text-gray-800">Próximas Sessões</h2>
              </div>
              <div className="space-y-2.5">
                {upcomingBookings.length === 0 ? (
                  <div className="bg-white/50 rounded-2xl p-8 text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Não tens sessões agendadas.</p>
                  </div>
                ) : upcomingBookings.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[24px]">
                        📅
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-gray-800">{session.pillar || 'Consulta'}</p>
                        <div className="flex items-center gap-4 mt-1 text-[13px] text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.booking_date).toLocaleDateString('pt-PT')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.booking_time}
                          </span>
                          <span>{session.specialist?.name || 'Especialista'}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEnterSession(session)}
                      className="bg-[#003b8d] text-white px-6 py-2 rounded-full text-[14px] font-bold hover:bg-[#002a66] transition-colors flex items-center gap-2"
                    >
                      <Video size={16} />
                      Entrar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood History - 1 col */}
            <div className="bg-gradient-to-br from-[#8BBEB8]/40 to-[#8BBEB8]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#003b8d]" />
                <h2 className="text-[18px] font-semibold text-gray-800">Humor</h2>
              </div>
              <div className="space-y-2.5">
                {moodEntries.slice(0, 3).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-3xl">
                    <span className="text-[14px] text-gray-600">{entry.date}</span>
                    <span className="text-[24px]">{getMoodEmoji(entry.selectedMoodIndex)}</span>
                  </div>
                ))}
                {moodEntries.length === 0 && (
                  <p className="text-gray-500 text-center py-4 italic">Sem registos de humor ainda.</p>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Session History + Notifications */}
          <div className="grid grid-cols-3 gap-3">
            {/* Session History - 2 cols */}
            <div className="col-span-2 bg-gradient-to-br from-[#fcc066]/30 to-[#f5efe6]/50 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#003b8d]" />
                <h2 className="text-[18px] font-semibold text-gray-800">Histórico de Sessões</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {pastBookings.slice(0, 3).map((session) => (
                  <div 
                    key={session.id} 
                    className="bg-white/90 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-1">{session.pillar || 'Consulta'}</p>
                        <p className="text-[13px] text-gray-500">{new Date(session.booking_date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-[12px] text-gray-600 mb-2">{session.specialist?.name || 'Especialista'}</p>
                        {session.feedback ? (
                          <div className="flex gap-1 justify-center py-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < (session.feedback as any).rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleRateSession(session)}
                            className="w-full bg-[#003b8d] text-white px-4 py-2.5 rounded-3xl text-[13px] font-semibold hover:bg-[#002a66] transition-colors"
                          >
                            Avaliar Sessão
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications - 1 col */}
            <div className="bg-gradient-to-br from-[#D8A4C4]/40 to-[#D8A4C4]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-[#003b8d]" />
                <h2 className="text-[18px] font-semibold text-gray-800">Notificações</h2>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-3xl bg-white/80">
                  <p className="text-[13px] text-gray-800 mb-0.5">Bem-vindo ao novo portal Melhor Saúde!</p>
                  <span className="text-[11px] text-gray-500">Agora mesmo</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('recursos')}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#003b8d] to-[#0052b3] text-white px-5 py-2.5 rounded-3xl font-medium hover:shadow-lg transition-shadow text-[14px]"
              >
                <BookOpen className="w-4 h-4" />
                Ver Recursos
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Session Details Modal */}
      {showSessionModal && modalSession && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B74A5] rounded-[32px] w-full max-w-[600px] relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setShowSessionModal(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Header */}
            <div className="text-center pt-8 pb-6 px-8 border-b border-white/20">
              <h2 className="text-[26px] font-['Syne:SemiBold',sans-serif] font-semibold text-white tracking-[-0.3125px]">
                Detalhes da Sessão
              </h2>
            </div>

            {/* Session Details */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-3xl flex items-center justify-center text-[24px]">
                  📅
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] text-white font-semibold mb-2">{modalSession.pillar || 'Consulta'}</h3>
                  <div className="space-y-2 text-white/90">
                    <p className="flex items-center gap-2 text-[14px]">
                      <Calendar className="w-4 h-4" />
                      {new Date(modalSession.booking_date).toLocaleDateString('pt-PT', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="flex items-center gap-2 text-[14px]">
                      <Clock className="w-4 h-4" />
                      {modalSession.booking_time}
                    </p>
                    <p className="text-[14px]">
                      <span className="font-semibold">Especialista:</span> {modalSession.specialist?.name || 'Especialista'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-8">
                <div className="flex gap-3">
                  <button 
                    onClick={handleRescheduleFromModal}
                    className="flex-1 bg-white/20 text-white px-6 py-3 rounded-3xl font-medium hover:bg-white/30 transition-colors"
                  >
                    Reagendar
                  </button>
                  <button 
                    onClick={() => {
                      setShowSessionModal(false);
                      showSuccessToast('Sessão iniciada', 'A entrar na videochamada...', { duration: 3000 });
                    }}
                    className="flex-1 bg-white text-[#0B74A5] px-6 py-3 rounded-3xl font-['Syne:Bold',sans-serif] font-bold hover:bg-gray-100 transition-colors"
                  >
                    Iniciar Sessão
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setShowSessionModal(false);
                    showConfirmToast(
                      'Cancelar Sessão',
                      'Tens a certeza que desejas cancelar esta sessão? Esta ação não pode ser desfeita.',
                      () => {
                        cancelBooking(modalSession.id);
                        showSuccessToast('Sessão cancelada', 'A sua sessão foi cancelada com sucesso.');
                      }
                    );
                  }}
                  className="w-full bg-[#EF4444] text-white px-6 py-4 rounded-3xl font-plus-jakarta font-bold hover:bg-[#DC2626] transition-all shadow-lg active:scale-[0.98]"
                >
                  Cancelar Sessão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}