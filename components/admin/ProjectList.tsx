'use client';

import { useState, useMemo } from 'react';
import { Edit, Trash2, Eye, GripVertical } from 'lucide-react';
import { useProjects } from '@/lib/supabase/hooks';
import { deleteProject, updateProject } from '@/lib/supabase/queries';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { ProjectWithImages } from '@/lib/supabase/queries';

interface ProjectTableProps {
    projects: ProjectWithImages[];
    category: 'designing' | 'drawings';
    categoryLabel: string;
    categoryColor: string;
    onDelete: (id: string, title: string) => Promise<void>;
    deleting: string | null;
}

function ProjectTable({ projects, category, categoryLabel, categoryColor, onDelete, deleting, onReorder }: ProjectTableProps & { onReorder?: () => void }) {
    const { t } = useLanguage();
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
    const [reordering, setReordering] = useState(false);

    // Sort projects by order_index within this category
    const sortedProjects = useMemo(() => {
        return [...projects]
            .filter(p => p.category === category)
            .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    }, [projects, category]);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            setDraggedOverIndex(index);
        }
    };

    const handleDragLeave = () => {
        setDraggedOverIndex(null);
    };

    const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDraggedOverIndex(null);
            return;
        }

        setReordering(true);
        try {
            const reorderedProjects = [...sortedProjects];
            const [draggedProject] = reorderedProjects.splice(draggedIndex, 1);
            reorderedProjects.splice(dropIndex, 0, draggedProject);

            // Update order_index for all projects in this category
            await Promise.all(
                reorderedProjects.map((project, index) =>
                    updateProject(project.id, { order_index: index })
                )
            );

            // Call refetch callback if provided
            if (onReorder) {
                onReorder();
            } else {
                // Fallback: reload page
                window.location.reload();
            }
        } catch (err) {
            alert('Error reordering projects: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setDraggedIndex(null);
            setDraggedOverIndex(null);
            setReordering(false);
        }
    };

    if (sortedProjects.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <p className="text-gray-400">{t.adminNoProjectsCategory.replace('{category}', categoryLabel)}</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400">
                    💡 <strong>{t.adminDragToReorder}</strong> the <GripVertical className="inline w-4 h-4" /> icon to reorder <strong>{categoryLabel}</strong> projects. 
                    {t.adminOrderSaved}
                </p>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800">
                        <th className="w-8 text-left py-3 px-4 text-sm font-semibold text-gray-300"></th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t.adminOrderLabel}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t.adminTitleColumn}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t.adminYearColumn}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t.adminImagesColumn}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t.adminStatusColumn}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">{t.adminActionsColumn}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProjects.map((project, index) => (
                        <tr
                            key={project.id}
                            draggable={!reordering}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                            className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                                draggedIndex === index ? 'opacity-50' : ''
                            } ${
                                draggedOverIndex === index 
                                    ? (category === 'designing' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-purple-500/20 border-purple-500/50')
                                    : ''
                            } ${reordering ? 'cursor-wait' : 'cursor-move'}`}
                        >
                            <td className="py-4 px-4">
                                <GripVertical 
                                    className="w-5 h-5 text-gray-500 hover:text-gray-300 cursor-grab active:cursor-grabbing" 
                                />
                            </td>
                            <td className="py-4 px-4">
                                <span className="text-sm text-gray-400 font-mono font-bold">
                                    #{index + 1}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                    ({t.adminOrderValue}: {project.order_index ?? 0})
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <div>
                                    <p className="font-medium text-white">{project.title}</p>
                                    <p className="text-sm text-gray-400">/{project.slug}</p>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{project.year}</td>
                            <td className="py-4 px-4 text-gray-300">{project.images?.length || 0}</td>
                            <td className="py-4 px-4">
                                <div className="flex flex-col gap-1">
                                    {project.featured && (
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 w-fit">
                                            {t.adminFeaturedBadge}
                                        </span>
                                    )}
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium w-fit ${categoryColor}`}>
                                        {categoryLabel}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title={t.adminViewAction}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>

                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title={t.adminEditAction}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>

                                    <button
                                        onClick={() => onDelete(project.id, project.title)}
                                        disabled={deleting === project.id}
                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400 disabled:opacity-50"
                                        title={t.adminDeleteAction}
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

export default function ProjectList() {
    const { t } = useLanguage();
    const { projects, loading, error, refetch } = useProjects();
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(t.adminDeleteConfirm.replace('{title}', title))) {
            return;
        }

        setDeleting(id);
        try {
            await deleteProject(id);
            await refetch();
        } catch (err) {
            alert(t.adminDeleteError + ': ' + (err instanceof Error ? err.message : 'Unknown error'));
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
                Error loading projects: {error.message}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg">{t.adminNoProjects}</p>
                <Link
                    href="/admin/projects/new"
                    className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                    {t.adminCreateFirst}
                </Link>
            </div>
        );
    }

    // Separate projects by category
    const designingProjects = projects.filter(p => p.category === 'designing');
    const drawingsProjects = projects.filter(p => p.category === 'drawings');

    return (
        <div className="space-y-12">
            {/* Designing Projects Table */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            🎨 {t.adminDesigningProjects}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {t.adminDesigningDescription}
                        </p>
                    </div>
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                        {designingProjects.length} {t.adminProjectsCount}{designingProjects.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <ProjectTable
                        projects={projects}
                        category="designing"
                        categoryLabel="Diseño"
                        categoryColor="bg-blue-500/20 text-blue-400"
                        onDelete={handleDelete}
                        deleting={deleting}
                        onReorder={refetch}
                    />
                </div>
            </div>

            {/* Drawings Projects Table */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            🎨 {t.adminDrawingsProjects}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {t.adminDrawingsDescription}
                        </p>
                    </div>
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {drawingsProjects.length} {t.adminProjectsCount}{drawingsProjects.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <ProjectTable
                        projects={projects}
                        category="drawings"
                        categoryLabel="Dibujos"
                        categoryColor="bg-purple-500/20 text-purple-400"
                        onDelete={handleDelete}
                        deleting={deleting}
                        onReorder={refetch}
                    />
                </div>
            </div>
        </div>
    );
}
