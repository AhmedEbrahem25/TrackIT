// src/components/UserProfile/UserProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileNavigation from './ProfileNavigation';
import CoursesTab from './tabs/CoursesTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import SkillsTab from './tabs/SkillsTab';
import ResumeTab from './tabs/ResumeTab';
import userData from './userData'; // Initial user data moved to separate file
import '../Style/UserProfile.css'; // Importing CSS for UserProfile

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [editMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(userData);
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');


  // Sample available courses for enrollment
  const availableCourses = [
    {
      id: 3,
      title: "title",
      instructor: "Instructor",
      duration: "0 hours"
    },
    {
      id: 4,
      title: "title",
      instructor: "Instructor",
      duration: "0 hours"
    }
  ];

  const handleInputChange = (section, field, value) => {
    setUserState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };
  const enrollInCourse = (courseId) => {
    const courseToEnroll = availableCourses.find(course => course.id === courseId);
    if (courseToEnroll) {
      const newEnrolledCourse = {
        ...courseToEnroll,
        progress: 0,
        lastAccessed: new Date().toISOString().split('T')[0],
        certification: false
      };
      setUserState(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, newEnrolledCourse]
      }));
    }
  };

  return (
    <div className="user-profile-container">
      {/* Back Button */}
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left"></i> Back to Course
      </button>
      
      <ProfileHeader 
        userData={userState} 
        editMode={editMode} 
        setEditMode={setEditMode}
        handleInputChange={handleInputChange}
      />

      <ProfileNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="profile-content">
        {activeTab === 'courses' && (
          <CoursesTab 
            enrolledCourses={userState.enrolledCourses}
            availableCourses={availableCourses}
            enrollInCourse={enrollInCourse}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceTab 
            workExperience={userState.workExperience}
            editMode={editMode}
            setUserState={setUserState}
          />
        )}

        {activeTab === 'education' && (
          <EducationTab 
            education={userState.education}
            editMode={editMode}
            handleInputChange={handleInputChange}
            setUserState={setUserState}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsTab 
          userData={userState} 
          editMode={editMode} 
          setUserData={setUserState} 
        />
        )}

        {activeTab === 'resume' && (
            <ResumeTab 
            userData={userState} 
            selectedFileName={selectedFileName} 
            handleFileChange={handleFileChange} 
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;