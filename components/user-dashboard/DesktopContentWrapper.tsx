import { ReactNode, useEffect, useState } from 'react';

interface DesktopContentWrapperProps {
  children: ReactNode;
}

export function DesktopContentWrapper({ children }: DesktopContentWrapperProps) {
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      // Only on mobile (under 768px)
      if (window.innerWidth < 768) {
        // Base design is 390px wide
        const baseWidth = 390;
        const viewportWidth = window.innerWidth;
        
        // Calculate scale to fill viewport width
        const scale = viewportWidth / baseWidth;
        setMobileScale(scale);
      } else {
        setMobileScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <>
      {/* Mobile: scales to fit all phone sizes proportionally */}
      <div className="md:hidden w-full">
        <div 
          style={{ 
            width: '390px',
            transform: `scale(${mobileScale})`,
            transformOrigin: 'top center',
          }}
        >
          {children}
        </div>
      </div>
      
      {/* Desktop: scaled up to match Figma reference */}
      <div className="hidden md:block w-full">
        <div className="flex justify-center w-full">
          <div 
            style={{ 
              width: '390px',
              transform: 'scale(1.8)',
              transformOrigin: 'top center',
              marginTop: '2rem',
              marginBottom: '50vh'
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}