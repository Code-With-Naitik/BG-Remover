import React, { useState } from 'react';
import { Download, Crown, Share2, RotateCcw, CheckCircle2, X, Palette, Image as ImageIcon, Sliders, Droplets, Maximize, Save, Layers, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHDCredits } from '../../hooks/useHDCredits';

const BACKGROUND_PRESETS = [
  { id: 'transparent', label: 'Transparent', icon: <div style={{ width: '20px', height: '20px', background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)' }} /> },
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'black', label: 'Black', color: '#000000' },
  { id: 'studio-grey', label: 'Studio', color: '#f3f4f6' },
  { id: 'beach', label: 'Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop' },
  { id: 'office', label: 'Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
];

const EditorStudio = ({ processedImage, originalFiles, processImage, onReset }) => {
  const navigate = useNavigate();
  const { credits, useCredit, isPro } = useHDCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeBg, setActiveBg] = useState('transparent');
  const [blurAmount, setBlurAmount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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
      
      // Load the processed image first to get dimensions
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = processedImage;
      });

      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Draw Background
      const bgPreset = BACKGROUND_PRESETS.find(b => b.id === activeBg);
      if (bgPreset && bgPreset.id !== 'transparent') {
        if (bgPreset.color) {
          ctx.fillStyle = bgPreset.color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (bgPreset.url) {
          const bgImg = new Image();
          bgImg.crossOrigin = "anonymous";
          await new Promise((resolve) => {
            bgImg.onload = resolve;
            bgImg.src = bgPreset.url;
          });
          
          // Draw blurred background if needed
          if (blurAmount > 0) {
             ctx.filter = `blur(${blurAmount}px)`;
          }
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          ctx.filter = 'none';
        }
      }

      // 2. Draw Foreground (Processed Image)
      ctx.drawImage(img, 0, 0);

      // 3. Trigger Download
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
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="animate-scale-in" style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', minHeight: '600px' }}>
      {/* Main Preview Area */}
      <div 
        className="card"
        style={{ 
          background: activeBg === 'transparent' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)' : BACKGROUND_PRESETS.find(b => b.id === activeBg)?.color || `url(${BACKGROUND_PRESETS.find(b => b.id === activeBg)?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '32px', border: '1px solid var(--border-color)',
          overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img 
          src={processedImage} 
          alt="Processed" 
          style={{ 
            maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', 
            // In the preview we blur the background of the CONTAINER, not the image.
            // But if the user wants to blur the background, we should probably have a real container.
            transition: 'filter 0.3s ease'
          }} 
        />
        
        {/* Floating Actions */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
          <button onClick={onReset} className="btn btn-white" style={{ borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <RotateCcw size={16} /> Reset
          </button>
          <button className="btn btn-white" style={{ borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <Maximize size={16} /> Fullscreen
          </button>
        </div>
      </div>

      {/* Sidebar Editor */}
      <div className="card" style={{ padding: '2rem', borderRadius: '32px', background: 'white', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Palette size={20} color="var(--accent)" /> Studio Editor
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             {/* Background Presets */}
             <div>
               <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Backgrounds</label>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {BACKGROUND_PRESETS.map(bg => (
                    <button 
                      key={bg.id}
                      onClick={() => setActiveBg(bg.id)}
                      style={{ 
                        width: '100%', height: '60px', borderRadius: '12px', 
                        border: activeBg === bg.id ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                        padding: '4px', background: 'white', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ 
                        width: '100%', height: '100%', borderRadius: '8px', 
                        background: bg.color || (bg.url ? `url(${bg.url}) center/cover` : 'none'),
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {bg.icon}
                      </div>
                    </button>
                  ))}
               </div>
             </div>

             {/* Blur Slider */}
             <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Background Blur</label>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>{blurAmount}px</span>
                </div>
                <input 
                  type="range" min="0" max="20" value={blurAmount} 
                  onChange={(e) => setBlurAmount(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
             </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={handleDownloadHD} 
            disabled={isDownloading}
            className="btn btn-gradient btn-xl" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)', opacity: isDownloading ? 0.7 : 1 }}
          >
            {isDownloading ? 'Processing...' : <><Download size={20} /> Download HD</>}
          </button>
          <button 
            onClick={handleShare}
            className="btn btn-outline btn-xl" 
            style={{ width: '100%', borderRadius: '16px' }}
          >
            <Share2 size={20} /> Share Result
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
             {credits} HD credits remaining
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowUpgradeModal(false)}><X size={24} /></button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '72px', height: '72px', background: 'var(--accent-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Crown size={36} color="var(--accent)" fill="var(--accent)" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Unlock Pro Editor</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Upgrade to unlock custom backgrounds, high-resolution exports, and priority processing.</p>
              <button className="btn btn-gradient btn-xl" style={{ width: '100%', borderRadius: '16px' }} onClick={() => navigate('/pricing')}>View Pro Plans</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorStudio;
