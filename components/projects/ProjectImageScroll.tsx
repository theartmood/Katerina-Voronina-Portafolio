'use client';

import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface ProjectImage {
    id?: string | number;
    public_url: string;
    alt_text?: string;
    width?: number;
    height?: number;
}

interface ProjectImageScrollProps {
    images: ProjectImage[];
    projectTitle: string;
}

export function ProjectImageScroll({ images, projectTitle }: ProjectImageScrollProps) {
    if (images.length === 0) return null;

    return (
        <div className="space-y-8 md:space-y-12">
            {images.map((img, index) => (
                <motion.div
                    key={img.id || index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    className="relative overflow-hidden rounded-sm"
                >
                    <OptimizedImage
                        src={img.public_url}
                        alt={img.alt_text || `${projectTitle} - Image ${index + 1}`}
                        width={img.width || 1600}
                        height={img.height || 1200}
                        priority={index === 0}
                        className="w-full h-auto"
                    />
                </motion.div>
            ))}
        </div>
    );
}
