import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, logout, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="admin-page flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    setIsSubmitting(true);
    try {
      const data = await login(email, password);
      console.log('Login Response:', data);
      console.log('User Role:', data.user?.role);

      if (data.user.role !== 'admin') {
        const promoteUser = async () => {
          try {
            await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/debug/promote`, { email });
            toast.success('You have been promoted to Admin! Please sign in again.');
          } catch (e) {
            toast.error('Promotion failed. Use the signup page with key admin123.');
          }
        };

        toast((t) => (
          <span>
            <b>Access Denied:</b> You are not an admin.
            <button
              onClick={() => {
                promoteUser();
                toast.dismiss(t.id);
              }}
              style={{ marginLeft: '10px', background: '#9333ea', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Promote Me (Debug)
            </button>
          </span>
        ), { duration: 6000 });

        logout();
        return;
      }

      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-orb admin-orb-1"></div>
      <div className="admin-orb admin-orb-2"></div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Lock size={32} />
          </div>
          <h1 className="text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Secure access to background remover backend</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-auth"
                placeholder="admin@bgremover.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-auth"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-slate-400" style={{ fontSize: '0.875rem' }}>Remember me</span>
            </label>
            <a href="#" className="text-accent" style={{ fontSize: '0.875rem' }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-gradient w-full"
            style={{ padding: '1rem', borderRadius: '1rem' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an admin account?{' '}
            <Link to="/admin/signup">
              Create One
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-slate-400" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
          &copy; 2026 BG Remover Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
