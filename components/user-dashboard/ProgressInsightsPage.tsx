// DISABLED: import from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, Brain, Calendar, ChevronRight } from 'lucide-react';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface ProgressInsightsPageProps {
  onBack: () => void;
}

const WEEKS       = ['S12', 'S13', 'S14', 'S15', 'S16', 'S17'];
const STRESS_DATA = [2, 3, 4, 4, 3, 3];
const ENERGY_DATA = [4, 3, 2, 2, 3, 2];

const HISTORY = [
  { week: 'Sem 17', type: 'Pulse', stress: 3, energy: 2, score: 35, status: 'attention' as const },
  { week: 'Sem 16', type: 'Pulse', stress: 3, energy: 3, score: 20, status: 'good'      as const },
  { week: 'Sem 15', type: 'Deep',  stress: 4, energy: 2, score: 50, status: 'warning'   as const },
  { week: 'Sem 14', type: 'Pulse', stress: 4, energy: 2, score: 50, status: 'warning'   as const },
  { week: 'Sem 13', type: 'Pulse', stress: 3, energy: 3, score: 20, status: 'good'      as const },
  { week: 'Sem 12', type: 'Deep',  stress: 2, energy: 4, score: 10, status: 'good'      as const },
];

const STATUS_COLOR = { warning: '#F87171', attention: '#FBBF24', good: '#34D399' } as const;

function BarChart({
  data,
  accent,
  highBad,
}: { data: number[]; accent: string; highBad: boolean }) {
  const max = 5;
  return (
    <div className="h-36 flex items-end gap-2 px-1">
      {data.map((val, i) => {
        const pct = (val / max) * 100;
        const flagged = highBad ? val >= 4 : val <= 2;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div

              animate={{ height: `${pct}%` }}

              className="w-full rounded-t-[6px]"
              style={{ background: flagged ? accent : '#ecece7' }}
            />
            <span className="font-poppins text-[#474747] text-[9px] font-bold uppercase">{WEEKS[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ProgressInsightsPage({ onBack }: ProgressInsightsPageProps) {
  return (
    <div className="min-h-screen pb-32">

      {/* Header */}
      <div
        className="sticky top-0 z-20 px-5 pt-12 pb-5"
        style={{ background: `transparent`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <ArrowLeft size={17} className="text-[#0a0a0a]" />
          </button>
          <div>
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Análise</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Evolução Pulse</h1>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-4">

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stress */}
          <div


            className="rounded-[28px] p-4 shadow-sm bg-white"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-poppins text-[#0a0a0a] text-[15px] font-light">Stress</p>
              <div className="size-7 rounded-[6px] flex items-center justify-center"
                style={{ background: 'rgba(248,113,113,0.12)' }}>
                <TrendingUp size={13} style={{ color: '#F87171' }} />
              </div>
            </div>
            <BarChart data={STRESS_DATA} accent="#F87171" highBad={true} />
            <p className="font-poppins text-[#474747] text-[10px] font-medium mt-2 italic">Vermelho = stress elevado</p>
          </div>

          {/* Energy */}
          <div



            className="rounded-[28px] p-4 shadow-sm bg-white"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-poppins text-[#0a0a0a] text-[15px] font-light">Energia</p>
              <div className="size-7 rounded-[6px] flex items-center justify-center"
                style={{ background: 'rgba(251,191,36,0.12)' }}>
                <TrendingDown size={13} style={{ color: '#FBBF24' }} />
              </div>
            </div>
            <BarChart data={ENERGY_DATA} accent="#FBBF24" highBad={false} />
            <p className="font-poppins text-[#474747] text-[10px] font-medium mt-2 italic">Amarelo = fadiga detetada</p>
          </div>
        </div>

        {/* Insights */}
        <div



          className="rounded-[28px] p-5 shadow-sm bg-white"
          style={{ border: `1px solid ${CARD_EL}` }}
        >
          <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-4">Insights do Sistema</p>
          <div className="flex flex-col gap-4">
            {[
              { Icon: Brain, accent: '#F87171', text: 'Stress elevado nas semanas 14 e 15 → ativou jornada automaticamente.' },
              { Icon: Zap,   accent: '#FBBF24', text: 'Energia baixa em 4 das últimas 6 semanas → padrão a observar.' },
              { Icon: TrendingUp, accent: '#34D399', text: 'Estabilidade emocional positiva detetada no início do mês.' },
            ].map(({ Icon, accent, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div
                  className="size-9 rounded-full flex items-center justify-center shrink-0 border border-black/5"
                  style={{ background: `${accent}15` }}
                >
                  <Icon size={15} style={{ color: accent }} />
                </div>
                <p className="font-poppins text-[#0a0a0a] text-[13px] leading-relaxed mt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Check-in history */}
        <div



          className="rounded-[28px] overflow-hidden shadow-sm bg-white"
          style={{ border: `1px solid ${CARD_EL}` }}
        >
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${CARD_EL}` }}>
            <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider">Histórico de Check-ins</p>
          </div>
          {HISTORY.map((item, i) => (
            <div
              key={i}
              className="flex items-center px-5 py-4 transition-colors"
              style={{ borderBottom: i < HISTORY.length - 1 ? `1px solid ${CARD_EL}` : 'none' }}
            >
              <div
                className="size-9 rounded-full flex items-center justify-center shrink-0 mr-3 border border-black/5"
                style={{ background: CARD }}
              >
                <Calendar size={14} className="text-[#474747]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-poppins text-[#0a0a0a] text-[15px] font-light">{item.week}</p>
                <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider">{item.type} Check-in</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden font-poppins text-[#474747] text-[11px] font-medium">Str: {item.stress} · Enr: {item.energy}</span>
                <span
                  className="font-poppins text-[22px] font-light"
                  style={{ color: STATUS_COLOR[item.status] }}
                >
                  {item.score}
                </span>
                <ChevronRight size={14} className="text-[#474747]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}