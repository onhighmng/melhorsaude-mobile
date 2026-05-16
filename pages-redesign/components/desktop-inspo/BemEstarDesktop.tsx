import imgMaskGroup from "@/assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "@/assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "@/assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "@/assets/897f25666b2976f6467a21346375bb9753e57911.png";
import image_a174d87219c1bc18dc7f9d27ae4aa115aa854e1a from '@/assets/a174d87219c1bc18dc7f9d27ae4aa115aa854e1a.png';
import { useState, useEffect } from 'react';
import { Questionnaire } from './Questionnaire';
import { SessionBooking } from './SessionBooking';
import { questionnaireData } from '@/data/questionnaireData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMood } from '@/contexts/MoodContext';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { showSuccessToast } from '@/utils/inspoToast';
import { Phone, Loader2 } from 'lucide-react';
import { DesktopTopNav } from './DesktopTopNav';
import { getPillarName } from '@/lib/pillarUtils';
import { useBookings } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';


interface BemEstarDesktopProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setIsQuestionnaireActive: (active: boolean) => void;
    initialPillar?: 'mental' | 'fisico' | 'financeira' | 'juridica' | null;
    skipToBooking?: boolean;
    rescheduleSessionId?: string | null;
    onBookingComplete?: () => void;
}

const moodEmojis = [
    { emoji: '🙁', label: 'Muito Triste', value: 'very-sad' },
    { emoji: '😡', label: 'Zangado', value: 'angry' },
    { emoji: '😐', label: 'Neutro', value: 'neutral' },
    { emoji: '😊', label: 'Feliz', value: 'happy' },
    { emoji: '😃', label: 'Muito Feliz', value: 'very-happy' },
];

