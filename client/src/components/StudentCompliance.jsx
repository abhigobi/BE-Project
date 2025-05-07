import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import {
  FaUserShield,
  FaFileUpload,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
} from "react-icons/fa";
import axios from "axios";

const StudentCompliance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [studentCompliance, setStudentCompliance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllStudentsCompliances = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3000/api/warden/get-all-student-compliances"
          `${serverUrl}/api/warden/get-all-student-compliances`
        );

        if (response.status === 200 && response.data) {
          setStudentCompliance(response.data.students);
        } else {
          throw new Error("Invalid response from the server");
        }
      } catch (error) {
        console.error("Error fetching student compliances:", error);
        setError(
          "Failed to fetch student compliances. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    getAllStudentsCompliances();
  }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting For Approve":
        return " text-blue-500";
      case "Rejected":
        return " text-red-500";
      case "Completed":
        return " text-violet-500";
      default:
        return " text-yellow-500";
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-auto" : "w-28"
        } bg-[#1A2A4F] text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#2C3E6D] rounded transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<FaFileUpload className="w-5 h-5" />}
            label={<span className="text-lg">File Upload</span>}
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard"
          />
          <NavItem
            icon={<FaChalkboardTeacher className="w-5 h-5" />}
            label={<span className="text-lg">Teachers Compliances</span>}
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/teacher-compliance"
          />
          <NavItem
            icon={<FaUserShield className="w-5 h-5" />}
            label={<span className="text-lg">Wardens Compliances</span>}
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/warden-compliance"
          />
          <NavItem
            icon={<FaUserGraduate className="w-5 h-5" />}
            label={<span className="text-lg">Students Compliances</span>}
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/student-compliance"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto">
        <button
          className="md:hidden mb-4 bg-[#1A2A4F] text-white p-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Student Compliances
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-2 border-b text-left">Student ID</th>
                <th className="py-3 px-4 border-b text-left">Student Name</th>

                <th className="py-3 px-4 border-b text-left">Compliance</th>

                <th className="py-3 px-2 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentCompliance.map((student) =>
                student.compliances.map((compliance, index) => (
                  <tr
                    key={compliance.StudentComplianceStatus_ID}
                    className="hover:bg-gray-100"
                  >
                    {index === 0 && (
                      <>
                        <td
                          className="py-3 px-4 border-b"
                          rowSpan={student.compliances.length}
                        >
                          {student.student_id}
                        </td>
                        <td
                          className="py-3 px-4 border-b"
                          rowSpan={student.compliances.length}
                        >
                          {student.student_name}
                        </td>
                      </>
                    )}
                    <td className="py-3 px-4 border-b">
                      <a
                        href={compliance.urlOfCompliance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {compliance.compliance_name}
                      </a>
                    </td>

                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          compliance.status
                        )}`}
                      >
                        {compliance.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const NavItem = ({ icon, label, to, isSidebarOpen }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-gray-800 text-white dark:bg-gray-700 font-medium"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`flex-shrink-0 ${
              isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {icon}
          </span>
          {isSidebarOpen && (
            <span
              className={`${
                isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default StudentCompliance;
