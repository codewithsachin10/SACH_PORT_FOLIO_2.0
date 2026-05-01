"use client";

import { motion } from "framer-motion";
import { Copy, Layers, Database, Code2 } from "lucide-react";

const services = [
  {
    title: "Frontend Architecture",
    description: "Designing scalable, component-driven UI systems using React, Next.js, and modern CSS frameworks like Tailwind.",
    icon: <Layers size={32} className="text-white" />,
    color: "from-indigo-600 to-indigo-400"
  },
  {
    title: "Backend Systems",
    description: "Building robust, secure APIs and database schemas with Node.js, Express, MongoDB, and Supabase.",
    icon: <Database size={32} className="text-white" />,
    color: "from-pink-600 to-pink-400"
  },
  {
    title: "UI/UX Engineering",
    description: "Translating Figma designs into pixel-perfect, highly animated, accessible web experiences.",
    icon: <Copy size={32} className="text-white" />,
    color: "from-cyan-600 to-cyan-400"
  },
  {
    title: "Clean Code",
    description: "Writing extremely maintainable, typed, and well-documented code that scales with your business.",
    icon: <Code2 size={32} className="text-white" />,
    color: "from-purple-600 to-purple-400"
  }
];

export default function Services() {
  return (
    <section className="py-24 md:py-36 bg-[#0a0f1f]/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-indigo-500 font-black tracking-[0.3em] uppercase text-sm mb-4 text-center md:text-left"
          >
              Capabilities
          </motion.p>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
                What I <span className="text-white/40 italic">Do.</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#aaa6c3] text-lg max-w-sm leading-relaxed"
            >
                End-to-end development focused on high-performance, beautiful user experiences.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 md:p-14 rounded-[40px] group hover:bg-white/[0.04] transition-colors relative overflow-hidden"
            >
              <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-2xl`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6">{svc.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md">
                    {svc.description}
                  </p>
              </div>
              
              {/* Decorative hover glow */}
              <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${svc.color} blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
