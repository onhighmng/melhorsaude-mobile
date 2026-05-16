import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../NavigationContext';

import svgPaths from "../../../imports/svg-v32nb9gxqy";
import clsx from "clsx";
import { Eye, EyeOff, Sparkles, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";

// Background Assets

const imgLogoSymbol = "/landing-assets/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
const imgLogoText = "/landing-assets/35455f539b96cad8ef1d386a642da71621949352.png";





// --- Components from User Design ---

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

function FormInput({ value, onChange, placeholder, type = "text" }: any) {
  return (
    <Wrapper className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-black placeholder:text-[#8f908d] tracking-[-0.408px] leading-[22px] text-center"
      />
    </Wrapper>
  );
}

// --- Animated Characters Components ---

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

// --- Characters Component ---
interface AnimatedCharactersProps {
  isTyping: boolean;
  password: string;
  showPassword: boolean;
}

function AnimatedCharacters({ isTyping, password, showPassword }: AnimatedCharactersProps) {
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

  // Blinking effect for blue character
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

  // Blinking effect for dark character
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

  // Looking at each other animation when typing starts
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

  // Blue sneaky peeking animation when typing password and it's visible
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
        {/* Blue tall rectangle character - Back layer */}
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

        {/* Dark blue tall rectangle character - Middle layer */}
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

        {/* Light blue semi-circle character - Front left */}
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

        {/* Sky blue tall rectangle character - Front right */}
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

        <div className="flex-1 flex items-center justify-center">
          <img src="/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png" alt="Decoration" className="w-[80%] object-contain drop-shadow-2xl" />
        </div>

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
              <div className="absolute inset-0 z-0">
                <img src="/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png" className="w-full h-full object-cover" alt="Background" />
                <div className="absolute inset-0 bg-white/20" />
              </div>

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
                          onChange={(e: any) => setEmail(e.target.value)}
                          placeholder="Endereço de e-mail"
                          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                    <div aria-hidden="true" className="absolute border border-black/5 border-solid inset-0 pointer-events-none rounded-[1000px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full">
                        <input
                          type="password"
                          value={password}
                          onChange={(e: any) => setPassword(e.target.value)}
                          placeholder="Senha"
                          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                        />
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

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Endereço de e-mail"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continuar com Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}