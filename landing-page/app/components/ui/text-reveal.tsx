import { FC, useEffect, useRef, useState } from "react";
import { cn } from "./utils";
import { ProgressiveBlur } from "./progressive-blur";
import { InView } from "./in-view";
const imgMelhorSaudeTransparentLogo1 = "/landing-assets/eaf43a5a27ef5bcc503c0ad293ece5ca91f88dc0.png";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;

      // Disable scroll hijacking on mobile (screens < 768px)
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (isScrollLocked) {
          setIsScrollLocked(false);
          document.body.style.overflow = '';
        }
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is in viewport and centered
      const isCentered = containerRect.top <= 100 && containerRect.bottom >= viewportHeight - 100;

      // Check if scroll has reached the end
      const scrollElement = scrollRef.current;
      const isAtEnd = scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight - 10;
      
      // Check if at the beginning
      const isAtStart = scrollElement.scrollTop <= 10;

      if (isCentered && !isAtEnd && !isAtStart) {
        // Lock page scroll
        if (!isScrollLocked) {
          setIsScrollLocked(true);
          document.body.style.overflow = 'hidden';
        }
      } else {
        // Unlock page scroll
        if (isScrollLocked) {
          setIsScrollLocked(false);
          document.body.style.overflow = '';
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!scrollRef.current || !containerRef.current) return;

      // Disable scroll hijacking on mobile (screens < 768px)
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isCentered = containerRect.top <= 100 && containerRect.bottom >= viewportHeight - 100;

      if (isCentered && scrollRef.current) {
        const scrollElement = scrollRef.current;
        const isAtTop = scrollElement.scrollTop <= 0;
        const isAtBottom = scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight - 1;

        // If scrolling down and not at bottom, or scrolling up and not at top
        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          e.preventDefault();
          scrollElement.scrollTop += e.deltaY;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, [isScrollLocked]);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      <div className={cn("relative z-0 flex h-auto md:h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-white", className)}>
        <ProgressiveBlur position="top" backgroundColor="#ffffff" height="200px" blurAmount="15px" />
        <ProgressiveBlur position="bottom" backgroundColor="#ffffff" height="200px" blurAmount="15px" />
        
        <div 
          ref={scrollRef}
          className="flex h-auto md:h-[calc(100vh-2rem)] w-full flex-col items-center overflow-visible md:overflow-y-auto overflow-x-hidden scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex w-full max-w-6xl flex-col space-y-8 md:space-y-10 px-6 md:px-12 pt-20 md:pt-40 pb-12 md:pb-32">
            <InView
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              viewOptions={{ margin: "0px 0px -50px 0px", once: false }}

            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black tracking-tight">
                  A Plataforma Líder em Bem-Estar Corporativo
                </h2>
              </div>
            </InView>

            <div className="space-y-8 md:space-y-10 text-center">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  Fundada em 2025, a Melhor Saúde nasceu de uma verdade simples: colaboradores felizes constroem empresas imparáveis.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  Transformamos empresas em Moçambique unindo tecnologia de ponta e cuidado humanizado.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <div className="flex justify-center my-8">
                  <img src={imgMelhorSaudeTransparentLogo1} alt="Melhor Saúde Logo" className="h-32 w-auto" />
                </div>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  Imagine acordar e saber que a sua equipa está protegida. Que ninguém sofre em silêncio. Que cada colaborador tem acesso imediato a apoio real — mental, físico, financeiro e jurídico — sempre que precisar.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  A Melhor Saúde conecta a sua equipa a especialistas de confiança e oferece ferramentas que transformam bem-estar em resultados concretos: menos rotatividade, mais produtividade, e uma cultura que atrai os melhores talentos.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  Trabalhamos com empresas que querem ser líderes — não apenas em lucro, mas em cuidado. Empresas que entendem que investir nas pessoas não é um custo, é o caminho mais rápido para o crescimento sustentável e o reconhecimento que merecem.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light">
                  Depois de trabalharem connosco, os nossos clientes sentem o orgulho de liderar equipas mais fortes, leais e motivadas. Sentem a confiança de saber que estão a construir algo maior — uma empresa que as pessoas amam, respeitam e onde querem ficar.
                </p>
              </InView>

              <InView
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                viewOptions={{ margin: "0px 0px -100px 0px", once: false }}

              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-black font-medium">
                  Redefinimos a experiência de bem-estar no meio corporativo em Moçambique.
                </p>
              </InView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TextRevealByWord };