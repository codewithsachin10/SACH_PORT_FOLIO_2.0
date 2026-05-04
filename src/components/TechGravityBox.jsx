"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const techSkills = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Framer", slug: "framer" },
  { name: "Firebase", slug: "firebase" },
  { name: "Three.js", slug: "threedotjs" },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Python", slug: "python" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Redux", slug: "redux" },
  { name: "Figma", slug: "figma" },
  { name: "Git", slug: "git" }
];

export default function TechGravityBox() {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const elementsRef = useRef([]);
  const bodiesRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !sceneRef.current || !inView) return;
    
    let engine;
    let runner;
    let render;
    let animationFrame;

    const startPhysics = () => {
      const container = sceneRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;
      if (engineRef.current) return;

      engine = Matter.Engine.create({
        enableSleeping: true // Enable sleeping for performance
      });
      
      render = Matter.Render.create({
        element: container,
        engine: engine,
        options: {
          width,
          height,
          background: "transparent",
          wireframes: false,
        }
      });

      engineRef.current = engine;

      // Boundaries
      const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true });
      const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
      const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });
      const ceiling = Matter.Bodies.rectangle(width / 2, -100, width * 2, 100, { isStatic: true });

      Matter.Composite.add(engine.world, [ground, wallLeft, wallRight, ceiling]);

      // Pills
      const pillBodies = techSkills.map((tech, i) => {
        const x = Math.random() * (width - 200) + 100;
        const y = Math.random() * (height - 200) + 50;
        const pillWidth = tech.name.length * 10 + 60; 
        
        const body = Matter.Bodies.rectangle(x, y, pillWidth, 40, {
          restitution: 0.6,
          friction: 0.1,
          chamfer: { radius: 20 },
          render: { visible: false },
          sleepThreshold: 60 // Go to sleep faster
        });
        return body;
      });

      bodiesRef.current = pillBodies;
      Matter.Composite.add(engine.world, pillBodies);

      // Mouse
      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
      });

      Matter.Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      
      const syncDOM = () => {
        pillBodies.forEach((body, i) => {
          const el = elementsRef.current[i];
          if (el) {
            el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
          }
        });
        animationFrame = requestAnimationFrame(syncDOM);
      };
      
      syncDOM();
    };

    startPhysics();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (runner) Matter.Runner.stop(runner);
      if (engine) {
        Matter.Engine.clear(engine);
        engineRef.current = null;
      }
      if (render && render.canvas) render.canvas.remove();
    };
  }, [mounted, inView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-12 cursor-grab active:cursor-grabbing group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-[#0a0a1a]/40 pointer-events-none" />
      
      <div className="absolute top-6 left-6 z-20 flex gap-2 items-center">
         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]" />
         <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] syne">Interactive Skills Sandbox</span>
      </div>
      
      {/* Simulation Container */}
      <div ref={sceneRef} className="absolute inset-0 z-10" />

      {/* Interactive Pills */}
      {techSkills.map((tech, i) => (
        <div
          key={tech.slug}
          ref={(el) => (elementsRef.current[i] = el)}
          className="absolute top-0 left-0 flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-2xl pointer-events-none select-none"
          style={{ 
            willChange: "transform",
            transform: `translate(${50 + i * 20}px, -100px)` // Initial off-screen
          }}
        >
          <img 
            src={`https://cdn.simpleicons.org/${tech.slug}`} 
            alt={tech.name} 
            className="w-4 h-4 object-contain"
          />
          <span className="text-white/80 text-[11px] font-black uppercase tracking-wider syne whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      ))}
      
      {!isHovering && (
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="text-white/40 text-xs font-black uppercase tracking-[0.6em] text-center px-4 syne">
                Grab and throw to explore
            </span>
         </div>
      )}
    </div>
  );
}
