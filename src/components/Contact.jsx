"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, ArrowUpRight, Copy } from "lucide-react";
import Globe from "./Globe";
import { cn } from "@/lib/utils";

const contactOptions = [
  { 
    name: "Email Me", 
    value: "sachingopalakrishnan@email.com", 
    icon: <Mail />, 
    link: "mailto:sachingopalakrishnan@email.com", 
    color: "from-indigo-500 to-indigo-700" 
  },
  { 
    name: "GitHub Profile", 
    value: "@codewithsachin10", 
    icon: <Github />, 
    link: "https://github.com/codewithsachin10", 
    color: "from-cyan-500 to-cyan-700" 
  },
  { 
    name: "LinkedIn Connect", 
    value: "Sachin G.", 
    icon: <Linkedin />, 
    link: "https://linkedin.com/in/sachin-g", 
    color: "from-purple-500 to-purple-700" 
  },
  { 
    name: "Book a Meeting", 
    value: "Calendar Link", 
    icon: <Calendar />, 
    link: "#", 
    color: "from-pink-500 to-pink-700" 
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0f1f]/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          {/* Left Side: Text info & Interactive Globe */}
          <div className="flex-1 flex flex-col">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-6"
            >
              Get In Touch
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12"
            >
              Let’s build <br /> something <br />
              <span className="text-white/40 italic text-gradient">impactful.</span>
            </motion.h2>
            
            <p className="text-[#aaa6c3] text-xl leading-relaxed mb-6 max-w-sm font-medium">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Based in India, working globally.
            </p>

            <div className="hidden md:block my-8">
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="h-24 w-1.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent rounded-full shadow-indigo-500/50 shadow-2xl" 
              />
            </div>

            {/* Render immersive Globe Here */}
            <div className="-mt-16 md:-mt-24 xl:-mt-32 pointer-events-auto mix-blend-screen opacity-80 hover:opacity-100 transition-opacity duration-500">
               <Globe />
            </div>
          </div>

          {/* Right Side: Contact Grid */}
          <div className="flex-1.5 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 h-fit z-10">
            {contactOptions.map((v, idx) => (
              <motion.a
                key={idx}
                href={v.link} 
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 md:p-10 glass rounded-[30px] md:rounded-[40px] overflow-hidden transition-all duration-700 h-[240px] md:h-[280px] flex flex-col justify-between border-white/5 hover:border-white/20 shadow-2xl"
              >
                <div className={cn(
                    "absolute top-0 right-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2 rounded-full blur-[60px]",
                    v.color
                )} />

                <div className="relative z-10">
                    <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 bg-gradient-to-br shadow-xl scale-90 md:scale-100 origin-left",
                        v.color
                    )}>
                        {v.icon}
                    </div>
                    <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-black block mb-2 md:mb-4">{v.name}</span>
                    <h3 className="text-xl md:text-2xl font-black group-hover:text-white transition-colors">{v.value}</h3>
                </div>
                
                <div className="flex justify-end gap-2 relative z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full glass border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                        <ArrowUpRight size={16} className="text-white" />
                    </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
    const letters = "SACHIN".split("");

    return (
        <footer className="pt-16 md:pt-24 pb-8 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden bg-[#050816]">
             {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 relative z-20 mb-20 md:mb-32">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="text-3xl font-black mb-4 flex items-center gap-2">
                      <span>SG</span><span className="text-indigo-500">.</span>
                    </div>
                    <p className="text-white/40 text-sm max-w-[250px]">Design-driven development for high-impact products.</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md rounded-full px-8 md:px-12 py-4 md:py-6 border border-white/5 shadow-2xl flex flex-wrap justify-center items-center gap-6 md:gap-10">
                    <a href="#about" className="text-white/40 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">About</a>
                    <a href="#projects" className="text-white/40 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">Projects</a>
                    <a href="#skills" className="text-white/40 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">Skills</a>
                    <a href="#experience" className="text-white/40 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">Experience</a>
                </div>

                <div className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center lg:text-right">
                    © 2026 SACHIN G. <br className="hidden lg:block"/>
                    <span className="inline lg:hidden"> | </span> All rights reserved.
                </div>
            </div>

            {/* Massive Play-With-Words Interactive Typography */}
            <div className="w-full flex justify-center overflow-hidden relative z-20 select-none pb-4 group">
               <h1 className="text-[22vw] md:text-[24vw] font-black leading-none tracking-tighter flex whitespace-nowrap text-white/5 cursor-default">
                  {letters.map((letter, i) => (
                      <motion.span
                         key={i}
                         whileHover={{ y: -20, scaleY: 1.2, color: "#915eff" }}
                         transition={{ type: "spring", stiffness: 300, damping: 10 }}
                         className={cn(
                             "transition-colors duration-300",
                             letter === " " ? "w-[4vw]" : ""
                         )}
                         style={{ 
                             WebkitTextStroke: "2px rgba(255,255,255,0.05)",
                             color: "transparent"
                         }}
                      >
                         {letter}
                      </motion.span>
                  ))}
               </h1>
               
               {/* Hover hidden message */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="text-white/80 font-black tracking-[1em] md:tracking-[2em] uppercase text-sm md:text-xl mix-blend-overlay">
                      Ready to build.
                  </span>
               </div>
            </div>

            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-[5%] bottom-[10%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-indigo-500/5 rounded-full blur-[60px] md:blur-[80px]" 
            />
        </footer>
    );
}
