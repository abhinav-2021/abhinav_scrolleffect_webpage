"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "Vortex Engine",
        category: "WebGL Experiment",
        description: "Real-time particle simulation using GPGPU.",
    },
    {
        title: "Lumina Interface",
        category: "Design System",
        description: "A comprehensive React component library.",
    },
    {
        title: "Echo Spatial Audio",
        category: "Web App",
        description: "Immersive 3D audio playground for musicians.",
    },
    {
        title: "Nebula Dashboard",
        category: "SaaS",
        description: "High-performance analytics visualization.",
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 bg-[#121212] py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-xs font-medium tracking-wider text-blue-400 uppercase mb-2 block">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400">
                                    {project.description}
                                </p>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
