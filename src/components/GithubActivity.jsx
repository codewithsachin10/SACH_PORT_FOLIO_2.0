"use client";

import { motion } from "framer-motion";

export default function GithubActivity() {
  // Deterministic pseudo-random function so server and client render the exact same grid
  const pseudoRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Generate fake contribution grids for visual wow factor
  const generateGrid = () => {
    const cols = 52; // Weeks
    const rows = 7; // Days
    const grid = [];
    
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const seed = c * rows + r;
        // Pseudo-random activity level, heavily weighted to recent (right side)
        const progress = c / cols;
        const randomFactor = pseudoRandom(seed);
        
        let colorClass = "bg-white/5"; // No activity
        
        if (randomFactor > 0.9 - (progress * 0.3)) {
            colorClass = "bg-indigo-400"; // High
        } else if (randomFactor > 0.7 - (progress * 0.2)) {
            colorClass = "bg-indigo-600"; // Medium
        } else if (randomFactor > 0.4) {
            colorClass = "bg-indigo-800/80"; // Low
        }
        
        grid.push({ col: c, row: r, colorClass, delay: (c + r) * 0.005 });
      }
    }
    return grid;
  };

  const grid = generateGrid();

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-[#050816]">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-indigo-500 font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
                Consistency
            </motion.p>
            <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black"
            >
                Code <span className="text-white/40 italic">Activity.</span>
            </motion.h3>
        </div>
        <div className="text-white/50 text-xl max-w-sm leading-relaxed">
            Shipping code daily. A visualization of my recent development frequency.
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-12 rounded-[40px] overflow-hidden relative border border-white/5"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-6">
          <div>
            <span className="text-5xl md:text-6xl font-black text-white block mb-2">1,245<span className="text-indigo-500 text-3xl">+</span></span>
            <span className="text-white/40 text-sm uppercase font-bold tracking-widest">Contributions in the last year</span>
          </div>
          <div className="flex gap-3 items-center text-xs text-white/40 font-bold uppercase">
            <span>Less</span>
            <div className="w-3.5 h-3.5 rounded-sm bg-white/5" />
            <div className="w-3.5 h-3.5 rounded-sm bg-indigo-800" />
            <div className="w-3.5 h-3.5 rounded-sm bg-indigo-600" />
            <div className="w-3.5 h-3.5 rounded-sm bg-indigo-400" />
            <span>More</span>
          </div>
        </div>

        {/* The Grid Component */}
        <div className="overflow-x-auto pb-4 hide-scrollbar w-full">
          <div 
            className="w-full flex flex-col flex-wrap gap-2 h-[120px] md:h-[140px]"
            style={{ width: "min-content" }}
          >
            {grid.map((cell, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: cell.delay, duration: 0.3 }}
                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm ${cell.colorClass} hover:scale-150 relative z-10 hover:z-20 transition-all duration-300 hover:ring-2 hover:ring-white/50`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
