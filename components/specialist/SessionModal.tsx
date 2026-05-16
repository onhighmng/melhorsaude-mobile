import { X, Clock, Link as LinkIcon, CheckCircle, Phone, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
// DISABLED: import from 'sonner';
import { EncaminharModal } from './EncaminharModal';
import { PreDiagnosticoModal } from './PreDiagnosticoModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Session {
  id: string;
  userName: string;
  userEmail: string;
  companyName?: string;
  pillarLabel: string;
  pillarColor: string;
  pillarCode: string;
  meetingTypeLabel: string;
  timeLabel: string;
  meetingLink?: string;
  isPhoneSession: boolean;
  phoneNumber?: string | null;
  sessionMode: 'individual' | 'group';
  isCompleted: boolean;
  diagnosticSessionId?: string | null;
  preDiagnostic?: { question: string; answer: string; responseIndex?: number }[];
  referralStatus?: {
    isReferred: boolean;
    pilar?: string;
    provider?: string;
    date?: string;
    time?: string;
  };
}

interface SessionModalProps {
  sessions: Session[];
  date: number;
  month: string;
  onClose: () => void;
  onUpdateLink: (sessionId: string, link: string) => Promise<void>;
  onReferral: (sessionId: string, referralData: {
    pilar: string;
    provider: string;
    date: string;
    time: string;
  }) => void;
  onCompleteSession: (sessionId: string, context?: {
    userName?: string;
    companyName?: string;
    pillarLabel?: string;
    timeLabel?: string;
  }) => Promise<void> | void;
  highlightId?: string;
}

