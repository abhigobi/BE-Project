import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaChalkboardTeacher,
  FaFileUpload,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";
const WardenCompliance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const wardens = [
    {
      id: 1,
      name: "Mr. Sharma",
      compliances: [
        { id: 1, name: "Hostel Inspection", status: "Approved" },
        { id: 2, name: "Fire Safety Check", status: "Pending" },
        { id: 3, name: "Sanitation Report", status: "Rejected" },
        { id: 4, name: "Electrical Safety", status: "Approved" },
        { id: 5, name: "Security Review", status: "Pending" },
      ],
    },
    {
      id: 2,
      name: "Ms. Verma",
      compliances: [
        { id: 1, name: "Hostel Inspection", status: "Pending" },
        { id: 2, name: "Fire Safety Check", status: "Approved" },
        { id: 3, name: "Sanitation Report", status: "Approved" },
        { id: 4, name: "Electrical Safety", status: "Rejected" },
        { id: 5, name: "Security Review", status: "Approved" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-auto" : "w-28"
        } bg-[#1A2A4F] text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <h1 className="text-2xl font-bold">Admin Portal</h1>}
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

      {/* Content */}
      <div className="flex-1 p-6 overflow-x-auto">
        <button
          className="md:hidden mb-4 bg-[#1A2A4F] text-white p-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Warden Compliances
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                  Warden Name
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                  Compliance
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wardens.map((warden) => (
                <React.Fragment key={warden.id}>
                  {warden.compliances.map((compliance, index) => (
                    <tr
                      key={compliance.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {index === 0 && (
                        <td
                          rowSpan={warden.compliances.length}
                          className="py-3 px-4 text-center text-gray-700"
                        >
                          {warden.name}
                        </td>
                      )}
                      <td className="py-3 px-4 text-gray-600 text-center">
                        {compliance.name}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            compliance.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : compliance.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {compliance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
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
export default WardenCompliance;
