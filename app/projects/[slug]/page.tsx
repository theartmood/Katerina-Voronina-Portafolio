import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getAllProjects, getProjectBySlug } from '@/lib/data/projects';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description || `${project.title} - ${project.year}`,
        openGraph: {
            title: project.title,
            description: project.description || `${project.title} - ${project.year}`,
            images: [project.imageUrl],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // For demo purposes, using the main image as gallery
    // In production, this would fetch from Supabase
    const galleryImages = [
        {
            url: project.imageUrl,
            alt: project.title,
            width: project.width || 1600,
            height: project.height || 1200,
        },
    ];

    return (
        <Container className="pt-40 md:pt-60 pb-20">
            {/* Back Button */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans text-sm tracking-wider uppercase">Back to Projects</span>
            </Link>

            {/* Project Header */}
            <div className="mb-16 max-w-4xl">
                <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-sans text-xs tracking-[0.2em] text-indigo-200/60 uppercase">
                        {project.category === 'interface' ? 'Interface Design' : 'Drawing'}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="font-serif text-lg text-white/30 italic">{project.year}</span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl text-platinum mb-8">{project.title}</h1>

                {project.description && (
                    <p className="font-sans text-xl text-white/60 leading-relaxed">{project.description}</p>
                )}

                {project.tags && (
                    <div className="flex flex-wrap gap-3 mt-8">
                        {project.tags.map((tag) => (
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

            {/* Hero Image */}
            <div className="mb-16 relative overflow-hidden rounded-sm">
                <OptimizedImage
                    src={project.imageUrl}
                    alt={project.title}
                    width={project.width || 1600}
                    height={project.height || 1200}
                    priority
                    className="w-full h-auto"
                />
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 pb-20 border-b border-white/10">
                <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Category</h3>
                    <p className="font-serif text-xl text-platinum">
                        {project.category === 'interface' ? 'Interface Design' : 'Artistic Drawing'}
                    </p>
                </div>
                <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Year</h3>
                    <p className="font-serif text-xl text-platinum">{project.year}</p>
                </div>
                {project.tags && (
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Medium</h3>
                        <p className="font-serif text-xl text-platinum">{project.tags.join(', ')}</p>
                    </div>
                )}
            </div>

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-platinum mb-12 italic">Gallery</h2>
                    <ProjectGallery images={galleryImages} />
                </div>
            )}
        </Container>
    );
}
