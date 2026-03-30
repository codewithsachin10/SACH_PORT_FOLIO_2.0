import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    // Replace with your actual phone number
    const phoneNumber = "919952111626";
    const message = "Hi Sachin! I checked out your portfolio and would like to connect.";

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 9998,
                textDecoration: 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        style={{
                            position: 'absolute',
                            right: '70px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'white',
                            color: '#075e54',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            pointerEvents: 'none'
                        }}
                    >
                        Chat on WhatsApp
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
                    color: 'white',
                    position: 'relative'
                }}
            >
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.5)',
                    animation: 'ripple 1.5s infinite ease-out'
                }} />
                <style>{`
                    @keyframes ripple {
                        0% { transform: scale(1); opacity: 0.8; }
                        100% { transform: scale(1.5); opacity: 0; }
                    }
                `}</style>
                <MessageCircle size={32} fill="white" />
            </motion.div>
        </motion.a>
    );
};

export default WhatsAppButton;
