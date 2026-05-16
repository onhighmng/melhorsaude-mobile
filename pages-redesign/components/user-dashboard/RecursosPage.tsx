import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import imgMelhorSaudeTransparentLogo1 from "../../assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgMelhorSaudeTransparentClean1 from "../../assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import imgMaskGroup from "../../assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "../../assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "../../assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "../../assets/897f25666b2976f6467a21346375bb9753e57911.png";
import { BlogSection } from './ui/blog-section';
import { PillarType } from '../ui/pillar-filter';
import { useLanguage } from '../../contexts/LanguageContext';


interface RecursosPageProps {
    onBack: () => void;
}

// Pillar Selection Cards (reused from BemEstarContent)
function MentalHealthCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="h-[173px] w-[157px] transition-transform hover:scale-105 active:scale-95"
            data-name="MentalHealthCard"
        >
            <div className="relative w-full h-full">
                <div className="absolute bg-gradient-to-b from-[#9dbfd4] to-[rgba(157,191,212,0)] h-full w-full rounded-[20px]" />
                <img alt="" className="absolute left-[4px] top-[45px] w-[153px] h-[133px] object-cover" src={imgMaskGroup} />
                <p className="absolute font-plus-jakarta-sans font-semibold leading-[14.577px] left-1/2 -translate-x-1/2 text-[#2e2b29] text-[16px] text-center text-nowrap top-[13px]">
                    {t('bemEstar.mental')}
                </p>
                <p className="absolute font-plus-jakarta-sans font-normal leading-[14.577px] left-1/2 -translate-x-1/2 text-[#3f3f3f] text-[12px] text-center text-nowrap top-[33px]">
                    {t('bemEstar.mentalSub')}
                </p>
            </div>
        </button>
    );
}

function PhysicalWellnessCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="h-[173px] w-[157px] transition-transform hover:scale-105 active:scale-95"
            data-name="PhysicalWellnessCard"
        >
            <div className="relative w-full h-full">
                <div className="absolute bg-gradient-to-b from-[#fcc066] via-[#f4b85d] via-[28.646%] to-[#f5efe6] h-full w-full rounded-[20px]" />
                <img alt="" className="absolute left-0 top-[24px] w-[156px] h-[156px] object-cover" src={imgMaskGroup1} />
                <p className="absolute font-plus-jakarta-sans font-normal leading-[14.577px] left-1/2 -translate-x-1/2 text-[#3f3f3f] text-[12px] text-center text-nowrap top-[13px]">
                    {t('bemEstar.physicalSub')}
                </p>
                <p className="absolute font-plus-jakarta-sans font-semibold leading-[14.577px] left-1/2 -translate-x-1/2 text-[#2e2b29] text-[16px] text-center text-nowrap top-[32px]">
                    {t('bemEstar.physical').split(' ')[1] || 'Físico'}
                </p>
            </div>
        </button>
    );
}

function FinancialAssistanceCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="h-[173px] w-[157px] transition-transform hover:scale-105 active:scale-95"
            data-name="FinancialAssistanceCard"
        >
            <div className="relative w-full h-full">
                <div className="absolute bg-gradient-to-b from-[#8bbeb8] to-[rgba(139,190,184,0)] h-full w-full rounded-[20px]" />
                <img alt="" className="absolute left-[9px] top-[28px] w-[144px] h-[144px] object-cover" src={imgMaskGroup2} />
                <p className="absolute font-plus-jakarta-sans font-semibold leading-[14.577px] left-1/2 -translate-x-1/2 text-[#2e2b29] text-[16px] text-center text-nowrap top-[13px]">
                    {t('bemEstar.financial').split(' ')[1] || 'Financeira'}
                </p>
                <p className="absolute font-plus-jakarta-sans font-normal leading-[14.577px] left-1/2 -translate-x-1/2 text-[#3f3f3f] text-[12px] text-center text-nowrap top-[32px]">
                    {t('bemEstar.financial').split(' ')[0] || 'Assistência'}
                </p>
            </div>
        </button>
    );
}

function LegalAssistanceCard({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="h-[173px] w-[157px] transition-transform hover:scale-105 active:scale-95"
            data-name="LegalAssistanceCard"
        >
            <div className="relative w-full h-full">
                <div className="absolute bg-gradient-to-b from-[#d8a4c4] to-[rgba(216,164,196,0)] h-full w-full rounded-[20px]" />
                <img alt="" className="absolute left-[20px] top-[29px] w-[147px] h-[147px] object-cover" src={imgMaskGroup3} />
                <p className="absolute font-plus-jakarta-sans font-semibold leading-[14.577px] left-1/2 -translate-x-1/2 text-[#2e2b29] text-[16px] text-center text-nowrap top-[13px]">
                    {t('bemEstar.legal').split(' ')[1] || 'Jurídica'}
                </p>
                <p className="absolute font-plus-jakarta-sans font-normal leading-[14.577px] left-1/2 -translate-x-1/2 text-[#3f3f3f] text-[12px] text-center text-nowrap top-[32px]">
                    {t('bemEstar.legal').split(' ')[0] || 'Assistência'}
                </p>
            </div>
        </button>
    );
}

