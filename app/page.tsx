'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SPRING_TRANSITION } from '@/lib/data/projects';
import { useProjectsByCategory } from '@/lib/supabase/hooks';
import { ContactCallToAction } from '@/components/ui/ContactCallToAction';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function SectionHeader({ title, number }: { title: string; number: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex items-baseline gap-4 mb-16 md:mb-20 border-b border-white/10 pb-4"
        >
            <motion.span 
                className="font-sans text-xs md:text-sm text-white/30 tracking-widest"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
                ({number})
            </motion.span>
            <motion.h2 
                className="font-serif text-4xl md:text-5xl text-platinum italic"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
                {title}
            </motion.h2>
        </motion.div>
    );
}

export default function HomePage() {
    const { t } = useLanguage();
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

    // Mostrar todos los proyectos de designing (ordenados priorizando destacados y order_index)
    // Use useMemo to prevent unnecessary re-sorts on every render
    const featuredInterfaces = useMemo(() => {
        return [...designingProjects].sort((a, b) => {
            // Priorizar proyectos destacados
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Luego por order_index
            return (a.order_index || 0) - (b.order_index || 0);
        });
    }, [designingProjects]);

    return (
        <div ref={containerRef}>
            <Container className="pt-40 md:pt-60">
                {/* Hero Introduction */}
                <motion.section style={{ y: heroY, opacity: heroOpacity }} className="mb-[12rem] md:mb-[18rem] max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-indigo-200/60 mb-8"
                    >
                        {t.heroSubtitle}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ...SPRING_TRANSITION }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.1] text-platinum"
                    >
                        {t.heroTitle1} <br />
                        <span className="italic text-white/70">{t.heroTitle2}</span> {t.heroTitle3}
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '120px' }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-[1px] bg-white/30 mt-12"
                    />
                </motion.section>

                {/* Section 1: Designing Human Interfaces */}
                <section id="interfaces" className="mb-[12rem] md:mb-[18rem]">
                    <SectionHeader number="01" title={t.section1Title} />
                    <ProjectGrid projects={featuredInterfaces} variant="interface" />

                    {/* See Projects Button */}
                    <motion.div 
                        className="flex justify-center mt-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <motion.div 
                            whileHover={{ scale: 1.02 }} 
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <Link
                                href="/designing"
                                className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-500"
                            >
                                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/70">
                                    {t.seeProjects}
                                </span>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    <ArrowRight size={14} className="text-white/70" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Elegant Contact Section */}
                <ContactCallToAction />
            </Container>
        </div>
    );
}
