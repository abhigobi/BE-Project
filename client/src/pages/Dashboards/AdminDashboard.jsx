// import { useState } from "react";
// import {
//   Bell,
//   Users,
//   ClipboardCheck,
//   AlertTriangle,
//   Upload,
//   X,
// } from "lucide-react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("students");
//   const [isUploading, setIsUploading] = useState(false);

//   const categories = [
//     { value: "students", label: "Students" },
//     { value: "teachers", label: "Teachers" },
//     { value: "wardens", label: "Wardens" },
//   ];

//   // Handle file selection
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select an Excel file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     // Set API endpoint based on selected category
//     let apiEndpoint = "";
//     if (selectedCategory === "students") {
//       apiEndpoint = "http://localhost:3000/api/admin/upload/studentExcelFile";
//     } else if (selectedCategory === "teachers") {
//       apiEndpoint = "http://localhost:3000/api/admin/upload/teacherExcelFile";
//     } else if (selectedCategory === "wardens") {
//       apiEndpoint = "http://localhost:3000/api/admin/upload/wardenExcelFile";
//     }

//     try {
//       setIsUploading(true);
//       const response = await axios.post(apiEndpoint, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // alert(response.data.message || "File uploaded successfully!");
//       toast.success("✅ File uploaded successfully!", {
//         position: "top-right",
//         autoClose: 3000, // 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       setUploadModalOpen(false);
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       // alert("Failed to upload file.");
//       toast.error("❌ File upload failed. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 fixed md:relative z-20 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0`}
//       >
//         <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//         <nav className="space-y-4">
//           {/* Teacher Compliance Link */}
//           <Link
//             to="/admin-dashboard/teacher-compliance"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <ClipboardCheck className="w-5 h-5" /> Teachers Compliances
//           </Link>

//           {/* Wardern Compliance Link */}
//           <Link
//             to="/admin-dashboard/warden-compliances"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <ClipboardCheck className="w-5 h-5" /> Wardens Compliances
//           </Link>
//           {/* Students Compliances Link */}
//           <Link
//             to="/admin-dashboard/student-compliances"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <AlertTriangle className="w-5 h-5" /> Students Compliances
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
//         {/* Navbar */}
//         <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
//           <button
//             className="md:hidden"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </button>
//           <h1 className="text-lg font-semibold">Admin Compliance Overview</h1>
//           <div className="flex items-center gap-4">
//             <Bell className="w-6 h-6 text-gray-600" />
//           </div>
//         </nav>

//         {/* Upload Excel File Button */}
//         <div className="p-6">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
//             onClick={() => setUploadModalOpen(true)}
//           >
//             <Upload className="w-5 h-5 mr-2" /> Upload Excel File
//           </button>
//         </div>

//         {/* Upload Modal */}
//         {uploadModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold">Upload Excel File</h2>
//                 <button onClick={() => setUploadModalOpen(false)}>
//                   <X className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>

//               {/* Category Selection */}
//               <label className="block mt-4 font-medium">Select Category:</label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded mt-2"
//               >
//                 {categories.map((category) => (
//                   <option key={category.value} value={category.value}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>

//               {/* File Input */}
//               <label className="block mt-4 font-medium">
//                 Select Excel File:
//               </label>
//               <input
//                 type="file"
//                 accept=".xlsx, .xls"
//                 onChange={handleFileChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-2"
//               />

//               {/* Upload Button */}
//               <button
//                 onClick={handleUpload}
//                 className={`w-full mt-4 px-4 py-2 rounded text-white ${
//                   isUploading
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//                 disabled={isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState } from "react";
// import { Link } from "react-router-dom";
import {
  Bell,
  Users,
  ClipboardCheck,
  AlertTriangle,
  Upload,
  X,
  Menu,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("students");
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { value: "students", label: "Students" },
    { value: "teachers", label: "Teachers" },
    { value: "wardens", label: "Wardens" },
  ];

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
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

    // Set API endpoint based on selected category
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
      const response = await axios.post(apiEndpoint, formData, {
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
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* <nav className="flex flex-col gap-3 px-3">
          <NavItem
            icon={<ClipboardCheck className="w-5 h-5" />}
            label="Teachers Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/teacher-compliance"
          />
          <NavItem
            icon={<ClipboardCheck className="w-5 h-5" />}
            label="Wardens Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/warden-compliances"
          />
          <NavItem
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Students Compliances"
            isSidebarOpen={isSidebarOpen}
            to="/admin-dashboard/student-compliances"
          />
        </nav> */}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Navbar */}
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gray-600" />
            <Bell className="w-6 h-6 text-gray-600" />
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </nav>

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
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Category Selection */}
              <label className="block mt-4 font-medium">Select Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* File Input */}
              <label className="block mt-4 font-medium">
                Select Excel File:
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                className={`w-full mt-4 px-4 py-2 rounded text-white ${
                  isUploading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
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

// Sidebar Navigation Item Component
const NavItem = ({ icon, label, isSidebarOpen, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all"
  >
    {icon}
    {isSidebarOpen && <span className="text-lg">{label}</span>}
  </Link>
);

export default AdminDashboard;
