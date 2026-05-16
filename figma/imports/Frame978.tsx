import clsx from "clsx";
import svgPaths from "./svg-d0uq5kd6zh";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <div className="flex gap-[10px] items-center justify-center px-[20px] py-[14px] relative w-full">{children}</div>
    </div>
  );
}

type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <Wrapper>
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
        <p className="leading-[22px]">{text}</p>
      </div>
    </Wrapper>
  );
}

function Terms() {
  return (
    <div className="flex font-['SF_Pro_Text:Semibold',sans-serif] gap-[24px] items-center justify-center leading-[0] not-italic text-[#8f908d] text-[14px] text-nowrap mt-8">
      <div className="flex flex-col justify-center relative shrink-0 cursor-pointer hover:text-white transition-colors">
        <p className="leading-[normal] text-nowrap">Privacy policy</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 cursor-pointer hover:text-white transition-colors">
        <p className="leading-[normal] text-nowrap">Terms of service</p>
      </div>
    </div>
  );
}

type FrameProps = {
  onNavigate: (screen: string) => void;
};

function Button({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div
      className="relative rounded-[1000px] shrink-0 w-full cursor-pointer hover:bg-white/10 transition-colors"
      data-name="Button"
      onClick={() => onNavigate('email')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate('email');
        }
      }}
    >
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[1000px]" />
      <Text text="I’m new, sign me up" />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[1000px] shrink-0 w-full cursor-pointer hover:bg-gray-100 transition-colors" data-name="Button">
      <Wrapper>
        <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-black text-center text-nowrap tracking-[-0.408px]">
          <p className="leading-[22px]">Continue with Google</p>
        </div>
      </Wrapper>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1877f2] relative rounded-[1000px] shrink-0 w-full cursor-pointer hover:bg-[#1877f2]/90 transition-colors" data-name="Button">
      <Text text="Continue with Facebook" />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#2c2c2e] relative rounded-[1000px] shrink-0 w-full cursor-pointer hover:bg-[#2c2c2e]/90 transition-colors" data-name="Button">
      <Text text="Continue with Apple" />
    </div>
  );
}

function BtnAction({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex flex-col gap-[10px] items-center w-full max-w-[345px]" data-name="btn-action">
      <Button onNavigate={onNavigate} />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Logo() {
  return (
    <div className="w-[124px] h-[42px] mb-12">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124 42">
        <g id="logo">
          <g id="convo-x">
            <path d={svgPaths.p17cc4e80} fill="white" />
            <path d={svgPaths.p3e300580} fill="white" />
            <path d={svgPaths.p1dbe1b40} fill="white" />
            <path d={svgPaths.p26706e80} fill="white" />
            <path d={svgPaths.p22e5aa80} fill="white" />
            <path d={svgPaths.p37326af0} fill="white" />
            <path d={svgPaths.p171cc100} fill="white" />
          </g>
          <g id="AI CHAT">
            <path d={svgPaths.p6567a00} fill="white" />
            <path d={svgPaths.p597ea00} fill="white" />
            <path d={svgPaths.p2ed6a900} fill="white" />
            <path d={svgPaths.p8dae580} fill="white" />
            <path d={svgPaths.p2e754fc0} fill="white" />
            <path d={svgPaths.p19c566f0} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Frame({ onNavigate }: FrameProps) {
  const bgImage = "https://images.unsplash.com/photo-1659921852038-893d6884bbc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVudGFsJTIwaGVhbHRoJTIwd2VsbG5lc3MlMjBhYnN0cmFjdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc2NTgxNzkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center p-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay for contrast */}

      <div className="absolute top-8 right-8 z-10">
        <div
          className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic text-[15px] text-right text-white cursor-pointer hover:opacity-80"
          onClick={() => onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('home');
            }
          }}
        >
          <p className="leading-[normal]">Back</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <Logo />
        <BtnAction onNavigate={onNavigate} />
        <Terms />
      </div>
    </div>
  );
}
