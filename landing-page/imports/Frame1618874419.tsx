const imgImage1412 = "/landing-assets/87207ca4e3b1a952548882d4af04627b966eb352.png";
const imgMelhorSaudeTransparentLogo2 = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
const imgImage1413 = "/landing-assets/95830b7bac3b6b4661a9f148fa62d3c7780610f1.png";
import Frame1618868513 from "./Frame1618868513";

function Button() {
  return (
    <div className="bg-[#d8ddff] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[1000px] shrink-0" data-name="Button">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#0f67fe] text-[14px] text-nowrap">Conversa e Cura</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center px-4" data-name="Heading">
      <Button />
      <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[1.1] not-italic relative shrink-0 text-[#020218] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] text-center w-full max-w-[866px]">
        <p className="mb-0">{`IA Treinada Pelos `}</p>
        <p>Melhores do Mundo</p>
      </div>
    </div>
  );
}

function BubleChat() {
  return (
    <div className="bg-white content-stretch flex items-start p-[11.725px] relative rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] shrink-0" data-name="Buble Chat">
      <div aria-hidden="true" className="absolute border-[#dcd6d6] border-[0.837px] border-solid inset-[-0.418px] pointer-events-none rounded-bl-[20.418px] rounded-tl-[20.418px] rounded-tr-[20.418px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#061b0b] text-[24px] text-nowrap tracking-[-0.12px]">Sinto-me <strong className="font-bold">sufocado com as contas.</strong></p>
    </div>
  );
}

function BubleChat1() {
  return (
    <div className="content-stretch flex gap-[13.4px] items-start justify-end relative shrink-0 w-full" data-name="Buble Chat">
      <BubleChat />
      <div className="relative rounded-[16.728px] shrink-0 size-[50px]" data-name="image 1412">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16.728px] size-full" src={imgImage1412} />
      </div>
    </div>
  );
}

function Logomark() {
  return <div className="absolute h-[32.077px] left-[15.5px] top-[8.55px] w-[26.063px]" data-name="Logomark" />;
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <div className="absolute bg-black left-0 rounded-[16.73px] size-[50px] top-0" />
      <Logomark />
      <div className="absolute h-[76px] left-[-0.5px] top-[-10.45px] w-[51px]" data-name="melhor saude transparent logo\ 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.63%] left-[1.24%] max-w-none top-[0.08%] w-full" src={imgMelhorSaudeTransparentLogo2} />
        </div>
      </div>
    </div>
  );
}

function BubleChat2() {
  return (
    <div className="bg-white content-stretch flex items-start p-[11.725px] relative rounded-br-[20px] rounded-tl-[20px] rounded-tr-[20px] self-stretch shrink-0 w-[518px]" data-name="Buble Chat">
      <div aria-hidden="true" className="absolute border-[#dcd6d6] border-[0.837px] border-solid inset-[-0.418px] pointer-events-none rounded-br-[20.418px] rounded-tl-[20.418px] rounded-tr-[20.418px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
      <p className="basis-0 font-['Helvetica_Neue:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#020218] text-[24px]">Eu posso ajudar a organizar isso agora. Já ouviu falar da <strong className="font-bold">Regra 50/30/20?</strong></p>
    </div>
  );
}

function BubleChat3() {
  return (
    <div className="content-stretch flex gap-[13.4px] items-start relative shrink-0 w-full max-w-[931px]" data-name="Buble Chat">
      <Frame2 />
      <BubleChat2 />
    </div>
  );
}

function BubleChat4() {
  return (
    <div className="bg-white content-stretch flex items-start p-[11.725px] relative rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] shrink-0" data-name="Buble Chat">
      <div aria-hidden="true" className="absolute border-[#dcd6d6] border-[0.837px] border-solid inset-[-0.418px] pointer-events-none rounded-bl-[20.418px] rounded-tl-[20.418px] rounded-tr-[20.418px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#020218] text-[24px] text-nowrap">Não, <strong className="font-bold">nunca ouvi.</strong></p>
    </div>
  );
}

