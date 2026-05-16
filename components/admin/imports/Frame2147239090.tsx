import svgPaths from "./svg-9tw800e5y5";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[19px] not-italic text-[#99a1af] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%]">Voltar</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.805px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[289.32px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[290px] not-italic text-[#99a1af] text-[20px] text-nowrap text-right top-[0.5px] translate-x-[-100%]">Ver sessões marcadas e horários de todos</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[24px] top-[24px] w-[1181px]" data-name="Container">
      <Button />
      <Paragraph />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[36px] left-[24px] top-[56px] w-[1181px]" data-name="Heading 1">
      <p className="absolute font-['Pacifico:Regular',sans-serif] leading-[36px] left-0 not-italic text-[30px] text-nowrap text-white top-[-0.5px]">Agenda Global</p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#00c950] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[65.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px">Confirmada</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-[114px] top-[4px] w-[95px]" data-name="Container">
      <Container1 />
      <Text1 />
    </div>
  );
}

function Container3() {
  return <div className="bg-[#6a7282] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[56.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px">Concluída</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[227px] top-[2px] w-[85px]" data-name="Container">
      <Container3 />
      <Text2 />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#fb2c36] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px">Cancelada</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-[330px] top-[5px] w-[215px]" data-name="Container">
      <Container5 />
      <Text3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-nowrap text-white top-0">Filtros</p>
      <Container2 />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-[0.5px]">Empresa</p>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.031px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] text-center text-nowrap tracking-[-0.1504px]">Todas as empresas</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[#27272a] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#3f3f46] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <PrimitiveSpan />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[58px] items-start left-0 top-0 w-[357.664px]" data-name="Container">
      <Label />
      <PrimitiveButton />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-[0.5px]">Especialista</p>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[145.43px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] text-center text-nowrap tracking-[-0.1504px]">Todos os especialistas</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-[#27272a] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#3f3f46] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <PrimitiveSpan1 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[58px] items-start left-[369.66px] top-0 w-[357.664px]" data-name="Container">
      <Label1 />
      <PrimitiveButton1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#27272a] content-stretch flex h-[36px] items-center justify-center left-[739.33px] px-[17px] py-[9px] rounded-[8px] top-[22px] w-[357.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#3f3f46] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[-0.1504px]">Limpar Filtros</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[58px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <Button1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(24,24,27,0.5)] content-stretch flex flex-col gap-[12px] h-[128px] items-start left-[24px] pb-px pt-[17px] px-[17px] rounded-[14px] top-[24px] w-[1131px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Heading2 />
      <Container9 />
    </div>
  );
}

function InteractiveCalendar() {
  return (
    <div className="absolute content-stretch flex h-[35.5px] items-start left-[70.65px] opacity-50 top-0 w-[82.281px]" data-name="InteractiveCalendar">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#d4d4d8] text-[30px] text-nowrap tracking-[1.8955px]">2024</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[152.93px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#d4d4d8] text-[30px] top-0 tracking-[1.8955px] w-[71px]">DEZ</p>
      <InteractiveCalendar />
    </div>
  );
}

function InteractiveCalendar1() {
  return <div className="absolute bg-[rgba(255,255,255,0.9)] h-[32px] left-[2px] rounded-[8px] top-0 w-[40px]" data-name="InteractiveCalendar" />;
}

function Icon3() {
  return (
    <div className="absolute left-[6px] size-[20px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 2.5V17.5" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 2.5V17.5" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[38px] size-[20px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 7.5H17.5" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 12.5H17.5" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 2.5V17.5" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 2.5V17.5" id="Vector_5" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(39,39,42,0.5)] border border-[#52525c] border-solid h-[34px] left-[1057px] rounded-[10px] top-px w-[66px]" data-name="Button">
      <InteractiveCalendar1 />
      <Icon3 />
      <Icon4 />
    </div>
  );
}

function InteractiveCalendar2() {
  return (
    <div className="h-[36px] relative shrink-0 w-[1123px]" data-name="InteractiveCalendar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-0 rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[76.91px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">DOM</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[161.57px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[77.15px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">SEG</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[323.14px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[77.33px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">TER</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[484.71px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[77.33px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">QUA</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[646.28px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[77.07px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">QUI</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[807.85px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[76.63px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">SEX</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#323232] h-[36px] left-[969.42px] rounded-[14px] top-0 w-[153.57px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[77.23px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%]">SÁB</p>
    </div>
  );
}

function InteractiveCalendar3() {
  return (
    <div className="h-[36px] relative shrink-0 w-[1123px]" data-name="InteractiveCalendar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Day() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.375px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">01</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-0 pl-0 pr-[0.008px] py-0 rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day />
    </div>
  );
}

function Day1() {
  return (
    <div className="absolute h-[28px] left-[65.87px] top-[34px] w-[21.828px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">02</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">2</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[rgba(0,201,80,0.8)] h-[96px] left-[161.57px] rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day1 />
      <Container19 />
    </div>
  );
}

function Day2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.234px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">03</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[323.14px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day2 />
    </div>
  );
}

function Day3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.586px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">04</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[484.71px] rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day3 />
    </div>
  );
}

function Day4() {
  return (
    <div className="absolute h-[28px] left-[65.71px] top-[34px] w-[22.141px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">05</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">1</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[rgba(106,114,130,0.8)] h-[96px] left-[646.28px] rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day4 />
      <Container23 />
    </div>
  );
}

function Day5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.492px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">06</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[807.85px] rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day5 />
    </div>
  );
}

function Day6() {
  return (
    <div className="h-[28px] relative shrink-0 w-[20.859px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">07</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[969.42px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-0 w-[153.57px]" data-name="Container">
      <Day6 />
    </div>
  );
}

function Day7() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.563px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">08</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-0 pl-0 pr-[0.008px] py-0 rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day7 />
    </div>
  );
}

