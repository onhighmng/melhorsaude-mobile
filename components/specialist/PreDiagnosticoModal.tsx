import { ClipboardList, Loader2, MessageCircle, User, Bot, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  createdAt: string;
}

interface DiagnosticOption {
  question: string;
  answer: string;
}

interface PreDiagnosticoModalProps {
  userName: string;
  userEmail: string;
  pilar: string;
  diagnosticSessionId?: string;
  preDiagnosticData?: DiagnosticOption[];
  onClose: () => void;
}

export function PreDiagnosticoModal({
  userName,
  userEmail,
  pilar,
  diagnosticSessionId,
  preDiagnosticData,
  onClose
}: PreDiagnosticoModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'diagnostico'>('diagnostico');
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticOption[]>(preDiagnosticData ?? []);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(!preDiagnosticData || preDiagnosticData.length === 0);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loadingChat, setLoadingChat] = useState(Boolean(diagnosticSessionId));
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    if (preDiagnosticData && preDiagnosticData.length > 0) {
      setDiagnosticData(preDiagnosticData);
      setDiagnosticError(null);
      setLoadingDiagnostic(false);
      return;
    }

    const fetchDiagnosticData = async () => {
      if (!diagnosticSessionId) {
        setDiagnosticData([]);
        setLoadingDiagnostic(false);
        return;
      }

      try {
        setLoadingDiagnostic(true);
        setDiagnosticData([]);
        setDiagnosticError(null);

        const { data, error } = await supabase
          .from('diagnostic_responses')
          .select('question_text, selected_option, question_page, response_index')
          .eq('chat_session_id', diagnosticSessionId)
          .order('question_page', { ascending: true })
          .order('response_index', { ascending: true });

        if (error) throw error;

        const responses = (data || []).map((item) => ({
          question: item.question_text,
          answer: item.selected_option,
        }));

        setDiagnosticData(responses);
        setDiagnosticError(null);
      } catch (err: any) {
        console.error('Error fetching diagnostic responses:', err);
        setDiagnosticError('Não foi possível carregar as respostas do questionário.');
        setDiagnosticData([]);
      } finally {
        setLoadingDiagnostic(false);
      }
    };

    fetchDiagnosticData();
  }, [diagnosticSessionId, preDiagnosticData]);

  useEffect(() => {
    if (!diagnosticSessionId) {
      setChatHistory([]);
      setLoadingChat(false);
      return;
    }

    const fetchChatHistory = async () => {
      try {
        setLoadingChat(true);
        setChatError(null);

        const { data, error } = await supabase
          .from('chat_messages')
          .select('id, message, sender_type, created_at')
          .eq('session_id', diagnosticSessionId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        const mapped: ChatMessage[] = (data || []).map((item) => ({
          id: item.id,
          sender: item.sender_type === 'user' ? 'user' : 'bot',
          message: item.message,
          createdAt: item.created_at,
        }));

        setChatHistory(mapped);
      } catch (err: any) {
        console.error('Error fetching chat history:', err);
        setChatError('Não foi possível carregar o histórico de conversa.');
        setChatHistory([]);
      } finally {
        setLoadingChat(false);
      }
    };

    fetchChatHistory();
  }, [diagnosticSessionId]);

  const formattedChat = useMemo(() => {
    return chatHistory.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.createdAt).toLocaleString('pt-PT', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }));
  }, [chatHistory]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center transition-all duration-200 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white w-full h-full md:h-[95vh] md:w-[95vw] rounded-none md:rounded-3xl shadow-2xl overflow-hidden transition-all duration-200 flex flex-col ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-5 md:py-6 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-gray-900 text-xl md:text-2xl">Pré-Diagnóstico</h2>
              <p className="text-sm text-gray-600">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
                {pilar}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'chat'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Conversação</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostico')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'diagnostico'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span className="text-sm">Questionário</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scrollbar-pill">
          {activeTab === 'chat' ? (
            <>
              {loadingChat ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-sm gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  A carregar histórico de conversa...
                </div>
              ) : chatError ? (
                <div className="text-center py-12 text-red-500 text-sm">{chatError}</div>
              ) : formattedChat.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  Nenhuma conversa disponível para este utilizador ainda.
                </div>
              ) : (
                <div className="space-y-4">
                  {formattedChat.map((msg) => {
                    const isUser = msg.sender === 'user';

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isUser
                              ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600'
                              : 'bg-blue-500'
                          }`}
                        >
                          {isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div className={`flex-1 max-w-[80%] ${isUser ? 'flex justify-end' : ''}`}>
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm ${
                              isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            <p
                              className={`text-xs mt-2 ${
                                isUser ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {loadingDiagnostic ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-sm gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  A carregar respostas...
                </div>
              ) : diagnosticError ? (
                <div className="text-center py-12 text-red-500 text-sm">{diagnosticError}</div>
              ) : diagnosticData.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  Não foram encontradas respostas para este questionário.
                </div>
              ) : (
                diagnosticData.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-4 md:p-5">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                      Questão {index + 1}
                    </p>
                    <h4 className="text-gray-900 text-sm md:text-base font-medium mb-3">
                      {item.question}
                    </h4>
                    <div className="bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-sm md:text-base">
                      {item.answer}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-8 py-5 md:py-6 flex-shrink-0">
          <button
            onClick={handleClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}