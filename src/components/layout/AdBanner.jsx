import React from 'react';

const AdBanner = ({ type = 'horizontal' }) => {
  const configs = {
    header: { width: '100%', height: '90px', label: 'Header Ad — 728×90' },
    horizontal: { width: '100%', height: '90px', label: 'Leaderboard Ad — 728×90' },
    inContent: { width: '100%', height: '250px', label: 'In-Content Ad — 300×250' },
    sidebar: { width: '100%', height: '600px', label: 'Sidebar Skyscraper — 160×600' },
    bottom: { width: '100%', height: '250px', label: 'Bottom Banner — 970×250' },
    stickyMobile: { width: '100%', height: '50px', label: 'Mobile Sticky — 320×50' },
  };

  const config = configs[type] || configs.horizontal;

  return (
    <div
      className="ad-placeholder animate-pulse"
      style={{ 
        width: config.width, 
        height: config.height, 
        margin: '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
        border: '1px dashed var(--border-color)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
      aria-label="Advertisement"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="opacity-50">#AD_PLACEMENT</span>
        <span>{config.label}</span>
      </div>
    </div>
  );
};

export default AdBanner;
