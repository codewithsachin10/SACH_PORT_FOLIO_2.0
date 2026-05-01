"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CHARACTERS = "01!@#$%^&*()_+{}[]|:;/?>.<,-=";

export default function GlitchText({ text, as: Component = "h2", className, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
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
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Controls speed of decryption
      }, 30);
    } else {
       // Setup initial noisy text or empty string
       setDisplayText(text.replace(/./g, () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]));
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
