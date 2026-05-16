import { ColorfulBentoGrid } from './ui/colorful-bento-grid';
import { TextShimmer } from './ui/text-shimmer';

export function DashboardContent({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="px-4 md:px-8 pb-4 md:pb-8 xl:px-8 xl:pb-8">
      {/* Colorful Bento Grid - 4 Cards */}
      <div className="xl:mb-96">
        <ColorfulBentoGrid onNavigate={onNavigate} className="text-[16px] font-normal" />
      </div>

      {/* Footer Text */}
      <div className="mt-8 xl:mt-64 max-w-6xl xl:max-w-[1200px] mx-auto xl:scale-[1.12] xl:origin-top">
        <TextShimmer
          as="p"
          duration={2.5}
          spread={3}
          className="font-bold text-2xl md:text-3xl text-center [--base-color:#1e3a8a] [--base-gradient-color:#60a5fa]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Apoiamos o Mental, Físico, Financeiro e Jurídico. Para que a pressão da vida não os faça quebrar por dentro.
        </TextShimmer>
      </div>
    </div>
  );
}