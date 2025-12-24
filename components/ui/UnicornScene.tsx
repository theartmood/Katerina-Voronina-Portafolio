'use client';

import { useEffect, useRef } from 'react';

interface UnicornSceneProps {
    projectId: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    scale?: number;
    dpi?: number;
    lazyLoad?: boolean;
    production?: boolean;
    fps?: number;
}

export function UnicornScene({
    projectId,
    width = 390,
    height = 844,
    className = '',
    scale = 1,
    dpi = 1.5,
    lazyLoad = true,
    production = true,
    fps = 60,
}: UnicornSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Solo cargar el script una vez globalmente
        if (window.UnicornStudio || scriptLoadedRef.current) {
            return;
        }

        scriptLoadedRef.current = true;

        // Cargar el script de Unicorn Studio
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js';
        script.async = true;
        script.onload = () => {
            if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                window.UnicornStudio.init();
                window.UnicornStudio.isInitialized = true;
            }
        };

        (document.head || document.body).appendChild(script);

        // Cleanup: no destruimos el script global ya que puede ser usado por otros componentes
        return () => {
            // El script permanece cargado para otros usos
        };
    }, []);

    return (
        <div
            ref={containerRef}
            data-us-project={projectId}
            data-us-scale={scale}
            data-us-dpi={dpi}
            data-us-lazyload={lazyLoad ? 'true' : 'false'}
            data-us-production={production ? 'true' : 'false'}
            data-us-fps={fps}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
            className={className}
        />
    );
}

// Extender el tipo Window para TypeScript
declare global {
    interface Window {
        UnicornStudio?: {
            isInitialized: boolean;
            init: () => void;
            destroy?: () => void;
        };
    }
}

