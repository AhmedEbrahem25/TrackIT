// src/components/UserProfile/ProfileNavigation.jsx
import React from 'react';

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="profile-nav">
      <button 
        className={`nav-button ${activeTab === 'courses' ? 'active' : ''}`}
        onClick={() => setActiveTab('courses')}
      >
        <i className="fas fa-book-open"></i> My Courses
      </button>
      <button 
        className={`nav-button ${activeTab === 'experience' ? 'active' : ''}`}
        onClick={() => setActiveTab('experience')}
      >
        <i className="fas fa-briefcase"></i> Experience
      </button>
      <button 
        className={`nav-button ${activeTab === 'education' ? 'active' : ''}`}
        onClick={() => setActiveTab('education')}
      >
        <i className="fas fa-graduation-cap"></i> Education
      </button>
      <button 
        className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
        onClick={() => setActiveTab('skills')}
      >
        <i className="fas fa-star"></i> Skills
      </button>
      <button 
        className={`nav-button ${activeTab === 'resume' ? 'active' : ''}`}
        onClick={() => setActiveTab('resume')}
      >
        <i className="fas fa-file-alt"></i> Resume
      </button>
    </nav>
  );
};

export default ProfileNavigation;