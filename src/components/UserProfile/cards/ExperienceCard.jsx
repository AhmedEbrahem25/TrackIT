// src/components/UserProfile/cards/ExperienceCard.jsx
import React from 'react';

const ExperienceCard = ({ 
  experience, 
  editMode, 
  updateExperience, 
  updateResponsibility, 
  addResponsibility 
}) => {
  return (
    <div className="experience-card">
      {editMode ? (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={experience.duration}
                onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                className="edit-input"
              />
            </div>
          </div>
          
          <div className="responsibilities">
            <label>Responsibilities</label>
            {experience.responsibilities.map((resp, index) => (
              <div key={index} className="responsibility-item">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                  className="edit-input"
                />
                {index === experience.responsibilities.length - 1 && (
                  <button 
                    className="add-responsibility"
                    onClick={() => addResponsibility(experience.id)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="experience-header">
            <h3>{experience.position}</h3>
            <span className="company">{experience.company}</span>
            <span className="duration">{experience.duration}</span>
          </div>
          
          <ul className="responsibilities-list">
            {experience.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExperienceCard;