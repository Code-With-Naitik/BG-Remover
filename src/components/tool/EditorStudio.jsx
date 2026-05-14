import React, { useState, useEffect } from 'react';
import { Download, Crown, Share2, RotateCcw, X, Palette, Image as ImageIcon, Sliders, SplitSquareHorizontal, Layers, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHDCredits } from '../../hooks/useHDCredits';

export const BACKGROUND_PRESETS = [
  { id: 'transparent', label: 'Transparent', style: { background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)' } },
  { id: 'white', label: 'White', style: { background: '#ffffff' } },
  { id: 'black', label: 'Black', style: { background: '#000000' } },
  { id: 'gradient-1', label: 'Sunset', style: { background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)' } },
  { id: 'gradient-2', label: 'Ocean', style: { background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' } },
  { id: 'gradient-3', label: 'Cyber', style: { background: 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)' } },
  { id: 'studio', label: 'Studio', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { id: 'office', label: 'Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: 'nature', label: 'Nature', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80' },
];

const EditorStudio = ({ processedImage, originalFiles, processImage, onReset, currentHistoryId }) => {
  const navigate = useNavigate();
  const { credits, useCredit, isPro } = useHDCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeBg, setActiveBg] = useState('transparent');
  const [blurAmount, setBlurAmount] = useState(0);
  const [shadowAmount, setShadowAmount] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (originalFiles && originalFiles.length > 0) {
      const url = URL.createObjectURL(originalFiles[0]);
      setOriginalUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [originalFiles]);

  useEffect(() => {
    if (currentHistoryId) {
      try {
        const historyStr = localStorage.getItem('bgremover_history');
        if (historyStr) {
          let history = JSON.parse(historyStr);
          const index = history.findIndex(item => item.id === currentHistoryId);
          if (index !== -1) {
            history[index].bgData = { activeBg, blurAmount, shadowAmount };
            localStorage.setItem('bgremover_history', JSON.stringify(history));
            window.dispatchEvent(new Event('history_updated'));
          }
        }
      } catch (e) { }
    }
  }, [activeBg, blurAmount, shadowAmount, currentHistoryId]);

  const activeBgData = BACKGROUND_PRESETS.find(b => b.id === activeBg);

  const getContainerStyle = () => {
    if (activeBgData?.style) return activeBgData.style;
    if (activeBgData?.url) return { background: `url(${activeBgData.url}) center/cover` };
    return { background: 'transparent' };
  };

  const getImageStyle = () => {
    const filters = [];
    if (shadowAmount > 0) {
      filters.push(`drop-shadow(0px ${shadowAmount}px ${shadowAmount * 1.5}px rgba(0,0,0,0.6))`);
    }
    return {
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
      filter: filters.join(' '),
      transition: 'filter 0.3s ease',
      position: 'relative',
      zIndex: 2,
    };
  };

  const handleDownloadHD = async () => {
    if (credits <= 0 && !isPro) {
      setShowUpgradeModal(true);
      return;
    }

    setIsDownloading(true);
    toast.loading('Synthesizing your high-res design...', { id: 'download' });

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = processedImage;
      });

      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Draw Background
      if (activeBgData && activeBgData.id !== 'transparent') {
        if (activeBgData.style && activeBgData.style.background.startsWith('#')) {
          ctx.fillStyle = activeBgData.style.background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (activeBgData.style && activeBgData.style.background.startsWith('linear-gradient')) {
          const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          if (activeBgData.id === 'gradient-1') {
            grad.addColorStop(0, '#FF9A9E');
            grad.addColorStop(0.99, '#FECFEF');
            grad.addColorStop(1, '#FECFEF');
          } else if (activeBgData.id === 'gradient-2') {
            grad.addColorStop(0, '#2E3192');
            grad.addColorStop(1, '#1BFFFF');
          } else if (activeBgData.id === 'gradient-3') {
            grad.addColorStop(0, '#FF0844');
            grad.addColorStop(1, '#FFB199');
          } else {
            grad.addColorStop(0, '#6366F1');
            grad.addColorStop(1, '#EC4899');
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (activeBgData.url) {
          const bgImg = new Image();
          bgImg.crossOrigin = "anonymous";
          await new Promise((resolve) => {
            bgImg.onload = resolve;
            bgImg.src = activeBgData.url;
          });

          if (blurAmount > 0) ctx.filter = `blur(${blurAmount}px)`;
          // Cover logic
          const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height);
          const x = (canvas.width / 2) - (bgImg.width / 2) * scale;
          const y = (canvas.height / 2) - (bgImg.height / 2) * scale;
          ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
          ctx.filter = 'none';
        }
      }

      // 2. Draw Shadow if any
      if (shadowAmount > 0) {
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = shadowAmount * 1.5;
        ctx.shadowOffsetY = shadowAmount;
      }

      // 3. Draw Foreground
      ctx.drawImage(img, 0, 0);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `snaplix-ai-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      useCredit();
      toast.success('HD Download Complete!', { id: 'download' });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Synthesis failed. Try again.', { id: 'download' });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my edit from Snaplix AI',
          text: 'I just removed the background from my image instantly!',
          url: window.location.href,
        });
      } catch (err) { }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="animate-scale-in" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', minHeight: '650px' }}>

      {/* ─── MAIN WORKSPACE ─── */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '32px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ marginLeft: '1rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)' }}>Snaplix Workspace</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onMouseDown={() => setIsComparing(true)}
              onMouseUp={() => setIsComparing(false)}
              onMouseLeave={() => setIsComparing(false)}
              onTouchStart={() => setIsComparing(true)}
              onTouchEnd={() => setIsComparing(false)}
              className="btn btn-white"
              style={{ padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem' }}
            >
              <SplitSquareHorizontal size={16} /> {isComparing ? 'Showing Original' : 'Hold to Compare'}
            </button>
            <button onClick={onReset} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem' }}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Base checkerboard so transparent regions show checkers */}
          <div style={{ position: 'absolute', inset: 0, background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)', opacity: 0.3 }} />

          {/* User Background Layer */}
          <div style={{ position: 'absolute', inset: 0, ...getContainerStyle(), filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none', transform: blurAmount > 0 ? 'scale(1.05)' : 'scale(1)' }} />

          {/* Image Layer */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <img
              src={isComparing ? originalUrl : processedImage}
              alt="Workspace Canvas"
              style={isComparing ? { maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', zIndex: 2 } : getImageStyle()}
            />
          </div>
        </div>
      </div>

      {/* ─── SIDEBAR CONTROLS ─── */}
      <div style={{ padding: '2rem', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '2rem', boxShadow: 'var(--shadow-lg)' }}>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}>
            <Wand2 size={20} color="var(--accent)" /> Pro Tools
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Backgrounds */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <ImageIcon size={14} /> Backgrounds
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {BACKGROUND_PRESETS.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setActiveBg(bg.id)}
                    title={bg.label}
                    style={{
                      width: '100%', height: '60px', borderRadius: '14px',
                      border: activeBg === bg.id ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      padding: '3px', background: 'var(--bg-primary)', cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: activeBg === bg.id ? 'var(--shadow-glow)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '10px',
                      ...(bg.style || {}),
                      background: bg.url ? `url(${bg.url}) center/cover` : (bg.style?.background || 'transparent'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Background Blur */}
            <div style={{ opacity: activeBgData?.url ? 1 : 0.4, pointerEvents: activeBgData?.url ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  <Sliders size={14} /> Bg Blur
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)' }}>{blurAmount}px</span>
              </div>
              <input
                type="range" min="0" max="20" value={blurAmount}
                onChange={(e) => setBlurAmount(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent)', height: '6px', borderRadius: '4px' }}
              />
            </div>

            {/* Drop Shadow */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  <Layers size={14} /> Subject Shadow
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)' }}>{shadowAmount}%</span>
              </div>
              <input
                type="range" min="0" max="40" value={shadowAmount}
                onChange={(e) => setShadowAmount(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent)', height: '6px', borderRadius: '4px' }}
              />
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={handleDownloadHD}
            disabled={isDownloading}
            className="btn btn-gradient btn-xl"
            style={{ width: '100%', borderRadius: '16px', fontSize: '1.0625rem', fontWeight: 800, boxShadow: 'var(--shadow-glow-lg)', opacity: isDownloading ? 0.7 : 1 }}
          >
            {isDownloading ? 'Processing...' : <><Download size={20} /> Download HD</>}
          </button>

          <button
            onClick={handleShare}
            className="btn btn-outline btn-xl"
            style={{ width: '100%', borderRadius: '16px', fontSize: '1.0625rem', fontWeight: 700 }}
          >
            <Share2 size={18} /> Share Result
          </button>

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 700, padding: '0.4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '100px' }}>
              <Crown size={14} color="#F59E0B" /> {credits} HD credits remaining
            </span>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', maxWidth: '440px', width: '90%', position: 'relative', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xl)' }}>
            <button className="modal-close" onClick={() => setShowUpgradeModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={24} /></button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}>
                <Crown size={40} color="#fff" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>Unlock Pro Editor</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.0625rem', lineHeight: 1.6 }}>Upgrade to unlock custom backgrounds, high-resolution exports, drop shadows, and priority processing.</p>
              <button className="btn btn-gradient btn-xl" style={{ width: '100%', borderRadius: '16px', fontSize: '1.125rem' }} onClick={() => navigate('/pricing')}>View Pro Plans</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorStudio;
