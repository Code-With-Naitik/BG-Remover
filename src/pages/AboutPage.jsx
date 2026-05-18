import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Target, Users, Globe, Zap, Shield, Heart, ArrowRight, CheckCircle, Mail, MapPin, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VALUES = [
  { icon: Target, title: 'Precision First', desc: 'We obsess over edge quality. Every pixel matters when your product photos need to be perfect.', color: 'var(--accent)' },
  { icon: Sparkles, title: 'AI for Everyone', desc: 'Professional-grade tools shouldn\'t require a professional budget. We keep our free tier generous.', color: '#a855f7' },
  { icon: Shield, title: 'Privacy Guaranteed', desc: 'Your data is yours. We process images directly in memory and delete them instantly after download.', color: '#ec4899' },
  { icon: Heart, title: 'Community Driven', desc: 'Our roadmap is shaped by user feedback. Every single feature request is read and considered.', color: '#ef4444' },
];

const STATS = [
  { value: '10M+', label: 'Images Processed', icon: Zap },
  { value: '500K+', label: 'Active Users', icon: Users },
  { value: '150+', label: 'Countries Reached', icon: Globe },
  { value: '99.9%', label: 'Uptime', icon: Target },
];

const STORY = [
  { year: '2023', title: 'The Problem', desc: 'As freelance designers, we were spending 20% of our week just cutting out product backgrounds for e-commerce clients. Existing tools were either too expensive or left jagged, unprofessional edges.' },
  { year: '2024', title: 'The Prototype', desc: 'We trained a custom Convolutional Neural Network specifically optimized for hair, glass, and complex edges. We launched a beta version to our network, and it went viral overnight.' },
  { year: 'Today', title: 'Snaplix AI', desc: 'Now processing millions of images monthly, we are continuously upgrading our AI models while maintaining our core promise: a genuinely useful tool that gives time back to creators.' },
];

