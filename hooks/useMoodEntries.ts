import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface MoodEntry {
    id: string;
    user_id: string;
    mood_index: number;
    notes?: string;
    created_at: string;
}

export function useMoodEntries() {
    const { user } = useAuth();
    const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch mood entries
    const fetchMoodEntries = async () => {
        if (!user) {
            setMoodEntries([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setMoodEntries(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching mood entries:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch mood entries');
        } finally {
            setLoading(false);
        }
    };

    // Add new mood entry (Upsert)
    const addMoodEntry = async (moodIndex: number, notes?: string) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            const { error: insertError } = await supabase.rpc('upsert_mood_entry', {
                p_mood_index: moodIndex,
                p_notes: notes || null
            });

            if (insertError) throw insertError;

            // Optimistically update or refetch
            // For simplicity and correctness with the RPC void return, we refetch
            await fetchMoodEntries();

            // Return a mock placeholder or nothing since RPC returns void
            return { mood_index: moodIndex, success: true };
        } catch (err) {
            console.error('Error adding mood entry:', err);
            throw err;
        }
    };

    // Delete mood entry
    const deleteMoodEntry = async (id: string) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            const { error: deleteError } = await supabase
                .from('mood_entries')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (deleteError) throw deleteError;

            // Remove from local state
            setMoodEntries(prev => prev.filter(entry => entry.id !== id));
        } catch (err) {
            console.error('Error deleting mood entry:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchMoodEntries();
    }, [user?.id]);

    return {
        moodEntries,
        loading,
        error,
        addMoodEntry,
        deleteMoodEntry,
        refetch: fetchMoodEntries,
    };
}
