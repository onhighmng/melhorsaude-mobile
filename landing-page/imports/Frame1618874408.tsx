import svgPaths from "./svg-7ntp90zmoq";

function Button() {
  return (
    <div className="bg-[#d8ddff] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[1000px] shrink-0" data-name="Button">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#003b8d] text-[18px] text-nowrap tracking-[-0.9px]">Cuidar das pessoas , transforma empresas</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Button />
      <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#020218] text-[64px] text-center tracking-[-1.28px] w-[598px]">
        <p className="leading-[1.2]">Faça a sua equipa sentir-se segura, ouvida e valorizada.</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame1 />
      <div className="flex flex-col font-['Helvetica_Neue:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f8084] text-[18px] text-center tracking-[0.22px] w-full">
        <p className="leading-[1.5]">Cuidamos da sua saúde mental e bem-estar com profissionais qualificados disponíveis 24 horas por dia, 7 dias por semana.</p>
      </div>
    </div>
  );
}

function MaterialSymbolsArrowInsertRounded() {
  return (
    <div className="relative size-[20px]" data-name="material-symbols:arrow-insert-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="material-symbols:arrow-insert-rounded">
          <path d={svgPaths.pb655fc0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#020218] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[15px] relative rounded-[1000px] shrink-0" data-name="Button">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">Baixar a App Agora</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <MaterialSymbolsArrowInsertRounded />
        </div>
      </div>
    </div>
  );
}

function ButtonCta() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Button CTA">
      <Button1 />
    </div>
  );
}

function Title() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-center justify-center left-0 top-0 w-[655px]" data-name="Title">
      <Frame />
      <ButtonCta />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full">
      <Title />
    </div>
  );
}