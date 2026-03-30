import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({
    children,
    href,
    onClick,
    variant = 'primary', // 'primary' | 'outline'
    className = '',
    style = {}
}) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull strength
        const strength = 0.3;

        setPosition({
            x: distanceX * strength,
            y: distanceY * strength
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 32px',
        borderRadius: '50px',
        fontWeight: 600,
        fontSize: '16px',
        textDecoration: 'none',
        cursor: 'pointer',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    const variants = {
        primary: {
            background: 'linear-gradient(90deg, #915eff, #ff4c9f)',
            color: 'white',
            boxShadow: '0 10px 30px rgba(145, 94, 255, 0.4)'
        },
        outline: {
            background: 'transparent',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)'
        }
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={buttonRef}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: variant === 'primary'
                    ? '0 20px 40px rgba(145, 94, 255, 0.5)'
                    : '0 10px 30px rgba(145, 94, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15
            }}
            style={{
                ...baseStyles,
                ...variants[variant]
            }}
            className={className}
        >
            {/* Shimmer effect */}
            <motion.span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    pointerEvents: 'none'
                }}
                animate={{
                    left: ['−100%', '100%']
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            />
            {children}
        </Component>
    );
};

export default MagneticButton;
