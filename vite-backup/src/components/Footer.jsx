import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <Github size={18} />, url: 'https://github.com/codewithsachin10', label: 'GitHub' },
        { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/sachin-gopalakrishnan-373966365', label: 'LinkedIn' },
        { icon: <Mail size={18} />, url: 'mailto:sachingopalakrishnan10@gmail.com', label: 'Email' }
    ];

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <footer style={{
            padding: '60px 20px 40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(180deg, transparent, rgba(5, 8, 22, 0.8))'
        }}>
            {/* Decorative top line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #915eff, transparent)',
                    borderRadius: '2px'
                }}
            />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    marginBottom: '50px'
                }}>
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 style={{
                            fontSize: '28px',
                            fontWeight: 800,
                            marginBottom: '15px',
                            background: 'linear-gradient(135deg, #915eff, #ff4c9f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Sachin
                        </h3>
                        <p style={{ color: '#aaa6c3', fontSize: '14px', lineHeight: '1.8' }}>
                            Student Developer passionate about creating beautiful web experiences.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 600,
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            Quick Links
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    whileHover={{ x: 5, color: '#915eff' }}
                                    style={{
                                        color: '#aaa6c3',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        transition: 'color 0.3s'
                                    }}
                                >
                                    → {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 600,
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            Connect
                        </h4>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#aaa6c3',
                                        transition: 'all 0.3s'
                                    }}
                                    title={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        style={{ color: '#666', fontSize: '13px' }}
                    >
                        © {currentYear} Sachin. All rights reserved.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        style={{
                            color: '#666',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        Made with <Heart size={14} color="#ff4c9f" fill="#ff4c9f" /> using React & Three.js
                    </motion.p>

                    {/* Scroll to top button */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #915eff, #ff4c9f)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 10px 30px rgba(145, 94, 255, 0.3)'
                        }}
                        title="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