function BubleChat5() {
  return (
    <div className="content-stretch flex gap-[13.4px] items-start justify-end relative shrink-0 w-full" data-name="Buble Chat">
      <BubleChat4 />
      <div className="relative shrink-0 size-[50px]" data-name="image 1412">
        <img alt="" className="block max-w-none size-full" height="50" src={imgImage1413} width="50" />
      </div>
    </div>
  );
}

function Logomark1() {
  return <div className="absolute h-[32.077px] left-[15.5px] top-[8.55px] w-[26.063px]" data-name="Logomark" />;
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <div className="absolute bg-black left-0 rounded-[16.73px] size-[50px] top-0" />
      <Logomark1 />
      <div className="absolute h-[76px] left-[-0.5px] top-[-10.45px] w-[51px]" data-name="melhor saude transparent logo\ 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.63%] left-[1.24%] max-w-none top-[0.08%] w-full" src={imgMelhorSaudeTransparentLogo2} />
        </div>
      </div>
    </div>
  );
}

function BubleChat6() {
  return (
    <div className="bg-white content-stretch flex items-start p-[11.725px] relative rounded-br-[20px] rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[518px]" data-name="Buble Chat">
      <div aria-hidden="true" className="absolute border-[#dcd6d6] border-[0.837px] border-solid inset-[-0.418px] pointer-events-none rounded-br-[20.418px] rounded-tl-[20.418px] rounded-tr-[20.418px] shadow-[4px_8px_30px_0px_rgba(218,119,231,0.2)]" />
      <p className="basis-0 font-['Helvetica_Neue:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#19191a] text-[24px]">É uma técnica simples usada pelos melhores gestores. Diga-me <strong className="font-bold">quanto recebe</strong> e eu calculo agora mesmo quanto deve <strong className="font-bold">gastar, poupar e investir</strong> para nunca mais ficar no vermelho. Quer tentar?</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <BubleChat6 />
    </div>
  );
}

function BubleChat7() {
  return (
    <div className="content-stretch flex gap-[13.4px] items-start relative shrink-0 w-full max-w-[931px]" data-name="Buble Chat">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[54px] relative shrink-0 w-full max-w-[931px] mx-auto">
      <BubleChat1 />
      <BubleChat3 />
      <BubleChat5 />
      <BubleChat7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f8f8fe] relative rounded-[50px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center pt-[40px] md:pt-[80px] pb-[20px] px-4 md:px-[40px] lg:px-[80px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-0 pt-0 px-4 md:px-[80px] lg:px-[150px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="relative bg-white content-stretch flex flex-col items-center justify-center pb-0 pt-[80px] px-0 w-full" data-name="Features">
      {/* Desktop version - original large conversation */}
      <div className="hidden md:block w-full">
        <Frame1 />
      </div>
      {/* Mobile version - smaller conversation */}
      <div className="block md:hidden w-full flex justify-center items-start px-4">
        <Frame1618868513 />
      </div>
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="relative w-full flex flex-col items-center gap-[30px] pt-[80px] pb-0 origin-top">
      <Heading />
      <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[1.3] not-italic text-[#434343] text-[18px] md:text-[24px] text-center w-full md:max-w-[866px] px-4 md:px-4 mx-auto">
        <p className="text-center mx-0 my-[0px]">
          <span className="font-['Helvetica_Neue:Bold',sans-serif] not-italic">a sua mentora pessoal, disponível 24/7.</span>
          <span>
            <br aria-hidden="true" />
            <br aria-hidden="true" />
            Treinámos a nossa IA com as mesmas estratégias dos especialistas que transformaram a cultura de gigantes como a Disney e a Coca-Cola.
            <br aria-hidden="true" />
            <br aria-hidden="true" />
            Ela entende as dores reais da sua equipa e oferece suporte empático e prático — guiando cada pessoa para a solução certa, no momento certo.
          </span>
        </p>
      </div>
      <Features />
    </div>
  );
}