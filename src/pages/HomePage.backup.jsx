import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    glow: 'rgba(37,99,235,0.25)',
    stat: '<3s',
    statLabel: 'Processing Speed',
    title: 'Instant AI Removal',
    desc: 'Our neural networks remove backgrounds in under 3 seconds with professional precision — even for complex hair and fur.',
  },
  {
    icon: Image,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    glow: 'rgba(139,92,246,0.25)',
    stat: '99.9%',
    statLabel: 'Edge Accuracy',
    title: 'Pixel-Perfect Edges',
    desc: 'Hair strands, transparent glass, and fur coats — our AI handles every fine detail other tools miss entirely.',
  },
  {
    icon: Shield,
    gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
    glow: 'rgba(16,185,129,0.25)',
    stat: '0ms',
    statLabel: 'Data Retention',
    title: 'Secure & Private',
    desc: 'Your images are encrypted in transit and permanently deleted immediately after processing. Zero data stored.',
  },
];

// Animated counter hook
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
};

const STATS = [
  { target: 10, suffix: 'M+', label: 'Backgrounds Removed' },
  { target: 500, suffix: 'K+', label: 'Happy Users' },
  { target: 4.9, suffix: '★', label: 'Average Rating', isDecimal: true },
];

const StatItem = ({ target, suffix, label, isDecimal }) => {
  const { count, ref } = useCountUp(isDecimal ? target * 10 : target, 1800);
  const display = isDecimal ? (count / 10).toFixed(1) : count;
  return (
    <div ref={ref} style={{ background: 'var(--bg-card)', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {display}{suffix}
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
    </div>
  );
};

const UploadZone = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');

  const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_MB = 20;

  const processFile = useCallback((file) => {
    setError('');
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError('Unsupported format. Please upload JPG, PNG, WebP or GIF.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Max size is ${MAX_MB}MB.`);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileInfo({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB', type: file.type.split('/')[1].toUpperCase() });
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleFileInput = (e) => processFile(e.target.files[0]);
  const handleClick = () => fileInputRef.current?.click();
  const handleReset = () => { setPreview(null); setFileInfo(null); setError(''); };
  const handleProceed = () => navigate('/tool');

  return (
    <section style={{ padding: '7rem 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: '860px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', padding: '0.4rem 1.1rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <UploadCloud size={14} /> Upload & Remove
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Drop Your Image,{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get Magic Results</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Upload any photo and our AI removes the background instantly — no editing skills required.
          </p>
        </div>

        {/* Drop Zone */}
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={handleFileInput} />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!preview ? handleClick : undefined}
          style={{
            background: isDragging ? 'var(--accent-light)' : 'var(--bg-card)',
            border: `2px dashed ${isDragging ? 'var(--accent)' : preview ? 'var(--success)' : 'var(--border-hover)'}`,
            borderRadius: '28px',
            padding: preview ? '2rem' : '4rem 2rem',
            textAlign: 'center',
            cursor: preview ? 'default' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDragging ? 'var(--shadow-glow)' : 'var(--shadow-md)',
          }}
        >
          {/* Inner glow when dragging */}
          {isDragging && <div style={{ position: 'absolute', inset: 0, background: 'var(--accent-gradient)', opacity: 0.04, borderRadius: '26px', pointerEvents: 'none' }} />}

          {!preview ? (
            <>
              {/* Upload Icon */}
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: isDragging ? 'var(--accent)' : 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', transition: 'all 0.3s ease', boxShadow: isDragging ? 'var(--shadow-glow)' : 'none' }}>
                <UploadCloud size={44} color={isDragging ? '#fff' : 'var(--accent)'} strokeWidth={1.5} />
              </div>

              <h3 style={{ fontSize: '1.625rem', fontWeight: 900, marginBottom: '0.6rem', color: isDragging ? 'var(--accent)' : 'var(--text-primary)' }}>
                {isDragging ? '🎯 Release to upload!' : 'Drag & drop your image here'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                or <span style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>browse from your device</span>
              </p>

              {/* Format chips */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {['JPG', 'PNG', 'WebP', 'GIF'].map(f => (
                  <span key={f} style={{ padding: '0.3rem 0.85rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{f}</span>
                ))}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>· Max 20MB</span>
              </div>

              <button className="btn btn-gradient btn-xl" style={{ borderRadius: '16px', padding: '1rem 3rem', fontSize: '1.0625rem', pointerEvents: 'none' }}>
                <UploadCloud size={20} /> Choose Image
              </button>
            </>
          ) : (
            /* Preview State */
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'center', textAlign: 'left' }}>
              {/* Thumbnail */}
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1', background: 'var(--bg-secondary)', boxShadow: 'var(--shadow-lg)' }}>
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 60%, rgba(16,185,129,0.4) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: '#10B981', borderRadius: '100px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle size={11} /> Ready
                </div>
              </div>

              {/* File Info & Actions */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16,185,129,0.12)', color: '#10B981', padding: '0.3rem 0.85rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                  <CheckCircle size={13} /> Image Ready
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem', wordBreak: 'break-all' }}>{fileInfo?.name}</h4>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{fileInfo?.type}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>·</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{fileInfo?.size}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={handleProceed} className="btn btn-gradient" style={{ borderRadius: '12px', padding: '0.75rem 1.75rem', fontSize: '0.9375rem' }}>
                    <Zap size={16} /> Remove Background
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="btn btn-outline" style={{ borderRadius: '12px', padding: '0.75rem 1.25rem', fontSize: '0.9375rem' }}>
                    ✕ Change Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div style={{ marginTop: '1rem', padding: '0.875rem 1.25rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', color: '#EF4444', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Trust row */}
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { icon: '🔒', text: '100% Secure & Private' },
            { icon: '⚡', text: 'Results in under 3s' },
            { icon: '✨', text: 'Free to start' },
          ].map(t => (
            <span key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {t.icon} {t.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      <section style={{ position: 'relative', padding: '7rem 0 10rem', overflow: 'hidden', background: 'var(--bg-primary)' }}>
        {/* Background Decorative Blobs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>

            {/* Left Content */}
            <div className="animate-slide-up" style={{ paddingRight: '1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', padding: '0.6rem 1.25rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8125rem', marginBottom: '2rem', border: '1px solid var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Sparkles size={16} fill="currentColor" /> Introducing Snaplix AI 2.0
              </div>

              <h1 style={{ fontSize: 'clamp(3.5rem, 5.5vw, 4.75rem)', lineHeight: 1.05, marginBottom: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                Remove <br /> backgrounds <br />
                <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>like pure magic.</span>
              </h1>

              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, fontWeight: 500, maxWidth: '500px' }}>
                Experience the fastest, most precise AI background eraser. Turn any photo into a perfect transparent asset in under 3 seconds.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Inline Upload Zone */}
                <Link to="/tool" style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '2px dashed var(--border-color)',
                    borderRadius: '24px',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: 'var(--shadow-md)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '56px', height: '56px', background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UploadCloud size={28} color="var(--accent)" />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Upload an image</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>or drag and drop a file here</p>
                      </div>
                    </div>
                    <div style={{ background: 'var(--accent)', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '14px', fontWeight: 700, fontSize: '0.9rem' }}>
                      Browse
                    </div>
                  </div>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--bg-card)', objectFit: 'cover' }} alt="user" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--bg-card)', marginLeft: '-14px', objectFit: 'cover' }} alt="user" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--bg-card)', marginLeft: '-14px', objectFit: 'cover' }} alt="user" />
                  </div>
                  <span>Trusted by <strong style={{ color: 'var(--text-primary)' }}>500,000+</strong> users globally</span>
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
                <div style={{ position: 'absolute', top: '15%', right: '-15%', background: 'var(--bg-card)', padding: '0.875rem 1.25rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.875rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', zIndex: 30, animation: 'float-up-down 5s ease-in-out infinite' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={16} color="white" />
                  </div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Edge Detection</p>
                </div>

                {/* Floating Badge 2: Processing Time */}
                <div style={{ position: 'absolute', bottom: '20%', left: '-15%', background: 'var(--bg-card)', padding: '0.875rem 1.25rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.875rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', zIndex: 30, animation: 'float-up-down 6s ease-in-out infinite 1s' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} color="white" />
                  </div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>1.2s Processing</p>
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
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Built for Every Workflow</h2>
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
              <div key={i} className="card card-hover" style={{
                overflow: 'hidden',
                background: 'var(--bg-card)',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
              }}>
                <div style={{ height: '220px', overflow: 'hidden', borderRadius: '24px 24px 0 0', flexShrink: 0 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.75rem 2rem 2rem', flex: 1 }}>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9875rem', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS SECTION ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0%', left: '-5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', padding: '0.5rem 1.25rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Sparkles size={14} /> Simple 3-Step Process
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Remove Any Background in <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3 Seconds</span>
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              No design skills needed. Our AI does the heavy lifting — pixel-perfect results every single time.
            </p>
          </div>

          {/* Steps Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative' }}>
            {/* Connector Lines */}
            <div style={{ position: 'absolute', top: '4.5rem', left: 'calc(33.33% - 1rem)', width: 'calc(33.33% + 2rem)', height: '2px', background: 'linear-gradient(90deg, var(--accent) 0%, var(--border-color) 100%)', zIndex: 0, opacity: 0.4 }} />
            <div style={{ position: 'absolute', top: '4.5rem', left: 'calc(66.66% - 1rem)', width: 'calc(33.33% + 2rem)', height: '2px', background: 'linear-gradient(90deg, var(--border-color) 0%, #06B6D4 100%)', zIndex: 0, opacity: 0.4 }} />

            {/* Step 1 */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '2.5rem 2rem', position: 'relative', zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
                <UploadCloud size={32} color="#fff" />
              </div>
              <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '4rem', fontWeight: 900, color: 'var(--border-color)', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>01</div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Upload Your Image</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9875rem', margin: 0 }}>
                Drag & drop or click to upload any JPG, PNG, or WebP image. Supports up to 25MP resolution for crystal-clear results.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700, fontSize: '0.875rem' }}>
                <CheckCircle size={16} /> JPG, PNG, WebP supported
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '2.5rem 2rem', position: 'relative', zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 8px 24px rgba(139,92,246,0.35)' }}>
                <Zap size={32} color="#fff" />
              </div>
              <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '4rem', fontWeight: 900, color: 'var(--border-color)', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>02</div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>AI Removes Background</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9875rem', margin: 0 }}>
                Our neural network detects every strand of hair, fur, and fine edge — delivering a flawless cutout in under 3 seconds.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#8B5CF6', fontWeight: 700, fontSize: '0.875rem' }}>
                <Zap size={16} /> Processing in &lt;3 seconds
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '2.5rem 2rem', position: 'relative', zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
                <Download size={32} color="#fff" />
              </div>
              <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '4rem', fontWeight: 900, color: 'var(--border-color)', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>03</div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Download & Use</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9875rem', margin: 0 }}>
                Download your transparent PNG instantly. Use it for e-commerce, social media, presentations, or any creative project.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 700, fontSize: '0.875rem' }}>
                <Download size={16} /> Free HD PNG download
              </div>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link to="/tool" className="btn btn-gradient btn-xl" style={{ borderRadius: '16px', padding: '1rem 3rem', fontSize: '1.0625rem' }}>
              Try It Free Now <ArrowRight size={20} />
            </Link>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No account required · 100% free to start</p>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', padding: '0.4rem 1rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Star size={13} fill="currentColor" /> Why Snaplix AI
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Professional Grade <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Results</span>
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7 }}>
                Built for photographers, e-commerce stores, and digital artists who demand the highest quality.
              </p>
            </div>
            <Link to="/tool" className="btn btn-primary" style={{ whiteSpace: 'nowrap', borderRadius: '14px' }}>
              Try For Free <ArrowRight size={16} />
            </Link>
          </div>

          {/* Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {FEATURES.map(({ icon: Icon, gradient, glow, stat, statLabel, title, desc }) => (
              <div key={title} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '28px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px -12px ${glow}`;
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                {/* Top glow blob */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: gradient, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.2, pointerEvents: 'none' }} />

                {/* Icon circle */}
                <div style={{ width: '68px', height: '68px', borderRadius: '20px', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem', boxShadow: `0 8px 20px ${glow}` }}>
                  <Icon size={30} color="#fff" strokeWidth={2} />
                </div>

                {/* Stat badge */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, display: 'block' }}>{stat}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{statLabel}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom stats strip */}
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-color)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            {STATS.map(s => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPLOAD ZONE SECTION ─── */}
      <UploadZone />

      {/* ─── TESTIMONIALS GRID ─── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '1.25rem' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={22} fill="#F59E0B" color="#F59E0B" />)}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              What Our Users Are Saying
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Thousands of creators, sellers, and designers trust Snaplix AI every single day.
            </p>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { role: 'E-commerce Seller', badge: '#2563EB', text: 'This tool saved me hours of manual clipping. The edge detection is scary good, even for complex hair and fine details!' },
              { role: 'Graphic Designer', badge: '#8B5CF6', text: 'The HD quality is actually HD. No artifacts, no fringing — just clean transparent backgrounds. My new go-to tool.' },
              { role: 'Social Media Manager', badge: '#10B981', text: 'Processing 20+ product images a day used to be a chore. Now it takes me seconds. Highly recommended!' },
            ].map((t, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '2.25rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 40px -12px ${t.badge}40`; e.currentTarget.style.borderColor = t.badge + '55'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                {/* Decorative quote mark */}
                <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '5rem', lineHeight: 1, color: t.badge, opacity: 0.12, fontFamily: 'Georgia, serif', fontWeight: 900, pointerEvents: 'none' }}>"</div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />)}
                </div>

                {/* Quote */}
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '1.75rem', fontStyle: 'italic', fontWeight: 500 }}>
                  "{t.text}"
                </p>

                {/* Role badge only — no name */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '100px', background: t.badge + '18', border: `1px solid ${t.badge}30` }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: t.badge, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: t.badge }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(ellipse, var(--accent-light) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            background: 'var(--accent-gradient)',
            borderRadius: '36px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--shadow-glow-lg)',
          }}>
            {/* Mesh grid overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
            {/* Glow orbs */}
            <div style={{ position: 'absolute', top: '-30%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', position: 'relative', zIndex: 1 }}>
              {/* LEFT — CTA content */}
              <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.4rem 1rem', borderRadius: '100px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', width: 'fit-content' }}>
                  <Sparkles size={13} fill="currentColor" /> Start for Free Today
                </div>

                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Remove Backgrounds<br />
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>Like a Professional</span>
                </h2>

                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '400px' }}>
                  Join 500,000+ creators who use Snaplix AI to create pixel-perfect transparent images in seconds — no skills needed.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <Link to="/tool" className="btn btn-xl" style={{ background: '#fff', color: 'var(--accent)', borderRadius: '14px', padding: '1rem 2rem', fontWeight: 800, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                  >
                    <UploadCloud size={20} /> Upload Image Free
                  </Link>
                  <Link to="/pricing" className="btn btn-xl" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '14px', padding: '1rem 2rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  >
                    View Pricing <ArrowRight size={18} />
                  </Link>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {['No credit card', 'Free forever plan', '5 free images/day'].map(t => (
                    <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                      <CheckCircle size={14} color="#fff" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT — Stats panel */}
              <div style={{ padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.15)' }}>
                {[
                  { label: 'Backgrounds Removed', value: '10M+', icon: '🖼️' },
                  { label: 'Processing Speed', value: '< 3 sec', icon: '⚡' },
                  { label: 'Edge Accuracy', value: '99.9%', icon: '✂️' },
                  { label: 'Happy Users', value: '500K+', icon: '❤️' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.12)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.2s', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.375rem', flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</div>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.8)', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
