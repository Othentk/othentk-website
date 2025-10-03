import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
import BlurText from './blocks/TextAnimations/BlurText/BlurText';
import FedTechLogo from './assets/images/FedTech_Logo_RegTM_RGB-300x40-1.png';
import NSINLogo from './assets/images/NSIN_MasterLogo_RGB-300x156-1.png';
import AkalpitPhoto from './assets/images/akalpit_pfp.jpg';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'offering', label: 'What We Offer', href: '#offering' },
  { id: 'mission', label: 'Mission', href: '#mission' },
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'use-cases', label: 'Use Cases', href: '#use-cases' },
  { id: 'partners', label: 'Partners', href: '#partners' },
  { id: 'people', label: 'People', href: '#people' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const isManualScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setAnimatedSections(prev => new Set(prev).add(sectionId));
            
            // Only update active section if not manually scrolling
            if (!isManualScrolling.current) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-120px 0px -120px 0px'
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    isManualScrolling.current = true;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      
      // Add a small delay to ensure accurate positioning
      setTimeout(() => {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        // Re-enable intersection observer after animation completes
        setTimeout(() => {
          isManualScrolling.current = false;
        }, 1500);
      }, 100);
    }
  };

  const setSectionRef = (element: HTMLElement | null, sectionId: string) => {
    sectionRefs.current[sectionId] = element;
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        message: contactForm.message,
        to_name: 'Othentk Team',
      };

      console.log('Sending email with params:', templateParams);
      console.log('Environment variables:', {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      });
      
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!, // Service ID
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!, // Template ID
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY! // Public Key
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setContactForm({
        name: '',
        email: '',
        interest: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      console.error('Error details:', (error as any)?.text || (error as any)?.message || error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2 id="logo">Othentk</h2>
          </div>
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        <section 
          id="home" 
          className="hero-section"
          ref={(el) => setSectionRef(el, 'home')}
        >
          <div className="hero-content">
            <BlurText 
              text="Critical Connectivity. Simplified. Secured."
              className="hero-title"
              animateBy="words"
              direction="top"
              delay={80}
              stepDuration={0.25}
              threshold={0.1}
              animationFrom={undefined}
              animationTo={undefined}
              onAnimationComplete={undefined}
            />
            <BlurText 
              text="Engineering the future of edge connectivity through innovative network aggregation and managed services"
              className="hero-subtitle"
              animateBy="words"
              direction="top"
              delay={60}
              stepDuration={0.2}
              threshold={0.1}
              animationFrom={undefined}
              animationTo={undefined}
              onAnimationComplete={undefined}
            />
            <button 
              className="cta-button"
              onClick={() => scrollToSection('offering')}
            >
              Explore Our Solutions
            </button>
          </div>
        </section>

        <section 
          id="offering" 
          className={`section ${animatedSections.has('offering') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'offering')}
        >
          <div className="container">
            <h2>What We Offer</h2>
            <div className="offering-grid">
              <div className="offering-card">
                <div className="offering-icon">🛡️</div>
                <h3>ANCHOR Router</h3>
                <p>Security-first enterprise router designed for organizations requiring maximum protection. ANCHOR provides advanced threat protection, secure network aggregation, and compliance features for critical operations and inter-agency collaboration in high-security environments.</p>
                <ul className="feature-list">
                  <li>Advanced security & threat protection</li>
                  <li>Enterprise compliance & governance</li>
                  <li>Secure inter-agency collaboration</li>
                  <li>Critical infrastructure protection</li>
                </ul>
              </div>
              <div className="offering-card">
                <div className="offering-icon">⚡</div>
                <h3>netRAPTR Router</h3>
                <p>High-performance home router optimized for gaming, streaming, and speed. Delivers ultra-fast, stable connectivity for competitive gaming and seamless 4K streaming with intelligent bandwidth management.</p>
                <ul className="feature-list">
                  <li>Ultra-low latency gaming</li>
                  <li>4K streaming optimization</li>
                  <li>High-speed connectivity</li>
                  <li>Home network management</li>
                </ul>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🔧</div>
                <h3>Managed Services</h3>
                <p>Comprehensive edge device detection, observability, and Zero Trust tooling implementation for complete network management and monitoring.</p>
                <ul className="feature-list">
                  <li>Edge device detection</li>
                  <li>Advanced observability</li>
                  <li>Zero Trust implementation</li>
                  <li>24/7 monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="mission" 
          className={`section ${animatedSections.has('mission') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'mission')}
        >
          <div className="container">
            <h2>Our Mission</h2>
            <div className="mission-content">
              <div className="mission-text">
                <p className="mission-statement">
                  At Othentk, we engineer the future of edge connectivity. Through innovative network aggregation and managed services, we enable exceptionally secure, resilient, and performant communications, simplifying critical infrastructure to advance our clients' most vital operations and digital endeavors.
                </p>
                <div className="value-proposition">
                  <h3>Value Proposition</h3>
                  <p>Increase Productivity through faster secure connectivity at the Edge.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="technology" 
          className={`section ${animatedSections.has('technology') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'technology')}
        >
          <div className="container">
            <h2>Technology</h2>
            <p className="section-subtitle">Open source technology and advanced encryption, demonstrates our commitment to robust product development</p>
            
            <div className="how-it-works">
              <h3>How it Works</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <h4>Intelligent Multi-Link Aggregation</h4>
                  <p>Seamlessly combines multiple network connections for optimal performance</p>
                </div>
                <div className="feature-card">
                  <h4>Dynamic Path Optimization & Fail-over</h4>
                  <p>Automatically routes traffic through the best available paths with instant failover</p>
                </div>
                <div className="feature-card">
                  <h4>Robust Security & Network Segmentation</h4>
                  <p>Advanced encryption and isolation ensure data protection and compliance</p>
                </div>
                <div className="feature-card">
                  <h4>Simplified Management & MSSP Oversight</h4>
                  <p>Comprehensive monitoring and control from anywhere, anytime</p>
                </div>
                <div className="feature-card">
                  <h4>Ensures Operational Readiness</h4>
                  <p>Maintains critical operations even in challenging environments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="use-cases" 
          className={`section ${animatedSections.has('use-cases') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'use-cases')}
        >
          <div className="container">
            <h2>Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case-card">
                <div className="use-case-icon">🏢</div>
                <h3>ANCHOR Router - Enterprise Security Deployment</h3>
                <p>A defense agency deploys Othentk's ANCHOR router, a robust hardware solution integrated by our team. ANCHOR auto-configures, bonding SATCOM, 5G, and available links through intelligent aggregation. This provides resilient, high-bandwidth connectivity for critical command and control data and operations, ensuring mission readiness with enterprise-grade security and compliance.</p>
                <div className="use-case-features">
                  <span className="feature-tag">Enterprise</span>
                  <span className="feature-tag">Security</span>
                  <span className="feature-tag">Defense</span>
                </div>
              </div>
              <div className="use-case-card">
                <div className="use-case-icon">🏠</div>
                <h3>netRAPTR Router - Home Gaming & Streaming</h3>
                <p>A competitive gamer easily installs the netRAPTR router into their home network. With its user-friendly setup, netRAPTR simultaneously connects to their fiber broadband and a 5G cellular backup. The router intelligently aggregates these connections, minimizing latency and boosting bandwidth. This deployment ensures an ultra-stable, high-speed, and lag-free gaming experience, perfect for competitive gaming and seamless 4K streaming.</p>
                <div className="use-case-features">
                  <span className="feature-tag">Home</span>
                  <span className="feature-tag">Gaming</span>
                  <span className="feature-tag">Streaming</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="partners" 
          className={`section ${animatedSections.has('partners') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'partners')}
        >
          <div className="container">
            <h2>Our Partners</h2>
            <p className="section-subtitle">Collaborating with leading organizations to advance critical connectivity solutions</p>
            <div className="partners-grid">
              <div className="partner-card">
                <img src={FedTechLogo} alt="FedTech Logo" className="partner-logo" />
                <h3>FedTech</h3>
                <p>Partnering with FedTech to accelerate innovation in federal technology and advance critical infrastructure solutions.</p>
              </div>
              <div className="partner-card">
                <img src={NSINLogo} alt="NSIN Logo" className="partner-logo" />
                <h3>NSIN</h3>
                <p>Collaborating with the National Security Innovation Network to develop cutting-edge security and connectivity technologies.</p>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="people" 
          className={`section ${animatedSections.has('people') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'people')}
        >
          <div className="container">
            <h2>Our People</h2>
            <p className="section-subtitle">Meet the team driving innovation in critical connectivity</p>
            <div className="people-grid">
              <div className="person-card">
                <div className="person-photo">
                  <img src={AkalpitPhoto} alt="Akalpit Gadre" />
                </div>
                <div className="person-info">
                  <h3>Akalpit Gadre</h3>
                  <p className="person-title">Founder & CEO</p>
                  <p className="person-bio">
                    A highly motivated and impact-driven leader with strong technical aptitude who enjoys getting technologists excited about business problems and strives for transparency as well as continuous learning. With 12+ years of experience in software product development, Akalpit brings expertise in servant leadership, agile methodologies, and cloud-native solutions to drive Othentk's mission of advancing critical connectivity.
                  </p>
                  <div className="person-expertise">
                    <span className="expertise-tag">Servant Leadership</span>
                    <span className="expertise-tag">Agile & Scrum</span>
                    <span className="expertise-tag">Cloud Native</span>
                    <span className="expertise-tag">Product Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="contact" 
          className={`section ${animatedSections.has('contact') ? 'animate' : ''}`}
          ref={(el) => setSectionRef(el, 'contact')}
        >
          <div className="container">
            <h2>Contact Us</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>Ready to transform your connectivity? Let's discuss how Othentk can enhance your operations.</p>
                <div className="contact-details">
                  <p>📧 akalpit@othentk.com</p>
                  <p>📧 info@othentk.com</p>
                  <p>💼 <a href="https://www.linkedin.com/company/othentk" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                  <p>📍 Seattle, Washington</p>
                </div>
              </div>
              <form 
                className="contact-form" 
                onSubmit={handleContactSubmit}
              >
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required 
                />
                <select 
                  name="interest"
                  value={contactForm.interest}
                  onChange={handleContactFormChange}
                  required
                >
                  <option value="">Select Interest</option>
                  <option value="anchor">ANCHOR Router - Enterprise Security</option>
                  <option value="netraptr">netRAPTR Router - Home Gaming & Streaming</option>
                  <option value="services">Managed Services</option>
                  <option value="other">Other</option>
                </select>
                <textarea 
                  name="message"
                  placeholder="Tell us about your connectivity needs..." 
                  rows={5} 
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <div className="success-message">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="error-message">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2 id="footer-logo">Othentk</h2>
            </div>
            <p>Critical Connectivity. Simplified. Secured.</p>
            <div className="footer-links">
              <a href="https://www.linkedin.com/company/othentk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <p>&copy; 2025 Othentk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 