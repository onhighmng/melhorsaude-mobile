import svgPaths from "./svg-bsh878pkmo";
const imgImageMelhorSaude = "/landing-assets/35455f539b96cad8ef1d386a642da71621949352.png";
const imgImageLogo = "/landing-assets/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
import { imgVector } from "./svg-zqpj8";

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[1901px_660px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1901 660">
          <path d="M1901 0H0V660H1901V0Z" fill="var(--fill-0, black)" id="Vector" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[660px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[660px] items-start left-0 top-0 w-[1901px]" data-name="Container">
      <Icon />
    </div>
  );
}

function ImageMelhorSaude() {
  return (
    <div className="absolute h-[42px] left-[304px] top-[20px] w-[396.172px]" data-name="Image (Melhor Saúde)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[79.195px] left-[-34px] top-[30.89px] w-[766px]" data-name="Heading 1">
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[57.2px] left-0 text-[#222] text-[52px] text-nowrap top-[11.5px] tracking-[-1.3px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Conte com a
      </p>
      <ImageMelhorSaude />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[86.695px] relative shrink-0 w-[527px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28.9px] left-0 not-italic text-[#666] text-[17px] top-0 w-[394px]">Cuidamos da sua saúde mental e bem-estar com profissionais qualificados disponíveis 24 horas por dia, 7 dias por semana.</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[159.27px] size-[20px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3973e1] h-[57px] relative rounded-[1.67772e+07px] shrink-0 w-[211px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[92px] not-italic text-[16px] text-center text-nowrap text-white top-[13px] translate-x-[-50%]">Começar Agora</p>
        <Icon1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[106px] items-center left-[-26px] top-[122.89px]" data-name="Container">
      <Paragraph />
      <Button />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[181.891px] left-[40px] top-[438.11px] w-[750px]" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

function ImageLogo() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[128px]" data-name="Image (Logo)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageLogo} />
    </div>
  );
}

function Container3() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[136px] items-center left-0 top-[16px] w-[128px]" data-name="Container">
      <ImageLogo />
      <Container3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[43.57px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[22.5px] not-italic text-[16px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Entrar</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[#3973e1] grow h-[36px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[52px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] translate-x-[-50%]">Registar</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[36px] items-center left-[1674.09px] top-[66px] w-[162.914px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Link() {
  return (
    <div className="h-[24px] opacity-90 relative shrink-0 w-[75.594px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-0">Sobre Nós</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-0">4 Pilares</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g clipPath="url(#clip0_202_919)" id="Icon">
          <path d="M1 1L5 5L9 1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_202_919">
            <rect fill="white" height="6" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[56px] opacity-90 relative shrink-0 w-[76.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text />
        <Icon2 />
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px opacity-90 relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-0">Agendamento</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[24px] opacity-90 relative shrink-0 w-[94.289px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-0">Minha Saúde</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[56px] items-center left-[697.62px] top-[56px] w-[441.766px]" data-name="Container">
      <span>
      <Container6 />
      <span>
      <span>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute h-[168px] left-[32px] top-0 w-[1837px]" data-name="Navigation">
      <Container4 />
      <Container5 />
      <Container7 />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="bg-white relative size-full" data-name="HeroSection">
      <Container />
      <Container2 />
      <Navigation />
    </div>
  );
}