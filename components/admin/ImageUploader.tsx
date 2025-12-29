'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { isValidImageFile } from '@/lib/utils/image-optimization';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ImageFile {
    file: File;
    preview: string;
    id: string;
}

interface ImageUploaderProps {
    onUpload: (files: File[], onProgress?: (progress: number, current: number, total: number) => void) => Promise<void>;
    maxFiles?: number;
    maxSizeMB?: number;
    acceptedFormats?: string[];
}

export default function ImageUploader({
    onUpload,
    maxFiles = 10,
    maxSizeMB = 50,
    acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
}: ImageUploaderProps) {
    const { t } = useLanguage();
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentFile, setCurrentFile] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const validateFile = (file: File): string | null => {
        if (!acceptedFormats.includes(file.type)) {
            return `${file.name} - format not allowed. Accepted formats: ${acceptedFormats.map(f => f.split('/')[1]).join(', ')}`;
        }

        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            return `${file.name} exceeds maximum size of ${maxSizeMB}MB (current: ${sizeMB.toFixed(2)}MB)`;
        }

        try {
            isValidImageFile(file);
        } catch (err) {
            return err instanceof Error ? err.message : 'Invalid file';
        }

        return null;
    };

    const handleFiles = useCallback((files: FileList | null) => {
        if (!files) return;

        setError(null);
        const fileArray = Array.from(files);

        // Validate total count
        if (images.length + fileArray.length > maxFiles) {
            setError(`Maximum ${maxFiles} images allowed`);
            return;
        }

        // Validate each file
        const validFiles: File[] = [];
        for (const file of fileArray) {
            const error = validateFile(file);
            if (error) {
                setError(error);
                return;
            }
            validFiles.push(file);
        }

        // Create previews
        const newImages: ImageFile[] = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7)
        }));

        setImages(prev => [...prev, ...newImages]);
    }, [images.length, maxFiles, maxSizeMB]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeImage = (id: string) => {
        setImages(prev => {
            const image = prev.find(img => img.id === id);
            if (image) {
                URL.revokeObjectURL(image.preview);
            }
            return prev.filter(img => img.id !== id);
        });
    };

    const handleUpload = async () => {
        if (images.length === 0) return;

        setUploading(true);
        setProgress(0);
        setCurrentFile(0);
        setTotalFiles(images.length);
        setError(null);
        setSuccess(false);

        try {
            const files = images.map(img => img.file);
            
            // Callback de progreso
            const onProgressUpdate = (prog: number, current: number, total: number) => {
                setProgress(prog);
                setCurrentFile(current);
                setTotalFiles(total);
            };

            await onUpload(files, onProgressUpdate);

            // Clean up previews
            images.forEach(img => URL.revokeObjectURL(img.preview));
            setImages([]);
            setProgress(100);
            setSuccess(true);

            // Auto-hide success message
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error uploading images');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors
                    ${isDragging
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }
                    ${uploading ? 'opacity-50 pointer-events-none' : ''}
                `}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                />

                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                >
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-purple-400" />
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-200">
                            {t.adminDragImagesHere}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            {t.adminMaxImages} {maxFiles} images, {maxSizeMB}MB {t.adminMaxSizeEach}
                        </p>
                    </div>
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    {t.adminImagesUploadedSuccess}
                </div>
            )}

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800"
                            >
                                <img
                                    src={image.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    disabled={uploading}
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                    <p className="text-xs text-white truncate">
                                        {image.file.name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upload Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleUpload}
                            disabled={uploading || images.length === 0}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <ImageIcon className="w-5 h-5" />
                            {uploading ? t.adminUploadingImages + '...' : `${t.adminUploadImages} ${images.length} image${images.length > 1 ? 's' : ''}`}
                        </button>

                        {uploading && (
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>{t.adminUploadProgress} {currentFile} of {totalFiles}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    {t.adminOptimizingImages}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
