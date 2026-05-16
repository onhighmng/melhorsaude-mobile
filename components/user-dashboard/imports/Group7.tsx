import svgPaths from "./svg-6vt48tbiyy";

function Btn() {
  return <div className="absolute h-[44px] left-[250.88px] top-[5.5px] w-[43.12px]" data-name="Btn" />;
}

function ArrowUpRight() {
  return (
    <div className="absolute left-[calc(50%+0.5px)] size-[30px] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%]" data-name="ArrowUpRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_2082_346)" id="ArrowUpRight">
          <g id="Vector"></g>
          <path d="M9 20.375L21.25 8.125" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9.6875 7.5H21.875V19.6875" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_2082_346">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Square() {
  return (
    <div className="absolute bg-black left-[250.88px] rounded-[100px] size-[55px] top-0" data-name="Square">
      <ArrowUpRight />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Square />
      <div className="absolute h-[204px] left-0 top-[5.5px] w-[294px] overflow-hidden rounded-[20px]" data-name="Image">
        <img 
          src="https://images.unsplash.com/photo-1669355106052-b7456721510c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHJlc291cmNlcyUyMGhlYWx0aHxlbnwxfHx8fDE3NjYwOTQxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Recursos"
          className="w-full h-full object-cover"
        />
        {/* Text overlay in bottom left */}
        <div className="absolute bottom-3 left-3">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-white text-[18px] drop-shadow-lg">Recursos</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[209.5px] left-0 top-0 w-[305.88px]">
      <Group1 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Btn />
      <Frame />
    </div>
  );
}
