import svgPaths from "./svg-xbsudvzt3y";
import clsx from "clsx";
const imgFrame = "/assets/figma/c3992444b07f28d551755783866a198d2267c0a3.png";
const imgEllipse = "/assets/figma/0584b8e19c582ae24e40b69ae29fdade60e2cdf3.png";
const imgDot = "/assets/figma/fd45c48d1867c54693ea96621a85b8eefdbe99de.png";
const imgContents = "/assets/figma/62f56d8d709e0a7617b5f9f5b2459084e10787e5.png";
const imgIcon = "/assets/figma/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1 = "/assets/figma/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2 = "/assets/figma/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
const imgItem1 = "/assets/figma/320a6305ad5388a25cf18b0b0d77e82e5c57e018.png";
const imgContent = "/assets/figma/2d9222dc87ac9c57de38136c910d9682e7cc7046.png";
const imgItem2 = "/assets/figma/aa46251bfd5c0f2a063122abb0c4056cfd0caa09.png";
const imgItem3 = "/assets/figma/d90a84cb609f1b610ce6ce9223e6f91aae146194.png";
const imgItem4 = "/assets/figma/1bb31e908950e682afd9c82e036c3558a46fb19d.png";
const imgTitle = "/assets/figma/9aef0b6488f6548bccf9f984794dd52474fabbfa.png";
const imgPhoto = "/assets/figma/92cb6f2df43ad2f246e4934fa78a0e286fdbb391.png";
const imgPhoto1 = "/assets/figma/03cb028f45c1bed2a8c18f599434e0e66dacf005.png";
const imgDiscount = "/assets/figma/18d92c80d41e377a79302e3936129d577d50a42f.png";

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[64px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage5>
      <g id="Arrow Button">{children}</g>
    </BackgroundImage5>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between pl-[321px] pr-0 py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}
type BackgroundImage1Props = {
  text: string;
  text1: string;
  text2: string;
  text3: string;
};

function BackgroundImage1({ text, text1, text2, text3 }: BackgroundImage1Props) {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[24px] not-italic place-items-start relative shrink-0 text-[16px] text-nowrap text-white">
      <p className="[grid-area:1_/_1] ml-0 mt-0 opacity-75 relative">{text}</p>
      <p className="[grid-area:1_/_1] ml-0 mt-[36px] opacity-75 relative">{text1}</p>
      <p className="[grid_area:1_/_1] ml-0 mt-[72px] opacity-75 relative">{text2}</p>
      <p className="[grid_area:1_/_1] ml-0 mt-[108px] opacity-75 relative">{text3}</p>
    </div>
  );
}
type TextBackgroundImage1Props = {
  text: string;
  text1: string;
};

function TextBackgroundImage1({ text, text1 }: TextBackgroundImage1Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 text-[#222]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic opacity-50 relative shrink-0 text-[20px] w-full">{text1}</p>
    </div>
  );
}
type NumberBackgroundImageAndText1Props = {
  text: string;
};

function NumberBackgroundImageAndText1({ text }: NumberBackgroundImageAndText1Props) {
  return (
    <div className="bg-[#222] content-stretch flex flex-col items-center justify-center px-[24px] py-[20px] relative rounded-[100px] shrink-0 size-[80px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[#222] text-[32px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}

function ButtonBackgroundImage() {
  return (
    <BackgroundImage2>
      <ArrowButtonBackgroundImage />
    </BackgroundImage2>
  );
}

function ArrowButtonBackgroundImage() {
  return (
    <BackgroundImage3>
      <rect fill="var(--fill-0, #3973E1)" height="64" rx="32" width="64" />
      <path d={svgPaths.p1c7f2f00} fill="var(--stroke-0, white)" id="Arrow" />
    </BackgroundImage3>
  );
}
type ArrowBackgroundImageProps = {
  additionalClassNames?: string;
};

function ArrowBackgroundImage({ additionalClassNames = "" }: ArrowBackgroundImageProps) {
  return (
    <div className={clsx("h-0 relative w-[48px]", additionalClassNames)}>
      <div className="absolute inset-[-3.68px_-1.04%_-3.68px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 8">
          <path d={svgPaths.p1aadc080} fill="var(--stroke-0, #222222)" id="Arrow" />
        </svg>
      </div>
    </div>
  );
}
type IconTitleBackgroundImageAndTextProps = {
  text: string;
};

function IconTitleBackgroundImageAndText({ text }: IconTitleBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#222] text-[24px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}
type ButtonBackgroundImageAndText2Props = {
  text: string;
};

function ButtonBackgroundImageAndText2({ text }: ButtonBackgroundImageAndText2Props) {
  return (
    <div className="bg-[#222] content-stretch flex items-center justify-center px-[40px] py-[6px] relative rounded-[50px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}
type TextBackgroundImageProps = {
  text: string;
  text1: string;
};

function TextBackgroundImage({ text, text1 }: TextBackgroundImageProps) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-nowrap">{text}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-50 relative shrink-0 w-[187px]">{text1}</p>
    </div>
  );
}

function DotBackgroundImage() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDot} />
    </div>
  );
}

