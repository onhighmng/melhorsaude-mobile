import React, { useState, useEffect } from "react";
// DISABLED: import from 'motion/react';
import clsx from "clsx";
import { cn } from "../app/components/ui/utils";
import { Navbar } from "../app/components/Navbar";
// DISABLED: import from 'react-router-dom';
import LinearCard from "../app/components/ui/linear-card";
import Frame15 from "./Frame1618874410";
import Frame1618874411 from "./Frame1618874411";
import Frame1618874418 from "./Frame1618874418";
import Frame1618874419 from "./Frame1618874419";
import svgPathsArrow from "./svg-7ntp90zmoq";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../app/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../app/components/ui/accordion";
const imgFrame = "/landing-assets/0584b8e19c582ae24e40b69ae29fdade60e2cdf3.png";
const imgDot = "/landing-assets/fd45c48d1867c54693ea96621a85b8eefdbe99de.png";
const searchIconImage = "/landing-assets/a2e6a1084dce9e6fee1f79e3e81c5afeadf2c5f9.png";
import imgContents from 'figma:asset/efe9deab042ed9b538bfaf0161beba02c075eb70.png';
const imgIconOriginal = "/landing-assets/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgItem1 = "/landing-assets/aa46251bfd5c0f2a063122abb0c4056cfd0caa09.png";
const imgItem2 = "/landing-assets/d90a84cb609f1b610ce6ce9223e6f91aae146194.png";
const imgItem3 = "/landing-assets/1bb31e908950e682afd9c82e036c3558a46fb19d.png";
const imgItem4 = "/landing-assets/320a6305ad5388a25cf18b0b0d77e82e5c57e018.png";
const imgIcon = "/landing-assets/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1 = "/landing-assets/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2 = "/landing-assets/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
const imgEllipse = "/landing-assets/918aa089c01a40e33a181fc5b6a70198ce80b028.png";
const imgWireHead = "/landing-assets/771937d4d613e82b8d8ce230a7f290e0da67075c.png";
const imgCalculator3D = "/landing-assets/3559bd16503c926eb29cb91a68662da99ccd6b1b.png";
const imgKettlebell3D = "/landing-assets/c509d36c066d343a8dd578a3c975bb34412de133.png";
const imgLawPillar = "/landing-assets/6668ad1c924d811bee27f10eb4f9b481c4592094.png";
const imgRetencaoTalentos = "/landing-assets/5a12b74403562375d2345dbcd060617fd6eb7c77.png";
const imgProtecao = "/landing-assets/5abab011684deff1f43781fd6103dada3e7287a8.png";
const imgProdutividade = "/landing-assets/cc1d9c271d559f0c19546d47488968dc0171943e.png";
const imgBemEstar = "/landing-assets/648a83f573043b0833727febce0c7d60a6e7d54a.png";
const imgInsights = "/landing-assets/37b3cac7fb93ac91d5c9950801e9ca412fe6caab.png";
const imgMentalHealthChild = "/landing-assets/ec2b03abb62fef16b1e5efa59d7b63de8aee25d9.png";
const imgPhysicalWellness = "/landing-assets/98edb81a89a0b8cbbab23b1ff6ea7a6db6d681c6.png";
const imgMelhorSaudeLogo = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";
const imgVideoThumbnail = "/landing-assets/105ade7219701cc26c830d1b632e6cdd9c0e0300.png";
const imgNewLogo = "/landing-assets/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Users, Shield, TrendingUp, Heart, BarChart3, Search, Calendar, Video, Layers, LogIn, CheckCircle } from "lucide-react";
import { AnimatedFeatureCard } from "../app/components/ui/animated-feature-card";
import { FeatureWithImages } from "../app/components/ui/feature-sections";
import TimeLine_01 from "../app/components/ui/release-time-line";
import { VideoPlayer } from "../app/components/ui/video-thumbnail-player";

// Updated Pillar Images
const imgBrain = imgMentalHealthChild;
const imgWeights = imgPhysicalWellness;
const imgCalculator = "https://images.unsplash.com/photo-1707779491435-000c45820db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGludmVzdG1lbnQlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc2NTgyMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgLaw = imgLawPillar;

