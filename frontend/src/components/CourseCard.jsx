// src/components/UserProfile/cards/CourseCard.jsx
import React from 'react';
import '../Style/RecommendationsPage.css'; // Importing CSS for CourseCard
import { FaCalendarAlt, FaCertificate, FaPlay, FaEye } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="recommendation-card">
      <div className="card-header">
        <h3>{course.title}</h3>
        {course.provider && <span className="provider-badge">{course.provider}</span>}
      </div>
      <p>{course.description}</p>
      
      {course.match && (
        <div className="skill-match-meter">
          <h4>Skill Match</h4>
          <div className="meter-container">
            <div 
              className="meter-fill" 
              style={{ width: `${course.match}%` }}
            ></div>
          </div>
          <span className="match-percentage">{course.match}% match</span>
        </div>
      )}
      
      {course.progress && (
        <div className="skill-match-meter">
          <h4>Progress</h4>
          <div className="meter-container">
            <div 
              className="meter-fill" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="match-percentage">{course.progress}% complete</span>
        </div>
      )}
      
      <div className="recommendation-meta">
        {course.duration && <span><FaCalendarAlt /> {course.duration}</span>}
        {course.level && (
          <span className={`level-badge ${course.level.toLowerCase()}`}>
            {course.level}
          </span>
        )}
        {course.lastAccessed && (
          <span><FaCalendarAlt /> Last accessed: {course.lastAccessed}</span>
        )}
        {course.certification && (
          <span className="certification-badge">
            <FaCertificate /> Certification available
          </span>
        )}
      </div>
      
      <div className="card-actions">
        <button className="action-button primary">
          <FaPlay /> Continue
        </button>
        <button className="action-button secondary">
          <FaEye /> View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;