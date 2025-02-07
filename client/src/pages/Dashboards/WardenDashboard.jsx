import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {
  Bell,
  User,
  ClipboardCheck,
  AlertTriangle,
  FileText,
} from "lucide-react";

const WardenDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [compliances, setCompliances] = useState([
    {
      id: 1,
      name: "Review Hostel Applications",
      status: "Pending",
      pdfUrl: "",
    },
    { id: 2, name: "Approve Leave Requests", status: "Completed", pdfUrl: "" },
    { id: 3, name: "Inspect Hostel Facilities", status: "Pending", pdfUrl: "" },
    { id: 4, name: "Submit Monthly Report", status: "Pending", pdfUrl: "" },
    { id: 5, name: "Conduct Safety Drills", status: "Completed", pdfUrl: "" },
    { id: 6, name: "Verify Student Documents", status: "Pending", pdfUrl: "" },
    { id: 7, name: "Organize Hostel Events", status: "Pending", pdfUrl: "" },
    {
      id: 8,
      name: "Monitor Student Attendance",
      status: "Completed",
      pdfUrl: "",
    },
    { id: 9, name: "Address Complaints", status: "Pending", pdfUrl: "" },
    { id: 10, name: "Renew Contracts", status: "Pending", pdfUrl: "" },
  ]);

  const displayedCompliances = showAll ? compliances : compliances.slice(0, 4);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(
        "http://localhost:3000/api/warden/upload/pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      console.log("File uploaded:", data);

      const pdfUrl = data.url;

      // Updating compliance list with the uploaded file URL
      setCompliances((prevCompliances) =>
        prevCompliances.map((comp) =>
          comp.id === selectedFile.id ? { ...comp, pdfUrl: pdfUrl } : comp
        )
      );

      alert("File uploaded successfully!");
      setSelectedFile(null); // Reset the selected file after upload
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handleDeletePdf = async (complianceId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/warden/delete/pdf/${complianceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      const data = await response.json();

      if (data.success) {
        // Update the compliance list to remove the PDF URL
        setCompliances((prevCompliances) =>
          prevCompliances.map((comp) =>
            comp.id === complianceId ? { ...comp, pdfUrl: "" } : comp
          )
        );
        alert(data.message); // Alert the user about successful deletion
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("File deletion failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 md:relative z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-semibold">Warden Dashboard</h2>
        <nav className="space-y-4">
        {/* My Compliance Link */}
        <Link
          to="/warden-dashboard/"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <ClipboardCheck className="w-5 h-5" /> My Compliance
        </Link>

        {/* Students Compliances Link */}
        <Link
          to="/warden-dashboard/student-compliances"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <AlertTriangle className="w-5 h-5" /> Students Compliances
        </Link>

        {/* Add more links here as needed */}
      </nav>
      </aside>
      <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Warden Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </nav>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">My Compliances</h2>
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
                <div className="mt-2 text-center">
                  <a
                    href={compliance.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
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
          {/* <div className="flex items-center justify-center w-full mt-6">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF Files Only
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label> */}
          {/* {selectedFile && (
  <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
        <p>Selected File: {selectedFile.name}</p>
        <button onClick={() => handleDeletePdf(compliance.id)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors">
            Delete Compliance PDF
        </button>
    </div>
)}
</div> */}

          <div className="mt-6 flex flex-col items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
            >
              Upload Compliance PDF
            </label>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected File: {selectedFile.name}
              </p>
            )}
            <button
              onClick={() => handleDeletePdf(compliance.id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Compliance PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
