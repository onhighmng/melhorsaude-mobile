'use client';

import React, { useMemo } from 'react';
// DISABLED: import from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number;
    spread?: number;
    style?: React.CSSProperties;
}

export function TextShimmer({
    children,
    as: Component = 'p',
    className,
    duration = 2,
    spread = 2,
    style,
}: TextShimmerProps) {
    const motionProps = useMemo(
        () => ({
            initial: { backgroundPosition: '100% 0' },
            animate: { backgroundPosition: '0% 0' },
            transition: {
                repeat: Infinity,
                duration,
                ease: 'linear',
            },
        }),
        [duration]
    );

    return (
        <Component
            className={cn(
                'relative inline-block bg-[length:250%_100%] bg-clip-text text-transparent',
                'bg-gradient-to-r from-transparent via-black/80 to-transparent dark:via-white/80',
                className
            )}
            style={{
                ...style,
                backgroundImage: `linear-gradient(to right, transparent, var(--base-gradient-color, rgba(0,0,0,0.1)) ${spread}%, var(--base-color, black), var(--base-gradient-color, rgba(0,0,0,0.1)) ${100 - spread}%, transparent)`,
            }}
            {...motionProps}
        >
            {children}
        </Component>
    );
}
