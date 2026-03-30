"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
        {/* Left Side: Story */}
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
              The Story So Far
            </motion.p>
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 tracking-tighter"
            >
              Architecting Digital <br />
              <span className="text-white/40">Experiences.</span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-8 max-w-xl">
              <p className="text-xl md:text-2xl text-[#aaa6c3] leading-relaxed">
                I am <span className="text-white font-bold">Sachin Gopalakrishnan</span>, a student developer on a mission to build highly professional, polished, and efficient web products.
              </p>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                My passion lies at the intersection of <span className="text-indigo-text">premium UI design</span> and <span className="text-cyan-text">scalable backend architecture</span>. Every project I undertake is an opportunity to solve real-world problems through clean, elegant code.
              </p>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-italic">
                "I don't just build websites; I build digital assets that live and breathe with their users."
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
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
                  <p className="text-white/60 leading-relaxed">Focus on the user, and all else will follow. Excellence is not an act, but a habit.</p>
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
