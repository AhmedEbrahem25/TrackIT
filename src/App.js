import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import VerifyCode from './components/Pages/VerifyCode';
import RoadmapPage from './components/Pages/RoadmapPage';
import RoadMap from './components/Pages/RoadMap';
import CoursesPage from './components/Pages/CoursesPage';
import UserProfile from './components/UserProfile/UserProfile';
import HomePage from './components/Pages/HomePage';
import RecommendationsComponent from './components/Pages/RecommendationsPage';
import ProfessionalCoursePage from './components/Pages/ProfessionalCoursePage';
import Checkout from './components/Pages/Checkout';
import CoursePage from './components/Pages/CoursePage';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import NavBar from './components/NavBar'; // Fixed typo from "NevBar" to "NavBar"
import './components/Style/App.css';
import './components/Style/base.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <NavBar />

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
    </Router>
  );
}

export default App;