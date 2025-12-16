'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { uploadImages } from '@/lib/supabase/storage';
import { createProject, updateProject, addProjectImage, type Project } from '@/lib/supabase/queries';

interface ProjectFormProps {
    project?: Project;
    onSuccess?: (project: Project) => void;
    onCancel?: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        category: project?.category || 'designing' as 'designing' | 'drawings' | 'all',
        client: project?.client || '',
        year: project?.year || new Date().getFullYear(),
        featured: project?.featured || false,
        published: project?.published ?? true,
        order_index: project?.order_index || 0
    });

    const [pendingImages, setPendingImages] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : type === 'number'
                    ? (value === '' ? new Date().getFullYear() : parseInt(value))
                    : value
        }));

        // Auto-generate slug from title
        if (name === 'title' && !project) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleImageUpload = async (files: File[], onProgress?: (progress: number, current: number, total: number) => void) => {
        if (project?.id) {
            // Si el proyecto ya existe, subir directamente
            const results = await uploadImages(files, formData.slug, onProgress);

            // Add images to database
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                await addProjectImage({
                    project_id: project.id,
                    storage_path: result.storagePath,
                    public_url: result.publicUrl,
                    blur_data_url: result.blurDataUrl,
                    alt_text: result.publicUrl.split('/').pop() || 'Project image',
                    width: result.width,
                    height: result.height,
                    file_size: result.fileSize,
                    format: result.format,
                    is_cover: i === 0, // First image is cover
                    order_index: i
                });
            }
        } else {
            // Si es nuevo proyecto, guardar en estado temporal
            setPendingImages(prev => [...prev, ...files]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);
        setError(null);

        try {
            let savedProject: Project;

            if (project?.id) {
                // Update existing project
                savedProject = await updateProject(project.id, formData);
            } else {
                // Create new project
                savedProject = await createProject(formData);

                // Si hay imágenes pendientes, subirlas ahora
                if (pendingImages.length > 0) {
                    const results = await uploadImages(pendingImages, formData.slug);

                    // Add images to database
                    for (let i = 0; i < results.length; i++) {
                        const result = results[i];
                        await addProjectImage({
                            project_id: savedProject.id,
                            storage_path: result.storagePath,
                            public_url: result.publicUrl,
                            blur_data_url: result.blurDataUrl,
                            alt_text: `${formData.title} - Image ${i + 1}`,
                            width: result.width,
                            height: result.height,
                            file_size: result.fileSize,
                            format: result.format,
                            is_cover: i === 0, // First image is cover
                            order_index: i
                        });
                    }
                }
            }

            onSuccess?.(savedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar proyecto');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                    {error}
                </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Título *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="Nombre del proyecto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Slug *
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        disabled={!!project}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:opacity-50"
                        placeholder="url-amigable"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
                    placeholder="Describe el proyecto..."
                />
            </div>

            {/* Category, Year, Client */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Categoría *
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    >
                        <option value="designing">Designing (UX/UI)</option>
                        <option value="drawings">Drawings (Art)</option>
                        <option value="all">All Categories</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Año *
                    </label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year || new Date().getFullYear()}
                        onChange={handleChange}
                        required
                        min="2000"
                        max="2100"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cliente
                    </label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="Nombre del cliente"
                    />
                </div>
            </div>

            {/* Featured & Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                        Proyecto destacado
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Orden
                    </label>
                    <input
                        type="number"
                        name="order_index"
                        value={formData.order_index || 0}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                </div>
            </div>

            {/* Image Upload - Always visible */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                    Imágenes {!project && pendingImages.length > 0 && (
                        <span className="text-sm text-purple-400 ml-2">
                            ({pendingImages.length} lista{pendingImages.length > 1 ? 's' : ''} para subir)
                        </span>
                    )}
                </h3>
                <ImageUploader onUpload={handleImageUpload} />
                {!project && pendingImages.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-sm text-blue-400">
                            ✓ {pendingImages.length} imagen{pendingImages.length > 1 ? 'es' : ''} lista{pendingImages.length > 1 ? 's' : ''}. 
                            Se subirá{pendingImages.length > 1 ? 'n' : ''} automáticamente al crear el proyecto.
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            {project ? 'Actualizar' : 'Crear'} Proyecto
                        </>
                    )}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                )}
            </div>

            {!project && pendingImages.length === 0 && (
                <p className="text-sm text-gray-400">
                    💡 Puedes agregar imágenes ahora o después de crear el proyecto
                </p>
            )}
        </form>
    );
}
