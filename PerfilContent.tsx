import { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, LogOut, ChevronRight, Check, Edit2 } from 'lucide-react';
// DISABLED: import from 'motion/react';
import { showSuccessToast } from '@/utils/toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const CARD    = '#f2f1ef';
const CARD_EL = '#ecece7';
const BORDER  = 'rgba(0,0,0,0.05)';

// ─── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-3 mb-6 mt-4">
      <div className="bg-[#ecece7] px-3 py-1 rounded-lg">
        <p className="font-plus-jakarta text-[#0a0a0a] text-[11px] font-bold uppercase tracking-widest">
          {tag}
        </p>
      </div>
      <h2 className="font-plus-jakarta text-[28px] font-bold text-[#1a1a1a] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

// ─── Avatar card ───────────────────────────────────────────────────────────────
function AvatarCard({ name, email }: { name: string; email: string }) {
  return (
    <div


      className="rounded-[32px] p-8 mb-8 relative overflow-hidden flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50"
      style={{ background: CARD }}
    >
      <div className="size-20 rounded-[24px] flex items-center justify-center font-plus-jakarta font-black text-[28px] text-white shadow-xl shrink-0"
        style={{ background: 'linear-gradient(135deg, #1565C0, #0046a2)' }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#1a1a1a] font-plus-jakarta font-bold text-[24px] leading-tight tracking-tight truncate">{name}</p>
        <p className="text-[#474747] font-plus-jakarta text-[16px] mt-1 opacity-70 truncate">{email}</p>
      </div>
    </div>
  );
}

// ─── Inline edit field ─────────────────────────────────────────────────────────
function EditField({
  label, value, onChange, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-plus-jakarta text-[11px] font-bold text-[#474747] uppercase tracking-widest ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-4 rounded-2xl text-[15px] text-[#0a0a0a] outline-none transition-all shadow-sm focus:ring-2 focus:ring-[#1565C0]/20"
        style={{
          background: '#ffffff',
          border: `1px solid ${CARD_EL}`,
        }}
      />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function PerfilContent({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { language, setLanguage, t } = useLanguage();
  const { profile, user, signOut, updateProfile } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone_number || '',
  });
  const [pwData, setPwData] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    if (profile) {
      setUserData({
        name: profile.full_name || '',
        email: user?.email || '',
        phone: profile.phone_number || '',
      });
    }
  }, [profile, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        full_name: userData.name,
        phone_number: userData.phone,
      });
      setIsEditingProfile(false);
      showSuccessToast(t('perfil.profileUpdated'));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwData({ current: '', next: '', confirm: '' });
    setIsChangingPassword(false);
    showSuccessToast(t('perfil.passwordChanged'));
  };

  const handleLanguageChange = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    showSuccessToast(t('perfil.languageChanged'));
  };

  return (
    <div


      className="min-h-screen pb-32 bg-[#fafafa]/50"
    >
      <div className="max-w-[1400px] mx-auto px-10 md:px-20 pt-16">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <p className="font-plus-jakarta text-[#474747] text-[15px] font-bold uppercase tracking-[0.2em] mb-2 opacity-50">Configurações</p>
          <h1 className="font-pacifico text-[#0a0a0a] text-[48px] tracking-tight leading-tight">{t('perfil.title')}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            <AvatarCard name={userData.name} email={userData.email} />

            <div className="rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100" style={{ background: CARD }}>
              <SectionHeader tag="Conta" title="Dados Pessoais" />

              
                {isEditingProfile ? (
                  <form
                    key="edit"



                    onSubmit={handleSaveProfile}
                    className="flex flex-col gap-5"
                  >
                    <EditField label={t('perfil.name')}  value={userData.name}  onChange={(v) => setUserData({ ...userData, name: v })} />
                    <EditField label={t('perfil.email')} value={userData.email} onChange={(v) => setUserData({ ...userData, email: v })} type="email" />
                    <EditField label={t('perfil.phone')} value={userData.phone} onChange={(v) => setUserData({ ...userData, phone: v })} type="tel" />
                    <div className="flex gap-4 pt-2">
                      <button type="submit"
                        className="flex-1 py-4.5 rounded-2xl font-plus-jakarta font-bold text-[15px] text-white transition-all active:scale-[0.98] shadow-lg shadow-[#1565C0]/20"
                        style={{ background: '#1565C0' }}>
                        {t('perfil.save')}
                      </button>
                      <button type="button" onClick={() => setIsEditingProfile(false)}
                        className="flex-1 py-4.5 rounded-2xl font-plus-jakarta font-bold text-[15px] text-[#0a0a0a] transition-all active:scale-[0.98] bg-white border border-black/5">
                        {t('perfil.cancel')}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div key="view">
                    <div className="flex items-center justify-between mb-8">
                      <p className="font-plus-jakarta text-[#474747] text-[12px] font-bold uppercase tracking-widest opacity-40">Informações Atuais</p>
                      <button onClick={() => setIsEditingProfile(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full active:scale-90 transition-all bg-white border border-black/5 shadow-sm hover:shadow-md group">
                        <Edit2 size={13} className="text-[#1565C0] group-hover:scale-110 transition-transform" />
                        <span className="font-plus-jakarta text-[13px] font-bold text-[#1565C0]">{t('perfil.edit')}</span>
                      </button>
                    </div>
                    {[
                      { Icon: User,  label: t('perfil.name'),  value: userData.name },
                      { Icon: Mail,  label: t('perfil.email'), value: userData.email },
                      { Icon: Phone, label: t('perfil.phone'), value: userData.phone },
                    ].map(({ Icon, label, value }, i) => (
                      <div key={i} className={`flex items-center gap-5 py-5 ${i < 2 ? `border-b border-black/5` : ''}`}>
                        <div className="size-12 rounded-2xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-black/5 transition-transform hover:scale-110">
                          <Icon size={18} className="text-[#1565C0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-plus-jakarta text-[#474747] text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 mb-0.5">{label}</p>
                          <p className="font-plus-jakarta text-[#0a0a0a] text-[16px] font-bold truncate tracking-tight">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* Security */}
            <div className="rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100" style={{ background: CARD }}>
              <SectionHeader tag="Privacidade" title="Segurança" />
              
                {isChangingPassword ? (
                  <form
                    key="pw-edit"



                    onSubmit={handleChangePassword}
                    className="flex flex-col gap-5"
                  >
                    <EditField label={t('perfil.currentPassword')} value={pwData.current} onChange={(v) => setPwData({ ...pwData, current: v })} type="password" />
                    <EditField label={t('perfil.newPassword')}     value={pwData.next}    onChange={(v) => setPwData({ ...pwData, next: v })}    type="password" />
                    <EditField label={t('perfil.confirmPassword')} value={pwData.confirm} onChange={(v) => setPwData({ ...pwData, confirm: v })} type="password" />
                    <div className="flex gap-4 pt-2">
                      <button type="submit"
                        className="flex-1 py-4.5 rounded-2xl font-plus-jakarta font-bold text-[15px] text-white active:scale-[0.98] shadow-lg shadow-[#1565C0]/20"
                        style={{ background: '#1565C0' }}>
                        {t('perfil.save')}
                      </button>
                      <button type="button" onClick={() => setIsChangingPassword(false)}
                        className="flex-1 py-4.5 rounded-2xl font-plus-jakarta font-bold text-[15px] text-[#0a0a0a] active:scale-[0.98] bg-white border border-black/5">
                        {t('perfil.cancel')}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    key="pw-view"



                    onClick={() => setIsChangingPassword(true)}
                    className="w-full flex items-center justify-between p-6 bg-white rounded-3xl active:scale-[0.98] transition-all hover:shadow-md border border-black/5 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-[#1565C0]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Lock size={20} className="text-[#1565C0]" />
                      </div>
                      <span className="font-plus-jakarta text-[#1a1a1a] text-[16px] font-bold">{t('perfil.changePassword')}</span>
                    </div>
                    <ChevronRight size={20} className="text-[#474747] opacity-40 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              
            </div>

            {/* Language */}
            <div className="rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100" style={{ background: CARD }}>
              <SectionHeader tag="Preferências" title="Idioma" />
              <div className="grid grid-cols-2 gap-4">
                {([
                  { code: 'pt' as const, flag: '🇵🇹', label: t('perfil.portuguese') },
                  { code: 'en' as const, flag: '🇬🇧', label: t('perfil.english') },
                ]).map(({ code, flag, label }) => {
                  const active = language === code;
                  return (
                    <button key={code} onClick={() => handleLanguageChange(code)}
                      className="flex flex-col items-center gap-3 p-6 rounded-[28px] transition-all active:scale-[0.95] bg-white shadow-sm border-2"
                      style={{
                        borderColor: active ? '#1565C0' : 'transparent',
                        background: active ? '#F0F7FF' : '#ffffff'
                      }}>
                      <span className="text-[32px]">{flag}</span>
                      <span className="font-plus-jakarta text-[14px] font-bold text-center"
                        style={{ color: active ? '#1565C0' : '#474747' }}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-3 py-6 rounded-[32px] active:scale-[0.98] transition-all bg-[#fee2e2] hover:bg-[#fecaca] border border-[#fca5a5] shadow-lg shadow-red-500/5 group"
            >
              <LogOut size={20} className="text-[#ef4444] group-hover:-translate-x-1 transition-transform" />
              <span className="font-plus-jakarta font-bold text-[16px] text-[#ef4444] uppercase tracking-widest">{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
