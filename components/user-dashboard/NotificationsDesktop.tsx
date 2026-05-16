import { useState } from 'react';
import { ArrowLeft, Bell, Zap, BarChart2, AlertTriangle, Calendar, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NotificationsDesktopProps {
  setActiveTab: (tab: string) => void;
  setPulseFocus?: (focus: 'energy' | 'stress' | 'humor' | 'pulse' | undefined) => void;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type LayerKey = 'layer1' | 'layer2' | 'layer3' | 'layer4';

interface NotificationItem {
  id: string;
  layer: LayerKey;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const LAYER_CONFIG: Record<LayerKey, {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  tagBg: string;
  tagText: string;
  cardBorder: string;
  cardBg: string;
  ruleBg: string;
  ruleBorder: string;
  ruleText: string;
  ctaColor: string;
}> = {
  layer1: {
    label: 'C1',
    sublabel: 'Sinal único',
    icon: <Zap size={13} />,
    tagBg: '#E6F1FB',
    tagText: '#0C447C',
    cardBorder: '#B5D4F4',
    cardBg: '#E6F1FB',
    ruleBg: '#E6F1FB',
    ruleBorder: '#B5D4F4',
    ruleText: '#0C447C',
    ctaColor: '#0046a2',
  },
  layer2: {
    label: 'C2',
    sublabel: 'Padrão recorrente',
    icon: <BarChart2 size={13} />,
    tagBg: '#FFF3E0',
    tagText: '#7C4A00',
    cardBorder: '#FFD08A',
    cardBg: '#FFF8ED',
    ruleBg: '#FFF8ED',
    ruleBorder: '#FFD08A',
    ruleText: '#7C4A00',
    ctaColor: '#FF8C42',
  },
  layer3: {
    label: 'C3',
    sublabel: 'Combinação',
    icon: <AlertTriangle size={13} />,
    tagBg: '#FDECEA',
    tagText: '#791F1F',
    cardBorder: '#F0A8A8',
    cardBg: '#FDF2F2',
    ruleBg: '#FDF2F2',
    ruleBorder: '#F0A8A8',
    ruleText: '#791F1F',
    ctaColor: '#E24B4A',
  },
  layer4: {
    label: 'C4',
    sublabel: 'Antecipação',
    icon: <Calendar size={13} />,
    tagBg: '#E1F5EE',
    tagText: '#085041',
    cardBorder: '#9DDCC6',
    cardBg: '#F0FAF6',
    ruleBg: '#F0FAF6',
    ruleBorder: '#9DDCC6',
    ruleText: '#085041',
    ctaColor: '#1D9E75',
  },
};

const DETAIL_DATA: Record<LayerKey, {
  eyebrow: string;
  title: string;
  what: string;
  rule: string;
  action: string;
  cta: string;
  note: string;
}> = {
  layer1: {
    eyebrow: 'Sinal único · Esta semana',
    title: 'Queda de energia detetada',
    what: 'A tua energia caiu de 4 para 1 esta semana. Uma queda de 3 pontos num único indicador ativa resposta imediata.',
    rule: 'queda ≥3 pontos num indicador → notificação no próprio dia',
    action: 'Ainda é pequeno — o momento certo para agir.',
    cta: 'Ver exercício de 2 min',
    note: 'O sistema chegou antes do problema escalar.',
  },
  layer2: {
    eyebrow: 'Padrão recorrente · Semanas 14 e 15',
    title: '2 semanas com stress elevado',
    what: 'Score de stress ≥4 por 2 semanas consecutivas. Individualmente não era crítico. O padrão é o sinal.',
    rule: 'stress ≥4 × 2 semanas → ativar jornada anti-burnout',
    action: 'A jornada "Gestão de Stress" foi ativada automaticamente.',
    cta: 'Ver jornada ativada',
    note: 'Intervenção proativa — antes de se tornar burnout.',
  },
  layer3: {
    eyebrow: 'Combinação · Esta semana',
    title: 'Três sinais em simultâneo',
    what: 'Stress=3 (não crítico) + Energia=2 (atenção) + Motivação=2 (atenção). Nenhum sozinho seria grave. Juntos formam padrão de risco elevado.',
    rule: 'stress ≥3 AND energia ≤2 AND motivação ≤2 → alerta combinado',
    action: 'Score combinado: 50 → Atenção. O sistema recomenda apoio.',
    cta: 'Falar com especialista',
    note: 'Sinais fracos que juntos são fortes.',
  },
  layer4: {
    eyebrow: 'Antecipação · Hoje é quarta-feira',
    title: 'Amanhã pode ser difícil',
    what: 'Nas últimas 6 semanas, o teu score às quintas é 40% mais alto do que a média. O sistema age hoje — um dia antes do padrão acontecer.',
    rule: 'score médio de dia X > 50% da média geral → notificação no dia anterior',
    action: 'Amanhã pode ser mais pesado. Queres preparar-te hoje?',
    cta: 'Preparar para amanhã',
    note: 'O único sistema que age antes do evento — não depois.',
  },
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    layer: 'layer4',
    title: 'Amanhã pode ser difícil',
    body: 'As tuas quintas têm padrão negativo. O sistema age hoje.',
    time: 'Agora',
    read: false,
  },
  {
    id: 'n2',
    layer: 'layer3',
    title: 'Três sinais em simultâneo',
    body: 'Stress + energia + motivação em simultâneo. Risco emergente.',
    time: '18:30',
    read: false,
  },
  {
    id: 'n3',
    layer: 'layer2',
    title: '2 semanas com stress elevado',
    body: 'Stress elevado pela 2ª semana. O sistema age antes de escalar.',
    time: '09:00',
    read: true,
  },
  {
    id: 'n4',
    layer: 'layer1',
    title: 'Queda de energia detetada',
    body: 'A tua energia caiu 3 pontos esta semana. Ainda é pequeno.',
    time: 'Ontem',
    read: true,
  },
];

export function NotificationsDesktop({ setActiveTab, setPulseFocus }: NotificationsDesktopProps) {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_NOTIFICATIONS[0].id);

  const selectedNotif = notifications.find(n => n.id === selectedId) || notifications[0];
  const cfg = LAYER_CONFIG[selectedNotif.layer];
  const data = DETAIL_DATA[selectedNotif.layer];

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col h-full bg-transparent px-[120px] py-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="font-pacifico text-[42px] text-[#1a1a1a] tracking-tight mb-1">
            Notificações
          </h1>
          <p className="font-plus-jakarta text-[17px] text-[#474747] opacity-70">
            Acompanhe os sinais e alertas do seu sistema de bem-estar
          </p>
        </div>
        <button 
          onClick={markAllRead}
          className="bg-white/60 hover:bg-white px-8 py-3 rounded-full text-[14px] font-plus-jakarta font-bold text-[#0046a2] transition-all shadow-sm border border-gray-100"
        >
          Marcar tudo como lido
        </button>
      </div>

      {/* Main Content: Split View */}
      <div className="flex gap-8 h-[calc(100vh-280px)]">
        {/* Left: List */}
        <div className="w-[400px] flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {notifications.map((n) => {
            const nCfg = LAYER_CONFIG[n.layer];
            const isActive = selectedId === n.id;
            
            return (
              <button
                key={n.id}
                onClick={() => setSelectedId(n.id)}
                className={`w-full text-left bg-white rounded-[24px] p-5 border-2 transition-all hover:shadow-lg ${
                  isActive ? 'border-[#007AFF] shadow-md scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span 
                    style={{ background: nCfg.tagBg, color: nCfg.tagText }}
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    {nCfg.icon} {nCfg.label} · {nCfg.sublabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                    {!n.read && <div className="size-2 bg-[#007AFF] rounded-full" />}
                  </div>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[15px] text-[#1a1a1a] mb-1">
                  {n.title}
                </h3>
                <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed">
                  {n.body}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Detail View */}
        <div className="flex-1 bg-white rounded-[32px] shadow-xl border border-white/50 overflow-hidden flex flex-col">
          <div className="p-10 flex-1 overflow-y-auto">
            <div className="mb-8">
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-[0.1em] mb-2">
                {data.eyebrow}
              </p>
              <h2 className="font-pacifico text-[42px] text-[#1a1a1a] leading-tight">
                {data.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* What was detected */}
              <div>
                <h4 className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                  O que o sistema detetou
                </h4>
                <p className="text-[16px] text-gray-700 leading-relaxed mb-6 max-w-[600px]">
                  {data.what}
                </p>
                <div 
                  className="inline-block rounded-[20px] p-6 min-w-[400px]"
                  style={{ background: cfg.ruleBg, border: `1px solid ${cfg.ruleBorder}` }}
                >
                  <p className="text-[12px] font-bold mb-3" style={{ color: cfg.ruleText }}>Regra Ativada</p>
                  <code className="text-[13px] font-mono opacity-80" style={{ color: cfg.ruleText }}>{data.rule}</code>
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                  Ação Recomendada
                </h4>
                <p className="text-[16px] text-gray-700 leading-relaxed mb-8 max-w-[600px]">
                  {data.action}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (selectedNotif.layer === 'layer1') setPulseFocus?.('energy');
                      if (selectedNotif.layer === 'layer2') setPulseFocus?.('stress');
                      if (selectedNotif.layer === 'layer3') setPulseFocus?.('pulse');
                      if (selectedNotif.layer === 'layer4') setPulseFocus?.('pulse');
                      setActiveTab('pulse-results');
                    }}
                    style={{ background: cfg.ctaColor }}
                    className="px-12 py-5 rounded-3xl text-white font-plus-jakarta font-bold text-[17px] shadow-2xl hover:scale-105 transition-all active:scale-95"
                  >
                    {data.cta} →
                  </button>
                  {!selectedNotif.read && (
                    <button 
                      onClick={() => markRead(selectedId)}
                      className="flex items-center gap-2 px-8 py-5 rounded-3xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors font-plus-jakarta font-bold text-[15px]"
                    >
                      <Check size={20} />
                      Marcar como lida
                    </button>
                  )}
                </div>
                <p className="text-[12px] text-gray-400 italic mt-6">
                  {data.note}
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer Decor */}
          <div className="h-2 w-full" style={{ background: cfg.ctaColor }} />
        </div>
      </div>
    </div>
  );
}