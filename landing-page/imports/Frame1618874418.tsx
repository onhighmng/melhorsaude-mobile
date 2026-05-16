import svgPaths from "./svg-u3nwtbcbjz";
const imgRectangle1 = "/landing-assets/ced8b37d693ce31d9b965b9df9b0f615037e5d67.png";
const imgRectangle3 = "/landing-assets/0c60298dc3f76debaf6d04d106e5832cea94aa4e.png";
const imgRectangle5 = "/landing-assets/3b53e1bd902110aa4aa7027154743e56fab4619c.png";
const imgRectangle7 = "/landing-assets/d7953b42f72be89688ec67c7d0ea4113591138e0.png";
const imgRectangle9 = "/landing-assets/23409b10ff94c9e7bf16413ad58695a231d94f79.png";
const imgRectangle11 = "/landing-assets/90b59472c67e0c1861335aaef80c9d045b600076.png";
const imgRectangle13 = "/landing-assets/c8d9ae99e18a2ffeb849ae3ce8af9be2962e0290.png";
const imgRectangle15 = "/landing-assets/1b347b7cecd82a20dcb410fac1745988b906c990.png";
const imgRectangle17 = "/landing-assets/06af65865ae721c47390012296c5eb4ef839c2eb.png";
const imgRectangle19 = "/landing-assets/e02eb01757bf028abd5227ed829eefba6472986b.png";
const imgRectangle21 = "/landing-assets/5c637b9ccd55d7f29b300b97937fdd84bff7c796.png";
const imgRectangle23 = "/landing-assets/8adb5e9607ec408e8a8e7ea556a726ec2c2bc1f7.png";
const imgRectangle25 = "/landing-assets/199d6971f814565600e896c9ecf1aeb7d194349e.png";
const imgRectangle27 = "/landing-assets/275cc6808fc5057509531098b524006707e11936.png";
const imgRectangle29 = "/landing-assets/f6c72ba26ecb62834150b504838b07fd7b4d2009.png";
const imgRectangle31 = "/landing-assets/7aab74bf2f86cd3a9e0d53744cb60731a68be9b2.png";
const imgRectangle33 = "/landing-assets/496a9756c7663badf82803b39825ee286c522e49.png";
const imgRectangle35 = "/landing-assets/ff9161d0140b45d4573994064eaf7d4fbd48d5ea.png";
const imgRectangle37 = "/landing-assets/e65989ba319e8dce9ddb4897a34e64419184d4f2.png";
const imgRectangle39 = "/landing-assets/600c8dba383a477063d9b1fd3c9805e316c9fe8b.png";
const imgRectangle41 = "/landing-assets/ea4da7cd8bcaa02dee8e39f86963acb3e640afcd.png";
import { imgRectangle, imgRectangle2, imgRectangle4, imgRectangle6, imgRectangle8, imgRectangle10, imgRectangle12, imgRectangle14, imgGroup, imgRectangle16, imgRectangle18, imgRectangle20, imgRectangle22, imgRectangle24, imgRectangle26, imgRectangle28, imgRectangle30, imgRectangle32, imgRectangle34, imgRectangle36, imgRectangle38, imgRectangle40 } from "./svg-ia839";
import MoodIndicatorCard from "./Frame1618874384";

