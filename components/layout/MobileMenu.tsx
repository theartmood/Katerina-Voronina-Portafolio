'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const menuItems = [
        { label: 'Designing', href: '/designing' },
        { label: 'Drawings', href: '/drawings' },
    ];

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/katerina-voronina-308629a6/', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/katerina.voronina.art', label: 'Instagram' },
        { icon: X, href: 'https://x.com/voronina8761', label: 'X' },
        { icon: Mail, href: 'mailto:ekater.voronina@gmail.com', label: 'Email' },
    ];

    if (!mounted) {
        return (
            <div className="md:hidden fixed top-8 right-6 z-[99999] w-10 h-10 flex flex-col items-center justify-center gap-1.5">
                <span className="w-6 h-[2px] bg-platinum" />
                <span className="w-6 h-[2px] bg-platinum" />
                <span className="w-6 h-[2px] bg-platinum" />
            </div>
        );
    }

    return (
        <>
            {/* Hamburger Button - Only 3 lines, no circle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-8 right-6 z-[99999] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="w-6 h-[2px] bg-platinum origin-center"
                />
                <motion.span
                    animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="w-6 h-[2px] bg-platinum"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="w-6 h-[2px] bg-platinum origin-center"
                />
            </button>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-void/90 backdrop-blur-md z-[99998] md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-void via-void/98 to-amethyst-dark/20 backdrop-blur-2xl border-l-2 border-white/20 z-[99999] md:hidden overflow-y-auto shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-8 pt-20">
                                {/* Navigation Links - Designing & Drawings */}
                                <nav className="mb-12">
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                        className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6 font-sans"
                                    >
                                        Explore
                                    </motion.p>
                                    <div className="space-y-2">
                                        {menuItems.map((item, index) => (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.15 + index * 0.08,
                                                    duration: 0.6,
                                                    ease: [0.33, 1, 0.68, 1],
                                                }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="group block py-3 text-3xl font-serif text-platinum hover:text-white transition-colors relative"
                                                >
                                                    <span className="relative z-10">{item.label}</span>
                                                    <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-gradient-to-r from-amethyst-dark to-indigo-400 group-hover:w-full transition-all duration-500" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </nav>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                    className="mb-12"
                                >
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6 font-sans">
                                        Connect
                                    </p>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: 0.4 + index * 0.05,
                                                    duration: 0.4,
                                                    type: 'spring',
                                                    stiffness: 200,
                                                }}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amethyst-dark/50 transition-all duration-300"
                                            >
                                                <social.icon size={18} className="text-white/60" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Contact CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                    className="mt-auto"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="group relative flex items-center justify-center gap-3 w-full py-5 px-8 rounded-full bg-gradient-to-r from-amethyst-dark to-indigo-600 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        <span className="relative z-10 font-sans text-sm tracking-[0.2em] uppercase text-white font-medium">
                                            Contact
                                        </span>
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                            className="relative z-10"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path
                                                    d="M1 8h14M9 2l6 6-6 6"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    </Link>
                                </motion.div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                    className="mt-8 pt-6 border-t border-white/10"
                                >
                                    <p className="text-[10px] uppercase tracking-wider text-white/20 font-sans text-center">
                                        © 2025 Katerina Voronina
                                    </p>
                                </motion.div>
                            </div>

                            {/* Decorative gradient orbs */}
                            <div className="absolute top-20 right-10 w-32 h-32 bg-amethyst-dark/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-40 left-10 w-40 h-40 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
