import React from 'react';

const EducationCard = ({ education, editMode, updateEducation, onRemove }) => {
  return (
    <div className={`education-card ${editMode ? 'edit-mode' : ''}`}>
      {editMode ? (
        <div className="education-edit-form">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="education-input"
                placeholder="e.g. Bachelor's in Computer Science"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Institution</label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="education-input"
                placeholder="University name"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Year</label>
              <input
                type="text"
                value={education.year}
                onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                className="education-input"
                placeholder="Graduation year"
              />
            </div>
          </div>
          
          <button 
            className="remove-education-btn"
            onClick={() => onRemove(education.id)}
            aria-label="Remove education"
          >
            <i className="fas fa-trash"></i> Remove
          </button>
        </div>
      ) : (
        <div className="education-view">
          <h3 className="education-degree">{education.degree}</h3>
          <div className="education-details">
            <span className="education-institution">
              <i className="fas fa-university"></i> {education.institution}
            </span>
            <span className="education-year">
              <i className="fas fa-calendar-alt"></i> {education.year}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCard;