import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "./image.png"; 

const INTILoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isSignUp) {
      console.log('Sign up with:', formData);
      alert('Sign up successful! Please login.');
      setIsSignUp(false);
      setFormData({ email: '', username: '', password: '' });
    } else {
      console.log('Login with:', { username: formData.username, password: formData.password });

      // ----------- STATIC LOGIN CREDENTIALS -----------
      const staticUser = "Admin";
      const staticPass = "admin123";
      // -------------------------------------------------

      if (formData.username === staticUser && formData.password === staticPass) {
        alert('Login successful!');
        
        // Create session data
        const sessionData = {
          username: formData.username,
          loginTime: new Date().toISOString(),
          isAuthenticated: true
        };
        
        // Store session in sessionStorage (cleared when browser/tab closes)
        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
        
        // Also store in localStorage for persistence across browser restarts
        localStorage.setItem('userSession', JSON.stringify(sessionData));
        
        onLogin();
        navigate('/');
      } else {
        alert('Invalid username or password! Please try again.');
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', username: '', password: '' });
  };

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const logoContainerStyle = {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    backgroundColor: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 10
  };

  const logoContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const logoIconStyle = {
    color: '#dc2626',
    fontSize: '2rem',
    fontWeight: 'bold'
  };

  const logoTextStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const logoTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const logoSubtitleStyle = {
    fontSize: '0.75rem',
    color: '#4b5563'
  };

  const formCardStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '28rem',
    padding: '2rem',
    zIndex: 1
  };

  const formTitleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#1f2937'
  };

  const formSubtitleStyle = {
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: '2rem'
  };

  const formFieldsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const inputLabelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const inputFieldStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    outline: 'none',
    fontSize: '1rem',
    transition: 'all 0.2s'
  };

  const submitButtonStyle = {
    width: '100%',
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s'
  };

  const toggleFormStyle = {
    marginTop: '1.5rem',
    textAlign: 'center'
  };

  const toggleTextStyle = {
    color: '#4b5563'
  };

  const toggleButtonStyle = {
    color: '#dc2626',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '1rem'
  };

  return (
    <div style={containerStyle}>
      {/* Logo in top left corner */}
      <div style={logoContainerStyle}>
        <div style={logoContentStyle}>
          <div style={logoIconStyle}>✱</div>
          <div style={logoTextStyle}>
            <span style={logoTitleStyle}>INTI</span>
            <span style={logoSubtitleStyle}>International University & Colleges</span>
          </div>
        </div>
      </div>

      {/* Login/Signup Box */}
      <div style={formCardStyle}>
        <h2 style={formTitleStyle}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p style={formSubtitleStyle}>
          {isSignUp ? 'Sign up to get started' : 'Login to your account'}
        </p>

        <div style={formFieldsStyle}>
          {isSignUp && (
            <div style={inputGroupStyle}>
              <label style={inputLabelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputFieldStyle}
                placeholder="Enter your email"
              />
            </div>
          )}

          <div style={inputGroupStyle}>
            <label style={inputLabelStyle}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={inputFieldStyle}
              placeholder="Enter your username"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputLabelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputFieldStyle}
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleSubmit}
            style={submitButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <div style={toggleFormStyle}>
          <p style={toggleTextStyle}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleForm}
              style={toggleButtonStyle}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default INTILoginPage;