'use client';

import { cn } from '@/lib/utils';
// DISABLED: import from 'motion/react';
import { Search, X } from 'lucide-react';
import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Pesquisar recursos...',
  value,
  onChange,
  className
}: SearchBarProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div



      className={cn(
        'w-full flex items-center gap-3 px-5 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:bg-white/15 hover:border-white/30 focus-within:bg-white/15 focus-within:border-white/40',
        className
      )}
    >
      <Search className="w-5 h-5 text-gray-300 flex-shrink-0" />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-base"
      />
      
      {value && (
        <button



          onClick={() => onChange('')}
          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
};