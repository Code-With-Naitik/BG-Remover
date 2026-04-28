import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, Menu, X, Sparkles, User, LogOut, LayoutDashboard, Zap, ChevronDown, Settings } from 'lucide-react';

const NAV_LINKS = [
  { to: '/tool', label: 'Remove BG' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
                fontSize: '1.25rem',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
              }}
            >
              Snaplix <span className="gradient-text">AI</span>
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
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-trigger group"
                >
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="trigger-info hide-mobile">
                    <span className="credits-count">{user.credits} Credits</span>
                    <ChevronDown size={14} className={`trigger-arrow ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown glass animate-fade-in">
                    <div className="dropdown-header">
                      <p className="user-name-display">{user.name}</p>
                      <p className="user-email-display">{user.email}</p>
                    </div>
                    
                    <div className="dropdown-divider"></div>

                    <div className="dropdown-links">
                      <Link to="/dashboard" className="dropdown-item">
                        <div className="item-icon bg-indigo-50 text-indigo-600">
                          <LayoutDashboard size={16} />
                        </div>
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/pricing" className="dropdown-item">
                        <div className="item-icon bg-amber-50 text-amber-500">
                          <Zap size={16} className="fill-current" />
                        </div>
                        <span>Get Credits</span>
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <div className="item-icon bg-slate-50 text-slate-500">
                          <Settings size={16} />
                        </div>
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="dropdown-divider"></div>

                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <div className="item-icon bg-red-50 text-red-500">
                        <LogOut size={16} />
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hide-mobile"
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-gradient btn-sm"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
                >
                  Get Started
                </Link>
              </div>
            )}

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
          {!user && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }}>
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-gradient" style={{ width: '100%' }}>
                Get Started
              </Link>
            </div>
          )}
          {user && (
             <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <Link to="/dashboard" className="btn btn-secondary" style={{ width: '100%' }}>
                 Dashboard
               </Link>
               <button onClick={handleLogout} className="btn" style={{ width: '100%', color: 'red', border: '1px solid #fee2e2' }}>
                 Logout
               </button>
             </div>
          )}
        </div>
      )}

      {/* Spacer to offset fixed navbar */}
      <div style={{ height: 'var(--nav-height)' }} />

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: flex !important; }
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.375rem;
          padding-right: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .profile-trigger:hover {
          background: var(--bg-tertiary);
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.75rem;
          box-shadow: 0 4px 8px rgba(99,102,241,0.2);
        }

        .trigger-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .credits-count {
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .trigger-arrow {
          color: var(--text-muted);
          transition: transform 0.3s ease;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 0.75rem);
          right: 0;
          width: 240px;
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--glass-border);
          border-radius: 1.5rem;
          padding: 0.75rem;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.12);
          z-index: 110;
        }

        .dropdown-header {
          padding: 0.75rem 1rem;
        }

        .user-name-display {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.125rem;
        }

        .user-email-display {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0.75rem;
        }

        .dropdown-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.625rem 0.75rem;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 700;
          transition: all 0.2s;
          background: transparent;
          border: none;
          width: 100%;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .item-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-item:hover {
          background: var(--red-light);
          color: var(--red);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
