'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Mail, Linkedin } from 'lucide-react';
// X icon imported but not currently used (commented out per user request)
// import { X } from 'lucide-react';
import { SPRING_TRANSITION } from '@/lib/data/projects';

export function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING_TRANSITION, delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16 md:py-8 backdrop-blur-sm bg-void/50 border-b border-white/5"
        >
            <Link href="/" className="flex flex-col">
                <h1 className="font-serif text-2xl md:text-3xl tracking-tight text-platinum">
                    Katerina Voronina
                </h1>
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1 font-sans">
                    Portfolio &apos;25
                </span>
            </Link>

            {/* Desktop Social Icons - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
                {[
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/katerina-voronina-308629a6/', label: 'LinkedIn' },
                    { icon: Instagram, href: 'https://www.instagram.com/katerina.voronina.art', label: 'Instagram' },
                    // REMOVED: X (Twitter) - per user request
                    // { icon: X, href: 'https://x.com/voronina8761', label: 'X' },
                    { icon: Mail, href: 'mailto:ekater.voronina@gmail.com', label: 'Email' },
                ].map((item, i) => (
                    <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="text-white/60 hover:text-white transition-colors duration-300"
                    >
                        <item.icon size={18} strokeWidth={1.5} />
                    </a>
                ))}
            </nav>

            {/* Mobile Menu - Now rendered in layout.tsx */}
        </motion.header>
    );
}
