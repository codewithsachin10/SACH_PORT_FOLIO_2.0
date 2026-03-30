"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Student Developer",
    company: "Self-Learning & Building",
    date: "2023 - Present",
    description: "Actively learning and building web applications using modern technologies. Focused on creating interactive user experiences.",
    skills: ["React", "JavaScript", "Three.js", "Node.js", "MongoDB"],
    icon: "🎓",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Frontend Development",
    company: "Personal Projects",
    date: "2024",
    description: "Built multiple responsive web applications including interactive 3D portfolios and SaaS tools.",
    skills: ["React", "CSS", "Framer Motion", "HTML", "Git"],
    icon: "💻",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    title: "Full Stack Exploration",
    company: "Learning Journey",
    date: "2024",
    description: "Explored backend development with Node.js and Express. Created REST APIs and learned database management.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    icon: "🚀",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Creative Web Design",
    company: "Freelance / Projects",
    date: "2024 - Present",
    description: "Diving into high-end UI/UX and 3D web experiences using Next.js, GSAP, and Three.js.",
    skills: ["Next.js", "GSAP", "TailwindCSS", "Adobe Figma"],
    icon: "🎨",
    color: "from-pink-400 to-pink-600",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-24 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="flex-1 sticky top-32 h-fit">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
                Roadmap
            </motion.p>
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-10"
            >
                My Learning <span className="text-white/40 italic">Journey.</span>
            </motion.h2>
            <p className="text-[#aaa6c3] text-xl leading-relaxed max-w-sm">Every step represents a milestone in technical growth and a commitment to excellence.</p>
        </div>

        <div className="flex-1.5 relative border-l-2 border-white/5 pl-12 space-y-32" ref={containerRef}>
          {/* Animated line reveal */}
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-500 to-pink-500 shadow-[0_0_20px_rgba(145,94,255,0.5)] z-10"
          />

          {experiences.map((exp, idx) => (
            <TimelineCard key={idx} experience={exp} index={idx} parentInView={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ experience, index }) {
  return (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ margin: "-100px" }}
        className="relative"
    >
        {/* Dot on time line */}
        <div className={cn(
            "absolute left-[-56px] top-4 w-5 h-5 rounded-full z-20 flex items-center justify-center p-1 bg-[#050816]",
        )}>
            <div className={cn("w-full h-full rounded-full bg-gradient-to-br", experience.color)} />
            <div className={cn("absolute inset-0 rounded-full animate-ping opacity-30", experience.color)} />
        </div>

        <div className="glass p-10 md:p-14 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-700">
            {/* Soft background icon */}
            <div className="absolute top-[-20%] right-[-10%] text-[150px] opacity-[0.03] grayscale transition-all group-hover:scale-125 group-hover:opacity-[0.07]">{experience.icon}</div>
            
            <div className="mb-8">
                <span className={cn(
                    "px-6 py-2 rounded-full font-black tracking-widest text-[#050816] bg-gradient-to-br text-sm uppercase",
                    experience.color
                )}>
                    {experience.date}
                </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-4">
                {experience.title}
            </h3>
            
            <div className="text-white/40 flex items-center gap-2 mb-8 font-bold uppercase tracking-wider text-sm">
                <span className="w-6 h-0.5 bg-indigo-text" /> {experience.company}
            </div>

            <p className="text-lg md:text-xl text-[#aaa6c3] leading-relaxed mb-12 max-w-xl">{experience.description}</p>
            
            <div className="flex flex-wrap gap-3">
                {experience.skills.map((skill, i) => (
                    <span key={i} className="text-xs font-bold text-white/40 uppercase bg-white/5 border border-white/5 px-4 py-2 rounded-full">{skill}</span>
                ))}
            </div>
        </div>
    </motion.div>
  );
}
