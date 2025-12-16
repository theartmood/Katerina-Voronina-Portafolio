import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getAllProjects, getProjectBySlug } from '@/lib/supabase/queries';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    // Return empty array to generate pages on-demand
    // This avoids calling cookies() during build time
    return [];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    const coverImage = project.images.find(img => img.is_cover) || project.images[0];

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

    // Get all images from the project
    const galleryImages = project.images.map(img => ({
        url: img.public_url,
        alt: img.alt_text || project.title,
        width: img.width || 1600,
        height: img.height || 1200,
        blur: img.blur_data_url,
    }));

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
                        {project.category === 'designing' ? 'Interface Design' : 'Artistic Drawing'}
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
            {galleryImages.length > 0 && (
                <div className="mb-16 relative overflow-hidden rounded-sm">
                    <OptimizedImage
                        src={galleryImages[0].url}
                        alt={galleryImages[0].alt}
                        width={galleryImages[0].width}
                        height={galleryImages[0].height}
                        blur={galleryImages[0].blur}
                        priority
                        className="w-full h-auto"
                    />
                </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 pb-20 border-b border-white/10">
                <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Category</h3>
                    <p className="font-serif text-xl text-platinum">
                        {project.category === 'designing' ? 'Interface Design' : 'Artistic Drawing'}
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
