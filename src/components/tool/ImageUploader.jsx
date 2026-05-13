import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle, Sparkles, Image as ImageIconLucide, CheckCircle } from 'lucide-react';

const SAMPLE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', label: 'Portrait' },
  { url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=200&h=200&fit=crop', label: 'Pet' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', label: 'Product' },
];

const FORMATS = ['JPG', 'PNG', 'WebP'];

const FEATURES = [
  { icon: '⚡', text: 'Under 3 seconds' },
  { icon: '✂️', text: '99.9% accuracy' },
  { icon: '🔒', text: '100% private' },
  { icon: '✨', text: 'HD quality' },
];

const ImageUploader = ({ onUpload, isProcessing }) => {
  const [rejectedMsg, setRejectedMsg] = useState('');

  const onDrop = useCallback((accepted, rejected) => {
    setRejectedMsg('');
    if (rejected.length > 0) {
      const code = rejected[0].errors[0]?.code;
      if (code === 'file-too-large') setRejectedMsg('File exceeds 10 MB. Please choose a smaller image.');
      else if (code === 'file-invalid-type') setRejectedMsg('Unsupported format. Use JPG, PNG, or WebP.');
      else setRejectedMsg('Could not upload that file. Please try another.');
      return;
    }
    if (accepted.length > 0) onUpload(accepted);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    disabled: isProcessing,
  });

  const handleSample = async (url) => {
    setRejectedMsg('');
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const ext = blob.type.split('/')[1] || 'jpg';
      const file = new File([blob], `sample.${ext}`, { type: blob.type });
      onUpload(file);
    } catch {
      setRejectedMsg('Could not load sample image. Check your connection.');
    }
  };

  return (
    <div className="animate-scale-in">
      {/* ── Main Drop Zone ── */}
      <div
        {...getRootProps()}
        style={{
          borderRadius: '28px',
          padding: isDragActive ? '4.5rem 2rem' : '4rem 2rem',
          textAlign: 'center',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          background: isDragActive
            ? 'var(--accent-light)'
            : 'var(--bg-card)',
          border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border-hover)'}`,
          boxShadow: isDragActive ? 'var(--shadow-glow-lg)' : 'var(--shadow-md)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          if (!isProcessing && !isDragActive) {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={e => {
          if (!isDragActive) {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        <input {...getInputProps()} />

        {/* Background glow orb */}
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '100%', background: isDragActive ? 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)' : 'radial-gradient(ellipse, var(--accent-light) 0%, transparent 70%)', pointerEvents: 'none', transition: 'all 0.4s ease' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

          {/* Icon with animated ring when dragging */}
          <div style={{ position: 'relative' }}>
            {isDragActive && (
              <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: '2px dashed var(--accent)', animation: 'spin 3s linear infinite', opacity: 0.6 }} />
            )}
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: isDragActive ? 'var(--accent-gradient)' : 'linear-gradient(135deg, var(--accent-light) 0%, var(--bg-secondary) 100%)',
              border: `2px solid ${isDragActive ? 'transparent' : 'var(--border-color)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: isDragActive ? 'var(--shadow-glow-lg)' : 'var(--shadow-sm)',
              transform: isDragActive ? 'scale(1.12)' : 'scale(1)',
            }}>
              {isDragActive
                ? <UploadCloud size={46} color="#fff" strokeWidth={1.5} />
                : <ImageIconLucide size={46} color="var(--accent)" strokeWidth={1.5} />
              }
            </div>
          </div>

          {/* Text content */}
          <div style={{ maxWidth: '440px' }}>
            <h3 style={{ fontSize: 'clamp(1.375rem, 3vw, 1.75rem)', fontWeight: 900, color: isDragActive ? 'var(--accent)' : 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>
              {isDragActive ? '🎯 Release to process instantly!' : 'Drag & drop your image here'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500, marginBottom: '1.5rem' }}>
              or{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationStyle: 'dotted' }}>
                click to browse files
              </span>
            </p>

            {/* Format chips */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {FORMATS.map(f => (
                <span key={f} style={{ padding: '0.3rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{f}</span>
              ))}
              <span style={{ padding: '0.3rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Max 10MB</span>
            </div>
          </div>

          {/* CTA button */}
          {!isDragActive && (
            <button
              type="button"
              className="btn btn-gradient btn-xl"
              style={{ borderRadius: '16px', padding: '1rem 3rem', fontSize: '1.0625rem', fontWeight: 800, pointerEvents: 'none' }}
            >
              <UploadCloud size={22} /> Choose Image
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {rejectedMsg && (
        <div className="animate-slide-up" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', padding: '1rem 1.25rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', color: '#EF4444', fontSize: '0.9375rem', fontWeight: 600 }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} /> {rejectedMsg}
        </div>
      )}

      {/* ── Feature Pills Row ── */}
      <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {FEATURES.map(f => (
          <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            <span>{f.icon}</span> {f.text}
          </div>
        ))}
      </div>

      {/* ── Sample Images ── */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            ✦ Try a sample image
          </p>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SAMPLE_IMAGES.map(({ url, label }) => (
            <button
              key={label}
              onClick={() => handleSample(url)}
              disabled={isProcessing}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                background: 'var(--bg-card)', border: '1.5px solid var(--border-color)',
                borderRadius: '18px', padding: '0.875rem', cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease', opacity: isProcessing ? 0.5 : 1,
                width: '110px',
              }}
              onMouseEnter={e => {
                if (!isProcessing) {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', width: '80px', height: '80px' }}>
                <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ImageUploader;
