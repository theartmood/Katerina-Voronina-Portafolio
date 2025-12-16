'use client';

import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ContactCallToAction } from '@/components/ui/ContactCallToAction';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useProjectsByCategory } from '@/lib/supabase/hooks';
import { motion } from 'framer-motion';

export default function DesigningPage() {
    const { t } = useLanguage();
    const { projects } = useProjectsByCategory('designing');

    return (
        <Container className="pt-40 md:pt-60 pb-20">
            <motion.div 
                className="mb-24 max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
                <motion.span 
                    className="block font-sans text-xs tracking-[0.3em] uppercase text-indigo-200/60 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                >
                    {t.designingSubtitle}
                </motion.span>
                <motion.h1 
                    className="font-serif text-5xl md:text-7xl text-platinum mb-6 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    {t.designingTitle}
                </motion.h1>
                <motion.p 
                    className="font-sans text-lg text-white/50 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                    {t.designingDescription}
                </motion.p>
            </motion.div>

            {projects.length > 0 ? (
                <ProjectGrid projects={projects} variant="interface" />
            ) : (
                <div className="text-center py-20">
                    <p className="text-white/40 text-lg">{t.noProjects}</p>
                </div>
            )}

            {/* Elegant Contact Section */}
            <ContactCallToAction />
        </Container>
    );
}
