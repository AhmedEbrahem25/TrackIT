import React from 'react';

const Skills = ({ skills = [], editMode, onSkillsChange }) => {
  const updateSkill = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    onSkillsChange(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onSkillsChange(updatedSkills);
  };

  const addSkill = () => {
    onSkillsChange([...skills, ""]);
  };

  return (
    <div className="skills-card">
      <div className="skills-card-header">
        <h2 className="skills-card-title">Skills</h2>
      </div>
      
      {editMode ? (
        <div className="skills-edit-wrapper">
          <div className="skills-edit-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-edit-tag">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="skill-edit-input"
                  placeholder="Enter skill"
                />
                <button 
                  className="skill-edit-remove"
                  onClick={() => removeSkill(index)}
                  aria-label="Remove skill"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
          <button 
            className="skill-primary-btn"
            onClick={addSkill}
          >
            <i className="fas fa-plus"></i> Add Skill
          </button>
        </div>
      ) : (
        <div className="skills-display-grid">
          {skills.filter(skill => skill.trim() !== '').map((skill, index) => (
            <span key={index} className="skill-display-tag">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;