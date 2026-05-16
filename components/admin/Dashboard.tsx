import { Building2, Users, Calendar, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAdmin } from '@/contexts/AdminContext';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'users' | 'sessions' | 'resources' | 'status', tab?: 'companies' | 'affiliates' | 'hr') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { platformStats, loadingStats, error } = useAdmin();

  if (loadingStats) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando estatísticas da plataforma...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar estatísticas</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0051D5] transition-colors"
          >
            Recarregar página
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen lg:h-screen p-4 lg:p-8 bg-[#f5f5f5] overflow-auto scrollbar-pill lg:overflow-hidden flex flex-col w-full max-w-full">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-gray-900 mb-1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '500', lineHeight: '1.2' }}>Dashboard Geral</h1>
        <p className="text-gray-500">Visão geral da plataforma Melhor Saúde</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto lg:flex-1 lg:overflow-hidden pb-20 lg:pb-0">
        {/* Empresas Ativas - Top Left */}
        <button 
          onClick={() => onNavigate('users', 'companies')}
          className="bg-[#dce9ff] rounded-3xl p-6 flex flex-col justify-between min-h-[200px] hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#2563eb] flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          
          {/* Mini trend chart */}
          <div className="flex-1 flex items-center justify-center my-4">
            <svg width="100%" height="60" viewBox="0 0 200 60" className="overflow-visible">
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M 0 50 L 0 40 L 40 35 L 80 38 L 120 30 L 160 20 L 200 15 L 200 50 Z"
                fill="url(#blueGradient)"
              />
              {/* Line */}
              <path
                d="M 0 40 L 40 35 L 80 38 L 120 30 L 160 20 L 200 15"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots */}
              <circle cx="0" cy="40" r="3" fill="#2563eb" />
              <circle cx="40" cy="35" r="3" fill="#2563eb" />
              <circle cx="80" cy="38" r="3" fill="#2563eb" />
              <circle cx="120" cy="30" r="3" fill="#2563eb" />
              <circle cx="160" cy="20" r="3" fill="#2563eb" />
              <circle cx="200" cy="15" r="4" fill="#2563eb" />
            </svg>
          </div>

          <div>
            <h3 className="text-gray-900 mb-1">Empresas Ativas</h3>
            <p className="text-gray-600 text-sm">{platformStats?.active_companies || 0} empresas ativas</p>
          </div>
        </button>

        {/* Atividade da Plataforma - Center Card */}
        <div className="bg-white rounded-3xl p-6 md:col-span-1 lg:row-span-2 lg:col-start-2 flex flex-col justify-center shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8b5cf6] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-gray-900">Atividade da Plataforma</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Taxa de Utilização</span>
                <span className="text-[#8b5cf6]">{platformStats?.platform_utilization_rate || 0}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: `${platformStats?.platform_utilization_rate || 0}%` }}></div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Prestadores Ativos</span>
                <span className="text-[#8b5cf6]">{platformStats?.active_specialists || 0}</span>
              </div>
              <p className="text-gray-500 text-sm">A fornecer serviços</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Satisfação Média</span>
                <span className="text-[#8b5cf6]">{platformStats?.average_satisfaction?.toFixed(1) || 0}/10</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3b82f6] rounded-full"
                  style={{ width: `${Math.min(100, ((platformStats?.average_satisfaction || 0) / 10) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Colaboradores Registados - Top Right */}
        <button 
          onClick={() => onNavigate('users', 'companies')}
          className="bg-[#fff9e1] rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          
          {/* Mini bar chart showing user growth */}
          <div className="flex-1 flex items-end justify-center gap-1.5 my-4 px-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-10 bg-[#f59e0b] rounded-t-lg opacity-40"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-14 bg-[#f59e0b] rounded-t-lg opacity-50"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-12 bg-[#f59e0b] rounded-t-lg opacity-45"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-20 bg-[#f59e0b] rounded-t-lg opacity-60"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-16 bg-[#f59e0b] rounded-t-lg opacity-55"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-24 bg-[#f59e0b] rounded-t-lg opacity-70"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-28 bg-[#f59e0b] rounded-t-lg"></div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 mb-1">Colaboradores Registados</h3>
            <p className="text-gray-600 text-sm">{platformStats?.total_users || 0} utilizadores ativos</p>
          </div>
        </button>

        {/* Sessões Este Mês - Bottom Left with background image */}
        <button 
          onClick={() => onNavigate('sessions')}
          className="bg-[#c8e6d7] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer text-left"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjB0ZWFtfGVufDF8fHx8MTc2MjQzMzIyOXww&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#c8e6d7] opacity-60"></div>
          <div className="relative z-10 w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-[#059669]" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-gray-900 mb-1">Sessões Este Mês</h3>
            <p className="text-gray-600">{platformStats?.total_sessions_this_month || 0} sessões realizadas</p>
          </div>
        </button>

        {/* Recursos - Bottom Right with image */}
        <button 
          onClick={() => onNavigate('resources')}
          className="bg-gray-200 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden md:col-span-1 hover:opacity-90 transition-opacity cursor-pointer text-left"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1723234455395-cc08444066c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjeWNsaW5nJTIwc3Vuc2V0fGVufDF8fHx8MTc2MjQ5NjU4OHww&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-white mb-1">Recursos</h3>
            <p className="text-white/90 text-sm">Conteúdos e materiais de apoio</p>
          </div>
        </button>
      </div>
    </div>
  );
}
