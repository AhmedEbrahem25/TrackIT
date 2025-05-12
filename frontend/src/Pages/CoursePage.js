import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import courseImage from './../images/course.jpeg'; // Adjust this path to where your image is located
import './../Style/CoursePage.css';

// Reusable Components
const CourseHeader = ({ title, subtitle, instructor, duration, level, students }) => (
  <header className="course-header">
    <div className="header-top">
      <div className="logo-container">
        <span className="logo">TrackIT</span>
        <span className="logo-sub">Learning Platform</span>
      </div>
      <div className="header-actions">
        <button className="header-button">My Courses</button>
        <button className="header-button">Dashboard</button>
      </div>
    </div>
    
    <div className="header-content">
      <h1>{title}</h1>
      <p className="course-subtitle">{subtitle}</p>
      <div className="course-meta">
        <span>Instructor: {instructor}</span>
        <span>{duration}</span>
        <span>{level}</span>
        <span>{students} students</span>
      </div>
    </div>
  </header>
);

CourseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  students: PropTypes.string.isRequired,
};

const VideoPlayer = ({ thumbnail, progress, onPlay }) => {
  const { percentage, completed, total } = progress;
  
  return (
    <div className="video-player">
      <div className="video-wrapper">
        <img 
          src={thumbnail} 
          alt="Sales Funnels 101 course thumbnail" 
          className="video-thumbnail" 
          loading="lazy"
        />
        <div className="video-overlay">
          <button 
            className="play-button"
            onClick={onPlay}
            aria-label="Play video"
          >
            ▶
          </button>
        </div>
      </div>
      
      <div className="progress-container-enhanced">
        <div className="progress-info">
          <span className="progress-percentage">{percentage}% Complete</span>
          <span className="progress-lessons">{completed}/{total} lessons</span>
        </div>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  progress: PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
};

const ResourceCard = ({ icon, title, type, onDownload }) => (
  <div className="resource-card">
    <div className="resource-icon">{icon}</div>
    <div className="resource-info">
      <h4>{title}</h4>
      <p>{type}</p>
      <button 
        className="download-button"
        onClick={onDownload}
        aria-label={`Download ${title}`}
      >
        Download
      </button>
    </div>
  </div>
);

ResourceCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
};

const ModuleAccordion = ({ module, currentVideo, onVideoSelect }) => (
  <div className="module">
    <div className="module-header">
      <h4>{module.title}</h4>
      <span>{module.videos.length} lessons</span>
    </div>
    <ul className="video-list" role="list">
      {module.videos.map(video => (
        <li 
          key={video.id}
          className={`video-item ${video.completed ? 'completed' : ''} ${currentVideo === video.id ? 'active' : ''}`}
          onClick={() => onVideoSelect(video.id)}
          role="listitem"
        >
          <div className="video-icon">
            {video.completed ? '✓' : '▶'}
          </div>
          <div className="video-details">
            <span className="video-title">{video.title}</span>
            <span className="video-duration">{video.duration}</span>
          </div>
          <div className={`video-status ${video.completed ? 'completed' : ''}`} />
        </li>
      ))}
    </ul>
  </div>
);

ModuleAccordion.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  currentVideo: PropTypes.number.isRequired,
  onVideoSelect: PropTypes.func.isRequired,
};

