import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
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

        <div className="search-section">
          <input
            type="text"
            placeholder="Αναζήτηση ταινιών..."
            className="search-input"
          />
          <button className="search-btn">Αναζήτηση</button>
        </div>
      </div>
    </header>
  );
};

export default Header;