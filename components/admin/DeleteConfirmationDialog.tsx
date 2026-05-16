import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resourceTitle: string;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  resourceTitle
}: DeleteConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md p-0 gap-0">
        <AlertDialogTitle className="sr-only">Confirmar Eliminação</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          Tem certeza que deseja eliminar este recurso?
        </AlertDialogDescription>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Eliminar Recurso</h3>
              <p className="text-gray-600 text-sm">
                Tem certeza que deseja eliminar "<strong>{resourceTitle}</strong>"?
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 h-10 rounded-lg border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="px-6 h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
