'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

export function Button({
    children,
    variant = 'outline',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase';

    const variants = {
        primary: 'bg-white text-void hover:bg-white/90',
        outline: 'border border-white/20 text-white/70 hover:bg-white/5 hover:border-white/40',
        ghost: 'text-white/60 hover:text-white',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {children}
        </motion.button>
    );
}
