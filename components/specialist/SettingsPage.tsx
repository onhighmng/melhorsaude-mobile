import { User, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
// DISABLED: import from 'react-router-dom';
import { NotificationsModal } from './NotificationsModal';
import { useSpecialist } from '@/contexts/SpecialistContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export function SettingsPage({ onPageChange }: { onPageChange: (page: string) => void }) {
  const { user } = useAuth();
  const { specialistProfile } = useSpecialist();
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const navigate = useNavigate();

  const settingsCards = [
    {
      id: 'perfil',
      icon: User,
      title: 'Perfil',
      description: specialistProfile?.profile?.full_name || 'Geral Especialista',
      bgColor: 'bg-blue-50',
      onClick: () => onPageChange('perfil'),
    },
    {
      id: 'notificacoes',
      icon: Bell,
      title: 'Notificações',
      description: 'Veja alertas recentes',
      bgColor: 'bg-orange-50',
      onClick: () => setShowNotificationsModal(true),
    },
  ];

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-blue-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2 text-4xl font-bold font-source-serif-pro">Definições</h1>
          <p className="text-gray-600">Gerir as suas configurações pessoais e preferências</p>
        </div>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {settingsCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={card.onClick}
                className={`${card.bgColor} rounded-3xl p-8 shadow-sm hover:scale-[1.02] transition-transform text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-gray-900 text-lg">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 text-red-600 py-5 rounded-3xl transition-all shadow-sm flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5" />
          <span>Terminar Sessão</span>
        </button>
      </div>

      {/* Modals */}
      {showNotificationsModal && (
        <NotificationsModal onClose={() => setShowNotificationsModal(false)} />
      )}
    </div>
  );
}