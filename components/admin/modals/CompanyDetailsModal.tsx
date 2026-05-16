import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'sonner';
import {
  Building2, Users, Calendar, Mail, Phone,
  User, Plus, Copy, Check, Loader2, X, Send, Tag,
  ChevronDown, ChevronUp, UserPlus, FileBarChart2,
} from 'lucide-react';
import { MonthlyReportModal } from './MonthlyReportModal';

// ── Types ──────────────────────────────────────────────────────────────────────

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string | null;
  onUpdate: () => void;
}

interface CompanyData {
  id: string;
  company_name: string;
  email: string;
  phone: string | null;
  industry: string | null;
  employee_seats: number;
  sessions_used: number;
  metadata: any;
}

interface CompanyEmployee {
  id: string;
  user_id: string | null;
  department: string | null;
  job_title: string | null;
  is_active: boolean | null;
  joined_at: string | null;
  profile: { full_name: string | null; email: string; phone: string | null } | null;
}

interface PendingInvite {
  id: string;
  email: string;
  full_name: string | null;
  department: string | null;
  status: string | null;
  invite_code: string;
  seats: number | null;
  created_at: string | null;
}

interface Department {
  id: string;
  name: string;
}

function makeCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// ── Component ──────────────────────────────────────────────────────────────────

export function CompanyDetailsModal({
  isOpen, onClose, companyId, onUpdate,
}: CompanyDetailsModalProps) {
  const { user } = useAuth();

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [employees, setEmployees] = useState<CompanyEmployee[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [showDepts, setShowDepts] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Add Worker
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [workerEmail, setWorkerEmail] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [workerDept, setWorkerDept] = useState('');
  const [sendEmailInvite, setSendEmailInvite] = useState(true);
  const [savingWorker, setSavingWorker] = useState(false);
  const [workerCode, setWorkerCode] = useState<string | null>(null);

  // Bulk code
  const [showBulkCode, setShowBulkCode] = useState(false);
  const [bulkSeats, setBulkSeats] = useState('');
  const [bulkDept, setBulkDept] = useState('');
  const [generatingBulk, setGeneratingBulk] = useState(false);
  const [bulkCode, setBulkCode] = useState<string | null>(null);

  // New department
  const [newDeptName, setNewDeptName] = useState('');
  const [savingDept, setSavingDept] = useState(false);

  // Inline dept edit per employee
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [editingDeptValue, setEditingDeptValue] = useState('');

  // Monthly report modal
  const [showReport, setShowReport] = useState(false);

  // ── Fetch ────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const [companyRes, employeesRes, invitesRes, deptsRes] = await Promise.all([
        supabase.from('companies').select('*').eq('id', companyId as any).single(),
        supabase
          .from('company_employees')
          .select('id, user_id, department, job_title, is_active, joined_at, profiles!company_employees_user_id_fkey(full_name, email, phone)')
          .eq('company_id', companyId as any)
          .order('joined_at', { ascending: false }),
        supabase
          .from('company_invites')
          .select('id, email, full_name, department, status, invite_code, seats, created_at')
          .eq('company_id', companyId as any)
          .eq('role', 'employee')
          .order('created_at', { ascending: false }),
        supabase
          .from('company_departments')
          .select('id, name')
          .eq('company_id', companyId as any)
          .order('name'),
      ]);

      if (companyRes.data) setCompany(companyRes.data as any);
      if (employeesRes.data) {
        setEmployees(
          (employeesRes.data as any[]).map((e) => ({
            ...e,
            profile: Array.isArray(e.profiles) ? (e.profiles[0] ?? null) : e.profiles,
          }))
        );
      }
      if (invitesRes.data) setPendingInvites(invitesRes.data as any);
      if (deptsRes.data) setDepartments(deptsRes.data as any);
    } catch (err) {
      console.error('CompanyDetailsModal fetch error:', err);
      toast.error('Erro ao carregar dados da empresa');
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (isOpen && companyId) fetchData();
  }, [isOpen, companyId, fetchData]);

  const handleClose = () => {
    setShowAddWorker(false);
    setShowBulkCode(false);
    setWorkerCode(null);
    setBulkCode(null);
    setDeptFilter(null);
    setShowDepts(false);
    setWorkerEmail('');
    setWorkerName('');
    setWorkerDept('');
    setBulkSeats('');
    setBulkDept('');
    setNewDeptName('');
    onClose();
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Add single worker ────────────────────────────────────
  const handleAddWorker = async () => {
    if (!workerEmail.trim() || !companyId) return;
    setSavingWorker(true);
    try {
      const code = makeCode();
      const { error } = await supabase.from('company_invites').insert({
        company_id: companyId,
        email: workerEmail.trim(),
        full_name: workerName.trim() || null,
        department: workerDept || null,
        role: 'employee',
        status: 'pending',
        invite_code: code,
        invited_by: user?.id,
      } as any);
      if (error) throw error;

      if (sendEmailInvite) {
        try {
          await supabase.functions.invoke('send-invite-email', {
            body: {
              type: 'worker',
              email: workerEmail.trim(),
              workerName: workerName.trim() || null,
              companyName: company?.company_name,
              code,
              department: workerDept || null,
            },
          });
        } catch {
          toast.warning('Convite criado, mas o email falhou. Partilhe o código manualmente.');
        }
      }

      setWorkerCode(code);
      setWorkerEmail('');
      setWorkerName('');
      setWorkerDept('');
      await fetchData();
      onUpdate();
      toast.success('Colaborador convidado!');
    } catch (err: any) {
      toast.error('Erro ao criar convite: ' + (err.message ?? 'Tente novamente'));
    } finally {
      setSavingWorker(false);
    }
  };

  // ── Bulk code ────────────────────────────────────────────
  const handleGenerateBulkCode = async () => {
    if (!bulkSeats || !companyId) return;
    setGeneratingBulk(true);
    try {
      const code = makeCode();
      const { error } = await supabase.from('company_invites').insert({
        company_id: companyId,
        email: `bulk-${code.toLowerCase()}@placeholder.internal`,
        role: 'employee',
        status: 'pending',
        invite_code: code,
        seats: parseInt(bulkSeats),
        department: bulkDept || null,
        invited_by: user?.id,
      } as any);
      if (error) throw error;

      setBulkCode(code);
      await fetchData();
      onUpdate();
      toast.success('Código em lote gerado!');
    } catch (err: any) {
      toast.error('Erro ao gerar código: ' + (err.message ?? 'Tente novamente'));
    } finally {
      setGeneratingBulk(false);
    }
  };

  // ── Departments ──────────────────────────────────────────
  const handleAddDepartment = async () => {
    if (!newDeptName.trim() || !companyId) return;
    setSavingDept(true);
    try {
      const { error } = await supabase.from('company_departments').insert({
        company_id: companyId,
        name: newDeptName.trim(),
      } as any);
      if (error) {
        if (error.code === '23505') toast.error('Este departamento já existe.');
        else throw error;
      } else {
        setNewDeptName('');
        await fetchData();
        toast.success('Departamento criado!');
      }
    } catch {
      toast.error('Erro ao criar departamento');
    } finally {
      setSavingDept(false);
    }
  };

  const handleDeleteDepartment = async (deptId: string) => {
    try {
      const { error } = await supabase.from('company_departments').delete().eq('id', deptId as any);
      if (error) throw error;
      await fetchData();
      toast.success('Departamento removido');
    } catch {
      toast.error('Erro ao remover departamento');
    }
  };

  const handleUpdateDepartment = async (empId: string) => {
    try {
      const { error } = await supabase
        .from('company_employees')
        .update({ department: editingDeptValue || null } as any)
        .eq('id', empId as any);
      if (error) throw error;
      setEditingDeptId(null);
      await fetchData();
      toast.success('Departamento atualizado');
    } catch {
      toast.error('Erro ao atualizar departamento');
    }
  };

  // ── Derived ──────────────────────────────────────────────
  const filteredEmployees = deptFilter
    ? employees.filter((e) => e.department === deptFilter)
    : employees;

  const pendingCount = pendingInvites.filter((i) => i.status === 'pending').length;

  // ── Render ───────────────────────────────────────────────
  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="!max-w-[95vw] w-[95vw] max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">Detalhes da Empresa</DialogTitle>
        <DialogDescription className="sr-only">Gerir colaboradores, convites e departamentos</DialogDescription>

        {loading || !company ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="flex flex-col bg-white">

            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{company.company_name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-0.5">
                    {company.industry && <span>{company.industry}</span>}
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{company.email}</span>
                    {company.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{company.phone}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm" variant="outline"
                  onClick={() => setShowReport(true)}
                  className="h-8 text-xs gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <FileBarChart2 className="w-3.5 h-3.5" />
                  Gerar Relatório
                </Button>
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 bg-white">

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Colaboradores</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">de {company.employee_seats} lugares</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sessões realizadas</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{company.sessions_used ?? 0}</p>
                  <p className="text-xs text-gray-400 mt-0.5">sessões concluídas</p>
                </div>
              </div>

              {/* Departments */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowDepts(!showDepts)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-900">Departamentos</span>
                    <Badge className="bg-purple-50 text-purple-700 border-0 text-xs ml-1">{departments.length}</Badge>
                  </div>
                  {showDepts ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {showDepts && (
                  <div className="border-t border-gray-100 p-4 bg-white space-y-4">
                    <div className="flex flex-wrap gap-2 min-h-[28px]">
                      {departments.length === 0 && (
                        <p className="text-sm text-gray-400">Nenhum departamento criado ainda.</p>
                      )}
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center gap-1 bg-purple-50 border border-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                          <span>{dept.name}</span>
                          <button onClick={() => handleDeleteDepartment(dept.id)} className="ml-0.5 hover:text-red-500 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newDeptName}
                        onChange={(e) => setNewDeptName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddDepartment()}
                        placeholder="Nome do departamento..."
                        className="flex-1 h-9 text-sm"
                      />
                      <Button size="sm" onClick={handleAddDepartment} disabled={!newDeptName.trim() || savingDept} className="h-9 gap-1">
                        {savingDept ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                        Adicionar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Employees */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Colaboradores</h3>
                    <span className="text-sm text-gray-400">({employees.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm" variant="outline"
                      onClick={() => { setShowBulkCode(true); setShowAddWorker(false); setBulkCode(null); }}
                      className="h-8 text-xs gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Gerar Código em Lote
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => { setShowAddWorker(true); setShowBulkCode(false); setWorkerCode(null); }}
                      className="h-8 text-xs gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <UserPlus className="w-3 h-3" />
                      Adicionar Colaborador
                    </Button>
                  </div>
                </div>

                {/* Add Worker form */}
                {showAddWorker && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-4">
                    {!workerCode ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-blue-900 text-sm flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          Convidar Colaborador
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Email *</Label>
                            <Input value={workerEmail} onChange={(e) => setWorkerEmail(e.target.value)} placeholder="colaborador@empresa.com" type="email" className="h-9 text-sm bg-white" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Nome (opcional)</Label>
                            <Input value={workerName} onChange={(e) => setWorkerName(e.target.value)} placeholder="Nome completo" className="h-9 text-sm bg-white" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 mb-1 block">Departamento (opcional)</Label>
                          {departments.length > 0 ? (
                            <select value={workerDept} onChange={(e) => setWorkerDept(e.target.value)} className="w-full h-9 rounded-lg border border-gray-200 bg-white text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="">Sem departamento</option>
                              {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                          ) : (
                            <Input value={workerDept} onChange={(e) => setWorkerDept(e.target.value)} placeholder="Ex: Recursos Humanos" className="h-9 text-sm bg-white" />
                          )}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input type="checkbox" checked={sendEmailInvite} onChange={(e) => setSendEmailInvite(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700 flex items-center gap-1.5">
                            <Send className="w-3 h-3 text-blue-500" />
                            Enviar convite por email automaticamente
                          </span>
                        </label>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" variant="outline" onClick={() => setShowAddWorker(false)} className="h-8 text-xs bg-white">Cancelar</Button>
                          <Button size="sm" onClick={handleAddWorker} disabled={!workerEmail.trim() || savingWorker} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                            {savingWorker && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
                            Enviar Convite
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm mb-1">Convite criado!</p>
                        <p className="text-xs text-gray-500 mb-3">Código de acesso do colaborador:</p>
                        <div className="flex items-center justify-center gap-2 bg-white border-2 border-blue-100 rounded-xl px-5 py-3 mx-auto w-fit mb-4">
                          <code className="text-xl font-mono font-bold text-blue-600 tracking-widest">{workerCode}</code>
                          <button onClick={() => copyCode(workerCode!, 'worker-done')} className="text-gray-400 hover:text-gray-600 ml-1">
                            {copiedId === 'worker-done' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => { setShowAddWorker(false); setWorkerCode(null); }}>Fechar</Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bulk code form */}
                {showBulkCode && (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
                    {!bulkCode ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 text-sm flex items-center gap-2">
                          <Copy className="w-4 h-4 text-gray-600" />
                          Gerar Código em Lote
                        </h4>
                        <p className="text-xs text-gray-500">Um único código partilhável com vários colaboradores para auto-registo.</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Número de usos *</Label>
                            <Input value={bulkSeats} onChange={(e) => setBulkSeats(e.target.value)} placeholder="Ex: 20" type="number" min="1" className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Departamento (opcional)</Label>
                            {departments.length > 0 ? (
                              <select value={bulkDept} onChange={(e) => setBulkDept(e.target.value)} className="w-full h-9 rounded-lg border border-gray-200 bg-white text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Sem departamento</option>
                                {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                              </select>
                            ) : (
                              <Input value={bulkDept} onChange={(e) => setBulkDept(e.target.value)} placeholder="Departamento" className="h-9 text-sm" />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" variant="outline" onClick={() => setShowBulkCode(false)} className="h-8 text-xs">Cancelar</Button>
                          <Button size="sm" onClick={handleGenerateBulkCode} disabled={!bulkSeats || generatingBulk} className="h-8 text-xs">
                            {generatingBulk && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
                            Gerar Código
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <p className="font-medium text-gray-900 text-sm mb-1">Código gerado!</p>
                        <p className="text-xs text-gray-500 mb-3">Válido para {bulkSeats} registo{Number(bulkSeats) !== 1 ? 's' : ''}. Partilhe com os colaboradores.</p>
                        <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 mx-auto w-fit mb-4">
                          <code className="text-xl font-mono font-bold text-gray-900 tracking-widest">{bulkCode}</code>
                          <button onClick={() => copyCode(bulkCode!, 'bulk-done')} className="text-gray-400 hover:text-gray-600 ml-1">
                            {copiedId === 'bulk-done' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => { setShowBulkCode(false); setBulkCode(null); setBulkSeats(''); setBulkDept(''); }}>Fechar</Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Department filter chips */}
                {departments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => setDeptFilter(null)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!deptFilter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      Todos ({employees.length})
                    </button>
                    {departments.map((dept) => {
                      const count = employees.filter((e) => e.department === dept.name).length;
                      return (
                        <button
                          key={dept.id}
                          onClick={() => setDeptFilter(deptFilter === dept.name ? null : dept.name)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${deptFilter === dept.name ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
                        >
                          {dept.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Employees table */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Nome</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Email</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Departamento</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Estado</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Membro desde</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredEmployees.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-10 text-center text-gray-400 text-sm">
                            {deptFilter ? `Nenhum colaborador no departamento "${deptFilter}"` : 'Nenhum colaborador registado nesta empresa'}
                          </td>
                        </tr>
                      ) : filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-gray-500" />
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[140px]">{emp.profile?.full_name || '—'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{emp.profile?.email}</td>
                          <td className="px-4 py-3">
                            {editingDeptId === emp.id ? (
                              <div className="flex items-center gap-1">
                                {departments.length > 0 ? (
                                  <select
                                    value={editingDeptValue}
                                    onChange={(e) => setEditingDeptValue(e.target.value)}
                                    className="h-7 rounded-md border border-gray-200 bg-white text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[130px]"
                                  >
                                    <option value="">Sem departamento</option>
                                    {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                                  </select>
                                ) : (
                                  <Input
                                    value={editingDeptValue}
                                    onChange={(e) => setEditingDeptValue(e.target.value)}
                                    placeholder="Departamento"
                                    className="h-7 text-xs max-w-[130px]"
                                  />
                                )}
                                <button onClick={() => handleUpdateDepartment(emp.id)} className="text-green-600 hover:text-green-700 p-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setEditingDeptId(null)} className="text-gray-400 hover:text-gray-600 p-0.5">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              emp.department
                                ? <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs">{emp.department}</span>
                                : <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${emp.is_active !== false ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {emp.is_active !== false ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {emp.joined_at ? new Date(emp.joined_at).toLocaleDateString('pt-PT') : '—'}
                          </td>
                          <td className="px-4 py-3">
                            {editingDeptId !== emp.id && (
                              <button
                                onClick={() => { setEditingDeptId(emp.id); setEditingDeptValue(emp.department ?? ''); }}
                                className="text-gray-300 hover:text-purple-500 transition-colors p-1 rounded"
                                title="Editar departamento"
                              >
                                <Tag className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending invites */}
              {pendingInvites.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    Convites Pendentes
                    {pendingCount > 0 && (
                      <Badge className="bg-amber-50 text-amber-700 border-0 text-xs">
                        {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </h3>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-x-auto">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Email / Tipo</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Nome</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Departamento</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Código</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Usos</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Estado</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Criado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {pendingInvites.map((invite) => {
                          const isBulk = invite.email.startsWith('bulk-');
                          return (
                            <tr key={invite.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-700 text-xs">
                                {isBulk
                                  ? <span className="flex items-center gap-1 text-gray-400 italic"><Copy className="w-3 h-3" />Código em lote</span>
                                  : invite.email}
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs">{invite.full_name || '—'}</td>
                              <td className="px-4 py-3">
                                {invite.department
                                  ? <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs">{invite.department}</span>
                                  : <span className="text-gray-300 text-xs">—</span>}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <code className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-blue-600">{invite.invite_code}</code>
                                  <button onClick={() => copyCode(invite.invite_code, invite.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    {copiedId === invite.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs">{invite.seats ? `${invite.seats} usos` : '1 uso'}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  invite.status === 'pending' ? 'bg-amber-50 text-amber-700'
                                  : invite.status === 'accepted' ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {invite.status === 'pending' ? 'Pendente' : invite.status === 'accepted' ? 'Aceite' : invite.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-400 text-xs">
                                {invite.created_at ? new Date(invite.created_at).toLocaleDateString('pt-PT') : '—'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {company && (
      <MonthlyReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        companyId={companyId}
        companyName={company.company_name}
      />
    )}
  </>
  );
}
