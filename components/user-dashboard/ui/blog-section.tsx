import React from 'react';
import { LazyImage } from './lazy-image';
import { BookOpen, Video, Headphones } from 'lucide-react';
import { AppleSpotlight } from './apple-spotlight';
import { PillarFilter, PillarType } from './pillar-filter';
import { ContentType } from './content-type-filter';
import { VideoPlayer } from './video-thumbnail-player';
import { supabase } from '@/lib/supabase';

// Keep interfaces
type ResourceType = 'article' | 'video' | 'audio';

interface Resource {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    createdAt: string;
    author: string;
    readTime: string;
    type: ResourceType;
    pillar: PillarType;
    videoUrl?: string;
    viewCount: number;
}

// Helper functions
const getTypeIcon = (type: ResourceType) => {
    switch (type) {
        case 'video':
            return <Video className="w-8 h-8" />;
        case 'audio':
            return <Headphones className="w-8 h-8" />;
        case 'article':
        default:
            return <BookOpen className="w-8 h-8" />;
    }
};

const getTypeLabel = (type: ResourceType) => {
    switch (type) {
        case 'video':
            return 'Vídeo';
        case 'audio':
            return 'Áudio';
        case 'article':
        default:
            return 'Artigo';
    }
};

// Mappings
const mapPillarCodeToType = (code: string | null): PillarType => {
    switch (code) {
        case 'PSYCH': return 'mental';
        case 'PHYSICAL': return 'fisico';
        case 'FINANCIAL': return 'financeiro';
        case 'LEGAL': return 'juridico';
        default: return 'mental';
    }
};

const mapResourceTypeToType = (type: string): ResourceType => {
    if (type === 'video') return 'video';
    if (type === 'audio') return 'audio';
    return 'article'; // Includes 'pdf', 'guide', etc.
};

