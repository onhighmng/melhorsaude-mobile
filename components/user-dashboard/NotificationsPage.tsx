import { useState } from 'react';
import { ArrowLeft, Bell, Calendar, Brain, Activity, Wallet, Scale, Zap, AlertTriangle, CheckCircle2, X } from 'lucide-react';
// DISABLED: import from 'motion/react';

const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

type NotifType = 'session' | 'insight' | 'alert' | 'achievement';

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  accent: string;
  pillar?: string;
}

const INITIAL_NOTIFS: Notification[] = [
  {
    id: 1,
    type: 'session',
    title: 'Sessão amanhã às 10:00',
    body: 'Tens uma videochamada com Dr. João Silva — Saúde Mental.',
    time: 'Agora',
    read: false,
    accent: '#1565C0',
    pillar: 'mental',
  },
  {
    id: 2,
    type: 'insight',
    title: 'Pulse semanal disponível',
    body: 'O teu relatório de bem-estar desta semana está pronto.',
    time: '2h atrás',
    read: false,
    accent: '#FBBF24',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Meta atingida!',
    body: 'Registaste o teu humor 7 dias consecutivos. Continua assim!',
    time: '5h atrás',
    read: false,
    accent: '#34D399',
  },
  {
    id: 4,
    type: 'session',
    title: 'Sessão confirmada',
    body: 'A tua sessão de Bem-estar Físico com Dra. Ana Costa foi confirmada para 10 Maio.',
    time: 'Ontem',
    read: true,
    accent: '#FB923C',
    pillar: 'fisico',
  },
  {
    id: 5,
    type: 'alert',
    title: 'Lembrete: Questionário pendente',
    body: 'Não te esqueças de completar o questionário de Assistência Jurídica.',
    time: 'Ontem',
    read: true,
    accent: '#F472B6',
    pillar: 'juridica',
  },
  {
    id: 6,
    type: 'insight',
    title: 'Dica de bem-estar',
    body: 'Uma caminhada de 20 min melhora o humor em até 40%. Experimenta hoje!',
    time: '2 dias atrás',
    read: true,
    accent: '#FB923C',
  },
  {
    id: 7,
    type: 'session',
    title: 'Sessão concluída',
    body: 'A tua sessão de Assistência Financeira foi concluída. Avalia a tua experiência.',
    time: '3 dias atrás',
    read: true,
    accent: '#34D399',
    pillar: 'financeira',
  },
  {
    id: 8,
    type: 'achievement',
    title: 'Novo recurso adicionado',
    body: '"Técnicas de Respiração para Ansiedade" foi adicionado à tua biblioteca.',
    time: '5 dias atrás',
    read: true,
    accent: '#1565C0',
  },
];

const PILLAR_ICONS = {
  mental:     Brain,
  fisico:     Activity,
  financeira: Wallet,
  juridica:   Scale,
};

const TYPE_ICONS = {
  session:     Calendar,
  insight:     Zap,
  alert:       AlertTriangle,
  achievement: CheckCircle2,
};

interface NotificationsPageProps {
  onBack?: () => void;
  setActiveTab?: (tab: string) => void;
  setPulseFocus?: (focus: 'energy' | 'stress' | 'humor' | 'pulse' | undefined) => void;
}

