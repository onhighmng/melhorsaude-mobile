import { ArrowLeft, TrendingUp, TrendingDown, Minus, Frown, Meh, Smile, SmilePlus } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMood } from '@/contexts/MoodContext';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

const ALL_MOODS = [
  { Icon: Frown,     name: 'Muito Mal', color: '#60A5FA' },
  { Icon: Frown,     name: 'Mal',       color: '#F87171' },
  { Icon: Meh,       name: 'Ok',        color: '#94A3B8' },
  { Icon: Smile,     name: 'Bem',       color: '#34D399' },
  { Icon: SmilePlus, name: 'Ótimo',     color: '#FBBF24' },
];

const FILTERS = [
  { id: 'all'   as const, label: 'Tudo' },
  { id: 'week'  as const, label: 'Semana' },
  { id: 'month' as const, label: 'Mês' },
];

interface MoodHistoryPageProps {
  onBack: () => void;
}

export function MoodHistoryPage({ onBack }: MoodHistoryPageProps) {
  const { t } = useLanguage();
  const { moodHistory } = useMood();
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  const filteredHistory = moodHistory.slice(0, filter === 'week' ? 7 : filter === 'month' ? 30 : undefined);

  const recentAvg  = filteredHistory.slice(0, 5).reduce((s, e) => s + e.selectedMoodIndex, 0) / Math.max(1, Math.min(5, filteredHistory.length));
  const olderAvg   = filteredHistory.slice(5, 10).reduce((s, e) => s + e.selectedMoodIndex, 0) / Math.max(1, Math.min(5, filteredHistory.slice(5, 10).length));
  const improving  = recentAvg <= olderAvg;
  const trendPct   = filteredHistory.length > 5 ? Math.abs(((olderAvg - recentAvg) / Math.max(1, olderAvg)) * 100).toFixed(0) : '—';

  const moodCounts = filteredHistory.reduce((acc, e) => {
    const name = ALL_MOODS[e.selectedMoodIndex]?.name ?? 'Ok';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const TopMoodIcon = topMood ? ALL_MOODS.find(m => m.name === topMood[0])?.Icon ?? Meh : Meh;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen pb-32">

      {/* Header */}
      <div
        className="sticky top-0 z-20 px-5 pt-12 pb-4"
        style={{ background: `transparent`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <ArrowLeft size={17} className="text-[#0a0a0a]" />
          </button>
          <div>
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Bem-estar</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Histórico de Humor</h1>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-4 py-2 rounded-full font-poppins text-[12px] font-medium transition-all active:scale-95 shadow-sm"
              style={{
                background: filter === id ? '#1565C0' : '#ffffff',
                color: filter === id ? '#fff' : '#474747',
                border: filter === id ? '1px solid #1565C0' : `1px solid ${CARD_EL}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div


            className="rounded-[28px] p-4 flex flex-col items-center shadow-sm"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <TopMoodIcon size={26} className="mb-2 text-[#0a0a0a]" />
            <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider text-center">Mais frequente</p>
            <p className="font-poppins text-[#0a0a0a] text-[14px] font-light mt-1 text-center">{topMood?.[0] ?? '—'}</p>
          </div>

          <div



            className="rounded-[28px] p-4 flex flex-col items-center shadow-sm"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            {improving
              ? <TrendingUp size={22} style={{ color: '#10b981' }} className="mb-1" />
              : <TrendingDown size={22} style={{ color: '#ef4444' }} className="mb-1" />
            }
            <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider text-center">Tendência</p>
            <p className="font-poppins font-light text-[14px] mt-1" style={{ color: improving ? '#10b981' : '#ef4444' }}>
              {improving ? '↑' : '↓'} {trendPct}%
            </p>
          </div>

          <div



            className="rounded-[28px] p-4 flex flex-col items-center shadow-sm"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <span className="font-poppins text-[24px] font-light text-[#0a0a0a] mb-1">{filteredHistory.length}</span>
            <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider text-center">Registos</p>
          </div>
        </div>

        {/* Mood bar chart */}
        {Object.keys(moodCounts).length > 0 && (
          <div className="rounded-[28px] p-5 mb-5 shadow-sm" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-4">Distribuição</p>
            <div className="flex flex-col gap-2.5">
              {ALL_MOODS.map((mood) => {
                const count = moodCounts[mood.name] || 0;
                const maxCount = Math.max(...Object.values(moodCounts), 1);
                const pct = (count / maxCount) * 100;
                return (
                  <div key={mood.name} className="flex items-center gap-3">
                    <div className="size-6 rounded-full flex items-center justify-center shrink-0 bg-white border border-black/5">
                      <mood.Icon size={14} style={{ color: mood.color }} />
                    </div>
                    <div className="flex-1 h-2 rounded-[4px] overflow-hidden bg-white border border-black/5">
                      <div

                        animate={{ width: `${pct}%` }}

                        className="h-full rounded-[4px]"
                        style={{ background: mood.color }}
                      />
                    </div>
                    <span className="font-poppins text-[#474747] text-[11px] font-bold w-5 text-right shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* History list */}
        {filteredHistory.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-1 mt-2">Histórico</p>
            {filteredHistory.map((entry, i) => {
              const mood = ALL_MOODS[entry.selectedMoodIndex] ?? ALL_MOODS[2];
              return (
                <div
                  key={entry.timestamp}



                  className="flex items-center gap-3 px-4 py-3.5 rounded-[28px] shadow-sm bg-white"
                  style={{ border: `1px solid ${CARD_EL}` }}
                >
                  <div
                    className="size-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${mood.color}15` }}
                  >
                    <mood.Icon size={18} style={{ color: mood.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins text-[#0a0a0a] text-[16px] font-light">{mood.name}</p>
                    <p className="font-poppins text-[#474747] text-[12px]">{formatDate(entry.timestamp)}</p>
                  </div>
                  <div
                    className="size-2 rounded-full shrink-0 shadow-sm"
                    style={{ background: mood.color }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-16 rounded-full bg-[#f2f1ef] flex items-center justify-center mb-4">
               <Minus size={24} className="text-[#474747]" />
            </div>
            <p className="font-poppins text-[#0a0a0a] text-[18px] font-light">Sem registos ainda</p>
            <p className="font-poppins text-[#474747] text-[14px] mt-1">Regista o teu humor no ecrã principal</p>
          </div>
        )}
      </div>
    </div>
  );
}