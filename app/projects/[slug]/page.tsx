import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProjectImageScroll } from '@/components/projects/ProjectImageScroll';
import { createClient } from '@/lib/supabase/server';

// Force dynamic rendering - projects come from Supabase
export const dynamic = 'force-dynamic';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getProjectBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            images:project_images!project_images_project_id_fkey(*)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    return {
        ...data,
        images: (data.images || []).sort((a: any, b: any) => a.order_index - b.order_index)
    };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    const coverImage = project.images?.find((img: any) => img.is_cover) || project.images?.[0];

    return {
        title: project.title,
        description: project.description || `${project.title} - ${project.year}`,
        openGraph: {
            title: project.title,
            description: project.description || `${project.title} - ${project.year}`,
            images: coverImage ? [coverImage.public_url] : [],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Get all images from Supabase, sorted by order_index
    const allImages = project.images || [];

    // Category display name
    const categoryName = project.category === 'designing' ? 'Interface Design' : 'Drawing';

    return (
        <Container className="pt-40 md:pt-60 pb-20">
            {/* Back Button */}
            <Link
                href="/designing"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans text-sm tracking-wider uppercase">Back to Projects</span>
            </Link>

            {/* Project Header */}
            <div className="mb-16 max-w-4xl">
                <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-sans text-xs tracking-[0.2em] text-indigo-200/60 uppercase">
                        {categoryName}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="font-serif text-lg text-white/30 italic">{project.year}</span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl text-platinum mb-8">{project.title}</h1>

                {project.description && (
                    <p className="font-sans text-xl text-white/60 leading-relaxed">{project.description}</p>
                )}

                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-8">
                        {project.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-4 py-2 border border-white/10 rounded-full text-xs tracking-wider uppercase text-white/40"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 pb-20 border-b border-white/10">
                <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Category</h3>
                    <p className="font-serif text-xl text-platinum">{categoryName}</p>
                </div>
                <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Year</h3>
                    <p className="font-serif text-xl text-platinum">{project.year}</p>
                </div>
                {project.client && (
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Client</h3>
                        <p className="font-serif text-xl text-platinum">{project.client}</p>
                    </div>
                )}
            </div>

            {/* Images Scroll - All images in a continuous elegant scroll */}
            <ProjectImageScroll images={allImages} projectTitle={project.title} />
        </Container>
    );
}
