import Link from 'next/link';

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 relative z-10 mt-10">
            <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                <div className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans">
                    <span>© 2025 Katerina Voronina</span>
                </div>
                <div className="text-[10px] md:text-xs text-white/20 uppercase tracking-wider font-sans flex gap-6">
                    <Link
                        href="https://www.behance.net/ekatervoroc3c2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        Behance
                    </Link>
                    <Link
                        href="https://dribbble.com/EkaterinaVoronina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        Dribbble
                    </Link>
                </div>
            </div>
        </footer>
    );
}
