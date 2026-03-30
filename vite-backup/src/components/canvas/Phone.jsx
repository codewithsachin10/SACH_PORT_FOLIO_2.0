import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';

const PhoneModel = () => {
    const phoneRef = useRef();

    useFrame((state) => {
        if (phoneRef.current) {
            phoneRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            phoneRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={phoneRef} scale={2}>
                {/* Phone Frame */}
                <mesh>
                    <boxGeometry args={[0.4, 0.85, 0.04]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Screen */}
                <mesh position={[0, 0, 0.021]}>
                    <boxGeometry args={[0.36, 0.78, 0.001]} />
                    <meshStandardMaterial
                        color="#0a0a1a"
                        emissive="#915eff"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Dynamic Island */}
                <mesh position={[0, 0.32, 0.022]}>
                    <capsuleGeometry args={[0.02, 0.06, 16, 32]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#000" />
                </mesh>

                {/* App Icons Grid */}
                {[...Array(4)].map((_, row) =>
                    [...Array(4)].map((_, col) => (
                        <mesh
                            key={`icon-${row}-${col}`}
                            position={[-0.12 + col * 0.08, 0.15 - row * 0.12, 0.022]}
                        >
                            <boxGeometry args={[0.05, 0.05, 0.001]} />
                            <meshStandardMaterial
                                color={['#915eff', '#ff4c9f', '#00cea8', '#61dafb'][(row + col) % 4]}
                                emissive={['#915eff', '#ff4c9f', '#00cea8', '#61dafb'][(row + col) % 4]}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    ))
                )}

                {/* Home Bar */}
                <mesh position={[0, -0.35, 0.022]}>
                    <boxGeometry args={[0.12, 0.008, 0.001]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Camera bump */}
                <mesh position={[-0.1, 0.32, -0.025]}>
                    <boxGeometry args={[0.12, 0.12, 0.02]} />
                    <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Camera lenses */}
                {[[0, 0], [-0.03, 0.03], [0.03, 0.03]].map(([x, y], i) => (
                    <mesh key={i} position={[-0.1 + x, 0.32 + y, -0.036]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.005, 32]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

const FloatingPhone = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '200px',
            height: '300px',
            zIndex: 1
        }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[-2, 2, 2]} intensity={0.5} color="#915eff" />
                <pointLight position={[2, -2, 2]} intensity={0.3} color="#ff4c9f" />

                <Suspense fallback={null}>
                    <PhoneModel />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default FloatingPhone;
