'use client';

import { cn } from '../../lib/utils';
// DISABLED: import from 'motion/react';
import React from 'react';
import { BookOpen, Video, Headphones } from 'lucide-react';

export type ContentType = 'article' | 'video' | 'audio';

interface ContentTypeOption {
    id: ContentType;
    label: string;
    bgColor: string;
    textColor: string;
    icon: React.ReactNode;
}

const contentTypes: ContentTypeOption[] = [
    {
        id: 'article',
        label: 'Artigos',
        bgColor: 'bg-[#e3f2fd]',
        textColor: 'text-[#1976d2]',
        icon: <BookOpen className="w-4 h-4" />
    },
    {
        id: 'video',
        label: 'Vídeos',
        bgColor: 'bg-[#fff3e0]',
        textColor: 'text-[#ff9800]',
        icon: <Video className="w-4 h-4" />
    },
    {
        id: 'audio',
        label: 'Áudios',
        bgColor: 'bg-[#f3e5f5]',
        textColor: 'text-[#9c27b0]',
        icon: <Headphones className="w-4 h-4" />
    }
];

interface ContentTypeFilterProps {
    selectedType: ContentType | null;
    onTypeClick: (type: ContentType) => void;
}

export function ContentTypeFilter({ selectedType, onTypeClick }: ContentTypeFilterProps) {
    return (
        <div



            className="w-full max-w-3xl mx-auto"
        >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex items-center justify-between gap-1 border border-white/10">
                {contentTypes.map((type) => {
                    const isSelected = selectedType === type.id;

                    return (
                        <button
                            key={type.id}
                            onClick={() => onTypeClick(type.id)}
                            className={cn(
                                'flex-1 rounded-full px-4 py-2 transition-all duration-200 relative flex items-center justify-center gap-2',
                                type.bgColor,
                                type.textColor,
                                'hover:shadow-lg hover:scale-105 active:scale-95',
                                isSelected && 'ring-2 ring-white/50 shadow-xl scale-105'
                            )}
 
 
                        >
                            {type.icon}
                            <p className="font-['Nunito:Bold',sans-serif] text-[12px] text-nowrap truncate">
                                {type.label}
                            </p>
                            {isSelected && (
                                <div
                                    layoutId="content-type-indicator"
                                    className="absolute inset-0 rounded-full border-2 border-white/30"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
