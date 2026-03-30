import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "CEO, TechStart Inc.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Sachin delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach made our brand stand out. Highly recommended!",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Product Manager, InnovateCo",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "Working with Sachin was a fantastic experience. He understood our vision perfectly and translated it into a stunning, functional website. Professional and talented!",
        rating: 5
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Founder, DesignHub",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        text: "The 3D elements and animations Sachin created for our platform were mind-blowing. He's not just a developer, he's an artist who codes. Will definitely work with him again!",
        rating: 5
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        role: "Marketing Director, GrowthLabs",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "Sachin transformed our outdated website into a modern, engaging experience. Our conversion rates increased by 40% after the redesign. Absolutely brilliant work!",
        rating: 5
    }
];

const TestimonialCard = ({ testimonial, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
            animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.85,
                rotateY: 0
            }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 30 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'linear-gradient(135deg, rgba(16, 13, 37, 0.9), rgba(26, 21, 53, 0.9))',
                padding: '40px',
                borderRadius: '24px',
                border: isActive ? '1px solid rgba(145, 94, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                maxWidth: '600px',
                margin: '0 auto',
                position: 'relative',
                boxShadow: isActive ? '0 25px 50px rgba(0, 0, 0, 0.4)' : 'none'
            }}
        >
            {/* Quote icon */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '60px',
                color: 'rgba(145, 94, 255, 0.2)',
                fontFamily: 'Georgia, serif'
            }}>
                "
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ color: '#ffd700', fontSize: '20px' }}
                    >
                        ★
                    </motion.span>
                ))}
            </div>

            {/* Testimonial text */}
            <p style={{
                color: '#e0e0e0',
                fontSize: '18px',
                lineHeight: '1.8',
                marginBottom: '30px',
                fontStyle: 'italic'
            }}>
                "{testimonial.text}"
            </p>

            {/* Author info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: '3px solid #915eff'
                    }}
                />
                <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                        {testimonial.name}
                    </h4>
                    <p style={{ color: '#915eff', fontSize: '14px' }}>
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id="testimonials" style={{
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
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <p className="hero-sub-text" style={{ textTransform: 'uppercase', letterSpacing: '3px' }}>
                    What people say
                </p>
                <h2 className="hero-head-text" style={{ fontSize: '50px', marginTop: '10px' }}>
                    <span className="gradient-text">Testimonials.</span>
                </h2>
            </motion.div>

            {/* Testimonial cards */}
            <div style={{ position: 'relative', minHeight: '350px' }}>
                <AnimatePresence mode="wait">
                    <TestimonialCard
                        key={testimonials[activeIndex].id}
                        testimonial={testimonials[activeIndex]}
                        isActive={true}
                    />
                </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '40px'
            }}>
                {testimonials.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: index === activeIndex ? '30px' : '12px',
                            height: '12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: index === activeIndex
                                ? 'linear-gradient(90deg, #915eff, #ff4c9f)'
                                : 'rgba(255, 255, 255, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    />
                ))}
            </div>

            {/* Navigation arrows */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px'
            }}>
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ←
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    →
                </motion.button>
            </div>
        </div>
    );
};

export default Testimonials;
