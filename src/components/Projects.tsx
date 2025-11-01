import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaGamepad, FaUtensils, FaBook, FaChartLine, FaPlane } from 'react-icons/fa';
import './Projects.css';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'VisionLess Pro (visionOS App)',
      description: 'Assistive visionOS app for Apple Vision Pro helping low-vision users identify and navigate to objects. Built with Swift, RealityKit, and ARKit featuring hand tracking, object tracking, plane detection, world sensing, real-time spatial audio cues with foveated audio, and MVVM-compatible system using @Observable AppModel.',
      image: './images/visionless-pro.png',
      technologies: ['Swift', 'visionOS', 'ARKit', 'RealityKit'],
      links: [
        { type: 'github', url: 'https://github.com/RamiKhalil1/Visionless-Pro', label: 'GitHub' },
        { type: 'external', url: 'https://github.com/RamiKhalil1', label: 'More Apps' }
      ],
      icon: null
    },
    {
      title: 'CPR Kids Website Redesign',
      description: '6-member Agile team to redesign and migrate the CPR Kids WordPress site using Elementor. Improved WCAG accessibility, responsiveness, navigation, and content structure. Integrated Google Reviews, newsletter forms, and partner carousels. Reported impact: +22.32% bookings, +1.3% engagement, 1% bounce rate (two weeks post-launch).',
      image: './images/cpr-kids-website.png',
      technologies: ['WordPress', 'Elementor', 'WCAG', 'Agile'],
      links: [
        { type: 'external', url: 'https://cprkids.com.au', label: 'Live Site' }
      ],
      icon: null
    },
    {
      title: 'BubblePop Game (iOS)',
      description: 'SwiftUI arcade-style game with custom animations, difficulty scaling, and real-time scoreboard. MVVM architecture with UserDefaults for persistent scores, combo scoring and animated transitions.',
      image: './images/bubblepop-game.svg',
      technologies: ['SwiftUI', 'MVVM', 'Animations', 'Game Development'],
      links: [
        { type: 'github', url: 'https://github.com/RamiKhalil1/BubblePopGame', label: 'GitHub' },
        { type: 'external', url: 'https://github.com/RamiKhalil1', label: 'More Apps' }
      ],
      icon: <FaGamepad />
    },
    {
      title: 'MealRecipeApp (iOS)',
      description: 'Explore and favorite meals via TheMealDB API with async/await networking in MVVM architecture. Core Data persistence for favorites, offline support with NWPathMonitor, and responsive SwiftUI UI.',
      image: './images/meal-recipe-app.svg',
      technologies: ['SwiftUI', 'Core Data', 'API Integration', 'Offline Support'],
      links: [
        { type: 'github', url: 'https://github.com/RamiKhalil1/MealRecipeApp', label: 'GitHub' },
        { type: 'external', url: 'https://github.com/RamiKhalil1', label: 'More Apps' }
      ],
      icon: <FaUtensils />
    },
    {
      title: 'Daily Journal App (iOS)',
      description: 'Privacy-focused journaling app with moods, quotes (API Ninjas), and Core Data storage. Calendar view with dynamic month/year and date highlighting, password protection, image uploads & sharing.',
      image: './images/daily-journal-app.svg',
      technologies: ['SwiftUI', 'Core Data', 'Privacy', 'Calendar UI'],
      links: [
        { type: 'github', url: 'https://github.com/RamiKhalil1/DailyJournalApp', label: 'GitHub' },
        { type: 'external', url: 'https://github.com/RamiKhalil1', label: 'More Apps' }
      ],
      icon: <FaBook />
    },
    {
      title: 'Financial Tracking App (iOS)',
      description: 'Budget tracking, categorized expenses, and goal management with SwiftUI + MVVM. Interactive dashboards (Apple Charts), password-protected access, and persistent storage.',
      image: './images/financial-tracking-app.svg',
      technologies: ['SwiftUI', 'Apple Charts', 'MVVM', 'Data Visualization'],
      links: [
        { type: 'github', url: 'https://github.com/RamiKhalil1/Financial-Tracking-App', label: 'GitHub' },
        { type: 'external', url: 'https://github.com/RamiKhalil1', label: 'More Apps' }
      ],
      icon: <FaChartLine />
    },
    {
      title: 'Flight Agency App (Java Desktop)',
      description: 'Java desktop app with GUI, secure login, and automated itinerary builder. FXML-based modular views with observable properties for real-time UI updates. Trip validation rules: min two destinations, no consecutive/same-country repeats, valid connections.',
      image: './images/flight-agency-app.svg',
      technologies: ['Java', 'FXML', 'Desktop GUI', 'MVC'],
      links: [],
      icon: <FaPlane />
    }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={`${project.title} Screenshot`} 
                    className="project-img"
                    onError={(e) => {
                      // Fallback to icon if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.parentElement?.querySelector('.project-placeholder');
                      if (placeholder) {
                        placeholder.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                <div className={`project-placeholder ${project.image ? 'hidden' : ''}`}>
                  {project.icon}
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url} 
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.type === 'github' && <FaGithub />}
                        {link.type === 'external' && <FaExternalLinkAlt />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
