import { useState } from 'react';
import { Plus, Download, Loader2, RefreshCw } from 'lucide-react';
import { AnimatedActionButton } from '../ui/animated-action-button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { VerifiedBadge } from '../ui/VerifiedBadge';
import melhorSaudeLogo from '@/assets/company-dashboard/f066e727bc45a7068fb1f989657736b83adf0448.png';
import { supabase } from '@/lib/supabase';
// DISABLED: import from 'sonner';
import { useCompany } from '@/contexts/CompanyContext';
import { useLanguage } from '../contexts/LanguageContext';

export interface InviteCode {
  id: string;
  invite_code: string;
  status: 'pending' | 'used' | 'accepted' | 'expired';
  email: string | null;
  created_at: string;
}

interface CodeGeneratorProps {
  invites: InviteCode[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export function CodeGenerator({ invites, onRefresh, isLoading = false }: CodeGeneratorProps) {
  const { company } = useCompany();
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useLanguage();

  // Stats
  const usedCodes = invites.filter(i => i.status === 'used' || i.status === 'accepted').length;
  const activeCodes = invites.filter(i => i.status === 'pending').length;

  const generateSingleCode = async () => {
    if (!company?.id) return;

    setIsGenerating(true);
    try {
      const { error } = await supabase.rpc('generate_company_invite', {
        p_company_id: company.id
      });

      if (error) throw error;

      toast.success(t('codes.success.generate'));
      onRefresh();
    } catch (error) {
      console.error('Error generating code:', error);

      if (error instanceof Error && error.message.includes('Sem permissão')) {
        toast.error(t('codes.error.permission'));
      } else {
        toast.error(t('codes.error.generic'));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const exportCodes = () => {
    const codesText = invites.map(c => `${c.invite_code} - ${c.status}`).join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codes-${company?.company_name || 'company'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t('codes.success.export'));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
            {t('codes.generator.title')}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('codes.generator.subtitle')}
            </span>
            <ImageWithFallback
              src={melhorSaudeLogo}
              alt="Melhor Saúde"
              className="h-4 w-auto object-contain"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isLoading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
          <div className="text-right">
            <span className="block text-3xl font-bold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              {activeCodes}
            </span>
            <span className="text-xs text-gray-500 uppercase font-semibold">{t('codes.available')}</span>
          </div>

          <div className="text-right border-l pl-4 border-gray-200">
            <span className="block text-3xl font-bold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              {usedCodes}
            </span>
            <span className="text-xs text-gray-500 uppercase font-semibold">{t('codes.used')}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {/* Generate Buttons Row */}
        <div className="flex gap-2">
          <AnimatedActionButton
            onClick={generateSingleCode}
            icon={isGenerating ? Loader2 : Plus}
            text={isGenerating ? t('codes.generating') : t('codes.generate')}
            confirmationText={t('codes.generated')}
            disabled={isGenerating}
            className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
          />
        </div>

        {/* Export and Clear Buttons */}
        <div className="flex gap-2">
          <AnimatedActionButton
            onClick={exportCodes}
            icon={Download}
            text={t('codes.export')}
            confirmationText={t('codes.exported')}
            disabled={invites.length === 0}
            className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
          />
          <button
            onClick={onRefresh}
            className="px-6 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full transition-colors font-medium"
            title={t('codes.refresh')}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Codes Display */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t('codes.latest')} ({invites.length})
          </h3>
        </div>

        {invites.length > 0 ? (
          <div className="bg-gray-50 rounded-xl p-4 max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {invites.map((invite, index) => (
                <div
                  key={invite.id || index}
                  className={`px-3 py-2 rounded-lg text-center font-mono text-sm border ${invite.status === 'used' || invite.status === 'accepted'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : invite.status === 'expired'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-white border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {(invite.status === 'used' || invite.status === 'accepted') && (
                      <VerifiedBadge />
                    )}
                    <span>{invite.invite_code}</span>
                  </div>
                  {invite.email && invite.email !== 'placeholder@example.com' && (
                    <div className="text-[10px] mt-1 truncate opacity-70">{invite.email}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400">
            {t('codes.empty')}
          </div>
        )}
      </div>
    </div>
  );
}
