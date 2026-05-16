import { User, Bell, Shield, FileText, ChevronRight, Phone, HelpCircle, Eye, EyeOff } from 'lucide-react';
// DISABLED: import from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
// DISABLED: import from 'sonner';

export function DefinicoesContent({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { profile, user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Load user data when component mounts or profile changes
  useEffect(() => {
    if (profile && user) {
      const metadata = (profile.metadata && typeof profile.metadata === 'object')
        ? profile.metadata as Record<string, any>
        : {};

      setProfileData({
        name: profile.full_name || '',
        email: user.email || '',
        phone: profile.phone || ''
      });
      setNotificationsEnabled((metadata.email_notifications as boolean) ?? true);
    }
  }, [profile, user]);

  const handleProfileUpdate = async () => {
    if (!profile?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.name,
          phone: profileData.phone
        } as any)
        .eq('id', profile.id);

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso');
      setIsEditProfileOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('As palavras-passe não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('A palavra-passe deve ter pelo menos 6 caracteres');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast.success('Palavra-passe alterada com sucesso');
      setIsPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Erro ao alterar palavra-passe');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (!profile?.id) return;

    try {
      const currentMetadata = (profile.metadata && typeof profile.metadata === 'object')
        ? profile.metadata as Record<string, any>
        : {};

      const { error } = await supabase
        .from('profiles')
        .update({
          metadata: {
            ...currentMetadata,
            email_notifications: enabled
          }
        } as any)
        .eq('id', profile.id);

      if (error) throw error;

      setNotificationsEnabled(enabled);
      toast.success(enabled ? 'Notificações ativadas' : 'Notificações desativadas');
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('Erro ao atualizar preferências');
    }
  };

  const privacySettings = [
    {
      id: 'seguranca',
      title: 'Segurança',
      subtitle: 'Palavra-passe e autenticação',
      icon: Shield,
      gradient: 'from-green-400 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-400 to-green-600',
    },
  ];

  const preferencesSettings = [
    {
      id: 'notificacoes',
      title: 'Notificações',
      subtitle: 'Push, email e SMS',
      icon: Bell,
      gradient: 'from-orange-400 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      toggle: true,
      toggleValue: notificationsEnabled,
      toggleAction: handleNotificationToggle,
    },
  ];

  const supportSettings = [
    {
      id: 'suporte',
      title: 'Suporte',
      subtitle: 'Contacte-nos para ajuda',
      icon: HelpCircle,
      gradient: 'from-blue-400 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      id: 'termos',
      title: 'Termos e Condições',
      subtitle: 'Leia os nossos termos de serviço',
      icon: FileText,
      gradient: 'from-gray-400 to-gray-600',
      iconBg: 'bg-gradient-to-br from-gray-400 to-gray-600',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 w-full pb-24 md:pb-8">
      {/* Profile Header Card */}
      <div


        className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-white/20"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-gray-900 text-xl md:text-2xl mb-1">{profileData.name || 'Utilizador'}</h2>
            <p className="text-gray-600 text-sm md:text-base">{profileData.email}</p>
          </div>
          <button
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 text-sm md:text-base"
            onClick={() => setIsEditProfileOpen(true)}
          >
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Privacy Section */}
      <SettingsSection
        title="Privacidade & Segurança"
        settings={privacySettings}
        onSettingClick={(id) => {
          if (id === 'seguranca') {
            setIsPasswordDialogOpen(true);
          }
        }}
      />

      {/* Preferences Section */}
      <SettingsSection title="Preferências" settings={preferencesSettings} />

      {/* Support Section */}
      <SettingsSection
        title="Suporte"
        settings={supportSettings}
        onSettingClick={(id) => {
          if (id === 'suporte') {
            setActiveTab('help');
          } else if (id === 'termos') {
            setActiveTab('terms');
          }
        }}
      />

      {/* Logout Button */}
      <button


 
 
        className="w-full bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl px-6 py-4 md:px-8 md:py-5 shadow-lg border border-white/20 text-red-500 hover:bg-red-50/40 transition-all flex items-center justify-center gap-3"
        onClick={async () => {
          try {
            await signOut();
          } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Erro ao sair da conta');
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span className="text-sm md:text-base">Sair</span>
      </button>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Perfil e Contacto</DialogTitle>
            <DialogDescription>Atualize suas informações de perfil e contacto.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Profile Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-purple-600">
                <User className="w-5 h-5" />
                <h3 className="text-gray-900">Informações de Perfil</h3>
              </div>
              <div className="space-y-4 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Digite seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="Digite seu email"
                  />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Phone className="w-5 h-5" />
                <h3 className="text-gray-900">Informações de Contacto</h3>
              </div>
              <div className="space-y-4 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+351 912 345 678"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleProfileUpdate}
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'A guardar...' : 'Guardar Alterações'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alterar Palavra-passe</DialogTitle>
            <DialogDescription>Atualize sua palavra-passe para maior segurança.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Password Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-purple-600">
                <Shield className="w-5 h-5" />
                <h3 className="text-gray-900">Palavra-passe</h3>
              </div>
              <div className="space-y-4 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Palavra-passe Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={isPasswordDialogOpen ? (showPasswords.current ? "text" : "password") : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Digite sua palavra-passe atual"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Palavra-passe</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Digite sua nova palavra-passe"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Palavra-passe</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirme sua nova palavra-passe"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsPasswordDialogOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'A guardar...' : 'Guardar Alterações'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div >
  );
}

function SettingsSection({ title, settings, onSettingClick }: { title: string; settings: any[]; onSettingClick?: (id: string) => void }) {
  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-gray-700 px-2 md:px-4 text-sm md:text-base">{title}</h3>
      <div


        className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg border border-white/20 overflow-hidden"
      >
        {settings.map((setting, index) => (
          <SettingItem
            key={setting.id}
            setting={setting}
            isLast={index === settings.length - 1}
            onSettingClick={onSettingClick}
          />
        ))}
      </div>
    </div>
  );
}

function SettingItem({ setting, isLast, onSettingClick }: { setting: any; isLast: boolean; onSettingClick?: (id: string) => void }) {
  const Icon = setting.icon;

  const handleClick = () => {
    if (!setting.toggle && setting.id) {
      // Handle navigation for non-toggle items
      if (onSettingClick) {
        onSettingClick(setting.id);
      } else {
        console.log('Navigate to:', setting.id);
      }
    }
  };

  return (
    <div
 
 
      className={`w-full px-4 md:px-6 py-4 md:py-5 cursor-pointer transition-colors ${!isLast ? 'border-b border-gray-200/50' : ''
        }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* Icon with gradient background */}
        <div className={`${setting.iconBg} w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 mb-0.5 text-sm md:text-base">
            {setting.title}
          </h4>
          <p className="text-gray-500 text-xs md:text-sm">
            {setting.subtitle}
          </p>
        </div>

        {/* Action - Toggle or Chevron */}
        {setting.toggle ? (
          <Switch
            checked={setting.toggleValue}
            onCheckedChange={(checked) => {
              setting.toggleAction(checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}