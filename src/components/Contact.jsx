"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, ArrowUpRight, Copy } from "lucide-react";
import Globe from "./Globe";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Send, CheckCircle2 } from "lucide-react";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus("loading");
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        timestamp: serverTimestamp(),
        status: "unread"
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0f1f]/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
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

            {/* Render immersive Globe Here */}
            <div className="-mt-16 md:-mt-24 xl:-mt-32 pointer-events-auto mix-blend-screen opacity-80 hover:opacity-100 transition-opacity duration-500">
               <Globe />
            </div>
          </div>

          {/* Right Side: Contact Grid & Form */}
          <div className="flex-1 flex flex-col gap-8 h-fit z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactOptions.map((v, idx) => (
                <motion.a
                  key={idx}
                  href={v.link} 
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-6 glass rounded-[30px] overflow-hidden transition-all duration-700 h-[200px] flex flex-col justify-between border-white/5 hover:border-white/20"
                >
                  <div className={cn(
                      "absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2 rounded-full blur-[60px]",
                      v.color
                  )} />

                  <div className="relative z-10">
                      <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 bg-gradient-to-br shadow-xl scale-90 origin-left",
                          v.color
                      )}>
                          {v.icon}
                      </div>
                      <span className="text-white/40 text-[9px] uppercase tracking-widest font-black block mb-1">{v.name}</span>
                      <h3 className="text-lg font-black group-hover:text-white transition-colors">{v.value}</h3>
                  </div>
                  
                  <div className="flex justify-end gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-full glass border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                          <ArrowUpRight size={16} className="text-white" />
                      </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               
               <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-4">Your Name</label>
                      <input 
                        required
                        type="text" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-4">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder="Hi, I'd like to talk about..."
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    />
                  </div>
                  
                  <button 
                    disabled={status === "loading"}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-500/20"
                  >
                    {status === "success" ? (
                      <><CheckCircle2 size={20} /> Sent Successfully!</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message</>
                    )}
                  </button>
               </form>
            </motion.div>
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
