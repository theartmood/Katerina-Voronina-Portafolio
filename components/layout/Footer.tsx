'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Elegant hover animation - subtle color transition with underline
function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Link href={href} {...linkProps} className="relative inline-block group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white/60">
                {children}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-[1px] bg-white/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </Link>
    );
}

// Static text with hover effect (no link)
function FooterText({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-block group cursor-default">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white/40">
                {children}
            </span>
        </span>
    );
}

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="py-12 border-t border-white/5 relative z-10 mt-10">
            <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                {/* Copyright - static text with subtle hover */}
                <div className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans">
                    <FooterText>{t.footerCopyright}</FooterText>
                </div>

                {/* Art Portfolio Link */}
                <div className="text-[10px] md:text-xs text-white/30 uppercase tracking-wider font-sans">
                    <FooterLink href="/drawings">
                        Art Portfolio
                    </FooterLink>
                </div>

                {/* Alia Studio Credit */}
                <div className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans">
                    <FooterLink href="https://aliastudio.cc" external>
                        {t.footerCredit}
                    </FooterLink>
                </div>
            </div>
        </footer>
    );
}
