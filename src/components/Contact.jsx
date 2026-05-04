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
  const [status, setStatus] = useState("idle"); 

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
    <section id="contact" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#0a0f1f]/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Heading & Bento Info */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-indigo-500/50" />
                <span className="text-indigo-400 font-black tracking-[0.4em] uppercase text-[10px] syne">Get In Touch</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] syne"
              >
                Let’s build <br /> 
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">something</span> <br />
                <span className="text-white/20 italic">impactful.</span>
              </motion.h2>
              
              <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                <span className="text-white/80 ml-2">Based in India, working globally.</span>
              </p>
            </div>

            {/* Bento Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactOptions.map((v, idx) => (
                <motion.a
                  key={idx}
                  href={v.link} 
                  target="_blank"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/5 overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 flex flex-col justify-between h-[180px]",
                    idx === 0 ? "sm:col-span-2 h-[140px] sm:h-[120px] flex-row items-center" : ""
                  )}
                >
                  <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl",
                      v.color
                  )} />

                  <div className="flex items-center gap-5 relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-xl transition-transform group-hover:scale-110",
                      v.color
                    )}>
                      {v.icon}
                    </div>
                    <div>
                      <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-black block mb-1">{v.name}</span>
                      <h3 className="text-md md:text-lg font-black text-white/80 group-hover:text-white transition-colors tracking-tight">{v.value}</h3>
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-center relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="sticky top-24 p-8 md:p-10 rounded-[40px] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               
               <div className="relative z-10 mb-8">
                  <h4 className="text-xl font-black text-white syne mb-2">Send a Message</h4>
                  <p className="text-white/40 text-sm font-medium">I'll get back to you within 24 hours.</p>
               </div>

               <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <div className="group/field">
                      <input 
                        required
                        type="text" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="Full Name"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                    <div className="group/field">
                      <input 
                        required
                        type="email" 
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="Email Address"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] focus:border-indigo-500/50 transition-all"
                      />
                    </div>
                    <div className="group/field">
                      <textarea 
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        placeholder="Your Message..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] focus:border-indigo-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>
                  
                  <button 
                    disabled={status === "loading"}
                    className={cn(
                      "uiverse-button",
                      status === "loading" && "is-sending",
                      status === "success" && "is-sent"
                    )}
                  >
                    <div className="u-outline"></div>
                    <div className="state state--default">
                      <div className="icon">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor" />
                            <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor" />
                          </g>
                        </svg>
                      </div>
                      <p>
                        {"SendMessage".split("").map((l, i) => (
                          <span key={i} style={{ "--i": i }}>{l}</span>
                        ))}
                      </p>
                    </div>
                    <div className="state state--sent">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" strokeWidth="0.5px" stroke="black">
                          <g>
                            <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                            <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" />
                          </g>
                        </svg>
                      </div>
                      <p>
                        {"Sent".split("").map((l, i) => (
                          <span key={i} style={{ "--i": i + 5 }}>{l}</span>
                        ))}
                      </p>
                    </div>
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
