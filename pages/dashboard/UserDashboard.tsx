import { useState, useRef, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { BookingProvider } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { loadingAnimationConfig } from '@/components/LoadingAnimationConfig';
import { useBookings, BookingWithRelations } from '@/hooks/useBookings';
import { useLanguage } from '@/contexts/LanguageContext';
import { SessionRatingModal } from '@/components/user-dashboard/SessionRatingModal';

import { BemEstarContent } from '@/components/user-dashboard/BemEstarContent';
import { BemEstarDesktop } from '@/components/user-dashboard/BemEstarDesktop';
import { AssistenteVirtualContent } from '@/components/user-dashboard/AssistenteVirtualContent';
import { MeuEspacoContent } from '@/components/user-dashboard/MeuEspacoContent';
import { MeuEspacoDesktop } from '@/components/user-dashboard/MeuEspacoDesktop';
import { PerfilContent } from '@/components/user-dashboard/PerfilContent';
import { RecursosPage } from '@/components/user-dashboard/RecursosPage';
import { RecursosDesktop } from '@/components/user-dashboard/RecursosDesktop';
import { NotificationsPage } from '@/components/user-dashboard/NotificationsPage';
import { NotificationsDesktop } from '@/components/user-dashboard/NotificationsDesktop';
import { PulseHubPage } from '@/components/user-dashboard/PulseHubPage';
import { PulseCheckinFlow } from '@/components/user-dashboard/PulseCheckinFlow';
import { ProgressInsightsPage } from '@/components/user-dashboard/ProgressInsightsPage';
import { CareJourneysPage } from '@/components/user-dashboard/CareJourneysPage';
import { DesktopTopNav } from '@/components/user-dashboard/DesktopTopNav';
import { BottomNav } from '@/components/user-dashboard/BottomNav';

export default function UserDashboard() {
    const { loading, user, profile } = useAuth();
    const { pastBookings, rateSession } = useBookings();
    const { language, setLanguage, t } = useLanguage();
    
    const [activeTab, setActiveTab] = useState('bem-estar');
    const [isQuestionnaireActive, setIsQuestionnaireActive] = useState(false);
    const [selectedPillar, setSelectedPillar] = useState<'mental' | 'fisico' | 'financeira' | 'juridica' | null>(null);
    const [skipToBooking, setSkipToBooking] = useState(false);
    const [rescheduleSessionId, setRescheduleSessionId] = useState<string | null>(null);
    const [pulseFocus, setPulseFocus] = useState<'energy' | 'stress' | 'humor' | 'pulse' | undefined>(undefined);
    const [pulseScores, setPulseScores] = useState<{ energy: number; stress: number; humor: number }>({ energy: 4, stress: 2, humor: 4 });
    const [ratingSession, setRatingSession] = useState<BookingWithRelations | null>(null);

    const hasSyncedRef = useRef(false);

    // Sync language from profile on load
    useEffect(() => {
        if (!hasSyncedRef.current && profile?.language && (profile.language === 'pt' || profile.language === 'en')) {
            if (profile.language !== language) {
                setLanguage(profile.language as 'pt' | 'en');
            }
            hasSyncedRef.current = true;
        }
    }, [profile, language, setLanguage]);

    useEffect(() => {
        // Check for unrated completed sessions
        const unrated = pastBookings.find(b => (b.status as unknown as string) === 'completed' && !b.feedback);
        if (unrated) {
            setRatingSession(unrated);
        }
    }, [pastBookings]);

    const handleRebookSession = (sessionTitle: string) => {
        // Map session titles to pillar types if needed, but for now we'll just handle it as a reschedule/rebook
        setActiveTab('bem-estar');
        setSkipToBooking(true);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsQuestionnaireActive(false);
    };

    const renderMobileContent = () => {
        switch (activeTab) {
            case "bem-estar":
                return (
                    <BemEstarContent
                        setActiveTab={setActiveTab}
                        setIsQuestionnaireActive={setIsQuestionnaireActive}
                        initialPillar={selectedPillar}
                        skipToBooking={skipToBooking}
                        rescheduleSessionId={rescheduleSessionId}
                        onBookingComplete={() => {
                            setSelectedPillar(null);
                            setSkipToBooking(false);
                            setRescheduleSessionId(null);
                        }}
                        setPulseFocus={setPulseFocus}
                    />
                );
            case "assistente":
                return <AssistenteVirtualContent setActiveTab={setActiveTab} />;
            case "meu-espaco":
                return (
                    <MeuEspacoContent
                        setActiveTab={setActiveTab}
                        onRebookSession={handleRebookSession}
                        setIsQuestionnaireActive={setIsQuestionnaireActive}
                    />
                );
            case "perfil":
                return <PerfilContent setActiveTab={setActiveTab} />;
            case "recursos":
                return <RecursosPage setActiveTab={setActiveTab} />;
            case "notifications":
                return <NotificationsPage setActiveTab={setActiveTab} setPulseFocus={setPulseFocus} />;
            case "pulse-results":
                return <PulseHubPage onBack={() => { setActiveTab('bem-estar'); setPulseFocus(undefined); }} focusMetric={pulseFocus} scores={pulseScores} />;
            case "pulse-checkin":
                return (
                    <PulseCheckinFlow
                        onBack={() => setActiveTab('bem-estar')}
                        onComplete={(scores) => {
                            setPulseScores(scores);
                            setActiveTab('pulse-results');
                        }}
                    />
                );
            case "journeys":
                return <CareJourneysPage onBack={() => setActiveTab('bem-estar')} setActiveTab={setActiveTab} />;
            case "progress":
                return <ProgressInsightsPage onBack={() => setActiveTab('meu-espaco')} />;
            default:
                return <BemEstarContent setActiveTab={setActiveTab} setIsQuestionnaireActive={setIsQuestionnaireActive} setPulseFocus={setPulseFocus} />;
        }
    };

    const renderDesktopContent = () => {
        switch (activeTab) {
            case "bem-estar":
                return (
                    <BemEstarDesktop
                        setActiveTab={setActiveTab}
                        setIsQuestionnaireActive={setIsQuestionnaireActive}
                        initialPillar={selectedPillar}
                        skipToBooking={skipToBooking}
                        rescheduleSessionId={rescheduleSessionId}
                        onBookingComplete={() => {
                            setSelectedPillar(null);
                            setSkipToBooking(false);
                            setRescheduleSessionId(null);
                        }}
                        setPulseFocus={setPulseFocus}
                    />
                );
            case "assistente":
                return <AssistenteVirtualContent setActiveTab={setActiveTab} />;
            case "meu-espaco":
                return (
                    <MeuEspacoDesktop
                        setActiveTab={setActiveTab}
                        onRebookSession={handleRebookSession}
                        setIsQuestionnaireActive={setIsQuestionnaireActive}
                    />
                );
            case "perfil":
                return <PerfilContent setActiveTab={setActiveTab} />;
            case "recursos":
                return <RecursosDesktop setActiveTab={setActiveTab} />;
            case "notifications":
                return <NotificationsDesktop setActiveTab={setActiveTab} setPulseFocus={setPulseFocus} />;
            case "pulse-results":
                return <PulseHubPage onBack={() => { setActiveTab('bem-estar'); setPulseFocus(undefined); }} focusMetric={pulseFocus} scores={pulseScores} />;
            case "journeys":
                return <CareJourneysPage onBack={() => setActiveTab('bem-estar')} setActiveTab={setActiveTab} />;
            case "progress":
                return <ProgressInsightsPage onBack={() => setActiveTab('meu-espaco')} />;
            default:
                return <BemEstarDesktop setActiveTab={setActiveTab} setIsQuestionnaireActive={setIsQuestionnaireActive} onBookingComplete={() => {}} setPulseFocus={setPulseFocus} />;
        }
    };

    if (loading && !user) {
        return (
            <div className="w-full h-full flex items-center justify-center px-6">
                <LoadingAnimation
                    variant="inline"
                    message="A carregar o teu espaço..."
                    submessage="Estamos a preparar tudo para ti"
                    mascotSrc={loadingAnimationConfig.mascot}
                    wordmarkSrc={loadingAnimationConfig.wordmark}
                    primaryColor={loadingAnimationConfig.primaryColor}
                    textColor={loadingAnimationConfig.textColor}
                    showProgress
                />
            </div>
        );
    }

    return (
        <BookingProvider>
            <div className="h-screen w-full flex flex-col overflow-hidden font-inter" style={{ background: 'linear-gradient(to bottom, #e8f4f8, #b8e1f0)' }}>
                <Toaster position="top-center" />

                {/* Desktop Top Navigation */}
                <div className="hidden md:block">
                    <DesktopTopNav
                        activeTab={activeTab}
                        setActiveTab={handleTabChange}
                    />
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {/* Mobile Content */}
                    <div className="md:hidden h-full">
                        {renderMobileContent()}
                    </div>

                    {/* Desktop Content */}
                    <div className="hidden md:block h-full">
                        {renderDesktopContent()}
                    </div>
                </div>

                {/* Bottom Navigation - Mobile Only */}
                {!isQuestionnaireActive && (
                    <div className="md:hidden">
                        <BottomNav
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                )}

                {/* Session Rating Modal */}
                {ratingSession && (
                    <SessionRatingModal
                        booking={ratingSession}
                        onClose={() => setRatingSession(null)}
                        onSubmit={rateSession}
                    />
                )}
            </div>
        </BookingProvider>
    );
}
