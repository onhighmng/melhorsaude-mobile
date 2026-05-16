import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
import { toast } from '@/components/ui/use-toast';

export interface TimeBlock {
    id: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    reason: string;
}

export function useSpecialistAvailability() {
    const { user } = useAuth();
    const [blocks, setBlocks] = useState<TimeBlock[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlocks = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch bookings made BY the specialist (self-booking) with type 'blocked'
            // We need to assume specialist_id is linked to auth user.
            // Actually, we filter by user_id = user.id AND meeting_link = 'blocked' (using meeting_link as type carrier if meeting_type not avail)
            // Or better, check if meeting_type column exists. Metadata is safer `metadata->>'type' = 'blocked'`

            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', user.id) // Self-booked
                .eq('status', 'confirmed')
                .order('booking_date', { ascending: true });

            if (error) throw error;

            const loadedBlocks: TimeBlock[] = (data || [])
                .filter((b: any) => b.metadata?.type === 'blocked') // Filter by metadata
                .map((b: any) => ({
                    id: b.id,
                    startDate: b.booking_date,
                    startTime: b.start_time,
                    endDate: b.booking_date, // Assuming blocks are single day for now or handled via booking_date
                    endTime: b.end_time || b.start_time, // fallback
                    reason: b.notes || 'Bloqueado'
                }));

            setBlocks(loadedBlocks);
        } catch (err) {
            logger.error('Error fetching availability blocks', { error: err });
            // Fallback to empty if error
        } finally {
            setLoading(false);
        }
    };

    const addBlock = async (block: Omit<TimeBlock, 'id'>) => {
        if (!user) return;
        try {
            // We need specialist_id to create a booking.
            const { data: specialist } = await supabase
                .from('specialists')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (!specialist) throw new Error('Especialista não encontrado');

            // Insert booking
            // Note: Bookings usually require a valid time slot. We force it.
            const { data, error } = await supabase
                .from('bookings')
                .insert({
                    user_id: user.id,
                    specialist_id: specialist.id,
                    booking_date: block.startDate,
                    start_time: block.startTime,
                    end_time: block.endTime, // If column exists
                    status: 'confirmed',
                    notes: block.reason,
                    metadata: { type: 'blocked', reason: block.reason }
                })
                .select()
                .single();

            if (error) throw error;

            const newBlock: TimeBlock = {
                id: data.id,
                startDate: data.booking_date,
                startTime: data.start_time,
                endDate: data.booking_date,
                endTime: block.endTime,
                reason: block.reason
            };

            setBlocks(prev => [...prev, newBlock]);
            toast({ title: "Horário bloqueado com sucesso" });
            return true;
        } catch (err) {
            logger.error('Error creating block', { error: err });
            toast({ title: "Erro ao bloquear horário", variant: "destructive" });
            return false;
        }
    };

    const deleteBlock = async (id: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBlocks(prev => prev.filter(b => b.id !== id));
            toast({ title: "Bloqueio removido" });
        } catch (err) {
            logger.error('Error deleting block', { error: err });
            toast({ title: "Erro ao remover bloqueio", variant: "destructive" });
        }
    };

    useEffect(() => {
        fetchBlocks();
    }, [user]);

    return { blocks, loading, addBlock, deleteBlock };
}
