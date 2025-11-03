import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Project3DCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
  tech: string[];
  onClick?: () => void;
}

const Project3DCard: React.FC<Project3DCardProps> = ({
  position,
  title,
  description,
  color,
  tech,
  onClick
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Hover animation
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Gentle rotation
      groupRef.current.rotation.y += 0.005;
      
      // Floating effect
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
    if (onClick) onClick();
  };

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Main card */}
        <RoundedBox 
          ref={meshRef}
          args={[3, 4, 0.2]} 
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial 
            color={color}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            metalness={0.1}
            roughness={0.3}
          />
        </RoundedBox>

        {/* Title */}
        <Text
          position={[0, 1.3, 0.15]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          font="Arial"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0.2, 0.15]}
          fontSize={0.12}
          color="#e5e5e5"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.3}
          font="Arial"
          lineHeight={1.2}
        >
          {description.slice(0, 120)}...
        </Text>

        {/* Tech stack */}
        {tech.slice(0, 3).map((techItem, index) => (
          <RoundedBox
            key={techItem}
            position={[-1 + index * 1, -1.3, 0.15]}
            args={[0.8, 0.3, 0.05]}
            radius={0.05}
          >
            <meshStandardMaterial color="#4338ca" transparent opacity={0.8} />
            <Text
              position={[0, 0, 0.03]}
              fontSize={0.08}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="Arial"
            >
              {techItem}
            </Text>
          </RoundedBox>
        ))}

        {/* Interaction indicator */}
        {hovered && (
          <RoundedBox
            position={[0, -1.8, 0.15]}
            args={[1.5, 0.3, 0.05]}
            radius={0.05}
          >
            <meshStandardMaterial color="#8b5cf6" transparent opacity={0.9} />
            <Text
              position={[0, 0, 0.03]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="Arial"
            >
              Click to explore
            </Text>
          </RoundedBox>
        )}
      </group>
    </Float>
  );
};

const Interactive3DProjects: React.FC = () => {
  const projects = [
    {
      title: "VisionLess Pro",
      description: "Assistive visionOS app for Apple Vision Pro helping low-vision users identify and navigate to objects with spatial audio cues.",
      color: "#8A2BE2",
      tech: ["Swift", "visionOS", "ARKit", "RealityKit"],
      position: [-4, 0, 0] as [number, number, number]
    },
    {
      title: "CPR Kids Website",
      description: "6-member Agile team redesign improving WCAG accessibility, responsiveness, and user engagement by 22%.",
      color: "#FF6B35",
      tech: ["WordPress", "Elementor", "WCAG"],
      position: [0, 0, 0] as [number, number, number]
    },
    {
      title: "BubblePop Game",
      description: "SwiftUI arcade-style game with custom animations, difficulty scaling, and real-time scoreboard using MVVM architecture.",
      color: "#3b82f6",
      tech: ["SwiftUI", "MVVM", "Animations"],
      position: [4, 0, 0] as [number, number, number]
    },
    {
      title: "MealRecipe App",
      description: "iOS app exploring meals via TheMealDB API with Core Data persistence, offline support, and responsive SwiftUI UI.",
      color: "#10b981",
      tech: ["SwiftUI", "Core Data", "API"],
      position: [-2, -3, 0] as [number, number, number]
    },
    {
      title: "Financial Tracker",
      description: "Budget tracking app with categorized expenses, goal management, and interactive dashboards using Apple Charts.",
      color: "#f59e0b",
      tech: ["SwiftUI", "Charts", "MVVM"],
      position: [2, -3, 0] as [number, number, number]
    }
  ];

  const handleProjectClick = (title: string) => {
    console.log(`Clicked on project: ${title}`);
    // Here you could trigger a modal, navigation, or other interaction
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
        <spotLight 
          position={[0, 10, 5]} 
          angle={0.3} 
          penumbra={0.5} 
          intensity={0.5}
          color="#3b82f6"
        />

        {/* Project Cards */}
        {projects.map((project) => (
          <Project3DCard
            key={project.title}
            position={project.position}
            title={project.title}
            description={project.description}
            color={project.color}
            tech={project.tech}
            onClick={() => handleProjectClick(project.title)}
          />
        ))}

        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.3}
          minDistance={5}
          maxDistance={12}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default Interactive3DProjects;
