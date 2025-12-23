'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, X, Mail, Linkedin } from 'lucide-react';
import { SPRING_TRANSITION } from '@/lib/data/projects';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Behance Icon Component
const BehanceIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h4.5a2.5 2.5 0 1 1 0 5H3V8z" />
        <path d="M3 13h5a2.5 2.5 0 1 1 0 5H3v-5z" />
        <path d="M14 7h5" />
        <path d="M21 12a3 3 0 1 0-6 0c0 1.5.5 3 3 3s3-1.5 3-3z" />
    </svg>
);

// Dribbble Icon Component
const DribbbleIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 6 17.5" />
    </svg>
);

export function Header() {
    const { t } = useLanguage();
    
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING_TRANSITION, delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3.5 md:px-12 md:py-5 backdrop-blur-sm bg-void/50 border-b border-white/5"
        >
            {/* Logo */}
            <Link href="/" className="flex flex-col">
                <motion.h1 
                    className="font-serif text-xl md:text-2xl tracking-tight text-platinum"
                    whileHover={{ 
                        y: -2,
                        transition: { 
                            duration: 0.4,
                            ease: [0.33, 1, 0.68, 1]
                        }
                    }}
                >
                    Katerina Voronina
                </motion.h1>
                <span className="text-[11px] uppercase tracking-[0.12em] text-white/40 mt-0.5 font-sans">
                    {t.portfolioYear}
                </span>
            </Link>

            {/* Right: Social Icons + Language Selector */}
            <div className="hidden md:flex items-center gap-4">
                {/* Social Icons and Links */}
                <nav className="flex items-center gap-5">
                    {[
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/katerina-voronina-308629a6/', label: 'LinkedIn', isIcon: true },
                        { icon: Instagram, href: 'https://www.instagram.com/katerina.voronina.art', label: 'Instagram', isIcon: true },
                        { icon: X, href: 'https://x.com/voronina8761', label: 'X', isIcon: true },
                        { icon: Mail, href: 'mailto:ekater.voronina@gmail.com', label: 'Email', isIcon: true },
                        { href: 'https://www.behance.net/ekatervoroc3c2', label: 'BEHANCE', isIcon: false },
                        { href: 'https://dribbble.com/EkaterinaVoronina', label: 'DRIBBBLE', isIcon: false },
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className="text-white/60 hover:text-white transition-colors duration-500"
                            whileHover={{ 
                                y: -2,
                                letterSpacing: item.isIcon ? '0em' : '0.1em',
                                transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item.isIcon && item.icon ? (
                                <item.icon size={18} />
                            ) : (
                                <span className="font-sans text-[10px] tracking-[0.15em]">{item.label}</span>
                        )}
                    </motion.a>
                ))}
            </nav>
            
            {/* Divider */}
            <div className="h-6 w-[1px] bg-white/10" />
            
            {/* Language Selector */}
            <LanguageSelector />
        </div>

            {/* Mobile Menu - Now rendered in layout.tsx */}
        </motion.header>
    );
}
