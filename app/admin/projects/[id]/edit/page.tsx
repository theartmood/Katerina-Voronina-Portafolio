'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useProjectById } from '@/lib/supabase/hooks';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const { project, loading, error } = useProjectById(projectId);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-gray-400">Cargando proyecto...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-[#050505] text-white pt-24">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-8 text-center">
                        <p className="text-red-400 mb-4">
                            {error ? error.message : 'Proyecto no encontrado'}
                        </p>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al panel
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al panel
                    </Link>

                    <h1 className="text-4xl font-serif font-bold mb-2">Editar Proyecto</h1>
                    <p className="text-gray-400">{project.title}</p>
                </div>

                {/* Form */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                    <ProjectForm
                        project={project}
                        onSuccess={() => {
                            router.push('/admin');
                        }}
                        onCancel={() => router.push('/admin')}
                    />
                </div>
            </div>
        </div>
    );
}
