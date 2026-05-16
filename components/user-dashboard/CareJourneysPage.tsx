import { useState } from 'react';
// DISABLED: import from 'motion/react';
import { ArrowLeft, Brain, Wallet, Zap, CheckCircle2, PlayCircle, FileText, ChevronRight, Info } from 'lucide-react';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface CareJourneysPageProps {
  onBack: () => void;
  setActiveTab: (tab: string) => void;
}

interface JourneyStep {
  label: string;
  done: boolean;
  today?: boolean;
}

interface JourneyContent {
  title: string;
  type: 'video' | 'pdf';
  duration?: string;
}

interface Journey {
  id: string;
  name: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  accent: string;
  duration: string;
  why: string;
  rule: string;
  steps: JourneyStep[];
  content: JourneyContent[];
}

const JOURNEYS: Journey[] = [
  {
    id: 'stress',
    name: 'Gestão de Stress / Burnout',
    Icon: Brain,
    accent: '#1565C0',
    duration: '3 semanas',
    why: '2 semanas consecutivas com stress ≥4 ativaram este programa automaticamente.',
    rule: 'Regra: stress alto × 2 semanas → Care Journey',
    steps: [
      { label: 'Dia 1: Exercício de respiração',    done: true },
      { label: 'Dia 2: Pausa ativa guiada',          done: true },
      { label: 'Dia 3: Técnica de sono regenerador', done: false, today: true },
      { label: 'Dia 4: Reflexão sobre limites',      done: false },
      { label: 'Dia 5: Check-in específico',         done: false },
    ],
    content: [
      { title: 'Técnicas de respiração para stress', type: 'video', duration: '6 min' },
      { title: 'Guia de higiene do sono',             type: 'pdf' },
    ],
  },
  {
    id: 'financial',
    name: 'Pressão Financeira',
    Icon: Wallet,
    accent: '#34D399',
    duration: '4 semanas',
    why: 'Score financeiro elevado detetado nas últimas 2 semanas.',
    rule: 'Regra: problema financeiro +10pts × 2 → jornada financeira',
    steps: [
      { label: 'Semana 1: Mapeamento de despesas',      done: true },
      { label: 'Semana 2: Plano de cortes práticos',    done: false, today: true },
      { label: 'Semana 3: Poupança inteligente',        done: false },
      { label: 'Semana 4: Follow-up com consultor',     done: false },
    ],
    content: [
      { title: 'Gerir o stress financeiro',        type: 'video', duration: '4 min' },
      { title: 'Template de orçamento pessoal',    type: 'pdf' },
    ],
  },
];

