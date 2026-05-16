import { Clock, Mail, Phone as PhoneIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CallModal } from './CallModal';
import { usePendingCalls } from '@/hooks/useSpecialistData';
import { supabase } from '@/lib/supabase';
// DISABLED: import from 'sonner';


const getUrgencyInfo = (secondsElapsed: number) => {
  const hours = secondsElapsed / 3600;

  if (hours < 2) {
    return {
      level: 'Baixa urgência',
      badgeClass: 'text-green-600 bg-green-50 border-green-200'
    };
  }

  if (hours < 12) {
    return {
      level: 'Urgência moderada',
      badgeClass: 'text-orange-600 bg-orange-50 border-orange-200'
    };
  }

  return {
    level: 'Urgência crítica',
    badgeClass: 'text-red-600 bg-red-50 border-red-200'
  };
};

interface CallDetails {
  name: string;
  phone: string;
  company: string;
  email: string;
}

export function CallsPage() {
  const { calls, loading, refetch } = usePendingCalls();
  const [selectedCall, setSelectedCall] = useState<CallDetails | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [elapsedTimes, setElapsedTimes] = useState<Map<string, number>>(new Map());

  // Map real call requests to UI format
  const callRequests = useMemo(() => {
    const now = new Date();
    return calls
      .map((req) => {
        // req is now CallRequest type
        const metadata = req.metadata || {};

        // Calculate elapsed time
        const createdDate = new Date(req.created_at);
        const secondsSinceRequest = Math.max(
          0,
          Math.floor((now.getTime() - createdDate.getTime()) / 1000)
        );

        const rawName =
          (req.user?.full_name ?? '').trim() ||
          (req.user?.email ? req.user.email.split('@')[0] : '') ||
          'Utilizador';

        const initials =
          rawName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? '')
            .join('') || rawName.slice(0, 2).toUpperCase();

        const phone =
          req.user?.phone ||
          (typeof metadata?.user_phone === 'string' ? metadata.user_phone : '') ||
          (typeof metadata?.contact_phone === 'string' ? metadata.contact_phone : '');

        const notes = metadata?.notes || metadata?.requested_message || 'Pedido de chamada urgente';

        return {
          id: req.id,
          name: rawName,
          initials,
          company: 'Empresa', // TODO: Add company join if needed, or leave generic
          email: req.user?.email || '',
          phone,
          notes,
          secondsSinceRequest,
          requestedAt: createdDate,
          userNotes: '', // call_requests doesn't have a specific user_notes column other than metadata
        };
      })
      .filter((request): request is NonNullable<typeof request> => Boolean(request));
  }, [calls]);

  // Initialize countdowns when calls change
  useEffect(() => {
    if (callRequests.length === 0) {
      setElapsedTimes(new Map());
      return;
    }

    const initialElapsed = new Map<string, number>();
    callRequests.forEach(request => {
      initialElapsed.set(request.id, request.secondsSinceRequest);
    });
    setElapsedTimes(initialElapsed);
  }, [callRequests]);

  // Update countdowns every second
  useEffect(() => {
    if (elapsedTimes.size === 0) return;

    const intervalId = setInterval(() => {
      setElapsedTimes(prev => {
        const newCountdowns = new Map(prev);
        newCountdowns.forEach((value, key) => {
          if (!resolvedIds.has(key)) {
            newCountdowns.set(key, value + 1);
          }
        });
        return newCountdowns;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [elapsedTimes.size, resolvedIds]);

  // Early return AFTER all hooks have been called
  if (loading) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando chamadas pendentes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleResolve = async (id: string) => {
    try {
      setResolvingId(id);
      const { error } = await supabase
        .from('call_requests')
        .update({
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setResolvedIds(prev => new Set(prev).add(id));
      toast.success('Pedido marcado como resolvido.');
      await refetch();
    } catch (err) {
      console.error('Erro ao resolver pedido:', err);
      toast.error('Não foi possível resolver o pedido.');
    } finally {
      setResolvingId(null);
    }
  };
  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-gray-900 mb-2 text-4xl font-bold font-source-serif-pro">Pedidos de Chamada</h1>
          <p className="text-gray-500">Gerir solicitações de chamada dos utilizadores das empresas atribuídas</p>
        </div>

        {/* Call Requests Section */}
        <div className="rounded-[2rem] p-4 sm:p-6 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                <PhoneIcon className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-gray-900">Pedidos de Chamada Pendentes</h2>
            </div>
            <span className="sm:ml-auto bg-white/60 text-gray-700 px-4 py-2 rounded-full text-sm self-start sm:self-center">
              {callRequests.length} pedidos
            </span>
          </div>

          {/* Call Request List */}
          <div className="space-y-3 sm:space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {callRequests.filter(req => !resolvedIds.has(req.id)).map((request) => (
              <div
                key={request.id}
                className={`bg-white rounded-2xl p-4 lg:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden ${resolvingId === request.id ? 'animate-[slideOut_0.8s_ease-in-out_forwards]' : ''
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
                  {/* Avatar Circle */}
                  <div className="w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md self-start sm:self-auto">
                    <span className="text-white text-sm">
                      {request.initials}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name & Badge */}
                    <div className="flex items-center flex-wrap gap-2 mb-2 lg:mb-1.5">
                      <h3 className="text-gray-900 truncate">{request.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] flex-shrink-0 bg-blue-100 text-blue-700 border border-blue-200">
                        Pedido de chamada
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200">
                        Urgente
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{request.company}</p>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 mb-2 lg:mb-1.5" />

                    {/* Notes */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 lg:p-2 mb-3 sm:mb-2.5 lg:mb-2">
                      <p className="text-sm text-gray-700">
                        {request.notes}
                      </p>
                      {request.userNotes && (
                        <p className="text-xs text-gray-500 mt-1 break-words">{request.userNotes}</p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                      {request.phone && (
                        <span className="flex items-center gap-1">
                          <PhoneIcon className="w-3.5 h-3.5" />
                          {request.phone}
                        </span>
                      )}
                      {request.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[140px]">{request.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedCall({
                            name: request.name,
                            phone: request.phone || '',
                            company: request.company,
                            email: request.email || '',
                          })
                        }
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white px-4 lg:px-5 py-2.5 sm:py-2 lg:py-1.5 rounded-xl transition-all duration-200 shadow-sm"
                      >
                        <PhoneIcon className="w-4 h-4" />
                        <span className="text-sm">Ligar</span>
                      </button>
                      <button
                        onClick={() => handleResolve(request.id)}
                        disabled={resolvingId === request.id}
                        className={`flex items-center justify-center gap-2 px-4 lg:px-5 py-2.5 sm:py-2 lg:py-1.5 rounded-xl transition-all duration-200 border ${resolvingId === request.id
                          ? 'bg-green-500 text-white border-green-600 scale-105'
                          : 'bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-800 border-gray-300'
                          }`}
                      >
                        <Clock className={`w-4 h-4 ${resolvingId === request.id ? 'animate-spin' : ''}`} />
                        <span className="text-sm">{resolvingId === request.id ? 'Resolvido!' : 'Resolver'}</span>
                      </button>

                      {/* Mobile time */}
                      <div className="lg:hidden flex flex-col gap-1 sm:ml-auto">
                        <div className={`flex items-center justify-center gap-1 text-xs py-1 px-2 rounded-lg border ${getUrgencyInfo(elapsedTimes.get(request.id) ?? request.secondsSinceRequest).badgeClass}`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatCountdown(elapsedTimes.get(request.id) ?? request.secondsSinceRequest)}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 text-center">
                          {getUrgencyInfo(elapsedTimes.get(request.id) ?? request.secondsSinceRequest).level}
                        </span>
                      </div>

                      {/* Desktop time */}
                      <div className="hidden lg:flex flex-col items-end gap-1 ml-auto">
                        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border ${getUrgencyInfo(elapsedTimes.get(request.id) ?? request.secondsSinceRequest).badgeClass}`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatCountdown(elapsedTimes.get(request.id) ?? request.secondsSinceRequest)}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {getUrgencyInfo(elapsedTimes.get(request.id) ?? request.secondsSinceRequest).level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call Modal */}
      {selectedCall && (
        <CallModal
          userName={selectedCall.name}
          userPhone={selectedCall.phone}
          userCompany={selectedCall.company}
          userEmail={selectedCall.email}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
}