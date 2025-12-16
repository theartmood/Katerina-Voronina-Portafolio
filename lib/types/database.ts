export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    description: string | null;
                    category: string | null;
                    client: string | null;
                    year: number | null;
                    featured: boolean;
                    order_index: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    title: string;
                    description?: string | null;
                    category?: string | null;
                    client?: string | null;
                    year?: number | null;
                    featured?: boolean;
                    order_index?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    slug?: string;
                    title?: string;
                    description?: string | null;
                    category?: string | null;
                    client?: string | null;
                    year?: number | null;
                    featured?: boolean;
                    order_index?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            project_images: {
                Row: {
                    id: string;
                    project_id: string;
                    storage_path: string;
                    public_url: string;
                    alt_text: string | null;
                    width: number | null;
                    height: number | null;
                    is_cover: boolean;
                    order_index: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    project_id: string;
                    storage_path: string;
                    public_url: string;
                    alt_text?: string | null;
                    width?: number | null;
                    height?: number | null;
                    is_cover?: boolean;
                    order_index?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    project_id?: string;
                    storage_path?: string;
                    public_url?: string;
                    alt_text?: string | null;
                    width?: number | null;
                    height?: number | null;
                    is_cover?: boolean;
                    order_index?: number;
                    created_at?: string;
                };
            };
        };
    };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectImage = Database['public']['Tables']['project_images']['Row'];
