import { useState, useEffect } from 'react';
import { useNavigation } from '../../NavigationContext';
// DISABLED: import from 'motion/react';
import svgPaths from "../../../imports/svg-v32nb9gxqy";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChevronLeft } from "lucide-react";
// unused imports removed
import { AnimatedCharacters } from "@/components/auth/FigmaAnimatedCharacters";

// Background Assets
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

// --- Components from User Design ---

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

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute content-stretch flex gap-[5px] items-center left-[24px] top-[48px] cursor-pointer hover:opacity-70 transition-opacity z-10"
      data-name="back-btn"
      onClick={onClick}
    >
      <Icon />
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#007aff] text-[17px] text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px] overflow-ellipsis overflow-hidden">Back</p>
      </div>
    </div>
  );
}

function ContinueButton({ onClick, text, variant = 'primary' }: { onClick: () => void, text: string, variant?: 'primary' | 'google' }) {
  const isGoogle = variant === 'google';
  return (
    <div
      className={clsx(
        "content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[14px] rounded-[1000px] w-full cursor-pointer transition-colors",
        isGoogle ? "bg-white border border-[#dadce0] hover:bg-gray-50 text-[#3c4043]" : "bg-black hover:bg-black/90 text-white"
      )}
      data-name="Button"
      onClick={onClick}
    >
      {isGoogle && (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      )}
      <div className={clsx("flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap tracking-[-0.408px]", isGoogle ? "text-gray-700" : "text-white")}>
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}

// unused component FormInput removed

// --- Login Screen ---

export function LoginScreen() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleLogin = () => {
    alert('Login Simulated');
    navigate('home');
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
          password={password}
          showPassword={showPassword}
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

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right Login Section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile view - Keep original design */}
          <div className="lg:hidden">
            <div className="bg-white min-h-screen flex flex-col font-['SF_Pro_Text',sans-serif] relative overflow-hidden">
              <BackgroundSlider />

              <div className="absolute top-0 left-0 w-full z-20">
                <BackBtn onClick={() => navigate('home')} />
              </div>

              <div className="flex-1 w-full max-w-[400px] mx-auto px-[24px] flex flex-col justify-center py-12 overflow-y-auto relative z-10">
                <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.408px] w-full text-center mb-8">
                  <div className="flex flex-col items-center gap-3 mb-6">
                    <img src={imgLogoSymbol} alt="Logo Symbol" className="w-32 h-auto drop-shadow-sm" />
                    <img src={imgLogoText} alt="Melhor Saúde" className="w-full h-auto drop-shadow-sm px-4" />
                  </div>
                  <p className="leading-[22px] text-white drop-shadow-md">Acesse sua conta</p>
                </div>

                <div className="w-full mb-8 flex flex-col gap-5">
                  <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                    <div aria-hidden="true" className="absolute border border-black/5 border-solid inset-0 pointer-events-none rounded-[1000px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full">
                        <input
                          type="email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          placeholder="Endereço de e-mail"
                          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                    <div aria-hidden="true" className="absolute border border-black/5 border-solid inset-0 pointer-events-none rounded-[1000px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full gap-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          placeholder="Senha"
                          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 transition-colors z-10 shrink-0"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-1">
                    <button className="text-[#007aff] text-[15px] font-['SF_Pro_Text:Semibold',sans-serif] hover:underline hover:opacity-80 transition-all">Esqueceu a senha?</button>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <ContinueButton onClick={handleLogin} text="Entrar" />

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                    </div>
                  </div>

                  <ContinueButton onClick={() => alert('Google Login')} text="Continuar com Google" variant="google" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop view - New design with same fields */}
          <div className="hidden lg:block relative">
            {/* Back button for desktop */}
            <button
              onClick={() => navigate('home')}
              className="absolute -top-4 left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta!</h1>
              <p className="text-gray-600 text-sm">Por favor, insira seus dados</p>
            </div>

            <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleLogin(); }} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Endereço de e-mail"
                  value={email}
                  autoComplete="off"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10 bg-white border-gray-300 focus:border-[#3973E1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-[#3973E1] hover:underline font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-black hover:bg-black/90"
                size="lg"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-12 bg-white border-gray-300 hover:bg-gray-50 mt-4"
                type="button"
                onClick={() => alert('Google Login')}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar com Google
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-8">
              Não tem uma conta?{" "}
              <button onClick={() => navigate('register')} className="text-[#3973E1] font-medium hover:underline">
                Registe-se aqui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
