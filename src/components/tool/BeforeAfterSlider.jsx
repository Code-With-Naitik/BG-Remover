import React from 'react';
import ReactCompareImage from 'react-compare-image';

const BeforeAfterSlider = ({ originalImage, processedImage }) => {
  return (
    <div 
      style={{ 
        borderRadius: '24px', 
        overflow: 'hidden',
        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uIn7YzZ2SX48D1S3Y7P0WAnS98OOfgY6S5A6fWvYfA6AzSbwY08D07MAAAAAElFTkSuQmCC)',
      }}
    >
      <ReactCompareImage 
        leftImage={originalImage} 
        rightImage={processedImage} 
        sliderLineColor="#2563EB"
        sliderLineWidth={3}
        handleSize={40}
        leftImageLabel="ORIGINAL"
        rightImageLabel="REMOVED"
        leftImageLabelStyle={{
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '4px',
          letterSpacing: '0.05em'
        }}
        rightImageLabelStyle={{
          background: 'var(--accent)',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '4px',
          letterSpacing: '0.05em'
        }}
      />
    </div>
  );
};

export default BeforeAfterSlider;