function Day8() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.492px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">09</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[161.57px] rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day8 />
    </div>
  );
}

function Day9() {
  return (
    <div className="absolute h-[28px] left-[67.09px] top-[34px] w-[19.383px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">10</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">1</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[rgba(251,44,54,0.8)] h-[96px] left-[323.14px] rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day9 />
      <Container29 />
    </div>
  );
}

function Day10() {
  return (
    <div className="h-[28px] relative shrink-0 w-[16.352px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">11</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[484.71px] rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day10 />
    </div>
  );
}

function Day11() {
  return (
    <div className="h-[28px] relative shrink-0 w-[18.805px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">12</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[646.28px] rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day11 />
    </div>
  );
}

function Day12() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.242px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">13</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[807.85px] rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day12 />
    </div>
  );
}

function Day13() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.547px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">14</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[969.42px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[104px] w-[153.57px]" data-name="Container">
      <Day13 />
    </div>
  );
}

function Day14() {
  return (
    <div className="absolute h-[28px] left-[67.23px] top-[34px] w-[19.109px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">15</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">1</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[rgba(0,201,80,0.8)] h-[96px] left-0 rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day14 />
      <Container35 />
    </div>
  );
}

function Day15() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.461px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">16</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[161.57px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day15 />
    </div>
  );
}

function Day16() {
  return (
    <div className="h-[28px] relative shrink-0 w-[18.18px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">17</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[323.14px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day16 />
    </div>
  );
}

function Day17() {
  return (
    <div className="absolute h-[28px] left-[67.02px] top-[34px] w-[19.531px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">18</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">2</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bg-[rgba(0,201,80,0.8)] h-[96px] left-[484.71px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day17 />
      <Container39 />
    </div>
  );
}

function Day18() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.461px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">19</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[646.28px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day18 />
    </div>
  );
}

function Day19() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.836px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">20</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[807.85px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day19 />
    </div>
  );
}

function Day20() {
  return (
    <div className="absolute h-[28px] left-[67.38px] top-[34px] w-[18.805px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">21</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">1</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute bg-[rgba(106,114,130,0.8)] h-[96px] left-[969.42px] rounded-[16px] top-[208px] w-[153.57px]" data-name="Container">
      <Day20 />
      <Container43 />
    </div>
  );
}

function Day21() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.258px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">22</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-0 rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day21 />
    </div>
  );
}

function Day22() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.695px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">23</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[161.57px] rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day22 />
    </div>
  );
}

function Day23() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.773px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">24</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[323.14px] rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day23 />
    </div>
  );
}

function Day24() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.563px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">25</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[484.71px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day24 />
    </div>
  );
}

function Day25() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.914px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">26</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[646.28px] rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day25 />
    </div>
  );
}

