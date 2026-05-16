import React from 'react';
import { LazyImage } from './lazy-image';
import { BookOpen, Video, Headphones, Search, Eye, FileText } from 'lucide-react';
import { AppleSpotlight } from './apple-spotlight';
import { PillarFilter, PillarType } from './pillar-filter';
import { ContentTypeFilter, ContentType } from './content-type-filter';
import { VideoPlayer } from './video-thumbnail-player';
import { supabase } from '@/lib/supabase';

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
    viewCount?: number;
    category?: string;
}

// ... (helper functions - keep same)
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


interface BlogSectionProps {
    filterPillar?: PillarType | null;
    searchQuery?: string;
    selectedPillar?: PillarType | null;
    selectedContentType?: ContentType | null;
    showControls?: boolean;
}

export function BlogSection({
    filterPillar,
    searchQuery: externalSearchQuery,
    selectedPillar: externalSelectedPillar,
    selectedContentType: externalSelectedContentType,
    showControls = true
}: BlogSectionProps = {}) {
    const [recursos, setRecursos] = React.useState<Resource[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Internal state for filters
    const [internalSelectedTypeFilter, setInternalSelectedTypeFilter] = React.useState<ContentType | null>(null);
    const [internalSelectedPillar, setInternalSelectedPillar] = React.useState<PillarType | null>(filterPillar || null);
    const [internalSearchQuery, setInternalSearchQuery] = React.useState<string>('');

    // Fetch resources from backend
    React.useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('is_published', true)
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
                        category: getTypeLabel(mapResourceTypeToType(item.resource_type))
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

    // ... (filters memo - keep same)
    // Determine effective state (external wins if provided)
    const searchQuery = externalSearchQuery ?? internalSearchQuery;
    const selectedPillar = externalSelectedPillar ?? internalSelectedPillar;
    const selectedTypeFilter = externalSelectedContentType ?? internalSelectedTypeFilter;

    // Update internal pillar if legacy prop changes
    React.useEffect(() => {
        if (filterPillar) {
            setInternalSelectedPillar(filterPillar);
        }
    }, [filterPillar]);

    // Filter recursos based on selected filters (both type and pillar) and search query
    const filteredRecursos = React.useMemo(() => {
        let filtered = recursos;

        if (selectedTypeFilter) {
            filtered = filtered.filter((recurso) => recurso.type === selectedTypeFilter);
        }

        if (selectedPillar) {
            filtered = filtered.filter((recurso) => recurso.pillar === selectedPillar);
        }

        if (searchQuery) {
            filtered = filtered.filter((recurso) =>
                recurso.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recurso.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [selectedTypeFilter, selectedPillar, searchQuery, recursos]);


    // Handle increment view
    const handleIncrementView = async (id: string) => {
        try {
            await supabase.rpc('increment_resource_view_count', { resource_id: id });
            // Optionally update local state to reflect increment immediately
            setRecursos(prev => prev.map(r =>
                r.id === id ? { ...r, viewCount: (r.viewCount || 0) + 1 } : r
            ));
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
    };


    // Handle interactions (same as before)
    const handleShortcutClick = (label: string) => {
        const filterMap: Record<string, ContentType> = {
            'Artigos': 'article',
            'Vídeos': 'video',
            'Áudios': 'audio'
        };
        const typeToFilter = filterMap[label];
        if (typeToFilter) {
            setInternalSelectedTypeFilter(prev => prev === typeToFilter ? null : typeToFilter);
        }
    };

    const handleContentTypeClick = (type: ContentType) => {
        setInternalSelectedTypeFilter(prev => prev === type ? null : type);
    };

    const handlePillarClick = (pillar: PillarType) => {
        setInternalSelectedPillar(prev => prev === pillar ? null : pillar);
    };

    const searchResults = recursos.map((recurso) => ({
        icon: getTypeIcon(recurso.type),
        label: recurso.title,
        description: `${getTypeLabel(recurso.type)} • ${recurso.author} • ${recurso.readTime}`,
        link: recurso.slug,
        onSelect: () => {
            setInternalSearchQuery(recurso.title);
        }
    }));

    const shortcuts = [
        { label: 'Artigos', icon: <BookOpen />, link: '#' },
        { label: 'Vídeos', icon: <Video />, link: '#' },
        { label: 'Áudios', icon: <Headphones />, link: '#' }
    ];

    return (
        <div className="mx-auto w-full max-w-5xl grow">
            {showControls && (
                <>
                    <div className="space-y-1 px-4 py-8">
                        <h1 className="font-['Pacifico',sans-serif] text-4xl tracking-wide text-black">
                            Recursos de Saúde
                        </h1>
                        <p className="text-gray-700 text-base">
                            Artigos, vídeos e áudios sobre saúde mental, bem-estar físico, assistência financeira e jurídica.
                        </p>
                    </div>
                    <div className="w-full h-px border-b border-dashed border-gray-400/30" />

                    <div className="px-4 pt-6 pb-2">
                        <AppleSpotlight
                            shortcuts={shortcuts}
                            searchResults={searchResults}
                            isOpen={true}
                            onShortcutClick={handleShortcutClick}
                            selectedFilter={selectedTypeFilter}
                            onSearchQueryChange={setInternalSearchQuery}
                            searchValue={searchQuery}
                        />
                    </div>

                    <div className="px-4 pb-4">
                        {!filterPillar && (
                            <PillarFilter
                                selectedPillar={selectedPillar}
                                onPillarClick={handlePillarClick}
                            />
                        )}
                    </div>

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
                </>
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
                        filteredRecursos.map((recurso, index) => {
                            if (recurso.type === 'video' && recurso.videoUrl) {
                                return (
                                    <div key={`${recurso.id}-${index}`} className="flex flex-col gap-2 bg-white rounded-2xl overflow-hidden shadow-md">
                                        <VideoPlayer
                                            thumbnailUrl={recurso.image}
                                            videoUrl={recurso.videoUrl}
                                            title={recurso.title}
                                            description={recurso.description}
                                            className="w-full aspect-video rounded-t-2xl rounded-b-none"
                                            onClick={() => handleIncrementView(recurso.id)}
                                        />
                                        <div className="px-4 pb-4 flex flex-col gap-2 pt-2">
                                            <p className="text-[#D97706] font-medium text-sm">
                                                {recurso.category || getTypeLabel(recurso.type)}
                                            </p>
                                            <h2 className="text-xl font-bold text-black leading-tight line-clamp-2">
                                                {recurso.title}
                                            </h2>
                                            <div className="flex items-center justify-between text-gray-500 text-sm">
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="w-4 h-4" />
                                                    <span>{recurso.viewCount || 0}</span>
                                                </div>
                                                <span>{recurso.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <a
                                    href={recurso.slug}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={`${recurso.id}-${index}`}
                                    onClick={() => handleIncrementView(recurso.id)}
                                    className="group flex flex-col gap-3 rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                                >
                                    {/* Image with Type Badge in top right */}
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
                                        {/* Type Badge - Top Right */}
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                                            <FileText className="w-4 h-4 text-gray-700" />
                                            <span className="text-xs font-medium text-gray-700">
                                                {getTypeLabel(recurso.type)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="px-4 pb-4 flex flex-col gap-2">
                                        {/* Category in orange */}
                                        <p className="text-[#D97706] font-medium text-sm">
                                            {recurso.category || getTypeLabel(recurso.type)}
                                        </p>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-black leading-tight line-clamp-2">
                                            {recurso.title}
                                        </h2>

                                        {/* View count and Date */}
                                        <div className="flex items-center justify-between text-gray-500 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Eye className="w-4 h-4" />
                                                <span>{recurso.viewCount || 0}</span>
                                            </div>
                                            <span>{recurso.createdAt}</span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
