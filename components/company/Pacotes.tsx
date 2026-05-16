import { ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { PricingSection } from './ui/pricing-section';
import { useLanguage } from '@/contexts/LanguageContext';

interface PacotesProps {
    onNavigate: (page: string) => void;
}

export function Pacotes({ onNavigate }: PacotesProps) {
    const { t } = useLanguage();

    const pricingTiers = [
        {
            name: t('packages.starter.name'),
            price: {
                monthly: 15,
                yearly: 144,
            },
            description: t('packages.starter.description'),
            icon: (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-500/30 blur-2xl rounded-full" />
                    <Zap className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400" />
                </div>
            ),
            features: [
                {
                    name: t('packages.starter.feature1.name'),
                    description: t('packages.starter.feature1.description'),
                    included: true,
                },
                {
                    name: t('packages.starter.feature2.name'),
                    description: t('packages.starter.feature2.description'),
                    included: true,
                },
                {
                    name: t('packages.starter.feature3.name'),
                    description: t('packages.starter.feature3.description'),
                    included: true,
                },
                {
                    name: t('packages.starter.feature4.name'),
                    description: t('packages.starter.feature4.description'),
                    included: false,
                },
            ],
        },
        {
            name: t('packages.pro.name'),
            price: {
                monthly: 49,
                yearly: 470,
            },
            description: t('packages.pro.description'),
            highlight: true,
            badge: t('packages.mostPopular'),
            icon: (
                <div className="relative">
                    <Sparkles className="w-7 h-7 relative z-10" />
                </div>
            ),
            features: [
                {
                    name: t('packages.pro.feature1.name'),
                    description: t('packages.pro.feature1.description'),
                    included: true,
                },
                {
                    name: t('packages.pro.feature2.name'),
                    description: t('packages.pro.feature2.description'),
                    included: true,
                },
                {
                    name: t('packages.pro.feature3.name'),
                    description: t('packages.pro.feature3.description'),
                    included: true,
                },
                {
                    name: t('packages.pro.feature4.name'),
                    description: t('packages.pro.feature4.description'),
                    included: true,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#e8f0f2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => onNavigate('Sessões')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>{t('nav.back')}</span>
                    </button>

                    <div className="space-y-4 text-center">
                        <p className="font-bold text-base text-[#78716c] tracking-[0.4px]">{t('packages.label')}</p>
                        <h1 className="text-4xl font-bold">{t('packages.title')}</h1>
                        <p className="tracking-[0.4px] leading-[1.4em] text-center max-w-md mx-auto mt-2 text-[#78716c]">
                            {t('packages.description')}
                        </p>
                    </div>
                </div>

                {/* Pricing Section */}
                <PricingSection
                    tiers={pricingTiers}
                    monthlyLabel={t('packages.monthly')}
                    yearlyLabel={t('packages.yearly')}
                    buyNowLabel={t('packages.buyNow')}
                    getStartedLabel={t('packages.getStarted')}
                />
            </div>
        </div>
    );
}
