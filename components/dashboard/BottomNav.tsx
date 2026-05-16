import { Home, Calendar, TrendingUp, BookOpen, Settings } from 'lucide-react';

interface BottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Inicio' },
        { id: 'calendar', icon: Calendar, label: 'Sessões' },
        { id: 'journey', icon: TrendingUp, label: 'Percurso' },
        { id: 'resources', icon: BookOpen, label: 'Recursos' },
        { id: 'settings', icon: Settings, label: 'Definições' },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 px-4 py-2 z-50">
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isMiddle = index === 2; // Percurso is the middle item

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center gap-1 py-2 ${isMiddle ? 'col-start-3 justify-self-center' : ''
                                }`}
                        >
                            <div className={`p-3 rounded-2xl transition-colors ${isActive ? 'bg-white shadow-sm' : ''
                                }`}>
                                <Icon
                                    className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-500'
                                        }`}
                                />
                            </div>
                            <span
                                className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-500'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
            {/* iOS Home Indicator */}
            <div className="flex justify-center pt-1">
                <div className="w-32 h-1 bg-gray-300 rounded-full" />
            </div>
        </nav>
    );
}
