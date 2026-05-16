import imgMaskGroup from "@assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "@assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "@assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "@assets/897f25666b2976f6467a21346375bb9753e57911.png";
import heroImg from '@assets/a174d87219c1bc18dc7f9d27ae4aa115aa854e1a.png';
import appLogo from '@assets/app-logo.png';
import { useState, useEffect } from 'react';
// DISABLED: import from 'motion/react';
import { Questionnaire } from './Questionnaire';
import { SessionBooking } from './SessionBooking';
import { questionnaireData } from '@/data/questionnaireData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMood } from '@/contexts/MoodContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { RequestCallModal } from './RequestCallModal';
import { showSuccessToast } from '@/utils/toast';
// DISABLED: import from 'sonner';
import {
  Phone, Zap, AlertTriangle, 
  Brain, Activity, Wallet, Scale,
  TrendingDown, TrendingUp, Wind, ChevronRight, AlertCircle, Smile, Clock, Bell, X
} from 'lucide-react';

const MOOD_OPTIONS = [
  { value: 'very-sad', label: 'Muito Mal', emoji: '🙁', bg: '#DBEAFE', idx: 0 },
  { value: 'bad',      label: 'Mal',       emoji: '😡', bg: '#FFE2E2', idx: 1 },
  { value: 'neutral',  label: 'Ok',        emoji: '😐', bg: '#F3F4F6', idx: 2 },
  { value: 'good',     label: 'Bem',       emoji: '😊', bg: '#FEF9C2', idx: 3 },
  { value: 'great',    label: 'Ótimo',     emoji: '😃', bg: '#FFF085', idx: 4 },
] as const;

const PILLARS = [
  {
    id: 'mental'     as const,
    label: 'Saúde Mental',  sub: 'Psicológico',
    Icon: Brain,    iconColor: '#0C447C',
    gradFrom: '#9dbfd4',    gradTo: 'rgba(157,191,212,0.3)',
    maskImg: imgMaskGroup,
  },
  {
    id: 'fisico'     as const,
    label: 'Bem-estar',     sub: 'Físico',
    Icon: Activity, iconColor: '#7A4C00',
    gradFrom: '#fcc066',    gradTo: '#f5efe6',
    maskImg: imgMaskGroup1,
  },
  {
    id: 'financeira' as const,
    label: 'Assistência',   sub: 'Financeira',
    Icon: Wallet,   iconColor: '#085041',
    gradFrom: '#8bbeb8',    gradTo: 'rgba(139,190,184,0.3)',
    maskImg: imgMaskGroup2,
  },
  {
    id: 'juridica'   as const,
    label: 'Assistência',   sub: 'Jurídica',
    Icon: Scale,    iconColor: '#6B0A4B',
    gradFrom: '#d8a4c4',    gradTo: 'rgba(216,164,196,0.3)',
    maskImg: imgMaskGroup3,
  },
];

interface BemEstarDesktopProps {
  setActiveTab: (tab: string) => void;
  setIsQuestionnaireActive: (active: boolean) => void;
  initialPillar?: 'mental' | 'fisico' | 'financeira' | 'juridica' | null;
  skipToBooking?: boolean;
  rescheduleSessionId?: string | null;
  onBookingComplete?: () => void;
  setPulseFocus?: (focus: 'energy' | 'stress' | 'humor' | 'pulse' | undefined) => void;
}

