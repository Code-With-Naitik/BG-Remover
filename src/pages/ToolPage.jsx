import React from 'react';
import { useImageProcessor } from '../hooks/useImageProcessor';
import ImageUploader from '../components/tool/ImageUploader';
import ProcessingOverlay from '../components/tool/ProcessingOverlay';
import EditorStudio from '../components/tool/EditorStudio';
import HistoryPanel from '../components/tool/HistoryPanel';
import AdBanner from '../components/layout/AdBanner';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Clock, Shield, Zap } from 'lucide-react';

const ToolPage = () => {
  const { isProcessing, originalImage, originalFiles, processedImage, processImage, reset } = useImageProcessor();

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>Remove Image Background — Snaplix AI Tool</title>
        <meta name="description" content="Upload any image and remove its background automatically in seconds using our free AI tool." />
      </Helmet>
      
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: 'var(--shadow-lg)',
            padding: '1rem 1.5rem',
            fontWeight: 500
          },
        }}
      />

      {/* Page Header */}
      <section style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', padding: '5rem 0 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '70vw', height: '60vh', background: 'radial-gradient(ellipse, var(--accent-light) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

        <div className="container" style={{ maxWidth: '760px', position: 'relative', zIndex: 1 }}>
          <AdBanner type="header" />

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', border: '1px solid var(--accent)', padding: '0.4rem 1.1rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Zap size={13} fill="currentColor" /> AI-Powered Engine
          </div>

          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1rem', letterSpacing: '-0.03em', fontWeight: 900, lineHeight: 1.1, color: 'var(--text-primary)' }}>
            Remove Image{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Background</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: 500, maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Upload any image and let our AI handle the rest. 100% automatic, free, and instant.
          </p>

          {/* Mini stats row */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '⚡', label: 'Under 3 seconds' },
              { icon: '🎯', label: '99.9% Accuracy' },
              { icon: '🔒', label: 'Zero data stored' },
              { icon: '💎', label: 'HD PNG output' },
            ].map(s => (
              <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {s.icon} {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tool Area */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container" style={{ maxWidth: !originalImage ? '900px' : '1200px', transition: 'max-width 0.5s ease' }}>
          <div style={{ position: 'relative' }}>
            {!originalImage ? (
              <ImageUploader onUpload={processImage} isProcessing={isProcessing} />
            ) : (
              <div className="animate-scale-in">
                {isProcessing && !processedImage ? (
                  <div style={{ height: '400px', position: 'relative', background: 'white', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
                    <ProcessingOverlay />
                  </div>
                ) : (
                  <EditorStudio
                    processedImage={processedImage}
                    originalFiles={originalFiles}
                    processImage={processImage}
                    onReset={reset}
                  />
                )}
              </div>
            )}

            {/* Show overlay on top of uploader while processing (first upload) */}
            {isProcessing && !originalImage && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 20, borderRadius: '24px' }}>
                <ProcessingOverlay />
              </div>
            )}
          </div>

          {/* Ad between sections */}
          <div style={{ marginTop: '4rem' }}>
            <AdBanner type="horizontal" />
          </div>

          {/* History */}
          <div style={{ marginTop: '6rem' }}>
            <HistoryPanel />
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Sparkles, gradient: 'linear-gradient(135deg, #2563EB, #06B6D4)', glow: 'rgba(37,99,235,0.25)', title: 'AI-Powered', desc: 'Neural edge detection for hair, fur & fine details' },
              { icon: Clock, gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)', glow: 'rgba(139,92,246,0.25)', title: 'Lightning Fast', desc: 'Results in under 3 seconds flat' },
              { icon: Shield, gradient: 'linear-gradient(135deg, #10B981, #06B6D4)', glow: 'rgba(16,185,129,0.25)', title: '100% Private', desc: 'Images deleted immediately after processing' },
            ].map(({ icon: Icon, gradient, glow, title, desc }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 32px -8px ${glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 16px ${glow}` }}>
                  <Icon size={24} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginTop: '3rem' }}>
          <AdBanner type="bottom" />
        </div>
      </section>
    </div>
  );
};

export default ToolPage;
