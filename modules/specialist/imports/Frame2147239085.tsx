import imgImage from "../assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgImageMelhorSaude from "../assets/f066e727bc45a7068fb1f989657736b83adf0448.png";
import imgImage1 from "../assets/75e0127bb7b629c38fd07f220eac9d0b9a7716a1.png";
import imgImage2 from "../assets/6bccb4ec240c4902a2aa5b448c810d434e8aa38b.png";
import imgImage3 from "../assets/01afb8e7695a1006b9686d11546c37463dcc151f.png";

function Paragraph() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#0a0a0a] text-[48px] text-nowrap top-0">Liderar a Mudança</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-0 pb-0 pl-0 pr-[1.477px] pt-[5.5px] top-0 w-[424.125px]" data-name="Heading">
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[28px] left-[205.39px] top-0 w-[371.445px]" data-name="Text" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(59, 130, 246) 50%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(30, 58, 138) 0%, rgb(30, 58, 138) 100%)" }}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-[rgba(0,0,0,0)] text-nowrap top-0">Cuidar das pessoas transforma empresas.</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-0">Bem-vindo. Lembre-se:</p>
      <Text />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[28px] items-start left-0 pl-0 pr-[-25.867px] py-0 top-[-13.5px] w-[550.969px]" data-name="Paragraph">
      <Paragraph2 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[216px] left-[169.75px] top-[75px] w-[211.5px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function ImageMelhorSaude() {
  return (
    <div className="absolute h-[36px] left-[-1.24px] top-[30px] w-[339.258px]" data-name="ImageMelhorSaude">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[87px] left-[756px] top-[-44px] w-[339.258px]" data-name="Container">
      <Image />
      <ImageMelhorSaude />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-px left-0 top-[79px] w-[1118px]" data-name="Container1">
      <Paragraph3 />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[38px] left-0 top-0 w-[1118px]" data-name="Container2">
      <Heading />
      <Container1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-0 size-[64px] top-0" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute left-[44px] size-[64px] top-0" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute left-[88px] size-[64px] top-0" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[25px] left-[13.43px] top-[19.5px] w-[37.133px]" data-name="Paragraph">
      <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] left-[19.5px] text-[#fdfdfd] text-[20px] text-center text-nowrap top-0 tracking-[-0.45px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        24/7
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[#30b0c7] left-[132px] overflow-clip rounded-[60px] size-[64px] top-0" data-name="Container">
      <Paragraph4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[64px] left-[128.55px] top-[70px] w-[196px]" data-name="Container">
      <Image1 />
      <Image2 />
      <Image3 />
      <Container4 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[39.297px] left-[5.15px] top-px w-[442.797px]" data-name="Text">
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[20.8px] left-[221.5px] text-[#575757] text-[16px] text-center top-0 translate-x-[-50%] w-[443px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Abra a porta a uma nova era de bem-estar, a oportunidade de transformar
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[20.797px] left-[262.55px] top-[20.8px] w-[40.914px]" data-name="Text" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(239, 68, 68) 50%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(193, 12, 12) 0%, rgb(193, 12, 12) 100%)" }}>
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[20.8px] left-[20px] text-[16px] text-[rgba(0,0,0,0)] text-center text-nowrap top-px translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14" }}>
        vidas
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[41px] left-0 top-[162px] w-[453.094px]" data-name="Paragraph">
      <Text1 />
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[20.8px] left-[305.46px] text-[#575757] text-[16px] text-center text-nowrap top-[21.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'opsz' 14" }}>
        .
      </p>
      <Text2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[230px] left-0 top-[64px] w-[453.094px]" data-name="Paragraph1">
      <Container5 />
      <Paragraph5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[300px] left-0 top-0 w-[1118px]" data-name="Container3">
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