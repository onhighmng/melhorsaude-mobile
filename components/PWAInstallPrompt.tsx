import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isHTTPS, setIsHTTPS] = useState(false);

  useEffect(() => {
    // Check if served over HTTPS (or localhost for development)
    const isSecure = location.protocol === 'https:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1';
    setIsHTTPS(isSecure);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isWebAPK = (window as any).navigator?.standalone;
    setIsInstalled(isStandalone || isWebAPK);

    // iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if already dismissed permanently
      const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        setShowInstallButton(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    // For iOS: Show prompt if not installed and not in standalone mode
    if (isIOSDevice && !isStandalone && !isWebAPK) {
      const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!hasDismissed) {
        setDeferredPrompt({ prompt: async () => { }, userChoice: Promise.resolve({ outcome: 'dismissed' }) } as any); // Mock for iOS
        setShowInstallButton(true);
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isIOS) {
      // Just show instructions? Or we rely on the UI changes below to show different content
      return;
    }

    if (!deferredPrompt) return;

    try {
      if (deferredPrompt.prompt) {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
          setShowInstallButton(false);
        }

        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  // Don't show if not HTTPS, already installed, or no prompt available
  if (!isHTTPS || isInstalled || !showInstallButton) {
    return null;
  }

  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-background/90 backdrop-blur-md border border-border/50 rounded-full shadow-2xl pl-4 pr-2 py-2 flex items-center gap-4 hover:scale-105 transition-transform">
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm leading-none">Instalar App</h3>
          {isIOS && <span className="text-[10px] text-muted-foreground">Toque em Compartilhar e Adicionar à Tela</span>}
        </div>

        {!isIOS && (
          <Button
            size="sm"
            onClick={handleInstallClick}
            className="h-8 rounded-full px-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Instalar</span>
          </Button>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={handleDismiss}
          className="h-8 w-8 rounded-full hover:bg-muted/50 -mr-1"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;