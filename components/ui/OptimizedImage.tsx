'use client';

import Image from 'next/image';
import { useState } from 'react';
import { isValidImageUrl, normalizeSupabaseUrl } from '@/lib/utils/image-optimization';

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
    const [hasError, setHasError] = useState(false);
    const aspectRatio = width && height ? width / height : undefined;

    // Normalizar y validar URL
    const normalizedUrl = normalizeSupabaseUrl(src) || src;
    const isValidUrl = isValidImageUrl(normalizedUrl);

    // Si hay error o URL inválida, mostrar placeholder
    if (hasError || !isValidUrl) {
        return (
            <div 
                className="relative overflow-hidden bg-neutral-100/5 flex items-center justify-center"
                style={aspectRatio ? { aspectRatio } : undefined}
            >
                <div className="text-white/20 text-sm text-center p-4">
                    <svg 
                        className="w-12 h-12 mx-auto mb-2 opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                    </svg>
                    <p className="text-xs">Imagen no disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="relative overflow-hidden bg-neutral-100/5"
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            <Image
                src={normalizedUrl}
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
                style={{ display: 'block' }}
                onLoad={() => setLoaded(true)}
                onError={() => {
                    console.warn('Error loading image:', normalizedUrl);
                    setHasError(true);
                }}
            />
        </div>
    );
}
