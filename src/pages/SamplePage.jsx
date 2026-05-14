import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, ArrowLeft, Image as ImageIcon, Camera, Car, ShoppingBag, Palette, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SAMPLES = [
  { id: 1, category: 'People', original: 'https://res.cloudinary.com/demo/image/upload/woman.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/woman.png', title: 'Portrait Retouch' },
  { id: 2, category: 'Product', original: 'https://res.cloudinary.com/demo/image/upload/shoe.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/shoe.png', title: 'E-commerce Ready' },
  { id: 3, category: 'Car', original: 'https://res.cloudinary.com/demo/image/upload/car.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/car.png', title: 'Automotive Listing' },
  { id: 4, category: 'Animals', original: 'https://res.cloudinary.com/demo/image/upload/dog.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/dog.png', title: 'Pet Photography' },
  { id: 5, category: 'Graphics', original: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/sample.png', title: 'Logo Isolation' },
  { id: 6, category: 'Real Estate', original: 'https://res.cloudinary.com/demo/image/upload/couple.jpg', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/couple.png', title: 'Property Marketing' },
  { id: 7, category: 'People', original: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/woman.png', title: 'Professional Headshot' },
  { id: 8, category: 'Product', original: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', cutout: 'https://res.cloudinary.com/demo/image/upload/e_bgremoval/shoe.png', title: 'Product Catalog' },
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

const SamplePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const filteredSamples = activeTab === 'all' 
    ? SAMPLES 
    : SAMPLES.filter(s => s.category === activeTab);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
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
          background: '#fff',
          padding: '0.75rem',
          borderRadius: '100px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
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

        {/* Gallery Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
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
                  background: '#fff',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Image Container */}
                <div style={{ 
                  aspectRatio: '1/1', 
                  position: 'relative',
                  background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC) repeat',
                  backgroundSize: '20px 20px'
                }}>
                  {/* Original (Shows on hover) */}
                  <img 
                    src={sample.original} 
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
                    style={{ 
                      position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem',
                      zIndex: 1
                    }} 
                  />
                  
                  {/* Badge */}
                  <div style={{ 
                    position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                    background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '100px',
                    fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', backdropFilter: 'blur(10px)'
                  }}>
                    {hoveredId === sample.id ? 'BEFORE' : 'AFTER'}
                  </div>
                </div>

                {/* Info Section */}
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{sample.category}</div>
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
    </div>
  );
};

export default SamplePage;
