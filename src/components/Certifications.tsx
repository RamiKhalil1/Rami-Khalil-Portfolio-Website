import React from 'react';
import { FaAndroid, FaHeadset, FaNetworkWired, FaLanguage } from 'react-icons/fa';
import './Certifications.css';

const Certifications: React.FC = () => {
  const certifications = [
    {
      icon: <FaAndroid />,
      title: 'Native Android Development',
      issuer: 'Order of Engineers & Architects — Tripoli',
      date: 'November 2021'
    },
    {
      icon: <FaHeadset />,
      title: 'Technical Support Fundamentals',
      issuer: 'Coursera',
      date: 'September 2022'
    },
    {
      icon: <FaNetworkWired />,
      title: 'The Bits and Bytes of Computer Networking',
      issuer: 'Coursera',
      date: 'October 2022'
    },
    {
      icon: <FaLanguage />,
      title: 'IELTS Academic',
      issuer: 'Overall Band 6.5',
      date: 'September 2022'
    }
  ];

  return (
    <section id="certifications" className="certifications section">
      <div className="container">
        <h2 className="section-title">Certifications & Achievements</h2>
        <div className="certifications-grid">
          <div className="certifications-grid-row top-row">
            {certifications.slice(0, 3).map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">
                  {cert.icon}
                </div>
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
              </div>
            ))}
          </div>
          
          <div className="certifications-grid-row bottom-row">
            <div className="cert-card">
              <div className="cert-icon">
                {certifications[3].icon}
              </div>
              <h3>{certifications[3].title}</h3>
              <p className="cert-issuer">{certifications[3].issuer}</p>
              <p className="cert-date">{certifications[3].date}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
