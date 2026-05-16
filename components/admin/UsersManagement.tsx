import { cn } from "@/lib/utils";
import { Search, Eye, Copy, Trash2, ChevronLeft, ChevronRight, UserPlus, X } from "lucide-react";
import { useState, useEffect } from "react";
// DISABLED: import from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
// DISABLED: import from 'sonner';
import { Database } from "@/types/database.types";

type AccessCode = Database["public"]["Tables"]["access_codes"]["Row"];
type Company = Database["public"]["Tables"]["companies"]["Row"];

export default function UsersManagement() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isHRDialogOpen, setIsHRDialogOpen] = useState(false);
  const [isArchivedDialogOpen, setIsArchivedDialogOpen] = useState(false);
  const [isPrestadorDialogOpen, setIsPrestadorDialogOpen] = useState(false);
  const [isPermanenciaDialogOpen, setIsPermanenciaDialogOpen] = useState(false);

  // Form states
  const [sessions, setSessions] = useState(100);
  const [seats, setSeats] = useState(50);

  // Data states
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [affiliateCodes, setAffiliateCodes] = useState<AccessCode[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch Access Codes
      const { data: codesData, error: codesError } = await supabase
        .from('access_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (codesError) throw codesError;

      const codes = codesData as unknown as AccessCode[];

      // Filter codes by type
      const hrCodes = codes?.filter(c => c.role_type === 'company_admin') || [];
      const otherCodes = codes?.filter(c => c.role_type === 'specialist' || c.role_type === 'user') || [];

      setAccessCodes(hrCodes);
      setAffiliateCodes(otherCodes);

      // Fetch Companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (companiesError) throw companiesError;
      if (companiesError) throw companiesError;
      setCompanies((companiesData as unknown as Company[]) || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to generate random alphanumeric code
  // Function to generate random alphanumeric code
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Function to handle HR code generation
  const handleGenerateCode = async () => {
    try {
      const code = generateCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // Valid for 30 days

      const { error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'company_admin',
          metadata: { total_sessions: sessions, max_seats: seats },
          expires_at: expiresAt.toISOString(),
          status: 'active'
        } as never); // Cast to never to bypass strict typing if needed, or ensure type match

      if (error) throw error;

      toast.success('Código HR gerado com sucesso');
      setIsHRDialogOpen(false);
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Erro ao gerar código');
    }
  };

  // Function to handle Prestador code generation
  const handleGeneratePrestadorCode = async () => {
    try {
      const code = generateCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'specialist',
          expires_at: expiresAt.toISOString(),
          status: 'active'
        } as never);

      if (error) throw error;

      toast.success('Código de Prestador gerado com sucesso');
      setIsPrestadorDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error generating provider code:', error);
      toast.error('Erro ao gerar código de prestador');
    }
  };

  // Function to handle Profissional de Permanência code generation
  const handleGeneratePermanenciaCode = async () => {
    try {
      const code = generateCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { error } = await supabase
        .from('access_codes')
        .insert({
          code,
          role_type: 'specialist',
          metadata: { specialty: 'permanencia' }, // Updated to use metadata to distinguish
          expires_at: expiresAt.toISOString(),
          status: 'active'
        } as never);

      if (error) throw error;

      toast.success('Código de Permanência gerado com sucesso');
      setIsPermanenciaDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Erro ao gerar código');
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
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left Block */}
        <div className="flex flex-col items-start justify-center border border-gray-200 dark:border-gray-700 p-8 sm:p-10 lg:p-16">
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
        <div className="flex flex-col justify-start border border-gray-200 dark:border-gray-700 p-8 sm:p-10 lg:p-16 space-y-6">
          <>
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar empresas…"
                className="pl-10 bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>

            {/* Companies Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
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
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500">Nenhuma empresa encontrada</td>
                    </tr>
                  ) : (
                    companies.map((company) => (
                      <tr key={company.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
                        <td className="py-3 px-2">
                          <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-medium">
                            {company.company_name}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {/* TODO: Add collaborators count subquery */}
                          👥 —
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          —
                        </td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            {company.is_active ? '🟢 Ativa' : '🔴 Inativa'}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <span className="font-medium">Como Adicionar Empresas:</span> Use o botão "Gerar Códigos" para criar códigos de acesso para novas empresas. Os códigos podem ser partilhados com RH das empresas.
              </p>
            </div>
          </>
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
              <Button
                size="sm"
                className="text-xs whitespace-nowrap bg-[#2196F3] hover:bg-[#1976D2]"
                onClick={() => setIsHRDialogOpen(true)}
              >
                Gerar HR
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={currentCard === 0 ? "Pesquisar por código, email ou tipo..." : "Pesquisar por código, email ou tipo..."}
              className="pl-10 bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-lg"
            />
          </div>

          {/* Access Codes Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
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
                {isLoading ? (
                  <tr><td colSpan={6} className="py-4 text-center">Carregando...</td></tr>
                ) : (
                  (currentCard === 0 ? accessCodes : affiliateCodes).map((code) => {
                    const metadata = code.metadata as { total_sessions?: number } | null;
                    return (
                      <tr key={code.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-gray-900 dark:text-white">{code.code}</span>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {code.role_type}
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            {code.used_by ? 'Sim' : 'Não'}
                          </span>
                        </td>
                        {currentCard === 0 && (
                          <td className="py-3 px-2">
                            <span className="text-[#2196F3] dark:text-[#64B5F6]">
                              {metadata?.total_sessions || '-'}
                            </span>
                          </td>
                        )}
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {new Date(code.created_at || '').toLocaleDateString('pt-PT')}
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            {code.used_at ? new Date(code.used_at).toLocaleDateString('pt-PT') : '-'}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs",
                            code.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          )}>
                            {code.status === 'active' ? '🟢 Ativo' : code.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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
              O código será usado por um profissional de permanência para criar a sua conta na plataforma
            </DialogDescription>

            {/* Info Box */}
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                🏪 <span className="font-medium">Acesso de Permanência:</span> O profissional terá acesso à gestão de fila de espera e atendimentos presenciais.
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
      {/* Specialist Feedback Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[1000px] h-[80vh] flex flex-col p-6 bg-white dark:bg-gray-950">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-xl text-gray-900 dark:text-white">
              Histórico e Feedback
            </DialogTitle>
            <button
              onClick={() => setIsFeedbackDialogOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {selectedSpecialistId && (
              <SpecialistFeedbackTable
                specialistId={selectedSpecialistId}
                isAdmin={true}
                showFilters={true}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
