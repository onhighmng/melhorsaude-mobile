import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Video, Phone, X, Activity, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import { useBookings, BookingWithRelations } from '@/hooks/useBookings';
import { getPillarColor, getPillarIcon, getPillarName } from '@/lib/pillarUtils';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightId?: string;
}

function formatDate(date: string | null) {
  if (!date) return '-';
  try {
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: pt });
  } catch (error) {
    if (process.env.DEV) {
      console.debug("Falha ao formatar data", error);
    }
    return date;
  }
}

function formatTime(time: string | null) {
  if (!time) return '-';
  try {
    return format(new Date(`1970-01-01T${time}`), 'HH:mm');
  } catch (error) {
    if (process.env.DEV) {
      console.debug("Falha ao formatar hora", error);
    }
    return time;
  }
}

function formatMeetingType(type: string | null | undefined) {
  switch (type) {
    case 'video':
      return 'Videochamada';
    case 'phone':
      return 'Chamada telefónica';
    case 'in_person':
      return 'Presencial';
    case 'chat':
      return 'Chat';
    default:
      return 'A definir';
  }
}

function getStatusBadge(status: BookingWithRelations['status']) {
  switch (status) {
    case 'completed':
      return {
        label: 'Concluída',
        className: 'bg-green-100 text-green-700 border border-green-200',
        icon: <CheckCircle2 className="w-4 h-4" />,
      };
    case 'cancelled':
      return {
        label: 'Cancelada',
        className: 'bg-red-100 text-red-700 border border-red-200',
        icon: <AlertCircle className="w-4 h-4" />,
      };
    case 'no_show':
      return {
        label: 'Não compareceu',
        className: 'bg-orange-100 text-orange-700 border border-orange-200',
        icon: <AlertCircle className="w-4 h-4" />,
      };
    default:
      return {
        label: 'Registada',
        className: 'bg-slate-100 text-slate-700 border border-slate-200',
        icon: <Activity className="w-4 h-4" />,
      };
  }
}

const parseMetadata = (metadata: unknown): Record<string, any> => {
  if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
    return metadata as Record<string, any>;
  }
  return {};
};

const formatElapsed = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
};

