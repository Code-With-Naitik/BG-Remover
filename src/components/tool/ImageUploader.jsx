import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, ImageIcon, FileImage, AlertCircle, Image as ImageIconLucide } from 'lucide-react';

const SAMPLE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', label: 'Portrait' },
  { url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=200&h=200&fit=crop', label: 'Pet' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', label: 'Product' },
];

const ImageUploader = ({ onUpload, isProcessing }) => {
  const [rejectedMsg, setRejectedMsg] = useState('');

  const onDrop = useCallback(
    (accepted, rejected) => {
      setRejectedMsg('');
      if (rejected.length > 0) {
        const code = rejected[0].errors[0]?.code;
        if (code === 'file-too-large') setRejectedMsg('File exceeds 10 MB. Please choose a smaller image.');
        else if (code === 'file-invalid-type') setRejectedMsg('Unsupported format. Use JPG, PNG, or WEBP.');
        else setRejectedMsg('Could not upload that file. Please try another.');
        return;
      }
      if (accepted.length > 0) onUpload(accepted);
    },
    [onUpload],
  );

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
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? 'var(--accent)' : '#D1D5DB'}`,
          borderRadius: '16px',
          padding: '5rem 2rem',
          textAlign: 'center',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          background: isDragActive ? 'var(--accent-light)' : 'var(--bg-card)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isDragActive ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
        }}
        onMouseEnter={e => {
          if (!isProcessing && !isDragActive) {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.background = 'var(--accent-light)';
            e.currentTarget.style.transform = 'scale(1.01)';
          }
        }}
        onMouseLeave={e => {
          if (!isDragActive) {
            e.currentTarget.style.borderColor = '#D1D5DB';
            e.currentTarget.style.background = 'var(--bg-card)';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        onMouseDown={e => {
          if (!isProcessing) e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseUp={e => {
          if (!isProcessing) e.currentTarget.style.transform = 'scale(1.01)';
        }}
      >
        <input {...getInputProps()} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: '96px', height: '96px', borderRadius: '24px',
              background: isDragActive ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: isDragActive ? 'var(--shadow-glow-lg)' : 'none',
              transform: isDragActive ? 'rotate(10deg) scale(1.1)' : 'none'
            }}
          >
            {isDragActive
              ? <UploadCloud size={48} color="#fff" />
              : <ImageIconLucide size={48} color="var(--accent)" />
            }
          </div>

          <div style={{ maxWidth: '400px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
              {isDragActive ? 'Drop your image here' : 'Drag & drop your image'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>
              or click to upload <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(PNG, JPG supported)</span>
            </p>
          </div>

          {!isDragActive && (
            <button
              type="button"
              className="btn btn-primary btn-xl animate-pulse-glow"
              style={{ marginTop: '0.5rem', borderRadius: '12px' }}
            >
              Upload Image
            </button>
          )}
        </div>
      </div>

      {/* Error message */}
      {rejectedMsg && (
        <div className="animate-slide-up" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '12px', color: '#ef4444', fontSize: '0.9375rem', fontWeight: 500 }}>
          <AlertCircle size={18} /> {rejectedMsg}
        </div>
      )}

      {/* Sample Images */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            No image? Try one of these
          </p>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SAMPLE_IMAGES.map(({ url, label }) => (
            <button
              key={label}
              onClick={() => handleSample(url)}
              disabled={isProcessing}
              className="card-hover"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
                padding: '0.75rem', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isProcessing ? 0.5 : 1,
                width: '100px'
              }}
            >
              <img src={url} alt={label} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
