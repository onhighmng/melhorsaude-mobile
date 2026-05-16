import { ArrowLeft, User, Lock, Globe, Loader2, LogOut, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { logger } from '@/utils/logger';

export function Colaboradores({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [currentPassword, setCurrentPassword] = useState(''); // Not used for Supabase update usually, but kept for UI if needed
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch initial profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setName(data.full_name || '');
          setEmail(user.email || ''); // Auth email is better source
          setPhone(data.phone || '');
        }
      } catch (error) {
        logger.error('Error fetching profile', { error });
        toast({ title: "Erro ao carregar perfil", variant: "destructive" });
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoadingProfile(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone: phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({ title: t('profile.saveSuccess') || "Perfil atualizado com sucesso!" });
    } catch (error) {
      logger.error('Error updating profile', { error });
      toast({ title: "Erro ao atualizar perfil", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: t('password.mismatch') || "As palavras-passe não coincidem", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: t('password.tooShort') || "A palavra-passe deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }

    setLoadingPass(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({ title: t('password.success') || "Palavra-passe alterada com sucesso!" });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      logger.error('Error updating password', { error });
      toast({ title: "Erro ao alterar palavra-passe", description: "Verifique se iniciou sessão recentemente.", variant: "destructive" });
    } finally {
      setLoadingPass(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen">
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('nav.back')}</span>
      </button>
      <h1 className="text-5xl md:text-6xl mb-8 font-bold" style={{ fontFamily: 'Pacifico, cursive' }}>
        {t('profile.title')}
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                {t('profile.section')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  disabled={loadingProfile}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('profile.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  disabled // Email usually can't be changed easily
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('profile.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  disabled={loadingProfile}
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={loadingProfile}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
              >
                {loadingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('profile.save')}
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                {t('password.section')}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Removed Current Password Requirement for simplicity/Supabase specific flow, usually Auth requires revalidation but updateUser works if session active */}

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('password.new')}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    disabled={loadingPass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('password.confirm')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    disabled={loadingPass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loadingPass}
                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
              >
                {loadingPass && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('password.change')}
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                {t('language.section')}
              </h2>
            </div>

            <div className="flex gap-4 max-w-md mx-auto">
              <button
                onClick={() => setLanguage('pt')}
                className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${language === 'pt'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">🇵🇹</span>
                  <span
                    className={language === 'pt' ? 'text-emerald-700' : 'text-gray-700'}
                    style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
                  >
                    {t('language.portuguese')}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${language === 'en'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">🇬🇧</span>
                  <span
                    className={language === 'en' ? 'text-emerald-700' : 'text-gray-700'}
                    style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
                  >
                    {t('language.english')}
                  </span>
                </div>
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('language.selected')} <span className="font-semibold">{language === 'pt' ? t('language.portuguese') : t('language.english')}</span>
            </p>
          </div>

          {/* Sign Out Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                {t('auth.signOut') || 'Terminar Sessão'}
              </h2>
            </div>

            <button
              onClick={() => {
                toast({ title: "A terminar sessão..." });
                signOut();
              }}
              className="w-full px-6 py-4 bg-red-50 text-red-600 rounded-lg border-2 border-red-100 hover:bg-red-100 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
            >
              <LogOut className="w-5 h-5" />
              {t('auth.signOutButton') || 'Sair da Conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}