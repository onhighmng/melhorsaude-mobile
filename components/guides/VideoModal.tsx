import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  guideName: string;
  poster?: string;
  onNext?: () => void;
  nextLabel?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, guideName, poster, onNext, nextLabel = "Próximo Vídeo" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0">
      <button
        type="button"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm border-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close video modal"
        tabIndex={-1}
      />
      <div className="w-full max-w-4xl mx-auto px-4"
        style={{
          paddingTop: '7rem',
          height: 'calc(100vh - 7rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full bg-black rounded-lg overflow-hidden shrink-0"
          style={{
            aspectRatio: '16/9',
            maxHeight: 'calc(100% - 6rem)',
            maxWidth: '100%'
          }}>
          <video
            width="100%"
            height="100%"
            controls
            preload="metadata"
            className="w-full h-full"
            style={{ objectFit: 'contain' }}
            key={videoSrc}
            poster={poster}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close video</span>
          </button>

        </div>

        {onNext && (
          <div className="flex justify-end w-full">
            <button
              onClick={onNext}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2 group"
            >
              {nextLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