function Button() {
  return (
    <div className="bg-[#d8ddff] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[1000px] shrink-0" data-name="Button">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#0f67fe] text-[14px] text-nowrap">Veja a Verdade</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-4 md:gap-[24px] items-center relative shrink-0 px-4" data-name="Heading">
      <Button />
      <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[1.1] not-italic relative shrink-0 text-[#020218] text-[28px] md:text-[42px] lg:text-[52px] text-center w-full max-w-[866px]">
        <p className="mb-0">{`A Dor Escondida da Sua `}</p>
        <p>Equipa, Revelada</p>
      </div>
    </div>
  );
}

// Optimized Components for Better Performance
interface TrackerCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

function TrackerCard({ title, subtitle, icon, content, rightElement, className }: TrackerCardProps) {
  return (
    <div className={`absolute bg-white flex flex-col items-start overflow-hidden p-[14px] rounded-[12px] shadow-[4px_8px_30px_0px_rgba(183,183,183,0.25)] w-[320px] ${className || ''}`} data-name="Home Mental Health Tracker Card">
      <div className="flex gap-[12px] items-center relative w-full h-[64px]">
        {/* Icon Container */}
        <div className="bg-[#f2f5f9] overflow-hidden relative rounded-[10px] shrink-0 size-[64px] flex items-center justify-center">
          {icon}
        </div>

        {/* Middle Content */}
        <div className="flex flex-col gap-[8px] items-start relative min-w-0 flex-1 h-full justify-center">
          <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold text-[#111927] text-[18px] tracking-[-0.18px] leading-tight w-full truncate">{title}</p>
          {subtitle && <p className="font-['Manrope:Medium',sans-serif] font-medium text-[#6c737f] text-[14px] tracking-[-0.14px] w-full truncate">{subtitle}</p>}
          {content}
        </div>

        {/* Right Element */}
        {rightElement && (
          <div className="relative shrink-0 size-[64px] flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

function BarGroup({ activeColor, inactiveColor }: { activeColor: string, inactiveColor: string }) {
  return (
    <div className="flex gap-[4px] items-start w-full h-[6px] shrink-0 mt-1">
      <div className="basis-0 grow h-[6px] rounded-full shrink-0" style={{ backgroundColor: activeColor }} />
      <div className="basis-0 grow h-[6px] rounded-full shrink-0" style={{ backgroundColor: activeColor }} />
      <div className="basis-0 grow h-[6px] rounded-full shrink-0" style={{ backgroundColor: activeColor }} />
      <div className="basis-0 grow h-[6px] rounded-full shrink-0" style={{ backgroundColor: inactiveColor }} />
      <div className="basis-0 grow h-[6px] rounded-full shrink-0" style={{ backgroundColor: inactiveColor }} />
    </div>
  )
}

function Group() {
  return (
    <div className="absolute inset-[9.62%_19.37%_-11.04%_70%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2093 26.3694">
        <g id="Group">
          <path d={svgPaths.pdec1400} fill="var(--fill-0, #FD9D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[3.14%_19.36%_-53.46%_69.99%]" data-name="Group">
      <div className="absolute inset-[3.14%_19.36%_-53.46%_69.99%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')`, maskPosition: '0.026px_1.683px', maskSize: '37.207px_23.119px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle1} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[9.62%_19.37%_1.47%_70%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[9.62%_19.37%_1.47%_70%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[9.62%_19.37%_1.47%_70%]" data-name="Group">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[12.62%_22.96%_79.01%_73.65%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8784 2.17779">
        <g id="Group">
          <path d={svgPaths.p16ea4800} fill="var(--fill-0, #FDEA51)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute top-[2px] left-[70%] w-[38px] h-[38px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%]" style={{ left: '79.6%' }} data-name="Group">
      <span className="text-[24px] leading-none select-none filter drop-shadow-sm transform-none">😡</span>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[52.19%_20.2%_-43.88%_70.92%]" data-name="Group">
      <div className="absolute inset-[52.19%_20.2%_-43.88%_70.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle2}')`, maskPosition: '6.964px_3.944px', maskSize: '17.087px_4.349px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle3} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[67.36%_22.21%_15.91%_72.91%]" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[67.36%_22.21%_15.91%_72.91%]" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[67.36%_22.21%_15.91%_72.91%]" data-name="Group">
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[50.8%_20.2%_-42.63%_70.92%]" data-name="Group">
      <div className="absolute inset-[50.8%_20.2%_-42.63%_70.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle4}')`, maskPosition: '6.966px_3.958px', maskSize: '17.085px_4.349px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle5} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[66.02%_22.21%_17.25%_72.91%]" data-name="Clip path group">
      <Group9 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[66.02%_22.21%_17.25%_72.91%]" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[66.02%_22.21%_17.25%_72.91%]" data-name="Group">
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute top-[3px] left-[77%] w-[38px] h-[38px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%]" style={{ left: '77%' }} data-name="Group">
      <span className="text-[24px] leading-none select-none filter drop-shadow-sm transform-none">😃</span>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[30.38%_24.21%_14.89%_70.67%]" data-name="Group">
      <div className="absolute inset-[30.38%_24.21%_14.89%_70.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle6}')`, maskPosition: '4.765px_0.268px', maskSize: '7.613px_6.752px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle7} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[31.41%_25.79%_42.62%_72.03%]" data-name="Clip path group">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[31.41%_25.79%_42.62%_72.03%]" data-name="Group">
      <ClipPathGroup3 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[31.41%_25.79%_42.62%_72.03%]" data-name="Group">
      <Group14 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[32.47%_24.86%_24.19%_71.1%]" data-name="Group">
      <div className="absolute inset-[32.47%_24.86%_24.19%_71.1%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle8}')`, maskPosition: '3.905px_0.293px', maskSize: '6.327px_5.612px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle9} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[33.6%_25.98%_44.82%_72.22%]" data-name="Clip path group">
      <Group16 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[33.6%_25.98%_44.82%_72.22%]" data-name="Group">
      <ClipPathGroup4 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[33.6%_25.98%_44.82%_72.22%]" data-name="Group">
      <Group17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[31.41%_25.79%_42.62%_72.03%]" data-name="Group">
      <Group15 />
      <Group18 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[30.36%_20.04%_14.9%_74.84%]" data-name="Group">
      <div className="absolute inset-[30.36%_20.04%_14.9%_74.84%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle10}')`, maskPosition: '5.543px_0.269px', maskSize: '7.613px_6.752px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle11} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-[31.4%_21.4%_42.63%_76.42%]" data-name="Clip path group">
      <Group20 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[31.4%_21.4%_42.63%_76.42%]" data-name="Group">
      <ClipPathGroup5 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[31.4%_21.4%_42.63%_76.42%]" data-name="Group">
      <Group21 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[32.46%_20.47%_24.2%_75.48%]" data-name="Group">
      <div className="absolute inset-[32.46%_20.47%_24.2%_75.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle12}')`, maskPosition: '3.957px_0.299px', maskSize: '6.327px_5.612px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle13} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-[33.61%_21.59%_44.81%_76.61%]" data-name="Clip path group">
      <Group23 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[33.61%_21.59%_44.81%_76.61%]" data-name="Group">
      <ClipPathGroup6 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[33.61%_21.59%_44.81%_76.61%]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[31.4%_21.4%_42.63%_76.42%]" data-name="Group">
      <Group22 />
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute top-[8px] left-[77%] w-[38px] h-[38px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%]" style={{ left: '77%' }} data-name="Group">
      <span className="text-[24px] leading-none select-none filter drop-shadow-sm transform-none">😐</span>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[9.62%_19.37%_-11.04%_70%]" data-name="Group">
      <Group5 />
      <Group12 />
      <Group27 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute inset-[9.62%_-3.49%_-11.04%_92.86%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2093 26.3694">
        <g id="Group">
          <path d={svgPaths.p2a25c340} fill="var(--fill-0, #FD9D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[9.62%_-3.49%_-11.04%_92.86%]" data-name="Group">
      <Group29 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[3.22%_-3.49%_-53.4%_92.86%]" data-name="Group">
      <div className="absolute inset-[3.22%_-3.49%_-53.4%_92.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle14}')`, maskPosition: '0.001px_1.662px', maskSize: '37.207px_23.119px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle15} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute contents inset-[9.62%_-3.49%_1.47%_92.86%]" data-name="Clip path group">
      <Group31 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[9.62%_-3.49%_1.47%_92.86%]" data-name="Group">
      <ClipPathGroup7 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[9.62%_-3.49%_1.47%_92.86%]" data-name="Group">
      <Group32 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute inset-[12.62%_0.1%_79.01%_96.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8784 2.17779">
        <g id="Group">
          <path d={svgPaths.p2944fa80} fill="var(--fill-0, #FDEA51)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[12.62%_0.1%_79.01%_96.5%]" data-name="Group">
      <Group34 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute inset-[62.62%_-0.85%_16.81%_95.54%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0px_0.005px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5891 5.35031">
        <g id="Group">
          <path d={svgPaths.p3ea8e080} fill="var(--fill-0, #542A27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[62.62%_-0.85%_16.81%_95.54%]" data-name="Group">
      <Group36 />
    </div>
  );
}

function ClipPathGroup8() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group37 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute inset-[62.04%_-0.91%_16.22%_95.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.202px_0.156px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.993 5.65281">
        <g id="Group">
          <path d={svgPaths.p3be28c00} fill="var(--fill-0, #542A27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[62.04%_-0.91%_16.22%_95.49%]" data-name="Group">
      <Group38 />
    </div>
  );
}

function ClipPathGroup9() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group39 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute inset-[62.04%_-0.91%_16.22%_95.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.202px_0.156px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.993 5.65281">
        <g id="Group">
          <path d={svgPaths.p15ebc100} fill="var(--fill-0, #552A27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[62.04%_-0.91%_16.22%_95.49%]" data-name="Group">
      <Group40 />
    </div>
  );
}

function ClipPathGroup10() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group41 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute inset-[59.52%_-0.91%_16.22%_95.24%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '1.046px_0.809px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.8391 6.30599">
        <g id="Group">
          <path d={svgPaths.p3b4e6b80} fill="var(--fill-0, #562A26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[59.52%_-0.91%_16.22%_95.24%]" data-name="Group">
      <Group42 />
    </div>
  );
}

function ClipPathGroup11() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group43 />
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute inset-[60.33%_-0.91%_16.23%_95.35%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.681px_0.601px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4736 6.09679">
        <g id="Group">
          <path d={svgPaths.p3a9dbb00} fill="var(--fill-0, #572A26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents inset-[60.33%_-0.91%_16.23%_95.35%]" data-name="Group">
      <Group44 />
    </div>
  );
}

function ClipPathGroup12() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group45 />
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute inset-[61.14%_-0.91%_16.22%_95.45%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.319px_0.389px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.1101 5.8861">
        <g id="Group">
          <path d={svgPaths.p107f8a80} fill="var(--fill-0, #582B26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents inset-[61.14%_-0.91%_16.22%_95.45%]" data-name="Group">
      <Group46 />
    </div>
  );
}

function ClipPathGroup13() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group47 />
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute inset-[61.94%_-0.91%_15.79%_95.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.893px_0.181px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6836 5.79127">
        <g id="Group">
          <path d={svgPaths.p39f41bc0} fill="var(--fill-0, #592B25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[61.94%_-0.91%_15.79%_95.29%]" data-name="Group">
      <Group48 />
    </div>
  );
}

function ClipPathGroup14() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group49 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute inset-[59.8%_-1.05%_15.77%_95.4%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.493px_0.738px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7623 6.35114">
        <g id="Group">
          <path d={svgPaths.p1463d700} fill="var(--fill-0, #5A2B25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute contents inset-[59.8%_-1.05%_15.77%_95.4%]" data-name="Group">
      <Group50 />
    </div>
  );
}

function ClipPathGroup15() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group51 />
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute inset-[58.11%_-1.22%_15.75%_95.52%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '0.095px_1.176px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9622 6.79512">
        <g id="Group">
          <path d={svgPaths.p1039e900} fill="var(--fill-0, #5C2B25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute contents inset-[58.11%_-1.22%_15.75%_95.52%]" data-name="Group">
      <Group52 />
    </div>
  );
}

function ClipPathGroup16() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group53 />
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute inset-[59.13%_-1.11%_15.74%_95.63%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-0.301px_0.913px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.1949 6.53474">
        <g id="Group">
          <path d={svgPaths.p255b5c00} fill="var(--fill-0, #5D2B25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute contents inset-[59.13%_-1.11%_15.74%_95.63%]" data-name="Group">
      <Group54 />
    </div>
  );
}

function ClipPathGroup17() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group55 />
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute inset-[60.15%_-1.21%_15.11%_95.74%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-0.698px_0.646px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.1293 6.43241">
        <g id="Group">
          <path d={svgPaths.p223f1980} fill="var(--fill-0, #5E2B24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute contents inset-[60.15%_-1.21%_15.11%_95.74%]" data-name="Group">
      <Group56 />
    </div>
  );
}

function ClipPathGroup18() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group57 />
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute inset-[61.16%_-1.1%_15.13%_95.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-1.097px_0.384px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3356 6.16602">
        <g id="Group">
          <path d={svgPaths.p1b6b8d00} fill="var(--fill-0, #5F2C24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute contents inset-[61.16%_-1.1%_15.13%_95.86%]" data-name="Group">
      <Group58 />
    </div>
  );
}

function ClipPathGroup19() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group59 />
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute inset-[58.38%_-0.98%_15.14%_95.97%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-1.497px_1.107px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.538 6.88541">
        <g id="Group">
          <path d={svgPaths.p3aae3200} fill="var(--fill-0, #602C24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group61() {
  return (
    <div className="absolute contents inset-[58.38%_-0.98%_15.14%_95.97%]" data-name="Group">
      <Group60 />
    </div>
  );
}

function ClipPathGroup20() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group61 />
    </div>
  );
}

function Group62() {
  return (
    <div className="absolute inset-[59.58%_-0.87%_15.15%_96.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-1.892px_0.795px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7424 6.57086">
        <g id="Group">
          <path d={svgPaths.p179f86f0} fill="var(--fill-0, #612C23)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group63() {
  return (
    <div className="absolute contents inset-[59.58%_-0.87%_15.15%_96.08%]" data-name="Group">
      <Group62 />
    </div>
  );
}

function ClipPathGroup21() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group63 />
    </div>
  );
}

function Group64() {
  return (
    <div className="absolute inset-[58.17%_-0.75%_15.16%_96.2%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-2.289px_1.161px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9468 6.93358">
        <g id="Group">
          <path d={svgPaths.p14877900} fill="var(--fill-0, #622C23)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group65() {
  return (
    <div className="absolute contents inset-[58.17%_-0.75%_15.16%_96.2%]" data-name="Group">
      <Group64 />
    </div>
  );
}

function ClipPathGroup22() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group65 />
    </div>
  );
}

function Group66() {
  return (
    <div className="absolute inset-[59.49%_-0.64%_15.18%_96.31%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-2.69px_0.819px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1511 6.58743">
        <g id="Group">
          <path d={svgPaths.p40ddf00} fill="var(--fill-0, #622C23)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group67() {
  return (
    <div className="absolute contents inset-[59.49%_-0.64%_15.18%_96.31%]" data-name="Group">
      <Group66 />
    </div>
  );
}

function ClipPathGroup23() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group67 />
    </div>
  );
}

function Group68() {
  return (
    <div className="absolute inset-[58.07%_-0.59%_15.18%_96.36%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-2.859px_1.188px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8079 6.95647">
        <g id="Group">
          <path d={svgPaths.p33d03880} fill="var(--fill-0, #632C23)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group69() {
  return (
    <div className="absolute contents inset-[58.07%_-0.59%_15.18%_96.36%]" data-name="Group">
      <Group68 />
    </div>
  );
}

function ClipPathGroup24() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group69 />
    </div>
  );
}

