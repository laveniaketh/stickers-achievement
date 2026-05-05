
import { Suspense, useRef, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StickerRoller from "@/components/models/StickerRoller";
import AchievementBadge from "@/components/ui/AchievementBadge";

interface AchievementProps {
    title: string
    sticker: string
}

const Achievement = ({ title, sticker }: AchievementProps) => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const stickerScale = isMobile ? 1.3 : isTablet ? 1.5 : 1.6;

    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const [canvasReady, setCanvasReady] = useState(false);

    useGSAP(() => {
        if (!canvasReady) return;
        gsap.to(containerRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(
            badgeRef.current,
            { scale: 0.1, opacity: 0, y: -10 },
            { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "expo.out" }
        );
    }, { dependencies: [canvasReady] });

    const handlePeelComplete = useCallback(() => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 h-full w-full touch-none overflow-hidden overscroll-none select-none bg-black/60 backdrop-blur-sm opacity-0">
            <div
                ref={badgeRef}
                className="absolute top-3/16 lg:top-1/6 left-1/2 z-4 -translate-x-1/2 opacity-0"
            >
                <AchievementBadge>{title}</AchievementBadge>
            </div>
            <Canvas
                className="w-full h-full"
                camera={{ position: [0, 0, 45], fov: 45 }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.stopImmediatePropagation()
                    }, true)
                    setCanvasReady(true);
                }}
            >
                <Environment preset="sunset" />
                <Suspense fallback={null}>
                    <StickerRoller sticker={sticker} scale={stickerScale} onPeelComplete={handlePeelComplete} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Achievement;