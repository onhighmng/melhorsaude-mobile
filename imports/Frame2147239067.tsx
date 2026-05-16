import svgPaths from "./svg-bv530bbkds";
import { imgGroup } from "./svg-qvawi";
import clsx from "clsx";
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen } from 'lucide-react';

export default function Frame2147239067({ onClick }: { onClick?: () => void }) {
  const { t } = useLanguage();

  return (
    <div
      className="relative size-full cursor-pointer hover:opacity-95 transition-opacity"
      onClick={onClick}
    >
      <div className="absolute h-[209.5px] left-0 rounded-[32px] top-0 w-full overflow-hidden">
        {/* Background - using generic blue path but sized for this card */}
        <div className="absolute h-[345px] left-0 top-0 w-full"> {/* Height match Proximas? or forced? */}
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311 345">
            <path d={svgPaths.pa2a6300} fill="var(--fill-0, #0B74A5)" id="Rectangle 161124905" />
          </svg>
        </div>

        {/* Title */}
        <div className="absolute w-full top-[34px] left-[24px]">
          <p className="font-['Syne:SemiBold',sans-serif] font-semibold text-[26px] text-white tracking-[-0.3125px]">
            {t('nav.recursos') || "Recursos"}
          </p>
        </div>

        {/* Icon / Decor */}
        <div className="absolute bottom-[24px] right-[24px]">
          {/* Using imgGroup (circle) as background for icon */}
          <div className="size-[56px] relative flex items-center justify-center">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${imgGroup}')`, backgroundSize: 'cover' }} />
            {/* Fallback usage of imgGroup if it was a mask: */}
            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm" />

            <BookOpen className="w-8 h-8 text-white z-10" />
          </div>
        </div>

        <div className="absolute left-[24px] bottom-[30px] max-w-[200px]">
          <p className="font-['Inter:Regular',sans-serif] text-sm text-white/80">
            Artigos e guias para o seu bem-estar
          </p>
        </div>

      </div>
    </div>
  );
}