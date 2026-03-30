import React, { useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        title: "Student Developer",
        company: "Self-Learning & Building",
        date: "2023 - Present",
        description: "Actively learning and building web applications using modern technologies. Focused on creating interactive user experiences with React and Three.js. Continuously improving skills through personal projects and online courses.",
        skills: ["React", "JavaScript", "Three.js", "Node.js", "MongoDB"],
        icon: "🎓",
        color: "#915eff"
    },
    {
        title: "Frontend Development",
        company: "Personal Projects",
        date: "2024",
        description: "Built multiple responsive web applications including this interactive 3D portfolio. Learned to create engaging user interfaces with smooth animations using Framer Motion and CSS.",
        skills: ["React", "CSS", "Framer Motion", "HTML", "Git"],
        icon: "💻",
        color: "#ff4c9f"
    },
    {
        title: "Full Stack Exploration",
        company: "Learning Journey",
        date: "2024",
        description: "Explored backend development with Node.js and Express. Created REST APIs and learned database management with MongoDB. Built complete MERN stack applications.",
        skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
        icon: "🚀",
        color: "#00cea8"
    },
    {
        title: "3D Web Development",
        company: "Creative Projects",
        date: "2024 - Present",
        description: "Diving into 3D web experiences using Three.js and React Three Fiber. Creating immersive, interactive visualizations and learning WebGL fundamentals to build unique web applications.",
        skills: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
        icon: "🎮",
        color: "#bf61ff"
    }
];

const TimelineCard = ({ experience, index, isLeft }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`timeline-card-wrapper ${isLeft ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="timeline-content-card"
                animate={{
                    scale: isHovered ? 1.03 : 1,
                    y: isHovered ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{
                    background: isHovered
                        ? `linear-gradient(135deg, ${experience.color}15, ${experience.color}08)`
                        : 'linear-gradient(135deg, rgba(16, 13, 37, 0.9), rgba(26, 21, 53, 0.9))',
                    border: `2px solid ${isHovered ? experience.color : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: isHovered
                        ? `0 25px 50px ${experience.color}25, 0 0 0 1px ${experience.color}30`
                        : '0 10px 40px rgba(0, 0, 0, 0.4)',
                }}
            >
                {/* Icon Circle */}
                <motion.div
                    className="timeline-icon"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 10 : 0
                    }}
                    style={{
                        background: `linear-gradient(135deg, ${experience.color}, ${experience.color}aa)`,
                        boxShadow: `0 0 30px ${experience.color}60, inset 0 0 20px rgba(255,255,255,0.1)`,
                    }}
                >
                    {experience.icon}
                </motion.div>

                {/* Date badge */}
                <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        background: `${experience.color}20`,
                        color: experience.color,
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        marginBottom: '15px',
                        border: `1px solid ${experience.color}40`
                    }}
                >
                    {experience.date}
                </motion.span>

                <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    background: isHovered ? `linear-gradient(90deg, white, ${experience.color})` : 'none',
                    WebkitBackgroundClip: isHovered ? 'text' : 'none',
                    WebkitTextFillColor: isHovered ? 'transparent' : 'white',
                    transition: 'all 0.3s'
                }}>
                    {experience.title}
                </h3>

                <p style={{
                    color: experience.color,
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ fontSize: '18px' }}>📍</span> {experience.company}
                </p>

                <p style={{
                    color: '#b8b4d0',
                    fontSize: '15px',
                    lineHeight: '1.8',
                    marginBottom: '20px'
                }}>
                    {experience.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {experience.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            style={{
                                padding: '5px 12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '15px',
                                fontSize: '12px',
                                color: '#aaa6c3',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <div id="experience" style={{
            padding: '100px 20px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
        }}>
            <style>{`
        /* Desktop Styles */
        #experience .timeline-line {
            left: 50%;
        }
        #experience .timeline-orb {
            left: 50%;
        }
        
        .timeline-card-wrapper {
            display: flex;
            width: 50%;
            margin-bottom: 40px;
        }
        
        .timeline-card-wrapper.left {
            justify-content: flex-end;
            padding-right: 60px;
            padding-left: 0;
            margin-left: 0;
        }
        
        .timeline-card-wrapper.right {
            justify-content: flex-start;
            padding-left: 60px;
            padding-right: 0;
            margin-left: 50%;
        }
        
        .timeline-content-card {
            background: linear-gradient(135deg, rgba(16, 13, 37, 0.9), rgba(26, 21, 53, 0.9));
            padding: 35px;
            border-radius: 24px;
            border: 2px solid rgba(255, 255, 255, 0.08); /* Default border */
            max-width: 480px;
            position: relative;
            backdrop-filter: blur(10px);
            width: 100%;
        }
        
        .timeline-icon {
            position: absolute;
            top: 35px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            border: 4px solid #050816;
            z-index: 10;
        }

        .timeline-card-wrapper.left .timeline-icon {
            right: -90px;
        }

        .timeline-card-wrapper.right .timeline-icon {
            left: -90px; /* Adjusted to align with padding */
        }

        /* Mobile Styles */
        @media (max-width: 900px) {
          /* Hide timeline elements */
          #experience .timeline-line,
          #experience .timeline-orb {
            display: none !important;
          }

          /* Stack cards vertically */
          .timeline-card-wrapper {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 0 !important;
            margin-bottom: 30px !important;
            justify-content: center !important;
          }

          .timeline-card-wrapper.left,
          .timeline-card-wrapper.right {
              padding: 0 !important;
              margin: 0 !important;
          }
          
          .timeline-content-card {
              max-width: 100% !important;
          }

          /* Move icon inside or to corner */
          .timeline-icon {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            right: auto !important;
            margin-bottom: 20px;
          }
        }
      `}</style>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '80px' }}
            >
                <motion.p
                    className="hero-sub-text"
                    style={{ textTransform: 'uppercase', letterSpacing: '3px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    My Learning Journey
                </motion.p>
                <motion.h2
                    className="hero-head-text"
                    style={{ fontSize: '50px', marginTop: '10px' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="gradient-text">Experience.</span>
                </motion.h2>
            </motion.div>

            {/* Timeline Container */}
            <div className="timeline-container" style={{ position: 'relative' }}>
                {/* Animated Center Line */}
                <motion.div
                    className="timeline-line"
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        background: 'linear-gradient(180deg, #915eff, #ff4c9f, #00cea8, #bf61ff, #915eff)',
                        borderRadius: '2px',
                        zIndex: 0,
                        boxShadow: '0 0 20px rgba(145, 94, 255, 0.3)'
                    }}
                />

                {/* Glowing orbs on the line */}
                {experiences.map((exp, index) => (
                    <motion.div
                        key={`orb-${index}`}
                        className="timeline-orb"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            top: `${(index / (experiences.length - 1)) * 100}%`,
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: exp.color,
                            boxShadow: `0 0 20px ${exp.color}`,
                            zIndex: 1,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}

                {/* Timeline Items */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    {experiences.map((experience, index) => (
                        <TimelineCard
                            key={index}
                            experience={experience}
                            index={index}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
