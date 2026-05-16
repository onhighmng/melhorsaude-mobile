import clsx from "clsx";
import svgPaths from "./svg-tufrzf940x";

type FrameProps = {
  onNavigate: (screen: string) => void;
};

function Wrapper({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("relative rounded-[1000px] shrink-0 w-full", className)}>
      <div aria-hidden="true" className="absolute border border-white border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[14px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] relative shrink-0 w-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 24">
        <g id="Icon">
          <path d={svgPaths.p3a17be00} fill="white" id="Icon / chevron.left" />
        </g>
      </svg>
    </div>
  );
}

function BackBtn({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div
      className="absolute top-8 left-8 z-10 flex gap-[5px] items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => onNavigate('email')}
    >
      <Icon />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic text-white text-[17px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px]">Back</p>
      </div>
    </div>
  );
}

function Button({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div
      className="bg-white relative rounded-[1000px] shrink-0 w-full max-w-[345px] cursor-pointer hover:bg-white/90 transition-opacity mt-8"
      onClick={() => onNavigate('complete-profile')}
    >
      <div className="flex flex-row items-center justify-center px-[20px] py-[14px]">
        <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-black tracking-[-0.408px]">
          <p className="leading-[22px]">Next, enter your OTP</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function InputField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[345px] mt-8">
      <div className="mb-4 text-center">
        <h2 className="font-['SF_Pro_Text:Semibold',sans-serif] text-[24px] text-white">Set your password</h2>
      </div>
      <Wrapper>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[17px] text-white placeholder-white/50 text-center pr-10"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </Wrapper>
      <div className="mt-2 text-center">
        <p className="font-['SF_Pro_Text:Regular',sans-serif] text-white/70 text-[14px]">Use at least 8 characters.</p>
      </div>
    </div>
  )
}

export default function SetUpPassword({ onNavigate }: FrameProps) {
  const bgImage = "https://images.unsplash.com/photo-1659921852038-893d6884bbc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVudGFsJTIwaGVhbHRoJTIwd2VsbG5lc3MlMjBhYnN0cmFjdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc2NTgxNzkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center p-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/40" />

      <BackBtn onNavigate={onNavigate} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <InputField />
        <Button onNavigate={onNavigate} />
      </div>
    </div>
  );
}