export function CareJourneysPage({ onBack, setActiveTab }: CareJourneysPageProps) {
  const [selectedId, setSelectedId] = useState(JOURNEYS[0].id);

  const active     = JOURNEYS.find((j) => j.id === selectedId) ?? JOURNEYS[0];
  const doneCount  = active.steps.filter((s) => s.done).length;
  const progressPct = (doneCount / active.steps.length) * 100;

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
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Bem-estar</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">As Tuas Jornadas</h1>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">

        {/* Journey selector — horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none mb-5">
          {JOURNEYS.map((j) => {
            const isActive = selectedId === j.id;
            return (
              <button
                key={j.id}
                onClick={() => setSelectedId(j.id)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[28px] transition-all shrink-0 active:scale-[0.98] shadow-sm"
                style={{
                  background: isActive ? `${j.accent}12` : '#ffffff',
                  border: isActive ? `1.5px solid ${j.accent}` : `1px solid ${CARD_EL}`,
                  minWidth: 220,
                }}
              >
                <div
                  className="size-10 rounded-full flex items-center justify-center shrink-0 border border-black/5"
                  style={{ background: `${j.accent}15` }}
                >
                  <j.Icon size={18} style={{ color: j.accent }} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light truncate">{j.name}</p>
                  <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider mt-0.5">{j.duration}</p>
                </div>
                {isActive && <ChevronRight size={14} style={{ color: j.accent }} className="shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Detail area */}
        
          <div
            key={active.id}




            className="flex flex-col gap-4"
          >

            {/* Why card */}
            <div className="rounded-[28px] p-5 shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="size-8 rounded-full flex items-center justify-center border border-black/5"
                  style={{ background: `${active.accent}15` }}
                >
                  <Info size={14} style={{ color: active.accent }} />
                </div>
                <p className="font-poppins text-[#0a0a0a] text-[16px] font-light">Porquê esta jornada?</p>
              </div>
              <p className="font-poppins text-[#474747] text-[13px] leading-relaxed mb-3">{active.why}</p>
              <div
                className="px-4 py-3 rounded-full bg-[#f2f1ef]"
                style={{ border: `1px solid ${CARD_EL}` }}
              >
                <p className="font-mono text-[11px] leading-relaxed italic" style={{ color: active.accent }}>
                  {active.rule}
                </p>
              </div>
            </div>

            {/* Progress card */}
            <div className="rounded-[28px] p-5 shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-poppins text-[#0a0a0a] text-[16px] font-light">O teu progresso</p>
                <span className="font-poppins font-black text-[20px]" style={{ color: active.accent }}>
                  {Math.round(progressPct)}%
                </span>
              </div>
              <p className="font-poppins text-[#474747] text-[11px] font-semibold mb-3">
                {doneCount} de {active.steps.length} etapas concluídas
              </p>

              {/* Bar */}
              <div className="h-2 rounded-full overflow-hidden mb-5 bg-[#ecece7]">
                <div

                  animate={{ width: `${progressPct}%` }}

                  className="h-full rounded-full"
                  style={{ background: active.accent }}
                />
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-2.5">
                {active.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 rounded-full transition-all shadow-sm"
                    style={{
                      background: step.today ? `${active.accent}08` : '#f2f1ef',
                      border: step.today ? `1px solid ${active.accent}` : `1px solid ${CARD_EL}`,
                    }}
                  >
                    {/* Step indicator */}
                    <div
                      className="size-7 rounded-full flex items-center justify-center shrink-0 transition-all bg-white"
                      style={{
                        border: step.done ? `4px solid ${active.accent}` : step.today ? `2px solid ${active.accent}` : `2px solid ${CARD_EL}`,
                      }}
                    >
                      {step.done
                        ? <CheckCircle2 size={14} color={active.accent} className="absolute" />
                        : <span className="font-poppins text-[11px] font-bold" style={{ color: step.today ? active.accent : '#a3a3a3' }}>{idx + 1}</span>
                      }
                    </div>

                    <span
                      className="font-poppins flex-1 text-[13px] font-semibold"
                      style={{ color: step.done ? '#a3a3a3' : step.today ? '#0a0a0a' : '#474747', textDecoration: step.done ? 'line-through' : 'none' }}
                    >
                      {step.label}
                    </span>

                    {step.today && (
                      <span
                        className="font-poppins text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[4px] shrink-0"
                        style={{ background: active.accent, color: '#ffffff' }}
                      >
                        Hoje
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content card */}
            <div className="rounded-[28px] p-5 shadow-sm bg-white" style={{ border: `1px solid ${CARD_EL}` }}>
              <p className="font-poppins text-[#0a0a0a] text-[16px] font-light mb-3">Conteúdo recomendado</p>
              <div className="flex flex-col gap-2.5">
                {active.content.map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-full text-left active:scale-[0.98] transition-transform shadow-sm bg-[#f2f1ef]"
                    style={{ border: `1px solid ${CARD_EL}` }}
                  >
                    <div
                      className="size-10 rounded-full flex items-center justify-center shrink-0 border border-black/5 bg-white"
                    >
                      {item.type === 'video'
                        ? <PlayCircle size={18} style={{ color: active.accent }} />
                        : <FileText   size={18} style={{ color: active.accent }} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins text-[#0a0a0a] text-[14px] font-light truncate">{item.title}</p>
                      <p className="font-poppins text-[#474747] text-[10px] font-semibold uppercase tracking-wider mt-0.5">
                        {item.type}{item.duration ? ` · ${item.duration}` : ''}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-[#474747] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}