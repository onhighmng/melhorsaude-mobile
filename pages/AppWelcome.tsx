import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
// DISABLED: import from 'react-router-dom';
import { cn } from "@/lib/utils";
// DISABLED: import from 'framer-motion';
import { ChevronRight, ArrowRight } from "lucide-react";

const imgLogoText = "/assets/figma/35455f539b96cad8ef1d386a642da71621949352.png";
const imgLogoSymbol = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";

// Premium slide assets
const slide1Img = "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop";
const slide2Img = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop";
const slide3Img = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop";

export default function AppWelcome() {
    const navigate = useNavigate();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const completeIntro = (path: string) => {
        localStorage.setItem('hasSeenAppIntro', 'true');
        navigate(path);
    };

    const slides = [
        {
            id: 1,
            image: slide1Img,
            title: "Bem-estar Integral",
            description: "Cuidamos da sua saúde física, mental, financeira e jurídica num único lugar.",
        },
        {
            id: 2,
            image: slide2Img,
            title: "Especialistas 24/7",
            description: "Agende consultas com profissionais qualificados quando e onde precisar.",
        },
        {
            id: 3,
            image: slide3Img,
            title: "Jornada Personalizada",
            description: "Monitore o seu progresso e conquiste os seus objetivos com suporte contínuo.",
        }
    ];

    const handleNext = () => {
        if (emblaApi) emblaApi.scrollNext();
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-white relative overflow-hidden font-inter text-[#222]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3973E1]/10 to-transparent -z-10" />

            {/* Top Bar */}
            <div className="flex justify-between items-center p-6 pt-10 px-6 z-20">
                <div className="flex items-center gap-2">
                    <img src={imgLogoSymbol} alt="Logo" className="w-8 h-8 object-contain" />
                </div>
                <button
                    onClick={() => completeIntro('/login')}
                    className="text-sm font-medium text-gray-500 hover:text-[#3973E1] transition-colors"
                >
                    Pular
                </button>
            </div>

            {/* Carousel Content */}
            <div className="flex-1 flex flex-col justify-start pt-4 relative z-10">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full touch-pan-y">
                        {slides.map((slide, index) => (
                            <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full flex flex-col px-6 relative">
                                {/* Image Card */}
                                <div className="relative w-full aspect-[4/5] max-h-[50vh] rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10 mb-8 mx-auto max-w-sm">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"



                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col items-center text-center space-y-4 max-w-xs mx-auto">
                                    <h2
                                        key={slide.title}



                                        className="text-[28px] leading-tight font-bold font-dm-sans text-[#1D1D1F]"
                                    >
                                        {slide.title}
                                    </h2>

                                    <p
                                        key={slide.description}



                                        className="text-[16px] leading-[1.6] text-gray-500 font-inter"
                                    >
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="px-6 pb-12 pt-4 w-full z-20 bg-gradient-to-t from-white via-white to-transparent">
                <div className="max-w-md mx-auto space-y-8">
                    {/* Indicators */}
                    <div className="flex justify-center gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    index === selectedIndex
                                        ? "bg-[#3973E1] w-8"
                                        : "bg-gray-200 w-1.5"
                                )}
                                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                            />
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="h-14 relative">
                        
                            {selectedIndex === slides.length - 1 ? (
                                <div
                                    key="start-btn"



                                    className="w-full"
                                >
                                    <Button
                                        className="w-full h-14 bg-[#3973E1] hover:bg-[#2D5CB4] text-white rounded-full text-[16px] font-bold shadow-lg shadow-blue-500/25 transition-all text-lg font-dm-sans"
                                        onClick={() => completeIntro('/login')}
                                    >
                                        Começar Agora
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    key="next-btn"



                                    className="w-full"
                                >
                                    <Button
                                        className="w-full h-14 bg-[#1D1D1F] hover:bg-black text-white rounded-full text-[16px] font-bold shadow-lg shadow-gray-500/10 transition-all font-dm-sans"
                                        onClick={handleNext}
                                    >
                                        Continuar
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            )}
                        
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 w-full z-30 flex justify-center gap-6 text-[11px] text-gray-400 font-medium pb-2">
                <span>Política de Privacidade</span>
                <span>Termos de Uso</span>
            </div>
        </div>
    );
}
