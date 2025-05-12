// src/RecommendationsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaBook, 
  FaUserGraduate, 
  FaLightbulb, 
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar
} from 'react-icons/fa';
import './../Style/RecommendationsPage.css';

const RecommendationsPage = () => {
  // Sample recommendation data - replace with actual data from your analysis
  const recommendations = {
    courses: [
      {
        id: 1,
        title: "Advanced Data Science",
        description: "Master advanced machine learning techniques and big data processing.",
        match: 85,
        duration: "40 hours",
        level: "Advanced",
        provider: "Tech University"
      },
      {
        id: 2,
        title: "Cloud Computing Fundamentals",
        description: "Learn the basics of cloud infrastructure and deployment.",
        match: 72,
        duration: "30 hours",
        level: "Intermediate",
        provider: "Cloud Academy"
      }
    ],
    paths: [
      {
        id: 1,
        title: "Full Stack Developer Path",
        description: "Become proficient in both frontend and backend development technologies.",
        match: 90,
        courses: 8,
        duration: "6 months",
        completionRate: "85% of learners complete"
      },
      {
        id: 2,
        title: "Data Engineering Path",
        description: "Build expertise in data pipelines, ETL processes, and data warehousing.",
        match: 78,
        courses: 6,
        duration: "4 months",
        completionRate: "72% of learners complete"
      }
    ],
    skills: [
      {
        id: 1,
        name: "React.js",
        description: "Recommended based on your JavaScript experience",
        importance: "High",
        resources: 12,
        marketDemand: "High"
      },
      {
        id: 2,
        name: "Node.js",
        description: "Complementary to your backend knowledge",
        importance: "Medium",
        resources: 8,
        marketDemand: "High"
      }
    ],
    internships: [
      {
        id: 1,
        title: "Software Development Intern",
        company: "TechCorp",
        location: "San Francisco, CA (Remote possible)",
        duration: "3 months",
        stipend: "$4,000/month",
        match: 88,
        skills: ["JavaScript", "React", "Node.js"],
        deadline: "2023-05-15",
        type: "Summer Internship"
      },
      {
        id: 2,
        title: "Data Science Intern",
        company: "DataSystems Inc.",
        location: "New York, NY",
        duration: "6 months",
        stipend: "$5,000/month",
        match: 76,
        skills: ["Python", "Machine Learning", "SQL"],
        deadline: "2023-06-01",
        type: "Co-op Program"
      }
    ],
    jobs: [
      {
        id: 1,
        title: "Junior Frontend Developer",
        company: "WebSolutions Ltd.",
        location: "Remote",
        salary: "$75,000 - $90,000",
        match: 82,
        skills: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
        posted: "2 days ago",
        experience: "1-2 years",
        applicants: 24
      },
      {
        id: 2,
        title: "Backend Engineer",
        company: "API Masters",
        location: "Austin, TX",
        salary: "$85,000 - $110,000",
        match: 68,
        skills: ["Node.js", "Python", "AWS", "Docker"],
        posted: "1 week ago",
        experience: "2-3 years",
        applicants: 42
      }
    ],
    analysis: {
      progress: 65,
      targetRole: "Full Stack Developer",
      strengths: ["Frontend Development", "Problem Solving", "Team Collaboration"],
      improvementAreas: ["Backend Technologies", "System Design", "Cloud Architecture"],
      marketTrends: [
        {
          skill: "React.js",
          demandGrowth: "32% YoY",
          avgSalary: "$105,000"
        },
        {
          skill: "AWS",
          demandGrowth: "28% YoY",
          avgSalary: "$120,000"
        }
      ]
    }
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1>Your Personalized Career Dashboard</h1>
        <p>
          Based on your profile, skills assessment, and career goals, we've curated these 
          recommendations to accelerate your professional growth.
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Skill Match Score</h3>
          <div className="stat-value">84/100</div>
          <p>To your target roles</p>
        </div>
        <div className="stat-card">
          <h3>Recommended Opportunities</h3>
          <div className="stat-value">12</div>
          <p>Internships & Jobs</p>
        </div>
        <div className="stat-card">
          <h3>Learning Progress</h3>
          <div className="stat-value">{recommendations.analysis.progress}%</div>
          <p>To {recommendations.analysis.targetRole}</p>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaBook className="icon" />
          <h2>Recommended Courses</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.courses.map(course => (
            <div key={course.id} className="recommendation-card">
              <div className="card-header">
                <h3>{course.title}</h3>
                <span className="provider-badge">{course.provider}</span>
              </div>
              <p>{course.description}</p>
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
              <div className="recommendation-meta">
                <span><FaCalendarAlt /> {course.duration}</span>
                <span className={`level-badge ${course.level.toLowerCase()}`}>{course.level}</span>
              </div>
                <Link to={`/courses/${course.id}`} className="action-button">
                <FaArrowRight /> View Course
             </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Opportunities Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaBriefcase className="icon" />
          <h2>Matching Internship Opportunities</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.internships.map(internship => (
            <div key={internship.id} className="recommendation-card internship-card">
              <div className="card-header">
                <h3>{internship.title}</h3>
                <span className="match-badge">{internship.match}% match</span>
              </div>
              <div className="company-info">
                <FaBuilding className="icon-sm" />
                <span>{internship.company}</span>
              </div>
              <div className="location-info">
                <FaMapMarkerAlt className="icon-sm" />
                <span>{internship.location}</span>
              </div>
              <div className="internship-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span>{internship.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stipend:</span>
                  <span>{internship.stipend}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span>{internship.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deadline:</span>
                  <span>{internship.deadline}</span>
                </div>
              </div>
              <div className="skill-tags">
                {internship.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="card-actions">
                <button className="action-button primary">
                  <FaArrowRight /> Apply Now
                </button>
                <button className="action-button secondary">
                  Save for Later
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Opportunities Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaBriefcase className="icon" />
          <h2>Job Opportunities Matching Your Profile</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.jobs.map(job => (
            <div key={job.id} className="recommendation-card job-card">
              <div className="card-header">
                <div>
                  <h3>{job.title}</h3>
                  <div className="company-info">
                    <FaBuilding className="icon-sm" />
                    <span>{job.company}</span>
                  </div>
                </div>
                <span className="match-badge">{job.match}% match</span>
              </div>
              <div className="job-details">
                <div className="detail-item">
                  <FaMapMarkerAlt className="icon-sm" />
                  <span>{job.location}</span>
                </div>
                <div className="detail-item">
                  <FaMoneyBillWave className="icon-sm" />
                  <span>{job.salary}</span>
                </div>
                <div className="detail-item">
                  <span>Posted: {job.posted}</span>
                </div>
                <div className="detail-item">
                  <span>Experience: {job.experience}</span>
                </div>
                <div className="detail-item">
                  <span>{job.applicants} applicants</span>
                </div>
              </div>
              <div className="skill-tags">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="card-actions">
                <button className="action-button primary">
                  <FaArrowRight /> Apply Now
                </button>
                <button className="action-button secondary">
                  Save Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaUserGraduate className="icon" />
          <h2>Recommended Learning Paths</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.paths.map(path => (
            <div key={path.id} className="recommendation-card path-card">
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="skill-match-meter">
                <h4>Path Fit</h4>
                <div className="meter-container">
                  <div 
                    className="meter-fill" 
                    style={{ width: `${path.match}%` }}
                  ></div>
                </div>
                <span className="match-percentage">{path.match}% fit</span>
              </div>
              <div className="recommendation-meta">
                <span><FaBook /> {path.courses} courses</span>
                <span><FaCalendarAlt /> {path.duration}</span>
                <span><FaStar /> {path.completionRate}</span>
              </div>
              <button className="action-button">
                <FaArrowRight /> Explore Path
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Development Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaLightbulb className="icon" />
          <h2>Skills to Develop</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.skills.map(skill => (
            <div key={skill.id} className="recommendation-card skill-card">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span className={`priority-badge ${skill.importance.toLowerCase()}`}>
                  {skill.importance} Priority
                </span>
              </div>
              <p>{skill.description}</p>
              <div className="skill-details">
                <div className="detail-item">
                  <span className="detail-label">Market Demand:</span>
                  <span>{skill.marketDemand}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Learning Resources:</span>
                  <span>{skill.resources} available</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="action-button primary">
                  <FaArrowRight /> Learn {skill.name}
                </button>
                <button className="action-button secondary">
                  View Career Paths
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Summary Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <FaChartLine className="icon" />
          <h2>Your Career Analysis</h2>
        </div>
        <div className="analysis-container">
          <div className="analysis-card">
            <h3>Progress Overview</h3>
            <p>
              Based on your current skills and completed courses, you're {recommendations.analysis.progress}% of the 
              way to becoming a {recommendations.analysis.targetRole}. Focus on backend technologies 
              to improve your profile.
            </p>
            
            <div className="strengths-section">
              <h4>Your Strengths:</h4>
              <div className="tag-group">
                {recommendations.analysis.strengths.map((strength, index) => (
                  <span key={index} className="strength-tag">{strength}</span>
                ))}
              </div>
            </div>
            
            <div className="improvement-section">
              <h4>Areas for Improvement:</h4>
              <div className="tag-group">
                {recommendations.analysis.improvementAreas.map((area, index) => (
                  <span key={index} className="improvement-tag">{area}</span>
                ))}
              </div>
            </div>
            
            <div className="market-trends">
              <h4>Market Trends for Your Skills:</h4>
              <div className="trends-grid">
                {recommendations.analysis.marketTrends.map((trend, index) => (
                  <div key={index} className="trend-item">
                    <h5>{trend.skill}</h5>
                    <p>Demand Growth: {trend.demandGrowth}</p>
                    <p>Avg Salary: {trend.avgSalary}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="action-button">
              <FaArrowRight /> View Detailed Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;