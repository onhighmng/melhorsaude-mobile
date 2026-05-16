import { useState, useMemo } from 'react';
import { FullScreenModal } from './FullScreenModal';
import { useBookings } from '@/contexts/BookingContext';
import { Calendar, Clock, MapPin, Video, Star } from 'lucide-react';


interface SessionHistoryModalProps {
    onClose: () => void;
    onRateSession: (session: any) => void;
}

export function SessionHistoryModal({ onClose, onRateSession }: SessionHistoryModalProps) {
    const { pastBookings } = useBookings();
    const [selectedType, setSelectedType] = useState<string>('all');

    // Helper for Pillar Labels (reused logic)
    const getPillarLabel = (pillar: string | undefined | null) => {
        if (!pillar) return 'Saúde';
        const p = pillar.toUpperCase();
        if (p === 'PSYCH' || p === 'MENTAL' || p.includes('MEN')) return 'Saúde Mental';
        if (p === 'PHYSICAL' || p === 'FISICO' || p.includes('FIS')) return 'Bem-estar Físico';
        if (p === 'FINANCIAL' || p === 'FINANCEIRA' || p.includes('FIN')) return 'Consultoria Financeira';
        if (p === 'LEGAL' || p === 'JURIDICA' || p.includes('JUR')) return 'Consultoria Jurídica';
        return pillar;
    };

    const getPillarEmoji = (pillar: string | undefined | null) => {
        const p = (pillar || '').toUpperCase();
        if (p === 'PSYCH' || p.includes('MEN')) return '🧠';
        if (p === 'PHYSICAL' || p.includes('FIS')) return '💪';
        if (p === 'FINANCIAL' || p.includes('FIN')) return '💰';
        if (p === 'LEGAL' || p.includes('JUR')) return '⚖️';
        return '📅';
    };

    // Filter Logic
    const filteredSessions = useMemo(() => {
        if (selectedType === 'all') return pastBookings;
        return pastBookings.filter(b => {
            const type = getPillarLabel(b.primary_pillar || b.pillar);
            return type === selectedType;
        });
    }, [pastBookings, selectedType]);

    // Unique types for filter dropdown
    const availableTypes = useMemo(() => {
        const types = new Set(pastBookings.map(b => getPillarLabel(b.primary_pillar || b.pillar)));
        return Array.from(types);
    }, [pastBookings]);

    return (
        <FullScreenModal
            title="Histórico de Sessões"
            onClose={onClose}
            filters={
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium text-gray-600"
                >
                    <option value="all">Todas as Categorias</option>
                    {availableTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSessions.length > 0 ? (
                    filteredSessions.map((session: any) => (
                        <div key={session.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">
                                    {getPillarEmoji(session.primary_pillar || session.pillar)}
                                </div>
                                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {session.status === 'completed' ? 'Concluída' : session.status}
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 text-lg mb-1">
                                Sessão de {getPillarLabel(session.primary_pillar || session.pillar)}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                                {session.specialist?.profile?.full_name || 'Especialista'}
                            </p>

                            <div className="space-y-2 mb-5">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {new Date(session.booking_date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    {session.start_time?.slice(0, 5)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {session.meeting_type === 'video' ? <Video className="w-4 h-4 text-gray-400" /> : <MapPin className="w-4 h-4 text-gray-400" />}
                                    {session.meeting_type === 'video' ? 'Videochamada' : 'Presencial'}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                {session.feedback ? (
                                    <div className="flex gap-1 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < session.feedback.overall_rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onRateSession(session)}
                                        className="w-full bg-[#003b8d] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#002a66] transition-colors"
                                    >
                                        Avaliar Sessão
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        <p>Nenhuma sessão encontrada.</p>
                    </div>
                )}
            </div>
        </FullScreenModal>
    );
}
