import svgPaths from "./svg-krdlq9s2jm";
const imgMelhorSaudeTransparentClean1 = "/landing-assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
const imgMelhorSaudeTransparentLogo1 = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[248px]">
      <div className="absolute h-[21px] left-[34px] top-0 w-[195px]" data-name="melhor_saude_transparent_clean 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentClean1} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-0 relative shrink-0">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[16px] text-black tracking-[0.2px] w-[44px]">Início</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start px-[10px] py-0 relative shrink-0">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[0.2px]">Para Empresas</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-0 relative shrink-0">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#020218] text-[16px] text-nowrap tracking-[0.2px]">A Nossa IA</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-0 relative shrink-0">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#020218] text-[16px] text-nowrap tracking-[0.2px]">Como Funciona</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
      <Frame1 />
      <Frame3 />
      <Frame4 />
      <Frame2 />
    </div>
  );
}

function VuesaxBoldCallCalling() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/call-calling">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="call-calling">
          <path d={svgPaths.pcc44100} fill="var(--fill-0, #020218)" id="Vector" />
          <path d={svgPaths.pde9c200} fill="var(--fill-0, #020218)" id="Vector_2" />
          <path d={svgPaths.p3a3e0520} fill="var(--fill-0, #020218)" id="Vector_3" />
          <path d={svgPaths.p24472b80} fill="var(--fill-0, #020218)" id="Vector_4" />
          <g id="Vector_5" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function CallCalling() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="call-calling">
      <VuesaxBoldCallCalling />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[15px] relative rounded-[1000px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)] shrink-0" data-name="Button">
      <CallCalling />
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#020218] text-[16px] text-center w-[88px]">Contactar</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-[248px]">
      <Button />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#5397f1] content-stretch flex items-center justify-center left-[1132px] px-[16px] py-[15px] rounded-[1000px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)] top-[26px]" data-name="Button">
      <p className="font-['Helvetica_Neue:Medium',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-center text-white w-[88px]">Entrar</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 px-[40px] py-[20px] top-0 w-[1440px]">
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Button1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute h-[90px] left-px top-[12px] w-[1440px]">
      <Frame />
    </div>
  );
}

export default function Frame9() {
  return (
    <div className="relative size-full">
      <Frame8 />
      <div className="absolute h-[114px] left-0 top-0 w-[76px]" data-name="melhor saude transparent logo\ 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMelhorSaudeTransparentLogo1} />
      </div>
    </div>
  );
}