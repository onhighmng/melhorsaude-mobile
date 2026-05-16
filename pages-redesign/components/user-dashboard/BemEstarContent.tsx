import imgMaskGroup from "../../assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "../../assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "../../assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "../../assets/897f25666b2976f6467a21346375bb9753e57911.png";
import imgImage from "../../assets/e8e2ae6c59942b93027046047aa7be8c33ef123d.png";
import imgMelhorSaudeTransparentLogo1 from "../../assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "../../assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import { useState, useEffect } from 'react';
import { Questionnaire } from './Questionnaire';
import { SessionBooking } from './SessionBooking';
import { RequestCallModal } from './RequestCallModal';
import { questionnaireData } from './data/questionnaireData';
import { showSuccessToast, showCallToast } from './utils/toast';
import { Phone } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMood } from '@/contexts/MoodContext';

// --- Imports ---

import { useAuth } from '@/contexts/AuthContext';
import { useSpecialists } from '@/hooks/useSpecialists';
import { useBookings } from '@/hooks/useBookings';
// DISABLED: import from 'sonner';

interface BemEstarContentProps {
    setActiveTab: (tab: string) => void;
    setIsQuestionnaireActive: (active: boolean) => void;
    initialPillar?: 'mental' | 'fisico' | 'financeira' | 'juridica' | null;
    skipToBooking?: boolean;
    rescheduleSessionId?: string | null;
    onBookingComplete?: () => void;
}

// --- Components ---

function Heading() {
    const { t } = useLanguage();
    const { profile } = useAuth();

    // extract first name
    const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Visitante';

    // Determine time of day
    const getGreetingKey = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'bemEstar.greeting.morning';
        if (hour < 18) return 'bemEstar.greeting.afternoon';
        return 'bemEstar.greeting.evening';
    };

    return (
        <div className="w-full flex justify-between items-center mb-6 px-2">
            <div className="flex flex-col items-start">
                {/* Greeting - Line 1 */}
                <span className="font-pacifico text-[#1a1a1a] text-[24px] sm:text-[28px] leading-tight tracking-[0.07px] pl-1">
                    {t(getGreetingKey())},
                </span>

                {/* Name + Emoji - Line 2 */}
                <h1 className="font-pacifico text-[#1a1a1a] text-[32px] sm:text-[38px] leading-none tracking-[0.07px]">
                    {firstName} <span className="inline-block ml-1">👋</span>
                </h1>
            </div>
            {/* Logo - Maximum Size */}
            <div className="flex flex-col items-center justify-center w-[160px]">
                {/* Icon - Made Larger specifically */}
                <img alt="" className="w-16 h-16 object-contain mb-1" src={imgMelhorSaudeTransparentLogo1} />
                {/* Text */}
                <img alt="Melhor Saúde" className="w-full h-auto object-contain" src={imgMelhorSaudeTransparentClean1} />
            </div>
        </div>
    );
}

interface PillarCardProps {
    title: string;
    subtitle: string;
    gradientFrom: string;
    gradientTo: string; // Not strictly used for full gradient but generic bg style
    maskImage: string;
    onClick: () => void;
    viaColor?: string; // Optional via color for gradients
}

function PillarCard({ title, subtitle, gradientFrom, gradientTo, viaColor, maskImage, onClick }: PillarCardProps) {
    // Simplifying gradients for cleaner code, approximating original look
    const gradientStyle = viaColor
        ? `linear-gradient(to bottom, ${gradientFrom}, ${viaColor} 30%, ${gradientTo})`
        : `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`;

    return (
        <button
            onClick={onClick}
            className="relative w-full aspect-[156/173] rounded-[20px] overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-sm"
            style={{ background: gradientStyle }}
        >
            {/* Mask Image Layer */}
            <div className="absolute inset-0 top-[15%] left-[2%] w-[95%] h-[85%]">
                <img src={maskImage} alt="" className="w-full h-full object-cover object-center pointer-events-none" />
            </div>

            {/* Text Layer */}
            <div className="absolute top-4 w-full flex flex-col items-center justify-center pointer-events-none">
                <span className="font-plus-jakarta-sans font-semibold text-[#2e2b29] text-[15px] sm:text-[16px] text-center leading-tight">
                    {title}
                </span>
                <span className="font-plus-jakarta-sans font-normal text-[#3f3f3f] text-[11px] sm:text-[12px] text-center leading-tight mt-0.5">
                    {subtitle}
                </span>
            </div>
        </button>
    );
}

function MentalHealthCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <PillarCard
            title={t('bemEstar.mental')}
            subtitle={t('bemEstar.mentalSub')}
            gradientFrom="#9dbfd4"
            gradientTo="rgba(157,191,212,0)"
            maskImage={imgMaskGroup}
            onClick={onClick}
        />
    );
}

function PhysicalWellnessCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    // Split logic serves to break lines if needed, keeping simple here
    const title = t('bemEstar.physical').split(' ')[1] || 'Físico';
    const subtitle = t('bemEstar.physicalSub');

    return (
        <PillarCard
            title={title}
            subtitle={subtitle}
            gradientFrom="#fcc066"
            viaColor="#f4b85d"
            gradientTo="#f5efe6"
            maskImage={imgMaskGroup1}
            onClick={onClick}
        />
    );
}

function FinancialAssistanceCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    const title = t('bemEstar.financial').split(' ')[1] || 'Financeira';
    const subtitle = t('bemEstar.financial').split(' ')[0] || 'Assistência';

    return (
        <PillarCard
            title={title}
            subtitle={subtitle}
            gradientFrom="#8bbeb8"
            gradientTo="rgba(139,190,184,0)"
            maskImage={imgMaskGroup2}
            onClick={onClick}
        />
    );
}

function LegalAssistanceCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    const title = t('bemEstar.legal').split(' ')[1] || 'Jurídica';
    const subtitle = t('bemEstar.legal').split(' ')[0] || 'Assistência';

    return (
        <PillarCard
            title={title}
            subtitle={subtitle}
            gradientFrom="#d8a4c4"
            gradientTo="rgba(216,164,196,0)"
            maskImage={imgMaskGroup3}
            onClick={onClick}
        />
    );
}


