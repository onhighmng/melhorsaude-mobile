import { memo, useState, useEffect } from 'react';
import { Questionnaire } from './Questionnaire';
import { SessionBooking } from './SessionBooking';
import { RequestCallModal } from './RequestCallModal';
import { questionnaireData } from '@/data/questionnaireData';
import { showSuccessToast, showCallToast } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMood } from '@/contexts/MoodContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSpecialists } from '@/hooks/useSpecialists';
import { useBookings } from '@/hooks/useBookings';
// DISABLED: import from 'sonner';
import {
  Bell, Phone, Zap,
  Frown, Meh, Smile, SmilePlus,
  AlertTriangle, TrendingDown, TrendingUp,
} from 'lucide-react';

import moodCardBg from '@assets/e8e2ae6c59942b93027046047aa7be8c33ef123d.png';
import mentalHealthImg from '@assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png';
import physicalWellnessImg from '@assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png';
import financialAssistanceImg from '@assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png';
import legalAssistanceImg from '@assets/897f25666b2976f6467a21346375bb9753e57911.png';
import appLogo from '@assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png';

// ─── Design tokens ─────────────────────────────────────────────────────────────
const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';

// ─── Pillar config ─────────────────────────────────────────────────────────────
const PILLARS = [
  {
    id: 'mental' as const,
    label: 'Saúde Mental',
    sub: 'Psicológico',
    image: mentalHealthImg,
    gradient: 'linear-gradient(180deg, #9dbfd4 0%, rgba(157, 191, 212, 0.3) 100%)'
  },
  {
    id: 'fisico' as const,
    label: 'Bem-estar',
    sub: 'Físico',
    image: physicalWellnessImg,
    gradient: 'linear-gradient(180deg, #fcc066 0%, #f5efe6 100%)'
  },
  {
    id: 'financeira' as const,
    label: 'Assistência',
    sub: 'Financeira',
    image: financialAssistanceImg,
    gradient: 'linear-gradient(180deg, #8bbeb8 0%, rgba(139, 190, 184, 0.3) 100%)'
  },
  {
    id: 'juridica' as const,
    label: 'Assistência',
    sub: 'Jurídica',
    image: legalAssistanceImg,
    gradient: 'linear-gradient(180deg, #d8a4c4 0%, rgba(216, 164, 196, 0.3) 100%)'
  },
] as const;

// ─── Pulse bar ─────────────────────────────────────────────────────────────────
const PulseBar = memo(({ onClick }: { onClick: (focus?: any) => void }) => (
  <button
    className="w-full flex items-center gap-2 mt-2 mb-0 active:scale-[0.98] transition-transform"
  >
    {[
      { Icon: AlertTriangle, color: '#FBBF24', value: '3', label: 'Stress', focus: 'stress' as const },
      { Icon: TrendingDown,  color: '#F87171', value: '2', label: 'Energia', focus: 'energy' as const },
      { Icon: TrendingUp,    color: '#34D399', value: '4', label: 'Humor', focus: 'humor' as const },
    ].map(({ Icon, color, value, label, focus }) => (
      <div
        key={label}
        onClick={(e) => {
          e.stopPropagation();
          onClick(focus);
        }}
        className="flex items-center gap-1 px-2.5 py-2 rounded-full flex-1 min-w-0 shadow-sm transition-all hover:bg-gray-50 cursor-pointer"
        style={{ background: '#ffffff', border: `1px solid ${CARD_EL}` }}
      >
        <Icon size={11} style={{ color }} className="shrink-0" />
        <span className="text-[11px] font-bold text-[#0a0a0a] shrink-0">{value}</span>
        <span className="font-poppins text-[9px] text-[#474747] font-semibold uppercase tracking-tight truncate">{label}</span>
      </div>
    ))}
  </button>
));