function NotifCard({
  notif,
  onRead,
  onDismiss,
}: {
  notif: Notification;
  onRead: (id: number) => void;
  onDismiss: (id: number) => void;
}) {
  const TypeIcon   = TYPE_ICONS[notif.type];
  const PillarIcon = notif.pillar ? PILLAR_ICONS[notif.pillar as keyof typeof PILLAR_ICONS] : null;

  return (
    <div
      layout



      onClick={() => onRead(notif.id)}
      className="relative flex items-start gap-3 px-4 py-4 rounded-[28px] cursor-pointer active:scale-[0.99] transition-transform shadow-sm bg-white"
      style={{
        border: `1px solid ${notif.read ? CARD_EL : notif.accent}`,
        background: notif.read ? '#ffffff' : `${notif.accent}0a`,
      }}
    >
      {/* Unread dot */}
      {!notif.read && (
        <div
          className="absolute top-4 right-4 size-2 rounded-full"
          style={{ background: notif.accent }}
        />
      )}

      {/* Icon badge */}
      <div
        className="size-11 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-black/5"
        style={{ background: `${notif.accent}15` }}
      >
        {PillarIcon
          ? <PillarIcon size={18} style={{ color: notif.accent }} />
          : <TypeIcon   size={18} style={{ color: notif.accent }} />
        }
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-5">
        <p className="font-poppins text-[#0a0a0a] text-[15px] font-light leading-snug">{notif.title}</p>
        <p className="font-poppins text-[#474747] text-[12px] leading-snug mt-0.5">{notif.body}</p>
        <p className="font-poppins text-[#474747] text-[10px] font-medium mt-2">{notif.time}</p>
      </div>

      {/* Dismiss */}
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(notif.id); }}
        className="absolute top-3 right-3 size-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
        style={{ background: CARD_EL }}
      >
        <X size={11} className="text-[#474747]" />
      </button>
    </div>
  );
}

export function NotificationsPage({ onBack, setActiveTab, setPulseFocus }: NotificationsPageProps) {
  const handleBack = onBack ?? (() => setActiveTab?.('bem-estar'));
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifs.filter((n) => !n.read).length;

  const handleRead = (notif: Notification) => {
    setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n));
    
    // Logic to navigate if it's a pulse-related notification
    if (notif.title.toLowerCase().includes('pulse') || notif.title.toLowerCase().includes('humor')) {
      if (notif.title.toLowerCase().includes('humor')) setPulseFocus?.('humor');
      else setPulseFocus?.('pulse');
      setActiveTab?.('pulse-results');
    }
  };

  const handleDismiss = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const displayed = filter === 'unread' ? notifs.filter((n) => !n.read) : notifs;

  const groups: { label: string; items: Notification[] }[] = [
    { label: 'Novas',      items: displayed.filter((n) => !n.read) },
    { label: 'Anteriores', items: displayed.filter((n) => n.read) },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen pb-32">

      {/* Header */}
      <div
        className="sticky top-0 z-20 px-5 pt-12 pb-4"
        style={{ background: `transparent`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="size-9 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white shadow-sm"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <ArrowLeft size={17} className="text-[#0a0a0a]" />
          </button>
          <div className="flex-1">
            <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Centro</p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[24px] font-light tracking-wide">Notificações</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="font-poppins text-[12px] font-semibold px-3 py-1.5 rounded-[4px] active:scale-90 transition-transform"
              style={{ background: '#1565C0', color: '#ffffff', border: '1px solid #1565C0' }}
            >
              Ler tudo
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {([
            { id: 'all'    as const, label: 'Todas' },
            { id: 'unread' as const, label: `Não lidas ${unreadCount > 0 ? `(${unreadCount})` : ''}` },
          ]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-4 py-2 rounded-full font-poppins text-[12px] font-bold transition-all active:scale-95 shadow-sm"
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
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="size-16 rounded-[28px] flex items-center justify-center mb-4 bg-white shadow-sm"
              style={{ border: `1px solid ${CARD_EL}` }}
            >
              <Bell size={24} className="text-[#474747]" />
            </div>
            <p className="font-poppins text-[#0a0a0a] text-[18px] font-light">
              {filter === 'unread' ? 'Tudo lido!' : 'Sem notificações'}
            </p>
            <p className="font-poppins text-[#474747] text-[14px] mt-1">
              {filter === 'unread' ? 'Estás em dia com tudo.' : 'Voltamos em breve.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
              {groups.map((group) => (
                <div key={group.label} layout>
                  <p className="font-poppins text-[#474747] text-[11px] font-semibold uppercase tracking-wider mb-3">
                    {group.label}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    
                      {group.items.map((notif) => (
                        <NotifCard
                          key={notif.id}
                          notif={notif}
                          onRead={() => handleRead(notif)}
                          onDismiss={handleDismiss}
                        />
                      ))}
                    
                  </div>
                </div>
              ))}
            
          </div>
        )}
      </div>
    </div>
  );
}