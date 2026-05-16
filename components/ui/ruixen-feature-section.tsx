import { cn } from "@/lib/utils"
import { Search, Eye, Copy, Trash2, ChevronLeft, ChevronRight, UserPlus, X } from "lucide-react";
import { ImageWithFallback } from "@/components/admin/figma/ImageWithFallback";
import { useEffect, useState } from "react";
// DISABLED: import from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
// DISABLED: import from 'sonner';
import CompanyDetails from "@/components/admin/CompanyDetails";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};


const COMPANY_COLORS = [
  "bg-[#2196F3] text-white",
  "bg-[#4CAF50] text-white",
  "bg-[#FFC107] text-white",
  "bg-[#9C27B0] text-white",
  "bg-[#E91E63] text-white",
  "bg-[#00BCD4] text-white",
  "bg-[#FF5722] text-white",
  "bg-[#795548] text-white",
];

const AFFILIATE_COLORS = [
  "bg-[#2196F3] text-white",
  "bg-[#4CAF50] text-white",
  "bg-[#FFC107] text-white",
  "bg-[#9C27B0] text-white",
];

interface Company {
  id: string;
  company_name: string;
  employee_seats: number;
  used_seats: number;
  is_active: boolean;
  color: string;
  collaborators: number;
  sessions: string;
  status: string;
}

interface Affiliate {
  id: string;
  name: string;
  specialty: string;
  sessions: string;
  status: string;
  color: string;
}

interface AccessCode {
  id: string;
  code: string;
  type: string;
  usedBy: string;
  sessions?: number;
  created: string;
  activated: string;
  status: string;
  statusColor: string;
  statusIcon?: string;
}

