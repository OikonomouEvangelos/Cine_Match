import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { authService } from '../services/api';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // will be initialized from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginState = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    // initialize
    updateLoginState();

    // listen for auth changes dispatched from other places (Auth.js)
    window.addEventListener('authChanged', updateLoginState);

    return () => {
      window.removeEventListener('authChanged', updateLoginState);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // mode can be 'login' or 'register' (defaults to login)
  const handleAuthClick = (mode = 'login') => {
    navigate(`/auth?mode=${mode}`);
  };

  const handleLogout = () => {
    authService.logout();
    // notify other components
    window.dispatchEvent(new Event('authChanged'));
    setIsLoggedIn(false);
    alert('Αποσυνδεθήκατε με επιτυχία');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">CineMatch</span>
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-item">Αρχική</Link>
          <Link to="/movies" className="nav-item">Ταινίες</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <form className="search-section" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Αναζήτηση ταινιών..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">Αναζήτηση</button>
          </form>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#f5c518' }}>Καλώς ήρθες!</span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  color: '#f5c518',
                  border: '1px solid #f5c518',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f5c518';
                  e.target.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#f5c518';
                }}
              >
                Αποσύνδεση
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleAuthClick('login')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#f5c518',
                  border: '1px solid #f5c518',
                  padding: '0.45rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f5c518';
                  e.target.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#f5c518';
                }}
              >
                Login
              </button>

              <button
                onClick={() => handleAuthClick('register')}
                style={{
                  backgroundColor: '#f5c518',
                  color: '#000',
                  border: 'none',
                  padding: '0.45rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ffdf6b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;