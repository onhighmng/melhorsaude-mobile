import { Home, MessageCircle, Calendar, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'bem-estar', icon: Home, label: t('nav.bemEstar') },
    { id: 'meu-espaco', icon: Calendar, label: t('nav.meuEspaco') },

    { id: 'assistente', icon: MessageCircle, label: t('nav.assistente') },
    { id: 'perfil', icon: User, label: t('nav.perfil') },
  ];

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1a1a1a] rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`p-3 rounded-full transition-all duration-200 ${isActive
                  ? 'bg-[#007AFF] shadow-lg'
                  : 'hover:bg-white/10'
                  }`}
                aria-label={item.label}
              >
                <Icon
                  className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}