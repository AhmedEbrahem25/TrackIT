import React, { useState } from 'react';
import './../Style/RoadmapPage.css';

const RoadmapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  

  const roadmapCategories = [
    {
      id: 1,
      title: "Design and Development",
      courses: [
        { id: 101, title: "UI/UX Fundamentals", level: "Beginner" },
        { id: 102, title: "Frontend Development", level: "Intermediate" },
        { id: 103, title: "Backend Architecture", level: "Advanced" },
        { id: 104, title: "Responsive Web Design", level: "Beginner" },
        { id: 105, title: "JavaScript Frameworks", level: "Intermediate" },
        { id: 106, title: "API Development", level: "Advanced" },
        { id: 107, title: "Mobile App Development", level: "Intermediate" },
        { id: 108, title: "Database Design", level: "Intermediate" },
        { id: 109, title: "DevOps Basics", level: "Advanced" }
      ]
    },
    {
      id: 2,
      title: "Data Science and Analytics",
      courses: [
        { id: 201, title: "Python for Data Science", level: "Beginner" },
        { id: 202, title: "Data Visualization", level: "Intermediate" },
        { id: 203, title: "Machine Learning Basics", level: "Intermediate" },
        { id: 204, title: "Statistical Analysis", level: "Intermediate" },
        { id: 205, title: "Big Data Processing", level: "Advanced" },
        { id: 206, title: "Deep Learning", level: "Advanced" },
        { id: 207, title: "Natural Language Processing", level: "Advanced" },
        { id: 208, title: "Data Ethics", level: "Beginner" },
        { id: 209, title: "Predictive Analytics", level: "Intermediate" }
      ]
    }
  ];
     const filterCourses = (courses) => {
      return courses.filter(course => {
       const matchesFilter = filter === 'All' || course.level === filter;
       const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
       return matchesFilter && matchesSearch;
    });
  };
  return (
    <div className="roadmap-container">
      <div className="roadmap-wrapper">
      
        
        {/* Main Content */}
        <main className="roadmap-main">
         

          {/* Filter Bar */}
          
          {/* Roadmap Categories */}
          {roadmapCategories.map((category) => (
            <div key={category.id} className="category-section">
              <div className="category-header">
                <h3>{category.title}</h3>
              </div>
              
              <div className="courses-grid">
                {filterCourses(category.courses).map((course) => (
                  <div 
                    key={course.id} 
                    className="course-card"
                  >
                    <span className="course-title">{course.title}</span>
                    <span className={`course-level ${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
        
        {/* Footer */}
        <footer className="roadmap-footer">
          <p>© 2025 TrackIT E-Learning Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default RoadmapPage;