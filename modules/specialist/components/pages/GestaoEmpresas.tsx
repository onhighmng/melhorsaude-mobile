import { ArrowLeft, CheckCircle2, Phone, UserCheck, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { AlertCircle } from 'lucide-react';
import { Button as MovingBorderButton } from '../ui/moving-border';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import melhorSaudeLogo from '../../assets/f066e727bc45a7068fb1f989657736b83adf0448.png';
import { TextShimmer } from '../ui/text-shimmer';
import ResolverHoverButton from '../ui/resolver-hover-button';
import { usePendingCalls, CallRequest } from '@/hooks/usePendingCalls';
import { differenceInSeconds } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function GestaoEmpresas({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { calls, loading, updateCallStatus, claimCall, specialistId } = usePendingCalls();

  // Real-time wait duration state
  const [waitTimes, setWaitTimes] = useState<Record<string, number>>({});

  // Update wait times every second
  useEffect(() => {
    // Initial calculation
    const calculateTimes = () => {
      const now = new Date();
      const times: Record<string, number> = {};
      calls.forEach(call => {
        const created = new Date(call.created_at);
        times[call.id] = differenceInSeconds(now, created);
      });
      return times;
    };

    setWaitTimes(calculateTimes());

    const interval = setInterval(() => {
      setWaitTimes(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          updated[id] = (updated[id] || 0) + 1;
        });
        return updated;
      });
      // Recalculate precisely every 10s to avoid drift? No need for now.
    }, 1000);

    return () => clearInterval(interval);
  }, [calls]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClaimOrder = async (callId: string) => {
    const { success, error } = await claimCall(callId);
    if (success) {
      toast({ title: "Pedido atendido com sucesso!", description: "Você é agora responsável por este pedido.", variant: "default" });
    } else {
      toast({ title: "Erro ao atender pedido", description: error, variant: "destructive" });
    }
  };

  const handleResolveCall = async (callId: string) => {
    // Optimistic UI update could go here, but usePendingCalls handles refetch
    const { success, error } = await updateCallStatus(callId, 'completed'); // or 'accepted' first? Logic implies resolving queue.
    if (success) {
      toast({ title: "Pedido resolvido com sucesso!", variant: "default" });
    } else {
      toast({ title: "Erro ao resolver pedido", description: error, variant: "destructive" });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen">
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('nav.back')}</span>
      </button>

      {/* Top Section with Page Title and Description */}
      <div className="flex items-start justify-between mb-8 gap-8">
        {/* Left: Page Title */}
        <h1 className="text-3xl md:text-4xl text-[#1a1a1a] font-pacifico">
          Pedidos em Tempo Real
        </h1>

        {/* Right: Description */}
        <div className="flex items-center gap-1.5 max-w-md text-right">
          <p className="text-gray-600 font-inter font-bold text-lg">
            Esteja atento. Alguém precisa de falar agora.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-6 max-w-3xl">
          {/* Header with Spinning Star */}
          <div className="flex items-center gap-2">
            <div className="relative w-[30px] h-[30px] flex items-center justify-center">
              <span
                className="text-[#2354a2] text-[30px] inline-block animate-spin font-inter"
                style={{
                  animationDuration: '3s',
                }}
              >
                ✱
              </span>
            </div>
            <h2
              className="text-[#4a5565] uppercase tracking-[0.4px] font-inter font-medium text-[30px] leading-[36px]"
            >
              FILA DE PRIORIDADE
            </h2>
          </div>

          <TextShimmer
            duration={1.5}
            className="text-gray-700 leading-relaxed text-justify [--base-color:#6b7280] [--base-gradient-color:#38bdf8] block"
            as="p"
          >
            A lista está ordenada por urgência (tempo de espera). Comece pelo topo, realize a chamada e confirme a resolução para limpar a fila.
          </TextShimmer>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="pt-2 flex justify-start">
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white text-black border-black px-8 py-4"
                  containerClassName="h-auto w-auto"
                  borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                >
                  <span className="font-inter font-semibold text-lg">
                    Guia de Conversa
                  </span>
                </MovingBorderButton>
              </div>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto z-50"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white'
              }}
            >
              <DialogHeader>
                <DialogTitle className="font-manrope font-bold text-2xl">
                  Protocolo de Atendimento
                </DialogTitle>
                <DialogDescription className="font-inter">
                  Guia rápido para conduzir chamadas com colaboradores em situação de apoio emocional.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Section A */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 font-inter">
                    A. Abertura (Obrigatório)
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-inter">
                    "Olá, fala o/a <strong>[O Teu Nome]</strong> da Melhor Saúde. Estou aqui para te ouvir. Como te sentes neste momento?"
                  </p>
                  <p className="text-sm text-gray-500 italic font-inter">
                    (Nota: Validar se o utilizador está num local seguro para falar)
                  </p>
                </div>

                {/* Section B */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 font-inter">
                    B. Escuta Ativa (Dicas)
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="font-semibold text-gray-900 font-inter">Não julgar:</span>
                      <span className="text-gray-700 font-inter">"Compreendo que seja difícil."</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-gray-900 font-inter">Validar:</span>
                      <span className="text-gray-700 font-inter">"É natural sentir-se assim nessa situação."</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-gray-900 font-inter">Clarificar:</span>
                      <span className="text-gray-700 font-inter">"O que me estás a dizer é que sentes pressão por causa de X, correto?"</span>
                    </li>
                  </ul>
                </div>

                {/* Section C - Safety Check (Red highlight) */}
                <div className="space-y-3 bg-red-50 border-2 border-red-300 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-red-700 flex items-center gap-2 font-inter">
                    <AlertCircle className="w-5 h-5" />
                    C. 🚨 Check de Segurança (Risco Imediato)
                  </h3>
                  <p className="text-red-900 leading-relaxed font-semibold font-inter">
                    "Antes de continuarmos, preciso de fazer uma pergunta importante: Sentes que corres algum risco físico ou tens pensamentos de te magoar agora?"
                  </p>
                  <p className="text-red-800 text-sm font-bold font-inter">
                    Se SIM: Ativar Protocolo de Emergência.
                  </p>
                </div>

                {/* Section D */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 font-inter">
                    D. Fecho e Encaminhamento
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-inter">
                    "Obrigado por partilhares isto. O passo ideal agora seria agendar uma sessão completa de <strong>[Psicologia/Finanças]</strong> para trabalharmos isto a fundo. Posso ajudar-te a marcar?"
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)} className="w-full">
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Requests Queue Table */}
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900 font-manrope font-bold">
              {t('companies.registered') || 'Pedidos em Espera'} ({calls.length})
            </h3>
            <ImageWithFallback
              src={melhorSaudeLogo}
              alt="Melhor Saúde"
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Loading State or Empty State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {!loading && calls.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-4xl mb-4">✨</div>
              <p className="font-medium text-lg">Sem pedidos pendentes.</p>
              <p className="text-sm">Bom trabalho!</p>
            </div>
          )}

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && calls
              .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) // FIFO (Older first)
              .map((call) => {
                // Calculate wait time in MM:SS format
                const totalSeconds = waitTimes[call.id] || 0;
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                // Urgent logic: > 5 mins (300s) for Pending. For claimed, urgency is "Being handled"
                const isUrgent = call.status === 'pending' && totalSeconds > 300;

                // --- State Logic ---
                // 1. Pending (Unclaimed)
                const isPending = call.status === 'pending';
                // 2. Claimed by Me
                const isClaimedByMe = call.status === 'confirmed' && call.specialist_id === specialistId;
                // 3. Claimed by Others
                const isClaimedByOther = call.status === 'confirmed' && call.specialist_id !== specialistId;

                return (
                  <div
                    key={call.id}
                    className={`
                      relative rounded-2xl shadow-md border p-6 space-y-4 transition-all animate-in fade-in
                      ${isClaimedByMe
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20'
                        : isClaimedByOther
                          ? 'bg-gray-50 border-gray-200 opacity-70'
                          : 'bg-white border-gray-200 hover:shadow-lg'
                      }
                    `}
                  >
                    {/* Status Badge */}
                    {isClaimedByMe && (
                      <div className="absolute top-0 left-0 right-0 bg-blue-100 text-blue-700 text-xs font-bold text-center py-1 rounded-t-2xl border-b border-blue-200">
                        ATENDIDO POR MIM
                      </div>
                    )}
                    {isClaimedByOther && (
                      <div className="absolute top-0 left-0 right-0 bg-gray-200 text-gray-600 text-xs font-bold text-center py-1 rounded-t-2xl border-b border-gray-300">
                        EM ATENDIMENTO (OUTRO ESPECIALISTA)
                      </div>
                    )}

                    {/* Header - Urgência / Timer */}
                    <div className="text-center pb-3 border-b border-gray-200 mt-2">
                      {/* Show Timer for Pending or My Calls. Maybe hide for others? keeping for context */}
                      <p className="text-sm text-gray-500 font-inter">
                        {isPending ? 'Em espera há:' : 'Tempo decorrido:'}
                      </p>
                      <p className={`text-3xl tabular-nums ${isUrgent ? 'text-red-600' : 'text-green-600'} font-mono font-bold tracking-wide`} >
                        {timeDisplay}
                      </p>
                    </div>

                    {/* Body - Identidade (Horizontal Layout) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-inter">
                          Nome
                        </p>
                        <p className="text-base text-gray-900 truncate font-manrope font-bold">
                          {call.user?.full_name || 'Utilizador'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-inter">
                          Tipo
                        </p>
                        <p className="text-base text-gray-700 capitalize font-inter">
                          {call.request_type === 'urgent_call' ? 'Apoio Urgente' : (call.request_type || 'Apoio')}
                        </p>
                      </div>
                    </div>

                    {/* Middle - Contacto */}
                    {/* Only show contact if pending (to prepare) or claimed by me. Hide if claimed by other for privacy/clutter? */}
                    {!isClaimedByOther && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                        <p className="text-xs text-blue-700 uppercase tracking-wide mb-2 text-center font-inter font-semibold">
                          Contacto Direto
                        </p>
                        <p className="text-xl text-blue-900 text-center truncate font-mono font-bold">
                          {call.user?.phone || 'Sem número'}
                        </p>
                      </div>
                    )}

                    {/* If claimed by other, maybe show WHO claimed it? */}
                    {isClaimedByOther && (
                      <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center h-[88px]">
                        <UserCheck className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 font-medium">Outro colega está a tratar</p>
                      </div>
                    )}

                    {/* Bottom - Ação */}
                    <div className="pt-2">
                      {isPending && (
                        <Button
                          onClick={() => handleClaimOrder(call.id)}
                          className="w-full h-11 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Atender Pedido
                        </Button>
                      )}

                      {isClaimedByMe && (
                        <ResolverHoverButton
                          label="Resolver Pedido"
                          onClick={() => handleResolveCall(call.id)}
                        />
                      )}

                      {isClaimedByOther && (
                        <Button
                          disabled
                          className="w-full h-11 bg-gray-100 text-gray-400 border border-gray-200 rounded-xl cursor-not-allowed shadow-none"
                        >
                          Em Atendimento
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}