import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const PillarCarousel = () => {
  const sectionRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Bem-estar Físico',
      subtitle: 'Cuide do Seu Corpo',
      description: 'Programas personalizados de nutrição e exercício físico com acompanhamento profissional',
      image: '/lovable-uploads/8e8fac57-f901-4bea-b185-7628c8f592be.png',
      gradient: 'from-royal-blue/20 to-sky-blue/20',
      pillar: 'physical'
    },
    {
      id: 2,
      title: 'Saúde Mental',
      subtitle: 'Cuide da Sua Mente',
      description: 'Apoio psicológico profissional e terapias especializadas para o seu bem-estar emocional',
      image: '/lovable-uploads/f62b9e26-c3c4-4ed4-9b3c-a80c0c8bc8d7.png',
      gradient: 'from-mint-green/20 to-accent-sage/20',
      pillar: 'mental'
    },
    {
      id: 3,
      title: 'Assistência Jurídica',
      subtitle: 'Proteja os Seus Direitos',
      description: 'Consultoria jurídica especializada para questões pessoais e profissionais',
      image: '/lovable-uploads/5b1cc430-06fc-4273-b31c-d45cd43ab6d9.png',
      gradient: 'from-sky-blue/20 to-vibrant-blue/20',
      pillar: 'legal'
    },
    {
      id: 4,
      title: 'Assistência Financeira',
      subtitle: 'Organize as Suas Finanças',
      description: 'Planeamento financeiro personalizado e consultoria para uma vida mais equilibrada',
      image: '/lovable-uploads/e69291be-9261-4671-9624-7d6293b9a0cf.png',
      gradient: 'from-mint-green/20 to-royal-blue/20',
      pillar: 'financial'
    },
    {
      id: 5,
      title: 'Golf & Networking',
      subtitle: 'Conecte-se',
      description: 'Experiências exclusivas de networking e bem-estar através do golfe',
      image: '/lovable-uploads/golf-networking.png',
      gradient: 'from-vibrant-blue/20 to-bright-royal/20',
      isSpecial: true,
      link: 'https://executive-golf-experience.lovable.app/'
    }
  ];

  // Create extended slides array for infinite loop (last slide + original slides + first slide)
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality with infinite loop
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index + 1); // +1 because of the duplicate slide at the beginning
  };

  // Handle infinite loop transitions
  useEffect(() => {
    if (isMobile) return;
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      // If we're at the duplicate last slide, jump to the real last slide
      if (currentSlide === 0) {
        setCurrentSlide(slides.length);
      }
      // If we're at the duplicate first slide, jump to the real first slide  
      else if (currentSlide === slides.length + 1) {
        setCurrentSlide(1);
      }
    };

    if (isTransitioning) {
      const timer = setTimeout(handleTransitionEnd, 700); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning, slides.length, isMobile]);

  const handleSpecialClick = () => {
    window.open('https://executive-golf-experience.lovable.app/', '_blank');
  };

  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        className="relative z-10 bg-gradient-to-b from-white to-gray-50 pt-20 pb-12 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-navy-blue mb-2">
              Os Nossos Pilares de Bem-Estar
            </h2>
            <p className="text-lg text-gray-600">
              Soluções integradas para cuidar de si em todas as áreas da sua vida
            </p>
          </div>

          {slides.map((slide) => (
            <article
              key={slide.id}
              className={`rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r ${slide.gradient}`}
            >
              <div className="relative aspect-[16/10]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-lg text-sky-100 mb-2">{slide.subtitle}</p>
                  <p className="text-sm leading-relaxed text-gray-100">{slide.description}</p>
                  {slide.isSpecial && (
                    <button
                      onClick={handleSpecialClick}
                      className="mt-4 inline-flex items-center gap-2 bg-vibrant-blue hover:bg-bright-royal text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
                    >
                      Saber Mais <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 bg-gradient-to-b from-white to-gray-50 pt-28 pb-20 scroll-mt-24 transition-all duration-1000 opacity-100 translate-y-0"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-navy-blue mb-4">
            Os Nossos Pilares de Bem-Estar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções integradas para cuidar de si em todas as áreas da sua vida
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={`slide-${slide.id}-${index}`}
                className="w-full flex-shrink-0 relative min-h-[520px]"
              >
                <div className={`relative min-h-[520px] sm:h-[550px] md:h-[600px] bg-gradient-to-r ${slide.gradient} overflow-hidden`}>
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-blue/80 via-navy-blue/60 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-2xl mx-auto px-6 md:px-0 md:ml-16 text-white">
                      <h3 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
                        {slide.title}
                      </h3>
                      <p className="text-xl sm:text-2xl font-light mb-6 text-sky-100">
                        {slide.subtitle}
                      </p>
                      <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-100">
                        {slide.description}
                      </p>
                      
                      {slide.isSpecial && (
                        <button
                          onClick={handleSpecialClick}
                          className="inline-flex items-center gap-2 bg-vibrant-blue hover:bg-bright-royal text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          Saber Mais
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (currentSlide - 1) === index || (currentSlide === 0 && index === slides.length - 1) || (currentSlide === slides.length + 1 && index === 0)
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

          {/* Auto-scroll indicator */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Mudança automática a cada 5 segundos • {slides.length} pilares
            </p>
          </div>
      </div>
    </section>
  );
};

export default PillarCarousel;