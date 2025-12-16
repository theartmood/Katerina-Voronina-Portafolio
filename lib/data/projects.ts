export interface Project {
    id: string;
    slug: string;
    title: string;
    year: string;
    category: 'drawing' | 'interface';
    imageUrl: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    width?: number;
    height?: number;
}

export const PROJECTS: Project[] = [
    // Interfaces
    {
        id: 'i1',
        slug: 'chronos-banking',
        title: 'Chronos Banking',
        year: '2024',
        category: 'interface',
        imageUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop',
        description: 'A fintech experience focused on wealth visualization through fluid data interpretation.',
        featured: true,
        width: 2070,
        height: 1380,
    },
    {
        id: 'i2',
        slug: 'aura-health',
        title: 'Aura Health',
        year: '2023',
        category: 'interface',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        description: 'Biometric monitoring dashboard designed for calmness and clarity in high-stress environments.',
        featured: true,
        width: 1974,
        height: 1316,
    },
    {
        id: 'i3',
        slug: 'velvet-ecomm',
        title: 'Velvet E-Comm',
        year: '2023',
        category: 'interface',
        imageUrl: 'https://images.unsplash.com/photo-1481487484168-9b995ecc1660?q=80&w=2070&auto=format&fit=crop',
        description: 'Luxury fashion marketplace prioritizing imagery and whitespace over navigational complexity.',
        featured: false,
        width: 2070,
        height: 1380,
    },
    // Drawings
    {
        id: 'd1',
        slug: 'ephemeral-silence',
        title: 'Ephemeral Silence',
        year: '2023',
        category: 'drawing',
        imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop',
        tags: ['Charcoal', 'Canvas'],
        featured: false,
        width: 2070,
        height: 2760,
    },
    {
        id: 'd2',
        slug: 'void-structure',
        title: 'Void Structure',
        year: '2022',
        category: 'drawing',
        imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1974&auto=format&fit=crop',
        tags: ['Ink', 'Paper'],
        featured: false,
        width: 1974,
        height: 2632,
    },
    {
        id: 'd3',
        slug: 'organic-decay',
        title: 'Organic Decay',
        year: '2024',
        category: 'drawing',
        imageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1635&auto=format&fit=crop',
        tags: ['Mixed Media'],
        featured: false,
        width: 1635,
        height: 2180,
    },
    {
        id: 'd4',
        slug: 'lumina',
        title: 'Lumina',
        year: '2023',
        category: 'drawing',
        imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1887&auto=format&fit=crop',
        tags: ['Digital Painting'],
        featured: false,
        width: 1887,
        height: 2516,
    },
];

export function getAllProjects(): Project[] {
    return PROJECTS;
}

export function getFeaturedProjects(): Project[] {
    return PROJECTS.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: 'drawing' | 'interface'): Project[] {
    return PROJECTS.filter((p) => p.category === category);
}

export const DRAWINGS = getProjectsByCategory('drawing');
export const INTERFACES = getProjectsByCategory('interface');

// Animation constants
export const SPRING_TRANSITION = {
    type: 'spring' as const,
    stiffness: 70,
    damping: 25,
    mass: 1.5,
};

export const HOVER_TRANSITION = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
};
