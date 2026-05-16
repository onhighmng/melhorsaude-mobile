import { ArrowLeft, Star, Calendar, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'framer-motion';
import imgMelhorSaudeTransparentLogo1 from "@/assets/inspo/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "@/assets/inspo/f066e727bc45a7068fb1f989657736b83adf0448.png";

interface SessionRatingPageProps {
    onBack: () => void;
    session?: any; // Allow passing a specific session to rate
}

interface Session {
    id: number;
    pillar: string;
    date: string;
    time: string;
    therapist: string;
    icon: string;
    color: string;
}

export function SessionRatingPage({ onBack, session }: SessionRatingPageProps) {
    // If a session is passed, we could use it. For now, using the mock data structure from inspo to ensure "exact match" 
    // but eventually we should map real data here.

    const [completedSessions] = useState<Session[]>([
        {
            id: 1,
            pillar: 'Saúde Mental',
            date: '15 Dez 2024',
            time: '14:00',
            therapist: 'Dr. João Silva',
            icon: '🧠',
            color: '#E8D5F2'
        },
        {
            id: 2,
            pillar: 'Bem-estar Físico',
            date: '12 Dez 2024',
            time: '10:30',
            therapist: 'Dra. Maria Santos',
            icon: '💪',
            color: '#D5F2E8'
        },
        {
            id: 3,
            pillar: 'Assistência Financeira',
            date: '10 Dez 2024',
            time: '16:00',
            therapist: 'Dr. Carlos Pereira',
            icon: '💰',
            color: '#F2E8D5'
        },
    ]);

    const [ratings, setRatings] = useState<{ [key: number]: number }>({});
    const [hoveredStars, setHoveredStars] = useState<{ [key: number]: number }>({});
    const [comments, setComments] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});

    const handleRating = (sessionId: number, rating: number) => {
        setRatings({ ...ratings, [sessionId]: rating });
    };

    const handleSubmit = (sessionId: number) => {
        if (ratings[sessionId]) {
            console.log('Submitted rating:', {
                sessionId,
                rating: ratings[sessionId],
                comment: comments[sessionId]
            });
            setSubmitted({ ...submitted, [sessionId]: true });

            // Reset after 2 seconds for demo
            setTimeout(() => {
                setSubmitted({ ...submitted, [sessionId]: false });
            }, 2000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#d4e9f7] to-[#9dd1e8] pt-[23.997px] px-[15.992px] pb-24 h-full overflow-y-auto">
            {/* Header */}
            <div className="relative mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={onBack}
                        className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0046a2]" />
                    </button>

                    <h1 className="font-['Pacifico',sans-serif] text-[28px] text-[#0046a2] flex-1">
                        Avaliar Sessões
                    </h1>
                </div>

                {/* Logo - Top Right */}
                <div className="absolute right-0 top-[-36px] h-[129px] w-[86px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentLogo1} />
                    <img alt="Melhor Saúde" className="absolute left-[-12px] top-[100px] w-[110px] h-auto" src={imgMelhorSaudeTransparentClean1} />
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-4 mb-5 shadow-md border border-white/50">
                <p className="text-[13px] text-gray-700 text-center">
                    Avalie as suas sessões concluídas para nos ajudar a melhorar o serviço
                </p>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
                {completedSessions.map((session) => {
                    const sessionRating = ratings[session.id] || 0;
                    const hoveredRating = hoveredStars[session.id] || 0;
                    const isSubmitted = submitted[session.id];

                    return (
                        <div
                            key={session.id}


                            className="bg-white/90 backdrop-blur-md rounded-[24px] p-5 shadow-lg border border-white/60"
                        >
                            {/* Session Header */}
                            <div className="flex items-start gap-4 mb-4">
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0"
                                    style={{ backgroundColor: session.color }}
                                >
                                    <span className="text-[28px]">{session.icon}</span>
                                </div>

                                {/* Session Info */}
                                <div className="flex-1">
                                    <h3 className="font-['Montserrat',sans-serif] font-bold text-[16px] text-[#1a1a1a] mb-2">
                                        {session.pillar}
                                    </h3>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                            <span className="text-[12px] text-gray-600">
                                                {session.date} às {session.time}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <User className="w-3.5 h-3.5 text-gray-500" />
                                            <span className="text-[12px] text-gray-600">
                                                {session.therapist}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="mb-4">
                                <p className="text-[13px] text-gray-700 mb-2 font-medium">
                                    Como classifica esta sessão?
                                </p>

                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const isActive = star <= (hoveredRating || sessionRating);

                                        return (
                                            <button
                                                key={star}
 
 
                                                onMouseEnter={() => setHoveredStars({ ...hoveredStars, [session.id]: star })}
                                                onMouseLeave={() => setHoveredStars({ ...hoveredStars, [session.id]: 0 })}
                                                onClick={() => handleRating(session.id, star)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-10 h-10 transition-all ${isActive
                                                            ? 'text-[#FFD700] fill-[#FFD700]'
                                                            : 'text-gray-300'
                                                        }`}
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Rating Label */}
                                {sessionRating > 0 && (
                                    <p className="text-[11px] text-gray-500 mt-2">
                                        {sessionRating === 1 && 'Muito Insatisfeito'}
                                        {sessionRating === 2 && 'Insatisfeito'}
                                        {sessionRating === 3 && 'Neutro'}
                                        {sessionRating === 4 && 'Satisfeito'}
                                        {sessionRating === 5 && 'Muito Satisfeito'}
                                    </p>
                                )}
                            </div>

                            {/* Comment Section (shows after rating) */}
                            {sessionRating > 0 && (
                                <div


                                    className="space-y-3"
                                >
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <textarea
                                            value={comments[session.id] || ''}
                                            onChange={(e) => setComments({ ...comments, [session.id]: e.target.value })}
                                            placeholder="Comentário (opcional)..."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0046a2] focus:border-transparent resize-none text-[13px] text-gray-700"
                                            rows={3}
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleSubmit(session.id)}
                                        disabled={isSubmitted}
                                        className={`w-full py-3 rounded-2xl font-bold text-[14px] transition-all ${isSubmitted
                                                ? 'bg-green-500 text-white'
                                                : 'bg-[#0046a2] text-white hover:bg-[#003580] active:scale-95'
                                            }`}
                                    >
                                        {isSubmitted ? '✓ Avaliação Submetida!' : 'Submeter Avaliação'}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {completedSessions.length === 0 && (
                <div className="text-center py-12 px-4">
                    <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Star className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-[16px] text-gray-700 font-medium mb-2">
                        Nenhuma sessão para avaliar
                    </p>
                    <p className="text-[13px] text-gray-500">
                        Complete uma sessão para poder avaliar
                    </p>
                </div>
            )}

            {/* Bottom spacing for navbar */}
            <div className="h-8" />
        </div>
    );
}
