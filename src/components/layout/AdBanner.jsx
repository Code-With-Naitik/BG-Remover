import React from 'react';

const AdBanner = ({ type = 'horizontal' }) => {
  const configs = {
    horizontal: { width: '100%', height: '90px', label: 'Advertisement — 728×90' },
    inContent: { width: '100%', height: '250px', label: 'Advertisement — 300×250' },
    sidebar: { width: '100%', height: '600px', label: 'Advertisement — 160×600' },
    stickyMobile: { width: '100%', height: '50px', label: 'Advertisement — 320×50' },
  };

  const config = configs[type] || configs.horizontal;

  return (
    <div
      className="ad-placeholder"
      style={{ width: config.width, height: config.height, margin: '2rem 0' }}
      aria-label="Advertisement"
    >
      <span>{config.label}</span>
    </div>
  );
};

export default AdBanner;