export function BlogSection({ filterPillar }: { filterPillar?: PillarType | null } = {}) {
    const [recursos, setRecursos] = React.useState<Resource[]>([]);
    const [selectedTypeFilter, setSelectedTypeFilter] = React.useState<ContentType | null>(null);
    const [selectedPillar, setSelectedPillar] = React.useState<PillarType | null>(filterPillar || null);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                // Fetch from the new 'resources' table
                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('is_published', true) // Only published resources
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching resources:', error);
                    return;
                }

                if (data) {
                    const mappedResources: Resource[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.title_pt,
                        slug: item.file_url || '#',
                        description: item.description_pt || '',
                        image: item.thumbnail_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop',
                        createdAt: new Date(item.created_at).toLocaleDateString('pt-PT'),
                        author: 'Melhor Saúde',
                        readTime: (item.duration_minutes && item.duration_minutes > 0) ? `${item.duration_minutes} min` : (item.reading_time || '5 min'),
                        type: mapResourceTypeToType(item.resource_type),
                        pillar: mapPillarCodeToType(item.pillar_code),
                        videoUrl: item.resource_type === 'video' ? item.file_url : undefined,
                        viewCount: item.views_count || 0,
                    }));
                    setRecursos(mappedResources);
                }
            } catch (err) {
                console.error('Error in resource fetch:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    // Update selected pillar when filterPillar prop changes
    React.useEffect(() => {
        if (filterPillar) {
            setSelectedPillar(filterPillar);
        }
    }, [filterPillar]);

    // Filter recursos based on selected filters (both type and pillar) and search query
    const filteredRecursos = React.useMemo(() => {
        let filtered = recursos;

        // Apply type filter (article, video, audio)
        if (selectedTypeFilter) {
            filtered = filtered.filter((recurso) => recurso.type === selectedTypeFilter);
        }

        // Apply pillar filter
        if (selectedPillar) {
            filtered = filtered.filter((recurso) => recurso.pillar === selectedPillar);
        }

        // Apply search query filter
        if (searchQuery) {
            filtered = filtered.filter((recurso) =>
                recurso.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recurso.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [selectedTypeFilter, selectedPillar, searchQuery, recursos]);

    // Handle shortcut click - toggle type filter (legacy - kept for AppleSpotlight compatibility)
    const handleShortcutClick = (label: string) => {
        const filterMap: Record<string, ContentType> = {
            'Artigos': 'article',
            'Vídeos': 'video',
            'Áudios': 'audio'
        };

        const typeToFilter = filterMap[label];
        if (typeToFilter) {
            setSelectedTypeFilter(prev => prev === typeToFilter ? null : typeToFilter);
        }
    };

    const handlePillarClick = (pillar: PillarType) => {
        setSelectedPillar(prev => prev === pillar ? null : pillar);
    };

    const handleIncrementView = async (id: string) => {
        try {
            await supabase.rpc('increment_resource_view_count', { resource_id: id });
            setRecursos(prev => prev.map(r => r.id === id ? { ...r, viewCount: r.viewCount + 1 } : r));
        } catch (err) {
            console.error('Error tracking resource view:', err);
        }
    };

    // Convert recursos to search results format for AppleSpotlight
    const searchResults = recursos.map((recurso) => ({
        icon: getTypeIcon(recurso.type),
        label: recurso.title,
        description: `${getTypeLabel(recurso.type)} • ${recurso.author} • ${recurso.readTime}`,
        link: recurso.slug,
        onSelect: () => {
            // When a search result is clicked, set the search query to filter the results
            setSearchQuery(recurso.title);
        }
    }));

    return (
        <div className="mx-auto w-full max-w-5xl grow">
            <div className="space-y-1 px-4 py-8">
                <h1 className="font-pacifico text-4xl tracking-wide text-black">
                    Recursos de Saúde
                </h1>
                <p className="text-gray-700 text-base">
                    Artigos, vídeos e áudios sobre saúde mental, bem-estar físico, assistência financeira e jurídica.
                </p>
            </div>
            <div className="w-full h-px border-b border-dashed border-gray-400/30" />

            {/* Apple Spotlight Search Bar */}
            <div className="px-4 pt-6 pb-2">
                <div className="px-4 pt-6 pb-2">
                    <AppleSpotlight
                        shortcuts={[]}
                        searchResults={searchResults}
                        isOpen={true}
                        onShortcutClick={handleShortcutClick}
                        selectedFilter={selectedTypeFilter}
                        onSearchQueryChange={setSearchQuery}
                        searchValue={searchQuery}
                    />
                </div>
            </div>

            {/* Content Type Filter (when pillar is pre-selected) or Pillar Filter */}
            <div className="px-4 pb-4">
                {!filterPillar && (
                    <PillarFilter
                        selectedPillar={selectedPillar}
                        onPillarClick={handlePillarClick}
                    />
                )}
            </div>

            {/* Filter indicator */}
            {(selectedTypeFilter || selectedPillar || searchQuery) && (
                <div className="px-4 pb-2">
                    <p className="text-gray-600 text-sm">
                        Mostrando {filteredRecursos.length} {filteredRecursos.length === 1 ? 'recurso' : 'recursos'}
                        {selectedTypeFilter && ` - ${selectedTypeFilter}`}
                        {selectedPillar && ` - ${selectedPillar}`}
                        {searchQuery && ` - "${searchQuery}"`}
                    </p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid p-4 md:grid-cols-2 lg:grid-cols-3 z-10 gap-4">
                    {filteredRecursos.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Nenhum recurso encontrado.
                        </div>
                    ) : (
                        filteredRecursos.map((recurso, index) => (
                            recurso.type === 'video' && recurso.videoUrl ? (
                                <div key={`${recurso.title}-${index}`} className="flex flex-col gap-2" onClick={() => handleIncrementView(recurso.id)}>
                                    <VideoPlayer
                                        thumbnailUrl={recurso.image}
                                        videoUrl={recurso.videoUrl}
                                        title={recurso.title}
                                        description={recurso.description}
                                        className="rounded-lg"
                                    />
                                    <div className="space-y-2 px-3 pb-3">
                                        <p>{recurso.author}</p>
                                        <div className="bg-gray-400 size-1 rounded-full" />
                                        <p>{recurso.createdAt}</p>
                                    </div>
                                </div>

                            ) : (
                                <a
                                    href={recurso.slug}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={`${recurso.title}-${index}`}
                                    onClick={() => handleIncrementView(recurso.id)}
                                    className="group flex flex-col gap-2 rounded-lg overflow-hidden bg-white/80 border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-gray-300 hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]"
                                >
                                    <div className="relative">
                                        <LazyImage
                                            src={recurso.image}
                                            fallback="https://placehold.co/640x360?text=Melhor+Saude"
                                            inView={true}
                                            alt={recurso.title}
                                            ratio={16 / 9}
                                            className="transition-all duration-500 group-hover:scale-105"
                                            AspectRatioClassName="border-0"
                                        />
                                        {/* Type Badge - Centered */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/70 backdrop-blur-sm rounded-full p-4 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110">
                                                {getTypeIcon(recurso.type)}
                                            </div>
                                        </div>
                                        {/* Type Label - Bottom */}
                                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                                            {getTypeLabel(recurso.type)}
                                        </div>
                                    </div>

                                    <div className="space-y-2 px-3 pb-3">
                                        <div className="text-gray-500 flex items-center gap-2 text-[11px] sm:text-xs">
                                            <p>{recurso.author}</p>
                                            <div className="bg-gray-500 size-1 rounded-full" />
                                            <p>{recurso.createdAt}</p>
                                        </div>
                                        <h2 className="line-clamp-2 text-lg leading-5 tracking-tight text-gray-900 group-hover:text-black transition-colors">
                                            {recurso.title}
                                        </h2>
                                        <p className="text-gray-700 line-clamp-3 text-sm">
                                            {recurso.description}
                                        </p>
                                    </div>
                                </a>
                            )
                        ))
                    )}
                </div>
            )
            }
        </div>
    );
}

