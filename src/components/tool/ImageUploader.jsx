import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, ImageIcon, FileImage, AlertCircle } from 'lucide-react';

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
    <div>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border-hover)'}`,
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          background: isDragActive ? 'var(--accent-light)' : 'var(--bg-card)',
          transition: 'all 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => { if (!isProcessing && !isDragActive) e.currentTarget.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { if (!isDragActive) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
      >
        {/* Subtle bg gradient when drag active */}
        {isDragActive && (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--accent-gradient)', opacity: 0.05, borderRadius: 'inherit' }} />
        )}

        <input {...getInputProps()} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: isDragActive ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${isDragActive ? 'transparent' : 'var(--border-color)'}`,
              transition: 'all 0.3s ease',
              boxShadow: isDragActive ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
            }}
          >
            {isDragActive
              ? <UploadCloud size={36} color="#fff" />
              : <FileImage size={36} color="var(--accent)" />
            }
          </div>

          {isDragActive ? (
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.375rem', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                Release to Upload
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Drop your image here</p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.375rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Drag & Drop Your Image
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                or click anywhere to browse your files
              </p>
              <button
                type="button"
                className="btn btn-gradient btn-lg"
                onClick={e => e.stopPropagation()}
              >
                <UploadCloud size={20} /> Choose Image
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['JPG', 'PNG', 'WEBP'].map(fmt => (
              <span key={fmt} className="badge badge-accent">{fmt}</span>
            ))}
            <span className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>Max 10 MB</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {rejectedMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '0.9rem' }}>
          <AlertCircle size={16} /> {rejectedMsg}
        </div>
      )}

      {/* Sample Images */}
      <div style={{ marginTop: '2rem' }}>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Or try a sample
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SAMPLE_IMAGES.map(({ url, label }) => (
            <button
              key={label}
              onClick={() => handleSample(url)}
              disabled={isProcessing}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                background: 'none', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                padding: '0.5rem', cursor: 'pointer', transition: 'all 0.2s',
                opacity: isProcessing ? 0.5 : 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none'; }}
            >
              <img src={url} alt={label} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
