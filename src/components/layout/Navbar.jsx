import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { to: '/tool', label: 'Remove BG' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '1.1875rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              BGRemover <span className="gradient-text">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hide-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: isActive(to) ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive(to) ? 'var(--accent-light)' : 'transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive(to)) e.currentTarget.style.background = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  if (!isActive(to)) e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = isActive(to) ? 'var(--accent)' : 'var(--text-secondary)';
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <Link
              to="/tool"
              className="btn btn-gradient btn-sm hide-mobile"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
            >
              Try for Free
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
              className="mobile-toggle"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div
          className="glass animate-slide-down"
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            zIndex: 99,
            padding: '1rem 1.5rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.875rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 500,
                fontSize: '1rem',
                color: isActive(to) ? 'var(--accent)' : 'var(--text-primary)',
                background: isActive(to) ? 'var(--accent-light)' : 'transparent',
                textDecoration: 'none',
                marginBottom: '0.25rem',
              }}
            >
              {label}
            </Link>
          ))}
          <Link to="/tool" className="btn btn-gradient" style={{ width: '100%', marginTop: '0.75rem' }}>
            Try for Free
          </Link>
        </div>
      )}

      {/* Spacer to offset fixed navbar */}
      <div style={{ height: 'var(--nav-height)' }} />

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