const imgAboutIcon1 = "figma:asset/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgAboutIcon2 = "figma:asset/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgAboutIcon3 = "figma:asset/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";

const svgAboutPaths = {
  p315deb40: "M40 32L28 38.9282V25.0718L40 32Z",
  p7d025f0: "M40.3536 4.03553C40.5488 3.84027 40.5488 3.52369 40.3536 3.32843L37.1716 0.146447C36.9763 -0.0488154 36.6597 -0.0488154 36.4645 0.146447C36.2692 0.341709 36.2692 0.658291 36.4645 0.853553L39.2929 3.68198L36.4645 6.51041C36.2692 6.70567 36.2692 7.02225 36.4645 7.21751C36.6597 7.41278 36.9763 7.41278 37.1716 7.21751L40.3536 4.03553ZM0 3.68198V4.18198H40V3.68198V3.18198H0V3.68198Z",
};

const imgItem2_Old = "https://images.unsplash.com/photo-1653656120715-e863e88db216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYmxhY2slMjBjb3VwbGUlMjBqb2dnaW5nJTIwb3IlMjBleGVyY2lzaW5nJTIwb3V0ZG9vcnN8ZW58MXx8fHwxNzY1ODE3NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgItem3_Old = "https://images.unsplash.com/photo-1512182634620-74f0b656d992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwbG9va2luZyUyMGF0JTIwaG9yaXpvbiUyMHZpc2lvbmFyeXxlbnwxfHx8fDE3NjU4MTc0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgItem4_Old = "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFuZHMlMjBob2xkaW5nJTIwdG9nZXRoZXIlMjBzdXBwb3J0fGVufDF8fHx8MTc2NTgxNzQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgContent = "https://images.unsplash.com/photo-1624555130296-e551faf8969b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const imgTitle = "https://images.unsplash.com/photo-1523001021477-53f37adf2df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const imgPhoto = "https://images.unsplash.com/photo-1559154352-06e29e1e11aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// Mock Helpers (Original)
function BackgroundImage({ text, text1, additionalClassNames = "" }: any) {
  return <div className={`font-['DM_Sans:Bold',sans-serif] font-bold ${additionalClassNames}`}>{text} {text1}</div>;
}
function ButtonBackgroundImageAndText2({ text }: any) {
  return <div className="bg-[rgb(57,115,225)] text-white px-1 py-1 rounded-full font-['Inter:Medium',sans-serif] text-sm">{text}</div>;
}
function NumberBackgroundImageAndText1({ text }: any) {
  return <div className="w-12 h-12 rounded-full bg-[rgb(57,115,225)] text-white flex items-center justify-center text-xl font-bold font-['DM_Sans:Bold',sans-serif]">{text}</div>;
}
function TextBackgroundImage1({ text, text1 }: any) {
  return <div><div className="font-bold text-lg font-['DM_Sans:Bold',sans-serif]">{text}</div><div className="font-['Inter:Regular',sans-serif] text-gray-600">{text1}</div></div>;
}
function TextBackgroundImageAndText({ text }: { text: string }) {
  return <div className="font-['DM_Sans:Bold',sans-serif] font-bold text-[24px] text-white z-10">{text}</div>;
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
    subtitle: <span>Apoio psicológico e emocional <strong className="font-bold">com especialistas disponíveis 24/7</strong></span>,
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
    subtitle: <span>Saúde física e <strong className="font-bold">estilo de vida</strong></span>,
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
    subtitle: <span>Orientação prática para <strong className="font-bold">gestão de dinheiro</strong></span>,
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
    subtitle: <span>Apoio legal preventivo e <strong className="font-bold">consultoria</strong></span>,
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
    fullText: <span>Promovemos o bem-estar integral dos colaboradores através de soluções digitais seguras, personalizadas e sustentadas nos <strong className="font-bold">quatro pilares da saúde: psicológica, jurídica, financeira e física.</strong> Nosso objetivo é ajudar as empresas a criar ambientes de trabalho saudáveis, positivos e sustentáveis, onde todos possam prosperar com equilíbrio e autonomia.</span>,
    image: imgItem2_Old,
    button: <ButtonBackgroundImage />
  },
  {
    id: "vision",
    title: "Nossa Visão",
    snippet: "Queremos ser a principal referência nacional em soluções de bem-estar corporativo em Moçambique.",
    fullText: <span>Queremos ser a principal referência nacional em soluções de bem-estar corporativo. Trabalhamos para construir uma <strong className="font-bold">nova cultura organizacional em Moçambique</strong> — mais consciente, humana e comprometida com o cuidado completo e contínuo dos colaboradores em todas as áreas essenciais da sua vida.</span>,
    image: imgItem3_Old,
    button: <Button4 />
  },
  {
    id: "values",
    title: "Nossos Valores",
    snippet: "Agimos com ética, transparência e foco humano, valorizando a confidencialidade e a escuta ativa.",
    fullText: (
      <ul className="list-disc pl-5 space-y-2">
        <li><strong className="font-bold">Ética e transparência</strong></li>
        <li><strong className="font-bold">Foco humano</strong></li>
        <li><strong className="font-bold">Confidencialidade absoluta</strong></li>
        <li><strong className="font-bold">Uso responsável da tecnologia</strong></li>
        <li><strong className="font-bold">Escuta ativa</strong></li>
        <li><strong className="font-bold">Soluções mensuráveis e centradas nas pessoas</strong></li>
      </ul>
    ),
    image: imgItem4_Old,
    button: <ButtonBackgroundImage />
  }
];