function EllipseBackgroundImage1() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse} width="32" />
    </div>
  );
}

function EllipseBackgroundImage() {
  return (
    <BackgroundImage6>
      <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
    </BackgroundImage6>
  );
}
type NumberBackgroundImageAndTextProps = {
  text: string;
};

function NumberBackgroundImageAndText({ text }: NumberBackgroundImageAndTextProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center pl-[10px] pr-[11px] py-[4px] relative rounded-[100px] shrink-0 size-[32px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText1Props) {
  return (
    <div className={clsx("content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[8px] relative rounded-[50px] shrink-0", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
      <div className="h-0 relative shrink-0 w-[40px]" data-name="Arrow">
        <div className="absolute inset-[-3.68px_-1.25%_-3.68px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 8">
            <path d={svgPaths.p7d025f0} fill="var(--stroke-0, white)" id="Arrow" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type BackgroundImageProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function BackgroundImage({ text, text1, additionalClassNames = "" }: BackgroundImageProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14" }} className={clsx("font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-nowrap", additionalClassNames)}>
      <p className="mb-0">{text}</p>
      <p>{text1}</p>
    </div>
  );
}
type ListBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ListBackgroundImageAndText({ text, additionalClassNames = "" }: ListBackgroundImageAndTextProps) {
  return (
    <div className={clsx("content-stretch flex items-center justify-between pb-[12px] pt-0 px-0 relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
      <ArrowIconBackgroundImage />
    </div>
  );
}

function ArrowIconBackgroundImage() {
  return (
    <div className="h-0 relative shrink-0 w-[24px]">
      <div className="absolute inset-[-3.68px_-2.08%_-3.68px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 8">
          <g id="Arrow Icon">
            <path d={svgPaths.p8868d00} fill="var(--stroke-0, white)" id="Arrow" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[6px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[24px] not-italic place-items-start relative shrink-0 text-[16px] text-nowrap text-white" data-name="Menu">
      <p className="[grid_area:1_/_1] ml-0 mt-0 relative">About</p>
      <p className="[grid_area:1_/_1] ml-[86px] mt-0 relative">Services</p>
      <p className="[grid_area:1_/_1] ml-[192px] mt-0 relative">Resources</p>
      <p className="[grid_area:1_/_1] ml-[311px] mt-0 relative">Contact</p>
    </div>
  );
}

function CompanyLogoMenu() {
  return (
    <div className="content-stretch flex gap-[347px] items-center relative shrink-0" data-name="Company Logo + Menu">
      <div className="h-[20px] relative shrink-0 w-[137px]" data-name="Company Logo">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137 20">
          <g id="Company Logo">
            <path d={svgPaths.p5211dc0} fill="white" />
            <path d={svgPaths.p14adc00} fill="white" />
            <path d={svgPaths.p296a0c00} fill="white" />
            <path d={svgPaths.p13fea180} fill="white" />
            <path d={svgPaths.p13312f00} fill="white" />
            <path d={svgPaths.p31882700} fill="white" />
            <path d={svgPaths.p2d26100} fill="white" />
            <path d={svgPaths.p76ee200} fill="white" />
            <path d={svgPaths.p1bcb6f00} fill="white" />
            <path d={svgPaths.p3bb81640} fill="white" />
          </g>
        </svg>
      </div>
      <Menu />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex gap-[353px] items-center relative shrink-0" data-name="Navigation">
      <CompanyLogoMenu />
      <ButtonBackgroundImageAndText text="Sign in" />
    </div>
  );
}

function Sessions() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Sessions">
      <ListBackgroundImageAndText text="Counseling" additionalClassNames="w-[235px]" />
      <ListBackgroundImageAndText text="Group Therapy" additionalClassNames="w-[302px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[24px] not-italic pb-[2px] pt-0 px-0 relative shrink-0 text-[16px] text-nowrap text-white" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">Join our active healthy community</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">As easy as a click away.</p>
    </div>
  );
}

function Photos() {
  return (
    <div className="h-[40px] mr-[-8px] relative shrink-0 w-[104px]" data-name="Photos">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 40">
        <g id="Photos">
          <circle cx="20" cy="20" fill="var(--fill-0, #D9D9D9)" id="Ellipse" r="19.5" stroke="var(--stroke-0, white)" />
          <circle cx="52" cy="20" fill="var(--fill-0, #D9D9D9)" id="Ellipse_2" r="19.5" stroke="var(--stroke-0, white)" />
          <circle cx="84" cy="20" fill="var(--fill-0, #D9D9D9)" id="Ellipse_3" r="19.5" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <path d={svgPaths.p3d6e55d0} fill="var(--fill-0, #BFD6EC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PlusSign() {
  return (
    <div className="bg-white content-stretch flex items-center mr-[-8px] p-[12px] relative rounded-[50px] shrink-0" data-name="Plus Sign">
      <Group />
    </div>
  );
}

function PhotoSign() {
  return (
    <div className="content-stretch flex items-center justify-between pl-0 pr-[8px] py-0 relative shrink-0 w-full" data-name="Photo + Sign">
      <Photos />
      <PlusSign />
    </div>
  );
}

function Avatar() {
  return (
    <div className="backdrop-blur-[5px] backdrop-filter content-stretch flex flex-col gap-[24px] items-start justify-center p-[16px] relative rounded-[20px] shrink-0" data-name="Avatar" style={{ backgroundImage: "linear-gradient(111.353deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Text />
      <PhotoSign />
    </div>
  );
}

function SessionsCalendar() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Sessions + Calendar">
      <Sessions />
      <Avatar />
    </div>
  );
}

function LeftContent() {
  return (
    <div className="content-stretch flex flex-col gap-[50px] items-start relative shrink-0" data-name="Left Content">
      <SessionsCalendar />
      <div className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[88px] relative shrink-0 text-[#222] text-[80px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">A Journey to</p>
        <p>Mental Wellness</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[18px] pt-0 px-0 relative shrink-0" data-name="Button">
      <ButtonBackgroundImageAndText1 text="Get Started" additionalClassNames="bg-[#3973e1]" />
    </div>
  );
}

function LeftContentButton() {
  return (
    <div className="content-stretch flex gap-[82px] items-end relative shrink-0" data-name="Left Content + Button">
      <LeftContent />
      <Button />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[160px] mb-[-32px] relative rounded-[20px] shrink-0 w-[235px]" data-name="Frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgFrame} />
    </div>
  );
}

function PlayButton() {
  return (
    <BackgroundImage6>
      <g id="Play Button">
        <rect fill="var(--fill-0, #222222)" height="32" rx="16" width="32" />
        <path d={svgPaths.p1be4a600} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </BackgroundImage6>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end mb-[-32px] relative shrink-0" data-name="Texts">
      <PlayButton />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-[235px]">Welcome to PeaceHub. Join us on our transformative journey towards lasting peace.</p>
    </div>
  );
}

function Video() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] pt-0 px-0 relative shrink-0" data-name="Video">
      <Frame />
      <Texts />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">View All</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[71px] items-start relative shrink-0" data-name="Title">
      <BackgroundImage text="Book" text1="Schedule" additionalClassNames="leading-[40px] text-[32px] text-white" />
      <Button1 />
    </div>
  );
}

function TopContent() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Top Content">
      <EllipseBackgroundImage />
      <EllipseBackgroundImage />
      <NumberBackgroundImageAndText text="3" />
      <EllipseBackgroundImage />
      <EllipseBackgroundImage />
      <EllipseBackgroundImage1 />
      <NumberBackgroundImageAndText text="7" />
    </div>
  );
}

function BottomContent() {
  return (
    <div className="content-stretch flex gap-[4px] items-start pl-[24px] pr-0 py-0 relative shrink-0" data-name="Bottom Content">
      <EllipseBackgroundImage1 />
      <EllipseBackgroundImage />
      <NumberBackgroundImageAndText text="10" />
      <EllipseBackgroundImage />
      <EllipseBackgroundImage />
      <EllipseBackgroundImage />
      <NumberBackgroundImageAndText text="14" />
    </div>
  );
}

function Dates() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Dates">
      <TopContent />
      <BottomContent />
    </div>
  );
}

function Calendar() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[20px] shrink-0" data-name="Calendar" style={{ backgroundImage: "linear-gradient(105.508deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Title />
      <Dates />
    </div>
  );
}

function RightContent() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-end pb-[18px] pt-0 px-0 relative shrink-0" data-name="Right Content">
      <Video />
      <Calendar />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Contents">
      <LeftContentButton />
      <RightContent />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[50px] shrink-0" data-name="Text" style={{ backgroundImage: "linear-gradient(124.221deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Mind</p>
    </div>
  );
}

function Item() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-start left-[518px] top-[180px]" data-name="Item 1">
      <Text1 />
      <DotBackgroundImage />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[50px] shrink-0" data-name="Text" style={{ backgroundImage: "linear-gradient(124.58deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Body</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-start left-[816px] top-[507px]" data-name="Item 2">
      <DotBackgroundImage />
      <Text2 />
    </div>
  );
}

function Contents1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Contents">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContents} />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start justify-between pb-[16px] pt-[26px] px-[34px] relative size-full">
          <Navigation />
          <Contents />
          <Item />
          <Item1 />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="h-[660px] relative shrink-0 w-full" data-name="Hero Section">
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[16px] py-0 relative size-full">
          <Contents1 />
        </div>
      </div>
    </div>
  );
}

