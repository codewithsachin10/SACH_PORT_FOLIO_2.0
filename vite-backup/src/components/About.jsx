import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TechGlobe from './canvas/TechGlobe';

const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'Three.js', level: 75, color: '#000000' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'CSS/SCSS', level: 88, color: '#1572B6' },
    { name: 'TypeScript', level: 70, color: '#3178C6' },
];

const services = [
    {
        title: 'Web Developer',
        icon: '🌐',
        description: 'Building responsive and performant web applications with modern frameworks.'
    },
    {
        title: 'UI/UX Designer',
        icon: '🎨',
        description: 'Creating intuitive and beautiful user interfaces with attention to detail.'
    },
    {
        title: 'Backend Developer',
        icon: '⚙️',
        description: 'Developing robust APIs and server-side solutions for scalable applications.'
    },
    {
        title: '3D Developer',
        icon: '🎮',
        description: 'Crafting immersive 3D experiences and interactive visualizations.'
    }
];

const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: '40px 30px',
                flex: '1 1 220px',
                textAlign: 'center',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: isHovered
                    ? 'linear-gradient(135deg, rgba(145, 94, 255, 0.15), rgba(255, 76, 159, 0.1))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
                transform: isHovered ? 'translateY(-10px) rotateX(5deg)' : 'translateY(0)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                boxShadow: isHovered
                    ? '0 25px 50px rgba(145, 94, 255, 0.2)'
                    : '0 10px 30px rgba(0, 0, 0, 0.2)',
                perspective: '1000px'
            }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: '50px', marginBottom: '20px' }}
            >
                {service.icon}
            </motion.div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                {service.title}
            </h3>
            <p style={{
                color: '#aaa6c3',
                fontSize: '14px',
                lineHeight: '1.6',
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s'
            }}>
                {service.description}
            </p>
        </motion.div>
    );
};

const SkillBar = ({ skill, index }) => {
    const [isInView, setIsInView] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ marginBottom: '25px' }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
            }}>
                <span style={{ fontWeight: '500' }}>{skill.name}</span>
                <span style={{ color: '#aaa6c3' }}>{skill.level}%</span>
            </div>
            <div style={{
                height: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${skill.color}, #915eff)`,
                        borderRadius: '10px',
                        boxShadow: `0 0 20px ${skill.color}50`
                    }}
                />
            </div>
        </motion.div>
    );
};

const About = () => {
    return (
        <div id="about" style={{
            padding: '100px 20px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
        }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p className="hero-sub-text" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Introduction
                </p>
                <h2 className="hero-head-text" style={{ fontSize: '50px', marginTop: '10px' }}>
                    Overview.
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                style={{
                    marginTop: '20px',
                    fontSize: '18px',
                    lineHeight: '30px',
                    maxWidth: '800px',
                    color: '#aaa6c3'
                }}
            >
                I'm a skilled software developer with experience in TypeScript and
                JavaScript, and expertise in frameworks like React, Node.js, and
                Three.js. I'm a quick learner and collaborate closely with clients to
                create efficient, scalable, and user-friendly solutions that solve
                real-world problems. Let's work together to bring your ideas to life!
            </motion.p>

            {/* Service Cards */}
            <div style={{
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap',
                marginTop: '50px'
            }}>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </div>

            {/* Skills Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ marginTop: '80px' }}
            >
                <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '40px' }}>
                    <span className="gradient-text">Skills</span> & Expertise
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px 50px'
                }}>
                    {skills.map((skill, index) => (
                        <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </motion.div>

            {/* Tech Globe Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ marginTop: '80px', textAlign: 'center' }}
            >
                <h3 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '20px' }}>
                    <span className="gradient-text">Technologies</span> I Work With
                </h3>
                <p style={{ color: '#aaa6c3', marginBottom: '30px' }}>
                    Hover and explore my tech stack in 3D
                </p>
                <TechGlobe />
            </motion.div>
        </div>
    );
};

export default About;
