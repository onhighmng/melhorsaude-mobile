import svgPaths from "./svg-zxzdiznald";
const imgEllipse = "/assets/figma/918aa089c01a40e33a181fc5b6a70198ce80b028.png";

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
    <div className="absolute backdrop-blur-[5px] backdrop-filter content-stretch flex flex-col gap-[24px] items-start justify-center left-[34px] p-[16px] rounded-[20px] top-[276px]" data-name="Avatar" style={{ backgroundImage: "linear-gradient(111.353deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Text />
      <PhotoSign />
    </div>
  );
}

function PlayButton() {
  return (
    <div className="absolute left-[1342px] size-[32px] top-[238px]" data-name="Play Button">
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
    <div className="absolute contents left-[1139px] top-[110px]" data-name="Video">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[1139px] not-italic text-[16px] text-white top-[278px] w-[235px]">Welcome to PeaceHub. Join us on our transformative journey towards lasting peace.</p>
      <div className="absolute h-[160px] left-[1139px] top-[110px] w-[235px]" data-name="Video">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235 160">
          <path d={svgPaths.p1f201372} fill="var(--fill-0, #F4F4F4)" id="Video" />
        </svg>
      </div>
      <PlayButton />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#3973e1] content-stretch flex gap-[8px] items-center justify-center left-[714px] px-[32px] py-[8px] rounded-[50px] top-[586px]" data-name="Button">
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

function ArrowIcon() {
  return (
    <div className="h-0 relative shrink-0 w-[24px]" data-name="Arrow Icon">
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

function List() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[34px] pb-[12px] pt-0 px-0 top-[168px] w-[235px]" data-name="List 1">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Counseling</p>
      <ArrowIcon />
    </div>
  );
}

function ArrowIcon1() {
  return (
    <div className="h-0 relative shrink-0 w-[24px]" data-name="Arrow Icon">
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

function List1() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[34px] pb-[12px] pt-0 px-0 top-[216px] w-[302px]" data-name="List 2">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Group Therapy</p>
      <ArrowIcon1 />
    </div>
  );
}

function Sessions() {
  return (
    <div className="absolute contents left-[34px] top-[168px]" data-name="Sessions">
      <List />
      <List1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1290px] top-[438px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">View All</p>
    </div>
  );
}

function Number() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[1174px] pl-[10px] pr-[11px] py-[4px] rounded-[100px] size-[32px] top-[570px]" data-name="Number">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">10</p>
    </div>
  );
}

function Number1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[1318px] pl-[10px] pr-[11px] py-[4px] rounded-[100px] size-[32px] top-[570px]" data-name="Number">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">14</p>
    </div>
  );
}

function BottomContent() {
  return (
    <div className="absolute contents left-[1102px] top-[570px]" data-name="Bottom Content">
      <div className="absolute left-[1102px] size-[32px] top-[570px]" data-name="Ellipse">
        <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse} width="32" />
      </div>
      <div className="absolute left-[1138px] size-[32px] top-[570px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1246px] size-[32px] top-[570px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1210px] size-[32px] top-[570px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1282px] size-[32px] top-[570px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <Number />
      <Number1 />
    </div>
  );
}

function Number2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[1150px] pl-[10px] pr-[11px] py-[4px] rounded-[100px] size-[32px] top-[534px]" data-name="Number">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">3</p>
    </div>
  );
}

function Number3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[1294px] pl-[10px] pr-[11px] py-[4px] rounded-[100px] size-[32px] top-[534px]" data-name="Number">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#bfd6ec] text-[16px] text-center text-nowrap">7</p>
    </div>
  );
}

function TopContent() {
  return (
    <div className="absolute contents left-[1078px] top-[534px]" data-name="Top Content">
      <div className="absolute left-[1078px] size-[32px] top-[534px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1114px] size-[32px] top-[534px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1186px] size-[32px] top-[534px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1222px] size-[32px] top-[534px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" id="Ellipse" r="15.5" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[1258px] size-[32px] top-[534px]" data-name="Ellipse">
        <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse} width="32" />
      </div>
      <Number2 />
      <Number3 />
    </div>
  );
}

function Dates() {
  return (
    <div className="absolute contents left-[1078px] top-[534px]" data-name="Dates">
      <BottomContent />
      <TopContent />
    </div>
  );
}

function Calendar() {
  return (
    <div className="absolute contents left-[1054px] top-[414px]" data-name="Calendar">
      <div className="absolute border border-[rgba(255,255,255,0.5)] border-solid h-[212px] left-[1054px] rounded-[20px] top-[414px] w-[320px]" data-name="Rectangle" style={{ backgroundImage: "linear-gradient(105.508deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }} />
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[40px] left-[1078px] text-[32px] text-nowrap text-white top-[438px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Book</p>
        <p>Schedule</p>
      </div>
      <Button1 />
      <Dates />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1243px] px-[40px] py-[6px] rounded-[50px] top-[26px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Sign in</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[518px] not-italic text-[16px] text-nowrap text-white top-[32px]" data-name="Menu">
      <p className="absolute left-[518px] top-[32px]">About</p>
      <p className="absolute left-[604px] top-[32px]">Services</p>
      <p className="absolute left-[710px] top-[32px]">Resources</p>
      <p className="absolute left-[829px] top-[32px]">Contact</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute contents left-[34px] top-[26px]" data-name="Navigation">
      <div className="absolute h-[20px] left-[34px] top-[34px] w-[137px]" data-name="Company Logo">
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
      <Button2 />
      <Menu />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[518px] px-[24px] py-[8px] rounded-[50px] top-[180px]" data-name="Text" style={{ backgroundImage: "linear-gradient(124.221deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Mind</p>
    </div>
  );
}

function Dot() {
  return (
    <div className="absolute left-[670px] size-[40px] top-[180px]" data-name="Dot">
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
    <div className="absolute contents left-[518px] top-[180px]" data-name="Item 1">
      <Text1 />
      <Dot />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[860px] px-[24px] py-[8px] rounded-[50px] top-[507px]" data-name="Text" style={{ backgroundImage: "linear-gradient(124.58deg, rgba(255, 255, 255, 0.5) 16.09%, rgba(255, 255, 255, 0.1) 105.27%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Healthy Body</p>
    </div>
  );
}

function Dot1() {
  return (
    <div className="absolute left-[816px] size-[40px] top-[507px]" data-name="Dot">
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

function Item1() {
  return (
    <div className="absolute contents left-[816px] top-[507px]" data-name="Item 2">
      <Text2 />
      <Dot1 />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative size-full" data-name="Hero Section">
      <div className="absolute h-[660px] left-0 top-0 w-[1408px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1408 660">
          <path d={svgPaths.p364f3000} fill="var(--fill-0, #D9D9D9)" id="Subtract" />
        </svg>
      </div>
      <Avatar />
      <div className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[88px] left-[34px] text-[#222] text-[80px] text-nowrap top-[468px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">A Journey to</p>
        <p>Mental Wellness</p>
      </div>
      <Video />
      <Button />
      <Sessions />
      <Calendar />
      <Navigation />
      <Item />
      <Item1 />
    </div>
  );
}
