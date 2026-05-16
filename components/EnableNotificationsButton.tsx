import { BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ENABLED_COPY = 'Notificações ativas no app';

const EnableNotificationsButton = () => {
  // Simplificado para apenas mostrar que notificações estão ativas no app
  // Web Push foi desabilitado a pedido do utilizador

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        disabled={true}
        variant="secondary"
        className="gap-2"
        aria-live="polite"
      >
        <BellRing className="h-4 w-4" />
        {ENABLED_COPY}
      </Button>
    </div>
  );
};

export default EnableNotificationsButton;




















