import { useState, useMemo } from 'react';
import { FullScreenModal } from './FullScreenModal';
import { useMood } from '@/contexts/MoodContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import imgMelhorSaudeTransparentClean1 from "@/assets/f066e727bc45a7068fb1f989657736b83adf0448.png";

interface MoodHistoryModalProps {
    onClose: () => void;
}

const ALL_MOODS = [
    { emoji: '🙁', name: 'Triste', color: '#3b82f6' },
    { emoji: '😡', name: 'Zangado', color: '#ef4444' },
    { emoji: '😐', name: 'Neutro', color: '#6b7280' },
    { emoji: '😊', name: 'Feliz', color: '#fbbf24' },
    { emoji: '😃', name: 'Muito Feliz', color: '#10b981' },
];

export function MoodHistoryModal({ onClose }: MoodHistoryModalProps) {
    const { moodHistory } = useMood();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('all');

    // Stats Logic (reused from mobile)
    const recentEntries = moodHistory.slice(0, 5);
    const olderEntries = moodHistory.slice(5, 10);
    const recentAvg = recentEntries.reduce((sum, e) => sum + e.selectedMoodIndex, 0) / (recentEntries.length || 1);
    const olderAvg = olderEntries.reduce((sum, e) => sum + e.selectedMoodIndex, 0) / (olderEntries.length || 1);
    const moodImproving = recentAvg > olderAvg;

    const moodCounts = moodHistory.reduce((acc, entry) => {
        const moodName = ALL_MOODS[entry.selectedMoodIndex]?.name || 'Unknown';
        acc[moodName] = (acc[moodName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostFrequentMoodEntry = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const mostFrequentMoodName = mostFrequentMoodEntry ? mostFrequentMoodEntry[0] : 'N/A';
    const mostFrequentEmoji = ALL_MOODS.find(m => m.name === mostFrequentMoodName)?.emoji || '-';

    // Filter Logic
    const filteredHistory = useMemo(() => {
        if (selectedFilter === 'all') return moodHistory;

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));

        return moodHistory.filter(entry => {
            // entry.date is "DD/MM" - hard to parse strictly without year. 
            // Assuming current year for simplicity or if entry has raw timestamp?
            // Context usually provides raw created_at. Let's assume entry has `created_at` or `timestamp`.
            // Looking at `useMoodEntries` hook (viewed code earlier, Step 1067 uses `entry.date` string in render, but `useMood` output structure...)
            // Context provides `timestamp` (number) derived from created_at
            if (!entry.timestamp) return true;
            const entryDate = new Date(entry.timestamp);

            if (selectedFilter === 'week') return entryDate >= oneWeekAgo;
            if (selectedFilter === 'month') return entryDate >= oneMonthAgo;
            return true;
        });
    }, [moodHistory, selectedFilter]);

    return (
        <FullScreenModal
            title="Histórico de Humor"
            onClose={onClose}
            filters={
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['all', 'week', 'month'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter as any)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${selectedFilter === filter
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {filter === 'all' ? 'Todos' : filter === 'week' ? 'Semana' : 'Mês'}
                        </button>
                    ))}
                </div>
            }
        >
            <div className="flex flex-col gap-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between col-span-1 lg:col-span-2">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Humor Frequentemente</p>
                            <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-4xl">{mostFrequentEmoji}</span>
                                {mostFrequentMoodName}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Baseado em {moodHistory.length} registros</p>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${moodImproving ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                            {moodImproving ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
                        </div>
                    </div>
                </div>

                {/* Grid of Entries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredHistory.map((entry, index) => {
                        const selectedMood = ALL_MOODS[entry.selectedMoodIndex] || ALL_MOODS[2];
                        return (
                            <div key={index} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative group hover:shadow-md transition-all">
                                <div className="absolute left-5 top-5 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <img src={imgMelhorSaudeTransparentClean1} alt="" className="h-4 w-auto" />
                                </div>
                                <div className="text-right mb-4">
                                    <p className="font-bold text-gray-900">{entry.date}</p>
                                    <p className="text-xs text-gray-500">{entry.time || '00:00'}</p>
                                </div>

                                <div className="flex justify-center gap-1.5 mb-4">
                                    {ALL_MOODS.map((m, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${i === entry.selectedMoodIndex ? 'bg-opacity-10 shadow-sm scale-110' : 'opacity-10 grayscale'}`}
                                            style={{ backgroundColor: i === entry.selectedMoodIndex ? m.color : 'transparent' }}
                                        >
                                            {m.emoji}
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <p className="font-bold text-sm" style={{ color: selectedMood.color }}>{selectedMood.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </FullScreenModal>
    );
}
