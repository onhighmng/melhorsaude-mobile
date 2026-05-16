import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { BookingWithRelations } from '@/hooks/useBookings';
// DISABLED: import from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface PastSessionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    pastBookings: BookingWithRelations[];
    onRateSession: (bookingId: string, rating: number, comments?: string) => Promise<{ success: boolean; error?: string }>;
}

export function PastSessionsModal({ isOpen, onClose, pastBookings, onRateSession }: PastSessionsModalProps) {
    const [ratingStates, setRatingStates] = useState<Record<string, number>>({});
    const [commentStates, setCommentStates] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState<string | null>(null);

    const handleRatingSubmit = async (bookingId: string, rating: number) => {
        setSubmitting(bookingId);
        try {
            const comments = commentStates[bookingId] || '';
            const result = await onRateSession(bookingId, rating, comments);
            if (result.success) {
                setRatingStates({ ...ratingStates, [bookingId]: rating });
                toast.success('Avaliação guardada com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao guardar avaliação');
            }
        } catch (error) {
            toast.error('Erro ao guardar avaliação');
        } finally {
            setSubmitting(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    };

    const getPillarLabel = (pillarCode: string) => {
        const labels: Record<string, string> = {
            'PSYCH': 'Saúde Mental',
            'PHYSICAL': 'Bem-Estar Físico',
            'FINANCIAL': 'Assistência Financeira',
            'LEGAL': 'Assistência Jurídica',
            'psychological': 'Saúde Mental',
            'physical': 'Bem-Estar Físico',
            'financial': 'Assistência Financeira',
            'legal_social': 'Assistência Jurídica'
        };
        return labels[pillarCode] || pillarCode;
    };

    const getPillarColor = (pillarCode: string) => {
        const colors: Record<string, string> = {
            'PSYCH': 'bg-blue-100 text-blue-700',
            'PHYSICAL': 'bg-orange-100 text-orange-700',
            'FINANCIAL': 'bg-green-100 text-green-700',
            'LEGAL': 'bg-purple-100 text-purple-700',
            'psychological': 'bg-blue-100 text-blue-700',
            'physical': 'bg-orange-100 text-orange-700',
            'financial': 'bg-green-100 text-green-700',
            'legal_social': 'bg-purple-100 text-purple-700'
        };
        return colors[pillarCode] || 'bg-gray-100 text-gray-700';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Histórico de Sessões</DialogTitle>
                    <DialogDescription>
                        Reveja as suas sessões concluídas e avalie a sua experiência de forma anónima
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {pastBookings.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>Ainda não tem sessões concluídas.</p>
                        </div>
                    ) : (
                        pastBookings.map((booking) => {
                            const currentRating = booking.feedback?.overall_rating || ratingStates[booking.id] || 0;
                            const hasRated = currentRating > 0;

                            return (
                                <div
                                    key={booking.id}
                                    className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                                >
                                    <div className="space-y-4">
                                        {/* Specialist Info */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {booking.specialist?.profile?.full_name || 'Especialista'}
                                                </p>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${getPillarColor(booking.primary_pillar || '')}`}>
                                                    {getPillarLabel(booking.primary_pillar || '')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(booking.start_time)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                <span>{formatTime(booking.start_time)}</span>
                                            </div>
                                        </div>

                                        {/* Rating Section */}
                                        <div className="space-y-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {hasRated ? 'A sua avaliação:' : 'Avaliar sessão (1-10):'}
                                                </p>
                                                {hasRated && (
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        {currentRating}/10
                                                    </span>
                                                )}
                                            </div>

                                            {/* Numeric Rating Buttons */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                    <button
                                                        key={num}
                                                        onClick={() => handleRatingSubmit(booking.id, num)}
                                                        disabled={submitting === booking.id}
                                                        className={`w-10 h-10 rounded-lg font-semibold transition-all disabled:opacity-50 ${num === currentRating
                                                                ? 'bg-blue-600 text-white shadow-md scale-110'
                                                                : num <= currentRating
                                                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {num}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Anonymous Comments */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>Comentários (opcional e anónimo)</span>
                                                </div>
                                                <Textarea
                                                    placeholder="Partilhe a sua experiência de forma anónima. O especialista não terá acesso a este comentário."
                                                    value={commentStates[booking.id] || ''}
                                                    onChange={(e) => setCommentStates({ ...commentStates, [booking.id]: e.target.value })}
                                                    className="min-h-[80px] resize-none"
                                                    disabled={submitting === booking.id}
                                                />
                                                <p className="text-xs text-gray-500">
                                                    🔒 Os seus comentários são completamente anónimos. Apenas a avaliação numérica é partilhada (sem identificação).
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
