import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Users, Calendar } from 'lucide-react';

interface SpecialistProfile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  metadata: any;
}

interface SpecialistPillar {
  pillar_code: string | null;
}

interface SpecialistDetails {
  id: string;
  profile?: SpecialistProfile | null;
  professional_title?: string | null;
  is_active?: boolean | null;
  session_count?: number | null;
  upcoming_sessions?: number | null;
  specialist_pillars?: SpecialistPillar[] | null;
}

interface AffiliateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: SpecialistDetails | null;
}

const PILLAR_LABELS: Record<string, string> = {
  psychological: 'Saúde Mental',
  physical: 'Bem-Estar Físico',
  financial: 'Assistência Financeira',
  legal_social: 'Assistência Jurídica',
};

export default function AffiliateDetailsModal({ isOpen, onClose, affiliate }: AffiliateDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'availability'>('info');

  if (!affiliate) return null;

  useEffect(() => {
    if (affiliate) {
      setActiveTab('info');
    }
  }, [affiliate]);

  const totalSessions = affiliate.session_count ?? 0;
  const upcomingSessions = affiliate.upcoming_sessions ?? 0;
  const completedSessions = totalSessions;
  const pillars = useMemo(
    () =>
      (affiliate.specialist_pillars || [])
        .map((item) => item.pillar_code)
        .filter((code): code is string => !!code),
    [affiliate.specialist_pillars]
  );

  const formattedPillars = pillars.length > 0
    ? pillars.map((code) => PILLAR_LABELS[code] || code).join(', ')
    : 'Não definido';

  const name = affiliate.profile?.full_name || 'Especialista';
  const email = affiliate.profile?.email || 'Email não disponível';
  const phone = affiliate.profile?.phone || '—';
  const role = affiliate.professional_title || 'Especialista';
  const statusLabel = affiliate.is_active === false ? 'Inativo' : 'Ativo';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0">
        <DialogTitle className="sr-only">Detalhes do Especialista - {name}</DialogTitle>
        <DialogDescription className="sr-only">
          Visualizar informações completas do prestador
        </DialogDescription>

        <div className="relative bg-white rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-gray-900">Detalhes do Especialista - {name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-6 py-3 transition-colors relative ${
                  activeTab === 'info'
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Informação Básica
                {activeTab === 'info' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-3 transition-colors relative ${
                  activeTab === 'stats'
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Estatísticas de Sessões
                {activeTab === 'stats' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`px-6 py-3 transition-colors relative ${
                  activeTab === 'availability'
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Disponibilidade
                {activeTab === 'availability' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6 min-h-[300px]">
            {activeTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Nome</div>
                  <div className="text-gray-900 break-words">{name}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Email</div>
                  <div className="text-gray-900 break-words">{email}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Especialidade</div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-900">{role}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Contacto</div>
                  <span className="text-gray-900">{phone}</span>
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm text-gray-600 mb-2">Pilares Atendidos</div>
                  <span className="text-gray-900">{formattedPillars}</span>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Estado</div>
                  <Badge className={statusLabel === 'Ativo' ? 'bg-[#d4f4dd] text-[#34C759]' : 'bg-gray-200 text-gray-600'}>
                    {statusLabel}
                  </Badge>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#007AFF]" />
                      <span className="text-2xl text-[#007AFF]">{totalSessions}</span>
                    </div>
                    <div className="text-sm text-gray-600">Sessões Concluídas</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF9500]" />
                      <span className="text-2xl text-[#FF9500]">{upcomingSessions}</span>
                    </div>
                    <div className="text-sm text-gray-600">Sessões Agendadas</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#34C759]" />
                      <span className="text-2xl text-[#34C759]">{totalSessions + upcomingSessions}</span>
                    </div>
                    <div className="text-sm text-gray-600">Total Registradas</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                      <span className="text-2xl text-[#FF3B30]">—</span>
                    </div>
                    <div className="text-sm text-gray-600">Canceladas</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Taxa de Cancelamento</span>
                    <span className="text-gray-500">Não disponível</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Nenhuma disponibilidade configurada para este especialista.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
