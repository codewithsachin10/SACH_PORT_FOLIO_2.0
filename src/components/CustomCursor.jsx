"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only initialized on client
    if (typeof window === "undefined") return;

    // Disabled on mobile/touch interfaces to avoid sticking
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // We use 16 segments to create a dense, continuous "tube" effect
  const segments = 16;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block mix-blend-screen">
      {Array.from({ length: segments }).map((_, index) => (
        <TubeSegment 
          key={index} 
          index={index} 
          target={mousePosition} 
        />
      ))}
    </div>
  );
}

function TubeSegment({ index, target }) {
  // Head is extremely fast, tail is slower and heavier.
  // This creates the stretching string/tube effect.
  const x = useSpring(0, {
    stiffness: 1200 - index * 60,
    damping: 40 + index * 2,
    mass: 0.1 + index * 0.15,
  });
  
  const y = useSpring(0, {
    stiffness: 1200 - index * 60,
    damping: 40 + index * 2,
    mass: 0.1 + index * 0.15,
  });

  useEffect(() => {
    x.set(target.x);
    y.set(target.y);
  }, [target.x, target.y]);

  // The tube tapers off toward the tail
  // Starts at 24px width, ends around 8px
  const size = 30 - index * 1.5;
  const opacity = 1 - (index * 0.05); // slightly transparent at tail

  return (
    <motion.div
      style={{
        x,
        y,
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        opacity,
      }}
      className="absolute top-0 left-0 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] blur-[1px]"
    />
  );
}