export function RecursosPage({ onBack }: RecursosPageProps) {
    const [selectedPillar, setSelectedPillar] = useState<'mental' | 'fisico' | 'financeira' | 'juridica' | null>(null);
    const { t } = useLanguage();

    // Map our pillar IDs to BlogSection pillar types
    const mapPillarToFilterType = (pillar: 'mental' | 'fisico' | 'financeira' | 'juridica'): PillarType => {
        if (pillar === 'financeira') return 'financeiro';
        if (pillar === 'juridica') return 'juridico';
        return pillar as PillarType;
    };

    // Pillar labels for display
    const pillarLabels = {
        mental: t('bemEstar.mental'),
        fisico: t('bemEstar.physical'),
        financeira: t('bemEstar.financial'),
        juridica: t('bemEstar.legal'),
    };

    const handleBackClick = () => {
        if (selectedPillar) {
            // If a pillar is selected, go back to pillar selection
            setSelectedPillar(null);
        } else {
            // If no pillar selected, go back to previous page
            onBack();
        }
    };

    // Pillar Selection Screen (2x2 Grid)
    if (!selectedPillar) {


        return (
            <div className="bg-[#E5DDD5] pt-[23.997px] px-[15.992px] pb-24 min-h-screen">
                {/* Header */}
                <div className="relative mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={onBack}
                            className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                        >
                            <ArrowLeft className="w-5 h-5 text-black" />
                        </button>

                        <h1 className="font-pacifico text-[28px] text-black flex-1">
                            Recursos
                        </h1>
                    </div>

                    {/* Logo - Top Right */}
                    {/* Logo - Top Right - Updated */}
                    <div className="absolute right-0 top-[-20px] flex flex-col items-center justify-center w-[120px]">
                        <img alt="" className="w-14 h-14 object-contain mb-1" src={imgMelhorSaudeTransparentLogo1} />
                        <img alt="Melhor Saúde" className="w-full h-auto object-contain" src={imgMelhorSaudeTransparentClean1} />
                    </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto w-full max-w-5xl">
                    <div className="space-y-1 px-4 py-8">
                        <h1 className="font-pacifico text-4xl tracking-wide text-black">
                            Recursos de Saúde
                        </h1>
                        <p className="text-gray-700 text-base">
                            Artigos, vídeos e áudios sobre saúde mental, bem-estar físico, assistência financeira e jurídica.
                        </p>
                    </div>
                    <div className="w-full h-px border-b border-dashed border-gray-400/30" />

                    {/* 2x2 Grid of Pillar Cards */}
                    <div className="max-w-[340px] mx-auto mt-8 mb-8">
                        <div className="grid grid-cols-2 gap-3">
                            <MentalHealthCard onClick={() => setSelectedPillar('mental')} />
                            <PhysicalWellnessCard onClick={() => setSelectedPillar('fisico')} />
                            <FinancialAssistanceCard onClick={() => setSelectedPillar('financeira')} />
                            <LegalAssistanceCard onClick={() => setSelectedPillar('juridica')} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Filtered Content Screen
    return (
        <div className="bg-[#E5DDD5] pt-[23.997px] px-[15.992px] pb-24 min-h-screen">
            {/* Header */}
            <div className="relative mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={handleBackClick}
                        className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                    >
                        <ArrowLeft className="w-5 h-5 text-black" />
                    </button>

                    <div className="flex-1">
                        <h1 className="font-pacifico text-[28px] text-black">
                            Recursos
                        </h1>
                        <p className="font-plus-jakarta-sans text-[14px] text-gray-600">
                            {pillarLabels[selectedPillar]}
                        </p>
                    </div>
                </div>

                {/* Logo - Top Right */}
                {/* Logo - Top Right - Updated */}
                <div className="absolute right-0 top-[-20px] flex flex-col items-center justify-center w-[120px]">
                    <img alt="" className="w-14 h-14 object-contain mb-1" src={imgMelhorSaudeTransparentLogo1} />
                    <img alt="Melhor Saúde" className="w-full h-auto object-contain" src={imgMelhorSaudeTransparentClean1} />
                </div>
            </div>

            {/* Blog Section - Filtered by Pillar */}
            <BlogSection filterPillar={mapPillarToFilterType(selectedPillar)} />
        </div>
    );
}
