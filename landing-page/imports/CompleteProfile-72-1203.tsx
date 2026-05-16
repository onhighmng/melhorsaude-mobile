import svgPaths from "./svg-7rpstzgjl8";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[1000px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#8f908d] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[14px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function CaretDown() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_53_2546)" id="CaretDown">
          <g id="Vector"></g>
          <path d={svgPaths.p1e6cc240} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_53_2546">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BatteryPercentage() {
  return (
    <div className="h-[13.667px] relative shrink-0 w-[27.333px]" data-name="Battery/Percentage">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 14">
        <g id="battery">
          <path d={svgPaths.p29df5600} fill="var(--fill-0, black)" />
          <path d={svgPaths.p3cd58500} fill="var(--fill-0, black)" />
        </g>
      </svg>
      <div className="absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] inset-[12.2%_15.85%_14.63%_7.32%] justify-center leading-[0] not-italic text-[10.67px] text-center text-white">
        <p className="leading-[normal]">67</p>
      </div>
    </div>
  );
}

function StatusPro() {
  return (
    <div className="absolute content-stretch flex gap-[7.33px] items-center right-[32.67px] top-1/2 translate-y-[-50%]" data-name="Status/Pro">
      <div className="h-[12.333px] relative shrink-0 w-[19.333px]" data-name="Cellular">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 13">
          <g id="Cellular">
            <path d={svgPaths.p8bdef00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p12dc6500} fill="var(--fill-0, black)" />
            <path d={svgPaths.p5f0ea00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p189c4440} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <div className="h-[12.333px] relative shrink-0 w-[17px]" data-name="Wifi">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
          <path clipRule="evenodd" d={svgPaths.p70af300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
        </svg>
      </div>
      <BatteryPercentage />
    </div>
  );
}

function StatusBarPro() {
  return (
    <div className="absolute h-[59px] left-1/2 top-0 translate-x-[-50%] w-[393px]" data-name="Status Bar/Pro">
      <StatusPro />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] leading-[normal] left-[72px] not-italic text-[17px] text-black text-center top-[calc(50%-10.1px)] tracking-[-0.4px] translate-x-[-50%] w-[54px]">9:41</p>
    </div>
  );
}

function HomeBarPro() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 w-[393px]" data-name="Home bar/Pro">
      <div className="absolute bg-black bottom-[9px] h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[139px]" data-name="Home Indicator" />
    </div>
  );
}

function FormField() {
  return (
    <div className="relative rounded-[1000px] shrink-0 w-full" data-name="form-field">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[20px] py-[14px] relative w-full">
          <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.408px]">
            <p className="leading-[22px]">John Doe William</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="field-01">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.408px] w-full">
        <p className="leading-[22px]">Full Name</p>
      </div>
      <FormField />
    </div>
  );
}

function IconUnitedKingdom() {
  return (
    <div className="h-[14px] relative shrink-0 w-[21.778px]" data-name="🦆 icon 'United Kingdom'">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 14">
        <g id="ð¦ icon 'United Kingdom'">
          <path d="M0 0H21.7778V14H0V0Z" fill="var(--fill-0, #012169)" id="Vector" />
          <path d={svgPaths.p5ec700} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.pbd37680} fill="var(--fill-0, #C8102E)" id="Vector_3" />
          <path d={svgPaths.pacaf770} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p3ad67d00} fill="var(--fill-0, #C8102E)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Country() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="country">
      <IconUnitedKingdom />
      <div className="bg-[#8f908d] h-[12px] shrink-0 w-px" />
      <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#8f908d] text-[15px] tracking-[-0.408px]">
        <p className="leading-[22px]">515-724-8083</p>
      </div>
    </div>
  );
}

function PhoneField() {
  return (
    <Wrapper>
      <Country />
      <CaretDown />
    </Wrapper>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="field-02">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.408px] w-full">
        <p className="leading-[22px]">Phone Number</p>
      </div>
      <PhoneField />
    </div>
  );
}

function JobField() {
  return (
    <Wrapper>
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8f908d] text-[15px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px]">Website Designer</p>
      </div>
      <CaretDown />
    </Wrapper>
  );
}

function Field3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="field-03">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.408px] w-full">
        <p className="leading-[22px]">Select Your Job</p>
      </div>
      <JobField />
    </div>
  );
}

function Field() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[24px] top-[315px] w-[345px]" data-name="field">
      <Field1 />
      <Field2 />
      <Field3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] relative shrink-0 w-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 24">
        <g id="Icon">
          <path d={svgPaths.p3a17be00} fill="var(--fill-0, #007AFF)" id="Icon / chevron.left" />
        </g>
      </svg>
    </div>
  );
}

function BackBtn() {
  return (
    <div className="absolute content-stretch flex gap-[5px] items-center left-[24px] top-[calc(50%-347px)] translate-y-[-50%]" data-name="back-btn">
      <Icon />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#007aff] text-[17px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px] overflow-ellipsis overflow-hidden">Back</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[10px] items-center justify-center left-1/2 px-[20px] py-[14px] rounded-[1000px] top-[728px] translate-x-[-50%] w-[345px]" data-name="Button">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
        <p className="leading-[22px]">You’re all set, continue</p>
      </div>
    </div>
  );
}

export default function CompleteProfile() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] size-full" data-name="Complete profile">
      <StatusBarPro />
      <HomeBarPro />
      <Field />
      <div className="absolute left-[calc(50%+0.5px)] size-[160px] top-[123px] translate-x-[-50%]" data-name="avatar">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 160">
          <circle cx="80" cy="80" fill="var(--fill-0, #F2F2F7)" id="avatar" r="80" />
        </svg>
      </div>
      <BackBtn />
      <Button />
    </div>
  );
}