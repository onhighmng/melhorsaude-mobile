import { X, Star, Calendar, Clock, Video, Phone } from 'lucide-react';
// DISABLED: import from 'motion/react';
import { useState } from 'react';
// DISABLED: import from 'sonner';
import { BookingWithRelations } from '@/hooks/useBookings';

interface SessionRatingModalProps {
  booking: BookingWithRelations;
  onClose: () => void;
  onSubmit: (bookingId: string, rating: number, comments?: string) => Promise<{ success: boolean; error?: string }>;
}

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental',
  PHYSICAL: 'Bem-estar Físico',
  FINANCIAL: 'Assistência Financeira',
  LEGAL: 'Assistência Jurídica',
};

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: '#1565C0',
  PHYSICAL: '#FB923C',
  FINANCIAL: '#34D399',
  LEGAL: '#F472B6',
};

const RATING_LABELS = ['', 'Muito Mau', 'Mau', 'Ok', 'Bom', 'Excelente'];

export function SessionRatingModal({ booking, onClose, onSubmit }: SessionRatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pillar = booking.pillar || 'PSYCH';
  const accent = PILLAR_COLORS[pillar] || '#1565C0';
  const pillarLabel = PILLAR_LABELS[pillar] || pillar;
  const specialistName = booking.specialist?.profile?.full_name || 'Especialista';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (timeStr?: string | null) => timeStr?.slice(0, 5) || '';

  const handleSubmit = async () => {
    if (!rating) return;
    setIsSubmitting(true);
    const result = await onSubmit(booking.id, rating, comment || undefined);
    setIsSubmitting(false);
    if (result?.success !== false) {
      toast.success('Avaliação enviada!', { description: 'Obrigado pelo teu feedback.' });
      onClose();
    } else {
      toast.error('Erro ao enviar', { description: result.error || 'Tenta novamente.' });
    }
  };

  return (
    
      <div



        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div




          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="inline-flex items-center px-3 py-1.5 rounded-full text-white text-xs font-bold mb-4"
            style={{ background: accent }}
          >
            {pillarLabel}
          </div>

          <h2 className="text-[#0a0a0a] text-[22px] font-light font-poppins mb-1">
            Como foi a sessão?
          </h2>
          <p className="text-[#474747] text-[13px] font-poppins mb-5">
            Com <strong>{specialistName}</strong>
          </p>

          <div className="flex items-center gap-4 p-3 bg-[#f2f1ef] rounded-2xl mb-6 text-[#474747] text-[12px] font-poppins">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(booking.booking_date)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatTime((booking as any).start_time || (booking as any).booking_time)}
            </div>
            <div className="flex items-center gap-1.5">
              {booking.meeting_type === 'phone' ? <Phone className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
              {booking.meeting_type === 'phone' ? 'Voz' : 'Vídeo'}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="flex gap-2" onMouseLeave={() => setHoveredRating(0)}>
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = n <= (hoveredRating || rating);
                return (
                  <button
                    key={n}
 
                    onMouseEnter={() => setHoveredRating(n)}
                    onClick={() => setRating(n)}
                    className="p-1 transition-transform"
                  >
                    <Star
                      size={32}
                      fill={filled ? accent : 'transparent'}
                      style={{ color: filled ? accent : '#ecece7' }}
                      strokeWidth={filled ? 0 : 1.5}
                    />
                  </button>
                );
              })}
            </div>
            {(hoveredRating || rating) > 0 && (
              <p


                className="font-poppins text-[14px] font-bold"
                style={{ color: accent }}
              >
                {RATING_LABELS[hoveredRating || rating]}
              </p>
            )}
          </div>

          {rating > 0 && (
            <div


              className="mb-4"
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comentário opcional..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl font-poppins text-[13px] text-[#0a0a0a] placeholder:text-[#474747] outline-none resize-none bg-[#f2f1ef] border border-transparent focus:border-[#ecece7] transition-all"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!rating || isSubmitting}
            className="w-full py-4 rounded-full font-poppins font-bold text-[14px] transition-all active:scale-[0.98]"
            style={{
              background: rating ? accent : '#ecece7',
              color: rating ? '#fff' : '#474747',
            }}
          >
            {isSubmitting ? 'A enviar...' : 'Enviar Avaliação'}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 font-poppins text-[13px] text-[#474747] mt-1"
          >
            Mais tarde
          </button>
        </div>
      </div>
    
  );
}
