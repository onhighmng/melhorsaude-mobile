import { useState, useEffect } from 'react';
// DISABLED: import from 'react-router-dom';
import { LogOut, Eye, EyeOff } from 'lucide-react';
// DISABLED: import from 'sonner';

import svgPaths from "./imports/svg-yynwetuyto";
import imgMelhorSaudeTransparentLogo1 from "@/assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "@/assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';

// Helper to cast supabase query builder to bypass strict type checks on updates
const getProfilesQuery = () => supabase.from('profiles') as any;

interface PerfilContentProps {
    setActiveTab?: (tab: string) => void;
}



export function PerfilContent({ }: PerfilContentProps) {
    const { language, setLanguage, t } = useLanguage();
    const { user, profile, signOut, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Profile data from auth context
    const [userData, setUserData] = useState({
        name: profile?.full_name || '',
        email: profile?.email || user?.email || '',
        phone: profile?.phone || '',
    });

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await getProfilesQuery()
                .update({
                    full_name: userData.name,
                    phone: userData.phone,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user?.id || '');

            if (error) throw error;

            await refreshProfile();
            setIsEditingProfile(false);
            toast.success(t('perfil.profileUpdated'));
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Erro ao atualizar perfil');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.new !== passwords.confirm) {
            toast.error(t('perfil.passwordMismatch') || 'As senhas não coincidem');
            return;
        }

        if (passwords.new.length < 6) {
            toast.error(t('perfil.passwordTooShort') || 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        // Initial loading state
        const toastId = toast.loading(t('perfil.updatingPassword') || 'Atualizando senha...');

        try {
            // We removed the manual signInWithPassword verification here because it was causing
            // session state issues (thrashing) and UI freezes. Supabase's updateUser is sufficient
            // as it requires an active authenticated session.

            // Create a timeout promise to prevent infinite hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('A operação demorou muito tempo. Por favor, tente novamente.')), 15000)
            );

            // Race the update against the timeout
            const result = await Promise.race([
                supabase.auth.updateUser({ password: passwords.new }),
                timeoutPromise
            ]) as { data: { user: any } | { user: null }, error: any };

            const { error } = result;

            if (error) throw error;

            toast.success(t('perfil.passwordChanged') || 'Senha alterada com sucesso!', { id: toastId });
            setIsChangingPassword(false);
            setPasswords({ current: '', new: '', confirm: '' });

        } catch (err: any) {
            console.error('Error changing password:', err);
            toast.error(err.message || 'Erro ao alterar senha', { id: toastId });
        }
    };

    const handleLanguageChange = async (lang: 'pt' | 'en') => {
        setLanguage(lang);

        if (user) {
            try {
                // Update specific column 'language' based on verified DB schema
                const { error } = await getProfilesQuery()
                    .update({
                        language: lang,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id);

                if (error) {
                    console.error('Error saving language preference:', error);
                }
            } catch (err) {
                console.error('Error saving language preference:', err);
            }
        }

        toast.success(t('perfil.languageChanged'));
    };



    // Load language and theme from profile on mount
    // Language sync is now handled centrally in UserDashboard.tsx to avoid conflicts
    // useEffect(() => { ... }, [profile, setLanguage]);

    return (
        <div className="bg-gradient-to-b from-[#e8f4f8] to-[#b8e1f0] pt-[23.997px] px-[15.992px] pb-24">
            {/* Header with Title and Logo */}
            <div className="relative mb-8">
                <div className="h-[69.993px] w-[232.993px]">
                    <p className="font-pacifico font-normal leading-[36px] text-[#1a1a1a] text-[36px] tracking-[0.0703px]">{t('perfil.title')}</p>
                </div>

                {/* Logo - Top Right */}
                {/* Logo - Top Right - Updated */}
                <div className="absolute right-0 top-[-20px] flex flex-col items-center justify-center w-[120px]">
                    <img alt="" className="w-14 h-14 object-contain mb-1" src={imgMelhorSaudeTransparentLogo1} />
                    <img alt="Melhor Saúde" className="w-full h-auto object-contain" src={imgMelhorSaudeTransparentClean1} />
                </div>
            </div>

            {/* Cards Container - Flex Layout */}
            <div className="flex flex-col gap-5 w-full max-w-[343px]">
                {/* Personal Details Card */}
                <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[20px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                        <p className="font-montserrat font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.personalData')}</p>
                        {!isEditingProfile && (
                            <button
                                onClick={() => setIsEditingProfile(true)}
                                className="hover:opacity-70 transition-opacity"
                            >
                                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[21px] text-[#0046a2] text-[15px]">{t('perfil.edit')}</p>
                            </button>
                        )}
                    </div>

                    {isEditingProfile ? (
                        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.name')}</label>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-inter font-normal text-[15px] text-[#1a1a1a]"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.email')}</label>
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-inter font-normal text-[15px] text-[#1a1a1a]"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.phone')}</label>
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-inter font-normal text-[15px] text-[#1a1a1a]"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0046a2] text-white py-3.5 rounded-[12px] hover:bg-[#003580] transition-colors font-['Inter:Bold',sans-serif] text-[15px]"
                                >
                                    {t('perfil.save')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingProfile(false)}
                                    className="flex-1 bg-white/80 text-[#0046a2] py-3.5 rounded-[12px] hover:bg-white transition-colors font-['Inter:Bold',sans-serif] text-[15px]"
                                >
                                    {t('perfil.cancel')}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col w-full">
                            <div className="flex items-center py-3 w-full border-b border-[rgba(0,0,0,0.05)]">
                                <div className="w-[96px] shrink-0">
                                    <p className="font-inter font-semibold font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.name')}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-inter font-normal font-normal leading-[22.5px] text-[#1a1a1a] text-[15px] truncate">{userData.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center py-3 w-full border-b border-[rgba(0,0,0,0.05)]">
                                <div className="w-[96px] shrink-0">
                                    <p className="font-inter font-semibold font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.email')}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-inter font-normal font-normal leading-[22.5px] text-[#1a1a1a] text-[15px] break-all">{userData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center py-3 w-full">
                                <div className="w-[96px] shrink-0">
                                    <p className="font-inter font-semibold font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.phone')}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-inter font-normal font-normal leading-[22.5px] text-[#1a1a1a] text-[15px] truncate">{userData.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Security Card */}
                <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[20px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                    <p className="font-montserrat font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.security')}</p>

                    {isChangingPassword ? (
                        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.currentPassword')}</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-inter font-normal text-[15px] text-[#1a1a1a] pr-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showCurrentPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.newPassword')}</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-['Inter:Regular',sans-serif] text-[15px] text-[#1a1a1a] pr-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showNewPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inter font-medium text-[13px] text-[#6b7280]">{t('perfil.confirmPassword')}</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-['Inter:Regular',sans-serif] text-[15px] text-[#1a1a1a] pr-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0046a2] text-white py-3.5 rounded-[12px] hover:bg-[#003580] transition-colors font-['Inter:Bold',sans-serif] text-[15px]"
                                >
                                    {t('perfil.save')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsChangingPassword(false)}
                                    className="flex-1 bg-white/80 text-[#0046a2] py-3.5 rounded-[12px] hover:bg-white transition-colors font-['Inter:Bold',sans-serif] text-[15px]"
                                >
                                    {t('perfil.cancel')}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsChangingPassword(true)}
                            className="bg-[rgba(255,255,255,0.6)] h-[50.481px] rounded-[16px] w-full hover:bg-white/80 transition-all flex items-center justify-between px-[20px]"
                        >
                            <p className="font-inter font-semibold font-semibold leading-[22.5px] text-[#1a1a1a] text-[15px]">{t('perfil.changePassword')}</p>
                            <div className="size-[20px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9995 19.9995">
                                    <g id="Icon">
                                        <path d={svgPaths.p1cddef80} id="Vector" stroke="#013183" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66663" />
                                    </g>
                                </svg>
                            </div>
                        </button>
                    )}
                </div>



                {/* Language Card */}
                <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[15.992px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                    <p className="font-montserrat font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.language')}</p>

                    <div className="flex flex-col gap-[9.995px] w-full">
                        <button
                            onClick={() => handleLanguageChange('pt')}
                            className={`h-[55.802px] relative rounded-[16px] w-full transition-all flex items-center justify-between px-[21.909px] ${language === 'pt' ? 'bg-[rgba(0,70,162,0.1)] border-[1.909px] border-[#0046a2]' : 'bg-[rgba(255,255,255,0.6)] hover:bg-white/80 border-[1.909px] border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[24px]">🇵🇹</span>
                                <p className={`font-inter font-medium font-medium leading-[22.5px] text-[15px] ${language === 'pt' ? 'text-[#0046a2]' : 'text-[#1a1a1a]'
                                    }`}>{t('perfil.portuguese')}</p>
                            </div>
                            {language === 'pt' && (
                                <div className="bg-[#0046a2] rounded-full size-[23.997px] flex items-center justify-center">
                                    <div className="size-[15.992px]">
                                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9917 15.9917">
                                            <g id="Icon">
                                                <path d={svgPaths.p19c90200} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>

                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`h-[54.3px] relative rounded-[16px] w-full transition-all flex items-center justify-between px-[21.909px] ${language === 'en' ? 'bg-[rgba(0,70,162,0.1)] border-[1.909px] border-[#0046a2]' : 'bg-[rgba(255,255,255,0.6)] hover:bg-white/80 border-[1.909px] border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[24px]">🇬🇧</span>
                                <p className={`font-inter font-medium font-medium leading-[22.5px] text-[15px] ${language === 'en' ? 'text-[#0046a2]' : 'text-[#1a1a1a]'
                                    }`}>{t('perfil.english')}</p>
                            </div>
                            {language === 'en' && (
                                <div className="bg-[#0046a2] rounded-full size-[23.997px] flex items-center justify-center">
                                    <div className="size-[15.992px]">
                                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9917 15.9917">
                                            <g id="Icon">
                                                <path d={svgPaths.p19c90200} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={async () => {
                        try {
                            await signOut();
                            navigate('/login');
                        } catch (error) {
                            console.error('Error signing out:', error);
                        }
                    }}
                    className="w-full bg-red-100/50 hover:bg-red-100 text-red-600 py-4 rounded-[16px] transition-colors font-inter font-semibold text-[15px] flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    {t('nav.logout') || 'Sair'}
                </button>
            </div>
        </div>
    );
}

