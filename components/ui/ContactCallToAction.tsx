'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function ContactCallToAction() {
    const { t } = useLanguage();
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-32 mb-16"
        >
            <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-amethyst-dark/20 via-indigo-600/20 to-amethyst-dark/20 rounded-3xl blur-3xl" />
                
                {/* Content Card */}
                <div className="relative bg-void/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amethyst-dark/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            className="font-sans text-sm tracking-[0.3em] uppercase text-white/40 mb-8"
                        >
                            {t.ctaBadge}
                        </motion.p>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="font-serif text-5xl md:text-7xl text-platinum italic mb-8"
                        >
                            {t.ctaTitle}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="font-sans text-xl md:text-2xl text-white/70 mb-12 leading-relaxed"
                        >
                            {t.ctaDescription}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/contact">
                                <motion.button
                                    className="group relative inline-flex items-center gap-3 px-10 py-5 text-white font-sans text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden border border-amethyst-dark/50 hover:border-amethyst-dark transition-colors duration-500"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Animated Gradient Background */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{
                                            background: 'linear-gradient(120deg, rgba(107, 70, 193, 0.15), rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15), rgba(107, 70, 193, 0.15))',
                                            backgroundSize: '200% 200%'
                                        }}
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'linear'
                                        }}
                                    />
                                    
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 1, ease: 'easeInOut' }}
                                    />
                                    
                                    <span className="relative z-10">{t.ctaButton}</span>
                                    
                                    <motion.div
                                        className="relative z-10"
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        <ArrowRight size={18} />
                                    </motion.div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

