import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowLeft, Bell } from 'lucide-react';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px',
        background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '15%', width: '350px', height: '350px',
        background: 'var(--accent-gradient)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: 0
      }} />

      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '4rem 2rem',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-2xl)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '80px', height: '80px', background: 'var(--accent-gradient)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)'
        }}>
          <Rocket size={40} color="#fff" />
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          marginBottom: '1rem',
          letterSpacing: '-0.04em',
          background: 'linear-gradient(to right, #fff, var(--accent), #fff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite'
        }}>
          Coming Soon
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          lineHeight: 1.6,
          marginBottom: '3rem',
          maxWidth: '400px',
          margin: '0 auto 3rem'
        }}>
          We're working hard to bring you something amazing. This page is currently under development and will be ready soon!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {/* <div style={{
            display: 'flex',
            width: '100%',
            maxWidth: '400px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '4px',
            borderRadius: 'var(--radius-full)'
          }}>
            <input
              type="email"
              placeholder="Enter your email for updates"
              style={{
                flex: 1, border: 'none', background: 'transparent', padding: '0 1.5rem',
                color: 'var(--text-primary)', outline: 'none'
              }}
            />
            <button className="btn btn-gradient" style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1.5rem' }}>
              <Bell size={18} /> Notify Me
            </button>
          </div> */}

          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}} />
    </div>
  );
};

export default ComingSoon;
