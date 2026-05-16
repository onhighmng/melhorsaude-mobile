const imgImage = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
const imgImageMelhorSaude = "/landing-assets/f066e727bc45a7068fb1f989657736b83adf0448.png";

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[calc(50%+20.6px)] top-[15px] translate-x-[-50%]">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[20.04px] relative shrink-0 text-[#4278ec] text-[18px] text-nowrap tracking-[-0.18px]">Início</p>
      <div className="relative shrink-0 size-[7.4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
          <circle cx="3.7" cy="3.7" fill="var(--fill-0, #050505)" id="Ellipse 2839" r="3.7" />
        </svg>
      </div>
      <div className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] text-nowrap">
        <p className="leading-[1.2]">Sobre Nós</p>
      </div>
      <div className="relative shrink-0 size-[7.4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
          <circle cx="3.7" cy="3.7" fill="var(--fill-0, #050505)" id="Ellipse 2839" r="3.7" />
        </svg>
      </div>
      <div className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] text-nowrap">
        <p className="leading-[1.2]">Pilares</p>
      </div>
      <div className="relative shrink-0 size-[7.4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 7.4">
          <circle cx="3.7" cy="3.7" fill="var(--fill-0, #050505)" id="Ellipse 2839" r="3.7" />
        </svg>
      </div>
      <div className="capitalize flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#667085] text-[18px] text-nowrap">
        <p className="leading-[1.2]">Como Funciona</p>
      </div>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[71.141px] shrink-0" data-name="Button.base">
      <div aria-hidden="true" className="absolute border-[#050505] border-[1.002px] border-solid inset-0 pointer-events-none rounded-[71.141px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10.02px] items-center justify-center px-[20.04px] py-[12.024px] relative size-full">
          <p className="basis-0 font-['Sora:SemiBold',sans-serif] font-semibold grow leading-[26.052px] min-h-px min-w-px relative shrink-0 text-[#050505] text-[16.032px] text-center">Contactar</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative rounded-[52.103px] shrink-0 w-[125px]" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="basis-0 bg-[#4278ec] grow h-full min-h-px min-w-px relative rounded-[71.141px] shrink-0" data-name="Button.base">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10.02px] items-center justify-center px-[20.04px] py-[12.024px] relative size-full">
          <p className="basis-0 font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow leading-[26.052px] min-h-px min-w-px relative shrink-0 text-[16.032px] text-center text-white">Entrar</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative rounded-[52px] shrink-0 w-[110px]" data-name="Button">
      <ButtonBase1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[1133px] top-[13px]">
      <Button />
      <div className="flex h-[13.026px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[13.026px]">
            <div className="absolute inset-[-0.5px_-3.85%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0278 1.00199">
                <path d="M0.500994 0.500994H13.5268" id="Line 7" stroke="var(--stroke-0, #050505)" strokeLinecap="round" strokeWidth="1.00199" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Button1 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[71.362px] relative shrink-0 w-[69.875px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function ImageMelhorSaude() {
  return (
    <div className="h-[21px] relative shrink-0 w-[226px]" data-name="Image (Melhor Saúde)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-0 top-0">
      <Image />
      <div className="flex h-[13.026px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[13.026px]">
            <div className="absolute inset-[-0.5px_-3.85%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0278 1.00199">
                <path d="M0.500994 0.500994H13.5268" id="Line 7" stroke="var(--stroke-0, #050505)" strokeLinecap="round" strokeWidth="1.00199" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ImageMelhorSaude />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[71.362px] left-[28px] top-[19px] w-[1400px]">
      <Frame />
      <Frame2 />
      <Frame1 />
    </div>
  );
}

export default function N() {
  return (
    <div className="bg-white relative size-full" data-name="N2">
      <Frame3 />
    </div>
  );
}