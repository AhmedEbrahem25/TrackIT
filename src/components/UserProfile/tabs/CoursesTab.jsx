// src/components/UserProfile/tabs/CoursesTab.jsx
import React from 'react';
import CourseCard from '../cards/CourseCard';
import AvailableCourseCard from '../cards/AvailableCourseCard';

const CoursesTab = ({ enrolledCourses, availableCourses, enrollInCourse }) => {
  return (
    <div className="courses-tab">
      <h2>My Courses</h2>
      
      <div className="enrolled-courses">
        {enrolledCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      <h3>Available Courses</h3>
      <div className="available-courses">
        {availableCourses.map(course => (
          <AvailableCourseCard 
            key={course.id} 
            course={course} 
            enrollInCourse={enrollInCourse} 
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesTab;