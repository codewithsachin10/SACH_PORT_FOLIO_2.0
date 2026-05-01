"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import GlitchText from "./GlitchText";

const featuredProjects = [
  {
    title: "Snackzo App",
    description: "A high-performance production-grade e-commerce framework with real-time stock reservation, custom RLS security hardening, and Swiggy-level latency.",
    problem: "Needed a unified support architecture and zero-vulnerability wallet system tailored for heavy bursts of high-density campus orders.",
    tags: ["Next.js", "Supabase", "Real-time", "WebSockets"],
    image: "/assets/hostelmart_new.png",
    color: "#ff4c9f",
    liveUrl: "https://snackzo-app.vercel.app",
    githubUrl: "https://github.com/codewithsachin10/SNACKZO",
  },
  {
    title: "ZeroCode AI",
    description: "An intelligent AI platform integrating an interactive PPT viewer with offline features and advanced AI document processing.",
    problem: "Creating seamless interactive presentations that require offline-first capabilities and heavy AI computational understanding.",
    tags: ["Next.js", "AI", "Offline First", "Tailwind"],
    image: "/assets/connct_new.png",
    color: "#00cea8",
    liveUrl: "https://zerocode-ai.vercel.app",
    githubUrl: "https://github.com/codewithsachin10/ZeroCode-AI",
  },
  {
    title: "Mr & Mrs Waffles",
    description: "A comprehensive brand administration app featuring an employee attendance hub and a global QR code marketing studio.",
    problem: "Streamlining physical store operations, employee tracking, and dynamic marketing into a singular, blazing-fast dashboard.",
    tags: ["Next.js 15", "Firebase", "Firestore", "Auth"],
    image: "/assets/portfolio_new.png",
    color: "#915eff",
    liveUrl: "https://mr-mrs-waffles.vercel.app",
    githubUrl: "https://github.com/codewithsachin10/mr_mrs_waffles",
  },
];

const smallProjects = [
  { title: "QR Generator SaaS", tech: "Next.js • EmailJS", desc: "High-fidelity QR code SaaS with secure OTP verification." },
  { title: "CodeNest Studio", tech: "React • Stealth UI", desc: "High-end agency website with hidden admin portals." },
  { title: "Gold Pulse", tech: "Serverless • API", desc: "Live dynamic Gold pricing API tracker with custom CORS proxy." },
  { title: "Bunk Credit", tech: "Next.js • Financial", desc: "Financial credit and attendance tracking system." },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#050816] py-24 md:py-48 overflow-hidden w-full relative z-10">
      {/* Featured Projects */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-16 md:mb-24 text-center">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
                Portfolio
            </motion.p>
            <GlitchText 
                text="Selected Works."
                as="h2"
                className="text-5xl md:text-8xl font-black text-white tracking-tighter"
            />
        </div>

        <div className="space-y-24 md:space-y-32 w-full">
          {featuredProjects.map((project, idx) => (
            <FeaturedProject key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Grid Showcase replacing horizontal scroll */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 md:mt-48 w-full">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Other Explorations<span className="text-indigo-text">.</span></h3>
          <p className="text-[#aaa6c3] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">A collection of experiments, UI concepts, and quick builds that highlight my versatility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {smallProjects.map((work, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl p-6 md:p-8 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500 cursor-pointer w-full"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white/50">{idx + 1}</div>
                <Github size={20} className="text-white/30 group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-indigo-text text-xs tracking-widest font-black uppercase mb-3 block">{work.tech}</span>
                <h4 className="text-2xl font-black mb-3 group-hover:text-indigo-500 transition-colors tracking-tight">{work.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{work.desc}</p>
                <div className="w-0 group-hover:w-full h-0.5 bg-indigo-500 mt-6 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 md:mt-24 text-center w-full px-4 md:px-0">
            <h3 className="text-2xl md:text-5xl font-black mb-8 tracking-tighter">Ready to see more in detail?</h3>
            <button className="mx-auto w-full sm:w-auto bg-white text-black px-8 md:px-10 py-4 text-sm md:text-base rounded-full font-black flex items-center justify-center gap-4 hover:scale-105 transition-all">
                Let's Talk <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, index }) {
  const titleParts = project.title.split(' ');
  const firstWord = titleParts[0];
  const restWords = titleParts.slice(1).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full",
        index % 2 !== 0 && "lg:flex-row-reverse"
      )}
    >
      {/* Left side: content */}
      <div className="flex-1 space-y-6 md:space-y-8 w-full max-w-full">
        <div className="w-full">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-indigo-500" />
            <span className="font-bold tracking-widest text-[#aaa6c3] uppercase text-[10px] md:text-xs">Featured Project {index + 1}</span>
          </div>
          
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight tracking-tighter max-w-full break-words">
            {firstWord} {restWords && <br className="hidden lg:block" />}
            <span className="text-indigo-500">{restWords ? ` ${restWords}` : ""}</span>
          </h3>
          
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl w-full">
            {project.description}
          </p>

          <div className="glass-indigo p-5 md:p-6 rounded-2xl mb-6 md:mb-8 border-l-4 border-l-indigo-500 w-full">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                Problem Solved <ArrowRight size={14} className="text-indigo-400" />
            </h4>
            <p className="text-white/90 text-sm font-medium italic">"{project.problem}"</p>
          </div>

          <div className="flex gap-2 md:gap-3 flex-wrap mb-8 md:mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] md:text-xs font-bold uppercase text-white/60 border border-white/10 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          {/* Fixed responsive buttons alignment */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
            <a 
                href={project.liveUrl} 
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black px-6 md:px-8 py-3.5 rounded-full font-black text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors sm:w-auto w-full"
            >
                View Live <ExternalLink size={16} />
            </a>
            <a 
                href={project.githubUrl} 
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 px-6 md:px-8 py-3.5 rounded-full font-black text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors sm:w-auto w-full"
            >
                GitHub <Github size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Right side: Mockup Card */}
      <div className="flex-1 w-full relative mt-4 lg:mt-0">
        <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="w-full relative z-20 aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px]"
        >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden glass border-white/10 relative shadow-2xl group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Decorative background glow that no longer overflows horizontally */}
            <div className="absolute inset-0 md:-inset-4 bg-indigo-500/20 blur-[40px] md:blur-[60px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

