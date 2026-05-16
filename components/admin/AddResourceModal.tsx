import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Upload, Loader2, AlertCircle } from 'lucide-react';
import { useAdminResources } from '@/hooks/useAdminResources';
import { categoryToDbCode, PortuguesePillarCategory } from '@/utils/pillarMapping';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddResourceModal({ isOpen, onClose }: AddResourceModalProps) {
  const { addResource, uploadFile } = useAdminResources();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [resourceType, setResourceType] = useState('');
  const [duration, setDuration] = useState('');
  const [fileUrl, setFileUrl] = useState(''); // Text input for URL
  const [thumbnailUrl, setThumbnailUrl] = useState(''); // Text input for URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Actual file object
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null); // Actual thumbnail object
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for file inputs to clear them
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setResourceType('');
    setDuration('');
    setFileUrl('');
    setThumbnailUrl('');
    setSelectedFile(null);
    setSelectedThumbnail(null);
    setIsActive(true);
    setError(null);
    setIsSubmitting(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleClose = () => {
    if (!isSubmitting) {
      handleReset();
      onClose();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !resourceType) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let finalFileUrl = fileUrl;
      let finalThumbnailUrl = thumbnailUrl;

      // Upload resource file if selected
      if (selectedFile) {
        const result = await uploadFile(selectedFile, 'resources');
        if (!result.success || !result.url) {
          throw new Error('Falha ao fazer upload do arquivo do recurso: ' + (result.error || 'Erro desconhecido'));
        }
        finalFileUrl = result.url;
      }

      // Upload thumbnail if selected
      if (selectedThumbnail) {
        const result = await uploadFile(selectedThumbnail, 'thumbnails');
        if (!result.success || !result.url) {
          throw new Error('Falha ao fazer upload da imagem de capa: ' + (result.error || 'Erro desconhecido'));
        }
        finalThumbnailUrl = result.url;
      }

      // Map category to DB pillar code
      const pillarCode = categoryToDbCode(category as PortuguesePillarCategory);

      const result = await addResource({
        title_pt: title,
        description_pt: description,
        resource_type: resourceType,
        pillar_code: pillarCode,
        file_url: finalFileUrl,
        thumbnail_url: finalThumbnailUrl,
        duration_minutes: duration ? Number(duration) : undefined,
        is_published: isActive,
        // Optional fields that we might want to calculate or add later
        file_size_bytes: selectedFile ? selectedFile.size : undefined,
      });

      if (!result.success) {
        throw new Error(result.error as string);
      }

      handleClose();
    } catch (err: any) {
      console.error('Error submitting resource:', err);
      setError(err.message || 'Ocorreu um erro ao criar o recurso.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-xl w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Novo Recurso</DialogTitle>
        <DialogDescription className="sr-only">
          Preencha as informações para adicionar um novo recurso
        </DialogDescription>

        <div className="relative bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-lg">Novo Recurso</h2>
            <Button variant="ghost" size="icon" onClick={handleClose} disabled={isSubmitting}>
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mx-6 mt-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-gray-900 mb-2 block">
                Título do Recurso <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Ex: Guia de Bem-Estar Mental"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                className="h-12 bg-white border-gray-300 rounded-xl"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-900 mb-2 block">
                Descrição <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Descreva o conteúdo deste recurso..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="min-h-24 bg-white border-gray-300 rounded-xl resize-none"
              />
            </div>

            {/* Category and Type in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-gray-900 mb-2 block">
                  Categoria (Pilar) <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                  <SelectTrigger className="h-12 bg-white border-gray-300 rounded-xl">
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saude_mental">💙 Saúde Mental</SelectItem>
                    <SelectItem value="bem_estar_fisico">💛 Bem-Estar Físico</SelectItem>
                    <SelectItem value="financeiro">💚 Assistência Financeira</SelectItem>
                    <SelectItem value="juridico">💜 Assistência Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resourceType" className="text-gray-900 mb-2 block">
                  Tipo de Recurso <span className="text-red-500">*</span>
                </Label>
                <Select value={resourceType} onValueChange={setResourceType} disabled={isSubmitting}>
                  <SelectTrigger className="h-12 bg-white border-gray-300 rounded-xl">
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">📄 Artigo (PDF, DOC, DOCX)</SelectItem>
                    <SelectItem value="video">🎥 Vídeo (Link ou Upload)</SelectItem>
                    <SelectItem value="guide">📚 Guia (PDF, DOC, DOCX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>


            </div>

            {/* URL or File Upload */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Label htmlFor="fileUrl" className="text-gray-900 mb-3 block">
                Ficheiro do Recurso
              </Label>

              {/* File Input */}
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.mp4,.mov,.avi"
                  onChange={handleFileSelect}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="file-upload"
                  className={`inline-flex items-center justify-center px-4 py-2.5 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-lg transition-colors text-sm cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedFile ? 'Alterar Ficheiro' : 'Escolher Ficheiro'}
                </label>
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {selectedFile ? selectedFile.name : 'Nenhum ficheiro selecionado'}
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-gray-500">Ou use uma URL externa</span>
                </div>
              </div>

              <Input
                id="fileUrl"
                type="text"
                placeholder="https://exemplo.com/recurso.pdf"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                disabled={isSubmitting || !!selectedFile}
                className="h-11 bg-white border-gray-300 rounded-lg mt-3"
              />

              <p className="text-xs text-gray-500 mt-3">
                ✓ Documentos: PDF, DOC, DOCX • Vídeos: MP4, MOV, AVI
              </p>
            </div>

            {/* Thumbnail Upload */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Label htmlFor="thumbnailUrl" className="text-gray-900 mb-3 block">
                Imagem de Capa (Thumbnail)
              </Label>

              {/* Thumbnail Input */}
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  id="thumbnail-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  onChange={handleThumbnailSelect}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className={`inline-flex items-center justify-center px-4 py-2.5 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-lg transition-colors text-sm cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedThumbnail ? 'Alterar Imagem' : 'Escolher Imagem'}
                </label>
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {selectedThumbnail ? selectedThumbnail.name : 'Nenhuma imagem selecionada'}
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-gray-500">Ou use uma URL externa</span>
                </div>
              </div>

              <Input
                id="thumbnailUrl"
                type="text"
                placeholder="https://exemplo.com/imagem-capa.jpg"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                disabled={isSubmitting || !!selectedThumbnail}
                className="h-11 bg-white border-gray-300 rounded-lg mt-3"
              />
              <p className="text-xs text-gray-500 mt-3">
                ✓ Formatos: JPG, PNG, WEBP, GIF • Recomendado: 1200x630px
              </p>
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center gap-3 pt-2 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <Checkbox
                id="active"
                checked={isActive}
                onCheckedChange={(checked) => setIsActive(checked as boolean)}
                disabled={isSubmitting}
                className="border-2"
              />
              <Label htmlFor="active" className="text-gray-900 cursor-pointer flex-1">
                <span className="block">Recurso ativo e visível</span>
                <span className="text-sm text-gray-600">O recurso estará imediatamente disponível para todos os utilizadores</span>
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={isSubmitting}
              className="px-6 h-10 rounded-lg border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title || !category || !resourceType || isSubmitting}
              className="px-6 h-10 rounded-lg bg-[#007AFF] hover:bg-[#0051D5] text-white flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'A criar...' : 'Criar Recurso'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
