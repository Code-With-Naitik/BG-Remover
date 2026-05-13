import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Target, Users, Globe, Zap, Shield, Heart, ArrowRight, CheckCircle } from 'lucide-react';
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
      <title>About Us — Snaplix AI</title>
      <meta name="description" content="Learn about the team behind Snaplix AI and our mission to make AI-powered image editing accessible to everyone." />
    </Helmet>

    {/* Hero Section */}
    <section className="about-hero animate-fade-in">
      <div className="about-hero-bg">
        <div className="hero-orb orb-primary"></div>
        <div className="hero-orb orb-secondary"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-badge">
          <Globe size={14} /> Global Remote Team
        </div>
        <h1 className="hero-title">
          We're making pixel-perfect <br />
          <span className="gradient-text">editing effortless.</span>
        </h1>
        <p className="hero-subtitle">
          Snaplix AI was founded to democratize high-end graphic design. What used to take 15 minutes of careful masking in Photoshop now takes 3 seconds, entirely in your browser.
        </p>
        <div className="hero-actions">
          <Link to="/tool" className="btn btn-primary btn-xl hero-btn">
            Try the Tool Free <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>

    {/* Floating Stats Bar */}
    <section className="stats-section animate-slide-up">
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

    {/* Our Story / Timeline Layout */}
    <section className="story-section">
      <div className="container story-container">
        <div className="story-header text-center">
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">How a weekend hackathon project became a global tool.</p>
        </div>

        <div className="timeline-container">
          {STORY.map((item, index) => (
            <div key={item.year} className="timeline-item">
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
    <section className="values-section">
      <div className="container">
        <div className="values-header text-center">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">The principles that guide every line of code we write.</p>
        </div>

        <div className="values-grid">
          {VALUES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="value-card">
              <div className="value-icon-wrapper" style={{ color: color, background: `${color}15`, borderColor: `${color}30` }}>
                <Icon size={28} />
              </div>
              <div className="value-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Website Integrations / API Section */}
    <section className="integrations-section">
      <div className="container">
        <div className="integrations-header text-center">
          <h2 className="section-title">Integrate with Your Website</h2>
          <p className="section-subtitle">Add instant background removal to your own platform with our simple REST API.</p>
        </div>
        
        <div className="integrations-content">
          <div className="code-window">
            <div className="code-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
              <span className="code-title">POST /v1/remove-background</span>
            </div>
            <pre><code>{`fetch('https://api.snaplix.ai/v1/remove-background', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your_live_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: 'https://example.com/product.jpg',
    format: 'png',
    bg_color: 'transparent'
  })
})
.then(response => response.json())
.then(data => console.log(data.result_url));`}</code></pre>
          </div>
          
          <div className="integrations-text">
            <h3>Developer-Friendly Architecture</h3>
            <p>Our API is built for high-throughput enterprise applications. From e-commerce platforms to mobile apps, integration takes less than 5 minutes.</p>
            <ul className="api-features">
              <li><CheckCircle size={18} className="feature-check" /> <span>Webhook support for async processing</span></li>
              <li><CheckCircle size={18} className="feature-check" /> <span>99.99% guaranteed uptime SLA</span></li>
              <li><CheckCircle size={18} className="feature-check" /> <span>Automatic image resizing and compression</span></li>
              <li><CheckCircle size={18} className="feature-check" /> <span>Multi-region global CDN delivery</span></li>
            </ul>
            <Link to="/pricing" className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '1rem 2rem', borderRadius: '1rem' }}>Get API Key</Link>
          </div>
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
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 900;
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
      }
      
      .section-subtitle {
        font-size: 1.125rem;
        color: var(--text-secondary);
        font-weight: 500;
        margin-bottom: 4rem;
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
        max-width: 800px;
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
      }

      .hero-subtitle {
        font-size: 1.25rem;
        color: var(--text-secondary);
        margin-bottom: 3rem;
        line-height: 1.6;
        font-weight: 500;
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
        padding-bottom: 6rem;
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

      /* Story / Timeline Section */
      .story-section {
        padding: 6rem 0;
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
      }

      .story-container {
        max-width: 800px;
      }

      .timeline-container {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin-top: 2rem;
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
        margin-bottom: 0.5rem;
        display: inline-block;
        padding: 0.25rem 1rem;
        background: var(--accent-light);
        border-radius: 100px;
      }

      .timeline-title {
        font-size: 1.75rem;
        font-weight: 800;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      .timeline-desc {
        color: var(--text-secondary);
        font-size: 1.125rem;
        line-height: 1.7;
      }

      /* Values Section */
      .values-section {
        padding: 8rem 0;
      }

      .values-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .value-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 2.5rem;
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

      .value-content h3 {
        font-size: 1.375rem;
        font-weight: 800;
        margin-bottom: 0.75rem;
      }

      .value-content p {
        color: var(--text-secondary);
        line-height: 1.6;
        font-size: 1rem;
      }

      /* Integrations Section */
      .integrations-section {
        padding: 6rem 0 10rem;
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-color);
      }

      .integrations-content {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 4rem;
        align-items: center;
      }

      .code-window {
        background: #0f172a;
        border-radius: 1.5rem;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255,255,255,0.1);
      }

      .code-header {
        background: #1e293b;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot.red { background: #ef4444; }
      .dot.yellow { background: #f59e0b; }
      .dot.green { background: #10b981; }

      .code-title {
        color: #94a3b8;
        font-family: monospace;
        font-size: 0.875rem;
        margin-left: 1rem;
      }

      .code-window pre {
        margin: 0;
        padding: 2rem;
        overflow-x: auto;
      }

      .code-window code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9375rem;
        color: #38bdf8;
        line-height: 1.6;
      }

      .integrations-text h3 {
        font-size: 2rem;
        font-weight: 900;
        margin-bottom: 1.25rem;
        color: var(--text-primary);
        letter-spacing: -0.02em;
      }

      .integrations-text p {
        font-size: 1.125rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 2rem;
      }

      .api-features {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .api-features li {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .feature-check {
        color: var(--accent);
        flex-shrink: 0;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .stats-glass-panel { grid-template-columns: repeat(2, 1fr); }
        .values-grid { grid-template-columns: 1fr; }
        .integrations-content { grid-template-columns: 1fr; gap: 3rem; }
      }

      @media (max-width: 768px) {
        .about-hero { padding: 6rem 0 8rem; }
        .hero-title { font-size: 2.5rem; }
        .stats-glass-panel { grid-template-columns: 1fr; gap: 3rem; }
        .timeline-item { gap: 1.5rem; }
        .value-card { flex-direction: column; align-items: center; text-align: center; }
        .code-window pre { padding: 1.5rem; font-size: 0.8rem; }
        .integrations-text h3 { font-size: 1.75rem; }
      }
    `}</style>
  </div>
);

export default AboutPage;
