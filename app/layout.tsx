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
        // UPDATED: Changed from "Digital Artisan" to "Product Strategist"
        default: 'Katerina Voronina - UX/UI Designer & Product Strategist',
        template: '%s | Katerina Voronina',
    },
    description:
        'Professional UX/UI designer crafting human-centered digital interfaces. Portfolio showcasing interface design, user experience, and artistic exploration. Available for design opportunities.',
    keywords: [
        'UX designer',
        'UI designer',
        'UX/UI designer',
        'user experience designer',
        'interface designer',
        'digital designer',
        'product designer',
        'interaction design',
        'user interface design',
        'human-centered design',
        'portfolio',
        'design portfolio',
        'Katerina Voronina',
    ],
    authors: [{ name: 'Katerina Voronina' }],
    creator: 'Katerina Voronina',
    metadataBase: new URL('https://katerinavoronina.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://katerinavoronina.com',
        // UPDATED: Changed from "Digital Artisan" to "Product Strategist"
        title: 'Katerina Voronina - UX/UI Designer & Product Strategist',
        description: 'Professional UX/UI designer crafting human-centered digital interfaces. Available for design opportunities.',
        siteName: 'Katerina Voronina Portfolio',
        images: [
            {
                url: '/kv-logo.png',
                width: 1200,
                height: 1200,
                alt: 'Katerina Voronina - UX/UI Designer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        // UPDATED: Changed from "Digital Artisan" to "Product Strategist"
        title: 'Katerina Voronina - UX/UI Designer & Product Strategist',
        description: 'Professional UX/UI designer crafting human-centered digital interfaces.',
        images: ['/kv-logo.png'],
        creator: '@voronina8761',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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
