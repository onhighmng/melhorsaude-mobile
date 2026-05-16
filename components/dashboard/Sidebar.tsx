import { useState } from 'react';
import { LayoutDashboard, Calendar, CalendarCheck, BookOpen, Settings, HelpCircle, FileText, LogOut } from 'lucide-react';
import { Sidebar as AnimatedSidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'react-router-dom';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const [open, setOpen] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const mainLinks = [
        {
            label: "Inicio",
            href: "#",
            icon: <LayoutDashboard className="text-blue-500 h-5 w-5 flex-shrink-0" />,
            id: 'home'
        },
        {
            label: "Agendar Sessão",
            href: "#",
            icon: <Calendar className="text-blue-500 h-5 w-5 flex-shrink-0" />,
            id: 'calendar'
        },
        {
            label: "Meu percurso",
            href: "#",
            icon: <CalendarCheck className="text-blue-500 h-5 w-5 flex-shrink-0" />,
            id: 'journey'
        },
        {
            label: "Recursos",
            href: "#",
            icon: <BookOpen className="text-blue-500 h-5 w-5 flex-shrink-0" />,
            id: 'resources'
        },
        {
            label: "Definições",
            href: "#",
            icon: <Settings className="text-blue-500 h-5 w-5 flex-shrink-0" />,
            id: 'settings'
        },
    ];

    const bottomLinks = [
        {
            label: "Ajuda",
            href: "#",
            icon: <HelpCircle className="text-gray-600 h-5 w-5 flex-shrink-0" />,
            id: 'help'
        },
        {
            label: "Termos",
            href: "#",
            icon: <FileText className="text-gray-600 h-5 w-5 flex-shrink-0" />,
            id: 'terms'
        },
        {
            label: "Sair",
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
                        <div className="mt-4 flex flex-col gap-2">
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
                                onClick={async () => {
                                    if (link.id === 'logout') {
                                        try {
                                            await signOut();
                                            navigate('/login');
                                        } catch (error) {
                                            console.error('Error signing out:', error);
                                        }
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
