import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.4-1-3.2 3-.3 6-1.5 6-6.5 0-1.4-.5-2.6-1.3-3.5.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4C6 3.4 5 3.7 5 3.7c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2.1-1.3 3.5 0 5 3 6.2 6 6.5-.6.8-1 1.9-1 3.2V21" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOOTER_LINKS = {
  Product: [
    { label: 'Remove Background', to: '/tool' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Free Tool', to: '/free-background-remover' },
    { label: 'HD Remover', to: '/background-remover-hd' },
  ],
  Resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'API Docs', to: '/pricing' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '1.25rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} color="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.0625rem',
                  color: 'var(--text-primary)',
                }}
              >
                BGRemover Pro
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '280px' }}>
              The fastest AI background remover on the web. Create transparent PNGs in seconds — no sign‑up required.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[TwitterIcon, GithubIcon, LinkedinIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-light)';
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                }}
              >
                {group}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} BGRemover Pro. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
              ● 99.9% Uptime
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Powered by AI</span>
          </div>
        </div>
      </div>

      {/* Responsive fix */}
      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
