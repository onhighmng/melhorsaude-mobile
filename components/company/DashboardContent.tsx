import { ColorfulBentoGrid } from './ui/colorful-bento-grid';
import { TextShimmer } from '@/components/user-dashboard/ui/text-shimmer';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardContent({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();

  return (
    <div className="px-4 md:px-8 pb-4 md:pb-8 xl:px-8 xl:pb-8">
      {/* Colorful Bento Grid - 4 Cards */}
      <div className="xl:mb-48">
        <ColorfulBentoGrid onNavigate={onNavigate} />
      </div>

      {/* Footer Text */}
      <div className="mt-8 xl:mt-0 max-w-6xl xl:max-w-[1200px] mx-auto xl:scale-[1.12] xl:origin-top">
        <TextShimmer
          as="p"
          duration={2.5}
          spread={3}
          className="font-bold text-2xl md:text-3xl text-center [--base-color:#1e3a8a] [--base-gradient-color:#60a5fa]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {t('dashboard.footer')}
        </TextShimmer>
      </div>
    </div>
  );
}