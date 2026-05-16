import svgPaths from "./svg-u7iqlcxo49";
import clsx from "clsx";
import imgMaskGroup from "@/assets/frame-mental-health.png";
import imgMaskGroup1 from "@/assets/frame-gym.png";
import imgMaskGroup2 from "@/assets/frame-finance.png";
import imgMaskGroup3 from "@/assets/frame-legal.png";
import imgImage from "@/assets/frame-image.png";
import imgMelhorSaudeTransparentLogo1 from "@/assets/dashboard-logo-transparent.png";
import imgMelhorSaudeTransparentClean1 from "@/assets/dashboard-logo-clean.png";
type Wrapper1Props = {
  additionalClassNames?: string;
};

// Hydrated Logic
interface HomeFrameProps {
  setActiveTab?: (tab: string) => void;
  setIsQuestionnaireActive?: (active: boolean) => void;
}

function Wrapper1({ children, additionalClassNames = "", onClick }: React.PropsWithChildren<Wrapper1Props & { onClick?: () => void }>) {
  return (
    <div
      className={additionalClassNames}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.994px] px-[11.994px] relative size-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "", onClick }: React.PropsWithChildren<WrapperProps & { onClick?: () => void }>) {
  return <Wrapper1 additionalClassNames={clsx("relative rounded-[2.13569e+07px] shrink-0 size-[47.985px]", additionalClassNames)} onClick={onClick}>{children}</Wrapper1>;
}
type Icon2VectorProps = {
  additionalClassNames?: string;
};

