import { ArrowLeft, User, Lock, Globe, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Colaboradores({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { language, setLanguage, t } = useLanguage();
    const [name, setName] = useState('Maria Santos');
    const [email, setEmail] = useState('maria.santos@empresa.pt');
    const [phone, setPhone] = useState('+351 912 345 678');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSaveProfile = () => {
        // Save profile logic here
        alert(t('profile.saveSuccess'));
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert(t('password.mismatch'));
            return;
        }
        if (newPassword.length < 6) {
            alert(t('password.tooShort'));
            return;
        }
        // Change password logic here
        alert(t('password.success'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

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
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                                    {t('profile.email')}
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
                                    {t('profile.phone')}
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
                            <div>
                                <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                                    {t('password.current')}
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
                                    {t('password.new')}
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
                                    {t('password.confirm')}
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
                </div>
            </div>
        </div>
    );
}
