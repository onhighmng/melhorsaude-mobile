import { TrendingUp, Users, FileText, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSpecialistStats } from '@/hooks/useSpecialistStats';

export function StatsPage() {
  const { stats, loading } = useSpecialistStats();

  if (loading) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando estatísticas...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = stats?.monthly_trends || [];
  const pillars = stats?.pillar_breakdown || [];
  const recentFeedback = stats?.recent_feedback.slice(0, 3).map(feedback => {
    const submittedAt = feedback.submitted_at ? new Date(feedback.submitted_at) : null;
    const rating = typeof feedback.overall_rating === 'number' ? feedback.overall_rating : null;
    // Use 'comment' if available, otherwise fallback or cast to any if types are outdated
    const comment = (feedback as any).comment || (feedback as any).positive_feedback || 'Sem comentários';

    return {
      name: 'Anónimo', // Anonymize user name
      date: submittedAt ? submittedAt.toLocaleDateString('pt-PT') : 'Data não disponível',
      feedback: comment,
      rating,
    };
  }) || [];

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Estatísticas Pessoais</h1>
          <p className="text-gray-600">Acompanhe o seu desempenho e métricas de atendimento</p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left - Progress Metrics */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 lg:p-8">
            <div className="space-y-6">
              {/* Resolução Interna */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-900">Resolução Interna</h3>
                  <span className="text-blue-600">{stats?.internal_resolution_rate || 0}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${stats?.internal_resolution_rate || 0}%` }}></div>
                </div>
              </div>

              {/* Encaminhamentos */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-900">Encaminhamentos</h3>
                  <span className="text-blue-600">{stats?.referral_rate || 0}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${stats?.referral_rate || 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Chart */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Crescimento do mês em 4 pontos</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Pillars */}
          <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="text-gray-900 mb-6">Casos por Pilar</h3>
            <div className="space-y-4">
              {pillars.length > 0 ? pillars.map((pillar, index) => {
                const iconMap: Record<string, typeof Activity> = {
                  psychological: Activity,
                  PSYCH: Activity,
                  physical: Users,
                  PHYSICAL: Users,
                  financial: TrendingUp,
                  FINANCIAL: TrendingUp,
                  legal_social: FileText,
                  LEGAL: FileText,
                };
                const Icon = iconMap[pillar.pillar_code] || Activity;

                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${pillar.bgColor} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${pillar.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-900">{pillar.pillar_name}</p>
                        <p className="text-sm text-gray-500">{pillar.case_count} casos</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                );
              }) : (
                <p className="text-gray-500 text-center py-4">Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* Right - Recent Feedback */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 lg:p-8">
            <h3 className="text-gray-900 mb-6">Feedback Recente</h3>
            <div className="space-y-4">
              {recentFeedback.length > 0 ? recentFeedback.map((item, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-900">{item.name}</p>
                    <span className="text-sm text-gray-500">• {item.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{item.feedback}"</p>
                  <div className="flex items-center gap-2 mt-2">
                    {typeof item.rating === 'number' && (
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                        <span className="text-sm font-semibold text-yellow-700">{(item.rating > 5 ? item.rating / 2 : item.rating).toFixed(1)}</span>
                        <span className="text-xs text-yellow-600">/5</span>
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">Nenhum feedback recente</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}