const AboutPage = () => (
  <div className="about-page">
    <Helmet>
      <title>About Us — Snaplix AI | The Ultimate AI Photo Editing Platform</title>
      <meta name="description" content="Discover the story behind Snaplix AI, our mission to democratize state-of-the-art AI photo editing, and how we are empowering businesses globally with automated background removal technology." />
    </Helmet>

    {/* Hero Section */}
    <section className="about-hero animate-fade-in">
      <div className="about-hero-bg">
        <div className="hero-orb orb-primary"></div>
        <div className="hero-orb orb-secondary"></div>
      </div>

      <div className="container hero-container text-center">
        <div className="hero-badge animate-slide-up">
          <Globe size={14} /> Global Remote Team
        </div>
        <h1 className="hero-title animate-slide-up delay-100">
          We're making pixel-perfect <br />
          <span className="gradient-text">editing effortless.</span>
        </h1>
        <p className="hero-subtitle animate-slide-up delay-200">
          Snaplix AI was founded to democratize high-end graphic design. What used to take 15 minutes of careful masking in Photoshop now takes 3 seconds, entirely in your browser. Our vision is to empower creators, developers, and businesses to focus on what truly matters: creation, not tedious preparation.
        </p>
        <div className="hero-actions animate-slide-up delay-300">
          <Link to="/tool" className="btn btn-primary btn-xl hero-btn">
            Try the Tool Free <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>

    {/* Floating Stats Bar */}
    <section className="stats-section animate-slide-up delay-300">
      <div className="container">
        <div className="stats-glass-panel">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="metric-item">
              <div className="metric-icon-wrapper">
                <Icon size={24} className="metric-icon" />
              </div>
              <h3 className="metric-value">{value}</h3>
              <p className="metric-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Massive SEO Content Block 1: Our Mission */}
    <section className="content-section" style={{ background: 'var(--bg-primary)', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="content-block animate-slide-up">
          <div className="block-label">Our Mission</div>
          <h2 className="block-title">Artificial Intelligence for All</h2>
          <div className="block-text">
            <p>
              The digital landscape is evolving at an unprecedented pace. With the recent development in Visual AI, we have developed a proprietary algorithm designed to make complicated tech simple, accessible, and remarkably easy to use. From independent freelancers and solo entrepreneurs to small local businesses and sprawling Fortune 500 companies, everyone is starting to notice the undeniable power of our automated background removal software.
            </p>
            <p>
              We at Snaplix AI are not only revolutionizing the photo editing workflow to dramatically increase productivity, but we are also actively helping organizations and individuals to completely rethink design and photography in general. By eliminating the most tedious, repetitive aspects of graphic design—such as manually outlining complex subjects like hair, fur, or transparent glass—we unlock thousands of hours of creative potential.
            </p>
            <p>
              Furthermore, we provide an enterprise-grade REST API so that other developers, agencies, and SaaS platforms can seamlessly integrate our background removal solution into their own ecosystems, effectively building top-notch products tailored for the AI era without having to reinvent the wheel.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Massive SEO Content Block 2: Our Aim */}
    <section className="content-section" style={{ background: 'var(--bg-secondary)', padding: '6rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="content-block animate-slide-up">
          <div className="block-label">Our Aim</div>
          <h2 className="block-title">Powering Your Creative Ideas</h2>
          <div className="block-text">
            <p>
              Snaplix AI stands as the best solution for automated background removal on the web today, offering unmatched accuracy and unparalleled pricing. Removing the background of an image has been a major bottleneck for e-commerce vendors, marketers, and photographers for a long time, but that is no longer the case. 
            </p>
            <p>
              We are here to assist all designers—from novices using Canva to seasoned professionals in Adobe Photoshop—to produce amazing, high-converting art pieces and product listings without any worries about ragged edges or artificial-looking cutouts. We are deeply committed to providing professionals and large businesses with the infrastructure, stability, and support required to create a truly inspired, frictionless workflow at scale.
            </p>
            <p>
              In addition to all that, Snaplix AI is here to channel raw computational power to developers globally, enabling them to build the apps, CRM systems, and e-commerce platforms of the next generation. Our products are meticulously engineered for the new digital world. Our AI provides the horsepower needed to excel in modern design and can be utilized by every single person and business online. The possibilities are truly endless with Snaplix AI.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Our Story / Timeline Layout */}
    <section className="story-section" style={{ padding: '8rem 0' }}>
      <div className="container story-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="story-header text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">How a weekend hackathon project became a globally recognized tool.</p>
        </div>

        <div className="timeline-container">
          {STORY.map((item, index) => (
            <div key={item.year} className="timeline-item animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index !== STORY.length - 1 && <div className="marker-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values / Premium Grid */}
    <section className="values-section" style={{ background: 'var(--bg-secondary)', padding: '8rem 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="values-header text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">The fundamental principles that guide every single line of code we write.</p>
        </div>

        <div className="values-grid">
          {VALUES.map(({ icon: Icon, title, desc, color }, index) => (
            <div key={title} className="value-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="value-icon-wrapper" style={{ color: color, background: `${color}15`, borderColor: `${color}30` }}>
                <Icon size={28} />
              </div>
              <div className="value-content">
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.0625rem' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <style>{`
      .about-page {
        background: var(--bg-primary);
        color: var(--text-primary);
        overflow-x: hidden;
      }

      /* Typography Utilities */
      .section-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 900;
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
        color: var(--text-primary);
      }
      
      .section-subtitle {
        font-size: 1.1875rem;
        color: var(--text-secondary);
        font-weight: 500;
        margin-bottom: 2rem;
        line-height: 1.6;
      }
      
      .text-center { text-align: center; }

      /* Hero Section */
      .about-hero {
        position: relative;
        padding: 8rem 0 10rem;
        text-align: center;
        overflow: hidden;
      }

      .about-hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }

      .hero-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.15;
      }

      .orb-primary {
        width: 60vw; height: 60vw;
        background: var(--accent);
        top: -30%; left: 20%;
      }

      .orb-secondary {
        width: 40vw; height: 40vw;
        background: #ec4899;
        bottom: -20%; right: -10%;
      }

      .hero-container {
        position: relative;
        z-index: 10;
        max-width: 900px;
        margin: 0 auto;
      }

      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.25rem;
        background: var(--bg-card);
        color: var(--accent);
        border: 1px solid var(--border-color);
        border-radius: 100px;
        font-weight: 800;
        font-size: 0.8125rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 2rem;
        box-shadow: var(--shadow-sm);
      }

      .hero-title {
        font-size: clamp(3rem, 6vw, 4.5rem);
        line-height: 1.1;
        margin-bottom: 1.5rem;
        font-weight: 900;
        letter-spacing: -0.03em;
        color: var(--text-primary);
      }

      .hero-subtitle {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 3rem;
        line-height: 1.6;
        font-weight: 500;
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
      }

      .hero-actions {
        display: flex;
        justify-content: center;
      }

      .hero-btn {
        padding: 1.25rem 3rem;
        border-radius: 1.5rem;
        font-size: 1.125rem;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
      }

      /* Stats Section */
      .stats-section {
        position: relative;
        z-index: 20;
        margin-top: -6rem;
      }

      .stats-glass-panel {
        background: var(--glass-bg);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid var(--glass-border);
        border-top: 4px solid var(--accent);
        border-radius: 2rem;
        padding: 3.5rem 2rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1);
      }

      .metric-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.5rem 1rem;
        border-radius: 1.5rem;
        transition: transform 0.3s ease;
      }
      
      .metric-item:hover {
        transform: translateY(-5px);
      }

      .metric-icon-wrapper {
        width: 56px; height: 56px;
        border-radius: 16px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 1.25rem;
        color: var(--accent);
        box-shadow: var(--shadow-sm);
      }

      .metric-value {
        font-size: 2.75rem;
        font-weight: 900;
        color: var(--text-primary);
        line-height: 1;
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
      }

      .metric-label {
        color: var(--text-secondary);
        font-size: 0.875rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      /* Content Blocks */
      .content-block {
        background: transparent;
      }
      
      .block-label {
        font-size: 1rem;
        font-weight: 800;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
      }

      .block-title {
        font-size: clamp(2.25rem, 4vw, 3rem);
        font-weight: 900;
        margin-bottom: 2rem;
        color: var(--text-primary);
        line-height: 1.2;
        letter-spacing: -0.02em;
      }

      .block-text {
        font-size: 1.1875rem;
        color: var(--text-secondary);
        line-height: 1.8;
      }

      .block-text p {
        margin-bottom: 1.75rem;
      }
      .block-text p:last-child {
        margin-bottom: 0;
      }

      /* Story / Timeline */
      .timeline-container {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .timeline-item {
        display: flex;
        gap: 2.5rem;
      }

      .timeline-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 24px;
      }

      .marker-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--accent);
        border: 4px solid var(--bg-secondary);
        box-shadow: 0 0 0 4px var(--accent-light);
        flex-shrink: 0;
        z-index: 2;
      }

      .marker-line {
        width: 2px;
        flex: 1;
        background: var(--border-color);
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .timeline-content {
        padding-bottom: 4rem;
        flex: 1;
      }

      .timeline-year {
        font-size: 1.25rem;
        font-weight: 900;
        color: var(--accent);
        margin-bottom: 0.75rem;
        display: inline-block;
        padding: 0.25rem 1.25rem;
        background: var(--accent-light);
        border-radius: 100px;
      }

      .timeline-title {
        font-size: 1.875rem;
        font-weight: 800;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      .timeline-desc {
        color: var(--text-secondary);
        font-size: 1.125rem;
        line-height: 1.7;
      }

      /* Values Grid */
      .values-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .value-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 3rem;
        border-radius: 2rem;
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        transition: all 0.3s ease;
      }

      .value-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
        border-color: var(--accent);
      }

      .value-icon-wrapper {
        width: 64px; height: 64px;
        border-radius: 1.25rem;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        border: 1px solid;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .stats-glass-panel { grid-template-columns: repeat(2, 1fr); }
        .values-grid { grid-template-columns: 1fr; }
      }

      @media (max-width: 768px) {
        .about-hero { padding: 6rem 0 8rem; }
        .hero-title { font-size: 2.5rem; }
        .stats-glass-panel { grid-template-columns: 1fr; gap: 3rem; }
        .timeline-item { gap: 1.5rem; }
        .value-card { flex-direction: column; align-items: center; text-align: center; }
      }
    `}</style>
  </div>
);

export default AboutPage;
