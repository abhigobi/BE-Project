import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/Dashboards/StudentDashboard";
import WardenDashboard from "./pages/Dashboards/WardenDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/student-dashboard" element={<StudentDashboard />} />
    //     <Route path="/warden-dashboard" element={<WardenDashboard />} />
    //     <Route path="/admin-dashboard" element={<AdminDashboard />} />
    //   </Routes>
    // </Router>
    <AdminDashboard />
  );
};

export default App;
