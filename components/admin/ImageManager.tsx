'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Star, X, Loader2, AlertCircle } from 'lucide-react';
import { type ProjectImage } from '@/lib/supabase/queries';
import { isValidImageUrl, normalizeSupabaseUrl } from '@/lib/utils/image-optimization';

interface ImageManagerProps {
    images: ProjectImage[];
    onReorder: (newOrder: ProjectImage[]) => void;
    onSetCover: (imageId: string) => void;
    onDelete: (imageId: string) => void;
    deletingImageId: string | null;
    t: any; // Translation object
}

interface SortableImageItemProps {
    image: ProjectImage;
    index: number;
    onSetCover: (imageId: string) => void;
    onDelete: (imageId: string) => void;
    isDeleting: boolean;
    t: any;
}

function SortableImageItem({ image, index, onSetCover, onDelete, isDeleting, t }: SortableImageItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const normalizedUrl = normalizeSupabaseUrl(image.public_url) || image.public_url;
    const isValid = isValidImageUrl(normalizedUrl);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group bg-gray-800 rounded-lg overflow-hidden border-2 transition-all ${
                isDragging 
                    ? 'border-purple-500 shadow-lg scale-105' 
                    : 'border-transparent hover:border-purple-500/50'
            } ${!isValid ? 'border-red-500/50' : ''}`}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 right-2 z-10 p-2 bg-black/60 rounded-full cursor-grab active:cursor-grabbing hover:bg-black/80 transition-colors"
                title={t.adminDragToReorder || 'Drag to reorder'}
            >
                <GripVertical size={16} className="text-white" />
            </div>

            {/* Image */}
            <div className="aspect-square relative">
                {isValid ? (
                    <img
                        src={normalizedUrl}
                        alt={image.alt_text || `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error('Error loading image:', normalizedUrl);
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-500/10">
                        <div className="text-center p-4">
                            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-xs text-red-400">Invalid Image</p>
                        </div>
                    </div>
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-colors flex items-center justify-center gap-3">
                    <button
                        onClick={() => onSetCover(image.id)}
                        className={`p-3 rounded-full transition-colors ${
                            image.is_cover
                                ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                                : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        title={image.is_cover ? t.adminCoverImage : t.adminSetCoverImage}
                    >
                        <Star size={18} fill={image.is_cover ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        onClick={() => onDelete(image.id)}
                        disabled={isDeleting}
                        className="p-3 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t.adminDeleteAction}
                    >
                        {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <X size={18} />
                        )}
                    </button>
                </div>

                {/* Badges */}
                {image.is_cover && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        {t.adminCoverImage}
                    </div>
                )}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                    #{index + 1}
                </div>
            </div>

            {/* Image info */}
            <div className="p-2 bg-gray-900/50 text-xs text-gray-400">
                <p className="truncate" title={image.alt_text || 'No alt text'}>
                    {image.alt_text || 'No alt text'}
                </p>
                {image.width && image.height && (
                    <p className="text-gray-500">
                        {image.width} × {image.height}
                    </p>
                )}
            </div>
        </div>
    );
}

export function ImageManager({ 
    images, 
    onReorder, 
    onSetCover, 
    onDelete, 
    deletingImageId,
    t 
}: ImageManagerProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = images.findIndex(img => img.id === active.id);
            const newIndex = images.findIndex(img => img.id === over.id);
            const newOrder = arrayMove(images, oldIndex, newIndex);
            onReorder(newOrder);
        }
    };

    // Filtrar imágenes inválidas para mostrar advertencia
    const invalidImages = images.filter(img => {
        const normalizedUrl = normalizeSupabaseUrl(img.public_url) || img.public_url;
        return !isValidImageUrl(normalizedUrl);
    });

    if (images.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400">
                <p>{t.adminNoImages || 'No images yet. Upload images below.'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {invalidImages.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle size={16} />
                        <p className="text-sm">
                            {invalidImages.length} {t.adminInvalidImages || 'image(s) have invalid URLs and will not display correctly.'}
                        </p>
                    </div>
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map(img => img.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <SortableImageItem
                                key={image.id}
                                image={image}
                                index={index}
                                onSetCover={onSetCover}
                                onDelete={onDelete}
                                isDeleting={deletingImageId === image.id}
                                t={t}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div className="text-sm text-gray-400 mt-4">
                <p>💡 {t.adminDragHint || 'Drag images to reorder them. The order will be saved automatically.'}</p>
            </div>
        </div>
    );
}

