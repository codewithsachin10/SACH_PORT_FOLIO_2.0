"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSegment, setActiveSegment] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSegment(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-black tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          SG<span className="text-indigo-text">.</span>
        </motion.div>

        <div className={cn(
          "flex items-center gap-1 p-1 rounded-full transition-all duration-500",
          scrolled ? "bg-black/20 backdrop-blur-md border border-white/10" : "bg-transparent"
        )}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                activeSegment === link.name.toLowerCase() ? "text-white" : "text-white/50 hover:text-white"
              )}
            >
              {activeSegment === link.name.toLowerCase() && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-white/10 hover:shadow-white/20 transition-all hidden md:block"
        >
          Work with me
        </motion.a>
      </div>
    </motion.nav>
  );
}
