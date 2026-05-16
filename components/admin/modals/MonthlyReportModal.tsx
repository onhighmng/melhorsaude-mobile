import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { Loader2, X, Printer, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MonthlyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string | null;
  companyName: string;
}

interface ReportData {
  // Overview
  totalEmployees: number;
  activeThisMonth: number;
  adoptionRate: number;

  // Sessions
  sessionsTotal: number;
  sessionsByPillar: { pillar: string; count: number }[];

  // Funnel
  funnelRegistered: number;
  funnelEverBooked: number;
  funnelEverCompleted: number;
  funnelEverRated: number;

  // Mood
  moodThisMonth: number | null;
  moodLastMonth: number | null;

  // Resources
  topResources: { title: string; views: number }[];

}

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental',
  PHYSICAL: 'Bem-Estar Físico',
  FINANCIAL: 'Financeiro',
  LEGAL: 'Jurídico',
  psychological: 'Saúde Mental',
  physical: 'Bem-Estar Físico',
  financial: 'Financeiro',
  legal_social: 'Jurídico',
};

const PILLAR_COLORS: Record<string, string> = {
  PSYCH: '#1565C0',
  PHYSICAL: '#f97316',
  FINANCIAL: '#16a34a',
  LEGAL: '#7c3aed',
  psychological: '#1565C0',
  physical: '#f97316',
  financial: '#16a34a',
  legal_social: '#7c3aed',
};

function moodLabel(score: number | null): string {
  if (score === null) return '—';
  if (score >= 3.5) return 'Muito Positivo';
  if (score >= 2.5) return 'Positivo';
  if (score >= 1.5) return 'Neutro';
  return 'Baixo';
}

function FunnelBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
    </div>
  );
}