function Day26() {
  return (
    <div className="absolute h-[28px] left-[66.47px] top-[34px] w-[20.633px]" data-name="Day">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">27</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-[#3f3f47] content-stretch flex items-center justify-center left-[121.57px] p-[4px] rounded-[999px] size-[24px] top-[64px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">1</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-[rgba(0,201,80,0.8)] h-[96px] left-[807.85px] rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day26 />
      <Container50 />
    </div>
  );
}

function Day27() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.984px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">28</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[969.42px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[312px] w-[153.57px]" data-name="Container">
      <Day27 />
    </div>
  );
}

function Day28() {
  return (
    <div className="h-[28px] relative shrink-0 w-[21.914px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">29</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Day28 />
    </div>
  );
}

function Day29() {
  return (
    <div className="h-[28px] relative shrink-0 w-[22.25px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">30</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[161.57px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Day29 />
    </div>
  );
}

function Day30() {
  return (
    <div className="h-[28px] relative shrink-0 w-[19.242px]" data-name="Day">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-0 tracking-[-0.4395px]">31</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-[#1e1e1e] content-stretch flex h-[96px] items-center justify-center left-[323.14px] rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Day30 />
    </div>
  );
}

function Container56() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container57() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[484.71px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Container56 />
    </div>
  );
}

function Container58() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container59() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[646.28px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Container58 />
    </div>
  );
}

function Container60() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container61() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[807.85px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Container60 />
    </div>
  );
}

function Container62() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container63() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[969.42px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[416px] w-[153.57px]" data-name="Container">
      <Container62 />
    </div>
  );
}

function Container64() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container65() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-0 pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container64 />
    </div>
  );
}

function Container66() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container67() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[161.57px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container66 />
    </div>
  );
}

function Container68() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container69() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[323.14px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container68 />
    </div>
  );
}

function Container70() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container71() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[484.71px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container70 />
    </div>
  );
}

function Container72() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container73() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[646.28px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container72 />
    </div>
  );
}

function Container74() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container75() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[807.85px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container74 />
    </div>
  );
}

function Container76() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Container77() {
  return (
    <div className="absolute bg-[rgba(63,63,71,0.2)] content-stretch flex h-[96px] items-center justify-center left-[969.42px] pl-0 pr-[0.008px] py-0 rounded-[16px] top-[520px] w-[153.57px]" data-name="Container">
      <Container76 />
    </div>
  );
}

function CalendarGrid() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1123px]" data-name="CalendarGrid">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container18 />
        <Container20 />
        <Container21 />
        <Container22 />
        <Container24 />
        <Container25 />
        <Container26 />
        <Container27 />
        <Container28 />
        <Container30 />
        <Container31 />
        <Container32 />
        <Container33 />
        <Container34 />
        <Container36 />
        <Container37 />
        <Container38 />
        <Container40 />
        <Container41 />
        <Container42 />
        <Container44 />
        <Container45 />
        <Container46 />
        <Container47 />
        <Container48 />
        <Container49 />
        <Container51 />
        <Container52 />
        <Container53 />
        <Container54 />
        <Container55 />
        <Container57 />
        <Container59 />
        <Container61 />
        <Container63 />
        <Container65 />
        <Container67 />
        <Container69 />
        <Container71 />
        <Container73 />
        <Container75 />
        <Container77 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="basis-0 grow h-[720px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[20px] items-start relative size-full">
        <InteractiveCalendar2 />
        <InteractiveCalendar3 />
        <CalendarGrid />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[661px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pb-0 pt-[4px] px-[4px] relative size-full">
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex flex-col h-[661px] items-start left-[24px] overflow-clip top-[168px] w-[1131px]" data-name="Container">
      <Container79 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-[rgba(24,24,27,0.3)] border border-[#27272a] border-solid h-[822px] left-[24px] overflow-clip rounded-[14px] top-[104px] w-[1181px]" data-name="Container">
      <Container10 />
      <Container80 />
    </div>
  );
}

function AgendaGlobal() {
  return (
    <div className="bg-black h-[973px] overflow-clip relative shrink-0 w-full" data-name="AgendaGlobal">
      <Container />
      <Heading />
      <Container81 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow h-[917px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <AgendaGlobal />
      </div>
    </div>
  );
}

function FinalAdminDashboard() {
  return (
    <div className="absolute bg-[#e8f0f2] content-stretch flex h-[909px] items-start left-0 overflow-clip top-0 w-[1229px]" data-name="Final Admin dashboard">
      <MainContent />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <FinalAdminDashboard />
    </div>
  );
}
