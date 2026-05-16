import svgPaths from "./svg-poue3xyvsz";
import svgPathsNew from "./svg-nfai9gnzgt";
import clsx from "clsx";
import { useState, useEffect } from "react";
// DISABLED: import from 'motion/react';
import { useNavigation } from "../app/NavigationContext";
import { Navbar } from "../app/components/Navbar";
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

// Images & Assets
const imgFrame = "https://images.unsplash.com/photo-1573495804664-b1c0849525af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwcHN5Y2hvbG9naXN0JTIwdGFsa2luZyUyMHRvJTIwcGF0aWVudCUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NjU4MTc0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgEllipseOriginal = "/assets/figma/0584b8e19c582ae24e40b69ae29fdade60e2cdf3.png";
const imgDot = "/assets/figma/fd45c48d1867c54693ea96621a85b8eefdbe99de.png";
import imgContents from 'figma:asset/efe9deab042ed9b538bfaf0161beba02c075eb70.png';
const imgIconOriginal = "/assets/figma/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1Original = "/assets/figma/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2Original = "/assets/figma/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
const imgLogoIcon = "/assets/figma/dca1667b7a13b537085ad45b6ab92b57b127771e.png";
const imgLogoText = "/assets/figma/35455f539b96cad8ef1d386a642da71621949352.png";

// New Assets from LandingPage.tsx
const imgItem1 = "/assets/figma/aa46251bfd5c0f2a063122abb0c4056cfd0caa09.png";
const imgItem2 = "/assets/figma/d90a84cb609f1b610ce6ce9223e6f91aae146194.png";
const imgItem3 = "/assets/figma/1bb31e908950e682afd9c82e036c3558a46fb19d.png";
const imgItem4 = "/assets/figma/320a6305ad5388a25cf18b0b0d77e82e5c57e018.png";
const imgIcon = "/assets/figma/8993bd4f2cb3c162819048efb6a9e6e8a8439eab.png";
const imgIcon1 = "/assets/figma/e749559ba0c2aaa6e3743910711b308435d1c40c.png";
const imgIcon2 = "/assets/figma/7010cb5aa76ce0aebe9e366e523db81e0949a218.png";
const imgEllipse = "/assets/figma/918aa089c01a40e33a181fc5b6a70198ce80b028.png";

// New Background Images
const imgWireHead = "/assets/figma/771937d4d613e82b8d8ce230a7f290e0da67075c.png";
const imgCalculator3D = "/assets/figma/3559bd16503c926eb29cb91a68662da99ccd6b1b.png";
const imgKettlebell3D = "/assets/figma/c509d36c066d343a8dd578a3c975bb34412de133.png";
const imgLawPillar = "/assets/figma/6668ad1c924d811bee27f10eb4f9b481c4592094.png";

// Updated Pillar Images
const imgBrain = "https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBjb3Vuc2VsaW5nJTIwdGhlcmFweSUyMHNlc3Npb258ZW58MXx8fHwxNzY1ODIwNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgWeights = "https://images.unsplash.com/photo-1687184144779-51a366352458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGZpdG5lc3MlMjBneW0lMjB3b3Jrb3V0fGVufDF8fHx8MTc2NTgyMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgCalculator = "https://images.unsplash.com/photo-1707779491435-000c45820db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGludmVzdG1lbnQlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc2NTgyMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgLaw = imgLawPillar;

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, ArrowLeft, Shield, Smartphone, Users } from "lucide-react";

