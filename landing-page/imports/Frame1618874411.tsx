import svgPaths from "./svg-ocbkcvhtuv";
import { TextRevealByWord } from "../app/components/ui/text-reveal";
import { Brain, Activity, DollarSign, Scale } from "lucide-react";

function VuesaxLinearRadar() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/radar-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="radar-2">
          <path d={svgPaths.p106aea80} id="Vector" stroke="url(#paint0_linear_358_679)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" />
          <path d={svgPaths.p285d1b60} id="Vector_2" stroke="url(#paint1_linear_358_679)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" />
          <g id="Vector_3" opacity="0"></g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_358_679" x1="32" x2="32" y1="5.33333" y2="58.6667">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_358_679" x1="32" x2="32" y1="16" y2="48">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Radar() {
  return (
    <div className="absolute right-[100px] size-[64px] top-[20px] md:top-[40px] opacity-40" data-name="radar-2">
      <VuesaxLinearRadar />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[50px] md:left-[100px] size-[64px] bottom-[100px] md:bottom-[150px] opacity-40" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Frame">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p9666f00} fill="url(#paint0_linear_358_670)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p302aa500} fill="url(#paint1_linear_358_670)" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_358_670" x1="32" x2="32" y1="7.57836" y2="53.755">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_358_670" x1="32" x2="32" y1="7.57836" y2="53.755">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function VuesaxBoldColorfilter() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/colorfilter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="colorfilter">
          <path d={svgPaths.p87c4600} fill="url(#paint0_linear_358_673)" id="Vector" />
          <path d={svgPaths.p15dc0c20} fill="url(#paint1_linear_358_673)" id="Vector_2" />
          <path d={svgPaths.p72a2880} fill="url(#paint2_linear_358_673)" id="Vector_3" />
          <g id="Vector_4" opacity="0"></g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_358_673" x1="21.3333" x2="21.3333" y1="28.7733" y2="58.6667">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_358_673" x1="32" x2="32" y1="5.33333" y2="37.3333">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_358_673" x1="47" x2="47" y1="28.7733" y2="58.6667">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Colorfilter() {
  return (
    <div className="absolute right-[100px] size-[64px] bottom-[20px] md:bottom-[40px] opacity-40" data-name="colorfilter">
      <VuesaxBoldColorfilter />
    </div>
  );
}

// New decorative icons
function BrainIcon() {
  return (
    <div className="absolute left-[20px] md:left-[80px] top-[120px] md:top-[200px] opacity-40 animate-pulse" style={{ animationDuration: '3s' }}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="brain-gradient" x1="32" y1="10" x2="32" y2="54">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
        <Brain size={48} stroke="url(#brain-gradient)" strokeWidth={2} fill="none" x={8} y={8} />
      </svg>
    </div>
  );
}

function ActivityIcon() {
  return (
    <div className="absolute right-[20px] md:right-[80px] top-[150px] md:top-[250px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="activity-gradient" x1="32" y1="10" x2="32" y2="54">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
        <Activity size={48} stroke="url(#activity-gradient)" strokeWidth={2} x={8} y={8} />
      </svg>
    </div>
  );
}

function DollarSignIcon() {
  return (
    <div className="absolute left-[120px] md:left-[200px] top-[50px] md:top-[80px] opacity-40 animate-pulse" style={{ animationDuration: '2.5s' }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="dollar-sign-gradient" x1="24" y1="4" x2="24" y2="44">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
        <DollarSign size={40} stroke="url(#dollar-sign-gradient)" strokeWidth={2} fill="url(#dollar-sign-gradient)" fillOpacity={0.3} x={4} y={4} />
      </svg>
    </div>
  );
}

function ScaleIcon() {
  return (
    <div className="absolute right-[150px] md:right-[250px] bottom-[80px] md:bottom-[120px] opacity-40 animate-pulse" style={{ animationDuration: '3.5s' }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <defs>
          <linearGradient id="scale-gradient" x1="28" y1="6" x2="28" y2="50">
            <stop stopColor="#9A57F3" />
            <stop offset="0.57" stopColor="#F887E3" />
            <stop offset="1" stopColor="#E8D7FF" />
          </linearGradient>
        </defs>
        <Scale size={44} stroke="url(#scale-gradient)" strokeWidth={2} fill="none" x={6} y={6} />
      </svg>
    </div>
  );
}

function Feature() {
  return (
    <div className="relative bg-white flex flex-col gap-8 md:gap-[65px] items-center justify-center px-6 md:px-[200px] py-16 md:py-[120px] rounded-[8.8px] w-full min-h-[600px]" data-name="Feature">
      <div className="flex flex-col font-['Young_Serif:Regular',sans-serif] justify-center leading-[normal] not-italic relative shrink-0 text-[#020218] text-[28px] md:text-[48px] text-center max-w-[980px] w-full z-10">
        <p className="font-['Helvetica_Neue:Medium',sans-serif] mb-0">A Plataforma Líder em Bem-Estar Corporativo</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Helvetica_Neue:Medium',sans-serif] mb-0">
          <span>{`Transformamos empresas em Moçambique unindo tecnologia e cuidado humanizado. `}</span>
          <span className="text-[#bfbfc0]">A Melhor Saúde conecta a sua equipa a especialistas de confiança.</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Helvetica_Neue:Medium',sans-serif]">Redefinimos a experiência de bem-estar no meio corporativo.</p>
      </div>
      <Radar />
      <Frame />
      <Colorfilter />
      <BrainIcon />
      <ActivityIcon />
      <DollarSignIcon />
      <ScaleIcon />
    </div>
  );
}

export default function Frame1() {
  const fullText = "A Plataforma Líder em Bem-Estar Corporativo. Transformamos empresas em Moçambique unindo tecnologia e cuidado humanizado. A Melhor Saúde conecta a sua equipa a especialistas de confiança. Redefinimos a experiência de bem-estar no meio corporativo.";
  
  return (
    <div className="relative w-full bg-white min-h-screen">
      <div className="relative">
        <TextRevealByWord 
          text={fullText}
          className=""
        />
      </div>
      <div className="absolute inset-0 pointer-events-none max-h-screen">
        <div className="relative w-full h-full max-w-[1440px] mx-auto">
          <Radar />
          <Frame />
          <Colorfilter />
        </div>
      </div>
    </div>
  );
}