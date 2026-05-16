import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, TrendingUp, Bell, BookOpen, Star, X, ChevronRight } from 'lucide-react';
import { SessionRatingPage } from './SessionRatingPage';
import { showSuccessToast } from '@/utils/inspoToast';
import { DesktopTopNav } from './DesktopTopNav';
import { useBookings } from '@/contexts/BookingContext';
import { useMood } from '@/contexts/MoodContext';
import { useNotifications } from '@/hooks/useNotifications';
import { SessionHistoryModal } from './modals/SessionHistoryModal';
import { MoodHistoryModal } from './modals/MoodHistoryModal';
import { NotificationHistoryModal } from './modals/NotificationHistoryModal';

interface MeuEspacoDesktopProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onReschedule?: (sessionId: string, pillar: string) => void;
    onRebookSession?: (sessionTitle: string) => void;
    setIsQuestionnaireActive?: (active: boolean) => void;
}

export function MeuEspacoDesktop({ activeTab, setActiveTab, onReschedule, setIsQuestionnaireActive }: MeuEspacoDesktopProps) {
    const { t } = useLanguage();
    const { upcomingBookings, pastBookings, cancelBooking } = useBookings();
    const { moodHistory: realMoodHistory } = useMood();
    const { notifications: realNotifications } = useNotifications();

    const [showRatingPage, setShowRatingPage] = useState(false);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [modalSession, setModalSession] = useState<any>(null);
    const [showWaitPopup, setShowWaitPopup] = useState(false);
    const [showSessionHistory, setShowSessionHistory] = useState(false);
    const [showMoodHistory, setShowMoodHistory] = useState(false);
    const [showNotificationHistory, setShowNotificationHistory] = useState(false);

    // Helper for Pillar Labels
    const getPillarLabel = (pillar: string | undefined | null) => {
        if (!pillar) return 'Saúde';
        const p = pillar.toUpperCase();
        if (p === 'PSYCH' || p === 'MENTAL' || p.includes('MEN')) return 'Saúde Mental';
        if (p === 'PHYSICAL' || p === 'FISICO' || p.includes('FIS')) return 'Bem-estar Físico';
        if (p === 'FINANCIAL' || p === 'FINANCEIRA' || p.includes('FIN')) return 'Consultoria Financeira';
        if (p === 'LEGAL' || p === 'JURIDICA' || p.includes('JUR')) return 'Consultoria Jurídica';
        return pillar; // Fallback
    };

    // Helper for Emojis
    const getPillarEmoji = (pillar: string | undefined | null) => {
        const p = (pillar || '').toUpperCase();
        if (p === 'PSYCH' || p.includes('MEN') || p.includes('SAúDE MENTAL')) return '🧠';
        if (p === 'PHYSICAL' || p.includes('FIS') || p.includes('BEM-ESTAR FíSICO')) return '💪';
        if (p === 'FINANCIAL' || p.includes('FIN')) return '💰';
        if (p === 'LEGAL' || p.includes('JUR')) return '⚖️';
        return '📅';
    };

    // Map real data to display structures
    const upcomingSessionsList = upcomingBookings.map(b => ({
        id: b.id,
        title: `Sessão de ${getPillarLabel(b.primary_pillar || b.pillar)}`,
        type: (b.primary_pillar || b.pillar || '').toLowerCase(),
        date: b.booking_date,
        time: b.start_time?.slice(0, 5),
        specialist: b.specialist?.profile?.full_name || 'Especialista',
        mode: b.meeting_type === 'video' ? 'Videochamada' : 'Presencial',
        emoji: getPillarEmoji(b.primary_pillar || b.pillar),
        meetingLink: b.meeting_link || null
    }));

    const sessionHistoryList = [...pastBookings]
        .sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())
        .slice(0, 3)
        .map(b => ({
            id: b.id,
            title: `Sessão de ${getPillarLabel(b.primary_pillar || b.pillar)}`,
            date: b.booking_date,
            specialist: b.specialist?.profile?.full_name || 'Especialista',
            rating: b.feedback?.overall_rating || 0,
            hasRated: !!b.feedback
        }));

    const moodHistoryList = realMoodHistory.slice(0, 3).map(m => ({
        date: new Date(m.timestamp).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' }),
        mood: (m.selectedMoodIndex || 0) + 1,
        emoji: ['🙁', '😡', '😐', '🙂', '😄', '🤩'][m.selectedMoodIndex || 0] || '😐'
    }));

    const notifications = (realNotifications || []).slice(0, 3).map((n: any) => ({
        id: n.id,
        message: n.message || n.title || 'Nova notificação',
        time: new Date(n.created_at || new Date()).toLocaleDateString('pt-PT'),
        unread: !n.read
    }));

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
        if (modalSession && onReschedule) {
            // Pass the session ID and derived pillar type
            onReschedule(modalSession.id, modalSession.type || 'mental');
        }
    };

    const handleCancelSession = async () => {
        if (!modalSession) return;

        try {
            console.log('Attempting to cancel session:', modalSession.id);
            const result = await cancelBooking(modalSession.id);

            if (result.success) {
                setShowSessionModal(false);
                showSuccessToast('Sessão cancelada', 'A sua sessão foi cancelada com sucesso.', { duration: 3000 });
            } else {
                console.error('Cancel failed result:', result);
                showSuccessToast('Erro ao cancelar', result.error || 'Não foi possível cancelar a sessão.', { duration: 3000, type: 'error' });
            }
        } catch (error) {
            console.error('Cancel failed exception:', error);
            showSuccessToast('Erro ao cancelar', 'Ocorreu um erro inesperado.', { duration: 3000, type: 'error' });
        }
    };

    if (showRatingPage && selectedSession) {
        return (
            <SessionRatingPage
                session={selectedSession}
                onBack={() => {
                    setShowRatingPage(false);
                    setSelectedSession(null);
                }}
            />
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#e8f4f8] to-[#b8e1f0] h-screen overflow-hidden flex flex-col font-['Inter',sans-serif]">
            {/* Top Nav (not in inspo originally but required for integration) */}
            <DesktopTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Header */}
            <section className="px-[120px] py-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[28px] text-[#1a1a1a] font-['Pacifico',sans-serif] tracking-[0.0703px]">
                            Meu Espaço
                        </h1>
                        <p className="text-[13px] text-gray-600 mt-0.5">
                            Acompanhe o seu progresso e sessões agendadas
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Dashboard Grid */}
            <section className="px-[120px] pb-3 flex-1 overflow-auto custom-scrollbar">
                {/* Row 1: Upcoming Sessions + Mood History */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                    {/* Upcoming Sessions - 2 cols */}
                    <div className="col-span-2 bg-gradient-to-br from-[#9dbfd4]/40 to-[#9dbfd4]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-[#003b8d]" />
                            <h2 className="text-[18px] font-semibold text-gray-800">Próximas Sessões</h2>
                        </div>
                        <div className="space-y-2.5">
                            {upcomingSessionsList.length > 0 ? (
                                upcomingSessionsList.map((session: any) => (
                                    <div
                                        key={session.id}
                                        className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[24px]">
                                                {session.emoji}
                                            </div>
                                            <div>
                                                <p className="text-[16px] font-semibold text-gray-800">{session.title}</p>
                                                <div className="flex items-center gap-4 mt-1 text-[13px] text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(session.date).toLocaleDateString('pt-PT')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {session.time}
                                                    </span>
                                                    <span>{session.specialist}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEnterSession(session)}
                                            className="bg-black text-white px-6 py-2 rounded-full text-[14px] font-['Syne',sans-serif] font-bold hover:bg-gray-900 transition-colors"
                                        >
                                            Entrar
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center h-full text-gray-400 py-6">
                                    <Calendar className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Sem sessões agendadas</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mood History - 1 col */}
                    <div className="bg-gradient-to-br from-[#8BBEB8]/40 to-[#8BBEB8]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
                        <div
                            className="flex items-center justify-between mb-3 cursor-pointer group"
                            onClick={() => setShowMoodHistory(true)}
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-[#003b8d]" />
                                <h2 className="text-[18px] font-semibold text-gray-800 group-hover:text-[#003b8d] transition-colors">Humor</h2>
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-[#003b8d] flex items-center gap-1 transition-colors">
                                Ver mais <ChevronRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {moodHistoryList.map((entry: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                                    <span className="text-[14px] text-gray-600">{entry.date}</span>
                                    <span className="text-[24px]">{entry.emoji}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2: Session History + Notifications */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Session History - 2 cols */}
                    <div className="col-span-2 bg-gradient-to-br from-[#fcc066]/30 to-[#f5efe6]/50 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
                        <div
                            className="flex items-center justify-between mb-3 cursor-pointer group"
                            onClick={() => setShowSessionHistory(true)}
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#003b8d]" />
                                <h2 className="text-[18px] font-semibold text-gray-800 group-hover:text-[#003b8d] transition-colors">Histórico de Sessões</h2>
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-[#003b8d] flex items-center gap-1 transition-colors">
                                Ver mais <ChevronRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {sessionHistoryList.length > 0 ? (
                                sessionHistoryList.map((session: any) => (
                                    <div
                                        key={session.id}
                                        className="bg-white/90 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
                                    >
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-[15px] font-bold text-gray-900 mb-1">{session.title}</p>
                                                <p className="text-[13px] text-gray-500">{new Date(session.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</p>
                                            </div>
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-[12px] text-gray-600 mb-2">{session.specialist}</p>
                                                {session.hasRated ? (
                                                    <div className="flex gap-1 justify-center py-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-5 h-5 ${i < session.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRateSession(session)}
                                                        className="w-full bg-[#003b8d] text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#002a66] transition-colors"
                                                    >
                                                        Avaliar Sessão
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center p-8 text-gray-400">
                                    <Clock className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Ainda não tem histórico de sessões</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notifications - 1 col */}
                    <div className="bg-gradient-to-br from-[#D8A4C4]/40 to-[#D8A4C4]/10 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
                        <div
                            className="flex items-center justify-between mb-3 cursor-pointer group"
                            onClick={() => setShowNotificationHistory(true)}
                        >
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4 text-[#003b8d]" />
                                <h2 className="text-[18px] font-semibold text-gray-800 group-hover:text-[#003b8d] transition-colors">Notificações</h2>
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-[#003b8d] flex items-center gap-1 transition-colors">
                                Ver mais <ChevronRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="space-y-2">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div key={notification.id} className={`p-3 rounded-xl ${notification.unread ? 'bg-white/80' : 'bg-white/50'}`}>
                                        <p className="text-[13px] text-gray-800 mb-0.5">{notification.message}</p>
                                        <span className="text-[11px] text-gray-500">{notification.time}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-gray-500 text-xs">
                                    Sem notificações
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* History Modals */}
            {showSessionHistory && <SessionHistoryModal onClose={() => setShowSessionHistory(false)} onRateSession={handleRateSession} />}
            {showMoodHistory && <MoodHistoryModal onClose={() => setShowMoodHistory(false)} />}
            {showNotificationHistory && <NotificationHistoryModal onClose={() => setShowNotificationHistory(false)} />}

            {/* Session Details Modal */}
            {
                showSessionModal && modalSession && (
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
                                <h2 className="text-[26px] font-['Syne',sans-serif] font-semibold text-white tracking-[-0.3125px]">
                                    Próximas Sessões
                                </h2>
                            </div>

                            {/* Session Details */}
                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[24px]">
                                        {modalSession.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[22px] text-white font-semibold mb-2">{modalSession.title}</h3>
                                        <div className="space-y-2 text-white/90">
                                            <p className="flex items-center gap-2 text-[14px]">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(modalSession.date).toLocaleDateString('pt-PT', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="flex items-center gap-2 text-[14px]">
                                                <Clock className="w-4 h-4" />
                                                {modalSession.time}
                                            </p>
                                            <p className="text-[14px]">
                                                <span className="font-semibold">Especialista:</span> {modalSession.specialist}
                                            </p>
                                            <p className="text-[14px]">
                                                <span className="font-semibold">Modalidade:</span> {modalSession.mode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 mt-8">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleRescheduleFromModal}
                                            className="flex-1 bg-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
                                        >
                                            Reagendar
                                        </button>
                                        {modalSession.meetingLink ? (
                                            <a
                                                href={modalSession.meetingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setShowSessionModal(false)}
                                                className="flex-1 bg-white text-[#0B74A5] px-6 py-3 rounded-xl font-['Syne',sans-serif] font-bold hover:bg-gray-100 transition-colors text-center"
                                            >
                                                Iniciar Sessão
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => setShowWaitPopup(true)}
                                                className="flex-1 bg-white text-[#0B74A5] px-6 py-3 rounded-xl font-['Syne',sans-serif] font-bold hover:bg-gray-100 transition-colors"
                                            >
                                                Iniciar Sessão
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleCancelSession}
                                        className="w-full bg-[#ef4444] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#dc2626] transition-colors shadow-sm"
                                    >
                                        Cancelar Sessão
                                    </button>
                                </div>

                                {/* Wait Popup (Link not available) */}
                                {showWaitPopup && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50">
                                        <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full border border-gray-100">
                                            <div className="text-center space-y-4">
                                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                                    <Clock className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-gray-900 font-semibold text-lg">Aguarde um momento</h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        Por favor, aguarde até que o link para participar na sessão esteja disponível.
                                                    </p>
                                                </div>
                                                <button
                                                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
                                                    onClick={() => setShowWaitPopup(false)}
                                                >
                                                    Entendido
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
