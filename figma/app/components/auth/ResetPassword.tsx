import { useState, useEffect } from 'react';
// unused import removed
// DISABLED: import from 'motion/react';
import svgPaths from "../../../imports/svg-v32nb9gxqy";
import clsx from "clsx";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { supabase } from "@/lib/supabase";
// DISABLED: import from 'sonner';
// DISABLED: import from 'react-router-dom';
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
                <p className="leading-[22px] overflow-ellipsis overflow-hidden">Voltar</p>
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
            <div className={clsx("flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap tracking-[-0.408px]", isGoogle ? "text-gray-700" : "text-white")}>
                <p className="leading-[22px]">{text}</p>
            </div>
        </div>
    );
}

// --- Reset Password Screen ---

export function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            toast.error('Por favor, preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            toast.success('Senha atualizada com sucesso!');
            navigate('/login');
        } catch (error: unknown) {
            console.error('Error updating password:', error);
            // Handling unknown error type safely
            const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar a senha';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
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
            <div className="flex items-center justify-center p-0 lg:p-8 bg-white">
                <div className="w-full max-w-[420px]">
                    {/* Mobile view - Keep original design */}
                    <div className="lg:hidden">
                        <div className="bg-black min-h-screen flex flex-col font-['SF_Pro_Text',sans-serif] relative overflow-hidden">
                            <BackgroundSlider />

                            <div className="absolute top-0 left-0 w-full z-20">
                                <BackBtn onClick={() => navigate('/login')} />
                            </div>

                            <div className="flex-1 w-full max-w-[400px] mx-auto px-[24px] flex flex-col justify-center py-12 overflow-y-auto relative z-10">
                                <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.408px] w-full text-center mb-8">
                                    <div className="flex flex-col items-center gap-3 mb-6">
                                        <img src={imgLogoSymbol} alt="Logo Symbol" className="w-32 h-auto drop-shadow-sm" />
                                        <img src={imgLogoText} alt="Melhor Saúde" className="w-full h-auto drop-shadow-sm px-4" />
                                    </div>
                                    <p className="leading-[22px] text-white drop-shadow-md">Redefinir Senha</p>
                                </div>

                                <div className="w-full mb-8 flex flex-col gap-5">
                                    <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                                        <div className="flex flex-row items-center size-full">
                                            <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full gap-2">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Nova Senha"
                                                    className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-gray-500 hover:text-gray-700 transition-colors z-50 shrink-0"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative rounded-[1000px] shrink-0 w-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                                        <div className="flex flex-row items-center size-full">
                                            <div className="content-stretch flex items-center justify-between px-[20px] py-[16px] relative w-full gap-2">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirmar Senha"
                                                    className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text:Regular',sans-serif] text-[16px] text-black placeholder:text-[#666] tracking-[-0.408px] leading-[22px] text-center font-medium"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="text-gray-500 hover:text-gray-700 transition-colors z-50 shrink-0"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full space-y-4">
                                    <ContinueButton onClick={handleResetPassword} text={isLoading ? "Enviando..." : "Redefinir Senha"} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop view - New design with same fields */}
                    <div className="hidden lg:block relative">
                        {/* Back button for desktop */}
                        <button
                            onClick={() => navigate('/login')}
                            className="absolute -top-4 left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Voltar para Login</span>
                        </button>

                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Redefinir Senha</h1>
                            <p className="text-gray-600 text-sm">Insira sua nova senha abaixo</p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">Nova Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nova Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsTyping(true)}
                                        onBlur={() => setIsTyping(false)}
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

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirmar Senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onFocus={() => setIsTyping(true)}
                                        onBlur={() => setIsTyping(false)}
                                        required
                                        className="h-12 pr-10 bg-white border-gray-300 focus:border-[#3973E1]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-medium bg-black hover:bg-black/90"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Redefinindo..." : "Redefinir Senha"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
