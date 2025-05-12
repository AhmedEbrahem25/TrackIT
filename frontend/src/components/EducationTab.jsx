import React from 'react';
import EducationCard from './EducationCard';

const EducationTab = ({ education, editMode, setUserState }) => {
  const addNewEducation = () => {
    setUserState(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          year: ""
        }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setUserState(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setUserState(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <div className="education-container">
      <h2 className="education-header">
        <i className="fas fa-graduation-cap"></i> Education
        {editMode && education.length === 0 && (
          <span className="empty-state-message">Add your education history</span>
        )}
      </h2>
      
      <div className="education-list">
        {education.map(edu => (
          <EducationCard 
            key={edu.id} 
            education={edu}
            editMode={editMode}
            updateEducation={updateEducation}
            onRemove={removeEducation}
          />
        ))}
      </div>
      
      {editMode && (
        <button 
          className="add-education-btn"
          onClick={addNewEducation}
        >
          <i className="fas fa-plus"></i> Add Education
        </button>
      )}
    </div>
  );
};

export default EducationTab;