import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import imgRecursos from '@assets/recursos-wellness.jpg';

type FrameProps = {
  onClick?: () => void;
};

export default function Frame2147239067({ onClick }: FrameProps) {
  const { t } = useLanguage();

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-[20px] shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={imgRecursos}
        alt={t('meuEspaco.resources')}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          // Fallback if local image fails
          e.currentTarget.src = "https://images.unsplash.com/photo-1758274535784-87125dc915cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="flex items-center gap-3 text-white translate-y-0 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-['Syne:SemiBold',sans-serif] font-semibold text-[20px] leading-tight text-white shadow-black drop-shadow-md">
            {t('meuEspaco.resources')}
          </span>
        </div>
      </div>

      {/* Top Right Arrow (matching the 'Square' from original design but cleaner) */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 group-hover:bg-white/20 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </div>
  );
}
