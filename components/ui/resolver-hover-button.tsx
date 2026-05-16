"use client"

import * as React from "react"
import { motion } from "motion/react"

interface ResolverHoverButtonProps {
    onClick?: () => void;
}

export default function ResolverHoverButton({ onClick }: ResolverHoverButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div className="w-full flex justify-center items-center">
            <button
                onClick={onClick}
                className="relative"
            >
                <div

 
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}

                    className="bg-green-600 hover:bg-green-700 flex items-center justify-center overflow-hidden relative"
                    style={{ borderRadius: 32 }}
                >
                    <div
                        className="absolute"
                        animate={{
                            opacity: isHovered ? 0 : 1,
                            scale: isHovered ? 0.8 : 1
                        }}

                    >
                        <span className="text-white text-2xl">✓</span>
                    </div>

                    <div
                        className="w-full flex justify-center items-center"



                    >
                        <span className="text-white font-semibold whitespace-nowrap font-inter text-base">
                            Resolver
                        </span>
                    </div>
                </div>
            </button>
        </div>
    )
}
