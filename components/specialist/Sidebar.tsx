import { LayoutDashboard, Phone, Calendar, Users, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'react-router-dom';
import { AnimatedSidebar, AnimatedSidebarBody } from '@/components/ui/animated-sidebar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

// Helper function to get initials from full name
const getInitials = (fullName: string | null | undefined): string => {
  if (!fullName) return 'P';
  const names = fullName.trim().split(' ').filter(n => n.length > 0);
  if (names.length === 0) return 'P';
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  // Get first letter of first name and first letter of last name
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'triagem', icon: Phone, label: 'Pedidos em Tempo Real' },
  { id: 'sessoes-agendadas', icon: Calendar, label: 'Agenda Global' },
  { id: 'historial-utilizadores', icon: Users, label: 'Histórico e Clima' },
  { id: 'definicoes', icon: Settings, label: 'Definições' },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = getInitials(profile?.full_name);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AnimatedSidebar open={open} setOpen={setOpen}>
      <AnimatedSidebarBody className="bg-white border-r border-gray-200 z-50">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">{initials}</span>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all ${isActive
                  ? 'bg-blue-500/10 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100/50'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="pb-4 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-red-600 hover:bg-red-50/40"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">Sair</span>
          </button>
        </div>
      </AnimatedSidebarBody>
    </AnimatedSidebar>
  );
}