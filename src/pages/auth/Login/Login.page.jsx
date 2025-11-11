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
            <h1 className="login-title">Welcome!!</h1>
            <p className="login-subtitle">Login with Email</p>

            {error && (
              <div className="error-message">
                <span className="icon-warning"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <span className="input-icon" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5v7A2.5 2.5 0 005.5 18h13a2.5 2.5 0 002.5-2.5v-7" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 6.5l-9 6-9-6" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <span className="input-icon" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="9" rx="2" stroke="#6B7280" strokeWidth="1.2"/><path d="M7 11V8a5 5 0 0110 0v3" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
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
              </div>

              

              <button
                type="submit"
                className="btn-block login-cta"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>
            </form>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
