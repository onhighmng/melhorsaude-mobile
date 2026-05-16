import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../NavigationContext';
import { useAccessCode } from "@/hooks/useAccessCode";
// DISABLED: import from 'motion/react';
import svgPaths from "../../../imports/svg-v32nb9gxqy";
import clsx from "clsx";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";
import { ChevronLeft } from "lucide-react";

const imgWireHead = "/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png";
const imgCalculator3D = "/landing-assets/3559bd16503c926eb29cb91a68662da99ccd6b1b.png";
const imgKettlebell3D = "/landing-assets/c509d36c066d343a8dd578a3c975bb34412de133.png";
const imgLogoSymbol = "/landing-assets/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
const imgLogoText = "/landing-assets/35455f539b96cad8ef1d386a642da71621949352.png";




// --- Reusing Components ---

function Wrapper({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("relative rounded-[1000px] shrink-0 w-full", className)}>
      <div aria-hidden="true" className="absolute border border-[#8f908d] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[14px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

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

function FormInput({ value, onChange, placeholder }: any) {
  return (
    <Wrapper className="mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-black placeholder:text-[#8f908d] tracking-[-0.408px] leading-[22px] text-center uppercase"
      />
    </Wrapper>
  );
}

export function AccessCodeScreen() {
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { getCodeInfo } = useAccessCode();

  const validateCode = async () => {
    setError('');

    if (!code || code.length < 3) {
      setError('Por favor introduza um código válido');
      return;
    }

    setIsValidating(true);

    try {
      const info = await getCodeInfo(code);

      if (info && info.isValid) {
        // Valid code - navigate to registration with correct role
        navigate('registration', { role: info.roleType, code: code });
      } else {
        if (info?.isUsed) {
          setError('Este código já foi utilizado');
        } else if (info?.isExpired) {
          setError('Este código expirou');
        } else {
          setError('Código inválido');
        }
      }
    } catch (err) {
      console.error('Validation error:', err);
      setError('Erro ao validar código');
    } finally {
      setIsValidating(false);
    }
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
              <div className="absolute inset-0 z-0">
                <img src="/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png" className="w-full h-full object-cover" alt="Background" />
                <div className="absolute inset-0 bg-white/20" />
              </div>
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
                          onChange={(e: any) => setCode(e.target.value)}
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
                  <ContinueButton onClick={validateCode} text={isValidating ? "Validando..." : "Validar Código"} />
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
                {isValidating ? "Validando..." : "Validar Código"}
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

// --- Animated Characters Components (REUSE FROM LOGIN) ---

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

interface AnimatedCharactersProps {
  isTyping: boolean;
  password?: string;
  showPassword?: boolean;
}

function AnimatedCharacters({ isTyping, password = '', showPassword = false }: AnimatedCharactersProps) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isBlueBlinking, setIsBlueBlinking] = useState(false);
  const [isDarkBlinking, setIsDarkBlinking] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isBluePeeking, setIsBluePeeking] = useState(false);
  const blueRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const lightBlueRef = useRef<HTMLDivElement>(null);
  const skyBlueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlueBlinking(true);
        setTimeout(() => {
          setIsBlueBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsDarkBlinking(true);
        setTimeout(() => {
          setIsDarkBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsBluePeeking(true);
          setTimeout(() => {
            setIsBluePeeking(false);
          }, 800);
        }, Math.random() * 3000 + 2000);
        return peekInterval;
      };

      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsBluePeeking(false);
    }
  }, [password, showPassword, isBluePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const bluePos = calculatePosition(blueRef);
  const darkPos = calculatePosition(darkRef);
  const lightBluePos = calculatePosition(lightBlueRef);
  const skyBluePos = calculatePosition(skyBlueRef);

  return (
    <div className="relative z-20 flex items-end justify-center h-[500px]">
      <div className="relative" style={{ width: '550px', height: '400px' }}>
        <div
          ref={blueRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: '70px',
            width: '180px',
            height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
            backgroundColor: '#3973E1',
            borderRadius: '10px 10px 0 0',
            zIndex: 1,
            transform: (password.length > 0 && showPassword)
              ? `skewX(0deg)`
              : (isTyping || (password.length > 0 && !showPassword))
                ? `skewX(${(bluePos.bodySkew || 0) - 12}deg) translateX(40px)`
                : `skewX(${bluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-700 ease-in-out"
            style={{
              left: (password.length > 0 && showPassword) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + bluePos.faceX}px`,
              top: (password.length > 0 && showPassword) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + bluePos.faceY}px`,
            }}
          >
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isBlueBlinking}
              forceLookX={(password.length > 0 && showPassword) ? (isBluePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
              forceLookY={(password.length > 0 && showPassword) ? (isBluePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
            />
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isBlueBlinking}
              forceLookX={(password.length > 0 && showPassword) ? (isBluePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
              forceLookY={(password.length > 0 && showPassword) ? (isBluePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
            />
          </div>
        </div>

        <div
          ref={darkRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: '240px',
            width: '120px',
            height: '310px',
            backgroundColor: '#1E40AF',
            borderRadius: '8px 8px 0 0',
            zIndex: 2,
            transform: (password.length > 0 && showPassword)
              ? `skewX(0deg)`
              : isLookingAtEachOther
                ? `skewX(${(darkPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                : (isTyping || (password.length > 0 && !showPassword))
                  ? `skewX(${(darkPos.bodySkew || 0) * 1.5}deg)`
                  : `skewX(${darkPos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-700 ease-in-out"
            style={{
              left: (password.length > 0 && showPassword) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + darkPos.faceX}px`,
              top: (password.length > 0 && showPassword) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + darkPos.faceY}px`,
            }}
          >
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isDarkBlinking}
              forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
              forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
            />
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isDarkBlinking}
              forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
              forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
            />
          </div>
        </div>

        <div
          ref={lightBlueRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: '0px',
            width: '240px',
            height: '200px',
            zIndex: 3,
            backgroundColor: '#60A5FA',
            borderRadius: '120px 120px 0 0',
            transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${lightBluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-200 ease-out"
            style={{
              left: (password.length > 0 && showPassword) ? `${50}px` : `${82 + (lightBluePos.faceX || 0)}px`,
              top: (password.length > 0 && showPassword) ? `${85}px` : `${90 + (lightBluePos.faceY || 0)}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
          </div>
        </div>

        <div
          ref={skyBlueRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: '310px',
            width: '140px',
            height: '230px',
            backgroundColor: '#93C5FD',
            borderRadius: '70px 70px 0 0',
            zIndex: 4,
            transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${skyBluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-200 ease-out"
            style={{
              left: (password.length > 0 && showPassword) ? `${20}px` : `${52 + (skyBluePos.faceX || 0)}px`,
              top: (password.length > 0 && showPassword) ? `${35}px` : `${40 + (skyBluePos.faceY || 0)}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
          </div>
          <div
            className="absolute w-20 h-[4px] bg-[#1E3A8A] rounded-full transition-all duration-200 ease-out"
            style={{
              left: (password.length > 0 && showPassword) ? `${10}px` : `${40 + (skyBluePos.faceX || 0)}px`,
              top: (password.length > 0 && showPassword) ? `${88}px` : `${88 + (skyBluePos.faceY || 0)}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}