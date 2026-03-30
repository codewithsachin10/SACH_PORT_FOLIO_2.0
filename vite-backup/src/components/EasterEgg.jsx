import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EasterEgg = () => {
    const [isActivated, setIsActivated] = useState(false);
    const [konamiProgress, setKonamiProgress] = useState(0);

    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    const handleKeyDown = useCallback((e) => {
        const expectedKey = konamiCode[konamiProgress];

        if (e.code === expectedKey) {
            const newProgress = konamiProgress + 1;
            setKonamiProgress(newProgress);

            if (newProgress === konamiCode.length) {
                setIsActivated(true);
                setKonamiProgress(0);

                // Auto-close after 8 seconds
                setTimeout(() => setIsActivated(false), 8000);
            }
        } else {
            setKonamiProgress(0);
        }
    }, [konamiProgress]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Generate random particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: 10 + Math.random() * 20,
        emoji: ['🚀', '⭐', '💜', '✨', '🎮', '💻', '🔥', '🎉'][Math.floor(Math.random() * 8)]
    }));

    return (
        <AnimatePresence>
            {isActivated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        background: 'rgba(5, 8, 22, 0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => setIsActivated(false)}
                >
                    {/* Falling particles */}
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ y: -50, x: `${p.x}vw`, opacity: 0, rotate: 0 }}
                            animate={{
                                y: '110vh',
                                opacity: [0, 1, 1, 0],
                                rotate: 360
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            style={{
                                position: 'absolute',
                                fontSize: p.size,
                                pointerEvents: 'none'
                            }}
                        >
                            {p.emoji}
                        </motion.div>
                    ))}

                    {/* Main content */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{ textAlign: 'center', zIndex: 1 }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                            style={{ fontSize: '100px', marginBottom: '20px' }}
                        >
                            🎮
                        </motion.div>

                        <motion.h1
                            style={{
                                fontSize: '48px',
                                fontWeight: 900,
                                background: 'linear-gradient(90deg, #915eff, #ff4c9f, #00cea8, #61dafb)',
                                backgroundSize: '300% 100%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '15px'
                            }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            KONAMI CODE ACTIVATED!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{ color: '#aaa6c3', fontSize: '18px', marginBottom: '30px' }}
                        >
                            You found the secret! 🎉
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            {['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'].map((key, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    style={{
                                        padding: '10px 15px',
                                        background: 'rgba(145, 94, 255, 0.2)',
                                        border: '1px solid #915eff',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#915eff',
                                        fontWeight: 600
                                    }}
                                >
                                    {key}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            style={{
                                color: '#666',
                                fontSize: '14px',
                                marginTop: '40px'
                            }}
                        >
                            Click anywhere to close
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
