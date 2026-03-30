"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const roles = ["Student Developer", "Full Stack Builder", "Creative Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const inter = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(inter);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated grid */}
        <div className="absolute inset-x-0 bottom-0 top-[-10%] h-[1000px] w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-1.5 h-24 bg-gradient-to-b from-indigo-500 to-transparent rounded-full mb-8 shadow-indigo-500/50 shadow-2xl mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[#aaa6c3] uppercase bg-white/5 border border-white/10 rounded-full backdrop-blur-sm shadow-xl shadow-black/20"
        >
          Elevating Code to Art
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            Sachin
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-gradient drop-shadow-[0_0_30px_rgba(145,94,255,0.3)]"
          >
            Gopalakrishnan
          </motion.span>
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
          <span className="text-xl md:text-2xl font-medium text-white/50 space-nowrap">
            I am a
          </span>
          <div className="h-10 overflow-hidden text-2xl md:text-3xl font-black text-white px-2">
            <motion.div
              key={roleIndex}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {roles[roleIndex]}
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-lg md:text-xl text-[#aaa6c3] max-w-2xl leading-relaxed mb-12"
        >
          Specializing in high-performance full-stack web applications with immersive UI/UX experiences and modern architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-text px-8 py-4 rounded-full font-bold text-white shadow-xl shadow-indigo-500/20 text-lg transition-all text-center"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-bold text-white border border-white/20 backdrop-blur-md shadow-xl text-lg transition-all text-center"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] tracking-[0.3em] font-black uppercase mb-2">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}
