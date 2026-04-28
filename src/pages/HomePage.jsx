import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  UploadCloud, Zap, Shield, Star, CheckCircle,
  ArrowRight, Sparkles, Image, Download, Users
} from 'lucide-react';
import AdBanner from '../components/layout/AdBanner';
import { Helmet } from 'react-helmet-async';

const FEATURES = [
  {
    icon: Zap,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Lightning Fast',
    desc: 'AI removes backgrounds in under 3 seconds. Powered by our edge-optimized inference pipeline.',
  },
  {
    icon: Image,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    title: 'Pixel-Perfect Edges',
    desc: 'Hair, fur, and fine details preserved with industry-leading precision. Zero jagged edges.',
  },
  {
    icon: Shield,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    title: '100% Private',
    desc: 'Your images are processed securely and deleted instantly. We never store or share your files.',
  },
];

const STEPS = [
  { num: '01', title: 'Upload Your Image', desc: 'Drag & drop or click to browse. Supports JPG, PNG, and WEBP up to 10 MB.' },
  { num: '02', title: 'AI Removes Background', desc: 'Our AI model analyzes your image and precisely removes the background in seconds.' },
  { num: '03', title: 'Download & Use', desc: 'Get a crisp transparent PNG ready to use in any design tool, e-commerce store, or app.' },
];

const HomePage = () => {
  const [gallery, setGallery] = useState([]);
  const [activeGallery, setActiveGallery] = useState(0);
  const [stats, setStats] = useState({
    totalRemovals: '10M+',
    totalHappyUsers: '500K+',
    totalGallery: '50+'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, statsRes] = await Promise.all([
          axios.get('/api/gallery'),
          axios.get('/api/admin/public-stats')
        ]);
        setGallery(galleryRes.data.data);
        if (statsRes.data.success) {
          const s = statsRes.data.data;
          setStats({
            totalRemovals: s.totalRemovals > 1000 ? (s.totalRemovals / 1000).toFixed(1) + 'k+' : s.totalRemovals,
            totalHappyUsers: s.totalHappyUsers > 1000 ? (s.totalHappyUsers / 1000).toFixed(1) + 'k+' : s.totalHappyUsers,
            totalGallery: s.totalGallery
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const displayStats = [
    { value: stats.totalRemovals, label: 'Images Processed' },
    { value: stats.totalHappyUsers, label: 'Happy Users' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: stats.totalGallery, label: 'Showcase Items' },
  ];

  return (
    <>
      <Helmet>
        <title>Snaplix AI — Free AI Background Remover Online</title>
        <meta name="description" content="Remove image backgrounds instantly with our free AI-powered tool. Perfect for e-commerce, marketing, and social media. Get transparent PNGs in seconds — no sign-up needed." />
        <meta property="og:title" content="Snaplix AI — Free AI Background Remover" />
        <meta property="og:description" content="Remove backgrounds from images instantly using AI. Free, fast, and pixel-perfect." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Snaplix AI",
          "description": "AI-powered image background remover",
          "applicationCategory": "DesignApplication",
          "offers": { "@type": "Offer", "price": "0" }
        })}</script>
      </Helmet>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 6rem', background: 'var(--bg-primary)' }}>
        
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AdBanner type="header" />
          <h1 className="animate-slide-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Remove Image Background
          </h1>

          <p className="animate-slide-up delay-100" style={{ fontSize: '1.375rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 3rem', fontWeight: 500 }}>
            100% automatically and <span style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>5 Free Daily Credits</span>
          </p>

          {/* Upload CTA Card - remove.bg style massive button area */}
          <div className="animate-slide-up delay-200" style={{ marginBottom: '2.5rem' }}>
            <Link to="/tool" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3.5rem 2rem',
                  background: 'var(--bg-card)',
                  borderRadius: '1.5rem',
                  boxShadow: 'var(--shadow-xl)',
                  cursor: 'pointer',
                  maxWidth: '560px',
                  width: '100%',
                  margin: '0 auto',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--border-color)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow-lg)';
                  e.currentTarget.style.borderColor = 'var(--accent-light)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div 
                  className="btn btn-primary" 
                  style={{ 
                    fontSize: '1.25rem', 
                    padding: '1.1rem 2.8rem', 
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  Upload Image
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                  or drop a file, paste image or <span style={{ color: 'var(--accent)', textDecoration: 'underline' }}>URL</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Trust Row */}
          <div className="animate-fade-in delay-300" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            {[
              { icon: CheckCircle, label: 'Fully Automated' },
              { icon: Download, label: 'Free Downloads' },
              { icon: Users, label: 'No Sign-up' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                <Icon size={16} color="var(--text-muted)" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE GALLERY ─── */}
      {gallery.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-label">AI Showcase</p>
              <h2 className="section-title">Stunning Results, Every Time</h2>
              <p className="section-desc" style={{ margin: '0 auto' }}>
                See how Snaplix AI handles complex edges, hair, and transparent objects.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'center' }}>
              <div className="card" style={{ padding: '1rem', background: '#000', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '500px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '0.4rem 1rem', borderRadius: '0.5rem', color: '#fff', fontSize: '0.75rem', fontWeight: 700, backdropFilter: 'blur(10px)' }}>
                  RESULT PREVIEW
                </div>
                <img 
                  src={gallery[activeGallery].afterImage} 
                  alt="After" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {gallery.map((item, idx) => (
                  <div 
                    key={item._id} 
                    onClick={() => setActiveGallery(idx)}
                    style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      padding: '1rem', 
                      borderRadius: '1rem', 
                      background: activeGallery === idx ? 'var(--accent-light)' : 'transparent',
                      border: activeGallery === idx ? '1px solid var(--accent)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <img src={item.beforeImage} style={{ width: '60px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── STATS BAR ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {displayStats.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.875rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.stats-grid{grid-template-columns:repeat(2,1fr) !important;}}`}</style>
      </section>

      {/* ─── AD ─── */}
      <div className="container">
        <AdBanner type="horizontal" />
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Three Steps to Perfection</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              No tutorials, no complexity. Just upload and let our AI handle the rest.
            </p>
          </div>

          <div className="grid-3">
            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className="card card-hover" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '3rem', fontWeight: 900, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem', lineHeight: 1 }}>
                  {num}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label">Features</p>
            <h2 className="section-title">Built for Professionals, Free for Everyone</h2>
          </div>

          <div className="grid-3">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card card-hover" style={{ padding: '2rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.625rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STAR RATING ─── */}
      <section style={{ background: 'var(--bg-primary)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={28} fill="#f59e0b" color="#f59e0b" />)}
          </div>
          <p style={{ fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '0.75rem' }}>
            "Saved me hours of Photoshop work."
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>— Rated 4.9/5 by over 50,000 creators</p>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--accent)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
            <h2 style={{ color: '#fff', fontSize: '2.25rem', marginBottom: '1rem', position: 'relative' }}>
              Start Removing Backgrounds Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', fontSize: '1.0625rem', position: 'relative', fontWeight: 500 }}>
              Free to use. No sign-up. Experience the magic instantly.
            </p>
            <Link
              to="/tool"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: 'var(--accent)', padding: '0.875rem 2.5rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '1.125rem', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Upload Image <ArrowRight size={18} />
            </Link>
          </div>
          <AdBanner type="bottom" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
