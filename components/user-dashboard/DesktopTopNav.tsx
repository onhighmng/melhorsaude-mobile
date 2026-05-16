import { useLanguage } from '@/contexts/LanguageContext';
// DISABLED: import from 'motion/react';
import appLogo from '@assets/app-logo.png';

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
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-6 md:px-10 lg:px-[120px] h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('bem-estar')}>
          <img 
            src={appLogo}
            alt="Melhor Saúde" 
            className="h-12 w-auto object-contain"
          />
          <span className="font-plus-jakarta font-bold text-[22px] text-[#0046a2] tracking-tight">
            Melhor Saúde
          </span>
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
                  color: activeTab === item.id ? '#1565C0' : '#4b5563',
                  fontWeight: activeTab === item.id ? 600 : 500,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="font-poppins text-[16px] block hover:text-[#1565C0] transition-colors duration-200"
              >
                {item.label}
              </span>
              {activeTab === item.id && (
                <div
                  layoutId="activeTab"
                  className="absolute -bottom-6 left-0 right-0 h-1 rounded-full bg-[#1565C0]"
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