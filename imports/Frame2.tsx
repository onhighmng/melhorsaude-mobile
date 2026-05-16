import svgPaths from "./svg-zmbiyaljae";

function Group() {
  return (
    <div className="absolute h-[28.053px] left-0 top-0 w-[23.513px]">
      <div className="absolute inset-[-3.56%_-4.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 31">
          <g id="Group 1">
            <path d={svgPaths.p3bdcb780} id="Vector 1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p1db89260} id="Vector 2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
            <path d="M9.56531 29.0531H24.5134" id="Vector 3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Group />
    </div>
  );
}