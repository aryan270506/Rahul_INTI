// Header.jsx
import React from 'react';
import { User } from 'lucide-react';
import Button from '../common/Button';
import { navLinks } from '../../data/websiteData.jsx';

const Header = () => (
  <header className="header">
    <div className="container header-layout">
      {/* Logo */}
      <div className="logo-text">
        INTI <span className="logo-subtitle">International University</span>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {navLinks.map((item, idx) => (
          <a
            key={idx}
            href="/"
            onClick={(e) => e.preventDefault()}
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {/* Render icon only for 'User' */}
            {item.icon === 'User' ? <User size={18} /> : <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Apply Now Button */}
      <Button primary className="apply-btn-desktop">
        Apply Now
      </Button>
    </div>
  </header>
);

export default Header;
