import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/NavigationBar.css'; 

// Main NavBar Component
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <header className={`pro-header ${isScrolled ? 'header-sticky' : ''}`}>
        <div className="pro-container">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              Track<span className="logo-highlight">It</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-links desktop-only">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/courses" className="nav-item">Courses</Link>
            <Link to="/roadmap" className="nav-item">Roadmaps</Link>
            <Link to="/career/recommendations" className="nav-item">Recommendations</Link>
          </nav>
          
          {/* Search Bar */}
          <div className="search-container desktop-only">
            <form className="form">
              <label htmlFor="search">
                <input className="input" type="text" required="" 
                  placeholder="Search TrackIt" id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="fancy-bg"></div>
                <div className="search">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </div>
                <button className="close-btn" type="reset">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </label>
            </form>
          </div>
          
          {/* User Actions */}
          <div className="user-actions desktop-only">
            <Link to="/login" className="beautiful-button login-btn">Log In</Link>
            <Link to="/signup" className="beautiful-button signup-btn">Sign Up</Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle mobile-only" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <form className="form mobile-form">
            <label htmlFor="mobile-search">
              <input className="input" type="text" required="" 
                placeholder="Search TrackIt" id="mobile-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
              <div className="fancy-bg"></div>
              <div className="search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
              </div>
              <button className="close-btn" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </label>
          </form>
        </div>
        
        <nav className="mobile-nav">
          <Link to="/" className="mobile-nav-item">Home</Link>
          <Link to="/courses" className="mobile-nav-item">Courses</Link>
          <Link to="/roadmap" className="mobile-nav-item">Roadmaps</Link>
          <Link to="/career/recommendations" className="mobile-nav-item">Recommendations</Link>
        </nav>
        
        <div className="mobile-actions">
          <Link to="/auth/login" className="beautiful-button mobile-btn">Log In</Link>
          <Link to="/auth/signup" className="beautiful-button mobile-btn">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;