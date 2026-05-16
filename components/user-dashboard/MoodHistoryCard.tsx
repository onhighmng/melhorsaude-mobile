import { Smile, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMood } from '@/contexts/MoodContext';

const MOOD_EMOJIS = ['😞', '😟', '😐', '😊', '😄'];
const MOOD_NAMES  = ['Muito Mal', 'Mal', 'Ok', 'Bem', 'Ótimo'];
const MOOD_COLORS = ['bg-red-100', 'bg-orange-100', 'bg-gray-100', 'bg-green-100', 'bg-yellow-100'];

export function MoodHistoryCard({ onViewAll }: { onViewAll?: () => void }) {
  const { moodHistory, loading } = useMood();

  const recent = moodHistory.slice(0, 5);

  const trend = (() => {
    if (moodHistory.length < 2) return 'neutral';
    const latest = moodHistory[0].selectedMoodIndex;
    const prev   = moodHistory[1].selectedMoodIndex;
    if (latest > prev) return 'up';
    if (latest < prev) return 'down';
    return 'neutral';
  })();

  return (
    <div className="bg-gradient-to-br from-[#F5E8FF] to-[#E8D4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-[#9C27B0]" />
            <h3 className="text-gray-900">Histórico de Humor</h3>
          </div>
          {trend === 'up'      && <TrendingUp  className="w-4 h-4 text-green-600" />}
          {trend === 'down'    && <TrendingDown className="w-4 h-4 text-red-500"  />}
          {trend === 'neutral' && <Minus        className="w-4 h-4 text-gray-400" />}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-white/40 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Ainda sem registos de humor. Regista o teu primeiro!
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((entry, i) => {
              const idx = Math.max(0, Math.min(4, entry.selectedMoodIndex));
              return (
                <div key={entry.id ?? i} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${MOOD_COLORS[idx]} flex items-center justify-center text-xl`}>
                      {MOOD_EMOJIS[idx]}
                    </div>
                    <div className="text-left">
                      <div className="text-gray-900 text-sm">{MOOD_NAMES[idx]}</div>
                      <div className="text-gray-500 text-xs">{entry.date}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onViewAll}
          className="w-full text-center text-[#007AFF] text-sm hover:underline"
        >
          Ver histórico completo
        </button>
      </div>
    </div>
  );
}
