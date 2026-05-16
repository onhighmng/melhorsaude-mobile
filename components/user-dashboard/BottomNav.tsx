import { Home, MessageSquare, LayoutGrid, User } from 'lucide-react';
// DISABLED: import from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'bem-estar',   Icon: Home,          labelKey: 'nav.bemEstar' },
  { id: 'assistente',  Icon: MessageSquare, labelKey: 'nav.assistente' },
  { id: 'meu-espaco',  Icon: LayoutGrid,  labelKey: 'nav.meuEspaco' },
  { id: 'perfil',      Icon: User,        labelKey: 'nav.perfil' },
] as const;

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-1 px-3 py-2.5 rounded-[32px] shadow-lg"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        {NAV_ITEMS.map(({ id, Icon, labelKey }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              aria-label={t(labelKey)}
              className="relative flex flex-col items-center justify-center transition-all duration-200 active:scale-90"
              style={{ width: 56, height: 52 }}
            >
              {isActive && (
                <div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: '#1565C0' }}

                />
              )}
              <Icon
                size={20}
                className="relative z-10 transition-colors duration-200"
                style={{ color: isActive ? '#ffffff' : '#a3a3a3' }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}