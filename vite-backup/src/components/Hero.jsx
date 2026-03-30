import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './Hero.module.css';
import { useScroll, useTransform } from 'framer-motion';
import ComputerCanvas from './canvas/Computer'; // Restored 3D computer
// import arrow from '../assets/arrow-down.svg'; // Removed: Used styles.scrollDown instead
import profileImg from '../assets/hero_profile.jpg';
import './BlobProfile.css'; // Import the new CSS
import MagneticButton from './MagneticButton';

const roles = ["Student Developer", "Web Developer", "3D Enthusiast", "MERN Stack Dev", "Creative Coder"];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(currentRole.substring(0, text.length + 1));
                if (text === currentRole) {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                setText(currentRole.substring(0, text.length - 1));
                if (text === '') {
                    setIsDeleting(false);
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <section className={styles.heroSection}>
            {/* Animated gradient orbs */}
            <motion.div
                className={styles.floatingShape1}
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={styles.floatingShape2}
                animate={{
                    y: [0, 25, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.15, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={styles.floatingShape3}
                animate={{
                    rotate: [45, 55, 45],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Additional floating elements */}
            <motion.div
                className={styles.floatingRing}
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* 3D Computer (Restored) - Hidden on mobile to prevent blocking text */}
            <div className="hide-mobile">
                <ComputerCanvas />
            </div>

            <div className={styles.paddingContainer}>
                <div className={styles.lineIndicator}>
                    <motion.div
                        className={styles.dot}
                        animate={{
                            scale: [1, 1.3, 1],
                            boxShadow: [
                                '0 0 20px rgba(145, 94, 255, 0.5)',
                                '0 0 40px rgba(145, 94, 255, 0.8)',
                                '0 0 20px rgba(145, 94, 255, 0.5)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className={styles.line}
                        initial={{ height: 0 }}
                        animate={{ height: 200 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                </div>

                <div className={styles.heroTextContainer}>
                    {/* Blob Profile Image (Moved Above Text) */}
                    <div className="flex justify-start items-center mb-5 xl:hidden">
                        <div className="profile-blob-container" style={{ margin: 0 }}>
                            <div className="blob-background"></div>
                            <div className="blob-image-wrapper">
                                <img src={profileImg} alt="Sachin Profile" className="profile-img" />
                            </div>
                        </div>
                    </div>

                    {/* Greeting badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.greetingBadge}
                    >
                        <span className={styles.wavingHand}>👋</span> Welcome to my portfolio
                    </motion.div>

                    <motion.h1
                        className="hero-head-text"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Hi, I'm <span className="gradient-text">Sachin</span>
                    </motion.h1>

                    <motion.p
                        className="hero-sub-text"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        I'm a <span className={styles.typingText}>{text}</span>
                        <span className={styles.cursor}>|</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        style={{
                            marginTop: '20px',
                            color: '#aaa6c3',
                            maxWidth: '500px',
                            lineHeight: '1.7',
                            fontSize: '17px'
                        }}
                    >
                        I craft stunning 3D web experiences and intuitive user interfaces
                        that captivate users and drive results. Let's build something amazing together.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className={styles.stats}
                    >
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>2+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>3+</span>
                            <span className={styles.statLabel}>Projects Done</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>0+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons with Magnetic Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        style={{ marginTop: '35px', display: 'flex', gap: '20px', flexWrap: 'wrap', position: 'relative', zIndex: 50 }}
                    >
                        <MagneticButton href="#work" variant="primary">
                            <span>View My Work</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </MagneticButton>
                        <MagneticButton href="#contact" variant="outline">
                            Get In Touch
                        </MagneticButton>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className={styles.socialLinks}
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        {[
                            { icon: <Github size={20} />, label: 'GitHub', url: 'https://github.com/codewithsachin10' },
                            { icon: <Linkedin size={20} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/sachin-gopalakrishnan-373966365' },
                            { icon: <Mail size={20} />, label: 'Email', url: 'mailto:sachingopalakrishnan10@gmail.com' }
                        ].map((social, i) => (
                            <motion.a
                                key={social.label}
                                href={social.url}
                                target={social.label !== 'Email' ? '_blank' : undefined}
                                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                                whileHover={{ scale: 1.2, y: -5 }}
                                className={styles.socialLink}
                                title={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className={styles.scrollDown}>
                <motion.a
                    href="#about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <div className={styles.scroller}>
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                            className={styles.scrollDot}
                        />
                    </div>
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={styles.scrollText}
                    >
                        Scroll Down
                    </motion.span>
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
