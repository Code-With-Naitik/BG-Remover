import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Target, Users, Globe, Zap, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'Alex Carter', role: 'Founder & CEO', avatar: 'AC', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&fit=crop' },
  { name: 'Priya Sharma', role: 'Head of AI', avatar: 'PS', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&fit=crop' },
  { name: 'Jordan Lee', role: 'Lead Engineer', avatar: 'JL', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&fit=crop' },
];

const VALUES = [
  { icon: Target, title: 'Precision First', desc: 'We obsess over edge quality. Every pixel matters when your product photos need to be perfect.', color: '#6366f1' },
  { icon: Sparkles, title: 'AI for Everyone', desc: 'Professional-grade tools shouldn\'t require a professional budget. We keep our free tier generous.', color: '#a855f7' },
  { icon: Shield, title: 'Privacy Guaranteed', desc: 'Your data is yours. We process images directly in memory and delete them instantly after download.', color: '#ec4899' },
  { icon: Heart, title: 'Community Driven', desc: 'Our roadmap is shaped by user feedback. Every single feature request is read and considered.', color: '#ef4444' },
];

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us — BGRemover Pro</title>
      <meta name="description" content="Learn about the team behind BGRemover Pro and our mission to make AI-powered image editing accessible to everyone." />
    </Helmet>

    {/* Hero Section with Glowing Orbs */}
    <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0 6rem', textAlign: 'center' }}>
      <div className="glow-orb" style={{ top: '-10%', left: '10%', background: 'var(--accent)', opacity: 0.15 }} />
      <div className="glow-orb" style={{ top: '20%', right: '10%', background: '#ec4899', opacity: 0.1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Globe size={14} /> Global Remote Team
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
          We're making pixel-perfect <br />
          <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            editing effortless.
          </span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
          BGRemover Pro was founded to democratize high-end graphic design. What used to take 15 minutes of careful masking in Photoshop now takes 3 seconds, entirely in your browser.
        </p>
        <Link to="/tool" className="btn btn-gradient btn-lg" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
          Try the Tool Free
        </Link>
      </div>
    </section>

    {/* Floating Stats Bar */}
    <section style={{ padding: '0 0 5rem' }}>
      <div className="container">
        <div className="card glass" style={{ padding: '3rem 2rem', borderTop: '4px solid var(--accent)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { value: '10M+', label: 'Images Processed', icon: Zap },
              { value: '500K+', label: 'Active Users', icon: Users },
              { value: '150+', label: 'Countries Reached', icon: Globe },
              { value: '99.9%', label: 'Uptime', icon: Target },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={24} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Our Story / Timeline Layout */}
    <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Our Story</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {[
            { year: '2023', title: 'The Problem', desc: 'As freelance designers, we were spending 20% of our week just cutting out product backgrounds for e-commerce clients. Existing tools were either too expensive or left jagged, unprofessional edges.' },
            { year: '2024', title: 'The Prototype', desc: 'We trained a custom Convolutional Neural Network specifically optimized for hair, glass, and complex edges. We launched a beta version to our network, and it went viral overnight.' },
            { year: 'Today', title: 'BGRemover Pro', desc: 'Now processing millions of images monthly, we are continuously upgrading our AI models while maintaining our core promise: a genuinely useful free tier, forever.' },
          ].map((item, index) => (
            <div key={item.year} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ width: '80px', flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent)' }}>{item.year}</p>
              </div>
              <div style={{ width: '2px', background: 'var(--accent-light)', alignSelf: 'stretch', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '5px', left: '-5px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
              </div>
              <div style={{ flex: 1, paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values / Premium Grid */}
    <section style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Core Values</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>The principles that guide every line of code we write.</p>
        </div>

        <div className="grid-2" style={{ gap: '2rem' }}>
          {VALUES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card card-hover" style={{ padding: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={28} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section style={{ background: 'var(--bg-secondary)', padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Meet the Makers</h2>
        <div className="grid-3" style={{ gap: '2rem' }}>
          {TEAM.map(({ name, role, img }) => (
            <div key={name} className="card card-hover glass" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={img}
                  alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', pointerEvents: 'none' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center', position: 'relative', marginTop: '-3rem', background: 'var(--bg-primary)', margin: '0 1rem 1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{name}</h3>
                <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9375rem' }}>{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
