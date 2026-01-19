"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay() {
    // We use the global window scroll for these if the parent is providing the height.
    // Since ScrollyCanvas is 500vh, we map the scroll from 0 to 1 over that distance.
    const { scrollYProgress } = useScroll();

    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

    // Y parallax transforms (move slightly up as we scroll)
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.75], [50, -50]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none h-[500vh]">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
                    Abhinav Kourav
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 font-light">
                    Creative Developer.
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="fixed top-0 left-0 w-full h-screen flex items-center p-8 md:p-20"
            >
                <div className="max-w-xl">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        I build digital <br /> experiences.
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Crafting immersive web interactions with performance in mind.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="fixed top-0 right-0 w-full h-screen flex flex-col items-center justify-center text-right p-8 md:p-20 items-end"
            >
                <div className="max-w-xl">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Bridging design <br /> & engineering.
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}