// Data for "Porquê a Melhor Saúde?" animated feature cards
const whyMelhorSaudeFeatures = [
  {
    index: "001",
    tag: "RETENÇÃO",
    title: <span>Colaboradores <strong className="font-bold">satisfeitos</strong>, permanecem mais tempo na empresa.</span>,
    imageSrc: imgRetencaoTalentos,
    color: "blue" as const,
  },
  {
    index: "002",
    tag: "PROTEÇÃO",
    title: <span>Previna conflitos com <strong className="font-bold">apoio jurídico preventivo.</strong></span>,
    imageSrc: imgProtecao,
    color: "purple" as const,
  },
  {
    index: "003",
    tag: "PRODUTIVIDADE",
    title: <span>Equipas <strong className="font-bold">saudáveis</strong> produzem mais e melhor.</span>,
    imageSrc: imgProdutividade,
    color: "green" as const,
  },
  {
    index: "004",
    tag: "BEM-ESTAR",
    title: <span>Identifique sinais de <strong className="font-bold">burnout</strong> antes que afetem o desempenho.</span>,
    imageSrc: imgBemEstar,
    color: "red" as const,
  },
  {
    index: "005",
    tag: "PERCEÇÕES",
    title: <span>Tome decisões com base em <strong className="font-bold">dados reais e atualizados.</strong></span>,
    imageSrc: imgInsights,
    color: "indigo" as const,
  },
];

// --- HERO SECTION ---

