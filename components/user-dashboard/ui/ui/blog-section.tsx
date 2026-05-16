import React from 'react';
import { LazyImage } from './lazy-image';
import { BookOpen, Video, Headphones, Search, Eye, FileText } from 'lucide-react';
import { AppleSpotlight } from './apple-spotlight';
import { PillarFilter, PillarType } from './pillar-filter';
import { ContentTypeFilter, ContentType } from './content-type-filter';
import { VideoPlayer } from './video-thumbnail-player';

type ResourceType = 'article' | 'video' | 'audio';

interface Resource {
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

const recursos: Resource[] = [
	{
		title: 'Gerenciando o Estresse Diário',
		slug: '#',
		description:
			'Descubra técnicas eficazes para lidar com o estresse do dia a dia e melhorar sua saúde mental.',
		image: 'https://images.unsplash.com/photo-1659087374131-6707281eba1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjBtYW5hZ2VtZW50JTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3NjYxMzc2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '15/03/2024',
		author: 'Dr. Maria Silva',
		readTime: '7 min',
		type: 'article',
		pillar: 'mental',
		viewCount: 1243,
		category: 'Saúde Mental'
	},
	{
		title: 'Yoga e Bem-Estar Físico',
		slug: '#',
		description:
			'Aprenda como a prática regular de yoga pode transformar sua saúde física e mental.',
		image: 'https://images.unsplash.com/photo-1612732362547-14adf627f24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjYxNjUyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '10/03/2024',
		author: 'Ana Costa',
		readTime: '15 min',
		type: 'video',
		pillar: 'fisico',
		videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1',
		viewCount: 2156,
		category: 'Exercício'
	},
	{
		title: 'Planejamento Financeiro Pessoal',
		slug: '#',
		description:
			'Estratégias práticas para organizar suas finanças e alcançar segurança financeira.',
		image: 'https://images.unsplash.com/photo-1764231467854-db276777da58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NjYxMTA0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '05/03/2024',
		author: 'Carlos Mendes',
		readTime: '8 min',
		type: 'article',
		pillar: 'financeiro',
		viewCount: 987,
		category: 'Finanças'
	},
	{
		title: 'Seus Direitos Legais',
		slug: '#',
		description:
			'Entenda seus direitos e como obter assistência jurídica quando necessário.',
		image: 'https://images.unsplash.com/photo-1585861782057-86b3a48b87ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMHJpZ2h0cyUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NjYxNjUyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '28/02/2024',
		author: 'Dr. João Santos',
		readTime: '12 min',
		type: 'video',
		pillar: 'juridico',
		videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1',
		viewCount: 765,
		category: 'Direitos'
	},
	{
		title: 'Meditação e Mindfulness',
		slug: '#',
		description:
			'Práticas de meditação para melhorar seu foco, reduzir ansiedade e encontrar paz interior.',
		image: 'https://images.unsplash.com/photo-1603166868295-4ae2cba14063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3N8ZW58MXx8fHwxNzY2MDg2OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '20/02/2024',
		author: 'Sofia Oliveira',
		readTime: '20 min',
		type: 'audio',
		pillar: 'mental',
		viewCount: 1543,
		category: 'Mindfulness'
	},
	{
		title: 'Guia de Alimentação Saudável',
		slug: '#',
		description:
			'Guia completo sobre alimentação equilibrada e como escolher os melhores nutrientes.',
		image: 'https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwZm9vZHxlbnwxfHx8fDE3NjYxNTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '10/12/2024',
		author: 'Nutricionista Paula Lima',
		readTime: '9 min',
		type: 'article',
		pillar: 'fisico',
		viewCount: 856,
		category: 'Nutrição'
	},
	{
		title: 'Terapia e Saúde Mental',
		slug: '#',
		description:
			'Como a terapia pode ajudar no tratamento de ansiedade, depressão e outros desafios emocionais.',
		image: 'https://images.unsplash.com/photo-1581461356013-c5229dcb670c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB0aGVyYXB5fGVufDF8fHx8MTc2NjE1OTM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '10/02/2024',
		author: 'Psicóloga Beatriz Rocha',
		readTime: '18 min',
		type: 'video',
		pillar: 'mental',
		videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1',
		viewCount: 2301,
		category: 'Terapia'
	},
	{
		title: 'Exercícios Físicos para Todos',
		slug: '#',
		description:
			'Treinos acessíveis e eficazes para melhorar sua força, resistência e bem-estar geral.',
		image: 'https://images.unsplash.com/photo-1765302741884-e846c7a178df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjYwODE5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '05/02/2024',
		author: 'Personal Trainer Ricardo',
		readTime: '22 min',
		type: 'video',
		pillar: 'fisico',
		videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1',
		viewCount: 1876,
		category: 'Fitness'
	},
	{
		title: 'Aconselhamento Profissional',
		slug: '#',
		description:
			'Orientações sobre como buscar aconselhamento profissional e encontrar o terapeuta certo.',
		image: 'https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwY291bnNlbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNzY2MTY1MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '30/01/2024',
		author: 'Dr. Fernando Alves',
		readTime: '25 min',
		type: 'audio',
		pillar: 'mental',
		viewCount: 1432,
		category: 'Aconselhamento'
	},
	{
		title: 'Equilíbrio Vida-Trabalho',
		slug: '#',
		description:
			'Dicas para manter um equilíbrio saudável entre vida pessoal, trabalho e autocuidado.',
		image: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGxpZmVzdHlsZSUyMGJhbGFuY2V8ZW58MXx8fHwxNjYxNjUyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '25/01/2024',
		author: 'Lucia Martins',
		readTime: '5 min',
		type: 'article',
		pillar: 'fisico',
		viewCount: 2145,
		category: 'Bem-estar'
	},
	{
		title: 'Segurança Financeira',
		slug: '#',
		description:
			'Como construir reservas de emergência e garantir estabilidade financeira a longo prazo.',
		image: 'https://images.unsplash.com/photo-1624454003060-fc7189ed6242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZWN1cml0eSUyMHNhdmluZ3N8ZW58MXx8fHwxNzY2MDYwMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '20/01/2024',
		author: 'Consultor Pedro Neves',
		readTime: '30 min',
		type: 'audio',
		pillar: 'financeiro',
		viewCount: 623,
		category: 'Poupança'
	},
	{
		title: 'Consultoria Jurídica Online',
		slug: '#',
		description:
			'Acesse serviços jurídicos online de forma rápida, segura e acessível.',
		image: 'https://images.unsplash.com/photo-1760089449852-e8cade7feb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGFzc2lzdGFuY2UlMjBjb25zdWx0YXRpb258ZW58MXx8fHwxNzY2MTY1MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
		createdAt: '15/01/2024',
		author: 'Advogada Camila Torres',
		readTime: '14 min',
		type: 'video',
		pillar: 'juridico',
		videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1',
		viewCount: 1098,
		category: 'Consultoria'
	},
];

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

export function BlogSection({ filterPillar }: { filterPillar?: PillarType | null } = {}) {
	const [selectedTypeFilter, setSelectedTypeFilter] = React.useState<ContentType | null>(null);
	const [selectedPillar, setSelectedPillar] = React.useState<PillarType | null>(filterPillar || null);
	const [searchQuery, setSearchQuery] = React.useState<string>('');

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
	}, [selectedTypeFilter, selectedPillar, searchQuery]);

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

	// Handle content type click - toggle type filter
	const handleContentTypeClick = (type: ContentType) => {
		setSelectedTypeFilter(prev => prev === type ? null : type);
	};

	// Handle pillar click - toggle pillar filter
	const handlePillarClick = (pillar: PillarType) => {
		setSelectedPillar(prev => prev === pillar ? null : pillar);
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

	const shortcuts = [
		{
			label: 'Artigos',
			icon: <BookOpen />,
			link: '#'
		},
		{
			label: 'Vídeos',
			icon: <Video />,
			link: '#'
		},
		{
			label: 'Áudios',
			icon: <Headphones />,
			link: '#'
		}
	];

	return (
		<div className="mx-auto w-full max-w-5xl grow">
			<div className="space-y-1 px-4 py-8">
				<h1 className="font-['Pacifico:Regular',sans-serif] text-4xl tracking-wide text-black">
					Recursos de Saúde
				</h1>
				<p className="text-gray-700 text-base">
					Artigos, vídeos e áudios sobre saúde mental, bem-estar físico, assistência financeira e jurídica.
				</p>
			</div>
			<div className="w-full h-px border-b border-dashed border-gray-400/30" />
			
			{/* Apple Spotlight Search Bar */}
			<div className="px-4 pt-6 pb-2">
				<AppleSpotlight 
					shortcuts={shortcuts}
					searchResults={searchResults}
					isOpen={true}
					onShortcutClick={handleShortcutClick}
					selectedFilter={selectedTypeFilter}
					onSearchQueryChange={setSearchQuery}
					searchValue={searchQuery}
				/>
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

			<div className="grid p-4 md:grid-cols-2 lg:grid-cols-3 z-10 gap-4">
				{filteredRecursos.map((recurso) => (
					<a
						href={recurso.slug}
						key={recurso.title}
						className="group flex flex-col gap-3 rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
					>
						{/* Image with Type Badge in top right */}
						<div className="relative">
							<LazyImage
								src={recurso.image}
								fallback="https://placehold.co/640x360?text=fallback-image"
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
							<h2 className="text-xl font-bold text-black leading-tight">
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
				))}
			</div>
		</div>
	);
}