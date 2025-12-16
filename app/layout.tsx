import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuroraBackground } from '@/components/layout/AuroraBackground';
import { MobileMenu } from '@/components/layout/MobileMenu';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
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
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Katerina Voronina - Digital Artisan Portfolio',
        description: 'Crafting digital silence & substance through interface design and artistic drawings.',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body className="relative min-h-screen text-platinum selection:bg-amethyst-dark selection:text-white">
                <AuroraBackground />
                <Header />
                <MobileMenu />
                <main className="relative">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
