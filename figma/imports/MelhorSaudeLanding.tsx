
import clsx from "clsx";
import { useState, useEffect } from "react";
// DISABLED: import from 'motion/react';
// DISABLED: import from 'react-router-dom';
import { Navbar } from "../app/components/Navbar";
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, Shield, Zap, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VideoModal from "@/components/guides/VideoModal";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Images & Assets

const imgLogoIcon = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
const imgLogoText = "/assets/figma/35455f539b96cad8ef1d386a642da71621949352.png";
const imgContents = "/assets/figma/new-hero-image.jpg";

// New Assets from LandingPage.tsx


// New Background Images

const imgLawPillar = "/assets/figma/6668ad1c924d811bee27f10eb4f9b481c4592094.png";

// Updated Pillar Images
const imgBrain = "https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb258ZW58MXx8fHwxNzY1ODIwNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgWeights = "https://images.unsplash.com/photo-1687184144779-51a366352458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGZpdG5lc3MlMjBneW0lMjB3b3Jrb3V0fGVufDF8fHx8MTc2NTgyMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgCalculator = "https://images.unsplash.com/photo-1707779491435-000c45820db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGludmVzdG1lbnQlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc2NTgyMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgLaw = imgLawPillar;





const imgItem2_Old = "https://images.unsplash.com/photo-1653656120715-e863e88db216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYmxhY2slMjBjb3VwbGUlMjBqb2dnaW5nJTIwb3IlMjBleGVyY2lzaW5nJTIwb3V0ZG9vcnN8ZW58MXx8fHwxNzY1ODE3NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgItem3_Old = "https://images.unsplash.com/photo-1512182634620-74f0b656d992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwbG9va2luZyUyMGF0JTIwaG9yaXpvbiUyMHZpc2lvbmFyeXxlbnwxfHx8fDE3NjU4MTc0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgItem4_Old = "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFuZHMlMjBob2xkaW5nJTIwdG9nZXRoZXIlMjBzdXBwb3J0fGVufDF8fHx8MTc2NTgxNzQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Icons for AnimatedCards




// Mock Helpers (Original)
function BackgroundImage({ text, text1, additionalClassNames = "" }: any) {
    return <div className={`font-dm-sans font-bold ${additionalClassNames}`}>{text} {text1}</div>;
}
function ButtonBackgroundImageAndText2({ text }: any) {
    return <div className="bg-[rgb(57,115,225)] text-white px-4 py-1 rounded-full font-inter font-medium text-sm">{text}</div>;
}
function NumberBackgroundImageAndText1({ text }: any) {
    return <div className="w-12 h-12 rounded-full bg-[rgb(57,115,225)] text-white flex items-center justify-center text-xl font-bold font-dm-sans font-bold">{text}</div>;
}
function TextBackgroundImage1({ text, text1 }: any) {
    return <div><div className="font-bold text-lg font-dm-sans font-bold">{text}</div><div className="font-inter font-normal text-gray-600">{text1}</div></div>;
}
function TextBackgroundImageAndText({ text }: { text: string }) {
    return <div className="font-dm-sans font-bold text-[24px] text-white z-10">{text}</div>;
}
function ButtonBackgroundImage() {
    return <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/50 text-white transition-colors hover:bg-white/30">→</div>;
}
function Button4() {
    return <ButtonBackgroundImage />;
}

