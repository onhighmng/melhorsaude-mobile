import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    fallbackText?: string;
}

export function ImageWithFallback({ src, alt, fallbackSrc, fallbackText, className, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    if (error) {
        if (fallbackSrc) {
            return (
                <img
                    src={fallbackSrc}
                    alt={alt}
                    className={className}
                    {...props}
                />
            );
        }

        // Default fallback - gray box with icon or text
        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`} {...props}>
                {fallbackText || (
                    <span className="text-xs">IMG</span>
                )}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={handleError}
            className={className}
            {...props}
        />
    );
}
