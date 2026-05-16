import { Star } from 'lucide-react';
import { useState } from 'react';
import { SessionRatingModal } from './SessionRatingModal';
import { useBookings, BookingWithRelations } from '@/hooks/useBookings';

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental',
  PHYSICAL: 'Bem-estar Físico',
  FINANCIAL: 'Assistência Financeira',
  LEGAL: 'Assistência Jurídica',
};

export function RateSessionsCard() {
  const { pastBookings, rateSession } = useBookings();
  const [selectedSession, setSelectedSession] = useState<BookingWithRelations | null>(null);

  const unrated = pastBookings.filter((b) => !b.feedback);

  if (unrated.length === 0) return null;

  return (
    <>
      <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D4E9F4] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#007AFF]" />
            <h3 className="text-gray-900">Avaliar Sessões</h3>
          </div>

          <div className="space-y-3">
            {unrated.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="w-full flex items-center justify-between p-3 bg-white/50 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <div className="text-gray-900 text-sm">{PILLAR_LABELS[session.pillar || 'PSYCH'] || session.pillar}</div>
                    <div className="text-gray-500 text-xs">{session.booking_date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#007AFF] text-xs">
                  <Star className="w-4 h-4" />
                  <span>Avaliar</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedSession && (
        <SessionRatingModal
          booking={selectedSession}
          onClose={() => setSelectedSession(null)}
          onSubmit={rateSession}
        />
      )}
    </>
  );
}
