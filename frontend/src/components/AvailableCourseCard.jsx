// src/components/UserProfile/cards/AvailableCourseCard.jsx
import React from 'react';

const AvailableCourseCard = ({ course, enrollInCourse }) => {
  return (
    <div className="course-card detailed-card">
      <div className="course-image-container">
        <div className="course-image" style={{ backgroundColor: getRandomColor() }}>
          <span>{course.title.substring(0, 2)}</span>
        </div>
        <span className={`course-level ${course.level}`}>{course.level}</span>
      </div>
      
      <h4 className="course-title">{course.title}</h4>
      <p className="course-description">{course.description}</p>
      
      <div className="course-meta">
        <div className="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{course.duration}</span>
        </div>
        <div className="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>by {course.instructor}</span>
        </div>
      </div>
      
      <div className="course-footer">
        {course.rating && (
          <div className="course-rating">
            <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{course.rating}</span>
          </div>
        )}
        
        {course.enrolled && (
          <div className="course-students">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{course.enrolled} students</span>
          </div>
        )}
      </div>
      
      <button 
        className="course-button" 
        onClick={() => enrollInCourse(course.id)}
      >
        Enroll Now
      </button>
    </div>
  );
};

// Helper function to generate random colors for course thumbnails
const getRandomColor = () => {
  const colors = [
    '#4f46e5', '#0891b2', '#16a34a', '#ca8a04', '#ea580c', 
    '#be123c', '#9333ea', '#2563eb', '#059669', '#d97706'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default AvailableCourseCard;