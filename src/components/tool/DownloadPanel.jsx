import { Download, Crown, Share2, RotateCcw, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHDCredits } from '../../hooks/useHDCredits';

const DownloadPanel = ({ processedImage, originalFiles, processImage, onReset }) => {
  const navigate = useNavigate();
  const { credits, useCredit } = useHDCredits();

  const handleDownloadFree = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `bgremover-std-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const handleDownloadHD = async () => {
    if (credits <= 0) {
      toast('Weekly HD credits exhausted! Redirecting to Pro plans...', { icon: '👑' });
      setTimeout(() => navigate('/checkout'), 2000);
      return;
    }

    if (confirm(`Use 1 HD credit? You have ${credits} remaining this week.`)) {
      try {
        await processImage(originalFiles, 'full');
        useCredit();
        toast.success('HD processing started!');
      } catch (e) {
        toast.error('Failed to start HD processing.');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await (await fetch(processedImage)).blob();
        const file = new File([blob], 'removed-bg.png', { type: 'image/png' });
        await navigator.share({ files: [file], title: 'Background Removed with BGRemover Pro' });
      } catch {
        toast.error('Share cancelled.');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--accent-light)', padding: '0.5rem', borderRadius: '10px' }}>
          <CheckCircle2 size={20} color="var(--accent)" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Background Removed!
        </h3>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Free Download */}
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            display: 'flex', flexDirection: 'column', gap: '1rem',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div>
            <p style={{ fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Standard</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Great for social media. <br /> Up to 0.25 Megapixels.</p>
          </div>
          <button onClick={handleDownloadFree} className="btn btn-primary btn-lg" style={{ width: '100%', borderRadius: '12px' }}>
            <Download size={18} /> Download
          </button>
        </div>

        {/* HD Download */}
        <div
          style={{
            padding: '1.5rem',
            background: 'white',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), var(--accent-gradient)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            borderRadius: '16px',
            display: 'flex', flexDirection: 'column', gap: '1rem',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-lg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div
            style={{
              position: 'absolute', top: '-14px', right: '16px',
              background: 'var(--accent-gradient)',
              color: '#fff', padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem', fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              letterSpacing: '0.02em'
            }}
          >
            <Crown size={12} fill="#fff" /> RECOMMENDED
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>HD Quality</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Best for print & design. <br /> {credits} credits left.
            </p>
          </div>
          <button
            onClick={handleDownloadHD}
            className="btn btn-gradient btn-lg"
            style={{ width: '100%', borderRadius: '12px' }}
          >
            <Download size={18} /> Download HD
          </button>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={handleShare} className="btn btn-outline btn-lg" style={{ flex: 1, borderRadius: '12px' }}>
          <Share2 size={18} /> Share Result
        </button>
        <button onClick={onReset} className="btn btn-ghost btn-lg" style={{ flex: 1, borderRadius: '12px' }}>
          <RotateCcw size={18} /> Start New
        </button>
      </div>
    </div>
  );
};

export default DownloadPanel;
