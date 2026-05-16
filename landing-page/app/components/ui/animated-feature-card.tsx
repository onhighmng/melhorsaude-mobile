// components/ui/animated-feature-card.tsx

import * as React from "react";
// DISABLED: import from 'motion/react';
import { cn } from "./utils";

// Define the props for the component
interface AnimatedFeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The numerical index to display, e.g., "001" */
  index: string;
  /** The tag or category label */
  tag: string;
  /** The main title or description */
  title: React.ReactNode;
  /** The URL for the central image */
  imageSrc: string;
  /** The color variant which determines the gradient and tag color */
  color: "orange" | "purple" | "blue" | "green" | "red" | "indigo";
}

// Define HSL color values for each variant
const colorVariants = {
  orange: {
    '--feature-color': 'hsl(35, 91%, 55%)',
    '--feature-color-light': 'hsl(41, 100%, 85%)',
    '--feature-color-dark': 'hsl(24, 98%, 98%)',
  },
  purple: {
    '--feature-color': 'hsl(262, 85%, 60%)',
    '--feature-color-light': 'hsl(261, 100%, 87%)',
    '--feature-color-dark': 'hsl(264, 100%, 98%)',
  },
  blue: {
    '--feature-color': 'hsl(211, 100%, 60%)',
    '--feature-color-light': 'hsl(210, 100%, 83%)',
    '--feature-color-dark': 'hsl(216, 100%, 98%)',
  },
  green: {
    '--feature-color': 'hsl(142, 71%, 45%)',
    '--feature-color-light': 'hsl(142, 76%, 85%)',
    '--feature-color-dark': 'hsl(138, 76%, 97%)',
  },
  red: {
    '--feature-color': 'hsl(0, 84%, 60%)',
    '--feature-color-light': 'hsl(0, 100%, 87%)',
    '--feature-color-dark': 'hsl(0, 100%, 97%)',
  },
  indigo: {
    '--feature-color': 'hsl(239, 84%, 67%)',
    '--feature-color-light': 'hsl(239, 100%, 87%)',
    '--feature-color-dark': 'hsl(239, 100%, 97%)',
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, index, tag, title, imageSrc, color, ...props }, ref) => {
  const cardStyle = colorVariants[color] as React.CSSProperties;

  return (
    <div
      ref={ref}
      style={cardStyle}
      className={cn(
        "relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-2xl border bg-card p-6 shadow-lg",
        className
      )}
      initial="initial"
      whileInView="inView"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px", root: undefined }}
      variants={{
        initial: { opacity: 0, y: 20 },
        inView: { opacity: 1, y: 0 },
        hover: { y: -10 },
      }}

      {...props}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)`
        }}
      />
      
      {/* Index Number */}
      <div className="absolute top-6 left-6 font-mono text-lg font-bold text-muted-foreground">
        {index}
      </div>

      {/* Main Image */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.3, y: -20 },
        }}

      >
        <img
          src={imageSrc}
          alt={tag}
          className="w-40 h-40 object-contain"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 rounded-lg border bg-background/80 p-4 backdrop-blur-sm dark:bg-background/60">
        <span
          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{ 
            backgroundColor: 'var(--feature-color-dark)', 
            color: 'var(--feature-color)' 
          }}
        >
          {tag}
        </span>
        <p className="text-base text-card-foreground font-['Inter:Regular',sans-serif]">{title}</p>
      </div>
    </div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };