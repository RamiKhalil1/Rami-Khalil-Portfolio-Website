import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface TechIconProps {
  position: [number, number, number];
  text: string;
  color: string;
  speed: number;
}

const TechIcon: React.FC<TechIconProps> = ({ position, text, color, speed }) => {
  const meshRef = useRef<Mesh>(null);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current && textRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Text follows the box
      textRef.current.position.copy(meshRef.current.position);
      textRef.current.position.y += 0.8;
    }
  });

  return (
    <group>
      <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} position={position}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <Text
          ref={textRef}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {text}
        </Text>
      </Float>
    </group>
  );
};

const FloatingTechIcons: React.FC = () => {
  const techStack = useMemo(() => [
    { text: 'React', color: '#61DAFB', position: [-3, 2, -2] as [number, number, number], speed: 1.2 },
    { text: 'Swift', color: '#FA7343', position: [3, 1, -1] as [number, number, number], speed: 0.8 },
    { text: 'TypeScript', color: '#3178C6', position: [-2, -1, 1] as [number, number, number], speed: 1.5 },
    { text: 'Node.js', color: '#339933', position: [2, -2, 2] as [number, number, number], speed: 0.9 },
    { text: 'Python', color: '#3776AB', position: [0, 3, -3] as [number, number, number], speed: 1.1 },
    { text: 'Java', color: '#ED8B00', position: [-4, 0, 0] as [number, number, number], speed: 0.7 },
    { text: 'MongoDB', color: '#47A248', position: [4, 2, 1] as [number, number, number], speed: 1.3 },
    { text: 'AWS', color: '#FF9900', position: [1, -3, -1] as [number, number, number], speed: 1.0 },
  ], []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        {techStack.map((tech, index) => (
          <TechIcon
            key={index}
            position={tech.position}
            text={tech.text}
            color={tech.color}
            speed={tech.speed}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingTechIcons;
