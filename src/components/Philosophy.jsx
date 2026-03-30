"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const values = [
  { 
    title: "Performance First", 
    desc: "Speed is not a feature; it's a fundamental requirement. Every millisecond counts.",
    color: "from-indigo-300 to-indigo-500",
    id: "01"
  },
  { 
    title: "User-Centric Design", 
    desc: "Empowering users through intuitive interfaces and seamless navigation paths.",
    color: "from-cyan-300 to-cyan-500",
    id: "02"
  },
  { 
    title: "Code as Literature", 
    desc: "Writing clean, maintainable, and elegant code that tells a clear story to fellow developers.",
    color: "from-purple-300 to-purple-500",
    id: "03"
  },
  { 
    title: "Constant Evolution", 
    desc: "Accepting that technology moves fast, and continuous learning is the only way to stay ahead.",
    color: "from-pink-300 to-pink-500",
    id: "04"
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0f1f]/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
              The Core
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
              Build <span className="text-white/40 italic">Philosophy.</span>
            </motion.h2>
          </div>
          <div className="max-w-md text-[#aaa6c3] text-lg md:text-xl font-medium leading-relaxed">
            Principles that guide my creative process and engineering decisions every single day.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {values.map((v, idx) => (
            <div key={idx} className="group p-10 md:p-14 glass rounded-[40px] relative overflow-hidden transition-all duration-700 hover:y-[-10px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-16">
                    <span className={cn(
                        "text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br opacity-20 transition-opacity duration-700 group-hover:opacity-100",
                        v.color
                    )}>{v.id}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">
                    {v.title}
                </h3>
                
                <p className="text-xl text-white/40 leading-relaxed font-italic transition-colors duration-700 group-hover:text-white/60">
                    "{v.desc}"
                </p>
                
                <div className="mt-12 h-0.5 w-0 group-hover:w-full bg-indigo-text transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-48 flex justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center max-w-4xl"
            >
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white/10 tracking-widest leading-none mb-10 selection:text-white/5 uppercase select-none">
                    Excellence <br /> 
                    is not an option <br />
                    it is <span className="text-white/60 animate-pulse transition-all">the standard</span>
                </h3>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
