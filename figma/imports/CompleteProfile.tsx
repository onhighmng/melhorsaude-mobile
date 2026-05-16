import React, { useState } from 'react';
import svgPaths from "./svg-klqs6hahl2";
import clsx from "clsx";

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
      onClick={() => onNavigate('password')}
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
      onClick={() => {
        alert("Sign up complete!");
        onNavigate('home');
      }}
    >
      <div className="flex flex-row items-center justify-center px-[20px] py-[14px]">
        <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-black tracking-[-0.408px]">
          <p className="leading-[22px]">You’re all set, continue</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="font-['SF_Pro_Text:Semibold',sans-serif] text-[16px] text-white ml-4">{label}</label>
            <Wrapper>
                {children}
            </Wrapper>
        </div>
    );
}

function CompleteProfileForm() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-[345px]">
             {/* Avatar Placeholder */}
             <div className="flex justify-center mb-4">
                <div className="w-[120px] h-[120px] rounded-full bg-white/20 flex items-center justify-center text-white border-2 border-white/30">
                    <span className="text-4xl">👤</span>
                </div>
             </div>

             <Field label="Full Name">
                 <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-white placeholder-white/50"
                />
             </Field>

             <Field label="Phone Number">
                 <input 
                    type="tel" 
                    placeholder="+258 84 123 4567"
                    className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-white placeholder-white/50"
                />
             </Field>

             <Field label="Select Your Job">
                  <select className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-white appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-black">Select Job</option>
                    <option value="developer" className="text-black">Developer</option>
                    <option value="designer" className="text-black">Designer</option>
                    <option value="manager" className="text-black">Manager</option>
                  </select>
             </Field>
        </div>
    )
}

export default function CompleteProfile({ onNavigate }: FrameProps) {
  const bgImage = "https://images.unsplash.com/photo-1659921852038-893d6884bbc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVudGFsJTIwaGVhbHRoJTIwd2VsbG5lc3MlMjBhYnN0cmFjdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc2NTgxNzkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center p-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/40" />
      
      <BackBtn onNavigate={onNavigate} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <CompleteProfileForm />
        <Button onNavigate={onNavigate} />
      </div>
    </div>
  );
}
