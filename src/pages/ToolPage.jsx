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
      <section
        style={{
          background: 'white',
          borderBottom: '1px solid var(--border-color)',
          padding: '4rem 0 3.5rem',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <AdBanner type="header" />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 800 }}>
              <Zap size={14} fill="currentColor" /> AI-POWERED ENGINE
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}
          >
            Remove Image Background
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
            Upload any image and let our AI handle the rest. <br className="hide-mobile"/> 100% automatic and free.
          </p>
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
      <section style={{ background: 'white', borderTop: '1px solid var(--border-color)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { icon: Sparkles, title: 'AI-Powered', desc: 'Neural edge detection' },
              { icon: Clock, title: 'Lightning Fast', desc: 'Under 3 seconds' },
              { icon: Shield, title: '100% Private', desc: 'Secure processing' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <Icon size={24} color="var(--accent)" />
                </div>
                <h4 style={{ margin: 0, fontWeight: 800 }}>{title}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginTop: '4rem' }}>
          <AdBanner type="bottom" />
        </div>
      </section>
    </div>
  );
};

export default ToolPage;
