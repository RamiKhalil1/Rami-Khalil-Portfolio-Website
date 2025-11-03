import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Skill3DProps {
  position: [number, number, number];
  title: string;
  description: string;
  technologies: string[];
  color: string;
  category: string;
}

const Skill3D: React.FC<Skill3DProps> = ({
  position,
  title,
  description,
  technologies,
  color,
  category
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Hover animation
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Gentle rotation based on category
      const rotationSpeed = category === 'mobile' ? 0.01 : category === 'web' ? 0.008 : 0.006;
      groupRef.current.rotation.y += rotationSpeed;
      
      // Floating effect
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group 
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main skill card */}
        <RoundedBox 
          ref={meshRef}
          args={[2.5, 3, 0.3]} 
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial 
            color={color}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            metalness={0.1}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Category badge */}
        <RoundedBox
          position={[0, 1.2, 0.2]}
          args={[1.5, 0.3, 0.1]}
          radius={0.05}
        >
          <meshStandardMaterial color="#1f2937" transparent opacity={0.9} />
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.1}
            color="#e5e5e5"
            anchorX="center"
            anchorY="middle"
            font="Arial"
          >
            {category.toUpperCase()}
          </Text>
        </RoundedBox>

        {/* Title */}
        <Text
          position={[0, 0.6, 0.2]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          font="Arial"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0.1, 0.2]}
          fontSize={0.1}
          color="#d1d5db"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.1}
          font="Arial"
          lineHeight={1.2}
        >
          {description}
        </Text>

        {/* Technologies */}
        {technologies.slice(0, 4).map((tech, index) => {
          const cols = 2;
          const x = (index % cols - 0.5) * 1.2;
          const y = -0.6 - Math.floor(index / cols) * 0.4;
          
          return (
            <RoundedBox
              key={tech}
              position={[x, y, 0.2]}
              args={[1, 0.25, 0.05]}
              radius={0.03}
            >
              <meshStandardMaterial 
                color={hovered ? "#6366f1" : "#4338ca"} 
                transparent 
                opacity={0.8} 
              />
              <Text
                position={[0, 0, 0.03]}
                fontSize={0.08}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="Arial"
              >
                {tech}
              </Text>
            </RoundedBox>
          );
        })}

        {/* Hover effect - glowing outline */}
        {hovered && (
          <RoundedBox 
            args={[2.6, 3.1, 0.32]} 
            radius={0.1}
            position={[0, 0, -0.01]}
          >
            <meshStandardMaterial 
              color="#8b5cf6"
              transparent
              opacity={0.3}
              emissive="#8b5cf6"
              emissiveIntensity={0.2}
            />
          </RoundedBox>
        )}
      </group>
    </Float>
  );
};

const Skills3D: React.FC = () => {
  const skillsData = [
    {
      title: "Mobile Development",
      description: "iOS apps with cutting-edge AR/VR technologies and native performance",
      technologies: ["Swift", "SwiftUI", "visionOS", "ARKit", "RealityKit", "Core Data"],
      color: "#8b5cf6",
      category: "mobile",
      position: [-4, 2, 0] as [number, number, number]
    },
    {
      title: "Web Development", 
      description: "Modern web applications with responsive design and user experience focus",
      technologies: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Node.js"],
      color: "#3b82f6",
      category: "web",
      position: [0, 2, 0] as [number, number, number]
    },
    {
      title: "Systems Programming",
      description: "Enterprise applications and system-level programming solutions",
      technologies: ["Java", "C++", "C#", "Python", "Desktop GUI", "FXML"],
      color: "#10b981",
      category: "systems",
      position: [4, 2, 0] as [number, number, number]
    },
    {
      title: "Database & Cloud",
      description: "Scalable data solutions and cloud infrastructure management",
      technologies: ["MongoDB", "SQL", "Firebase", "AWS", "Database Design", "API Integration"],
      color: "#f59e0b",
      category: "cloud",
      position: [-2, -1, 0] as [number, number, number]
    },
    {
      title: "Design & Tools",
      description: "UI/UX design, accessibility standards, and development workflows",
      technologies: ["Figma", "WCAG", "Git", "Docker", "WordPress", "Elementor"],
      color: "#ef4444",
      category: "design",
      position: [2, -1, 0] as [number, number, number]
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <h2 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          margin: 0
        }}>
          Skills & Technologies
        </h2>
        <p style={{ 
          color: '#d1d5db', 
          fontSize: '1.1rem', 
          textAlign: 'center',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          marginTop: '0.5rem'
        }}>
          Interact with the 3D skill cards • Drag to rotate • Scroll to zoom
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 0, 10]} intensity={0.3} color="#3b82f6" />
        <spotLight 
          position={[0, 15, 5]} 
          angle={0.5} 
          penumbra={0.5} 
          intensity={0.4}
          color="#06b6d4"
        />

        {/* Skill Cards */}
        {skillsData.map((skill) => (
          <Skill3D
            key={skill.title}
            position={skill.position}
            title={skill.title}
            description={skill.description}
            technologies={skill.technologies}
            color={skill.color}
            category={skill.category}
          />
        ))}

        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={4}
          maxDistance={12}
          maxPolarAngle={Math.PI / 1.3}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default Skills3D;
