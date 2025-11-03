import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface Project3DCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
}

const Project3DCard: React.FC<Project3DCardProps> = ({ 
  position, 
  title, 
  description, 
  color, 
  onClick 
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Scale effect on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2, 1.2, 0.1]}
        radius={0.05}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
                  font={undefined}
      >
        {title}
      </Text>
      
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.08}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        font="/fonts/inter-regular.woff"
      >
        {description}
      </Text>
      
      {hovered && (
        <Html
          position={[0, -0.7, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(10px)',
          }}>
            Click to view project
          </div>
        </Html>
      )}
    </group>
  );
};

interface Interactive3DProjectsProps {
  projects: Array<{
    title: string;
    description: string;
    color: string;
    onClick?: () => void;
  }>;
}

const Interactive3DProjects: React.FC<Interactive3DProjectsProps> = ({ projects }) => {
  const positions: [number, number, number][] = [
    [-3, 1, 0],
    [0, 1, 0],
    [3, 1, 0],
    [-1.5, -1, 0],
    [1.5, -1, 0],
  ];

  return (
    <div style={{ 
      width: '100%', 
      height: '600px', 
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4f46e5" />
        
        {projects.slice(0, 5).map((project, index) => (
          <Project3DCard
            key={index}
            position={positions[index]}
            title={project.title}
            description={project.description}
            color={project.color}
            onClick={project.onClick}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Interactive3DProjects;
