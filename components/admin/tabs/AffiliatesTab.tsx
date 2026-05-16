import { useState, useEffect } from 'react';
import { Plus, Search, User, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import AffiliateDetailsModal from '../AffiliateDetailsModal';

interface Specialist {
  id: string;
  user_id: string;
  professional_title: string | null;
  is_active: boolean;
  created_at: string;
  profile?: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
  } | null;
  specialist_pillars?: {
    pillar_code: string;
  }[];
  session_count?: number;
  upcoming_sessions?: number;
}

const PILLAR_LABELS: Record<string, string> = {
  psychological: 'Saúde Mental',
  physical: 'Bem-Estar Físico',
  financial: 'Assistência Financeira',
  legal_social: 'Assistência Jurídica',
};

const PILLAR_COLORS: Record<string, string> = {
  psychological: 'bg-blue-100 text-blue-700',
  physical: 'bg-yellow-100 text-yellow-700',
  financial: 'bg-green-100 text-green-700',
  legal_social: 'bg-purple-100 text-purple-700',
};

export default function AffiliatesTab() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSpecialists(specialists);
    } else {
      const filtered = specialists.filter(specialist =>
        specialist.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.profile?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.professional_title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpecialists(filtered);
    }
  }, [searchTerm, specialists]);

  const fetchSpecialists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('specialists')
        .select(`
          *,
          profile:profiles!specialists_user_id_fkey (
            id,
            full_name,
            email,
            phone
          ),
          specialist_pillars (
            pillar_code
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch session counts for each specialist
      const specialistsWithCounts = await Promise.all(
        (data || []).map(async (specialist) => {
          const { count: totalSessions } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('specialist_id', specialist.id);

          const { count: upcomingSessions } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('specialist_id', specialist.id)
            .in('status', ['confirmed', 'pending'])
            .gte('booking_date', new Date().toISOString().split('T')[0]);

          return {
            ...specialist,
            session_count: totalSessions || 0,
            upcoming_sessions: upcomingSessions || 0,
          };
        })
      );

      setSpecialists(specialistsWithCounts);
      setFilteredSpecialists(specialistsWithCounts);
    } catch (error) {
      console.error('Error fetching specialists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando especialistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Procurar especialistas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-[#007AFF] hover:bg-[#0051D5] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Especialista
        </Button>
      </div>

      {/* Specialists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpecialists.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchTerm ? 'Nenhum especialista encontrado' : 'Nenhum especialista registado'}
          </div>
        ) : (
          filteredSpecialists.map((specialist) => (
            <div
              key={specialist.id}
              onClick={() => setSelectedSpecialist(specialist)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#007AFF]/10 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-[#007AFF]" />
                </div>
                <Badge variant={specialist.is_active ? 'default' : 'secondary'}>
                  {specialist.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                {specialist.profile?.full_name || 'Nome não disponível'}
              </h3>
              {specialist.professional_title && (
                <p className="text-sm text-gray-500 mb-3">{specialist.professional_title}</p>
              )}

              {/* Pillars */}
              {specialist.specialist_pillars && specialist.specialist_pillars.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {specialist.specialist_pillars.slice(0, 2).map((pillar, idx) => (
                    <Badge
                      key={idx}
                      className={`text-xs ${PILLAR_COLORS[pillar.pillar_code] || 'bg-gray-100 text-gray-700'}`}
                      variant="secondary"
                    >
                      {PILLAR_LABELS[pillar.pillar_code] || pillar.pillar_code}
                    </Badge>
                  ))}
                  {specialist.specialist_pillars.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{specialist.specialist_pillars.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{specialist.session_count || 0} sessões</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{specialist.upcoming_sessions || 0} agendadas</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Specialist Details Modal */}
      {selectedSpecialist && (
        <AffiliateDetailsModal
          isOpen={!!selectedSpecialist}
          onClose={() => {
            setSelectedSpecialist(null);
            fetchSpecialists();
          }}
          affiliate={selectedSpecialist}
        />
      )}
    </div>
  );
}
