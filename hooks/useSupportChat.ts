import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_type: 'user' | 'support';
  message: string;
  created_at: string;
}

interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
}

export function useSupportChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [currentTicket, setCurrentTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      initializeChat();
    }
  }, [user]);

  const initializeChat = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Try to find an existing open or in_progress ticket for this user
      const { data: tickets, error: ticketsError } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['open', 'in_progress'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (ticketsError) throw ticketsError;

      let ticket = tickets && tickets.length > 0 ? tickets[0] : null;

      // If no open ticket, create a new one
      if (!ticket) {
        const { data: newTicket, error: createError } = await supabase
          .from('support_tickets')
          .insert({
            user_id: user.id,
            subject: 'Pedido de Ajuda',
            status: 'open'
          })
          .select()
          .single();

        if (createError) throw createError;
        ticket = newTicket;

        // Add welcome message
        await supabase
          .from('support_messages')
          .insert({
            ticket_id: ticket.id,
            sender_type: 'support',
            message: 'Olá! Como podemos ajudá-lo hoje?'
          });
      }

      setCurrentTicket(ticket);

      // Fetch messages for this ticket
      const { data: messagesData, error: messagesError } = await supabase
        .from('support_messages')
        .select('*')
        .eq('ticket_id', ticket.id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);
      setError(null);
    } catch (err: any) {
      console.error('Error initializing support chat:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!user || !currentTicket || !messageText.trim()) {
      return { success: false, error: 'Invalid message or ticket' };
    }

    try {
      const { data: newMessage, error: sendError } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: currentTicket.id,
          sender_type: 'user',
          message: messageText.trim()
        })
        .select()
        .single();

      if (sendError) throw sendError;

      // Add message to local state immediately
      setMessages(prev => [...prev, newMessage]);

      // Update ticket status to 'in_progress'
      await supabase
        .from('support_tickets')
        .update({ status: 'in_progress', updated_at: new Date().toISOString() })
        .eq('id', currentTicket.id);

      // Simulate support response after 2 seconds
      setTimeout(async () => {
        const { data: responseMessage } = await supabase
          .from('support_messages')
          .insert({
            ticket_id: currentTicket.id,
            sender_type: 'support',
            message: 'Obrigado pela sua mensagem. A nossa equipa irá responder em breve.'
          })
          .select()
          .single();

        if (responseMessage) {
          setMessages(prev => [...prev, responseMessage]);
        }
      }, 2000);

      return { success: true, message: newMessage };
    } catch (err: any) {
      console.error('Error sending message:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    messages,
    currentTicket,
    sendMessage,
    loading,
    error,
    refetch: initializeChat
  };
}

