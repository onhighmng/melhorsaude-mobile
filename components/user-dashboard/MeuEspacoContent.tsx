import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBookings, BookingWithRelations } from '@/hooks/useBookings';
import { supabase } from '@/lib/supabase';
import { MoodHistoryPage } from './MoodHistoryPage';
import { SessionRatingPage } from './SessionRatingPage';
import { RecursosPage } from './RecursosPage';
import { showSuccessToast, showConfirmToast } from '@/utils/toast';
import {
  Calendar, Video, Phone, RotateCcw, ChevronRight, Clock, BookOpen,
} from 'lucide-react';

import mentalHealthImg from '@assets/pillar-mental.png';
import physicalWellnessImg from '@assets/pillar-fisico.png';
import financialAssistanceImg from '@assets/pillar-financeira.png';
import legalAssistanceImg from '@assets/pillar-juridica.png';

import secureLifeSvg from '@assets/f79bceb4465a4f4d62f355fbf0d3bf8c6d7c5ba3.svg';
import vitalHealthSvg from '@assets/e721cb948da5978003733a53943e1ca2e82fe059.svg';
import totalHomeSvg from '@assets/cac82369f95fcdef4a331dba06b9d286785cc7dd.svg';
import travelInsuranceSvg from '@assets/9532c203a548f9b3571785f919a9a737fba881dd.svg';


const BG      = '#ffffff';
const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

interface MeuEspacoContentProps {
  setActiveTab: (tab: string) => void;
  onRebookSession?: (sessionTitle: string) => void;
  setIsQuestionnaireActive?: (active: boolean) => void;
}

// ─── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-[12px] mb-4">
      <div className="bg-[#ecece7] px-[8px] py-[4px] rounded-[4px]">
        <p className="font-poppins text-[#0a0a0a] text-[12px] leading-[1.5]">
          {tag}
        </p>
      </div>
      <p className="font-poppins text-[24px] text-[#0a0a0a] leading-[28px] tracking-wide">
        {title}
      </p>
    </div>
  );
}

