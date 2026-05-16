import { useState } from 'react';
import { useNavigation } from '../../NavigationContext';
import svgPaths from "../../../imports/svg-7rpstzgjl8";
import clsx from "clsx";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// unused imports removed
import { AnimatedCharacters } from "@/components/auth/FigmaAnimatedCharacters";
const imgLogoSymbol = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";

// --- Shared UI Components from User Design ---

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

function ContinueButton({ onClick, text }: { onClick: () => void, text: string }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-[1000px] shrink-0 w-full bg-black h-[50px] text-white hover:bg-gray-900 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
    >
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap tracking-[-0.408px]">
        <p className="leading-[22px]">{text}</p>
      </div>
    </button>
  );
}

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  toggleVisibility?: () => void;
}

function FormInput({ label, placeholder, type = "text", value, onChange, isPassword, toggleVisibility }: FormInputProps) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="text-left text-[#3c3c43]/60 font-['SF_Pro_Text:Regular',sans-serif] text-[15px] tracking-[-0.24px] leading-[20px]">
        {label}
      </div>
      <Wrapper className="bg-[rgba(118,118,128,0.12)]">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-black placeholder:text-[#8f908d] tracking-[-0.408px] leading-[22px]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            {type === 'text' ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </Wrapper>
    </div>
  );
}

// --- Main Screen ---

export function RegistrationScreen() {
  const { navigate, data } = useNavigation();
  const role = data?.role || 'user';
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      case 'user': return 'Create Account';
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
        <div className="w-full max-w-[500px]">
          {/* Mobile view - Keep original design */}
          <div className="lg:hidden">
            <div className="bg-white relative w-full h-full min-h-dvh flex flex-col font-['SF_Pro_Text',sans-serif]">
              {/* Header Area */}
              <div className="relative w-full h-[100px] shrink-0 z-20">
                <BackBtn onClick={() => navigate('access-code')} />
              </div>

              {/* Scrollable Main Content */}
              <div className="flex-1 w-full max-w-[500px] mx-auto overflow-y-auto px-[24px]">
                <div className="pt-0 pb-4 flex flex-col items-center">
                  <img src={imgLogoSymbol} alt="Logo" className="w-32 h-auto object-contain drop-shadow-sm mt-4 mb-6 aspect-square" />
                  <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] text-[24px] text-center mb-8 text-black">
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
                    <FormInput
                      label="Senha"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                      isPassword={true}
                      toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                    <FormInput label="Número de Telefone" placeholder="+258 84 123 4567" type="tel" value={formData.phone} onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Footer Button - Always at bottom on mobile, but respects flow */}
              <div className="p-[24px] w-full max-w-[500px] mx-auto shrink-0 bg-white/90 backdrop-blur-sm z-10 sticky bottom-0">
                <ContinueButton onClick={handleSubmit} text="You're all set, continue" />
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
                    <Label htmlFor="companyName" className="text-sm font-medium">Nome da Empresa</Label>
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
                    <Label htmlFor="nuit" className="text-sm font-medium">NUIT</Label>
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
                    <Label htmlFor="professionalTitle" className="text-sm font-medium">Título Profissional</Label>
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
                    <Label htmlFor="specialization" className="text-sm font-medium">Especialização</Label>
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
                <Label htmlFor="fullName" className="text-sm font-medium">Nome Completo</Label>
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
                <Label htmlFor="email" className="text-sm font-medium">Endereço de E-mail</Label>
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
                <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-12 bg-white border-gray-300 focus:border-[#3973E1] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Número de Telefone</Label>
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
                You're all set, continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
