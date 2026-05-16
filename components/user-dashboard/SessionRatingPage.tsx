import { ArrowLeft, Star, Calendar, Clock, MessageSquare, CheckCircle2, Brain, Activity, Wallet, Scale } from 'lucide-react';
import { useState, useMemo } from 'react';
// DISABLED: import from 'motion/react';
// DISABLED: import from 'sonner';
import { useBookings } from '@/hooks/useBookings';

const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

const PILLAR_CONFIG: Record<string, { label: string; accent: string; Icon: React.ElementType }> = {
  PSYCH:    { label: 'Saúde Mental',          accent: '#1565C0', Icon: Brain    },
  PHYSICAL: { label: 'Bem-estar Físico',       accent: '#FB923C', Icon: Activity },
  FINANCIAL:{ label: 'Assistência Financeira', accent: '#34D399', Icon: Wallet   },
  LEGAL:    { label: 'Assistência Jurídica',   accent: '#F472B6', Icon: Scale    },
};

interface SessionRatingPageProps {
  onBack: () => void;
}

function StarRating({
  value,
  hovered,
  onHover,
  onLeave,
  onSelect,
  accent,
}: {
  value: number;
  hovered: number;
  onHover: (n: number) => void;
  onLeave: () => void;
  onSelect: (n: number) => void;
  accent: string;
}) {
  return (
    <div className="flex gap-1.5" onMouseLeave={onLeave}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (hovered || value);
        return (
          <button
            key={n}
 
            onMouseEnter={() => onHover(n)}
            onTouchStart={() => onHover(n)}
            onClick={() => onSelect(n)}
            className="p-1 transition-transform"
          >
            <Star
              size={26}
              fill={filled ? accent : 'transparent'}
              style={{ color: filled ? accent : '#ecece7' }}
              strokeWidth={filled ? 0 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

const RATING_LABELS = ['', 'Muito Mau', 'Mau', 'Ok', 'Bom', 'Excelente'];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (timeStr?: string | null) => timeStr?.slice(0, 5) || '';

export function SessionRatingPage({ onBack }: SessionRatingPageProps) {
  const { pastBookings, rateSession, loading } = useBookings();

  const unratedSessions = useMemo(
    () => pastBookings.filter((b) => !b.feedback),
    [pastBookings]
  );

  const [ratings, setRatings]     = useState<Record<string, number>>({});
  const [hovered, setHovered]     = useState<Record<string, number>>({});
  const [comments, setComments]   = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded]   = useState<string | null>(null);

  const handleSubmit = async (id: string) => {
    if (!ratings[id]) return;
    setSubmitting((p) => ({ ...p, [id]: true }));
    const result = await rateSession(id, ratings[id], comments[id]);
    setSubmitting((p) => ({ ...p, [id]: false }));
    if (result?.success !== false) {
      setSubmitted((prev) => ({ ...prev, [id]: true }));
      toast.success('Avaliação enviada!', { description: 'Obrigado pelo teu feedback.' });
    } else {
      toast.error('Erro ao enviar', { description: (result as any)?.error || 'Tenta novamente.' });
    }
  };

  const totalSubmitted = Object.keys(submitted).length;
  const allRated = unratedSessions.length > 0 && totalSubmitted >= unratedSessions.length;

  return (
    <div className="min-h-screen pb-32">

      {/* Header */}
      <div
        className="sticky top-0 z-20 px-5 pt-12 pb-5"
        style={{ background: `transparent`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <ArrowLeft size={17} className="text-[#0a0a0a]" />
          </button>
          <div>
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Bem-estar</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Avaliar Sessões</h1>
          </div>
          <div className="ml-auto">
            <span className="font-poppins text-[12px] font-bold px-3 py-1.5 rounded-[4px]"
              style={{ background: '#ecece7', color: '#0a0a0a', border: '1px solid #ecece7' }}>
              {totalSubmitted}/{unratedSessions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">

        {/* All rated banner */}
        
          {allRated && (
            <div



              className="flex items-center gap-3 px-4 py-4 rounded-[28px] mb-5 bg-white shadow-sm"
              style={{ border: '1px solid #10b981' }}
            >
              <CheckCircle2 size={20} style={{ color: '#10b981' }} className="shrink-0" />
              <div>
                <p className="font-poppins text-[16px] font-light" style={{ color: '#10b981' }}>Tudo avaliado!</p>
                <p className="font-poppins text-[#474747] text-[12px]">Obrigado pelo teu feedback.</p>
              </div>
            </div>
          )}
        

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && unratedSessions.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="size-16 rounded-full bg-[#f2f1ef] flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-[#474747]" />
            </div>
            <p className="font-poppins text-[#0a0a0a] text-[18px] font-light">Nenhuma sessão por avaliar</p>
            <p className="font-poppins text-[#474747] text-[14px] mt-1">Completa uma sessão para poder avaliar</p>
          </div>
        )}

        {/* Session cards */}
        <div className="flex flex-col gap-3">
          {unratedSessions.map((booking) => {
            const pillarKey = booking.pillar || 'PSYCH';
            const config    = PILLAR_CONFIG[pillarKey] || PILLAR_CONFIG['PSYCH'];
            const { label, accent, Icon } = config;

            const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
            const id         = booking.id;
            const isOpen     = expanded === id;
            const isSubmitted = submitted[id];
            const rating     = ratings[id] ?? 0;
            const hover      = hovered[id] ?? 0;
            const comment    = comments[id] ?? '';

            return (
              <div
                key={id}
                layout
                className="rounded-[28px] overflow-hidden shadow-sm bg-white"
                style={{ border: `1px solid ${isOpen ? accent : CARD_EL}` }}
              >
                {/* Card header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : id)}
                  className="w-full flex items-center gap-3 p-4 text-left transition-all active:scale-[0.99]"
                >
                  <div
                    className="size-11 rounded-full flex items-center justify-center shrink-0 border border-black/5"
                    style={{ background: `${accent}15` }}
                  >
                    <Icon size={18} style={{ color: accent }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-poppins text-[#0a0a0a] text-[16px] font-light truncate">{specialistName}</p>
                    <p className="font-poppins text-[#474747] text-[11px] mt-0.5 uppercase tracking-wider">{label}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1">
                        <Calendar size={9} className="text-[#474747]" />
                        <span className="font-poppins text-[#474747] text-[10px] font-medium">{formatDate(booking.booking_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={9} className="text-[#474747]" />
                        <span className="font-poppins text-[#474747] text-[10px] font-medium">{formatTime((booking as any).start_time || (booking as any).booking_time)}</span>
                      </div>
                    </div>
                  </div>

                  {isSubmitted ? (
                    <div className="flex items-center gap-1 shrink-0">
                      <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      <span className="font-poppins text-[11px] font-semibold" style={{ color: '#10b981' }}>Avaliado</span>
                    </div>
                  ) : (
                    <div
                      className="px-2.5 py-1 rounded-[4px] font-poppins text-[10px] font-bold shrink-0"
                      style={{ background: `${accent}15`, color: accent }}
                    >
                      Avaliar
                    </div>
                  )}
                </button>

                {/* Expandable rating area */}
                
                  {isOpen && (
                    <div




                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-4 pb-5" style={{ borderTop: `1px solid ${BORDER}` }}>

                        {isSubmitted ? (
                          <div


                            className="flex flex-col items-center py-6 text-center"
                          >
                            <div
                              className="size-14 rounded-full flex items-center justify-center mb-3 border border-black/5"
                              style={{ background: `${accent}15` }}
                            >
                              <CheckCircle2 size={28} style={{ color: accent }} />
                            </div>
                            <p className="font-poppins text-[#0a0a0a] text-[18px] font-light tracking-wide">Avaliação enviada</p>
                            {rating > 0 && (
                              <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <Star key={n} size={16} fill={n <= rating ? accent : 'transparent'}
                                    style={{ color: n <= rating ? accent : '#ecece7' }}
                                    strokeWidth={n <= rating ? 0 : 1.5}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div



                            className="pt-4 flex flex-col gap-4"
                          >
                            <div>
                              <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-3">
                                Como foi a sessão?
                              </p>
                              <div className="flex flex-col items-center gap-2">
                                <StarRating
                                  value={rating}
                                  hovered={hover}
                                  onHover={(n) => setHovered((p) => ({ ...p, [id]: n }))}
                                  onLeave={() => setHovered((p) => ({ ...p, [id]: 0 }))}
                                  onSelect={(n) => setRatings((p) => ({ ...p, [id]: n }))}
                                  accent={accent}
                                />
                                {(hover || rating) > 0 && (
                                  <p


                                    className="font-poppins text-[13px] font-bold"
                                    style={{ color: accent }}
                                  >
                                    {RATING_LABELS[hover || rating]}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 mb-2 mt-4">
                                <MessageSquare size={11} className="text-[#474747]" />
                                <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider">
                                  Comentário (opcional)
                                </p>
                              </div>
                              <textarea
                                value={comment}
                                onChange={(e) => setComments((p) => ({ ...p, [id]: e.target.value }))}
                                placeholder="Partilha a tua experiência..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-[28px] font-poppins text-[13px] text-[#0a0a0a] placeholder:text-[#474747] outline-none resize-none transition-all shadow-sm"
                                style={{
                                  background: CARD,
                                  border: `1px solid ${comment ? accent : CARD_EL}`,
                                }}
                              />
                            </div>

                            <button
                              onClick={() => handleSubmit(id)}
                              disabled={!rating || submitting[id]}
                              className="w-full py-4 mt-2 rounded-full font-poppins font-bold text-[14px] transition-all active:scale-[0.98] shadow-sm"
                              style={{
                                background: rating ? accent : CARD_EL,
                                color: rating ? '#fff' : '#474747',
                              }}
                            >
                              {submitting[id] ? 'A enviar...' : 'Enviar Avaliação'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
