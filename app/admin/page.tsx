'use client';

import { useEffect, useState } from 'react';
import { BarChart3, FolderOpen, Image, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ProjectList from '@/components/admin/ProjectList';
import { createClient } from '@/lib/supabase/client';

interface Stats {
    totalProjects: number;
    totalImages: number;
    featuredProjects: number;
    designingProjects: number;
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalImages: 0,
        featuredProjects: 0,
        designingProjects: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const supabase = createClient();

                const [projectsResult, imagesResult] = await Promise.all([
                    supabase.from('projects').select('id, featured, category'),
                    supabase.from('project_images').select('id'),
                ]);

                const projects = projectsResult.data || [];
                const images = imagesResult.data || [];

                setStats({
                    totalProjects: projects.length,
                    totalImages: images.length,
                    featuredProjects: projects.filter((p: any) => p.featured).length,
                    designingProjects: projects.filter((p: any) => p.category === 'designing').length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-2">Panel de Administración</h1>
                        <p className="text-gray-400">Gestiona tu portafolio</p>
                    </div>

                    <Link
                        href="/admin/projects/new"
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Proyecto
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <FolderOpen className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{stats.totalProjects}</p>
                                <p className="text-sm text-gray-400">Proyectos</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Image className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{stats.totalImages}</p>
                                <p className="text-sm text-gray-400">Imágenes</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{stats.featuredProjects}</p>
                                <p className="text-sm text-gray-400">Destacados</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <FolderOpen className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{stats.designingProjects}</p>
                                <p className="text-sm text-gray-400">Designing</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Proyectos</h2>
                        <Link
                            href="/"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Ver sitio →
                        </Link>
                    </div>

                    <ProjectList />
                </div>

                {/* Dev Notice */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-blue-400">
                        <strong>Modo desarrollo:</strong> Este panel solo está disponible en desarrollo.
                        Para producción, implementa autenticación adecuada.
                    </p>
                </div>
            </div>
        </div>
    );
}
