"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Globe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    
    // Setting up the high-performance Vercel-like wireframe globe
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.2,
      dark: 1, // Dark mode globe
      diffuse: 1.2,
      mapSamples: 25000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // White wireframe (turns grey via mapBrightness/dark mode)
      markerColor: [0.38, 0.40, 0.94], // Indigo-500 equivalent
      glowColor: [1, 1, 1], // White ambient glow
      scale: 1,
      offset: [0, 0],
      markers: [
        // Location ping (example: India - you can change these coordinates to your exact city)
        { location: [20.5937, 78.9629], size: 0.1 }
      ],
      onRender: (state) => {
        // Automatically rotate the globe
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-[500px] aspect-square relative mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0f1f]/30 to-transparent z-10 pointer-events-none" />
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size", opacity: 0.9 }}
      />
    </motion.div>
  );
}
