'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SPRING_TRANSITION } from '@/lib/data/projects';
import { useFeaturedProjects, useProjectsByCategory } from '@/lib/supabase/hooks';
import type { ProjectWithImages } from '@/lib/supabase/queries';

function SectionHeader({ title, number }: { title: string; number: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-baseline gap-4 mb-24 md:mb-32 border-b border-white/10 pb-6"
        >
            <span className="font-sans text-xs md:text-sm text-white/30 tracking-widest">({number})</span>
            <h2 className="font-serif text-4xl md:text-5xl text-platinum italic">{title}</h2>
        </motion.div>
    );
}

export default function HomePage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    // Get featured projects from Supabase
    const { projects: designingProjects } = useProjectsByCategory('designing');
    const { projects: drawingsProjects } = useProjectsByCategory('drawings');

    // Get first 2 featured or latest projects from each category
    const featuredInterfaces = designingProjects
        .sort((a, b) => {
            // Priorizar proyectos destacados
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Luego por order_index
            return (a.order_index || 0) - (b.order_index || 0);
        })
        .slice(0, 2);
    
    const featuredDrawings = drawingsProjects
        .sort((a, b) => {
            // Priorizar proyectos destacados
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Luego por order_index
            return (a.order_index || 0) - (b.order_index || 0);
        })
        .slice(0, 2);

    return (
        <div ref={containerRef}>
            <Container className="pt-40 md:pt-60">
                {/* Hero Introduction */}
                <motion.section style={{ y: heroY, opacity: heroOpacity }} className="mb-40 md:mb-60 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-indigo-200/60 mb-8"
                    >
                        Digital Artisan
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ...SPRING_TRANSITION }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.1] text-platinum"
                    >
                        Crafting digital <br />
                        <span className="italic text-white/70">silence</span> & substance.
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '120px' }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-[1px] bg-white/30 mt-12"
                    />
                </motion.section>

                {/* Section 1: Designing Human Interfaces */}
                <section id="interfaces" className="mb-40 md:mb-60">
                    <SectionHeader number="01" title="Designing Human Interfaces" />
                    <ProjectGrid projects={featuredInterfaces} variant="interface" />

                    {/* See Projects Button */}
                    <div className="flex justify-center mt-20">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/designing"
                                className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                            >
                                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/70">
                                    See Projects
                                </span>
                                <ArrowRight size={14} className="text-white/70" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Drawings */}
                <section id="drawings" className="mb-40 md:mb-60">
                    <SectionHeader number="02" title="Drawings" />
                    <ProjectGrid projects={featuredDrawings} variant="drawing" />

                    {/* See Projects Button */}
                    <div className="flex justify-center mt-20">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/drawings"
                                className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                            >
                                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/70">
                                    See Projects
                                </span>
                                <ArrowRight size={14} className="text-white/70" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </Container>
        </div>
    );
}
