'use client';

import type { ProjectWithImages } from '@/lib/supabase/queries';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
    projects: ProjectWithImages[];
    variant?: 'drawing' | 'interface';
}

export function ProjectGrid({ projects, variant = 'drawing' }: ProjectGridProps) {
    if (variant === 'drawing') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
                {/* Column 1 */}
                <div className="flex flex-col pt-0 md:pt-0">
                    {projects
                        .filter((_, i) => i % 2 === 0)
                        .map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} variant="drawing" />
                        ))}
                </div>

                {/* Column 2 (Offset) */}
                <div className="flex flex-col pt-0 md:pt-40">
                    {projects
                        .filter((_, i) => i % 2 !== 0)
                        .map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i + 1} variant="drawing" />
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} variant="interface" />
            ))}
        </div>
    );
}