function MoodTrackerOverlay({ selectedMood, setSelectedMood }: { selectedMood: string | null; setSelectedMood: (mood: string | null) => void }) {
    const { t } = useLanguage();
    const { addMoodEntry } = useMood();

    const moodToIndex: Record<string, number> = {
        'very-sad': 0, 'angry': 1, 'neutral': 2, 'happy': 3, 'very-happy': 4,
    };

    const handleMoodClick = (mood: string) => {
        setSelectedMood(mood);
        const moodIndex = moodToIndex[mood];
        if (moodIndex !== undefined) {
            addMoodEntry(moodIndex);
            showSuccessToast('Humor registado!', 'O seu humor foi guardado com sucesso.', { duration: 3000 });
        }
    };

    return (
        <div className="flex flex-col w-full h-full pt-4 px-6 relative z-10 justify-start gap-2">
            {/* Subtitle - Centered Top */}
            <div className="w-full text-center mb-1">
                <h2 className="font-source-serif-pro font-semibold text-[24px] sm:text-[26px] leading-tight text-white drop-shadow-md whitespace-nowrap">
                    {t('bemEstar.subtitle')}
                </h2>
            </div>

            {/* Mood Buttons Container - Grid Layout for Strict Alignment */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-2 w-full mt-1 place-items-center">
                {/* Top Row */}
                <div className="col-span-1 flex justify-center w-full">
                    <MoodButton emoji="🙁" mood="very-sad" bg="bg-[#dbeafe]" selected={selectedMood} onClick={handleMoodClick} />
                </div>
                <div className="col-span-1 flex justify-center w-full">
                    <MoodButton emoji="😡" mood="angry" bg="bg-[#ffe2e2]" selected={selectedMood} onClick={handleMoodClick} />
                </div>
                <div className="col-span-1 flex justify-center w-full">
                    <MoodButton emoji="😐" mood="neutral" bg="bg-[#f3f4f6]" selected={selectedMood} onClick={handleMoodClick} />
                </div>

                {/* Bottom Row - Aligned with Col 2 (Middle) and Col 3 (Right) */}
                <div className="col-start-2 flex justify-center w-full">
                    <MoodButton emoji="😊" mood="happy" bg="bg-[#fef9c2]" selected={selectedMood} onClick={handleMoodClick} />
                </div>
                <div className="col-start-3 flex justify-center w-full">
                    <MoodButton emoji="😃" mood="very-happy" bg="bg-[#fff085]" selected={selectedMood} onClick={handleMoodClick} />
                </div>
            </div>
        </div>
    );
}

function MoodButton({ emoji, mood, bg, selected, onClick }: { emoji: string, mood: string, bg: string, selected: string | null, onClick: (m: string) => void }) {
    const isSelected = selected === mood;
    return (
        <button
            onClick={() => onClick(mood)}
            className={clsx(
                "w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full flex items-center justify-center text-[28px] sm:text-[32px] shadow-sm transition-all hover:scale-110 border-2 border-white/50 backdrop-blur-sm",
                bg,
                isSelected && "ring-4 ring-white scale-110"
            )}
        >
            {emoji}
        </button>
    );
}

function MoodBoardHero({ selectedMood, setSelectedMood, onSupportClick }: { selectedMood: string | null; setSelectedMood: (mood: string | null) => void; onSupportClick: () => void }) {
    return (
        <div className="relative w-full aspect-[356/280] sm:aspect-[356/260] rounded-[32px] overflow-hidden shadow-lg mx-auto bg-transparent">
            {/* Background Image - Z-0 covers everything */}
            <div className="absolute inset-0 z-0 bg-[#dbeafe]">
                <img src={imgImage} alt="Sky Background" className="w-full h-full object-cover" />
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Mood Content - Z-10 */}
            <MoodTrackerOverlay selectedMood={selectedMood} setSelectedMood={setSelectedMood} />

            {/* Support Button - Z-20 - Corner Overlay */}
            {/* OPAQUE with EXACT Rounded Shape */}
            <div className="absolute bottom-0 left-0 w-[46%] h-[92px] z-20">
                <button
                    onClick={onSupportClick}
                    className="w-full h-full bg-[#0046a2] rounded-tr-[56px] flex flex-row items-center justify-center shadow-lg hover:bg-[#003a8a] transition-all relative overflow-hidden group pl-2 pr-1"
                >
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />

                    {/* Icon - Transparent Background */}
                    <div className="relative w-[32px] h-[32px] mr-3 shrink-0 bg-transparent flex items-center justify-center">
                        <Phone className="w-8 h-8 text-white fill-current" strokeWidth={2.5} />
                        <div className="absolute -top-1 -right-2 bg-[#dbeafe] text-[#0046a2] text-[9px] font-black px-1 rounded-sm border border-white leading-tight scale-75 shadow-sm">
                            24/7
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center leading-none -space-y-0.5">
                        <span className="text-white text-[13px] font-extrabold whitespace-nowrap">Clica e</span>
                        <span className="text-white text-[13px] font-extrabold whitespace-nowrap">Conversa</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

// --- Main Layout Component ---

function BemEstarLayout({ selectedMood, setSelectedMood, onCardClick, onSupportClick }: {
    selectedMood: string | null;
    setSelectedMood: (mood: string | null) => void;
    onCardClick: (pillarId: string) => void;
    onSupportClick: () => void
}) {
    return (
        <div className="relative w-full max-w-lg mx-auto flex flex-col gap-6 pb-32">
            {/* Top Header */}
            <Heading />

            {/* Hero Section (Banner + Moods) */}
            <div className="px-2 w-full">
                <MoodBoardHero selectedMood={selectedMood} setSelectedMood={setSelectedMood} onSupportClick={onSupportClick} />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full px-2">
                <MentalHealthCard onClick={() => onCardClick('mental')} />
                <PhysicalWellnessCard onClick={() => onCardClick('fisico')} />
                <FinancialAssistanceCard onClick={() => onCardClick('financeira')} />
                <LegalAssistanceCard onClick={() => onCardClick('juridica')} />
            </div>

            {/* Slogan - Restored */}
            <div className="w-full text-center mt-4 mb-2 px-4 opacity-90">
                <p className="font-source-serif-pro text-[#003b8d] text-[20px] sm:text-[24px] leading-tight tracking-tight">
                    Cuidar das pessoas, transforma empresas
                </p>
            </div>

        </div>
    );
}

export function BemEstarContent({ setActiveTab, setIsQuestionnaireActive, initialPillar, skipToBooking, rescheduleSessionId, onBookingComplete }: BemEstarContentProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [activePillar, setActivePillar] = useState<string | null>(initialPillar || null);
    const [showBooking, setShowBooking] = useState(skipToBooking || false);
    const [showRequestCallModal, setShowRequestCallModal] = useState(false);
    const [isRequestingCall, setIsRequestingCall] = useState(false);

    const { moodHistory } = useMood();

    // Initialize selectedMood from history for today
    useEffect(() => {
        if (moodHistory.length > 0) {
            const today = new Date();
            const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

            const todayEntry = moodHistory.find(entry => entry.date === todayStr);

            if (todayEntry) {
                const indexToMood: Record<number, string> = {
                    0: 'very-sad', 1: 'angry', 2: 'neutral', 3: 'happy', 4: 'very-happy'
                };
                setSelectedMood(indexToMood[todayEntry.selectedMoodIndex] || null);
            }
        }
    }, [moodHistory]);

    const { createBooking, rescheduleBooking } = useBookings();

    const { specialists } = useSpecialists();

    const getSpecialistForPillar = (pillar: string) => {
        if (!specialists.length) return null;

        const normalized = pillar.toLowerCase();
        let targetPillarCode = '';

        if (normalized.includes('mental')) targetPillarCode = 'mental';
        else if (normalized.includes('físic') || normalized.includes('fisico')) targetPillarCode = 'fisico';
        else if (normalized.includes('financ')) targetPillarCode = 'financeira';
        else if (normalized.includes('juríd') || normalized.includes('legal')) targetPillarCode = 'juridica';

        // Find matches
        const matches = specialists.filter(s =>
            s.is_active !== false && // Default to true if null/undefined, or explicitly true
            s.specialist_pillars?.some((sp: any) => sp.pillar_code === targetPillarCode || sp.pillar_code === pillar)
        );

        if (matches.length > 0) {
            // True Round Robin (LRU - Least Recently Used)
            // 1. Shuffle to break absolute ties (e.g. multiple people never booked)
            const shuffled = [...matches].sort(() => Math.random() - 0.5);

            // 2. Sort by Last Assigned Date (Ascending = Oldest First)
            // Those who haven't been booked for the longest time (or ever) go to the top.
            const sorted = shuffled.sort((a: any, b: any) => {
                const timeA = a.last_assigned_at ? new Date(a.last_assigned_at).getTime() : 0;
                const timeB = b.last_assigned_at ? new Date(b.last_assigned_at).getTime() : 0;
                return timeA - timeB;
            });

            return sorted[0];
        }

        // Strict Mode: If no specialist matches the requested pillar, return null.
        // Do NOT fallback to a random specialist from another category.
        return null;
    };

    const assignedSpecialist = activePillar ? getSpecialistForPillar(activePillar) : null;
    // Fallback UUID if no specialist found (prevents 22P02 error, but might return no slots)
    const validSpecialistId = assignedSpecialist?.id || '00000000-0000-0000-0000-000000000000';
    const validSpecialistName = assignedSpecialist?.profile?.full_name || 'Especialista da Rede';

    useEffect(() => {
        if (initialPillar) setActivePillar(initialPillar);
        if (skipToBooking) {
            setShowBooking(true);
            setIsQuestionnaireActive(true);
        }
    }, [initialPillar, skipToBooking, setIsQuestionnaireActive]);

    // Removed useEffect for `activePillar` sync to avoid double-render loop.
    // Instead, we update the parent state directly in the handlers below.

    const handleUrgentCallRequest = async () => {
        setIsRequestingCall(true);

        try {
            // Find a specialist suitable for urgent mental health support (or default)
            const specialist = getSpecialistForPillar('mental');
            const targetSpecialistId = specialist?.id || validSpecialistId;

            const now = new Date();
            const bookingDate = now.toISOString().split('T')[0];
            const startTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            const result = await createBooking({
                specialist_id: null, // Assign to pool (unassigned) so any specialist can see it via RLS
                booking_date: bookingDate,
                start_time: startTime,
                meeting_type: 'voice',
                primary_pillar: 'mental',
                metadata: {
                    request_type: 'urgent_call',
                    notes: 'Pedido de suporte imediato via dashboard (Suporte 24/7)'
                }
            });

            if (result.success) {
                setShowRequestCallModal(false);
                showSuccessToast('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
            } else {
                toast.error(result.error || 'Erro ao solicitar chamada.');
            }
        } catch (error) {
            console.error('Error requesting urgent call:', error);
            toast.error('Ocorreu um erro ao processar o seu pedido.');
        } finally {
            setIsRequestingCall(false);
        }
    };

    // Unified Render with Keep-Alive for Home Layout
    const pillarData = activePillar ? questionnaireData[activePillar] : null;

    return (
        <>
            {/* HOME LAYOUT - Kept alive (hidden) when sub-pages are active */}
            <div className={`bg-gradient-to-b from-[#e8f4f8] to-[#b8e1f0] min-h-screen w-full px-4 pt-6 overflow-x-hidden ${activePillar ? 'hidden' : 'block'}`}>
                <BemEstarLayout
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    onCardClick={(pillarId) => {
                        setActivePillar(pillarId);
                        setIsQuestionnaireActive(true);
                    }}
                    onSupportClick={() => setShowRequestCallModal(true)}
                />

                {showRequestCallModal && (
                    <RequestCallModal
                        onClose={() => setShowRequestCallModal(false)}
                        onConfirm={handleUrgentCallRequest}
                        isLoading={isRequestingCall}
                    />
                )}
            </div>

            {/* SUB-PAGES - Rendered conditionally as siblings */}
            {activePillar && pillarData && !showBooking && (
                <Questionnaire
                    pillarTitle={pillarData.title}
                    pillarColor={pillarData.color}
                    questions={pillarData.questions}
                    onBack={() => {
                        setActivePillar(null);
                        setIsQuestionnaireActive(false);
                    }}
                    onComplete={(answers) => {
                        console.log('Questionnaire completed:', answers);
                        setShowBooking(true);
                    }}
                />
            )}

            {activePillar && pillarData && showBooking && (
                <SessionBooking
                    pillarTitle={pillarData.title}
                    pillarColor={pillarData.color}
                    specialistName={validSpecialistName}
                    specialistId={validSpecialistId}
                    onBack={() => {
                        setShowBooking(false);
                        // Optional: if going back from booking to questionnaire, keep parent active
                        // setIsQuestionnaireActive(true); 
                    }}
                    onConfirm={async (bookingDetails) => {
                        const toastId = toast.loading(rescheduleSessionId ? 'Reagendando sessão...' : 'Agendando sessão...');

                        let result;

                        if (rescheduleSessionId) {
                            result = await rescheduleBooking(
                                rescheduleSessionId,
                                bookingDetails.date,
                                bookingDetails.time,
                                bookingDetails.sessionType,
                                validSpecialistId,
                                activePillar || 'geral'
                            );
                        } else {
                            result = await createBooking({
                                specialist_id: validSpecialistId,
                                booking_date: bookingDetails.date,
                                start_time: bookingDetails.time,
                                meeting_type: bookingDetails.sessionType,
                                primary_pillar: activePillar || 'geral',
                            });
                        }

                        toast.dismiss(toastId);

                        if (result.success) {
                            setShowBooking(false);
                            setActivePillar(null);
                            setIsQuestionnaireActive(false); // Reset parent state
                            setActiveTab('meu-espaco');
                            showSuccessToast(
                                rescheduleSessionId ? 'Reagendamento confirmado!' : 'Marcação confirmada!',
                                rescheduleSessionId ? 'A sua sessão foi reagendada com sucesso.' : 'A sua sessão foi agendada com sucesso. Consulte os detalhes em Meu Espaço.',
                                { duration: 5000 }
                            );
                            if (onBookingComplete) onBookingComplete();
                        } else {
                            toast.error(result.error || 'Erro ao criar agendamento.');
                        }
                    }}
                />
            )}
        </>
    );

}

export { BemEstarContent as default };
