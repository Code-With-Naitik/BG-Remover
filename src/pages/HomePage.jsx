import React from 'react';
import { Link } from 'react-router-dom';
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

const STATS = [
  { value: '10M+', label: 'Images Processed' },
  { value: '500K+', label: 'Happy Users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<3s', label: 'Avg. Processing' },
];

const STEPS = [
  { num: '01', title: 'Upload Your Image', desc: 'Drag & drop or click to browse. Supports JPG, PNG, and WEBP up to 10 MB.' },
  { num: '02', title: 'AI Removes Background', desc: 'Our AI model analyzes your image and precisely removes the background in seconds.' },
  { num: '03', title: 'Download & Use', desc: 'Get a crisp transparent PNG ready to use in any design tool, e-commerce store, or app.' },
];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>BGRemover Pro — Free AI Background Remover Online</title>
        <meta name="description" content="Remove image backgrounds instantly with our free AI-powered tool. Perfect for e-commerce, marketing, and social media. Get transparent PNGs in seconds — no sign-up needed." />
        <meta property="og:title" content="BGRemover Pro — Free AI Background Remover" />
        <meta property="og:description" content="Remove backgrounds from images instantly using AI. Free, fast, and pixel-perfect." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "BGRemover Pro",
          "description": "AI-powered image background remover",
          "applicationCategory": "DesignApplication",
          "offers": { "@type": "Offer", "price": "0" }
        })}</script>
      </Helmet>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 5rem' }}>
        {/* Glow Orbs */}
        <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'var(--accent)', top: '-200px', left: '-100px' }} />
        <div className="glow-orb" style={{ width: '500px', height: '500px', background: '#a855f7', bottom: '-200px', right: '-100px', opacity: 0.25 }} />

        <div className="container" style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Pill badge */}
          <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'var(--accent-light)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 'var(--radius-full)', marginBottom: '2rem', cursor: 'default' }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--success)' }} />
            <Sparkles size={13} color="var(--accent)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>AI v2.0 — 2× More Accurate</span>
          </div>

          <h1 className="animate-slide-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            Remove Image Backgrounds<br />
            <span className="gradient-text-vibrant">Automatically & Free</span>
          </h1>

          <p className="animate-slide-up delay-100" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 3rem' }}>
            Drop in any photo — our AI removes the background in under 3 seconds with pixel-perfect precision. No Photoshop. No sign-up.
          </p>

          {/* Upload CTA Card */}
          <div className="animate-slide-up delay-200">
            <Link to="/tool" style={{ textDecoration: 'none' }}>
              <div
                className="animate-pulse-glow"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '2.5rem 3rem',
                  background: 'var(--bg-card)',
                  border: '2px dashed var(--accent)',
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'pointer',
                  maxWidth: '420px',
                  width: '100%',
                  margin: '0 auto',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-light)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-card)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(99,102,241,0.4)' }}>
                  <UploadCloud size={30} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                    Upload an Image
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    or drag and drop • JPG, PNG, WEBP up to 10 MB
                  </p>
                </div>
                <div className="btn btn-gradient btn-lg" style={{ width: '100%' }}>
                  Remove Background Free <ArrowRight size={18} />
                </div>
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
                <Icon size={16} color="var(--success)" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {STATS.map(({ value, label }) => (
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
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
            <h2 style={{ color: '#fff', fontSize: '2.25rem', marginBottom: '1rem', position: 'relative' }}>
              Start Removing Backgrounds Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.0625rem', position: 'relative' }}>
              Free to use. No sign-up. 5 images a day at no cost.
            </p>
            <Link
              to="/tool"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: 'var(--accent)', padding: '0.875rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.2)', textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Try it Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
