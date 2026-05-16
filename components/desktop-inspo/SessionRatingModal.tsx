import { X, Star, Calendar, Clock, User, Video, Phone } from 'lucide-react';
// DISABLED: import from 'framer-motion';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface SessionRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    session?: any; // Accepting the booking object from useBookings
    booking?: any; // Alias for session if needed
    onSubmit: (rating: number, comments: string) => Promise<void>;
}

export function SessionRatingModal({ isOpen, onClose, session, booking, onSubmit }: SessionRatingModalProps) {
    const targetSession = session || booking;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setRating(0);
            setComment('');
            setHoveredStar(0);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (rating > 0) {
            setIsSubmitting(true);
            await onSubmit(rating, comment);
            setIsSubmitting(false);
        }
    };

    if (!targetSession && isOpen) return null; // Should not happen if controlled correctly

    return (
        
            {isOpen && targetSession && (
                <div



                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <div




                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                Avaliar Sessão
                            </h2>
                            <p className="text-center text-gray-500 mb-8">
                                Como foi a sua experiência?
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                        {targetSession.specialist?.profile?.full_name?.[0] || 'E'}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {targetSession.specialist?.profile?.full_name || 'Especialista'}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{format(new Date(targetSession.booking_date), "dd 'de' MMMM", { locale: ptBR })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        {targetSession.start_time.slice(0, 5)}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {targetSession.meeting_type === 'video' ? <Video className="w-4 h-4 text-gray-400" /> : <Phone className="w-4 h-4 text-gray-400" />}
                                        {targetSession.meeting_type === 'video' ? 'Vídeo' : 'Áudio'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => setRating(star)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={cn(
                                                "w-10 h-10 transition-colors",
                                                star <= (hoveredStar || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            )}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Diga-nos o que achou... (opcional)"
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none mb-6 text-sm"
                                rows={4}
                            />

                            <button
                                onClick={handleSubmit}
                                disabled={rating === 0 || isSubmitting}
                                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
                            >
                                {isSubmitting ? 'A enviar...' : 'Enviar Avaliação'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        
    );
}
