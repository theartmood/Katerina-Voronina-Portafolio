'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/i18n/translations';
import { useState } from 'react';

interface LanguageOption {
    code: Language;
    label: string;
    flag: string;
}

const LANGUAGES: LanguageOption[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang: LanguageOption) => {
        setLanguage(lang.code);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-sm">{currentLang.flag}</span>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase">{currentLang.code}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                    <ChevronDown size={14} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute top-full right-0 mt-2 w-48 bg-void/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                    >
                        {LANGUAGES.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-300 ${
                                    currentLang.code === lang.code
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ x: 4 }}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="font-sans text-sm tracking-wider">{lang.label}</span>
                                {currentLang.code === lang.code && (
                                    <motion.div
                                        layoutId="activeLang"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                        initial={false}
                                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

