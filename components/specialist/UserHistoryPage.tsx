import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { UserHistoryModal } from './UserHistoryModal';
import { UserDetailsModal } from './UserDetailsModal';
import { useUserHistory } from '@/hooks/useUserHistory';

export function UserHistoryPage() {
  const { userHistory, loading } = useUserHistory();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'history' | null>(null);

  const pillarNames: Record<string, string> = {
    psychological: 'Saúde Mental',
    psych: 'Saúde Mental',
    psych_social: 'Saúde Mental',
    psych_emotional: 'Saúde Mental',
    PSYCH: 'Saúde Mental',
    physical: 'Bem-Estar Físico',
    fitness: 'Bem-Estar Físico',
    PHYSICAL: 'Bem-Estar Físico',
    financial: 'Assistência Financeira',
    finance: 'Assistência Financeira',
    FINANCIAL: 'Assistência Financeira',
    legal_social: 'Assistência Jurídica',
    legal: 'Assistência Jurídica',
    juridica: 'Assistência Jurídica',
    LEGAL: 'Assistência Jurídica'
  };

  const pillarColors: Record<string, string> = {
    psychological: 'bg-blue-100 text-blue-700',
    psych: 'bg-blue-100 text-blue-700',
    psych_social: 'bg-blue-100 text-blue-700',
    PSYCH: 'bg-blue-100 text-blue-700',
    physical: 'bg-yellow-100 text-yellow-700',
    fitness: 'bg-yellow-100 text-yellow-700',
    PHYSICAL: 'bg-yellow-100 text-yellow-700',
    financial: 'bg-green-100 text-green-700',
    finance: 'bg-green-100 text-green-700',
    FINANCIAL: 'bg-green-100 text-green-700',
    legal_social: 'bg-purple-100 text-purple-700',
    legal: 'bg-purple-100 text-purple-700',
    juridica: 'bg-purple-100 text-purple-700',
    LEGAL: 'bg-purple-100 text-purple-700'
  };

  const selectedUser = userHistory.find(u => u.user_id === selectedUserId);

  const modalUser = useMemo(() => {
    if (!selectedUser) return null;

    const sortedBookings = [...selectedUser.bookings].sort(
      (a, b) =>
        new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
    );
    const latestBooking = sortedBookings[0];

    const pillarCode = latestBooking?.primary_pillar || '';
    const normalizedPillarCode = pillarCode.toLowerCase();
    const displayPillarName =
      pillarNames[normalizedPillarCode] ||
      pillarNames[pillarCode] ||
      'Pilar não definido';
    const displayPillarColor =
      pillarColors[normalizedPillarCode] ||
      pillarColors[pillarCode] ||
      'bg-gray-100 text-gray-700';

    const ratingValues = selectedUser.bookings
      .map((booking) => booking.feedback?.overall_rating)
      .filter((value): value is number => typeof value === 'number');
    const averageRating =
      ratingValues.length > 0
        ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
        : 0;

    const extractNote = (
      booking: (typeof selectedUser.bookings)[number]
    ): string | null =>
      booking.notes?.note || null;

    const latestNote = extractNote(latestBooking || ({} as any));

    const formatDate = (value?: string | null) => {
      if (!value) return null;
      const timestamp = new Date(value);
      if (Number.isNaN(timestamp.getTime())) return null;
      return timestamp.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };

    const internalNotes = sortedBookings
      .map((booking) => {
        const noteContent = extractNote(booking);
        const metadata = booking.metadata as any;

        // Extract session details
        const meetingType = booking.meeting_type === 'video' ? 'Online (Vídeo)' :
          booking.meeting_type === 'phone' ? 'Telefone' :
            booking.meeting_type || 'Não definido';

        const preDiagnostic = metadata?.pre_diagnostic_responses || [];
        const chatSessionId = metadata?.chat_session_id || booking.diagnostic_session_id;
        const isRescheduled = new Date(booking.updated_at).getTime() > new Date(booking.created_at).getTime() + 60000; // 1 min buffer

        const createdAt = booking.notes?.created_at ?? booking.booking_date;
        const formattedDate = formatDate(createdAt) ?? 'Data não disponível';
        const sessionDate = formatDate(booking.booking_date) || 'Data não disponível';
        const sessionTime = booking.start_time?.slice(0, 5) || '';

        return {
          specialist: selectedUser.user_name || 'Especialista',
          date: formattedDate,
          note: noteContent,
          // New fields for history view
          sessionDate: `${sessionDate} às ${sessionTime}`,
          meetingType,
          preDiagnostic,
          chatSessionId,
          isRescheduled,
          status: booking.status
        };
      });
    // .filter(...) // Removed filter to show all sessions even without notes

    const lastSessionLabel = (() => {
      const dateLabel = formatDate(latestBooking?.booking_date);
      const timeLabel = latestBooking?.start_time?.slice(0, 5);
      if (!dateLabel) return 'Sem sessões registadas';
      return `${dateLabel}${timeLabel ? ` às ${timeLabel}` : ''}`;
    })();

    const latestBookingAny = latestBooking as any;
    const companyName =
      latestBookingAny?.company?.company_name || 'Empresa não atribuída';

    return {
      id: selectedUser.user_id,
      name: selectedUser.user_name || 'Utilizador',
      email: selectedUser.user_email || 'Sem email registado',
      company: companyName,
      pilar: displayPillarName,
      pilarColor: displayPillarColor,
      lastSession: lastSessionLabel,
      rating: averageRating, // Use raw rating (0-10)
      notes: latestNote || 'Sem notas internas registadas.',
      internalNotes,
    };
  }, [selectedUser, pillarNames, pillarColors]);

  const historyModalUser = useMemo(() => {
    if (!modalUser) return null;
    return {
      name: modalUser.name,
      email: modalUser.email,
      company: modalUser.company,
      pilar: modalUser.pilar,
      pilarColor: modalUser.pilarColor,
      internalNotes: modalUser.internalNotes,
    };
  }, [modalUser]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando histórico...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Note: oldUsers mock data removed - now using real userHistory from useUserHistory hook

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
        <span className="text-sm font-semibold text-blue-700">{rating.toFixed(1)}</span>
        <span className="text-xs text-blue-400">/10</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2 text-4xl font-bold font-source-serif-pro">Historial de Utilizadores</h1>
          <p className="text-gray-600">Lista de utilizadores já atendidos com histórico completo</p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Nome</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Pilar Atendido</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Última Sessão</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Rating Médio</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Notas Internas</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nenhum histórico de utilizadores disponível
                    </td>
                  </tr>
                ) : (
                  userHistory.map((userItem) => {
                    const mostCommonPillar = userItem.bookings[0]?.primary_pillar || '';
                    const mostCommonPillarNormalized = mostCommonPillar?.toLowerCase() || '';
                    const ratingValues = userItem.bookings
                      .map((b) => b.feedback?.overall_rating)
                      .filter((value): value is number => typeof value === 'number');
                    const avgRating =
                      ratingValues.length > 0
                        ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
                        : 0;

                    return (
                      <tr key={userItem.user_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-gray-900">{userItem.user_name}</p>
                            <p className="text-sm text-gray-500">{userItem.user_email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${pillarColors[mostCommonPillarNormalized] ||
                              pillarColors[mostCommonPillar] ||
                              'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {pillarNames[mostCommonPillarNormalized] ||
                              pillarNames[mostCommonPillar] ||
                              mostCommonPillar ||
                              'Pilar não definido'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">{new Date(userItem.last_session_date).toLocaleDateString('pt-PT')}</span>
                        </td>
                        <td className="px-6 py-4">
                          {avgRating > 0 ? renderRating(avgRating) : <span className="text-gray-400 text-sm">Sem avaliação</span>}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                            {userItem.total_sessions} sessões realizadas
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedUserId(userItem.user_id);
                              setViewMode('history');
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors whitespace-nowrap"
                          >
                            Ver histórico
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {userHistory.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
              Nenhum histórico de utilizadores disponível
            </div>
          ) : (
            userHistory.map((userItem) => {
              const mostCommonPillar = userItem.bookings[0]?.primary_pillar || '';
              const mostCommonPillarNormalized = mostCommonPillar?.toLowerCase() || '';
              const ratingValues = userItem.bookings
                .map((b) => b.feedback?.overall_rating)
                .filter((value): value is number => typeof value === 'number');
              const avgRating =
                ratingValues.length > 0
                  ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
                  : 0;

              return (
                <div
                  key={userItem.user_id}
                  onClick={() => {
                    setSelectedUserId(userItem.user_id);
                    setViewMode('details');
                  }}
                  className="bg-white rounded-2xl p-4 shadow-sm active:scale-98 transition-transform cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 truncate">{userItem.user_name}</h3>
                      <p className="text-sm text-gray-500 truncate">{userItem.user_email}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs ${pillarColors[mostCommonPillarNormalized] ||
                        pillarColors[mostCommonPillar] ||
                        'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {pillarNames[mostCommonPillarNormalized] ||
                        pillarNames[mostCommonPillar] ||
                        mostCommonPillar ||
                        'Pilar não definido'}
                    </span>
                    <span className="text-xs text-gray-500">• {new Date(userItem.last_session_date).toLocaleDateString('pt-PT')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {avgRating > 0 ? renderRating(avgRating) : <span className="text-gray-400 text-sm">Sem avaliação</span>}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {userItem.total_sessions} sessões realizadas
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modals */}
      {historyModalUser && viewMode === 'history' && (
        <UserHistoryModal
          user={historyModalUser}
          onClose={() => {
            setSelectedUserId(null);
            setViewMode(null);
          }}
        />
      )}

      {selectedUser && modalUser && viewMode === 'details' && (
        <UserDetailsModal
          user={modalUser}
          onClose={() => {
            setSelectedUserId(null);
            setViewMode(null);
          }}
          onViewHistory={() => setViewMode('history')}
        />
      )}
    </div>
  );
}