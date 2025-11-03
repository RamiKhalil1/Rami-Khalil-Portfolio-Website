import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface TechIconProps {
  position: [number, number, number];
  text: string;
  color: string;
  floatSpeed?: number;
  rotationSpeed?: number;
}

const TechIcon: React.FC<TechIconProps> = ({ 
  position, 
  text, 
  color, 
  floatSpeed = 1, 
  rotationSpeed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && textRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.5;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.5;
      
      // Rotation animation
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      textRef.current.rotation.y += 0.005 * rotationSpeed;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* 3D Box for the tech skill */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.5, 1.5, 0.3]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.8}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
        
        {/* Text label */}
        <Text
          ref={textRef}
          position={[0, 0, 0.2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="Arial"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
};

const FloatingTechIcons: React.FC = () => {
  const techSkills = useMemo(() => [
    // Programming Languages
    { name: 'Swift', color: '#FA7343', position: [-4, 2, 0] as [number, number, number] },
    { name: 'SwiftUI', color: '#007AFF', position: [-2, 3, -1] as [number, number, number] },
    { name: 'Java', color: '#ED8B00', position: [0, 2.5, 1] as [number, number, number] },
    { name: 'Python', color: '#3776AB', position: [2, 3, -0.5] as [number, number, number] },
    { name: 'TypeScript', color: '#3178C6', position: [4, 2.5, 0.5] as [number, number, number] },
    { name: 'JavaScript', color: '#F7DF1E', position: [-3, 0, 2] as [number, number, number] },
    
    // Frameworks & Libraries
    { name: 'React', color: '#61DAFB', position: [-1, 0.5, -2] as [number, number, number] },
    { name: 'Node.js', color: '#339933', position: [1, 0, 1.5] as [number, number, number] },
    { name: 'Express', color: '#000000', position: [3, 1, -1.5] as [number, number, number] },
    
    // Mobile & AR/VR
    { name: 'visionOS', color: '#8A2BE2', position: [-4, -1, 1] as [number, number, number] },
    { name: 'ARKit', color: '#FF6B35', position: [-2, -0.5, -1] as [number, number, number] },
    { name: 'RealityKit', color: '#FF1744', position: [0, -1, 2] as [number, number, number] },
    
    // Databases & Cloud
    { name: 'MongoDB', color: '#47A248', position: [2, -0.5, -2] as [number, number, number] },
    { name: 'Firebase', color: '#FFCA28', position: [4, -1, 0.5] as [number, number, number] },
    { name: 'AWS', color: '#FF9900', position: [-3, -2.5, 0] as [number, number, number] },
    
    // Tools & Other
    { name: 'Git', color: '#F05032', position: [-1, -2, -1] as [number, number, number] },
    { name: 'Docker', color: '#2496ED', position: [1, -2.5, 1] as [number, number, number] },
    { name: 'Figma', color: '#F24E1E', position: [3, -2, -0.5] as [number, number, number] },
  ], []);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
        
        {/* Tech Icons */}
        {techSkills.map((skill, index) => (
          <TechIcon
            key={skill.name}
            position={skill.position}
            text={skill.name}
            color={skill.color}
            floatSpeed={0.5 + (index % 3) * 0.3}
            rotationSpeed={0.5 + (index % 4) * 0.2}
          />
        ))}
        
        {/* Controls for interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default FloatingTechIcons;
