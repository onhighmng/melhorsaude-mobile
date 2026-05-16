'use client';
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  forwardRef
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
  useInView,
} from 'motion/react';
import { cn } from './utils';
import { XIcon, Plus, ChevronRight, MousePointerClick, Hand } from 'lucide-react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLDivElement>;
};

function DialogTrigger({
  children,
  className,
  style,
  triggerRef,
}: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <div
      ref={triggerRef}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role='button'
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </div>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  return (
    <>
      <div
        ref={containerRef}
        className={cn('overflow-hidden', className)}
        style={style}
        role='dialog'
        aria-modal='true'
        aria-labelledby={`dialog-title-${uniqueId}`}
        aria-describedby={`dialog-description-${uniqueId}`}




      >
        {children}
      </div>
    </>
  );
}

type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContainer({ children, className }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return (
    
      {isOpen && (
        <>
          <div
            key={`backdrop-${uniqueId}`}
            className='fixed inset-0 h-full z-50  w-full bg-white/40 dark:bg-black/40 '



            transition={{
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1]
            }}
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(`fixed  inset-0 z-50 w-fit mx-auto`, className)}>
            {children}
          </div>
        </>
      )}
    
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTitle({ children, className, style }: DialogTitleProps) {

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

type DialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  return (
    <div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial='initial'
      animate='animate'
      exit='exit'
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </div>
  );
}



interface DialogImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // Allow other props
}

function DialogImage({ src, alt, className, style, ...props }: DialogImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      style={style}
      decoding="async"
      {...props}
    />
  );
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <button
      onClick={handleClose}
      type='button'
      aria-label='Close dialog'
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6', className)}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </button>
  );
}

interface ComponentItem {
  id: number;
  url: { src: string };
  title: React.ReactNode;
  subtitle: React.ReactNode;
  specialists: string[];
  specialistsTitle: string;
}

interface ComponentProps {
  items: ComponentItem[];
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(({ items }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}

            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1], // Custom bezier for ultra-smooth easing
            }}
          >
            <Dialog
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 35,
                mass: 1,
                restSpeed: 0.001,
                restDelta: 0.001,
              }}
            >
              <DialogTrigger
                style={{
                  borderRadius: '12px',
                }}
                className='group flex w-full flex-col overflow-hidden border border-gray-200 bg-white hover:bg-gray-50 dark:bg-black dark:border-gray-800 dark:hover:bg-gray-950 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-400'
              >
                {/* Badge "Ver mais" with click icon - Always visible on desktop */}
                <div className="absolute top-3 left-3 z-10 hidden md:flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <div className="animate-pulse">
                    <MousePointerClick className='w-3 h-3' />
                  </div>
                  Ver mais
                </div>

                {/* Touch Hint Icon - Mobile only */}
                <div className='absolute bottom-3 right-3 z-10 md:hidden'>
                  <div className='bg-blue-500 text-white p-2 rounded-full shadow-lg animate-bounce'>
                    <Hand className='w-5 h-5' />
                  </div>
                </div>

                {/* Overlay hover effect */}
                <div className='absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]' />

                <DialogImage
                  src={item.url.src}
                  alt="Card Image"
                  className='h-64 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform'
                />
                <div className='flex flex-grow flex-row items-end justify-between p-4 relative z-10'>
                  <div className='flex-1'>
                    <DialogTitle className='text-zinc-950 text-xl font-bold dark:text-zinc-50 mb-1 group-hover:text-blue-600 transition-colors duration-300'>
                      {item.title}
                    </DialogTitle>
                    <DialogSubtitle className='text-zinc-600 text-sm dark:text-zinc-400 flex items-center gap-1'>
                      {item.subtitle}
                      <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' />
                    </DialogSubtitle>
                  </div>
                  <button
                    className='ml-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-all shadow-lg'
 
 

                  >
                    <Plus className='w-5 h-5' />
                  </button>
                </div>
              </DialogTrigger>
              <DialogContainer className='pt-20'>
                <DialogContent
                  style={{
                    borderRadius: '24px',
                  }}
                  className='relative flex h-auto max-h-[90vh] mx-auto flex-col overflow-y-auto border border-gray-200 bg-white dark:bg-black dark:border-gray-800 lg:w-[800px] w-[90%]'
                >
                  <DialogImage
                    src={item.url.src}
                    alt="Card Image"
                    className='h-[300px] object-cover w-full'
                  />
                  <div className='p-8'>
                    <DialogTitle className='text-4xl md:text-5xl font-bold text-zinc-950 dark:text-zinc-50 mb-3'>
                      {item.title}
                    </DialogTitle>
                    <DialogSubtitle className='text-xl text-zinc-600 dark:text-zinc-400 mb-6'>
                      {item.subtitle}
                    </DialogSubtitle>

                    <DialogDescription
                      disableLayoutAnimation
                      variants={{
                        initial: { opacity: 0, scale: 0.95, y: 20 },
                        animate: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                          }
                        },
                        exit: {
                          opacity: 0,
                          scale: 0.95,
                          y: 20,
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                          }
                        },
                      }}
                    >
                      <div className='space-y-4'>
                        <h3 className='text-2xl font-bold text-zinc-950 dark:text-zinc-50'>
                          {item.specialistsTitle}
                        </h3>
                        <ul className='space-y-2'>
                          {item.specialists.map((specialist, index) => (
                            <li key={index} className='flex items-start'>
                              <span className='text-blue-500 mr-2'>•</span>
                              <span className='text-zinc-700 dark:text-zinc-300'>{specialist}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogDescription>
                  </div>
                  <DialogClose className='text-zinc-950 dark:text-zinc-50 bg-gray-200 dark:bg-gray-800 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors' />
                </DialogContent>
              </DialogContainer>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
});

Component.displayName = 'Component';

export default Component;

export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
};