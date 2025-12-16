import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getProjectsByCategory } from '@/lib/supabase/queries';

export const metadata: Metadata = {
    title: 'Drawings',
    description: 'Explore my artistic drawings and visual explorations in various mediums.',
};

export default async function DrawingsPage() {
    const projects = await getProjectsByCategory('drawings');

    return (
        <Container className="pt-40 md:pt-60 pb-20">
            <div className="mb-24 max-w-3xl">
                <span className="block font-sans text-xs tracking-[0.3em] uppercase text-indigo-200/60 mb-6">
                    Artistic Exploration
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-platinum mb-6 italic">
                    Drawings
                </h1>
                <p className="font-sans text-lg text-white/50 leading-relaxed">
                    A collection of artistic explorations across various mediums.
                    Each piece represents a moment of creative expression, capturing emotion, texture, and form.
                </p>
            </div>

            {projects.length > 0 ? (
                <ProjectGrid projects={projects} variant="drawing" />
            ) : (
                <div className="text-center py-20">
                    <p className="text-white/40 text-lg">No projects yet. Add some from the admin panel!</p>
                </div>
            )}
        </Container>
    );
}
