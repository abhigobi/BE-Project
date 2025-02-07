import { Bell, User, Menu, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [compliances, setCompliances] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch compliance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/student/getAllFiles"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.files)) {
          setCompliances(data.files);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Display only first 4 items initially
  const displayedCompliances = showAll ? compliances : compliances.slice(0, 4);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold">Student Portal</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<FileText />}
            label="Compliances"
            isSidebarOpen={isSidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Navbar */}
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold">I2IT Student Dashboard</h1>
          <User className="w-6 h-6" />
        </nav>

        {/* Compliance PDFs Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recently Uploaded Compliance PDFs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCompliances.map((compliance) => (
              <div
                key={compliance.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <p className="mt-2 text-center font-medium">
                  {compliance.name}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Status: {compliance.status}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Date: {compliance.created_at.slice(0, 10)}
                </p>
                {compliance.url && (
                  <div className="mt-2 text-center">
                    <a
                      href={compliance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View More Button */}
          {compliances.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar Navigation Item Component
const NavItem = ({ icon, label, isSidebarOpen }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all">
    {icon}
    {isSidebarOpen && <span className="text-lg">{label}</span>}
  </div>
);

export default StudentDashboard;
