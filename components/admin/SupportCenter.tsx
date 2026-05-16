
import { useState, useEffect, useRef } from 'react';
import { useAdminSupport, AdminTicket } from '@/hooks/useAdminSupport';
import { Search, MessageSquare, CheckCircle, Clock, Send, Archive, User, RefreshCw } from 'lucide-react';
// DISABLED: import from 'sonner';

export default function SupportCenter() {
    const { tickets, loading, messages, fetchMessages, sendReply, closeTicket, refreshTickets } = useAdminSupport();
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [replyText, setReplyText] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages[selectedTicketId || '']]);

    // Load messages when ticket selected
    useEffect(() => {
        if (selectedTicketId) {
            fetchMessages(selectedTicketId);
        }
    }, [selectedTicketId]);

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTicketId || !replyText.trim()) return;

        const result = await sendReply(selectedTicketId, replyText);
        if (result.success) {
            setReplyText('');
        }
    };

    const currentMessages = selectedTicketId ? messages[selectedTicketId] : [];

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.user?.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ? true :
                statusFilter === 'open' ? (ticket.status === 'open' || ticket.status === 'in_progress') :
                    (ticket.status === 'resolved' || ticket.status === 'closed');

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-red-500';
            case 'in_progress': return 'bg-blue-500';
            case 'resolved': return 'bg-green-500';
            case 'closed': return 'bg-gray-500';
            default: return 'bg-gray-300';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'open': return 'Novo';
            case 'in_progress': return 'Em Resposta';
            case 'resolved': return 'Respondido';
            case 'closed': return 'Fechado';
            default: return status;
        }
    };

    return (
        <div className="flex h-[calc(100vh-theme(spacing.20))] lg:h-screen bg-white overflow-hidden">
            {/* Sidebar - Ticket List */}
            <div className="w-full lg:w-96 border-r border-gray-200 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Suporte</h2>
                        <button onClick={() => refreshTickets()} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-blue-500">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        {(['all', 'open', 'closed'] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setStatusFilter(filter)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === filter
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {filter === 'all' ? 'Todos' : filter === 'open' ? 'Abertos' : 'Fechados'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">Carregando...</div>
                    ) : filteredTickets.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Nenhum ticket encontrado.
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <button
                                key={ticket.id}
                                onClick={() => setSelectedTicketId(ticket.id)}
                                className={`w-full text-left p-3 rounded-xl transition-all border ${selectedTicketId === ticket.id
                                        ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                                        : 'bg-white border-transparent hover:border-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-white ${getStatusColor(ticket.status)}`}>
                                        {getStatusLabel(ticket.status)}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(ticket.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{ticket.subject}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <User className="w-3 h-3" />
                                    <span className="truncate">{ticket.user?.full_name || ticket.user?.email || 'Utilizador Desconhecido'}</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content - Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-white relative">
                {selectedTicket ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {selectedTicket.user?.full_name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">{selectedTicket.subject}</h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        {selectedTicket.user?.full_name || selectedTicket.user?.email}
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="text-xs font-mono">{selectedTicket.id.slice(0, 8)}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {selectedTicket.status !== 'closed' && (
                                    <button
                                        onClick={() => closeTicket(selectedTicket.id)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                                    >
                                        <Archive className="w-3.5 h-3.5" />
                                        Fechar Ticket
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                            {/* Display Initial Ticket Info as a message block */}
                            <div className="flex gap-4 max-w-[80%]">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">
                                    {selectedTicket.user?.full_name?.charAt(0) || 'U'}
                                </div>
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">{selectedTicket.user?.full_name || 'Utilizador'}</p>
                                    <p className="text-sm text-gray-700">Abriu o ticket: "{selectedTicket.subject}"</p>
                                    <span className="text-[10px] text-gray-400 mt-2 block">{new Date(selectedTicket.created_at).toLocaleString()}</span>
                                </div>
                            </div>

                            {currentMessages?.map((msg) => {
                                const isSupport = msg.sender_type === 'support';
                                return (
                                    <div key={msg.id} className={`flex gap-4 ${isSupport ? 'justify-end' : ''}`}>
                                        {!isSupport && (
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">
                                                {selectedTicket.user?.full_name?.charAt(0) || 'U'}
                                            </div>
                                        )}

                                        <div className={`
                      max-w-[70%] p-4 rounded-2xl shadow-sm
                      ${isSupport
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-900 border border-gray-100 rounded-tl-none'
                                            }
                    `}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                            <div className={`text-[10px] mt-1 text-right ${isSupport ? 'text-blue-200' : 'text-gray-400'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        {isSupport && (
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                                MS
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {selectedTicket.status !== 'closed' ? (
                            <div className="p-4 bg-white border-t border-gray-200">
                                <form onSubmit={handleSendReply} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Escreva uma resposta..."
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2 font-medium text-sm"
                                    >
                                        <Send className="w-4 h-4" />
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
                                Este ticket foi fechado.
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <MessageSquare className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte ao Cliente</h3>
                        <p className="max-w-sm text-center">Selecione um ticket à esquerda para ver os detalhes e responder ao utilizador.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
