import { ArrowLeft, Video, Image as ImageIcon, Headphones, FileText, Plus, Upload, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef } from 'react';
import { RecursosSection } from '../ui/recursos-section';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
// DISABLED: import from 'sonner';
import { useAdminResources } from '@/hooks/useAdminResources';
import { categoryToDbCode, PortuguesePillarCategory } from '@/utils/pillarMapping';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EditResourceModal } from '@/components/admin/EditResourceModal';

type ResourceFormat = 'video' | 'image' | 'audio' | 'article';
type Pillar = 'mental' | 'physical' | 'financial' | 'nutrition' | 'legal';

export function AuditoriaLogs({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const { resources, loading, addResource, deleteResource, uploadFile } = useAdminResources();

  // Local form state
  const [selectedFormat, setSelectedFormat] = useState<ResourceFormat>('video');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // File states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);

  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<any>(null);

  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const formatIcons = {
    video: Video,
    image: ImageIcon,
    audio: Headphones,
    article: FileText,
  };

  const FormatIcon = formatIcons[selectedFormat];

  // Map backend resources to the shape expected by RecursosSection
  // Note: RecursosSection expects specific fields. We might need to adjust it or map our data to match.
  // Assuming RecursosSection accepts our DB resource shape or close to it.
  // interface Resource { id, title, format, pillar, views, publishedDate, thumbnail }

  const mappedResources = resources.map(r => ({
    id: r.id,
    title: r.title_pt,
    // Map DB resource_type to UI format
    format: (r.resource_type === 'pdf' || r.resource_type === 'guide') ? 'article' :
      (r.resource_type === 'video') ? 'video' : 'article', // simplified mapping
    // Map DB pillar_code to UI pillar
    pillar: (r.pillar_code === 'PSYCH' ? 'mental' :
      r.pillar_code === 'PHYSICAL' ? 'physical' :
        r.pillar_code === 'FINANCIAL' ? 'financial' :
          r.pillar_code === 'LEGAL' ? 'legal' : 'mental') as Pillar,
    views: r.views_count || 0,
    publishedDate: new Date(r.created_at || Date.now()).toLocaleDateString('pt-PT'),
    thumbnail: r.thumbnail_url || 'https://images.unsplash.com/photo-1626245347646-991df99479b1?w=800&q=80', // Fallback
    description: r.description_pt // Pass description if component supports it
  }));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Auto-set format based on file extension
      const ext = e.target.files[0].name.split('.').pop()?.toLowerCase();
      if (['mp4', 'avi', 'mov'].includes(ext || '')) setSelectedFormat('video');
      if (['jpg', 'png', 'gif', 'webp'].includes(ext || '')) setSelectedFormat('image');
      if (['mp3', 'wav'].includes(ext || '')) setSelectedFormat('audio');
      if (['pdf', 'doc', 'docx'].includes(ext || '')) setSelectedFormat('article');
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedThumbnail(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!title || !description || !selectedPillar || !selectedFormat) {
      setFormError(t('admin.resources.fillAllFields') || 'Preencha todos os campos obrigatórios.');
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);

      let fileUrl = '';
      let thumbnailUrl = '';

      if (selectedFile) {
        const result = await uploadFile(selectedFile, 'resources');
        if (!result.success || !result.url) throw new Error('Erro ao carregar ficheiro: ' + result.error);
        fileUrl = result.url;
      }

      if (selectedThumbnail) {
        const result = await uploadFile(selectedThumbnail, 'thumbnails');
        if (!result.success || !result.url) throw new Error('Erro ao carregar imagem: ' + result.error);
        thumbnailUrl = result.url;
      }

      // Map UI pillar to DB category/pillar code
      // UI: mental, physical, financial, nutrition, legal
      // DB: saude_mental, bem_estar_fisico, financeiro, juridico (nutrition -> physical or new category?)
      // Let's map nutrition to physical for now or check utils

      let dbCategory: PortuguesePillarCategory = 'saude_mental';
      if (selectedPillar === 'physical') dbCategory = 'bem_estar_fisico';
      else if (selectedPillar === 'financial') dbCategory = 'financeiro';
      else if (selectedPillar === 'legal') dbCategory = 'juridico';
      else if (selectedPillar === 'nutrition') dbCategory = 'bem_estar_fisico'; // Fallback

      const pillarCode = categoryToDbCode(dbCategory);

      // Map UI format to DB resource type
      let resourceType = 'guide';
      if (selectedFormat === 'video') resourceType = 'video';
      else if (selectedFormat === 'article') resourceType = 'pdf';

      const result = await addResource({
        title_pt: title,
        description_pt: description,
        resource_type: resourceType,
        pillar_code: pillarCode,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
        is_published: true,
      });

      if (!result.success) throw new Error(result.error as string);

      toast.success(t('admin.resources.success_add') || 'Recurso adicionado com sucesso!');

      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setSelectedThumbnail(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';

    } catch (err: any) {
      console.error(err);
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (resourceId: string) => {
    setResourceToDelete(resourceId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (resourceToDelete) {
      const result = await deleteResource(resourceToDelete);
      if (result.success) {
        toast.success(t('admin.resources.success_delete'));
      } else {
        toast.error('Erro ao eliminar recurso');
      }
      setShowDeleteDialog(false);
      setResourceToDelete(null);
    }
  };

  // Only handling view/deletion for now in this view, editing could be added later
  const handleEdit = (resource: any) => {
    // Find the original resource from the 'resources' array using the ID from the UI resource
    const originalResource = resources.find(r => r.id === resource.id);

    if (originalResource) {
      const formattedResource = {
        id: originalResource.id,
        title: originalResource.title_pt,
        description: originalResource.description_pt || '',
        category: originalResource.pillar_code || 'PSYCH',
        type: originalResource.resource_type,
        fileUrl: originalResource.file_url,
        thumbnailUrl: originalResource.thumbnail_url,
        duration: originalResource.duration_minutes
      };

      setResourceToEdit(formattedResource);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen" style={{ backgroundColor: '#F5F3EE' }}>
      <button
        onClick={() => onNavigate('Dashboard')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('admin.globalAgenda.back')}</span>
      </button>

      <h1 className="text-3xl md:text-4xl mb-8 text-[#1a1a1a]" style={{ fontFamily: 'Pacifico, cursive' }}>
        {t('admin.resources.title')}
      </h1>

      {/* Upper Section: Add New Resource */}
      <div className="mb-8">
        <div className="rounded-2xl p-8 bg-white shadow-sm">
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
            {t('admin.resources.addNew')}
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>
            {t('admin.resources.subtitle')}
          </p>

          {formError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {/* Format Selector */}
          <div className="mb-6">
            <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('admin.resources.format')} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {(Object.keys(formatIcons) as ResourceFormat[]).map((format) => {
                const Icon = formatIcons[format];
                const isSelected = selectedFormat === format;
                return (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${isSelected
                      ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                      : 'border-gray-200 bg-transparent text-gray-700 hover:border-gray-300'
                      }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t(`admin.resources.type.${format}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pillar Selector */}
            <div>
              <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {t('admin.resources.pillar')} <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value as Pillar)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">{t('admin.resources.selectPillar')}</option>
                <option value="mental">{t('bemEstar.mental')}</option>
                <option value="physical">{t('bemEstar.physical')}</option>
                <option value="financial">{t('bemEstar.financial')}</option>
                <option value="legal">{t('bemEstar.legal')}</option>
              </select>
            </div>

            {/* Title Input */}
            <div>
              <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {t('admin.resources.resourceTitle')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                placeholder={t('admin.resources.placeholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Descrição <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              placeholder="Descreva o conteúdo do recurso..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent min-h-[100px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* File Upload Area */}
            <div>
              <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {t('admin.resources.file')}
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  disabled={isSubmitting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  accept={selectedFormat === 'video' ? ".mp4,.avi,.mov" : selectedFormat === 'image' ? ".jpg,.png,.gif" : selectedFormat === 'audio' ? ".mp3,.wav" : ".pdf,.doc,.docx"}
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center text-[#1a1a1a]">
                    <FileText className="w-8 h-8 mb-2" />
                    <span className="font-medium truncate max-w-full px-2">{selectedFile.name}</span>
                    <span className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ) : (
                  <>
                    <FormatIcon className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-1 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Clique para carregar o ficheiro principal
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedFormat === 'video' && 'MP4, AVI, MOV (máx. 500MB)'}
                      {selectedFormat === 'image' && 'JPG, PNG, GIF (máx. 10MB)'}
                      {selectedFormat === 'audio' && 'MP3, WAV (máx. 50MB)'}
                      {selectedFormat === 'article' && 'PDF, DOC, DOCX (máx. 20MB)'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Upload Area */}
            <div>
              <label className="block mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Imagem de Capa (Opcional)
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative"
              >
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailSelect}
                  disabled={isSubmitting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  accept=".jpg,.jpeg,.png,.webp"
                />

                {selectedThumbnail ? (
                  <div className="flex flex-col items-center text-[#1a1a1a]">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="font-medium truncate max-w-full px-2">{selectedThumbnail.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-1 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Clique para carregar a capa
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      JPG, PNG, WEBP (Recomendado 16:9)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="w-full bg-[#1a1a1a] text-white py-3 px-6 rounded-lg hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {isSubmitting ? 'A publicar...' : t('admin.resources.publish')}
          </button>
        </div>
      </div>

      {/* Lower Section: Published Resources */}
      <div className="rounded-2xl p-8 bg-white shadow-sm">
        <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
          {t('admin.resources.published')}
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {mappedResources.length}
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : mappedResources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum recurso encontrado.
          </div>
        ) : (
          <RecursosSection resources={mappedResources} onEdit={handleEdit} onDelete={handleDeleteClick} />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
              {t('admin.resources.confirmDeleteTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('admin.resources.confirmDeleteDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {t('admin.resources.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <EditResourceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setResourceToEdit(null);
        }}
        resource={resourceToEdit}
      />
    </div>
  );
}
