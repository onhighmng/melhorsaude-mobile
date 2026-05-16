import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { showSuccessToast } from '@/utils/inspoToast';
import { DesktopTopNav } from './DesktopTopNav';
import { DesktopContentWrapper } from './DesktopContentWrapper';
import svgPaths from "@/lib/svg-paths";
import { LogOut, Eye, EyeOff } from 'lucide-react';

// Import Assets
import imgMelhorSaudeTransparentLogo1 from "@/assets/inspo/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "@/assets/inspo/f066e727bc45a7068fb1f989657736b83adf0448.png";
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { supabase } from '@/lib/supabase';
// DISABLED: import from 'react-router-dom';

interface PageProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

// Helper to cast supabase query builder to bypass strict type checks on updates
const getProfilesQuery = () => supabase.from('profiles') as any;

export function PerfilContent({ activeTab, setActiveTab }: PageProps) {
    const { language, setLanguage, t } = useLanguage();
    const { user, profile, signOut, refreshProfile } = useAuth();
    const { sessionBalance } = useUserProgress();
    const navigate = useNavigate();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Password state
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Initialize with real user data if available from profile context
    const [userData, setUserData] = useState({
        name: profile?.full_name || user?.user_metadata?.name || '',
        email: profile?.email || user?.email || '',
        phone: profile?.phone || '',
    });

    // Update local state when profile loads
    useEffect(() => {
        if (profile) {
            setUserData({
                name: profile.full_name || '',
                email: profile.email || user?.email || '',
                phone: profile.phone || '',
            });
        }
    }, [profile, user]);

    // Sessions quota from hook
    const totalSessions = sessionBalance?.company_quota || 0;
    const usedSessions = sessionBalance?.company_used || 0;
    const remainingSessions = sessionBalance?.total_remaining || 0;

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
            showSuccessToast(t('perfil.profileUpdated'));
        } catch (error: any) {
            console.error('Error updating profile:', error);
            // Fallback toast if needed, but showSuccessToast structure suggests avoiding generic error toasts here unless I import one
            // Assuming alert or console for now
            alert(error.message || 'Erro ao atualizar perfil');
        }
    };

    const handleChangePassword = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        // alert('Debug: Handler called'); // DEBUG ALERT
        console.log('Attempting password change...', { newLength: passwords.new.length });

        if (passwords.new !== passwords.confirm) {
            alert(t('perfil.passwordMismatch') || 'As senhas não coincidem');
            return;
        }

        if (passwords.new.length < 6) {
            alert(t('perfil.passwordTooShort') || 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            console.log('Calling supabase.auth.updateUser...');
            const { data, error } = await supabase.auth.updateUser({ password: passwords.new });

            if (error) {
                console.error('Supabase update error:', error);
                throw error;
            }

            console.log('Password update success:', data);
            showSuccessToast(t('perfil.passwordChanged') || 'Senha alterada com sucesso!');
            setIsChangingPassword(false);
            setPasswords({ current: '', new: '', confirm: '' });

        } catch (err: any) {
            console.error('Error changing password:', err);
            alert(`Erro: ${err.message || 'Erro ao alterar senha'}`);
        }
    };

    const handleLanguageChange = async (newLang: 'pt' | 'en') => {
        setLanguage(newLang);

        if (user) {
            try {
                const { error } = await getProfilesQuery()
                    .update({
                        language: newLang,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id);
                if (error) console.error(error);
            } catch (err) {
                console.error(err);
            }
        }

        // Use explicit message based on target language to avoid stale t() state
        const successMessage = newLang === 'pt' ? 'Idioma alterado para Português' : 'Language changed to English';
        showSuccessToast(successMessage);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <DesktopContentWrapper className="bg-gradient-to-b from-[#e8f4f8] to-[#b8e1f0]">
            <DesktopTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="h-full overflow-auto pt-[23.997px] px-[15.992px] pb-24 md:px-[120px] md:py-8">
                {/* Header with Title and Logo */}
                <div className="relative mb-6">
                    <div className="h-[69.993px] w-[232.993px]">
                        <p className="font-['Pacifico',sans-serif] leading-[36px] text-[#1a1a1a] text-[36px] tracking-[0.0703px]">{t('perfil.title')}</p>
                    </div>

                    {/* Logo - Top Right (mobile only) - Kept for fidelity but might be hidden on desktop by grid */}
                    <div className="absolute right-0 top-[-36px] h-[129px] w-[86px] md:hidden">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentLogo1} />
                        <img alt="Melhor Saúde" className="absolute left-[-12px] top-[100px] w-[110px] h-auto" src={imgMelhorSaudeTransparentClean1} />
                    </div>
                </div>

                {/* Cards Container - 2 Column Grid on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[343px] md:max-w-none pb-20">
                    {/* Sessions Quota Card */}
                    <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[12px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col w-full">
                            <p className="font-['Montserrat',sans-serif] font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.quota')}</p>
                        </div>

                        <div className="flex flex-col gap-[11.994px] w-full">
                            <div className="flex items-center justify-between w-full">
                                <p className="font-poppins font-bold leading-[22.5px] text-[#4b5563] text-[18px]">{t('perfil.quota.total')}</p>
                                <p className="font-['Helvetica',sans-serif] leading-[22.5px] text-[#1a1a1a] text-[20px]">{totalSessions}</p>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <p className="font-poppins font-bold leading-[22.5px] text-[#bd0407] text-[15px]">{t('perfil.quota.used')}</p>
                                <p className="font-['Helvetica',sans-serif] leading-[22.5px] text-[#1a1a1a] text-[17px]">{usedSessions}</p>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <p className="font-['Helvetica',sans-serif] font-bold leading-[22.5px] text-[#0046a2] text-[15px]">{t('perfil.quota.available')}</p>
                                <p className="font-['Helvetica',sans-serif] leading-[25.5px] text-[#0046a2] text-[19px]">{remainingSessions}</p>
                            </div>
                        </div>

                        <div className="bg-[#e5e7eb] h-[17px] overflow-clip rounded-full w-full">
                            <div
                                className="bg-gradient-to-b from-[#0046a2] to-[#0066cc] h-[17px] rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${totalSessions > 0 ? (usedSessions / totalSessions) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    {/* Personal Details Card */}
                    <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[20px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-between w-full">
                            <p className="font-['Montserrat',sans-serif] font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.personalData')}</p>
                            {!isEditingProfile && (
                                <button
                                    onClick={() => setIsEditingProfile(true)}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    <p className="font-poppins font-bold leading-[21px] text-[#0046a2] text-[15px]">{t('perfil.edit')}</p>
                                </button>
                            )}
                        </div>

                        {isEditingProfile ? (
                            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.name')}</label>
                                    <input
                                        type="text"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.email')}</label>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.phone')}</label>
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a]"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#0046a2] text-white py-3.5 rounded-[12px] hover:bg-[#003580] transition-colors font-poppins font-bold text-[15px]"
                                    >
                                        {t('perfil.save')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile(false)}
                                        className="flex-1 bg-white/80 text-[#0046a2] py-3.5 rounded-[12px] hover:bg-white transition-colors font-poppins font-bold text-[15px]"
                                    >
                                        {t('perfil.cancel')}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col gap-[1.999px] w-full">
                                <div className="relative h-[51.118px] w-full border-b border-[rgba(0,0,0,0.05)]">
                                    <div className="absolute left-0 top-[15.49px] w-[96px]">
                                        <p className="font-poppins font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.name')}</p>
                                    </div>
                                    <div className="absolute left-[96px] top-[13.99px]">
                                        <p className="font-poppins font-normal leading-[22.5px] text-[#1a1a1a] text-[15px]">{userData.name}</p>
                                    </div>
                                </div>

                                <div className="relative h-[51.118px] w-full border-b border-[rgba(0,0,0,0.05)]">
                                    <div className="absolute left-0 top-[15.49px] w-[96px]">
                                        <p className="font-poppins font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.email')}</p>
                                    </div>
                                    <div className="absolute left-[96px] top-[13.99px]">
                                        <p className="font-poppins font-normal leading-[22.5px] text-[#1a1a1a] text-[15px]">{userData.email}</p>
                                    </div>
                                </div>

                                <div className="relative h-[50.481px] w-full">
                                    <div className="absolute left-0 top-[15.49px] w-[96px]">
                                        <p className="font-poppins font-semibold leading-[19.5px] text-[15px] text-black">{t('perfil.phone')}</p>
                                    </div>
                                    <div className="absolute left-[96px] top-[13.99px]">
                                        <p className="font-poppins font-normal leading-[22.5px] text-[#1a1a1a] text-[15px]">{userData.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Security Card */}
                    <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-sm flex flex-col gap-[20px] pb-[23.997px] pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                        <p className="font-['Montserrat',sans-serif] font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.security')}</p>

                        {isChangingPassword ? (
                            <form className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.currentPassword')}</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a] pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            {showCurrentPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.newPassword')}</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a] pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            {showNewPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-poppins font-medium text-[13px] text-[#6b7280]">{t('perfil.confirmPassword')}</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/90 border border-black/10 rounded-[12px] focus:outline-none focus:border-[#0046a2] transition-colors font-poppins text-[15px] text-[#1a1a1a] pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleChangePassword}
                                        className="flex-1 bg-[#0046a2] text-white py-3.5 rounded-[12px] hover:bg-[#003580] transition-colors font-poppins font-bold text-[15px]"
                                    >
                                        {t('perfil.save')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsChangingPassword(false)}
                                        className="flex-1 bg-white/80 text-[#0046a2] py-3.5 rounded-[12px] hover:bg-white transition-colors font-poppins font-bold text-[15px]"
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
                                <p className="font-poppins font-semibold leading-[22.5px] text-[#1a1a1a] text-[15px]">{t('perfil.changePassword')}</p>
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
                        <p className="font-['Montserrat',sans-serif] font-bold leading-[27px] text-[#1a1a1a] text-[20px]">{t('perfil.language')}</p>

                        <div className="flex flex-col gap-[9.995px] w-full">
                            <button
                                onClick={() => handleLanguageChange('pt')}
                                className={`h-[55.802px] relative rounded-[16px] w-full transition-all flex items-center justify-between px-[21.909px] ${language === 'pt' ? 'bg-[rgba(0,70,162,0.1)] border-[1.909px] border-[#0046a2]' : 'bg-[rgba(255,255,255,0.6)] hover:bg-white/80 border-[1.909px] border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[24px]">🇵🇹</span>
                                    <p className={`font-poppins font-medium leading-[22.5px] text-[15px] ${language === 'pt' ? 'text-[#0046a2]' : 'text-[#1a1a1a]'
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
                                    <p className={`font-poppins font-medium leading-[22.5px] text-[15px] ${language === 'en' ? 'text-[#0046a2]' : 'text-[#1a1a1a]'
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

                    {/* Logout Button (Desktop Style - in Grid) */}
                    <div className="md:col-span-2 mt-4 text-center">
                        <button
                            onClick={handleSignOut}
                            className="px-8 py-4 bg-red-100/50 hover:bg-red-100 text-red-600 rounded-[16px] transition-colors font-poppins font-semibold text-[15px] flex items-center justify-center gap-2 mx-auto min-w-[200px]"
                        >
                            <LogOut className="w-5 h-5" />
                            {t('nav.logout') || 'Sair'}
                        </button>
                    </div>

                </div>
            </div>
        </DesktopContentWrapper>
    );
}
