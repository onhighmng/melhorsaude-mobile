import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppleSpotlight } from './ui/apple-spotlight';
import { BlogSection } from './ui/blog-section';
import { PillarType } from './ui/pillar-filter';
import { BookOpen, Video, Headphones } from 'lucide-react';
import { DesktopTopNav } from './DesktopTopNav';
// Asset Imports
import imgMaskGroup from "@/assets/inspo/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgMaskGroup1 from "@/assets/inspo/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgMaskGroup2 from "@/assets/inspo/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgMaskGroup3 from "@/assets/inspo/897f25666b2976f6467a21346375bb9753e57911.png";

interface PageProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function RecursosDesktop({ activeTab, setActiveTab }: PageProps) {
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
        <div className="bg-[#E5DDD5] h-full overflow-hidden flex flex-col font-['Inter',sans-serif]">
            <DesktopTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 overflow-auto custom-scrollbar px-[120px] py-8">
                <div className="max-w-[1440px] mx-auto w-full">
                    <div className="mb-8">
                        <h1 className="text-[36px] text-[#1a1a1a] font-['Pacifico',sans-serif] tracking-[0.0703px] mb-2">
                            {t('recursos.title')}
                        </h1>
                        <p className="text-[16px] text-gray-600">
                            Encontre artigos, vídeos e recursos sobre bem-estar
                        </p>
                    </div>

                    {/* Search Bar - Full Width */}
                    <div className="mb-8">
                        <AppleSpotlight
                            searchValue={searchQuery}
                            onSearchQueryChange={setSearchQuery}
                        />
                    </div>

                    {/* Pillar Filters - Horizontal Row */}
                    <div className="grid grid-cols-4 gap-4">
                        {pillars.map((pillar) => (
                            <button
                                key={pillar.id}
                                onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                                className={`
                    group relative bg-gradient-to-b ${pillar.color} rounded-2xl p-6 
                    transition-all duration-300 hover:shadow-xl hover:scale-105
                    ${selectedPillar === pillar.id ? 'ring-4 ring-[#003b8d] shadow-xl scale-105' : ''}
                  `}
                            >
                                <div className="space-y-3">
                                    <p className="text-[16px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#2e2b29] text-center">
                                        {pillar.label}
                                    </p>
                                    <div className="aspect-square rounded-xl overflow-hidden">
                                        <img
                                            src={pillar.image}
                                            alt={pillar.label}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {selectedPillar === pillar.id && (
                                    <div className="absolute -top-2 -right-2 bg-[#003b8d] text-white rounded-full w-8 h-8 flex items-center justify-center">
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
                        flex items-center gap-2 px-6 py-3 rounded-xl transition-all
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

                    {/* Content Grid - 3 Columns */}
                    <section className="py-12">
                        {selectedPillar ? (
                            <BlogSection
                                searchQuery={searchQuery}
                                selectedPillar={selectedPillar}
                                selectedContentType={selectedContentType}
                                showControls={false}
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
            </div>
        </div>
    );
}
