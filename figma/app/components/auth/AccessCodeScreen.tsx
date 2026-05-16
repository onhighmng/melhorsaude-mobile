import { useState, useEffect } from 'react';
import { useNavigation } from '../../NavigationContext';
// DISABLED: import from 'motion/react';
import svgPaths from "../../../imports/svg-v32nb9gxqy";
// unused imports removed
// unused imports removed
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// unused imports removed
import { ChevronLeft } from "lucide-react";
import { AnimatedCharacters } from "@/components/auth/FigmaAnimatedCharacters";

const imgWireHead = "/assets/figma/771937d4d613e82b8d8ce230a7f290e0da67075c.png";
const imgCalculator3D = "/assets/figma/3559bd16503c926eb29cb91a68662da99ccd6b1b.png";
const imgKettlebell3D = "/assets/figma/c509d36c066d343a8dd578a3c975bb34412de133.png";
const imgLogoSymbol = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
const imgLogoText = "/assets/figma/35455f539b96cad8ef1d386a642da71621949352.png";

const backgroundImages = [imgWireHead, imgCalculator3D, imgKettlebell3D];

function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
        <img
          key={index}
          src={backgroundImages[index]}




          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      
      {/* White overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/20" />
    </div>
  );
}


// --- Reusing Components ---

// unused component Wrapper removed

function Icon() {
  return (
    <div className="h-[24px] relative shrink-0 w-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 24">
        <g id="Icon">
          <path d={svgPaths.p3a17be00} fill="var(--fill-0, #007AFF)" id="Icon / chevron.left" />
        </g>
      </svg>
    </div>
  );
}

function BackBtn({ onClick }: { onClick?: () => void }) {
  const { navigate } = useNavigation();
  return (
    <div
      className="absolute content-stretch flex gap-[5px] items-center left-[24px] top-[48px] cursor-pointer hover:opacity-70 transition-opacity z-10"
      data-name="back-btn"
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate('home');
        }
      }}
    >
      <Icon />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#007aff] text-[17px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px] overflow-ellipsis overflow-hidden">Back</p>
      </div>
    </div>
  );
}

function ContinueButton({ onClick, text }: { onClick: () => void, text: string }) {
  return (
    <div
      className="bg-black content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[14px] rounded-[1000px] w-full cursor-pointer hover:bg-black/90 transition-colors"
      data-name="Button"
      onClick={onClick}
    >
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}

// unused component FormInput removed

export function AccessCodeScreen() {
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const validateCode = () => {
    setError('');

    // SECURITY FIX: Removed insecure mock auth rotation.
    // TODO: Implement real access code validation against Supabase Edge Function or RPC.
    console.error("Access Code Validation not implemented. Please implement secure validation.");
    setError('Sistema de validação em manutenção. Por favor, faça login com email e senha.');

    /* 
    Legacy Insecure Logic Removed:
    const userTypes = ['company_admin', 'specialist', 'user'];
    ...
    navigate('registration', { role: nextType });
    */
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Content Section - Desktop Only */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#3973E1]/90 via-[#3973E1] to-[#3973E1]/80 p-12 text-white">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <img src={imgLogoSymbol} alt="Logo" className="w-8 h-8 drop-shadow-sm" />
            <span>Melhor Saúde</span>
          </div>
        </div>

        <AnimatedCharacters
          isTyping={isTyping}
        />

        <div className="relative z-20 flex items-center gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Termos de Serviço
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contato
          </a>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile view - Keep original design */}
          <div className="lg:hidden">
            <div className="bg-white min-h-screen flex flex-col font-['SF_Pro_Text',sans-serif] relative overflow-hidden">
              <BackgroundSlider />
              <div className="absolute top-0 left-0 w-full z-20">
                <BackBtn onClick={() => navigate('login')} />
              </div>

              <div className="relative z-10 flex-1 w-full max-w-[400px] mx-auto px-[24px] flex flex-col justify-center py-12 overflow-y-auto">
                <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.408px] w-full text-center mb-8">
                  <div className="flex flex-col items-center gap-3 mb-6">
                    <img src={imgLogoSymbol} alt="Logo Symbol" className="w-32 h-auto drop-shadow-sm" />
                    <img src={imgLogoText} alt="Melhor Saúde" className="w-full h-auto drop-shadow-sm px-4" />
                  </div>
                  <p className="leading-[22px] text-[rgb(255,255,255)] drop-shadow-md">Insira o Código de Acesso</p>
                </div>

                <div className="w-full mb-8 flex flex-col gap-5">
                  <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                    <div aria-hidden="true" className="absolute border border-black/5 border-solid inset-0 pointer-events-none rounded-[1000px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full">
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Ex: USER-CODE-123"
                          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium uppercase"
                        />
                      </div>
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-500 text-center text-sm mt-2">{error}</p>
                  )}
                </div>

                <div className="w-full">
                  <ContinueButton onClick={validateCode} text="Validar Código" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop view - New design with same fields */}
          <div className="hidden lg:block relative">
            {/* Back button for desktop */}
            <button
              onClick={() => navigate('login')}
              className="absolute -top-4 left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Código de Acesso</h1>
              <p className="text-gray-600 text-sm">Insira seu código para continuar</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); validateCode(); }} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium">Código</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Ex: USER-CODE-123"
                  value={code}
                  autoComplete="off"
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1] uppercase text-center"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-black hover:bg-black/90"
                size="lg"
              >
                Validar Código
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-8">
              Já tem uma conta?{" "}
              <button onClick={() => navigate('login')} className="text-[#3973E1] font-medium hover:underline">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