export function BemEstarDesktop({
    activeTab,
    setActiveTab,
    setIsQuestionnaireActive,
    initialPillar = null,
    skipToBooking = false,
    rescheduleSessionId = null,
    onBookingComplete
}: BemEstarDesktopProps) {
    const { t } = useLanguage();
    const { moodHistory, addMoodEntry } = useMood();
    const { upcomingBookings, createBooking } = useBookings();
    const [callLoading, setCallLoading] = useState(false);
    const { profile } = useAuth();

    const nextSession = upcomingBookings.length > 0 ? upcomingBookings[0] : null;

    const handleCallRequest = async () => {
        setCallLoading(true);
        try {
            const now = new Date();
            const bookingDate = now.toISOString().split('T')[0];
            const startTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            const result = await createBooking({
                specialist_id: null,
                booking_date: bookingDate,
                start_time: startTime,
                meeting_type: 'voice',
                primary_pillar: 'mental',
                metadata: {
                    request_type: 'urgent_call',
                    notes: 'Pedido de suporte imediato via dashboard Desktop (Suporte 24/7)'
                }
            });

            if (result.success) {
                showSuccessToast('Pedido Enviado', 'A nossa equipa entrará em contacto consigo em breve.', { duration: 5000 });
            } else {
                console.error(result.error);
                // toast.error(result.error || 'Erro ao solicitar chamada.');
            }
        } catch (error) {
            console.error('Error requesting urgent call:', error);
        } finally {
            setCallLoading(false);
        }
    };
    // Note: useMood might not expose 'selectedMood' directly if we only copied the Context provider I wrote earlier. 
    // Let's check MoodContext again. I wrote selectedMoodIndex in MoodEntry.
    // The inspo BemEstarDesktop uses `selectedMood` state from useMood? 
    // My MoodContext implementation has `addMoodEntry` but didn't export `selectedMood` state in the Provider value.
    // I should probably manage local selectedMood state here for visual feedback if it's not in global context.

    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    // Initialize selectedMood from history for today
    useEffect(() => {
        if (moodHistory.length > 0) {
            const today = new Date();
            const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

            // Find entry for today
            const todayEntry = moodHistory.find(entry => entry.date === todayStr);

            if (todayEntry) {
                // Map index back to mood value
                const indexToMood: Record<number, string> = {
                    0: 'very-sad', 1: 'angry', 2: 'neutral', 3: 'happy', 4: 'very-happy'
                };
                setSelectedMood(indexToMood[todayEntry.selectedMoodIndex] || null);
            }
        }
    }, [moodHistory]);

    const [activePillar, setActivePillar] = useState<'mental' | 'fisico' | 'financeira' | 'juridica' | null>(
        initialPillar
    );
    const [showBooking, setShowBooking] = useState(skipToBooking);

    // Sync state with props when they change (for Reagendar flow)
    useEffect(() => {
        if (skipToBooking && initialPillar) {
            setActivePillar(initialPillar);
            setShowBooking(true);
        }
    }, [skipToBooking, initialPillar]);

    // Map mood to index
    const moodToIndex: Record<string, number> = {
        'very-sad': 0,
        'angry': 1,
        'neutral': 2,
        'happy': 3,
        'very-happy': 4,
    };

    const handleMoodClick = async (moodValue: string) => {
        setSelectedMood(moodValue);
        const moodIndex = moodToIndex[moodValue];
        if (moodIndex !== undefined) {
            try {
                await addMoodEntry(moodIndex);
                showSuccessToast('Humor registado!', 'O seu humor foi guardado com sucesso.', { duration: 3000 });
            } catch (error) {
                console.error('Error saving mood:', error);
                // Optional: Show error toast here
            }
        }
    };

    // Show questionnaire or booking if active
    if (activePillar && !showBooking) {
        return (
            <Questionnaire
                pillarId={activePillar}
                questions={questionnaireData[activePillar]}
                onComplete={() => {
                    setShowBooking(true);
                    setIsQuestionnaireActive(false);
                }}
                onBack={() => {
                    setActivePillar(null);
                    setIsQuestionnaireActive(false);
                }}
            />
        );
    }

    if (showBooking && activePillar) {
        return (
            <SessionBooking
                pillarId={activePillar}
                rescheduleSessionId={rescheduleSessionId}
                onBack={() => {
                    setShowBooking(false);
                    setActivePillar(null);
                    onBookingComplete?.();
                }}
                onComplete={() => {
                    setShowBooking(false);
                    setActivePillar(null);
                    onBookingComplete?.();
                    setActiveTab('meu-espaco');
                }}
            />
        );
    }

    const handlePillarClick = (pillarId: 'mental' | 'fisico' | 'financeira' | 'juridica') => {
        setActivePillar(pillarId);
        setIsQuestionnaireActive(true);
    };

    return (
        <div className="bg-gradient-to-b from-[#e8f4f8] to-[#b8e1f0] h-screen overflow-hidden flex flex-col font-['Inter',sans-serif]">
            <DesktopTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="max-w-[1440px] mx-auto px-[120px] py-8">
                    {/* Greeting Section - Compact */}
                    <div className="mb-4">
                        <p className="text-[36px] text-[#1a1a1a] font-['Pacifico',sans-serif] tracking-[0.0703px]">
                            {(() => {
                                const hour = new Date().getHours();
                                let greeting = '';
                                if (hour >= 5 && hour < 12) greeting = 'Bom dia';
                                else if (hour >= 12 && hour < 19) greeting = 'Boa tarde';
                                else greeting = 'Boa noite';
                                const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Visitante';
                                return `${greeting}, ${firstName} 👋`;
                            })()}
                        </p>
                        <p className="font-['Source_Serif_Pro',serif] text-[18px] text-[#003b8d] tracking-[-0.9px]">
                            {t('bemEstar.tagline')}
                        </p>
                    </div>

                    {/* Hero Section - Compact with Proper Mood Alignment */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[320px] mb-6">
                        {/* Hero Image */}
                        <img
                            src={image_a174d87219c1bc18dc7f9d27ae4aa115aa854e1a}
                            alt="Wellness Hero"
                            className="w-full h-full object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

                        {/* Overlaid Content */}
                        <div className="absolute inset-0 flex items-center justify-between px-16">
                            {/* Left Side: Mood Tracker */}
                            <div className="flex flex-col items-start justify-center">
                                {/* Mood Question with Shimmer */}
                                <TextShimmer
                                    duration={1.5}
                                    className="text-[28px] font-['Source_Serif_Pro',serif] font-semibold text-white mb-6 max-w-[400px] [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.gray.300)]"
                                >
                                    {t('bemEstar.subtitle')}
                                </TextShimmer>

                                {/* Mood Emoji Buttons - Horizontal Line */}
                                <div className="flex gap-8 items-center">
                                    {moodEmojis.map((mood) => (
                                        <button
                                            key={mood.value}
                                            onClick={() => handleMoodClick(mood.value)}
                                            className={`flex items-center justify-center size-[80px] rounded-full transition-all ${selectedMood === mood.value
                                                ? 'bg-white ring-4 ring-[#007AFF] scale-110'
                                                : 'bg-white/90 hover:scale-105 hover:bg-white'
                                                }`}
                                        >
                                            <span className="text-[40px]">{mood.emoji}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Upcoming Session Preview */}
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 min-w-[320px]">
                                <div className="text-white/80 text-sm font-['Poppins',sans-serif] mb-3">
                                    Próxima Sessão
                                </div>
                                {nextSession ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-white font-['Poppins',sans-serif] font-semibold text-lg">
                                                {nextSession.specialist?.profile?.full_name || 'Especialista'}
                                            </div>
                                            <div className="text-white/90 font-['Poppins',sans-serif] text-sm capitalize">
                                                {getPillarName(nextSession.primary_pillar || 'Bem-estar')}
                                            </div>
                                            <div className="text-white/80 font-['Poppins',sans-serif] text-sm">
                                                {new Date(nextSession.booking_date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
                                                {', '}
                                                {nextSession.start_time?.slice(0, 5)}
                                            </div>
                                        </div>

                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4 gap-2 opacity-80">
                                        <div className="text-white font-['Poppins',sans-serif] text-center text-sm">
                                            Sem sessões agendadas
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 24/7 Call Button - Bottom Right */}
                        <div className="absolute bottom-6 right-8">
                            <button
                                onClick={handleCallRequest}
                                disabled={callLoading}
                                className="bg-[#0B74A5] rounded-full px-6 py-3 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
                            >
                                <div className="flex items-center gap-2">
                                    {callLoading ? (
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    ) : (
                                        <Phone className="text-[24px] text-[rgb(255,252,252)]" fill="rgb(255,252,252)" strokeWidth={0} />
                                    )}
                                    <span className="text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] tracking-tight">24/7</span>
                                </div>
                                <div className="h-6 w-[1px] bg-white/20"></div>
                                <span className="text-white font-['Syne',sans-serif] font-bold text-[17px] tracking-tight">
                                    {callLoading ? 'A conectar...' : 'Clica e Conversa'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Wellness Pillars - 4 Cards Horizontal - Compact */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <h2 className="text-[28px] text-[#1a1a1a] font-['Pacifico',sans-serif] tracking-[0.0703px] mb-1">
                                {t('bemEstar.scheduleSession')}
                            </h2>
                            <p className="text-[14px] text-gray-600">
                                Escolha a área de bem-estar que deseja agendar
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-6 max-h-[280px]">
                            {/* Mental Health Card */}
                            <button
                                onClick={() => handlePillarClick('mental')}
                                className="group bg-gradient-to-b from-[#9dbfd4] to-[rgba(157,191,212,0.3)] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <p className="text-[15px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#2e2b29]">Saúde Mental</p>
                                        <p className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#3f3f3f] mt-1">Psicológico</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden">
                                        <img src={imgMaskGroup} alt="Mental Health" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </button>

                            {/* Physical Wellness Card */}
                            <button
                                onClick={() => handlePillarClick('fisico')}
                                className="group bg-gradient-to-b from-[#fcc066] via-[#f4b85d] to-[#f5efe6] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <p className="text-[15px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#2e2b29]">Bem-estar</p>
                                        <p className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#3f3f3f] mt-1">Físico</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden">
                                        <img src={imgMaskGroup1} alt="Physical Wellness" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </button>

                            {/* Financial Assistance Card */}
                            <button
                                onClick={() => handlePillarClick('financeira')}
                                className="group bg-gradient-to-b from-[#8BBEB8] to-[rgba(139,190,184,0.3)] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <p className="text-[15px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#2e2b29]">Assistência</p>
                                        <p className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#3f3f3f] mt-1">Financeira</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden">
                                        <img src={imgMaskGroup2} alt="Financial Assistance" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </button>

                            {/* Legal Assistance Card */}
                            <button
                                onClick={() => handlePillarClick('juridica')}
                                className="group bg-gradient-to-b from-[#D8A4C4] to-[rgba(216,164,196,0.3)] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <p className="text-[15px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#2e2b29]">Assistência</p>
                                        <p className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#3f3f3f] mt-1">Jurídica</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden">
                                        <img src={imgMaskGroup3} alt="Legal Assistance" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
