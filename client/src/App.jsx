import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/Dashboards/StudentDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard";
import StudentCompliancesWarden from "./components/StudentCompliancesWarden";
import WardenCompliance from "./components/WardenCompliance";
import TeacherCompliance from "./components/TeacherCompliance";
import StudentCompliancesTeacher from "./components/StudentCompliancesTeacher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentComplianceUploadWarden from "./components/StudentComplianceUploadWarden";
import StudentComplianceUploadTeacher from "./components/StudentComplianceUploadTeacher";
import StudentCompliance from "./components/StudentCompliance";
import StudentListWarden from "./components/StudentListWarden";
import StudentListTeacher from "./components/StudentListTeacher";
import LandingPage from "./pages/LandingPage";
import SummarizeComplianceStudent from "./summaryCompliances/SummarizeComplianceStudent";
import SummarizeComplianceTeacher from "./summaryCompliances/SummarizeComplianceTeacher";
import SummarizeComplianceWarden from "./summaryCompliances/SummarizeComplianceWarden";
import StudentUploadedCompliances from "./components/StudentUploadedCompliances";
import NotFoundPage from "./pages/NotFoundPage";

// Define allowed routes for each role
const allowedRoutes = {
  Student: [
    "/student-dashboard",
    "/student-dashboard/summarize-compliances",
  ],
  Warden: [
    "/warden-dashboard/student-compliances",
    "/warden-dashboard/student-uploaded-compliances",
    "/warden-dashboard/upload-student-compliances",
    "/warden-dashboard/student-list",
    "/warden-dashboard/summarize-compliances",
  ],
  Admin: [
    "/admin-dashboard",
    "/admin-dashboard/warden-compliance",
    "/admin-dashboard/teacher-compliance",
    "/admin-dashboard/student-compliance",
  ],
  Teacher: [
    "/teacher-dashboard",
    "/teacher-dashboard/student-compliances",
    "/teacher-dashboard/upload-student-compliances",
    "/teacher-dashboard/student-list",
    "/teacher-dashboard/summarize-compliances",
  ],
};

// ProtectedRoute component to restrict access based on user role
const ProtectedRoute = ({ element, path }) => {
  const { userRole, isLoading } = useAuth();
  // console.log("User Role:", userRole, "Path:", path, "Is Loading:", isLoading);

  // Wait for loading to complete
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner/component
  }

  // Check if user is authenticated
  const isTokenAvailable = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  if (!userRole && !isTokenAvailable()) {
    // console.log("Redirecting to login-page: No user role");
    return <Navigate to="/login-page" replace />;
  }

  // Check if the path is allowed for the user's role
  if (!userRole && isTokenAvailable()) {
    return element;
  }
  const isAllowed = allowedRoutes[userRole]?.includes(path);
  // console.log("Is Allowed:", isAllowed, "for role:", userRole, "on path:", path);

  if (!isAllowed) {
    // console.log("Redirecting to not-found: Unauthorized access");
    return <Navigate to="/not-found" replace />;
  }

  return element;
};

// Placeholder WardenDashboard component (create this if needed)
const WardenDashboard = () => <div>Warden Dashboard</div>;

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute element={<StudentDashboard />} path="/student-dashboard" />}
        />
        <Route
          path="/student-dashboard/summarize-compliances"
          element={
            <ProtectedRoute
              element={<SummarizeComplianceStudent />}
              path="/student-dashboard/summarize-compliances"
            />
          }
        />
        <Route
          path="/warden-dashboard"
          element={<ProtectedRoute element={<WardenDashboard />} path="/warden-dashboard" />}
        />
        <Route
          path="/warden-dashboard/student-compliances"
          element={
            <ProtectedRoute
              element={<StudentCompliancesWarden />}
              path="/warden-dashboard/student-compliances"
            />
          }
        />
        <Route
          path="/warden-dashboard/student-uploaded-compliances"
          element={
            <ProtectedRoute
              element={<StudentUploadedCompliances />}
              path="/warden-dashboard/student-uploaded-compliances"
            />
          }
        />
        <Route
          path="/warden-dashboard/upload-student-compliances"
          element={
            <ProtectedRoute
              element={<StudentComplianceUploadWarden />}
              path="/warden-dashboard/upload-student-compliances"
            />
          }
        />
        <Route
          path="/warden-dashboard/student-list"
          element={
            <ProtectedRoute
              element={<StudentListWarden />}
              path="/warden-dashboard/student-list"
            />
          }
        />
        <Route
          path="/warden-dashboard/summarize-compliances"
          element={
            <ProtectedRoute
              element={<SummarizeComplianceWarden />}
              path="/warden-dashboard/summarize-compliances"
            />
          }
        />
        <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute element={<TeacherDashboard />} path="/teacher-dashboard" />}
        />
        <Route
          path="/teacher-dashboard/student-compliances"
          element={
            <ProtectedRoute
              element={<StudentCompliancesTeacher />}
              path="/teacher-dashboard/student-compliances"
            />
          }
        />
        <Route
          path="/teacher-dashboard/upload-student-compliances"
          element={
            <ProtectedRoute
              element={<StudentComplianceUploadTeacher />}
              path="/teacher-dashboard/upload-student-compliances"
            />
          }
        />
        <Route
          path="/teacher-dashboard/student-list"
          element={
            <ProtectedRoute
              element={<StudentListTeacher />}
              path="/teacher-dashboard/student-list"
            />
          }
        />
        <Route
          path="/teacher-dashboard/summarize-compliances"
          element={
            <ProtectedRoute
              element={<SummarizeComplianceTeacher />}
              path="/teacher-dashboard/summarize-compliances"
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} path="/admin-dashboard" />}
        />
        <Route
          path="/admin-dashboard/warden-compliance"
          element={
            <ProtectedRoute
              element={<WardenCompliance />}
              path="/admin-dashboard/warden-compliance"
            />
          }
        />
        <Route
          path="/admin-dashboard/teacher-compliance"
          element={
            <ProtectedRoute
              element={<TeacherCompliance />}
              path="/admin-dashboard/teacher-compliance"
            />
          }
        />
        <Route
          path="/admin-dashboard/student-compliance"
          element={
            <ProtectedRoute
              element={<StudentCompliance />}
              path="/admin-dashboard/student-compliance"
            />
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;