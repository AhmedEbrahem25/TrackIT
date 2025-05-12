// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './../Style/HomePage.css';

const HomePage = () => {
  return (
    <div className="roadmap-container">
     
      {/* Main Content */}
      <main className="roadmap-main">
        <div className="roadmap-wrapper">
          {/* Hero Section */}
          <section className="roadmap-title hero-section">
            <h2>Your Learning Journey Starts Here</h2>
            <p>TrackIt helps you navigate your career path with curated courses, clear roadmaps, and personalized recommendations tailored to your goals.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="register-button hero-button">Get Started</Link>
              <Link to="/roadmap" className="explore-button hero-button">Explore Roadmaps</Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="category-section">
            <div className="category-header">
              <h3>Discover What We Offer</h3>
            </div>
            <div className="courses-grid">
              {/* Courses Feature */}
              <div className="feature-card course-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="course-title">Professional Courses</h4>
                <p className="feature-desc">Access curated courses designed by industry experts to enhance your professional skills.</p>
                <Link to="/courses/professional" className="feature-link">Browse Courses</Link>
              </div>

              {/* Roadmap Feature */}
              <div className="feature-card course-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h4 className="course-title">Career Roadmaps</h4>
                <p className="feature-desc">Follow step-by-step guides to navigate your career path with clarity and confidence.</p>
                <Link to="/roadmap" className="feature-link">View Roadmaps</Link>
              </div>

              {/* Recommendations Feature */}
              <div className="feature-card course-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h4 className="course-title">Personalized Recommendations</h4>
                <p className="feature-desc">Get tailored course and career suggestions based on your skills, goals, and interests.</p>
                <Link to="/career/recommendations" className="feature-link">Get Recommendations</Link>
              </div>

              {/* Profile Feature */}
              <div className="feature-card course-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="course-title">User Profile</h4>
                <p className="feature-desc">Track your progress, manage your learning journey, and showcase your achievements.</p>
                <Link to="/users/profile" className="feature-link">View Profile</Link>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="cta-section roadmap-title">
            <h2>Ready to Level Up Your Career?</h2>
            <p>Join thousands of professionals who are achieving their goals with TrackIt's structured learning approach.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="register-button hero-button">Create Account</Link>
              <Link to="/login" className="login-button hero-button">Login</Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="roadmap-footer">
        <div className="roadmap-wrapper">
          <p>&copy; {new Date().getFullYear()} TrackIt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;