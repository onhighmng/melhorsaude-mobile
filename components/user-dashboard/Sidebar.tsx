import { useState } from 'react';
import { Home, MessageSquare, LayoutDashboard, User, LogOut } from 'lucide-react';
import { Sidebar as AnimatedSidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import appLogo from '@assets/app-logo.png';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { signOut } = useAuth();

  const mainLinks = [
    {
      label: t('nav.bemEstar'),
      href: "#",
      icon: <Home className="text-blue-500 h-5 w-5 flex-shrink-0" />,
      id: 'bem-estar'
    },
    {
      label: t('nav.assistente'),
      href: "#",
      icon: <MessageSquare className="text-blue-500 h-5 w-5 flex-shrink-0" />,
      id: 'assistente'
    },
    {
      label: t('nav.meuEspaco'),
      href: "#",
      icon: <LayoutDashboard className="text-blue-500 h-5 w-5 flex-shrink-0" />,
      id: 'meu-espaco'
    },
    {
      label: t('nav.perfil'),
      href: "#",
      icon: <User className="text-blue-500 h-5 w-5 flex-shrink-0" />,
      id: 'perfil'
    },
  ];

  const bottomLinks = [
    {
      label: t('nav.logout'),
      href: "#",
      icon: <LogOut className="text-gray-600 h-5 w-5 flex-shrink-0" />,
      id: 'logout'
    },
  ];

  return (
    <div className="hidden md:block">
      <AnimatedSidebar open={open} setOpen={setOpen}>
        <SidebarBody className="hidden md:flex justify-between gap-10 fixed left-0 top-0 h-screen bg-white/40 backdrop-blur-sm border-r border-gray-200/50 z-50">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="px-6 py-8">
              <img 
                src={appLogo} 
                alt="Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="mt-0 flex flex-col gap-2">
              {mainLinks.map((link) => (
                <div
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className="cursor-pointer"
                >
                  <SidebarLink 
                    link={link} 
                    isActive={activeTab === link.id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2">
            {bottomLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => {
                  if (link.id === 'logout') {
                    signOut();
                  } else {
                    setActiveTab(link.id);
                  }
                }}
                className="cursor-pointer"
              >
                <SidebarLink link={link} />
              </div>
            ))}
          </div>
        </SidebarBody>
      </AnimatedSidebar>
    </div>
  );
}