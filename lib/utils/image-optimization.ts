/**
 * Utilidades profesionales para optimización de imágenes
 * - Generación de blur placeholders
 * - Cálculo de dimensiones responsive
 * - Optimización de URLs
 */

/**
 * Genera un blur placeholder en base64 de una imagen
 * Este se genera del lado del cliente cuando se sube la imagen
 */
export async function generateBlurDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }

        // Tamaño pequeño para el blur (10px es suficiente)
        const BLUR_SIZE = 10;

        img.onload = () => {
            // Calcular proporciones
            const aspectRatio = img.width / img.height;
            
            if (aspectRatio > 1) {
                canvas.width = BLUR_SIZE;
                canvas.height = Math.round(BLUR_SIZE / aspectRatio);
            } else {
                canvas.height = BLUR_SIZE;
                canvas.width = Math.round(BLUR_SIZE * aspectRatio);
            }

            // Dibujar imagen pequeña
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convertir a base64
            const blurDataURL = canvas.toDataURL('image/jpeg', 0.1);
            resolve(blurDataURL);

            // Cleanup
            URL.revokeObjectURL(img.src);
        };

        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error('Failed to load image'));
        };

        img.src = URL.createObjectURL(file);
    });
}

// Función generateBlurDataURLServer removida - no es necesaria
// Usamos generateBlurDataURL del cliente que funciona perfectamente

/**
 * Calcula dimensiones optimizadas manteniendo aspect ratio
 */
export function calculateOptimizedDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight?: number
): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    if (!maxHeight) {
        return {
            width: Math.min(originalWidth, maxWidth),
            height: Math.round(Math.min(originalWidth, maxWidth) / aspectRatio)
        };
    }

    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
        width = maxWidth;
        height = Math.round(width / aspectRatio);
    }

    if (height > maxHeight) {
        height = maxHeight;
        width = Math.round(height * aspectRatio);
    }

    return { width, height };
}

/**
 * Genera srcset para imágenes responsive
 */
export function generateSrcSet(
    baseUrl: string,
    originalWidth: number,
    breakpoints: number[] = [640, 828, 1080, 1200, 1920, 2048, 3840]
): string {
    const validBreakpoints = breakpoints.filter(bp => bp <= originalWidth);
    
    if (validBreakpoints.length === 0) {
        return `${baseUrl} ${originalWidth}w`;
    }

    return validBreakpoints
        .map(width => `${getOptimizedImageUrl(baseUrl, { width })} ${width}w`)
        .join(', ');
}

/**
 * Obtiene URL optimizada de Supabase con transformaciones
 */
export function getOptimizedImageUrl(
    publicUrl: string,
    options?: {
        width?: number;
        height?: number;
        quality?: number;
        format?: 'webp' | 'avif' | 'origin';
    }
): string {
    if (!options) return publicUrl;

    // Supabase Storage soporta transformaciones de imagen
    const url = new URL(publicUrl);
    const params = new URLSearchParams();

    if (options.width) params.set('width', options.width.toString());
    if (options.height) params.set('height', options.height.toString());
    if (options.quality) params.set('quality', options.quality.toString());
    if (options.format) params.set('format', options.format);

    // Si hay transformaciones, usar la ruta de render
    if (params.toString()) {
        // Cambiar /object/ por /render/image/ para transformaciones
        const transformPath = url.pathname.replace(
            '/storage/v1/object/public/',
            '/storage/v1/render/image/public/'
        );
        return `${url.origin}${transformPath}?${params.toString()}`;
    }

    return publicUrl;
}

/**
 * Genera sizes attribute para imágenes responsive
 */
export function generateSizes(
    type: 'hero' | 'gallery' | 'thumbnail' | 'full'
): string {
    const sizeMap = {
        hero: '100vw',
        gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
        thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
        full: '100vw'
    };

    return sizeMap[type];
}

/**
 * Valida si un archivo es una imagen válida
 */
export function isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(file.type)) {
        throw new Error(`Tipo de archivo no válido. Permitidos: ${validTypes.join(', ')}`);
    }

    if (file.size > maxSize) {
        throw new Error(`Archivo demasiado grande. Máximo: 50MB`);
    }

    return true;
}

/**
 * Comprime una imagen antes de subirla (opcional)
 */
export async function compressImage(
    file: File,
    maxWidth: number = 2400,
    quality: number = 0.85
): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }

        img.onload = () => {
            const { width, height } = calculateOptimizedDimensions(
                img.width,
                img.height,
                maxWidth
            );

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Failed to compress image'));
                        return;
                    }

                    const compressedFile = new File(
                        [blob],
                        file.name,
                        { type: 'image/jpeg' }
                    );

                    URL.revokeObjectURL(img.src);
                    resolve(compressedFile);
                },
                'image/jpeg',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error('Failed to load image'));
        };

        img.src = URL.createObjectURL(file);
    });
}

/**
 * Extrae metadata de una imagen
 */
export async function extractImageMetadata(file: File): Promise<{
    width: number;
    height: number;
    aspectRatio: number;
    size: number;
    format: string;
}> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            const metadata = {
                width: img.naturalWidth,
                height: img.naturalHeight,
                aspectRatio: img.naturalWidth / img.naturalHeight,
                size: file.size,
                format: file.type.split('/')[1]
            };

            URL.revokeObjectURL(img.src);
            resolve(metadata);
        };

        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error('Failed to load image'));
        };

        img.src = URL.createObjectURL(file);
    });
}