// ... (existing imports)

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
      icon: Smartphone,
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
              <card.icon
                className={clsx(
                  "w-6 h-6 transition-all duration-500",
                  isActive ? "text-white" : "text-[#3973E1]"
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-['Inter:Bold',sans-serif] text-lg">
                {card.title}
              </h3>
              <p
                className={clsx(
                  "font-['Inter:Regular',sans-serif] text-sm transition-colors duration-500",
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
  const imgAbout = "https://images.unsplash.com/photo-1576267423048-15c0040fec78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWxsbmVzcyUyMGRpdmVyc2UlMjB0ZWFtJTIwaGFwcHklMjBvZmZpY2V8ZW58MXx8fHwxNzY1ODIyNjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div id="about-section" className="relative w-full py-20 px-4 md:px-12 flex justify-center bg-white">
      <div className="w-full px-4 md:px-16 flex flex-col lg:flex-row gap-16 items-center">

        {/* Left: Image Composition */}
        <div className="relative w-full lg:w-1/2 h-[300px] md:h-[600px]">
          <div className="absolute inset-0 rounded-[20px] overflow-hidden">
            <img src={imgAbout} className="w-full h-full object-cover" alt="Sobre Nós" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/50 w-20 h-20 flex items-center justify-center rounded-full text-white cursor-pointer hover:bg-white/30 transition-colors z-20">
            <svg width="24" height="28" viewBox="0 0 20 24" fill="none" className="ml-1">
              <path d="M20 12L0 23.5453V0.454701L20 12Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div className="font-['DM_Sans:Medium',sans-serif] text-[40px] md:text-[56px] leading-[1.1] text-[rgb(57,115,225)]">
              Sobre Nós
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-[#666] text-justify">
              A Melhor Saúde é a plataforma líder em bem-estar corporativo em Moçambique, criada para transformar a forma como as empresas cuidam das suas pessoas. Nascemos da necessidade de soluções completas, acessíveis e eficazes, que promovam ambientes organizacionais mais fortes, humanos e produtivos. Unimos tecnologia, confiança profissional e uma abordagem centrada nas pessoas para conectar empresas, colaboradores e especialistas em saúde e bem-estar. Atuamos com rigor ético, valorizando a confidencialidade e o sigilo profissional em todos os atendimentos, e oferecemos um cuidado humanizado, estratégico e digital que redefine a experiência de bem-estar no meio corporativo.
            </p>
          </div>

          {/* Cards Row */}
          <AnimatedCards />
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] md:leading-[30px] not-italic opacity-50 relative shrink-0 text-base md:text-[20px] w-full lg:w-[660px] text-white">Promovemos o bem-estar integral sustentado nos quatro pilares da saúde: mental, física, financeira e jurídica.</p>
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
    <div className="content-stretch flex flex-col gap-6 md:gap-[24px] items-center relative shrink-0 w-full" data-name="Title + Badge">
      <ButtonBackgroundImageAndText2 text="# Identidade" />
      <div className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[48px] md:leading-[64px] min-w-full relative shrink-0 text-[#222] text-[40px] md:text-[56px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
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


// --- HOW IT WORKS SECTION (Preserved) ---

function Title2() {
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

function Items3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] md:gap-[40px] items-start relative shrink-0 w-full lg:w-auto" data-name="Items">
      <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 1">
        <NumberBackgroundImageAndText1 text="1" />
        <TextBackgroundImage1 text="Escolha o pilar" text1="Selecione o pilar ideal para as suas necessidades específicas." />
      </div>
      <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 2">
        <NumberBackgroundImageAndText1 text="2" />
        <TextBackgroundImage1 text="Agende" text1="Marque o horário mais conveniente para a sua sessão online." />
      </div>
      <div className="content-stretch flex flex-col md:flex-row gap-[20px] md:gap-[44px] items-start md:items-center relative shrink-0 w-full lg:w-[785px]" data-name="Item 3">
        <NumberBackgroundImageAndText1 text="3" />
        <TextBackgroundImage1 text="Realize" text1="Realize a sua consulta com segurança e confidencialidade." />
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

// --- RESTORED SECTIONS (Matches LandingPage.tsx visually but in Flexbox) ---

function TestimonialButton({ text = "# Testimonials" }: { text?: string }) {
  return (
    <div className="bg-[rgb(57,115,225)] flex items-center justify-center px-[24px] py-[6px] rounded-[50px]" data-name="Button 5">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] md:text-[16px] text-nowrap text-white">{text}</p>
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
  const colors = ["#3973E1", "#E13973", "#73E139", "#39E1A6"];
  const currentColor = colors[currentIndex % colors.length];

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
            <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.2] text-[#222] text-[32px] md:text-[56px] text-center w-full">
              "{current.title}"
            </p>
            <div className="flex flex-col items-center gap-2">
              {current.points.split('•').map((point, i) => (
                <p key={i} className="font-['DM_Sans:Medium',sans-serif] font-medium text-[16px] md:text-[24px] leading-relaxed text-[#222] text-center opacity-60">
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
    <div className="relative w-full py-20 px-4 md:px-8 flex justify-center bg-white">
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
          <button className="w-fit px-8 py-3 rounded-[50px] bg-[rgb(57,115,225)] text-white font-['Inter:Medium',sans-serif] hover:bg-black transition-colors">
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
                A Melhor Saúde é uma plataforma focada no aconselhamento e orientação personalizada para o seu bem-estar. Através de uma abordagem integrada, oferecemos acesso direto a profissionais especializados em Saúde Mental, Saúde Física, Gestão Financeira e Apoio Jurídico. O nosso objetivo não é apenas fornecer ferramentas, mas sim garantir um acompanhamento humano e próximo para o ajudar a superar desafios e alcançar os seus objetivos pessoais e profissionais.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                As minhas sessões e dados são confidenciais?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                Sim, totalmente. A confidencialidade é a base da nossa relação consigo. Todas as sessões de aconselhamento realizadas com os nossos especialistas são protegidas pelo sigilo profissional. A sua empresa apenas recebe relatórios estatísticos anónimos (ex: número total de utilizadores na plataforma), e nunca terá acesso ao conteúdo das suas conversas ou aos seus dados pessoais.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                Como funcionam os créditos de consulta?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
                O seu plano inclui um determinado número de créditos ou sessões mensais. Isto significa que todos os meses o seu saldo é renovado, permitindo-lhe manter um acompanhamento regular e consistente. Para utilizar, basta aceder à área de agendamento, selecionar o especialista que pretende e marcar a sua sessão. O sistema gere automaticamente o seu saldo mensal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-[#E5E5E5] rounded-[20px] px-6 data-[state=open]:bg-[#F9F9F9] transition-colors">
              <AccordionTrigger className="font-['DM_Sans:Bold',sans-serif] text-[18px] md:text-[20px] text-[#222] hover:no-underline py-6 text-left">
                Posso utilizar a plataforma para membros da minha família?
              </AccordionTrigger>
              <AccordionContent className="font-['Inter:Regular',sans-serif] text-[15px] md:text-[16px] text-[#666] pb-6">
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
  return (
    <div className="relative w-full px-4 pb-4">
      <div className="bg-[rgb(57,115,225)] rounded-[20px] p-6 md:p-16 flex flex-col gap-12 text-white relative overflow-hidden items-center text-center">

        {/* Logo */}
        <div className="w-[80px] h-[80px]">
          <img src={imgLogoIcon} alt="Melhor Saúde Logo" className="w-full h-full object-contain brightness-0 invert" />
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