// Data
const pillarsData = [
    {
        id: 0,
        title: "Saúde Mental",
        subtitle: "Apoio psicológico e emocional",
        specialistsTitle: "Especialistas Disponíveis 24/7",
        specialists: [
            "Psicólogos Clínicos",
            "Terapeutas Cognitivo-Comportamentais",
            "Psicoterapeutas",
            "Conselheiros de Saúde Mental",
            "Especialistas em Gestão de Stress"
        ],
        image: imgBrain,
    },
    {
        id: 1,
        title: "Bem-estar Físico",
        subtitle: "Saúde física e nutrição",
        specialistsTitle: "Especialistas Disponíveis 24/7",
        specialists: [
            "Nutricionistas",
            "Personal Trainers",
            "Fisioterapeutas",
            "Médicos de Desporto",
            "Especialistas em Sono"
        ],
        image: imgWeights,
    },
    {
        id: 2,
        title: "Assistência Financeira",
        subtitle: "Planeamento e gestão financeira",
        specialistsTitle: "Especialistas Disponíveis 24/7",
        specialists: [
            "Consultores Financeiros",
            "Gestores de Investimentos",
            "Especialistas em Orçamento",
            "Planeadores de Reforma",
            "Consultores de Dívida"
        ],
        image: imgCalculator,
    },
    {
        id: 3,
        title: "Assistência Jurídica",
        subtitle: "Apoio legal e consultoria",
        specialistsTitle: "Especialistas Disponíveis 24/7",
        specialists: [
            "Advogados de Família",
            "Advogados Laborais",
            "Consultores Jurídicos",
            "Notários",
            "Mediadores"
        ],
        image: imgLaw,
    },
];

const identityData = [
    {
        id: "mission",
        title: "Nossa Missão",
        snippet: "Promovemos o bem-estar integral dos colaboradores através de soluções digitais seguras nos quatro pilares da saúde.",
        fullText: "Promovemos o bem-estar integral dos colaboradores através de soluções digitais seguras, personalizadas e sustentadas nos quatro pilares da saúde: psicológica, jurídica, financeira e física. Nosso objetivo é ajudar as empresas a criar ambientes de trabalho saudáveis, positivos e sustentáveis, onde todos possam prosperar com equilíbrio e autonomia.",
        image: imgItem2_Old,
        button: <ButtonBackgroundImage />
    },
    {
        id: "vision",
        title: "Nossa Visão",
        snippet: "Queremos ser a principal referência nacional em soluções de bem-estar corporativo em Moçambique.",
        fullText: "Queremos ser a principal referência nacional em soluções de bem-estar corporativo. Trabalhamos para construir uma nova cultura organizacional em Moçambique — mais consciente, humana e comprometida com o cuidado completo e contínuo dos colaboradores em todas as áreas essenciais da sua vida.",
        image: imgItem3_Old,
        button: <Button4 />
    },
    {
        id: "values",
        title: "Nossos Valores",
        snippet: "Agimos com ética, transparência e foco humano, valorizando a confidencialidade e a escuta ativa.",
        fullText: "Agimos com ética, transparência e foco humano. Valorizamos a confidencialidade, o uso responsável da tecnologia e a escuta ativa. Acreditamos no impacto real dos cuidados psicológicos, jurídicos, financeiros e físicos — com soluções mensuráveis, acessíveis e centradas nas necessidades de cada pessoa.",
        image: imgItem4_Old,
        button: <ButtonBackgroundImage />
    }
];

// --- HERO SECTION ---

import { imgVector } from "./svg-zqpj8";

// Assets from HeroSection-202-908.tsx


// --- HERO SECTION ---

