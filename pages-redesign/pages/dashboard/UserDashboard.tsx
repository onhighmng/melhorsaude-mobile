import { useState, useRef, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { BottomNav } from '@/components/user-dashboard/BottomNav';
import { BookingProvider } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { loadingAnimationConfig } from '@/components/LoadingAnimationConfig';
import { useBookings, BookingWithRelations } from '@/hooks/useBookings';
import { useSpecialists } from '@/hooks/useSpecialists';
import { useLanguage } from '@/contexts/LanguageContext';
import { SessionRatingModal } from '@/components/user-dashboard/SessionRatingModal';

import { BemEstarContent } from '@/components/user-dashboard/BemEstarContent';
import { AssistenteVirtualContent } from '@/components/user-dashboard/AssistenteVirtualContent';
import { MeuEspacoContent } from '@/components/user-dashboard/MeuEspacoContent';
import { PerfilContent } from '@/components/user-dashboard/PerfilContent';


// Desktop Component Imports
import { BemEstarDesktop } from '@/components/desktop-inspo/BemEstarDesktop';
import { MeuEspacoDesktop } from '@/components/desktop-inspo/MeuEspacoDesktop';
import { RecursosDesktop } from '@/components/desktop-inspo/RecursosDesktop';
import { AssistenteVirtualContent as DesktopAssistente } from '@/components/desktop-inspo/AssistenteVirtualContent';
import { PerfilContent as DesktopPerfil } from '@/components/desktop-inspo/PerfilContent';

// Helper to conditionally show/hide - Defined OUTSIDE to prevent re-creation
const TabPanel = ({ id, activeTab, children }: { id: string, activeTab: string, children: React.ReactNode }) => (
    <div
        role="tabpanel"
        id={id}
        hidden={activeTab !== id}
        className={activeTab === id ? 'block h-full w-full' : 'hidden h-full w-full'}
    >
        {children}
    </div>
);


export default function UserDashboard() {
    const { loading, user, profile } = useAuth();
    const { pastBookings, rateSession } = useBookings();
    const { language, setLanguage } = useLanguage();

    const hasSyncedRef = useRef(false);

    // Sync language from profile on load - ONLY ONCE
    useEffect(() => {
        if (!hasSyncedRef.current && profile?.language && (profile.language === 'pt' || profile.language === 'en')) {
            if (profile.language !== language) {
                setLanguage(profile.language as 'pt' | 'en');
            }
            hasSyncedRef.current = true;
        }
    }, [profile, language, setLanguage]);

    // Reset sync flag if user changes
    useEffect(() => {
        hasSyncedRef.current = false;
    }, [user?.id]);

    // PERF: Prefetch specialists data immediately to avoid waterfall when tab switches
    useSpecialists();

    // IMAGE PRELOADING for Dashboard Assets
    useEffect(() => {
        const imagesToPreload = [
            "/src/assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png",
            "/src/assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png",
            "/src/assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png",
            "/src/assets/897f25666b2976f6467a21346375bb9753e57911.png",
            "/src/assets/e8e2ae6c59942b93027046047aa7be8c33ef123d.png"
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const [ratingSession, setRatingSession] = useState<BookingWithRelations | null>(null);

    useEffect(() => {
        // Check for unrated completed sessions
        const unrated = pastBookings.find(b => (b.status as unknown as string) === 'completed' && !b.feedback);
        if (unrated) {
            setRatingSession(unrated);
        }
    }, [pastBookings]);
    const [activeTab, setActiveTab] = useState('bem-estar');
    const mainRef = useRef<HTMLElement>(null);

    // Reset scroll position when tab changes
    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo(0, 0);
        }
    }, [activeTab]);

    // State to handle internal navigation within tabs if needed
    const [isQuestionnaireActive, setIsQuestionnaireActive] = useState(false);

    const [skipToBooking, setSkipToBooking] = useState(false);
    const [rescheduleSessionId, setRescheduleSessionId] = useState<string | null>(null);
    const [rescheduleInitialPillar, setRescheduleInitialPillar] = useState<'mental' | 'fisico' | 'financeira' | 'juridica' | null>(null);





    // Function to handle reschedule from Meu Espaço
    const handleReschedule = (sessionId: string, pillar: string) => {
        setActiveTab('bem-estar');
        setSkipToBooking(true);
        setRescheduleSessionId(sessionId);

        // Normalize pillar (handle both UI names and database enum values)
        let normalizedPillar: 'mental' | 'fisico' | 'financeira' | 'juridica' | null = null;
        const p = pillar.toLowerCase();
        if (p.includes('mental') || p.includes('psico') || p.includes('psych')) normalizedPillar = 'mental';
        else if (p.includes('físico') || p.includes('fisico') || p.includes('physical')) normalizedPillar = 'fisico';
        else if (p.includes('financeira') || p.includes('financial')) normalizedPillar = 'financeira';
        else if (p.includes('juridica') || p.includes('jurídica') || p.includes('legal')) normalizedPillar = 'juridica';
        else normalizedPillar = 'mental'; // Default fallback

        setRescheduleInitialPillar(normalizedPillar);
    };

    // Keep-Alive Logic
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(['bem-estar']));

    useEffect(() => {
        setVisitedTabs(prev => {
            if (prev.has(activeTab)) return prev;
            return new Set(prev).add(activeTab);
        });
    }, [activeTab]);

    const shouldRender = (tabName: string) => visitedTabs.has(tabName) || activeTab === tabName;

    // Helper to conditionally show/hide


    /* 
       Note: We removed renderContent() switch to avoid unmounting components.
       Instead, we render conditional divs.
    */


    return (
        <BookingProvider>
            <div className="flex fixed inset-0 bg-[#f5f5f7] overflow-hidden font-inter text-[#222]">
                <Toaster />
                {loading && !user ? (
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
                ) : (
                    <>
                        {/* MOBILE LAYOUT (Hide on Desktop) */}
                        <div className="flex flex-col h-full w-full md:hidden">
                            {/* Wrapper for Mobile Content + Navigation */}

                            {/* Mobile Sidebar/Header (If existing Sidebar is used on mobile, typically sidebars are hidden. 
                            Assuming existing mobile view just relies on content + bottom nav. 
                            If Sidebar was visible on desktop only, it effectively disappears here.
                        ) */}

                            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                                <main
                                    ref={mainRef}
                                    className="flex-1 overflow-y-auto overflow-x-hidden w-full relative"
                                >
                                    {shouldRender('bem-estar') && (
                                        <TabPanel id="bem-estar" activeTab={activeTab}>
                                            <BemEstarContent
                                                setActiveTab={setActiveTab}
                                                setIsQuestionnaireActive={setIsQuestionnaireActive}
                                                skipToBooking={skipToBooking}
                                                rescheduleSessionId={rescheduleSessionId}
                                                initialPillar={rescheduleInitialPillar}
                                                onBookingComplete={() => {
                                                    setSkipToBooking(false);
                                                    setRescheduleSessionId(null);
                                                    setRescheduleInitialPillar(null);
                                                }}
                                            />
                                        </TabPanel>
                                    )}

                                    {shouldRender('assistente') && (
                                        <TabPanel id="assistente" activeTab={activeTab}>
                                            <AssistenteVirtualContent setActiveTab={setActiveTab} />
                                        </TabPanel>
                                    )}

                                    {shouldRender('meu-espaco') && (
                                        <TabPanel id="meu-espaco" activeTab={activeTab}>
                                            <MeuEspacoContent
                                                setActiveTab={setActiveTab}
                                                onReschedule={handleReschedule}
                                            />
                                        </TabPanel>
                                    )}

                                    {shouldRender('perfil') && (
                                        <TabPanel id="perfil" activeTab={activeTab}>
                                            <PerfilContent setActiveTab={setActiveTab} />
                                        </TabPanel>
                                    )}


                                </main>
                            </div>

                            {/* Mobile Bottom Navigation */}
                            <div className={isQuestionnaireActive ? 'hidden' : 'block'}>
                                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
                            </div>
                        </div>

                        {/* DESKTOP LAYOUT (Hide on Mobile) */}
                        <div className="hidden md:block h-full w-full overflow-y-auto custom-scrollbar bg-white">
                            {/* We use conditional rendering for Desktop to ensure clean state, 
                            but we can also use 'hidden' class if we want to preserve state like Questionnaire.
                            For now, keeping it simple with direct rendering or hidden divs. 
                        */}

                            <div className={activeTab === 'bem-estar' ? 'block h-full' : 'hidden'}>
                                <BemEstarDesktop
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    setIsQuestionnaireActive={setIsQuestionnaireActive}
                                    initialPillar={rescheduleInitialPillar}
                                    skipToBooking={skipToBooking}
                                    rescheduleSessionId={rescheduleSessionId}
                                    onBookingComplete={() => {
                                        setSkipToBooking(false);
                                        setRescheduleSessionId(null);
                                        setRescheduleInitialPillar(null);
                                    }}
                                />
                            </div>

                            {activeTab === 'meu-espaco' && (
                                <MeuEspacoDesktop
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    onReschedule={handleReschedule}
                                />
                            )}

                            {activeTab === 'recursos' && (
                                <RecursosDesktop
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            )}

                            {activeTab === 'assistente' && (
                                <DesktopAssistente
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            )}

                            {activeTab === 'perfil' && (
                                <DesktopPerfil
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                        </div>
                    </>
                )
                }

                {/* Session Rating Modal */}
                {
                    ratingSession && (
                        <SessionRatingModal
                            booking={ratingSession}
                            onClose={() => setRatingSession(null)}
                            onSubmit={rateSession}
                        />
                    )
                }
            </div >
        </BookingProvider>
    );
}
