import { useState, useEffect } from 'react';
import svgPaths from "@/figma/imports/svg-7rpstzgjl8";
import clsx from "clsx";
import { ChevronLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedCharacters } from './FigmaAnimatedCharacters';

const imgLogoSymbol = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";

// --- Shared UI Components from User Design ---

const imgWireHead = "/assets/figma/771937d4d613e82b8d8ce230a7f290e0da67075c.png";
const imgCalculator3D = "/assets/figma/3559bd16503c926eb29cb91a68662da99ccd6b1b.png";
const imgKettlebell3D = "/assets/figma/c509d36c066d343a8dd578a3c975bb34412de133.png";


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

function ContinueButton({ onClick, text, disabled }: { onClick: () => void, text: React.ReactNode, disabled?: boolean }) {
    return (
        <button
            className={clsx(
                "bg-black content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[14px] rounded-[1000px] w-full max-w-[345px] mx-auto cursor-pointer hover:bg-black/90 transition-colors mt-auto mb-8 border-none",
                disabled && "opacity-50 cursor-not-allowed"
            )}
            data-name="Button"
            onClick={onClick}
            disabled={disabled}
        >
            <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white tracking-[-0.408px]">
                <p className="leading-[22px]">{text}</p>
            </div>
        </button>
    );
}

interface FormInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    name: string;
    onFocus?: () => void;
    onBlur?: () => void;
    required?: boolean;
}

function FormInput({ label, value, onChange, placeholder, type = "text", name, onFocus, onBlur, required }: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="field">
            <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white font-bold tracking-[-0.408px] w-full">
                <p className="leading-[22px]">{label}</p>
            </div>
            <Wrapper>
                <div className="relative w-full">
                    <input
                        type={inputType}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        required={required}
                        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[15px] text-black placeholder:text-[#8f908d] tracking-[-0.408px] leading-[22px] pr-10"
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                    )}
                </div>
            </Wrapper>
        </div>
    );
}

interface RegisterDetailsProps {
    role: string;
    formData: Record<string, any>;
    updateFormData: (field: string, value: any) => void;
    onSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
    isLoading: boolean;
    acceptedTerms: boolean;
    setAcceptedTerms: (val: boolean) => void;
}

export function RegisterDetails({
    role,
    formData,
    updateFormData,
    onSubmit,
    onBack,
    isLoading,
    acceptedTerms,
    setAcceptedTerms
}: RegisterDetailsProps) {
    const [isTyping, setIsTyping] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
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
                        <img src="/assets/logo-icon.png" alt="Logo" className="w-24 h-24 brightness-0 invert drop-shadow-sm" />
                        <img src="/assets/logo-text.png" alt="Melhor Saúde" className="h-10 brightness-0 invert drop-shadow-sm" />
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
                        <div className="fixed inset-0 z-50 bg-white w-full h-full flex flex-col font-['SF_Pro_Text',sans-serif] overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/assets/figma/771937d4d613e82b8d8ce230a7f290e0da67075c.png"
                                    className="w-full h-full object-cover object-center"
                                    alt="Background"
                                />
                                <div className="absolute inset-0 bg-white/10" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full w-full">
                                {/* Header Area */}
                                <div className="relative w-full h-[100px] shrink-0 z-20">
                                    <BackBtn onClick={onBack} />
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
                                                    <FormInput
                                                        label="Nome da Empresa"
                                                        name="companyName"
                                                        placeholder="Empresa Lda"
                                                        value={formData.companyName}
                                                        onChange={handleChange}
                                                        onFocus={() => setIsTyping(true)}
                                                        onBlur={() => setIsTyping(false)}
                                                    />
                                                    <FormInput
                                                        label="NUIT"
                                                        name="taxId"
                                                        placeholder="123456789"
                                                        value={formData.taxId}
                                                        onChange={handleChange}
                                                        onFocus={() => setIsTyping(true)}
                                                        onBlur={() => setIsTyping(false)}
                                                    />
                                                </>
                                            )}

                                            {role === 'specialist' && (
                                                <>
                                                    <FormInput
                                                        label="Título Profissional"
                                                        name="professionalTitle"
                                                        placeholder="Psicólogo Clínico"
                                                        value={formData.professionalTitle}
                                                        onChange={handleChange}
                                                        onFocus={() => setIsTyping(true)}
                                                        onBlur={() => setIsTyping(false)}
                                                    />
                                                    <FormInput
                                                        label="Especialização"
                                                        name="specialization"
                                                        placeholder="Trauma, Ansiedade"
                                                        value={formData.specialization}
                                                        onChange={handleChange}
                                                        onFocus={() => setIsTyping(true)}
                                                        onBlur={() => setIsTyping(false)}
                                                    />
                                                </>
                                            )}

                                            <FormInput
                                                label="Nome Completo"
                                                name="name"
                                                placeholder="Ex: João Silva"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => setIsTyping(true)}
                                                onBlur={() => setIsTyping(false)}
                                            />
                                            <FormInput
                                                label="Endereço de E-mail"
                                                name="email"
                                                placeholder="nome@exemplo.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setIsTyping(true)}
                                                onBlur={() => setIsTyping(false)}
                                            />
                                            <FormInput
                                                label="Senha"
                                                name="password"
                                                placeholder="••••••••"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                onFocus={() => setIsTyping(true)}
                                                onBlur={() => setIsTyping(false)}
                                            />
                                            <FormInput
                                                label="Número de Telefone"
                                                name="phone"
                                                placeholder="+258 84 123 4567"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onFocus={() => setIsTyping(true)}
                                                onBlur={() => setIsTyping(false)}
                                            />

                                            <div className="flex items-center gap-3 mt-2">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={acceptedTerms}
                                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                    className="w-5 h-5"
                                                />
                                                <label htmlFor="terms" className="text-sm text-white font-bold">
                                                    Aceito os Termos e Condições
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Button - Always at bottom on mobile, but respects flow */}
                                {/* Footer Button - Always at bottom on mobile, but respects flow */}
                                <div className="p-[24px] w-full max-w-[500px] mx-auto shrink-0 bg-white/90 backdrop-blur-sm z-10 sticky bottom-0">
                                    <ContinueButton
                                        onClick={() => onSubmit({ preventDefault: () => { } } as React.FormEvent)}
                                        text={isLoading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Processing</> : "Tudo pronto, continuar"}
                                        disabled={!acceptedTerms || isLoading}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Desktop view - New design with same fields */}
                    <div className="hidden lg:block max-h-screen overflow-y-auto py-8 relative">
                        {/* Back button for desktop */}
                        <button
                            onClick={onBack}
                            className="absolute top-0 left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Voltar</span>
                        </button>

                        <div className="text-center mb-8 mt-10">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{getTitle()}</h1>
                            <p className="text-gray-600 text-sm">Complete seu perfil</p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5">
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
                                        <Label htmlFor="taxId" className="text-sm font-bold">NUIT</Label>
                                        <Input
                                            id="taxId"
                                            name="taxId"
                                            type="text"
                                            placeholder="123456789"
                                            value={formData.taxId}
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
                                <Label htmlFor="name" className="text-sm font-bold">Nome Completo</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    value={formData.name}
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
                                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
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

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="terms-desktop"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label htmlFor="terms-desktop" className="text-sm text-gray-600">
                                    Aceito os Termos e Condições
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-medium bg-black hover:bg-black/90 mt-6"
                                size="lg"
                                disabled={!acceptedTerms || isLoading}
                            >
                                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing</> : "Tudo pronto, continuar"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}
