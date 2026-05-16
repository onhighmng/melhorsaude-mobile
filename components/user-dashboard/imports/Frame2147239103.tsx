import svgPaths from "./svg-zf43v5wy79";
import clsx from "clsx";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function ArrowBack() {
  return (
    <Wrapper>
      <g id="arrow_back">
        <mask height="20" id="mask0_2030_340" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
          <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
        </mask>
        <g mask="url(#mask0_2030_340)">
          <path d={svgPaths.p1fcb3f20} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </g>
    </Wrapper>
  );
}

function Icon() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-between left-[12px] rounded-[100px] size-[40px] top-[49px]" data-name="Icon">
      <ArrowBack />
    </div>
  );
}

function Title() {
  return (
    <div className="absolute content-stretch flex h-[50px] items-center justify-center left-[52px] top-[44px] w-[271px]" data-name="Title">
      <p className="font-['Fredoka:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[24px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fun with Science
      </p>
    </div>
  );
}

function Frame() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_2030_357)" id="Frame">
        <g id="Vector"></g>
        <path d={svgPaths.p964ee80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p3f1bd580} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.pf1a180} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p2cbe4680} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_2030_357">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}

function Icon1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-between left-[323px] rounded-[100px] size-[40px] top-[49px]" data-name="Icon">
      <Frame />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[1.4] relative shrink-0 text-nowrap text-white w-full" data-name="Title">
      <p className="font-['Nunito:Bold',sans-serif] font-bold relative shrink-0 text-[14px]">03 Question</p>
      <p className="font-['Nunito:Medium',sans-serif] font-medium relative shrink-0 text-[12px]">3 of 7</p>
    </div>
  );
}

function Question() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 px-[12px] py-[8px] top-[94px] w-[375px]" data-name="Question">
      <Title1 />
    </div>
  );
}