function HeroSection({ onPillarClick, onAboutClick }: { onPillarClick: (index: number) => void; onAboutClick: () => void }) {
  return (
    <div className="relative w-full bg-white">
      {/* Empty - Ready for new components */}
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
                      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[32px] md:leading-[40px] text-[24px] md:text-[32px] text-white">
                        {pillar.title}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[14px] md:text-[16px] text-white/80">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <p className="font-['DM_Sans:Bold',sans-serif] font-bold text-[14px] uppercase tracking-wider text-white/60">
                        {pillar.specialistsTitle}
                      </p>
                      <ul className="flex flex-col gap-1 list-none pl-0">
                        {pillar.specialists.map((spec, i) => (
                          <li key={i} className="font-['Inter:Regular',sans-serif] text-[14px] md:text-[16px] text-white flex items-center gap-2">
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
                    className="flex items-center justify-between py-2 border-b border-white/20 cursor-pointer hover:opacity-100 transition-opacity"
                  >
                    <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[32px] text-white/60 hover:text-white/80 transition-colors text-[20px] md:text-[24px]">
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

function MaterialSymbolsArrowInsertRounded() {
  return (
    <div className="relative size-[20px]" data-name="material-symbols:arrow-insert-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="material-symbols:arrow-insert-rounded">
          <path d={svgPathsArrow.pb655fc0} fill="white" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AboutSection() {
  const routerNavigate = useNavigate();

  return (
    <div id="about-section" className="relative w-full pt-32 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-16 pb-4 px-4 bg-white flex items-center justify-center">
      <div className="relative w-full max-w-[655px]">
        <div className="content-stretch flex flex-col gap-[32px] items-center justify-center w-full">
          {/* Badge */}
          <div className="bg-[#d8ddff] content-stretch flex items-center justify-center px-[16px] py-[6px] rounded-[1000px] shrink-0">
            <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic text-[#003b8d] text-[18px] text-nowrap tracking-[-0.9px]">
              Cuidar das pessoas , transforma empresas
            </p>
          </div>

          {/* Main Content */}
          <div className="content-stretch flex flex-col gap-[16px] items-center w-full">
            {/* Heading */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[1.1] not-italic text-[#020218] text-[48px] md:text-[64px] text-center tracking-[-1.28px] w-full">
                <p className="leading-[1.1]">Ajude a equipa sentir-se segura, ouvida e valorizada.</p>
              </div>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col font-['Helvetica_Neue:Regular',sans-serif] justify-center leading-[1.5] not-italic text-[#7f8084] text-[18px] md:text-[20px] text-center tracking-[0.22px] w-full max-w-4xl">
              <p>Acesso imediato a especialistas em saúde mental, física, financeira e jurídica, <span className="font-bold text-[#020218]">disponíveis 24 horas por dia, 7 dias por semana.</span></p>
            </div>
          </div>

          {/* Button CTA */}
          <div className="content-stretch flex items-center justify-center w-full">
            <button
              onClick={() => routerNavigate('/register')}
              className="bg-[#020218] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[15px] rounded-[1000px] shrink-0 hover:opacity-90 transition-opacity"
            >
              <span className="font-['Helvetica_Neue:Regular',sans-serif] leading-[1.5] not-italic text-[16px] text-center text-nowrap text-white">
                Iniciar Sessão
              </span>
              <div className="flex items-center justify-center shrink-0">
                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                  <MaterialSymbolsArrowInsertRounded />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- FEATURES SHOWCASE SECTION ---

function FeaturesShowcaseSection() {
  return (
    <div className="relative w-full pt-8 pb-0 px-4 md:px-8 flex items-center justify-center bg-white">
      <div className="w-full max-w-[1920px] flex items-center justify-center">
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[480px] lg:h-[550px] xl:h-[734.558px] max-w-[1600px] flex items-center justify-center">
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function TextBadge() {
  return (
    <div className="content-stretch flex flex-col gap-12 lg:gap-[276px] items-start relative shrink-0 w-full lg:w-auto" data-name="Text + Badge">
      <ButtonBackgroundImageAndText2 text="# Pilares" />
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#222] bg-[rgba(255,255,255,0)]" data-name="Text">
        <BackgroundImage text="Os Nossos" text1="Pilares" additionalClassNames="leading-[48px] text-[40px] md:leading-[64px] md:text-[56px] text-white" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] md:leading-[30px] not-italic opacity-50 relative shrink-0 text-base md:text-[20px] w-full lg:w-[660px] text-white">O nosso programa é baseado em quatro pilares essenciais:</p>
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
                <p className="font-['Inter:Regular',sans-serif] text-white/90 text-[16px] leading-[24px] line-clamp-2">
                  {item.snippet}
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white text-[#222]">
            <DialogHeader>
              <DialogTitle className="text-[32px] font-bold text-[#222] mb-4 font-['DM_Sans:Bold',sans-serif]">{item.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {item.snippet}
              </DialogDescription>
            </DialogHeader>
            <div className="font-['Inter:Regular',sans-serif] text-[18px] leading-[28px] text-[#444]">
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
    <div className="content-stretch flex flex-col gap-0 md:gap-[24px] items-center relative shrink-0 w-full mt-16 md:mt-24" data-name="Title + Badge">
      <ButtonBackgroundImageAndText2 text="# Identidade" />
      <div className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1] md:leading-[64px] min-w-full relative shrink-0 text-[#222] text-[40px] md:text-[56px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Nossa</p>
        <p className="mb-0">Identidade</p>
      </div>
    </div>
  );
}

function IssuesSection() {
  return (
    <div className="relative shrink-0 w-full py-0" data-name="Issues Section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-0 md:gap-[24px] items-center px-4 md:px-[50px] py-0 relative w-full">
          <TitleBadge />
          <Items2 />
        </div>
      </div>
    </div>
  );
}


// --- HOW IT WORKS SECTION (Preserved) ---

function HowItWorksSection() {
  const howItWorksImage1 = "https://images.unsplash.com/photo-1613759612065-d5971d32ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2Nzk1MDc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const howItWorksImage2 = "https://images.unsplash.com/photo-1637979909766-ccf55518a928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3b3JraW5nJTIwbGFwdG9wJTIwZGVza3xlbnwxfHx8fDE3NjgwNjE4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const howItWorksFeatures = [
    {
      icon: <LogIn className="w-7 h-7 stroke-[#3973E1]" strokeWidth={2} />,
      iconBgColor: "bg-blue-100",
      title: "Registo de humor diário",
      description: <span>O colaborador entra com o código da sua empresa e regista o seu <strong className="font-bold">estado emocional</strong> em poucos segundos.</span>
    },
    {
      icon: <Search className="w-7 h-7 stroke-[#3973E1]" strokeWidth={2} />,
      iconBgColor: "bg-blue-100",
      title: "Escolha o Apoio Que Precisa",
      description: <span>Pode falar com <strong className="font-bold">especialistas qualificados</strong>, explore recursos e aceder a conteúdos, ou conversar com a nossa IA treinada pelos melhores do mundo — disponível 24/7.</span>
    },
    {
      icon: <CheckCircle className="w-7 h-7 stroke-[#3973E1]" strokeWidth={2} />,
      iconBgColor: "bg-blue-100",
      title: "Sessões Confidenciais",
      description: <span>Cada sessão gera clareza, orientação prática e um plano de ação concreto. Todo o apoio é <strong className="font-bold">confidencial</strong> e focado no seu bem-estar integral.</span>
    }
  ];

  return (
    <div className="relative shrink-0 w-full pt-0 pb-8 px-4 md:px-8 bg-gradient-to-b from-blue-50/30 to-white" data-name="How It Works Section" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ButtonBackgroundImageAndText2 text="# Simples, Rápido e Privado" />
          <h1 className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.1] text-[#222] text-[40px] md:text-[56px] mt-6">
            Como Funciona
          </h1>
        </div>

        {/* Feature with 2 Images Layout */}
        <FeatureWithImages
          image1Src={howItWorksImage1}
          image2Src={howItWorksImage2}
          imageAlt="Como Funciona - Melhor Saúde"
          videoUrl="/landing-assets/how-it-works-video.mp4"
          features={howItWorksFeatures}
        />
      </div>
    </div>
  );
}

// --- RESTORED SECTIONS (Matches LandingPage.tsx visually but in Flexbox) ---

function TestimonialButton({ text = "# Testimonials" }: { text?: string }) {
  return (
    <div className="bg-[rgb(57,115,225)] flex items-center justify-center px-[24px] py-[6px] rounded-[50px]" data-name="Button 5">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] md:text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      title: "Colaboradores mais saudáveis, empresas mais fortes",
      points: "• Retenção de talentos • Proteção da saúde mental • Maior produtividade • Bem-estar corporativo • Insights em tempo real"
    },
    {
      title: "Transforme o bem-estar da sua equipa",
      points: "• Acompanhamento personalizado • Suporte profissional • Resultados mensuráveis • Cultura de saúde • Equipas mais felizes"
    },
    {
      title: "Invista no que realmente importa",
      points: "• ROI comprovado • Redução de absentismo • Clima organizacional • Engagement elevado • Prevenção de burnout"
    },
    {
      title: "Uma plataforma completa para o sucesso",
      points: "• IA avançada • Recursos ilimitados • Profissionais certificados • Dashboard intuitivo • Suporte dedicado"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Section removed
    <></>
  );
}

function DotBackgroundImage({ additionalClassNames = "" }: { additionalClassNames?: string }) {
  return (
    <div className={clsx("absolute size-[40px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Dot">
          <circle cx="20" cy="20" fill="white" id="Ellipse" opacity="0.25" r="20" />
          <circle cx="20" cy="20" fill="white" id="Ellipse_2" opacity="0.5" r="14" />
          <circle cx="20" cy="20" fill="white" id="Ellipse_3" r="6" />
        </g>
      </svg>
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
    <div className="relative w-full py-20 px-4 md:px-8 flex justify-center bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
      <div className="w-full px-4 md:px-16 flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left: Title */}
        <div className="flex flex-col gap-8 w-full md:w-1/3">
          <ButtonBackgroundImageAndText2 text="# FAQ" />
          <div className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.1] text-[#222] text-[40px] md:text-[56px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="mb-0">Perguntas</p>
            <p>Frequentes</p>
          </div>
          <p className="font-['Inter:Regular',sans-serif] text-[16px] md:text-[18px] text-[#666] leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre os nossos serviços e como podemos ajudar você.
          </p>
          <button
            onClick={() => window.location.href = 'mailto:contacto@melhorsaude.co.mz'}
            className="w-fit px-8 py-3 rounded-[50px] bg-[rgb(57,115,225)] text-white font-['Inter:Medium',sans-serif] hover:bg-black transition-colors"
          >
            Falar com Suporte
          </button>
        </div>

        {/* Right: Accordion */}
        <div className="w-full md:w-2/3">
          <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
            <AccordionItem value="item-1" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                O que é a Melhor Saúde e como posso beneficiar dela?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                <span>A Melhor Saúde é Uma plataforma de apoio aconselhamento e orientação personalizada focada no bem-estar integral. Oferecemos <strong className="font-bold">acesso direto a profissionais especializados</strong> nas áreas em saúde mental, física, assistgência financeira e jurídica, com acompanhamento humano e contínuo.</span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                As minhas sessões e dados são confidenciais?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                <span><strong className="font-bold">Sim.</strong> A empresa recebe apenas dados estatísticos anónimos Todas as sessões são protegidas por sigilo profissional. A empresa recebe apenas relatórios estatísticos anónimos, sem acesso a conversas ou dados pessoais.</span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                Como funcionam os créditos de consulta?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                <span>O plano inclui um número de <strong className="font-bold">créditos mensais renováveis</strong> para marcação de sessão.</span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                Posso utilizar a plataforma para membros da minha família?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                <span>O acesso é individual, mas as orientações do especialista ou RH podem <strong className="font-bold">incluir familiares diretos.</strong></span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <div className="relative w-full px-4 pb-4" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 600px' }}>
      <div className="bg-[rgb(57,115,225)] rounded-[20px] p-6 md:p-16 flex flex-col gap-12 text-white relative overflow-hidden items-center text-center">

        {/* Logo */}
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center p-4">
          <img src={imgNewLogo} alt="Melhor Saúde Logo" className="w-full h-full object-contain" />
        </div>

        {/* Description */}
        <div className="max-w-[900px]">
          <p className="font-['Inter:Regular',sans-serif] text-[16px] md:text-[18px] leading-[28px] md:leading-[32px] text-white/90">
            A plataforma líder em bem-estar corporativo em Moçambique. Conectamos empresas, colaboradores e especialistas em saúde para promover ambientes organizacionais mais fortes, humanos e produtivos.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-16 font-['DM_Sans:Medium',sans-serif] text-[18px] md:text-[20px]">
          <a href="#" className="hover:text-white/80 transition-colors">Início</a>
          <a href="#" className="hover:text-white/80 transition-colors">Sobre Nós</a>
          <a href="#" className="hover:text-white/80 transition-colors">Termos</a>
          <a href="#" className="hover:text-white/80 transition-colors">Suporte</a>
          <a href="#" className="hover:text-white/80 transition-colors">Acesso</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-16 items-center text-[16px] md:text-[18px] font-['Inter:Regular',sans-serif] text-white/80">
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

        {/* Discreet legal links (for SEO/compliance) */}
        <div className="flex flex-wrap justify-center gap-4 text-[12px] md:text-[13px] font-['Inter:Regular',sans-serif] text-white/60">
          <a
            href="/privacy"
            className="hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
          >
            Privacidade
          </a>
          <span className="text-white/40">•</span>
          <a
            href="/terms"
            className="hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
          >
            Termos
          </a>
        </div>
      </div>
    </div>
  );
}

// Reconstructed Main Component
export default function Frame1_2_405() {
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
    <div className="relative flex flex-col gap-16 pb-0 bg-white">
      <Navbar onPillarClick={scrollToPillars} onAboutClick={scrollToAbout} />

      <div className="relative flex flex-col gap-16 pb-0 bg-white">
        <HeroSection onPillarClick={scrollToPillars} onAboutClick={scrollToAbout} />

        <AboutSection />

        <FeaturesShowcaseSection />

        <div className="w-full flex items-center justify-center pt-0 pb-12 relative">
          <div className="w-full max-w-[1440px]">
            <Frame1618874411 />
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full flex items-center justify-center py-16 px-4 md:px-8 bg-white">
          <div className="w-full max-w-5xl">
            <VideoPlayer
              thumbnailUrl={imgVideoThumbnail}
              videoUrl="/landing-assets/melhor-saude-video-1.mp4"
              title="Conheça a Melhor Saúde"
              description="Descubra como transformamos o bem-estar corporativo em Moçambique"
              aspectRatio="16/9"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="px-8 relative" id="pillars-section">
          {/* Background Logo - Left */}
          <div className="absolute left-[-200px] top-[20%] w-[600px] h-[600px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] opacity-[0.08] pointer-events-none z-0">
            <img
              src={imgMelhorSaudeLogo}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Background Logo - Right */}
          <div className="absolute right-[-200px] top-[60%] w-[600px] h-[600px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] opacity-[0.08] pointer-events-none z-0">
            <img
              src={imgMelhorSaudeLogo}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="py-12 relative z-10">
            <div className="flex flex-col gap-8 items-center mb-12">
              <ButtonBackgroundImageAndText2 text="# Pilares" />
              <div className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.1] text-[#222] text-[40px] md:text-[56px] text-center">
                <p className="mb-0">Os Nossos</p>
                <p>Pilares</p>
              </div>
              <p className="font-['Inter:Regular',sans-serif] text-[16px] md:text-[18px] text-[#666] leading-relaxed text-center max-w-3xl">
                Promovemos o bem-estar integral sustentado nos quatro pilares da saúde: mental, física, financeira e jurídica.
              </p>
            </div>
            <LinearCard
              items={pillarsData.map(pillar => ({
                id: pillar.id,
                url: { src: pillar.image },
                title: pillar.title,
                subtitle: pillar.subtitle,
                specialists: pillar.specialists,
                specialistsTitle: pillar.specialistsTitle
              }))}
            />
          </div>
        </div>

        {/* Porquê a Melhor Saúde Section */}
        <div className="relative px-0 md:px-2 py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/30">
          <div className="relative max-w-[1600px] mx-auto">
            <TimeLine_01
              title="Porquê a Melhor Saúde?"
              description="Descubra como transformamos o bem-estar corporativo através de soluções comprovadas e orientadas por dados."
              entries={whyMelhorSaudeFeatures.map((feature) => ({
                icon: feature.tag === "RETENÇÃO" ? Users :
                  feature.tag === "PROTEÇÃO" ? Shield :
                    feature.tag === "PRODUTIVIDADE" ? TrendingUp :
                      feature.tag === "BEM-ESTAR" ? Heart :
                        BarChart3,
                title: feature.tag,
                subtitle: `#${feature.index}`,
                description: feature.title,
                image: feature.imageSrc,
              }))}
            />
          </div>
        </div>

        <HowItWorksSection />

        {/* Team Insights Section - A Dor Escondida da Sua Equipa, Revelada */}
        <div className="w-full py-4 md:py-6 px-4 md:px-8 bg-gradient-to-b from-white via-purple-50/10 to-white">
          <div className="w-full max-w-[1440px] mx-auto">
            <Frame1618874418 />
          </div>
        </div>

        {/* IA Treinada Pelos Melhores do Mundo Section */}
        <div className="w-full max-w-[1440px] -mb-16 pb-0 mx-auto">
          <Frame1618874419 />
        </div>

        <IssuesSection />

        <FaqSection />

        <FooterSection />
      </div>
    </div>
  );
}