function Group70() {
  return (
    <div className="absolute inset-[58.68%_-0.54%_15.19%_96.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.031px_1.029px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4665 6.79542">
        <g id="Group">
          <path d={svgPaths.p3ae49300} fill="var(--fill-0, #642C23)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group71() {
  return (
    <div className="absolute contents inset-[58.68%_-0.54%_15.19%_96.41%]" data-name="Group">
      <Group70 />
    </div>
  );
}

function ClipPathGroup25() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group71 />
    </div>
  );
}

function Group72() {
  return (
    <div className="absolute inset-[59.3%_-0.49%_15.19%_96.46%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.202px_0.868px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1233 6.63436">
        <g id="Group">
          <path d={svgPaths.p339c1200} fill="var(--fill-0, #652C24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group73() {
  return (
    <div className="absolute contents inset-[59.3%_-0.49%_15.19%_96.46%]" data-name="Group">
      <Group72 />
    </div>
  );
}

function ClipPathGroup26() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group73 />
    </div>
  );
}

function Group74() {
  return (
    <div className="absolute inset-[59.91%_-0.44%_15.19%_96.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.374px_0.709px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.78 6.4733">
        <g id="Group">
          <path d={svgPaths.p212bb00} fill="var(--fill-0, #662C24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group75() {
  return (
    <div className="absolute contents inset-[59.91%_-0.44%_15.19%_96.51%]" data-name="Group">
      <Group74 />
    </div>
  );
}

function ClipPathGroup27() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group75 />
    </div>
  );
}

function Group76() {
  return (
    <div className="absolute inset-[60.52%_-0.4%_15.2%_96.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.546px_0.55px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4367 6.31227">
        <g id="Group">
          <path d={svgPaths.p2caa4200} fill="var(--fill-0, #672C24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group77() {
  return (
    <div className="absolute contents inset-[60.52%_-0.4%_15.2%_96.56%]" data-name="Group">
      <Group76 />
    </div>
  );
}

function ClipPathGroup28() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group77 />
    </div>
  );
}

function Group78() {
  return (
    <div className="absolute inset-[61.14%_-0.35%_15.2%_96.61%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.718px_0.389px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0934 6.15122">
        <g id="Group">
          <path d={svgPaths.p39a5b400} fill="var(--fill-0, #682D24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group79() {
  return (
    <div className="absolute contents inset-[61.14%_-0.35%_15.2%_96.61%]" data-name="Group">
      <Group78 />
    </div>
  );
}

function ClipPathGroup29() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group79 />
    </div>
  );
}

function Group80() {
  return (
    <div className="absolute inset-[61.75%_-0.3%_15.21%_96.65%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-3.887px_0.23px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7522 5.9902">
        <g id="Group">
          <path d={svgPaths.p1fdd42f0} fill="var(--fill-0, #692D25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group81() {
  return (
    <div className="absolute contents inset-[61.75%_-0.3%_15.21%_96.65%]" data-name="Group">
      <Group80 />
    </div>
  );
}

function ClipPathGroup30() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group81 />
    </div>
  );
}

function Group82() {
  return (
    <div className="absolute inset-[62.36%_-0.25%_15.22%_96.7%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.058px_0.071px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4089 5.82914">
        <g id="Group">
          <path d={svgPaths.p2fad2940} fill="var(--fill-0, #6A2D25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group83() {
  return (
    <div className="absolute contents inset-[62.36%_-0.25%_15.22%_96.7%]" data-name="Group">
      <Group82 />
    </div>
  );
}

function ClipPathGroup31() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group83 />
    </div>
  );
}

function Group84() {
  return (
    <div className="absolute inset-[62.97%_-0.2%_15.22%_96.75%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.232px_-0.088px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0656 5.6681">
        <g id="Group">
          <path d={svgPaths.p7f87540} fill="var(--fill-0, #6B2D25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group85() {
  return (
    <div className="absolute contents inset-[62.97%_-0.2%_15.22%_96.75%]" data-name="Group">
      <Group84 />
    </div>
  );
}

function ClipPathGroup32() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group85 />
    </div>
  );
}

function Group86() {
  return (
    <div className="absolute inset-[63.59%_-0.15%_15.23%_96.8%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.404px_-0.247px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7223 5.50705">
        <g id="Group">
          <path d={svgPaths.p20ff7480} fill="var(--fill-0, #6C2D25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group87() {
  return (
    <div className="absolute contents inset-[63.59%_-0.15%_15.23%_96.8%]" data-name="Group">
      <Group86 />
    </div>
  );
}

function ClipPathGroup33() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group87 />
    </div>
  );
}

function Group88() {
  return (
    <div className="absolute inset-[64.2%_-0.1%_15.23%_96.85%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.572px_-0.408px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.381 5.34599">
        <g id="Group">
          <path d={svgPaths.p31fc91b1} fill="var(--fill-0, #6D2D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group89() {
  return (
    <div className="absolute contents inset-[64.2%_-0.1%_15.23%_96.85%]" data-name="Group">
      <Group88 />
    </div>
  );
}

function ClipPathGroup34() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group89 />
    </div>
  );
}

function Group90() {
  return (
    <div className="absolute inset-[64.82%_-0.05%_15.24%_96.9%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.745px_-0.567px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0377 5.18496">
        <g id="Group">
          <path d={svgPaths.p3da170} fill="var(--fill-0, #6E2D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group91() {
  return (
    <div className="absolute contents inset-[64.82%_-0.05%_15.24%_96.9%]" data-name="Group">
      <Group90 />
    </div>
  );
}

function ClipPathGroup35() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group91 />
    </div>
  );
}

function Group92() {
  return (
    <div className="absolute inset-[65.43%_0_15.25%_96.95%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-4.917px_-0.726px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6944 5.02391">
        <g id="Group">
          <path d={svgPaths.p3865ab00} fill="var(--fill-0, #6F2D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group93() {
  return (
    <div className="absolute contents inset-[65.43%_0_15.25%_96.95%]" data-name="Group">
      <Group92 />
    </div>
  );
}

function ClipPathGroup36() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group93 />
    </div>
  );
}

function Group94() {
  return (
    <div className="absolute inset-[66.05%_0.05%_15.25%_97%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.088px_-0.887px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3512 4.86288">
        <g id="Group">
          <path d={svgPaths.p6348c00} fill="var(--fill-0, #702D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group95() {
  return (
    <div className="absolute contents inset-[66.05%_0.05%_15.25%_97%]" data-name="Group">
      <Group94 />
    </div>
  );
}

function ClipPathGroup37() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group95 />
    </div>
  );
}

function Group96() {
  return (
    <div className="absolute inset-[66.66%_0.09%_15.26%_97.05%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.26px_-1.046px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0079 4.70183">
        <g id="Group">
          <path d={svgPaths.p3e9cf0c0} fill="var(--fill-0, #712D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group97() {
  return (
    <div className="absolute contents inset-[66.66%_0.09%_15.26%_97.05%]" data-name="Group">
      <Group96 />
    </div>
  );
}

function ClipPathGroup38() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group97 />
    </div>
  );
}

function Group98() {
  return (
    <div className="absolute inset-[67.27%_0.14%_15.26%_97.09%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.431px_-1.205px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66657 4.5408">
        <g id="Group">
          <path d={svgPaths.p11beb630} fill="var(--fill-0, #722D27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group99() {
  return (
    <div className="absolute contents inset-[67.27%_0.14%_15.26%_97.09%]" data-name="Group">
      <Group98 />
    </div>
  );
}

function ClipPathGroup39() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group99 />
    </div>
  );
}

function Group100() {
  return (
    <div className="absolute inset-[67.88%_0.19%_15.27%_97.14%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.602px_-1.364px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32331 4.37974">
        <g id="Group">
          <path d={svgPaths.p2392880} fill="var(--fill-0, #732E27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group101() {
  return (
    <div className="absolute contents inset-[67.88%_0.19%_15.27%_97.14%]" data-name="Group">
      <Group100 />
    </div>
  );
}

function ClipPathGroup40() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group101 />
    </div>
  );
}

function Group102() {
  return (
    <div className="absolute inset-[68.5%_0.24%_15.27%_97.19%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.773px_-1.525px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.98006 4.21869">
        <g id="Group">
          <path d={svgPaths.p1dceb8f0} fill="var(--fill-0, #742E27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group103() {
  return (
    <div className="absolute contents inset-[68.5%_0.24%_15.27%_97.19%]" data-name="Group">
      <Group102 />
    </div>
  );
}

function ClipPathGroup41() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group103 />
    </div>
  );
}

function Group104() {
  return (
    <div className="absolute inset-[69.11%_0.29%_15.28%_97.24%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-5.947px_-1.684px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.6367 4.05767">
        <g id="Group">
          <path d={svgPaths.p141f8500} fill="var(--fill-0, #752E27)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group105() {
  return (
    <div className="absolute contents inset-[69.11%_0.29%_15.28%_97.24%]" data-name="Group">
      <Group104 />
    </div>
  );
}

function ClipPathGroup42() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group105 />
    </div>
  );
}

function Group106() {
  return (
    <div className="absolute inset-[69.73%_0.34%_15.29%_97.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.116px_-1.843px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.29547 3.89661">
        <g id="Group">
          <path d={svgPaths.p24864c40} fill="var(--fill-0, #762E28)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group107() {
  return (
    <div className="absolute contents inset-[69.73%_0.34%_15.29%_97.29%]" data-name="Group">
      <Group106 />
    </div>
  );
}

function ClipPathGroup43() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group107 />
    </div>
  );
}

function Group108() {
  return (
    <div className="absolute inset-[70.34%_0.39%_15.29%_97.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.287px_-2.004px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.95222 3.73561">
        <g id="Group">
          <path d={svgPaths.pae1a180} fill="var(--fill-0, #772E28)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group109() {
  return (
    <div className="absolute contents inset-[70.34%_0.39%_15.29%_97.34%]" data-name="Group">
      <Group108 />
    </div>
  );
}

function ClipPathGroup44() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group109 />
    </div>
  );
}

