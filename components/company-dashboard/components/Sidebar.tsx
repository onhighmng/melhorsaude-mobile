import { LayoutGrid, Users, BookOpen, BarChart3, Calendar, HelpCircle, FileText, LogOut } from 'lucide-react';
import { AnimatedSidebar, SidebarBody, SidebarLink } from '../ui/animated-sidebar';
import { useState } from 'react';
// DISABLED: import from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export function Sidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  interface SidebarLinkItem {
    label: string;
    navKey?: string; // Key used for navigation/active state checking
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }

  const links: SidebarLinkItem[] = [
    {
      label: t('dashboard.title'),
      navKey: "Dashboard",
      href: "#",
      icon: (
        <LayoutGrid className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t('card.profile.title'), // Using translated title (e.g. 'Your Team' / 'A Sua Equipa') 
      navKey: "Colaboradores",
      href: "#",
      icon: (
        <Users className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t('resources.title'),
      navKey: "Recursos",
      href: "#",
      icon: (
        <BookOpen className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t('reports.title'),
      navKey: "Relatórios e Impacto",
      href: "#",
      icon: (
        <BarChart3 className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t('sessions.title'),
      navKey: "Sessões",
      href: "#",
      icon: (
        <Calendar className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const bottomLinks: SidebarLinkItem[] = [
    {
      label: "Suporte",
      navKey: "Suporte",
      href: "#",
      icon: (
        <HelpCircle className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Termos",
      navKey: "Termos",
      href: "#",
      icon: (
        <FileText className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t('nav.logout'),
      href: "#",
      icon: (
        <LogOut className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
      onClick: handleSignOut
    },
  ];

  return (
    <AnimatedSidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Main navigation links */}
          <div className="flex flex-col gap-1">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                isActive={link.navKey === currentPage}
                onClick={() => onNavigate(link.navKey || link.label)}
              />
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col gap-1 pb-4">
          {bottomLinks.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              isActive={link.navKey === currentPage}
              onClick={() => {
                if (link.onClick) {
                  link.onClick();
                } else if (link.navKey) {
                  onNavigate(link.navKey);
                }
              }}
            />
          ))}
        </div>
      </SidebarBody>
    </AnimatedSidebar>
  );
}
