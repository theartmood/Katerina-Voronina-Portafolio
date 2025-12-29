'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, X, Star, GripVertical } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { uploadImages, deleteProjectImage } from '@/lib/supabase/storage';
import { createProject, updateProject, addProjectImage, updateProjectImage, type ProjectWithImages, type ProjectImage } from '@/lib/supabase/queries';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ProjectFormProps {
    project?: ProjectWithImages;
    onSuccess?: (project: ProjectWithImages) => void;
    onCancel?: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
    const { t } = useLanguage();
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
    const [existingImages, setExistingImages] = useState<ProjectImage[]>(() => {
        // Initialize with sorted images from project if available
        if (project?.images && project.images.length > 0) {
            return [...project.images].sort((a, b) => a.order_index - b.order_index);
        }
        return [];
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

    // Update existing images when project ID changes (not the whole project object)
    useEffect(() => {
        if (project?.images && project.images.length > 0) {
            const sortedImages = [...project.images].sort((a, b) => a.order_index - b.order_index);
            setExistingImages(sortedImages);
        } else if (!project) {
            setExistingImages([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project?.id]); // Only depend on project ID to avoid infinite loops

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
            const maxOrderIndex = existingImages.length > 0 
                ? Math.max(...existingImages.map(img => img.order_index))
                : -1;

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                const newImage = await addProjectImage({
                    project_id: project.id,
                    storage_path: result.storagePath,
                    public_url: result.publicUrl,
                    blur_data_url: result.blurDataUrl,
                    alt_text: result.publicUrl.split('/').pop() || 'Project image',
                    width: result.width,
                    height: result.height,
                    file_size: result.fileSize,
                    format: result.format,
                    is_cover: existingImages.length === 0 && i === 0, // First image is cover only if no images exist
                    order_index: maxOrderIndex + 1 + i
                });
                setExistingImages(prev => [...prev, newImage].sort((a, b) => a.order_index - b.order_index));
            }
        } else {
            // Si es nuevo proyecto, guardar en estado temporal
            setPendingImages(prev => [...prev, ...files]);
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm(t.adminDeleteImageConfirm)) {
            return;
        }

        setDeletingImageId(imageId);
        try {
            await deleteProjectImage(imageId);
            setExistingImages(prev => prev.filter(img => img.id !== imageId));
        } catch (err) {
            setError(err instanceof Error ? err.message : t.adminDeleteImageError);
        } finally {
            setDeletingImageId(null);
        }
    };

    const handleSetCover = async (imageId: string) => {
        if (!project?.id) return;

        try {
            // Unset all covers
            await Promise.all(
                existingImages
                    .filter(img => img.is_cover)
                    .map(img => updateProjectImage(img.id, { is_cover: false }))
            );

            // Set new cover
            await updateProjectImage(imageId, { is_cover: true });

            // Update local state
            setExistingImages(prev =>
                prev.map(img => ({
                    ...img,
                    is_cover: img.id === imageId
                }))
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : t.adminSetCoverError);
        }
    };

    const handleReorderImages = async (newOrder: ProjectImage[]) => {
        if (!project?.id) return;

        try {
            // Update order_index for all images
            await Promise.all(
                newOrder.map((img, index) =>
                    updateProjectImage(img.id, { order_index: index })
                )
            );
            setExistingImages(newOrder);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.adminReorderImagesError);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);
        setError(null);

        try {
            let savedProject: ProjectWithImages;

            if (project?.id) {
                // Update existing project
                const updated = await updateProject(project.id, formData);
                savedProject = { ...updated, images: existingImages } as ProjectWithImages;
            } else {
                // Create new project
                const created = await createProject(formData);
                const newImages: ProjectImage[] = [];

                // Si hay imágenes pendientes, subirlas ahora
                if (pendingImages.length > 0) {
                    const results = await uploadImages(pendingImages, formData.slug);

                    // Add images to database
                    for (let i = 0; i < results.length; i++) {
                        const result = results[i];
                        const newImage = await addProjectImage({
                            project_id: created.id,
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
                        newImages.push(newImage);
                    }
                }
                savedProject = { ...created, images: newImages } as ProjectWithImages;
            }

            onSuccess?.(savedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.adminFormError);
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
                        {t.adminFormTitle}
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="Project name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.adminFormSlug}
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        disabled={!!project}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:opacity-50"
                        placeholder="url-friendly"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.adminFormDescription}
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
                    placeholder="Describe the project..."
                />
            </div>

            {/* Category, Year, Client */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.adminFormCategory}
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    >
                        <option value="designing">{t.adminFormCategoryDesigning} (UX/UI)</option>
                        <option value="drawings">{t.adminFormCategoryDrawings} (Art)</option>
                        <option value="all">All Categories</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.adminFormYear}
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
                        {t.adminFormClient}
                    </label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                        placeholder="Client name"
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
                        {t.adminFormFeatured}
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.adminFormOrder}
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

            {/* Existing Images */}
            {project && existingImages.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {t.adminExistingImages} ({existingImages.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {existingImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800 border-2 border-transparent hover:border-purple-500/50 transition-all"
                            >
                                <img
                                    src={image.public_url}
                                    alt={image.alt_text || 'Project image'}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleSetCover(image.id)}
                                        className={`p-2 rounded-full ${
                                            image.is_cover
                                                ? 'bg-yellow-500 text-black'
                                                : 'bg-white/20 text-white hover:bg-white/30'
                                        } transition-colors`}
                                        title={image.is_cover ? t.adminCoverImage : t.adminSetCoverImage}
                                    >
                                        <Star size={16} fill={image.is_cover ? 'currentColor' : 'none'} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteImage(image.id)}
                                        disabled={deletingImageId === image.id}
                                        className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                                        title={t.adminDeleteAction}
                                    >
                                        {deletingImageId === image.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <X size={16} />
                                        )}
                                    </button>
                                </div>
                                {image.is_cover && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded">
                                        {t.adminCoverImage}
                                    </div>
                                )}
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                                    #{index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Upload - Always visible */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                    {project ? t.adminAddNewImages : t.adminFormImages} {!project && pendingImages.length > 0 && (
                        <span className="text-sm text-purple-400 ml-2">
                            ({pendingImages.length} {t.adminFormPending})
                        </span>
                    )}
                </h3>
                <ImageUploader onUpload={handleImageUpload} />
                {!project && pendingImages.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-sm text-blue-400">
                            ✓ {pendingImages.length} {t.adminImagesPending}. 
                            {t.adminImagesAutoUpload}
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
                            {t.adminFormSaving}
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            {project ? t.adminFormUpdate : t.adminFormCreate} Project
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
                        {t.adminFormCancel}
                    </button>
                )}
            </div>

            {!project && pendingImages.length === 0 && (
                <p className="text-sm text-gray-400">
                    {t.adminAddImagesLater}
                </p>
            )}
        </form>
    );
}
