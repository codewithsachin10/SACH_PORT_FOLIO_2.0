import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import connctImg from '../assets/connct_new.png';
import hostelmartImg from '../assets/hostelmart_new.png';
import portfolioImg from '../assets/portfolio_new.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Connct App",
        description: "A modern messaging and social connection application with real-time chat functionality, clean neobrutalist UI design, and seamless user experience.",
        tags: ["React", "Node.js", "Real-time", "Messaging"],
        image: connctImg,
        color: "#915eff",
        liveUrl: "https://connct-app.vercel.app/",
        githubUrl: "https://github.com/codewithsachin10"
    },
    {
        title: "HostelMart / SnackMart",
        description: "A full-stack e-commerce platform for hostel students to order snacks and essentials. Features include product browsing, cart management, and order tracking.",
        tags: ["MERN Stack", "MongoDB", "Express", "React"],
        image: hostelmartImg,
        color: "#ff4c9f",
        liveUrl: "https://snackmart.onrender.com/",
        githubUrl: "https://github.com/codewithsachin10"
    },
    {
        title: "3D Portfolio Website",
        description: "This interactive 3D portfolio you're viewing right now! Built with React Three Fiber, featuring animated 3D elements, smooth transitions, and modern design.",
        tags: ["React", "Three.js", "Framer Motion", "3D"],
        image: portfolioImg,
        color: "#00cea8",
        liveUrl: "https://sachin-portfolio-5tb9.vercel.app/",
        githubUrl: "https://github.com/codewithsachin10"
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <div 
            className="project-card-container"
            style={{
                minWidth: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 5vw',
                perspective: '1000px'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    height: '70vh',
                    background: 'rgba(17, 13, 37, 0.6)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row', // Side by side on desktop
                    boxShadow: `0 40px 100px rgba(0, 0, 0, 0.5), 0 0 50px ${project.color}15`,
                    '@media (maxWidth: 900px)': {
                        flexDirection: 'column',
                        height: 'auto',
                        padding: '20px'
                    }
                }}
            >
                {/* Image Section */}
                <div style={{
                    flex: 1.2,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(90deg, transparent 50%, rgba(17, 13, 37, 0.8))`
                    }} />
                </div>

                {/* Content Section */}
                <div style={{
                    flex: 1,
                    padding: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <span style={{ 
                                background: `${project.color}20`, 
                                color: project.color, 
                                padding: '4px 12px', 
                                borderRadius: '20px', 
                                fontSize: '12px', 
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Project {index + 1}
                            </span>
                        </div>
                        <h3 style={{
                            fontSize: '48px',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '20px',
                            lineHeight: 1.1
                        }}>
                            {project.title}
                        </h3>
                        <p style={{
                            color: '#aaa6c3',
                            fontSize: '18px',
                            lineHeight: 1.6,
                            marginBottom: '30px'
                        }}>
                            {project.description}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{ color: project.color, fontSize: '14px', fontWeight: 500 }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '12px 24px',
                                    background: project.color,
                                    color: 'white',
                                    borderRadius: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    fontWeight: 600
                                }}
                            >
                                <ExternalLink size={18} /> Live Demo
                            </motion.a>
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '12px 24px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    borderRadius: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <Github size={18} /> GitHub
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const Work = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
                translateX: `-${100 * (projects.length)}vw`,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top",
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1,
                },
            }
        );
        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section ref={triggerRef} style={{ overflow: 'hidden' }}>
            <div id="work" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ textAlign: 'center' }}
                >
                    <p className="hero-sub-text" style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px' }}>
                        Selected Works
                    </p>
                    <h2 className="hero-head-text" style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginTop: '10px' }}>
                        Portfolio Showcase<span className="gradient-text">.</span>
                    </h2>
                    <p style={{ color: '#aaa6c3', marginTop: '20px', fontSize: '18px' }}>
                        Scroll down to explore my projects
                    </p>
                    
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ marginTop: '40px', color: 'var(--primary-color)' }}
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>

            <div ref={sectionRef} style={{ height: '100vh', display: 'flex', flexDirection: 'row', width: `${100 * (projects.length + 1)}vw` }}>
                {/* Spacer for the intro section */}
                <div style={{ minWidth: '100vw', height: '100vh' }} /> 
                
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>
            
            <style>{`
                @media (max-width: 900px) {
                    .project-card-container > div {
                        flex-direction: column !important;
                        height: auto !important;
                        padding: 20px !important;
                    }
                    .project-card-container > div > div:first-child {
                        height: 250px !important;
                        flex: none !important;
                    }
                    .project-card-container > div > div:last-child {
                        padding: 30px !important;
                    }
                    .project-card-container h3 {
                        font-size: 32px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Work;