// Main Course Page Component
const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentVideo, setCurrentVideo] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Course data with local image
  const course = {
    title: "Sales Funnels 101",
    subtitle: "Master the art of converting leads into customers",
    instructor: "Alex Johnson",
    duration: "1.5 hours",
    level: "Intermediate",
    students: "2,000+",
    lastUpdated: "June 2024",
    thumbnail: courseImage, // Using the imported image
  };

  const modules = [
    {
      title: "Introduction to Sales Funnels",
      videos: [
        { id: 1, title: "What is a Sales Funnel?", duration: "8:32", completed: true },
        { id: 2, title: "The Psychology Behind Funnels", duration: "12:45", completed: true },
        { id: 3, title: "Case Study: Successful Funnels", duration: "15:20", completed: false },
      ]
    },
    {
      title: "Building Your First Funnel",
      videos: [
        { id: 4, title: "Choosing Your Offer", duration: "10:15", completed: false },
        { id: 5, title: "Lead Capture Strategies", duration: "14:30", completed: false },
      ]
    }
  ];

  // Memoize progress calculation
  const progress = useMemo(() => {
    const totalVideos = modules.reduce((acc, module) => acc + module.videos.length, 0);
    const completedVideos = modules.reduce(
      (acc, module) => acc + module.videos.filter(video => video.completed).length, 
      0
    );
    const percentage = Math.round((completedVideos / totalVideos) * 100);
    
    return {
      percentage,
      completed: completedVideos,
      total: totalVideos
    };
  }, [modules]);

  const handleVideoSelect = (videoId) => {
    setCurrentVideo(videoId);
  };

  const handlePlayVideo = () => {
    console.log(`Playing video ${currentVideo}`);
  };

  const handleDownloadResource = (resourceName) => {
    console.log(`Downloading ${resourceName}`);
  };

  return (
    <div className={`course-container ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <CourseHeader {...course} />

      <div className="course-main">
        <div className="video-container">
          <VideoPlayer 
            thumbnail={course.thumbnail}
            progress={progress}
            onPlay={handlePlayVideo}
          />

          <div className="course-tabs" role="tablist">
            <button 
              role="tab"
              aria-selected={activeTab === 'overview'}
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'content'}
              className={activeTab === 'content' ? 'active' : ''}
              onClick={() => setActiveTab('content')}
            >
              Course Content
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'resources'}
              className={activeTab === 'resources' ? 'active' : ''}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>About This Course</h3>
                <p>This comprehensive course will teach you how to build effective sales funnels that convert leads into paying customers. You'll learn the psychology behind funnel design, practical implementation strategies, and real-world case studies.</p>
                
                <div className="overview-grid">
                  <div className="overview-card">
                    <h4>What You'll Learn</h4>
                    <ul>
                      <li>Fundamentals of sales funnels</li>
                      <li>Lead capture strategies</li>
                      <li>Conversion optimization</li>
                      <li>Email sequence design</li>
                    </ul>
                  </div>
                  
                  <div className="overview-card">
                    <h4>Course Requirements</h4>
                    <ul>
                      <li>Basic marketing knowledge</li>
                      <li>Access to a computer</li>
                      <li>Willingness to learn</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="instructor-section">
                <h3>Instructor</h3>
                <div className="instructor-card">
                  <div className="instructor-avatar">AJ</div>
                  <div className="instructor-info">
                    <h4>{course.instructor}</h4>
                    <p>Sales Funnel Expert | 10+ Years Experience</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div className="resources-section">
                <h3>Course Resources</h3>
                <div className="resources-grid">
                  <ResourceCard
                    icon="📘"
                    title="Sales Funnel Blueprint"
                    type="PDF Document"
                    onDownload={() => handleDownloadResource("Sales Funnel Blueprint")}
                  />
                  
                  <ResourceCard
                    icon="📝"
                    title="Email Templates"
                    type="DOCX File"
                    onDownload={() => handleDownloadResource("Email Templates")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="course-sidebar">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '◄' : '►'}
          </button>
          
          {sidebarOpen && (
            <div className="sidebar-content">
              <h3>Course Content</h3>
              <div className="completion-status">
                <div className="progress-circle">
                  <svg width="60" height="60" viewBox="0 0 36 36" aria-hidden="true">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e9ecef"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ff7b25"
                      strokeWidth="3"
                      strokeDasharray={`${progress.percentage}, 100`}
                    />
                  </svg>
                  <span>{progress.percentage}%</span>
                </div>
                <span className="status-text">{progress.completed} of {progress.total} lessons completed</span>
              </div>
              
              {modules.map((module, index) => (
                <ModuleAccordion
                  key={index}
                  module={module}
                  currentVideo={currentVideo}
                  onVideoSelect={handleVideoSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;