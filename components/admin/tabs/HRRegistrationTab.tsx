import { useState, useEffect } from 'react';
import { Building2, Mail, Users, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// DISABLED: import from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface HRUser {
  id: string;
  email: string;
  full_name: string | null;
  company_id: string | null;
  is_hr_confirmed: boolean;
  created_at: string;
  company?: {
    id: string;
    company_name: string;
  } | null;
}

export default function HRRegistrationTab() {
  const [hrUsers, setHrUsers] = useState<HRUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<HRUser[]>([]);
  const [rejectingUserId, setRejectingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchHRUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(hrUsers);
    } else {
      const filtered = hrUsers.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, hrUsers]);

  const fetchHRUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          company_id,
          is_hr_confirmed,
          created_at,
          company:companies!profiles_company_id_fkey (
            id,
            company_name
          )
        `)
        .eq('primary_role', 'company_hr')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setHrUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error fetching HR users:', error);
      toast.error('Erro ao carregar utilizadores RH');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveHR = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_hr_confirmed: true })
        .eq('id', userId);

      if (error) throw error;

      toast.success('RH aprovado com sucesso');
      fetchHRUsers();
    } catch (error) {
      console.error('Error approving HR:', error);
      toast.error('Erro ao aprovar RH');
    }
  };

  const handleRejectHR = (userId: string) => {
    setRejectingUserId(userId);
  };

  const confirmRejectHR = async () => {
    if (!rejectingUserId) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_hr_confirmed: false, primary_role: 'user' })
        .eq('id', rejectingUserId);

      if (error) throw error;

      toast.success('RH rejeitado');
      fetchHRUsers();
    } catch (error) {
      console.error('Error rejecting HR:', error);
      toast.error('Erro ao rejeitar RH');
    } finally {
      setRejectingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando registos RH...</p>
        </div>
      </div>
    );
  }

  const pendingUsers = filteredUsers.filter(u => !u.is_hr_confirmed);
  const approvedUsers = filteredUsers.filter(u => u.is_hr_confirmed);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{approvedUsers.length}</p>
              <p className="text-sm text-gray-600">Aprovados</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{hrUsers.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          type="text"
          placeholder="Procurar registos RH..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Pending Registrations */}
      {pendingUsers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registos Pendentes</h3>
          <div className="space-y-3">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.full_name || 'Nome não disponível'}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{user.company?.company_name || 'Sem empresa'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Registado em {new Date(user.created_at).toLocaleDateString('pt-PT')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApproveHR(user.id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      onClick={() => handleRejectHR(user.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Registrations */}
      {approvedUsers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">RH Aprovados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    Aprovado
                  </Badge>
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{user.full_name || 'Nome não disponível'}</h4>
                <p className="text-sm text-gray-500 mb-3">{user.email}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate">{user.company?.company_name || 'Sem empresa'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(user.created_at).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'Nenhum registo RH encontrado' : 'Nenhum registo RH disponível'}
        </div>
      )}

      <AlertDialog open={!!rejectingUserId} onOpenChange={(open) => !open && setRejectingUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeitar Registo de RH</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja rejeitar este registo de RH? O utilizador voltará a ter o papel de utilizador padrão.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={confirmRejectHR}
            >
              Rejeitar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
