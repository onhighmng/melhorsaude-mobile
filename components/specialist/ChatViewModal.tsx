import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  session_id: string;
  sender_type: 'user' | 'ai';
  message: string;
  created_at: string;
}

interface ChatViewModalProps {
  chatSessionId: string;
  userName: string;
  onClose: () => void;
}

export function ChatViewModal({ chatSessionId, userName, onClose }: ChatViewModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', chatSessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading chat messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error loading chat messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 lg:p-4 transition-all duration-200 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-none lg:rounded-3xl shadow-2xl w-full h-full lg:max-w-4xl lg:max-h-[90vh] flex flex-col transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 lg:px-8 py-5 lg:py-6 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-gray-900 text-base lg:text-xl">Histórico de Chat</h2>
            <p className="text-sm text-gray-500 mt-1">{userName}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-4 scrollbar-pill">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando mensagens...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const showDate =
                  index === 0 ||
                  formatDate(messages[index - 1]?.created_at || '') !== formatDate(msg.created_at);

                return (
                  <div key={msg.id}>
                    {/* Date Separator */}
                    {showDate && (
                      <div className="flex items-center justify-center my-6">
                        <div className="bg-gray-100 px-4 py-1.5 rounded-full">
                          <span className="text-xs text-gray-600">{formatDate(msg.created_at)}</span>
                        </div>
                      </div>
                    )}

                    {/* Message */}
                    <div
                      className={`flex ${
                        msg.sender_type === 'user' ? 'justify-end' : 'justify-start'
                      } mb-3`}
                    >
                      <div
                        className={`max-w-[85%] lg:max-w-[70%] ${
                          msg.sender_type === 'user'
                            ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm'
                            : 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm'
                        } px-4 py-3 shadow-sm`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                        <p
                          className={`text-xs mt-1.5 ${
                            msg.sender_type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 lg:px-8 py-5 lg:py-6 rounded-b-3xl">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>ID da Sessão: {chatSessionId}</span>
            <span>{messages.length} mensagens</span>
          </div>
          <button
            onClick={handleClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
