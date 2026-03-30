import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    "React", "Three.js", "Node.js", "MongoDB", "Express", "JavaScript",
    "TypeScript", "TailwindCSS", "Framer Motion", "Git", "Redux", "HTML5",
    "CSS3", "Next.js", "Python", "C++", "SQL", "REST API"
];

const SkillsMarquee = () => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            marginTop: '100px', // Pushing it down to avoid hiding hero elements
            overflow: 'hidden',
            padding: '40px 0',
            background: 'transparent', // Make transparent
            backdropFilter: 'blur(5px)', // Optional: glass effect
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            zIndex: 0
        }}>
            {/* Removed solid gradient overlays to allow see-through */}
            <div style={{ display: 'flex' }}>
                <motion.div
                    style={{
                        display: 'flex',
                        gap: '50px',
                        paddingRight: '50px',
                        whiteSpace: 'nowrap'
                    }}
                    animate={{
                        x: [0, -1035] // Approximate width of one set of items
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Repeat the list twice to create seamless loop */}
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div
                            key={`${skill}-${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontFamily: '"Space Grotesk", sans-serif',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    transition: 'color 0.3s'
                                }}
                                className="hover:text-white"
                                onMouseEnter={(e) => e.target.style.color = '#915eff'}
                                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
                            >
                                {skill}
                            </span>
                            <span style={{ color: '#915eff', opacity: 0.5 }}>•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SkillsMarquee;
