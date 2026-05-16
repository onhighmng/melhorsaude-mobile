import svgPaths from "./svg-nfai9gnzgt";
import clsx from "clsx";
const imgItem1 = "/landing-assets/aa46251bfd5c0f2a063122abb0c4056cfd0caa09.png";
const imgItem2 = "/landing-assets/d90a84cb609f1b610ce6ce9223e6f91aae146194.png";
const imgItem3 = "/landing-assets/1bb31e908950e682afd9c82e036c3558a46fb19d.png";
const imgItem4 = "/landing-assets/320a6305ad5388a25cf18b0b0d77e82e5c57e018.png";
const imgIcon = "/landing-assets/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1 = "/landing-assets/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2 = "/landing-assets/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
const imgEllipse = "/landing-assets/918aa089c01a40e33a181fc5b6a70198ce80b028.png";
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("size-[64px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage3 additionalClassNames="relative shrink-0">
      <g id="Arrow Button">{children}</g>
    </BackgroundImage3>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between pl-[321px] pr-0 py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}
type EllipseBackgroundImage1Props = {
  additionalClassNames?: string;
};

function EllipseBackgroundImage1({ additionalClassNames = "" }: EllipseBackgroundImage1Props) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
      </svg>
    </div>
  );
}
type EllipseBackgroundImageProps = {
  additionalClassNames?: string;
};

function EllipseBackgroundImage({ additionalClassNames = "" }: EllipseBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse} width="32" />
    </div>
  );
}
type NumberBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function NumberBackgroundImageAndText1({ text, additionalClassNames = "" }: NumberBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute bg-white content-stretch flex flex-col items-center justify-center pl-[10px] pr-[11px] py-[4px] rounded-[100px] size-[32px]", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ListBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ListBackgroundImageAndText({ text, additionalClassNames = "" }: ListBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex items-center justify-between left-[50px] pb-[12px] pt-0 px-0", additionalClassNames)}>
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
type ButtonBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText2({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute content-stretch flex items-center justify-center px-[40px] py-[6px] rounded-[50px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}
type TextBackgroundImage1Props = {
  text: string;
  text1: string;
};

function TextBackgroundImage1({ text, text1 }: TextBackgroundImage1Props) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-nowrap">{text}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-50 relative shrink-0 w-[187px]">{text1}</p>
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
    <BackgroundImage1>
      <ArrowButtonBackgroundImage />
    </BackgroundImage1>
  );
}

function ArrowButtonBackgroundImage() {
  return (
    <BackgroundImage2>
      <rect fill="var(--fill-0, #3973E1)" height="64" rx="32" width="64" />
      <path d={svgPaths.p1c7f2f00} fill="var(--stroke-0, white)" id="Arrow" />
    </BackgroundImage2>
  );
}
type TextBackgroundImageProps = {
  text: string;
  text1: string;
};

function TextBackgroundImage({ text, text1 }: TextBackgroundImageProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 text-[#222]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic opacity-50 relative shrink-0 text-[20px] w-full">{text1}</p>
    </div>
  );
}
type NumberBackgroundImageAndTextProps = {
  text: string;
};

