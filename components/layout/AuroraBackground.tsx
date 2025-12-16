'use client';

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-void">
            {/* Deep Amethyst Orb */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amethyst-dark/30 rounded-full blur-[120px] animate-blob mix-blend-screen opacity-60" />

            {/* Midnight Blue Orb */}
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-midnight/40 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen opacity-50" />

            {/* Platinum/White hint Orb */}
            <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#2a2a35]/30 rounded-full blur-[130px] animate-blob animation-delay-4000 mix-blend-screen opacity-40" />

            {/* Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain" />
        </div>
    );
}
