import { LayoutGrid, Users, BookOpen, BarChart3, Calendar, LogOut } from 'lucide-react';
// DISABLED: import from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
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

  const navItems = [
    { id: 'Dashboard', icon: LayoutGrid, label: 'Home' },
    { id: 'Colaboradores', icon: Users, label: 'Equipe' },
    { id: 'Recursos', icon: BookOpen, label: 'Recursos' },
    { id: 'Relatórios e Impacto', icon: BarChart3, label: 'Impacto' },
    { id: 'Sessões', icon: Calendar, label: 'Sessões' },
    { id: 'Sair', icon: LogOut, label: 'Sair', action: handleLogout },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id || (item.id === 'Relatórios e Impacto' && currentPage === 'Relatórios');

          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.action) {
                  item.action();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}