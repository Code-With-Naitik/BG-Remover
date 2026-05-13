import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  UploadCloud, Zap, Shield, Star, CheckCircle,
  ArrowRight, Sparkles, Image, Download, Users, MousePointer2
} from 'lucide-react';
import AdBanner from '../components/layout/AdBanner';
import { Helmet } from 'react-helmet-async';

const FEATURES = [
  {
    icon: Zap,
    color: '#2563EB',
    bg: 'rgba(37, 99, 235, 0.1)',
    title: 'Instant AI Removal',
    desc: 'Our neural networks remove backgrounds in under 3 seconds with professional precision.',
  },
  {
    icon: Image,
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.1)',
    title: 'Pixel-Perfect Edges',
    desc: 'Hair, fur, and complex transparent objects are handled with industry-leading edge detection.',
  },
  {
    icon: Shield,
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    title: 'Secure & Private',
    desc: 'Your data is safe. Images are processed over encrypted tunnels and deleted instantly after use.',
  },
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

  return (
    <>
      <Helmet>
        <title>Snaplix AI — Premium AI Background Remover</title>
        <meta name="description" content="Remove image backgrounds instantly with our premium AI-powered tool. Perfect for designers, e-commerce, and creators." />
      </Helmet>

      {/* ─── PREMIUM HERO SECTION ─── */}
      <section style={{ position: 'relative', padding: '7rem 0 10rem', background: '#FAFAFA', overflow: 'hidden' }}>
        {/* Background Decorative Blobs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>

            {/* Left Content */}
            <div className="animate-slide-up" style={{ paddingRight: '1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.6rem 1.25rem', borderRadius: '100px', color: '#4F46E5', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '2rem', border: '1px solid rgba(99, 102, 241, 0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Sparkles size={16} fill="currentColor" /> Introducing Snaplix AI 2.0
              </div>

              <h1 style={{ fontSize: 'clamp(3.5rem, 5.5vw, 4.75rem)', lineHeight: 1.05, marginBottom: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#0F172A' }}>
                Remove <br /> backgrounds <br />
                <span style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>like pure magic.</span>
              </h1>

              <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '3rem', lineHeight: 1.6, fontWeight: 500, maxWidth: '500px' }}>
                Experience the fastest, most precise AI background eraser. Turn any photo into a perfect transparent asset in under 3 seconds.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Inline Upload Zone */}
                <Link to="/tool" style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'white',
                    border: '2px dashed #CBD5E1',
                    borderRadius: '24px',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(79, 70, 229, 0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.05)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UploadCloud size={28} color="#4F46E5" />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '1.25rem', color: '#1E293B' }}>Upload an image</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>or drag and drop a file here</p>
                      </div>
                    </div>
                    <div style={{ background: '#0F172A', color: 'white', padding: '0.875rem 1.75rem', borderRadius: '14px', fontWeight: 700, fontSize: '0.9rem' }}>
                      Browse
                    </div>
                  </div>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B', fontSize: '0.875rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #FAFAFA', objectFit: 'cover' }} alt="user" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #FAFAFA', marginLeft: '-14px', objectFit: 'cover' }} alt="user" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #FAFAFA', marginLeft: '-14px', objectFit: 'cover' }} alt="user" />
                  </div>
                  <span>Trusted by <strong style={{ color: '#0F172A' }}>500,000+</strong> users globally</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visual */}
            <div className="animate-fade-in delay-200" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {/* Complex Glowing Orbs */}
              <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(236, 72, 153, 0.4))', filter: 'blur(80px)', borderRadius: '50%', animation: 'float-orb 8s ease-in-out infinite alternate', zIndex: 0 }} />
              <div style={{ position: 'absolute', width: '250px', height: '250px', right: '-10%', bottom: '-10%', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(16, 185, 129, 0.4))', filter: 'blur(60px)', borderRadius: '50%', animation: 'float-orb 10s ease-in-out infinite alternate-reverse', zIndex: 0 }} />

              {/* Main Showcase Card */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '4/5',
                borderRadius: '32px',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.5)',
                padding: '1.25rem',
                transform: 'rotate(-1.5deg) scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1)'}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC) repeat',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
                }}>

                  {/* The Image container */}
                  <div style={{ width: '100%', height: '100%', position: 'relative', background: '#FAFAFA' }}>

                    {/* --- PROCESSED SIDE (Left) --- */}

                    {/* Checkerboard Pattern */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                      backgroundColor: 'white'
                    }} />

                    {/* Transparent Subject (Always visible, sits directly on checkerboard) */}
                    <img
                      src="https://www.gstatic.com/webp/gallery3/2.png"
                      alt="Processed Subject"
                      style={{
                        width: '100%', height: '100%', objectFit: 'contain',
                        position: 'absolute', inset: 0, padding: '2rem',
                        zIndex: 5
                      }}
                    />

                    {/* --- ORIGINAL SIDE (Right) --- */}
                    {/* This container slides and clips to show the "original" photo */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      animation: 'slide-mask-vertical 4s ease-in-out infinite alternate',
                      zIndex: 10
                    }}>
                      {/* Original Colorful Background */}
                      <img
                        src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80"
                        alt="Original Background"
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          position: 'absolute', inset: 0
                        }}
                      />
                      {/* Original Subject (Exactly matching the processed one) */}
                      <img
                        src="https://www.gstatic.com/webp/gallery3/2.png"
                        alt="Original Subject"
                        style={{
                          width: '100%', height: '100%', objectFit: 'contain',
                          position: 'absolute', inset: 0, padding: '2rem'
                        }}
                      />
                    </div>
                  </div>

                </div>

                {/* Floating Badge 1: Pixel Perfect */}
                <div style={{ position: 'absolute', top: '15%', right: '-15%', background: 'white', padding: '0.875rem 1.25rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.875rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', zIndex: 30, animation: 'float-up-down 5s ease-in-out infinite' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={16} color="white" />
                  </div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: '#1E293B' }}>Edge Detection</p>
                </div>

                {/* Floating Badge 2: Processing Time */}
                <div style={{ position: 'absolute', bottom: '20%', left: '-15%', background: 'white', padding: '0.875rem 1.25rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.875rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', zIndex: 30, animation: 'float-up-down 6s ease-in-out infinite 1s' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} color="white" />
                  </div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: '#1E293B' }}>1.2s Processing</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Global Keyframes for Hero Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes float-orb {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
            100% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes slide-line-vertical {
            0% { left: 10%; }
            100% { left: 90%; }
          }
          @keyframes slide-mask-vertical {
            0% { clip-path: inset(0 0 0 10%); }
            100% { clip-path: inset(0 0 0 90%); }
          }
          @keyframes float-up-down {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}} />
      </section>

      {/* ─── SOLUTIONS SECTION (SLAZZER STYLE) ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Built for Every Workflow</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Whether you are an e-commerce seller or a professional photographer, we have the solution for you.
            </p>
          </div>

          <div className="grid-3">
            {[
              { title: 'For E-commerce', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', desc: 'Create studio-quality product photos for Amazon, Shopify, and eBay in seconds.' },
              { title: 'For Real Estate', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', desc: 'Replace overcast skies or remove distracting objects from property photos.' },
              { title: 'For Car Dealers', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80', desc: 'Create professional car listings with clean, dealership-style backgrounds.' },
            ].map((item, i) => (
              <div key={i} className="card card-hover" style={{ overflow: 'hidden', background: 'white', borderRadius: '32px', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── API & PLUGINS SECTION ─── */}
      <section style={{ padding: '8rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '12px', color: '#2563eb', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                <Zap size={14} fill="currentColor" /> DEVELOPER FRIENDLY
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Automate Your Workflow <br /> with <span className="gradient-text">Powerful APIs</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                Integrate Snaplix AI directly into your apps, websites, or design tools. High-speed processing with 99.9% uptime.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> REST API
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> SDK for JS/Python
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> Figma Plugin
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> PS Extension
                </div>
              </div>
              <button className="btn btn-outline btn-xl">Explore API Docs</button>
            </div>

            <div style={{ background: '#0f172a', padding: '3rem', borderRadius: '40px', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <code style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.8, display: 'block', fontFamily: 'monospace' }}>
                <span style={{ color: '#818cf8' }}>const</span> response = <span style={{ color: '#fbbf24' }}>await</span> snaplix.removeBackground(&#123;<br />
                &nbsp;&nbsp;image: <span style={{ color: '#10b981' }}>'product_photo.jpg'</span>,<br />
                &nbsp;&nbsp;format: <span style={{ color: '#10b981' }}>'png'</span>,<br />
                &nbsp;&nbsp;hd: <span style={{ color: '#fbbf24' }}>true</span><br />
                &#125;);<br /><br />
                console.log(<span style={{ color: '#10b981' }}>'Magic completed! ✨'</span>);
              </code>
              {/* Background glow */}
              <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', zIndex: 0 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Professional Grade Results</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Built for photographers, e-commerce stores, and digital artists who demand the highest quality.
            </p>
          </div>

          <div className="grid-3">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card card-hover" style={{ padding: '3rem 2rem', borderRadius: '24px', border: 'none', background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <Icon size={28} color={color} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPLOAD BOX (CENTERED) ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Ready to try it?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Experience the magic of Snaplix AI instantly.</p>
          </div>

          <Link to="/tool" style={{ textDecoration: 'none' }}>
            <div
              className="card-hover"
              style={{
                padding: '5rem 2rem',
                background: 'white',
                borderRadius: '24px',
                border: '2px dashed var(--border-hover)',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: '80px', height: '80px', background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <UploadCloud size={40} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Drop your image here</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2.5rem' }}>or click to browse your files</p>
              <button className="btn btn-primary btn-xl" style={{ borderRadius: '12px' }}>Upload Image</button>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS GRID ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Loved by 10,000+ Creators</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Join thousands of professionals who have already switched to Snaplix for their design workflow.
            </p>
          </div>

          <div className="grid-3">
            {[
              { name: 'Sarah Jenkins', role: 'E-commerce Seller', text: 'This tool saved me hours of manual clipping. The edge detection is scary good, even for complex hair!', initials: 'SJ' },
              { name: 'Marcus Chen', role: 'Graphic Designer', text: 'The HD quality is actually HD. No artifacts, just clean transparent backgrounds. My new go-to tool.', initials: 'MC' },
              { name: 'Elena Rodriguez', role: 'Social Media Manager', text: 'Processing 20+ images a day used to be a chore. Now it takes me seconds. Highly recommended!', initials: 'ER' },
            ].map(t => (
              <div key={t.name} className="card card-hover" style={{ padding: '2.5rem', borderRadius: '32px', background: 'white', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic', fontWeight: 500 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', fontWeight: 900 }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '1rem', margin: 0, color: 'var(--text-primary)' }}>{t.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, fontWeight: 600 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--accent-gradient)',
              borderRadius: '40px',
              padding: '6rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(37, 99, 235, 0.4)'
            }}
          >
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

            <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', position: 'relative', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Create Stunning <br /> Visuals Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.375rem', maxWidth: '600px', margin: '0 auto 4rem', position: 'relative', fontWeight: 500, lineHeight: 1.6 }}>
              Join over 500,000 users who trust Snaplix for their design workflow. Start removing backgrounds for free.
            </p>
            <Link
              to="/tool"
              className="btn btn-primary btn-xl"
              style={{ background: '#fff', color: 'var(--accent)', borderRadius: '16px', position: 'relative', padding: '1.25rem 4rem', fontSize: '1.25rem', fontWeight: 800 }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Started for Free <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
