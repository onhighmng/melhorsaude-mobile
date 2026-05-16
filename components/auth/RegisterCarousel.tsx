import { useState, useEffect } from 'react';
import heroFitness from '@/assets/hero-fitness.jpg';
import heroBrain from '@/assets/hero-brain.jpg';
import heroCalculator from '@/assets/hero-calculator.jpg';
import heroNeural from '@/assets/hero-neural.jpg';
import heroPlanning from '@/assets/hero-planning.jpg';

const carouselImages = [
    {
        src: heroFitness,
        title: 'Bem-Estar Físico',
        description: 'Cuide da sua saúde física com programas personalizados'
    },
    {
        src: heroBrain,
        title: 'Saúde Mental',
        description: 'Apoio psicológico profissional quando você precisar'
    },
    {
        src: heroCalculator,
        title: 'Assistência Financeira',
        description: 'Consultoria financeira para o seu bem-estar económico'
    },
    {
        src: heroNeural,
        title: 'Desenvolvimento Pessoal',
        description: 'Cresça profissional e pessoalmente com nossos especialistas'
    },
    {
        src: heroPlanning,
        title: 'Assistência Jurídica',
        description: 'Suporte legal completo para suas necessidades'
    }
];

export function RegisterCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
            {carouselImages.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={image.src}
                        alt={image.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end p-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
                                {image.title}
                            </h2>
                            <p className="text-xl text-white/90 mb-8 animate-fade-in animation-delay-200">
                                {image.description}
                            </p>

                            <div className="flex gap-2">
                                {carouselImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                            ? 'w-8 bg-white'
                                            : 'w-2 bg-white/50 hover:bg-white/75'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute top-12 left-8 z-20">
                <img
                    src="/lovable-uploads/c207c3c2-eab3-483e-93b6-a55cf5e5fdf2.png"
                    alt="Melhor Saúde Logo"
                    className="w-32 h-32 object-contain"
                />
            </div>
        </div>
    );
}