// ─── Hero mood card ────────────────────────────────────────────────────────────
const HeroMoodCard = memo(({
  selectedMood,
  onMoodSelect,
  onCallClick,
}: {
  selectedMood: string | null;
  onMoodSelect: (value: string, idx: number) => void;
  onCallClick: () => void;
}) => {
  return (
    <div
      className="relative w-full aspect-[360/245] mt-8 select-none overflow-visible"
      style={{ containerType: 'inline-size' }}
    >
      <div className="absolute h-[84%] left-0 top-0 w-full rounded-[24px] overflow-hidden">
        <img src={moodCardBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute left-[7%] top-[8%] w-[65%] z-20 pointer-events-none">
        <h2
          className="font-semibold text-white leading-[1.05] tracking-tight drop-shadow-md"
          style={{
            fontFamily: 'var(--font-plus-jakarta)',
            fontSize: '7.8cqw',
          }}
        >
          Como estás a sentir-te hoje?
        </h2>
      </div>

      {[
        { id: 'very-sad', emoji: '🙁', bg: '#DBEAFE', left: '26%', top: '32%', idx: 0 },
        { id: 'bad',      emoji: '😡', bg: '#FFE2E2', left: '52%', top: '32%', idx: 1 },
        { id: 'neutral',  emoji: '😐', bg: '#F3F4F6', left: '78%', top: '32%', idx: 2 },
        { id: 'good',     emoji: '😊', bg: '#FEF9C2', left: '52%', top: '62%', idx: 3 },
        { id: 'great',    emoji: '😃', bg: '#FFF085', left: '78%', top: '62%', idx: 4 },
      ].map((m) => (
        <button
          key={m.id}
          onClick={() => onMoodSelect(m.id, m.idx)}
          className={`absolute h-[21%] w-[16%] rounded-full flex items-center justify-center transition-all active:scale-90 ${selectedMood === m.id ? 'ring-2 ring-[#1565C0] scale-110 shadow-lg' : 'shadow-sm'}`}
          style={{ background: m.bg, left: m.left, top: m.top }}
        >
          <span style={{ fontSize: '6cqw' }}>{m.emoji}</span>
        </button>
      ))}

      <button
        onClick={onCallClick}
        className="absolute bg-[#0046a2] h-[34%] left-[-1%] top-[60%] w-[38%] rounded-[32px] flex items-center justify-center active:scale-95 transition-all shadow-xl z-20"
      >
        <div className="relative aspect-square h-[72%] bg-white rounded-full flex items-center justify-center shadow-inner">
          <Phone className="text-[#0046a2] w-[45%] h-[45%]" fill="currentColor" />
          <div className="absolute -top-[5%] -right-[15%] bg-[#10B981] h-[35%] min-w-[75%] px-1.5 rounded-full flex items-center justify-center border border-white/20">
            <span className="text-white font-bold leading-none" style={{ fontSize: '2.8cqw' }}>24/7</span>
          </div>
        </div>
      </button>
    </div>
  );
});

const FeaturedResourceCard = memo(({ onClick }: { onClick: () => void }) => {
  const [resource, setResource] = useState<{ title: string; thumbnail_url: string | null } | null>(null);

  useEffect(() => {
    import('@/lib/supabase').then(({ supabase }) => {
      supabase
        .from('resources')
        .select('title_pt, thumbnail_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
        .then(({ data }) => {
          if (data) setResource({ title: data.title_pt, thumbnail_url: data.thumbnail_url });
        });
    });
  }, []);

  const fallbackImg = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop';

  return (
    <div
      onClick={onClick}
      className="featured-card relative w-full rounded-[28px] overflow-hidden mt-4 mb-0 shadow-md cursor-pointer group h-[220px]"
    >
      <img
        src={resource?.thumbnail_url || fallbackImg}
        alt="Recurso em Destaque"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = fallbackImg; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <div className="bg-[#1565C0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2 uppercase tracking-wider">
          Recurso em Destaque
        </div>
        {resource && (
          <h2 className="font-poppins text-white text-[20px] font-semibold leading-tight line-clamp-2">
            {resource.title}
          </h2>
        )}
      </div>
    </div>
  );
});

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-[12px] mb-4 mt-8">
      <p className="font-poppins text-[#1565C0] text-[24px] font-semibold leading-[28px] tracking-tight">
        {title}
      </p>
    </div>
  );
}

const PillarGrid = memo(({ onCardClick }: { onCardClick: (id: string) => void }) => (
  <div className="mt-0">
    <SectionHeader tag="Pilares" title="O teu apoio" />
    <div className="grid grid-cols-2 gap-4 mt-4">
      {PILLARS.map((pillar, i) => (
        <button
          key={pillar.id}
          onClick={() => onCardClick(pillar.id)}
          className="pillar-card relative h-[220px] rounded-[32px] overflow-hidden text-left active:scale-95 transition-transform flex flex-col p-6 shadow-sm border border-black/5"
          style={{ background: pillar.gradient }}
        >
          <div className="flex flex-col gap-0.5 w-full mb-2">
            <p className="font-poppins text-[#0a0a0a] text-[18px] font-bold leading-tight tracking-tight">{pillar.label}</p>
            <p className="font-poppins font-medium text-[#474747] text-[13px] opacity-80 leading-tight">
              {pillar.sub}
            </p>
          </div>

          <div className="w-full flex-1 flex items-end justify-center mt-2">
            <img
              src={pillar.image}
              alt={pillar.label}
              className="w-full h-full object-contain object-bottom transition-transform group-hover:scale-105 duration-500"
            />
          </div>
        </button>
      ))}
    </div>

    <p className="font-poppins text-[14px] text-[#474747] mt-8 text-center leading-snug">
      Cuidar das pessoas, transforma empresas
    </p>
  </div>
));

