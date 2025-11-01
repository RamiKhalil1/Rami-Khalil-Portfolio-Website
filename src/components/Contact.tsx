import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import QRCodeContact from './QRCodeContact';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - replace with your actual credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.log('EmailJS not configured. Simulating form submission...');
        // Fallback to simulation if EmailJS is not configured
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Rami Khalil',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-text">
            <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.</p>
            
            <div className="contact-top-section">
              <div className="resume-download">
                <p className="resume-text">Want to know more about my experience?</p>
                <div className="resume-actions">
                  <a 
                    href="/Rami_Khalil_Resume.pdf" 
                    className="btn btn-resume" 
                    download="Rami_Khalil_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFileDownload />
                    <span>Download Resume</span>
                  </a>
                  <QRCodeContact 
                    contactInfo={{
                      name: "Rami Khalil",
                      email: "rami.mkhalil19@gmail.com",
                      phone: "+61422331089",
                      website: "https://ramikhalil.dev",
                      linkedin: "https://linkedin.com/in/rami-khalil-2133b4206",
                      github: "https://github.com/RamiKhalil1",
                      location: "Sydney, Australia"
                    }}
                  />
                </div>
                <p className="resume-note">PDF • Updated October 2025 | QR Code for quick contact sharing</p>
              </div>
              
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? 'error' : ''}
                      required
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <p className="form-status success">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="form-status error">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Connect</h3>
            <div className="contact-grid">
              <div className="contact-grid-row top-row">
                <a 
                  href="mailto:rami.mkhalil19@gmail.com" 
                  className="contact-card contact-card-clickable"
                  aria-label="Send email to rami.mkhalil19@gmail.com"
                >
                  <div className="contact-card-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-card-content">
                    <h4>Email</h4>
                    <span className="contact-link">
                      rami.mkhalil19@gmail.com
                    </span>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/rami-khalil-2133b4206" 
                  className="contact-card contact-card-clickable"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Rami Khalil's LinkedIn profile"
                >
                  <div className="contact-card-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-card-content">
                    <h4>LinkedIn</h4>
                    <span className="contact-link">
                      rami-khalil-2133b4206
                    </span>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/RamiKhalil1" 
                  className="contact-card contact-card-clickable"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Rami Khalil's GitHub profile"
                >
                  <div className="contact-card-icon">
                    <FaGithub />
                  </div>
                  <div className="contact-card-content">
                    <h4>GitHub</h4>
                    <span className="contact-link">
                      RamiKhalil1
                    </span>
                  </div>
                </a>
              </div>
              
              <div className="contact-grid-row bottom-row">
                <a 
                  href="tel:+61422331089" 
                  className="contact-card contact-card-clickable"
                  aria-label="Call Rami Khalil at +61 4 2233 1089"
                >
                  <div className="contact-card-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-card-content">
                    <h4>Phone</h4>
                    <span className="contact-link">
                      +61 4 2233 1089
                    </span>
                  </div>
                </a>
                
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-card-content">
                    <h4>Location</h4>
                    <span className="contact-link">Sydney, Australia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
