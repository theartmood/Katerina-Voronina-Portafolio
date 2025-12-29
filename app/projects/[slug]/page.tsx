import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ProjectScrollView } from '@/components/projects/ProjectScrollView';
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
    try {
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
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Project',
        };
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    try {
        const { slug } = await params;
        
        // Validar que las variables de entorno estén configuradas
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase environment variables not configured');
            return (
                <Container className="pt-40 md:pt-60 pb-20">
                    <div className="text-center py-20">
                        <h1 className="font-serif text-4xl text-platinum mb-4">Configuration Error</h1>
                        <p className="text-white/60 mb-8">
                            Supabase is not configured. Please check your environment variables.
                        </p>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Projects</span>
                        </Link>
                    </div>
                </Container>
            );
        }

        const project = await getProjectBySlug(slug);

        if (!project) {
            notFound();
        }

        // Validar y filtrar imágenes válidas, ordenadas por order_index
        const validImages = (project.images || [])
            .filter(img => 
                img && 
                img.public_url && 
                typeof img.public_url === 'string' &&
                (img.public_url.startsWith('http') || img.public_url.startsWith('/'))
            )
            .sort((a, b) => a.order_index - b.order_index)
            .map(img => ({
                url: img.public_url,
                alt: img.alt_text || project.title,
                width: img.width || 1600,
                height: img.height || 1200,
                blur: img.blur_data_url,
            }));

    return (
        <Container className="pt-32 md:pt-36 pb-20">
            {/* Back Button */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans text-sm tracking-wider uppercase">Back to Projects</span>
            </Link>

            {/* Project Header */}
            <div className="mb-10 max-w-4xl">
                <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-sans text-xs tracking-[0.2em] text-indigo-200/60 uppercase">
                        {project.category === 'designing' ? 'Interface Design' : 'Artistic Drawing'}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="font-serif text-lg text-white/30 italic">{project.year}</span>
                </div>

                <h1 
                    className="font-serif text-5xl md:text-7xl text-platinum mb-4" 
                    style={{ lineHeight: '0.95', display: 'block' }}
                >
                    {project.title}
                </h1>

                {project.description && (
                    <p className="font-sans text-xl text-white/60 leading-normal">{project.description}</p>
                )}

                {project.tags && (
                    <div className="flex flex-wrap gap-3 mt-4">
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

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-12 border-b border-white/10">
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
                {project.tags && project.tags.length > 0 && (
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Medium</h3>
                        <p className="font-serif text-xl text-platinum">{project.tags.join(', ')}</p>
                    </div>
                )}
            </div>

            {/* Elegant Scroll View */}
            {validImages.length > 0 && (
                <ProjectScrollView images={validImages} projectTitle={project.title} />
            )}
        </Container>
    );
    } catch (error) {
        console.error('Error loading project:', error);
        
        // Si es un error de "not found", usar notFound()
        if (error && typeof error === 'object' && 'code' in error && error.code === 'PGRST116') {
            notFound();
        }

        // Para otros errores, mostrar página de error
        return (
            <Container className="pt-40 md:pt-60 pb-20">
                <div className="text-center py-20">
                    <h1 className="font-serif text-4xl text-platinum mb-4">Error Loading Project</h1>
                    <p className="text-white/60 mb-8">
                        There was an error loading this project. Please try again later.
                    </p>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Projects</span>
                    </Link>
                </div>
            </Container>
        );
    }
}
