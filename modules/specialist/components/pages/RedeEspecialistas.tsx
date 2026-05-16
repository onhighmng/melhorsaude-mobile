import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import melhorSaudeLogo from '../../assets/f066e727bc45a7068fb1f989657736b83adf0448.png';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button as MovingBorderButton } from '../ui/moving-border';
import { TextShimmer } from '../ui/text-shimmer';
import { SpecialistFeedbackTable } from '@/components/admin/SpecialistFeedbackTable';


export function RedeEspecialistas({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const [climateModalOpen, setClimateModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen">
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('nav.back')}</span>
      </button>

      {/* Top Section with Page Title and Description */}
      <div className="flex items-start justify-between mb-8 gap-8">
        {/* Left: Page Title */}
        <h1 className="text-3xl md:text-4xl text-[#1a1a1a] font-pacifico">
          Histórico e Clima
        </h1>

        {/* Right: Description */}
        <div className="flex items-center gap-1.5 max-w-md text-right">
          <p className="text-gray-600 font-inter font-bold text-lg">
            Monitorize o ambiente das empresas e consulte o feedback das suas sessões.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Action Button */}
        <div className="space-y-6 max-w-3xl">
          {/* Header with Spinning Star */}
          <div className="flex items-center gap-2">
            <div className="relative w-[30px] h-[30px] flex items-center justify-center">
              <span
                className="text-[#2354a2] text-[30px] inline-block animate-spin font-inter"
                style={{
                  animationDuration: '3s',
                }}
              >
                ✱
              </span>
            </div>
            <h2
              className="text-[#4a5565] uppercase tracking-[0.4px] font-inter font-medium text-[30px] leading-[36px]"
            >
              REGISTO DE SESSÕES
            </h2>
          </div>

          <TextShimmer
            duration={1.5}
            className="text-gray-700 leading-relaxed text-justify [--base-color:#6b7280] [--base-gradient-color:#38bdf8] block"
            as="p"
          >
            Consulte o registo detalhado das suas sessões passadas e aceda ao radar emocional das empresas para contextualizar os seus atendimentos.
          </TextShimmer>

          <Dialog open={climateModalOpen} onOpenChange={setClimateModalOpen}>
            <DialogTrigger asChild>
              <div className="pt-2 flex justify-start">
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white text-black border-black px-8 py-4"
                  containerClassName="h-auto w-auto"
                  borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                >
                  <span className="font-inter font-semibold text-lg">
                    Ver O Clima
                  </span>
                </MovingBorderButton>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-white fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
              <DialogHeader>
                <DialogTitle className="font-manrope font-bold text-2xl">
                  Radar de Clima Organizacional
                </DialogTitle>
                <DialogDescription className="font-inter">
                  Estado emocional médio reportado pelos colaboradores em tempo real.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <p className="text-gray-500 italic text-center">Dados globais em atualização...</p>
                {/* Placeholder for future implementation logic */}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Specialists CRM Table */}
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900 font-manrope font-bold">
              Feedback e Histórico
            </h3>
            <ImageWithFallback
              src={melhorSaudeLogo}
              alt="Melhor Saúde"
              className="h-6 w-auto object-contain"
            />
          </div>

          <SpecialistFeedbackTable isAdmin={false} showFilters={false} />
        </div>
      </div>
    </div>
  );
}
