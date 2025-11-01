import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    "Rami Khalil",
    "a Software Engineer",
    "a Full-Stack Developer", 
    "an iOS Specialist",
    "a React Developer",
    "a Swift Developer",
    "a Problem Solver",
    "a Tech Enthusiast"
  ];

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, wait then start deleting
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next text
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
      }
    }
  }, [currentCharIndex, isTyping, currentTextIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm{' '}<span className="animated-text">{displayedText}</span>
            <span className="cursor">|</span>
          </h1>
          {/* <p className="hero-subtitle">Full-Stack Developer • iOS Specialist • Software Engineering Student</p> */}
          <p className="hero-description">
            I'm a passionate full-stack developer specializing in modern web technologies and native iOS development. 
            With expertise spanning React, Swift, Java, Python, and cloud platforms, I craft end-to-end digital solutions 
            that prioritize user experience and performance. From building responsive web applications to developing native 
            iOS apps with SwiftUI and ARKit, I bring ideas to life through clean code and thoughtful design. Currently in my 
            final year of Software Engineering at UTS while contributing to real-world projects that make a measurable impact.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/images/rami-profile-pic.png" 
            alt="Rami Khalil - Software Engineer" 
            className="hero-profile-img"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hero-img-placeholder hidden">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
