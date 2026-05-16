import { useEffect, useState } from 'react';
import ProximasSessoesCard, { SessionInfo } from '../../imports/Frame2147239064';
import RecursosCard from '../../imports/Frame2147239066';
import ProductsCard from '../../imports/Frame2147239068';
import imgMelhorSaudeTransparentLogo1 from "../../assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "../../assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useBookings } from '@/hooks/useBookings';
import { MoodHistoryPage } from '@/components/user-dashboard/MoodHistoryPage';
import { SessionRatingPage } from '@/components/user-dashboard/SessionRatingPage';
import { RecursosPage } from './RecursosPage';
import { getPillarName, getPillarIcon, getPillarColorClass } from '@/lib/pillarUtils';

interface MeuEspacoContentProps {
    setActiveTab: (tab: string) => void;
    onRebookSession?: (sessionTitle: string) => void;
    setIsQuestionnaireActive?: (active: boolean) => void;
    onReschedule?: (sessionId: string, pillar: string) => void;
}

function Heading() {
    const { t } = useLanguage();
    return (
        <div className="w-full max-w-[233px]" data-name="Heading 1">
            <p className="font-['Pacifico',sans-serif] leading-[36px] not-italic text-[#1a1a1a] text-[36px] tracking-[0.0703px]">{t('meuEspaco.title')}</p>
        </div>
    );
}

function Header1() {
    return null;
}

function Frame() {
    return (
        <div className="absolute h-[43px] left-[4.01px] top-[12px] w-[280px]">
            <Header1 />
        </div>
    );
}

function MeuEspacoContainer({ onViewMoodHistory, onViewRateSessions, onViewRecursos, upcomingSessions, onReschedule }: {
    setActiveTab?: (tab: string) => void;
    onViewMoodHistory?: () => void;
    onViewRateSessions?: () => void;
    onViewRecursos?: () => void;
    upcomingSessions: SessionInfo[];
    onReschedule?: (sessionId: string, pillar: string) => void;
}) {
    return (
        <div className="relative w-full min-h-full flex flex-col items-center gap-6" data-name="Container">
            {/* Header Area */}
            <div className="w-full flex justify-between items-start mb-2 px-1">
                <Heading />
                {/* Melhor Saúde Logo - Updated to match Homepage */}
                <div className="flex flex-col items-center justify-center w-[160px]">
                    <img alt="" className="w-16 h-16 object-contain mb-1" src={imgMelhorSaudeTransparentLogo1} />
                    <img alt="Melhor Saúde" className="w-full h-auto object-contain" src={imgMelhorSaudeTransparentClean1} />
                </div>
            </div>

            {/* Content Stack */}
            <div className="w-full max-w-md flex flex-col gap-6">
                {/* Próximas Sessões Card */}
                <div className="w-full h-[345px]">
                    <ProximasSessoesCard
                        onReschedule={onReschedule}
                        sessions={upcomingSessions}
                    />
                </div>

                {/* Recursos Card */}
                <div className="w-full h-[209.5px] cursor-pointer">
                    <RecursosCard onClick={onViewRecursos} />
                </div>

                {/* Products Card */}
                <div className="w-full h-[211px]">
                    <ProductsCard
                        onMoodHistoryClick={onViewMoodHistory}
                        onRateSessionsClick={onViewRateSessions}
                    />
                </div>
            </div>

            <Frame />
        </div>
    );
}

export function MeuEspacoContent({ setActiveTab, setIsQuestionnaireActive, onReschedule }: MeuEspacoContentProps) {
    const { user } = useAuth();
    const [showMoodHistory, setShowMoodHistory] = useState(false);
    const [showRateSessions, setShowRateSessions] = useState(false);
    const [showRecursos, setShowRecursos] = useState(false);
    const [upcomingSessions, setUpcomingSessions] = useState<SessionInfo[]>([]);

    const { upcomingBookings } = useBookings();

    useEffect(() => {
        // Ensure navbar is visible when this page loads
        if (setIsQuestionnaireActive) {
            setIsQuestionnaireActive(false);
        }
    }, [setIsQuestionnaireActive]);

    // Map upcoming bookings to SessionInfo format
    useEffect(() => {
        if (upcomingBookings) {
            const mapped: SessionInfo[] = upcomingBookings
                .map((bg: any) => {
                    const pillarCode = bg.primary_pillar || 'general';

                    // Use centralized utils for mapping
                    const pillarName = getPillarName(pillarCode);
                    const icon = getPillarIcon(pillarCode);
                    const colorClass = getPillarColorClass(pillarCode);

                    return {
                        id: bg.id,
                        pillar: pillarName, // Pass formatted name directly
                        icon: icon,
                        bgColor: colorClass,
                        time: bg.start_time.slice(0, 5),
                        date: new Date(bg.booking_date).toLocaleDateString('pt-PT'),
                        meetingLink: bg.meeting_link,
                        doctor: bg.specialist?.profile?.full_name || 'Especialista',
                        type: bg.meeting_type === 'video' ? 'Videochamada' : bg.meeting_type === 'in_person' ? 'Presencial' : 'Chamada'
                    };
                });
            setUpcomingSessions(mapped);
        }
    }, [upcomingBookings]);


    if (showMoodHistory) {
        return <MoodHistoryPage onBack={() => setShowMoodHistory(false)} />;
    }

    if (showRateSessions) {
        return <SessionRatingPage onBack={() => setShowRateSessions(false)} />;
    }

    if (showRecursos) {
        return <RecursosPage onBack={() => setShowRecursos(false)} />;
    }

    return (
        <div className="bg-gradient-to-b flex flex-col from-[#e8f4f8] items-center pb-28 lg:pb-8 pt-6 px-4 relative w-full to-[#b8e1f0] min-h-full" data-name="MeuEspacoContent">
            <MeuEspacoContainer
                setActiveTab={setActiveTab}
                onViewMoodHistory={() => setShowMoodHistory(true)}
                onViewRateSessions={() => setShowRateSessions(true)}
                onViewRecursos={() => setShowRecursos(true)}
                upcomingSessions={upcomingSessions}
                onReschedule={onReschedule}
            />
        </div>
    );
}