function Icon2Vector({ additionalClassNames = "" }: Icon2VectorProps) {
  return (
    <div className={clsx("absolute bottom-3/4 top-[8.33%]", additionalClassNames)}>
      <div className="absolute inset-[-25%_-1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
          <path d="M0.999894 0.999894V4.99989" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
        </svg>
      </div>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText({ text, additionalClassNames = "" }: ButtonTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[49.697px] items-center justify-center rounded-[2.13569e+07px] w-[55.991px]", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32px] not-italic relative shrink-0 text-[#0a0a0a] text-[24px] text-center text-nowrap tracking-[0.0703px]">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText({ text, additionalClassNames = "" }: ParagraphTextProps) {
  return (
    <div className={clsx("absolute h-[14.579px] left-[34.56px] w-[87.875px]", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[14.577px] left-[44px] text-[#2e2b29] text-[16px] text-center text-nowrap top-[-0.18px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[76px] left-[0.01px] top-0 w-[233px]" data-name="Heading 1">
      <p className="absolute font-['Pacifico:Regular',sans-serif] h-[70px] leading-[36px] left-0 not-italic text-[#1a1a1a] text-[36px] top-0 tracking-[0.0703px] w-[207px]">Olá, João!👋</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-gradient-to-b from-[#9dbfd4] h-[172.995px] left-0 rounded-[20.248px] to-[rgba(157,191,212,0)] top-0 w-[156.993px]" data-name="Container" />;
}

function MaskGroup() {
  return (
    <div className="absolute h-[132.995px] left-[4px] top-[44.99px] w-[152.995px]" data-name="MaskGroup">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMaskGroup} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[14.579px] left-[26.09px] top-[13.21px] w-[104.811px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[14.577px] left-[52.5px] text-[#2e2b29] text-[16px] text-center text-nowrap top-[-0.18px] translate-x-[-50%]">Saúde Mental</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[14.579px] left-[44.62px] top-[33.21px] w-[67.746px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[14.577px] left-[34px] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[-0.64px] translate-x-[-50%]">Psicológico</p>
    </div>
  );
}

function MentalHealthCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute h-[172.995px] left-0 top-0 w-[156.993px] cursor-pointer hover:scale-[1.02] transition-transform"
      data-name="MentalHealthCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Container />
      <MaskGroup />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-gradient-to-b from-[#fcc066] h-[172.995px] left-0 rounded-[20.248px] to-[#f5efe6] top-0 via-[#f4b85d] via-[28.646%] w-[156.993px]" data-name="Container" />;
}

function MaskGroup1() {
  return (
    <div className="absolute left-0 size-[155.998px] top-[24px]" data-name="MaskGroup1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMaskGroup1} />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[14.579px] left-[36.48px] top-[13.21px] w-[84.026px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[14.577px] left-[42.5px] text-[#2e2b29] text-[16px] text-center text-nowrap top-[-0.18px] translate-x-[-50%]">Bem-estar</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[14.579px] left-[61.86px] top-[32.2px] w-[33.276px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[14.577px] left-[17px] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[-0.64px] translate-x-[-50%]">Físico</p>
    </div>
  );
}

function PhysicalWellnessCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute h-[172.995px] left-[169px] top-[0.99px] w-[156.993px] cursor-pointer hover:scale-[1.02] transition-transform"
      data-name="PhysicalWellnessCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Container1 />
      <MaskGroup1 />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-gradient-to-b from-[#8bbeb8] h-[172.995px] left-0 rounded-[20.248px] to-[rgba(139,190,184,0)] top-0 w-[156.993px]" data-name="Container" />;
}

function MaskGroup2() {
  return (
    <div className="absolute left-[8.99px] size-[143.995px] top-[28px]" data-name="MaskGroup2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMaskGroup2} />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[14.579px] left-[49.21px] top-[32.2px] w-[58.576px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[14.577px] left-[29.5px] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[-0.64px] translate-x-[-50%]">Financeira</p>
    </div>
  );
}

function FinancialAssistanceCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute h-[172.995px] left-0 top-[192px] w-[156.993px] cursor-pointer hover:scale-[1.02] transition-transform"
      data-name="FinancialAssistanceCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Container2 />
      <MaskGroup2 />
      <ParagraphText text="Assistência" additionalClassNames="top-[13.21px]" />
      <Paragraph4 />
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-gradient-to-b from-[#d8a4c4] h-[172.995px] left-0 rounded-[20.248px] to-[rgba(216,164,196,0)] top-0 w-[156.993px]" data-name="Container" />;
}

function MaskGroup3() {
  return (
    <div className="absolute left-[20px] size-[146.998px] top-[29px]" data-name="MaskGroup3">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMaskGroup3} />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[14.579px] left-[57.19px] top-[36.21px] w-[42.605px]" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[14.577px] left-[21.5px] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[-0.64px] translate-x-[-50%]">Jurídica</p>
    </div>
  );
}

function LegalAssistanceCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute h-[172.995px] left-[169px] top-[192px] w-[156.993px] cursor-pointer hover:scale-[1.02] transition-transform"
      data-name="LegalAssistanceCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Container3 />
      <MaskGroup3 />
      <ParagraphText text="Assistência" additionalClassNames="top-[16.2px]" />
      <Paragraph5 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-[14px] top-[384px]" data-name="Header">
      <p className="absolute font-['Source_Serif_Pro:Regular',sans-serif] h-[22px] leading-[normal] left-[14px] not-italic text-[#003b8d] text-[18px] top-[384px] tracking-[-0.9px] w-[312px]">Cuidar Das Pessoas Transforma Empresas</p>
    </div>
  );
}

function WellnessPillarCards({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="absolute h-[364.994px] left-[18.01px] top-[326px] w-[326px]" data-name="WellnessPillarCards">
      <MentalHealthCard onClick={() => setActiveTab?.('diagnostic-mental')} />
      <PhysicalWellnessCard onClick={() => setActiveTab?.('diagnostic-physical')} />
      <FinancialAssistanceCard onClick={() => setActiveTab?.('diagnostic-financial')} />
      <LegalAssistanceCard onClick={() => setActiveTab?.('diagnostic-legal')} />
      <Header />
    </div>
  );
}

function Heading1() {
  return <div className="h-[29.994px] shrink-0 w-full" data-name="Heading 2" />;
}

function Container4() {
  return <div className="h-[63.987px] shrink-0 w-full" data-name="Container" />;
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[157.968px] items-start left-[-0.99px] pb-0 pt-[23.997px] px-[23.997px] rounded-[24px] top-[76px]" data-name="Container">
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[56px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Group 1">
          <mask height="56" id="mask0_2045_232" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="56" x="0" y="0">
            <circle cx="28" cy="28" fill="var(--fill-0, #C4C4C4)" id="Ellipse 1" r="28" />
          </mask>
          <g mask="url(#mask0_2045_232)">
            <rect fill="var(--fill-0, white)" height="56" id="image 65" width="56" />
            <path d={svgPaths.p3526c680} fill="var(--fill-0, black)" id="north_east" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CardCta() {
  return (
    <div className="absolute bg-[#0046a2] content-stretch flex h-[78.202px] items-center left-[-0.99px] p-[20px] rounded-[32px] top-[227.26px] w-[134.883px]" data-name="Card CTA">
      <Group />
    </div>
  );
}

function Banner() {
  return (
    <div className="absolute contents left-[-0.99px] top-[88px]" data-name="Banner">
      <div className="absolute h-[199.609px] left-[6.01px] top-[88px] w-[356.999px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="199.609" src={imgImage} width="356.999" />
      </div>
      <CardCta />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[-0.99px] top-[88px]">
      <Banner />
      <div className="absolute font-['Source_Serif_Pro:SemiBold',sans-serif] h-auto leading-[1.2] left-0 not-italic text-[#1a1a1a] text-[clamp(18px,5vw,26px)] top-[90px] tracking-[-0.4492px] w-full px-6 text-center whitespace-normal break-words z-20">
        <p className="mb-0">Como estás a sentir-te hoje?</p>
      </div>
      <ButtonText text="🙁" additionalClassNames="bg-[#dbeafe] left-[91.01px] top-[162.56px]" />
      <ButtonText text="😡" additionalClassNames="bg-[#ffe2e2] left-[183.01px] top-[161.67px]" />
      <ButtonText text="😐" additionalClassNames="bg-[#f3f4f6] left-[275.01px] top-[161.67px]" />
      <ButtonText text="😃" additionalClassNames="bg-[#fff085] left-[275.01px] top-[229.13px]" />
      <ButtonText text="😊" additionalClassNames="bg-[#fef9c2] left-[183.01px] top-[229.13px]" />
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute contents left-0 top-[30px]" data-name="Header">
      <div className="absolute font-['Poppins:Light',sans-serif] leading-[normal] left-0 not-italic text-[#8a8a8a] text-[12px] text-nowrap top-[30px] tracking-[-0.6px]">
        <p className="mb-0">Bem-vindo ao seu espaço de bem-estar.</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[43px] left-[4.01px] top-[12px] w-[171px]">
      <Header1 />
    </div>
  );
}

function Container6({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="h-[622.94px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <WellnessPillarCards setActiveTab={setActiveTab} />
      <Container5 />
      <Group1 />
      <div className="absolute h-[129px] left-[268.01px] top-[-36px] w-[86px]" data-name="melhor saude transparent logo\ 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentLogo1} />
      </div>
      <Frame />
    </div>
  );
}

function BemEstarContent({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#e8f4f8] h-[852.889px] items-start pb-0 pt-[23.997px] px-[15.992px] relative shrink-0 to-[#b8e1f0] w-[393.348px]" data-name="BemEstarContent">
      <Container6 setActiveTab={setActiveTab} />
    </div>
  );
}

function App({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#e8f4f8] h-[852.889px] items-start left-0 to-[#b8e1f0] top-0" data-name="App">
      <BemEstarContent setActiveTab={setActiveTab} />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.66%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 11">
            <path d={svgPaths.p397e8580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
            <path d={svgPaths.pf62fc20} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper additionalClassNames="bg-[#007aff] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <Icon />
      </Wrapper>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_8.33%_8.33%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3cb89f00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper>
        <Icon1 />
      </Wrapper>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon2Vector additionalClassNames="left-[33.33%] right-[66.67%]" />
      <Icon2Vector additionalClassNames="left-[66.67%] right-[33.33%]" />
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p3363900} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 2">
            <path d="M0.999894 0.999894H18.998" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper>
        <Icon2 />
      </Wrapper>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
            <path d={svgPaths.p24cbd900} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.16%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p143a9180} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="basis-0 grow h-[47.985px] min-h-px min-w-px relative rounded-[2.13569e+07px] shrink-0"
      data-name="Button"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper1 additionalClassNames="size-full">
        <Icon3 />
      </Wrapper1>
    </div>
  );
}

function Container7({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="content-stretch flex gap-[11.994px] h-[47.985px] items-center relative shrink-0 w-full" data-name="Container">
      <Button onClick={() => setActiveTab?.('home')} />
      <Button1 onClick={() => setActiveTab?.('sessions')} />
      <Button2 onClick={() => setActiveTab?.('assistant')} />
      <Button3 onClick={() => setActiveTab?.('profile')} />
    </div>
  );
}

function BottomNav({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="absolute z-50 bg-[#1a1a1a] content-stretch flex flex-col h-[71.972px] items-start left-[58.72px] pb-0 pt-[11.994px] px-[23.997px] rounded-[2.13569e+07px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[764.93px] w-[275.916px]" data-name="BottomNav">
      <Container7 setActiveTab={setActiveTab} />
    </div>
  );
}

function MainUserDashboardCopy({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="absolute bg-white h-[853px] left-0 top-0 w-[393px]" data-name="main user dashboard (Copy)">
      <App setActiveTab={setActiveTab} />
      <BottomNav setActiveTab={setActiveTab} />
      <div className="absolute h-[14px] left-[255px] top-[88px] w-[137px]" data-name="melhor_saude_transparent_clean 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentClean1} />
      </div>
    </div>
  );
}

export default function HomeFrame(props: HomeFrameProps) {
  return (
    <div className="relative size-full">
      <MainUserDashboardCopy setActiveTab={props.setActiveTab} />
    </div>
  );
}