function Group110() {
  return (
    <div className="absolute inset-[70.96%_0.44%_15.3%_97.39%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.459px_-2.163px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.60886 3.57455">
        <g id="Group">
          <path d={svgPaths.p2881ea00} fill="var(--fill-0, #792E28)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group111() {
  return (
    <div className="absolute contents inset-[70.96%_0.44%_15.3%_97.39%]" data-name="Group">
      <Group110 />
    </div>
  );
}

function ClipPathGroup45() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group111 />
    </div>
  );
}

function Group112() {
  return (
    <div className="absolute inset-[71.58%_0.49%_15.3%_97.44%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.632px_-2.324px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2656 3.41352">
        <g id="Group">
          <path d={svgPaths.p33128c80} fill="var(--fill-0, #7A2E28)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group113() {
  return (
    <div className="absolute contents inset-[71.58%_0.49%_15.3%_97.44%]" data-name="Group">
      <Group112 />
    </div>
  );
}

function ClipPathGroup46() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group113 />
    </div>
  );
}

function Group114() {
  return (
    <div className="absolute inset-[72.19%_0.54%_15.3%_97.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.803px_-2.483px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9223 3.25246">
        <g id="Group">
          <path d={svgPaths.p59a2a00} fill="var(--fill-0, #7B2E29)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group115() {
  return (
    <div className="absolute contents inset-[72.19%_0.54%_15.3%_97.49%]" data-name="Group">
      <Group114 />
    </div>
  );
}

function ClipPathGroup47() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group115 />
    </div>
  );
}

function Group116() {
  return (
    <div className="absolute inset-[72.8%_0.58%_15.31%_97.54%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-6.972px_-2.643px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58107 3.09141">
        <g id="Group">
          <path d={svgPaths.p3cb8aa00} fill="var(--fill-0, #7C2E29)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group117() {
  return (
    <div className="absolute contents inset-[72.8%_0.58%_15.31%_97.54%]" data-name="Group">
      <Group116 />
    </div>
  );
}

function ClipPathGroup48() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group117 />
    </div>
  );
}

function Group118() {
  return (
    <div className="absolute inset-[73.42%_0.63%_15.31%_97.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-7.146px_-2.803px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.23775 2.93039">
        <g id="Group">
          <path d={svgPaths.p2630ac40} fill="var(--fill-0, #7D2E29)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group119() {
  return (
    <div className="absolute contents inset-[73.42%_0.63%_15.31%_97.58%]" data-name="Group">
      <Group118 />
    </div>
  );
}

function ClipPathGroup49() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group119 />
    </div>
  );
}

function Group120() {
  return (
    <div className="absolute inset-[74.03%_0.68%_15.32%_97.63%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-7.315px_-2.962px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.89445 2.76933">
        <g id="Group">
          <path d={svgPaths.p34a38000} fill="var(--fill-0, #7E2F29)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group121() {
  return (
    <div className="absolute contents inset-[74.03%_0.68%_15.32%_97.63%]" data-name="Group">
      <Group120 />
    </div>
  );
}

function ClipPathGroup50() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group121 />
    </div>
  );
}

function Group122() {
  return (
    <div className="absolute inset-[74.64%_0.73%_15.33%_97.68%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-7.488px_-3.122px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.55119 2.6083">
        <g id="Group">
          <path d={svgPaths.p18ce500} fill="var(--fill-0, #7F2F2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group123() {
  return (
    <div className="absolute contents inset-[74.64%_0.73%_15.33%_97.68%]" data-name="Group">
      <Group122 />
    </div>
  );
}

function ClipPathGroup51() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group123 />
    </div>
  );
}

function Group124() {
  return (
    <div className="absolute inset-[75.25%_0.78%_15.33%_97.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-7.659px_-3.28px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2099 2.44725">
        <g id="Group">
          <path d={svgPaths.pc4b9870} fill="var(--fill-0, #802F2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group125() {
  return (
    <div className="absolute contents inset-[75.25%_0.78%_15.33%_97.73%]" data-name="Group">
      <Group124 />
    </div>
  );
}

function ClipPathGroup52() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group125 />
    </div>
  );
}

function Group126() {
  return (
    <div className="absolute inset-[75.87%_0.83%_15.34%_97.78%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-7.831px_-3.439px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8666 2.28619">
        <g id="Group">
          <path d={svgPaths.pe12bd78} fill="var(--fill-0, #812F2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group127() {
  return (
    <div className="absolute contents inset-[75.87%_0.83%_15.34%_97.78%]" data-name="Group">
      <Group126 />
    </div>
  );
}

function ClipPathGroup53() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group127 />
    </div>
  );
}

function Group128() {
  return (
    <div className="absolute inset-[76.48%_0.88%_15.34%_97.83%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.002px_-3.601px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.52335 2.12516">
        <g id="Group">
          <path d={svgPaths.p253f2580} fill="var(--fill-0, #822F2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group129() {
  return (
    <div className="absolute contents inset-[76.48%_0.88%_15.34%_97.83%]" data-name="Group">
      <Group128 />
    </div>
  );
}

function ClipPathGroup54() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group129 />
    </div>
  );
}

function Group130() {
  return (
    <div className="absolute inset-[77.1%_0.93%_15.35%_97.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.174px_-3.759px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.18004 1.9641">
        <g id="Group">
          <path d={svgPaths.pef1db00} fill="var(--fill-0, #832F2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group131() {
  return (
    <div className="absolute contents inset-[77.1%_0.93%_15.35%_97.88%]" data-name="Group">
      <Group130 />
    </div>
  );
}

function ClipPathGroup55() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group131 />
    </div>
  );
}

function Group132() {
  return (
    <div className="absolute inset-[77.71%_0.98%_15.36%_97.93%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.345px_-3.918px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.83674 1.80308">
        <g id="Group">
          <path d={svgPaths.p27f61200} fill="var(--fill-0, #842F2B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group133() {
  return (
    <div className="absolute contents inset-[77.71%_0.98%_15.36%_97.93%]" data-name="Group">
      <Group132 />
    </div>
  );
}

function ClipPathGroup56() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group133 />
    </div>
  );
}

function Group134() {
  return (
    <div className="absolute inset-[78.32%_1.03%_15.36%_97.98%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.515px_-4.078px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.4955 1.64203">
        <g id="Group">
          <path d={svgPaths.p23e19a80} fill="var(--fill-0, #852F2B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group135() {
  return (
    <div className="absolute contents inset-[78.32%_1.03%_15.36%_97.98%]" data-name="Group">
      <Group134 />
    </div>
  );
}

function ClipPathGroup57() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group135 />
    </div>
  );
}

function Group136() {
  return (
    <div className="absolute inset-[78.94%_1.07%_15.37%_98.03%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.688px_-4.239px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.15018 1.481">
        <g id="Group">
          <path d={svgPaths.p21005e80} fill="var(--fill-0, #862F2B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group137() {
  return (
    <div className="absolute contents inset-[78.94%_1.07%_15.37%_98.03%]" data-name="Group">
      <Group136 />
    </div>
  );
}

function ClipPathGroup58() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group137 />
    </div>
  );
}

function Group138() {
  return (
    <div className="absolute inset-[79.55%_1.12%_15.37%_98.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-8.861px_-4.397px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.80889 1.31994">
        <g id="Group">
          <path d={svgPaths.p1d7f8e00} fill="var(--fill-0, #872F2B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group139() {
  return (
    <div className="absolute contents inset-[79.55%_1.12%_15.37%_98.07%]" data-name="Group">
      <Group138 />
    </div>
  );
}

function ClipPathGroup59() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group139 />
    </div>
  );
}

function Group140() {
  return (
    <div className="absolute inset-[80.16%_1.17%_15.38%_98.12%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.032px_-4.557px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.46563 1.15889">
        <g id="Group">
          <path d={svgPaths.p3b4afb70} fill="var(--fill-0, #882F2C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group141() {
  return (
    <div className="absolute contents inset-[80.16%_1.17%_15.38%_98.12%]" data-name="Group">
      <Group140 />
    </div>
  );
}

function ClipPathGroup60() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group141 />
    </div>
  );
}

function Group142() {
  return (
    <div className="absolute inset-[80.77%_1.22%_15.39%_98.17%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.201px_-4.716px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.12233 0.997847">
        <g id="Group">
          <path d={svgPaths.p3d39df80} fill="var(--fill-0, #89302C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group143() {
  return (
    <div className="absolute contents inset-[80.77%_1.22%_15.39%_98.17%]" data-name="Group">
      <Group142 />
    </div>
  );
}

function ClipPathGroup61() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group143 />
    </div>
  );
}

function Group144() {
  return (
    <div className="absolute inset-[81.39%_1.27%_15.39%_98.22%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.373px_-4.876px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.78104 0.836803">
        <g id="Group">
          <path d={svgPaths.p3fa00600} fill="var(--fill-0, #8A302C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group145() {
  return (
    <div className="absolute contents inset-[81.39%_1.27%_15.39%_98.22%]" data-name="Group">
      <Group144 />
    </div>
  );
}

function ClipPathGroup62() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group145 />
    </div>
  );
}

function Group146() {
  return (
    <div className="absolute inset-[82.01%_1.32%_15.39%_98.27%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.545px_-5.038px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.43779 0.675807">
        <g id="Group">
          <path d={svgPaths.p13d7c700} fill="var(--fill-0, #8B302C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group147() {
  return (
    <div className="absolute contents inset-[82.01%_1.32%_15.39%_98.27%]" data-name="Group">
      <Group146 />
    </div>
  );
}

function ClipPathGroup63() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group147 />
    </div>
  );
}

