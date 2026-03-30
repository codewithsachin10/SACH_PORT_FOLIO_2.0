import { useRef, Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Boxy retro CRT computer
const RetroBoxComputer = () => {
    const groupRef = useRef();
    const screenRef = useRef();

    // Create animated screen texture
    const screenTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        // Classic blue screen
        ctx.fillStyle = '#0055aa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Portfolio text - pixelated style
        ctx.font = 'bold 36px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00ffff';
        ctx.fillText('PORTFOLIO', canvas.width / 2, 100);

        // Loading bar border
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 140, 240, 25);

        // Loading bar fill
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(84, 144, 180, 17);

        // Loading text
        ctx.font = '14px "Courier New", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('LOADING...', canvas.width / 2, 195);

        // Blinking cursor
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(180, 220, 12, 18);

        // Command prompt style text
        ctx.font = '12px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#00ff00';
        ctx.fillText('C:\\> Welcome to Sachin\'s Portfolio_', 30, 235);

        // Scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        for (let i = 0; i < canvas.height; i += 2) {
            ctx.fillRect(0, i, canvas.width, 1);
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    // Super smooth animation with easing
    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            // Smooth sine wave rotation
            groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
            groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.03;
            // Gentle bobbing
            groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
        }
    });

    // Gray-beige color palette
    const bodyColor = "#9a9590";      // Gray-beige main
    const bezelColor = "#8a857f";     // Slightly darker
    const accentColor = "#7a756f";    // Even darker for contrast
    const darkAccent = "#6a655f";     // Dark details

    return (
        <group ref={groupRef} scale={0.85}>

            {/* === BOXY CRT MONITOR === */}

            {/* Main monitor body - thick boxy shape */}
            <mesh position={[0, 0, -0.3]}>
                <boxGeometry args={[2.2, 1.8, 0.8]} />
                <meshStandardMaterial
                    color={bodyColor}
                    metalness={0.1}
                    roughness={0.85}
                />
            </mesh>

            {/* Front bezel - thick frame */}
            <mesh position={[0, 0, 0.12]}>
                <boxGeometry args={[2.3, 1.9, 0.05]} />
                <meshStandardMaterial
                    color={bezelColor}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {/* Screen recess (dark border) */}
            <mesh position={[0, 0.05, 0.14]}>
                <boxGeometry args={[1.7, 1.35, 0.02]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.3}
                    roughness={0.5}
                />
            </mesh>

            {/* CRT Screen */}
            <mesh ref={screenRef} position={[0, 0.05, 0.16]}>
                <planeGeometry args={[1.55, 1.2]} />
                <meshBasicMaterial map={screenTexture} />
            </mesh>

            {/* Screen glass reflection overlay */}
            <mesh position={[0, 0.05, 0.165]}>
                <planeGeometry args={[1.55, 1.2]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.03}
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            {/* Bottom control panel */}
            <mesh position={[0, -0.8, 0.12]}>
                <boxGeometry args={[2.3, 0.25, 0.1]} />
                <meshStandardMaterial
                    color={accentColor}
                    metalness={0.15}
                    roughness={0.75}
                />
            </mesh>

            {/* Power button */}
            <mesh position={[0.85, -0.8, 0.18]}>
                <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
                <meshStandardMaterial
                    color="#333333"
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>

            {/* Power LED */}
            <mesh position={[0.7, -0.8, 0.18]}>
                <sphereGeometry args={[0.02, 12, 12]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>

            {/* Adjustment knobs */}
            {[-0.6, -0.3, 0].map((x, i) => (
                <mesh key={i} position={[x, -0.8, 0.18]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
                    <meshStandardMaterial
                        color="#444444"
                        metalness={0.6}
                        roughness={0.4}
                    />
                </mesh>
            ))}

            {/* Brand logo area */}
            <mesh position={[-0.85, -0.8, 0.17]}>
                <boxGeometry args={[0.35, 0.1, 0.01]} />
                <meshStandardMaterial
                    color={darkAccent}
                    metalness={0.3}
                    roughness={0.6}
                />
            </mesh>

            {/* Ventilation slits on top */}
            {[...Array(8)].map((_, i) => (
                <mesh key={`top-vent-${i}`} position={[-0.6 + i * 0.17, 0.92, -0.1]}>
                    <boxGeometry args={[0.08, 0.02, 0.4]} />
                    <meshStandardMaterial color={darkAccent} />
                </mesh>
            ))}

            {/* Side vents */}
            {[...Array(6)].map((_, i) => (
                <mesh key={`side-vent-${i}`} position={[1.16, 0.4 - i * 0.15, -0.2]}>
                    <boxGeometry args={[0.02, 0.06, 0.35]} />
                    <meshStandardMaterial color={accentColor} />
                </mesh>
            ))}

            {/* === STAND === */}
            <mesh position={[0, -1.05, 0.1]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[0.6, 0.12, 0.5]} />
                <meshStandardMaterial
                    color={bezelColor}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            <mesh position={[0, -1.12, 0.15]}>
                <boxGeometry args={[1.4, 0.04, 0.7]} />
                <meshStandardMaterial
                    color={accentColor}
                    metalness={0.15}
                    roughness={0.75}
                />
            </mesh>

        </group>
    );
};

const ComputerCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: isMobile ? 'auto' : '50%',
            bottom: isMobile ? '80px' : 'auto',
            right: isMobile ? '0' : '0',
            left: isMobile ? '0' : 'auto',
            transform: isMobile ? 'none' : 'translateY(-50%)',
            width: isMobile ? '100%' : '50%',
            height: isMobile ? '300px' : '85%',
            zIndex: 1,
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: isMobile ? [0, 0, 6] : [0, 0.2, 4.5], fov: isMobile ? 45 : 35 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />
                <directionalLight position={[-3, 3, 2]} intensity={0.3} color="#ffe0c0" />
                <pointLight position={[-2, 0, 2]} intensity={0.15} color="#915eff" />
                <pointLight position={[2, -1, 2]} intensity={0.1} color="#ff4c9f" />

                <Suspense fallback={null}>
                    <Float
                        speed={1}
                        rotationIntensity={0}
                        floatIntensity={0.3}
                        floatingRange={[-0.05, 0.05]}
                    >
                        <RetroBoxComputer />
                    </Float>
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default ComputerCanvas;
