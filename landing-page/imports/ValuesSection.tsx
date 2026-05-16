import svgPaths from "./svg-npdlrwz6kn";
const imgIcon = "/landing-assets/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1 = "/landing-assets/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2 = "/landing-assets/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
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

function Button2() {
  return (
    <div className="absolute bg-[#222] content-stretch flex gap-[8px] items-center justify-center left-[619px] px-[32px] py-[8px] rounded-[50px] top-[306px]" data-name="Button 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Get Started</p>
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

function Icon() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="Icon">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgIcon} />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-white" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-nowrap">Confidentiality</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal opacity-75 relative shrink-0 w-[187px]">Your privacy is sacred; we maintain the highest level of confidentiality.</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="absolute bg-[#3973e1] content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[595px] p-[24px] rounded-[20px] top-[386px] w-[235px]" data-name="Item 1">
      <Icon />
      <Text />
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

function Item2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[850px] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[386px] w-[235px]" data-name="Item 2">
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

function Item3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[204px] items-start left-[1105px] p-[24px] rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] top-[386px] w-[235px]" data-name="Item 3">
      <Icon2 />
      <TextBackgroundImage text="Community" text1="We foster a supportive community where you can connect and share." />
    </div>
  );
}

function Items() {
  return (
    <div className="absolute contents left-[595px] top-[386px]" data-name="Items">
      <Item1 />
      <Item2 />
      <Item3 />
    </div>
  );
}

function PlayButton() {
  return (
    <div className="absolute left-[487px] size-[64px] top-[24px]" data-name="Play Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Play Button">
          <rect fill="var(--fill-0, #222222)" height="64" rx="32" width="64" />
          <path d={svgPaths.p315deb40} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute backdrop-blur-[5px] backdrop-filter bg-white content-stretch flex items-center justify-center left-[24px] px-[40px] py-[6px] rounded-[50px] top-[530px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#222] text-[16px] text-nowrap">Book Now</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[189px] px-[40px] py-[6px] rounded-[50px] top-[530px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Check Availability</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[40px] px-[24px] py-[8px] rounded-[50px] top-[232px]" data-name="Text" style={{ backgroundImage: "linear-gradient(128.647deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Therapy Session</p>
    </div>
  );
}

function Dot() {
  return (
    <div className="absolute left-[218px] size-[40px] top-[232px]" data-name="Dot">
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

function Item() {
  return (
    <div className="absolute contents left-[40px] top-[232px]" data-name="Item">
      <Text1 />
      <Dot />
    </div>
  );
}

function Ornament() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Ornament">
      <div className="absolute bg-[#d9d9d9] h-[590px] left-0 rounded-[20px] top-0 w-[575px]" data-name="Rectangle" />
      <PlayButton />
      <Button />
      <Button1 />
      <Item />
    </div>
  );
}

export default function ValuesSection() {
  return (
    <div className="relative size-full" data-name="Values Section">
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[64px] left-[619px] text-[#222] text-[56px] text-nowrap top-[32px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">You Deserve to be</p>
        <p>Mentally Healthy</p>
      </div>
      <Button2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[619px] not-italic opacity-75 text-[#222] text-[20px] top-[176px] w-[721px]">Discover the heart behind our mental health platform. At our core, we are a compassionate community of experts dedicated to guiding you on your journey to emotional well-being and resilience.</p>
      <Items />
      <Ornament />
    </div>
  );
}