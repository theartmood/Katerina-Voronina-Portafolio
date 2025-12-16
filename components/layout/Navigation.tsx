'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-8">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`font-sans text-sm tracking-wider uppercase transition-colors duration-300 ${isActive
                                ? 'text-white border-b border-white'
                                : 'text-white/60 hover:text-white'
                            }`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
