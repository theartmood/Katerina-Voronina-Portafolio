import { createClient } from './client';

export interface Project {
    id: string;
    slug: string;
    title: string;
    description?: string;
    long_description?: string;
    category: 'designing' | 'drawings' | 'all';
    client?: string;
    year?: number;
    featured: boolean;
    published: boolean;
    order_index: number;
    tags?: string[];
    cover_image_id?: string;
    seo_title?: string;
    seo_description?: string;
    meta_keywords?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface ProjectImage {
    id: string;
    project_id: string;
    storage_path: string;
    public_url: string;
    optimized_url?: string;
    blur_data_url?: string;
    alt_text: string;
    caption?: string;
    width: number;
    height: number;
    aspect_ratio?: number;
    file_size?: number;
    format?: string;
    is_cover: boolean;
    order_index: number;
    created_at?: string;
}

export interface ProjectWithImages extends Project {
    images: ProjectImage[];
}

/**
 * Get all published projects with their images (Server-side)
 */
export async function getAllProjects(): Promise<ProjectWithImages[]> {
    try {
        // Validar variables de entorno
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase environment variables not configured');
            return [];
        }

        const { createClient: createServerClient } = await import('./server');
        const supabase = await createServerClient();

        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select(`
                *,
                images:project_images!project_images_project_id_fkey(*)
            `)
            .eq('published', true)
            .order('order_index');

        if (projectsError) {
            console.error('Error fetching projects:', projectsError);
            throw projectsError;
        }

        return (projects || []).map(p => {
            // Validar y filtrar imágenes con URLs válidas
            const validImages = (p.images || []).filter((img: ProjectImage) => 
                img && 
                img.public_url && 
                typeof img.public_url === 'string' &&
                (img.public_url.startsWith('http') || img.public_url.startsWith('/'))
            );

            return {
                ...p,
                images: validImages.sort((a: ProjectImage, b: ProjectImage) => 
                    a.order_index - b.order_index
                )
            };
        });
    } catch (error) {
        console.error('Error in getAllProjects:', error);
        return [];
    }
}

/**
 * Get a single project by slug with its images (Server-side)
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
    try {
        // Validar variables de entorno
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase environment variables not configured');
            throw new Error('Supabase not configured');
        }

        const { createClient: createServerClient } = await import('./server');
        const supabase = await createServerClient();

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
            console.error('Supabase query error:', error);
            throw error;
        }

        if (!data) {
            return null;
        }

        // Validar y filtrar imágenes con URLs válidas
        const validImages = (data.images || []).filter((img: ProjectImage) => 
            img && 
            img.public_url && 
            typeof img.public_url === 'string' &&
            (img.public_url.startsWith('http') || img.public_url.startsWith('/'))
        );

        return {
            ...data,
            images: validImages
        };
    } catch (error) {
        console.error('Error in getProjectBySlug:', error);
        throw error;
    }
}

/**
 * Get a single project by ID with its images
 */
export async function getProjectById(id: string): Promise<ProjectWithImages | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            images:project_images!project_images_project_id_fkey(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
    }

    return {
        ...data,
        images: data.images || []
    };
}

/**
 * Get featured projects (Server-side)
 */
export async function getFeaturedProjects(): Promise<ProjectWithImages[]> {
    const { createClient: createServerClient } = await import('./server');
    const supabase = await createServerClient();

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
    try {
        // Validar variables de entorno
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase environment variables not configured');
            return [];
        }

        const { createClient: createServerClient } = await import('./server');
        const supabase = await createServerClient();

        const { data: projects, error } = await supabase
            .from('projects')
            .select(`
                *,
                images:project_images!project_images_project_id_fkey(*)
            `)
            .eq('category', category)
            .eq('published', true)
            .order('order_index');

        if (error) {
            console.error('Error fetching projects by category:', error);
            throw error;
        }

        return (projects || []).map(p => {
            // Validar y filtrar imágenes con URLs válidas
            const validImages = (p.images || []).filter((img: ProjectImage) => 
                img && 
                img.public_url && 
                typeof img.public_url === 'string' &&
                (img.public_url.startsWith('http') || img.public_url.startsWith('/'))
            );

            return {
                ...p,
                images: validImages.sort((a: ProjectImage, b: ProjectImage) => 
                    a.order_index - b.order_index
                )
            };
        });
    } catch (error) {
        console.error('Error in getProjectsByCategory:', error);
        return [];
    }
}

/**
 * Create a new project
 */
export async function createProject(
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
): Promise<Project> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update a project
 */
export async function updateProject(
    id: string,
    updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
): Promise<Project> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('projects')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Delete a project and all its images
 */
export async function deleteProject(id: string): Promise<void> {
    const supabase = createClient();

    // Get all images to delete from storage
    const { data: images } = await supabase
        .from('project_images')
        .select('storage_path')
        .eq('project_id', id);

    // Delete images from storage
    if (images && images.length > 0) {
        const paths = images.map(img => img.storage_path);
        await supabase.storage
            .from('portfolio-images')
            .remove(paths);
    }

    // Delete project (cascade will delete image records)
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

/**
 * Add an image to a project
 */
export async function addProjectImage(
    image: Omit<ProjectImage, 'id' | 'created_at'>
): Promise<ProjectImage> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('project_images')
        .insert(image)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update project image
 */
export async function updateProjectImage(
    id: string,
    updates: Partial<Omit<ProjectImage, 'id' | 'project_id' | 'created_at'>>
): Promise<ProjectImage> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('project_images')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Get project statistics (Server-side)
 */
export async function getProjectStats() {
    const { createClient: createServerClient } = await import('./server');
    const supabase = await createServerClient();

    const [
        { count: totalProjects },
        { count: publishedCount },
        { count: featuredCount },
        { count: designingCount },
        { count: drawingsCount },
        { count: totalImages }
    ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('featured', true),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('category', 'designing'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('category', 'drawings'),
        supabase.from('project_images').select('*', { count: 'exact', head: true })
    ]);

    return {
        totalProjects: totalProjects || 0,
        publishedProjects: publishedCount || 0,
        featuredProjects: featuredCount || 0,
        designingProjects: designingCount || 0,
        drawingsProjects: drawingsCount || 0,
        totalImages: totalImages || 0
    };
}

/**
 * Track project view (analytics)
 */
export async function trackProjectView(
    projectId: string,
    userAgent?: string,
    referrer?: string
): Promise<void> {
    const supabase = createClient();
    
    await supabase
        .from('project_views')
        .insert({
            project_id: projectId,
            user_agent: userAgent,
            referrer: referrer
        });
}

/**
 * Get project view count
 */
export async function getProjectViewCount(projectId: string): Promise<number> {
    const supabase = createClient();
    
    const { count } = await supabase
        .from('project_views')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId);
    
    return count || 0;
}
