import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Key, Loader2, Eye, EyeOff } from 'lucide-react';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    adminKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, admin, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && admin) {
      navigate('/admin');
    }
  }, [admin, loading, navigate]);

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
    const { username, email, password, adminKey } = formData;

    if (!username || !email || !password || !adminKey) {
      return toast.error('Please fill in all fields');
    }

    setIsSubmitting(true);
    try {
      await signup(username, email, password, adminKey);
      toast.success('Admin account created! Please sign in.');
      navigate('/admin/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          <div className="auth-icon" style={{backgroundColor: '#9333ea'}}>
            <UserPlus size={32} />
          </div>
          <h1 className="text-white mb-2">Create Admin</h1>
          <p className="text-slate-400">Join the BG Remover administration team</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-auth"
                placeholder="admin_joe"
                required
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
                placeholder="Registration code"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-gradient w-full"
            style={{padding: '1rem', borderRadius: '1rem', backgroundColor: '#9333ea'}}
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
            <Link to="/admin/login" style={{color: '#9333ea'}}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
