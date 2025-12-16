'use client';

import { useEffect, useState } from 'react';
import {
    getAllProjects,
    getProjectBySlug,
    getFeaturedProjects,
    getProjectsByCategory,
    getProjectStats,
    type ProjectWithImages
} from './queries';

interface UseProjectsResult {
    projects: ProjectWithImages[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

interface UseProjectResult {
    project: ProjectWithImages | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

interface UseProjectStatsResult {
    stats: {
        totalProjects: number;
        publishedProjects: number;
        featuredProjects: number;
        designingProjects: number;
        drawingsProjects: number;
        totalImages: number;
    } | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch all projects (Client-side)
 */
export function useProjects(): UseProjectsResult {
    const [projects, setProjects] = useState<ProjectWithImages[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Usar el cliente del navegador directamente
            const { createClient } = await import('./client');
            const supabase = createClient();
            
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select(`
                    *,
                    images:project_images!project_images_project_id_fkey(*)
                `)
                .order('created_at', { ascending: false });

            if (projectsError) throw projectsError;

            const data = (projectsData || []).map(p => ({
                ...p,
                images: (p.images || []).sort((a: any, b: any) => 
                    a.order_index - b.order_index
                )
            }));
            
            setProjects(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loading, error, refetch: fetchProjects };
}

/**
 * Hook to fetch a single project by slug
 */
export function useProject(slug: string): UseProjectResult {
    const [project, setProject] = useState<ProjectWithImages | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProject = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProjectBySlug(slug);
            setProject(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchProject();
        }
    }, [slug]);

    return { project, loading, error, refetch: fetchProject };
}

/**
 * Hook to fetch a single project by ID
 */
export function useProjectById(id: string): UseProjectResult {
    const [project, setProject] = useState<ProjectWithImages | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProject = async () => {
        try {
            setLoading(true);
            setError(null);
            const { getProjectById } = await import('./queries');
            const data = await getProjectById(id);
            setProject(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    return { project, loading, error, refetch: fetchProject };
}

/**
 * Hook to fetch featured projects
 */
export function useFeaturedProjects(): UseProjectsResult {
    const [projects, setProjects] = useState<ProjectWithImages[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getFeaturedProjects();
            setProjects(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loading, error, refetch: fetchProjects };
}

/**
 * Hook to fetch projects by category
 */
export function useProjectsByCategory(
    category: 'designing' | 'drawings' | 'all'
): UseProjectsResult {
    const [projects, setProjects] = useState<ProjectWithImages[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Usar el cliente del navegador directamente
            const { createClient } = await import('./client');
            const supabase = createClient();
            
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select(`
                    *,
                    images:project_images!project_images_project_id_fkey(*)
                `)
                .eq('category', category)
                .eq('published', true)
                .order('order_index');

            if (projectsError) throw projectsError;

            const data = (projectsData || []).map(p => ({
                ...p,
                images: (p.images || []).sort((a: any, b: any) => 
                    a.order_index - b.order_index
                )
            }));
            
            setProjects(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            fetchProjects();
        }
    }, [category]);

    return { projects, loading, error, refetch: fetchProjects };
}

/**
 * Hook to fetch project statistics
 */
export function useProjectStats(): UseProjectStatsResult {
    const [stats, setStats] = useState<UseProjectStatsResult['stats']>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProjectStats();
            setStats(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { stats, loading, error, refetch: fetchStats };
}
