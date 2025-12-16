'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    const router = useRouter();

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

                    <h1 className="text-4xl font-serif font-bold mb-2">Nuevo Proyecto</h1>
                    <p className="text-gray-400">Crea un nuevo proyecto para tu portafolio</p>
                </div>

                {/* Form */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                    <ProjectForm
                        onSuccess={(project) => {
                            router.push(`/admin/projects/${project.id}/edit`);
                        }}
                        onCancel={() => router.push('/admin')}
                    />
                </div>
            </div>
        </div>
    );
}
