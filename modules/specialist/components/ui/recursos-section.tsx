import React from 'react';
import { LazyImage } from './lazy-image';
import { Video, Image as ImageIcon, Headphones, FileText, Eye, Edit, Trash2 } from 'lucide-react';

type ResourceFormat = 'video' | 'image' | 'audio' | 'article';
type Pillar = 'mental' | 'physical' | 'financial' | 'nutrition' | 'legal';

interface Resource {
	id: string;
	title: string;
	format: ResourceFormat;
	pillar: Pillar;
	views: number;
	publishedDate: string;
	thumbnail: string;
}

interface RecursosSectionProps {
	resources?: Resource[];
	onEdit?: (resource: Resource) => void;
	onDelete?: (resourceId: string) => void;
}

const formatIcons = {
	video: Video,
	image: ImageIcon,
	audio: Headphones,
	article: FileText,
};

const formatLabels = {
	video: 'Vídeo',
	image: 'Imagem',
	audio: 'Áudio',
	article: 'Artigo',
};

const pillarColors: Record<Pillar, { bg: string; text: string; label: string }> = {
	mental: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Mental' },
	physical: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Físico' },
	financial: { bg: 'bg-green-100', text: 'text-green-700', label: 'Financeiro' },
	nutrition: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Nutrição' },
	legal: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Jurídico' },
};

const defaultResources: Resource[] = [
	{
		id: '1',
		title: 'Técnicas de Respiração para Ansiedade',
		format: 'video',
		pillar: 'mental',
		views: 1234,
		publishedDate: '2024-12-15',
		thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=360&fit=crop',
	},
	{
		id: '2',
		title: 'Guia de Alimentação Saudável',
		format: 'article',
		pillar: 'nutrition',
		views: 856,
		publishedDate: '2024-12-10',
		thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=640&h=360&fit=crop',
	},
	{
		id: '3',
		title: 'Meditação Guiada 10min',
		format: 'audio',
		pillar: 'mental',
		views: 2103,
		publishedDate: '2024-12-05',
		thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=640&h=360&fit=crop',
	},
	{
		id: '4',
		title: 'Exercícios de Alongamento',
		format: 'image',
		pillar: 'physical',
		views: 567,
		publishedDate: '2024-12-01',
		thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop',
	},
	{
		id: '5',
		title: 'Gestão de Finanças Pessoais',
		format: 'video',
		pillar: 'financial',
		views: 1891,
		publishedDate: '2024-11-28',
		thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=640&h=360&fit=crop',
	},
	{
		id: '6',
		title: 'Direitos do Trabalhador',
		format: 'article',
		pillar: 'legal',
		views: 743,
		publishedDate: '2024-11-20',
		thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&h=360&fit=crop',
	},
];

export function RecursosSection({ resources = defaultResources, onEdit, onDelete }: RecursosSectionProps) {
	return (
		<div className="mx-auto w-full grow">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 z-10">
				{resources.map((resource) => {
					const FormatIcon = formatIcons[resource.format];
					const pillarStyle = pillarColors[resource.pillar];

					return (
						<div
							key={resource.id}
							className="group hover:bg-white/40 active:bg-white/60 flex flex-col gap-3 rounded-xl p-3 duration-75 border border-transparent hover:border-gray-200 transition-all"
						>
							<div className="relative">
								<LazyImage
									src={resource.thumbnail}
									fallback="https://placehold.co/640x360?text=Resource"
									inView={true}
									alt={resource.title}
									ratio={16 / 9}
									className="transition-all duration-500 group-hover:scale-105"
								/>
								{/* Format Badge */}
								<div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center gap-1">
									<FormatIcon className="w-3 h-3" />
									<span className="text-xs font-inter font-medium">
										{formatLabels[resource.format]}
									</span>
								</div>
							</div>

							<div className="space-y-2 px-1">
								{/* Pillar Badge */}
								<span
									className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-inter font-medium ${pillarStyle.bg} ${pillarStyle.text}`}
								>
									{pillarStyle.label}
								</span>

								{/* Title */}
								<h3
									className="line-clamp-2 text-base leading-tight font-manrope font-bold"
								>
									{resource.title}
								</h3>

								{/* Metadata */}
								<div className="flex items-center justify-between pt-1">
									<div className="flex items-center gap-1.5 text-gray-600">
										<Eye className="w-3.5 h-3.5" />
										<span className="text-xs font-inter">
											{resource.views.toLocaleString()}
										</span>
									</div>
									<div className="text-xs text-gray-500 font-inter">
										{new Date(resource.publishedDate).toLocaleDateString('pt-PT')}
									</div>
								</div>

								{/* Actions */}
								<div className="flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm flex items-center justify-center gap-1 font-inter font-medium"
										title="Editar"
										onClick={() => onEdit && onEdit(resource)}
									>
										<Edit className="w-3.5 h-3.5" />
										<span className="text-xs">Editar</span>
									</button>
									<button
										className="flex-1 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm flex items-center justify-center gap-1 font-inter font-medium"
										title="Apagar"
										onClick={() => onDelete && onDelete(resource.id)}
									>
										<Trash2 className="w-3.5 h-3.5" />
										<span className="text-xs">Apagar</span>
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Empty State */}
			{resources.length === 0 && (
				<div className="text-center py-12">
					<FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
					<p className="text-gray-500 font-inter">
						Nenhum recurso publicado ainda. Adicione o primeiro recurso acima.
					</p>
				</div>
			)}
		</div>
	);
}