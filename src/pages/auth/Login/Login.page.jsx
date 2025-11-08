import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.page.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Visual Branding (simplified) */}
        <div className="login-branding">
          <div className="brand-content">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
              <img src="/logo_white.png" alt="Logo" className="brand-logo-img" />
            </div>
            <div style={{height: 8}} />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your admin account</p>

            {error && (
              <div className="error-message">
                <span className="icon-warning"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder="admin@ceylongate.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-field"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="login-footer">
              Admin access only • Contact IT support for assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