function PlayButton1() {
  return (
    <BackgroundImage5>
      <g id="Play Button">
        <rect fill="var(--fill-0, #222222)" height="64" rx="32" width="64" />
        <path d={svgPaths.p315deb40} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </BackgroundImage5>
  );
}

function TopButton() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Top Button">
      <PlayButton1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="backdrop-blur-[5px] backdrop-filter bg-white content-stretch flex items-center justify-center px-[40px] py-[6px] relative rounded-[50px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px] text-nowrap">Book Now</p>
    </div>
  );
}

function BottomButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Bottom Buttons">
      <Button2 />
      <ButtonBackgroundImageAndText text="Check Availability" />
    </div>
  );
}

function Ornament() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex flex-col gap-[442px] h-[590px] items-start p-[24px] relative rounded-[20px] shrink-0 w-[575px]" data-name="Ornament">
      <TopButton />
      <BottomButtons />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#222]" data-name="Text">
      <BackgroundImage text="You Deserve to be" text1="Mentally Healthy" additionalClassNames="leading-[64px] text-[56px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic opacity-75 relative shrink-0 text-[20px] w-[721px]">Discover the heart behind our mental health platform. At our core, we are a compassionate community of experts dedicated to guiding you on your journey to emotional well-being and resilience.</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0" data-name="Title">
      <Text3 />
      <ButtonBackgroundImageAndText1 text="Get Started" additionalClassNames="bg-[#222]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="Icon">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgIcon} />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-white" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-nowrap">Confidentiality</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-75 relative shrink-0 w-[187px]">Your privacy is sacred; we maintain the highest level of confidentiality.</p>
    </div>
  );
}

function Item3() {
  return (
    <div className="bg-[#3973e1] content-stretch flex flex-col gap-[16px] h-[204px] items-start p-[24px] relative rounded-[20px] shrink-0 w-[235px]" data-name="Item 1">
      <Icon />
      <Text4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="Icon">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgIcon1} />
    </div>
  );
}

function Item4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[235px]" data-name="Item 2">
      <Icon1 />
      <TextBackgroundImage text="Accessibility" text1="Accessible mental health support to all background and areas." />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="Icon">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgIcon2} />
    </div>
  );
}

function Item2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[235px]" data-name="Item 3">
      <Icon2 />
      <TextBackgroundImage text="Community" text1="We foster a supportive community where you can connect and share." />
    </div>
  );
}

