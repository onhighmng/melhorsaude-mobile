import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  text: string;
  confirmationText: string;
  className?: string;
  disabled?: boolean;
}

export function AnimatedActionButton({
  onClick,
  icon: Icon,
  text,
  confirmationText,
  className = "",
  disabled = false
}: AnimatedActionButtonProps) {
  const [triggered, setTriggered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 2000;

  useEffect(() => {
    if (triggered) {
      // Delay showing confirmation to allow blur-out animation
      const showTimer = setTimeout(() => {
        setShowConfirmation(true);
      }, 400);

      setProgress(0);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration) {
          clearInterval(interval);
          setShowConfirmation(false);
          setTimeout(() => {
            setTriggered(false);
            setProgress(0);
          }, 400);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [triggered]);

  const handleClick = () => {
    if (disabled) return;
    onClick();
    setTriggered(true);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden flex items-center justify-center gap-2 py-3.5 px-6 rounded-full transition-all font-medium ${className}`}
    >
      {/* Progress background */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-black/10 dark:bg-white/10 rounded-full"
        style={{ 
          width: `${progress}%`,
          opacity: triggered ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Original content */}
      <div 
        className="flex items-center justify-center gap-2 relative z-10"
        style={{
          opacity: triggered ? 0 : 1,
          filter: triggered ? 'blur(12px)' : 'blur(0px)',
          transform: triggered ? 'scale(0.92)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Icon className="w-5 h-5" />
        <span>{text}</span>
      </div>

      {/* Confirmation content */}
      <div 
        className="absolute inset-0 flex items-center justify-center gap-2 z-20"
        style={{
          opacity: showConfirmation ? 1 : 0,
          filter: showConfirmation ? 'blur(0px)' : 'blur(12px)',
          transform: showConfirmation ? 'scale(1)' : 'scale(1.08)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      >
        <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg 
            className="w-3.5 h-3.5 text-green-500 dark:text-green-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: showConfirmation ? 0 : 24,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />
          </svg>
        </div>
        <span className="font-medium">{confirmationText}</span>
      </div>
    </button>
  );
}
