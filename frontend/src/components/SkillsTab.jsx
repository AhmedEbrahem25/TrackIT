import React from 'react';

const SkillsTab = ({ userData, editMode, setUserData }) => {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Skills</h2>
      
      {!editMode ? (
        <div className="skills-grid">
          {userData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
            <div key={index} className="skill-badge">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <div className="skills-edit-container">
          <div className="skills-edit-grid">
            {userData.skills.map((skill, index) => (
              <div key={index} className="skill-edit-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...userData.skills];
                    newSkills[index] = e.target.value;
                    setUserData(prev => ({ ...prev, skills: newSkills }));
                  }}
                  className="skill-input"
                  placeholder="Add skill"
                />
                {userData.skills.length > 1 && (
                  <button 
                    className="skill-remove-btn"
                    onClick={() => {
                      const newSkills = userData.skills.filter((_, i) => i !== index);
                      setUserData(prev => ({ ...prev, skills: newSkills }));
                    }}
                    aria-label="Remove skill"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button 
            className="skill-add-btn"
            onClick={() => {
              setUserData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
            }}
          >
            <i className="fas fa-plus"></i> Add Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsTab;