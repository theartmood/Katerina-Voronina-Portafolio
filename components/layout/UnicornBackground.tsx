'use client';

import { UnicornScene } from '@/components/ui/UnicornScene';

export function UnicornBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-void">
            <div className="absolute inset-0 flex items-center justify-center opacity-40 will-change-transform">
                <div className="w-full h-full scale-[200%] md:scale-[180%] lg:scale-[160%] transform-gpu">
                    <UnicornScene
                        projectId="ctUpOxUd1hs6fPxi0vmG"
                        width="100vw"
                        height="100vh"
                        className="w-full h-full object-cover"
                        scale={1}
                        dpi={1}
                        lazyLoad={true}
                        production={true}
                        fps={24}
                    />
                </div>
            </div>

            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-void/40" />
        </div>
    );
}

