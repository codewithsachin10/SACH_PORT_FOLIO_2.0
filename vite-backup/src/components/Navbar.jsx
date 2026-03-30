import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                background: scrolled
                    ? 'rgba(5, 8, 22, 0.95)'
                    : 'rgba(5, 8, 22, 0.8)',
                boxShadow: scrolled
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : 'none'
            }}
        >
            <div className={styles.container}>
                <motion.div
                    className={styles.logo}
                    whileHover={{ scale: 1.05 }}
                >
                    <a href="/">
                        <span className="gradient-text" style={{ fontWeight: 800 }}>Sachin</span>
                        <span style={{ color: '#aaa6c3', marginLeft: '8px' }}>| Portfolio</span>
                    </a>
                </motion.div>
                <ul className={`${styles.navLinks} ${isOpen ? styles.show : ''}`}>
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                style={{ position: 'relative' }}
                            >
                                {item.name}
                            </a>
                        </motion.li>
                    ))}
                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'linear-gradient(90deg, #915eff, #ff4c9f)',
                                padding: '10px 24px',
                                borderRadius: '30px',
                                color: 'white',
                                fontWeight: 600,
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                boxShadow: '0 4px 15px rgba(145, 94, 255, 0.4)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            Hire Me!
                        </motion.a>
                    </motion.li>
                </ul>
                <motion.div
                    className={styles.menuIcon}
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X color="white" /> : <Menu color="white" />}
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