export function BemEstarDesktop({
  setActiveTab,
  setIsQuestionnaireActive,
  initialPillar = null,
  skipToBooking = false,
  rescheduleSessionId = null,
  onBookingComplete,
  setPulseFocus,
}: BemEstarDesktopProps) {
  const { t } = useLanguage();
  const { addMoodEntry, moodHistory } = useMood();
  const { profile } = useAuth();
  const { createBooking } = useBookings();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<'mental' | 'fisico' | 'financeira' | 'juridica' | null>(initialPillar);
  const [showBooking, setShowBooking] = useState(skipToBooking);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRequestCallModalOpen, setIsRequestCallModalOpen] = useState(false);
  const [isRequestingCall, setIsRequestingCall] = useState(false);

  useEffect(() => {
    if (moodHistory.length > 0) {
      const today = new Date();
      const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
      const todayEntry = moodHistory.find(e => e.date === todayStr);
      if (todayEntry) {
        const map: Record<number, string> = { 0: 'very-sad', 1: 'bad', 2: 'neutral', 3: 'good', 4: 'great' };
        setSelectedMood(map[todayEntry.selectedMoodIndex] || null);
      }
    }
  }, [moodHistory]);

  const handleMoodClick = (moodValue: string, moodIdx: number) => {
    setSelectedMood(moodValue);
    addMoodEntry(moodIdx);
    showSuccessToast('Humor registado!', 'O teu humor foi guardado com sucesso.', { duration: 3000 });
  };

  const handleUrgentCallRequest = async () => {
    setIsRequestingCall(true);
    try {
      const now = new Date();
      const result = await createBooking({
        specialist_id: null,
        booking_date: now.toISOString().split('T')[0],
        start_time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        meeting_type: 'voice',
        primary_pillar: 'mental',
        metadata: { request_type: 'urgent_call', notes: 'Pedido de suporte imediato via dashboard (Suporte 24/7)' },
      });
      if (result.success) {
        setIsRequestCallModalOpen(false);
        showSuccessToast('Pedido enviado!', 'Um especialista entrará em contacto consigo brevemente.');
      } else {
        toast.error(result.error || 'Erro ao solicitar chamada.');
      }
    } catch {
      toast.error('Ocorreu um erro ao processar o seu pedido.');
    } finally {
      setIsRequestingCall(false);
    }
  };

  const handlePillarClick = (pillarId: 'mental' | 'fisico' | 'financeira' | 'juridica') => {
    setActivePillar(pillarId);
    setIsQuestionnaireActive(true);
  };

  if (activePillar && !showBooking) {
    return (
      <Questionnaire
        pillarId={activePillar}
        questions={questionnaireData[activePillar].questions}
        onComplete={() => { setShowBooking(true); setIsQuestionnaireActive(false); }}
        onBack={() => { setActivePillar(null); setIsQuestionnaireActive(false); }}
      />
    );
  }

  if (showBooking && activePillar) {
    return (
      <SessionBooking
        pillarId={activePillar}
        rescheduleSessionId={rescheduleSessionId}
        onBack={() => { setShowBooking(false); setActivePillar(null); onBookingComplete?.(); }}
        onComplete={() => { setShowBooking(false); setActivePillar(null); onBookingComplete?.(); setActiveTab('meu-espaco'); }}
      />
    );
  }

  const getGreeting = () => {
    const name = profile?.full_name?.split(' ')[0] || 'Utilizador';
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return `Bom dia, ${name}`;
    if (h >= 12 && h < 19) return `Boa tarde, ${name}`;
    return `Boa noite, ${name}`;
  };

  return (
    <div 


      className="min-h-full pb-20 relative overflow-hidden"
    >
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 bg-[#F8FAFC] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-50/60 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-8 py-8">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <img src={appLogo} alt="Melhor Saúde" className="h-14 w-auto object-contain" />
            <div>
              <h1 className="font-pacifico text-[42px] text-[#1a1a1a] tracking-tight mb-1">
                {getGreeting()}
              </h1>
              <p className="font-plus-jakarta text-[17px] text-[#474747] opacity-60">
                {t('bemEstar.tagline')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Status Indicators Bar */}
            <div className="flex gap-2">
              {[
                { Icon: AlertTriangle, color: '#FBBF24', value: '3', label: 'Stress', focus: 'stress' as const },
                { Icon: TrendingDown,  color: '#F87171', value: '2', label: 'Energia', focus: 'energy' as const },
                { Icon: TrendingUp,    color: '#34D399', value: '4', label: 'Humor', focus: 'humor' as const },
              ].map(({ Icon, color, value, label, focus }) => (
                <button
                  key={label}
                  onClick={() => { setPulseFocus?.(focus); setActiveTab('pulse-checkin'); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-md border border-white transition-all hover:shadow-md hover:bg-white active:scale-95 group"
                >
                  <Icon size={12} style={{ color }} className="transition-transform group-hover:scale-110" />
                  <span className="font-plus-jakarta font-bold text-[14px] text-[#1a1a1a]">{value}</span>
                  <span className="font-plus-jakarta text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`size-11 rounded-full flex items-center justify-center transition-all ${showNotifications ? 'bg-[#0046a2] text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-600 hover:shadow-md hover:bg-gray-50'}`}
              >
                <Bell size={20} className={showNotifications ? 'animate-none' : 'animate-pulse'} />
                <div className="absolute top-0.5 right-0.5 size-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>

              
                {showNotifications && (
                  <div



                    className="absolute right-0 mt-3 w-[360px] bg-white rounded-[32px] shadow-2xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                      <h3 className="font-plus-jakarta font-bold text-[18px]">Notificações</h3>
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto p-2">
                      <div className="p-4 text-center text-gray-500 italic text-sm">Sem novas notificações.</div>
                    </div>
                    <button 
                      onClick={() => { setShowNotifications(false); setActiveTab('notifications'); }}
                      className="w-full py-4 text-center font-plus-jakarta font-bold text-[13px] text-[#0046a2] hover:bg-gray-50 border-t border-gray-50"
                    >
                      Ver todas as notificações
                    </button>
                  </div>
                )}
              
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[280px] mb-10 group">
          <img
            src={heroImg}
            alt="Wellness Hero"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-between px-16">
            <div className="flex flex-col items-start relative z-20">
              <h2 className="font-plus-jakarta text-[36px] font-bold text-white mb-6 leading-tight tracking-tight max-w-[400px]">
                Como estás a sentir-te hoje?
              </h2>
              <div className="flex gap-4">
                {MOOD_OPTIONS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMoodClick(m.value, m.idx)}
                    className={`size-16 rounded-full flex items-center justify-center transition-all active:scale-90 ${selectedMood === m.value ? 'ring-4 ring-white scale-110 shadow-2xl' : 'hover:scale-105'}`}
                    style={{ background: m.bg }}
                  >
                    <span className="text-[28px]">{m.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsRequestCallModalOpen(true)}
              className="bg-[#0046a2] h-[110px] w-[220px] rounded-[42px] flex items-center justify-center active:scale-95 transition-all shadow-2xl relative overflow-hidden group/phone"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/phone:opacity-100 transition-opacity" />
              <div className="relative aspect-square h-[65%] bg-white rounded-full flex items-center justify-center shadow-inner">
                <Phone className="text-[#0046a2] w-[45%] h-[45%]" fill="currentColor" />
                <div className="absolute -top-[5%] -right-[20%] bg-[#10B981] h-[35%] w-[85%] rounded-full flex items-center justify-center border border-white/20 px-2">
                  <span className="text-white text-[11px] font-bold leading-none">24/7</span>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-start pr-4 text-left">
                <span className="text-white font-plus-jakarta font-bold text-[15px] leading-tight">Ligar Agora</span>
                <span className="text-white/60 font-poppins text-[10px]">Privado e Seguro</span>
              </div>
            </button>
          </div>
        </div>

        {/* Pulse Insights Banner */}
        <div className="bg-[#0046a2] rounded-[32px] p-6 mb-10 relative overflow-hidden shadow-xl group">
          <div className="absolute top-[-50%] right-[-10%] size-[240px] bg-white/5 rounded-full blur-[50px] pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="size-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Zap className="text-white" size={20} />
              </div>
              <div>
                <p className="font-plus-jakarta font-bold text-[11px] text-white/50 uppercase tracking-[0.2em] mb-0.5">
                  Check-in Semanal
                </p>
                <h3 className="font-plus-jakarta text-[19px] font-bold text-white tracking-tight">
                  Pronto para o teu relatório de hoje?
                </h3>
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-[#EF9F27] font-plus-jakarta font-bold text-[12px] bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <AlertCircle size={14} className="animate-pulse" />
                Sinal de Stress detetado
              </div>
              <button
                onClick={() => { setPulseFocus?.('pulse'); setActiveTab('pulse-checkin'); }}
                className="bg-white text-[#0046a2] px-6 py-2.5 rounded-2xl font-plus-jakarta font-bold text-[14px] shadow-lg hover:scale-105 transition-all active:scale-95"
              >
                Começar agora →
              </button>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="mb-8">
          <h2 className="font-pacifico text-[32px] text-[#1a1a1a] mb-1 tracking-tight">A tua ajuda</h2>
          <p className="font-plus-jakarta text-[15px] text-[#474747] opacity-60">Consultas e recursos especializados para o teu bem-estar</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => handlePillarClick(pillar.id)}
              className="group rounded-[32px] overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 relative h-[180px] text-left border border-white shadow-sm"
              style={{ background: `linear-gradient(to bottom, ${pillar.gradFrom}, ${pillar.gradTo})` }}
            >
              <img src={pillar.maskImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] group-hover:opacity-[0.2] transition-opacity pointer-events-none" />
              <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                <div className="size-10 rounded-[14px] flex items-center justify-center shadow-lg" style={{ background: `${pillar.iconColor}20`, color: pillar.iconColor }}>
                  <pillar.Icon size={20} />
                </div>
                <div>
                  <p className="font-plus-jakarta font-bold text-[#1a1a1a] text-[17px] leading-tight mb-1 tracking-tight">{pillar.label}</p>
                  <p className="font-plus-jakarta text-[11px] font-bold opacity-40 uppercase tracking-widest">{pillar.sub}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isRequestCallModalOpen && (
        <RequestCallModal
          onClose={() => setIsRequestCallModalOpen(false)}
          onConfirm={handleUrgentCallRequest}
          isLoading={isRequestingCall}
        />
      )}
    </div>
  );
}