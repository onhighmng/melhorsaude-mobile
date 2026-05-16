import { ArrowLeft, User, Lock, Globe, LogOut, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
// DISABLED: import from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export function Colaboradores({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email, phone')
          .eq('id', user.id as any)
          .single();

        if (profile) {
          setName((profile as any).full_name || '');
          setEmail((profile as any).email || '');
          setPhone((profile as any).phone || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone: phone,
          updated_at: new Date().toISOString()
        } as any)
        .eq('id', user.id as any);

      if (error) throw error;
      alert(t('perfil.profileUpdated'));
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(t('perfil.errorSave'));
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert(t('perfil.passwordMismatch'));
      return;
    }
    if (newPassword.length < 6) {
      alert(t('perfil.passwordTooShort'));
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      alert(t('perfil.passwordChanged'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert(t('perfil.errorChangePassword'));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => onNavigate('Dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('common.back')}</span>
        </button>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('admin.nav.logout')}</span>
        </button>
      </div>
      <h1 className="text-5xl md:text-6xl mb-8 font-bold" style={{ fontFamily: 'Pacifico, cursive' }}>
        {t('perfil.title')}
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
                {t('perfil.personalData')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('perfil.name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('perfil.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('perfil.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <button
                onClick={handleSaveProfile}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
              >
                {t('perfil.save')}
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
                {t('perfil.security')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('perfil.currentPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                  {t('perfil.newPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
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
                  {t('perfil.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    style={{ fontFamily: 'Inter, sans-serif' }}
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
                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}
              >
                {t('perfil.changePassword')}
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
                {t('perfil.language')}
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
                    {t('perfil.portuguese')}
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
                    {t('perfil.english')}
                  </span>
                </div>
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('perfil.languageCurrently')} <span className="font-semibold">{language === 'pt' ? t('perfil.portuguese') : t('perfil.english')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
