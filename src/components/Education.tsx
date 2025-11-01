import React from 'react';
import './Education.css';

const Education: React.FC = () => {
  return (
    <section id="education" className="education section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-content">
          <div className="education-card">
            <div className="education-header">
              <h3>Bachelor of Engineering (Honours)</h3>
              <span className="education-date">Feb 2023 – Present</span>
            </div>
            <div className="education-details">
              <p className="university">University of Technology Sydney (UTS)</p>
              <p className="location">Sydney, Australia</p>
              <p className="gpa"><strong>Major:</strong> Software Engineering | <strong>GPA:</strong> 6.71</p>
              <div className="coursework">
                <h4>Relevant Coursework:</h4>
                <div className="course-tags">
                  <span className="course-tag">iOS App Development</span>
                  <span className="course-tag">Software Development Studio</span>
                  <span className="course-tag">Programming Fundamentals</span>
                  <span className="course-tag">Application Development</span>
                  <span className="course-tag">Advanced iOS Development</span>
                  <span className="course-tag">Industry Studio Projects</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="education-card">
            <div className="education-header">
              <h3>Bachelor's Degree in Software Engineering</h3>
              <span className="education-date">Oct 2020 – Jul 2022</span>
            </div>
            <div className="education-details">
              <p className="university">Lebanese University</p>
              <p className="location">Lebanon</p>
              <p className="gpa"><strong>GPA:</strong> 80.88</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
