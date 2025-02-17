// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Bell,
//   User,
//   ClipboardCheck,
//   AlertTriangle,
//   FileText,
// } from "lucide-react";
// import { toast } from "react-toastify";

// const WardenDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showAll, setShowAll] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const [compliances, setCompliances] = useState([
//     {
//       id: 1,
//       name: "Review Hostel Applications",
//       status: "Pending",
//       pdfUrl: "",
//     },
//     { id: 2, name: "Approve Leave Requests", status: "Completed", pdfUrl: "" },
//     { id: 3, name: "Inspect Hostel Facilities", status: "Pending", pdfUrl: "" },
//     { id: 4, name: "Submit Monthly Report", status: "Pending", pdfUrl: "" },
//     { id: 5, name: "Conduct Safety Drills", status: "Completed", pdfUrl: "" },
//     { id: 6, name: "Verify Student Documents", status: "Pending", pdfUrl: "" },
//     { id: 7, name: "Organize Hostel Events", status: "Pending", pdfUrl: "" },
//     {
//       id: 8,
//       name: "Monitor Student Attendance",
//       status: "Completed",
//       pdfUrl: "",
//     },
//     { id: 9, name: "Address Complaints", status: "Pending", pdfUrl: "" },
//     { id: 10, name: "Renew Contracts", status: "Pending", pdfUrl: "" },
//   ]);

//   const displayedCompliances = showAll ? compliances : compliances.slice(0, 4);

//   const filteredCompliances = displayedCompliances.filter((compliance) => {
//     const matchesSearch = compliance.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       statusFilter === "All" || compliance.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });
//   const handleFileChange = async (event) => {
//     event.preventDefault(); // Prevent form reload if inside a form
//     const file = event.target.files[0];
//     if (!file) return;

//     setIsLoading(true);
//     setSelectedFile(file);

//     const formData = new FormData();
//     formData.append("pdf", file);

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/warden/upload/pdf",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }

//       const data = await response.json();
//       console.log("File uploaded:", data);

//       const pdfUrl = data.url;

//       // setCompliances((prevCompliances) =>
//       //   prevCompliances.map((comp) =>
//       //     comp.id === selectedFile.id ? { ...comp, pdfUrl: pdfUrl } : comp
//       //   )
//       // );

//       toast.success("✅ File uploaded successfully!", {
//         position: "top-right",
//         autoClose: 3000, // 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("❌ File upload failed. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleDeletePdf = async (complianceId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this PDF?"
//     );
//     if (!isConfirmed) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/warden/delete/pdf/${complianceId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete file");
//       }

//       const data = await response.json();

//       if (data.success) {
//         setCompliances((prevCompliances) =>
//           prevCompliances.map((comp) =>
//             comp.id === complianceId ? { ...comp, pdfUrl: "" } : comp
//           )
//         );
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("File deletion failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <aside
//         className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 md:relative z-20 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0`}
//       >
//         <h2 className="text-xl font-semibold">Warden Dashboard</h2>
//         <nav className="space-y-4">
//           <Link
//             to="/warden-dashboard/"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <ClipboardCheck className="w-5 h-5" /> My Compliance
//           </Link>
//           <Link
//             to="/warden-dashboard/student-compliances"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <AlertTriangle className="w-5 h-5" /> Students Compliances
//           </Link>
//         </nav>
//       </aside>
//       <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
//         <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
//           <button
//             className="md:hidden p-2"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </button>
//           <h1 className="text-lg font-semibold">Warden Compliance Overview</h1>
//           <div className="flex items-center gap-4">
//             <Bell className="w-6 h-6 text-gray-600" />
//             <User className="w-6 h-6 text-gray-600" />
//           </div>
//         </nav>

//         <div className="p-6">
//           <h2 className="text-lg font-semibold mb-4">My Compliances</h2>
//           <div className="flex gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Search compliances..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredCompliances.map((compliance) => (
//               <div
//                 key={compliance.id}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg">
//                   <FileText className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <p className="mt-2 text-center font-medium">
//                   {compliance.name}
//                 </p>
//                 <p className="text-center text-sm text-gray-600">
//                   Status: {compliance.status}
//                 </p>
//                 {compliance.pdfUrl && (
//                   <div className="mt-2 text-center">
//                     <a
//                       href={compliance.pdfUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       View PDF
//                     </a>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           {compliances.length > 4 && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 {showAll ? "Show Less" : "View More"}
//               </button>
//             </div>
//           )}
//           <div className="mt-6 flex flex-col items-center">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-upload"
//             />
//             <label
//               htmlFor="file-upload"
//               className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
//             >
//               {isLoading ? "Uploading..." : "Upload Compliance PDF"}
//             </label>
//             {selectedFile && (
//               <p className="mt-2 text-sm text-gray-600">
//                 Selected File: {selectedFile.name}
//               </p>
//             )}
//             <button
//               onClick={() => handleDeletePdf(compliance.id)}
//               className="mt-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Delete Compliance PDF
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WardenDashboard;
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Bell,
  User,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Menu,
} from "lucide-react";
import { toast } from "react-toastify";

const WardenDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const filteredCompliances = displayedCompliances.filter((compliance) => {
    const matchesSearch = compliance.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || compliance.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // const handleFileChange = async (event) => {
  //   event.preventDefault(); // Prevent form reload if inside a form
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   setIsLoading(true);
  //   setSelectedFile(file);

  //   const formData = new FormData();
  //   formData.append("pdf", file);

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/warden/upload/pdf",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to upload file");
  //     }

  //     const data = await response.json();
  //     console.log("File uploaded:", data);

  //     const pdfUrl = data.url;

  //     // setCompliances((prevCompliances) =>
  //     //   prevCompliances.map((comp) =>
  //     //     comp.id === selectedFile.id ? { ...comp, pdfUrl: pdfUrl } : comp
  //     //   )
  //     // );

  //     toast.success("✅ File uploaded successfully!", {
  //       position: "top-right",
  //       autoClose: 3000, // 3 seconds
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });

  //     setSelectedFile(null);
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     toast.error("❌ File upload failed. Please try again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const handleDeletePdf = async (complianceId) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this PDF?"
  //   );
  //   if (!isConfirmed) return;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/warden/delete/pdf/${complianceId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete file");
  //     }

  //     const data = await response.json();

  //     if (data.success) {
  //       setCompliances((prevCompliances) =>
  //         prevCompliances.map((comp) =>
  //           comp.id === complianceId ? { ...comp, pdfUrl: "" } : comp
  //         )
  //       );
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     alert("File deletion failed. Please try again.");
  //   }
  // };

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
            icon={<ClipboardCheck />}
            label="My Compliance"
            to="/warden-dashboard/"
            isSidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<AlertTriangle />}
            label="Students Compliances"
            to="/warden-dashboard/student-compliances"
            isSidebarOpen={sidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100 min-h-screen overflow-auto">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Warden Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Mail
              className="w-6 h-6 text-gray-600"
              onClick={() => {
                alert("Mail");
              }}
            />
            <Bell className="w-6 h-6 text-gray-600" />
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </nav>
        <div className="flex flex-wrap gap-10 mt-5 justify-center">
          {/* Total Compliances Card */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white text-2xl flex-1 min-w-[150px] max-w-[350px] text-center hover:shadow-lg transition-shadow">
            <h1 className="text-lg font-semibold">Total Compliances</h1>
            <h2 className="text-2xl font-bold mt-2">{compliances.length}</h2>
          </div>

          {/* Completed Compliances Card */}
          <div className="bg-green-500 p-6 rounded-lg shadow-md text-white flex-1 min-w-[150px] max-w-[350px] text-center hover:shadow-lg transition-shadow">
            <h1 className="text-lg font-semibold">Completed Compliances</h1>
            <h2 className="text-2xl font-bold mt-2">
              {
                compliances.filter(
                  (compliance) => compliance.status === "Completed"
                ).length
              }
            </h2>
          </div>

          {/* Pending Compliances Card */}
          <div className="bg-red-500 p-6 rounded-lg shadow-md text-white flex-1 min-w-[150px] max-w-[350px] text-center hover:shadow-lg transition-shadow">
            <h1 className="text-lg font-semibold">Pending Compliances</h1>
            <h2 className="text-2xl font-bold mt-2">
              {
                compliances.filter(
                  (compliance) => compliance.status === "Pending"
                ).length
              }
            </h2>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">My Compliances</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search compliances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCompliances.map((compliance) => (
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
                {compliance.pdfUrl && (
                  <div className="mt-2 text-center">
                    <a
                      href={compliance.pdfUrl}
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
          {compliances.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className=" text-black  hover:text-purple-600  hover:underline"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
          {/* <div className="mt-6 flex flex-col items-center">
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
              {isLoading ? "Uploading..." : "Upload Compliance PDF"}
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
          </div> */}
        </div>
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

export default WardenDashboard;
