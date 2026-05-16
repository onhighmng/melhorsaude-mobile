'use client';

import { cn } from '@/lib/utils';

// DISABLED: import from 'motion/react';
import {
  BookOpen,
  Video,
  Headphones,
  ChevronRight,
  Search,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Shortcut {
  label: string;
  icon: React.ReactNode;
  link: string;
}

interface SearchResult {
  icon: React.ReactNode;
  label: string;
  description: string;
  link: string;
  onSelect?: () => void;
}

const SVGFilter = () => {
  return (
    <svg width="0" height="0">
      <filter id="blob">
        <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
        <feColorMatrix
          values="
      1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 18 -9
    "
          result="blob"
        />
        <feBlend in="SourceGraphic" in2="blob" />
      </filter>
    </svg>
  );
};

interface ShortcutButtonProps {
  icon: React.ReactNode;
  link: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const ShortcutButton = ({ icon, link, onClick, isSelected }: ShortcutButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "rounded-full cursor-pointer transition-all duration-200",
        isSelected
          ? "opacity-100 shadow-xl ring-2 ring-white/40"
          : "opacity-30 hover:opacity-100 hover:shadow-lg"
      )}
    >
      <div className="size-16 aspect-square flex items-center justify-center">{icon}</div>
    </div>
  );
};

interface SpotlightPlaceholderProps {
  text: string;
  className?: string;
}

const SpotlightPlaceholder = ({ text, className }: SpotlightPlaceholderProps) => {
  return (
    <div
      layout
      className={cn('absolute text-gray-400 flex items-center pointer-events-none z-10', className)}
    >
      
        <p
 `}
 




        >
          {text}
        </p>
      
    </div>
  );
};

interface SpotlightInputProps {
  placeholder: string;
  hidePlaceholder: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholderClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SpotlightInput = ({
  placeholder,
  hidePlaceholder,
  value,
  onChange,
  placeholderClassName,
  onFocus,
  onBlur
}: SpotlightInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center w-full justify-start gap-2 px-6 h-16">
      <div layoutId="search-icon" className="text-black">
        <Search />
      </div>
      <div className="flex-1 relative text-2xl">
        {!hidePlaceholder && (
          <SpotlightPlaceholder text={placeholder} className={placeholderClassName} />
        )}

        <input
          ref={inputRef}
          layout="position"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-transparent outline-none ring-none"
        />
      </div>
    </div>
  );
};

interface SearchResultCardProps extends SearchResult {
  isLast: boolean;
}

const SearchResultCard = ({ icon, label, description, link, isLast, onSelect }: SearchResultCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <a href={link} onClick={handleClick} className="overflow-hidden w-full group/card">
      <div
        className={cn(
          'flex items-center text-black justify-start hover:bg-white gap-3 py-2 px-2 rounded-3xl hover:shadow-md w-full cursor-pointer',
          isLast && 'rounded-b-3xl'
        )}
      >
        <div className="size-8 [&_svg]:stroke-[1.5] [&_svg]:size-6 aspect-square flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{label}</p>
          <p className="text-xs opacity-50">{description}</p>
        </div>
        <div className="flex-1 flex items-center justify-end opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
          <ChevronRight className="size-6" />
        </div>
      </div>
    </a>
  );
};

interface SearchResultsContainerProps {
  searchResults: SearchResult[];
  onHover: (index: number | null) => void;
}

const SearchResultsContainer = ({ searchResults, onHover }: SearchResultsContainerProps) => {
  return (
    <div
      layout
      onMouseLeave={() => onHover(null)}
      className="px-2 border-t border-white/20 flex flex-col bg-neutral-100 max-h-96 overflow-y-auto w-full py-2"
    >
      {searchResults.length === 0 ? (
        <div className="px-4 py-6 text-center text-gray-500">
          Nenhum resultado encontrado
        </div>
      ) : (
        searchResults.map((result, index) => {
          return (
            <div
              key={`search-result-${index}`}
              onMouseEnter={() => onHover(index)}



              transition={{
                delay: index * 0.05,
                duration: 0.2,
                ease: 'easeOut'
              }}
            >
              <SearchResultCard
                icon={result.icon}
                label={result.label}
                description={result.description}
                link={result.link}
                isLast={index === searchResults.length - 1}
                onSelect={result.onSelect}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

interface AppleSpotlightProps {
  shortcuts?: Shortcut[];
  searchResults?: SearchResult[];
  isOpen?: boolean;
  handleClose?: () => void;
  onShortcutClick?: (label: string) => void;
  selectedFilter?: string | null;
  onSearchQueryChange?: (query: string) => void;
  searchValue?: string;
}

const AppleSpotlight = ({
  shortcuts = [
    {
      label: 'Artigos',
      icon: <BookOpen />,
      link: '#'
    },
    {
      label: 'Vídeos',
      icon: <Video />,
      link: '#'
    },
    {
      label: 'Áudios',
      icon: <Headphones />,
      link: '#'
    }
  ],
  searchResults = [],
  isOpen = true,
  handleClose = () => {},
  onShortcutClick,
  selectedFilter,
  onSearchQueryChange,
  searchValue: externalSearchValue = ''
}: AppleSpotlightProps) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredSearchResult, setHoveredSearchResult] = useState<number | null>(null);
  const [hoveredShortcut, setHoveredShortcut] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState(externalSearchValue);
  const [isFocused, setIsFocused] = useState(false);

  // Sync internal state with external prop
  useEffect(() => {
    setSearchValue(externalSearchValue);
  }, [externalSearchValue]);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay to allow click events on shortcuts to fire
    setTimeout(() => setIsFocused(false), 200);
  };

  // Filter search results based on search value
  const filteredResults = searchValue 
    ? searchResults.filter(result => 
        result.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        result.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : searchResults;

  return (
    
      {isOpen && (
        <div
          initial={{
            opacity: 0,
            filter: 'blur(20px) url(#blob)',
            scaleX: 1.3,
            scaleY: 1.1,
            y: -10
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px) url(#blob)',
            scaleX: 1,
            scaleY: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            filter: 'blur(20px) url(#blob)',
            scaleX: 1.3,
            scaleY: 1.1,
            y: 10
          }}
          transition={{
            stiffness: 550,
            damping: 50,
            type: 'spring'
          }}
          className="w-full flex flex-col items-center justify-center"
        >
          <SVGFilter />

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setHoveredShortcut(null);
            }}
            style={{ filter: 'url(#blob)' }}
            className={cn(
              'w-full flex items-center justify-center gap-4 z-20 group',
              '[&>div]:bg-white/10 [&>div]:text-white [&>div]:rounded-full [&>div]:backdrop-blur-xl',
              '[&_svg]:size-7 [&_svg]:stroke-[1.4]',
              'max-w-3xl'
            )}
          >
            
              <div
                layoutId="search-input-container"
                transition={{
                  layout: {
                    duration: 0.5,
                    type: 'spring',
                    bounce: 0.2
                  }
                }}
                style={{
                  borderRadius: '30px'
                }}
                className="h-full w-full flex flex-col items-center justify-start z-10 relative shadow-lg overflow-hidden border border-white/20"
              >
                <SpotlightInput
                  placeholder={
                    hoveredShortcut !== null
                      ? shortcuts[hoveredShortcut].label
                      : hoveredSearchResult !== null
                      ? filteredResults[hoveredSearchResult]?.label || 'Pesquisar'
                      : 'Pesquisar'
                  }
                  placeholderClassName={
                    hoveredSearchResult !== null ? 'text-black bg-white' : 'text-gray-500'
                  }
                  hidePlaceholder={!(hoveredSearchResult !== null || !searchValue)}
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                {searchValue && (
                  <SearchResultsContainer
                    searchResults={filteredResults}
                    onHover={setHoveredSearchResult}
                  />
                )}
              </div>
            
          </div>

          {/* Shortcuts - appear below search bar on hover (desktop) or focus (mobile) */}
          {((hovered && !searchValue) || (isFocused && !searchValue)) && (
            <div




              className="w-full max-w-3xl mt-4 flex justify-center gap-4"
            >
              {shortcuts.map((shortcut, index) => (
                <button
                  key={`shortcut-${index}`}
                  onClick={() => onShortcutClick?.(shortcut.label)}
                  onMouseEnter={() => setHoveredShortcut(index)}
                  onMouseLeave={() => setHoveredShortcut(null)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-200",
                    "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md",
                    "hover:bg-white hover:shadow-lg active:scale-95",
                    selectedFilter === shortcut.label && "ring-2 ring-blue-500 bg-blue-50"
                  )}
                >
                  <div className="text-black [&_svg]:size-6">
                    {shortcut.icon}
                  </div>
                  <span className="text-xs font-medium text-black">
                    {shortcut.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    
  );
};

export { AppleSpotlight };