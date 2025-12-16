'use client';

import { motion } from 'framer-motion';

interface PremiumInputProps {
    label: string;
    type?: 'text' | 'email' | 'textarea';
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export function PremiumInput({
    label,
    type = 'text',
    required = false,
    value,
    onChange,
}: PremiumInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const inputClasses =
        'w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-4 text-platinum placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 font-sans';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
        >
            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-sans">
                {label} {required && <span className="text-amethyst-dark">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea
                    required={required}
                    value={value}
                    onChange={handleChange}
                    rows={6}
                    className={`${inputClasses} resize-none`}
                    placeholder={`Enter your ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type={type}
                    required={required}
                    value={value}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={`Enter your ${label.toLowerCase()}...`}
                />
            )}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amethyst-dark to-indigo-400 group-focus-within:w-full transition-all duration-700" />
        </motion.div>
    );
}
