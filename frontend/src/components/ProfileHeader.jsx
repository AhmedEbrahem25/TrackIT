// src/components/UserProfile/ProfileHeader.jsx
import React from 'react';
import defaultProfileImage from '../images/default-profile.jpg'; // Adjust the path as needed


const ProfileHeader = ({ userData, editMode, setEditMode, handleInputChange }) => {
  const { personalInfo } = userData;
  
  return (
    <div className="profile-header">
         <div className="avatar-container">
        <img 
          src={personalInfo.avatar || defaultProfileImage} 
          alt="User Avatar" 
          className="profile-avatar" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultProfileImage;
          }}
        />
        {editMode && (
          <button className="avatar-upload-button">
            <i className="fas fa-camera"></i> Change Photo
          </button>
        )}
      </div>
      
      <div className="profile-info">
        {editMode ? (
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
            className="edit-input"
          />
        ) : (
          <h1>{personalInfo.name}</h1>
        )}
        
        {editMode ? (
          <>
            <input
              type="text"
              value={personalInfo.bio}
              onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
              className="edit-input bio-input"
            />
          </>
        ) : (
          <p className="profile-bio">{personalInfo.bio}</p>
        )}
        
        <div className="profile-meta">
          {editMode ? (
            <div className="meta-grid">
              <div className="meta-item">
                <label>Email:</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="edit-input"
                />
              </div>
              <div className="meta-item">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="edit-input"
                />
              </div>
              <div className="meta-item">
                <label>Location:</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="edit-input"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="meta-item">
                <i className="fas fa-envelope"></i>
                <span>{personalInfo.email}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-phone"></i>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{personalInfo.location}</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="profile-actions">
        <button 
          className={`edit-profile-button ${editMode ? 'save-mode' : ''}`}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Save Profile' : 'Edit Profile'}
        </button>
        <button className="download-resume-button">
          <i className="fas fa-download"></i> Download Resume
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;