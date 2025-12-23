import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { AuroraBackground } from '@/components/layout/AuroraBackground';
import { UnicornBackground } from '@/components/layout/UnicornBackground';
import { ClientLayout } from '@/components/layout/ClientLayout';

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-bricolage',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Katerina Voronina - Digital Artisan Portfolio',
        template: '%s | Katerina Voronina',
    },
    description:
        'Portfolio of Katerina Voronina - Digital designer crafting human interfaces and artistic drawings with silence & substance.',
    keywords: ['portfolio', 'design', 'UI/UX', 'digital art', 'interface design', 'drawing'],
    authors: [{ name: 'Katerina Voronina' }],
    creator: 'Katerina Voronina',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://katerinavoronina.com',
        title: 'Katerina Voronina - Digital Artisan Portfolio',
        description: 'Crafting digital silence & substance through interface design and artistic drawings.',
        siteName: 'Katerina Voronina Portfolio',
        images: [
            {
                url: '/kv-logo.png',
                width: 1200,
                height: 1200,
                alt: 'Katerina Voronina Monogram',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Katerina Voronina - Digital Artisan Portfolio',
        description: 'Crafting digital silence & substance through interface design and artistic drawings.',
        images: ['/kv-logo.png'],
    },
    icons: {
        icon: '/kv-logo.png',
        shortcut: '/kv-logo.png',
        apple: '/kv-logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${bricolageGrotesque.variable}`}>
            <body className="relative min-h-screen text-platinum selection:bg-amethyst-dark selection:text-white">
                <AuroraBackground />
                <UnicornBackground />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
