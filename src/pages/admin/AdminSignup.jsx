import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Key, Loader2, Eye, EyeOff } from 'lucide-react';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminKey: 'admin123' // Pre-filled for demo
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="admin-page flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, adminKey } = formData;

    if (!name || !email || !password || !adminKey) {
      return toast.error('Please fill in all fields');
    }

    setIsSubmitting(true);
    try {
      await signup(name, email, password, adminKey);
      toast.success('Admin account created successfully! Welcome to the dashboard.');
      navigate('/admin');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Registration failed';
      toast.error(errorMsg);
      console.error("Signup error details:", err);
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
          <div className="auth-icon" style={{ backgroundColor: '#9333ea' }}>
            <UserPlus size={32} />
          </div>
          <h1 className="text-white mb-2">Create Admin</h1>
          <p className="text-slate-400">Join the BG Remover administration team</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-auth"
                placeholder="Admin Joe"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-auth"
                placeholder="••••••••"
                required
                autoComplete="new-password"
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

          <div className="form-group">
            <label className="form-label">Secret Admin Key</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Key size={18} />
              </div>
              <input
                type="password"
                name="adminKey"
                value={formData.adminKey}
                onChange={handleChange}
                className="input-auth"
                placeholder="Registration code (admin123)"
                required
                autoComplete="off"
              />
            </div>
            <p className="text-xs mt-2 text-slate-400">Use <strong className="text-accent">admin123</strong> for this demo environment.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-gradient w-full"
            style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: '#9333ea' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Register Admin</span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/admin/login" style={{ color: '#9333ea' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
