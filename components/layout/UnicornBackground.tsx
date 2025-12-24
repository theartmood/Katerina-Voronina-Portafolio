'use client';

import { UnicornScene } from '@/components/ui/UnicornScene';

export function UnicornBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-void">
            {/* Unicorn Studio Animation as Background - Zoomed to hide watermark */}
            {/* Optimizaciones de performance: will-change, transform para GPU acceleration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 will-change-transform">
                <div className="w-full h-full scale-[200%] md:scale-[180%] lg:scale-[160%] transform-gpu">
                    {/* Optimizaciones de performance: FPS reducido, DPI optimizado, GPU acceleration */}
                    <UnicornScene
                        projectId="ctUpOxUd1hs6fPxi0vmG"
                        width="100vw"
                        height="100vh"
                        className="w-full h-full object-cover"
                        scale={1}
                        dpi={1.2}
                        lazyLoad={true}
                        production={true}
                        fps={30}
                    />
                </div>
            </div>
            
            {/* Dark overlay to ensure text readability - Reduced for more brightness */}
            <div className="absolute inset-0 bg-void/40" />
        </div>
    );
}

