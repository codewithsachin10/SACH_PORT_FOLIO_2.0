"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import GithubActivity from "@/components/GithubActivity";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Philosophy from "@/components/Philosophy";
import SummitCounter from "@/components/SummitCounter";
import Contact, { Footer } from "@/components/Contact";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative noise-overlay">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-pink-500 origin-left z-[110]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        
        <TechMarquee />
        
        <div id="about" />
        <About />

        <Services />
        
        <div id="projects" />
        <Projects />

        <GithubActivity />
        
        <div id="skills" />
        <Skills />
        
        <div id="experience" />
        <Timeline />
        
        <Philosophy />

        {/* Global Mechanical Visitor Counter */}
        <SummitCounter />
        
        <div id="contact" />
        <Contact />
        
        <Footer />
      </div>
      
      {/* Visual noise background particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
