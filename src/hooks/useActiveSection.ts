import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = [
      'home',
      'about',
      'skills',
      'education',
      'experience',
      'projects',
      'contact'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle 50% of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && sections.includes(sectionId)) {
            setActiveSection(sectionId);
            // Update URL without causing a page reload
            const newUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;
            window.history.replaceState(null, '', newUrl);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle initial URL hash on page load (only for browser navigation, not refresh)
    const handleInitialHash = () => {
      // Always start with home section active on page load/refresh
      setActiveSection('home');
    };

    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      // Only handle popstate if it's actual navigation, not a refresh
      if (event.state !== null || window.performance.navigation.type !== 1) {
        const hash = window.location.hash.replace('#', '');
        const targetSection = hash || 'home';
        if (sections.includes(targetSection)) {
          setActiveSection(targetSection);
          const element = document.getElementById(targetSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    // Set up event listeners
    handleInitialHash();
    window.addEventListener('popstate', handlePopState);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return activeSection;
};
