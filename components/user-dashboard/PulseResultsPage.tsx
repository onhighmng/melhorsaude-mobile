// DISABLED: import from 'motion/react';
import { ArrowLeft, AlertCircle, CheckCircle2, AlertTriangle, MessageSquare, ArrowRight, BarChart2, TrendingUp } from 'lucide-react';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface PulseResultsPageProps {
  score: number;
  onBack: () => void;
  onAction: (action: string) => void;
}

function getRiskLevel(s: number) {
  if (s <= 30) return {
    label: 'Risco Baixo',
    accent: '#34D399',
    icon: CheckCircle2,
    msg: 'Estás bem esta semana.',
    sub: 'Continua assim. O sistema continua a monitorizar os teus sinais.',
    action: 'Ver o meu progresso',
  };
  if (s <= 60) return {
    label: 'Atenção Detetada',
    accent: '#FBBF24',
    icon: AlertTriangle,
    msg: 'Detetámos alguns sinais.',
    sub: 'Ainda é pequeno — o momento certo para agir e prevenir o desgaste.',
    action: 'Ver exercício de 2 min',
  };
  return {
    label: 'Risco Elevado',
    accent: '#F87171',
    icon: AlertCircle,
    msg: 'Sinais de sobrecarga detetados.',
    sub: 'O sistema recomenda apoio especializado agora para evitar um burnout.',
    action: 'Falar com especialista',
  };
}

export function PulseResultsPage({ score, onBack, onAction }: PulseResultsPageProps) {
  const risk       = getRiskLevel(score);
  const RiskIcon   = risk.icon;
  const circumference = 2 * Math.PI * 72;
  const offset     = circumference - (circumference * score) / 100;

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
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Resultado Pulse</h1>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-4">

        {/* Score ring card */}
        <div


          className="rounded-[28px] p-6 flex flex-col items-center shadow-sm bg-white"
          style={{ border: `1px solid ${risk.accent}` }}
        >
          <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-5">Score desta semana</p>

          {/* Ring */}
          <div className="relative mb-5">
            <svg width="168" height="168" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="84" cy="84" r="72" stroke={CARD_EL} strokeWidth="12" fill="none" />
              <circle
                cx="84" cy="84" r="72"
                stroke={risk.accent}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}



              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-poppins text-[48px] font-light text-[#0a0a0a] leading-none">{score}</span>
              <span className="font-poppins text-[#474747] text-[12px] font-bold uppercase tracking-wider mt-1">de 100</span>
            </div>
          </div>

          {/* Risk badge */}
          <div
            className="px-5 py-2 rounded-full font-poppins text-[13px] font-bold mb-5 shadow-sm"
            style={{ background: `${risk.accent}15`, color: risk.accent, border: `1px solid ${risk.accent}30` }}
          >
            {risk.label}
          </div>

          {/* Summary */}
          <div className="w-full rounded-[28px] p-4 shadow-sm bg-white" style={{ border: `1px solid ${risk.accent}` }}>
            <div className="flex items-start gap-3 mb-3">
              <RiskIcon size={18} style={{ color: risk.accent }} className="shrink-0 mt-0.5" />
              <p className="font-poppins text-[#0a0a0a] text-[16px] font-light leading-snug">{risk.msg}</p>
            </div>
            <p className="font-poppins text-[#474747] text-[13px] leading-relaxed pl-7">{risk.sub}</p>
            <button
              onClick={() => onAction(risk.action)}
              className="mt-4 w-full py-3.5 rounded-full font-poppins font-bold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
              style={{ background: risk.accent, color: '#ffffff' }}
            >
              {risk.action} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Urgent specialist card — only for high risk */}
        {score >= 61 && (
          <div



            className="rounded-[28px] p-5 relative overflow-hidden shadow-sm bg-white"
            style={{ border: '1px solid #F87171' }}
          >
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
              <AlertCircle size={100} color="#F87171" />
            </div>
            <p className="font-poppins text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#F87171' }}>
              Trigger Inteligente Ativado ⚠️
            </p>
            <p className="font-poppins text-[#0a0a0a] text-[20px] font-light leading-snug mb-2 tracking-wide">Gostarias de falar com alguém agora?</p>
            <p className="font-poppins text-[#474747] text-[13px] leading-relaxed mb-4">
              Temos especialistas disponíveis neste momento para uma conversa privada.
            </p>
            <div
              className="flex items-center gap-3 p-3.5 rounded-full mb-4 shadow-sm bg-[#f2f1ef]"
              style={{ border: `1px solid ${CARD_EL}` }}
            >
              <div
                className="size-12 rounded-full flex items-center justify-center font-poppins font-black text-[18px] text-white shrink-0 shadow-sm"
                style={{ background: '#F87171' }}
              >
                AM
              </div>
              <div className="flex-1">
                <p className="font-poppins text-[#0a0a0a] text-[15px] font-light">Dra. Ana Martins</p>
                <p className="font-poppins text-[#474747] text-[11px] mt-0.5">Psicóloga Clínica</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-poppins text-[#474747] text-[10px]">Online</span>
              </div>
            </div>
            <button className="w-full py-4 rounded-full font-poppins font-bold text-[14px] active:scale-[0.98] transition-transform shadow-sm"
              style={{ background: '#F87171', color: '#fff' }}>
              Falar com especialista
            </button>
          </div>
        )}

        {/* System insights */}
        <div



          className="rounded-[28px] p-5 shadow-sm bg-white"
          style={{ border: `1px solid ${CARD_EL}` }}
        >
          <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-4">Insights do Sistema</p>
          <div className="flex flex-col gap-4">
            {[
              { Icon: BarChart2, accent: '#1565C0', title: 'Tendência de Stress', body: 'O teu stress subiu 15% em relação à semana passada. Recomenda-se pausa ativa.' },
              { Icon: MessageSquare, accent: '#34D399', title: 'Sugestão de Diálogo', body: 'Queres registar o que causou esta alteração? Ajuda o sistema a ser mais preciso.' },
              { Icon: TrendingUp, accent: '#FBBF24', title: 'Padrão Detetado', body: 'Sextas-feiras tendem a ser os teus dias com maior carga. Planeia uma pausa ativa.' },
            ].map(({ Icon, accent, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className="size-9 rounded-full flex items-center justify-center shrink-0 border border-black/5"
                  style={{ background: `${accent}15` }}
                >
                  <Icon size={15} style={{ color: accent }} />
                </div>
                <div>
                  <p className="font-poppins text-[#0a0a0a] text-[15px] font-light">{title}</p>
                  <p className="font-poppins text-[#474747] text-[12px] leading-relaxed mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 px-4 py-2.5 rounded-full text-center bg-[#f2f1ef]"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <p className="font-poppins text-[#474747] text-[11px] font-medium italic">Insights baseados em 6 semanas de dados</p>
          </div>
        </div>
      </div>
    </div>
  );
}