export function MonthlyReportModal({ isOpen, onClose, companyId, companyName }: MonthlyReportModalProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-indexed
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const fetchReport = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setData(null);
    try {
      const start = new Date(year, month, 1).toISOString();
      const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

      // Last month range for mood comparison
      const lastMonthStart = new Date(year, month - 1, 1).toISOString();
      const lastMonthEnd = new Date(year, month, 0, 23, 59, 59).toISOString();

      // 1. Company employees (all)
      const { data: emps } = await (supabase.from('company_employees') as any)
        .select('user_id, is_active')
        .eq('company_id', companyId);

      const employeeUserIds: string[] = (emps || []).map((e: any) => e.user_id).filter(Boolean);
      const totalEmployees = employeeUserIds.length;

      // 2. Bookings this month for company
      const { data: bookingsThisMonth } = await (supabase.from('bookings') as any)
        .select('id, user_id, primary_pillar, status, completed_at, booking_date')
        .eq('company_id', companyId)
        .gte('booking_date', start.split('T')[0])
        .lte('booking_date', end.split('T')[0]);

      const booksMonth: any[] = bookingsThisMonth || [];
      const completedThisMonth = booksMonth.filter((b: any) => b.status === 'completed');
      const activeThisMonthIds = new Set(booksMonth.map((b: any) => b.user_id).filter(Boolean));

      // Sessions by pillar
      const pillarMap: Record<string, number> = {};
      completedThisMonth.forEach((b: any) => {
        const p = b.primary_pillar || 'unknown';
        pillarMap[p] = (pillarMap[p] || 0) + 1;
      });
      const sessionsByPillar = Object.entries(pillarMap)
        .map(([pillar, count]) => ({ pillar, count }))
        .sort((a, b) => b.count - a.count);

      // 3. Funnel — all-time for this company
      const { data: allBookings } = await (supabase.from('bookings') as any)
        .select('user_id, status')
        .eq('company_id', companyId);

      const allB: any[] = allBookings || [];
      const everBookedIds = new Set(allB.map((b: any) => b.user_id).filter(Boolean));
      const everCompletedIds = new Set(allB.filter((b: any) => b.status === 'completed').map((b: any) => b.user_id).filter(Boolean));

      // Session feedback (rated)
      let ratedIds = new Set<string>();
      if (employeeUserIds.length > 0) {
        const { data: feedback } = await (supabase.from('session_feedback') as any)
          .select('user_id')
          .in('user_id', employeeUserIds.slice(0, 400));
        ratedIds = new Set((feedback || []).map((f: any) => f.user_id).filter(Boolean));
      }

      // 4. Mood this month and last month (via SECURITY DEFINER RPC — bypasses per-user RLS)
      let moodThisMonth: number | null = null;
      let moodLastMonth: number | null = null;
      const [moodCurrentRes, moodPrevRes] = await Promise.all([
        supabase.rpc('get_company_mood_stats', {
          p_company_id: companyId,
          p_start_date: start,
          p_end_date: end,
        }),
        supabase.rpc('get_company_mood_stats', {
          p_company_id: companyId,
          p_start_date: lastMonthStart,
          p_end_date: lastMonthEnd,
        }),
      ]);
      if (!moodCurrentRes.error && moodCurrentRes.data?.avg_mood_index != null) {
        moodThisMonth = Number(moodCurrentRes.data.avg_mood_index);
      }
      if (!moodPrevRes.error && moodPrevRes.data?.avg_mood_index != null) {
        moodLastMonth = Number(moodPrevRes.data.avg_mood_index);
      }

      // 5. Top resources by views_count (global, from resources table)
      let topResources: { title: string; views: number }[] = [];
      const { data: topRes } = await (supabase.from('resources') as any)
        .select('title_pt, views_count')
        .eq('is_published', true)
        .order('views_count', { ascending: false })
        .limit(5);
      if (topRes && topRes.length > 0) {
        topResources = topRes.map((r: any) => ({
          title: r.title_pt || 'Recurso',
          views: r.views_count || 0,
        }));
      }

      setData({
        totalEmployees,
        activeThisMonth: activeThisMonthIds.size,
        adoptionRate: totalEmployees > 0 ? Math.round((activeThisMonthIds.size / totalEmployees) * 100) : 0,
        sessionsTotal: completedThisMonth.length,
        sessionsByPillar,
        funnelRegistered: totalEmployees,
        funnelEverBooked: everBookedIds.size,
        funnelEverCompleted: everCompletedIds.size,
        funnelEverRated: ratedIds.size,
        moodThisMonth,
        moodLastMonth,
        topResources,
      });
    } catch (err) {
      console.error('MonthlyReport fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId, year, month]);

  useEffect(() => {
    if (isOpen && companyId) fetchReport();
  }, [isOpen, companyId, fetchReport]);

  const handlePrint = () => window.print();

  const moodScore = data?.moodThisMonth !== null && data?.moodThisMonth !== undefined
    ? ((data.moodThisMonth / 4) * 5).toFixed(1)
    : null;
  const moodScorePrev = data?.moodLastMonth !== null && data?.moodLastMonth !== undefined
    ? ((data.moodLastMonth / 4) * 5).toFixed(1)
    : null;

  const moodDelta = moodScore && moodScorePrev
    ? parseFloat(moodScore) - parseFloat(moodScorePrev)
    : null;

  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #monthly-report-print { display: block !important; }
          .no-print { display: none !important; }
        }
        #monthly-report-print { display: block; }
      `}</style>

      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="!max-w-[90vw] w-[90vw] max-h-[92vh] overflow-y-auto p-0 gap-0 bg-white">
          <DialogTitle className="sr-only">Relatório Mensal</DialogTitle>
          <DialogDescription className="sr-only">Relatório mensal de utilização da plataforma</DialogDescription>

          {/* Modal header — controls only, no-print */}
          <div className="no-print flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Relatório Mensal</h2>
              <div className="flex items-center gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="h-8 text-sm border border-gray-200 rounded-lg px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="h-8 text-sm border border-gray-200 rounded-lg px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {[now.getFullYear() - 1, now.getFullYear()].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                disabled={loading || !data}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Imprimir / PDF
              </button>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Report body */}
          <div id="monthly-report-print" className="p-8 space-y-8">

            {/* Report title block */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Relatório Mensal de Bem-Estar</p>
                <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Pacifico, cursive' }}>{companyName}</h1>
                <p className="text-gray-500 mt-1 text-sm">{monthNames[month]} {year}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Gerado por</p>
                <p className="font-bold text-blue-700 text-lg">Melhor Saúde</p>
                <p className="text-xs text-gray-400 mt-0.5">melhorsaude.com</p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            )}

            {!loading && data && (
              <div className="space-y-8">

                {/* 1. Overview */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Visão Geral</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Colaboradores Registados', value: data.totalEmployees, color: '#1565C0', bg: '#eff6ff' },
                      { label: 'Ativos este mês', value: data.activeThisMonth, color: '#16a34a', bg: '#f0fdf4' },
                      { label: 'Taxa de Adoção', value: `${data.adoptionRate}%`, color: '#7c3aed', bg: '#faf5ff' },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className="rounded-2xl p-5" style={{ background: bg }}>
                        <p className="text-3xl font-bold" style={{ color }}>{value}</p>
                        <p className="text-sm text-gray-500 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. Sessions */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Sessões Concluídas</h2>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-4xl font-bold text-gray-900 mb-4">{data.sessionsTotal}
                      <span className="text-base font-normal text-gray-400 ml-2">sessões este mês</span>
                    </p>
                    {data.sessionsByPillar.length > 0 ? (
                      <div className="space-y-3">
                        {data.sessionsByPillar.map(({ pillar, count }) => {
                          const pct = data.sessionsTotal > 0 ? Math.round((count / data.sessionsTotal) * 100) : 0;
                          const color = PILLAR_COLORS[pillar] || '#6b7280';
                          const label = PILLAR_LABELS[pillar] || pillar;
                          return (
                            <div key={pillar} className="flex items-center gap-3">
                              <span className="text-sm font-medium w-40 shrink-0" style={{ color }}>{label}</span>
                              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                              </div>
                              <span className="text-sm font-bold text-gray-700 w-6 text-right">{count}</span>
                              <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Nenhuma sessão concluída neste período.</p>
                    )}
                  </div>
                </section>

                {/* 3. Engagement Funnel */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Funil de Envolvimento (acumulado)</h2>
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    {[
                      { label: 'Registados na plataforma', value: data.funnelRegistered, color: '#1565C0' },
                      { label: 'Agendaram pelo menos 1 sessão', value: data.funnelEverBooked, color: '#0891b2' },
                      { label: 'Completaram pelo menos 1 sessão', value: data.funnelEverCompleted, color: '#16a34a' },
                      { label: 'Avaliaram pelo menos 1 sessão', value: data.funnelEverRated, color: '#7c3aed' },
                    ].map(({ label, value, color }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{label}</span>
                          <span className="text-sm font-bold text-gray-900">{value}</span>
                        </div>
                        <FunnelBar value={value} max={data.funnelRegistered} color={color} />
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Mood */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Humor Médio da Equipa</h2>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    {moodScore ? (
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-5xl font-bold text-gray-900">{moodScore}<span className="text-xl font-normal text-gray-400">/5</span></p>
                          <p className="text-sm text-gray-500 mt-1">{moodLabel(data.moodThisMonth)}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Este mês</p>
                        </div>
                        {moodScorePrev && (
                          <div className="border-l border-gray-200 pl-8">
                            <p className="text-3xl font-bold text-gray-400">{moodScorePrev}<span className="text-base font-normal">/5</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Mês anterior</p>
                          </div>
                        )}
                        {moodDelta !== null && (
                          <div className="flex items-center gap-2">
                            {moodDelta > 0.1
                              ? <TrendingUp className="w-6 h-6 text-green-600" />
                              : moodDelta < -0.1
                                ? <TrendingDown className="w-6 h-6 text-red-500" />
                                : <Minus className="w-6 h-6 text-gray-400" />}
                            <span className={`text-sm font-medium ${moodDelta > 0.1 ? 'text-green-600' : moodDelta < -0.1 ? 'text-red-500' : 'text-gray-400'}`}>
                              {moodDelta > 0 ? '+' : ''}{moodDelta.toFixed(1)} vs mês anterior
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Sem registos de humor para este período.</p>
                    )}
                  </div>
                </section>

                {/* 5. Top Resources */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Recursos Mais Populares da Plataforma</h2>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    {data.topResources.length > 0 ? (
                      <div className="space-y-3">
                        {data.topResources.map((r, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-300 w-5">{i + 1}</span>
                            <span className="text-sm text-gray-700 flex-1">{r.title}</span>
                            <span className="text-sm font-bold text-gray-900">{r.views}</span>
                            <span className="text-xs text-gray-400">visualizações</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Nenhum recurso publicado ainda.</p>
                    )}
                  </div>
                </section>

                {/* Footer */}
                <div className="border-t border-gray-100 pt-6 text-center">
                  <p className="text-xs text-gray-400">
                    Relatório gerado pela plataforma Melhor Saúde · {monthNames[month]} {year} · Confidencial — uso interno
                  </p>
                </div>

              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
