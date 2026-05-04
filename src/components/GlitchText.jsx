"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CHARACTERS = "01-/";

export default function GlitchText({ text, as: Component = "h2", className }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    let interval;
    if (isInView || isHovering) {
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (text[index] === " ") return " ";
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1; // Snappy resolution
      }, 25);
    } else {
       setDisplayText(text);
    }
    
    return () => clearInterval(interval);
  }, [text, isInView, isHovering]);

  return (
    <Component 
        ref={ref}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={className}
    >
      {displayText}
    </Component>
  );
}
