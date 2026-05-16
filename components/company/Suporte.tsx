import { Send, HelpCircle, Mail, Clock, Phone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
}

export function Suporte() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Olá! Bem-vindo ao suporte da Melhor Saúde. Como posso ajudá-lo hoje?',
            sender: 'support',
            timestamp: new Date(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate support response
        setTimeout(() => {
            const supportMessage: Message = {
                id: messages.length + 2,
                text: 'Obrigado pela sua mensagem. Um dos nossos especialistas irá responder em breve.',
                sender: 'support',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, supportMessage]);
        }, 1000);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-4 md:pb-8">
            {/* Chat Container */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-[calc(100vh-180px)] md:h-[calc(100vh-200px)] flex flex-col">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-6">
                    <h2 className="text-white">Chat ao Vivo</h2>
                    <p className="text-blue-100 text-sm mt-1">Resposta média em 2 minutos</p>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                <div
                                    className={`rounded-2xl px-4 py-3 ${message.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                <p className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    {formatTime(message.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escreva a sua mensagem..."
                            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!inputValue.trim()}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Quick Help Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-900">Perguntas Frequentes</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Encontre respostas rápidas para as questões mais comuns</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-900">Contacto Direto</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <p className="text-gray-600 text-sm">suporte@melhorsaude.pt</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <p className="text-gray-600 text-sm">+351 800 123 456</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-900">Horário de Atendimento</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Segunda a Sexta: 9h - 18h</p>
                </div>
            </div>
        </div>
    );
}