export function SessionModal({ sessions, date, month, onClose, onUpdateLink, onReferral, onCompleteSession, highlightId }: SessionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState('');
  const [isSavingLink, setIsSavingLink] = useState(false);
  const [selectedSessionForEncaminhar, setSelectedSessionForEncaminhar] = useState<Session | null>(null);
  const [selectedSessionForPreDiagnostico, setSelectedSessionForPreDiagnostico] = useState<Session | null>(null);
  const [completingSessionId, setCompletingSessionId] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    if (!highlightId || !isVisible) return;
    const target = document.getElementById(`specialist-session-${highlightId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId, isVisible, sessions.length]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleSaveLink = async (sessionId: string) => {
    console.log('Attempting to save link for session:', sessionId, 'Value:', linkInput);
    if (linkInput.trim()) {
      setIsSavingLink(true);
      try {
        await onUpdateLink(sessionId, linkInput);
        setEditingSessionId(null);
        setLinkInput('');
      } catch (error) {
        console.error('Failed to save link:', error);
        // Toast is handled in parent, but we keep the input open so user can retry
      } finally {
        setIsSavingLink(false);
      }
    } else {
      console.warn('Link input is empty or whitespace only');
      toast.warning('O link não pode estar vazio.');
    }
  };

  const startEditingLink = (session: Session) => {
    if (session.isPhoneSession) {
      toast.info('Sessões telefónicas não requerem link.');
      return;
    }
    setEditingSessionId(session.id);
    setLinkInput(session.meetingLink || '');
  };

  const handleCopyPhone = async (phone?: string | null) => {
    if (!phone) return;
    if (!navigator?.clipboard) {
      toast.error('Não foi possível aceder à área de transferência.');
      return;
    }

    try {
      await navigator.clipboard.writeText(phone);
      toast.success('Número copiado para a área de transferência.');
    } catch (error) {
      console.error('Failed to copy phone number', error);
      toast.error('Não foi possível copiar o número.');
    }
  };

  const handleCompleteSession = async (session: Session) => {
    setCompletingSessionId(session.id);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-pill transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-gray-900">Eventos do dia {date}</h2>
            <p className="text-sm text-gray-500 mt-1">{month}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-4">
          {sessions.map((session) => {
            const isHighlighted = highlightId === session.id;
            const hasPreDiagnostic = Array.isArray(session.preDiagnostic) && session.preDiagnostic.length > 0;
            const canViewPreDiagnostic = hasPreDiagnostic || Boolean(session.diagnosticSessionId);
            return (
              <div key={session.id} className="bg-gray-50 rounded-2xl p-6">
                <div
                  id={`specialist-session-${session.id}`}
                  className={`-m-6 p-6 rounded-2xl ${isHighlighted ? 'ring-2 ring-blue-400 bg-blue-50/40' : ''}`}
                >
                  {/* Session Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-gray-900">{session.userName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${session.pillarColor}`}>
                          {session.pillarLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
                          {session.sessionMode === 'individual' ? 'Individual' : 'Grupo'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {session.meetingTypeLabel}
                        </span>
                        {session.referralStatus?.isReferred && (
                          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Encaminhado
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{session.userEmail}</p>
                      {session.companyName && (
                        <p className="text-xs text-gray-500 mt-1">{session.companyName}</p>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{session.timeLabel}</span>
                  </div>

                  {/* Meeting Link / Phone Section */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    {session.isPhoneSession ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <h4 className="text-sm text-gray-900">Contato telefónico</h4>
                        </div>
                        {session.phoneNumber ? (
                          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <span className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800">
                              {session.phoneNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(session.phoneNumber)}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              Copiar número
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Número de telefone não disponível para esta sessão. Consulte os dados do colaborador no painel.
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Utilize o número acima para contactar o colaborador no horário agendado.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <span>
                          <h4 className="text-sm text-gray-900">Link da Sessão</h4>
                        </div>

                        {editingSessionId === session.id ? (
                          <div className="space-y-2">
                            <input
                              type="url"
                              value={linkInput}
                              onChange={(e) => setLinkInput(e.target.value)}
                              placeholder="https://meet.google.com/... ou https://zoom.us/..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              autoFocus
                              disabled={isSavingLink}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveLink(session.id)}
                                disabled={isSavingLink}
                                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                type="button"
                              >
                                {isSavingLink ? 'A guardar...' : 'Guardar'}
                              </button>
                              <button
                                onClick={() => {
                                  setEditingSessionId(null);
                                  setLinkInput('');
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm transition-colors"
                                type="button"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : session.meetingLink ? (
                          <div className="space-y-2">
                            <a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm transition-colors break-all"
                            >
                              {session.meetingLink}
                            </a>
                            <button
                              onClick={() => startEditingLink(session)}
                              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              type="button"
                            >
                              Editar link
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditingLink(session)}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl text-sm transition-colors"
                            type="button"
                          >
                            + Adicionar link da sessão
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Referral Details Section */}
                  {session.referralStatus?.isReferred && (
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <h4 className="text-sm text-gray-900">Detalhes do Encaminhamento</h4>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pilar:</span>
                          <span className="text-gray-900">{session.referralStatus.pilar}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Prestador:</span>
                          <span className="text-gray-900">{session.referralStatus.provider}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Data:</span>
                          <span className="text-gray-900">{session.referralStatus.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Hora:</span>
                          <span className="text-gray-900">{session.referralStatus.time}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons for each session */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedSessionForEncaminhar(session)}
                      className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm transition-colors"
                    >
                      Encaminhar
                    </button>
                    <button
                      onClick={() => {
                        if (canViewPreDiagnostic) {
                          setSelectedSessionForPreDiagnostico(session);
                        }
                      }}
                      disabled={!canViewPreDiagnostic}
                      className={`flex-1 px-4 py-2 rounded-xl text-sm transition-colors ${canViewPreDiagnostic
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {canViewPreDiagnostic ? 'Ver Pré Diagnóstico' : 'Pré-diagnóstico indisponível'}
                    </button>
                    <button
                      onClick={() => handleCompleteSession(session)}
                      disabled={session.isCompleted || completingSessionId === session.id}
                      className={`flex-1 px-4 py-2 rounded-xl text-sm transition-colors ${session.isCompleted
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                    >
                      {session.isCompleted
                        ? 'Sessão concluída'
                        : completingSessionId === session.id
                          ? 'A concluir...'
                          : 'Concluir sessão'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Encaminhar Modal */}
      {selectedSessionForEncaminhar && (
        <EncaminharModal
          sessionInfo={{
            userName: selectedSessionForEncaminhar.userName,
            userEmail: selectedSessionForEncaminhar.userEmail,
            originalPilar: selectedSessionForEncaminhar.pillarLabel,
          }}
          onClose={() => setSelectedSessionForEncaminhar(null)}
          onConfirm={(referralData) => {
            // Handle the referral confirmation
            console.log('Referral confirmed:', referralData);
            onReferral(selectedSessionForEncaminhar.id, referralData);
            setSelectedSessionForEncaminhar(null);
          }}
        />
      )}


      {/* Pre Diagnostico Modal */}
      {selectedSessionForPreDiagnostico && (
        <PreDiagnosticoModal
          userName={selectedSessionForPreDiagnostico.userName}
          userEmail={selectedSessionForPreDiagnostico.userEmail}
          pilar={selectedSessionForPreDiagnostico.pillarLabel}
          diagnosticSessionId={selectedSessionForPreDiagnostico.diagnosticSessionId ?? undefined}
          preDiagnosticData={selectedSessionForPreDiagnostico.preDiagnostic}
          onClose={() => setSelectedSessionForPreDiagnostico(null)}
        />
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={!!completingSessionId} onOpenChange={(open) => !open && setCompletingSessionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Concluir Sessão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja concluir esta sessão? Esta ação descontará uma sessão do limite mensal do colaborador.
              {completingSessionId && sessions.find(s => s.id === completingSessionId) && (
                <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                  <p><strong>Colaborador:</strong> {sessions.find(s => s.id === completingSessionId)?.userName}</p>
                  <p><strong>Pilar:</strong> {sessions.find(s => s.id === completingSessionId)?.pillarLabel}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                if (completingSessionId) {
                  const session = sessions.find(s => s.id === completingSessionId);
                  if (session) {
                    onCompleteSession(session.id, {
                      userName: session.userName,
                      companyName: session.companyName,
                      pillarLabel: session.pillarLabel,
                      timeLabel: session.timeLabel,
                    });
                  }
                  setCompletingSessionId(null);
                }
              }}
            >
              Confirmar Conclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}