function NumberBackgroundImageAndText({ text }: NumberBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#222] content-stretch flex flex-col items-center justify-center px-[24px] py-[20px] relative rounded-[100px] shrink-0 size-[80px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] relative shrink-0 text-[32px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}
type ArrowBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ArrowBackgroundImage1({ additionalClassNames = "" }: ArrowBackgroundImage1Props) {
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
type ButtonBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute bg-[#222] content-stretch flex items-center justify-center px-[40px] py-[6px] rounded-[50px]", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
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
    <div style={{ fontVariationSettings: "'opsz' 14" }} className={clsx("absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[50px] text-[#222] text-[56px] text-nowrap", additionalClassNames)}>
      <p className="mb-0">{text}</p>
      <p>{text1}</p>
    </div>
  );
}
type DotBackgroundImageProps = {
  additionalClassNames?: string;
};

function DotBackgroundImage({ additionalClassNames = "" }: DotBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[40px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Dot">
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse" opacity="0.25" r="20" />
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse_2" opacity="0.5" r="14" />
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse_3" r="6" />
        </g>
      </svg>
    </div>
  );
}

function ArrowBackgroundImage() {
  return (
    <div className="h-0 relative shrink-0 w-[40px]">
      <div className="absolute inset-[-3.68px_-1.25%_-3.68px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 8">
          <path d={svgPaths.p7d025f0} fill="var(--stroke-0, white)" id="Arrow" />
        </svg>
      </div>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[8px] rounded-[50px]", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
      <ArrowBackgroundImage />
    </div>
  );
}

function About() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(56.25%-15px)] not-italic text-[16px] text-nowrap text-white top-[4727px]" data-name="About">
      <p className="absolute left-[calc(56.25%-15px)] opacity-75 top-[4727px]">About Us</p>
      <p className="absolute left-[calc(56.25%-15px)] opacity-75 top-[4763px]">Our Stories</p>
      <p className="absolute left-[calc(56.25%-15px)] opacity-75 top-[4799px]">Career</p>
      <p className="absolute left-[calc(56.25%-15px)] opacity-75 top-[4835px]">Testimonials</p>
    </div>
  );
}

function Support() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(68.75%+32px)] not-italic text-[16px] text-nowrap text-white top-[4727px]" data-name="Support">
      <p className="absolute left-[calc(68.75%+32px)] opacity-75 top-[4727px]">FAQ</p>
      <p className="absolute left-[calc(68.75%+32px)] opacity-75 top-[4763px]">Price List</p>
      <p className="absolute left-[calc(68.75%+32px)] opacity-75 top-[4799px]">User Policy</p>
      <p className="absolute left-[calc(68.75%+32px)] opacity-75 top-[4835px]">Support</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(87.5%-20px)] not-italic text-[16px] text-nowrap text-white top-[4727px]" data-name="Contact">
      <p className="absolute left-[calc(87.5%-20px)] opacity-75 top-[4727px]">Phone</p>
      <p className="absolute left-[calc(87.5%-20px)] opacity-75 top-[4763px]">Email</p>
      <p className="absolute left-[calc(87.5%-20px)] opacity-75 top-[4799px]">Location</p>
      <p className="absolute left-[calc(87.5%-20px)] opacity-75 top-[4835px]">Social Media</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents left-[calc(56.25%-15px)] top-[4727px]" data-name="Menu">
      <About />
      <Support />
      <Contact />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute backdrop-blur-[5px] backdrop-filter content-stretch flex items-center justify-center left-[calc(87.5%-40px)] px-[40px] py-[6px] rounded-[50px] top-[4907px]" data-name="Button" style={{ backgroundImage: "linear-gradient(130.96deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Back to Top</p>
    </div>
  );
}

function NewsletterEmailForm() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[50px] px-[32px] py-[16px] rounded-[50px] top-[4881px] w-[575px]" data-name="Newsletter Email Form">
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

function FooterSection() {
  return (
    <div className="absolute contents left-[16px] top-[4693px]" data-name="Footer Section">
      <div className="absolute bg-[#222] h-[278px] left-[16px] rounded-[20px] top-[4693px] w-[1408px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[50px] not-italic text-[16px] text-white top-[4775px] w-[575px]">We are mental health experienced therapists that are passionate about our goal on empowering you mentally with our wellness journey.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(56.25%-15px)] not-italic opacity-50 text-[16px] text-nowrap text-white top-[4913px]">Copyright © PeaceHub 2023</p>
      <Menu />
      <div className="absolute h-[32px] left-[50px] top-[4727px] w-[219px]" data-name="Company Logo">
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
      <Button />
      <NewsletterEmailForm />
    </div>
  );
}

