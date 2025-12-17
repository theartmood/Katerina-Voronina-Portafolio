import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for server-side operations
 * For public data queries (projects, images), we use a simple client without cookies
 * This avoids errors in dynamic pages where cookies() can fail in Next.js 15
 */
export async function createClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase environment variables not configured');
    }

    // Para queries públicas (lectura de proyectos e imágenes), no necesitamos cookies
    // Usar cliente simple que funciona en todos los contextos de Next.js 15
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );
}
