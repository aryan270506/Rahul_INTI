import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ReachSection from './components/sections/ReachSection.jsx';
import DiscoverPathSection from './components/sections/DiscoverPathSection.jsx';
import AboutHeroSection from './components/sections/AboutHeroSection.jsx'; 
import ScopusSection from './components/sections/ScopusSection.jsx'; 
import MOUListPage from './components/pages/MOUListPage.jsx'; 
import INTILoginPage from './components/pages/Login_Page.jsx';
import FacultyExchange from './components/sections/faculty_exchange.jsx';
import StudyTour from './components/sections/Study_Tour.jsx';
import GlobalPartners from './components/sections/Global_Partners.jsx';
import MobilityManagement from './components/sections/Mobality.jsx';

// ✅ Sidebar Component
const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  
  const menuItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Faculty Exchange', path: '/faculty-exchange', icon: 'faculty' },
    { label: 'Study Tour', path: '/study-tour', icon: 'study' },
    { label: 'MOU/S', path: '/mou-partners', icon: 'mou' },
    { label: 'Mobility', path: '/mobility', icon: 'mobility' },
    { label: 'Global Partners', path: '/global-partners', icon: 'partners' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="side-menu">

      {/* Menu List */}
      <ul>
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={isActive(item.path) ? 'active' : ''}
            onClick={() => window.location.href = item.path}
          >
            <div className="menu-icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {item.icon === 'home' && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
                {item.icon === 'faculty' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>}
                {item.icon === 'study' && <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>}
                {item.icon === 'mou' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>}
                {item.icon === 'mobility' && <circle cx="12" cy="12" r="10" />}
                {item.icon === 'partners' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
              </svg>
            </div>
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* 🚀 Fixed at bottom – Logout Button */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        .side-menu {
          position: fixed;
          top: 64px;
          left: 0;
          width: 90px;
          height: calc(100vh - 128px);
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          z-index: 1000;
          overflow-y: auto;
          padding-top: 20px;
        }

        .side-menu ul { list-style: none; padding: 0; margin: 0; }

        .side-menu li {
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .side-menu li:hover { background: #f9fafb; color: #374151; }
        .side-menu li.active { background: #eff6ff; color: #3b82f6; border-left-color: #3b82f6; }

        .menu-icon-container { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
        .menu-label { font-weight: 500; white-space: nowrap; text-align: center; }

        /* Logout at bottom */
        .logout-container {
          position: absolute;
          bottom: 15px;
          left: 0;
          width: 100%;
          text-align: center;
        }

        .logout-btn {
          width: 80%;
          padding: 10px 0;
          border: none;
          background: #ef4444;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        @media (max-width: 768px) {
          .side-menu { width: 70px; }
          .menu-label { display: none; }
        }
      `}</style>
    </div>
  );
};


// ✅ Home Page Sections
const HomePageContent = () => (
  <div className="space-y-8">
    <HeroSection />
    <AboutHeroSection />
    <ReachSection />
    <ScopusSection /> 
    <DiscoverPathSection />
  </div>
);

// ✅ Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  // ✅ Check for existing session on app load
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage first for persistent session
    const sessionData = localStorage.getItem('userSession');
    
    if (sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData);
        return parsedSession.isAuthenticated === true;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return false;
      }
    }
    
    return false;
  });

  // ✅ Verify session on component mount
  useEffect(() => {
    const verifySession = () => {
      const sessionData = localStorage.getItem('userSession');
      
      if (sessionData) {
        try {
          const parsedSession = JSON.parse(sessionData);
          if (parsedSession.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Session verification failed:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifySession();
  }, []);

  // ✅ Handle login - creates session
  const handleLogin = () => {
    setIsAuthenticated(true);
    // Session data is already stored in Login_Page.jsx
  };

  // ✅ Handle logout - clears session completely
  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    
    // Update authentication state
    setIsAuthenticated(false);
    
    // Optional: Show logout confirmation
    alert('You have been logged out successfully!');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans antialiased">

        {/* Header */}
        {isAuthenticated && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-300">
            <Header onLogout={handleLogout} />
          </div>
        )}

        <div className="flex flex-1">
          {/* Sidebar */}
          {isAuthenticated && <Sidebar onLogout={handleLogout} />}


          {/* Main Content */}
          <main className={`flex-1 min-h-screen transition-all duration-300 ${
            isAuthenticated ? 'ml-[90px]' : 'ml-0'
          } ${isAuthenticated ? 'mt-16 mb-16' : 'mt-0 mb-0'}`}>
            <div className="p-6">
              <Routes>
                {/* Login */}
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? <Navigate to="/" replace /> : <INTILoginPage onLogin={handleLogin} />
                  } 
                />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HomePageContent /></ProtectedRoute>} />
                <Route path="/mou-partners" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MOUListPage /></ProtectedRoute>} />
                <Route path="/faculty-exchange" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FacultyExchange /></ProtectedRoute>} />
                <Route path="/study-tour" element={<ProtectedRoute isAuthenticated={isAuthenticated}><StudyTour /></ProtectedRoute>} />
                <Route path="/mobility" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MobilityManagement /></ProtectedRoute>} />
                <Route path="/global-partners" element={<ProtectedRoute isAuthenticated={isAuthenticated}><GlobalPartners /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* Footer */}
        {isAuthenticated && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-inner border-t border-gray-300">
            <Footer />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;