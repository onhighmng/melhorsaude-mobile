function Container() {
  return <div className="bg-[rgba(2,2,24,0.12)] h-[17.4px] rounded-[1.5px] shrink-0 w-[2.4px]" data-name="Container" />;
}

function Container1() {
  return <div className="bg-[rgba(2,2,24,0.12)] h-[13.2px] rounded-[1.5px] shrink-0 w-[2.4px]" data-name="Container" />;
}

function Container2() {
  return <div className="bg-[rgba(2,2,24,0.12)] h-[10.2px] rounded-[1.5px] shrink-0 w-[2.4px]" data-name="Container" />;
}

function Container3() {
  return <div className="bg-[#0f67fe] h-[43.8px] rounded-[1.5px] shrink-0 w-[2.4px]" data-name="Container" />;
}

function Container4() {
  return <div className="bg-[rgba(2,2,24,0.12)] flex-[1_0_0] h-[10.2px] min-h-px min-w-px rounded-[1.5px]" data-name="Container" />;
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[3px] h-[43.8px] items-end left-0 top-[21.6px] w-[250.8px]" data-name="Frame22">
      <Container />
      <Container1 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container1 />
      <Container />
      <Container3 />
      <Container />
      <Container1 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container1 />
      <Container />
      <Container3 />
      <Container />
      <Container1 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container1 />
      <Container />
      <Container3 />
      <Container />
      <Container1 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container2 />
      <Container4 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[12.6px] left-0 top-0 w-[13.542px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[7px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">Jan</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[12.6px] left-[46.61px] top-0 w-[14.316px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[7.5px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">Feb</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[12.6px] left-[94px] top-0 w-[14.625px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[7.5px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">Mar</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[12.6px] left-[141.69px] top-0 w-[13.223px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[7px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">Apr</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[12.6px] left-[187.99px] top-0 w-[16.031px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[8.5px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">May</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[12.6px] left-[237.09px] top-0 w-[13.702px]" data-name="Paragraph">
      <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[12.6px] left-[7px] not-italic text-[8.4px] text-[rgba(2,2,24,0.3)] text-center top-0 translate-x-[-50%] whitespace-pre">Jun</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[12.6px] left-0 top-[71.4px] w-[250.8px]" data-name="Frame26">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
      <Paragraph3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full" data-name="Frame27">
      <Frame />
      <Frame1 />
    </div>
  );
}