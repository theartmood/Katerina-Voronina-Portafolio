'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedImageUrl, generateSizes } from '@/lib/utils/image-optimization';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataUrl?: string;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    className?: string;
    imageType?: 'hero' | 'gallery' | 'thumbnail' | 'full';
    onLoad?: () => void;
    overlay?: boolean;
    overlayGradient?: string;
}

/**
 * Componente de imagen profesional con:
 * - Progressive loading con blur placeholder
 * - Lazy loading inteligente
 * - Animaciones suaves
 * - Optimización automática
 * - Responsive por defecto
 */
export function ProgressiveImage({
    src,
    alt,
    width,
    height,
    blurDataUrl,
    priority = false,
    quality = 85,
    sizes,
    className = '',
    imageType = 'gallery',
    onLoad,
    overlay = false,
    overlayGradient = 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
}: ProgressiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);

    // Generar sizes automáticamente si no se proporciona
    const imageSizes = sizes || generateSizes(imageType);

    // Intersection Observer para lazy loading
    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Cargar 50px antes de que sea visible
            }
        );

        const element = document.getElementById(`img-${src}`);
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [priority, src]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    return (
        <div
            id={`img-${src}`}
            className={`relative overflow-hidden bg-neutral-900/20 ${className}`}
            style={{ aspectRatio: `${width} / ${height}` }}
        >
            {/* Blur Placeholder */}
            <AnimatePresence>
                {!isLoaded && blurDataUrl && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={blurDataUrl}
                            alt=""
                            fill
                            className="scale-110 blur-xl"
                            aria-hidden="true"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Imagen Principal */}
            {(isInView || priority) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        quality={quality}
                        priority={priority}
                        placeholder={blurDataUrl ? 'blur' : 'empty'}
                        blurDataURL={blurDataUrl}
                        sizes={imageSizes}
                        className="object-cover"
                        onLoad={handleLoad}
                        onError={(e) => {
                            console.warn('Error loading image:', src);
                            // El error se maneja visualmente con el placeholder
                        }}
                    />
                </motion.div>
            )}

            {/* Overlay opcional */}
            {overlay && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: overlayGradient }}
                />
            )}

            {/* Loading Spinner */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}

/**
 * Variante para imágenes de portada/hero
 */
export function HeroImage(props: Omit<ProgressiveImageProps, 'imageType'>) {
    return (
        <ProgressiveImage
            {...props}
            imageType="hero"
            priority
            quality={90}
            overlay
        />
    );
}

/**
 * Variante para thumbnails
 */
export function ThumbnailImage(props: Omit<ProgressiveImageProps, 'imageType'>) {
    return (
        <ProgressiveImage
            {...props}
            imageType="thumbnail"
            quality={75}
        />
    );
}

/**
 * Variante para galerías
 */
export function GalleryImage(props: Omit<ProgressiveImageProps, 'imageType'>) {
    return (
        <ProgressiveImage
            {...props}
            imageType="gallery"
            quality={85}
        />
    );
}

