import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Loader2 } from 'lucide-react';
import { useAdminResources } from '@/hooks/useAdminResources';
import { categoryToDbCode, PortuguesePillarCategory } from '@/utils/pillarMapping';

interface EditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    fileUrl?: string;
    thumbnailUrl?: string;
    duration?: number;
  } | null;
}

export function EditResourceModal({ isOpen, onClose, resource }: EditResourceModalProps) {
  const { updateResource } = useAdminResources();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [duration, setDuration] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resource) {
      setTitle(resource.title || '');
      setDescription(resource.description || '');
      // Map pillar code back to category if needed, or use directly if select option matches
      // The Select components uses: saude_mental, bem_estar_fisico, financeiro, juridico
      // But resource.category comes in as PSYCH, PHYSICAL... from Resources.tsx mapping? 
      // check Resources.tsx: category: resource.pillar_code
      // We need to map PSYCH -> saude_mental for the dropdown to show correctly
      let mappedCategory = '';
      if (resource.category === 'PSYCH') mappedCategory = 'saude_mental';
      else if (resource.category === 'PHYSICAL') mappedCategory = 'bem_estar_fisico';
      else if (resource.category === 'FINANCIAL') mappedCategory = 'financeiro';
      else if (resource.category === 'LEGAL') mappedCategory = 'juridico';
      else mappedCategory = resource.category; // fallback

      setCategory(mappedCategory);
      setResourceType(resource.type);
      setDuration(resource.duration ? String(resource.duration) : '');
      setFileUrl(resource.fileUrl || '');
      setThumbnailUrl(resource.thumbnailUrl || '');
      setIsActive(true); // Default to true or fetch if available
    }
  }, [resource]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!resource) return;

    try {
      setIsSubmitting(true);
      const pillarCode = categoryToDbCode(category as PortuguesePillarCategory);

      await updateResource(resource.id, {
        title_pt: title,
        description_pt: description,
        resource_type: resourceType,
        pillar_code: pillarCode,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
        duration_minutes: duration ? Number(duration) : null,
      });

      handleClose();
    } catch (error) {
      console.error("Failed to update resource", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-xl w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Editar Recurso</DialogTitle>
        <DialogDescription className="sr-only">
          Atualize as informações do recurso
        </DialogDescription>

        <div className="relative bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-lg">Editar Recurso</h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-gray-900 mb-2 block">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 bg-white border-gray-300 rounded-lg"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-900 mb-2 block">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-20 bg-white border-gray-300 rounded-lg resize-none"
              />
            </div>

            {/* Category and Type in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-gray-900 mb-2 block">
                  Pilar
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-11 bg-white border-gray-300 rounded-lg">
                    <SelectValue />
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
                <Label htmlFor="type" className="text-gray-900 mb-2 block">
                  Tipo
                </Label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger className="h-11 bg-white border-gray-300 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">📄 Artigo (PDF, DOC, DOCX)</SelectItem>
                    <SelectItem value="video">🎥 Vídeo (Link)</SelectItem>
                    <SelectItem value="guide">📚 Guia (PDF, DOC, DOCX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>




            {/* URL or File Upload */}
            <div>
              <Label htmlFor="fileUrl" className="text-gray-900 mb-2 block">
                URL do Ficheiro
              </Label>
              <Input
                id="fileUrl"
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="h-11 bg-white border-gray-300 rounded-lg mb-2"
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <Label htmlFor="thumbnailUrl" className="text-gray-900 mb-2 block">
                URL da Thumbnail
              </Label>
              <Input
                id="thumbnailUrl"
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="h-11 bg-white border-gray-300 rounded-lg mb-2"
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="active"
                checked={isActive}
                onCheckedChange={(checked) => setIsActive(checked as boolean)}
              />
              <Label htmlFor="active" className="text-gray-900 cursor-pointer">
                Recurso ativo
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
              disabled={isSubmitting}
              className="px-6 h-10 rounded-lg bg-[#007AFF] hover:bg-[#0051D5] text-white flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'A guardar...' : 'Atualizar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
