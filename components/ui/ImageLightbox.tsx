'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageLightboxProps {
    images: Array<{
        url: string;
        alt: string;
        width: number;
        height: number;
        blur?: string;
    }>;
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        // Lock body scroll
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        // Focus trap: focus the overlay so keyboard events work
        overlayRef.current?.focus();

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, goToNext, goToPrevious]);

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Image ${currentIndex + 1} of ${images.length}`}
                    tabIndex={-1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 outline-none"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Counter */}
                    {images.length > 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}

                    {/* Previous Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}

                    {/* Image */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentImage.url}
                            alt={currentImage.alt}
                            width={currentImage.width}
                            height={currentImage.height}
                            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                            quality={95}
                            priority
                        />
                    </motion.div>

                    {/* Caption */}
                    {currentImage.alt && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-2xl px-6 py-3 rounded-full bg-white/10 text-white text-sm text-center backdrop-blur-sm">
                            {currentImage.alt}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}




