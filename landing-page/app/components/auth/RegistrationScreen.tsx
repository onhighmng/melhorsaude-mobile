import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../NavigationContext';
import svgPaths from "../../../imports/svg-7rpstzgjl8";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";
const imgLogoSymbol = "/landing-assets/dca1667b7a13b537085ad45b6ab92b57b127771e.png";

// --- Shared UI Components from User Design ---

function Wrapper({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("relative rounded-[1000px] shrink-0 w-full bg-white", className)}>
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

function ContinueButton({ onClick, text }: { onClick: () => void, text: string }) {
  return (
    <div
      className="bg-black content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[14px] rounded-[1000px] w-full max-w-[345px] mx-auto cursor-pointer hover:bg-black/90 transition-colors mt-auto mb-8"
      data-name="Button"
      onClick={onClick}
    >
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="field">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white font-bold tracking-[-0.408px] w-full">
        <p className="leading-[22px]">{label}</p>
      </div>
      <Wrapper>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-black placeholder:text-[#8f908d] tracking-[-0.408px] leading-[22px]"
        />
      </Wrapper>
    </div>
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

interface AnimatedCharactersProps {
  isTyping: boolean;
}

function AnimatedCharacters({ isTyping }: AnimatedCharactersProps) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isBlueBlinking, setIsBlueBlinking] = useState(false);
  const [isDarkBlinking, setIsDarkBlinking] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
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
            height: isTyping ? '440px' : '400px',
            backgroundColor: '#3973E1',
            borderRadius: '10px 10px 0 0',
            zIndex: 1,
            transform: isTyping
              ? `skewX(${(bluePos.bodySkew || 0) - 12}deg) translateX(40px)`
              : `skewX(${bluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-700 ease-in-out"
            style={{
              left: isLookingAtEachOther ? `${55}px` : `${45 + bluePos.faceX}px`,
              top: isLookingAtEachOther ? `${65}px` : `${40 + bluePos.faceY}px`,
            }}
          >
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isBlueBlinking}
              forceLookX={isLookingAtEachOther ? 3 : undefined}
              forceLookY={isLookingAtEachOther ? 4 : undefined}
            />
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isBlueBlinking}
              forceLookX={isLookingAtEachOther ? 3 : undefined}
              forceLookY={isLookingAtEachOther ? 4 : undefined}
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
            transform: isLookingAtEachOther
              ? `skewX(${(darkPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
              : isTyping
                ? `skewX(${(darkPos.bodySkew || 0) * 1.5}deg)`
                : `skewX(${darkPos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-700 ease-in-out"
            style={{
              left: isLookingAtEachOther ? `${32}px` : `${26 + darkPos.faceX}px`,
              top: isLookingAtEachOther ? `${12}px` : `${32 + darkPos.faceY}px`,
            }}
          >
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isDarkBlinking}
              forceLookX={isLookingAtEachOther ? 0 : undefined}
              forceLookY={isLookingAtEachOther ? -4 : undefined}
            />
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor="white"
              pupilColor="#1E3A8A"
              isBlinking={isDarkBlinking}
              forceLookX={isLookingAtEachOther ? 0 : undefined}
              forceLookY={isLookingAtEachOther ? -4 : undefined}
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
            transform: `skewX(${lightBluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-200 ease-out"
            style={{
              left: `${82 + (lightBluePos.faceX || 0)}px`,
              top: `${90 + (lightBluePos.faceY || 0)}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" />
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" />
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
            transform: `skewX(${skyBluePos.bodySkew || 0}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-200 ease-out"
            style={{
              left: `${52 + (skyBluePos.faceX || 0)}px`,
              top: `${40 + (skyBluePos.faceY || 0)}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" />
            <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" />
          </div>
          <div
            className="absolute w-20 h-[4px] bg-[#1E3A8A] rounded-full transition-all duration-200 ease-out"
            style={{
              left: `${40 + (skyBluePos.faceX || 0)}px`,
              top: `${88 + (skyBluePos.faceY || 0)}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// --- Main Screen ---

export function RegistrationScreen() {
  const { navigate, data } = useNavigation();
  const role = data?.role || 'user';
  const [isTyping, setIsTyping] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    nuit: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    professionalTitle: '',
    specialization: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Registering with role:', role, formData);
    alert(`Registration Successful for ${role}! \n(Simulating redirect...)`);
    navigate('login');
  };

  const getTitle = () => {
    switch (role) {
      case 'company_admin': return 'Company Registration';
      case 'specialist': return 'Specialist Profile';
      case 'user': return 'Registrar na Plataforma';
      default: return 'Complete Profile';
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

        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[500px]">
          {/* Mobile view - Keep original design */}
          <div className="lg:hidden">
            <div className="relative w-full h-full min-h-screen flex flex-col font-['SF_Pro_Text',sans-serif]">
              <div className="absolute inset-0 z-0">
                <img src="/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png" className="w-full h-full object-cover" alt="Background" />
                <div className="absolute inset-0 bg-white/20" />
              </div>
              {/* Header Area */}
              <div className="relative w-full h-[100px] shrink-0 z-20">
                <BackBtn onClick={() => navigate('access-code')} />
              </div>

              {/* Scrollable Main Content */}
              <div className="flex-1 w-full max-w-[500px] mx-auto overflow-y-auto px-[24px]">
                <div className="pt-0 pb-4 flex flex-col items-center">
                  <img src={imgLogoSymbol} alt="Logo" className="w-32 h-auto object-contain drop-shadow-sm mt-4 mb-6" />
                  <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] text-[24px] text-center mb-8 text-white">
                    {getTitle()}
                  </div>

                  <div className="flex flex-col gap-[20px] w-full pb-8">
                    {role === 'company_admin' && (
                      <>
                        <FormInput label="Nome da Empresa" placeholder="Empresa Lda" value={formData.companyName} onChange={(e: any) => setFormData({ ...formData, companyName: e.target.value })} />
                        <FormInput label="NUIT" placeholder="123456789" value={formData.nuit} onChange={(e: any) => setFormData({ ...formData, nuit: e.target.value })} />
                      </>
                    )}

                    {role === 'specialist' && (
                      <>
                        <FormInput label="Título Profissional" placeholder="Psicólogo Clínico" value={formData.professionalTitle} onChange={(e: any) => setFormData({ ...formData, professionalTitle: e.target.value })} />
                        <FormInput label="Especialização" placeholder="Trauma, Ansiedade" value={formData.specialization} onChange={(e: any) => setFormData({ ...formData, specialization: e.target.value })} />
                      </>
                    )}

                    <FormInput label="Nome Completo" placeholder="Ex: João Silva" value={formData.fullName} onChange={(e: any) => setFormData({ ...formData, fullName: e.target.value })} />
                    <FormInput label="Endereço de E-mail" placeholder="nome@exemplo.com" type="email" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
                    <FormInput label="Senha" placeholder="••••••••" type="password" value={formData.password} onChange={(e: any) => setFormData({ ...formData, password: e.target.value })} />
                    <FormInput label="Número de Telefone" placeholder="+258 84 123 4567" type="tel" value={formData.phone} onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Footer Button - Always at bottom on mobile, but respects flow */}
              <div className="p-[24px] w-full max-w-[500px] mx-auto shrink-0 bg-white/90 backdrop-blur-sm z-10 sticky bottom-0">
                <ContinueButton onClick={handleSubmit} text="Tudo pronto, continuar" />
              </div>

            </div>
          </div>

          {/* Desktop view - New design with same fields */}
          <div className="hidden lg:block max-h-screen overflow-y-auto py-8 relative">
            {/* Back button for desktop */}
            <button
              onClick={() => navigate('access-code')}
              className="absolute top-0 left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>

            <div className="text-center mb-8 mt-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">{getTitle()}</h1>
              <p className="text-gray-600 text-sm">Complete seu perfil</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
              {role === 'company_admin' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-bold">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Empresa Lda"
                      value={formData.companyName}
                      onChange={handleChange}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nuit" className="text-sm font-bold">NUIT</Label>
                    <Input
                      id="nuit"
                      name="nuit"
                      type="text"
                      placeholder="123456789"
                      value={formData.nuit}
                      onChange={handleChange}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                    />
                  </div>
                </>
              )}

              {role === 'specialist' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="professionalTitle" className="text-sm font-bold">Título Profissional</Label>
                    <Input
                      id="professionalTitle"
                      name="professionalTitle"
                      type="text"
                      placeholder="Psicólogo Clínico"
                      value={formData.professionalTitle}
                      onChange={handleChange}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-sm font-bold">Especialização</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      type="text"
                      placeholder="Trauma, Ansiedade"
                      value={formData.specialization}
                      onChange={handleChange}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-bold">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold">Endereço de E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold">Número de Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+258 84 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 bg-white border-gray-300 focus:border-[#3973E1]"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-black hover:bg-black/90 mt-6"
                size="lg"
              >
                Tudo pronto, continuar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}