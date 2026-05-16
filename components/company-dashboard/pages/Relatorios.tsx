import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Loader2, Users, FileText, CheckCircle, Calendar, TrendingUp, Target, AlertCircle, Smile, Activity } from 'lucide-react';
import { CodeGenerator, InviteCode } from '../components/CodeGenerator';
import { OnboardingTracker } from '../components/OnboardingTracker';
import { useCompany } from '@/contexts/CompanyContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

interface LiveStats {
  sessionsThisMonth: number;
  adoptionRate: number;
  topPillar: string | null;
  neverBookedCount: number;
  avgMoodThisMonth: number | null;
  unusedInviteCodes: number;
}

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Mental',
  psych: 'Mental',
  PHYSICAL: 'Físico',
  physical: 'Físico',
  FINANCIAL: 'Financeiro',
  financial: 'Financeiro',
  LEGAL: 'Jurídico',
  legal: 'Jurídico',
};

const MOOD_LABELS = ['Muito Mau', 'Mau', 'Neutro', 'Bom', 'Muito Bom'];

export function Relatorios({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const { company, employees, loading: loadingCompany } = useCompany();
  const [invites, setInvites] = useState<InviteCode[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchInvites = async () => {
    if (!company?.id) return;

    setLoadingInvites(true);
    try {
      const { data, error } = await supabase
        .from('company_invites')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvites((data as unknown as InviteCode[]) || []);
    } catch (error) {
      console.error('Error fetching invites:', error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const fetchLiveStats = async () => {
    if (!company?.id || employees.length === 0) return;

    setLoadingStats(true);
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

      const userIds = employees.filter(e => e.is_active && e.user_id).map(e => e.user_id as string);

      const [bookingsRes, allBookingsRes, moodRes, invitesRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, pillar, user_id')
          .in('user_id', userIds)
          .gte('scheduled_at', startOfMonth)
          .lte('scheduled_at', endOfMonth)
          .eq('status', 'completed'),
        supabase
          .from('bookings')
          .select('user_id')
          .in('user_id', userIds),
        // SECURITY DEFINER RPC — bypasses per-user RLS on mood_entries
        supabase.rpc('get_company_mood_stats', {
          p_company_id: company.id,
          p_start_date: startOfMonth,
          p_end_date: endOfMonth,
        }),
        supabase
          .from('company_invites')
          .select('status')
          .eq('company_id', company.id as any),
      ]);

      const sessionsThisMonth = bookingsRes.data?.length ?? 0;

      const everBookedIds = new Set((allBookingsRes.data ?? []).map((b: any) => b.user_id));
      const activeCount = userIds.length;
      const adoptionRate = activeCount > 0 ? Math.round((everBookedIds.size / activeCount) * 100) : 0;

      const neverBookedCount = userIds.filter(id => !everBookedIds.has(id)).length;

      const pillarCounts: Record<string, number> = {};
      for (const b of bookingsRes.data ?? []) {
        const p = (b as any).pillar ?? 'unknown';
        pillarCounts[p] = (pillarCounts[p] ?? 0) + 1;
      }
      const topPillarKey = Object.entries(pillarCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      const topPillar = topPillarKey ? (PILLAR_LABELS[topPillarKey] ?? topPillarKey) : null;

      const avgMoodThisMonth = (!moodRes.error && moodRes.data?.avg_mood_index != null)
        ? Number(moodRes.data.avg_mood_index)
        : null;

      const unusedInviteCodes = (invitesRes.data ?? []).filter(
        (i: any) => i.status === 'pending' || i.status === 'active'
      ).length;

      setLiveStats({ sessionsThisMonth, adoptionRate, topPillar, neverBookedCount, avgMoodThisMonth, unusedInviteCodes });
    } catch (err) {
      console.error('Error fetching live stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [company?.id]);

  useEffect(() => {
    if (employees.length > 0) fetchLiveStats();
  }, [company?.id, employees]);

  const activeEmployees = employees.filter(e => e.is_active).length;
  const totalSeats = company?.total_employees || 50;

  if (loadingCompany) {
    return <div className="flex items-center justify-center min-h-[600px]"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const moodLabel = liveStats?.avgMoodThisMonth != null
    ? MOOD_LABELS[Math.round(liveStats.avgMoodThisMonth)] ?? '—'
    : '—';

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('nav.back')}</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
            {t('reports.title')}
          </h1>
          <p className="text-gray-600 font-medium max-w-2xl">
            {t('reports.description')}
          </p>
        </div>
      </div>

      {/* Top-line invite/code summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white/50 border-blue-100 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{activeEmployees}</div>
                <div className="text-sm text-gray-500 font-medium">{t('reports.activeCollaborators')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 border-purple-100 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{invites.length}</div>
                <div className="text-sm text-gray-500 font-medium">{t('reports.generatedCodes')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 border-green-100 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{invites.filter(i => i.status === 'used' || i.status === 'accepted').length}</div>
                <div className="text-sm text-gray-500 font-medium">{t('reports.activatedCodes')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live HR Dashboard */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Dashboard de Utilização
          </h2>
          <span className="text-xs text-gray-400 font-medium ml-1">• Este mês</span>
        </div>

        {loadingStats ? (
          <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            A carregar métricas…
          </div>
        ) : liveStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white/50 border-blue-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sessões este mês</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{liveStats.sessionsThisMonth}</div>
                <div className="text-xs text-gray-400 mt-1">consultas concluídas</div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-purple-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Taxa de adoção</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{liveStats.adoptionRate}%</div>
                <div className="text-xs text-gray-400 mt-1">colaboradores que já agendaram</div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-green-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pilar mais usado</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{liveStats.topPillar ?? '—'}</div>
                <div className="text-xs text-gray-400 mt-1">área com mais sessões este mês</div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-amber-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sem sessões</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{liveStats.neverBookedCount}</div>
                <div className="text-xs text-gray-400 mt-1">colaboradores sem qualquer consulta</div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-teal-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                    <Smile className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Humor médio</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{moodLabel}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {liveStats.avgMoodThisMonth != null
                    ? `${liveStats.avgMoodThisMonth.toFixed(1)} / 4 este mês`
                    : 'sem registos este mês'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-orange-100 shadow-sm backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Convites por usar</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{liveStats.unusedInviteCodes}</div>
                <div className="text-xs text-gray-400 mt-1">códigos ativos não utilizados</div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
          <div className="mb-10">
            <OnboardingTracker invites={invites} totalSeats={totalSeats} />
          </div>

          <div className="border-t border-gray-200/50 pt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Manrope, sans-serif' }}>{t('reports.inviteManagement')}</h2>
            <CodeGenerator invites={invites} onRefresh={fetchInvites} isLoading={loadingInvites} />
          </div>
        </div>
      </div>
    </div>
  );
}