export default function RuixenSection() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isHRDialogOpen, setIsHRDialogOpen] = useState(false);
  const [isArchivedDialogOpen, setIsArchivedDialogOpen] = useState(false);
  const [isPrestadorDialogOpen, setIsPrestadorDialogOpen] = useState(false);
  const [isPermanenciaDialogOpen, setIsPermanenciaDialogOpen] = useState(false);
  const [sessions, setSessions] = useState(100);
  const [seats, setSeats] = useState(50);
  
  // Real data state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [affiliateCodes, setAffiliateCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [loadingCompanyDetails, setLoadingCompanyDetails] = useState(false);

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const { data: companiesData, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch employee counts for each company
      const companiesWithDetails = await Promise.all(
        (companiesData || []).map(async (company, index) => {
          const { count: employeeCount } = await supabase
            .from('company_employees')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', company.id);

          // Calculate sessions used
          const { count: sessionsUsed } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', company.id)
            .in('status', ['completed', 'confirmed', 'pending']);

          return {
            id: company.id,
            company_name: company.company_name,
            employee_seats: company.employee_seats || 0,
            used_seats: company.used_seats || 0,
            is_active: company.is_active ?? true,
            color: COMPANY_COLORS[index % COMPANY_COLORS.length],
            collaborators: employeeCount || 0,
            sessions: `${sessionsUsed || 0} / ${company.total_sessions_allocated || 0}`,
            status: company.is_active ? "Ativa" : "Inativa"
          };
        })
      );

      setCompanies(companiesWithDetails);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Erro ao carregar empresas');
    }
  };

  // Fetch affiliates (specialists)
  const fetchAffiliates = async () => {
    try {
      const { data: specialistsData, error } = await supabase
        .from('specialists')
        .select(`
          *,
          profile:profiles!specialists_user_id_fkey (
            id,
            full_name,
            email
          ),
          specialist_pillars (
            pillar_code
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const affiliatesWithDetails = await Promise.all(
        (specialistsData || []).map(async (specialist, index) => {
          const { count: totalSessions } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('specialist_id', specialist.id);

          const { count: upcomingSessions } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('specialist_id', specialist.id)
            .in('status', ['confirmed', 'pending'])
            .gte('booking_date', new Date().toISOString().split('T')[0]);

          const specialty = specialist.professional_title || 
            (specialist.specialist_pillars && specialist.specialist_pillars.length > 0
              ? specialist.specialist_pillars[0].pillar_code
              : 'Especialista Geral');

          return {
            id: specialist.id,
            name: specialist.profile?.full_name || 'Nome não disponível',
            specialty: specialty,
            sessions: `${upcomingSessions || 0} / ${totalSessions || 0} agendadas`,
            status: specialist.is_active ? "Ativo" : "Inativo",
            color: AFFILIATE_COLORS[index % AFFILIATE_COLORS.length]
          };
        })
      );

      setAffiliates(affiliatesWithDetails);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      toast.error('Erro ao carregar especialistas');
    }
  };

  // Fetch access codes
  const fetchAccessCodes = async () => {
    try {
      const { data: codesData, error } = await supabase
        .from('access_codes')
        .select(`
          *,
          used_by_profile:profiles!access_codes_used_by_fkey (
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const hrCodes: AccessCode[] = [];
      const affiliateCodesList: AccessCode[] = [];

      for (const code of codesData || []) {
        const codeObj: AccessCode = {
          id: code.id,
          code: code.code,
          type: code.role_type === 'company_hr' ? 'Responsável HR' : 
                code.role_type === 'specialist' ? 'Prestador' : 
                code.role_type === 'onduty' ? 'Profissional de Permanência' : 
                code.role_type || 'Desconhecido',
          usedBy: code.used_by_profile?.email || (code.used_by ? 'Usado' : 'Não usado'),
          sessions: (code.metadata as any)?.sessions || code.max_uses || undefined,
          created: code.created_at ? new Date(code.created_at).toLocaleDateString('pt-PT') : 'N/A',
          activated: code.used_at ? new Date(code.used_at).toLocaleDateString('pt-PT') : 'Não ativado',
          status: code.used_by ? 'Usado' : code.status === 'active' ? 'Pendente' : code.status || 'Pendente',
          statusColor: code.used_by ? 'bg-[#7C3AED] text-white' : 
                      code.status === 'active' ? 'bg-[#FFC107] text-white' : 
                      'bg-green-500 text-white',
          statusIcon: code.used_by ? '🟣' : code.status === 'active' ? '🟡' : undefined
        };

        if (code.role_type === 'company_hr') {
          hrCodes.push(codeObj);
        } else if (code.role_type === 'specialist' || code.role_type === 'onduty') {
          affiliateCodesList.push(codeObj);
        }
      }

      setAccessCodes(hrCodes);
      setAffiliateCodes(affiliateCodesList);
    } catch (error) {
      console.error('Error fetching access codes:', error);
      toast.error('Erro ao carregar códigos de acesso');
    }
  };

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCompanies(),
        fetchAffiliates(),
        fetchAccessCodes()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Function to generate random alphanumeric code
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Function to handle code generation
  const handleGenerateCode = async () => {
    try {
      const code = generateCode();
      const { data, error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'company_hr',
          status: 'active',
          max_uses: sessions,
          metadata: { sessions, seats }
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Código HR gerado com sucesso!');
      setIsHRDialogOpen(false);
      fetchAccessCodes();
    } catch (error) {
      console.error('Error generating HR code:', error);
      toast.error('Erro ao gerar código HR');
    }
  };

  // Function to handle Prestador code generation
  const handleGeneratePrestadorCode = async () => {
    try {
      const code = generateCode();
      const { data, error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'specialist',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Código Prestador gerado com sucesso!');
      setIsPrestadorDialogOpen(false);
      fetchAccessCodes();
    } catch (error) {
      console.error('Error generating Prestador code:', error);
      toast.error('Erro ao gerar código Prestador');
    }
  };

  // Function to handle Profissional de Permanência code generation
  const handleGeneratePermanenciaCode = async () => {
    try {
      const code = generateCode();
      const { data, error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'onduty',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Código Profissional de Permanência gerado com sucesso!');
      setIsPermanenciaDialogOpen(false);
      fetchAccessCodes();
    } catch (error) {
      console.error('Error generating Permanência code:', error);
      toast.error('Erro ao gerar código Profissional de Permanência');
    }
  };

  const cards = [
    {
      title: "Empresas",
      subtitle: "Gerir empresas e códigos",
      description: "Gestão completa de empresas cadastradas, geração de códigos de acesso únicos e monitoramento de utilizações em tempo real.",
      color: "text-[#2196F3]",
      bgColor: "bg-[#E3F2FD] dark:bg-[#1E3A5F]",
      icon: <UserPlus className="h-6 w-6 text-[#2196F3]" />
    },
    {
      title: "Affiliates",
      subtitle: "Gerir especialistas",
      description: "Administração de prestadores de serviços, atribuição de especialidades e controlo de disponibilidade para agendamentos.",
      color: "text-[#F57C00]",
      bgColor: "bg-[#FFF9E6] dark:bg-[#3A2E1E]",
      icon: <UserPlus className="h-6 w-6 text-[#F57C00]" />
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Fetch full company details
  const fetchCompanyDetails = async (companyId: string) => {
    try {
      setLoadingCompanyDetails(true);
      
      // Fetch company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (companyError) throw companyError;

      // Fetch employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('company_employees')
        .select(`
          *,
          profile:profiles!company_employees_user_id_fkey (
            id,
            full_name,
            email,
            phone,
            avatar_url,
            metadata
          )
        `)
        .eq('company_id', companyId);

      if (employeesError) throw employeesError;

      // Fetch sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('bookings')
        .select(`
          *,
          specialist:specialists!bookings_specialist_id_fkey (
            id,
            profile:profiles!specialists_user_id_fkey (
              full_name
            )
          )
        `)
        .eq('company_id', companyId)
        .order('booking_date', { ascending: false });

      if (sessionsError) throw sessionsError;

      // Calculate stats
      const completedSessions = (sessionsData || []).filter(s => s.status === 'completed').length;
      const upcomingSessions = (sessionsData || []).filter(s => 
        ['pending', 'confirmed', 'rescheduled'].includes(s.status || '')
      ).length;
      const cancelledSessions = (sessionsData || []).filter(s => s.status === 'cancelled').length;

      const seats = companyData.employee_seats ?? (employeesData || []).length;
      const sessionsPerEmployee = companyData.sessions_per_employee ?? 0;
      const companyMetadata = (companyData.metadata as Record<string, any> | null) || {};
      const metadataAllocation = [companyMetadata?.total_sessions, companyMetadata?.sessions_allocated, companyMetadata?.sessions]
        .find((value) => typeof value === 'number') as number | undefined;
      const totalSessionsAllocated = metadataAllocation ?? seats * sessionsPerEmployee;
      const sessionsUsed = completedSessions;
      const sessionsAvailable = Math.max(totalSessionsAllocated - sessionsUsed, 0);

      const companyDetails = {
        ...companyData,
        employees: (employeesData || []).map(emp => ({
          ...emp,
          profile: emp.profile || null
        })),
        sessions: (sessionsData || []).map(session => ({
          ...session,
          specialist: session.specialist || null
        })),
        session_stats: {
          completed: completedSessions,
          upcoming: upcomingSessions,
          cancelled: cancelledSessions,
        },
        total_sessions_allocated: totalSessionsAllocated,
        sessions_used: sessionsUsed,
        sessions_available: sessionsAvailable,
      };

      setSelectedCompany(companyDetails);
    } catch (error) {
      console.error('Error fetching company details:', error);
      toast.error('Erro ao carregar detalhes da empresa');
    } finally {
      setLoadingCompanyDetails(false);
    }
  };

  const handleViewCompany = (companyId: string) => {
    fetchCompanyDetails(companyId);
  };

  // If company details are selected, show CompanyDetails component
  if (selectedCompany) {
    return (
      <CompanyDetails
        company={selectedCompany}
        onBack={() => {
          setSelectedCompany(null);
          fetchCompanies(); // Refresh companies list
        }}
      />
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative w-full gap-4">
        {/* Left Block */}
        <div className="flex flex-col items-start justify-center border border-gray-200 dark:border-gray-700 p-8 sm:p-10 lg:p-16 w-full min-w-0">
          {/* Shuffling Card with Arrows */}
          <div className="relative w-full mb-6 sm:mb-8">
            <div className={cn(
              "rounded-3xl p-8 sm:p-10 shadow-xl border border-neutral-200 dark:border-white/[0.1] relative overflow-hidden transition-colors duration-300",
              cards[currentCard].bgColor
            )}>
              {/* Navigation Arrows */}
              <div className="absolute top-6 right-6 flex gap-2 z-10">
                <button 
                  onClick={prevCard}
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800 hover:bg-white/80 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={nextCard}
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800 hover:bg-white/80 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Next card"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Animated Card Content */}
              
                <div
                  key={currentCard}




                  className="pr-20"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {cards[currentCard].icon}
                    </div>
                  </div>
                  <h2 className={cn("mb-3 text-3xl", cards[currentCard].color)}>
                    {cards[currentCard].title}
                  </h2>
                  <h3 className="text-gray-900 dark:text-white mb-4 text-xl">
                    {cards[currentCard].subtitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {cards[currentCard].description}
                  </p>
                </div>
              
            </div>
          </div>

        </div>

        {/* Right Block */}
        <div className="flex flex-col justify-start border border-gray-200 dark:border-gray-700 p-8 sm:p-10 lg:p-16 space-y-6 w-full min-w-0 overflow-x-auto">
          {currentCard === 0 ? (
            <>
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar empresas…" 
                  className="pl-10 bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Companies Table */}
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="w-full overflow-x-auto min-w-0">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Empresa</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Colaboradores</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Sessões</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Estado</th>
                        <th className="text-left py-3 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies
                        .filter(company => 
                          !searchTerm || 
                          company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((company, i) => (
                      <tr 
                        key={i} 
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition cursor-pointer"
                        onClick={() => handleViewCompany(company.id)}
                      >
                        <td className="py-3 px-2">
                          <span className={cn("px-3 py-1 rounded-full text-xs", company.color)}>
                            {company.company_name}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          👥 {company.collaborators}
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {company.sessions}
                        </td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            🟢 {company.status}
              </span>
                        </td>
                        <td className="py-3 px-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCompany(company.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                  </table>
                  {companies.filter(company => 
                    !searchTerm || 
                    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {searchTerm ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa registada'}
                    </div>
                  )}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <span className="font-medium">Como Adicionar Empresas:</span> Use o botão "Gerar Códigos" para criar códigos de acesso para novas empresas. Os códigos podem ser partilhados com RH das empresas.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Affiliates View */}
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar prestadores…" 
                  className="pl-10 bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
          </div>

              {/* Affiliates Table */}
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="w-full overflow-x-auto min-w-0">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Affiliate</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Especialidade</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Sessões</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Estado</th>
                        <th className="text-left py-3 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates
                        .filter(affiliate => 
                          !searchTerm || 
                          affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          affiliate.specialty.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((affiliate, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
                        <td className="py-3 px-2">
                          <span className={cn("px-3 py-1 rounded-full text-xs", affiliate.color)}>
                            {affiliate.name}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          👤 {affiliate.specialty}
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {affiliate.sessions}
                        </td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            🟢 {affiliate.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                  </table>
                  {companies.filter(company => 
                    !searchTerm || 
                    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {searchTerm ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa registada'}
                    </div>
                  )}
                </div>
              )}

              {/* Info Box for Affiliates */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  🔑 <span className="font-medium">Como Adicionar Prestadores:</span> Para permitir que novos prestadores se registem, gere códigos Prestador na aba "Gestão de Códigos". Os prestadores usarão esses códigos para registar-se na plataforma.
                </p>
              </div>
            </>
          )}
        </div>
          </div>
          
      {/* Access Codes Section - Full Width Row */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <div className="flex flex-col justify-start border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 space-y-4">
          {/* Header with Title and Buttons */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-gray-900 dark:text-white mb-1">Códigos de Acesso</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentCard === 0 ? "Gere códigos para HR" : "Gere códigos para prestadores"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap" onClick={() => setIsArchivedDialogOpen(true)}>
                Ver Arquivados
              </Button>
              {currentCard === 0 ? (
                <Button 
                  size="sm" 
                  className="text-xs whitespace-nowrap bg-[#2196F3] hover:bg-[#1976D2]"
                  onClick={() => setIsHRDialogOpen(true)}
                >
                  Gerar HR
                </Button>
              ) : (
                <>
                  <Button 
                    size="sm" 
                    className="text-xs whitespace-nowrap bg-[#7C3AED] hover:bg-[#6D28D9]"
                    onClick={() => setIsPrestadorDialogOpen(true)}
                  >
                    Gerar Prestador
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs whitespace-nowrap bg-[#7C3AED] hover:bg-[#6D28D9]"
                    onClick={() => setIsPermanenciaDialogOpen(true)}
                  >
                    Gerar Profissional de Permanência
                  </Button>
                </>
                      )}
                    </div>
                  </div>
                  
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder={currentCard === 0 ? "Pesquisar por código, email ou tipo..." : "Pesquisar por código, email ou tipo..."}
              className="pl-10 bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Access Codes Table */}
          <div className="w-full overflow-x-auto min-w-0">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Código</th>
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Tipo</th>
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Usado Por</th>
                  {currentCard === 0 && <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Sessões</th>}
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Criado</th>
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Ativado</th>
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(currentCard === 0 ? accessCodes : affiliateCodes)
                  .filter(code => 
                    !searchTerm || 
                    code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    code.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    code.usedBy.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((code, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-900 dark:text-white">{code.code}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(code.code);
                            toast.success('Código copiado!');
                          }}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                      {code.type}
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        {code.usedBy}
                      </span>
                    </td>
                    {currentCard === 0 && (
                      <td className="py-3 px-2">
                        <span className="text-[#2196F3] dark:text-[#64B5F6]">
                          {code.sessions}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                      {code.created}
                    </td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                      {code.activated}
                    </td>
                    <td className="py-3 px-2">
                      <span className={cn("px-3 py-1 rounded-full text-xs", code.statusColor)}>
                        {currentCard === 0 && code.statusIcon} {code.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button 
                        onClick={async () => {
                          if (confirm('Tem certeza que deseja excluir este código?')) {
                            try {
                              const { error } = await supabase
                                .from('access_codes')
                                .delete()
                                .eq('id', code.id);
                              
                              if (error) throw error;
                              toast.success('Código excluído com sucesso');
                              fetchAccessCodes();
                            } catch (error) {
                              console.error('Error deleting code:', error);
                              toast.error('Erro ao excluir código');
                            }
                          }
                        }}
                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(currentCard === 0 ? accessCodes : affiliateCodes)
              .filter(code => 
                !searchTerm || 
                code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                code.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                code.usedBy.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'Nenhum código encontrado' : 'Nenhum código gerado'}
                </div>
            )}
          </div>
        </div>
      </div>
      
      {/* HR Code Generation Dialog */}
      <Dialog open={isHRDialogOpen} onOpenChange={setIsHRDialogOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 bg-white dark:bg-gray-950">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <DialogTitle className="text-xl text-gray-900 dark:text-white">
              Gerar Código HR
            </DialogTitle>
            <button
              onClick={() => setIsHRDialogOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Description */}
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              A empresa será criada durante o processo de registo do HR
            </DialogDescription>

            {/* Sessions Field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-900 dark:text-white">
                Número de Sessões Alocadas
              </label>
              <Input
                type="number"
                value={sessions}
                onChange={(e) => setSessions(Number(e.target.value))}
                className="w-full text-base border-gray-300 dark:border-gray-700 focus:border-[#2196F3] focus:ring-[#2196F3]"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de sessões disponíveis para todos os colaboradores
              </p>
            </div>

            {/* Seats Field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-900 dark:text-white">
                Número de Lugares (Seats)
              </label>
              <Input
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full text-base border-gray-300 dark:border-gray-700 focus:border-[#2196F3] focus:ring-[#2196F3]"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Máximo de contas de colaboradores permitidas
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="text-[#2196F3] dark:text-[#64B5F6]">~{sessions && seats ? Math.round(sessions / seats) : 0} sessões</span> por colaborador (distribuição equitativa)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsHRDialogOpen(false)}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button
                className="px-6 bg-[#2196F3] hover:bg-[#1976D2] text-white"
                onClick={handleGenerateCode}
              >
                Gerar Código
              </Button>
            </div>
                </div>
        </DialogContent>
      </Dialog>

      {/* Archived Codes Dialog */}
      <Dialog open={isArchivedDialogOpen} onOpenChange={setIsArchivedDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-6 bg-white dark:bg-gray-950">
          {/* Header with Icon and Close Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <DialogTitle className="text-lg text-gray-900 dark:text-white">
                {currentCard === 0 ? "Códigos Arquivados - Empresas" : "Códigos Arquivados - Affiliates"}
              </DialogTitle>
            </div>
            <button
              onClick={() => setIsArchivedDialogOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <DialogDescription className="sr-only">
            {currentCard === 0 ? "View and manage archived company access codes" : "View and manage archived affiliate access codes"}
          </DialogDescription>

          {/* Search Bar */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Pesquisar por código ou email..." 
              className="pl-10 bg-white dark:bg-gray-900 border-blue-400 dark:border-blue-500 focus:ring-blue-400 dark:focus:ring-blue-500 rounded-lg"
            />
          </div>

          {/* Archived Codes Table */}
          <div className="w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Código</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Tipo</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Usado Por</th>
                  {currentCard === 0 && <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Sessões</th>}
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Criado</th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Ativado</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-950">
                {currentCard === 0 ? (
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4">
                      <span className="font-mono text-gray-900 dark:text-white">00HRC07V</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      Responsável HR
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      Não usado
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#2196F3] dark:text-[#64B5F6]">100</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      07/11/2025
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      -
                    </td>
                  </tr>
                ) : (
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4">
                      <span className="font-mono text-gray-900 dark:text-white">UDBT4KEP</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      Profissional de Permanência
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      Não usado
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      07/11/2025
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      -
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with Count */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Total de códigos arquivados: <span className="text-gray-900 dark:text-white">1</span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prestador Code Generation Dialog */}
      <Dialog open={isPrestadorDialogOpen} onOpenChange={setIsPrestadorDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 bg-white dark:bg-gray-950">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <DialogTitle className="text-xl text-gray-900 dark:text-white">
              Gerar Código Prestador
            </DialogTitle>
            <button
              onClick={() => setIsPrestadorDialogOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Description */}
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              O código será usado por um prestador para criar a sua conta na plataforma
            </DialogDescription>

            {/* Info Box */}
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                🔐 <span className="font-medium">Acesso do Prestador:</span> O prestador terá acesso à gestão de sessões, agenda e comunicação com empresas.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsPrestadorDialogOpen(false)}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button
                className="px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                onClick={handleGeneratePrestadorCode}
              >
                Gerar Código
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profissional de Permanência Code Generation Dialog */}
      <Dialog open={isPermanenciaDialogOpen} onOpenChange={setIsPermanenciaDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 bg-white dark:bg-gray-950">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <DialogTitle className="text-xl text-gray-900 dark:text-white">
              Gerar Código Profissional de Permanência
            </DialogTitle>
            <button
              onClick={() => setIsPermanenciaDialogOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Description */}
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              O código será usado por um profissional de permanência para criar a sua conta
            </DialogDescription>

            {/* Info Box */}
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                👨‍⚕️ <span className="font-medium">Acesso Profissional:</span> O profissional terá acesso a ferramentas de gestão de disponibilidade e comunicaço.
              </p>
                </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsPermanenciaDialogOpen(false)}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button
                className="px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                onClick={handleGeneratePermanenciaCode}
              >
                Gerar Código
              </Button>
              </div>
                </div>
        </DialogContent>
      </Dialog>

      {/* Stats Section */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4 sm:mb-6">
            Gestão Centralizada de Utilizadores <span className="text-[#4A90E2]">Wellness Platform</span>
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 sm:mb-14 lg:mb-16">
            Controle completo sobre empresas e affiliates numa única plataforma integrada.
          </p>
          <div className="grid grid-cols-2 gap-8 sm:gap-12 text-center">
            <div className="space-y-2">
              <div className="text-6xl sm:text-7xl lg:text-8xl text-gray-900 dark:text-white">
                {loading ? '...' : companies.length}
                {!loading && companies.length > 0 && <sup className="text-3xl sm:text-4xl">+</sup>}
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">Empresas</p>
            </div>
            <div className="space-y-2">
              <div className="text-6xl sm:text-7xl lg:text-8xl text-gray-900 dark:text-white">
                {loading ? '...' : affiliates.length}
                {!loading && affiliates.length > 0 && <sup className="text-3xl sm:text-4xl">+</sup>}
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">Affiliates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
