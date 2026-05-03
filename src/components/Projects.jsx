"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// ===== CONSTANTS & STYLES =====

const cardTransforms = {
  "-2": "translateX(-650px) translateY(60px) rotateY(18deg) rotateZ(-10deg) scale(0.82)",
  "-1": "translateX(-340px) translateY(30px) rotateY(10deg) rotateZ(-5deg) scale(0.89)",
  "0": "translateX(0) translateY(0) rotateY(0) rotateZ(0) scale(1)",
  "1": "translateX(340px) translateY(30px) rotateY(-10deg) rotateZ(5deg) scale(0.89)",
  "2": "translateX(650px) translateY(60px) rotateY(-18deg) rotateZ(10deg) scale(0.82)",
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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const filtered = docs.filter(p => p.isVisible !== false);
      setProjects(filtered);
      setActiveIndex(Math.floor(filtered.length / 2));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleNext = () => setActiveIndex(prev => Math.min(prev + 1, projects.length - 1));
  const handlePrev = () => setActiveIndex(prev => Math.max(prev - 1, 0));

  if (loading) return <div className="h-screen bg-[#080a10]" />;

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
          className="relative h-[550px] w-full flex items-center justify-center perspective-[1400px] mt-10"
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

function ProjectCard({ project, index, diff, isVisible, isActive, onClick, gradient }) {
  const transform = cardTransforms[diff] || (diff < 0 ? "translateX(-800px) scale(0.5) opacity(0)" : "translateX(800px) scale(0.5) opacity(0)");
  const zIndex = cardZIndex[diff] || 0;

  return (
    <motion.div
      animate={{ 
        transform,
        zIndex,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={cn(
        "absolute w-[380px] h-[520px] rounded-[24px] overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-500",
        isActive ? "shadow-indigo-500/20" : "hover:shadow-white/5"
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
      <div className="absolute top-10 left-8 right-8 h-56 bg-black/20 rounded-2xl border border-white/5 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-5xl mb-4 drop-shadow-xl">
           {project.icon || "🚀"}
        </div>
        <div className="flex items-end gap-1.5 h-10">
          {[0.1, 0.2, 0.3, 0.4, 0.5].map(delay => (
            <motion.div
              key={delay}
              animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, delay, ease: "easeInOut" }}
              className="w-1.5 bg-white/40 rounded-full"
              style={{ height: `${Math.random() * 40 + 60}%` }}
            />
          ))}
        </div>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black syne">
        ★ {project.rating || "5.0"}
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent">
        <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1 syne">
          0{index + 1} — {project.tagline || "Project"}
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight syne">{project.title}</h3>
        <p className="text-white/40 text-[11px] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(project.tech_stack || project.tech || []).slice(0, 3).map(tech => (
            <span key={tech} className="px-2.5 py-1 bg-white/5 backdrop-blur-md border border-white/5 rounded-md text-[8px] font-bold uppercase tracking-wider text-white/60">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
