import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [stage, setStage] = useState(0); // 0: loading, 1: reveal

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setStage(1);
                    setTimeout(() => {
                        setShowLoader(false);
                        onComplete?.();
                    }, 800);
                    return 100;
                }
                return prev + 2;
            });
        }, 25);

        return () => clearInterval(timer);
    }, [onComplete]);

    const letters = "SACHIN".split("");

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: 'circle(0% at 50% 50%)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 10000,
                        background: '#050816',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '50px',
                        overflow: 'hidden'
                    }}
                >
                    {/* Animated background grid */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
              linear-gradient(rgba(145, 94, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(145, 94, 255, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                        animation: 'gridMove 20s linear infinite'
                    }} />

                    <style>{`
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `}</style>

                    {/* Floating orbs */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: 200 + i * 50,
                                height: 200 + i * 50,
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${['rgba(145, 94, 255, 0.1)', 'rgba(255, 76, 159, 0.08)', 'rgba(0, 206, 168, 0.06)'][i % 3]
                                    } 0%, transparent 70%)`,
                                filter: 'blur(40px)'
                            }}
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -30, 50, 0],
                                scale: [1, 1.1, 0.9, 1]
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.5
                            }}
                        />
                    ))}

                    {/* Animated Name with letter-by-letter reveal */}
                    <motion.div style={{ display: 'flex', gap: '8px', position: 'relative', zIndex: 1 }}>
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    color: stage === 1 ? '#fff' : undefined
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                style={{
                                    fontSize: '80px',
                                    fontWeight: 900,
                                    background: 'linear-gradient(135deg, #915eff, #ff4c9f)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-4px',
                                    display: 'inline-block'
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        style={{
                            color: '#aaa6c3',
                            fontSize: '16px',
                            letterSpacing: '8px',
                            textTransform: 'uppercase',
                            fontWeight: 300,
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        Portfolio
                    </motion.p>

                    {/* Progress Container */}
                    <div style={{
                        width: '280px',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {/* Progress bar background */}
                        <div style={{
                            width: '100%',
                            height: '3px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            {/* Progress bar fill */}
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #915eff, #ff4c9f, #00cea8)',
                                    borderRadius: '2px',
                                    boxShadow: '0 0 20px rgba(145, 94, 255, 0.5)'
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Progress number */}
                        <motion.p
                            style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '14px',
                                color: '#aaa6c3'
                            }}
                        >
                            {progress}%
                        </motion.p>
                    </div>

                    {/* Animated corner decorations */}
                    <svg style={{ position: 'absolute', top: 40, left: 40, width: 60, height: 60 }}>
                        <motion.path
                            d="M 0 30 L 0 0 L 30 0"
                            stroke="#915eff"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </svg>
                    <svg style={{ position: 'absolute', top: 40, right: 40, width: 60, height: 60 }}>
                        <motion.path
                            d="M 30 0 L 60 0 L 60 30"
                            stroke="#ff4c9f"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        />
                    </svg>
                    <svg style={{ position: 'absolute', bottom: 40, left: 40, width: 60, height: 60 }}>
                        <motion.path
                            d="M 0 30 L 0 60 L 30 60"
                            stroke="#00cea8"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.9 }}
                        />
                    </svg>
                    <svg style={{ position: 'absolute', bottom: 40, right: 40, width: 60, height: 60 }}>
                        <motion.path
                            d="M 30 60 L 60 60 L 60 30"
                            stroke="#61dafb"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1.1 }}
                        />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
