import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa";

const StudentListWarden = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/getStudent"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the API response
        setStudents(data.students); // Assuming the API returns { students: [...] }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Log the students state to verify data
  useEffect(() => {
    console.log("Students State:", students);
  }, [students]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#1A2A4F] text-white transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && <h1 className="text-xl font-bold">Student List</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#2C3E6D] rounded transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<FaClipboardCheck className="w-5 h-5" />}
            label="Warden Compliance"
            to="/warden-dashboard"
            isSidebarOpen={sidebarOpen}
          />
         
          {/* <NavItem
            icon={<FaClipboardList className="w-5 h-5" />}
            label="Students Compliances Status"
            to="/warden-dashboard/student-compliances"
            isSidebarOpen={sidebarOpen}
          /> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Student List</h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Student Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 uppercase">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors "
                    >
                      <td className="py-3 px-4 text-gray-700 text-center">
                        {student.id}
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-center">
                        {student.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-center">
                        {student.email}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Sidebar Navigation Item Component
const NavItem = ({ icon, label, to, isSidebarOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 hover:bg-[#2C3E6D] rounded-md transition-colors"
    >
      {icon}
      {isSidebarOpen && <span className="text-lg">{label}</span>}
    </Link>
  );
};

export default StudentListWarden;
