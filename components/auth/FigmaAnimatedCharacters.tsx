import React, { useState, useEffect, useRef } from 'react';

// --- Animated Characters Components ---

interface PupilProps {
    size?: number;
    maxDistance?: number;
    pupilColor?: string;
    forceLookX?: number;
    forceLookY?: number;
    mouseX: number;
    mouseY: number;
}

const Pupil = ({
    size = 12,
    maxDistance = 5,
    pupilColor = "black",
    forceLookX,
    forceLookY,
    mouseX,
    mouseY
}: PupilProps) => {
    const pupilRef = useRef<HTMLDivElement>(null);

    const calculatePupilPosition = () => {
        if (!pupilRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const pupil = pupilRef.current.getBoundingClientRect();
        const pupilCenterX = pupil.left + pupil.width / 2;
        const pupilCenterY = pupil.top + pupil.height / 2;

        const deltaX = mouseX - pupilCenterX;
        const deltaY = mouseY - pupilCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={pupilRef}
            className="rounded-full"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: pupilColor,
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        />
    );
};

interface EyeBallProps {
    size?: number;
    pupilSize?: number;
    maxDistance?: number;
    eyeColor?: string;
    pupilColor?: string;
    isBlinking?: boolean;
    forceLookX?: number;
    forceLookY?: number;
    mouseX: number;
    mouseY: number;
}

const EyeBall = ({
    size = 48,
    pupilSize = 16,
    maxDistance = 10,
    eyeColor = "white",
    pupilColor = "black",
    isBlinking = false,
    forceLookX,
    forceLookY,
    mouseX,
    mouseY
}: EyeBallProps) => {
    const eyeRef = useRef<HTMLDivElement>(null);

    const calculatePupilPosition = () => {
        if (!eyeRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const eye = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={eyeRef}
            className="rounded-full flex items-center justify-center transition-all duration-150"
            style={{
                width: `${size}px`,
                height: isBlinking ? '2px' : `${size}px`,
                backgroundColor: eyeColor,
                overflow: 'hidden',
            }}
        >
            {!isBlinking && (
                <div
                    className="rounded-full"
                    style={{
                        width: `${pupilSize}px`,
                        height: `${pupilSize}px`,
                        backgroundColor: pupilColor,
                        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
            )}
        </div>
    );
};

export interface AnimatedCharactersProps {
    isTyping: boolean;
    password?: string;
    showPassword?: boolean;
}

export function AnimatedCharacters({ isTyping, password = '', showPassword = false }: AnimatedCharactersProps) {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [isBlueBlinking, setIsBlueBlinking] = useState(false);
    const [isDarkBlinking, setIsDarkBlinking] = useState(false);
    const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
    const [isBluePeeking, setIsBluePeeking] = useState(false);
    const blueRef = useRef<HTMLDivElement>(null);
    const darkRef = useRef<HTMLDivElement>(null);
    const lightBlueRef = useRef<HTMLDivElement>(null);
    const skyBlueRef = useRef<HTMLDivElement>(null);

    // Throttled mouse listener using requestAnimationFrame
    useEffect(() => {
        let animationFrameId: number;
        let isTicking = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isTicking) {
                animationFrameId = requestAnimationFrame(() => {
                    setMouseX(e.clientX);
                    setMouseY(e.clientY);
                    isTicking = false;
                });
                isTicking = true;
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsBlueBlinking(true);
                setTimeout(() => {
                    setIsBlueBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());
            return blinkTimeout;
        };
        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsDarkBlinking(true);
                setTimeout(() => {
                    setIsDarkBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());
            return blinkTimeout;
        };
        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (isTyping) {
            setIsLookingAtEachOther(true);
            const timer = setTimeout(() => {
                setIsLookingAtEachOther(false);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setIsLookingAtEachOther(false);
        }
    }, [isTyping]);

    useEffect(() => {
        if (password.length > 0 && showPassword) {
            const schedulePeek = () => {
                const peekInterval = setTimeout(() => {
                    setIsBluePeeking(true);
                    setTimeout(() => {
                        setIsBluePeeking(false);
                    }, 800);
                }, Math.random() * 3000 + 2000);
                return peekInterval;
            };
            const firstPeek = schedulePeek();
            return () => clearTimeout(firstPeek);
        } else {
            setIsBluePeeking(false);
        }
    }, [password, showPassword, isBluePeeking]);

    const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
        const rect = ref.current.getBoundingClientRect();
        // Use last known mouse position from state
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const faceX = Math.max(-15, Math.min(15, deltaX / 20));
        const faceY = Math.max(-10, Math.min(10, deltaY / 30));
        const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
        return { faceX, faceY, bodySkew };
    };

    const bluePos = calculatePosition(blueRef);
    const darkPos = calculatePosition(darkRef);
    const lightBluePos = calculatePosition(lightBlueRef);
    const skyBluePos = calculatePosition(skyBlueRef);

    return (
        <div className="relative z-20 flex items-end justify-center h-[500px]">
            <div className="relative" style={{ width: '550px', height: '400px' }}>
                <div
                    ref={blueRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                        left: '70px',
                        width: '180px',
                        height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
                        backgroundColor: '#3973E1',
                        borderRadius: '10px 10px 0 0',
                        zIndex: 1,
                        transform: (password.length > 0 && showPassword)
                            ? `skewX(0deg)`
                            : (isTyping || (password.length > 0 && !showPassword))
                                ? `skewX(${(bluePos.bodySkew || 0) - 12}deg) translateX(40px)`
                                : `skewX(${bluePos.bodySkew || 0}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div
                        className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                        style={{
                            left: (password.length > 0 && showPassword) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + bluePos.faceX}px`,
                            top: (password.length > 0 && showPassword) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + bluePos.faceY}px`,
                        }}
                    >
                        <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#1E3A8A" isBlinking={isBlueBlinking}
                            forceLookX={(password.length > 0 && showPassword) ? (isBluePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                            forceLookY={(password.length > 0 && showPassword) ? (isBluePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                            mouseX={mouseX} mouseY={mouseY}
                        />
                        <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#1E3A8A" isBlinking={isBlueBlinking}
                            forceLookX={(password.length > 0 && showPassword) ? (isBluePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                            forceLookY={(password.length > 0 && showPassword) ? (isBluePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                            mouseX={mouseX} mouseY={mouseY}
                        />
                    </div>
                </div>

                <div
                    ref={darkRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                        left: '240px',
                        width: '120px',
                        height: '310px',
                        backgroundColor: '#1E40AF',
                        borderRadius: '8px 8px 0 0',
                        zIndex: 2,
                        transform: (password.length > 0 && showPassword)
                            ? `skewX(0deg)`
                            : isLookingAtEachOther
                                ? `skewX(${(darkPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                                : (isTyping || (password.length > 0 && !showPassword))
                                    ? `skewX(${(darkPos.bodySkew || 0) * 1.5}deg)`
                                    : `skewX(${darkPos.bodySkew || 0}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div
                        className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                        style={{
                            left: (password.length > 0 && showPassword) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + darkPos.faceX}px`,
                            top: (password.length > 0 && showPassword) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + darkPos.faceY}px`,
                        }}
                    >
                        <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#1E3A8A" isBlinking={isDarkBlinking}
                            forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                            forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                            mouseX={mouseX} mouseY={mouseY}
                        />
                        <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#1E3A8A" isBlinking={isDarkBlinking}
                            forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                            forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                            mouseX={mouseX} mouseY={mouseY}
                        />
                    </div>
                </div>

                <div
                    ref={lightBlueRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                        left: '0px',
                        width: '240px',
                        height: '200px',
                        zIndex: 3,
                        backgroundColor: '#60A5FA',
                        borderRadius: '120px 120px 0 0',
                        transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${lightBluePos.bodySkew || 0}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div className="absolute flex gap-8 transition-all duration-200 ease-out"
                        style={{
                            left: (password.length > 0 && showPassword) ? `${50}px` : `${82 + (lightBluePos.faceX || 0)}px`,
                            top: (password.length > 0 && showPassword) ? `${85}px` : `${90 + (lightBluePos.faceY || 0)}px`,
                        }}
                    >
                        <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} mouseX={mouseX} mouseY={mouseY} />
                        <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} mouseX={mouseX} mouseY={mouseY} />
                    </div>
                </div>

                <div
                    ref={skyBlueRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                        left: '310px',
                        width: '140px',
                        height: '230px',
                        backgroundColor: '#93C5FD',
                        borderRadius: '70px 70px 0 0',
                        zIndex: 4,
                        transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${skyBluePos.bodySkew || 0}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <div className="absolute flex gap-6 transition-all duration-200 ease-out"
                        style={{
                            left: (password.length > 0 && showPassword) ? `${20}px` : `${52 + (skyBluePos.faceX || 0)}px`,
                            top: (password.length > 0 && showPassword) ? `${35}px` : `${40 + (skyBluePos.faceY || 0)}px`,
                        }}
                    >
                        <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} mouseX={mouseX} mouseY={mouseY} />
                        <Pupil size={12} maxDistance={5} pupilColor="#1E3A8A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} mouseX={mouseX} mouseY={mouseY} />
                    </div>
                    <div className="absolute w-20 h-[4px] bg-[#1E3A8A] rounded-full transition-all duration-200 ease-out"
                        style={{
                            left: (password.length > 0 && showPassword) ? `${10}px` : `${40 + (skyBluePos.faceX || 0)}px`,
                            top: (password.length > 0 && showPassword) ? `${88}px` : `${88 + (skyBluePos.faceY || 0)}px`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
