import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, ArrowLeft, Image as ImageIcon, Camera, Car, ShoppingBag, Palette, Home, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SAMPLES = [
  { id: 1, category: 'People', original: 'https://res.cloudinary.com/demo/image/upload/woman.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/woman.png', title: 'Portrait Retouch' },
  { id: 2, category: 'Product', original: 'https://res.cloudinary.com/demo/image/upload/shoe.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/shoe.png', title: 'E-commerce Ready' },
  { id: 3, category: 'Car', original: 'https://res.cloudinary.com/demo/image/upload/car.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/car.png', title: 'Automotive Listing' },
  { id: 4, category: 'Animals', original: 'https://res.cloudinary.com/demo/image/upload/dog.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/dog.png', title: 'Pet Photography' },
  { id: 5, category: 'Graphics', original: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/sample.png', title: 'Logo Isolation' },
  { id: 6, category: 'Real Estate', original: 'https://res.cloudinary.com/demo/image/upload/couple.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/couple.png', title: 'Property Marketing' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Samples', icon: <Sparkles size={16} /> },
  { id: 'People', label: 'People', icon: <Camera size={16} /> },
  { id: 'Product', label: 'Product', icon: <ShoppingBag size={16} /> },
  { id: 'Car', label: 'Cars', icon: <Car size={16} /> },
  { id: 'Animals', label: 'Animals', icon: <ImageIcon size={16} /> },
  { id: 'Graphics', label: 'Graphics', icon: <Palette size={16} /> },
  { id: 'Real Estate', label: 'Real Estate', icon: <Home size={16} /> },
];

const SERVER_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

const resolveImg = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads/')) return `${SERVER_BASE}${url}`;
  return url;
};

const SamplePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [dbSamples, setDbSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        let galleryData = [];
        if (token === 'mock_token') {
          galleryData = JSON.parse(localStorage.getItem('mock_gallery')) || [];
        } else {
          try {
            const res = await axios.get('/api/gallery', { timeout: 2000 });
            galleryData = res.data.data;
          } catch (e) {
            galleryData = JSON.parse(localStorage.getItem('mock_gallery')) || [];
          }
        }
        
        const formatted = galleryData.map(item => ({
          id: item._id,
          category: item.category || 'People',
          original: resolveImg(item.beforeImage),
          cutout: resolveImg(item.afterImage),
          title: item.title
        }));
        setDbSamples(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [token]);

  const allSamples = [...dbSamples, ...SAMPLES];

  const filteredSamples = activeTab === 'all' 
    ? allSamples 
    : allSamples.filter(s => s.category === activeTab);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Explore Our <span style={{ color: 'var(--accent)' }}>Magic</span> Gallery
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Browse high-quality examples of background removal across different categories. Pixel-perfect results in seconds.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '4rem', 
          flexWrap: 'wrap',
          background: 'var(--bg-card)',
          padding: '0.75rem',
          borderRadius: '100px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          width: 'fit-content',
          margin: '0 auto 4rem auto'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                border: 'none',
                background: activeTab === cat.id ? 'var(--accent)' : 'transparent',
                color: activeTab === cat.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <Loader2 className="animate-spin" size={48} color="var(--accent)" />
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            <AnimatePresence mode="popLayout">
              {filteredSamples.map((sample) => (
                <motion.div
                  key={sample.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(sample.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                >
                  {/* Image Container */}
                  <div style={{ 
                    aspectRatio: '1/1', 
                    position: 'relative',
                    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC) repeat',
                    backgroundSize: '20px 20px',
                    overflow: 'hidden'
                  }}>
                    {/* Dark mode checkerboard overlay for contrast */}
                    <div className="dark-only-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', pointerEvents: 'none', zIndex: 0 }} />
                    
                    {/* Original (Shows on hover) */}
                    <img 
                      src={sample.original} 
                      alt="Original"
                      style={{ 
                        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                        opacity: hoveredId === sample.id ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 2
                      }} 
                    />
                    {/* Cutout */}
                    <img 
                      src={sample.cutout} 
                      alt="Cutout"
                      style={{ 
                        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem',
                        zIndex: 1
                      }} 
                    />
                    
                    {/* Badge */}
                    <div style={{ 
                      position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                      background: 'var(--bg-primary)', padding: '0.4rem 1rem', borderRadius: '100px',
                      fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', 
                      border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)'
                    }}>
                      {hoveredId === sample.id ? 'BEFORE' : 'AFTER'}
                    </div>
                  </div>

                {/* Info Section */}
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{sample.category}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{sample.title}</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        )}

        {/* CTA Section */}
        <div style={{ 
          marginTop: '6rem', 
          background: 'var(--accent-gradient)', 
          borderRadius: '40px', 
          padding: '5rem 2rem', 
          textAlign: 'center',
          color: '#fff',
          boxShadow: '0 20px 50px rgba(37,99,235,0.2)'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Ready to remove backgrounds?</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Join thousands of users and start creating pixel-perfect images today.
          </p>
          <Link to="/tool" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
            background: '#fff', color: 'var(--accent)', padding: '1.25rem 2.5rem', 
            borderRadius: '100px', fontWeight: 800, textDecoration: 'none',
            fontSize: '1.1rem', transition: 'transform 0.2s'
          }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            Try It Now For Free <ArrowLeft style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </div>
      </div>

      <style>{`
        [data-theme='dark'] .dark-only-overlay {
          display: block;
        }
        [data-theme='light'] .dark-only-overlay {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SamplePage;
