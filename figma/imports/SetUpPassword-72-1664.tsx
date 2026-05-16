import svgPaths from "./svg-v32nb9gxqy";
import clsx from "clsx";
type KeyboardSuggestionHelperProps = {
  additionalClassNames?: string;
};

function KeyboardSuggestionHelper({ additionalClassNames = "" }: KeyboardSuggestionHelperProps) {
  return (
    <div className={clsx("absolute flex h-[25px] items-center justify-center top-[calc(50%+2.5px)] translate-y-[-50%] w-px", additionalClassNames)}>
      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
        <div className="bg-[#aeaeb2] h-[25px] opacity-50 rounded-[1px] w-px" data-name="Divider" />
      </div>
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

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 right-0" data-name="HomeIndicator">
      <div className="absolute bg-black bottom-[8px] h-[5px] left-[calc(50%-1.5px)] rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

function KeyContainer() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer />
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">1</p>
      </div>
    </div>
  );
}

function KeyContainer1() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer1 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">ABC</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  );
}

function KeyContainer2() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer2 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">DEF</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="absolute content-stretch flex gap-[5px] h-[46px] items-start left-[6px] right-[6px] top-[52px]" data-name="Row">
      <Key />
      <Key1 />
      <Key2 />
    </div>
  );
}

function KeyContainer3() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer3 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">GHI</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">4</p>
      </div>
    </div>
  );
}

function KeyContainer4() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer4 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">JKL</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">5</p>
      </div>
    </div>
  );
}

function KeyContainer5() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer5 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">MNO</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">6</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="absolute content-stretch flex gap-[5px] h-[46px] items-start left-[6px] right-[6px] top-[105px]" data-name="Row">
      <Key3 />
      <Key4 />
      <Key5 />
    </div>
  );
}

function KeyContainer6() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key6() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer6 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">PQRS</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">7</p>
      </div>
    </div>
  );
}

function KeyContainer7() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key7() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer7 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">TUV</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">8</p>
      </div>
    </div>
  );
}

function KeyContainer8() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key8() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer8 />
      <p className="absolute font-['SF_Pro_Text:Bold',sans-serif] inset-[62.5%_-0.33px_8.93%_0] leading-[normal] not-italic text-[10px] text-black text-center tracking-[2px]">WXYZ</p>
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] h-[26px] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-[calc(50%-8px)] tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">9</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="absolute content-stretch flex gap-[5px] h-[46px] items-start left-[6px] right-[6px] top-[158px]" data-name="Row">
      <Key6 />
      <Key7 />
      <Key8 />
    </div>
  );
}

function Key9() {
  return <div className="basis-0 grow h-full min-h-px min-w-px shrink-0" data-name="_Key" />;
}

function KeyContainer9() {
  return <div className="absolute bg-white inset-[0_0.81%_0_0] rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]" data-name="_KeyContainer" />;
}

function Key10() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <KeyContainer9 />
      <div className="absolute flex flex-col font-['SF_Pro_Display:Regular',sans-serif] justify-center leading-[0] left-0 not-italic right-[-0.33px] text-[25px] text-black text-center top-1/2 tracking-[0.2912px] translate-y-[-50%]">
        <p className="leading-[normal]">0</p>
      </div>
    </div>
  );
}

function Key11() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="_Key">
      <div className="absolute h-[17px] left-[calc(50%-1.33px)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[23px]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 17">
          <g id="Union">
            <path d={svgPaths.p308e9e00} fill="var(--fill-0, black)" />
            <path clipRule="evenodd" d={svgPaths.p320b9800} fill="var(--fill-0, black)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="absolute content-stretch flex gap-[5px] h-[46px] items-start left-[6px] right-[6px] top-[211px]" data-name="Row">
      <Key9 />
      <Key10 />
      <Key11 />
    </div>
  );
}

function KeyboardSuggestion() {
  return (
    <div className="absolute backdrop-blur-[54.366px] backdrop-filter bg-[#d1d3d9] h-[46px] left-0 overflow-clip top-0 w-[390px]" data-name="_Keyboard-suggestion">
      <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-end leading-[0] left-[calc(50%+0.5px)] not-italic text-[17px] text-black text-center text-nowrap top-[calc(50%+18px)] tracking-[-0.408px] translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[22px]">57584</p>
      </div>
      <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-end leading-[0] left-[calc(50%+0.5px)] not-italic text-[11px] text-black text-center text-nowrap top-[calc(50%-5px)] tracking-[0.066px] translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[13px]">From Messages</p>
      </div>
      <KeyboardSuggestionHelper additionalClassNames="left-[30px]" />
      <KeyboardSuggestionHelper additionalClassNames="right-[30px]" />
    </div>
  );
}

function NumericKeyboard() {
  return (
    <div className="absolute backdrop-blur-[54.366px] backdrop-filter bg-[#d1d3d9] bottom-0 h-[336px] left-1/2 translate-x-[-50%] w-[393px]" data-name="NumericKeyboard">
      <HomeIndicator />
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
      <KeyboardSuggestion />
    </div>
  );
}

function FormField() {
  return (
    <div className="relative rounded-[1000px] shrink-0 w-full" data-name="form-field">
      <div aria-hidden="true" className="absolute border border-[#8f908d] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[14px] relative w-full">
          <div className="basis-0 flex flex-col font-['SF_Pro_Text:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#8f908d] text-[15px] tracking-[-0.408px]">
            <p className="leading-[22px]">**********</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="form">
      <FormField />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8f908d] text-[14px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px]">Use at least 8 characters.</p>
      </div>
    </div>
  );
}

function PasswordField() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-1/2 top-[123px] translate-x-[-50%] w-[345px]" data-name="password-field">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.408px] w-full">
        <p className="leading-[22px]">Set your password</p>
      </div>
      <Form />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[10px] items-center justify-center left-1/2 px-[20px] py-[14px] rounded-[1000px] top-[434px] translate-x-[-50%] w-[345px]" data-name="Button">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
        <p className="leading-[22px]">Next, enter your OTP</p>
      </div>
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

export default function SetUpPassword() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] size-full" data-name="Set up password">
      <StatusBarPro />
      <NumericKeyboard />
      <PasswordField />
      <Button />
      <BackBtn />
    </div>
  );
}
