import { Home, Bot, LayoutDashboard, User } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from './ui/ui/dock';
import { useLanguage } from '@/contexts/LanguageContext';

interface DockNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DockNavigation({ activeTab, setActiveTab }: DockNavigationProps) {
  const { t } = useLanguage();

  const navigationItems = [
    {
      id: 'bem-estar',
      title: t('nav.bemEstar'),
      icon: <Home className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    },
    {
      id: 'assistente',
      title: t('nav.assistente'),
      icon: <Bot className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    },
    {
      id: 'meu-espaco',
      title: t('nav.meuEspaco'),
      icon: <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    },
    {
      id: 'perfil',
      title: t('nav.perfil'),
      icon: <User className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    },
  ];

  return (
    <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Dock className="items-end pb-3 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="cursor-pointer"
          >
            <DockItem
              className={`aspect-square rounded-full transition-all ${
                activeTab === item.id
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300'
              }`}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <div className={activeTab === item.id ? '[&_svg]:text-white' : ''}>
                  {item.icon}
                </div>
              </DockIcon>
            </DockItem>
          </div>
        ))}
      </Dock>
    </div>
  );
}