import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/Dashboards/StudentDashboard";
import WardenDashboard from "./pages/Dashboards/WardenDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard";
import StudentCompliancesWarden from "./components/StudentCompliancesWarden";
import WardenCompliance from "./components/WardenCompliance";
import TeacherCompliance from "./components/TeacherCompliance";
import StudentCompliancesTeacher from "./components/StudentCompliancesTeacher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} />
        <Route
          path="/warden-dashboard/student-compliances"
          element={<StudentCompliancesWarden />}
        />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route
          path="/teacher-dashboard/student-compliances"
          element={<StudentCompliancesTeacher />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-dashboard/warden-compliances"
          element={<WardenCompliance />}
        />
        <Route
          path="/admin-dashboard/teacher-compliances"
          element={<TeacherCompliance />}
        />
      </Routes>
    </Router>
    // <AdminDashboard />
    // <TeacherCompliance />
    // <WardenCompliance />
  );
};

export default App;
