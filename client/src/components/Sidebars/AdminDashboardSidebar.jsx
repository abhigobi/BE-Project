import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  FaChalkboardTeacher,
  FaUserShield,
  FaUserGraduate,
  FaFileUpload,
} from "react-icons/fa";
const AdminDashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-auto" : "w-28"
        } bg-[#1A2A4F] h-auto text-white transition-all duration-300 flex flex-col`}
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
          {/* <NavItem
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
          /> */}
          {/* <NavItem
            icon={<FaUserGraduate className="w-5 h-5" />}
            label={<span className="text-lg">Students Compliances</span>}
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/student-compliance"
          /> */}
        </nav>
      </aside>
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
export default AdminDashboardSidebar;
