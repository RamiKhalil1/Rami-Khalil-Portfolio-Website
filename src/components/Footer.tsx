import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>
              Made by Rami Khalil
            </p>
            <p className="copyright">
              © {currentYear} All rights reserved.
            </p>
          </div>
          
          <div className="footer-links">
            <a 
              href="https://github.com/RamiKhalil1" 
              className="footer-link" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/rami-khalil-2133b4206" 
              className="footer-link" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:rami.mkhalil19@gmail.com" 
              className="footer-link"
              aria-label="Email Contact"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
