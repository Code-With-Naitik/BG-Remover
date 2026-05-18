import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Users, Camera, Megaphone, Code2, ShoppingCart, Building2, MousePointer2 } from 'lucide-react';

const SERVER_BASE = (() => {
  const env = import.meta.env.VITE_API_URL || '';
  return env ? env.replace('/api', '') : 'http://localhost:5000';
})();

const resolveImg = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return `${SERVER_BASE}${url}`;
  return url;
};

/* ─── ANNOUNCEMENT BANNER ─────────────────────────────────── */
const MSGS = [
  { text: 'AI upscale & enhance — sharpen any photo instantly.', cta: 'Try Free', href: '/tool' },
  { text: 'Remove backgrounds 100% automatically in under 3 seconds.', cta: 'Start Now', href: '/tool' },
  { text: 'HD transparent PNGs — no watermark, no signup needed.', cta: 'Get Started', href: '/tool' },
  { text: '5 free background removals every day — completely free!', cta: 'Sign Up', href: '/signup' },
];

export const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % MSGS.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;
  const { text, cta, href } = MSGS[idx];

  return (
    <div style={{ background: 'linear-gradient(90deg,#2563EB 0%,#06B6D4 100%)', color: '#fff', padding: '0.55rem 1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, position: 'relative', zIndex: 90 }}>
      <span style={{ opacity: 0.92 }}>{text} </span>
      <Link to={href} style={{ color: '#fff', fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: '3px' }}>{cta} →</Link>
      <button onClick={() => setVisible(false)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <X size={15} />
      </button>
    </div>
  );
};

/* ─── BEFORE / AFTER SLIDER ──────────────────────────────── */
// Before = original photo with background
// After  = real transparent background (from same image)
const FALLBACK = [
  {
    category: 'People',
    before: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/girl-2.jpg',
    after: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/girl-2.out.png',
  },
  {
    category: 'Product',
    before: 'https://res.cloudinary.com/demo/image/upload/shoes.jpg',
    after: 'https://res.cloudinary.com/demo/image/upload/shoes.png',
  },
  {
    category: 'Car',
    before: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/car-1.jpg',
    after: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/car-1.out.png',
  },
  {
    category: 'Animals',
    before: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/animal-1.jpg',
    after: 'https://raw.githubusercontent.com/danielgatis/rembg/main/examples/animal-1.out.png',
  },
  {
    category: 'Graphics',
    before: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80',
    after: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80',
  },
  {
    category: 'Real Estate',
    before: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80',
    after: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80',
  },
];

const SliderWidget = ({ before, after, isBackendImage }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) updatePos(e.touches ? e.touches[0].clientX : e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updatePos]);

  const checkerStyle = {
    backgroundImage: 'linear-gradient(45deg,#d1d5db 25%,transparent 25%),linear-gradient(-45deg,#d1d5db 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#d1d5db 75%),linear-gradient(-45deg,transparent 75%,#d1d5db 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
    backgroundColor: '#f1f5f9',
  };

  // CSS radial mask: for fallback images, fade edges to show checkerboard
  // For real backend images (actual transparent PNGs), skip masking
  const afterMaskStyle = isBackendImage ? {} : {
    WebkitMaskImage: 'radial-gradient(ellipse 72% 80% at 50% 45%, black 50%, rgba(0,0,0,0.5) 68%, transparent 88%)',
    maskImage: 'radial-gradient(ellipse 72% 80% at 50% 45%, black 50%, rgba(0,0,0,0.5) 68%, transparent 88%)',
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', userSelect: 'none', cursor: 'ew-resize', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
    >
      {/* After side: checkerboard + masked image = simulates transparent background */}
      <div style={{ position: 'absolute', inset: 0, ...checkerStyle }} />
      <div style={{ position: 'absolute', inset: 0, ...afterMaskStyle }}>
        <img
          src={resolveImg(after)}
          alt="After"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
          onError={e => e.target.style.opacity = '0'}
        />
      </div>

      {/* Before side: original image, clipped to left of divider */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={resolveImg(before)} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} onError={e => e.target.style.opacity = '0'} />
      </div>

      {/* Labels */}
      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', pointerEvents: 'none', opacity: pos > 12 ? 1 : 0, transition: 'opacity 0.15s' }}>BEFORE</span>
      <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#2563EB', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', pointerEvents: 'none', opacity: pos < 88 ? 1 : 0, transition: 'opacity 0.15s' }}>BG REMOVED ✓</span>

      {/* Divider + Handle */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: '3px', background: '#fff', boxShadow: '0 0 8px rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '44px', height: '44px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5"><path d="M8 4l-4 8 4 8M16 4l4 8-4 8" /></svg>
        </div>
      </div>
    </div>
  );
};

export const BeforeAfterSlider = ({ gallery = [], showTabs = true, fixedIndex = null }) => {
  const categories = FALLBACK.map(f => f.category);
  const [active, setActive] = useState(fixedIndex !== null ? fixedIndex : 0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (fixedIndex !== null) setActive(fixedIndex);
  }, [fixedIndex]);

  const getImages = (idx) => {
    const cat = categories[idx];
    const match = gallery.find(g => g.category?.toLowerCase() === cat?.toLowerCase());
    if (match) return { before: resolveImg(match.beforeImage), after: resolveImg(match.afterImage), isBackendImage: true };

    const fallback = FALLBACK[idx];
    const isPng = fallback.after.toLowerCase().endsWith('.png') || fallback.after.includes('.out.png');
    return { before: fallback.before, after: fallback.after, isBackendImage: isPng };
  };

  const { before, after, isBackendImage } = getImages(active);

  return (
    <div style={{ width: '100%' }}>
      {showTabs && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', padding: '0.25rem' }}>
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActive(i)}
              style={{
                padding: '0.65rem 1.25rem',
                background: active === i ? 'var(--accent)' : 'var(--bg-secondary)',
                border: active === i ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                color: active === i ? '#fff' : 'var(--text-secondary)',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                boxShadow: active === i ? '0 10px 25px rgba(37,99,235,0.25)' : 'none',
                backdropFilter: 'blur(8px)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div 
        style={{ 
          position: 'relative', 
          borderRadius: '28px', 
          overflow: 'hidden', 
          boxShadow: 'var(--shadow-xl)', 
          border: '1px solid var(--border-color)',
          background: 'var(--bg-card)',
          padding: '8px' // "Frame" effect
        }}
        onMouseEnter={() => setShowHint(false)}
      >
        <div style={{ borderRadius: '22px', overflow: 'hidden', position: 'relative' }}>
          <SliderWidget key={active} before={before} after={after} isBackendImage={isBackendImage} />
          
          {/* Subtle Hint Overlay */}
          {showHint && !showTabs && (
            <div style={{ 
              position: 'absolute', 
              bottom: '1.5rem', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              background: 'rgba(0,0,0,0.7)', 
              color: '#fff', 
              padding: '0.5rem 1rem', 
              borderRadius: '100px', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              pointerEvents: 'none',
              animation: 'fade-pulse 2s infinite',
              backdropFilter: 'blur(4px)',
              zIndex: 20
            }}>
              <MousePointer2 size={14} /> Drag to Compare
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.9; transform: translate(-50%, 0); }
          50% { opacity: 0.6; transform: translate(-50%, 5px); }
        }
      `}</style>
    </div>
  );
};

export const BeforeAfterSection = ({ gallery = [] }) => {
  return (
    <section style={{ padding: '7rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.875rem,4vw,3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            High quality cutouts
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>Drag the slider to compare — precision in every pixel, for any subject.</p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto 2.5rem' }}>
          <BeforeAfterSlider gallery={gallery} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/sample"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563EB', fontWeight: 800, background: 'rgba(37,99,235,0.08)', padding: '0.875rem 2rem', borderRadius: '100px', textDecoration: 'none', fontSize: '0.9375rem', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.color = '#2563EB'; }}
          >
            View All Samples <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─── AI FEATURES SECTION ────────────────────────────────── */
const AI_FEATS = [
  { badge: 'AI Background', title: 'Replace Backgrounds Instantly', desc: 'Professional studios cost $$$. Our AI generates realistic backgrounds in seconds — no fancy gear needed.', img: '/ai_bg_replace.png', color: '#2563EB', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)' },
  { badge: 'AI Enhance', title: 'Fix Blurry & Dull Photos', desc: 'Blurry selfies? Dull colors? One click fixes it all. 90% of users say their photos look professionally edited.', img: '/ai_photo_enhance.png', color: '#8B5CF6', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)' },
  { badge: 'AI Shadow', title: 'Realistic Product Shadows', desc: 'Natural-looking shadows make products POP. Boost your Shopify conversions with pro-quality visuals in seconds.', img: '/ai_product_shadow.png', color: '#06B6D4', bg: 'linear-gradient(135deg,#ecfeff,#cffafe)' },
  { badge: 'HD Download', title: 'Crystal-Clear HD Output', desc: 'Download pixel-perfect transparent PNGs at full resolution. No compression, no watermarks, ready for anything.', img: '/ai_hd_output.png', color: '#10B981', bg: 'linear-gradient(135deg,#ecfdf5,#d1fae5)' },
];

export const AIFeaturesSection = () => (
  <section style={{ padding: '7rem 0', background: 'var(--bg-primary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(37,99,235,0.08)', padding: '0.4rem 1.1rem', borderRadius: '100px', color: '#2563EB', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ Powerful AI Tools</div>
        <h2 style={{ fontSize: 'clamp(1.875rem,4vw,3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>More Than Background Removal</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>A full suite of AI tools to take your images to the next level.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        {AI_FEATS.map((f, i) => (
          <div key={f.badge} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Text — swap order on odd rows */}
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <span style={{ display: 'inline-block', background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}30`, padding: '0.3rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>{f.badge}</span>
              <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>{f.desc}</p>
              <Link to="/tool"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: f.color, color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', transition: 'all 0.25s', boxShadow: `0 8px 24px ${f.color}35` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${f.color}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}35`; }}
              >Try {f.badge} <ArrowRight size={16} /></Link>
            </div>
            {/* Visual */}
            <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <div style={{ background: f.bg, borderRadius: '28px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${f.color}20`, boxShadow: `0 20px 60px ${f.color}10`, overflow: 'hidden', padding: '1rem' }}>
                <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', boxShadow: 'var(--shadow-md)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`@media(max-width:768px){.ai-feat-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ─── USE-CASE TABS ──────────────────────────────────────── */
const CASES = [
  { Icon: Users, label: 'Individuals', color: '#2563EB', desc: 'Perfect your selfies and portraits in seconds. Snap, upload, and share — our AI handles the rest automatically.' },
  { Icon: Camera, label: 'Photographers', color: '#8B5CF6', desc: 'Batch process hundreds of images instantly. Remove backgrounds, fix shadows, and refine details without slowing your shoot.' },
  { Icon: Megaphone, label: 'Marketers', color: '#EC4899', desc: 'Produce on-brand visuals at scale. Convert raw product shots into polished, campaign-ready images in seconds.' },
  { Icon: Code2, label: 'Developers', color: '#06B6D4', desc: 'Integrate our REST API with a few lines of code and automate background removal for thousands of images at scale.' },
  { Icon: ShoppingCart, label: 'Ecommerce', color: '#10B981', desc: 'Transform product photos into crisp, conversion-boosting visuals. Bulk-edit your entire catalog with one click.' },
  { Icon: Building2, label: 'Enterprise', color: '#F59E0B', desc: 'Scale across your entire organization. Bulk process thousands of photos via API, on-premise, or custom solution.' },
];

export const UseCaseTabs = () => {
  const [active, setActive] = useState(0);
  const { Icon, label, color, desc } = CASES[active];

  return (
    <section style={{ padding: '7rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.875rem,4vw,3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Built For Everyone</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>Whether you're a creator, seller, or developer — we have the perfect workflow for you.</p>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {CASES.map(({ Icon: Ic, label: lbl, color: col }, i) => (
            <button key={lbl} onClick={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.25rem', borderRadius: '100px', background: active === i ? col : 'var(--bg-card)', color: active === i ? '#fff' : 'var(--text-secondary)', border: active === i ? 'none' : '1px solid var(--border-color)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.25s', boxShadow: active === i ? `0 6px 20px ${col}40` : 'none' }}>
              <Ic size={14} /> {lbl}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '28px', padding: '3rem 3.5rem', border: `1px solid ${color}25`, boxShadow: `0 20px 60px ${color}10`, textAlign: 'center', transition: 'all 0.3s' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '22px', background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color }}>
            <Icon size={32} />
          </div>
          <h3 style={{ fontSize: '1.625rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem' }}>{label}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '2rem' }}>{desc}</p>
          <Link to="/tool"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: color, color: '#fff', padding: '0.875rem 2rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', transition: 'all 0.25s', boxShadow: `0 8px 24px ${color}35` }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
          >
            Get Started as {label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
