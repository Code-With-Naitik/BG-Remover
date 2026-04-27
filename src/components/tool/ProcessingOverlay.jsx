import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const STEPS = ['Analyzing image…', 'Detecting edges…', 'Removing background…', 'Finalizing…'];

const ProcessingOverlay = () => {
  const [stepIdx, setStepIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setStepIdx(i => (i + 1) % STEPS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 20, borderRadius: 'var(--radius-xl)',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(10px)',
        gap: '1.25rem',
      }}
    >
      {/* Spinning ring */}
      <div style={{ position: 'relative', width: '72px', height: '72px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.15)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#818cf8',
          borderRightColor: '#c084fc',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: '12px', borderRadius: '50%',
          background: 'var(--accent-gradient)', opacity: 0.9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={20} color="#fff" />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.375rem' }}>
          AI at work…
        </p>
        <p
          key={stepIdx}
          className="animate-fade-in"
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}
        >
          {STEPS[stepIdx]}
        </p>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i <= stepIdx ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingOverlay;
