"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

// ===== CONSTANTS & STYLES =====

const cardTransforms = {
  "-2": "translateX(-700px) translateY(80px) rotateY(20deg) rotateZ(-8deg) scale(0.85)",
  "-1": "translateX(-380px) translateY(40px) rotateY(12deg) rotateZ(-4deg) scale(0.92)",
  "0": "translateX(0) translateY(0) rotateY(0) rotateZ(0) scale(1)",
  "1": "translateX(380px) translateY(40px) rotateY(-12deg) rotateZ(4deg) scale(0.92)",
  "2": "translateX(700px) translateY(80px) rotateY(-20deg) rotateZ(8deg) scale(0.85)",
};

const cardZIndex = { "-2": 1, "-1": 2, "0": 5, "1": 2, "2": 1 };

const defaultGradients = [
  "linear-gradient(145deg, #1a1a2e, #2d1b4e, #6b21a8)",
  "linear-gradient(145deg, #0f2027, #1a4a3a, #16a34a)",
  "linear-gradient(145deg, #0a0a1a, #1e3a8a, #3b82f6)",
  "linear-gradient(145deg, #1a0a0a, #7f1d1d, #ef4444)",
  "linear-gradient(145deg, #0a1a15, #065f46, #10b981)",
];

// ===== COMPONENTS =====

function SafeImage({ src, alt, className, priority = false }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const fallbackSrc = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop`;

  return (
    <div className={cn("relative overflow-hidden bg-slate-900/50", className)}>
      <Image
        src={error || !src ? fallbackSrc : src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className={cn(
          "object-cover transition-all duration-700",
          loading ? "blur-2xl opacity-0" : "blur-0 opacity-100"
        )}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        priority={priority}
        quality={75}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const filtered = docs.filter(p => p.isVisible !== false);
      setProjects(filtered);
      setActiveIndex(Math.floor(filtered.length / 2));
      setLoading(false);
    }, (error) => {
      console.error("Projects Fetch Error:", error);
      setLoading(false); 
    });
    return () => unsub();
  }, []);

  const handleNext = () => setActiveIndex(prev => Math.min(prev + 1, projects.length - 1));
  const handlePrev = () => setActiveIndex(prev => Math.max(prev - 1, 0));

  if (loading) return <div className="h-screen bg-[#080a10]" />;

  if (!loading && projects.length === 0) {
    return (
      <section id="projects" className="min-h-screen bg-[#080a10] text-[#f0f0f5] py-32 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-black syne mb-4">No projects found.</h2>
        <p className="text-white/40 max-w-md mb-8">Check your Firebase connection and ensure your projects are set to 'Visible' in the admin panel.</p>
        <div className="text-[10px] uppercase tracking-widest text-indigo-500/50 font-bold">
          Debug: Received {projects.length} visible projects.
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-[#080a10] text-[#f0f0f5] py-32 px-6 relative overflow-hidden font-sans">
      {/* Ambient Background Blobs */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#6366f1] rounded-full blur-[120px] opacity-[0.12] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ec4899] rounded-full blur-[120px] opacity-[0.12] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#6366f1]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6366f1] syne">Selected work</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 syne leading-none">
            Featured <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>Projects</span>
          </h2>
          <p className="text-white/40 text-sm font-medium tracking-wide">Hover a card to explore · click to view details</p>
        </div>

        {/* Carousel Stage */}
        <div 
          ref={stageRef}
          className="relative h-[450px] w-full flex items-center justify-center perspective-[1600px] mt-10"
        >
          {projects.map((project, idx) => {
            const diff = idx - activeIndex;
            const isVisible = Math.abs(diff) <= 2;
            
            return (
              <ProjectCard 
                key={project.id}
                project={project}
                index={idx}
                diff={diff}
                isVisible={isVisible}
                isActive={diff === 0}
                onClick={() => setActiveIndex(idx)}
                gradient={defaultGradients[idx % defaultGradients.length]}
              />
            );
          })}
        </div>

        {/* Navigation & Controls */}
        <div className="mt-16 flex flex-col items-center gap-8 w-full">
           <div className="flex items-center gap-3">
              {projects.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "transition-all duration-500 rounded-full",
                    i === activeIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
           </div>
           
           <div className="animate-pulse text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
              ← click or drag to rotate →
           </div>

           <div className="flex gap-5">
              <button className="bg-white text-black px-10 py-4 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl shadow-white/5">
                View all projects
              </button>
              <button className="border border-white/10 px-10 py-4 rounded-full font-black text-sm hover:bg-white/5 transition-all flex items-center gap-2">
                GitHub <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}

function ImageCycler({ images, title, priority = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1 || !priority) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images, priority]);

  if (!images || images.length === 0) return <SafeImage src={null} alt={title} className="w-full h-full" priority={priority} />;
  if (images.length === 1) return <SafeImage src={images[0]} alt={title} className="w-full h-full" priority={priority} />;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <SafeImage src={images[index]} alt={title} className="w-full h-full" priority={priority} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, diff, isVisible, isActive, onClick, gradient }) {
  const transform = cardTransforms[diff] || (diff < 0 ? "translateX(-900px) scale(0.5) opacity(0)" : "translateX(900px) scale(0.5) opacity(0)");
  const zIndex = cardZIndex[diff] || 0;
  
  const images = Array.isArray(project.images) ? project.images : (typeof project.images === 'string' ? project.images.split(",").map(s => s.trim()) : [project.thumbnail]);

  return (
    <motion.div
      animate={{ 
        transform,
        zIndex,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={cn(
        "absolute w-[600px] h-[400px] rounded-[12px] overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-500",
        isActive ? "shadow-indigo-500/30 scale-100" : "hover:shadow-white/10 scale-95 opacity-50"
      )}
      style={{ 
        background: gradient,
        transformOrigin: "bottom center",
      }}
    >
      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      {/* Top Right Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] pointer-events-none" />

      {/* Preview Box */}
      <div className="absolute top-6 left-6 right-6 h-56 bg-black/20 rounded-lg border border-white/5 flex flex-col items-center justify-center overflow-hidden group/preview">
        {/* Project Visual Cycler */}
        <ImageCycler images={images} title={project.title} priority={isVisible} />
        
        {/* Fallback / Overlay Icons */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500">
          <div className="text-3xl mb-3 drop-shadow-2xl">
             {project.icon || "🚀"}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-32 pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 syne">
            0{index + 1}
          </span>
          <div className="w-12 h-[1px] bg-white/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 syne">
            {project.tagline || "Digital Product"}
          </span>
        </div>
        
        <h3 className="text-3xl font-black mb-4 tracking-tighter syne text-white">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-5">
          {(project.tech_stack || project.tech || []).slice(0, 6).map(tech => {
            const slug = tech.toLowerCase()
              .replace(/\.js/g, 'dotjs')
              .replace(/\s+/g, '')
              .replace(/\+/g, 'plus')
              .replace(/\#/g, 'sharp');
            
            return (
              <div key={tech} className="group/logo flex items-center gap-2" title={tech}>
                <div className="w-6 h-6 flex items-center justify-center p-1 bg-white/5 rounded-md border border-white/5 transition-all group-hover/logo:bg-white/10">
                  <img 
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt={tech}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden text-[8px] font-bold text-white/40 uppercase">{tech[0]}</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 group-hover/logo:text-white transition-colors">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

