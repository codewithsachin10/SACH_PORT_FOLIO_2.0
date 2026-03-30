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

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
              My Tech Stack
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
              Mastering <span className="text-white/40 italic">Digital Tools.</span>
            </motion.h2>
          </div>
          <div className="max-w-md text-[#aaa6c3] text-lg md:text-xl font-medium leading-relaxed">
            I believe in picking the right tool for the job. Here's a curated list of my expertise across the full developmental spectrum.
          </div>
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

function SkillCard({ cluster, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{ y: -15, scale: 1.02 }}
      className={cn(
        "group relative p-10 md:p-14 rounded-[40px] glass overflow-hidden transition-all duration-700",
        cluster.glow
      )}
    >
      {/* Decorative background glow that follows category color */}
      <div className={cn(
        "absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -translate-y-1/2 translate-x-1/2 rounded-full blur-[80px]",
        cluster.color
      )} />

      <h3 className="text-3xl font-black mb-12 flex items-center justify-between">
        {cluster.category}
        <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm group-hover:text-white transition-colors">0{index + 1}</span>
      </h3>
      
      <div className="flex flex-wrap gap-4 relative z-10">
        {cluster.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.05) }}
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-sm md:text-md font-bold text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className={cn("h-full bg-gradient-to-r", cluster.color)} 
          />
      </div>
    </motion.div>
  );
}
