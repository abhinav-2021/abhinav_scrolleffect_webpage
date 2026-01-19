"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    const frameCount = 120;

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const paddedIndex = i.toString().padStart(3, "0");
                img.src = `/sequence/frame_${paddedIndex}.webp`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === frameCount) setIsLoaded(true);
                        resolve(true);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(true);
                    };
                });
                imgArray[i] = img;
            }
            setImages(imgArray);
        };

        loadImages();
    }, []);

    // Draw frame on canvas
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }, [images]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (images.length > 0) {
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(currentProgress * (frameCount - 1))
                );
                renderFrame(frameIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images, scrollYProgress, renderFrame]);

    // Handle Scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * (frameCount - 1))
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial draw once loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images, renderFrame]);

    return (
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        Loading Experience...
                    </div>
                )}
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />
            </div>
        </div>
    );
}
