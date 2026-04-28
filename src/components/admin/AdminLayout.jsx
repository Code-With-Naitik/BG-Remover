import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Activity,
  Image as ImageIcon,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { user, loading, logout, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Blogs', icon: FileText, path: '/admin/blogs' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Analytics', icon: Activity, path: '/admin/analytics' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Top Bar */}
      <header className="admin-mobile-header">
        <div className="flex items-center gap-2">
          <div className="logo-box" style={{ width: '32px', height: '32px' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span className="brand-name" style={{ fontSize: '1.25rem' }}>Snaplix AI</span>
        </div>
        <button className="mobile-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Overlay */}
      {isSidebarOpen && <div className="admin-sidebar-overlay" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <Link to="/" className="flex items-center gap-2 font-bold text-white" style={{ textDecoration: 'none' }}>
            <div className="logo-box">
              <Sparkles size={20} color="white" />
            </div>
            <span className="brand-name">Snaplix AI</span>
          </Link>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/admin/settings" className="user-pill-link" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="user-pill">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', margin: 0 }}>{user.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Administrator</p>
              </div>
            </div>
          </Link>
          <button
            onClick={logout}
            className="btn-logout"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
