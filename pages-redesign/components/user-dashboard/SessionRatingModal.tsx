
import { X, Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { BookingWithRelations } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// DISABLED: import from 'sonner';

interface SessionRatingModalProps {
    booking: BookingWithRelations;
    onClose: () => void;
    onSubmit: (bookingId: string, rating: number, comment?: string) => Promise<{ success: boolean; error?: string }>;
}

export function SessionRatingModal({ booking, onClose, onSubmit }: SessionRatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Por favor, atribua uma classificação.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await onSubmit(booking.id, rating, comment);
            if (result.success) {
                toast.success('Obrigado pelo seu feedback!');
                onClose();
            } else {
                toast.error(result.error || 'Erro ao enviar avaliação.');
            }
        } catch (error) {
            toast.error('Ocorreu um erro inesperado.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const specialistName = booking.specialist?.profile?.full_name || 'Especialista';
    const specialistAvatar = booking.specialist?.profile?.avatar_url;

    return (
        
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div



                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
                            Como correu a sessão?
                        </h2>
                        <p className="text-blue-100 text-sm">
                            A sua opinião ajuda-nos a melhorar a plataforma.
                        </p>
                    </div>

                    <div className="p-6">
                        {/* Specialist Info */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3 overflow-hidden">
                                {specialistAvatar ? (
                                    <img src={specialistAvatar} alt={specialistName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                        {specialistName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{specialistName}</h3>
                            <p className="text-gray-500 text-sm">{new Date(booking.booking_date).toLocaleDateString()}</p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        className={`w-10 h-10 ${star <= (hoveredStar || rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-200'
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>

                        <p className="text-center text-gray-600 font-medium mb-4">
                            {rating === 0 ? 'Toque nas estrelas para avaliar' :
                                rating === 5 ? 'Excelente!' :
                                    rating === 4 ? 'Muito bom!' :
                                        rating === 3 ? 'Bom' :
                                            rating === 2 ? 'Razoável' : 'Mau'}
                        </p>

                        {/* Comment Area */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Comentário (opcional)
                            </label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Partilhe a sua experiência..."
                                className="resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                rows={3}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Mais tarde
                            </Button>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleSubmit}
                                disabled={isSubmitting || rating === 0}
                            >
                                {isSubmitting ? 'A enviar...' : 'Enviar Avaliação'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}
