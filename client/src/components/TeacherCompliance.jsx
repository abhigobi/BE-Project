import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ClipboardCheck, AlertTriangle, Menu } from "lucide-react";

const TeacherCompliance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data for teachers and their compliance statuses
  const teachers = [
    {
      id: 1,
      name: "Dr. Robert Brown",
      compliances: [
        { id: 1, name: "Course Completion Report", status: "Approved" },
        { id: 2, name: "Exam Paper Submission", status: "Pending" },
        { id: 3, name: "Research Grant Clearance", status: "Rejected" },
        { id: 4, name: "Conference Attendance", status: "Approved" },
        { id: 5, name: "Library Dues", status: "Pending" },
      ],
    },
    {
      id: 2,
      name: "Prof. Alice Johnson",
      compliances: [
        { id: 1, name: "Course Completion Report", status: "Pending" },
        { id: 2, name: "Exam Paper Submission", status: "Pending" },
        { id: 3, name: "Research Grant Clearance", status: "Pending" },
        { id: 4, name: "Conference Attendance", status: "Approved" },
        { id: 5, name: "Library Dues", status: "Approved" },
      ],
    },
    {
      id: 3,
      name: "Dr. Michael Smith",
      compliances: [
        { id: 1, name: "Course Completion Report", status: "Approved" },
        { id: 2, name: "Exam Paper Submission", status: "Approved" },
        { id: 3, name: "Research Grant Clearance", status: "Approved" },
        { id: 4, name: "Conference Attendance", status: "Approved" },
        { id: 5, name: "Library Dues", status: "Approved" },
      ],
    },
    {
      id: 4,
      name: "Prof. Emily White",
      compliances: [
        { id: 1, name: "Course Completion Report", status: "Rejected" },
        { id: 2, name: "Exam Paper Submission", status: "Pending" },
        { id: 3, name: "Research Grant Clearance", status: "Approved" },
        { id: 4, name: "Conference Attendance", status: "Pending" },
        { id: 5, name: "Library Dues", status: "Rejected" },
      ],
    },
    {
      id: 5,
      name: "Dr. William Davis",
      compliances: [
        { id: 1, name: "Course Completion Report", status: "Approved" },
        { id: 2, name: "Exam Paper Submission", status: "Rejected" },
        { id: 3, name: "Research Grant Clearance", status: "Pending" },
        { id: 4, name: "Conference Attendance", status: "Approved" },
        { id: 5, name: "Library Dues", status: "Pending" },
      ],
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-[#1A2A4F] text-white w-64 p-4 space-y-6 transition-transform duration-300 md:relative z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 fixed inset-y-0 left-0 md:static`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-4">
          {/* <Link
            to="/admin-dashboard/"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <ClipboardCheck className="w-5 h-5" /> My Compliance
          </Link>
          <Link
            to="/admin-dashboard/teacher-compliances"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <AlertTriangle className="w-5 h-5" /> Teacher Compliances
          </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Teacher Compliances</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Teacher Name</th>
                <th className="py-2 px-4 border-b">Compliance</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <React.Fragment key={teacher.id}>
                  {teacher.compliances.map((compliance, index) => (
                    <tr key={compliance.id} className="hover:bg-gray-50">
                      {index === 0 && (
                        <td
                          rowSpan={teacher.compliances.length}
                          className="py-2 px-4 border-b text-center font-semibold"
                        >
                          {teacher.name}
                        </td>
                      )}
                      <td className="py-2 px-4 border-b">{compliance.name}</td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
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

export default TeacherCompliance;