function LetsStayHealthy() {
  return (
    <div className="absolute contents left-[calc(56.25%-15px)] top-[4501px]" data-name="#LetsStayHealthy">
      <div className="absolute bg-[rgba(234,192,222,0.25)] h-[128px] left-[calc(56.25%-15px)] rounded-[20px] top-[4501px] w-[395px]" data-name="Rectangle" />
      <p className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] left-[calc(56.25%+182.5px)] text-[#222] text-[32px] text-center text-nowrap top-[4545px] translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14" }}>
        #LetsStayHealthy
      </p>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute h-[128px] left-[calc(81.25%+36px)] top-[4501px] w-[184px]" data-name="Background">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 184 128">
        <g id="Background">
          <mask height="128" id="mask0_57_613" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="184" x="0" y="0">
            <rect fill="var(--fill-0, #3973E1)" height="128" id="Rectangle" rx="20" width="184" />
          </mask>
          <g mask="url(#mask0_57_613)">
            <rect fill="var(--fill-0, #3973E1)" height="128" id="Rectangle_2" rx="20" width="184" />
            <path d={svgPaths.p33928b00} id="Vector" opacity="0.15" stroke="var(--stroke-0, white)" strokeWidth="13.1091" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Discount() {
  return (
    <div className="absolute contents left-[calc(81.25%+36px)] top-[4501px]" data-name="Discount">
      <Background />
      <p className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] left-[calc(87.5%-38px)] text-[32px] text-nowrap text-white top-[4541px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        50%
      </p>
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] left-[calc(87.5%-38px)] text-[24px] text-nowrap text-white top-[4581px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Discount
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(56.25%+19px)] px-[24px] py-[8px] rounded-[50px] top-[4288px]" data-name="Text" style={{ backgroundImage: "linear-gradient(125.984deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Confidentiality</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="absolute contents left-[calc(56.25%+19px)] top-[4288px]" data-name="Item 1">
      <Text />
      <DotBackgroundImage additionalClassNames="left-[calc(68.75%+1px)] top-[4288px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(81.25%+37px)] px-[24px] py-[8px] rounded-[50px] top-[4405px]" data-name="Text" style={{ backgroundImage: "linear-gradient(123.312deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Accessibility</p>
    </div>
  );
}

function Item2() {
  return (
    <div className="absolute contents left-[calc(81.25%-7px)] top-[4405px]" data-name="Item 2">
      <Text1 />
      <DotBackgroundImage additionalClassNames="left-[calc(81.25%-7px)] top-[4405px]" />
    </div>
  );
}

function Photo() {
  return (
    <div className="absolute contents left-[calc(56.25%-15px)] top-[4211px]" data-name="Photo">
      <div className="absolute bg-[#d9d9d9] h-[274px] left-[calc(56.25%-15px)] rounded-[20px] top-[4211px] w-[595px]" data-name="Photo" />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Ornament() {
  return (
    <div className="absolute contents left-[calc(56.25%-15px)] top-[4211px]" data-name="Ornament">
      <LetsStayHealthy />
      <Discount />
      <Photo />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="absolute contents left-[50px] top-[4211px]" data-name="CTA Section">
      <BackgroundImage text="Ready to embark on the" text1="journey of wellness?" additionalClassNames="top-[4259px]" />
      <ButtonBackgroundImageAndText text="Get Started" additionalClassNames="bg-[#3973e1] left-[50px] top-[4541px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[50px] not-italic opacity-75 text-[#222] text-[20px] top-[4403px] w-[680px]">Start your mental health transformation with our experienced therapists today. Get to be in your ultimate inner peace and lasting well-being with our programs, tailored special to your health needs.</p>
      <Ornament />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute contents left-[16px] top-[3503px]" data-name="Background">
      <div className="absolute bg-[rgba(57,115,225,0.05)] h-[644px] left-[16px] rounded-[20px] top-[3503px] w-[1408px]" data-name="Rectangle" />
      <div className="absolute h-[644px] left-[16px] opacity-[0.15] rounded-[20px] top-[3503px] w-[1408px]" data-name="Rectangle" />
    </div>
  );
}

function Profile() {
  return (
    <div className="absolute contents left-[calc(37.5%+37px)] top-[4003px]" data-name="Profile">
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] left-[calc(43.75%+43px)] text-[#222] text-[24px] text-nowrap top-[4013px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Veronica L.
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(43.75%+43px)] not-italic opacity-50 text-[#222] text-[16px] text-nowrap top-[4049px]">Client from United States</p>
      <div className="absolute left-[calc(37.5%+37px)] size-[80px] top-[4003px]" data-name="Photo">
        <div className="absolute inset-[-37.5%_-50%_-62.5%_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 160">
            <g filter="url(#filter0_d_57_592)" id="Photo">
              <circle cx="80" cy="70" fill="var(--fill-0, #D9D9D9)" r="40" />
              <circle cx="80" cy="70" r="37.5" stroke="var(--stroke-0, white)" strokeWidth="5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="160" id="filter0_d_57_592" width="160" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_57_592" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_57_592" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <div className="absolute contents left-[16px] top-[3503px]" data-name="Testimonial Section">
      <Background1 />
      <p className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[calc(6.25%+630px)] text-[#222] text-[56px] text-center top-[3643px] translate-x-[-50%] w-[1170px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`"PeaceHub gave me the strength to overcome my anxiety. The compassionate therapists provided unwavering support, and I've found a renewed sense of purpose and tranquility in my life."`}</p>
      <ButtonBackgroundImageAndText1 text="# Testimonials" additionalClassNames="left-[calc(43.75%-4px)] top-[3567px]" />
      <Profile />
      <ArrowBackgroundImage1 additionalClassNames="absolute left-[calc(62.5%+36px)] top-[4043px]" />
      <div className="absolute flex h-0 items-center justify-center left-[calc(31.25%+7px)] top-[4043px] w-[48px]">
        <div className="flex-none rotate-[180deg]">
          <ArrowBackgroundImage1 additionalClassNames="relative" />
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute h-[500px] left-[50px] top-[2939px] w-[595px]" data-name="Background">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 595 500">
        <g id="Background">
          <mask height="500" id="mask0_57_606" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="595" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="500" id="Rectangle" rx="20" width="595" />
          </mask>
          <g mask="url(#mask0_57_606)">
            <rect fill="var(--fill-0, #EAC0DE)" fillOpacity="0.25" height="500" id="Rectangle_2" rx="20" width="595" />
            <path d={svgPaths.pcd4fd00} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="40" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Item4() {
  return (
    <div className="absolute content-stretch flex gap-[44px] items-center left-[calc(37.5%+65px)] top-[2987px] w-[785px]" data-name="Item 1">
      <NumberBackgroundImageAndText text="1" />
      <TextBackgroundImage text="Assessment" text1="Our experienced therapist will assess and understand your mental health needs during counseling through some tests." />
    </div>
  );
}

function Item5() {
  return (
    <div className="absolute content-stretch flex gap-[44px] items-center left-[calc(37.5%+65px)] top-[3135px] w-[785px]" data-name="Item 2">
      <NumberBackgroundImageAndText text="2" />
      <TextBackgroundImage text="Sessions" text1="We will decide on regular counseling or group support and execute based on the mental health test curated by our expert therapist." />
    </div>
  );
}

function Item3() {
  return (
    <div className="absolute content-stretch flex gap-[44px] items-center left-[calc(37.5%+65px)] top-[3283px] w-[785px]" data-name="Item 3">
      <NumberBackgroundImageAndText text="3" />
      <TextBackgroundImage text="Tracking" text1="The therapist assigned to your case will monitor and adjust your therapy session progress to make sure you get the best experience." />
    </div>
  );
}

function Items() {
  return (
    <div className="absolute contents left-[calc(37.5%+65px)] top-[2987px]" data-name="Items">
      <Item4 />
      <Item5 />
      <Item3 />
    </div>
  );
}

function HowItWorksSection() {
  return (
    <div className="absolute contents left-[50px] top-[2939px]" data-name="How It Works Section">
      <Background2 />
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[84px] text-[#222] text-[56px] text-nowrap top-[3277px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Your Path</p>
        <p>to Wellness</p>
      </div>
      <ButtonBackgroundImageAndText1 text="# How It Works" additionalClassNames="left-[84px] top-[2973px]" />
      <Items />
    </div>
  );
}

function Item6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[455px] items-start justify-between left-[50px] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[2328px] w-[433px]" data-name="Item 1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem1} />
      <ButtonBackgroundImage />
      <TextBackgroundImageAndText text="Depression" />
    </div>
  );
}

function ArrowButton() {
  return (
    <BackgroundImage2>
      <rect fill="var(--fill-0, #222222)" height="64" rx="32" width="64" />
      <path d={svgPaths.p1c7f2f00} fill="var(--stroke-0, white)" id="Arrow" />
    </BackgroundImage2>
  );
}

function Button2() {
  return (
    <BackgroundImage1>
      <ArrowButton />
    </BackgroundImage1>
  );
}

function Item7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[455px] items-start justify-between left-[calc(31.25%+54px)] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[2328px] w-[433px]" data-name="Item 2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem2} />
      <Button2 />
      <TextBackgroundImageAndText text="Anger Issues" />
    </div>
  );
}

function Item8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[455px] items-start justify-between left-[calc(62.5%+57px)] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[2328px] w-[433px]" data-name="Item 3">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem3} />
      <ButtonBackgroundImage />
      <TextBackgroundImageAndText text="Anxiety" />
    </div>
  );
}

function Items1() {
  return (
    <div className="absolute contents left-[50px] top-[2328px]" data-name="Items">
      <Item6 />
      <Item7 />
      <Item8 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(43.75%+7px)] px-[40px] py-[6px] rounded-[50px] top-[2839px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#222] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px] text-nowrap">Learn More</p>
    </div>
  );
}

function IssuesSection() {
  return (
    <div className="absolute contents left-[50px] top-[2084px]" data-name="Issues Section">
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[calc(25%+360px)] text-[#222] text-[56px] text-center text-nowrap top-[2144px] translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Common Mental Health</p>
        <p>Issues We Address</p>
      </div>
      <ButtonBackgroundImageAndText1 text="# Issues" additionalClassNames="left-[calc(43.75%+19px)] top-[2084px]" />
      <Items1 />
      <Button3 />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute h-[626px] left-[16px] top-[1394px] w-[1408px]" data-name="Background">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1408 626">
        <g id="Background">
          <mask height="626" id="mask0_57_597" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="1408" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="626" id="Rectangle" rx="20" width="1408" />
          </mask>
          <g mask="url(#mask0_57_597)">
            <rect fill="var(--fill-0, #EAC0DE)" fillOpacity="0.25" height="626" id="Rectangle_2" rx="20" width="1408" />
            <path d={svgPaths.p3e5db200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="40" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Texts() {
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
      <Texts />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#222] content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[8px] relative rounded-[50px] shrink-0" data-name="Button 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Get Started</p>
      <ArrowBackgroundImage />
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end justify-end min-h-px min-w-px relative shrink-0" data-name="Button">
      <Button1 />
    </div>
  );
}

function Item9() {
  return (
    <div className="absolute content-stretch flex h-[418px] items-end justify-between left-[calc(50%+50px)] p-[16px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[1434px] w-[620px]" data-name="Item 1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgItem4} />
      <IconTexts />
      <Button4 />
    </div>
  );
}

function Item10() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[calc(50%+50px)] pb-[16px] pt-0 px-0 top-[1868px] w-[620px]" data-name="Item 2">
      <div aria-hidden="true" className="absolute border-[#222] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <IconTitleBackgroundImageAndText text="Group Therapy" />
      <ArrowBackgroundImage1 additionalClassNames="relative shrink-0" />
    </div>
  );
}

function Item11() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[calc(50%+50px)] pb-[16px] pt-0 px-0 top-[1932px] w-[620px]" data-name="Item 3">
      <div aria-hidden="true" className="absolute border-[#222] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <IconTitleBackgroundImageAndText text="Crisis Helpline" />
      <ArrowBackgroundImage1 additionalClassNames="relative shrink-0" />
    </div>
  );
}

function Items2() {
  return (
    <div className="absolute contents left-[calc(50%+50px)] top-[1434px]" data-name="Items">
      <Item9 />
      <Item10 />
      <Item11 />
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="absolute contents left-[16px] top-[1394px]" data-name="Services Section">
      <Background3 />
      <BackgroundImage text="Our Mental" text1="Health Services" additionalClassNames="top-[1746px]" />
      <Items2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[50px] not-italic opacity-50 text-[#222] text-[20px] top-[1890px] w-[660px]">Explore our diverse services designed to nurture your mental health. From online counseling to self-care tools, we offer a holistic approach to help you achieve the emotional balance and strength you deserve.</p>
      <ButtonBackgroundImageAndText1 text="# Services" additionalClassNames="left-[50px] top-[1434px]" />
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

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-white" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-nowrap">Confidentiality</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-75 relative shrink-0 w-[187px]">Your privacy is sacred; we maintain the highest level of confidentiality.</p>
    </div>
  );
}

function Item12() {
  return (
    <div className="absolute bg-[#3973e1] content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[calc(43.75%+15px)] p-[24px] rounded-[20px] top-[1126px] w-[235px]" data-name="Item 1">
      <Icon />
      <Text2 />
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

function Item13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[62.5%] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[1126px] w-[235px]" data-name="Item 2">
      <Icon1 />
      <TextBackgroundImage1 text="Accessibility" text1="Accessible mental health support to all background and areas." />
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

function Item14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[calc(81.25%-15px)] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[1126px] w-[235px]" data-name="Item 3">
      <Icon2 />
      <TextBackgroundImage1 text="Community" text1="We foster a supportive community where you can connect and share." />
    </div>
  );
}

function Items3() {
  return (
    <div className="absolute contents left-[calc(43.75%+15px)] top-[1126px]" data-name="Items">
      <Item12 />
      <Item13 />
      <Item14 />
    </div>
  );
}

function PlayButton() {
  return (
    <BackgroundImage3 additionalClassNames="absolute left-[calc(31.25%+87px)] top-[764px]">
      <g id="Play Button">
        <rect fill="var(--fill-0, #222222)" height="64" rx="32" width="64" />
        <path d={svgPaths.p315deb40} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </BackgroundImage3>
  );
}

function Button5() {
  return (
    <div className="absolute backdrop-blur-[5px] backdrop-filter bg-white content-stretch flex items-center justify-center left-[74px] px-[40px] py-[6px] rounded-[50px] top-[1270px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px] text-nowrap">Book Now</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[90px] px-[24px] py-[8px] rounded-[50px] top-[972px]" data-name="Text" style={{ backgroundImage: "linear-gradient(128.647deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Therapy Session</p>
    </div>
  );
}

function Item() {
  return (
    <div className="absolute contents left-[90px] top-[972px]" data-name="Item">
      <Text3 />
      <DotBackgroundImage additionalClassNames="left-[calc(12.5%+88px)] top-[972px]" />
    </div>
  );
}

function Ornament1() {
  return (
    <div className="absolute contents left-[50px] top-[740px]" data-name="Ornament">
      <div className="absolute bg-[#d9d9d9] h-[590px] left-[50px] rounded-[20px] top-[740px] w-[575px]" data-name="Rectangle" />
      <PlayButton />
      <Button5 />
      <ButtonBackgroundImageAndText2 text="Check Availability" additionalClassNames="left-[calc(12.5%+59px)] top-[1270px]" />
      <Item />
    </div>
  );
}

function ValuesSection() {
  return (
    <div className="absolute contents left-[50px] top-[740px]" data-name="Values Section">
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[calc(43.75%+39px)] text-[#222] text-[56px] text-nowrap top-[772px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">You Deserve to be</p>
        <p>Mentally Healthy</p>
      </div>
      <ButtonBackgroundImageAndText text="Get Started" additionalClassNames="bg-[#222] left-[calc(43.75%+39px)] top-[1046px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(43.75%+39px)] not-italic opacity-75 text-[#222] text-[20px] top-[916px] w-[721px]">Discover the heart behind our mental health platform. At our core, we are a compassionate community of experts dedicated to guiding you on your journey to emotional well-being and resilience.</p>
      <Items3 />
      <Ornament1 />
    </div>
  );
}

function Text4() {
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
    <div className="absolute backdrop-blur-[5px] backdrop-filter content-stretch flex flex-col gap-[24px] items-start justify-center left-[50px] p-[16px] rounded-[20px] top-[292px]" data-name="Avatar" style={{ backgroundImage: "linear-gradient(111.353deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Text4 />
      <PhotoSign />
    </div>
  );
}

function PlayButton1() {
  return (
    <div className="absolute left-[calc(93.75%+8px)] size-[32px] top-[254px]" data-name="Play Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Play Button">
          <rect fill="var(--fill-0, #222222)" height="32" rx="16" width="32" />
          <path d={svgPaths.p1be4a600} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Video() {
  return (
    <div className="absolute contents left-[calc(81.25%-15px)] top-[126px]" data-name="Video">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(81.25%-15px)] not-italic text-[16px] text-white top-[294px] w-[235px]">Welcome to PeaceHub. Join us on our transformative journey towards lasting peace.</p>
      <div className="absolute h-[160px] left-[calc(81.25%-15px)] top-[126px] w-[235px]" data-name="Video">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235 160">
          <path d={svgPaths.p1f201372} fill="var(--fill-0, #F4F4F4)" id="Video" />
        </svg>
      </div>
      <PlayButton1 />
    </div>
  );
}

function Sessions() {
  return (
    <div className="absolute contents left-[50px] top-[184px]" data-name="Sessions">
      <ListBackgroundImageAndText text="Counseling" additionalClassNames="top-[184px] w-[235px]" />
      <ListBackgroundImageAndText text="Group Therapy" additionalClassNames="top-[232px] w-[302px]" />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(93.75%-44px)] top-[454px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">View All</p>
    </div>
  );
}

function BottomContent() {
  return (
    <div className="absolute contents left-[calc(75%+38px)] top-[586px]" data-name="Bottom Content">
      <EllipseBackgroundImage additionalClassNames="left-[calc(75%+38px)] top-[586px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(81.25%-16px)] top-[586px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(87.5%+2px)] top-[586px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(87.5%-34px)] top-[586px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(87.5%+38px)] top-[586px]" />
      <NumberBackgroundImageAndText1 text="10" additionalClassNames="left-[calc(81.25%+20px)] top-[586px]" />
      <NumberBackgroundImageAndText1 text="14" additionalClassNames="left-[calc(93.75%-16px)] top-[586px]" />
    </div>
  );
}

function TopContent() {
  return (
    <div className="absolute contents left-[calc(75%+14px)] top-[550px]" data-name="Top Content">
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(75%+14px)] top-[550px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(75%+50px)] top-[550px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(81.25%+32px)] top-[550px]" />
      <EllipseBackgroundImage1 additionalClassNames="left-[calc(87.5%-22px)] top-[550px]" />
      <EllipseBackgroundImage additionalClassNames="left-[calc(87.5%+14px)] top-[550px]" />
      <NumberBackgroundImageAndText1 text="3" additionalClassNames="left-[calc(81.25%-4px)] top-[550px]" />
      <NumberBackgroundImageAndText1 text="7" additionalClassNames="left-[calc(93.75%-40px)] top-[550px]" />
    </div>
  );
}

function Dates() {
  return (
    <div className="absolute contents left-[calc(75%+14px)] top-[550px]" data-name="Dates">
      <BottomContent />
      <TopContent />
    </div>
  );
}

function Calendar() {
  return (
    <div className="absolute contents left-[calc(75%-10px)] top-[430px]" data-name="Calendar">
      <div className="absolute border border-[rgba(255,255,255,0.5)] border-solid h-[212px] left-[calc(75%-10px)] rounded-[20px] top-[430px] w-[320px]" data-name="Rectangle" style={{ backgroundImage: "linear-gradient(105.508deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }} />
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] left-[calc(75%+14px)] text-[32px] text-nowrap text-white top-[454px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Book</p>
        <p>Schedule</p>
      </div>
      <Button6 />
      <Dates />
    </div>
  );
}

function Menu1() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[calc(31.25%+84px)] not-italic text-[16px] text-nowrap text-white top-[48px]" data-name="Menu">
      <p className="absolute left-[calc(31.25%+84px)] top-[48px]">About</p>
      <p className="absolute left-[calc(37.5%+80px)] top-[48px]">Services</p>
      <p className="absolute left-[calc(50%+6px)] top-[48px]">Resources</p>
      <p className="absolute left-[calc(56.25%+35px)] top-[48px]">Contact</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute contents left-[50px] top-[42px]" data-name="Navigation">
      <div className="absolute h-[20px] left-[50px] top-[50px] w-[137px]" data-name="Company Logo">
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
      <ButtonBackgroundImageAndText2 text="Sign in" additionalClassNames="left-[calc(87.5%-1px)] top-[42px]" />
      <Menu1 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(31.25%+84px)] px-[24px] py-[8px] rounded-[50px] top-[196px]" data-name="Text" style={{ backgroundImage: "linear-gradient(124.221deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Mind</p>
    </div>
  );
}

function Item15() {
  return (
    <div className="absolute contents left-[calc(31.25%+84px)] top-[196px]" data-name="Item 1">
      <Text5 />
      <DotBackgroundImage additionalClassNames="left-[calc(43.75%+56px)] top-[196px]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(56.25%+66px)] px-[24px] py-[8px] rounded-[50px] top-[523px]" data-name="Text" style={{ backgroundImage: "linear-gradient(124.58deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Body</p>
    </div>
  );
}

function Item16() {
  return (
    <div className="absolute contents left-[calc(56.25%+22px)] top-[523px]" data-name="Item 2">
      <Text6 />
      <DotBackgroundImage additionalClassNames="left-[calc(56.25%+22px)] top-[523px]" />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute contents left-[16px] top-[16px]" data-name="Hero Section">
      <div className="absolute h-[660px] left-[16px] top-[16px] w-[1408px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1408 660">
          <path d={svgPaths.p364f3000} fill="var(--fill-0, #D9D9D9)" id="Subtract" />
        </svg>
      </div>
      <Avatar />
      <div className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[88px] left-[50px] text-[#222] text-[80px] text-nowrap top-[484px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">A Journey to</p>
        <p>Mental Wellness</p>
      </div>
      <Video />
      <ButtonBackgroundImageAndText text="Get Started" additionalClassNames="bg-[#3973e1] left-[calc(50%+10px)] top-[602px]" />
      <Sessions />
      <Calendar />
      <Navigation />
      <Item15 />
      <Item16 />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white relative size-full" data-name="Landing Page">
      <FooterSection />
      <CtaSection />
      <TestimonialSection />
      <HowItWorksSection />
      <IssuesSection />
      <ServicesSection />
      <ValuesSection />
      <HeroSection />
    </div>
  );
}