function Group148() {
  return (
    <div className="absolute inset-[82.62%_1.37%_15.4%_98.32%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.717px_-5.197px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.09448 0.514749">
        <g id="Group">
          <path d={svgPaths.p3f49600} fill="var(--fill-0, #8C302D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group149() {
  return (
    <div className="absolute contents inset-[82.62%_1.37%_15.4%_98.32%]" data-name="Group">
      <Group148 />
    </div>
  );
}

function ClipPathGroup64() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group149 />
    </div>
  );
}

function Group150() {
  return (
    <div className="absolute inset-[83.24%_1.42%_15.4%_98.37%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-9.891px_-5.356px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.751177 0.353716">
        <g id="Group">
          <path d={svgPaths.p1bf37e80} fill="var(--fill-0, #8D302D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group151() {
  return (
    <div className="absolute contents inset-[83.24%_1.42%_15.4%_98.37%]" data-name="Group">
      <Group150 />
    </div>
  );
}

function ClipPathGroup65() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group151 />
    </div>
  );
}

function Group152() {
  return (
    <div className="absolute inset-[83.78%_1.47%_16.22%_98.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Group" style={{ maskImage: `url('${imgGroup}')`, maskPosition: '-10.266px_-5.498px', maskSize: '18.589px_5.347px', maskRepeat: 'no-repeat' }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.201924 0">
        <g id="Group">
          <g id="Vector"></g>
        </g>
      </svg>
    </div>
  );
}

function Group153() {
  return (
    <div className="absolute contents inset-[83.78%_1.47%_16.22%_98.48%]" data-name="Group">
      <Group152 />
    </div>
  );
}

function ClipPathGroup66() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Clip path group">
      <Group153 />
    </div>
  );
}

function Group154() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Group">
      <ClipPathGroup8 />
      <ClipPathGroup9 />
      <ClipPathGroup10 />
      <ClipPathGroup11 />
      <ClipPathGroup12 />
      <ClipPathGroup13 />
      <ClipPathGroup14 />
      <ClipPathGroup15 />
      <ClipPathGroup16 />
      <ClipPathGroup17 />
      <ClipPathGroup18 />
      <ClipPathGroup19 />
      <ClipPathGroup20 />
      <ClipPathGroup21 />
      <ClipPathGroup22 />
      <ClipPathGroup23 />
      <ClipPathGroup24 />
      <ClipPathGroup25 />
      <ClipPathGroup26 />
      <ClipPathGroup27 />
      <ClipPathGroup28 />
      <ClipPathGroup29 />
      <ClipPathGroup30 />
      <ClipPathGroup31 />
      <ClipPathGroup32 />
      <ClipPathGroup33 />
      <ClipPathGroup34 />
      <ClipPathGroup35 />
      <ClipPathGroup36 />
      <ClipPathGroup37 />
      <ClipPathGroup38 />
      <ClipPathGroup39 />
      <ClipPathGroup40 />
      <ClipPathGroup41 />
      <ClipPathGroup42 />
      <ClipPathGroup43 />
      <ClipPathGroup44 />
      <ClipPathGroup45 />
      <ClipPathGroup46 />
      <ClipPathGroup47 />
      <ClipPathGroup48 />
      <ClipPathGroup49 />
      <ClipPathGroup50 />
      <ClipPathGroup51 />
      <ClipPathGroup52 />
      <ClipPathGroup53 />
      <ClipPathGroup54 />
      <ClipPathGroup55 />
      <ClipPathGroup56 />
      <ClipPathGroup57 />
      <ClipPathGroup58 />
      <ClipPathGroup59 />
      <ClipPathGroup60 />
      <ClipPathGroup61 />
      <ClipPathGroup62 />
      <ClipPathGroup63 />
      <ClipPathGroup64 />
      <ClipPathGroup65 />
      <ClipPathGroup66 />
    </div>
  );
}

function Group155() {
  return (
    <div className="absolute contents inset-[62.64%_-0.85%_16.8%_95.54%]" data-name="Group">
      <Group154 />
    </div>
  );
}

