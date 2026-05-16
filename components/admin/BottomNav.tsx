import { LayoutGrid, Users, BookOpen, BarChart3, Calendar, LogOut } from 'lucide-react';
// DISABLED: import from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export function BottomNav({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    { label: t('admin.nav.dashboard'), icon: LayoutGrid },
    { label: t('admin.nav.collaborators'), icon: Users },
    { label: t('admin.nav.resources'), icon: BookOpen },
    { label: t('admin.nav.reports'), icon: BarChart3 },
    { label: t('admin.nav.sessions'), icon: Calendar },
    { label: t('admin.nav.logout'), icon: LogOut, action: handleLogout },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 pb-safe pt-1 z-50 shadow-lg md:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.label || (item.label === 'Relatórios' && currentPage === 'Relatórios e Impacto');

          return (
            <button
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.action) {
                  item.action();
                } else {
                  onNavigate(item.label === 'Relatórios' ? 'Relatórios e Impacto' : item.label);
                }
              }}
              className={`flex flex-col items-center py-2 px-3 min-w-[60px] transition-colors ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator */}
      <div className="flex justify-center mt-1 mb-1">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </nav>
  );
}