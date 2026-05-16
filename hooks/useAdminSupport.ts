
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
// DISABLED: import from 'sonner';

export interface AdminTicket {
    id: string;
    user_id: string;
    subject: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    created_at: string;
    updated_at: string;
    user?: {
        full_name: string;
        email: string;
    } | null;
    last_message?: string;
}

export interface AdminMessage {
    id: string;
    ticket_id: string;
    sender_type: 'user' | 'support';
    message: string;
    created_at: string;
}

export function useAdminSupport() {
    const [tickets, setTickets] = useState<AdminTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<Record<string, AdminMessage[]>>({});

    const fetchTickets = async () => {
        try {
            setLoading(true);

            // Fetch tickets
            const { data: ticketsData, error: ticketsError } = await supabase
                .from('support_tickets')
                .select(`
          *,
          user:user_id(
            full_name,
            email
          )
        `)
                .order('updated_at', { ascending: false });

            if (ticketsError) throw ticketsError;

            // Type cast the response to match our interface
            // Note: Supabase types might be strict, so we handle the user relation manually
            const formattedTickets: AdminTicket[] = (ticketsData || []).map((t: any) => ({
                ...t,
                user: t.user // Relies on the foreign key relation 'user_id' -> 'profiles' or 'users' being correctly named 'user' in the query if alias used, or default relation name. 
                // If checking 'profiles', usually it's correct.
            }));

            setTickets(formattedTickets);
        } catch (error: any) {
            console.error('Error fetching tickets:', error);
            toast.error('Erro ao carregar tickets de suporte');
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (ticketId: string) => {
        try {
            const { data, error } = await supabase
                .from('support_messages')
                .select('*')
                .eq('ticket_id', ticketId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            setMessages(prev => ({
                ...prev,
                [ticketId]: data || []
            }));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendReply = async (ticketId: string, message: string) => {
        try {
            // 1. Insert Message
            const { data: newMessage, error: msgError } = await supabase
                .from('support_messages')
                .insert({
                    ticket_id: ticketId,
                    sender_type: 'support',
                    message: message
                })
                .select()
                .single();

            if (msgError) throw msgError;

            // 2. Update Ticket Status
            const { error: ticketError } = await supabase
                .from('support_tickets')
                .update({
                    status: 'resolved', // Auto-resolve on reply? Or 'in_progress'? 'resolved' is safer for now as "Annswered".
                    updated_at: new Date().toISOString()
                })
                .eq('id', ticketId);

            if (ticketError) throw ticketError;

            // Update local state
            setMessages(prev => ({
                ...prev,
                [ticketId]: [...(prev[ticketId] || []), newMessage]
            }));

            // Update ticket list order
            setTickets(prev => prev.map(t =>
                t.id === ticketId
                    ? { ...t, status: 'resolved', updated_at: new Date().toISOString() }
                    : t
            ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));

            return { success: true };
        } catch (error: any) {
            console.error('Error sending reply:', error);
            toast.error('Erro ao enviar resposta');
            return { success: false, error: error.message };
        }
    };

    const closeTicket = async (ticketId: string) => {
        try {
            const { error } = await supabase
                .from('support_tickets')
                .update({ status: 'closed', updated_at: new Date().toISOString() })
                .eq('id', ticketId);

            if (error) throw error;

            setTickets(prev => prev.map(t =>
                t.id === ticketId ? { ...t, status: 'closed' } : t
            ));
            toast.success('Ticket fechado');
        } catch (error) {
            toast.error('Erro ao fechar ticket');
        }
    };

    useEffect(() => {
        fetchTickets();

        // Subscribe to new tickets
        const channel = supabase
            .channel('admin-support')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'support_tickets' },
                (payload) => {
                    fetchTickets(); // Simpler to refetch for now to get joins
                }
            )
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'support_messages' },
                (payload) => {
                    // If it's a USER message, we should refresh.
                    // Ideally we'd check payload.new.sender_type
                    fetchTickets(); // Bumps the ticket to top
                    const msg = payload.new as AdminMessage;
                    if (messages[msg.ticket_id]) {
                        setMessages(prev => ({
                            ...prev,
                            [msg.ticket_id]: [...prev[msg.ticket_id], msg]
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        tickets,
        loading,
        messages,
        fetchMessages,
        sendReply,
        closeTicket,
        refreshTickets: fetchTickets
    };
}
