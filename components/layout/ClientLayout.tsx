'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

export function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <Header />
            <MobileMenu />
            <main className="relative">{children}</main>
            <Footer />
        </LanguageProvider>
    );
}



