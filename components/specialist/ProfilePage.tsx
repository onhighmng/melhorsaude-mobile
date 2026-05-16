import { ArrowLeft, User, Lock, Globe, Briefcase, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSpecialist } from '@/contexts/SpecialistContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export function ProfilePage({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { language, setLanguage, t } = useLanguage();
    const { user, refreshProfile: refreshAuthProfile } = useAuth();
    const { specialistProfile, refreshProfile } = useSpecialist();

    // Profile Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [languages, setLanguagesInput] = useState('');

    // Password Form States
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // UI States
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (specialistProfile && user) {
            setName(specialistProfile.profile?.full_name || '');
            // Use contact email from metadata if available, otherwise auth email
            const metadata = specialistProfile.metadata as Record<string, any> || {};
            const contactEmail = metadata.contact_email || specialistProfile.profile?.email || user.email || '';
            setEmail(contactEmail);

            const contactPhone = metadata.contact_phone || specialistProfile.profile?.phone || '';
            setPhone(contactPhone);

            setTitle(specialistProfile.professional_title || '');
            setExperience(specialistProfile.years_of_experience?.toString() || '');

            let langs = '';
            if (metadata.languages) {
                langs = String(metadata.languages);
            } else if (specialistProfile.languages && Array.isArray(specialistProfile.languages)) {
                langs = specialistProfile.languages.join(', ');
            }
            setLanguagesInput(langs);
        }
    }, [specialistProfile, user]);

    const handleSaveProfile = async () => {
        if (!user) return;

        setIsSaving(true);
        setMessage(null);

        try {
            const metadata = specialistProfile?.metadata as Record<string, any> || {};
            const updatedMetadata = {
                ...metadata,
                contact_email: email.trim(),
                contact_phone: phone.trim(),
                languages: languagesInput,
            };

            // Update Profile (standard user data)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: name.trim(),
                    phone: phone.trim(),
                    email: email.trim(),
                })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // Update Specialist specific data
            const languagesArray = languagesInput
                .split(',')
                .map((lang) => lang.trim())
                .filter(Boolean);

            const { error: specialistError } = await supabase
                .from('specialists')
                .update({
                    professional_title: title.trim(),
                    years_of_experience: experience ? Number(experience) : null,
                    languages: languagesArray.length > 0 ? languagesArray : null,
                    metadata: updatedMetadata,
                    updated_at: new Date().toISOString(),
                })
                .eq('user_id', user.id);

            if (specialistError) throw specialistError;

            await refreshAuthProfile();
            await refreshProfile();
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error: any) {
            console.error('Error saving profile:', error);
            setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('As palavras-passe não coincidem.'); // Keeping simple alert as strictly requested or using UI message? Source uses alert.
            return;
        }
        if (newPassword.length < 6) {
            alert('A palavra-passe deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;

            alert('Palavra-passe atualizada com sucesso!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            console.error('Error changing password:', error);
            alert('Erro ao atualizar palavra-passe: ' + error.message);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto bg-blue-100 min-h-screen">
            <button
                onClick={() => onNavigate('definicoes')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
            </button>
            <h1 className="text-5xl md:text-6xl mb-8 font-bold text-gray-900 font-pacifico">
                Meu Perfil
            </h1>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
                    {/* Profile Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl text-gray-900 font-manrope font-bold">
                                Dados Pessoais
                            </h2>
                        </div>

                        {message && (
                            <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    Nome Completo
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
                                    Email
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
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                />
                            </div>

                            {/* New Specialist Fields */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="w-4 h-4 text-blue-500" />
                                    <label className="block text-sm text-gray-600 font-inter font-semibold">
                                        Título Profissional
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Psicólogo Clínico"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                        Anos de Experiência
                                    </label>
                                    <input
                                        type="number"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                        Idiomas
                                    </label>
                                    <input
                                        type="text"
                                        value={languages}
                                        onChange={(e) => setLanguagesInput(e.target.value)}
                                        placeholder="PT, EN"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-manrope font-bold"
                            >
                                {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                {isSaving ? 'Guardando...' : 'Guardar Alterações'}
                            </button>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Lock className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl text-gray-900 font-manrope font-bold">
                                Alterar Password
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Note: Supabase doesn't strictly verify current password for updates if logged in, but we can keep the field for UI consistency or if we want to add re-auth later */}

                            <div>
                                <label className="block text-sm mb-2 text-gray-600 font-inter font-semibold">
                                    Nova Password
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
                                    Confirmar Nova Password
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
                                Atualizar Password
                            </button>
                        </div>
                    </div>

                    {/* Language Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Globe className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl text-gray-900 font-manrope font-bold">
                                Idioma da Plataforma
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
                                        Português
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
                                        English
                                    </span>
                                </div>
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 text-center font-inter">
                            Selecionado: <span className="font-semibold">{language === 'pt' ? 'Português' : 'English'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
