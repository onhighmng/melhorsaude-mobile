import { useLanguage } from '@/contexts/LanguageContext';
import imgMelhorSaudeTransparentClean1 from "@/assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import imgMelhorSaudeTransparentLogo1 from "@/assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
// DISABLED: import from 'framer-motion';

interface DesktopTopNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function DesktopTopNav({ activeTab, setActiveTab }: DesktopTopNavProps) {
    const { t } = useLanguage();

    const navItems = [
        { id: 'bem-estar', label: t('nav.bemEstar') },
        { id: 'meu-espaco', label: t('nav.meuEspaco') },
        { id: 'recursos', label: t('nav.recursos') },
        { id: 'assistente', label: t('nav.assistente') },
        { id: 'perfil', label: t('nav.perfil') },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="mx-auto px-[120px] h-20 flex items-center justify-between">
                {/* Logo - Left */}
                <div className="flex flex-col items-center justify-center relative h-[70px] w-[140px]">
                    <img
                        src={imgMelhorSaudeTransparentLogo1}
                        alt=""
                        className="w-[64px] h-[64px] object-contain relative z-10 -mb-3"
                    />
                    <img
                        src={imgMelhorSaudeTransparentClean1}
                        alt="Melhor Saúde"
                        className="w-[130px] h-auto object-contain"
                    />
                </div>

                {/* Navigation Links - Center */}
                <div className="flex items-center gap-12">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="relative"
                        >
                            <span
                                initial={false}
                                animate={{
                                    color: activeTab === item.id ? '#003b8d' : '#4b5563',
                                    fontWeight: activeTab === item.id ? 600 : 500,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                                className="font-manrope text-[16px] block hover:text-[#003b8d] transition-colors duration-200"
                            >
                                {item.label}
                            </span>
                            {activeTab === item.id && (
                                <div
                                    layoutId="activeTab"
                                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-[#003b8d]"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Profile Button - Right */}
                <div className="flex items-center gap-4">
                </div>
            </div>
        </nav>
    );
}
