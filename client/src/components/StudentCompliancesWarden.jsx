import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, AlertTriangle, Menu, X } from "lucide-react";

const StudentCompliancesWarden = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const students = [
    {
      id: 1,
      name: "John Doe",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Approved" },
        { id: 2, name: "Hostel Fees", status: "Pending" },
        { id: 3, name: "No Dues Certificate", status: "Rejected" },
        { id: 4, name: "Sports Equipment Return", status: "Approved" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Pending" },
        { id: 2, name: "Hostel Fees", status: "Pending" },
        { id: 3, name: "No Dues Certificate", status: "Pending" },
        { id: 4, name: "Sports Equipment Return", status: "Pending" },
      ],
    },
    {
      id: 3,
      name: "Alice Johnson",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Approved" },
        { id: 2, name: "Hostel Fees", status: "Approved" },
        { id: 3, name: "No Dues Certificate", status: "Approved" },
        { id: 4, name: "Sports Equipment Return", status: "Approved" },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Warden Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            to="/warden-dashboard"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <ClipboardCheck className="w-5 h-5" /> My Compliance
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Student Compliances</h1>
        </nav>
        <h1 className="text-2xl font-bold mb-4">Student Compliances</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Student Name</th>
                <th className="py-2 px-4 border-b">Compliance</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <React.Fragment key={student.id}>
                  {student.compliances.map((compliance, index) => (
                    <tr key={compliance.id} className="hover:bg-gray-50">
                      {index === 0 && (
                        <td
                          rowSpan={student.compliances.length}
                          className="py-2 px-4 border-b text-center font-medium"
                        >
                          {student.name}
                        </td>
                      )}
                      <td className="py-2 px-4 border-b">{compliance.name}</td>
                      <td className="py-2 px-4 border-b">
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

export default StudentCompliancesWarden;
