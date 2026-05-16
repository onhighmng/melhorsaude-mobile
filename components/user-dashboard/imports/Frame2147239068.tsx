// Products Card - Responsive Grid Layout
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import imgRate from "@/assets/dashboard-logo-clean.png";
import imgDiary from "@/assets/dashboard-logo-transparent.png";

// Simple Card Component for reuse
function ProductItem({
  title,
  titleColor = "text-[#1f1f1f]",
  image,
  onClick
}: {
  title: string;
  titleColor?: string;
  image: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-full bg-white rounded-[20px] border border-[#e8e8e8] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group flex flex-col"
    >
      {/* Top Right Arrow Button - Updated: White Circle, Black Arrow */}
      <div className="absolute top-3 right-3 w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center z-20 shadow-md group-hover:scale-110 transition-transform">
        <ArrowUpRight className="text-black w-5 h-5" strokeWidth={2} />
      </div>

      {/* Image Area */}
      <div className="flex-1 relative overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bottom Text Area */}
      <div className="h-[50px] bg-[#fafafa] flex items-center px-4 mx-1.5 mb-1.5 rounded-[14px]">
        <span className={`font-['Poppins',sans-serif] font-medium text-[13px] leading-tight ${titleColor}`}>
          {title}
        </span>
      </div>
    </div>
  );
}

interface ProductsCardProps {
  onMoodHistoryClick?: () => void;
  onRateSessionsClick?: () => void;
}

export default function ProductsCard({ onMoodHistoryClick, onRateSessionsClick }: ProductsCardProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 w-full h-full">
      {/* Rate Sessions Card (Left) */}
      <ProductItem
        title={t('meuEspaco.rateSessions')}
        titleColor="text-[#D4AF37]" // Gold color as per original
        image={imgRate}
        onClick={onRateSessionsClick}
      />

      {/* Emotion Diary Card (Right) */}
      <ProductItem
        title={t('meuEspaco.emotionDiary')}
        image={imgDiary}
        onClick={onMoodHistoryClick}
      />
    </div>
  );
}
