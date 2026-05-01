"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const techSkills = [
  "React", "Next.js", "Node.js", "TypeScript", "Tailwind", "MongoDB",
  "PostgreSQL", "Framer Motion", "Supabase", "Git", "Figma", "Firebase"
];

export default function TechGravityBox() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const elementsRef = useRef([]);
  const bodiesRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Setup Matter.js Engine
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        background: "transparent",
        wireframes: false,
      }
    });

    engineRef.current = engine;
    
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true });
    const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
    const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -100, width * 2, 100, { isStatic: true });

    Matter.Composite.add(engine.world, [ground, wallLeft, wallRight, ceiling]);

    // Create tech pill bodies
    const pillBodies = techSkills.map((tech, i) => {
      // Calculate random initial positions
      const x = Math.random() * (width - 100) + 50;
      const y = -Math.random() * 500 - 100;
      
      // Approximation of pill width based on text length
      const pillWidth = tech.length * 12 + 40; 
      
      const body = Matter.Bodies.rectangle(x, y, pillWidth, 40, {
        restitution: 0.8, // Bounciness
        friction: 0.1,
        density: 0.005,
        chamfer: { radius: 20 }, // Rounded corners
        render: { visible: false } // Hidden because we use DOM elements instead
      });

      return body;
    });

    bodiesRef.current = pillBodies;
    Matter.Composite.add(engine.world, pillBodies);

    // Add mouse interaction
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Start engine
    Matter.Runner.run(Matter.Runner.create(), engine);
    
    // Sync DOM elements to Matter.js bodies
    let animationFrame;
    const syncDOM = () => {
      pillBodies.forEach((body, i) => {
        const el = elementsRef.current[i];
        if (el && body) {
          // Adjust translation so the DOM element's center aligns with the body's center
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrame = requestAnimationFrame(syncDOM);
    };
    
    syncDOM();

    // Handle Resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(wallRight, { x: newWidth + 50, y: newHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] rounded-[40px] overflow-hidden glass border border-white/10 shadow-2xl mt-12 bg-[#050816]/50 cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
         <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
         <span className="text-white/30 text-xs font-mono font-bold uppercase tracking-widest ml-2">Physics Sandbox</span>
      </div>
      
      {/* Matter.js Render Context */}
      <div ref={sceneRef} className="absolute inset-0 z-10" />

      {/* DOM Elements synced to Physics Bodies */}
      {techSkills.map((tech, i) => (
        <div
          key={i}
          ref={(el) => (elementsRef.current[i] = el)}
          className="absolute top-0 left-0 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 text-indigo-100 font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-xl pointer-events-none select-none"
          style={{ willChange: "transform" }}
        >
          {tech}
        </div>
      ))}
      
      {!isHovering && (
         <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
            <span className="text-white text-xl font-medium tracking-widest text-center px-4">
                Grab and throw the tech stack
            </span>
         </div>
      )}
    </div>
  );
}
