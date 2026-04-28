import React from 'react';
import { useImageProcessor } from '../hooks/useImageProcessor';
import ImageUploader from '../components/tool/ImageUploader';
import ProcessingOverlay from '../components/tool/ProcessingOverlay';
import BeforeAfterSlider from '../components/tool/BeforeAfterSlider';
import DownloadPanel from '../components/tool/DownloadPanel';
import HistoryPanel from '../components/tool/HistoryPanel';
import AdBanner from '../components/layout/AdBanner';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Clock, Shield } from 'lucide-react';

const ToolPage = () => {
  const { isProcessing, originalImage, originalFiles, processedImage, processImage, reset } = useImageProcessor();

  return (
    <>
      <Helmet>
        <title>Remove Image Background — BGRemover Pro Tool</title>
        <meta name="description" content="Upload any image and remove its background automatically in seconds using our free AI tool. Supports JPG, PNG, WEBP up to 10MB." />
      </Helmet>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />

      {/* Page Header */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '3rem 0 2.5rem',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <AdBanner type="header" />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-accent">
              <Sparkles size={12} /> AI-Powered
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}
          >
            Remove Image Background
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Upload any image — our AI removes the background in under 3 seconds.
          </p>

          {/* Trust chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { icon: Sparkles, label: 'AI-Powered' },
              { icon: Clock, label: 'Under 3 Seconds' },
              { icon: Shield, label: 'Private & Secure' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <Icon size={14} color="var(--accent)" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tool Area */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ position: 'relative' }}>
            {!originalImage ? (
              <ImageUploader onUpload={processImage} isProcessing={isProcessing} />
            ) : (
              <div className="animate-scale-in">
                {/* Before/After Slider */}
                <div
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                  }}
                >
                  <BeforeAfterSlider
                    originalImage={originalImage}
                    processedImage={processedImage || originalImage}
                  />
                  {isProcessing && <ProcessingOverlay />}
                </div>

                {/* Download Panel */}
                {processedImage && (
                  <DownloadPanel
                    processedImage={processedImage}
                    originalFiles={originalFiles}
                    processImage={processImage}
                    onReset={reset}
                  />
                )}
              </div>
            )}

            {/* Show overlay on top of uploader while processing */}
            {isProcessing && !originalImage && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 20, borderRadius: 'var(--radius-xl)' }}>
                <ProcessingOverlay />
              </div>
            )}
          </div>

          {/* Ad between sections */}
          <AdBanner type="horizontal" />

          {/* History */}
          <HistoryPanel />
        </div>
      </section>

      {/* Feature chips below tool */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              '✅ Transparent PNG output',
              '✅ Preserves fine hair & edges',
              '✅ Works on people, products & animals',
              '✅ No signup required',
              '✅ 5 free images per day',
            ].map(t => (
              <span key={t} style={{ padding: '0.4rem 0.875rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="container">
          <AdBanner type="bottom" />
        </div>
      </section>
    </>
  );
};

export default ToolPage;
