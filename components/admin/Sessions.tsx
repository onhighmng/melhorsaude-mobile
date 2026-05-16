import { useState } from 'react';
import { Calendar, MessageSquare, Search, Filter, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const scheduledSessions = [
  {
    id: 1,
    collaborator: 'lorino rodrigues',
    company: 'onhigh',
    companyColor: 'bg-[#fff9e6]',
    companyText: 'text-[#FFD60A]',
    specialist: 'Frederico prestador',
    date: '06/05/ago às 14:30:00',
    type: 'Online',
    status: 'Agendada',
    statusColor: 'bg-[#e8f4ff] text-[#007AFF]'
  },
  {
    id: 2,
    collaborator: 'lorino rodrigues',
    company: 'onhigh',
    companyColor: 'bg-[#d4e4ff]',
    companyText: 'text-[#007AFF]',
    specialist: 'Frederico prestador',
    date: '06/05/ago às 14:30:00',
    type: 'Online',
    status: 'Agendada',
    statusColor: 'bg-[#e8f4ff] text-[#007AFF]'
  },
  {
    id: 3,
    collaborator: 'lorino rodrigues',
    company: 'onhigh',
    companyColor: 'bg-[#d4e4ff]',
    companyText: 'text-[#007AFF]',
    specialist: 'Frederico prestador',
    date: '06/05/ago às 16:30:00',
    type: 'Online',
    status: 'Concluído',
    statusColor: 'bg-[#d4f4dd] text-[#34C759]'
  }
];

export default function Sessions() {
  const [activeView, setActiveView] = useState<'scheduled' | 'onduty'>('scheduled');

  return (
    <div className="min-h-screen p-4 lg:p-8 pb-24 lg:pb-8">
      <header className="mb-6">
        <h1 className="text-gray-900 mb-1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '500', lineHeight: '1.2' }}>Operações</h1>
        <p className="text-gray-500">Gerir sessões e profissional de permanência</p>
      </header>

      {/* View Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/* Sessões Agendadas Card */}
        <button
          onClick={() => setActiveView('scheduled')}
          className={`bg-gradient-to-br from-[#fff9e6] to-[#ffe9b8] rounded-2xl p-4 text-left transition-all hover:shadow-lg relative overflow-hidden ${activeView === 'scheduled' ? 'ring-2 ring-[#FFD60A] shadow-md' : ''
            }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#FFD60A]/10 rounded-full -ml-8 -mb-8" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD60A] to-[#ffb800] flex items-center justify-center shadow-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              {activeView === 'scheduled' && (
                <div className="px-2.5 py-1 rounded-full bg-[#FFD60A]/20 backdrop-blur-sm">
                  <span className="text-xs text-[#cc8800]">● Ativo</span>
                </div>
              )}
            </div>
            <h3 className="text-gray-900 mb-1">Sessões Agendadas</h3>
            <p className="text-gray-600 text-sm mb-3">Gerir sessões e agendamentos</p>

            <div className="flex items-center gap-3 pt-3 border-t border-[#FFD60A]/20">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Hoje</p>
                <p className="text-gray-900">12 sessões</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Pendentes</p>
                <p className="text-gray-900">3 casos</p>
              </div>
            </div>
          </div>
        </button>

        {/* Profissional de Permanência Card */}
        <button
          onClick={() => setActiveView('onduty')}
          className={`bg-[#e8f4ff] rounded-2xl p-5 text-left transition-all hover:shadow-md ${activeView === 'onduty' ? 'ring-2 ring-[#007AFF]' : ''
            }`}
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-[#007AFF]" />
          </div>
          <h3 className="text-gray-900 mb-1">Profissional de Permanência</h3>
          <p className="text-gray-600 text-sm">Gerir profissional de permanência</p>
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'scheduled' ? (
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900">Lista de Sessões</h2>
            </div>
            <Badge className="bg-red-50 text-red-600 hover:bg-red-50 w-fit">
              Tempo Real
            </Badge>
          </div>

          {/* Search and Filters */}
          <div className="space-y-2 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar..."
                className="pl-9 bg-gray-50 border-gray-200 rounded-xl h-10"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl h-10 text-sm">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="scheduled">Agendada</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl h-10 text-sm">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="presential">Presencial</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl h-10 text-sm">
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta Semana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden md:grid md:grid-cols-7 gap-4 px-4 pb-3 border-b border-gray-200 mb-2">
            <div className="text-gray-600">Colaborador</div>
            <div className="text-gray-600">Empresa</div>
            <div className="text-gray-600">Plur</div>
            <div className="text-gray-600">Especialista</div>
            <div className="text-gray-600">Data</div>
            <div className="text-gray-600">Tipo</div>
            <div className="text-gray-600">Estado</div>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {scheduledSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 md:border-0"
              >
                {/* Mobile Layout */}
                <div className="md:hidden p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-gray-900 mb-1">{session.collaborator}</div>
                      <div className="text-sm text-gray-600">{session.company}</div>
                    </div>
                    <Badge className={`${session.statusColor} hover:${session.statusColor} flex-shrink-0`}>
                      {session.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-sm ${session.companyColor} ${session.companyText}`}>
                      {session.company === 'onhigh' && session.id === 1 ? 'Bem-Estar Físico' : 'Saúde Mental'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Especialista</div>
                      <div className="text-sm text-gray-900">{session.specialist}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Tipo</div>
                      <div className="text-sm text-gray-900">{session.type}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    {session.date}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-7 gap-4 items-center p-4">
                  <div className="text-gray-900">{session.collaborator}</div>
                  <div className="text-gray-900">{session.company}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-lg ${session.companyColor} ${session.companyText}`}>
                      {session.company === 'onhigh' && session.id === 1 ? 'Bem-Estar Físico' : 'Saúde Mental'}
                    </span>
                  </div>
                  <div className="text-gray-900">{session.specialist}</div>
                  <div className="text-gray-600 text-sm">{session.date}</div>
                  <div className="text-gray-900">{session.type}</div>
                  <div>
                    <Badge className={`${session.statusColor} hover:${session.statusColor}`}>
                      {session.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Cases Statistics Card */}
          <div className="bg-gradient-to-br from-[#d4f4dd] to-[#b8f0c8] rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-16 -mb-16" />

            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                    <span className="text-sm text-gray-700">Em Tempo Real</span>
                  </div>
                  <h2 className="text-gray-900 mb-1 text-4xl">45 Casos</h2>
                  <p className="text-gray-700">Resolvidos com Sucesso</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#34C759]" />
                </div>
              </div>

              {/* Large Chart */}
              <div className="h-32 mb-6 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { value: 28 },
                    { value: 32 },
                    { value: 30 },
                    { value: 35 },
                    { value: 38 },
                    { value: 36 },
                    { value: 40 },
                    { value: 42 },
                    { value: 45 }
                  ]}>
                    <defs>
                      <linearGradient id="casosGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34C759" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#34C759" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#34C759"
                      strokeWidth={3}
                      fill="url(#casosGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-gray-600 text-xs mb-1">Taxa de Sucesso</p>
                  <p className="text-gray-900 text-xl">96%</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-gray-600 text-xs mb-1">Tempo Médio</p>
                  <p className="text-gray-900 text-xl">2.5h</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-gray-600 text-xs mb-1">Este Mês</p>
                  <p className="text-gray-900 text-xl flex items-center gap-1">
                    +12
                    <span className="text-[#34C759] text-sm">↑</span>
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm bg-white/60 backdrop-blur-sm rounded-lg p-3">
                📊 Casos completamente resolvidos e finalizados no período atual com feedback positivo dos colaboradores
              </p>
            </div>
          </div>

          {/* Case History Card */}
          <div className="bg-gradient-to-br from-[#e8f4ff] to-[#d4e4ff] rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/30 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-900 mb-2">Histórico de Casos</h2>
                  <p className="text-gray-600 text-sm">Últimas atividades em tempo real</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-gray-700">Ao Vivo</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-gray-600 text-xs mb-1">Casos Hoje</p>
                  <p className="text-gray-900 text-2xl">8</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-gray-600 text-xs mb-1">Tempo de Resposta</p>
                  <p className="text-gray-900 text-2xl">~15min</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34C759] to-[#28a745] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-gray-900">Caso resolvido</p>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs whitespace-nowrap">
                        ✓ Concluído
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Colaborador recebeu suporte imediato para questão de saúde mental</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>⏱️ Há 2 horas</span>
                      <span>•</span>
                      <span>🏢 onhigh</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34C759] to-[#28a745] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-gray-900">Caso resolvido</p>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs whitespace-nowrap">
                        ✓ Concluído
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Situação de emergência atendida com sucesso pelo profissional de permanência</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>⏱️ Há 5 horas</span>
                      <span>•</span>
                      <span>⚡ Urgente</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34C759] to-[#28a745] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-gray-900">Caso resolvido</p>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs whitespace-nowrap">
                        ✓ Concluído
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Encaminhamento realizado com sucesso para especialista apropriado</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>⏱️ Ontem</span>
                      <span>•</span>
                      <span>📋 Rotina</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View All Link */}
              <button className="w-full mt-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 text-gray-700 hover:bg-white/90 transition-all text-center">
                Ver todos os casos →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
