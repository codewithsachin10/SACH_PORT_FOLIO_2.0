"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Three.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Vercel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true }
];

export default function TechMarquee() {
  return (
    <div className="py-6 md:py-8 bg-[#0a0f1f]/80 overflow-hidden relative z-20 flex items-center border-y border-white/5 mt-10 md:mt-0">
      {/* Gradients for fading edges matching the new background */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0f1f] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0f1f] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-6 sm:gap-8 items-center py-2" // Added py-2 so scale-105 hover doesn't clip
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {/* Double array for seamless looping */}
        {[...technologies, ...technologies].map((tech, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center gap-4 px-8 py-4 rounded-2xl bg-[#12182b] border border-white/5 shadow-xl hover:bg-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <img 
                src={tech.src} 
                alt={tech.name} 
                className={`max-w-full max-h-full object-contain group-hover:rotate-12 transition-transform duration-500 ${tech.invert ? "invert" : ""}`} 
              />
            </div>
            <span className="text-lg md:text-xl font-bold text-white tracking-wide transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
