// DISABLED: import from 'motion/react';
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  variant?: "fullscreen" | "inline" | "modal";
  message?: string;
  submessage?: string;
  showProgress?: boolean;
  mascotSrc?: string;
  wordmarkSrc?: string;
  primaryColor?: string;
  glowColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

export function LoadingAnimation({
  variant = "fullscreen",
  message = "Carregando",
  submessage,
  showProgress = true,
  mascotSrc,
  wordmarkSrc,
  primaryColor = "#1877F2",
  textColor = "#1E3A8A",
  backgroundColor = "#ffffff",
}: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showProgress) return;

    // Realistic progress: starts fast, then slows down
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Stop at 90% and wait
        const increment = (90 - prev) * 0.1;
        return Math.min(prev + increment, 90);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showProgress]);

  const containerClasses = {
    fullscreen: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
    inline: "flex flex-col items-center justify-center py-8",
    modal: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm",
  };

  const content = (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Logos */}
      <div className="flex flex-col items-center gap-4">
        {mascotSrc && (
          <img
            src={mascotSrc}
            alt="Logo"
            className="w-48 h-48 object-contain" // Doubled size (was w-24 h-24)
            style={{ filter: "none" }}
          />
        )}
        {wordmarkSrc && (
          <img
            src={wordmarkSrc}
            alt="Brand"
            className="h-10 object-contain mt-2 mx-auto" // Centered
            style={{ filter: "none" }}
          />
        )}
      </div>

      {/* Modern Percentage & Loading Animation */}
      {showProgress && (
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Percentage - Smaller */}
          <span
            className="text-2xl font-light tracking-tighter font-dm-sans" // Smaller text (was text-6xl)
            style={{ color: primaryColor }}
          >
            {Math.round(progress)}%
          </span>

          {/* Progress Bar - Full Width */}
          <div className="w-full h-1.5 bg-gray-100 mt-4 fixed bottom-0 left-0 right-0">
            <div
              className="h-full"
              style={{ backgroundColor: primaryColor }}

              animate={{ width: `${progress}%` }}

            />
          </div>
        </div>
      )}
    </div>
  );

  if (variant === "modal") {
    return (
      <div className={containerClasses.modal}>
        <div className="bg-white p-16 rounded-3xl shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={containerClasses[variant]}
      style={{ backgroundColor: variant === 'fullscreen' ? backgroundColor : undefined }}
    >
      {content}
    </div>
  );
}
