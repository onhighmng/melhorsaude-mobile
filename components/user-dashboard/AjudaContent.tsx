import { useState, useEffect } from 'react';
import { Send, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
// DISABLED: import from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'sonner';

interface FAQ {
  id: string;
  question_pt: string;
  answer_pt: string;
}

export function AjudaContent() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'support'; time: string }[]>([
    {
      text: 'Olá! Como podemos ajudá-lo hoje?',
      sender: 'support',
      time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  // Fetch FAQs
  useEffect(() => {
    async function fetchFAQs() {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('id, question_pt, answer_pt')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoadingFaqs(false);
      }
    }
    fetchFAQs();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Optimistic UI update
    const newMessage = {
      text: inputMessage,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    setIsSending(true);

    try {
      if (user) {
        const { error } = await supabase
          .from('support_tickets')
          .insert({
            user_id: user.id,
            message: messageToSend,
            status: 'open'
          });

        if (error) throw error;

        // Auto-reply
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: 'A sua mensagem foi recebida. Um membro da nossa equipa entrará em contacto em breve.',
            sender: 'support',
            time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
      } else {
        toast.error("Precisa iniciar sessão para enviar mensagens.");
      }
    } catch (error) {
      console.error('Error sending support ticket:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 md:pb-8">
      {/* Header */}
      <div


        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-gray-900 text-3xl md:text-4xl font-serif">
          Centro de Ajuda
        </h1>
        <p className="text-gray-600">
          Estamos aqui para ajudar. Entre em contacto connosco.
        </p>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Phone */}
        <div



          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Telefone</h3>
              <a href="tel:+351912345678" className="text-blue-600 hover:underline">
                +351 912 345 678
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div



          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Email</h3>
              <a href="mailto:suporte@exemplo.com" className="text-blue-600 hover:underline">
                suporte@exemplo.com
              </a>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div



          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Horário</h3>
              <p className="text-gray-600 text-sm">
                Seg - Sex<br />
                09:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div



        className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg border border-white/20 overflow-hidden"
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h2 className="text-white">Envie uma Mensagem</h2>
          <p className="text-blue-100 text-sm">Responderemos o mais breve possível</p>
        </div>

        {/* Messages Area */}
        <div className="h-[400px] md:h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}


              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] md:max-w-[70%] ${message.sender === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
                } rounded-2xl px-4 py-3`}>
                <p className="text-sm md:text-base">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200/50 p-4 bg-white/40">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              disabled={isSending}
              className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div



        className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-white/20"
      >
        <h2 className="text-gray-900 text-xl md:text-2xl mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {loadingFaqs ? (
            <p className="text-gray-500">A carregar perguntas...</p>
          ) : faqs.length > 0 ? (
            faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question_pt}
                answer={faq.answer_pt}
              />
            ))
          ) : (
            // Fallback if no FAQs are in DB yet
            <>
              <FAQItem
                question="Como agendar uma sessão?"
                answer="Pode agendar uma sessão através da página 'Agendar Sessão'. Selecione o pilar de saúde desejado e siga os passos para marcar a sua consulta."
              />
              <FAQItem
                question="Como posso cancelar uma sessão?"
                answer="Para cancelar uma sessão, vá para a página inicial, encontre a sessão na secção 'Próximas Sessões' e clique no botão de cancelar."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200/50 last:border-0 pb-4 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 py-2 hover:text-blue-600 transition-colors"
      >
        <span className="text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div



          className="mt-2 text-gray-600 text-sm md:text-base"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
