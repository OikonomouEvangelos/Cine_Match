import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Προσωρινά - θα γίνει dynamic
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
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
            <button
              onClick={handleAuthClick}
              style={{
                backgroundColor: '#f5c518',
                color: '#000',
                border: 'none',
                padding: '0.5rem 1.5rem',
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;