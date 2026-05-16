import svgPaths from "./svg-5khhnsnpls";
import clsx from "clsx";
type TestimonialSectionArrowProps = {
  additionalClassNames?: string;
};

function TestimonialSectionArrow({ additionalClassNames = "" }: TestimonialSectionArrowProps) {
  return (
    <div className={clsx("h-0 w-[48px]", additionalClassNames)}>
      <div className="absolute inset-[-3.68px_-1.04%_-3.68px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 8">
          <path d={svgPaths.p1aadc080} fill="var(--stroke-0, #222222)" id="Arrow" />
        </svg>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Background">
      <div className="absolute bg-[rgba(57,115,225,0.05)] h-[644px] left-0 rounded-[20px] top-0 w-[1408px]" data-name="Rectangle" />
      <div className="absolute h-[644px] left-0 opacity-[0.15] rounded-[20px] top-0 w-[1408px]" data-name="Rectangle" />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#222] content-stretch flex items-center justify-center left-[610px] px-[40px] py-[6px] rounded-[50px] top-[64px]" data-name="Button 5">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white"># Testimonials</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="absolute contents left-[561px] top-[500px]" data-name="Profile">
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] left-[657px] text-[#222] text-[24px] text-nowrap top-[510px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Veronica L.
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[657px] not-italic opacity-50 text-[#222] text-[16px] text-nowrap top-[546px]">Client from United States</p>
      <div className="absolute left-[561px] size-[80px] top-[500px]" data-name="Photo">
        <div className="absolute inset-[-37.5%_-50%_-62.5%_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 160">
            <g filter="url(#filter0_d_72_1812)" id="Photo">
              <circle cx="80" cy="70" fill="var(--fill-0, #D9D9D9)" r="40" />
              <circle cx="80" cy="70" r="37.5" stroke="var(--stroke-0, white)" strokeWidth="5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="160" id="filter0_d_72_1812" width="160" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_72_1812" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_72_1812" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <div className="relative size-full" data-name="Testimonial Section">
      <Background />
      <p className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[704px] text-[#222] text-[56px] text-center top-[140px] translate-x-[-50%] w-[1170px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`"PeaceHub gave me the strength to overcome my anxiety. The compassionate therapists provided unwavering support, and I've found a renewed sense of purpose and tranquility in my life."`}</p>
      <Button />
      <Profile />
      <TestimonialSectionArrow additionalClassNames="absolute left-[920px] top-[540px]" />
      <div className="absolute flex h-0 items-center justify-center left-[441px] top-[540px] w-[48px]">
        <div className="flex-none rotate-[180deg]">
          <TestimonialSectionArrow additionalClassNames="relative" />
        </div>
      </div>
    </div>
  );
}
