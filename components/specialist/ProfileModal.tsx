import { UploadCloud } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSpecialist } from '@/contexts/SpecialistContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface ProfileModalProps {
  onClose: () => void;
}

export function ProfileModal({ onClose }: ProfileModalProps) {
  const { user, refreshProfile: refreshAuthProfile } = useAuth();
  const { specialistProfile, refreshProfile } = useSpecialist();
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  // bio removed
  const [experience, setExperience] = useState('');
  const [languages, setLanguages] = useState('');

  const metadata = useMemo(() => {
    if (!specialistProfile?.metadata || typeof specialistProfile.metadata !== 'object' || Array.isArray(specialistProfile.metadata)) {
      return {};
    }
    return specialistProfile.metadata as Record<string, any>;
  }, [specialistProfile]);

  const avatarUrl = specialistProfile?.profile?.avatar_url || '';

  useEffect(() => {
    if (specialistProfile) {
      setName(specialistProfile.profile?.full_name || '');
      const contactEmail = metadata?.contact_email || specialistProfile.profile?.email || '';
      setEmail(contactEmail);
      setPhone(metadata?.contact_phone || specialistProfile.profile?.phone || '');
      setTitle(specialistProfile.professional_title || '');
      // bio removed
      setExperience(
        typeof specialistProfile.years_of_experience === 'number'
          ? String(specialistProfile.years_of_experience)
          : ''
      );
      if (metadata?.languages) {
        setLanguages(String(metadata.languages));
      } else if (specialistProfile.languages && specialistProfile.languages.length > 0) {
        setLanguages(specialistProfile.languages.join(', '));
      } else {
        setLanguages('');
      }
    }
  }, [specialistProfile, metadata]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'O ficheiro deve ter no máximo 10MB.'
      });
      return;
    }

    try {
      setIsUploadingAvatar(true);
      setMessage(null);

      const extension = file.name.split('.').pop() || 'jpg';
      const filePath = `specialists/${user.id}/${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;
      if (!publicUrl) {
        throw new Error('Não foi possível obter o link público da imagem.');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (profileError) throw profileError;

      await refreshAuthProfile();
      await refreshProfile();
      setMessage({ type: 'success', text: 'Foto atualizada com sucesso!' });
    } catch (error: any) {
      console.error('Erro ao carregar foto:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao carregar foto' });
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const updatedMetadata = {
        ...(metadata || {}),
        contact_email: email.trim(),
        contact_phone: phone.trim(),
        languages: languages,
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      const languagesArray = languages
        .split(',')
        .map((lang) => lang.trim())
        .filter(Boolean);

      const { error: specialistError } = await supabase
        .from('specialists')
        .update({
          professional_title: title.trim(),
          // bio removed
          years_of_experience: experience ? Number(experience) : null,
          languages: languagesArray.length > 0 ? languagesArray : null,
          metadata: updatedMetadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', specialistProfile?.id || '')
        .eq('user_id', user.id);

      if (specialistError) throw specialistError;

      await refreshAuthProfile();
      await refreshProfile();
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isVisible ? 'bg-black/50' : 'bg-black/0'
        } overflow-y-auto scrollbar-pill`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-gray-900 text-center">Editar Perfil</h2>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto scrollbar-pill">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            {avatarUrl ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 mb-3">
                <img
                  src={avatarUrl}
                  alt={name || 'Especialista'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
                <span className="text-white text-3xl">{name.charAt(0) || 'G'}</span>
              </div>
            )}
            <h3 className="text-gray-900 mb-1">Carregar Foto</h3>
            <p className="text-sm text-gray-500">(JPG, PNG ou WEBP · até 10MB)</p>
            <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors">
              <UploadCloud className="w-4 h-4" />
              <span>{isUploadingAvatar ? 'A carregar...' : 'Selecionar ficheiro'}</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                disabled={isUploadingAvatar}
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-4 p-3 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Geral Especialista"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="especialista@exemplo.pt"
                />
                <p className="text-xs text-gray-500 mt-1">Email de contacto visível para os utilizadores.</p>
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="+351 91 XXX XXXX"
              />
            </div>

            {/* Professional Title */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Cargo / Título Profissional</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Psicólogo Clínico"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Anos de Experiência</label>
                <input
                  type="number"
                  min={0}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Idiomas (separados por vírgula)</label>
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Português, Inglês"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="px-6 py-5 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors flex items-center justify-center"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Guardando...
              </>
            ) : (
              'Guardar Alterações'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}