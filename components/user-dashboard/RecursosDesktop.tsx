import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppleSpotlight } from './ui/apple-spotlight';
import { BlogSection } from './ui/blog-section';
import { PillarType } from './ui/pillar-filter';
import { BookOpen, Video, Headphones } from 'lucide-react';
import imgMaskGroup from "@assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "@assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "@assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "@assets/897f25666b2976f6467a21346375bb9753e57911.png";

interface RecursosDesktopProps {
  setActiveTab: (tab: string) => void;
}

export function RecursosDesktop({ setActiveTab }: RecursosDesktopProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<PillarType | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<'article' | 'video' | 'audio' | null>(null);

  const pillars = [
    {
      id: 'mental' as PillarType,
      label: 'Saúde Mental',
      color: 'from-[#9dbfd4] to-[rgba(157,191,212,0.3)]',
      image: imgMaskGroup
    },
    {
      id: 'fisico' as PillarType,
      label: 'Bem-estar Físico',
      color: 'from-[#fcc066] via-[#f4b85d] to-[#f5efe6]',
      image: imgMaskGroup1
    },
    {
      id: 'financeiro' as PillarType,
      label: 'Assist. Financeira',
      color: 'from-[#8BBEB8] to-[rgba(139,190,184,0.3)]',
      image: imgMaskGroup2
    },
    {
      id: 'juridico' as PillarType,
      label: 'Assist. Jurídica',
      color: 'from-[#D8A4C4] to-[rgba(216,164,196,0.3)]',
      image: imgMaskGroup3
    },
  ];

  const contentTypes = [
    { id: 'article' as const, label: 'Artigos', icon: BookOpen },
    { id: 'video' as const, label: 'Vídeos', icon: Video },
    { id: 'audio' as const, label: 'Áudios', icon: Headphones },
  ];

  return (
    <div className="bg-transparent min-h-screen">
      <div className="px-[120px] py-8">
        <div className="mb-10">
          <h1 className="font-pacifico text-[42px] text-[#1a1a1a] tracking-tight mb-1">
            {t('recursos.title')}
          </h1>
          <p className="font-plus-jakarta text-[17px] text-[#474747] opacity-70">
            Encontre artigos, vídeos e recursos sobre bem-estar
          </p>
        </div>

        {/* Search Bar - Full Width */}
        <div className="mb-8">
          <AppleSpotlight
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('recursos.searchPlaceholder')}
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
              className={`
                group relative bg-gradient-to-b ${pillar.color} rounded-[32px] p-7 
                transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]
                ${selectedPillar === pillar.id ? 'ring-4 ring-[#003b8d] shadow-2xl scale-[1.03]' : 'shadow-sm'}
              `}
            >
              <div className="space-y-4">
                <p className="text-[18px] font-plus-jakarta font-bold text-[#1a1a1a] text-center">
                  {pillar.label}
                </p>
                <div className="aspect-square rounded-[24px] overflow-hidden shadow-inner">
                  <img 
                    src={pillar.image} 
                    alt={pillar.label} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                </div>
              </div>
              {selectedPillar === pillar.id && (
                <div className="absolute -top-3 -right-3 bg-[#003b8d] text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg border-2 border-white">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content Type Filters - Show only after pillar selected */}
        {selectedPillar && (
          <div className="mt-8 flex gap-4">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedContentType(selectedContentType === type.id ? null : type.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-3xl transition-all
                    ${selectedContentType === type.id 
                      ? 'bg-[#003b8d] text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content Grid - 3 Columns */}
      <section className="px-[120px] py-12">
        {selectedPillar ? (
          <BlogSection
            filterPillar={selectedPillar}
          />
        ) : (
          <div className="text-center py-24">
            <div className="inline-block p-6 bg-white rounded-3xl shadow-sm mb-6">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-[24px] text-gray-800 font-semibold mb-2">
              Selecione um Pilar
            </h3>
            <p className="text-[16px] text-gray-600">
              Escolha uma área de bem-estar acima para explorar os recursos disponíveis
            </p>
          </div>
        )}
      </section>
    </div>
  );
}