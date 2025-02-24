import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaFileUpload, FaClipboardCheck } from "react-icons/fa";
const StudentCompliancesWarden = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedComplianceId, setSelectedComplianceId] = useState(null);
  const [selectedStudentID, setSelectedStudentID] = useState(null);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [studentCompliance, setStudentCompliance] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllStudentsCompliances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/warden/get-all-student-compliances"
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

  const handleStatusClick = (complianceId, studentId) => {
    setSelectedComplianceId(complianceId);
    setSelectedStudentID(studentId);
    setShowPopup(true);
  };

  const handleStatusChange = async () => {
    if (!status) {
      toast.error("❌ Please select a status.");
      return;
    }

    if (!selectedComplianceId || !selectedStudentID) {
      toast.error("❌ Missing compliance ID or student ID.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/warden/files/update-status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: status,
            studentId: selectedStudentID,
            compliance_id: selectedComplianceId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Error Response:", errorText);
        throw new Error("Failed to update status");
      }

      toast.success("✅ Status updated successfully!");
      setShowPopup(false);
      setStatus(""); // Reset status
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("❌ Failed to update status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting For Approve":
        return "bg-blue-200 text-blue-800";
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Completed":
        return "bg-violet-200 text-violet-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#1A2A4F] text-white  transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Warden Dashboard</h1>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<FaClipboardCheck className="w-5 h-5" />}
            label="My Compliance"
            to="/warden-dashboard"
            isSidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FaFileUpload className="w-5 h-5" />}
            label="Upload Student Compliance"
            to="/warden-dashboard/upload-student-compliances"
            isSidebarOpen={sidebarOpen}
          />
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold mb-6">Student Compliances</h1>
        </nav>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-2 border-b text-center">Student ID</th>
                <th className="py-3 px-4 border-b text-center">Student Name</th>
                <th className="py-3 px-4 border-b text-center">Email</th>
                <th className="py-3 px-4 border-b text-center">Compliance</th>
                <th className="py-3 px-4 border-b text-center">Created</th>
                <th className="py-3 px-4 border-b text-center">Due</th>
                <th className="py-3 px-4 border-b text-center">Complete</th>
                <th className="py-3 px-2 border-b text-center">Status</th>
                <th className="py-3 px-2 border-b text-center">Action</th>
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
                          className="py-3 px-4 border-b text-center"
                          rowSpan={student.compliances.length}
                        >
                          {student.student_id}
                        </td>
                        <td
                          className="py-3 px-4 border-b text-center"
                          rowSpan={student.compliances.length}
                        >
                          {student.student_name}
                        </td>
                        <td
                          className="py-3 px-4 border-b text-center"
                          rowSpan={student.compliances.length}
                        >
                          {student.student_email}
                        </td>
                      </>
                    )}
                    <td className="py-3 px-4 border-b text-center">
                      <a
                        href={compliance.urlOfCompliance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {compliance.compliance_name}
                      </a>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {new Date(compliance.created_at).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {new Date(compliance.due_date).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {compliance.completed_at
                        ? new Date(compliance.completed_at).toLocaleString(
                            "en-IN"
                          )
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          compliance.status
                        )}`}
                      >
                        {compliance.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() =>
                          handleStatusClick(
                            compliance.compliance_id,
                            student.student_id
                          )
                        }
                        className="text-blue-500 hover:underline"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Popup for selecting status */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-transform duration-300 scale-95 hover:scale-100">
              <h2 className="text-xl font-semibold mb-4">
                Change Compliance Status
              </h2>
              <select
                className="border border-gray-300 p-2 rounded-lg w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusChange}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const NavItem = ({ icon, label, to, isSidebarOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all"
    >
      {icon}
      {isSidebarOpen && <span>{label}</span>}
    </Link>
  );
};

export default StudentCompliancesWarden;
