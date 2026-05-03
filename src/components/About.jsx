"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: "4+", label: "Years Programming", color: "from-indigo-500 to-indigo-700" },
  { value: "20+", label: "Projects Delivered", color: "from-cyan-500 to-cyan-700" },
  { value: "10+", label: "Tech Stacks Mastery", color: "from-purple-500 to-purple-700" },
  { value: "100%", label: "Client Satisfaction", color: "from-pink-500 to-pink-700" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [cms, setCms] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "config", "portfolio"), (doc) => {
      if (doc.exists()) setCms(doc.data().about);
    });
    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left Side: Story & IDE */}
        <div className="flex-1" ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col h-full"
          >
            <motion.p 
              variants={itemVariants}
              className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-6"
            >
              The Architecture
            </motion.p>
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 tracking-tighter"
            >
              Init <br />
              <span className="text-white/40">Developer.</span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="max-w-xl w-full">
              {/* VS Code Style Editor Window */}
              <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl font-mono text-sm sm:text-base leading-relaxed">
                {/* Editor Header */}
                <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="mx-auto text-white/40 text-xs flex items-center gap-2">
                    <span className="text-[#aaa6c3]">sachin-config.ts</span>
                  </div>
                </div>
                
                {/* Editor Content */}
                <div className="p-4 sm:p-6 overflow-x-auto text-[#e6edf3]">
                  <div className="flex">
                    <div className="flex flex-col text-white/20 select-none pr-4 text-right border-r border-white/5 mr-4">
                      {Array.from({length: 8}).map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                    <div className="flex flex-col whitespace-pre">
                      <span><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">developer</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#ff7b72]">{`{`}</span></span>
                      <span>  <span className="text-[#a5d6ff]">name:</span> <span className="text-[#a5d6ff]">"{cms?.name || "Sachin Gopalakrishnan"}"</span><span className="text-white">,</span></span>
                      <span>  <span className="text-[#a5d6ff]">status:</span> <span className="text-[#a5d6ff]">"Architecting SaaS Products"</span><span className="text-white">,</span></span>
                      <span>  <span className="text-[#a5d6ff]">location:</span> <span className="text-[#a5d6ff]">"{cms?.location || "India"}"</span><span className="text-white">,</span></span>
                      <span>  <span className="text-[#d2a8ff]">executeMission:</span> <span className="text-[#ff7b72]">()</span> <span className="text-[#ff7b72]">=&gt;</span> <span className="text-[#ff7b72]">{`{`}</span></span>
                      <span>    <span className="text-[#ff7b72]">return</span> <span className="text-[#a5d6ff]">"I build digital assets that live and breathe."</span><span className="text-white">;</span></span>
                      <span>  <span className="text-[#ff7b72]">{`}`}</span></span>
                      <span><span className="text-[#ff7b72]">{`}`}</span><span className="text-white">;</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className={cn(
                    "text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br",
                    stat.color
                  )}>
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Visual Layered Cards */}
        <div className="flex-1 relative h-[400px] md:h-auto">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 right-0 w-full md:w-[85%] h-full flex items-center justify-center p-4"
          >
            {/* Background elements */}
            <div className="absolute inset-x-0 bottom-[-20%] h-[300px] w-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10 animate-pulse" />
            
            {/* Layered content cards */}
            <div className="relative w-full h-[350px] md:h-[450px]">
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                className="absolute top-0 right-0 w-full h-full glass-indigo rounded-3xl z-10 overflow-hidden group shadow-2xl p-10 flex flex-col justify-end"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0b0e1b] via-[#0b0e1b]/60 to-transparent" />
                <div className="relative z-20">
                  <h3 className="text-3xl font-black mb-4">My Core Philosophy</h3>
                  <p className="text-white/60 leading-relaxed">{cms?.bio || "Focus on the user, and all else will follow. Excellence is not an act, but a habit."}</p>
                </div>
              </motion.div>

              {/* Offset card */}
              <div className="absolute -top-10 -right-10 w-full h-full border border-white/5 bg-white/5 rounded-3xl -z-10" />
              <div className="absolute -top-20 -right-20 w-full h-full border border-white/5 bg-white/5 rounded-3xl -z-20 opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

