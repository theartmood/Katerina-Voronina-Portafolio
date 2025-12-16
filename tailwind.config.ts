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
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.84rem', { lineHeight: '1.2rem' }],      // 20% bigger than 0.75rem
                'sm': ['1.008rem', { lineHeight: '1.44rem' }],    // 20% bigger than 0.875rem
                'base': ['1.2rem', { lineHeight: '1.8rem' }],     // 20% bigger than 1rem
                'lg': ['1.296rem', { lineHeight: '1.92rem' }],    // 20% bigger than 1.125rem
                'xl': ['1.44rem', { lineHeight: '2.04rem' }],     // 20% bigger than 1.25rem
                '2xl': ['1.8rem', { lineHeight: '2.4rem' }],      // 20% bigger than 1.5rem
                '3xl': ['2.16rem', { lineHeight: '2.64rem' }],    // 20% bigger than 1.875rem
                '4xl': ['2.64rem', { lineHeight: '3rem' }],       // 20% bigger than 2.25rem
                '5xl': ['3.6rem', { lineHeight: '1.1' }],         // 20% bigger than 3rem
                '6xl': ['4.32rem', { lineHeight: '1.1' }],        // 20% bigger than 3.75rem
                '7xl': ['5.4rem', { lineHeight: '1.1' }],         // 20% bigger than 4.5rem
                '8xl': ['7.2rem', { lineHeight: '1.1' }],         // 20% bigger than 6rem
                '9xl': ['9.6rem', { lineHeight: '1.1' }],         // 20% bigger than 8rem
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
