'use client';

import { AuthProvider, useAuth } from '@/lib/auth/AuthContext';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Loader2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSelector } from '@/components/layout/LanguageSelector';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading, logout } = useAuth();
    const { t } = useLanguage();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Admin Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-void/80 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="font-serif text-xl text-platinum hover:text-white transition-colors">
                            {t.adminTitle}
                        </Link>
                        <span className="text-xs text-white/30 uppercase tracking-wider">•</span>
                        <Link
                            href="/"
                            className="text-sm text-white/40 hover:text-white transition-colors"
                        >
                            {t.adminViewSite}
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSelector />
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            {t.adminLogout}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}

