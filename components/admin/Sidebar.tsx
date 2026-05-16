import { LayoutGrid, Users, BookOpen, BarChart3, Calendar, HelpCircle, FileText, LogOut } from 'lucide-react';
import { Sidebar as AnimatedSidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { useState } from 'react';
// DISABLED: import from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      navigate('/login');
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutGrid className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Colaboradores",
      href: "#",
      icon: (
        <Users className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Recursos",
      href: "#",
      icon: (
        <BookOpen className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Relatórios e Impacto",
      href: "#",
      icon: (
        <BarChart3 className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Sessões",
      href: "#",
      icon: (
        <Calendar className="text-blue-500 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const bottomLinks = [
    {
      label: "Suporte",
      href: "#",
      icon: (
        <HelpCircle className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Termos",
      href: "#",
      icon: (
        <FileText className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Sair",
      href: "#",
      icon: (
        <LogOut className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
      onClick: handleLogout
    },
  ];

  return (
    <AnimatedSidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Profile at top */}
          <div className="mb-6 flex items-center justify-center">
          </div>

          {/* Main navigation links */}
          <div className="flex flex-col gap-1">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                isActive={link.label === currentPage}
                onClick={() => onNavigate(link.label)}
              />
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col gap-1 pb-4">
          {bottomLinks.map((link, idx) => {
            const handleClick = (e: React.MouseEvent) => {
              if (link.onClick) {
                e.preventDefault();
                e.stopPropagation();
                link.onClick();
              } else if (link.label) {
                onNavigate(link.label);
              }
            };

            return (
              <SidebarLink
                key={idx}
                link={link}
                isActive={link.label === currentPage}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </SidebarBody>
    </AnimatedSidebar>
  );
}