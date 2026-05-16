import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Building2, Users, Activity, TrendingUp, Calendar, Mail, Phone, User, MonitorCheck, Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CompanyEmployee {
  id: string;
  user_id: string | null;
  role: string | null;
  department: string | null;
  job_title: string | null;
  is_active: boolean | null;
  joined_at: string | null;
  profile?: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    avatar_url: string | null;
    metadata: any;
  } | null;
}

interface CompanySession {
  id: string;
  booking_date: string;
  start_time: string | null;
  end_time: string | null;
  status: string | null;
  meeting_type: string | null;
  primary_pillar: string;
  specialist?: {
    id: string;
    profile?: {
      full_name: string | null;
    } | null;
  } | null;
}

interface CompanyDetailsData {
  id: string;
  company_name: string;
  industry: string | null;
  email: string;
  phone: string | null;
  employee_seats: number;
  sessions_per_employee: number | null;
  metadata: any;
  employees: CompanyEmployee[];
  sessions: CompanySession[];
  session_stats: {
    completed: number;
    upcoming: number;
    cancelled: number;
  };
  total_sessions_allocated: number;
  sessions_used: number;
  sessions_available: number;
}

interface CompanyDetailsProps {
  company: CompanyDetailsData;
  onBack: () => void;
}

type SessionQuota = Database['public']['Tables']['user_personal_quotas']['Row'];

const CANONICAL_PILLARS = [
  { code: 'PSYCH', label: 'Saúde Mental' },
  { code: 'PHYSICAL', label: 'Bem-Estar Físico' },
  { code: 'FINANCIAL', label: 'Assistência Financeira' },
  { code: 'LEGAL', label: 'Assistência Jurídica' },
] as const;

const PILLAR_LABELS: Record<string, string> = {
  psychological: 'Saúde Mental',
  PSYCH: 'Saúde Mental',
  physical: 'Bem-Estar Físico',
  PHYS: 'Bem-Estar Físico',
  financial: 'Assistência Financeira',
  FIN: 'Assistência Financeira',
  legal_social: 'Assistência Jurídica',
  LEGAL: 'Assistência Jurídica',
};

