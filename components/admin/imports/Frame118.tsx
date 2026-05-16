function Text() {
  return (
    <div className="h-[39.863px] relative w-[29.341px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#2354a2] text-[30px] text-nowrap tracking-[0.3955px]">✱</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="blur-[0px] filter h-[36px] relative shrink-0 w-[201.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[36px] not-italic relative shrink-0 text-[#4a5565] text-[30px] text-nowrap tracking-[0.3955px] uppercase">Quem Somos</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex gap-[4.494px] h-[36px] items-center left-0 pl-[-3.506px] pr-0 py-0 top-0 w-[231.422px]" data-name="Container">
      <div className="flex h-[45.103px] items-center justify-center relative shrink-0 w-[37.005px]" style={{ "--transform-inner-width": "22.71875", "--transform-inner-height": "36" } as React.CSSProperties}>
        <div className="flex-none rotate-[347.97deg]">
          <Text />
        </div>
      </div>
      <Text1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Container />
    </div>
  );
}
