// CoursesPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Style/CoursesPage.css';


const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description:
        "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      level: "beginner",
      category: "web",
      duration: "8 weeks",
      instructor: "Sarah Johnson",
      rating: 4.8,
      enrolled: 1250,
    },
    {
      id: 2,
      title: "Advanced React Development",
      description:
        "Master advanced React concepts including hooks, context API, and Redux.",
      level: "advanced",
      category: "frontend",
      duration: "10 weeks",
      instructor: "Michael Chen",
      rating: 4.9,
      enrolled: 842,
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      description:
        "Build scalable server-side applications with Node.js and Express.",
      level: "intermediate",
      category: "backend",
      duration: "6 weeks",
      instructor: "David Wilson",
      rating: 4.7,
      enrolled: 975,
    },
    {
      id: 4,
      title: "Database Design with SQL",
      description:
        "Learn relational database design principles and advanced SQL queries.",
      level: "intermediate",
      category: "database",
      duration: "5 weeks",
      instructor: "Emily Rodriguez",
      rating: 4.6,
      enrolled: 730,
    },
    {
      id: 5,
      title: "Python for Data Science",
      description:
        "Use Python libraries like Pandas and NumPy for data analysis and visualization.",
      level: "intermediate",
      category: "data",
      duration: "12 weeks",
      instructor: "Alex Thompson",
      rating: 4.9,
      enrolled: 1430,
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of user interface and user experience design.",
      level: "beginner",
      category: "design",
      duration: "7 weeks",
      instructor: "Jessica Lee",
      rating: 4.8,
      enrolled: 1050,
    },
    {
      id: 7,
      title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile applications with Flutter framework.",
      level: "intermediate",
      category: "mobile",
      duration: "9 weeks",
      instructor: "Ryan Park",
      rating: 4.7,
      enrolled: 825,
    },
    {
      id: 8,
      title: "Cloud Computing with AWS",
      description: "Deploy and manage applications using Amazon Web Services.",
      level: "advanced",
      category: "cloud",
      duration: "8 weeks",
      instructor: "Lisa Morgan",
      rating: 4.8,
      enrolled: 690,
    },
  ];

  // Filter courses based on search term and active filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || course.level === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="courses-container">
      <main className="courses-main">
        <div className="roadmap-wrapper">
          <section className="category-section">
            <div className="category-header">
              <div className="header-left">
                <h3 id="h3a">Available Courses</h3>
                <div className="filter-buttons">
                  <button
                    className={`filter-button ${
                      activeFilter === "all" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={`filter-button ${
                      activeFilter === "beginner" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("beginner")}
                  >
                    Beginner
                  </button>
                  <button
                    className={`filter-button ${
                      activeFilter === "intermediate" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("intermediate")}
                  >
                    Intermediate
                  </button>
                  <button
                    className={`filter-button ${
                      activeFilter === "advanced" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("advanced")}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              <span className="courses-count">
                {filteredCourses.length} courses
              </span>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="course-card detailed-card">
                    <div className="course-image-container">
                      <div
                        className="course-image"
                        style={{
                          backgroundColor: getRandomColor().backgroundColor,
                          color: getRandomColor().textColor,
                        }}
                      >
                        <span>{course.title.substring(0, 2)}</span>
                      </div>
                      <span className={`course-level ${course.level}`}>
                        {course.level}
                      </span>
                    </div>
                    <h4 className="course-title">{course.title}</h4>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <div className="meta-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                      <div className="meta-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                    <div className="course-footer">
                      <div className="course-rating">
                        <svg
                          className="star-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{course.rating}</span>
                      </div>
                      <div className="course-students">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <span>{course.enrolled} students</span>
                      </div>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="course-button"
                    >
                      View Course
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-courses">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>
                  No courses found matching your criteria. Try adjusting your
                  search or filters.
                </p>
                <button
                  className="reset-button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* Featured Section */}
          <section className="category-section">
            <div className="category-header">
              <h3>Learning Paths</h3>
            </div>
            <div className="learning-paths">
              <div className="learning-path-card">
                <div className="path-icon web-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h4>Web Development</h4>
                <p>Master front-end and back-end technologies</p>
                <div className="path-courses-count">5 courses</div>
                <Link to="/roadmap" className="path-link">
                  View Path
                </Link>
              </div>
              <div className="learning-path-card">
                <div className="path-icon data-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4>Data Science</h4>
                <p>Analyze and visualize data to extract insights</p>
                <div className="path-courses-count">4 courses</div>
                <Link to="/roadmap" className="path-link">
                  View Path
                </Link>
              </div>
              <div className="learning-path-card">
                <div className="path-icon mobile-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4>Mobile Development</h4>
                <p>Build native and cross-platform mobile apps</p>
                <div className="path-courses-count">3 courses</div>
                <Link to="/roadmap" className="path-link">
                  View Path
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="roadmap-footer">
        <div className="roadmap-wrapper">
          <p>&copy; {new Date().getFullYear()} TrackIt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
// Updated color generator with better contrast
const getRandomColor = () => {
  // New optimized color palette
  const colors = [
    '#2C3E50', '#34495E', '#16A085', '#27AE60', 
    '#2980B9', '#8E44AD', '#2C3E50', '#E67E22',
    '#D35400', '#C0392B'
  ];
  
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Enhanced contrast calculation using WCAG formula
  const hex = backgroundColor.replace(/^#/, '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  
  // Set text color with safety threshold
  const textColor = luminance > 0.6 ? '#2C3E50' : '#ECF0F1';

  return { backgroundColor, textColor };
};

export default CoursesPage;