function Items() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Items">
      <Item3 />
      <Item4 />
      <Item2 />
    </div>
  );
}

function TitleItems() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-end relative shrink-0" data-name="Title + Items">
      <Title1 />
      <Items />
    </div>
  );
}

function ValuesSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Values Section">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between px-[50px] py-0 relative w-full">
          <Ornament />
          <TitleItems />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#222]" data-name="Text">
      <BackgroundImage text="Our Mental" text1="Health Services" additionalClassNames="leading-[64px] text-[56px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic opacity-50 relative shrink-0 text-[20px] w-[660px]">Explore our diverse services designed to nurture your mental health. From online counseling to self-care tools, we offer a holistic approach to help you achieve the emotional balance and strength you deserve.</p>
    </div>
  );
}

function TextBadge() {
  return (
    <div className="content-stretch flex flex-col gap-[276px] items-start relative shrink-0" data-name="Text + Badge">
      <ButtonBackgroundImageAndText2 text="# Services" />
      <Text5 />
    </div>
  );
}

function Texts1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end pb-[24px] pl-[24px] pr-0 pt-0 relative shrink-0 text-white" data-name="Texts">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Counseling
      </p>
      <div className="font-['Inter:Regular',sans-serif] font-normal h-[48px] leading-[24px] not-italic relative shrink-0 text-[16px] w-full">
        <p className="mb-0">One-on-one sessions with our expert also</p>
        <p>experienced mental health therapists.</p>
      </div>
    </div>
  );
}

function IconTexts() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon + Texts">
      <Texts1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end justify-end min-h-px min-w-px relative shrink-0" data-name="Button">
      <ButtonBackgroundImageAndText1 text="Get Started" additionalClassNames="bg-[#222]" />
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex h-[418px] items-end justify-between p-[16px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[620px]" data-name="Item 1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem1} />
      <IconTexts />
      <Button3 />
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] pt-0 px-0 relative shrink-0 w-[620px]" data-name="Item 2">
      <div aria-hidden="true" className="absolute border-[#222] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <IconTitleBackgroundImageAndText text="Group Therapy" />
      <ArrowBackgroundImage additionalClassNames="shrink-0" />
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] pt-0 px-0 relative shrink-0 w-[620px]" data-name="Item 3">
      <div aria-hidden="true" className="absolute border-[#222] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <IconTitleBackgroundImageAndText text="Crisis Helpline" />
      <ArrowBackgroundImage additionalClassNames="shrink-0" />
    </div>
  );
}

function Items1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Items">
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContent} />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[34px] py-[40px] relative w-full">
          <TextBadge />
          <Items1 />
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <BackgroundImage4 additionalClassNames="rounded-[20px]">
      <Content />
    </BackgroundImage4>
  );
}

function TitleBadge() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Title + Badge">
      <ButtonBackgroundImageAndText2 text="# Issues" />
      <div className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] min-w-full relative shrink-0 text-[#222] text-[56px] text-center w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Common Mental Health</p>
        <p>Issues We Address</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex flex-col h-[455px] items-start justify-between p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[433px]" data-name="Item 1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem2} />
      <ButtonBackgroundImage />
      <TextBackgroundImageAndText text="Depression" />
    </div>
  );
}

function ArrowButton() {
  return (
    <BackgroundImage3>
      <rect fill="var(--fill-0, #222222)" height="64" rx="32" width="64" />
      <path d={svgPaths.p1c7f2f00} fill="var(--stroke-0, white)" id="Arrow" />
    </BackgroundImage3>
  );
}

function Button4() {
  return (
    <BackgroundImage2>
      <ArrowButton />
    </BackgroundImage2>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex flex-col h-[455px] items-start justify-between p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[433px]" data-name="Item 2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem3} />
      <Button4 />
      <TextBackgroundImageAndText text="Anger Issues" />
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex flex-col h-[455px] items-start justify-between p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-[433px]" data-name="Item 3">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem4} />
      <ButtonBackgroundImage />
      <TextBackgroundImageAndText text="Anxiety" />
    </div>
  );
}

function Items2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Items">
      <Item8 />
      <Item9 />
      <Item10 />
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[40px] py-[6px] relative rounded-[50px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#222] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px] text-nowrap">Learn More</p>
    </div>
  );
}

function IssuesSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Issues Section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[56px] items-center px-[50px] py-0 relative w-full">
          <TitleBadge />
          <Items2 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col gap-[268px] items-start mr-[-40px] pl-[34px] pr-0 py-[34px] relative rounded-[20px] shrink-0 w-[595px]" data-name="Title">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgTitle} />
      <ButtonBackgroundImageAndText2 text="# How It Works" />
      <BackgroundImage text="Your Path" text1="to Wellness" additionalClassNames="leading-[64px] text-[#222] text-[56px]" />
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex gap-[44px] items-center relative shrink-0 w-[785px]" data-name="Item 1">
      <NumberBackgroundImageAndText1 text="1" />
      <TextBackgroundImage1 text="Assessment" text1="Our experienced therapist will assess and understand your mental health needs during counseling through some tests." />
    </div>
  );
}

function Item12() {
  return (
    <div className="content-stretch flex gap-[44px] items-center relative shrink-0 w-[785px]" data-name="Item 2">
      <NumberBackgroundImageAndText1 text="2" />
      <TextBackgroundImage1 text="Sessions" text1="We will decide on regular counseling or group support and execute based on the mental health test curated by our expert therapist." />
    </div>
  );
}

function Item13() {
  return (
    <div className="content-stretch flex gap-[44px] items-center relative shrink-0 w-[785px]" data-name="Item 3">
      <NumberBackgroundImageAndText1 text="3" />
      <TextBackgroundImage1 text="Tracking" text1="The therapist assigned to your case will monitor and adjust your therapy session progress to make sure you get the best experience." />
    </div>
  );
}

function Items3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start mr-[-40px] relative shrink-0" data-name="Items">
      <Item11 />
      <Item12 />
      <Item13 />
    </div>
  );
}

function HowItWorksSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="How It Works Section">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[50px] pr-[90px] py-0 relative w-full">
          <Title2 />
          <Items3 />
        </div>
      </div>
    </div>
  );
}

function Photo() {
  return (
    <div className="relative rounded-[100px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 size-[80px]" data-name="Photo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgPhoto} />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-[#222] text-nowrap" data-name="Text">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[24px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Veronica L.
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic opacity-50 relative shrink-0 text-[16px]">Client from United States</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Profile">
      <Photo />
      <Text6 />
    </div>
  );
}

function ArrowsProfile() {
  return (
    <div className="content-stretch flex gap-[72px] items-center relative shrink-0" data-name="Arrows + Profile">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ArrowBackgroundImage />
        </div>
      </div>
      <Profile />
      <ArrowBackgroundImage additionalClassNames="shrink-0" />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[rgba(57,115,225,0.05)] content-stretch flex flex-col gap-[40px] items-center px-0 py-[64px] relative shrink-0 w-full" data-name="Content">
      <ButtonBackgroundImageAndText2 text="# Testimonials" />
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] relative shrink-0 text-[#222] text-[56px] text-center w-[1170px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`"PeaceHub gave me the strength to overcome my anxiety. The compassionate therapists provided unwavering support, and I've found a renewed sense of purpose and tranquility in my life."`}</p>
      <ArrowsProfile />
    </div>
  );
}

function TestimonialSection() {
  return (
    <div className="relative rounded-[20px] shrink-0 w-full" data-name="Testimonial Section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] py-0 relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#222]" data-name="Title">
      <BackgroundImage text="Ready to embark on the" text1="journey of wellness?" additionalClassNames="leading-[64px] text-[56px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic opacity-75 relative shrink-0 text-[20px] w-[680px]">Start your mental health transformation with our experienced therapists today. Get to be in your ultimate inner peace and lasting well-being with our programs, tailored special to your health needs.</p>
    </div>
  );
}

function TitleButton() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0" data-name="Title + Button">
      <Title3 />
      <ButtonBackgroundImageAndText1 text="Get Started" additionalClassNames="bg-[#3973e1]" />
    </div>
  );
}

function Photo1() {
  return (
    <div className="h-[274px] relative rounded-[20px] shrink-0 w-[595px]" data-name="Photo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgPhoto1} />
    </div>
  );
}