function Top() {
  return (
    <div className="absolute bg-[#06abdd] h-[176px] left-0 rounded-bl-[32px] rounded-br-[32px] top-0 w-[375px]" data-name="Top">
      <Icon />
      <Title />
      <Icon1 />
      <Question />
      <div className="absolute left-[278px] size-[18px] top-[86px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p164dc300} fill="var(--fill-0, #FFB518)" id="Vector" />
        </svg>
      </div>
      <div className="absolute left-[85px] size-[12px] top-[44px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p661b2d0} fill="var(--fill-0, #FFB518)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute h-[176px] left-0 top-[-14px] w-[375px]">
      <Top />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-white h-[127px] left-[12px] overflow-clip rounded-[24px] top-[220px] w-[351px]">
      <div className="absolute flex flex-col font-['Fredoka:Regular',sans-serif] font-normal justify-center leading-[0] left-[22px] text-[26px] text-black top-[63.5px] tracking-[-0.52px] translate-y-[-50%] w-[307px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.1]">Which part of the cell is responsible for producing energy?</p>
      </div>
    </div>
  );
}

function Point() {
  return <div className="absolute bg-[#f5f5f5] left-[16px] rounded-[750px] size-[24px] top-[18px]" data-name="Point" />;
}

function Answer() {
  return (
    <div className="absolute bg-white h-[60px] left-[11px] rounded-[28px] top-[386px] w-[351px]" data-name="Answer">
      <Point />
      <div className="absolute flex flex-col font-['Nunito:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[56px] text-[16px] text-black text-nowrap top-[30px] translate-y-[-50%]">
        <p className="leading-[1.3]">Nucleus</p>
      </div>
    </div>
  );
}

function Point1() {
  return <div className="absolute bg-[#f5f5f5] left-[16px] rounded-[750px] size-[24px] top-[18px]" data-name="Point" />;
}

function Answer1() {
  return (
    <div className="absolute bg-white h-[60px] left-[12px] rounded-[28px] top-[464px] w-[351px]" data-name="Answer">
      <Point1 />
      <div className="absolute flex flex-col font-['Nunito:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[56px] text-[16px] text-black text-nowrap top-[30px] translate-y-[-50%]">
        <p className="leading-[1.3]">Ribosome</p>
      </div>
    </div>
  );
}

function Point2() {
  return (
    <Wrapper1 additionalClassNames="left-[14px] top-[16px]">
      <g id="Point">
        <rect fill="var(--fill-0, white)" height="24" rx="12" width="24" />
        <circle cx="12" cy="12" fill="var(--fill-0, #06ABDD)" id="Ellipse 5" r="7" />
      </g>
    </Wrapper1>
  );
}

function Answer2() {
  return (
    <div className="absolute bg-[rgba(221,69,6,0.08)] border-2 border-[#06abdd] border-solid h-[60px] left-[12px] rounded-[28px] top-[542px] w-[351px]" data-name="Answer">
      <Point2 />
      <div className="absolute flex flex-col font-['Nunito:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[54px] text-[16px] text-black text-nowrap top-[28px] translate-y-[-50%]">
        <p className="leading-[1.3]">Mitochondria</p>
      </div>
    </div>
  );
}

function Point3() {
  return <div className="absolute bg-[#f5f5f5] left-[16px] rounded-[750px] size-[24px] top-[18px]" data-name="Point" />;
}

function Answer3() {
  return (
    <div className="absolute bg-white h-[60px] left-[12px] rounded-[28px] top-[620px] w-[351px]" data-name="Answer">
      <Point3 />
      <div className="absolute flex flex-col font-['Nunito:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[56px] text-[16px] text-black text-nowrap top-[30px] translate-y-[-50%]">
        <p className="leading-[1.3]">Golgi Apparatus</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <Wrapper1 additionalClassNames="left-[20px] top-[18.5px]">
      <g clipPath="url(#clip0_2030_334)" id="Frame">
        <g id="Vector"></g>
        <path d={svgPaths.p2d7f2640} id="Vector_2" stroke="var(--stroke-0, #06ABDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p248d7180} id="Vector_3" stroke="var(--stroke-0, #06ABDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M9.7 17H14.3" id="Vector_4" stroke="var(--stroke-0, #06ABDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_2030_334">
          <rect fill="white" height="24" width="24" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Button() {
  return (
    <div className="absolute bg-white h-[61px] left-[8px] rounded-[1000px] top-[8px] w-[64px]" data-name="Button">
      <Frame1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#06abdd] h-[61px] left-[80px] rounded-[1000px] top-[8px] w-[263px]" data-name="Button">
      <div className="absolute flex flex-col font-['Nunito:Medium',sans-serif] font-medium justify-center leading-[0] left-[99px] text-[16px] text-nowrap text-white top-[30.5px] translate-y-[-50%]">
        <p className="leading-[1.3]">Continue</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="absolute bg-black bottom-[20px] h-[77px] left-[12px] rounded-[100px] w-[351px]" data-name="Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[8px] left-[12px] top-[131px] w-[351px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 8">
        <g id="Frame 2147239075">
          <line id="Line 379" stroke="var(--stroke-0, #FFB518)" strokeLinecap="round" strokeWidth="8" x1="4" x2="41.8571" y1="4" y2="4" />
          <line id="Line 380" stroke="var(--stroke-0, #FFB518)" strokeLinecap="round" strokeWidth="8" x1="54.8571" x2="92.7143" y1="4" y2="4" />
          <line id="Line 378" stroke="var(--stroke-0, #FFB518)" strokeLinecap="round" strokeWidth="8" x1="105.714" x2="143.571" y1="4" y2="4" />
          <line id="Line 377" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="8" x1="156.571" x2="194.429" y1="4" y2="4" />
          <line id="Line 381" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="8" x1="207.429" x2="245.286" y1="4" y2="4" />
          <line id="Line 382" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="8" x1="258.286" x2="296.143" y1="4" y2="4" />
          <line id="Line 383" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="8" x1="309.143" x2="347" y1="4" y2="4" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#f6f5ec] h-[812px] left-0 overflow-clip top-0 w-[375px]" data-name="3">
      <Frame4 />
      <Frame2 />
      <Answer />
      <Answer1 />
      <Answer2 />
      <Answer3 />
      <Buttons />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[812px] left-0 top-0 w-[375px]">
      <Component />
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="relative size-full">
      <Frame5 />
    </div>
  );
}