export function SessionHistoryModal({ isOpen, onClose, highlightId }: SessionHistoryModalProps) {
  const { pastBookings, loading, rateSession } = useBookings();
  const [updatingSessionId, setUpdatingSessionId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  useEffect(() => {
    if (!highlightId || !isOpen) return;
    const target = document.getElementById(`session-${highlightId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId, isOpen, pastBookings.length]);


  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = setTimeout(() => setFeedbackMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const handleRateSession = async (bookingId: string, rating: number) => {
    setFeedbackMessage(null);
    setUpdatingSessionId(bookingId);

    const result = await rateSession(bookingId, rating);

    if (!result.success) {
      setFeedbackMessage({
        type: 'error',
        text: result.error || 'Não foi possível guardar a avaliação.',
      });
    } else {
      setFeedbackMessage({
        type: 'success',
        text: 'Avaliação registada com sucesso!',
      });
    }

    setUpdatingSessionId(null);
  };

  if (!isOpen) return null;

  const sortedSessions = [...pastBookings].sort((a, b) => {
    const dateA = new Date(`${a.booking_date}T${a.start_time || '00:00'}`).getTime();
    const dateB = new Date(`${b.booking_date}T${b.start_time || '00:00'}`).getTime();
    return dateB - dateA;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-pill p-5 sm:p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Fechar histórico de sessões"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pb-6 border-b border-gray-100">
          <h2 className="text-gray-900 m-0 text-3xl font-serif">
            Histórico de Sessões
          </h2>
          <p className="text-gray-600 mt-2">
            Consulte todas as sessões que já realizou na plataforma.
          </p>
        </div>

        {feedbackMessage && (
          <div
            className={`mb-6 rounded-2xl px-4 py-3 text-sm ${feedbackMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
              }`}
          >
            {feedbackMessage.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 sm:py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">A carregar o histórico...</p>
          </div>
        ) : sortedSessions.length === 0 ? (
          <div className="text-center py-10 sm:py-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <p className="text-gray-700 font-medium text-base sm:text-lg">Ainda não há sessões concluídas</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Assim que concluir uma sessão, ela ficará disponível aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSessions.map((session) => {
              const metadata = parseMetadata(session.metadata);
              const isCallRequest = metadata.request_type === 'urgent_call';
              const requestedAt = metadata.requested_at
                ? new Date(metadata.requested_at)
                : session.created_at
                  ? new Date(session.created_at)
                  : new Date(`${session.booking_date}T${session.start_time || '00:00:00'}`);
              const elapsedSeconds = Math.max(0, Math.floor((Date.now() - requestedAt.getTime()) / 1000));
              const elapsedLabel = formatElapsed(elapsedSeconds);

              const pillarColor = isCallRequest ? '#DBEAFE' : getPillarColor(session.primary_pillar || '');
              const pillarIcon = isCallRequest ? '📞' : getPillarIcon(session.primary_pillar || '');
              const pillarName = isCallRequest ? 'Pedido de Chamada' : getPillarName(session.primary_pillar || '');
              const badge = getStatusBadge(session.status);
              const isHighlighted = highlightId === session.id;
              const meetingDescription = isCallRequest ? 'Pedido de chamada' : formatMeetingType(session.meeting_type);
              const calendarLabel = isCallRequest
                ? formatDate(requestedAt.toISOString())
                : formatDate(session.completed_at ?? session.booking_date);
              const timeLabel = isCallRequest ? `há ${elapsedLabel}` : formatTime(session.start_time);
              const specialistName = isCallRequest
                ? 'Equipa de Especialistas'
                : session.specialist?.profile?.full_name || 'Especialista a confirmar';
              const hasRating = typeof session.feedback?.overall_rating === 'number';
              const savedRating = hasRating ? session.feedback!.overall_rating! : null;

              return (
                <div
                  key={session.id}
                  id={`session-${session.id}`}
                  className={`bg-white rounded-2xl p-4 sm:p-6 transition-shadow border ${isHighlighted ? 'border-blue-400 shadow-lg ring-2 ring-blue-300' : 'border-gray-100 hover:shadow-md'}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 text-xl sm:text-2xl"
                        style={{ backgroundColor: pillarColor }}
                        aria-hidden="true"
                      >
                        {pillarIcon}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-gray-900 m-0 text-base sm:text-lg font-medium">
                            {pillarName}
                          </h3>
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${badge.className}`}>
                            {badge.icon}
                            {badge.label}
                          </span>
                          {hasRating && savedRating !== null && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              Avaliada · {savedRating > 5 ? (savedRating / 2).toFixed(1) : savedRating}/5
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Sessão {formatMeetingType(session.meeting_type)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{calendarLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{timeLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{specialistName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCallRequest || session.meeting_type === 'phone' ? (
                          <Phone className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Video className="w-4 h-4 text-gray-500" />
                        )}
                        <span>{meetingDescription}</span>
                      </div>
                    </div>

                    {session.status === 'completed' && (
                      <div className="md:col-span-2 mt-4 border-t border-gray-100 pt-4">
                        {hasRating ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-gray-800">
                              Avaliação registada
                            </p>
                            <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 px-3 py-2 text-sm font-semibold w-fit">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="font-medium text-gray-900">{(savedRating! > 5 ? savedRating! / 2 : savedRating!).toFixed(1)}/5</span> · esta sessão já foi avaliada
                            </div>
                            <p className="text-xs text-gray-500">
                              Caso tenha feedback adicional, contacte a equipa de suporte.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <p className="text-sm font-medium text-gray-800">
                                Como avaliaria esta sessão?
                              </p>
                            </div>
                            <div className="mt-3 w-full grid grid-cols-5 gap-2">
                              {Array.from({ length: 5 }).map((_, idx) => {
                                const ratingValue = idx + 1;
                                const isUpdating = updatingSessionId === session.id;
                                return (
                                  <button
                                    key={ratingValue}
                                    type="button"
                                    onClick={() => handleRateSession(session.id, ratingValue)}
                                    disabled={isUpdating}
                                    className={`h-10 rounded-lg text-sm font-medium transition-colors border flex items-center justify-center ${isUpdating
                                      ? 'opacity-60 cursor-not-allowed bg-blue-100 text-blue-600 border-blue-200'
                                      : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'
                                      }`}
                                  >
                                    {ratingValue}
                                  </button>
                                );
                              })}
                            </div>
                            {updatingSessionId === session.id && (
                              <p className="text-xs text-blue-600 mt-2">A guardar avaliação...</p>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {session.user_notes && (
                      <div className="w-full md:col-span-2 bg-[#E9F4FF] border border-blue-100 rounded-xl p-4 text-sm text-blue-900 shadow-sm">
                        <p className="font-medium text-blue-900 mb-1.5">Notas da sessão</p>
                        <p className="leading-relaxed">{session.user_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div >
  );
}


