import React from 'react';
import { 
  FaJava, 
  FaPython, 
  FaJs, 
  FaDatabase, 
  FaMobileAlt, 
  FaCloud
} from 'react-icons/fa';
import { SiSwift, SiCplusplus } from 'react-icons/si';
import Skills3D from './Skills3D';
import './Skills.css';

const Skills: React.FC = () => {
  const skills = [
    {
      icon: <SiSwift />,
      title: 'Swift & SwiftUI',
      description: 'iOS app development with modern UI frameworks'
    },
    {
      icon: <FaJava />,
      title: 'Java',
      description: 'Desktop applications and enterprise development'
    },
    {
      icon: <SiCplusplus />,
      title: 'C++ & C#',
      description: 'System programming and application development'
    },
    {
      icon: <FaPython />,
      title: 'Python',
      description: 'Scripting, automation, and data processing'
    },
    {
      icon: <FaJs />,
      title: 'Web Technologies',
      description: 'JavaScript, HTML, CSS, Figma, XML'
    },
    {
      icon: <FaDatabase />,
      title: 'Database & SQL',
      description: 'Database design and data management'
    },
    {
      icon: <FaMobileAlt />,
      title: 'iOS Development',
      description: 'visionOS, ARKit, RealityKit, Core Data'
    },
    {
      icon: <FaCloud />,
      title: 'Software & Platforms',
      description: 'Salesforce, WordPress, Elementor, AWS, Kali Linux'
    }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">
                {skill.icon}
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
        
        {/* 3D Interactive Skills Visualization */}
        <div className="skills-3d-section">
          <h3 style={{ 
            textAlign: 'center', 
            color: 'var(--text-primary)', 
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            Interactive Skills Proficiency
          </h3>
          <Skills3D />
        </div>
      </div>
    </section>
  );
};

export default Skills;
