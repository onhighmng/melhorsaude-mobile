import svgPaths from "./svg-jtlc4ybhqu";
import { imgGroup } from "./svg-qvawi";

function Group1() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[55.991px_55.991px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.9908 55.9908">
        <g id="Group">
          <path d={svgPaths.p1ec97600} fill="var(--fill-0, white)" id="image 65" />
          <g id="Group_2">
            <path d={svgPaths.p20f5a9f0} fill="var(--fill-0, black)" id="phone_icon" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Mask group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0">
      <MaskGroup />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 overflow-clip size-[55.991px] top-0" data-name="Icon">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute left-[27.99px] size-[55.991px] top-[12.11px]" data-name="Group">
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#10b981] h-[26px] left-[58.99px] rounded-[2.13569e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8.76px] w-[47px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[13px] text-nowrap text-white top-[3.9px]">24/7</p>
    </div>
  );
}

function CardCta() {
  return (
    <div className="absolute bg-[#0046a2] h-[78.198px] left-0 rounded-[32px] top-0 w-[134.875px]" data-name="CardCta">
      <Group2 />
      <Container />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <CardCta />
    </div>
  );
}