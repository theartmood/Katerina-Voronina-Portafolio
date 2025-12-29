'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { ProjectWithImages } from '@/lib/supabase/queries';
import { SPRING_TRANSITION, HOVER_TRANSITION } from '@/lib/data/projects';

interface ProjectCardProps {
    project: ProjectWithImages;
    index: number;
    variant?: 'drawing' | 'interface';
}

export function ProjectCard({ project, index, variant = 'drawing' }: ProjectCardProps) {
    if (variant === 'drawing') {
        return <DrawingCard project={project} index={index} />;
    }
    return <InterfaceCard project={project} index={index} />;
}

function DrawingCard({ project, index }: { project: ProjectWithImages; index: number }) {
    // Get cover image or first image
    const coverImage = project.images.find(img => img.is_cover) || project.images[0];
    
    if (!coverImage) return null;

    // Calcular aspect ratio real de la imagen
    const aspectRatio = coverImage.width && coverImage.height 
        ? coverImage.width / coverImage.height 
        : 3/4;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...SPRING_TRANSITION, delay: index * 0.1 }}
            className="group relative cursor-pointer mb-[7.2rem] md:mb-[9.6rem] w-full"
        >
            <Link href={`/projects/${project.slug}`}>
                <div 
                    className="relative overflow-hidden w-full bg-white/5"
                    style={{ aspectRatio: aspectRatio }}
                >
                    <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <OptimizedImage
                            src={coverImage.public_url}
                            alt={coverImage.alt_text || project.title}
                            width={coverImage.width || 1200}
                            height={coverImage.height || 1600}
                            blur={coverImage.blur_data_url}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                <div className="mt-6 flex justify-between items-baseline px-1">
                    <div>
                        <h3 className="font-serif text-2xl text-platinum group-hover:text-white transition-colors">
                            {project.title}
                        </h3>
                        <p className="font-sans text-sm text-white/40 mt-1 tracking-wide">
                            {project.tags?.join(' • ')}
                        </p>
                    </div>
                    <span className="font-serif text-lg text-white/30 italic">{project.year}</span>
                </div>
            </Link>
        </motion.div>
    );
}

function InterfaceCard({ project, index }: { project: ProjectWithImages; index: number }) {
    const isEven = index % 2 === 0;
    
    // Get cover image or first image
    const coverImage = project.images.find(img => img.is_cover) || project.images[0];
    
    if (!coverImage) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={SPRING_TRANSITION}
            className={`flex flex-col md:flex-row gap-10 md:gap-14 items-center mb-[7.2rem] md:mb-[9.6rem] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* Image Side */}
            <div className="w-full md:w-[48%] relative group cursor-pointer">
                <Link href={`/projects/${project.slug}`}>
                    <div className="overflow-hidden relative rounded-sm">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <OptimizedImage
                                src={coverImage.public_url}
                                alt={coverImage.alt_text || project.title}
                                width={coverImage.width || 1600}
                                height={coverImage.height || 1200}
                                blur={coverImage.blur_data_url}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    </div>
                </Link>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-[52%] flex flex-col justify-center">
                <div className="border-l border-white/20 pl-6 md:pl-10 pr-4 md:pr-0">
                    <span className="block font-sans text-xs tracking-[0.2em] text-indigo-200/60 mb-3 uppercase">
                        Case Study 0{index + 1}
                    </span>
                    <h3 
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-platinum mb-3" 
                        style={{ lineHeight: '0.95', display: 'block' }}
                    >
                        {project.title}
                    </h3>
                    {project.description && (
                        <p className="font-sans text-white/50 leading-relaxed font-light text-base md:text-lg mb-6 max-w-2xl">
                            {project.description}
                        </p>
                    )}

                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white group/link pb-1 border-b border-transparent hover:border-white/50 transition-all"
                    >
                        <span className="font-sans text-sm tracking-widest uppercase">View Project</span>
                        <ArrowUpRight
                            size={16}
                            className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
