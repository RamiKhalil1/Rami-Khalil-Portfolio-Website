import React, { useState, useEffect } from 'react';
import { FaCode, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#education', label: 'Education', id: 'education' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (href: string, sectionId: string) => {
    setIsMobileMenuOpen(false);
    // Update URL
    const newUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;
    window.history.pushState(null, '', newUrl);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" onClick={() => handleNavClick('#home', 'home')}>
            <FaCode className="nav-logo-icon" />
            Rami Khalil
          </a>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.href, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>

          <button 
            className="nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
