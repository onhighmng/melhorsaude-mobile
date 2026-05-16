import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
// DISABLED: import from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  Trash2,
  Edit,
  Plus,
  Check,
  Copy,

  X,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SpecialistFeedbackTable } from '../SpecialistFeedbackTable';

// Interfaces
interface Specialist {
  id: string;
  user_id: string;
  profile: {
    full_name: string;
    email: string;
    phone: string;
  };
  pillars: string[];
  sessions: number;
  rating: number;
  status: 'active' | 'inactive';
  joined_at: string;
}

interface SpecialistInvite {
  id: string;
  code: string;
  email: string | null;
  pillars: string[];
  status: 'pending' | 'accepted' | 'expired';
  created_at: string;
  expires_at: string | null;
}

export function RedeEspecialistas() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [invites, setInvites] = useState<SpecialistInvite[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog States
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);

  // New Invite State
  const [newInvite, setNewInvite] = useState<{ email: string; pillars: string[] }>({
    email: '',
    pillars: []
  });

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    await Promise.all([fetchSpecialists(), fetchInvites()]);
    setLoading(false);
  }

  async function fetchSpecialists() {
    try {
      const { data, error } = await supabase
        .from('specialists')
        .select('id, user_id, profile:profiles!specialists_user_id_fkey(full_name, email, phone), specialist_pillars(pillar_code), average_rating, total_reviews, created_at, is_active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted: Specialist[] = (data || []).map((spec: any) => ({
        id: spec.id,
        user_id: spec.user_id,
        profile: {
          full_name: spec.profile?.full_name || 'N/A',
          email: spec.profile?.email || 'N/A',
          phone: spec.profile?.phone || 'N/A'
        },
        pillars: spec.specialist_pillars?.map((p: any) => p.pillar_code) || [],
        sessions: spec.total_reviews || 0,
        rating: Number(spec.average_rating) || 0,
        status: spec.is_active ? 'active' : 'inactive',
        joined_at: new Date(spec.created_at).toLocaleDateString()
      }));

      setSpecialists(formatted);
    } catch (error) {
      console.error('Error fetching specialists:', error);
    }
  }

  async function fetchInvites() {
    try {
      const { data, error } = await supabase
        .from('specialist_invites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch invites', error);
        return;
      }
      setInvites(data || []);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  }

  const handleGenerateInvite = async () => {
    if (newInvite.pillars.length === 0) {
      alert('Selecione pelo menos um pilar.');
      return;
    }

    try {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { error } = await supabase
        .from('specialist_invites')
        .insert({
          code,
          email: newInvite.email || null,
          pillars: newInvite.pillars,
          status: 'pending'
        });

      if (error) throw error;

      setGeneratedCode(code);
      fetchInvites();
      setNewInvite({ email: '', pillars: [] });
    } catch (error) {
      console.error('Error generating invite:', error);
      alert(t('admin.specialists.alert.inviteError'));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getPillarLabel = (code: string) => {
    const key = `pillar.${code} Short`;
    // @ts-ignore
    return t(key) !== key ? t(key) : code;
  };

  const togglePillar = (code: string) => {
    setNewInvite(prev => {
      const exists = prev.pillars.includes(code);
      if (exists) {
        return { ...prev, pillars: prev.pillars.filter(p => p !== code) };
      } else {
        return { ...prev, pillars: [...prev.pillars, code] };
      }
    });
  };

  const handleDeleteSpecialist = async () => {
    if (!selectedSpecialist) return;
    try {
      const { error } = await supabase
        .from('specialists')
        .delete()
        .eq('id', selectedSpecialist);

      if (error) throw error;

      await fetchSpecialists();
      setShowDeleteDialog(false);
      setSelectedSpecialist(null);
    } catch (error) {
      console.error('Error deleting specialist:', error);
      alert(t('admin.specialists.alert.deleteError'));
    }
  };

  const pillarOptions = ['mental', 'physical', 'financial', 'legal'];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.specialists.headerTitle')}</h1>
          <p className="text-gray-500 mt-1">{t('admin.specialists.managementDesc')}</p>
        </div>
        <button
          onClick={() => {
            setGeneratedCode(null);
            setShowAddDialog(true);
            setNewInvite({ email: '', pillars: [] });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>{t('admin.specialists.addSpecialist')}</span>
        </button>
      </div>

      {/* Invites Section */}
      {invites.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">{t('admin.specialists.invitesTitle')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">{t('admin.specialists.code')}</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">{t('admin.specialists.pillar')}</th>
                  <th className="px-6 py-3">{t('admin.specialists.status')}</th>
                  <th className="px-6 py-3 text-right">Criado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invites.map((invite) => (
                  <tr key={invite.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-rose-600">
                      <div className="flex items-center gap-2">
                        {invite.code}
                        <button
                          onClick={() => copyToClipboard(invite.code)}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition"
                          title="Copiar código"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{invite.email || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {invite.pillars.map(p => (
                          <span key={p} className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            {getPillarLabel(p)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline - flex items - center px - 2 py - 1 rounded - full text - xs font - medium capitalize ${invite.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                        invite.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-100' :
                          'bg-gray-100 text-gray-800'
                        } `}>
                        {invite.status === 'pending' ? 'Pendente' : invite.status === 'accepted' ? 'Aceite' : invite.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-right font-mono text-xs">
                      {new Date(invite.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Specialists Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-900">{t('admin.specialists.registered')}</h2>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium text-sm border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">{t('admin.specialists.tableName')}</th>
                <th className="px-6 py-3">{t('admin.specialists.tableEmail')}</th>
                <th className="px-6 py-3">{t('admin.specialists.tablePillar')}</th>
                <th className="px-6 py-3">{t('admin.specialists.tableSessions')}</th>
                <th className="px-6 py-3">{t('admin.specialists.tableRating')}</th>
                <th className="px-6 py-3 text-right">{t('admin.specialists.tableActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {specialists.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum especialista encontrado.
                  </td>
                </tr>
              ) : (
                specialists.map((specialist) => (
                  <tr key={specialist.id} className="hover:bg-gray-50/50 transition duration-150 group">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {specialist.profile.full_name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{specialist.profile.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {specialist.pillars.map((p) => {
                          let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
                          if (p === 'mental') colorClass = 'bg-blue-50 text-blue-700 border-blue-100';
                          if (p === 'physical') colorClass = 'bg-yellow-50 text-yellow-700 border-yellow-100';
                          if (p === 'financial') colorClass = 'bg-green-50 text-green-700 border-green-100';
                          if (p === 'legal') colorClass = 'bg-purple-50 text-purple-700 border-purple-100';

                          return (
                            <span key={p} className={`inline - flex px - 2 py - 0.5 rounded text - xs font - medium border ${colorClass} `}>
                              {getPillarLabel(p)}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{specialist.sessions}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900">{(specialist.rating > 5 ? specialist.rating / 2 : specialist.rating).toFixed(1)}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSpecialist(specialist.id);
                            setShowFeedbackDialog(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition"
                          title="Ver Feedback"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSpecialist(specialist.id);
                            setShowDeleteDialog(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('admin.specialists.addNewTitle')}</h3>
              <button onClick={() => setShowAddDialog(false)} className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!generatedCode ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('admin.specialists.tableEmail')} (Opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    className="w-full"
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.specialists.pillar')}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {pillarOptions.map((code) => {
                      const isSelected = newInvite.pillars.includes(code);
                      return (
                        <button
                          key={code}
                          onClick={() => togglePillar(code)}
                          className={`flex items - center gap - 2 p - 3 rounded - lg border text - sm font - medium transition - all ${isSelected
                            ? 'border-rose-200 bg-rose-50 text-rose-700 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                            } `}
                        >
                          <div className={`w - 4 h - 4 rounded border flex items - center justify - center transition - colors ${isSelected ? 'bg-rose-600 border-rose-600' : 'border-gray-300 bg-white'
                            } `}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          {getPillarLabel(code)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    className="flex-1"
                  >
                    {t('admin.specialists.cancel')}
                  </Button>
                  <Button
                    onClick={handleGenerateInvite}
                    disabled={newInvite.pillars.length === 0}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                  >
                    Gerar Código
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Convite Gerado Com Sucesso!</h4>
                <p className="text-sm text-gray-500 mb-6">Partilhe este código com o especialista para ele se registar na plataforma.</p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-6 group hover:border-gray-300 transition-colors">
                  <code className="text-2xl font-mono font-bold text-gray-900 tracking-wider">{generatedCode}</code>
                  <button
                    onClick={() => copyToClipboard(generatedCode)}
                    className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title={t('admin.specialists.copy')}
                  >
                    {copiedCode ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>

                <Button
                  onClick={() => {
                    setShowAddDialog(false);
                    setGeneratedCode(null);
                  }}
                  className="w-full bg-gray-900 text-white hover:bg-gray-800"
                >
                  Concluído
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('admin.specialists.deleteTitle')}</h3>
            <p className="text-gray-500 mb-6">{t('admin.specialists.deleteDesc')}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1"
              >
                {t('admin.specialists.cancel')}
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-sm"
                onClick={handleDeleteSpecialist}
              >
                {t('admin.specialists.confirmDelete')}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[1000px] h-[80vh] flex flex-col p-6 bg-white dark:bg-gray-950">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-xl text-gray-900 dark:text-white">
              Histórico e Feedback
            </DialogTitle>

          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {selectedSpecialist && (
              <SpecialistFeedbackTable
                specialistId={selectedSpecialist}
                isAdmin={true}
                showFilters={true}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
