import imgImage from '@/assets/c11ec863fc69bf18852e77533b95f107e522aee1.png';

interface FrameProps {
  onClick?: () => void;
  className?: string; // Allow external styling if needed
}

function Frame({ onClick, className }: FrameProps) {
  return (
    <div
      className={`relative w-full h-full rounded-[32px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${className || ''}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full h-full">
        <img alt="" className="block w-full h-full object-cover scale-150" src={imgImage} />
      </div>
      <p className="absolute font-manrope font-semibold leading-[40px] left-[24px] text-[26px] text-nowrap text-white bottom-[16px]">Recursos</p>
    </div>
  );
}

export default function Frame1(props: FrameProps) {
  return (
    <div className="relative w-full h-full">
      <Frame {...props} />
    </div>
  );
}