import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Software Engineering student at University of Technology Sydney (UTS) with experience in iOS development, 
              web technologies, and business management. I have a strong foundation in application development, user experience design, 
              and data-driven problem solving, with experience contributing to real-world projects that prioritize usability, accessibility, and performance.
            </p>
            <p>
              My technical expertise spans multiple programming languages including Java, C++, Python, Swift, SwiftUI, C#, and SQL, 
              along with web technologies like JavaScript, HTML, CSS, and platforms including Salesforce, WordPress, and AWS. 
              I'm passionate about creating accessible, user-friendly applications and have experience in both mobile and web development.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>6.71</h3>
                <p>GPA (UTS)</p>
              </div>
              <div className="stat">
                <h3>7+</h3>
                <p>Major Projects</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
