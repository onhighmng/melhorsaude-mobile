import { LayoutDashboard, Phone, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'react-router-dom';

interface MobileNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function MobileNav({ currentPage, onPageChange }: MobileNavProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'triagem', icon: Phone, label: 'Pedidos' },
    { id: 'sessoes-agendadas', icon: Calendar, label: 'Agenda' },
    { id: 'historial-utilizadores', icon: Users, label: 'Histórico' },
    { id: 'definicoes', icon: Settings, label: 'Definições' },
    { id: 'logout', icon: LogOut, label: 'Sair', action: handleLogout },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 z-50">
      <div className="flex items-center justify-around px-1 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={item.action ? item.action : () => onPageChange(item.id)}
              className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-colors flex-1 max-w-[4.5rem]"
            >
              <div className={`p-2 rounded-xl ${isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600'
                }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}