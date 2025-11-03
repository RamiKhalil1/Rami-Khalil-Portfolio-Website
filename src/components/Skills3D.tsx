import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html, Float, OrbitControls } from '@react-three/drei';
import { Mesh, Color } from 'three';

interface Skill3DProps {
  position: [number, number, number];
  skill: {
    title: string;
    level: number; // 0-100
    color: string;
    icon?: string;
  };
}

const Skill3D: React.FC<Skill3DProps> = ({ position, skill }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Scale effect
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  // Calculate height based on skill level
  const height = (skill.level / 100) * 2 + 0.5;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Skill bar */}
        <RoundedBox
          ref={meshRef}
          args={[0.3, height, 0.3]}
          radius={0.02}
          smoothness={4}
          position={[0, height / 2 - 1, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={new Color(skill.color)}
            transparent 
            opacity={hovered ? 0.9 : 0.7}
            roughness={0.3}
            metalness={0.5}
          />
        </RoundedBox>

        {/* Base platform */}
        <RoundedBox
          args={[0.8, 0.1, 0.8]}
          radius={0.02}
          position={[0, -1.05, 0]}
        >
          <meshStandardMaterial 
            color="#2d3748"
            transparent 
            opacity={0.8}
          />
        </RoundedBox>

        {/* Skill title */}
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          font={undefined}
        >
          {skill.title}
        </Text>

        {/* Skill percentage */}
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.1}
          color="#a0aec0"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {skill.level}%
        </Text>

        {/* Hover tooltip */}
        {hovered && (
          <Html
            position={[0, 2, 0]}
            center
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${skill.color}`,
            }}>
              Proficiency: {skill.level}%
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

const Skills3D: React.FC = () => {
  const skills = [
    { title: 'Swift', level: 90, color: '#FA7343' },
    { title: 'React', level: 85, color: '#61DAFB' },
    { title: 'TypeScript', level: 80, color: '#3178C6' },
    { title: 'Python', level: 75, color: '#3776AB' },
    { title: 'Java', level: 85, color: '#ED8B00' },
    { title: 'Node.js', level: 70, color: '#339933' },
    { title: 'MongoDB', level: 65, color: '#47A248' },
    { title: 'AWS', level: 60, color: '#FF9900' },
  ];

  // Arrange skills in a circle
  const positions: [number, number, number][] = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    const radius = 3;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ];
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      position: 'relative',
      marginTop: '2rem'
    }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4f46e5" />
        <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.5} />
        
        {skills.map((skill, index) => (
          <Skill3D
            key={index}
            position={positions[index]}
            skill={skill}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--text-secondary)',
        fontSize: '14px',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '8px 16px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        Drag to rotate • Hover for details
      </div>
    </div>
  );
};

export default Skills3D;
