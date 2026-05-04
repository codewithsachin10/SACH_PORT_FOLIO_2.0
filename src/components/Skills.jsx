"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skillClusters = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Three.js", "TailwindCSS", "Framer Motion", "TypeScript"],
    color: "from-indigo-500 to-indigo-700",
    glow: "shadow-indigo-500/20",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Python", "SQL", "Postman", "REST API"],
    color: "from-cyan-500 to-cyan-700",
    glow: "shadow-cyan-500/20",
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Vite", "NPM", "VS Code", "Vercel", "Firebase"],
    color: "from-purple-500 to-purple-700",
    glow: "shadow-purple-500/20",
  },
  {
    category: "Design",
    skills: ["Figma", "Photoshop", "UI/UX", "Responsive Design", "Typography", "Color Theory"],
    color: "from-pink-500 to-pink-700",
    glow: "shadow-pink-500/20",
  },
];

import GlitchText from "./GlitchText";
import TechGravityBox from "./TechGravityBox";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
              My Tech Stack
            </motion.p>
            <GlitchText 
              text="Mastering Tools."
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            />
          </div>
          <div className="max-w-md text-[#aaa6c3] text-lg md:text-xl font-medium leading-relaxed">
            I believe in picking the right tool for the job. Here's a curated list of my expertise across the full developmental spectrum.
          </div>
        </div>

        {/* Physics-Based Interactive Gravity Box */}
        <div className="mb-24 w-full">
           <TechGravityBox />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {skillClusters.map((cluster, idx) => (
            <SkillCard key={idx} cluster={cluster} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

const skillLogoMap = {
  "React": "react",
  "Next.js": "nextdotjs",
  "Three.js": "threedotjs",
  "TailwindCSS": "tailwindcss",
  "Framer Motion": "framer",
  "TypeScript": "typescript",
  "Node.js": "nodedotjs",
  "Express": "express",
  "MongoDB": "mongodb",
  "Python": "python",
  "SQL": "postgresql",
  "Postman": "postman",
  "REST API": "insomnia",
  "Git": "git",
  "GitHub": "github",
  "Vite": "vite",
  "NPM": "npm",
  "VS Code": "visualstudiocode",
  "Vercel": "vercel",
  "Firebase": "firebase",
  "Figma": "figma",
  "Photoshop": "adobephotoshop",
  "UI/UX": "adobecreativecloud",
  "Responsive Design": "css3",
  "Typography": "googlefonts",
  "Color Theory": "pottle",
};

function SkillCard({ cluster, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className={cn(
        "group relative p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 shadow-2xl",
        cluster.glow.replace('shadow-', 'hover:shadow-')
      )}
    >
      {/* Background Ambient Glow */}
      <div className={cn(
        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br",
        cluster.color
      )} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black syne tracking-tight text-white flex items-center gap-3">
            <span className={cn("w-1.5 h-6 rounded-full bg-gradient-to-b", cluster.color)} />
            {cluster.category}
          </h3>
          <span className="text-[10px] font-black font-mono text-white/20 border border-white/5 px-3 py-1 rounded-full bg-white/5">
            0{index + 1}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {cluster.skills.map((skill, i) => {
            const slug = skillLogoMap[skill] || "code";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-default group/item"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-black/20 border border-white/5 group-hover/item:scale-110 transition-transform">
                  <img 
                    src={`https://cdn.simpleicons.org/${slug}`} 
                    alt={skill}
                    className="w-4 h-4 object-contain transition-all"
                    onError={(e) => { e.target.src = "https://cdn.simpleicons.org/codevars"; }}
                  />
                </div>
                <span className="text-[11px] font-bold text-white/60 group-hover/item:text-white transition-colors uppercase tracking-wider whitespace-nowrap">
                  {skill}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className={cn("h-full bg-gradient-to-r relative", cluster.color)} 
          >
            {/* Animated Glow Tip */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white blur-md opacity-50" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
