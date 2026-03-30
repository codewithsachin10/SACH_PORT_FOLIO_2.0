"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, ArrowUpRight, Copy } from "lucide-react";
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
          {/* Left Side: Text info */}
          <div className="flex-1">
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
            
            <p className="text-[#aaa6c3] text-xl leading-relaxed mb-12 max-w-sm font-medium">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="h-24 md:h-32 w-1.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent rounded-full shadow-indigo-500/50 shadow-2xl" 
            />
          </div>

          {/* Right Side: Contact Grid */}
          <div className="flex-1.5 grid grid-cols-1 sm:grid-cols-2 gap-8 h-fit">
            {contactOptions.map((v, idx) => (
              <motion.a
                key={idx}
                href={v.link} 
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-10 glass rounded-[40px] overflow-hidden transition-all duration-700 h-[280px] flex flex-col justify-between border-white/5 hover:border-white/20 shadow-2xl"
              >
                <div className={cn(
                    "absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2 rounded-full blur-[60px]",
                    v.color
                )} />

                <div className="relative z-10">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br shadow-xl",
                        v.color
                    )}>
                        {v.icon}
                    </div>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-black block mb-4">{v.name}</span>
                    <h3 className="text-2xl font-black group-hover:text-white transition-colors">{v.value}</h3>
                </div>
                
                <div className="flex justify-end gap-2 relative z-10">
                    <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                        <ArrowUpRight size={18} className="text-white" />
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
    return (
        <footer className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-10 overflow-hidden">
             {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="text-3xl font-black mb-4">SG<span className="text-indigo-text">.</span></div>
                    <p className="text-white/40 text-sm max-w-[200px]">Design-driven development for high-impact products.</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md rounded-full px-12 py-6 border border-white/5 shadow-2xl flex items-center gap-10">
                    <a href="#about" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">About</a>
                    <a href="#projects" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Projects</a>
                    <a href="#skills" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Skills</a>
                    <a href="#experience" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Experience</a>
                </div>

                <div className="text-white/40 text-xs font-bold uppercase tracking-widest text-center md:text-right">
                    © 2026 SACHIN G. <br />
                    All rights reserved.
                </div>
            </div>

            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-[5%] bottom-[10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px]" 
            />
        </footer>
    );
}
