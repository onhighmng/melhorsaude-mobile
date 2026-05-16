// Recursos Card - Responsive & Aligned
import { ArrowUpRight } from 'lucide-react';
import imgImage from '@/assets/c11ec863fc69bf18852e77533b95f107e522aee1.png';

export default function RecursosCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-full rounded-[24px] overflow-hidden shadow-sm cursor-pointer group"
    >
      {/* Background Image */}
      <img
        src={imgImage}
        alt="Recursos"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.55] scale-150"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-5 left-5 z-20">
        <h3 className="font-['Manrope',sans-serif] font-semibold text-white text-[24px] leading-none tracking-wide">
          Recursos
        </h3>
      </div>
    </div>
  );
}
