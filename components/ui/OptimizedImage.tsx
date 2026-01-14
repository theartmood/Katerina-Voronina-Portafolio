'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
    quality?: number;
    blur?: string;
    sizes?: string;
    className?: string;
}

/**
 * Componente de imagen optimizada (versión legacy)
 * Considera usar ProgressiveImage para nuevas implementaciones
 */
export function OptimizedImage({
    src,
    alt,
    width,
    height,
    priority = false,
    quality = 85,
    blur,
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    className = '',
}: OptimizedImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden bg-neutral-100/5">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                quality={quality}
                priority={priority}
                placeholder={blur ? 'blur' : 'empty'}
                blurDataURL={blur}
                sizes={sizes}
                className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
