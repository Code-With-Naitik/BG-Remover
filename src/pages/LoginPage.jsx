import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.state?.from || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill in all fields');
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Sign In — Snaplix AI</title>
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
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Continue your creative journey with Snaplix AI</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-stack">
                <div className="input-wrapper top">
                  <div className="input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    placeholder="Email Address"
                  />
                </div>
                <div className="input-wrapper bottom">
                  <div className="input-icon">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    placeholder="Password"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Stay signed in</span>
                </label>
                <Link to="/forgot-password" class="forgot-link">
                  Forgot Password?
                </Link>
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
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/signup">Create one for free</Link>
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
        .login-container {
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

        .blob-1 { width: 500px; height: 500px; background: var(--accent); top: -100px; right: -100px; }
        .blob-2 { width: 400px; height: 400px; background: #a855f7; bottom: -50px; left: -50px; animation-delay: -5s; }
        .blob-3 { width: 300px; height: 300px; background: #ec4899; top: 40%; left: 20%; animation-delay: -10s; }

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
          margin-bottom: 1rem;
        }

        .input-wrapper {
          position: relative;
          transition: background 0.2s;
        }

        .input-wrapper.top { border-bottom: 1px solid var(--border-color); }
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

        .password-toggle-btn {
          position: absolute; right: 1rem; top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted); background: none;
          border: none; cursor: pointer; padding: 0.25rem;
        }

        .auth-options {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem; padding: 0 0.25rem;
        }

        .forgot-link {
          font-size: 0.75rem; font-weight: 700;
          color: var(--accent); text-decoration: none;
        }

        .checkbox-container {
          display: flex; align-items: center; cursor: pointer;
          font-size: 0.8125rem; color: var(--text-secondary); font-weight: 600;
        }

        .checkbox-container input { position: absolute; opacity: 0; }
        .checkmark {
          height: 16px; width: 16px; background: var(--bg-tertiary);
          border-radius: 4px; margin-right: 0.5rem; position: relative;
        }

        .checkbox-container input:checked ~ .checkmark { background: var(--accent); }
        .checkmark:after {
          content: ""; position: absolute; display: none;
          left: 5px; top: 2px; width: 4px; height: 8px;
          border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
        }
        .checkbox-container input:checked ~ .checkmark:after { display: block; }

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

export default LoginPage;
