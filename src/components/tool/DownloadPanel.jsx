import React from 'react';
import { Download, Crown, Share2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const DownloadPanel = ({ processedImage, onReset }) => {
  const handleDownloadFree = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `bgremover-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
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
        marginTop: '1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
      }}
    >
      <h3 style={{ fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '1.25rem' }}>
        Download Your Image
      </h3>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Free Download */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}
        >
          <div>
            <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Standard</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Great for web & social. Up to 0.25 MP.</p>
          </div>
          <button onClick={handleDownloadFree} className="btn btn-primary" style={{ width: '100%' }}>
            <Download size={16} /> Download Free
          </button>
        </div>

        {/* HD Download */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--accent-light)',
            border: '2px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute', top: '-12px', right: '12px',
              background: 'var(--accent-gradient)',
              color: '#fff', padding: '0.2rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '0.25rem',
            }}
          >
            <Crown size={12} /> PRO
          </div>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>HD Quality</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Best for print & commercial. Up to 25 MP.</p>
          </div>
          <button
            onClick={() => toast('Upgrade to Pro for HD downloads!', { icon: '👑' })}
            className="btn btn-gradient"
            style={{ width: '100%' }}
          >
            <Download size={16} /> Download HD
          </button>
        </div>
      </div>

      {/* Secondary Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={handleShare} className="btn btn-outline" style={{ flex: 1 }}>
          <Share2 size={15} /> Share Result
        </button>
        <button onClick={onReset} className="btn btn-ghost" style={{ flex: 1 }}>
          <RotateCcw size={15} /> Upload Another
        </button>
      </div>
    </div>
  );
};

export default DownloadPanel;
