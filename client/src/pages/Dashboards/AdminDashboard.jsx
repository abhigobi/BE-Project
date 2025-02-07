
import { useState, useEffect } from "react";
import {
  Bell,
  Users,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Send,
  Settings,
  Upload,
  X,
} from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Dummy department list
  const departments = [
    { id: "dept1", name: "Hostel Management" },
    { id: "dept2", name: "Academic Compliance" },
    { id: "dept3", name: "Financial Compliance" },
  ];

  useEffect(() => {
    // Assume socket connection for notifications
  }, []);

  const sendMessage = () => {
    if (department && message) {
      const notification = {
        department,
        message,
        timestamp: new Date().toLocaleString(),
      };
      // Assume socket.emit() function for real-time notification
      setMessage("");
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/upload/studentExcelFile", 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("File uploaded successfully!");
      setUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 fixed md:relative z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <Users className="w-5 h-5" /> User Management
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <ClipboardCheck className="w-5 h-5" /> Compliance Reports
          </a>
          {/* <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <AlertTriangle className="w-5 h-5" /> Pending Cases
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FileText className="w-5 h-5" /> Documents
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <Settings className="w-5 h-5" /> Settings
          </a> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="text-lg font-semibold">Admin Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
        </nav>

        {/* Message Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold">Send Notification</h2>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <select
              className="p-2 border rounded w-full md:w-1/3"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="p-2 border rounded flex-grow"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center" onClick={sendMessage}>
              <Send className="w-5 h-5 mr-2" /> Send
            </button>
          </div>
        </div>

        {/* Upload Excel File Button */}
        <div className="p-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="w-5 h-5 mr-2" /> Upload Excel File
          </button>
        </div>

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Upload Excel File</h2>
                <button onClick={() => setUploadModalOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="mt-4 w-full p-2 border rounded"
                onChange={handleFileChange}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
