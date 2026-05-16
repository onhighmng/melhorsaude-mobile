import { ArrowLeft, Trash2, Power, Copy, Check, Eye } from 'lucide-react';
// DISABLED: import from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import { AlertCircle } from 'lucide-react';
import { Button as MovingBorderButton } from '../ui/moving-border';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import melhorSaudeLogo from '@/assets/f066e727bc45a7068fb1f989657736b83adf0448.png';
import { TextShimmer } from '../ui/text-shimmer';
import { supabase } from '@/lib/supabase';
import { CompanyDetailsModal } from '../modals/CompanyDetailsModal';

interface Company {
  id: string;
  name: string;
  email: string;
  code: string;
  sessionsBought: number;
  dateCreated: string;
  status: 'active' | 'deactivated';
  seats: number;
}

interface CompanyInvite {
  id: string;
  invite_code: string;
  email: string | null;
  seats: number | null;
  status: string | null;
  created_at: string | null;
}

export function GestaoEmpresas({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [invites, setInvites] = useState<CompanyInvite[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ seats: '', email: '' });
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [companyToDeactivate, setCompanyToDeactivate] = useState<string | null>(null);

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // New Modal State
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchCompanies(), fetchInvites()]);
  };

  const fetchInvites = async () => {
    try {
      const [invitesResult, codesResult] = await Promise.all([
        supabase
          .from('company_invites')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('access_codes')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (invitesResult.error) {
        console.warn('Error fetching invites:', invitesResult.error);
      }

      if (codesResult.error) {
        console.warn('Error fetching access codes:', codesResult.error);
      }

      const pendingInvites: CompanyInvite[] = (invitesResult.data || []).filter((invite: any) =>
        invite.role !== 'employee'
      );

      // Map access_codes to CompanyInvite format
      const historyInvites: CompanyInvite[] = (codesResult.data || [])
        .filter((code: any) => code.role_type === 'company_admin')
        .map((code: any) => ({
          id: code.id,
          invite_code: code.code,
          email: code.metadata?.email || 'N/A', // Try to get email from metadata
          seats: code.metadata?.seats || 0,
          monthly_total_quota: code.metadata?.sessions || 0,
          status: code.status,
          created_at: code.created_at
        }));

      // Merge and sort by created_at desc
      const allInvites = [...pendingInvites, ...historyInvites].sort((a, b) => {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });

      setInvites(allInvites);
    } catch (error) {
      console.error('Error fetching invites data:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          company_name,
          email,
          access_code,
          monthly_total_quota,
          sessions_used,
          created_at,
          sessions_per_employee,
          is_active,
          employee_seats,
          profiles!companies_created_by_fkey (
            id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match Company interface
      const formattedCompanies: Company[] = (data || []).map((company: any) => ({
        id: company.id,
        name: company.company_name || 'N/A',
        email: company.email || 'N/A',
        code: company.access_code || 'N/A',
        dateCreated: company.created_at || new Date().toISOString(),
        status: company.is_active ? 'active' : 'deactivated',
        seats: company.employee_seats || 0
      }));

      setCompanies(formattedCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const generateUniqueCode = async (): Promise<string> => {
    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      // Check all tables for collision
      const [inviteCheck, accessCheck, companyCheck] = await Promise.all([
        supabase.from('company_invites').select('id').eq('invite_code', code).maybeSingle(),
        supabase.from('access_codes').select('id').eq('code', code).maybeSingle(),
        supabase.from('companies').select('id').eq('access_code', code).maybeSingle()
      ]);

      if (!inviteCheck.data && !accessCheck.data && !companyCheck.data) {
        return code;
      }
      attempt++;
    }
    throw new Error('Could not generate unique code after multiple attempts');
  };

  const handleGenerateInvite = async () => {
    if (!newCompany.seats) {
      alert(t('admin.companies.alert.createInstruction'));
      return;
    }

    try {
      const code = await generateUniqueCode();

      const { error } = await supabase
        .from('company_invites')
        .insert({
          invite_code: code,
          email: newCompany.email || 'placeholder@example.com',
          seats: parseInt(newCompany.seats),
          status: 'pending'
        });

      if (error) throw error;

      setGeneratedCode(code);

      // Send email if provided
      if (newCompany.email) {
        try {
          // Use toast before sending so user knows something is happening
          toast.info(t('admin.companies.alert.sendingEmail') || 'A enviar convite por email...');

          await supabase.functions.invoke('send-invite-email', {
            body: {
              email: newCompany.email,
              code: code,
              companyName: 'Sua Empresa', // Ideally we should ask for Company Name in the modal too? The modal doesn't have Company Name field! It creates for a Generic company? 
              // Wait, the modal adds 'company_invites', which are for NEW companies? Or invites to join?
              // The logic is: Admin generates a code. Company uses code to Register.
              // So we don't know the company name yet.
              seats: parseInt(newCompany.seats)
            }
          });
          toast.success(t('admin.companies.alert.emailSent') || 'Email enviado com sucesso!');
        } catch (emailErr) {
          console.error('Error sending email:', emailErr);
          toast.error(t('admin.companies.alert.emailError') || 'Erro ao enviar email, mas o código foi gerado.');
        }
      }

      fetchInvites();
    } catch (error) {
      console.error('Error generating invite:', error);
      alert(t('admin.companies.alert.inviteError'));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDeactivateCompany = async (companyId: string) => {
    try {
      const company = companies.find(c => c.id === companyId);
      if (!company) return;

      const newStatus = company.status === 'active' ? false : true;

      const { error } = await supabase
        .from('companies')
        .update({ is_active: newStatus } as any)
        .eq('id', companyId as any);

      if (error) throw error;

      await fetchCompanies();
      setDeactivateDialogOpen(false);
      setCompanyToDeactivate(null);
    } catch (error) {
      console.error('Error updating company status:', error);
      alert(t('admin.companies.alert.updateError'));
    }
  };

  const openDeactivateDialog = (companyId: string) => {
    setCompanyToDeactivate(companyId);
    setDeactivateDialogOpen(true);
  };

  const handleOpenDetails = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setShowCompanyDetails(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('admin.globalAgenda.back')}</span>
      </button>

      {/* Top Section with Page Title and Description */}
      <div className="flex items-start justify-between mb-8 gap-8">
        <h1 className="text-3xl md:text-4xl text-[#1a1a1a]" style={{ fontFamily: 'Pacifico, cursive' }}>
          {t('admin.companies.title')}
        </h1>
        <div className="flex items-center gap-1.5 max-w-md text-right">
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '1.125rem' }}>
            {t('admin.companies.description')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Add Company / Generate Invite Section */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="relative w-[30px] h-[30px] flex items-center justify-center">
              <span className="text-[#2354a2] text-[30px] inline-block animate-spin" style={{ animationDuration: '3s', fontFamily: 'Inter, sans-serif' }}>
                ✱
              </span>
            </div>
            <h2 className="text-[#4a5565] uppercase tracking-[0.4px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '30px', lineHeight: '36px' }}>
              {t('admin.companies.headerTitle')}
            </h2>
          </div>

          <TextShimmer duration={1.5} className="text-gray-700 leading-relaxed text-justify [--base-color:#6b7280] [--base-gradient-color:#38bdf8] block" as="p">
            {t('admin.companies.managementDesc')}
          </TextShimmer>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="pt-2 flex justify-start">
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white text-black border-black px-8 py-4"
                  containerClassName="h-auto w-auto"
                  borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                  onClick={() => {
                    setGeneratedCode(null);
                    setNewCompany({ seats: '', email: '' });
                  }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '1.125rem' }}>
                    {t('admin.companies.addCompany')}
                  </span>
                </MovingBorderButton>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                  {t('admin.companies.addNewTitle')}
                </DialogTitle>
                <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                  {t('admin.companies.addNewDesc')}
                </DialogDescription>
              </DialogHeader>

              {!generatedCode ? (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                        Email (Opcional)
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={newCompany.email}
                        onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                        placeholder="email@empresa.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="seats" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                        {t('admin.companies.seats')}
                      </label>
                      <Input
                        id="seats"
                        type="number"
                        value={newCompany.seats}
                        onChange={(e) => setNewCompany({ ...newCompany, seats: e.target.value })}
                        placeholder={t('admin.companies.seatsPlaceholder')}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      {t('admin.companies.cancel')}
                    </Button>
                    <Button onClick={handleGenerateInvite} className="bg-blue-600 hover:bg-blue-700 text-white">
                      {t('admin.companies.generate')}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{t('admin.companies.alert.inviteSuccess')}</h4>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-6 group hover:border-gray-300 transition-colors">
                    <code className="text-2xl font-mono font-bold text-gray-900 tracking-wider">{generatedCode}</code>
                    <button
                      onClick={() => copyToClipboard(generatedCode)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Copy"
                    >
                      {copiedCode ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6" />}
                    </button>
                  </div>

                  <Button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setGeneratedCode(null);
                    }}
                    className="w-full bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Concluído
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Pending Invites Table */}
        {invites.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold text-gray-900">{t('admin.companies.invitesTitle')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">{t('admin.companies.tableCode')}</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">{t('admin.companies.seats')}</th>
                    <th className="px-6 py-3">{t('admin.companies.status')}</th>
                    <th className="px-6 py-3 text-right">{t('admin.companies.tableCreatedDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invites.map((invite) => (
                    <tr key={invite.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono font-medium text-blue-600">
                        <div className="flex items-center gap-2">
                          {invite.invite_code}
                          <button onClick={() => copyToClipboard(invite.invite_code)} className="text-gray-400 hover:text-gray-600">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{invite.email || '-'}</td>
                      <td className="px-6 py-4 text-gray-600">{invite.seats}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${invite.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                          invite.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-100' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                          {invite.status === 'pending' ? 'Pendente' : invite.status === 'accepted' ? 'Aceite' : invite.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-right">
                        {invite.created_at ? new Date(invite.created_at).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Companies Table */}
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
              {t('admin.companies.registered')} ({companies.length})
            </h3>
            <ImageWithFallback
              src={melhorSaudeLogo}
              alt="Melhor Saúde"
              className="h-6 w-auto object-contain"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.tableCompanyName')}
                  </TableHead>
                  <TableHead className="text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.tableEmail')}
                  </TableHead>
                  <TableHead className="text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.tableCode')}
                  </TableHead>
                  <TableHead className="text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.seats')}
                  </TableHead>
                  <TableHead className="text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.tableCreatedDate')}
                  </TableHead>
                  <TableHead className="text-gray-900 text-right" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                    {t('admin.companies.tableActions')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow
                    key={company.id}
                    className={company.status === 'deactivated'
                      ? 'opacity-60 bg-gray-200/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] border-l-4 border-l-gray-400'
                      : ''
                    }
                  >
                    <TableCell style={{ fontFamily: 'Inter, sans-serif' }}>{company.name}</TableCell>
                    <TableCell style={{ fontFamily: 'Inter, sans-serif' }}>{company.email}</TableCell>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm" style={{ fontFamily: 'monospace' }}>
                        {company.code}
                      </code>
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Inter, sans-serif' }}>
                      {company.seats}
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Inter, sans-serif' }}>
                      {new Date(company.dateCreated).toLocaleDateString('pt-PT', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetails(company.id)}
                          className="hover:bg-blue-50 transition-colors"
                          title="Gerir Empresa"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeactivateDialog(company.id)}
                          className={company.status === 'active'
                            ? 'hover:bg-red-50 transition-colors'
                            : 'hover:bg-green-50 transition-colors'
                          }
                          title={company.status === 'active' ? "Desativar" : "Ativar"}
                        >
                          {company.status === 'active' ? (
                            <Trash2 className="h-4 w-4 text-red-600" />
                          ) : (
                            <Power className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Deactivate/Reactivate Confirmation Dialog */}
      <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
              {companyToDeactivate && companies.find(c => c.id === companyToDeactivate)?.status === 'active'
                ? t('admin.companies.deactivateTitle')
                : t('admin.companies.reactivateTitle')}
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              {companyToDeactivate && companies.find(c => c.id === companyToDeactivate)?.status === 'active'
                ? t('admin.companies.deactivateDesc')
                : t('admin.companies.reactivateDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>
              {t('admin.companies.cancel')}
            </Button>
            <Button
              variant={companyToDeactivate && companies.find(c => c.id === companyToDeactivate)?.status === 'active' ? 'destructive' : 'default'}
              onClick={() => companyToDeactivate && handleDeactivateCompany(companyToDeactivate)}
            >
              {companyToDeactivate && companies.find(c => c.id === companyToDeactivate)?.status === 'active'
                ? t('admin.companies.confirmDeactivate')
                : t('admin.companies.confirmReactivate')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Company Details Modal */}
      <CompanyDetailsModal
        isOpen={showCompanyDetails}
        onClose={() => setShowCompanyDetails(false)}
        companyId={selectedCompanyId}
        onUpdate={fetchData}
      />
    </div>
  );
}
