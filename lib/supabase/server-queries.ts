import { createClient } from './server';
import type { Project, ProjectImage, ProjectWithImages } from './queries';

// Re-export types for convenience
export type { Project, ProjectImage, ProjectWithImages };

/**
 * Get all published projects with their images (Server-side)
 */
export async function getAllProjects(): Promise<ProjectWithImages[]> {
    const supabase = await createClient();

    const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
            *,
            images:project_images!project_images_project_id_fkey(*)
        `)
        .eq('published', true)
        .order('order_index');

    if (projectsError) throw projectsError;

    return (projects || []).map(p => ({
        ...p,
        images: (p.images || []).sort((a: ProjectImage, b: ProjectImage) =>
            a.order_index - b.order_index
        )
    }));
}

/**
 * Get a single project by slug with its images (Server-side)
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
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
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
    }

    return {
        ...data,
        images: (data.images || []).sort((a: ProjectImage, b: ProjectImage) =>
            a.order_index - b.order_index
        )
    };
}

/**
 * Get featured projects (Server-side)
 */
export async function getFeaturedProjects(): Promise<ProjectWithImages[]> {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            images:project_images!project_images_project_id_fkey(*)
        `)
        .eq('featured', true)
        .eq('published', true)
        .order('order_index');

    if (error) throw error;

    return (projects || []).map(p => ({
        ...p,
        images: (p.images || []).sort((a: ProjectImage, b: ProjectImage) =>
            a.order_index - b.order_index
        )
    }));
}

/**
 * Get projects by category (Server-side)
 */
export async function getProjectsByCategory(
    category: 'designing' | 'drawings' | 'all'
): Promise<ProjectWithImages[]> {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            images:project_images!project_images_project_id_fkey(*)
        `)
        .eq('category', category)
        .eq('published', true)
        .order('order_index');

    if (error) throw error;

    return (projects || []).map(p => ({
        ...p,
        images: (p.images || []).sort((a: ProjectImage, b: ProjectImage) =>
            a.order_index - b.order_index
        )
    }));
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<string[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select('slug')
        .eq('published', true);

    if (error) throw error;

    return (data || []).map(p => p.slug);
}
