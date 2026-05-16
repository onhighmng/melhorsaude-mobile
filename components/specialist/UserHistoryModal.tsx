import { X, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChatViewModal } from './ChatViewModal';

interface UserHistoryModalProps {
  user: {
    name: string;
    email: string;
    company: string;
    pilar: string;
    pilarColor: string;
    internalNotes?: {
      specialist: string;
      date: string;
      note: string | null;
      sessionDate: string;
      meetingType: string;
      preDiagnostic: any[];
      chatSessionId: string | null;
      isRescheduled: boolean;
      status: string;
    }[];
  };
  onClose: () => void;
}

export function UserHistoryModal({ user, onClose }: UserHistoryModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedChatSession, setSelectedChatSession] = useState<{ id: string; userName: string } | null>(null);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 lg:p-4 transition-all duration-200 ${isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-none lg:rounded-3xl shadow-2xl w-full h-full lg:max-w-3xl lg:max-h-[90vh] overflow-y-auto scrollbar-pill transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 lg:px-8 py-5 lg:py-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-gray-900 text-base lg:text-xl pr-2">Histórico de Triagem - {user.name}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-6 space-y-6 pb-24 lg:pb-6">
          {/* User Info */}
          <div className="bg-gray-50 rounded-2xl p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="min-w-0">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900 break-all">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Pilar</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${user.pilarColor}`}>
                  {user.pilar}
                </span>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-600 mb-1">Empresa</p>
                <p className="text-gray-900 break-words">{user.company}</p>
              </div>
            </div>
          </div>

          {/* Session History */}
          {user.internalNotes && user.internalNotes.length > 0 ? (
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Histórico de Sessões
              </h3>

              <div className="space-y-4">
                {user.internalNotes.map((session, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-4 lg:p-5 border border-gray-100">
                    {/* Session Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-200/50">
                      <div>
                        <p className="text-gray-900 font-medium">{session.sessionDate}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{session.meetingType}</span>
                          {session.isRescheduled && (
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">Reagendada</span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-xs ${session.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            session.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                              session.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                            {session.status === 'confirmed' ? 'Confirmada' :
                              session.status === 'completed' ? 'Concluída' :
                                session.status === 'cancelled' ? 'Cancelada' :
                                  session.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pre-diagnostic Questions */}
                    {session.preDiagnostic && session.preDiagnostic.length > 0 && (
                      <div className="mb-4 bg-white rounded-xl p-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pré-Diagnóstico</p>
                        <div className="space-y-2">
                          {session.preDiagnostic.map((qa: any, idx: number) => (
                            <div key={idx}>
                              <p className="text-sm text-gray-700 font-medium">{qa.question}</p>
                              <p className="text-sm text-gray-600">{qa.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat History Link */}
                    {session.chatSessionId && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Chat de Suporte</p>
                        <button
                          onClick={() => setSelectedChatSession({ id: session.chatSessionId!, userName: user.name })}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Ver Conversa Completa
                        </button>
                      </div>
                    )}

                    {/* Internal Note */}
                    {session.note && (
                      <div className="bg-yellow-50/50 rounded-xl p-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nota Interna</p>
                        <p className="text-sm text-gray-700">{session.note}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                          <span>{session.specialist}</span>
                          <span>• {session.date}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhuma sessão registada.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 lg:px-8 py-5 lg:py-6 rounded-b-3xl">
          <button
            onClick={handleClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Chat View Modal */}
      {selectedChatSession && (
        <ChatViewModal
          chatSessionId={selectedChatSession.id}
          userName={selectedChatSession.userName}
          onClose={() => setSelectedChatSession(null)}
        />
      )}
    </div>
  );
}