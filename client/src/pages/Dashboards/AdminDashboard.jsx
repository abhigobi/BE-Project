import { useState, useEffect } from "react";
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
  const [selectedRole, setSelectedRole] = useState(""); // for adding single data
  const [selectedRoleList, setSelectedRoleList] = useState(""); // For displaying lists
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [data, setData] = useState([]); // Data fetched from API
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Define categories for upload modal
  const categories = [
    { value: "students", label: "Students" },
    { value: "teachers", label: "Teachers" },
    { value: "wardens", label: "Wardens" },
  ];

  // API endpoints for fetching data
  const getApiEndpoints = {
    student: "http://localhost:3000/api/student/getStudent",
    teacher: "http://localhost:3000/api/admin/get-all-teachers",
    // warden: "http://localhost:3000/api/warden/getWarden",
  };

  // Fetch data based on selected role
  useEffect(() => {
    if (selectedRoleList) {
      fetchData();
    }
  }, [selectedRoleList]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = getApiEndpoints[selectedRoleList];
      if (!endpoint) {
        setLoading(false);
        return;
      }

      const response = await axios.get(endpoint);

      if (selectedRoleList === "student") {
        setData(response.data.students || []); // Extract students array
      } else if (selectedRoleList === "teacher") {
        setData(response.data.teachers || []); // Extract teachers array
      } else if (selectedRoleList === "warden") {
        setData(response.data.wardens || []); // Extract wardens array
      } else {
        setData([]); // Handle unexpected cases
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };
  // API endpoints for different roles
  const apiEndpoints = {
    student: "http://localhost:3000/api/admin/upload/studentExcelFile",
    teacher: "http://localhost:3000/api/admin/upload/teacherExcelFile",
    warden: "http://localhost:3000/api/admin/upload/wardenExcelFile",
  };
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
      const endpoint = apiEndpoints[selectedRole];
      if (!endpoint) {
        toast.error("Invalid role selected!");
        return;
      }

      const response = await axios.post(endpoint, formData);
      if (response.status === 200) {
        toast.success(`${selectedRole} data added successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
        setAddSingleDataOpen(false);
        setSelectedRole("");
        setFormData({ name: "", email: "", password: "" });
        fetchData(); // Refresh the data after adding
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
      toast.warning("Please select an Excel file.", {
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
      fetchData(); // Refresh the data after upload
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

  const handleDownload = async () => {
    // Define role-specific request body parameters
    const roleConfigs = {
      student: {
        tableName: "Student",
        columns: ["id", "name", "email"],
        fileName: "student_contacts.xlsx",
      },
      teacher: {
        tableName: "Teacher",
        columns: ["id", "name", "email"],
        fileName: "teacher_contacts.xlsx",
      },
      warden: {
        tableName: "Warden",
        columns: ["id", "name", "email"],
        fileName: "warden_contacts.xlsx",
      },
    };

    // Get the appropriate config based on the selected role
    const requestBody = roleConfigs[selectedRoleList];

    try {
      const response = await axios.post(
        "http://localhost:3000/api/download/convertTableIntoExcel",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Important: set responseType to blob
        }
      );

      if (response.status === 200) {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", requestBody.fileName);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);

        toast.success(
          `${requestBody.tableName} data downloaded successfully!`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        toast.error("Failed to download Excel file.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </nav>
        <h2 className="text-2xl font-bold ml-6 mt-5 mb-4 text-gray-800">
          Upload Excel File Role Wise And Add Single Data
        </h2>
        <div className="flex justify-center gap-5 items-center mt-6">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded flex items-center hover:bg-green-600 transition-colors"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="w-5 h-5 mr-2" /> Upload Excel File
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded flex items-center hover:bg-blue-600 transition-colors"
            onClick={() => setAddSingleDataOpen(true)}
          >
            <Upload className="w-5 h-5 mr-2" /> Add Single Data
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
        {selectedRole && addSingleData && (
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
        <h2 className="text-2xl font-bold ml-6 mt-5 mb-4 text-gray-800">
          List of Selected Role
        </h2>
        <div className="flex justify-center gap-6 mt-6">
          {[
            {
              role: "student",
              label: "Students",
              icon: FaUserGraduate,
              color: "bg-blue-500",
            },
            {
              role: "teacher",
              label: "Teachers",
              icon: FaChalkboardTeacher,
              color: "bg-yellow-500",
            },
            // {
            //   role: "warden",
            //   label: "Wardens",
            //   icon: FaUserShield,
            //   color: "bg-red-500",
            // },
          ].map(({ role, label, icon: Icon, color }) => (
            <div
              key={role}
              className={`cursor-pointer p-6 rounded-xl shadow-lg flex flex-col items-center 
        transition-all duration-300 w-32 h-32 justify-center gap-3 
        ${
          selectedRoleList === role
            ? `${color} text-white`
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
      `}
              onClick={() => setSelectedRoleList(role)}
            >
              <Icon className="w-8 h-8" />
              <span className="font-semibold">{label}</span>
            </div>
          ))}
        </div>

        {/* Data Table */}
        {selectedRoleList && (
          <div className="p-6 ">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {selectedRoleList.charAt(0).toUpperCase() +
                  selectedRoleList.slice(1)}{" "}
                List
              </h2>
              <button
                onClick={handleDownload}
                className={`bg-gradient-to-r text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 ${
                  selectedRoleList === "student"
                    ? "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-300"
                    : selectedRoleList === "teacher"
                    ? "from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 focus:ring-yellow-300"
                    : "from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 focus:ring-red-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download{" "}
                {selectedRoleList === "student"
                  ? "Students"
                  : selectedRoleList === "teacher"
                  ? "Teachers"
                  : "Wardens"}{" "}
                Data
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-center text-sm font-extrabold text-gray-700 uppercase">
                        S.No.
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-extrabold text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-extrabold text-gray-700 uppercase">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr
                        key={item._id || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-700 text-center">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-center">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-center">
                          {item.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
