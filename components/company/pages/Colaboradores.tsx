import { ArrowLeft, User, Lock, Globe, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export function Colaboradores({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { language, setLanguage, t } = useLanguage();
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            try {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, email, phone')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setName(profile.full_name || '');
                    setEmail(profile.email || '');
                    setPhone(profile.phone || '');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
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
                })
                .eq('id', user.id);

            if (error) throw error;
            alert(t('profile.saveSuccess'));
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erro ao guardar perfil');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert(t('password.mismatch'));
            return;
        }
        if (newPassword.length < 6) {
            alert(t('password.tooShort'));
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            alert(t('password.success'));
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Erro ao alterar password');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
            <button
                onClick={() => onNavigate('Dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('nav.back')}</span>
            </button>
            <h1 className="text-5xl md:text-6xl mb-8 font-bold font-pacifico">
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
                            <h2 className="text-2xl font-manrope font-bold">
                                {t('profile.section')}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('profile.name')}
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('profile.email')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('profile.phone')}
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                />
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-manrope font-bold"
                            >
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
                            <h2 className="text-2xl font-manrope font-bold">
                                {t('password.section')}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('password.current')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 font-inter"
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
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('password.new')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 font-inter"
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
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    {t('password.confirm')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 font-inter"
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
                                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-manrope font-bold"
                            >
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
                            <h2 className="text-2xl font-manrope font-bold">
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
                                        className={language === 'pt' ? 'text-emerald-700 font-manrope font-bold' : 'text-gray-700 font-manrope font-bold'}
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
                                        className={language === 'en' ? 'text-emerald-700 font-manrope font-bold' : 'text-gray-700 font-manrope font-bold'}
                                    >
                                        {t('language.english')}
                                    </span>
                                </div>
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 text-center font-inter">
                            {t('language.selected')} <span className="font-semibold">{language === 'pt' ? t('language.portuguese') : t('language.english')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
