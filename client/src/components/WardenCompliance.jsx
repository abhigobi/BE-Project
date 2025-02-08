import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ClipboardCheck, AlertTriangle, Menu, X } from "lucide-react";

const WardenCompliance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 fixed h-full z-20 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Warden Dashboard</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          {/* <Link to="/admin-dashboard/" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <ClipboardCheck className="w-5 h-5" /> My Compliance
          </Link>
          <Link to="/admin-dashboard/warden-compliances" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <AlertTriangle className="w-5 h-5" /> Warden Compliances
          </Link> */}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 ml-64">
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold mb-4">Warden Compliances</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Warden Name</th>
                <th className="py-2 px-4 border-b">Compliance</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {wardens.map((warden) => (
                <React.Fragment key={warden.id}>
                  {warden.compliances.map((compliance, index) => (
                    <tr key={compliance.id} className="hover:bg-gray-50">
                      {index === 0 && (
                        <td rowSpan={warden.compliances.length} className="py-2 px-4 border-b text-center">
                          {warden.name}
                        </td>
                      )}
                      <td className="py-2 px-4 border-b">{compliance.name}</td>
                      <td className="py-2 px-4 border-b">
                        <span className={`px-2 py-1 rounded text-sm ${
                          compliance.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : compliance.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
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

export default WardenCompliance;
