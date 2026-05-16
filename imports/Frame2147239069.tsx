import svgPaths from "./svg-yynwetuyto";
import imgImage from "figma:asset/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
import imgImageMelhorSaude from "figma:asset/f066e727bc45a7068fb1f989657736b83adf0448.png";

function Heading() {
  return (
    <div className="absolute h-[69.993px] left-[0.01px] top-0 w-[232.993px]" data-name="Heading4">
      <p className="absolute font-['Pacifico:Regular',sans-serif] leading-[36px] left-0 not-italic text-[#1a1a1a] text-[36px] text-nowrap top-0 tracking-[0.0703px]">Meu Perfil</p>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[128.998px] left-0 top-0 w-[85.995px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function ImageMelhorSaude() {
  return (
    <div className="absolute h-[9.12px] left-[-11.99px] top-[100px] w-[85.995px]" data-name="Image (Melhor Saúde)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[128.998px] left-[256.27px] top-[-35.99px] w-[85.995px]" data-name="Container">
      <Image />
      <ImageMelhorSaude />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[27.001px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#1a1a1a] text-[20px] text-nowrap top-[-0.09px]">Quota de Sessões</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[50.491px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[34.857px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-0 not-italic text-[#4b5563] text-[18px] text-nowrap top-[-1.09px]">Total</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[16.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Helvetica:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#1a1a1a] text-[20px] text-nowrap top-[0.55px]">12</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[69.427px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-0 not-italic text-[#bd0407] text-[15px] text-nowrap top-[-1.09px]">Utilizadas</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[8.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Helvetica:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#1a1a1a] text-[17px] text-nowrap top-[0.55px]">5</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[22.496px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[77.512px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Helvetica:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[#0046a2] text-[15px] text-nowrap top-[0.55px]">Disponíveis</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[25.489px] relative shrink-0 w-[9.458px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Helvetica:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#0046a2] text-[19px] text-nowrap top-[-0.45px]">7</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[25.489px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[11.994px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return <div className="bg-gradient-to-b from-[#0046a2] h-[17px] rounded-[2.13569e+07px] shrink-0 to-[#0066cc] w-full" data-name="Container" />;
}

function Container7() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[17px] items-start overflow-clip pl-0 pr-[162.751px] py-0 relative rounded-[2.13569e+07px] shrink-0 w-[286px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[12px] h-[232.934px] items-start left-[8.01px] pb-0 pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[108.01px] w-[326.994px]" data-name="Container">
      <Container1 />
      <Container5 />
      <Container7 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[27.001px] relative shrink-0 w-[135.472px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#1a1a1a] text-[20px] text-nowrap top-[-0.09px]">Dados Pessoais</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[21.004px] relative shrink-0 w-[36.568px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[18px] not-italic text-[#0046a2] text-[15px] text-center text-nowrap top-[0.55px] translate-x-[-50%]">Editar</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[27.001px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Button />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[19.492px] left-0 top-[15.49px] w-[96px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[15px] text-black text-nowrap top-[0.27px]">Nome</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[22.496px] left-[96px] top-[13.99px] w-[182.999px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#1a1a1a] text-[15px] text-nowrap top-[-1.09px]">Maria Silva</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[51.118px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.636px] border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none" />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[19.492px] left-0 top-[15.49px] w-[96px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[15px] text-black text-nowrap top-[0.27px]">Email</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[22.496px] left-[96px] top-[13.99px] w-[182.999px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#1a1a1a] text-[15px] text-nowrap top-[-1.09px]">maria.silva@example.com</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[51.118px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.636px] border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none" />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[19.492px] left-0 top-[15.49px] w-[96px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[15px] text-black text-nowrap top-[0.27px]">Telefone</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[22.496px] left-[96px] top-[13.99px] w-[182.999px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#1a1a1a] text-[15px] text-nowrap top-[-1.09px]">+351 912 345 678</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[50.481px] relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[1.999px] h-[156.714px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[20px] h-[251.71px] items-start left-[8.01px] pb-0 pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[358.01px] w-[326.994px]" data-name="Container">
      <Container9 />
      <Container13 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[27.001px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#1a1a1a] text-[20px] text-nowrap top-[-0.09px]">Segurança</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[152.239px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[76.5px] not-italic text-[#1a1a1a] text-[15px] text-center text-nowrap top-[-1.09px] translate-x-[-50%]">Alterar palavra-passe</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9995 19.9995">
        <g id="Icon">
          <path d={svgPaths.p1cddef80} id="Vector" stroke="var(--stroke-0, #013183)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66663" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] h-[50.481px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-0 relative size-full">
          <Text12 />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[20px] h-[145.477px] items-start left-[8.01px] pb-0 pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[627.01px] w-[326.994px]" data-name="Container">
      <Paragraph2 />
      <Button1 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[27.001px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#1a1a1a] text-[20px] text-nowrap top-[-0.09px]">Idioma</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[68.362px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[34.5px] not-italic text-[#0046a2] text-[15px] text-center text-nowrap top-[-0.45px] translate-x-[-50%]">Português</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9917 15.9917">
        <g id="Icon">
          <path d={svgPaths.p19c90200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#0046a2] relative rounded-[2.13569e+07px] shrink-0 size-[23.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.01px] py-0 relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(0,70,162,0.1)] h-[55.802px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#0046a2] border-[1.909px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21.909px] py-[1.909px] relative size-full">
          <Text13 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[22.496px] relative shrink-0 w-[49.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[25px] not-italic text-[#1a1a1a] text-[15px] text-center text-nowrap top-[-0.45px] translate-x-[-50%]">English</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] h-[54.3px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.909px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[21.909px] pr-[207.901px] py-[1.909px] relative size-full">
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[9.995px] h-[120.097px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[15.992px] h-[211.084px] items-start left-[8.01px] pb-0 pt-[23.997px] px-[23.997px] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[789.01px] w-[326.994px]" data-name="Container">
      <Paragraph3 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[1099.995px] left-[15.99px] top-[23.99px] w-[342.27px]" data-name="Container">
      <Heading />
      <Container />
      <Container8 />
      <Container14 />
      <Container15 />
      <Container18 />
    </div>
  );
}

function PerfilContent() {
  return (
    <div className="bg-gradient-to-b from-[#e8f4f8] h-[1123.982px] relative shrink-0 to-[#b8e1f0] w-full" data-name="PerfilContent">
      <Container19 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#e8f4f8] h-[1123.982px] items-start left-0 to-[#b8e1f0] top-0 w-[374.253px]" data-name="App">
      <PerfilContent />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.66%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99979 10.9998">
            <path d={svgPaths.p397e8580} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9979 20.9983">
            <path d={svgPaths.pf62fc20} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[2.13569e+07px] shrink-0 size-[47.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.994px] px-[11.994px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_8.33%_8.33%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3cb89f00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[2.13569e+07px] shrink-0 size-[47.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.994px] px-[11.994px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.999894 0.999894V4.99989" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.999894 0.999894V4.99989" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p3363900} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 2">
            <path d="M0.999894 0.999894H18.998" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[2.13569e+07px] shrink-0 size-[47.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.994px] px-[11.994px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[23.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 7.99915">
            <path d={svgPaths.p24cbd900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.16%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99979 9.99979">
            <path d={svgPaths.p143a9180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99979" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="basis-0 bg-[#007aff] grow h-[47.985px] min-h-px min-w-px relative rounded-[2.13569e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.994px] px-[11.994px] relative size-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[11.994px] h-[47.985px] items-center relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function BottomNav() {
  return (
    <div className="absolute bg-[#1a1a1a] content-stretch flex flex-col h-[71.972px] items-start left-[49px] pb-0 pt-[11.994px] px-[23.997px] rounded-[2.13569e+07px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[1035px] w-[275.916px]" data-name="BottomNav">
      <Container20 />
    </div>
  );
}

function MainUserDashboardCopy() {
  return (
    <div className="absolute bg-white h-[1124px] left-0 top-0 w-[374px]" data-name="main user dashboard (Copy)">
      <App />
      <BottomNav />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <MainUserDashboardCopy />
    </div>
  );
}