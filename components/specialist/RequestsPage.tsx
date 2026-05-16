import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { Button as MovingBorderButton } from '@/components/ui/moving-border';
import ResolverHoverButton from '@/components/ui/resolver-hover-button';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import melhorSaudeLogo from '@/assets/melhor-saude-logo.png';
import { supabase } from '@/lib/supabase';

interface Request {
    id: string;
    name: string;
    email: string;
    phone?: string;
    code: string;
    sessionsBought: number;
    sessionsLeft: number;
    dateCreated: string;
    humorTrend: 'up' | 'down';
    topEmoji: '🙁' | '😡' | '😐' | '😊' | '😃';
    status: 'active' | 'deactivated';
}

export function RequestsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
    const [requests, setRequests] = useState<Request[]>([]);

    // Fetch queue data from backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data, error } = await supabase
                    .from('call_requests')
                    .select(`
                        id,
                        user_id,
                        pillar_code,
                        status,
                        created_at,
                        profile:profiles!call_requests_user_id_fkey (
                            full_name,
                            email,
                            phone
                        )
                    `)
                    .eq('status', 'pending');

                if (error) throw error;

                // Transform data
                const mappedRequests: Request[] = (data || []).map((req: any) => ({
                    id: req.id,
                    name: req.profile?.full_name || 'Utilizador',
                    email: req.profile?.email || 'N/A',
                    phone: req.profile?.phone || 'N/A', // Added phone field
                    code: 'N/A', // Placeholder or use company ID if available
                    sessionsBought: 0, // Placeholder
                    sessionsLeft: 0, // Placeholder
                    dateCreated: req.created_at,
                    humorTrend: 'up', // Placeholder, would fetch mood_entries
                    topEmoji: '😐', // Placeholder
                    status: 'active'
                }));
                setRequests(mappedRequests);

                // Initialize wait times based on created_at
                const times: Record<string, number> = {};
                mappedRequests.forEach(req => {
                    const elapsed = Math.floor((Date.now() - new Date(req.dateCreated).getTime()) / 1000);
                    times[req.id] = elapsed > 0 ? elapsed : 0;
                });
                setWaitTimes(times);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();

        // Subscribe to new requests
        const subscription = supabase
            .channel('call_requests_public')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'call_requests' }, (payload) => {
                fetchRequests(); // Simplest approach: refresh all on any change
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const [waitTimes, setWaitTimes] = useState<Record<string, number>>({});

    // Timer for wait times
    useEffect(() => {
        const interval = setInterval(() => {
            setWaitTimes(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(id => {
                    updated[id] = updated[id] + 1;
                });
                return updated;
            });
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [requestToResolve, setRequestToResolve] = useState<string | null>(null);

    const handleResolveRequest = async (requestId: string) => {
        try {
            const { error } = await supabase
                .from('call_requests')
                .update({ status: 'completed' })
                .eq('id', requestId);

            if (error) throw error;

            setRequests(requests.filter(req => req.id !== requestId));
            setWaitTimes(prev => {
                const updated = { ...prev };
                delete updated[requestId];
                return updated;
            });
            setDeactivateDialogOpen(false);
            setRequestToResolve(null);
        } catch (error) {
            console.error("Error resolving request:", error);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-white md:bg-transparent">
            <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
            </button>

            <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4 md:gap-8">
                <h1 className="text-3xl md:text-4xl text-[#1a1a1a] font-pacifico">
                    Pedidos em Tempo Real
                </h1>

                <div className="flex items-center gap-1.5 max-w-md text-left md:text-right">
                    <p className="text-gray-600 font-inter font-bold text-lg">
                        Esteja atento. Alguém precisa de falar agora.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="space-y-6 max-w-3xl">
                    <div className="flex items-center gap-2">
                        <div className="relative w-[30px] h-[30px] flex items-center justify-center">
                            <span
                                style={{
                                    animationDuration: '3s',
                                }}
                                className="text-[#2354a2] text-[30px] inline-block animate-spin font-inter"
                            >
                                ✱
                            </span>
                        </div>
                        <h2
                            className="text-[#4a5565] uppercase tracking-[0.4px] font-inter font-medium text-[20px] leading-[36px]"
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
                        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="font-manrope font-bold text-2xl">
                                    Protocolo de Atendimento
                                </DialogTitle>
                                <DialogDescription className="font-inter">
                                    Guia rápido para conduzir chamadas com colaboradores em situação de apoio emocional.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
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

                <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl text-gray-900 font-manrope font-bold">
                            Pedidos em Espera ({requests.length})
                        </h3>
                        <ImageWithFallback
                            src={melhorSaudeLogo}
                            alt="Melhor Saúde"
                            className="h-6 w-auto object-contain"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests
                            .sort((a, b) => (waitTimes[b.id] || 0) - (waitTimes[a.id] || 0))
                            .map((request) => {
                                const totalSeconds = waitTimes[request.id] || 0;
                                const minutes = Math.floor(totalSeconds / 60);
                                const seconds = totalSeconds % 60;
                                const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                                const isUrgent = totalSeconds > 300;

                                return (
                                    <div
                                        key={request.id}
                                        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="text-center pb-3 border-b border-gray-200">
                                            <p className="text-sm text-gray-500 font-inter">
                                                Em espera há:
                                            </p>
                                            <p
                                                className={`text-3xl tabular-nums ${isUrgent ? 'text-red-600' : 'text-green-600'} font-mono font-bold tracking-wide`}
                                            >
                                                {timeDisplay}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-inter">
                                                    Nome
                                                </p>
                                                <p className="text-base text-gray-900 font-manrope font-bold">
                                                    {request.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-inter">
                                                    Empresa
                                                </p>
                                                <p className="text-base text-gray-700 font-inter">
                                                    {request.email.split('@')[1]?.split('.')[0] || 'Empresa'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                                            <p className="text-xs text-blue-700 uppercase tracking-wide mb-2 text-center font-inter font-semibold">
                                                Contacto Direto
                                            </p>
                                            <p className="text-xl text-blue-900 text-center font-mono font-bold">
                                                {request.phone || '+258 84 123 4567'}
                                            </p>
                                        </div>

                                        <ResolverHoverButton
                                            onClick={() => {
                                                setRequestToResolve(request.id);
                                                setDeactivateDialogOpen(true);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-manrope font-bold">
                            Confirmar Resolução
                        </DialogTitle>
                        <DialogDescription className="font-inter">
                            Confirma que realizou a chamada e resolveu o pedido deste colaborador? O pedido será removido da fila.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => requestToResolve && handleResolveRequest(requestToResolve)}
                        >
                            Confirmar Resolução
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
