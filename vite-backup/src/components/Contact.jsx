import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Clock, Send } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'f7459738-231d-485d-b6a5-187f9ed6b25f',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact: Message from ${formData.name}`,
                    from_name: 'Portfolio Contact Form'
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const inputStyle = (field) => ({
        background: focusedField === field ? 'rgba(145, 94, 255, 0.1)' : '#151030',
        border: focusedField === field ? '2px solid #915eff' : '2px solid rgba(255, 255, 255, 0.05)',
        padding: '18px 20px',
        color: 'white',
        borderRadius: '12px',
        outline: 'none',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        width: '100%'
    });

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <Github size={24} />,
            url: 'https://github.com/codewithsachin10',
            color: '#6e5494'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={24} />,
            url: 'https://www.linkedin.com/in/sachin-gopalakrishnan-373966365',
            color: '#0077B5'
        },
        {
            name: 'Email',
            icon: <Mail size={24} />,
            url: 'mailto:sachingopalakrishnan10@gmail.com',
            color: '#EA4335'
        }
    ];

    return (
        <div id="contact" style={{
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
                    Get in touch
                </p>
                <h2 className="hero-head-text" style={{ fontSize: '50px', marginTop: '10px' }}>
                    Contact<span className="gradient-text">.</span>
                </h2>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '50px'
            }}>
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        padding: '40px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(16, 13, 37, 0.95), rgba(26, 21, 53, 0.95))',
                        border: '1px solid rgba(145, 94, 255, 0.2)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {submitStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '15px 20px',
                                borderRadius: '10px',
                                marginBottom: '20px',
                                background: submitStatus === 'success'
                                    ? 'rgba(0, 206, 168, 0.2)'
                                    : 'rgba(255, 76, 76, 0.2)',
                                border: `1px solid ${submitStatus === 'success' ? '#00cea8' : '#ff4c4c'}`,
                                color: submitStatus === 'success' ? '#00cea8' : '#ff4c4c'
                            }}
                        >
                            {submitStatus === 'success'
                                ? '✅ Message sent successfully! I\'ll get back to you soon.'
                                : '❌ Something went wrong. Please try again or email me directly.'}
                        </motion.div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px'
                    }}>
                        <div>
                            <label style={{
                                color: 'white',
                                marginBottom: '10px',
                                display: 'block',
                                fontWeight: '500',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="What's your name?"
                                style={inputStyle('name')}
                                required
                            />
                        </div>

                        <div>
                            <label style={{
                                color: 'white',
                                marginBottom: '10px',
                                display: 'block',
                                fontWeight: '500',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="What's your email?"
                                style={inputStyle('email')}
                                required
                            />
                        </div>

                        <div>
                            <label style={{
                                color: 'white',
                                marginBottom: '10px',
                                display: 'block',
                                fontWeight: '500',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Your Message
                            </label>
                            <textarea
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="What do you want to say?"
                                style={{ ...inputStyle('message'), resize: 'none' }}
                                required
                            />
                        </div>

                        <MagneticButton
                            variant="primary"
                            onClick={handleSubmit}
                            style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}
                        >
                            {isSubmitting ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        style={{ display: 'inline-block' }}
                                    >
                                        ⏳
                                    </motion.span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={18} />
                                </>
                            )}
                        </MagneticButton>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
                >
                    {/* Info card */}
                    <div style={{
                        padding: '35px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(145, 94, 255, 0.1), rgba(255, 76, 159, 0.05))',
                        border: '1px solid rgba(145, 94, 255, 0.2)'
                    }}>
                        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px' }}>
                            Let's <span className="gradient-text">connect</span>
                        </h3>
                        <p style={{ color: '#aaa6c3', lineHeight: '1.8', fontSize: '16px' }}>
                            I'm a student developer eager to learn and collaborate on exciting projects.
                            Whether you have an opportunity, a project idea, or just want to chat about web development,
                            feel free to reach out!
                        </p>
                    </div>

                    {/* Quick contact info */}
                    <div style={{
                        padding: '25px 35px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                background: 'rgba(145, 94, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#915eff'
                            }}>
                                <MapPin size={22} />
                            </div>
                            <div>
                                <p style={{ color: '#aaa6c3', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</p>
                                <p style={{ color: 'white', fontWeight: '500' }}>India</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                background: 'rgba(0, 206, 168, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#00cea8'
                            }}>
                                <Clock size={22} />
                            </div>
                            <div>
                                <p style={{ color: '#aaa6c3', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Response Time</p>
                                <p style={{ color: 'white', fontWeight: '500' }}>Within 24 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 style={{ fontSize: '16px', marginBottom: '20px', color: '#aaa6c3', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Find me on
                        </h4>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{
                                        scale: 1.15,
                                        y: -5,
                                        boxShadow: `0 15px 30px ${social.color}40`
                                    }}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: social.color,
                                        textDecoration: 'none',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Decorative gradient line */}
                    <motion.div
                        animate={{
                            background: [
                                'linear-gradient(90deg, #915eff, #ff4c9f)',
                                'linear-gradient(90deg, #ff4c9f, #00cea8)',
                                'linear-gradient(90deg, #00cea8, #915eff)',
                            ]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{
                            height: '4px',
                            borderRadius: '2px',
                            marginTop: 'auto'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
