import { LayoutGrid, Users, BookOpen, BarChart3, Calendar, HelpCircle, FileText, LogOut } from 'lucide-react';
import { AnimatedSidebar, SidebarBody, SidebarLink } from './ui/animated-sidebar';
import { useState } from 'react';

export function Sidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  
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
      label: "",
      href: "#",
      icon: (
        <LogOut className="text-gray-600 h-5 w-5 flex-shrink-0" />
      ),
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
          {bottomLinks.map((link, idx) => (
            <SidebarLink 
              key={idx} 
              link={link}
              isActive={link.label === currentPage}
              onClick={() => link.label && onNavigate(link.label)}
            />
          ))}
        </div>
      </SidebarBody>
    </AnimatedSidebar>
  );
}