import svgPaths from "./svg-bv530bbkds";
import clsx from "clsx";
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Frame2147239079 from './Frame2147239079';
import { useBookings } from '@/hooks/useBookings';
// DISABLED: import from 'sonner';

export interface SessionInfo {
  id: string;
  pillar: string;
  time: string;
  icon: string;
  date?: string;
  bgColor: string;
}

function SessionRow({ session, onClick }: { session: SessionInfo; onClick: () => void }) {
  const { t } = useLanguage();

  const getPillarLabel = (pillar: string) => {
    switch (pillar.toLowerCase()) {
      case 'financial': case 'financeira': return t('bemEstar.financial');
      case 'mental': case 'psych': case 'psicológico': return t('bemEstar.mental');
      case 'physical': case 'físico': case 'bem-estar físico': return t('bemEstar.physical');
      case 'legal': case 'jurídica': return t('bemEstar.legal');
      default: return pillar;
    }
  };

  return (
    <div
      className="bg-[rgba(255,255,255,0.5)] h-[56px] relative rounded-[16px] shrink-0 w-full mb-3 last:mb-0 cursor-pointer hover:bg-[rgba(255,255,255,0.7)] transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-row items-center size-full px-3">
        <div className="h-[32px] flex items-center gap-3 flex-1">
          <div className={clsx("relative rounded-full shrink-0 size-[32px] flex items-center justify-center", session.bgColor)}>
            <span className="text-[14px]">{session.icon}</span>
          </div>
          <div className="relative h-[20px] flex items-center">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#101828] text-nowrap">{getPillarLabel(session.pillar)}</p>
          </div>
        </div>
        <div className="h-[16px] relative shrink-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#4a5565] text-center text-nowrap">{session.time}</p>
        </div>
      </div>
    </div>
  );
}

function Frame({ onEnterClick }: { onEnterClick: () => void }) {
  const { t } = useLanguage();
  return (
    <div
      className="absolute bg-black bottom-[-16px] h-[48px] left-1/2 rounded-[100px] translate-x-[-50%] w-[126px] cursor-pointer hover:bg-gray-900 transition-colors active:scale-95 z-10"
      onClick={onEnterClick}
    >
      <div className="absolute flex flex-col font-['Syne:Bold',sans-serif] font-bold justify-center leading-[0] left-1/2 text-[16px] text-nowrap text-white top-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="leading-none">{t('meuEspaco.enter')}</p>
      </div>
    </div>
  );
}

export default function Frame2147239064({ onReschedule, sessions = [] }: { onReschedule?: () => void, sessions?: SessionInfo[] }) {
  const { t } = useLanguage();
  const { cancelBooking } = useBookings();
  const [showFrame2147239079, setShowFrame2147239079] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionInfo | null>(null);

  const handleSessionClick = (session: SessionInfo) => {
    setSelectedSession(session);
    setShowFrame2147239079(true);
  };

  // Use passed sessions directly
  const displaySessions = sessions;

  return (
    <div className="relative size-full">
      <div className="absolute h-[345px] left-0 rounded-[32px] top-0 w-full overflow-hidden">
        {/* Background */}
        <div className="absolute h-[345px] left-0 top-0 w-full">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311 345">
            <path d={svgPaths.pa2a6300} fill="var(--fill-0, #0B74A5)" id="Rectangle 161124905" />
          </svg>
        </div>

        {/* Title */}
        <div className="absolute w-full top-[34px] text-center">
          <p className="font-['Syne:SemiBold',sans-serif] font-semibold text-[26px] text-white tracking-[-0.3125px]">{t('meuEspaco.upcomingSessions')}</p>
        </div>

        {/* Sessions List */}
        <div className="absolute top-[80px] left-[5%] right-[5%] bottom-[50px] overflow-y-auto no-scrollbar">
          <div className="flex flex-col w-full">
            {displaySessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full pt-10 pb-4 text-white/90">
                <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <p className="text-center font-['Syne:Medium',sans-serif] text-[16px] font-medium">Sem sessões agendadas</p>
                <p className="text-center text-[12px] opacity-75 mt-1 max-w-[200px]">As suas futuras consultas aparecerão aqui.</p>
              </div>
            ) : (
              displaySessions.map((session, index) => (
                <SessionRow
                  key={session.id || index}
                  session={session}
                  onClick={() => handleSessionClick(session)}
                />
              ))
            )}
          </div>
        </div>

        {/* Button was here, moved out to prevent clipping */}
      </div>

      {/* Button - Only render if there are sessions */}
      {displaySessions.length > 0 && (
        <Frame onEnterClick={() => {
          if (displaySessions.length > 0) handleSessionClick(displaySessions[0]);
        }} />
      )}

      {showFrame2147239079 && (
        <Frame2147239079
          session={selectedSession}
          onClose={() => setShowFrame2147239079(false)}
          onReschedule={() => {
            setShowFrame2147239079(false);
            if (onReschedule) onReschedule();
          }}
          onSessionCancel={async () => {
            if (selectedSession?.id) {
              const toastId = toast.loading('Cancelando sessão...');
              const result = await cancelBooking(selectedSession.id);
              toast.dismiss(toastId);

              if (result.success) {
                toast.success('Sessão cancelada com sucesso');
                setShowFrame2147239079(false);
              } else {
                toast.error(result.error || 'Erro ao cancelar sessão');
              }
            }
          }}
        />
      )}
    </div>
  );
}
