'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

export function PremiumButton({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}: PremiumButtonProps) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center justify-center gap-3 px-12 py-5 overflow-hidden rounded-full bg-gradient-to-r from-amethyst-dark to-indigo-600 transition-all duration-500 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content */}
            <span className="relative z-10 font-sans text-sm tracking-[0.2em] uppercase text-white font-medium">
                {children}
            </span>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amethyst-dark to-indigo-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
        </motion.button>
    );
}
