'use client';

import { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SPRING_TRANSITION } from '@/lib/data/projects';
import { useProjectsByCategory } from '@/lib/supabase/hooks';
import { ContactCallToAction } from '@/components/ui/ContactCallToAction';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import gsap from 'gsap';

function SectionHeader({ title, number }: { title: string; number: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex items-baseline gap-4 mb-10 md:mb-20 border-b border-white/10 pb-4"
        >
            <motion.span
                className="font-sans text-xs md:text-sm text-white/30 tracking-widest"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
                ({number})
            </motion.span>
            <motion.h2
                className="font-serif text-3xl md:text-5xl text-platinum italic leading-[1.1] md:leading-normal"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
                {title}
            </motion.h2>
        </motion.div>
    );
}

// Split text animation component using GSAP
function AnimatedDescription({ text }: { text: string }) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = wordsRef.current.filter(Boolean);

        // Initial state - all words hidden
        gsap.set(words, {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)'
        });

        // Animate words one by one with stagger
        const tl = gsap.timeline({ delay: 1.6 });

        tl.to(words, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out'
        });

        return () => {
            tl.kill();
        };
    }, [text]);

    const words = text.split(' ');

    return (
        <p
            ref={containerRef}
            className="font-sans text-base md:text-lg text-white/50 leading-relaxed mt-8 max-w-2xl"
        >
            {words.map((word, index) => (
                <span
                    key={index}
                    ref={(el) => { if (el) wordsRef.current[index] = el; }}
                    className="inline-block mr-[0.3em]"
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    {word}
                </span>
            ))}
        </p>
    );
}

// Interactive hover text with magnetic/glitch effect (desktop only)
function InteractiveWord({ children, className = '' }: { children: string; className?: string }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const lettersRef = useRef<HTMLSpanElement[]>([]);

    const handleMouseEnter = () => {
        if (window.innerWidth < 768) return; // Skip on mobile

        const letters = lettersRef.current.filter(Boolean);

        // Elegant letter-spacing expansion with subtle y movement
        gsap.to(letters, {
            letterSpacing: '0.02em',
            y: (i) => Math.sin(i * 0.5) * 2,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.out'
        });

        // Subtle color shift
        gsap.to(containerRef.current, {
            color: 'rgba(255, 255, 255, 0.95)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 768) return;

        const letters = lettersRef.current.filter(Boolean);

        gsap.to(letters, {
            letterSpacing: '0em',
            y: 0,
            duration: 0.5,
            stagger: 0.015,
            ease: 'power3.out'
        });

        gsap.to(containerRef.current, {
            color: '',
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    return (
        <span
            ref={containerRef}
            className={`inline cursor-default ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children.split('').map((letter, index) => (
                <span
                    key={index}
                    ref={(el) => { if (el) lettersRef.current[index] = el; }}
                    className={letter === ' ' ? 'inline-block w-[0.3em]' : 'inline-block'}
                    style={{ willChange: 'transform' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </span>
    );
}

// Magnetic hover effect for italic word (desktop only)
function MagneticWord({ children, className = '' }: { children: string; className?: string }) {
    const wordRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (window.innerWidth < 768 || !wordRef.current) return;

        const rect = wordRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        gsap.to(wordRef.current, {
            x: deltaX,
            y: deltaY,
            skewX: deltaX * 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 768 || !wordRef.current) return;

        gsap.to(wordRef.current, {
            x: 0,
            y: 0,
            skewX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        });
    };

    return (
        <span
            ref={wordRef}
            className={`inline-block cursor-default ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: 'transform' }}
        >
            {children}
        </span>
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
            {/* Hero - Full viewport height, centered content */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="max-w-4xl"
                >
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
                        <InteractiveWord>{t.heroTitle1}</InteractiveWord> <br />
                        <MagneticWord className="italic text-white/70">{t.heroTitle2}</MagneticWord>{' '}
                        <InteractiveWord>{t.heroTitle3}</InteractiveWord>
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '120px' }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-[1px] bg-white/30 mt-12"
                    />
                    <AnimatedDescription text={t.heroDescription} />
                </motion.div>
            </section>

            {/* Section 1: Designing Human Interfaces */}
            <Container>
                <section id="interfaces" className="mb-[12rem] md:mb-[18rem]">
                    <SectionHeader number="01" title={t.section1Title} />
                    <ProjectGrid projects={featuredInterfaces} variant="interface" />

                    {/* See Projects Button */}
                    <motion.div
                        className="flex justify-center mt-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
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
