import React from 'react';
import Forms from '../../Forms'; // Importing the Forms component for file upload functionality

// ResumeTab component to display and manage the resume section
const ResumeTab = ({ userData, selectedFileName, handleFileChange }) => {
  return (
    <div className="resume-tab">
      <h2>My Resume</h2>
      
      <div className="resume-container">
        {/* Resume preview section */}
        <div className="resume-preview">
          <i className="fas fa-file-pdf"></i>
          <span>Resume_{userData.personalInfo.name.replace(/\s+/g, '_')}.pdf</span>
          <span className="last-updated">Last updated: {userData.resume.lastUpdated}</span>
        </div>
        
        <div className="resume-actions">
          {/* Using the Forms component for file upload */}
          <Forms />

          {/* Download resume button */}
          <button className="download-button">
            <i className="fas fa-download"></i> Download Resume
          </button>
        </div>
        
        {/* Resume builder section */}
        <ResumeBuilder />
      </div>
    </div>
  );
};

// ResumeBuilder component for customizing the resume
const ResumeBuilder = () => {
  return (
    <div className="resume-builder">
      <h3>Resume Builder</h3>
      <p>Customize your resume with the information from your profile</p>
      
      {/* Options for including sections in the resume */}
      <div className="builder-options">
        <div className="option">
          <input type="checkbox" id="include-experience" defaultChecked />
          <label htmlFor="include-experience">Include Work Experience</label>
        </div>
        <div className="option">
          <input type="checkbox" id="include-education" defaultChecked />
          <label htmlFor="include-education">Include Education</label>
        </div>
        <div className="option">
          <input type="checkbox" id="include-skills" defaultChecked />
          <label htmlFor="include-skills">Include Skills</label>
        </div>
        <div className="option">
          <input type="checkbox" id="include-courses" defaultChecked />
          <label htmlFor="include-courses">Include Enrolled Courses</label>
        </div>
      </div>
      
      {/* Template selection for the resume */}
      <div className="template-selection">
        <h4>Select Template:</h4>
        <div className="templates">
          <div className="template-option active">
            <div className="template-preview template-1"></div>
            <span>Professional</span>
          </div>
          <div className="template-option">
            <div className="template-preview template-2"></div>
            <span>Modern</span>
          </div>
          <div className="template-option">
            <div className="template-preview template-3"></div>
            <span>Creative</span>
          </div>
        </div>
      </div>
      
      {/* Button to generate the resume */}
      <button className="generate-resume-button">
        <i className="fas fa-magic"></i> Generate Resume
      </button>
    </div>
  );
};

export default ResumeTab;