function Group156() {
  return (
    <div className="absolute inset-[58.96%_-1.22%_13.11%_95.18%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1652 7.26317">
        <g id="Group">
          <path d={svgPaths.p30579700} fill="var(--fill-0, #5D2B24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group157() {
  return (
    <div className="absolute contents inset-[58.96%_-1.22%_13.11%_95.18%]" data-name="Group">
      <Group156 />
    </div>
  );
}

function Group158() {
  return (
    <div className="absolute contents inset-[58.96%_-1.22%_13.11%_95.18%]" data-name="Group">
      <Group155 />
      <Group157 />
    </div>
  );
}

function Group159() {
  return (
    <div className="absolute contents inset-[49.9%_-0.8%_10.23%_95.52%]" data-name="Group">
      <div className="absolute inset-[49.9%_-0.8%_10.23%_95.52%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle16}')`, maskPosition: '2.711px_6.461px', maskSize: '13.39px_2.198px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle17} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup67() {
  return (
    <div className="absolute contents inset-[74.75%_-0.12%_16.79%_96.29%]" data-name="Clip path group">
      <Group159 />
    </div>
  );
}

function Group160() {
  return (
    <div className="absolute contents inset-[74.75%_-0.12%_16.79%_96.29%]" data-name="Group">
      <ClipPathGroup67 />
    </div>
  );
}

function Group161() {
  return (
    <div className="absolute contents inset-[74.75%_-0.12%_16.79%_96.29%]" data-name="Group">
      <Group160 />
    </div>
  );
}

function Group162() {
  return (
    <div className="absolute contents inset-[45.87%_-0.58%_17.04%_95.67%]" data-name="Group">
      <div className="absolute inset-[45.87%_-0.58%_17.04%_95.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle18}')`, maskPosition: '0.074px_4.362px', maskSize: '17.642px_1.542px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle19} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup68() {
  return (
    <div className="absolute contents inset-[62.64%_-0.73%_31.43%_95.69%]" data-name="Clip path group">
      <Group162 />
    </div>
  );
}

function Group163() {
  return (
    <div className="absolute contents inset-[62.64%_-0.73%_31.43%_95.69%]" data-name="Group">
      <ClipPathGroup68 />
    </div>
  );
}

function Group164() {
  return (
    <div className="absolute contents inset-[62.64%_-0.73%_31.43%_95.69%]" data-name="Group">
      <Group163 />
    </div>
  );
}

function Group165() {
  return (
    <div className="absolute contents inset-[58.96%_-1.22%_13.11%_95.18%]" data-name="Group">
      <Group158 />
      <Group161 />
      <Group164 />
    </div>
  );
}

function Group166() {
  return (
    <div className="absolute contents inset-[31%_2.75%_43.44%_94.7%]" data-name="Group">
      <div className="absolute inset-[31%_2.75%_43.44%_94.7%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle20}')`, maskPosition: '0.718px_1.994px', maskSize: '8.133px_3.604px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle21} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup69() {
  return (
    <div className="absolute contents inset-[38.67%_2.77%_47.47%_94.9%]" data-name="Clip path group">
      <Group166 />
    </div>
  );
}

function Group167() {
  return (
    <div className="absolute contents inset-[38.67%_2.77%_47.47%_94.9%]" data-name="Group">
      <ClipPathGroup69 />
    </div>
  );
}

function Group168() {
  return (
    <div className="absolute contents inset-[38.67%_2.77%_47.47%_94.9%]" data-name="Group">
      <Group167 />
    </div>
  );
}

function Group169() {
  return (
    <div className="absolute contents inset-[32.26%_2.74%_40.37%_94.55%]" data-name="Group">
      <div className="absolute inset-[32.26%_2.74%_40.37%_94.55%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle22}')`, maskPosition: '1.138px_1.401px', maskSize: '8.073px_3.604px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle23} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup70() {
  return (
    <div className="absolute contents inset-[37.65%_2.82%_48.49%_94.87%]" data-name="Clip path group">
      <Group169 />
    </div>
  );
}

function Group170() {
  return (
    <div className="absolute contents inset-[37.65%_2.82%_48.49%_94.87%]" data-name="Group">
      <ClipPathGroup70 />
    </div>
  );
}

function Group171() {
  return (
    <div className="absolute contents inset-[37.65%_2.82%_48.49%_94.87%]" data-name="Group">
      <Group170 />
    </div>
  );
}

function Group172() {
  return (
    <div className="absolute contents inset-[37.65%_2.77%_47.47%_94.87%]" data-name="Group">
      <Group168 />
      <Group171 />
    </div>
  );
}

function Group173() {
  return (
    <div className="absolute contents inset-[31%_-1.65%_43.44%_99.1%]" data-name="Group">
      <div className="absolute inset-[31%_-1.65%_43.44%_99.1%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle24}')`, maskPosition: '0.056px_1.994px', maskSize: '8.133px_3.604px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle25} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup71() {
  return (
    <div className="absolute contents inset-[38.67%_-1.44%_47.47%_99.12%]" data-name="Clip path group">
      <Group173 />
    </div>
  );
}

function Group174() {
  return (
    <div className="absolute contents inset-[38.67%_-1.44%_47.47%_99.12%]" data-name="Group">
      <ClipPathGroup71 />
    </div>
  );
}

function Group175() {
  return (
    <div className="absolute contents inset-[38.67%_-1.44%_47.47%_99.12%]" data-name="Group">
      <Group174 />
    </div>
  );
}

function Group176() {
  return (
    <div className="absolute contents inset-[32.26%_-1.8%_40.37%_99.09%]" data-name="Group">
      <div className="absolute inset-[32.26%_-1.8%_40.37%_99.09%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle26}')`, maskPosition: '0.278px_1.401px', maskSize: '8.073px_3.604px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle27} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup72() {
  return (
    <div className="absolute contents inset-[37.65%_-1.47%_48.49%_99.17%]" data-name="Clip path group">
      <Group176 />
    </div>
  );
}

function Group177() {
  return (
    <div className="absolute contents inset-[37.65%_-1.47%_48.49%_99.17%]" data-name="Group">
      <ClipPathGroup72 />
    </div>
  );
}

function Group178() {
  return (
    <div className="absolute contents inset-[37.65%_-1.47%_48.49%_99.17%]" data-name="Group">
      <Group177 />
    </div>
  );
}

function Group179() {
  return (
    <div className="absolute contents inset-[37.65%_-1.47%_47.47%_99.12%]" data-name="Group">
      <Group175 />
      <Group178 />
    </div>
  );
}

function Group180() {
  return (
    <div className="absolute contents inset-[37.65%_-1.47%_47.47%_94.87%]" data-name="Group">
      <Group172 />
      <Group179 />
    </div>
  );
}

function Group181() {
  return (
    <div className="absolute inset-[58.59%_-1.63%_32.61%_100.48%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.02622 2.28948">
        <g id="Group">
          <path d={svgPaths.p2330bc00} fill="var(--fill-0, #5D2B24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group182() {
  return (
    <div className="absolute contents inset-[58.59%_-1.63%_32.61%_100.48%]" data-name="Group">
      <Group181 />
    </div>
  );
}

function Group183() {
  return (
    <div className="absolute contents inset-[58.59%_-1.63%_32.61%_100.48%]" data-name="Group">
      <Group182 />
    </div>
  );
}

function Group184() {
  return (
    <div className="absolute inset-[58.6%_4.07%_32.6%_94.78%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.02521 2.28727">
        <g id="Group">
          <path d={svgPaths.p50cb680} fill="var(--fill-0, #5D2B24)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group185() {
  return (
    <div className="absolute contents inset-[58.6%_4.07%_32.6%_94.78%]" data-name="Group">
      <Group184 />
    </div>
  );
}

function Group186() {
  return (
    <div className="absolute contents inset-[58.6%_4.07%_32.6%_94.78%]" data-name="Group">
      <Group185 />
    </div>
  );
}

function Group187() {
  return (
    <div className="absolute contents inset-[58.59%_-1.63%_32.6%_94.78%]" data-name="Group">
      <Group183 />
      <Group186 />
    </div>
  );
}

function Group188() {
  return (
    <div className="absolute contents inset-[9.62%_-3.49%_-11.04%_92.86%]" data-name="Group">
      <Group30 />
      <Group33 />
      <Group35 />
      <Group165 />
      <Group180 />
      <Group187 />
    </div>
  );
}

function Group189() {
  return (
    <div className="absolute inset-[9.61%_58.23%_-11.04%_31.14%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2092 26.3693">
        <g id="Group">
          <path d={svgPaths.pdf12680} fill="var(--fill-0, #B83126)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group190() {
  return (
    <div className="absolute contents inset-[9.61%_58.23%_-11.04%_31.14%]" data-name="Group">
      <Group189 />
    </div>
  );
}

function Group191() {
  return (
    <div className="absolute contents inset-[3.12%_58.22%_-53.44%_31.13%]" data-name="Group">
      <div className="absolute inset-[3.12%_58.22%_-53.44%_31.13%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle28}')`, maskPosition: '0.035px_1.688px', maskSize: '37.207px_23.118px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle29} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup73() {
  return (
    <div className="absolute contents inset-[9.61%_58.23%_1.47%_31.14%]" data-name="Clip path group">
      <Group191 />
    </div>
  );
}

function Group192() {
  return (
    <div className="absolute contents inset-[9.61%_58.23%_1.47%_31.14%]" data-name="Group">
      <ClipPathGroup73 />
    </div>
  );
}

function Group193() {
  return (
    <div className="absolute contents inset-[9.61%_58.23%_1.47%_31.14%]" data-name="Group">
      <Group192 />
    </div>
  );
}

function Group194() {
  return (
    <div className="absolute inset-[12.62%_61.82%_79.01%_34.79%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8784 2.17778">
        <g id="Group">
          <path d={svgPaths.p32d33280} fill="var(--fill-0, #EB4C2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group195() {
  return (
    <div className="absolute contents inset-[12.62%_61.82%_79.01%_34.79%]" data-name="Group">
      <Group194 />
    </div>
  );
}

function Group196() {
  return (
    <div className="absolute contents inset-[28.27%_62.18%_5.33%_31.2%]" data-name="Group">
      <div className="absolute inset-[28.27%_62.18%_5.33%_31.2%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle30}')`, maskPosition: '5.638px_0.098px', maskSize: '9.236px_8.64px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle31} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup74() {
  return (
    <div className="absolute contents inset-[28.64%_64.55%_38.12%_32.81%]" data-name="Clip path group">
      <Group196 />
    </div>
  );
}

function Group197() {
  return (
    <div className="absolute contents inset-[28.64%_64.55%_38.12%_32.81%]" data-name="Group">
      <ClipPathGroup74 />
    </div>
  );
}

function Group198() {
  return (
    <div className="absolute contents inset-[28.64%_64.55%_38.12%_32.81%]" data-name="Group">
      <Group197 />
    </div>
  );
}

function Group199() {
  return (
    <div className="absolute contents inset-[30.49%_63.48%_15.89%_32.1%]" data-name="Group">
      <div className="absolute inset-[30.49%_63.48%_15.89%_32.1%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle32}')`, maskPosition: '3.267px_0.251px', maskSize: '7.679px_7.18px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle33} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup75() {
  return (
    <div className="absolute contents inset-[31.45%_64.77%_40.93%_33.04%]" data-name="Clip path group">
      <Group199 />
    </div>
  );
}

function Group200() {
  return (
    <div className="absolute contents inset-[31.45%_64.77%_40.93%_33.04%]" data-name="Group">
      <ClipPathGroup75 />
    </div>
  );
}

function Group201() {
  return (
    <div className="absolute contents inset-[31.45%_64.77%_40.93%_33.04%]" data-name="Group">
      <Group200 />
    </div>
  );
}

function Group202() {
  return (
    <div className="absolute contents inset-[28.64%_64.55%_38.12%_32.81%]" data-name="Group">
      <Group198 />
      <Group201 />
    </div>
  );
}

function Group203() {
  return (
    <div className="absolute contents inset-[28.27%_58.22%_4.22%_35.04%]" data-name="Group">
      <div className="absolute inset-[28.27%_58.22%_4.22%_35.04%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle34}')`, maskPosition: '8.754px_0.105px', maskSize: '9.094px_8.581px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle35} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup76() {
  return (
    <div className="absolute contents inset-[28.67%_59.86%_38.32%_37.54%]" data-name="Clip path group">
      <Group203 />
    </div>
  );
}

function Group204() {
  return (
    <div className="absolute contents inset-[28.67%_59.86%_38.32%_37.54%]" data-name="Group">
      <ClipPathGroup76 />
    </div>
  );
}

function Group205() {
  return (
    <div className="absolute contents inset-[28.67%_59.86%_38.32%_37.54%]" data-name="Group">
      <Group204 />
    </div>
  );
}

function Group206() {
  return (
    <div className="absolute contents inset-[30.49%_59.12%_16.03%_36.48%]" data-name="Group">
      <div className="absolute inset-[30.49%_59.12%_16.03%_36.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle36}')`, maskPosition: '4.48px_0.252px', maskSize: '7.561px_7.132px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle37} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup77() {
  return (
    <div className="absolute contents inset-[31.46%_60.08%_41.12%_37.76%]" data-name="Clip path group">
      <Group206 />
    </div>
  );
}

function Group207() {
  return (
    <div className="absolute contents inset-[31.46%_60.08%_41.12%_37.76%]" data-name="Group">
      <ClipPathGroup77 />
    </div>
  );
}

function Group208() {
  return (
    <div className="absolute contents inset-[31.46%_60.08%_41.12%_37.76%]" data-name="Group">
      <Group207 />
    </div>
  );
}

function Group209() {
  return (
    <div className="absolute contents inset-[28.67%_59.86%_38.32%_37.54%]" data-name="Group">
      <Group205 />
      <Group208 />
    </div>
  );
}

function Group210() {
  return (
    <div className="absolute contents inset-[28.64%_59.86%_38.12%_32.81%]" data-name="Group">
      <Group202 />
      <Group209 />
    </div>
  );
}

function Group211() {
  return (
    <div className="absolute inset-[25.12%_60.1%_63.37%_36.92%] opacity-[0.94]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4262 2.99105">
        <g id="Group">
          <path d={svgPaths.p21a597f0} fill="var(--fill-0, #702D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group212() {
  return (
    <div className="absolute contents inset-[25.12%_60.1%_63.37%_36.92%]" data-name="Group">
      <Group211 />
    </div>
  );
}

function Group213() {
  return (
    <div className="absolute contents inset-[25.12%_60.1%_63.37%_36.92%]" data-name="Group">
      <Group212 />
    </div>
  );
}

function Group214() {
  return (
    <div className="absolute contents inset-[25.12%_60.1%_63.37%_36.92%]" data-name="Group">
      <Group213 />
    </div>
  );
}

function Group215() {
  return (
    <div className="absolute contents inset-[25.12%_60.1%_63.37%_36.92%]" data-name="Group">
      <Group214 />
    </div>
  );
}

function Group216() {
  return (
    <div className="absolute contents inset-[25.12%_60.1%_63.37%_36.92%]" data-name="Group">
      <Group215 />
    </div>
  );
}

function Group217() {
  return (
    <div className="absolute inset-[25.11%_63.74%_63.37%_33.28%] opacity-[0.94]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4243 2.99519">
        <g id="Group">
          <path d={svgPaths.p175875b0} fill="var(--fill-0, #702D26)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group218() {
  return (
    <div className="absolute contents inset-[25.11%_63.74%_63.37%_33.28%]" data-name="Group">
      <Group217 />
    </div>
  );
}

function Group219() {
  return (
    <div className="absolute contents inset-[25.11%_63.74%_63.37%_33.28%]" data-name="Group">
      <Group218 />
    </div>
  );
}

function Group220() {
  return (
    <div className="absolute contents inset-[25.11%_63.74%_63.37%_33.28%]" data-name="Group">
      <Group219 />
    </div>
  );
}

function Group221() {
  return (
    <div className="absolute contents inset-[25.11%_63.74%_63.37%_33.28%]" data-name="Group">
      <Group220 />
    </div>
  );
}

function Group222() {
  return (
    <div className="absolute contents inset-[25.11%_63.74%_63.37%_33.28%]" data-name="Group">
      <Group221 />
    </div>
  );
}

function Group223() {
  return (
    <div className="absolute contents inset-[25.11%_60.1%_63.37%_33.28%]" data-name="Group">
      <Group216 />
      <Group222 />
    </div>
  );
}

function Group224() {
  return (
    <div className="absolute contents inset-[49.93%_60.39%_-11.2%_33.52%]" data-name="Group">
      <div className="absolute inset-[49.93%_60.39%_-11.2%_33.52%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle38}')`, maskPosition: '2.167px_3.194px', maskSize: '17.087px_5.576px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle39} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup78() {
  return (
    <div className="absolute contents inset-[62.22%_60.98%_16.34%_34.13%]" data-name="Clip path group">
      <Group224 />
    </div>
  );
}

function Group225() {
  return (
    <div className="absolute contents inset-[62.22%_60.98%_16.34%_34.13%]" data-name="Group">
      <ClipPathGroup78 />
    </div>
  );
}

function Group226() {
  return (
    <div className="absolute contents inset-[62.22%_60.98%_16.34%_34.13%]" data-name="Group">
      <Group225 />
    </div>
  );
}

function Group227() {
  return (
    <div className="absolute contents inset-[-16.89%_58.99%_-0.64%_32.13%]" data-name="Group">
      <div className="absolute inset-[-16.89%_58.99%_-0.64%_32.13%] mask-alpha mask-intersect mask-no-clip mask-no-repeat" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle40}')`, maskPosition: '7.015px_19.928px', maskSize: '17.085px_5.576px', maskRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle41} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup79() {
  return (
    <div className="absolute contents inset-[59.76%_60.98%_18.8%_34.13%]" data-name="Clip path group">
      <Group227 />
    </div>
  );
}

function Group228() {
  return (
    <div className="absolute contents inset-[59.76%_60.98%_18.8%_34.13%]" data-name="Group">
      <ClipPathGroup79 />
    </div>
  );
}

function Group229() {
  return (
    <div className="absolute contents inset-[59.76%_60.98%_18.8%_34.13%]" data-name="Group">
      <Group228 />
    </div>
  );
}

function Group230() {
  return (
    <div className="absolute contents inset-[59.76%_60.98%_16.34%_34.13%]" data-name="Group">
      <Group226 />
      <Group229 />
    </div>
  );
}

function Group231() {
  return (
    <div className="absolute contents inset-[9.62%_58.23%_-11.04%_31.14%]" data-name="Group">
      <Group190 />
      <Group193 />
      <Group195 />
      <Group210 />
      <Group223 />
      <Group230 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[38px] relative shrink-0 w-[350px]">
      {/* Emoji 1: Angry (Red) - Aligns with Item 34 (Index 14) -> ~128px */}
      <div className="absolute top-0 left-[128px] w-[38px] h-[38px] flex items-center justify-center -translate-x-1/2">
        <span className="text-[24px] leading-none select-none filter drop-shadow-sm">😡</span>
      </div>

      {/* Emoji 2: Neutral (Yellow) - Aligns with Item 49 (Index 29) -> ~263px */}
      <div className="absolute top-0 left-[263px] w-[38px] h-[38px] flex items-center justify-center -translate-x-1/2">
        <span className="text-[24px] leading-none select-none filter drop-shadow-sm">😐</span>
      </div>

      {/* Emoji 3: Happy (Yellow) - Aligns with Item 58 (Index 38) -> ~344px */}
      <div className="absolute top-0 left-[344px] w-[38px] h-[38px] flex items-center justify-center -translate-x-1/2">
        <span className="text-[24px] leading-none select-none filter drop-shadow-sm">😃</span>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[5px] items-end relative shrink-0 w-full">
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 1" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 21" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 22" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 23" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 24" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 25" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 26" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 27" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 28" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 29" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 30" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 31" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 33" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 32" />
      <div className="bg-[#0f67fe] h-[73px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 34" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 40" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 39" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 35" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 36" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 37" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 38" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 41" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 42" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 43" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 44" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 45" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 46" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 47" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 48" />
      <div className="bg-[#0f67fe] h-[73px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 49" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 50" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 51" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 52" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 53" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 54" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 55" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 56" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 57" />
      <div className="bg-[#0f67fe] h-[73px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 58" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[29px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 59" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[22px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 60" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 61" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 62" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 63" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 64" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 65" />
      <div className="bg-[rgba(2,2,24,0.12)] h-[17px] rounded-[2.5px] shrink-0 w-[4px]" data-name="Item 66" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-center justify-between leading-[1.5] not-italic relative shrink-0 text-[14px] text-[rgba(2,2,24,0.3)] text-center text-nowrap w-[418px]">
      <p className="relative shrink-0">Jan</p>
      <p className="relative shrink-0">Feb</p>
      <p className="relative shrink-0">Mar</p>
      <p className="relative shrink-0">Apr</p>
      <p className="relative shrink-0">May</p>
      <p className="relative shrink-0">Jun</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame25 />
      <Frame22 />
      <Frame26 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[50px] items-center p-[32px] relative rounded-[24px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#dcd6d6] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
      <Frame27 />
      <div className="font-['Helvetica_Neue:Medium',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#020218] text-[20px] text-center w-[340px]">
        <p className="mb-0"><strong className="font-bold">Veja exatamente</strong> como a sua equipa se sente hoje.</p>
        <p className="mb-0">&nbsp;</p>
        <p><strong className="font-bold">Acompanhe a transformação:</strong> veja o progresso mês após mês.</p>
      </div>
    </div>
  );
}

function SolidHeadHeart() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Solid head heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Solid head heart">
          <path clipRule="evenodd" d={svgPaths.p37ca6580} fill="var(--fill-0, #5D6A85)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f2f5f9] overflow-clip relative rounded-[10px] shrink-0 size-[64px]" data-name="Frame">
      <SolidHeadHeart />
    </div>
  );
}

function Misc() {
  return <div className="basis-0 bg-[#ffbd1a] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Misc" />;
}

function Vector() {
  return <div className="basis-0 bg-[#ffbd1a] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Vector" />;
}

function Vector1() {
  return <div className="basis-0 bg-[#feeec5] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Vector" />;
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Frame">
      <Misc />
      {[...Array(2).keys()].map((_, i) => (
        <Vector key={i} />
      ))}
      {[...Array(2).keys()].map((_, i) => (
        <Vector1 key={i} />
      ))}
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Frame">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111927] text-[18px] text-nowrap tracking-[-0.18px]">Nivel de stress</p>
      <Frame1 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#6c737f] text-[14px] tracking-[-0.14px] w-[min-content]">Level 3 (Normal)</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[12px] h-[64px] items-center relative shrink-0 w-full" data-name="Content">
      <Frame />
      <Frame2 />
    </div>
  );
}

function HomeMentalHealthTrackerCard() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[-105px] overflow-clip p-[14px] rounded-[12px] shadow-[4px_8px_30px_0px_rgba(183,183,183,0.25)] top-0 w-[320px]" data-name="Home Mental Health Tracker Card">
      <Content />
    </div>
  );
}

function SolidDocumentHealth() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Solid document health">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Solid document health">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3decdac0} fill="var(--fill-0, #5D6A85)" fillRule="evenodd" />
            <path d={svgPaths.p3a210280} fill="var(--fill-0, #5D6A85)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[#f2f5f9] overflow-clip relative rounded-[10px] shrink-0 size-[64px]" data-name="Icon Container">
      <SolidDocumentHealth />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative min-w-0 flex-1" data-name="Text">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111927] text-[18px] tracking-[-0.18px]">Vida mais tranquila</p>
      <p className="font-['Manrope:Medium',sans-serif] font-medium relative shrink-0 text-[#6c737f] text-[14px] tracking-[-0.14px]">64 Day Streak</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <IconContainer />
      <Text />
    </div>
  );
}

function Misc1() {
  return <div className="bg-[#fff0eb] rounded-[4px] shrink-0 size-[12px]" data-name="Misc" />;
}

function Frame3() {
  return <div className="bg-[#fff0eb] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame4() {
  return <div className="bg-[#ffd2c2] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Frame">
      <Misc1 />
      <Frame3 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame4 key={i} />
      ))}
    </div>
  );
}

function Misc2() {
  return <div className="bg-[#fff0eb] rounded-[4px] shrink-0 size-[12px]" data-name="Misc" />;
}

function Frame6() {
  return <div className="bg-[#fe814b] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Frame">
      <Misc2 />
      {[...Array(3).keys()].map((_, i) => (
        <Frame6 key={i} />
      ))}
    </div>
  );
}

function Misc3() {
  return <div className="bg-[#fe814b] rounded-[4px] shrink-0 size-[12px]" data-name="Misc" />;
}

function Frame8() {
  return <div className="bg-[#fe814b] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame9() {
  return <div className="bg-[#ffd2c2] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Frame">
      <Misc3 />
      <Frame8 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame9 key={i} />
      ))}
    </div>
  );
}

function Misc4() {
  return <div className="bg-[#fff0eb] rounded-[4px] shrink-0 size-[12px]" data-name="Misc" />;
}

function Frame11() {
  return <div className="bg-[#fff0eb] rounded-[4px] shrink-0 size-[12px]" data-name="Frame" />;
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Frame">
      <Misc4 />
      {[...Array(3).keys()].map((_, i) => (
        <Frame11 key={i} />
      ))}
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Frame">
      <Frame5 />
      <Frame7 />
      <Frame10 />
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="Frame">
      <Frame13 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Content">
      <Content1 />
      <Frame14 />
    </div>
  );
}

function HomeMentalHealthTrackerCard1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[151px] overflow-clip p-[14px] rounded-[12px] shadow-[4px_8px_30px_0px_rgba(183,183,183,0.25)] top-[108px] w-[320px]" data-name="Home Mental Health Tracker Card">
      <Content2 />
    </div>
  );
}

function MonotoneHospitalBed() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Monotone hospital bed">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Monotone hospital bed">
          <path d="M12 6V12" id="Vector" stroke="var(--stroke-0, #5D6A85)" strokeLinejoin="round" strokeWidth="2" />
          <path d="M15 9L9 9" id="Vector_2" stroke="var(--stroke-0, #5D6A85)" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1cab61c0} id="Vector_3" stroke="var(--stroke-0, #5D6A85)" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3a4b93c0} id="Vector_4" stroke="var(--stroke-0, #5D6A85)" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[#f2f5f9] overflow-clip relative rounded-[10px] shrink-0 size-[64px]" data-name="Icon Container">
      <MonotoneHospitalBed />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 text-nowrap" data-name="Text">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111927] text-[18px] tracking-[-0.18px]">Problemas fina</p>
      <p className="font-['Manrope:Medium',sans-serif] font-medium relative shrink-0 text-[#6c737f] text-[14px] tracking-[-0.14px]">Insomniac (~2h Avg)</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <IconContainer1 />
      <Text1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="Frame">
      <div className="absolute left-1/2 size-[56px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
          <path d={svgPaths.p3c4b2b40} id="Vector" stroke="var(--stroke-0, #EDEBFF)" strokeWidth="10" />
        </svg>
      </div>
      <div className="absolute left-1/2 size-[56px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-[0_1.4%_51.7%_41.07%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.2175 27.0484">
            <path d={svgPaths.p3c2f0100} id="Vector" stroke="var(--stroke-0, #A28FFF)" strokeLinecap="round" strokeWidth="10" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[calc(50%-1px)] text-[#4b3425] text-[13px] text-center text-nowrap top-[calc(50%-7px)] tracking-[-0.13px] translate-x-[-50%]">1</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Content">
      <Content3 />
      <Frame15 />
    </div>
  );
}

