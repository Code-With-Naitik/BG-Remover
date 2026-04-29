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

      {/* ─── HERO SECTION (SLAZZER STYLE SPLIT) ─── */}
      <section style={{ padding: '6rem 0 8rem', background: 'white', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left side: Content */}
            <div className="animate-slide-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '1.5rem', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                <Sparkles size={14} fill="currentColor" /> OVER 10 MILLION IMAGES PROCESSED
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                Remove Image Background <br /> <span className="gradient-text">Automatically in 3s</span>
              </h1>
              <p style={{ fontSize: '1.375rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.5, fontWeight: 500, maxWidth: '600px' }}>
                The smartest AI tool to remove backgrounds for e-commerce, photographers, and creators. 100% free and pixel-perfect.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/tool" className="btn btn-gradient btn-xl animate-pulse-glow" style={{ borderRadius: '16px', padding: '1.25rem 3.5rem', fontSize: '1.25rem', boxShadow: '0 15px 35px rgba(37, 99, 235, 0.4)' }}>
                  Upload Image <ArrowRight size={22} />
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', gap: '2px' }}>
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                   </div>
                   <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>4.9/5 by 500k+ Users</span>
                </div>
              </div>

              {/* Trust Logos */}
              <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '2.5rem', opacity: 0.5, filter: 'grayscale(100%)' }}>
                 <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ height: '24px' }} />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Shopify_logo_2018.svg" alt="Shopify" style={{ height: '28px' }} />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/EBay_logo.svg" alt="eBay" style={{ height: '28px' }} />
              </div>
            </div>

            {/* Right side: Interactive Mockup */}
            <div className="animate-fade-in delay-200" style={{ position: 'relative' }}>
              <div 
                style={{ 
                  position: 'relative', zIndex: 1, borderRadius: '40px', overflow: 'hidden', 
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)', border: '12px solid white',
                  background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)',
                  backgroundRepeat: 'repeat'
                }}
              >
                 <img 
                   src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" 
                   alt="Before After Mockup"
                   style={{ width: '100%', height: 'auto', display: 'block' }}
                 />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(255,255,255,0.1) 50%)' }} />
                 {/* Floating Badge */}
                 <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '0.75rem 1.25rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={18} color="white" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>BG REMOVED</p>
                      <p style={{ margin: 0, fontSize: '0.625rem', color: 'var(--text-muted)' }}>IN 1.2 SECONDS</p>
                    </div>
                 </div>
              </div>
              
              {/* Decorative elements */}
              <div style={{ position: 'absolute', zIndex: -1, top: '-10%', right: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)', opacity: 0.5 }} />
            </div>
          </div>
        </div>
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
