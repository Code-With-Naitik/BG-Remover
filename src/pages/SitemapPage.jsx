import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Map, ArrowRight, Sparkles, Globe, ShieldCheck, Mail, Camera, Car, Briefcase, BookOpen, FileText } from 'lucide-react';

const SitemapPage = () => {
  const sections = [
    {
      title: 'Main Platform',
      icon: <Sparkles size={22} color="var(--accent)" />,
      links: [
        { to: '/', label: 'Home Page' },
        { to: '/tool', label: 'AI Background Remover' },
        { to: '/pricing', label: 'Pricing & Plans' },
        { to: '/about', label: 'Our Story' },
        { to: '/contact', label: 'Contact Us' },
      ]
    },
    {
      title: 'SEO Landing Pages',
      icon: <Globe size={22} color="#10B981" />,
      links: [
        { to: '/remove-background-online', label: 'Remove Background Online' },
        { to: '/free-background-remover', label: 'Free Background Remover' },
        { to: '/remove-bg-from-image', label: 'Remove BG From Image' },
        { to: '/background-remover-hd', label: 'Background Remover HD' },
        { to: '/remove-background-india', label: 'Snaplix India' },
      ]
    },
    {
      title: 'Use Case Specific',
      icon: <Briefcase size={22} color="#F59E0B" />,
      links: [
        { to: '/remove-background-from-passport-photo', label: 'Passport Photo Background' },
        { to: '/remove-background-from-car-image', label: 'Car Photo Background' },
        { to: '/remove-background-from-logo', label: 'Logo Transparency Tool' },
      ]
    },
    {
      title: 'Design Blog',
      icon: <BookOpen size={22} color="#6366f1" />,
      links: [
        { to: '/blog', label: 'All Articles' },
        { to: '/blog/how-to-remove-background-from-image-step-by-step', label: 'Step-by-Step Guide' },
        { to: '/blog/best-free-background-remover-tools-in-2026', label: 'Best Tools of 2026' },
        { to: '/blog/how-to-make-transparent-png-images', label: 'Creating Transparent PNGs' },
      ]
    },
    {
      title: 'User Portal',
      icon: <ShieldCheck size={22} color="#8B5CF6" />,
      links: [
        { to: '/login', label: 'Sign In' },
        { to: '/signup', label: 'Get Started' },
        { to: '/dashboard', label: 'My Gallery' },
      ]
    },
    {
      title: 'Legal & Info',
      icon: <FileText size={22} color="#64748b" />,
      links: [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms', label: 'Terms of Service' },
        { to: '/sitemap', label: 'Sitemap Index' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Helmet>
        <title>Sitemap Index | Snaplix AI</title>
        <meta name="description" content="Complete directory of all tools, guides, and pages on Snaplix AI background remover." />
      </Helmet>

      {/* Header */}
      <section style={{ padding: '8rem 0 5rem', background: 'white', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '24px', background: 'var(--accent-light)', color: 'var(--accent)', marginBottom: '2rem' }}>
             <Map size={40} />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Sitemap <span className="gradient-text">Index</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
            Quickly navigate to any tool or resource on our platform.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section style={{ padding: '5rem 0 10rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
            {sections.map((section, idx) => (
              <div 
                key={idx} 
                className="animate-fade-in"
                style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '32px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  height: 'fit-content'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bg-secondary)' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                    {section.icon}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>{section.title}</h2>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.to} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          textDecoration: 'none',
                          color: 'var(--text-secondary)',
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = 'var(--accent)';
                          e.currentTarget.style.transform = 'translateX(6px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link.label}
                        <ArrowRight size={16} style={{ opacity: 0.5 }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
           <div style={{ background: 'var(--accent-gradient)', borderRadius: '32px', padding: '3.5rem', textAlign: 'center', color: '#fff', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Ready to remove backgrounds?</h3>
              <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', opacity: 0.9 }}>Join 500,000+ creators using Snaplix AI today.</p>
              <Link to="/tool" className="btn btn-primary" style={{ background: '#fff', color: 'var(--accent)', borderRadius: '14px', padding: '1rem 3rem', fontSize: '1.125rem', fontWeight: 800 }}>
                Get Started for Free
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
