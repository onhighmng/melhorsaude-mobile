'use client';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface FlowButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: 'blue' | 'orange' | 'purple' | 'green' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function FlowButton({ 
  text = "Button", 
  onClick,
  variant = 'blue',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false
}: FlowButtonProps) {
  
  const variantStyles = {
    blue: {
      border: 'border-[#007AFF]/40',
      text: 'text-[#007AFF]',
      hoverText: 'group-hover:text-white',
      circle: 'bg-[#007AFF]',
      arrow: 'stroke-[#007AFF]',
      hoverArrow: 'group-hover:stroke-white',
    },
    orange: {
      border: 'border-[#FF9500]/40',
      text: 'text-[#FF9500]',
      hoverText: 'group-hover:text-white',
      circle: 'bg-[#FF9500]',
      arrow: 'stroke-[#FF9500]',
      hoverArrow: 'group-hover:stroke-white',
    },
    purple: {
      border: 'border-[#AF52DE]/40',
      text: 'text-[#AF52DE]',
      hoverText: 'group-hover:text-white',
      circle: 'bg-[#AF52DE]',
      arrow: 'stroke-[#AF52DE]',
      hoverArrow: 'group-hover:stroke-white',
    },
    green: {
      border: 'border-[#34C759]/40',
      text: 'text-[#34C759]',
      hoverText: 'group-hover:text-white',
      circle: 'bg-[#34C759]',
      arrow: 'stroke-[#34C759]',
      hoverArrow: 'group-hover:stroke-white',
    },
    outline: {
      border: 'border-gray-300',
      text: 'text-gray-700',
      hoverText: 'group-hover:text-white',
      circle: 'bg-gray-900',
      arrow: 'stroke-gray-700',
      hoverArrow: 'group-hover:stroke-white',
    },
    white: {
      border: 'border-white/40',
      text: 'text-white',
      hoverText: 'group-hover:text-gray-900',
      circle: 'bg-white',
      arrow: 'stroke-white',
      hoverArrow: 'group-hover:stroke-gray-900',
    },
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-sm',
  };

  const styles = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] ${styles.border} bg-transparent ${sizeClass} ${styles.text} ${styles.hoverText} cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={`absolute w-4 h-4 left-[-25%] ${styles.arrow} fill-none z-[9] group-hover:left-4 ${styles.hoverArrow} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />

      {/* Custom Icon (if provided, replaces left arrow) */}
      {Icon && (
        <Icon 
          className={`absolute w-4 h-4 left-[-25%] ${styles.arrow} fill-none z-[9] group-hover:left-4 ${styles.hoverArrow} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
        />
      )}

      {/* Text */}
      <span className={`relative z-[1] ${Icon ? 'translate-x-0 group-hover:translate-x-2' : '-translate-x-3 group-hover:translate-x-3'} transition-all duration-[800ms] ease-out`}>
        {text}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${styles.circle} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={`absolute w-4 h-4 right-4 ${styles.arrow} fill-none z-[9] group-hover:right-[-25%] ${styles.hoverArrow} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />
    </button>
  );
}
