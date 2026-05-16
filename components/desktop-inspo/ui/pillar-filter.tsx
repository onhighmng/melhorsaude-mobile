'use client';

import { cn } from '@/lib/utils';
// DISABLED: import from 'framer-motion';
import React from 'react';

export type PillarType = 'mental' | 'fisico' | 'financeiro' | 'juridico';

interface Pillar {
    id: PillarType;
    label: string;
    bgColor: string;
    textColor: string;
}

const pillars: Pillar[] = [
    {
        id: 'mental',
        label: 'Saúde Mental',
        bgColor: 'bg-[#e3f2fd]',
        textColor: 'text-[#1976d2]'
    },
    {
        id: 'fisico',
        label: 'Físico',
        bgColor: 'bg-[#fff3e0]',
        textColor: 'text-[#ff9800]'
    },
    {
        id: 'financeiro',
        label: 'Financeiro',
        bgColor: 'bg-[#e8f5e9]',
        textColor: 'text-[#388e3c]'
    },
    {
        id: 'juridico',
        label: 'Jurídico',
        bgColor: 'bg-[#f3e5f5]',
        textColor: 'text-[#9c27b0]'
    }
];

interface PillarFilterProps {
    selectedPillar: PillarType | null;
    onPillarClick: (pillar: PillarType) => void;
}

export function PillarFilter({ selectedPillar, onPillarClick }: PillarFilterProps) {
    return (
        <div



            className="w-full max-w-3xl mx-auto"
        >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex items-center justify-between gap-1 border border-white/10">
                {pillars.map((pillar, index) => {
                    const isSelected = selectedPillar === pillar.id;

                    return (
                        <button
                            key={pillar.id}
                            onClick={() => onPillarClick(pillar.id)}
                            className={cn(
                                'flex-1 rounded-full px-4 py-2 transition-all duration-200 relative',
                                pillar.bgColor,
                                pillar.textColor,
                                'hover:shadow-lg hover:scale-105 active:scale-95',
                                isSelected && 'ring-2 ring-white/50 shadow-xl scale-105'
                            )}
 
 
                        >
                            <p className="font-['Nunito:Bold',sans-serif] text-[12px] text-nowrap truncate">
                                {pillar.label}
                            </p>
                            {isSelected && (
                                <div
                                    layoutId="pillar-indicator"
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