function HomeMentalHealthTrackerCard2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[231px] overflow-clip p-[14px] rounded-[12px] shadow-[4px_8px_30px_0px_rgba(183,183,183,0.25)] top-0 w-[320px]" data-name="Home Mental Health Tracker Card">
      <Content4 />
    </div>
  );
}

function VuesaxLinearDrop() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/drop">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="drop">
          <path d={svgPaths.p288a3800} fill="var(--fill-0, #5D6A85)" id="Vector" />
          <g id="Vector_2" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Drop() {
  return (
    <div className="absolute left-[20px] size-[24px] top-[19.77px]" data-name="drop">
      <VuesaxLinearDrop />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#f2f5f9] overflow-clip relative rounded-[10px] shrink-0 size-[64px]" data-name="Frame">
      <Drop />
    </div>
  );
}

function Misc5() {
  return <div className="basis-0 bg-[#0f67fe] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Misc" />;
}

function Vector2() {
  return <div className="basis-0 bg-[#0f67fe] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Vector" />;
}

function Vector3() {
  return <div className="basis-0 bg-[#dbe8fe] grow h-[6px] min-h-px min-w-px rounded-[1234px] shrink-0" data-name="Vector" />;
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Frame">
      <Misc5 />
      {[...Array(2).keys()].map((_, i) => (
        <Vector2 key={i} />
      ))}
      {[...Array(2).keys()].map((_, i) => (
        <Vector3 key={i} />
      ))}
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex font-['Manrope:Medium',sans-serif] font-medium gap-[8px] items-start leading-[normal] relative shrink-0 text-[#6c737f] text-[14px] tracking-[-0.14px] w-full">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">700 ml</p>
      <p className="relative shrink-0 text-nowrap">2.000 ml</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Frame">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111927] text-[18px] text-nowrap tracking-[-0.18px]">Hydration</p>
      <Frame17 />
      <Frame20 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[12px] h-[64px] items-center relative shrink-0 w-full" data-name="Content">
      <Frame16 />
      <Frame18 />
    </div>
  );
}

function HomeMentalHealthTrackerCard3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[-185px] overflow-clip p-[14px] rounded-[12px] shadow-[4px_8px_30px_0px_rgba(183,183,183,0.25)] top-[108px] w-[320px]" data-name="Home Mental Health Tracker Card">
      <Content5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-[200px] relative shrink-0 w-[394px]">
      <TrackerCard
        className="left-[-105px] top-0"
        title="Nivel de stress"
        icon={<SolidHeadHeart />}
        content={
          <div className="flex flex-col gap-1 w-full mt-1">
            <BarGroup activeColor="#ffbd1a" inactiveColor="#feeec5" />
            <p className="font-['Manrope:Medium',sans-serif] font-medium text-[#6c737f] text-[14px] tracking-[-0.14px] w-full truncate">Level 3 (Normal)</p>
          </div>
        }
      />
      <TrackerCard
        className="left-[151px] top-[108px]"
        title="Vida mais tranquila"
        subtitle="64 Day Streak"
        icon={<SolidDocumentHealth />}
        rightElement={<Frame13 />}
      />
      <TrackerCard
        className="left-[231px] top-0"
        title="Problemas fina"
        subtitle="Insomniac (~2h Avg)"
        icon={<MonotoneHospitalBed />}
        rightElement={<Frame15 />}
      />
      <TrackerCard
        className="left-[-185px] top-[108px]"
        title="Hydration"
        icon={<VuesaxLinearDrop />}
        content={
          <div className="flex flex-col gap-1 w-full mt-1">
            <BarGroup activeColor="#0f67fe" inactiveColor="#dbe8fe" />
            <div className="flex justify-between w-full text-[14px] text-[#6c737f] font-medium">
              <span>700 ml</span>
              <span>2.000 ml</span>
            </div>
          </div>
        }
      />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[50px] items-center p-[32px] relative w-full">
          <Frame29 />
          <p className="mb-0"><strong className="font-bold">Identifique onde a equipa sofre mais</strong> e ataque o problema pela raiz.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcd6d6] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[35px] items-start left-[577px] top-[83px]">
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#f8f8fe] min-h-[600px] md:h-[1070px] relative rounded-[20px] md:rounded-[50px] shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col md:flex-row items-center md:items-center justify-between p-6 md:p-12 lg:p-[80px] relative w-full gap-8 md:gap-[60px]">
          {/* Left side - Descriptive Text */}
          <div className="flex flex-col gap-4 md:gap-[24px] w-full md:max-w-[450px]">
            <h2 className="font-['Helvetica_Neue:Medium',sans-serif] text-[20px] md:text-[28px] lg:text-[32px] leading-[1.2] text-[#020218]">
              Descubra Como a Sua Equipa Realmente se Sente
            </h2>

            {/* Mobile Mood Indicator Card */}
            <div className="md:hidden w-full max-w-[400px] mx-auto">
              <MoodIndicatorCard />
            </div>

            <div className="flex flex-col gap-4 md:gap-[20px] font-['Helvetica_Neue:Regular',sans-serif] text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-[#020218]/80">
              <p>
                A Melhor Saúde oferece o Indicador de Humor, uma métrica exclusiva desenhada para medir o estado emocional real da sua organização em dois pontos cruciais: o humor atual da equipa e a evolução do bem-estar ao longo do tempo enquanto trabalha connosco.
              </p>
              <p>
                Funciona de forma simples: sempre que um colaborador regista o seu estado de espírito na plataforma, a sua equipa recebe dados automáticos em tempo real. É o fim das suposições.
              </p>
              <p>
                Além disso, o painel mostra exatamente em que pilares a equipa está a sofrer mais — Saúde Mental, Bem-Estar Físico, Assistência Financeira ou Apoio Jurídico — para que saiba onde concentrar workshops, recursos e apoio especializado.
              </p>
              <p>
                Com estas métricas claras, deixe de agir "às cegas". Terá a informação precisa para construir uma equipa mais produtiva, engajada e saudável — e evitar a rotatividade, o burnout e a desmotivação que destroem empresas por dentro.
              </p>
            </div>
          </div>

          {/* Right side - Cards - Hidden on mobile */}
          <div className="hidden md:block">
            <Frame28 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pb-[40px] md:pb-[60px] lg:pb-[80px] pt-0 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[150px] relative w-full">
        <Frame19 />
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="relative bg-white content-stretch flex flex-col gap-8 md:gap-[64px] items-center justify-center pb-0 pt-8 md:pt-[80px] px-0 w-full" data-name="Features">
      <Heading />
      <Frame21 />
    </div>
  );
}

export default function Frame30() {
  return (
    <div className="relative w-full">
      <Features />
    </div>
  );
}