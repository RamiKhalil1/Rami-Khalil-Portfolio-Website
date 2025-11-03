import { useEffect } from 'react';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills3D from './components/Skills3D';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Interactive3DProjects from './components/Interactive3DProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingTechIcons from './components/FloatingTechIcons';
import Interactive3DBackground from './components/Interactive3DBackground';
import { useActiveSection } from './hooks/useActiveSection';
import './styles/globals.css';
import './App.css';

function App() {
  // Initialize URL tracking
  useActiveSection();

  useEffect(() => {
    // Always scroll to top when the app loads or refreshes
    window.scrollTo(0, 0);
    
    // Clear any hash from URL on refresh and set to home
    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="App">
      {/* 3D Background Elements */}
      <Interactive3DBackground />
      <FloatingTechIcons />
      
      {/* Traditional Components */}
      <ParticleBackground />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        
        {/* 3D Skills Section */}
        <section id="skills" className="section" style={{ minHeight: '100vh', position: 'relative' }}>
          <Skills3D />
        </section>
        
        <Education />
        <Certifications />
        <Experience />
        
        {/* 3D Projects Section */}
        <section id="projects" className="section" style={{ minHeight: '100vh', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <h2 style={{ 
              color: 'white', 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              margin: 0
            }}>
              Interactive Projects
            </h2>
            <p style={{ 
              color: '#d1d5db', 
              fontSize: '1.1rem', 
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              marginTop: '0.5rem'
            }}>
              Explore my projects in 3D • Click cards for details • Drag to navigate
            </p>
          </div>
          <Interactive3DProjects />
        </section>
        
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
