"use client";
import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 40;
      const dotRadius = 1;
      
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow effect on mouse proximity
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
             const opacity = 1 - distance / 200;
             ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.5})`; // Indigo-500 equivalent
             ctx.beginPath();
             ctx.arc(x, y, dotRadius * 2, 0, Math.PI * 2);
             ctx.fill();
             ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; // reset
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1] opacity-50"
    />
  );
}
