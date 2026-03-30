import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Preload, Html, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
    {
        name: 'React',
        color: '#61dafb',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
        name: 'JavaScript',
        color: '#f7df1e',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
        name: 'Three.js',
        color: '#ffffff',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg'
    },
    {
        name: 'Node.js',
        color: '#339933',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
        name: 'TypeScript',
        color: '#3178c6',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
        name: 'MongoDB',
        color: '#47a248',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    {
        name: 'CSS',
        color: '#1572b6',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
        name: 'HTML',
        color: '#e34f26',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
        name: 'Python',
        color: '#3776ab',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
        name: 'Git',
        color: '#f05032',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },
    {
        name: 'Figma',
        color: '#f24e1e',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    {
        name: 'Redux',
        color: '#764abc',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg'
    }
];

const TechBall = ({ tech, position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group position={position}>
            {/* Glowing sphere background */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.3}
                    roughness={0.6}
                />
            </mesh>

            {/* Logo using HTML overlay */}
            <Html
                center
                distanceFactor={8}
                style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}
            >
                <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${tech.color}30, ${tech.color}10)`,
                    border: `2px solid ${tech.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 20px ${tech.color}40`
                }}>
                    <img
                        src={tech.icon}
                        alt={tech.name}
                        style={{
                            width: '28px',
                            height: '28px',
                            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
                        }}
                    />
                </div>
            </Html>

            {/* Tech name label below */}
            <Html
                position={[0, -0.7, 0]}
                center
                style={{
                    color: tech.color,
                    fontSize: '11px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    textShadow: `0 0 10px ${tech.color}`,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    fontFamily: 'Outfit, sans-serif'
                }}
            >
                {tech.name}
            </Html>
        </group>
    );
};

const RotatingGlobe = () => {
    const groupRef = useRef();

    // Distribute tech items in a sphere pattern
    const positions = useMemo(() => {
        return technologies.map((_, index) => {
            const phi = Math.acos(-1 + (2 * index) / technologies.length);
            const theta = Math.sqrt(technologies.length * Math.PI) * phi;
            const radius = 3.2;

            return [
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            ];
        });
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Center wireframe sphere */}
            <mesh>
                <icosahedronGeometry args={[2.5, 2]} />
                <meshBasicMaterial
                    color="#915eff"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </mesh>

            {/* Inner glowing core */}
            <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial
                    color="#915eff"
                    emissive="#915eff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Pulsing core effect */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial
                    color="#915eff"
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Tech balls with logos */}
            {technologies.map((tech, index) => (
                <TechBall
                    key={tech.name}
                    tech={tech}
                    position={positions[index]}
                />
            ))}

            {/* Orbital rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#ff4c9f" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[3.7, 0.015, 16, 100]} />
                <meshBasicMaterial color="#00cea8" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, Math.PI / 3]}>
                <torusGeometry args={[3.9, 0.01, 16, 100]} />
                <meshBasicMaterial color="#915eff" transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

const TechGlobe = () => {
    return (
        <div style={{
            width: '100%',
            height: '550px',
            position: 'relative'
        }}>
            <Canvas
                camera={{ position: [0, 0, 11], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#915eff" />
                <pointLight position={[0, 0, 10]} intensity={0.3} color="#ff4c9f" />

                <Suspense fallback={null}>
                    <Float
                        speed={0.4}
                        rotationIntensity={0.15}
                        floatIntensity={0.2}
                    >
                        <RotatingGlobe />
                    </Float>
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default TechGlobe;