function LetsStayHealthy() {
  return (
    <div className="bg-[rgba(234,192,222,0.25)] content-stretch flex items-center justify-center px-[60px] py-[44px] relative rounded-[20px] shrink-0" data-name="#LetsStayHealthy">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[#222] text-[32px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        #LetsStayHealthy
      </p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 text-nowrap text-white" data-name="Text">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        50%
      </p>
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[24px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Discount
      </p>
    </div>
  );
}

function Discount() {
  return (
    <div className="content-stretch flex flex-col h-[128px] items-start justify-end pb-[16px] pl-[16px] pr-0 pt-0 relative rounded-[20px] shrink-0 w-[184px]" data-name="Discount">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgDiscount} />
      <Text7 />
    </div>
  );
}

function HashtagPromo() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Hashtag + Promo">
      <LetsStayHealthy />
      <Discount />
    </div>
  );
}

function Ornament1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Ornament">
      <Photo1 />
      <HashtagPromo />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="CTA Section">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[50px] py-0 relative w-full">
          <TitleButton />
          <Ornament1 />
        </div>
      </div>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Title">
      <div className="h-[32px] relative shrink-0 w-[219px]" data-name="Company Logo">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 219 32">
          <g id="Company Logo">
            <path d={svgPaths.p11f38880} fill="white" />
            <path d={svgPaths.p2d10bd40} fill="white" />
            <path d={svgPaths.p23d519c0} fill="white" />
            <path d={svgPaths.p39f24f80} fill="white" />
            <path d={svgPaths.p3806b800} fill="white" />
            <path d={svgPaths.p188b4000} fill="white" />
            <path d={svgPaths.p3941ff00} fill="white" />
            <path d={svgPaths.pef7bb00} fill="white" />
            <path d={svgPaths.p3623d700} fill="white" />
            <path d={svgPaths.pa519400} fill="white" />
          </g>
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-[575px]">We are mental health experienced therapists that are passionate about our goal on empowering you mentally with our wellness journey.</p>
    </div>
  );
}

function NewsletterEmailForm() {
  return (
    <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative rounded-[50px] shrink-0 w-[575px]" data-name="Newsletter Email Form">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] text-nowrap">Enter email address for newsletter ...</p>
      <div className="h-0 relative shrink-0 w-[32px]" data-name="Arrow">
        <div className="absolute inset-[-3.68px_-1.56%_-3.68px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 8">
            <path d={svgPaths.pdf35200} fill="var(--stroke-0, white)" fillOpacity="0.5" id="Arrow" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0" data-name="Newsletter">
      <NewsletterEmailForm />
    </div>
  );
}

function LeftContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[58px] items-start relative shrink-0" data-name="Left Content">
      <Title4 />
      <Newsletter />
    </div>
  );
}

function Menu1() {
  return (
    <div className="content-stretch flex gap-[132px] items-start leading-[0] relative shrink-0" data-name="Menu">
      <BackgroundImage1 text="About Us" text1="Our Stories" text2="Career" text3="Testimonials" />
      <BackgroundImage1 text="FAQ" text1="Price List" text2="User Policy" text3="Support" />
      <BackgroundImage1 text="Phone" text1="Email" text2="Location" text3="Social Media" />
    </div>
  );
}

function Button6() {
  return (
    <div className="backdrop-blur-[5px] backdrop-filter content-stretch flex items-center justify-center px-[40px] py-[6px] relative rounded-[50px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(130.96deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Back to Top</p>
    </div>
  );
}

function CopyrightButton() {
  return (
    <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Copyright + Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic opacity-50 relative shrink-0 text-[16px] text-nowrap text-white">Copyright © PeaceHub 2023</p>
      <Button6 />
    </div>
  );
}

function RightContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0" data-name="Right Content">
      <Menu1 />
      <CopyrightButton />
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 bg-[#222] grow min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[28px] pt-[34px] px-[34px] relative w-full">
          <LeftContent1 />
          <RightContent1 />
        </div>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <BackgroundImage4>
      <Content2 />
    </BackgroundImage4>
  );
}

function LandingPageAutolayout() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[64px] items-center overflow-x-hidden px-0 py-[16px] w-full min-h-screen" data-name="Landing Page_Autolayout">
      <HeroSection />
      <ValuesSection />
      <ServicesSection />
      <IssuesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="relative size-full">
      <LandingPageAutolayout />
    </div>
  );
}
