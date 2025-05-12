import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Style/ProfessionalCoursePage.css';

const ProfessionalCoursePage = ({ course }) => {
  const [enrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/checkout', { 
      state: { 
        course: {
          title: currentCourse.title,
          price: currentCourse.pricing.amount
        }
      } 
    });
  };

  // Default course data structure
  const defaultCourse = {
    title: "Course Name",
    instructor: {
      name: "instructor",
      credentials: "details",
      bio: "details",
      avatar: "/instructor-avatar.jpg"
    },
    pricing: {
      amount: 0,
      currency: "USD",
      discount: 0, // percentage
      originalPrice: 0,
    },
    stats: {
      totalCoursesInProgram: 0,
      totalEnrolled: 0,
      duration: "0 hours",
      totalLessons: 0,
      downloadableResources: 0,
      certification: true,
      accessPeriod: "Lifetime"
    },
    details: {
      description: "Course Description Course Description Course Description Course Description Course Description Course Description Course Description Course Description",
      level: "level",
      prerequisites: [
        " prerequisites:",
        " prerequisites:",
        "1 prerequisites:"
      ],
      outcomes: [
        "What You'll Achieve",
        "What You'll Achieve",
        "What You'll Achieve",
        "What You'll Achieve"
      ]
    },
    content: {
      modules: [
        {
          title: "title",
          hours: 0,
          lessons: [
            "lessons1",
          ]
        },
        {
          title: "title",
          hours: 0,
          lessons: [
            "lessons1",
            "lessons2",
            "lessons3",
            "lessons4"
          ]
        },
        {
          title: "title",
          hours: 0,
          lessons: [
            "lessons1",
            "lessons2",
            "lessons3",
            "lessons4",
          ]
        },
        {
          title: "title",
          hours: 0,
          lessons: [
            "lessons1",
            "lessons2",
            "lessons3",
            "lessons4"
          ]
        }
      ],
      capstone: {
        title: "title",
        description: "Description:Final project simulating real-world environment"
      }
    },
    features: {
      delivery: [
        "On-demand video lectures",
        "Interactive virtual labs",
        "Live Q&A sessions",
        "Case study analyses"
      ],
      support: [
        "Dedicated course mentor",
        "24/7 community forum",
        "Career coaching sessions",
        "Resume review included"
      ]
    }
  };

  const currentCourse = course || defaultCourse;

  return (
    <div className="professional-course-container">
      {/* Left Side - Course Summary */}
      <div className="course-summary">
        <div className="course-header">
          <h1>{currentCourse.title}</h1>
          <div className="instructor-info">
            <img src={currentCourse.instructor.avatar} alt="Instructor" className="instructor-avatar" />
            <div>
              <h3>{currentCourse.instructor.name}</h3>
              <p className="credentials">{currentCourse.instructor.credentials}</p>
              <p className="instructor-bio">{currentCourse.instructor.bio}</p>
            </div>
          </div>
        </div>

        <div className="pricing-section">
          <div className="price-display">
            <span className="current-price">${currentCourse.pricing.amount}</span>
            {currentCourse.pricing.discount > 0 && (
              <>
                <span className="original-price">${currentCourse.pricing.originalPrice}</span>
                <span className="discount">{currentCourse.pricing.discount}% OFF</span>
              </>
            )}
          </div>
          
          <button 
            className={`enroll-button ${enrolled ? 'enrolled' : ''}`}
            onClick={handleEnroll}
          >
            {enrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </div>

        <div className="course-stats">
          <h3>Course Statistics</h3>
          <div className="stat-item">
            <span className="stat-label">Total Program Courses:</span>
            <span className="stat-value">{currentCourse.stats.totalCoursesInProgram}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Students Enrolled:</span>
            <span className="stat-value">{currentCourse.stats.totalEnrolled.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Duration:</span>
            <span className="stat-value">{currentCourse.stats.duration}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Lessons:</span>
            <span className="stat-value">{currentCourse.stats.totalLessons}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Resources:</span>
            <span className="stat-value">{currentCourse.stats.downloadableResources}+ downloadable</span>
          </div>
          {currentCourse.stats.certification && (
            <div className="certification-badge">
              <i className="fas fa-certificate"></i>
              <span>Includes Professional Certification</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Course Details */}
      <div className="course-details">
        <nav className="course-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Course content
          </button>
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </nav>

        {activeTab === 'overview' && (
          <div className="tab-content">
            <section className="course-description">
              <h2>Course Description</h2>
              <p>{currentCourse.details.description}</p>
              
              <div className="course-level">
                <h3>Level: <span>{currentCourse.details.level}</span></h3>
              </div>
              
              <div className="prerequisites">
                <h3>Prerequisites</h3>
                <ul>
                  {currentCourse.details.prerequisites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="learning-outcomes">
                <h3>What You'll Achieve</h3>
                <ul>
                  {currentCourse.details.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="tab-content">
            <section className="course-content">
              <h2>Course content</h2>
              
              <div className="modules-list">
                {currentCourse.content.modules.map((module, index) => (
                  <div key={index} className="module">
                    <div className="module-header">
                      <h3>{module.title}</h3>
                      <span className="module-hours">{module.hours} hours</span>
                    </div>
                    <ul className="module-lessons">
                      {module.lessons.map((lesson, idx) => (
                        <li key={idx}>
                          <i className="far fa-play-circle"></i>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="capstone-project">
                <h3>Capstone Project</h3>
                <p>{currentCourse.content.capstone.title}</p>
                <p>{currentCourse.content.capstone.description}</p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-content">
            <section className="course-features">
              <h2>Course Features</h2>
              
              <div className="features-section">
                <h3>Learning Delivery</h3>
                <ul>
                  {currentCourse.features.delivery.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="features-section">
                <h3>Student Support</h3>
                <ul>
                  {currentCourse.features.support.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="access-details">
                <h3>Access Details</h3>
                <p>
                  <i className="fas fa-lock-open"></i>
                  <strong>Access Period:</strong> {currentCourse.stats.accessPeriod}
                </p>
                <p>
                  <i className="fas fa-mobile-alt"></i>
                  <strong>Access From:</strong> Any device, anytime
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="tab-content">
            <section className="course-reviews">
              <h2>Student Reviews</h2>
              <div className="rating-overview">
                <div className="average-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">5</span>
                  <span className="rating-count">(0 ratings)</span>
                </div>
                <div className="rating-details">
                  <div className="rating-bar">
                    <span className="stars">★★★★★</span>
                    <progress value="82" max="100"></progress>
                    <span>82%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="stars">★★★★</span>
                    <progress value="14" max="100"></progress>
                    <span>14%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="stars">★★★</span>
                    <progress value="3" max="100"></progress>
                    <span>3%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="stars">★★</span>
                    <progress value="1" max="100"></progress>
                    <span>1%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="stars">★</span>
                    <progress value="0" max="100"></progress>
                    <span>0%</span>
                  </div>
                </div>
              </div>
              
              <div className="review-list">
                <div className="review">
                  <div className="review-header">
                    <img src="/user1.jpg" alt="User" className="reviewer-avatar" />
                    <div>
                      <h4>User</h4>
                      <span className="review-date">review-date</span>
                      <span className="review-rating">★★★★★</span>
                    </div>
                  </div>
                  <p className="review-text">
                    "review-text"
                  </p>
                </div>
                
                <div className="review">
                  <div className="review-header">
                    <img src="/user2.jpg" alt="User" className="reviewer-avatar" />
                    <div>
                      <h4>User</h4>
                      <span className="review-date">review-date</span>
                      <span className="review-rating">★★★★★</span>
                    </div>
                  </div>
                  <p className="review-text">
                    "review-text"
                  </p>
                </div>
              </div>
              
              <button className="see-all-reviews">See All Reviews</button>
            </section>
          </div>
        )}

        <div className="course-actions">
          <button className="action-button preview">
            <i className="fas fa-play"></i> Preview Course
          </button>
          <button className="action-button share">
            <i className="fas fa-share-alt"></i> Share
          </button>
          <button className="action-button wishlist">
            <i className="fas fa-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProfessionalCoursePage;