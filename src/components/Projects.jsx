"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const featuredProjects = [
  {
    title: "Connct App",
    description: "A modern messaging and social connection application with real-time chat functionality and clean neobrutalist UI design.",
    problem: "Needed a way to facilitate real-time connections without the complexity of traditional social media.",
    tags: ["React", "Node.js", "Real-time", "Messaging"],
    image: "/assets/connct_new.png",
    color: "#915eff",
    liveUrl: "https://connct-app.vercel.app/",
    githubUrl: "https://github.com/codewithsachin10",
  },
  {
    title: "HostelMart",
    description: "A full-stack e-commerce platform for hostel students to order snacks and essentials with real-time tracking.",
    problem: "Streamlining student essential orders in high-density student living environments.",
    tags: ["MERN Stack", "MongoDB", "Express", "React"],
    image: "/assets/hostelmart_new.png",
    color: "#ff4c9f",
    liveUrl: "https://snackmart.onrender.com/",
    githubUrl: "https://github.com/codewithsachin10",
  },
  {
    title: "3D Portfolio",
    description: "Interactive 3D portfolio featuring animated elements, smooth transitions, and modern design principles.",
    problem: "Creating a memorable personal brand that demonstrates high-end technical design skills.",
    tags: ["React", "Three.js", "Framer Motion", "3D"],
    image: "/assets/portfolio_new.png",
    color: "#00cea8",
    liveUrl: "https://sachin-portfolio-5tb9.vercel.app/",
    githubUrl: "https://github.com/codewithsachin10",
  },
];

const smallProjects = [
  { title: "Task Manager", tech: "Redux • API", desc: "A sleek productivity tool." },
  { title: "Weather Forecast", tech: "OpenWeather", desc: "Real-time global weather updates." },
  { title: "Crypto Tracker", tech: "CoinGecko", desc: "Live crypto price monitoring." },
  { title: "AI Image Generator", tech: "OpenAI", desc: "Text-to-image with DALL-E." },
  { title: "E-comm Dashboard", tech: "Chart.js", desc: "Product sales data visualization." },
];

export default function Projects() {
  const horizontalRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let scrollTween = gsap.to(horizontalScrollRef.current, {
      x: () => -(horizontalScrollRef.current.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${horizontalScrollRef.current.scrollWidth}`,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="projects" className="bg-[#050816]">
      {/* Featured Projects - Vertical Pinned Interaction */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-48">
        <div className="mb-24 text-center">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-indigo-text font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
                Portfolio
            </motion.p>
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter"
            >
                Selected <span className="text-white/40 italic">Works.</span>
            </motion.h2>
        </div>

        <div className="space-y-[30vh]">
          {featuredProjects.map((project, idx) => (
            <FeaturedProject key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Horizontal Strip Showcase */}
      <div 
        ref={horizontalRef} 
        className="h-screen w-full flex items-center overflow-hidden bg-[#0a0f1f]/30 mt-48 py-24"
      >
        <div 
          ref={horizontalScrollRef} 
          className="flex flex-nowrap items-center gap-12 px-[10vw]"
        >
          <div className="min-w-[400px] flex flex-col justify-center gap-6 pr-24">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Other <br />Explorations<span className="text-indigo-text">.</span></h3>
            <p className="text-[#aaa6c3] text-xl leading-relaxed">A collection of experiments, UI concepts, and quick builds that highlight my versatility.</p>
          </div>

          {smallProjects.map((work, idx) => (
            <div 
              key={idx} 
              className="min-w-[350px] aspect-[4/5] glass rounded-3xl p-10 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white/50">{idx + 1}</div>
              <div>
                <span className="text-indigo-text text-xs tracking-widest font-black uppercase mb-4 block">{work.tech}</span>
                <h4 className="text-2xl font-black mb-4 group-hover:text-indigo-text transition-colors">{work.title}</h4>
                <p className="text-white/40 leading-relaxed">{work.desc}</p>
                <div className="w-0 group-hover:w-full h-0.5 bg-indigo-text mt-8 transition-all duration-700" />
              </div>
            </div>
          ))}

          {/* Ending Card */}
          <div className="min-w-[500px] h-full flex flex-col items-center justify-center gap-8 pl-24">
            <h3 className="text-5xl font-black text-center">Ready to see more <br />in detail?</h3>
            <button className="bg-white text-black px-10 py-4 rounded-full font-black flex items-center gap-4 hover:scale-110 transition-all">
                Let's Talk <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, index }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={container}
      className={cn(
        "relative flex flex-col md:flex-row items-center gap-12 py-24",
        index % 2 !== 0 && "md:flex-row-reverse"
      )}
      style={{ scale, opacity }}
    >
      {/* Left side: content */}
      <div className="flex-1 space-y-8">
        <motion.div style={{ y }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-indigo-text" />
            <span className="font-bold tracking-widest text-[#aaa6c3] uppercase text-xs">Featured Project {index + 1}</span>
          </div>
          <h3 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
            {project.title.split(' ')[0]} <br />
            <span className="text-indigo-text">{project.title.split(' ').slice(1).join(' ')}</span>
          </h3>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            {project.description}
          </p>

          <div className="glass-indigo p-8 rounded-3xl mb-12 border-l-4 border-l-indigo-500">
            <h4 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                Problem Solved <ArrowRight size={14} className="text-indigo-text" />
            </h4>
            <p className="text-white font-medium italic">"{project.problem}"</p>
          </div>

          <div className="flex gap-4 flex-wrap mb-12">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-black uppercase text-white/50 border border-white/5 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">#{tag}</span>
            ))}
          </div>

          <div className="flex gap-6">
            <motion.a 
                href={project.liveUrl} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black px-10 py-4 rounded-full font-black text-sm flex items-center gap-3 transition-transform"
            >
                View Live <ExternalLink size={16} />
            </motion.a>
            <motion.a 
                href={project.githubUrl} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/5 border border-white/10 px-10 py-4 rounded-full font-black text-sm flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
                GitHub <Github size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Right side: Mockup Card */}
      <div className="flex-1.2 perspective-1000 w-full md:w-auto h-[400px] md:h-[600px] relative">
        <motion.div 
            style={{ 
                rotateY: index % 2 === 0 ? -15 : 15,
                rotateX: 10
            }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative z-20"
        >
            <div className="w-full h-full rounded-3xl overflow-hidden glass border-white/10 relative shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_50px_rgba(145,94,255,0.1)] group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Decorative background glow */}
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] -z-10 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}
