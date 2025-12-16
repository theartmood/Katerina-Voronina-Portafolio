'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
    const { t } = useLanguage();
    
    return (
        <footer className="py-12 border-t border-white/5 relative z-10 mt-10">
            <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                <motion.div 
                    className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans"
                    whileHover={{ 
                        letterSpacing: '0.15em',
                        color: 'rgba(255, 255, 255, 0.4)',
                        transition: { duration: 0.3 }
                    }}
                >
                    <span>{t.footerCopyright}</span>
                </motion.div>
                <motion.div 
                    className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans"
                    whileHover={{ 
                        letterSpacing: '0.15em',
                        transition: { duration: 0.3 }
                    }}
                >
                    <Link
                        href="https://aliastudio.cc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block relative group"
                    >
                        <motion.span
                            className="relative z-10"
                            whileHover={{ 
                                color: 'rgba(255, 255, 255, 0.8)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            {t.footerCredit}
                        </motion.span>
                        <motion.span
                            className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        />
                    </Link>
                </motion.div>
            </div>
        </footer>
    );
}
