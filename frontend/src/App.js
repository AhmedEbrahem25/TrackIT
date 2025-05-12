import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import VerifyCode from './Pages/VerifyCode';
import RoadmapPage from './Pages/RoadmapPage';
import RoadMap from './Pages/RoadMap';
import CoursesPage from './Pages/CoursesPage';
import UserProfile from './components/UserProfile';

import HomePage from './Pages/HomePage';
import RecommendationsComponent from './Pages/RecommendationsPage';
import ProfessionalCoursePage from './Pages/ProfessionalCoursePage';
import Checkout from './Pages/Checkout';
import CoursePage from './Pages/CoursePage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Chatbot from './components/Chatbot';
import NavBar from './components/NavBar'; // Fixed typo from "NevBar" to "NavBar"
import './Style/App.css';
import './Style/base.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <NavBar />
      <Chatbot />
      {/* Main Content */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<ProfessionalCoursePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/verifycode" element={<VerifyCode />} />
          <Route path="/users/profile" element={<UserProfile />} />
          <Route path="/career/recommendations" element={<RecommendationsComponent />} />
          <Route path="/mindmap" element={<RoadMap />} />
          <Route
            path="/checkout"
            element={<Checkout onPaymentComplete={() => alert('Payment successful!')} />}
          />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;