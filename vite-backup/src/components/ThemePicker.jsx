import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Check, Sun, Moon } from 'lucide-react';

const themes = [
    {
        name: 'Default (Purple)',
        colors: {
            primary: '#915eff',
            secondary: '#ff4c9f',
            gradient: 'linear-gradient(135deg, #915eff, #ff4c9f)'
        }
    },
    {
        name: 'Ocean (Blue)',
        colors: {
            primary: '#2962ff',
            secondary: '#00cea8',
            gradient: 'linear-gradient(135deg, #2962ff, #00cea8)'
        }
    },
    {
        name: 'Emerald (Green)',
        colors: {
            primary: '#00c853',
            secondary: '#64dd17',
            gradient: 'linear-gradient(135deg, #00c853, #64dd17)'
        }
    },
    {
        name: 'Sunset (Orange)',
        colors: {
            primary: '#ff6d00',
            secondary: '#ffab00',
            gradient: 'linear-gradient(135deg, #ff6d00, #ffab00)'
        }
    },
    {
        name: 'Crimson (Red)',
        colors: {
            primary: '#d50000',
            secondary: '#ff5252',
            gradient: 'linear-gradient(135deg, #d50000, #ff5252)'
        }
    }
];

const ThemePicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const applyTheme = (index) => {
        const theme = themes[index];
        setActiveTheme(index);

        const root = document.documentElement;
        root.style.setProperty('--primary', theme.colors.primary);
        root.style.setProperty('--primary-light', theme.colors.secondary);

        // Only update gradient if NOT in light mode (or update it specifically for light mode if needed)
        // Currently index.css defines overrides for light mode, but we can dynamically set it too
        root.style.setProperty('--violet-gradient', theme.colors.gradient);

        root.style.setProperty('--selection-bg', `${theme.colors.primary}66`);
        localStorage.setItem('portfolio-theme-index', index);
    };

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }

        localStorage.setItem('portfolio-dark-mode', newMode);
    };

    useEffect(() => {
        // Load saved theme
        const savedIndex = localStorage.getItem('portfolio-theme-index');
        if (savedIndex !== null) {
            applyTheme(parseInt(savedIndex));
        }

        // Load saved mode
        const savedMode = localStorage.getItem('portfolio-dark-mode');
        if (savedMode !== null) {
            const isDark = savedMode === 'true';
            setIsDarkMode(isDark);
            if (!isDark) {
                document.body.classList.add('light-mode');
            }
        }
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            zIndex: 9999
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{
                            position: 'absolute',
                            bottom: '70px',
                            right: '0',
                            background: 'rgba(21, 16, 48, 0.95)',
                            backdropFilter: 'blur(10px)',
                            padding: '20px',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            width: 'max-content',
                            minWidth: '200px'
                        }}
                    >
                        {/* Dark/Light Mode Switch */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            paddingBottom: '12px'
                        }}>
                            <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>Mode</span>
                            <div
                                onClick={toggleMode}
                                style={{
                                    width: '50px',
                                    height: '26px',
                                    background: isDarkMode ? '#151030' : '#e2e8f0',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(145, 94, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0 6px'
                                }}
                            >
                                <Moon size={12} color="#915eff" />
                                <Sun size={12} color="#FFB800" />

                                <motion.div
                                    layout
                                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                    style={{
                                        position: 'absolute',
                                        width: '20px',
                                        height: '20px',
                                        background: isDarkMode ? '#915eff' : 'white',
                                        borderRadius: '50%',
                                        left: isDarkMode ? '4px' : '24px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Theme Colors */}
                        <div>
                            <h4 style={{
                                fontSize: '14px',
                                color: 'white',
                                fontWeight: 600,
                                marginBottom: '10px'
                            }}>
                                Accent Color
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                {themes.map((theme, index) => (
                                    <motion.button
                                        key={theme.name}
                                        onClick={() => applyTheme(index)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        title={theme.name}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: theme.colors.gradient,
                                            border: activeTheme === index ? '2px solid white' : 'none',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {activeTheme === index && (
                                            <Check size={16} color="white" strokeWidth={3} />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}
            >
                <Settings size={24} />
            </motion.button>
        </div>
    );
};

export default ThemePicker;
