import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error('Please fill in all fields');
    }
    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setIsSubmitting(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      toast.success('Welcome to Snaplix AI!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <Helmet>
        <title>Create Account — Snaplix AI</title>
      </Helmet>

      {/* Dynamic Background Elements */}
      <div className="auth-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card-wrapper animate-slide-up">
          <div className="auth-card-glass">
            <div className="auth-header">
              <Link to="/" className="auth-logo-link">
                <div className="auth-logo-icon">
                  <Sparkles size={24} className="text-white" />
                </div>
              </Link>
              <h1 className="auth-title">Get Started</h1>
              <p className="auth-subtitle">Create your account to unlock full AI power</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-stack">
                <div className="input-wrapper top">
                  <div className="input-icon">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Full Name"
                  />
                </div>
                <div className="input-wrapper middle">
                  <div className="input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Email Address"
                  />
                </div>
                <div className="input-wrapper bottom">
                  <div className="input-icon">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Create Password"
                  />
                </div>
              </div>

              <div className="benefits-list">
                <div className="benefit-item">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>5 Free Daily Credits</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>High-Resolution Exports</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gradient w-full py-4 rounded-xl flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login">Sign in here</Link>
              </p>
            </div>
            
            <div className="auth-trust">
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Secure 256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }

        .auth-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s infinite alternate ease-in-out;
        }

        .blob-1 { width: 500px; height: 500px; background: var(--accent); top: -100px; left: -100px; }
        .blob-2 { width: 400px; height: 400px; background: #a855f7; bottom: -50px; right: -50px; animation-delay: -5s; }
        .blob-3 { width: 300px; height: 300px; background: #ec4899; top: 10%; right: 20%; animation-delay: -10s; }

        .auth-content {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 10;
        }

        .auth-card-glass {
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--glass-border);
          border-radius: 2rem;
          padding: 2.5rem 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          max-height: 98vh;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .auth-card-glass::-webkit-scrollbar { display: none; }

        .auth-header { text-align: center; margin-bottom: 2rem; }

        .auth-logo-link { display: inline-block; transition: transform 0.3s ease; }
        .auth-logo-link:hover { transform: scale(1.1) rotate(5deg); }

        .auth-logo-icon {
          width: 48px; height: 48px;
          background: var(--accent-gradient);
          border-radius: 1rem;
          display: flex; items-center; justify-content: center;
          margin: 0 auto 1.25rem;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.25);
        }

        .auth-title {
          font-size: 1.75rem; font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.04em; margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          color: var(--text-secondary);
          font-size: 0.875rem; font-weight: 500;
        }

        .input-stack {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }

        .input-wrapper {
          position: relative;
          transition: background 0.2s;
        }

        .input-wrapper.top, .input-wrapper.middle { border-bottom: 1px solid var(--border-color); }
        .input-wrapper:focus-within { background: var(--bg-card); z-index: 1; }

        .input-icon {
          position: absolute; left: 1rem; top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted); transition: color 0.2s;
          pointer-events: none;
        }

        .auth-input {
          width: 100%; padding: 1rem 1rem 1rem 3.25rem;
          background: transparent; border: none;
          color: var(--text-primary); font-size: 0.9375rem;
          font-weight: 600; outline: none;
        }

        .input-wrapper:focus-within .input-icon { color: var(--accent); }

        .benefits-list {
          margin: 0 0 1.5rem 0.25rem;
          display: flex; flex-direction: column; gap: 0.625rem;
        }

        .benefit-item {
          display: flex; align-items: center; gap: 0.625rem;
          font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary);
        }

        .auth-footer {
          text-align: center; font-size: 0.875rem;
          font-weight: 600; color: var(--text-secondary);
          margin: 1.5rem 0;
        }

        .auth-footer a { color: var(--accent); font-weight: 800; text-decoration: none; }

        .auth-trust {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-color);
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.1); }
          100% { transform: translate(20px, -20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
