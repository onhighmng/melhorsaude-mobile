import { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AddResourceModal } from './AddResourceModal';
import { EditResourceModal } from './EditResourceModal';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { useAdminResources } from '@/hooks/useAdminResources';

const resources = [
  {
    id: 1,
    title: 'Guia de Bem-Estar Mental',
    description: 'Estratégias práticas para manter a saúde mental no ambiente de trabalho',
    type: 'pdf',
    category: 'saude_mental',
    views: '1.2k',
    size: '2.4 MB',
    date: '05/11/2025',
    color: 'bg-[#e8f4ff]',
    iconColor: 'text-[#007AFF]',
    badgeColor: 'bg-[#007AFF] text-white'
  },
  {
    id: 2,
    title: 'Técnicas de Relaxamento',
    description: 'Vídeo tutorial sobre técnicas de respiração e meditação',
    type: 'video',
    category: 'bem_estar_fisico',
    views: '3.5k',
    duration: '15:30',
    date: '04/11/2025',
    color: 'bg-[#fff9e6]',
    iconColor: 'text-[#FFD60A]',
    badgeColor: 'bg-[#FFD60A] text-gray-900'
  },
  {
    id: 3,
    title: 'Nutrição e Produtividade',
    description: 'Artigo sobre alimentação saudável para melhor desempenho',
    type: 'article',
    category: 'nutricao',
    views: '890',
    size: '1.1 MB',
    date: '03/11/2025',
    color: 'bg-[#d4f4dd]',
    iconColor: 'text-[#34C759]',
    badgeColor: 'bg-[#34C759] text-white'
  },
  {
    id: 4,
    title: 'Exercícios de Alongamento',
    description: 'Guia ilustrado de exercícios para fazer durante o trabalho',
    type: 'pdf',
    category: 'bem_estar_fisico',
    views: '2.1k',
    size: '5.2 MB',
    date: '02/11/2025',
    color: 'bg-[#f4e6ff]',
    iconColor: 'text-[#AF52DE]',
    badgeColor: 'bg-[#AF52DE] text-white'
  },
  {
    id: 5,
    title: 'Gestão de Stress',
    description: 'Série de vídeos sobre como gerir o stress diário',
    type: 'video',
    category: 'saude_mental',
    views: '4.2k',
    duration: '22:15',
    date: '01/11/2025',
    color: 'bg-[#ffe6f0]',
    iconColor: 'text-[#FF2D55]',
    badgeColor: 'bg-[#FF2D55] text-white'
  },
  {
    id: 6,
    title: 'Primeiros Socorros Básicos',
    description: 'Manual completo de primeiros socorros para empresas',
    type: 'pdf',
    category: 'saude_geral',
    views: '1.8k',
    size: '8.5 MB',
    date: '31/10/2025',
    color: 'bg-[#e8f4ff]',
    iconColor: 'text-[#007AFF]',
    badgeColor: 'bg-[#007AFF] text-white'
  }
];

export default function Resources() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Use real data hook
  const { resources, loading, deleteResource } = useAdminResources();

  const handleEdit = (resource: any) => {
    // Map DB resource fields to format expected by EditResourceModal
    const formattedResource = {
      id: resource.id,
      title: resource.title_pt,
      description: resource.description_pt,
      category: resource.pillar_code, // Simple mapping, might need adjustment
      type: resource.resource_type,
      fileUrl: resource.file_url,
      thumbnailUrl: resource.thumbnail_url,
      duration: resource.duration_minutes
    };
    setSelectedResource(formattedResource);
    setIsEditModalOpen(true);
  };

  const handleDelete = (resource: any) => {
    setSelectedResource(resource);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedResource?.id) {
      await deleteResource(selectedResource.id);
      setIsDeleteDialogOpen(false);
      setSelectedResource(null);
    }
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title_pt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description_pt && resource.description_pt.toLowerCase().includes(searchQuery.toLowerCase()));

    // Naive category mapping for filter - ideally use pillar code directly if possible
    // categories IDs: saude_mental, bem_estar_fisico, nutricao, saude_geral
    // resource.pillar_code: PSYCH, PHYSICAL, FINANCIAL, LEGAL
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      // Create a mapping or check directly
      // This assumes categories in state match DB codes or we map them.
      // Let's do a basic mapping check:
      if (selectedCategory === 'saude_mental' && resource.pillar_code !== 'PSYCH') matchesCategory = false;
      if (selectedCategory === 'bem_estar_fisico' && resource.pillar_code !== 'PHYSICAL') matchesCategory = false;
      // Add others as needed, or update the categories tabs
      if (selectedCategory === 'financeiro' && resource.pillar_code !== 'FINANCIAL') matchesCategory = false;
      if (selectedCategory === 'juridico' && resource.pillar_code !== 'LEGAL') matchesCategory = false;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-gray-50 pb-24 lg:pb-8">
      <AddResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditResourceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        resource={selectedResource}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        resourceTitle={selectedResource?.title_pt || selectedResource?.title || ''}
      />

      {/* Hero Header */}
      <div className="text-center mb-8 max-w-4xl mx-auto px-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <h1 className="text-gray-900 text-4xl lg:text-5xl text-center sm:text-left" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: '500', lineHeight: '1.2', fontSize: 'clamp(2rem, 6vw, 3rem)' }}>Gestão de Recursos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-all flex items-center justify-center text-gray-600 flex-shrink-0"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-500 text-lg px-4">
          Gerir e adicionar conteúdo para bem-estar físico, mental, financeiro e jurídico
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Pesquisar recursos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 bg-white border-gray-200 rounded-2xl h-14 shadow-sm"
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {[{ id: 'all', label: 'Todos' }, { id: 'saude_mental', label: 'Mental' }, { id: 'bem_estar_fisico', label: 'Físico' }, { id: 'financeiro', label: 'Financeiro' }, { id: 'juridico', label: 'Jurídico' }].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm border ${selectedCategory === category.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer relative flex flex-col h-[380px]" onClick={() => handleEdit(resource)}>
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-blue-600" onClick={(e) => { e.stopPropagation(); handleEdit(resource); }}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); handleDelete(resource); }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="h-[200px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={resource.thumbnail_url || 'https://placehold.co/600x400?text=No+Image'}
                  alt={resource.title_pt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-4 z-20">
                  <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
                    {resource.pillar_code}
                  </Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider">{resource.resource_type}</Badge>
                  {resource.duration_minutes && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      • {resource.duration_minutes} min
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title_pt}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{resource.description_pt}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                  <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Nenhum recurso encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