function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[700px] md:h-[660px] bg-white overflow-hidden font-dm-sans text-[#222]">
            {/* Background Mask & Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* 
                    Using the exact SVG mask from Figma export.
                    We use mask-image to apply the shape.
                */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#f4f4f4] md:bg-transparent"
                    style={{
                        maskImage: `url('${imgVector}')`,
                        maskSize: '105% 100%',
                        maskPosition: 'left bottom',
                        WebkitMaskImage: `url('${imgVector}')`,
                        WebkitMaskSize: '105% 100%',
                        WebkitMaskPosition: 'left bottom',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat'
                    }}
                >
                    {/* The Image inside the mask */}
                    <img
                        src={imgContents}
                        alt="Hero Background"
                        className="w-full h-full object-cover object-[center_30%]"
                    />
                    {/* Overlay to ensure text readability if needed, though Figma design didn't have heavy overlay, we stick to design */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>

            {/* Mobile Gradient Overlay for Readability */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#f4f4f4] via-[#f4f4f4]/90 to-transparent md:hidden z-1 pointer-events-none" />

            {/* Main Content Group */}
            <div className="absolute bottom-[20px] left-[20px] md:bottom-[20px] md:left-[40px] w-full max-w-[1240px] flex flex-col pointer-events-auto z-10">

                {/* Heading Group */}
                <div className="relative mb-[20px] md:mb-[40px] w-full max-w-[800px] md:-ml-[30px]">
                    <div className="flex flex-row flex-wrap items-baseline gap-2 md:gap-3">
                        <h1 className="font-dm-sans font-bold text-[37px] md:text-[52px] leading-[1.1] tracking-[-1.3px] text-[#222]">
                            Conte com a
                        </h1>
                        <img
                            src={imgLogoText}
                            alt="Melhor Saúde"
                            className="h-[22px] md:h-[33px] w-auto object-contain translate-y-[-2px] md:translate-y-[-4px]"
                        />
                    </div>
                </div>

                {/* Description & Button Group - Side by Side */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[12px] pl-0 md:-ml-[26px]">
                    {/* Description - Compact width to avoid overlap */}
                    <div className="w-full md:w-[480px]">
                        <p className="font-inter font-normal text-[14px] md:text-[17px] text-[#666] leading-[1.6] max-w-[320px] md:max-w-[400px]">
                            Cuidamos da sua saúde mental e bem-estar com profissionais qualificados disponíveis 24 horas por dia, 7 dias por semana.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        className="shrink-0 bg-[#3973e1] text-white h-[50px] md:h-[57px] w-[180px] md:w-[211px] rounded-full font-inter font-bold text-[14px] md:text-[16px] flex items-center justify-center gap-2 hover:bg-[#285ec4] transition-colors shadow-lg shadow-blue-500/20 group md:-ml-8"
                        onClick={() => navigate('/register')}
                    >
                        Começar Agora
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform">
                            <path d="M4.16667 10H15.8333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}

// --- PILLARS SECTION (Preserved) ---

function Items1({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (index: number) => void }) {
    return (
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full lg:w-[500px]" data-name="Items">
            {pillarsData.map((pillar, index) => {
                const isActive = activeIndex === index;
                return (
                    <div
                        key={pillar.id}
                        layout
                        initial={false}


                        className="relative shrink-0 w-full"
                    >
                        <div className="relative size-full">
                            
                                {isActive ? (
                                    <div
                                        key="active-content"




                                        className="flex flex-col items-start gap-4 overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="font-dm-sans font-medium leading-[32px] md:leading-[40px] text-[24px] md:text-[32px] text-white">
                                                {pillar.title}
                                            </p>
                                            <p className="font-inter font-normal leading-[24px] text-[14px] md:text-[16px] text-white/80">
                                                {pillar.subtitle}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 mt-2">
                                            <p className="font-dm-sans font-bold text-[14px] uppercase tracking-wider text-white/60">
                                                {pillar.specialistsTitle}
                                            </p>
                                            <ul className="flex flex-col gap-1 list-none pl-0">
                                                {pillar.specialists.map((spec, i) => (
                                                    <li key={i} className="font-inter font-normal text-[14px] md:text-[16px] text-white flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                                        {spec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key="inactive-content"




                                        onClick={() => setActiveIndex(index)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveIndex(index);
                                            }
                                        }}
                                        className="flex items-center justify-between py-2 border-b border-white/20 cursor-pointer hover:opacity-100 transition-opacity"
                                    >
                                        <p className="font-dm-sans font-bold leading-[32px] text-white/60 hover:text-white/80 transition-colors text-[20px] md:text-[24px]">
                                            {pillar.title}
                                        </p>
                                    </div>
                                )}
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --- ABOUT SECTION (New) ---



// ... existing imports ...

// ... (skip down to AnimatedCards) ...

function AnimatedCards() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            title: "Confidencialidade",
            text: "Rigor ético e sigilo profissional em todos os atendimentos.",
            icon: Shield,
        },
        {
            title: "Acessibilidade",
            text: "Soluções completas, acessíveis e eficazes para todos.",
            icon: Zap,
        },
        {
            title: "Comunidade",
            text: "Conectamos empresas e colaboradores com foco humano.",
            icon: Users,
        },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {cards.map((card, index) => {
                const isActive = activeIndex === index;
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className={clsx(
                            "p-6 rounded-[20px] flex flex-col gap-4 flex-1 transition-all duration-500",
                            isActive
                                ? "bg-[#3973E1] text-white"
                                : "bg-white border border-gray-100 shadow-sm text-[#222]"
                        )}
                    >
                        <div
                            className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500",
                                isActive ? "bg-white/20" : "bg-blue-50"
                            )}
                        >
                            <Icon
                                className={clsx(
                                    "w-5 h-5 transition-all duration-500",
                                    isActive ? "text-white" : "text-[#3973E1]"
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-inter font-bold text-lg">
                                {card.title}
                            </h3>
                            <p
                                className={clsx(
                                    "font-inter font-normal text-sm transition-colors duration-500",
                                    isActive ? "opacity-80" : "text-[#666]"
                                )}
                            >
                                {card.text}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function AboutSection() {

    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("/assets/platform-video.mp4");
    const [videoTitle, setVideoTitle] = useState("Melhor Saúde Platform Demo");

    const handlePlayClick = () => {
        // Reset to main video when opening
        setCurrentVideo("/assets/platform-video.mp4");
        setVideoTitle("Melhor Saúde Platform Demo");
        setIsVideoOpen(true);
    };

    const handleNextVideo = () => {
        if (currentVideo.includes("platform-video")) {
            setCurrentVideo("/assets/untitled-design.mp4");
            setVideoTitle("Design Concept");
        } else {
            setCurrentVideo("/assets/platform-video.mp4");
            setVideoTitle("Melhor Saúde Platform Demo");
        }
    };

    return (
        <div id="about-section" className="relative w-full py-20 px-4 md:px-12 flex justify-center bg-white">
            <div className="w-full px-4 md:px-16 flex flex-col lg:flex-row gap-16 items-center">

                {/* Left: Image Composition */}
                <div
                    className="relative w-full lg:w-1/2 h-[300px] md:h-[600px] group cursor-pointer"
                    onClick={handlePlayClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handlePlayClick();
                        }
                    }}
                >
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden">
                        <video
                            src="/assets/platform-video.mp4"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    </div>

                    {/* Floating Badges - Play Button */}
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/50 w-20 h-20 flex items-center justify-center rounded-full text-white cursor-pointer hover:bg-white/30 transition-all hover:scale-110 z-20 shadow-xl">
                        <svg width="24" height="28" viewBox="0 0 20 24" fill="none" className="ml-1">
                            <path d="M20 12L0 23.5453V0.454701L20 12Z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col gap-8 w-full lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        <div className="font-dm-sans font-medium text-[40px] md:text-[56px] leading-[1.1] text-[rgb(57,115,225)]">
                            Sobre Nós
                        </div>
                        <p className="font-inter font-normal text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-[#666] text-justify">
                            A Melhor Saúde é a plataforma líder em bem-estar corporativo em Moçambique, criada para transformar a forma como as empresas cuidam das suas pessoas. Nascemos da necessidade de soluções completas, acessíveis e eficazes, que promovam ambientes organizacionais mais fortes, humanos e produtivos. Unimos tecnologia, confiança profissional e uma abordagem centrada nas pessoas para conectar empresas, colaboradores e especialistas em saúde e bem-estar. Atuamos com rigor ético, valorizando a confidencialidade e o sigilo profissional em todos os atendimentos, e oferecemos um cuidado humanizado, estratégico e digital que redefine a experiência de bem-estar no meio corporativo.
                        </p>
                    </div>

                    {/* Cards Row */}
                    <AnimatedCards />
                </div>

            </div>

            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc={currentVideo}
                guideName={videoTitle}
                onNext={handleNextVideo}
                nextLabel={currentVideo.includes("platform-video") ? "Assistir: Conceito de Design" : "Assistir: Demo da Plataforma"}
            />
        </div>
    );
}

// ... continue ...

function TextBadge() {
    return (
        <div className="content-stretch flex flex-col gap-12 lg:gap-[276px] items-start relative shrink-0 w-full lg:w-auto" data-name="Text + Badge">
            <ButtonBackgroundImageAndText2 text="# Pilares" />
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#222] bg-[rgba(255,255,255,0)]" data-name="Text">
                <BackgroundImage text="Os Nossos" text1="Pilares" additionalClassNames="leading-[48px] text-[40px] md:leading-[64px] md:text-[56px] text-white" />
                <p className="font-inter font-normal leading-[24px] md:leading-[30px] not-italic opacity-50 relative shrink-0 text-base md:text-[20px] w-full lg:w-[660px] text-white">Promovemos o bem-estar integral sustentado nos quatro pilares da saúde: mental, física, financeira e jurídica.</p>
            </div>
        </div>
    );
}

function Content({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (index: number | ((prev: number) => number)) => void }) {
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % pillarsData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [setActiveIndex]);

    return (
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 transition-all duration-1000 min-h-[800px] h-auto overflow-hidden rounded-[20px]" data-name="Content">
            
                <img
                    key={activeIndex}




                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    src={pillarsData[activeIndex].image}
                />
            
            <div className="absolute inset-0 bg-black/60 z-0" />
            <div className="flex flex-row items-center size-full relative z-10">
                <div className="content-stretch flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 md:p-[40px] gap-8 relative w-full">
                    <TextBadge />
                    <Items1 activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
            </div>
        </div>
    );
}

function ServicesSection({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (index: number | ((prev: number) => number)) => void }) {
    return (
        <div className="rounded-[20px] overflow-hidden">
            <Content activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
    );
}


// --- IDENTITY SECTION (Preserved) ---

function Items2() {
    return (
        <div className="content-stretch grid grid-cols-1 md:grid-cols-3 items-start justify-center relative shrink-0 w-full gap-6 md:gap-4" data-name="Items">
            {identityData.map((item) => (
                <Dialog key={item.id}>
                    <DialogTrigger asChild>
                        <div className="content-stretch flex flex-col h-[455px] items-start justify-between p-[24px] relative rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.05)] shrink-0 w-full cursor-pointer hover:opacity-95 transition-opacity group overflow-hidden">
                            <img alt={item.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full transition-transform duration-500 group-hover:scale-105" src={item.image} />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-[20px] opacity-60" />

                            {/* Top Section */}
                            <div className="relative z-10 w-full flex justify-end">
                                {item.button}
                            </div>

                            {/* Bottom Section */}
                            <div className="relative z-10 w-full flex flex-col gap-3">
                                <TextBackgroundImageAndText text={item.title} />
                                <p className="font-inter font-normal text-white/90 text-[16px] leading-[24px] line-clamp-2">
                                    {item.snippet}
                                </p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-white text-[#222]">
                        <DialogHeader>
                            <DialogTitle className="text-[32px] font-bold text-[#222] mb-4 font-dm-sans font-bold">{item.title}</DialogTitle>

                        </DialogHeader>
                        <div className="font-inter font-normal text-[18px] leading-[28px] text-[#444]">
                            {item.fullText}
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}

function TitleBadge() {
    return (
        <div className="content-stretch flex flex-col gap-6 md:gap-[24px] items-center relative shrink-0 w-full" data-name="Title + Badge">
            <ButtonBackgroundImageAndText2 text="# Identidade" />
            <div className="font-dm-sans font-medium leading-[48px] md:leading-[64px] min-w-full relative shrink-0 text-[#222] text-[40px] md:text-[56px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="mb-0">Nossa</p>
                <p>Identidade</p>
            </div>
        </div>
    );
}

function IssuesSection() {
    return (
        <div className="relative shrink-0 w-full" data-name="Issues Section">
            <div className="flex flex-col items-center size-full">
                <div className="content-stretch flex flex-col gap-[40px] md:gap-[56px] items-center px-4 md:px-[50px] py-0 relative w-full">
                    <TitleBadge />
                    <Items2 />
                </div>
            </div>
        </div>
    );
}

// ... continue ...

// --- HOW IT WORKS SECTION (Preserved) ---

function Title2() {
    const imgTitle = "https://images.unsplash.com/photo-1523001021477-53f37adf2df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwaW4lMjBwbGFubmVyJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjU3Mjc1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    return (
        <div className="content-stretch flex flex-col gap-12 md:gap-[268px] items-start pl-[24px] md:pl-[34px] pr-0 py-[34px] relative rounded-[20px] shrink-0 w-full lg:w-[595px] h-[400px] lg:h-auto overflow-hidden" data-name="Title">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgTitle} />
            <div className="absolute inset-0 bg-black/10 rounded-[20px]" />
            <div className="relative z-10">
                <ButtonBackgroundImageAndText2 text="# Como Funciona" />
                <BackgroundImage text="Como" text1="Funciona" additionalClassNames="leading-[48px] md:leading-[64px] text-white text-[40px] md:text-[56px] mt-4" />
            </div>
        </div>
    );
}



function HowItWorksSection() {
    return (
        <div className="relative shrink-0 w-full" data-name="How It Works Section">
            <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex flex-col lg:flex-row gap-8 items-center lg:items-stretch px-4 md:px-[50px] py-0 relative w-full">
                    <Title2 />
                    <div className="content-stretch flex flex-col gap-[24px] md:gap-[40px] items-start relative shrink-0 w-full lg:w-auto" data-name="Items">
                        <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 1">
                            <NumberBackgroundImageAndText1 text="1" />
                            <TextBackgroundImage1 text="Escolha o seu Pilar" text1="Navegue pelas nossas quatro áreas essenciais—Saúde Mental, Física, Financeira e Jurídica. Identifique o apoio que precisa e selecione o pilar para aceder a especialistas qualificados prontos a ajudar." />
                        </div>
                        <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 2">
                            <NumberBackgroundImageAndText1 text="2" />
                            <TextBackgroundImage1 text="Agende com Facilidade" text1="Visualize a agenda dos nossos profissionais em tempo real. Escolha o dia e horário que melhor se integram na sua vida, com total flexibilidade para sessões online ou telefónicas." />
                        </div>
                        <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 3">
                            <NumberBackgroundImageAndText1 text="3" />
                            <TextBackgroundImage1 text="Realize a sua Sessão" text1="Receba o link seguro para a sua vídeo-chamada ou aguarde o contacto telefónico no horário agendado. Desfrute de um ambiente confidencial e acolhedor, focado inteiramente no seu desenvolvimento e bem-estar integral." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... continue ...

// --- RESTORED SECTIONS (Matches LandingPage.tsx visually but in Flexbox) ---

function TestimonialButton({ text = "# Testimonials" }: { text?: string }) {
    return (
        <div className="bg-[rgb(57,115,225)] flex items-center justify-center px-[24px] py-[6px] rounded-[50px]" data-name="Button 5">
            <p className="font-inter font-normal leading-[24px] not-italic relative shrink-0 text-[14px] md:text-[16px] text-nowrap text-white">{text}</p>
        </div>
    );
}

function TestimonialSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const benefits = [
        {
            category: "Suporte Integral 360°",
            title: "Saúde em Todas as Dimensões",
            points: "Não cuidamos apenas de um sintoma, mas de si por inteiro. Aceda a especialistas em Saúde Mental, Física, Financeira e Jurídica numa única plataforma integrada, garantindo um equilíbrio total."
        },
        {
            category: "Acessibilidade Total",
            title: "Consigo, Onde Estiver",
            points: "Elimine deslocações e salas de espera. Realize as suas sessões de aconselhamento e orientação por vídeo ou telefone, no conforto de sua casa ou escritório. O nosso foco é o apoio contínuo e preventivo, com horários flexíveis que se adaptam à sua rotina."
        },
        {
            category: "Privacidade Garantida",
            title: "Espaço Seguro e Confidencial",
            points: "A sua confiança é a nossa prioridade. Oferecemos um ambiente digital seguro e privado, onde todas as consultas e dados são estritamente confidenciais, permitindo-lhe falar livremente."
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % benefits.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
    };

    const current = benefits[currentIndex];

    return (
        <div className="relative w-full max-w-[1400px] mx-auto my-12 md:my-20 px-4 md:px-8" data-name="Testimonial Section">
            <div
                className="relative rounded-[20px] overflow-hidden min-h-[500px] md:h-[644px] flex flex-col items-center justify-center p-8 transition-colors duration-500"
                style={{ backgroundColor: `${["#3973E1", "#2A5BCC", "#5B95F5", "#1E3A8A"][currentIndex % 4]}15` }}
            >
                <div className="absolute top-8 md:top-12 z-10">
                    <TestimonialButton text="# Benefícios" />
                </div>

                
                    <div
                        key={currentIndex}




                        className="flex flex-col items-center gap-6 max-w-4xl z-10 mt-8"
                    >
                        <p className="font-dm-sans font-medium font-medium leading-[1.2] text-[#222] text-[32px] md:text-[56px] text-center w-full">
                            "{current.title}"
                        </p>
                        <div className="flex flex-col items-center gap-2">
                            {current.points.split('•').map((point, i) => (
                                <p key={i} className="font-dm-sans font-medium font-medium text-[16px] md:text-[24px] leading-relaxed text-[#222] text-center opacity-60">
                                    {point.trim()}
                                </p>
                            ))}
                        </div>
                    </div>
                

                <div className="flex items-center gap-8 mt-12 z-20">
                    <button
                        onClick={handlePrev}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white transition-colors cursor-pointer"
                        aria-label="Previous"
                    >
                        <ArrowLeft className="w-6 h-6 text-[#222]" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white transition-colors cursor-pointer"
                        aria-label="Next"
                    >
                        <ArrowRight className="w-6 h-6 text-[#222]" />
                    </button>
                </div>
            </div>
        </div>
    );
}



function CtaSection() {
    return (
        <></>
    );
}

function FaqSection() {
    return (
        <div className="relative w-full py-20 px-4 md:px-8 flex justify-center bg-white">
            <div className="w-full px-4 md:px-16 flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Left: Title */}
                <div className="flex flex-col gap-8 w-full md:w-1/3">
                    <ButtonBackgroundImageAndText2 text="# FAQ" />
                    <div className="font-dm-sans font-medium font-medium leading-[1.1] text-[#222] text-[40px] md:text-[56px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        <p className="mb-0">Perguntas</p>
                        <p>Frequentes</p>
                    </div>
                    <p className="font-inter font-normal text-[16px] md:text-[18px] text-[#666] leading-relaxed">
                        Encontre respostas para as dúvidas mais comuns sobre os nossos serviços e como podemos ajudar você.
                    </p>
                    <button className="w-fit px-8 py-3 rounded-[50px] bg-[rgb(57,115,225)] text-white font-inter font-medium hover:bg-black transition-colors">
                        Falar com Suporte
                    </button>
                </div>

                {/* Right: Accordion */}
                <div className="w-full md:w-2/3">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                        <AccordionItem value="item-1" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
                            <AccordionTrigger className="font-dm-sans font-bold text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                                O que é a Melhor Saúde e como posso beneficiar dela?
                            </AccordionTrigger>
                            <AccordionContent className="font-inter font-normal text-[15px] md:text-[16px] text-[#666] pb-6">
                                A Melhor Saúde é uma plataforma focada no aconselhamento e orientação personalizada para o seu bem-estar. Através de uma abordagem integrada, oferecemos acesso direto a profissionais especializados em Saúde Mental, Saúde Física, Gestão Financeira e Apoio Jurídico. O nosso objetivo não é apenas fornecer ferramentas, mas sim garantir um acompanhamento humano e próximo para o ajudar a superar desafios e alcançar os seus objetivos pessoais e profissionais.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
                            <AccordionTrigger className="font-dm-sans font-bold text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                                As minhas sessões e dados são confidenciais?
                            </AccordionTrigger>
                            <AccordionContent className="font-inter font-normal text-[15px] md:text-[16px] text-[#666] pb-6">
                                Sim, totalmente. A confidencialidade é a base da nossa relação consigo. Todas as sessões de aconselhamento realizadas com os nossos especialistas são protegidas pelo sigilo profissional. A sua empresa apenas recebe relatórios estatísticos anónimos (ex: número total de utilizadores na plataforma), e nunca terá acesso ao conteúdo das suas conversas ou aos seus dados pessoais.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
                            <AccordionTrigger className="font-dm-sans font-bold text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                                Como funcionam os créditos de consulta?
                            </AccordionTrigger>
                            <AccordionContent className="font-inter font-normal text-[15px] md:text-[16px] text-[#666] pb-6">
                                O seu plano inclui um determinado número de créditos ou sessões mensais. Isto significa que todos os meses o seu saldo é renovado, permitindo-lhe manter um acompanhamento regular e consistente. Para utilizar, basta aceder à área de agendamento, selecionar o especialista que pretende e marcar a sua sessão. O sistema gere automaticamente o seu saldo mensal.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
                            <AccordionTrigger className="font-dm-sans font-bold text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                                Posso utilizar a plataforma para membros da minha família?
                            </AccordionTrigger>
                            <AccordionContent className="font-inter font-normal text-[15px] md:text-[16px] text-[#666] pb-6">
                                O acesso à plataforma é pessoal e intransmissível, destinado exclusivamente ao colaborador titular. No entanto, o aconselhamento que recebe (especialmente nas áreas jurídica e financeira) pode e deve ser aplicado para beneficiar o seu agregado familiar. Em situações que envolvam diretamente a família, pode abordar esses temas nas suas sessões, desde que seja o titular a conduzir a consulta.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

function FooterSection() {
    const navigate = useNavigate();
    return (
        <div className="relative w-full px-4 pb-4">
            <div className="bg-[rgb(57,115,225)] rounded-[20px] p-6 md:p-16 flex flex-col gap-12 text-white relative overflow-hidden items-center text-center">

                {/* Logo */}
                <div className="w-[80px] h-[80px]">
                    <img src={imgLogoIcon} alt="Melhor Saúde Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>

                {/* Description */}
                <div className="max-w-[900px]">
                    <p className="font-inter font-normal text-[16px] md:text-[18px] leading-[28px] md:leading-[32px] text-white/90">
                        A plataforma líder em bem-estar corporativo em Moçambique. Conectamos empresas, colaboradores e especialistas em saúde para promover ambientes organizacionais mais fortes, humanos e produtivos.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-16 font-dm-sans font-medium text-[18px] md:text-[20px]">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white/80 transition-colors bg-transparent border-none cursor-pointer text-white">Início</button>
                    <button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white/80 transition-colors bg-transparent border-none cursor-pointer text-white">Sobre Nós</button>
                    <a href="#" className="hover:text-white/80 transition-colors text-white">Termos</a>
                    <a href="#" className="hover:text-white/80 transition-colors text-white">Suporte</a>
                    <button onClick={() => navigate('/login')} className="hover:text-white/80 transition-colors bg-transparent border-none cursor-pointer text-white">Acesso</button>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-16 items-center text-[16px] md:text-[18px] font-inter font-normal text-white/80">
                    <div className="flex items-center gap-3">
                        <Mail className="w-6 h-6" />
                        <span>contacto@melhorsaude.co.mz</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-6 h-6" />
                        <span>+258 21 123 456</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6" />
                        <span>Maputo, Moçambique</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reconstructed Main Component
export default function MelhorSaudeLanding() {
    const [activePillarIndex, setActivePillarIndex] = useState(0);

    const scrollToPillars = (index: number) => {
        setActivePillarIndex(index);
        const element = document.getElementById('pillars-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAbout = () => {
        const element = document.getElementById('about-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col gap-16 pb-0 bg-white">
            <Navbar onPillarClick={scrollToPillars} onAboutClick={scrollToAbout} />

            <HeroSection onPillarClick={scrollToPillars} onAboutClick={scrollToAbout} />

            <AboutSection />

            <div className="px-8 mt-12">
                <IssuesSection />
            </div>

            <div className="px-8" id="pillars-section">
                <ServicesSection activeIndex={activePillarIndex} setActiveIndex={setActivePillarIndex} />
            </div>

            <div className="px-8 mt-12">
                <HowItWorksSection />
            </div>

            <TestimonialSection />

            <FaqSection />

            <CtaSection />

            <FooterSection />
        </div>
    );
}
