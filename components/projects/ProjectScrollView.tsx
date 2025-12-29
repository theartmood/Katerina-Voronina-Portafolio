'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { isValidImageUrl, normalizeSupabaseUrl } from '@/lib/utils/image-optimization';

interface ProjectImage {
    url: string;
    alt: string;
    width: number;
    height: number;
    blur?: string;
}

interface ProjectScrollViewProps {
    images: ProjectImage[];
    projectTitle: string;
}

export function ProjectScrollView({ images, projectTitle }: ProjectScrollViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Filtrar solo imágenes válidas
    const validImages = images.filter(img => {
        const normalizedUrl = normalizeSupabaseUrl(img.url) || img.url;
        return isValidImageUrl(normalizedUrl) && img.url;
    });

    if (validImages.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center py-20">
                <div className="text-center text-white/40">
                    <p className="text-lg">No hay imágenes disponibles para este proyecto</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full">
            {validImages.map((image, index) => {
                const normalizedUrl = normalizeSupabaseUrl(image.url) || image.url;
                const aspectRatio = image.width && image.height ? image.width / image.height : 16 / 9;
                
                return (
                    <div
                        key={`${image.url}-${index}`}
                        className="relative w-full"
                        style={{
                            marginBottom: index !== validImages.length - 1 ? '4px' : '0',
                            padding: '0',
                            marginTop: '0',
                            marginLeft: '0',
                            marginRight: '0',
                            position: 'relative',
                            display: 'block',
                            isolation: 'isolate'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '0px' }}
                            transition={{ 
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="relative w-full"
                            style={{
                                margin: '0 auto',
                                padding: '0',
                                display: 'block',
                                position: 'relative'
                            }}
                        >
                            <div 
                                className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8"
                                style={{
                                    margin: '0 auto',
                                    paddingTop: '0',
                                    paddingBottom: '0',
                                    display: 'block',
                                    position: 'relative'
                                }}
                            >
                                <div
                                    className="relative w-full"
                                    style={{ 
                                        aspectRatio: aspectRatio,
                                        margin: '0 auto',
                                        padding: '0',
                                        display: 'block',
                                        position: 'relative',
                                        width: '100%'
                                    }}
                                >
                                    <OptimizedImage
                                        src={normalizedUrl}
                                        alt={image.alt || `${projectTitle} - Image ${index + 1}`}
                                        width={image.width || 1920}
                                        height={image.height || 1080}
                                        blur={image.blur}
                                        priority={index < 3}
                                        className="w-full h-full object-contain"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}

