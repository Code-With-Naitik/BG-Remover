import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const STEPS = ['Analyzing image...', 'Detecting edges...', 'Removing background...', 'Finalizing results...'];

const ProcessingOverlay = () => {
  const [stepIdx, setStepIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setStepIdx(i => (i + 1) % STEPS.length), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 20, borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        gap: '1.5rem',
      }}
    >
      {/* Premium Loader */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '4px solid #E5E7EB',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#2563EB',
          borderRightColor: '#06B6D4',
          animation: 'spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        }} />
        <div style={{
          position: 'absolute', inset: '16px', borderRadius: '50%',
          background: 'var(--accent-gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
        }}>
          <Sparkles size={24} color="#fff" />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.375rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          AI Magic in Progress
        </p>
        <p
          key={stepIdx}
          className="animate-slide-up"
          style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500, minHeight: '1.5rem' }}
        >
          {STEPS[stepIdx]}
        </p>
      </div>

      {/* Progress line */}
      <div style={{ width: '200px', height: '6px', background: '#E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${((stepIdx + 1) / STEPS.length) * 100}%`,
            background: 'var(--accent-gradient)',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
};

export default ProcessingOverlay;
