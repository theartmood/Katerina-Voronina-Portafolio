'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface GalleryImage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

interface ProjectGalleryProps {
    images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handlePrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    const handleNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setSelectedIndex(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer group relative overflow-hidden"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <OptimizedImage
                            src={image.url}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-void/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedIndex(null)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
                            aria-label="Close gallery"
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                            className="absolute left-8 text-white/60 hover:text-white transition-colors z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-8 text-white/60 hover:text-white transition-colors z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-6xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <OptimizedImage
                                src={images[selectedIndex].url}
                                alt={images[selectedIndex].alt}
                                width={images[selectedIndex].width}
                                height={images[selectedIndex].height}
                                className="max-h-[90vh] w-auto object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-sans text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
