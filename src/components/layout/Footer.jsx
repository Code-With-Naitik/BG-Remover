import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, CheckCircle } from 'lucide-react';

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.254 2.25H8.08l4.257 5.622 5.907-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.4-1-3.2 3-.3 6-1.5 6-6.5 0-1.4-.5-2.6-1.3-3.5.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4C6 3.4 5 3.7 5 3.7c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2.1-1.3 3.5 0 5 3 6.2 6 6.5-.6.8-1 1.9-1 3.2V21" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOOTER_LINKS = {
  Product: [
    { label: 'Remove Background', to: '/tool' },
    { label: 'Pricing Plans', to: '/pricing' },
    { label: 'Free Tool', to: '/free-background-remover' },
    { label: 'HD Remover', to: '/background-remover-hd' },
  ],
  Solutions: [
    { label: 'For Individuals', to: '/tool' },
    { label: 'For Photographers', to: '/tool' },
    { label: 'For Ecommerce', to: '/tool' },
    { label: 'For Developers', to: '/tool' },
    { label: 'For Enterprise', to: '/tool' },
  ],
  'Tools & API': [
    { label: 'API Documentation', to: '/tool' },
    { label: 'Bulk Remover', to: '/tool' },
    { label: 'Remove BG Online', to: '/remove-background-online' },
    { label: 'Passport Photo', to: '/remove-background-from-passport-photo' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

const SOCIALS = [
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: GithubIcon, label: 'GitHub' },
  { Icon: LinkedinIcon, label: 'LinkedIn' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };



  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', marginTop: 'auto', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent line */}
      <div style={{ height: '3px', background: 'var(--accent-gradient)' }} />

      {/* Subtle background decoration */}
      <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', opacity: 0.5 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
        {/* ── Main Link Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: '2.5rem 3rem', marginBottom: '3rem' }}>

          {/* Brand Column */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '1.1875rem', color: 'var(--text-primary)' }}>
                Snaplix <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
              </span>
            </Link>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: '280px' }}>
              The fastest AI background remover on the web. Pixel-perfect transparent PNGs in seconds — no sign‑up required.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {SOCIALS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontWeight: 800, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                {group}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(({ label, to }) => (
                  <Link key={label} to={to}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', paddingBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-secondary)' }}>Snaplix AI</strong>. All rights reserved. Built with ❤️ for creators worldwide.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
              99.9% Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          footer .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem 2rem !important; }
        }
        @media (max-width: 768px) {
          footer .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          footer .newsletter-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
