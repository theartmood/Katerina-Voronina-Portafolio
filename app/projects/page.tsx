import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getProjectsByCategory } from '@/lib/supabase/server-queries';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of interface design and artistic drawings.',
};

export default async function ProjectsPage() {
    const designingProjects = await getProjectsByCategory('designing');
    const drawingsProjects = await getProjectsByCategory('drawings');

    return (
        <Container className="pt-40 md:pt-60 pb-20">
            <div className="mb-24">
                <h1 className="font-serif text-5xl md:text-7xl text-platinum mb-6">Projects</h1>
                <p className="font-sans text-lg text-white/50 max-w-2xl">
                    A collection of interface designs and artistic explorations crafted with intention and care.
                </p>
            </div>

            {/* Interfaces Section */}
            <section className="mb-40 md:mb-60">
                <div className="flex items-baseline gap-4 mb-16 border-b border-white/10 pb-6">
                    <span className="font-sans text-xs md:text-sm text-white/30 tracking-widest">(01)</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-platinum italic">
                        Designing Human Interfaces
                    </h2>
                </div>
                {designingProjects.length > 0 ? (
                    <ProjectGrid projects={designingProjects} variant="interface" />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white/40">No designing projects yet. Add some from the admin panel!</p>
                    </div>
                )}
            </section>

            {/* Drawings Section */}
            <section className="mb-40 md:mb-60">
                <div className="flex items-baseline gap-4 mb-16 border-b border-white/10 pb-6">
                    <span className="font-sans text-xs md:text-sm text-white/30 tracking-widest">(02)</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-platinum italic">Drawings</h2>
                </div>
                {drawingsProjects.length > 0 ? (
                    <ProjectGrid projects={drawingsProjects} variant="drawing" />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white/40">No drawings yet. Add some from the admin panel!</p>
                    </div>
                )}
            </section>
        </Container>
    );
}
