'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useProjects } from '@/lib/supabase/hooks';
import { deleteProject } from '@/lib/supabase/queries';
import Link from 'next/link';

export default function ProjectList() {
    const { projects, loading, error, refetch } = useProjects();
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        setDeleting(id);
        try {
            await deleteProject(id);
            await refetch();
        } catch (err) {
            alert('Error al eliminar proyecto: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                Error al cargar proyectos: {error.message}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No hay proyectos aún</p>
                <Link
                    href="/admin/projects/new"
                    className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                    Crear primer proyecto
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Título</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Categoría</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Año</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Imágenes</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Estado</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr
                            key={project.id}
                            className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                        >
                            <td className="py-4 px-4">
                                <div>
                                    <p className="font-medium text-white">{project.title}</p>
                                    <p className="text-sm text-gray-400">/{project.slug}</p>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className={`
                                    inline-block px-3 py-1 rounded-full text-xs font-medium
                                    ${project.category === 'designing'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : project.category === 'drawings'
                                        ? 'bg-purple-500/20 text-purple-400'
                                        : 'bg-green-500/20 text-green-400'
                                    }
                                `}>
                                    {project.category}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{project.year}</td>
                            <td className="py-4 px-4 text-gray-300">{project.images?.length || 0}</td>
                            <td className="py-4 px-4">
                                {project.featured && (
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                                        Destacado
                                    </span>
                                )}
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title="Ver proyecto"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>

                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title="Editar"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(project.id, project.title)}
                                        disabled={deleting === project.id}
                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400 disabled:opacity-50"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
