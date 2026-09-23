import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="social-svg-icon">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="social-svg-icon">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.49 2.62-1.24z"/>
    </svg>
  );
}

export function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleQuickAuth = (provider) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      navigate('/profile');
    }, 700);
  };

  return (
    <div className="lune-auth-page">
      <div className="auth-card">
        <span className="auth-brand-logo">L U N E</span>
        <h1 className="auth-title">Welcome to the Atelier</h1>
        <p className="auth-subtitle">Sign in to access your curated wishlist and private appointments.</p>

        {/* Quick Social Auth Buttons */}
        <div className="social-auth-group">
          <button 
            type="button" 
            className="social-auth-btn google-btn"
            onClick={() => handleQuickAuth('google')}
            disabled={!!loadingProvider}
          >
            <GoogleIcon />
            <span>{loadingProvider === 'google' ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>

          <button 
            type="button" 
            className="social-auth-btn apple-btn"
            onClick={() => handleQuickAuth('apple')}
            disabled={!!loadingProvider}
          >
            <AppleIcon />
            <span>{loadingProvider === 'apple' ? 'Connecting...' : 'Sign in with Apple'}</span>
          </button>
        </div>

        {/* Delicate Atelier Divider */}
        <div className="auth-divider">
          <span className="auth-divider-line"></span>
          <span className="auth-divider-text">OR CONTINUE WITH EMAIL</span>
          <span className="auth-divider-line"></span>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Client Name / Full Name</label>
            <div className="input-with-icon">
              <User size={16} />
              <input 
                type="text" 
                placeholder="Elena Rostova" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input 
                type="email" 
                required 
                placeholder="client@atelier.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-with-aside">
              <label>Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to demo email.'); }} className="forgot-password-link">
                Forgot?
              </a>
            </div>
            <div className="input-with-icon">
              <Lock size={16} />
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span>SIGN IN TO ATELIER</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-links">
          <span>New to LUNE?</span>
          <Link to="/register" className="auth-switch-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleQuickAuth = (provider) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      navigate('/profile');
    }, 700);
  };

  return (
    <div className="lune-auth-page">
      <div className="auth-card">
        <span className="auth-brand-logo">L U N E</span>
        <h1 className="auth-title">Create Atelier Profile</h1>
        <p className="auth-subtitle">Receive bespoke styling notes, early lookbook previews, and order history.</p>

        {/* Quick Social Auth Buttons */}
        <div className="social-auth-group">
          <button 
            type="button" 
            className="social-auth-btn google-btn"
            onClick={() => handleQuickAuth('google')}
            disabled={!!loadingProvider}
          >
            <GoogleIcon />
            <span>{loadingProvider === 'google' ? 'Connecting...' : 'Sign up with Google'}</span>
          </button>

          <button 
            type="button" 
            className="social-auth-btn apple-btn"
            onClick={() => handleQuickAuth('apple')}
            disabled={!!loadingProvider}
          >
            <AppleIcon />
            <span>{loadingProvider === 'apple' ? 'Connecting...' : 'Sign up with Apple'}</span>
          </button>
        </div>

        {/* Delicate Atelier Divider */}
        <div className="auth-divider">
          <span className="auth-divider-line"></span>
          <span className="auth-divider-text">OR REGISTER WITH EMAIL</span>
          <span className="auth-divider-line"></span>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={16} />
              <input 
                type="text" 
                required 
                placeholder="Elena Rostova" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input 
                type="email" 
                required 
                placeholder="client@atelier.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={16} />
              <input 
                type="password" 
                required 
                placeholder="Create secure password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span>JOIN THE ATELIER</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Already registered?</span>
          <Link to="/login" className="auth-switch-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
