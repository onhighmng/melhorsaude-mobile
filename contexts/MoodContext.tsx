import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface MoodEntry {
    date: string;
    time: string;
    selectedMoodIndex: number;
    timestamp: number;
    id?: string;
    energy?: number;
    stress?: number;
    humor?: number;
    notes?: string;
}

interface MoodContextType {
    moodHistory: MoodEntry[];
    addMoodEntry: (moodIndex: number, notes?: string) => Promise<void>;
    addPulseEntry: (scores: { energy: number; stress: number; humor: number }) => Promise<void>;
    loading: boolean;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
    const { user, profile } = useAuth();
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMoodEntries = useCallback(async () => {
        if (!user) {
            setMoodHistory([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('mood_entries')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const mappedEntries: MoodEntry[] = data.map(item => {
                    const dateObj = new Date(item.created_at);
                    let pulseData = {};
                    try {
                        if (item.notes && item.notes.startsWith('{')) {
                            pulseData = JSON.parse(item.notes);
                        }
                    } catch (e) {}

                    return {
                        date: `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
                        time: `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`,
                        selectedMoodIndex: item.mood_index,
                        timestamp: dateObj.getTime(),
                        id: item.id,
                        notes: item.notes,
                        ...pulseData
                    };
                });
                setMoodHistory(mappedEntries);
            }
        } catch (error) {
            console.error('Error fetching mood history:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMoodEntries();
    }, [fetchMoodEntries]);

    const addMoodEntry = async (moodIndex: number, notes?: string) => {
        if (!user) return;

        try {
            const { error } = await supabase.rpc('upsert_mood_entry', {
                p_mood_index: moodIndex,
                p_notes: notes || 'Added via Dashboard'
            });

            if (error) throw error;
            await fetchMoodEntries();
        } catch (error) {
            console.error('Error adding mood entry:', error);
            throw error;
        }
    };

    const addPulseEntry = async (scores: { energy: number; stress: number; humor: number }) => {
        if (!user) return;

        try {
            const energyPct = ((scores.energy - 1) / 4) * 100;
            const stressPct = ((scores.stress - 1) / 4) * 100;
            const humorPct  = ((scores.humor - 1) / 4) * 100;
            const overallScore = Math.round((energyPct + (100 - stressPct) + humorPct) / 3);

            const { error } = await supabase.rpc('upsert_pulse_entry', {
                p_energy: scores.energy,
                p_stress: scores.stress,
                p_humor: scores.humor,
                p_overall_score: overallScore,
                p_notes: null
            });

            if (error) throw error;

            // RPC writes to both pulse_logs and mood_entries — just refresh
            await fetchMoodEntries();
        } catch (error) {
            console.error('Error adding pulse entry:', error);
            throw error;
        }
    };

    return (
        <MoodContext.Provider value={{ moodHistory, addMoodEntry, addPulseEntry, loading }}>
            {children}
        </MoodContext.Provider>
    );
}

export function useMood() {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
}
