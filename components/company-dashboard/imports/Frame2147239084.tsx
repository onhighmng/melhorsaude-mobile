import imgImage from '@/assets/company-dashboard/75e0127bb7b629c38fd07f220eac9d0b9a7716a1.png';
import imgImage1 from '@/assets/company-dashboard/6bccb4ec240c4902a2aa5b448c810d434e8aa38b.png';
import imgImage2 from '@/assets/company-dashboard/01afb8e7695a1006b9686d11546c37463dcc151f.png';

function Frame() {
  return (
    <div className="bg-[#30b0c7] content-stretch flex items-center justify-center mr-[-20px] overflow-clip px-[12px] py-0 relative rounded-[60px] shrink-0 size-[64px]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#fdfdfd] text-[20px] text-center text-nowrap tracking-[-0.45px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        24/7
      </p>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute content-stretch flex items-center left-[128.55px] pl-0 pr-[20px] py-0 top-0" data-name="Image">
      <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="64" src={imgImage} width="64" />
      </div>
      <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="64" src={imgImage1} width="64" />
      </div>
      <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="64" src={imgImage2} width="64" />
      </div>
      <Frame />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Image />
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal h-[41px] leading-[1.3] left-[226.55px] text-[#575757] text-[16px] text-center top-[92px] translate-x-[-50%] w-[453.094px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <span>{`Abra a porta a uma nova era de bem-estar, a oportunidade de transformar `}</span>
        <span className="text-[#c10c0c]">vidas</span>.
      </p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="relative size-full">
      <Group />
    </div>
  );
}
