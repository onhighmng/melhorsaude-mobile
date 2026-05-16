import imgImage from "../assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgImageMelhorSaude from "../assets/f066e727bc45a7068fb1f989657736b83adf0448.png";

function Heading() {
  return (
    <div className="h-[48px] relative shrink-0 w-[424.125px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#0a0a0a] text-[48px] text-nowrap top-[5.5px]">Liderar a Mudança</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[28px] relative shrink-0 w-[550.969px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-0">Bem-vindo. Lembre-se: Cuidar das pessoas transforma pessoas.</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[144px] left-[113.17px] top-[-110px] w-[141px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function ImageMelhorSaude() {
  return (
    <div className="absolute h-[24px] left-[-0.83px] top-[20px] w-[226.172px]" data-name="Image (Melhor Saúde)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[58px] relative shrink-0 w-[226.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Image />
        <ImageMelhorSaude />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1118px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph />
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1118px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[27px] items-start left-[141.29px] px-[12px] py-[4px] rounded-[1.67772e+07px] top-[-1.5px] w-[57.336px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px]">24/7</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[198.625px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-black text-nowrap top-[-0.5px] tracking-[-0.3125px]">Apoio Profissional</p>
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[174px] items-start left-0 top-0 w-[1118px]" data-name="Container">
      <Container2 />
      <Paragraph1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Container3 />
    </div>
  );
}