const PulseCTA = memo(({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="mt-5 mb-6 w-full rounded-[28px] p-6 text-left relative overflow-hidden group active:scale-[0.98] transition-transform shadow-sm"
    style={{ background: CARD, border: `1px solid ${CARD_EL}` }}
  >
    <div
      className="absolute -right-6 -top-6 size-28 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
      style={{ background: '#1565C0' }}
    />
    <div className="relative z-10 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <span
          className="font-poppins inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-[4px] mb-3"
          style={{ background: '#ecece7', color: '#0a0a0a' }}
        >
          Pulse Semanal
        </span>
        <p className="font-poppins text-[#0a0a0a] text-[20px] leading-tight tracking-wide">
          Pronto para o teu check-in de 20s?
        </p>
        <p className="font-poppins font-medium text-[13px] text-[#474747] mt-1.5 underline decoration-solid decoration-[#474747] underline-offset-2">
          Ver detalhes do teu bem-estar
        </p>
      </div>
      <div
        className="size-12 rounded-[28px] bg-white flex items-center justify-center shadow-sm shrink-0 border border-black/5"
      >
        <Zap size={20} className="text-[#1565C0]" />
      </div>
    </div>
  </button>
));

interface BemEstarContentProps {
  setActiveTab: (tab: string) => void;
  setIsQuestionnaireActive: (active: boolean) => void;
  initialPillar?: 'mental' | 'fisico' | 'financeira' | 'juridica' | null;
  skipToBooking?: boolean;
  rescheduleSessionId?: string | null;
  onBookingComplete?: () => void;
  setPulseFocus?: (focus: 'energy' | 'stress' | 'humor' | 'pulse' | undefined) => void;
}

export function BemEstarContent({
  setActiveTab,
  setIsQuestionnaireActive,
  initialPillar,
  skipToBooking,
  rescheduleSessionId,
  onBookingComplete,
  setPulseFocus,
}: BemEstarContentProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(initialPillar || null);
  const [showBooking, setShowBooking] = useState(skipToBooking || false);
  const [showRequestCallModal, setShowRequestCallModal] = useState(false);
  const [isRequestingCall, setIsRequestingCall] = useState(false);

  const { addMoodEntry, moodHistory } = useMood();
  const { t } = useLanguage();
  const { profile, user } = useAuth();
  const { specialists } = useSpecialists();
  const { createBooking, rescheduleBooking } = useBookings();

  // Initialize selectedMood from history for today
  useEffect(() => {
    if (moodHistory.length > 0) {
      const today = new Date();
      const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
      const todayEntry = moodHistory.find(entry => entry.date === todayStr);
      if (todayEntry) {
        const indexToMood: Record<number, string> = {
          0: 'very-sad', 1: 'bad', 2: 'neutral', 3: 'good', 4: 'great'
        };
        setSelectedMood(indexToMood[todayEntry.selectedMoodIndex] || null);
      }
    }
  }, [moodHistory]);

  const handleMoodSelect = (value: string, idx: number) => {
    setSelectedMood(value);
    addMoodEntry(idx);
    showSuccessToast('Humor registado!', 'O teu humor foi guardado com sucesso.', { duration: 3000 });
  };

  const getSpecialistForPillar = (pillar: string) => {
    if (!specialists.length) return null;
    const normalized = pillar.toLowerCase();
    let targetPillarCode = '';
    if (normalized.includes('mental')) targetPillarCode = 'mental';
    else if (normalized.includes('físic') || normalized.includes('fisico')) targetPillarCode = 'fisico';
    else if (normalized.includes('financ')) targetPillarCode = 'financeira';
    else if (normalized.includes('juríd') || normalized.includes('legal')) targetPillarCode = 'juridica';

    const matches = specialists.filter(s =>
      s.is_active !== false &&
      s.specialist_pillars?.some((sp: any) => sp.pillar_code === targetPillarCode || sp.pillar_code === pillar)
    );

    if (matches.length > 0) {
      const shuffled = [...matches].sort(() => Math.random() - 0.5);
      const sorted = shuffled.sort((a: any, b: any) => {
        const timeA = a.last_assigned_at ? new Date(a.last_assigned_at).getTime() : 0;
        const timeB = b.last_assigned_at ? new Date(b.last_assigned_at).getTime() : 0;
        return timeA - timeB;
      });
      return sorted[0];
    }
    return null;
  };

  const assignedSpecialist = activePillar ? getSpecialistForPillar(activePillar) : null;
  const validSpecialistId = assignedSpecialist?.id || '00000000-0000-0000-0000-000000000000';
  const validSpecialistName = assignedSpecialist?.profile?.full_name || 'Especialista da Rede';

  const handleUrgentCallRequest = async () => {
    setIsRequestingCall(true);
    try {
      const now = new Date();
      const bookingDate = now.toISOString().split('T')[0];
      const startTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const result = await createBooking({
        specialist_id: null,
        booking_date: bookingDate,
        start_time: startTime,
        meeting_type: 'voice',
        primary_pillar: 'mental',
        metadata: {
          request_type: 'urgent_call',
          notes: 'Pedido de suporte imediato via dashboard (Suporte 24/7)'
        }
      });

      if (result.success) {
        setShowRequestCallModal(false);
        showSuccessToast('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
      } else {
        toast.error(result.error || 'Erro ao solicitar chamada.');
      }
    } catch (error) {
      console.error('Error requesting urgent call:', error);
      toast.error('Ocorreu um erro ao processar o seu pedido.');
    } finally {
      setIsRequestingCall(false);
    }
  };

  useEffect(() => {
    if (initialPillar) setActivePillar(initialPillar);
    if (skipToBooking) {
      setShowBooking(true);
      setIsQuestionnaireActive(true);
    }
  }, [initialPillar, skipToBooking, setIsQuestionnaireActive]);

  useEffect(() => {
    setIsQuestionnaireActive(
      (activePillar !== null && !!questionnaireData[activePillar]) || showBooking,
    );
  }, [activePillar, showBooking, setIsQuestionnaireActive]);

  const rawName = profile?.full_name || user?.user_metadata?.full_name || '';
  const firstName = rawName ? rawName.split(' ')[0] : 'Visitante';

  const getGreetingKey = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'bemEstar.greeting.morning';
    if (hour < 18) return 'bemEstar.greeting.afternoon';
    return 'bemEstar.greeting.evening';
  };

  if (activePillar && questionnaireData[activePillar] && !showBooking) {
    const pillarData = questionnaireData[activePillar];
    return (
      <Questionnaire
        pillarId={activePillar as any}
        questions={pillarData.questions as any}
        onBack={() => {
          setActivePillar(null);
          setIsQuestionnaireActive(false);
        }}
        onComplete={() => setShowBooking(true)}
      />
    );
  }

  if (activePillar && showBooking) {
    const pillarData = questionnaireData[activePillar];
    return (
      <SessionBooking
        pillarId={activePillar as any}
        specialistName={validSpecialistName}
        specialistId={validSpecialistId}
        onBack={() => setShowBooking(false)}
        onConfirm={async (bookingDetails) => {
          const toastId = toast.loading(rescheduleSessionId ? 'Reagendando sessão...' : 'Agendando sessão...');
          let result;
          if (rescheduleSessionId) {
            result = await rescheduleBooking(
              rescheduleSessionId,
              bookingDetails.date,
              bookingDetails.time,
              bookingDetails.sessionType,
              validSpecialistId,
              activePillar || 'geral'
            );
          } else {
            result = await createBooking({
              specialist_id: validSpecialistId,
              booking_date: bookingDetails.date,
              start_time: bookingDetails.time,
              meeting_type: bookingDetails.sessionType,
              primary_pillar: activePillar || 'geral',
            });
          }
          toast.dismiss(toastId);
          if (result.success) {
            setShowBooking(false);
            setActivePillar(null);
            setIsQuestionnaireActive(false);
            setActiveTab('meu-espaco');
            showSuccessToast(
              rescheduleSessionId ? 'Reagendamento confirmado!' : 'Marcação confirmada!',
              rescheduleSessionId ? 'A sua sessão foi reagendada com sucesso.' : 'A sua sessão foi agendada com sucesso. Consulte os detalhes em Meu Espaço.',
              { duration: 5000 }
            );
            if (onBookingComplete) onBookingComplete();
          } else {
            toast.error(result.error || 'Erro ao criar agendamento.');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-32" style={{ background: 'transparent' }}>
      <div className="px-5 pt-6 max-w-[430px] mx-auto flex flex-col">
        <div className="flex justify-center mb-6">
          <img src={appLogo} alt="Logo" className="h-14 w-auto object-contain" />
        </div>

        <div className="flex justify-between items-center mb-1 mt-2">
          <div>
            <p className="font-poppins text-[#474747] text-[14px] font-normal mb-1">
              {t(getGreetingKey(), 'Olá')},
            </p>
            <h1 className="font-pacifico text-[#0a0a0a] text-[32px] leading-none tracking-wide">
              {firstName} <span className="inline-block ml-1">👋</span>
            </h1>
          </div>
          <button
            onClick={() => setActiveTab('notifications')}
            className="size-12 rounded-[28px] flex items-center justify-center active:scale-90 transition-transform bg-[#f2f1ef] shadow-sm"
            style={{ border: `1px solid ${CARD_EL}` }}
          >
            <Bell size={22} className="text-[#474747]" />
          </button>
        </div>

        <PulseBar onClick={(focus) => {
          setPulseFocus?.(focus);
          setActiveTab('pulse-checkin');
        }} />

        <FeaturedResourceCard onClick={() => setActiveTab('recursos')} />

        <HeroMoodCard
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
          onCallClick={() => setShowRequestCallModal(true)}
        />

        <PillarGrid onCardClick={(id) => setActivePillar(id)} />
        <PulseCTA onClick={() => setActiveTab('pulse-checkin')} />
      </div>

      {showRequestCallModal && (
        <RequestCallModal
          onClose={() => setShowRequestCallModal(false)}
          onConfirm={handleUrgentCallRequest}
          isLoading={isRequestingCall}
        />
      )}
    </div>
  );
}

export default BemEstarContent;
