import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Upload, Mail, X, Menu } from "lucide-react";
import {
  FaChalkboardTeacher,
  FaUserShield,
  FaUserGraduate,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("students");
  const [isUploading, setIsUploading] = useState(false);
  const [addSingleData, setAddSingleDataOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Student, Teacher, Warden
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // API endpoints for different roles
  const apiEndpoints = {
    student: "http://localhost:3000/api/admin/upload/studentExcelFile",
    teacher: "http://localhost:3000/api/admin/upload/teacherExcelFile",
    warden: "http://localhost:3000/api/admin/upload/wardenExcelFile",
  };

  const categories = [
    { value: "students", label: "Students" },
    { value: "teachers", label: "Teachers" },
    { value: "wardens", label: "Wardens" },
  ];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role first!");
      return;
    }

    try {
      const response = await fetch(apiEndpoints[selectedRole], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`${selectedRole} data added successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
        setAddSingleDataOpen(false);
        setSelectedRole(""); // Reset role selection
        setFormData({ name: "", email: "", password: "" }); // Reset form
      } else {
        toast.error(`Failed to add ${selectedRole} data.`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("⚠️ Please select an Excel file.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    let apiEndpoint = "";
    if (selectedCategory === "students") {
      apiEndpoint = "http://localhost:3000/api/admin/upload/studentExcelFile";
    } else if (selectedCategory === "teachers") {
      apiEndpoint = "http://localhost:3000/api/admin/upload/teacherExcelFile";
    } else if (selectedCategory === "wardens") {
      apiEndpoint = "http://localhost:3000/api/admin/upload/wardenExcelFile";
    }

    try {
      setIsUploading(true);
      await axios.post(apiEndpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ File uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("❌ File upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#1A2A4F] text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <h1 className="text-xl font-bold">Admin Portal</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#2C3E6D] rounded transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<FaChalkboardTeacher className="w-5 h-5" />}
            label="Teachers Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/teacher-compliance"
          />
          <NavItem
            icon={<FaUserShield className="w-5 h-5" />}
            label="Wardens Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/warden-compliance"
          />
          <NavItem
            icon={<FaUserGraduate className="w-5 h-5" />}
            label="Students Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/student-compliance"
          />
        </nav>
      </aside>

      <div className="flex flex-col flex-grow overflow-y-auto">
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </nav>

        <div className="flex justify-center gap-5 items-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded flex items-center hover:bg-blue-600 transition-colors"
            onClick={() => setAddSingleDataOpen(true)}
          >
            <Upload className="w-5 h-5 mr-2" /> Add Single Data
          </button>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded flex items-center hover:bg-green-600 transition-colors"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="w-5 h-5 mr-2" /> Upload Excel File
          </button>
        </div>

        {/* Role Selection Modal */}
        {addSingleData && !selectedRole && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Select Role
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  className="bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setSelectedRole("student")}
                >
                  <User className="w-5 h-5" /> Student
                </button>
                <button
                  className="bg-yellow-500 text-white py-2.5 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setSelectedRole("teacher")}
                >
                  <FaChalkboardTeacher className="w-5 h-5" /> Teacher
                </button>
                <button
                  className="bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setSelectedRole("warden")}
                >
                  <FaUserShield className="w-5 h-5" /> Warden
                </button>
              </div>
              {/* Cancel Button */}
              <button
                className="mt-6 bg-gray-500 text-white py-2.5 px-4 rounded-lg w-full hover:bg-gray-600 transition-colors"
                onClick={() => setAddSingleDataOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Data Entry Form Modal */}
        {selectedRole && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Add{" "}
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}{" "}
                Data
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2.5 rounded-lg w-full hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      setSelectedRole("");
                      setAddSingleDataOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2.5 rounded-lg w-full hover:bg-green-600 transition-colors"
                  >
                    Add Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {uploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Upload Excel File</h2>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <label className="block mt-4 font-medium">Select Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <label className="block mt-4 font-medium">
                Select Excel File:
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleUpload}
                className={`w-full mt-4 px-4 py-2 rounded text-white ${
                  isUploading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } transition-colors`}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isSidebarOpen, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 hover:bg-[#2C3E6D] rounded-md cursor-pointer transition-colors"
  >
    {icon}
    {isSidebarOpen && <span className="text-lg">{label}</span>}
  </Link>
);

export default AdminDashboard;
