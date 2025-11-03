import { useEffect } from 'react';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticleBackground from './components/ParticleBackground';
import Interactive3DBackground from './components/Interactive3DBackground';
import FloatingTechIcons from './components/FloatingTechIcons';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
      <Interactive3DBackground />
      <FloatingTechIcons />
      <ParticleBackground />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Experience />
        
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
