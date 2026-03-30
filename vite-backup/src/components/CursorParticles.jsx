import React, { useEffect, useRef } from 'react';

const CursorParticles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Smooth cursor follower
        let cursorX = 0;
        let cursorY = 0;
        const orbs = [];
        const trails = [];

        // Create trailing orbs
        class Orb {
            constructor(index) {
                this.index = index;
                this.x = 0;
                this.y = 0;
                this.size = 12 - index * 1.8;
                this.delay = index * 0.06;
                this.hue = 260 + index * 12;
                this.alpha = 1 - index * 0.12;
            }

            update(targetX, targetY) {
                const ease = 0.18 - this.delay;
                this.x += (targetX - this.x) * Math.max(ease, 0.03);
                this.y += (targetY - this.y) * Math.max(ease, 0.03);
            }

            draw(ctx) {
                if (this.size <= 0) return;

                // Outer glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 3
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${this.alpha * 0.6})`);
                gradient.addColorStop(0.4, `hsla(${this.hue}, 80%, 50%, ${this.alpha * 0.2})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 80%, 50%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Inner core
                ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${this.alpha * 0.8})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Sparkle particles on click
        class Sparkle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 + 3;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.life = 1;
                this.decay = Math.random() * 0.03 + 0.02;
                this.size = Math.random() * 4 + 2;
                this.hue = Math.random() > 0.5 ? 280 : 330;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.96;
                this.vy *= 0.96;
                this.vy += 0.1; // gravity
                this.life -= this.decay;
                this.rotation += this.rotationSpeed;
            }

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.life;

                // Star shape
                ctx.fillStyle = `hsl(${this.hue}, 80%, 60%)`;
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI) / 2;
                    const x = Math.cos(angle) * this.size;
                    const y = Math.sin(angle) * this.size;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }
        }

        // Create orb trail
        for (let i = 0; i < 6; i++) {
            orbs.push(new Orb(i));
        }

        const handleMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleClick = (e) => {
            // Create sparkle burst
            for (let i = 0; i < 12; i++) {
                particlesRef.current.push(new Sparkle(e.clientX, e.clientY));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth cursor position with easing
            cursorX += (targetRef.current.x - cursorX) * 0.15;
            cursorY += (targetRef.current.y - cursorY) * 0.15;

            // Draw connection lines between orbs
            ctx.strokeStyle = 'rgba(145, 94, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < orbs.length - 1; i++) {
                ctx.moveTo(orbs[i].x, orbs[i].y);
                ctx.lineTo(orbs[i + 1].x, orbs[i + 1].y);
            }
            ctx.stroke();

            // Update and draw orbs (reverse order for proper layering)
            for (let i = orbs.length - 1; i >= 0; i--) {
                orbs[i].update(cursorX, cursorY);
                orbs[i].draw(ctx);
            }

            // Main cursor ring
            ctx.strokeStyle = 'rgba(145, 94, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cursorX, cursorY, 20, 0, Math.PI * 2);
            ctx.stroke();

            // Inner dot
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.beginPath();
            ctx.arc(cursorX, cursorY, 4, 0, Math.PI * 2);
            ctx.fill();

            // Update and draw sparkles
            particlesRef.current = particlesRef.current.filter(p => p.life > 0);
            particlesRef.current.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CursorParticles;
