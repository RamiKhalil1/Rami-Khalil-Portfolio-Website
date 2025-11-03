import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Mesh, AdditiveBlending } from 'three';

const AnimatedSphere: React.FC<{ position: [number, number, number]; color: string }> = ({ 
  position, 
  color 
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
};

const ParticleField: React.FC = () => {
  const pointsRef = useRef<any>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </Points>
  );
};

const GeometricShapes: React.FC = () => {
  const shapes = useMemo(() => [
    { position: [-5, 2, -3] as [number, number, number], color: '#4f46e5' },
    { position: [5, -2, -2] as [number, number, number], color: '#7c3aed' },
    { position: [-3, -3, -4] as [number, number, number], color: '#06b6d4' },
    { position: [4, 3, -1] as [number, number, number], color: '#10b981' },
  ], []);

  return (
    <>
      {shapes.map((shape, index) => (
        <AnimatedSphere 
          key={index}
          position={shape.position}
          color={shape.color}
        />
      ))}
    </>
  );
};

const Interactive3DBackground: React.FC = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -2,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#4f46e5" />
        
        <ParticleField />
        <GeometricShapes />
      </Canvas>
    </div>
  );
};

export default Interactive3DBackground;
