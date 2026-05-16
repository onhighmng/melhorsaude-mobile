import { LayoutGrid, Users, BookOpen, BarChart3, Calendar } from 'lucide-react';

export function BottomNav({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutGrid },
    { label: 'Colaboradores', icon: Users },
    { label: 'Recursos', icon: BookOpen },
    { label: 'Relatórios', icon: BarChart3 },
    { label: 'Sessões', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 pb-safe pt-1 z-50 shadow-lg" style={{ display: 'none' }}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.label || (item.label === 'Relatórios' && currentPage === 'Relatórios e Impacto');
          
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label === 'Relatórios' ? 'Relatórios e Impacto' : item.label)}
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
