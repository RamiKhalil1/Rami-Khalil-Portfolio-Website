import React, { useEffect, useRef } from 'react';
import './Experience.css';

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
        }
      });

      // Animate timeline line
      const visibleItems = entries.filter(entry => entry.isIntersecting).length;
      if (visibleItems > 0 && timelineRef.current) {
        timelineRef.current.classList.add('animated');
      }
    }, observerOptions);

    itemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      date: 'May 2025 – Present',
      title: 'Business Owner',
      company: 'MR Advanced Windscreens',
      description: 'Launched and manage a mobile windscreen replacement business serving customers in Greater Sydney. Oversee all aspects including bookings, customer service, supply chain, and on-site repairs while ensuring safety, quality, and compliance standards.',
      achievements: [
        'Handle finances including invoicing, budgeting, and expense tracking',
        'Manage customer relationships and service delivery',
        'Ensure compliance with safety and quality standards'
      ]
    },
    {
      date: 'Jan 2024 – May 2025',
      title: 'Windscreen Fitter',
      company: 'Quickglass Windscreens',
      description: 'Specialized in installation, repair, and replacement of vehicle windscreens and window glass with focus on safety and precision. Delivered mobile services across Sydney while maintaining high customer satisfaction.',
      achievements: [
        'Diagnosed damage and advised customers on repair vs. replacement options',
        'Applied primers and adhesives to industry standards',
        'Coordinated bookings and provided updates to maintain customer satisfaction'
      ]
    },
    {
      date: 'Jul 2023 – Jan 2024',
      title: 'Traffic Controller',
      company: 'Vigilant Group / ATC Group',
      description: 'Managed safe and efficient flow of vehicles and pedestrians around construction zones per control plans. Set up and removed signage, barriers, and cones while monitoring site conditions and reporting hazards for resolution.',
      achievements: [
        'Set up and removed signage, barriers, and traffic control equipment',
        'Monitored site conditions and reported hazards for resolution',
        'Coordinated with team members and supervisors to minimize disruptions and maintain safety'
      ]
    },
    {
      date: 'Jan 2023 – Jul 2023',
      title: 'Customer Service Supervisor',
      company: 'Guildford Mina Pizzeria',
      description: 'Delivered fast, friendly service in a high-volume environment, maintaining satisfaction during peak hours. Handled phone, Uber Eats, and in-person orders with accuracy and efficiency.',
      achievements: [
        'Handled phone, Uber Eats, and in-person orders with accuracy and efficiency',
        'Resolved complaints professionally and supported kitchen/delivery staff with order coordination',
        'Maintained customer satisfaction during peak hours in high-volume environment'
      ]
    }
  ];

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-timeline" ref={timelineRef}>
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="experience-item"
              ref={el => { itemsRef.current[index] = el; }}
            >
              <div className="experience-date">{exp.date}</div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
                <ul>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
