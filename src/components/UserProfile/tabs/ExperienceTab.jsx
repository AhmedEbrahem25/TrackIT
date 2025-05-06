// src/components/UserProfile/tabs/ExperienceTab.jsx
import React from 'react';
import ExperienceCard from '../cards/ExperienceCard';

const ExperienceTab = ({ workExperience, editMode, setUserState }) => {
  const addNewExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "",
      company: "",
      duration: "",
      responsibilities: [""]
    };
    setUserState(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateExperience = (id, field, value) => {
    setUserState(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateResponsibility = (expId, index, value) => {
    setUserState(prev => {
      const updatedExperience = prev.workExperience.map(exp => {
        if (exp.id === expId) {
          const updatedResponsibilities = [...exp.responsibilities];
          updatedResponsibilities[index] = value;
          return { ...exp, responsibilities: updatedResponsibilities };
        }
        return exp;
      });
      return { ...prev, workExperience: updatedExperience };
    });
  };

  const addResponsibility = (expId) => {
    setUserState(prev => {
      const updatedExperience = prev.workExperience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: [...exp.responsibilities, ""] };
        }
        return exp;
      });
      return { ...prev, workExperience: updatedExperience };
    });
  };

  return (
    <div className="experience-tab">
      <h2>Work Experience</h2>
      
      {workExperience.map(exp => (
        <ExperienceCard 
          key={exp.id} 
          experience={exp} 
          editMode={editMode}
          updateExperience={updateExperience}
          updateResponsibility={updateResponsibility}
          addResponsibility={addResponsibility}
        />
      ))}
      
      {editMode && (
        <button 
          className="add-experience-button"
          onClick={addNewExperience}
        >
          <i className="fas fa-plus"></i> Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceTab;