import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                void: '#050505',
                'amethyst-dark': '#6b46c1',
                midnight: '#1e1b4b',
                platinum: '#e5e5e5',
            },
            fontFamily: {
                serif: ['Bricolage Grotesque', 'serif'],
                sans: ['Bricolage Grotesque', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.8rem', { lineHeight: '1.15' }],        // Minimalist small text (6% larger)
                'sm': ['0.93rem', { lineHeight: '1.32' }],       // Clean small text (6% larger)
                'base': ['1.06rem', { lineHeight: '1.59' }],     // Standard readable size (6% larger)
                'lg': ['1.19rem', { lineHeight: '1.85' }],       // Slightly larger for emphasis (6% larger)
                'xl': ['1.33rem', { lineHeight: '1.85' }],       // Professional heading size (6% larger)
                '2xl': ['1.59rem', { lineHeight: '2.12' }],      // Section headers (6% larger)
                '3xl': ['1.99rem', { lineHeight: '2.38' }],      // Main headings (6% larger)
                '4xl': ['2.39rem', { lineHeight: '2.65' }],      // Hero titles (6% larger)
                '5xl': ['3.18rem', { lineHeight: '1.15' }],      // Large display (6% larger)
                '6xl': ['3.98rem', { lineHeight: '1.15' }],      // Extra large display (6% larger)
                '7xl': ['4.77rem', { lineHeight: '1.15' }],      // Massive display (6% larger)
                '8xl': ['6.36rem', { lineHeight: '1.1' }],       // Ultra display (6% larger)
                '9xl': ['8.48rem', { lineHeight: '1.1' }],       // Maximum impact (6% larger)
            },
            animation: {
                blob: 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
            },
        },
    },
    plugins: [],
};

export default config;
