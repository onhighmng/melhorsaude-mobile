import { ArrowLeft } from 'lucide-react';
import { CodeGenerator } from './CodeGenerator';
import { OnboardingTracker } from './OnboardingTracker';
import { ImageWithFallback } from './figma/ImageWithFallback';
import melhorSaudeLogo from '@/assets/company-dashboard/melhor-saude-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { TextShimmer } from './ui/text-shimmer';

export function Relatorios({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { t } = useLanguage();

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
            <button
                onClick={() => onNavigate('Dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('nav.back')}</span>
            </button>

            {/* Top Section with Page Title and Melhor Saúde Logo */}
            <div className="flex items-start justify-between mb-8 gap-8">
                {/* Left: Page Title */}
                <h1 className="text-3xl md:text-4xl text-[#1a1a1a]" style={{ fontFamily: 'Pacifico, cursive' }}>
                    {t('team.title')}
                </h1>

                {/* Right: Description with Melhor Saúde Logo */}
                <div className="flex items-center gap-1.5 max-w-md text-right">
                    <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '1.125rem' }}>
                        {t('team.description')}{' '}
                        <span className="inline-flex items-baseline gap-1">
                            <ImageWithFallback
                                src={melhorSaudeLogo}
                                alt="Melhor Saúde"
                                className="h-[1.125rem] w-auto object-contain inline-block"
                            />
                        </span>
                        {' '}{t('team.toEachCollaborator')}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                    {/* Header Section with Stats */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
                        <div className="flex-1">
                            <h2 className="text-4xl text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                                {t('team.management')}
                            </h2>
                            <div className="text-[24px] text-left">
                                <TextShimmer
                                    as="p"
                                    duration={2.5}
                                    spread={3}
                                    className="max-w-sm [--base-color:#1e3a8a] [--base-gradient-color:#3b82f6]"
                                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '3.5rem', lineHeight: '1.2', fontWeight: 'bold' } as React.CSSProperties}
                                >
                                    {t('team.managementDesc')}
                                </TextShimmer>
                            </div>
                        </div>

                        {/* Onboarding Tracker */}
                        <OnboardingTracker />
                    </div>

                    {/* Code Generator Section */}
                    <CodeGenerator />
                </div>
            </div>
        </div>
    );
}