// ─── Upcoming session card ─────────────────────────────────────────────────────
function UpcomingSessionCard({ sessions, onReschedule, onCancel }: { sessions: BookingWithRelations[], onReschedule: (id: string, pillar: string) => void, onCancel: (id: string) => void }) {
  const getPillarImage = (pillar: string) => {
    const p = pillar.toLowerCase();
    if (p.includes('mental')) return mentalHealthImg;
    if (p.includes('fisico') || p.includes('físico')) return physicalWellnessImg;
    if (p.includes('financeira')) return financialAssistanceImg;
    if (p.includes('juridica') || p.includes('jurídica')) return legalAssistanceImg;
    return mentalHealthImg;
  };

  const getPillarGradient = (pillar: string) => {
    const p = pillar.toLowerCase();
    if (p.includes('mental')) return 'linear-gradient(180deg, #9dbfd4 0%, rgba(157, 191, 212, 0.3) 100%)';
    if (p.includes('fisico') || p.includes('físico')) return 'linear-gradient(180deg, #fcc066 0%, #f5efe6 100%)';
    if (p.includes('financeira')) return 'linear-gradient(180deg, #9dbfd4 0%, rgba(157, 191, 212, 0.3) 100%)';
    if (p.includes('juridica') || p.includes('jurídica')) return 'linear-gradient(180deg, #d8a4c4 0%, rgba(216, 164, 196, 0.3) 100%)';
    return 'linear-gradient(180deg, #9dbfd4 0%, rgba(157, 191, 212, 0.3) 100%)';
  };

  if (sessions.length === 0) {
    return (
      <div className="mt-8 p-8 rounded-[32px] bg-[#f2f1ef] border border-black/5 text-center">
        <Calendar size={48} className="mx-auto mb-4 text-[#474747] opacity-20" />
        <p className="font-poppins text-[#474747] text-[16px]">Não tens sessões agendadas de momento.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <SectionHeader tag="Próximas" title="As tuas sessões agendadas" />
      <div className="flex flex-col gap-5">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex flex-col gap-6 p-6 rounded-[32px] w-full shadow-sm border border-black/5"
            style={{ background: getPillarGradient(s.pillar || 'Mental') }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="font-poppins text-[#0a0a0a] text-[24px] font-bold leading-tight tracking-tight mb-1">
                  {s.pillar || 'Saúde Mental'}
                </p>
                <p className="font-poppins text-[#474747] text-[18px] font-medium leading-tight">
                  {s.specialist?.name || 'Especialista'}
                </p>
              </div>
              <div className="w-[min(28vw,110px)] aspect-square rounded-[24px] bg-white flex items-center justify-center shadow-sm shrink-0 overflow-hidden px-2 border border-black/5">
                <img src={getPillarImage(s.pillar || 'Mental')} alt={s.pillar || ''} className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/60 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
                <Calendar size={16} className="text-[#474747]" />
                <span className="font-poppins text-[#474747] text-[14px] font-bold">
                  {new Date(s.booking_date).toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="bg-white/60 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
                <Clock size={16} className="text-[#474747]" />
                <span className="font-poppins text-[#474747] text-[14px] font-bold">{s.booking_time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {(s as any).meeting_type !== 'phone' ? (
                <>
                  {/* Video: Enter button only active once specialist adds the link */}
                  <button
                    onClick={() => {
                      const link = (s as any).meeting_link;
                      if (link) window.open(link, '_blank');
                    }}
                    disabled={!(s as any).meeting_link}
                    className="h-[52px] rounded-full flex items-center justify-center w-full active:scale-[0.98] transition-all shadow-md disabled:cursor-not-allowed"
                    style={{
                      background: (s as any).meeting_link ? '#1565C0' : 'rgba(255,255,255,0.35)',
                      border: (s as any).meeting_link ? 'none' : '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <Video size={18} className={(s as any).meeting_link ? 'text-white mr-2' : 'text-[#474747] mr-2'} />
                    <span
                      className="font-poppins text-[15px] font-bold tracking-wide"
                      style={{ color: (s as any).meeting_link ? '#ffffff' : '#474747' }}
                    >
                      {(s as any).meeting_link ? 'Entrar na Sessão' : 'À espera do link…'}
                    </span>
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onReschedule(s.id, s.pillar || 'Mental')}
                      className="bg-[#475569] h-[48px] rounded-full flex-1 flex items-center justify-center active:scale-[0.98] transition-all shadow-sm"
                    >
                      <RotateCcw size={16} className="text-white mr-2" />
                      <span className="font-poppins text-white text-[14px] font-semibold">Reagendar</span>
                    </button>
                    <button
                      onClick={() => {
                        showConfirmToast(
                          'Cancelar Sessão',
                          'Tens a certeza que queres cancelar esta sessão? Esta ação não pode ser desfeita.',
                          () => onCancel(s.id)
                        );
                      }}
                      className="bg-[#ef4444] h-[48px] rounded-full flex-1 flex items-center justify-center active:scale-[0.98] transition-all shadow-sm"
                    >
                      <span className="font-poppins text-white text-[14px] font-semibold">Cancelar</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Phone session: Rebook and Cancel in solid colors, no enter button */
                <div className="flex gap-3">
                  <button
                    onClick={() => onReschedule(s.id, s.pillar || 'Mental')}
                    className="bg-[#475569] h-[52px] rounded-full flex-1 flex items-center justify-center active:scale-[0.98] transition-all shadow-sm"
                  >
                    <RotateCcw size={16} className="text-white mr-2" />
                    <span className="font-poppins text-white text-[15px] font-semibold">Reagendar</span>
                  </button>
                  <button
                    onClick={() => {
                      showConfirmToast(
                        'Cancelar Sessão',
                        'Tens a certeza que queres cancelar esta sessão? Esta ação não pode ser desfeita.',
                        () => onCancel(s.id)
                      );
                    }}
                    className="bg-[#ef4444] h-[52px] rounded-full flex-1 flex items-center justify-center active:scale-[0.98] transition-all shadow-sm"
                  >
                    <span className="font-poppins text-white text-[15px] font-semibold">Cancelar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick actions row ─────────────────────────────────────────────────────────
function QuickActions({
  onMoodHistory,
  onRateSessions,
  onProgress,
}: {
  onMoodHistory: () => void;
  onRateSessions: () => void;
  onProgress: () => void;
}) {
  const actions = [
    { 
      label: 'Histórico\nde Humor', 
      image: totalHomeSvg, 
      onClick: onMoodHistory,
      gradient: 'linear-gradient(180deg, #9dbfd4 0%, rgba(157, 191, 212, 0.3) 100%)' 
    },
    { 
      label: 'Avaliar\nSessões',   
      image: travelInsuranceSvg, 
      onClick: onRateSessions,
      gradient: 'linear-gradient(180deg, #d8a4c4 0%, rgba(216, 164, 196, 0.3) 100%)' 
    },
    { 
      label: 'Progresso\nda Saúde',  
      image: vitalHealthSvg,  
      onClick: onProgress,
      gradient: 'linear-gradient(180deg, #fcc066 0%, #f5efe6 100%)' 
    },
  ];

  return (
    <div className="mt-10">
      <SectionHeader tag="Ações" title="Acesso rápido" />
      <div className="grid grid-cols-3 gap-3">
        {actions.map(({ label, image, onClick, gradient }, i) => (
          <button
            key={i}
            onClick={onClick}
            className="rounded-[28px] py-6 px-2 flex flex-col items-center gap-4 active:scale-95 transition-transform text-center shadow-sm border border-black/5"
            style={{ background: gradient }}
          >
            <div className="w-[80px] h-[60px] bg-white rounded-[28px] flex items-center justify-center shadow-sm border border-black/5 overflow-hidden px-2">
              <img src={image} alt={label} className="w-full h-full object-contain" />
            </div>
            <span className="font-poppins text-[#0a0a0a] text-[13px] font-bold leading-[18px] whitespace-pre-line">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const PILLAR_TAG: Record<string, string> = {
  PSYCH: 'Mental', PHYSICAL: 'Físico', FINANCIAL: 'Finanças', LEGAL: 'Jurídico',
};
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop';

interface PreviewResource { id: string; title: string; description: string; pillar_code: string; thumbnail_url: string | null }

// ─── Resources preview card ────────────────────────────────────────────────────
function ResourcesPreview({ onClick }: { onClick: () => void }) {
  const [items, setItems] = useState<PreviewResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('resources')
      .select('id, title_pt, description_pt, pillar_code, thumbnail_url')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setItems((data || []).map((r: any) => ({
          id: r.id,
          title: r.title_pt || '',
          description: r.description_pt || '',
          pillar_code: r.pillar_code || 'PSYCH',
          thumbnail_url: r.thumbnail_url,
        })));
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="mt-10 flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      <SectionHeader tag="Conteúdo" title="Recursos e Exercícios" />

      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={onClick}
            className="flex flex-col rounded-[28px] w-full overflow-hidden text-left shadow-sm active:scale-[0.98] transition-transform"
            style={{ background: CARD }}
          >
            <div className="h-[200px] w-full bg-[#ecece7] relative">
              <img
                src={item.thumbnail_url || FALLBACK_IMG}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
              />
            </div>
            <div className="p-6 flex flex-col items-start gap-4">
              <div className="bg-[#ecece7] px-2.5 py-1 rounded-[4px] w-fit">
                <span className="font-poppins text-[#0a0a0a] text-[12px]">{PILLAR_TAG[item.pillar_code] || item.pillar_code}</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-poppins text-[20px] text-[#0a0a0a] leading-[28px] tracking-wide">{item.title}</p>
                <p className="font-poppins text-[16px] text-[#474747] leading-[24px] line-clamp-2">{item.description}</p>
              </div>
              <p className="font-poppins text-[#0a0a0a] text-[14px] underline tracking-[2.4px] uppercase mt-2 font-medium">
                Ver mais
              </p>
            </div>
          </button>
        ))}
      </div>

      <button onClick={onClick} className="w-full mt-6 py-4 rounded-[28px] bg-white border border-[#ecece7] text-[#0a0a0a] font-poppins font-medium text-[16px]">
        Ver todos os recursos
      </button>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function MeuEspacoContent({
  setActiveTab,
  onRebookSession,
  setIsQuestionnaireActive,
}: MeuEspacoContentProps) {
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [showRateSessions, setShowRateSessions] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const { t } = useLanguage();
  const { upcomingBookings, cancelBooking } = useBookings();

  useEffect(() => {
    setIsQuestionnaireActive?.(false);
  }, [setIsQuestionnaireActive]);

  if (showMoodHistory) return <MoodHistoryPage onBack={() => setShowMoodHistory(false)} />;
  if (showRateSessions) return <SessionRatingPage onBack={() => setShowRateSessions(false)} />;
  if (showRecursos) return <RecursosPage onBack={() => setShowRecursos(false)} />;

  return (
    <div className="min-h-screen pb-32">
      <div className="px-5 pt-12 max-w-[430px] mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="font-poppins text-[#474747] text-[16px] font-normal mb-1">O teu espaço pessoal</p>
          <h1 className="font-pacifico text-[#0a0a0a] text-[36px] font-light tracking-wide leading-tight">
            {t('meuEspaco.title')}
          </h1>
        </div>

        {/* Upcoming sessions */}
        <UpcomingSessionCard
          sessions={upcomingBookings}
          onReschedule={(id, pillar) => onRebookSession?.(pillar)}
          onCancel={cancelBooking}
        />

        {/* Quick actions */}
        <QuickActions
          onMoodHistory={() => setShowMoodHistory(true)}
          onRateSessions={() => setShowRateSessions(true)}
          onProgress={() => setActiveTab('progress')}
        />

        {/* Resources preview */}
        <ResourcesPreview onClick={() => setShowRecursos(true)} />

        <div className="h-4" />
      </div>
    </div>
  );
}