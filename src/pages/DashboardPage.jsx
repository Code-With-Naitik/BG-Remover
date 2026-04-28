import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  Crown, 
  History, 
  Settings, 
  TrendingUp, 
  Image as ImageIcon, 
  ArrowRight,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Layout,
  LogOut,
  Bell,
  Search,
  Plus,
  MoreVertical,
  ExternalLink,
  Download,
  Trash2,
  X,
  Menu
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DashboardPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="dashboard-loader">
        <div className="loader-orbit">
          <div className="loader-inner"></div>
        </div>
      </div>
    );
  }

  const creditPercentage = user.isPremium ? 100 : (user.credits / 5) * 100;

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Helmet>
        <title>Dashboard — Snaplix AI</title>
      </Helmet>

      {/* Sidebar Overlay for Background Effects */}
      <div className="dashboard-bg">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="logo-icon">
              <Sparkles size={20} className="text-white" />
            </div>
            <span>Snaplix <span className="text-accent">AI</span></span>
          </Link>
          <button 
            className="sidebar-close lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="group-label">General</span>
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
            >
              <Layout size={20} />
              <span>Overview</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}
            >
              <History size={20} />
              <span>History</span>
            </button>
            <Link to="/tool" className="nav-item">
              <Plus size={20} />
              <span>New Removal</span>
            </Link>
          </div>

          <div className="nav-group">
            <span className="group-label">Account</span>
            <button className="nav-item">
              <CreditCard size={20} />
              <span>Billing</span>
            </button>
            <button className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-small">
            <div className="avatar-initials">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <span className="user-plan">{user.isPremium ? 'Pro' : 'Free'} Plan</span>
            </div>
            <button onClick={logout} className="logout-btn-minimal" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="menu-toggle lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="header-search">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search your history..." />
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="header-divider"></div>
            <Link to="/pricing" className="credit-pill">
              <Zap size={14} className="fill-current text-amber-500" />
              <span>{user.isPremium ? 'Unlimited' : `${user.credits} Credits`}</span>
            </Link>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="content-container">
            {/* Hero Section */}
            <section className="welcome-hero animate-fade-in">
              <div className="hero-text">
                <h1>Welcome back, {user.name.split(' ')[0]}! ✨</h1>
                <p>You have {user.credits} credits left. Ready to create something amazing?</p>
              </div>
              <div className="hero-actions">
                <Link to="/tool" className="btn btn-primary-gradient">
                  <Plus size={18} />
                  Start New Project
                </Link>
              </div>
            </section>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-icon-wrapper bg-amber-500/10 text-amber-500">
                  <Zap size={24} className="fill-current" />
                </div>
                <div className="stat-data">
                  <span className="stat-label">Available Credits</span>
                  <div className="stat-value-group">
                    <span className="stat-value">{user.isPremium ? '∞' : user.credits}</span>
                    <span className="stat-total">/ 5 daily</span>
                  </div>
                </div>
                <div className="stat-progress">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${creditPercentage}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="stat-card glass-card">
                <div className="stat-icon-wrapper bg-indigo-500/10 text-indigo-500">
                  <Crown size={24} className="fill-current" />
                </div>
                <div className="stat-data">
                  <span className="stat-label">Active Plan</span>
                  <span className="stat-value text-xl">
                    {user.subscriptionPlan === 'free' ? 'Starter Free' : 'Pro Member'}
                  </span>
                </div>
                <Link to="/pricing" className="stat-link">
                  Manage Plan <ArrowRight size={14} />
                </Link>
              </div>

              <div className="stat-card glass-card">
                <div className="stat-icon-wrapper bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="stat-data">
                  <span className="stat-label">Account Health</span>
                  <span className="stat-value text-xl">Active & Secure</span>
                </div>
                <div className="stat-badge success">Verified</div>
              </div>
            </div>

            {/* Recent Work and Promo */}
            <div className="content-grid">
              <div className="recent-work-section glass-card">
                <div className="section-header">
                  <div className="flex items-center gap-3">
                    <div className="icon-rounded bg-slate-100 text-slate-500">
                      <History size={18} />
                    </div>
                    <h2>Recent History</h2>
                  </div>
                  <button className="text-btn">View All</button>
                </div>

                <div className="work-grid">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="work-item group">
                      <div className="work-preview">
                        <div className="preview-placeholder">
                          <ImageIcon size={32} className="text-slate-200" />
                        </div>
                        <div className="preview-overlay">
                          <button className="preview-btn"><Download size={16} /></button>
                          <button className="preview-btn"><ExternalLink size={16} /></button>
                        </div>
                      </div>
                      <div className="work-details">
                        <span className="work-name">removal_output_{i}.png</span>
                        <span className="work-meta">2 days ago • 1.2MB</span>
                      </div>
                      <button className="work-more"><MoreVertical size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="promo-sidebar">
                <div className="premium-upsell glass-card">
                  <div className="upsell-icon">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <h3>Go Unlimited</h3>
                  <p>Unlock HD quality, batch processing and priority AI rendering.</p>
                  <Link to="/pricing" className="btn btn-white-glass w-full">
                    Upgrade Now
                  </Link>
                </div>

                <div className="quick-actions glass-card">
                  <h4>Quick Links</h4>
                  <div className="action-list">
                    <Link to="/blog" className="action-item">
                      <span>Help Center</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link to="/contact" className="action-item">
                      <span>Support Chat</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .dashboard-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
        }

        .glow-1 { width: 500px; height: 500px; background: var(--accent); top: -200px; right: -100px; }
        .glow-2 { width: 400px; height: 400px; background: #a855f7; bottom: -100px; left: -100px; }

        /* Sidebar Styles */
        .dashboard-sidebar {
          width: 280px;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 50;
        }

        .sidebar-header {
          padding: 2rem;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--accent-gradient);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
        }

        .nav-group {
          margin-bottom: 2rem;
        }

        .group-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 1rem 0.75rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .nav-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: var(--accent-light);
          color: var(--accent);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .user-profile-small {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
        }

        .avatar-initials {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: var(--text-primary);
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 700;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .user-plan {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .logout-btn-minimal {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .logout-btn-minimal:hover {
          background: var(--red-light);
          color: var(--red);
        }

        /* Main Content */
        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        .dashboard-header {
          height: 80px;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .header-search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-secondary);
          padding: 0.625rem 1rem;
          border-radius: 10px;
          width: 320px;
          border: 1px solid var(--border-color);
        }

        .header-search input {
          background: none;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.875rem;
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .icon-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        .header-divider {
          width: 1px;
          height: 24px;
          background: var(--border-color);
        }

        .credit-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.8125rem;
          text-decoration: none;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }

        .credit-pill:hover {
          background: var(--border-color);
          transform: translateY(-1px);
        }

        /* Dashboard Content */
        .dashboard-content {
          padding: 2.5rem;
          flex: 1;
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-hero {
          margin-bottom: 2.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: var(--accent-gradient);
          padding: 3rem;
          border-radius: 2rem;
          color: white;
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
          position: relative;
          overflow: hidden;
        }

        .welcome-hero::after {
          content: "";
          position: absolute;
          top: -20%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: white;
          opacity: 0.1;
          border-radius: 50%;
        }

        .hero-text h1 { font-size: 2.25rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -0.04em; }
        .hero-text p { font-size: 1rem; font-weight: 500; opacity: 0.9; }

        .btn-primary-gradient {
          background: white;
          color: var(--accent);
          font-weight: 800;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }

        .btn-primary-gradient:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 1.5rem;
          padding: 1.75rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .stat-total {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-left: 0.25rem;
        }

        .stat-progress {
          margin-top: auto;
        }

        .progress-bar-bg {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 10px;
        }

        .stat-link {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
        }

        .stat-badge {
          position: absolute;
          top: 1.75rem;
          right: 1.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .stat-badge.success { background: var(--emerald-light); color: var(--emerald); }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
        }

        .recent-work-section {
          padding: 2rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-header h2 { font-size: 1.25rem; font-weight: 800; }

        .icon-rounded {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-btn {
          background: none;
          border: none;
          color: var(--accent);
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.25rem;
        }

        .work-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1.25rem;
          padding: 0.75rem;
          position: relative;
          transition: all 0.3s;
        }

        .work-item:hover {
          background: var(--bg-card);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .work-preview {
          aspect-ratio: 4/3;
          background: var(--bg-tertiary);
          border-radius: 0.75rem;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .work-item:hover .preview-overlay { opacity: 1; }

        .preview-btn {
          width: 32px;
          height: 32px;
          background: white;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .preview-btn:hover { transform: scale(1.1); }

        .work-name {
          display: block;
          font-weight: 700;
          font-size: 0.8125rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.125rem;
        }

        .work-meta {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .work-more {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        /* Promo Sidebar */
        .promo-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

        .premium-upsell {
          background: var(--accent-gradient);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .upsell-icon {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.2);
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .premium-upsell h3 { font-size: 1.25rem; font-weight: 900; margin-bottom: 0.75rem; }
        .premium-upsell p { font-size: 0.875rem; opacity: 0.9; line-height: 1.6; margin-bottom: 1.5rem; }

        .btn-white-glass {
          background: white;
          color: var(--accent);
          font-weight: 800;
          border-radius: 12px;
          padding: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-white-glass:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

        .quick-actions h4 {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .action-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .action-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .action-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        /* Mobile Sidebar & Header Adjustments */
        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          background: var(--bg-secondary);
        }

        .sidebar-close {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 45;
          animation: fade-in 0.3s ease;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Loader */
        .dashboard-loader {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }

        .loader-orbit {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid var(--accent-light);
          border-top-color: var(--accent);
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1200px) {
          .content-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 991px) {
          .menu-toggle { display: flex; }
          .sidebar-close { display: flex; }
          
          .dashboard-sidebar {
            position: fixed;
            left: -280px;
            top: 0;
            bottom: 0;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 20px 0 50px rgba(0,0,0,0.1);
          }

          .dashboard-sidebar.open {
            transform: translateX(280px);
          }

          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .dashboard-header { padding: 0 1.5rem; }
          .dashboard-content { padding: 1.5rem; }
        }

        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .welcome-hero { padding: 2rem; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .hero-text h1 { font-size: 1.75rem; }
          .header-search { display: none; }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
