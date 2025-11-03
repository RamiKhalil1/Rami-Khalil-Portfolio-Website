import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface GeometryProps {
  position: [number, number, number];
  color: string;
  type: 'sphere' | 'box' | 'octahedron' | 'torus';
  scale?: number;
  speed?: number;
}

const AnimatedGeometry: React.FC<GeometryProps> = ({ 
  position, 
  color, 
  type, 
  scale = 1, 
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.015 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const renderGeometry = () => {
    const material = (
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        metalness={0.3}
        roughness={0.4}
        wireframe={Math.random() > 0.7}
      />
    );

    switch (type) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[0.5 * scale, 16, 16]}>
            {material}
          </Sphere>
        );
      case 'box':
        return (
          <Box ref={meshRef} args={[0.8 * scale, 0.8 * scale, 0.8 * scale]}>
            {material}
          </Box>
        );
      case 'octahedron':
        return (
          <Octahedron ref={meshRef} args={[0.6 * scale]}>
            {material}
          </Octahedron>
        );
      case 'torus':
        return (
          <Torus ref={meshRef} args={[0.4 * scale, 0.2 * scale, 8, 16]}>
            {material}
          </Torus>
        );
      default:
        return null;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {renderGeometry()}
      </group>
    </Float>
  );
};

const ParticleField: React.FC = () => {
  const particleCount = 150;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    return temp;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0005;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    particles.forEach((particle, i) => {
      pos.set(particle.position, i * 3);
    });
    return pos;
  }, [particles]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Interactive3DBackground: React.FC = () => {
  const geometries = useMemo(() => [
    // Purple/Blue theme matching your portfolio
    { position: [-8, 4, -5] as [number, number, number], color: '#8b5cf6', type: 'sphere' as const, scale: 1.2, speed: 0.8 },
    { position: [6, 3, -8] as [number, number, number], color: '#3b82f6', type: 'box' as const, scale: 0.9, speed: 1.1 },
    { position: [-4, -3, -10] as [number, number, number], color: '#06b6d4', type: 'octahedron' as const, scale: 1.1, speed: 0.9 },
    { position: [8, -2, -6] as [number, number, number], color: '#8b5cf6', type: 'torus' as const, scale: 1.3, speed: 0.7 },
    { position: [2, 5, -12] as [number, number, number], color: '#6366f1', type: 'sphere' as const, scale: 0.8, speed: 1.2 },
    { position: [-6, 0, -15] as [number, number, number], color: '#a855f7', type: 'box' as const, scale: 1.0, speed: 1.0 },
    { position: [4, -4, -8] as [number, number, number], color: '#0ea5e9', type: 'octahedron' as const, scale: 0.9, speed: 1.3 },
    { position: [-2, 2, -9] as [number, number, number], color: '#8b5cf6', type: 'torus' as const, scale: 0.7, speed: 0.6 },
    { position: [7, 1, -11] as [number, number, number], color: '#3b82f6', type: 'sphere' as const, scale: 1.1, speed: 0.9 },
    { position: [-5, -1, -7] as [number, number, number], color: '#06b6d4', type: 'box' as const, scale: 1.2, speed: 1.1 },
  ], []);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: -2,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Dynamic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.3} 
          penumbra={0.5} 
          intensity={0.3}
          color="#06b6d4"
        />
        
        {/* Animated Geometries */}
        {geometries.map((geo, index) => (
          <AnimatedGeometry
            key={index}
            position={geo.position}
            color={geo.color}
            type={geo.type}
            scale={geo.scale}
            speed={geo.speed}
          />
        ))}
        
        {/* Particle Field */}
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;
