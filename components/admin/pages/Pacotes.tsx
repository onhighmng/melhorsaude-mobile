import { ArrowLeft } from 'lucide-react';
import { PricingCards } from '../ui/pricing-cards';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import melhorSaudeLogo from '@/assets/f066e727bc45a7068fb1f989657736b83adf0448.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface PacotesProps {
  onNavigate: (page: string) => void;
}

export function Pacotes({ onNavigate }: PacotesProps) {
  const { t } = useLanguage();

  const handlePurchaseSessions = (sessions: number, price: number | null) => {
    console.log(`Selected package: ${sessions} sessions for ${price} MZN`);
    // Here you could add logic to proceed with the purchase
  };

  const handlePurchaseSeats = (seats: number, price: number | null) => {
    console.log(`Selected seats: ${seats} employee seats for ${price} MZN`);
    // Here you could add logic to proceed with the purchase
  };

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
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>{t('common.back')}</span>
          </button>

          <div className="space-y-4 text-center">
            <p className="font-bold text-base text-[#78716c] tracking-[0.4px]">{t('packages.label')}</p>
            <h1 className="text-4xl font-bold">{t('packages.title')}</h1>
            <p className="tracking-[0.4px] leading-[1.4em] text-center max-w-md mx-auto mt-2 text-[#78716c]">
              {t('packages.description')}
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <PricingCards
          onPurchaseSessions={handlePurchaseSessions}
          onPurchaseSeats={handlePurchaseSeats}
        />
      </div>
    </div>
  );
}