export default function CompanyDetails({ company, onBack }: CompanyDetailsProps) {
  const employeeIds = useMemo(
    () =>
      company.employees
        .map((employee) => employee.user_id)
        .filter((id): id is string => Boolean(id)),
    [company.employees]
  );

  const [quotasByUser, setQuotasByUser] = useState<Record<string, SessionQuota[]>>({});
  const [loadingQuotas, setLoadingQuotas] = useState(false);
  const [quotaError, setQuotaError] = useState<string | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<CompanyEmployee | null>(null);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [savingSessions, setSavingSessions] = useState(false);

  const totalSessionsAllocated = company.total_sessions_allocated;
  const sessionsUsed = company.sessions_used;
  const sessionsAvailable = company.sessions_available;
  const utilizationPercent = totalSessionsAllocated > 0 ? Math.round((sessionsUsed / totalSessionsAllocated) * 100) : 0;
  const sessionsPerEmployee = company.sessions_per_employee ?? (
    totalSessionsAllocated > 0 && (company.employee_seats ?? 0) > 0
      ? Math.round(totalSessionsAllocated / (company.employee_seats || 1))
      : 0
  );

  const employeeMap = useMemo(() => {
    const map: Record<string, CompanyEmployee> = {};
    company.employees.forEach((employee) => {
      map[employee.id] = employee;
    });
    return map;
  }, [company.employees]);

  const employees = useMemo(() => {
    const employeesList = company.employees || [];
    console.log('CompanyDetails - Processing employees:', {
      companyId: company.id,
      companyName: company.company_name,
      employeesCount: employeesList.length,
      employees: employeesList.map(e => ({ id: e.id, name: e.profile?.full_name, user_id: e.user_id }))
    });

    return employeesList.map((employee) => ({
      id: employee.id,
      user_id: employee.user_id,
      name: employee.profile?.full_name || 'Sem nome',
      email: employee.profile?.email,
      phone: employee.profile?.phone,
      department: employee.department || employee.job_title || 'N/A',
      status: employee.is_active === false ? 'Inativo' : 'Ativo',
      profile: employee.profile,
    }));
  }, [company.employees, company.id, company.company_name]);

  const sessions = company.sessions.map((session) => ({
    id: session.id,
    bookingDate: session.booking_date,
    startTime: session.start_time,
    status: session.status || 'Sem estado',
    meetingType: session.meeting_type,
    pillar: session.primary_pillar || '',
    specialistName: session.specialist?.profile?.full_name || 'Especialista',
  }));

  const metadata = company.metadata ? (company.metadata as Record<string, any>) : {};
  const planName = metadata?.plan_name || metadata?.plan || 'Plano não definido';

  const fetchQuotas = useCallback(async () => {
    if (employeeIds.length === 0) {
      console.log('No employee IDs to fetch quotas for');
      setQuotasByUser({});
      setQuotaError(null);
      return;
    }

    console.log('Fetching quotas for employees:', {
      employeeIdsCount: employeeIds.length,
      employeeIds: employeeIds
    });

    setLoadingQuotas(true);
    try {
      const { data, error } = await supabase
        .from('user_personal_quotas')
        .select('*')
        .in('user_id', employeeIds);

      if (error) {
        console.error('Error fetching quotas:', error);
        throw error;
      }

      console.log('Quotas fetched from backend:', {
        totalQuotas: data?.length || 0,
        quotas: data
      });

      const grouped = (data || []).reduce<Record<string, SessionQuota[]>>((acc, quota) => {
        if (!quota.user_id) return acc;
        if (!acc[quota.user_id]) {
          acc[quota.user_id] = [];
        }
        acc[quota.user_id].push(quota);
        return acc;
      }, {});

      console.log('Quotas grouped by user:', {
        usersWithQuotas: Object.keys(grouped).length,
        grouped: grouped
      });

      setQuotasByUser(grouped);
      setQuotaError(null);
    } catch (err: any) {
      console.error('Error fetching quotas for admin view:', err);
      setQuotaError(err.message);
      setQuotasByUser({});
    } finally {
      setLoadingQuotas(false);
    }
  }, [employeeIds]);

  useEffect(() => {
    fetchQuotas();
  }, [fetchQuotas]);

  const getQuotaStats = (userId?: string | null) => {
    if (!userId) {
      return { total: 0, used: 0, available: 0 };
    }
    const rows = quotasByUser[userId] || [];
    const total = rows.reduce((sum, row) => sum + (row.total_sessions || 0), 0);
    const used = rows.reduce((sum, row) => sum + (row.sessions_used || 0), 0);
    return {
      total,
      used,
      available: Math.max(total - used, 0),
    };
  };

  const handleOpenEditSessions = (employee: CompanyEmployee) => {
    if (!employee.user_id) {
      console.warn('Cannot open edit sessions: employee has no user_id', employee);
      return;
    }
    const userQuotas = quotasByUser[employee.user_id] || [];
    console.log('Opening edit sessions for employee:', {
      employeeId: employee.id,
      userId: employee.user_id,
      employeeName: employee.profile?.full_name,
      quotasFound: userQuotas.length,
      quotas: userQuotas
    });

    // Calculate total sessions across all pillars
    const total = userQuotas.reduce((sum, quota) => sum + (quota.total_sessions || 0), 0);
    console.log('Calculated total sessions:', total, 'from quotas:', userQuotas);
    setTotalSessions(total);
    setEditingEmployee(employee);
  };

  const handleTotalSessionsChange = (value: string) => {
    const parsed = Number(value);
    setTotalSessions(isNaN(parsed) ? 0 : Math.max(0, parsed));
  };

  const handleCloseDialog = () => {
    setEditingEmployee(null);
    setTotalSessions(0);
  };

  const handleSaveSessions = async () => {
    if (!editingEmployee?.user_id) return;

    setSavingSessions(true);
    try {
      const userId = editingEmployee.user_id;
      const existingRows = quotasByUser[userId] || [];

      // Get the existing quota record (there should only be one now)
      const existing = existingRows[0];
      const safeUsed = Math.min(existing?.sessions_used ?? 0, totalSessions);

      // Simple upsert - just update the total_sessions
      const { error } = await supabase
        .from('user_personal_quotas')
        .upsert({
          user_id: userId,
          total_sessions: totalSessions,
          sessions_used: safeUsed,
        }, {
          onConflict: 'user_id',
        });

      if (error) throw error;

      await fetchQuotas();
      handleCloseDialog();
      alert(`✅ Sessões atualizadas para ${editingEmployee.profile?.full_name || 'colaborador'}.`);
    } catch (err: any) {
      console.error('Error updating user sessions:', err);
      alert('Erro ao atualizar sessões: ' + err.message);
    } finally {
      setSavingSessions(false);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-[#FAFAFA]">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Voltar</span>
        </button>
        <div>
          <h1 className="text-gray-900 mb-1">Detalhes da Empresa</h1>
          <p className="text-gray-500">Informações completas sobre colaboradores e sessões</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Company Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#E8F4FF] rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#007AFF]" />
            </div>
            <div>
              <h2 className="text-gray-900">{company.company_name}</h2>
              <p className="text-sm text-gray-500">{company.industry || 'Setor não informado'}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{company.email}</span>
            </div>
            {company.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{company.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MonitorCheck className="w-4 h-4 text-gray-400" />
              <span>Plano atual: {planName}</span>
            </div>
          </div>
        </div>

        {/* Sessions Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#D4F4DD] rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#34C759]" />
            </div>
            <div>
              <h2 className="text-gray-900">Sessões</h2>
              <p className="text-sm text-gray-500">Alocação e utilização</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total alocado</span>
              <span className="text-gray-900">{totalSessionsAllocated}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Utilizadas</span>
              <span className="text-gray-900">{sessionsUsed}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Disponíveis</span>
              <span className="text-gray-900">{sessionsAvailable}</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
                <span>Taxa de utilização</span>
                <span className="text-[#34C759] font-medium">{utilizationPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#34C759] h-2 rounded-full transition-all"
                  style={{ width: `${utilizationPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employees Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FFE9B8] rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-gray-900">Colaboradores</h2>
              <p className="text-sm text-gray-500">
                {employees.length} ativos de {company.employee_seats || employees.length} lugares
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <div className="text-xs text-gray-500">Sessões/colaborador</div>
              <div className="text-gray-900">
                {sessionsPerEmployee}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Sessões pendentes</div>
              <div className="text-gray-900">
                {company.session_stats.upcoming}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Sessões concluídas</div>
              <div className="text-gray-900">
                {company.session_stats.completed}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Canceladas</div>
              <div className="text-gray-900">{company.session_stats.cancelled}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Employees List */}
      <div className="mb-6 md:mb-10">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-gray-900 flex items-center gap-2 text-lg md:text-xl">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            Colaboradores
            {employees && employees.length > 0 && (
              <span className="text-sm text-gray-500 font-normal">
                ({employees.length} {employees.length === 1 ? 'colaborador' : 'colaboradores'})
              </span>
            )}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Mobile: Card Layout */}
          <div className="md:hidden">
            {(!employees || employees.length === 0) ? (
              <div className="px-4 py-8 text-center text-gray-500">
                Nenhum colaborador registado para esta empresa.
                {console.log('No employees to display - employees array:', employees, 'company.employees:', company.employees)}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {employees.map((employee, index) => {
                  console.log(`Rendering employee ${index + 1}/${employees.length}:`, employee.name);
                  return (
                    <div key={employee.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-gray-900 font-medium truncate">{employee.name}</p>
                            <p className="text-xs text-gray-500 truncate">{employee.email}</p>
                          </div>
                        </div>
                        <Badge className={`flex-shrink-0 ${employee.status === 'Ativo' ? 'bg-[#d4f4dd] text-[#34C759]' : 'bg-gray-200 text-gray-600'}`}>
                          {employee.status}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Contacto</p>
                        <p className="text-gray-700">{employee.phone || '—'}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Sessões</p>
                        {loadingQuotas ? (
                          <span className="text-sm text-gray-500">A carregar…</span>
                        ) : (
                          <div className="text-sm">
                            <p className="text-gray-900 font-medium">
                              {getQuotaStats(employee.user_id).available} disponíveis
                            </p>
                            <p className="text-xs text-gray-500">
                              {getQuotaStats(employee.user_id).used} usadas de {getQuotaStats(employee.user_id).total}
                            </p>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => employeeMap[employee.id] && handleOpenEditSessions(employeeMap[employee.id])}
                        disabled={!employee.user_id}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar Sessões
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Nome</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Email</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Contacto</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Sessões</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Estado</th>
                  <th className="text-right px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(!employees || employees.length === 0) ? (
                  <tr>
                    <td colSpan={6} className="px-4 md:px-6 py-8 text-center text-gray-500">
                      Nenhum colaborador registado para esta empresa.
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                          </div>
                          <span className="text-gray-900 text-sm md:text-base truncate">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="break-all text-xs md:text-sm">{employee.email}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-600 text-xs md:text-sm">{employee.phone || '—'}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        {loadingQuotas ? (
                          <span className="text-xs md:text-sm text-gray-500">A carregar…</span>
                        ) : (
                          <div className="space-y-1 text-xs md:text-sm">
                            <p className="text-gray-900 font-medium">
                              {getQuotaStats(employee.user_id).available} disponíveis
                            </p>
                            <p className="text-xs text-gray-500">
                              {getQuotaStats(employee.user_id).used} usadas de {getQuotaStats(employee.user_id).total}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <Badge className={`text-xs ${employee.status === 'Ativo' ? 'bg-[#d4f4dd] text-[#34C759]' : 'bg-gray-200 text-gray-600'}`}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => employeeMap[employee.id] && handleOpenEditSessions(employeeMap[employee.id])}
                          disabled={!employee.user_id}
                          className="text-xs"
                        >
                          <Edit2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">Editar</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div>
        <h2 className="text-gray-900 mb-3 md:mb-4 flex items-center gap-2 text-lg md:text-xl">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
          Sessões Registadas
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Mobile: Card Layout */}
          <div className="md:hidden">
            {sessions.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                Nenhuma sessão registada para esta empresa.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {sessions.map((session) => (
                  <div key={session.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium text-sm">
                          {new Date(session.bookingDate).toLocaleDateString('pt-PT')}
                        </p>
                        <p className="text-xs text-gray-500">{session.startTime || '—'}</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                        {session.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Pilar</p>
                        <p className="text-gray-700">{PILLAR_LABELS[session.pillar] || session.pillar}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Especialista</p>
                        <p className="text-gray-700 truncate">{session.specialistName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Data</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Hora</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Pilar</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Especialista</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs md:text-sm">Estado</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 md:px-6 py-8 text-center text-gray-500">
                      Nenhuma sessão registada para esta empresa.
                    </td>
                  </tr>
                ) : (
                  sessions.map((session) => (
                    <tr key={session.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">
                        {new Date(session.bookingDate).toLocaleDateString('pt-PT')}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">{session.startTime || '—'}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">
                        {PILLAR_LABELS[session.pillar] || session.pillar}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">{session.specialistName}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <Badge className="bg-gray-100 text-gray-700 text-xs">
                          {session.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={Boolean(editingEmployee)} onOpenChange={(open) => (!open ? handleCloseDialog() : null)}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Editar sessões do colaborador</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">
              Defina o número total de sessões disponíveis para o colaborador. Os valores não podem ser negativos e nunca reduzimos sessões já utilizadas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Colaborador</p>
              <p className="text-sm md:text-base font-semibold text-gray-900">
                {editingEmployee?.profile?.full_name || editingEmployee?.profile?.email || '—'}
              </p>
              {quotaError && (
                <p className="text-xs text-red-500 mt-2">
                  Não foi possível carregar quotas automaticamente: {quotaError}
                </p>
              )}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="space-y-2 block">
                <span className="text-sm md:text-base font-medium text-gray-700 block mb-2">
                  Total de Sessões
                </span>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={totalSessions}
                  onChange={(e) => handleTotalSessionsChange(e.target.value)}
                  className="w-full text-base md:text-lg font-semibold"
                  placeholder="0"
                />
              </label>
            </div>
          </div>

          <DialogFooter className="mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveSessions}
              disabled={savingSessions}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {savingSessions ? 'A guardar...' : 'Guardar alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
