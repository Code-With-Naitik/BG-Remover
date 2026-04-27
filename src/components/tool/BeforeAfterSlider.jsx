import React from 'react';
import ReactCompareImage from 'react-compare-image';

const BeforeAfterSlider = ({ originalImage, processedImage }) => {
  // We add a checkerboard background pattern class
  const checkerboardStyle = {
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23e5e7eb\'/%3E%3Crect x=\'10\' width=\'10\' height=\'10\' fill=\'%23f3f4f6\'/%3E%3Crect y=\'10\' width=\'10\' height=\'10\' fill=\'%23f3f4f6\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23e5e7eb\'/%3E%3C/svg%3E")',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)'
  };

  return (
    <div style={checkerboardStyle}>
      <ReactCompareImage 
        leftImage={originalImage} 
        rightImage={processedImage} 
        sliderLineColor="var(--accent-primary)"
        leftImageLabel="Original"
        rightImageLabel="Removed Background"
      />
    </div>
  );
};

export default BeforeAfterSlider;
