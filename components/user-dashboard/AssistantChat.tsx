import { useState } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';

interface AssistantChatProps {
  pillarType: 'mental' | 'fisico' | 'financeira' | 'juridica';
  onBack: () => void;
  onRequestSession: () => void;
}

const pillarConfig = {
  mental: {
    title: 'Assistente de Saúde Mental',
    quickActions: [
      'falar com Psiquiatra',
      'Psicóloga',
      'Terapeuta Familiar',
      'Terapeuta de Casal'
    ]
  },
  fisico: {
    title: 'Assistente de Bem-estar Físico',
    quickActions: [
      'Educador Físico / Personal Trainer',
      'Nutricionista',
      'Médico Clínico Geral',
      'Fisioterapeuta'
    ]
  },
  financeira: {
    title: 'Assistente de Assistência Financeira',
    quickActions: [
      'Consultor Financeiro',
      'Contabilista',
      'Planejador Financeiro',
      'Economista'
    ]
  },
  juridica: {
    title: 'Assistente de Assistência Jurídica',
    quickActions: [
      'Consultora Jurídica',
      'Assessora Jurídica'
    ]
  }
};

export function AssistantChat({ pillarType, onBack, onRequestSession }: AssistantChatProps) {
  const [message, setMessage] = useState('');
  const config = pillarConfig[pillarType];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  return (
    <div className="min-h-[80vh] flex flex-col pb-24 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-gray-900 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          {config.title}
        </h1>

        <button
          onClick={onRequestSession}
          className="group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-gray-300 bg-white px-8 py-3 text-gray-900 cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[28px] active:scale-[0.95] whitespace-nowrap"
        >
          <span className="relative z-[1] transition-all duration-[800ms] ease-out">
            Solicitar Sessão 1-on-1
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-[50%] opacity-0 group-hover:w-[280px] group-hover:h-[280px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
        </button>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 md:-mt-20">
        {/* Centered Heading */}
        <h2 className="text-gray-900 text-center mb-8 text-2xl md:text-5xl font-serif">
          Aqui a tua conversa é segura, privada e totalmente confidencial.
        </h2>

        {/* Input Field with Send Button */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua pergunta..."
            className="w-full px-6 py-4 pr-16 bg-white rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
              message.trim()
                ? 'bg-blue-400 hover:bg-blue-500'
                : 'bg-gray-200'
            }`}
          >
            <ArrowUp className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {config.quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="px-6 py-3 bg-white rounded-full text-gray-900 hover:shadow-md hover:scale-105 active:scale-95 transition-all border border-gray-200 text-sm md:text-base"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}