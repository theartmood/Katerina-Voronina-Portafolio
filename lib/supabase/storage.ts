import { createClient } from './client';
import { 
    generateBlurDataURL, 
    extractImageMetadata, 
    isValidImageFile,
    compressImage
} from '@/lib/utils/image-optimization';

const BUCKET = 'portfolio-images';

export interface UploadResult {
    publicUrl: string;
    storagePath: string;
    width: number;
    height: number;
    blurDataUrl: string;
    format: string;
    fileSize: number;
}

/**
 * Upload a single image to Supabase Storage con optimización automática
 */
export async function uploadImage(
    file: File,
    projectSlug: string,
    options?: {
        compress?: boolean;
        maxWidth?: number;
        quality?: number;
    }
): Promise<UploadResult> {
    // Validar archivo
    isValidImageFile(file);

    const supabase = createClient();
    
    // Comprimir imagen si se solicita (recomendado para producción)
    let fileToUpload = file;
    if (options?.compress !== false) {
        try {
            fileToUpload = await compressImage(
                file,
                options?.maxWidth || 2400,
                options?.quality || 0.85
            );
        } catch (error) {
            console.warn('Image compression failed, uploading original:', error);
            fileToUpload = file;
        }
    }

    const ext = fileToUpload.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `projects/${projectSlug}/${timestamp}.${ext}`;

    // Upload a Supabase
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, fileToUpload, {
            cacheControl: '31536000', // 1 año
            upsert: false
        });

    if (error) throw error;

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(data.path);

    // Extraer metadata de la imagen
    const metadata = await extractImageMetadata(file);

    // Generar blur placeholder
    const blurDataUrl = await generateBlurDataURL(file);

    return {
        publicUrl,
        storagePath: data.path,
        width: metadata.width,
        height: metadata.height,
        blurDataUrl,
        format: metadata.format,
        fileSize: metadata.size
    };
}

/**
 * Upload multiple images in batch con progreso
 */
export async function uploadImages(
    files: File[],
    projectSlug: string,
    onProgress?: (progress: number, currentFile: number, totalFiles: number) => void,
    options?: {
        compress?: boolean;
        maxWidth?: number;
        quality?: number;
    }
): Promise<UploadResult[]> {
    const results: UploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
        try {
            const result = await uploadImage(files[i], projectSlug, options);
            results.push(result);

            if (onProgress) {
                const progress = ((i + 1) / files.length) * 100;
                onProgress(progress, i + 1, files.length);
            }
        } catch (error) {
            console.error(`Failed to upload ${files[i].name}:`, error);
            throw new Error(`Error subiendo ${files[i].name}: ${error}`);
        }
    }

    return results;
}



/**
 * Get all images for a project
 */
export async function getProjectImages(projectId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index');

    if (error) throw error;
    return data || [];
}

/**
 * Update image order for a project
 */
export async function reorderProjectImages(
    imageIds: string[],
    projectId: string
): Promise<void> {
    const supabase = createClient();

    // Update order_index for each image
    const updates = imageIds.map((id, index) =>
        supabase
            .from('project_images')
            .update({ order_index: index })
            .eq('id', id)
            .eq('project_id', projectId)
    );

    await Promise.all(updates);
}

/**
 * Delete an image from storage
 */
export async function deleteImage(storagePath: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.storage
        .from(BUCKET)
        .remove([storagePath]);

    if (error) throw error;
}

/**
 * Delete an image record from database and storage
 */
export async function deleteProjectImage(imageId: string): Promise<void> {
    const supabase = createClient();

    // First get the storage path
    const { data: image } = await supabase
        .from('project_images')
        .select('storage_path')
        .eq('id', imageId)
        .single();

    if (!image) throw new Error('Image not found');

    // Delete from storage
    await deleteImage(image.storage_path);

    // Delete from database
    const { error } = await supabase
        .from('project_images')
        .delete()
        .eq('id', imageId);

    if (error) throw error;
}
