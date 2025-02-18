// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UploadCloud, Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

// const StudentComplianceUploadWarden = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/student/getAllFiles"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch files");
//       }
//       const data = await response.json();
//       setUploadedFiles(data.files);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   const handleFileChange = async (event) => {
//     // event.preventDefault();
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

//       toast.success("✅ File uploaded successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       setSelectedFile(null);
//       fetchFiles(); // Refresh uploaded files list
//     } catch (error) {
//       toast.error("❌ File upload failed. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-[#1A2A4F] text-white w-64 p-5 space-y-6 transition-transform duration-300 fixed md:relative z-20 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0`}
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Warden Dashboard</h2>
//           <button onClick={() => setSidebarOpen(false)} className="md:hidden">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="space-y-4">
//           <Link
//             to="/warden-dashboard"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/warden-dashboard/student-compliances"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             Student Compliances
//           </Link>
//           {/* <Link to="/warden-dashboard/upload" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">Upload Compliance</Link> */}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6 ">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="md:hidden bg-gray-800 text-white p-2 rounded-lg"
//         >
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* Page Title */}
//         <h1 className="text-2xl font-bold mb-4">Upload Student Compliance</h1>

//         {/* Upload Section */}
//         <div className="flex justify-center p-6">
//           <div className="flex flex-col md:flex-row items-center gap-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-upload"
//             />
//             <label
//               htmlFor="file-upload"
//               className="bg-green-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-md flex items-center gap-2"
//             >
//               <UploadCloud className="w-5 h-5" />
//               {isLoading ? "Uploading..." : "Upload Students Compliance PDF"}
//             </label>
//             {selectedFile && (
//               <p className="text-sm text-gray-700 font-medium">
//                 Selected File:{" "}
//                 <span className="text-blue-500">{selectedFile.name}</span>
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Uploaded Files List */}
//         <h2 className="text-xl font-semibold mt-8 mb-4">Uploaded Files</h2>
//         {/* <div className="bg-white shadow-md rounded-lg p-4">
//           {uploadedFiles.length > 0 ? (
//             <ul className="divide-y divide-gray-300">
//               {uploadedFiles.map((file) => (
//                 <li
//                   key={file.id}
//                   className="py-3 flex justify-between items-center"
//                 >
//                   <a
//                     href={file.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:underline"
//                   >
//                     {file.name}
//                   </a>
//                   <p>{file.created_at}</p>
//                   <span
//                     className={`px-3 py-1 rounded-lg text-white ${
//                       file.status === "Pending"
//                         ? "bg-yellow-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {file.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-600">No files uploaded yet.</p>
//           )}
//         </div> */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           {uploadedFiles.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {uploadedFiles.map((file) => (
//                 <div
//                   key={file.id}
//                   className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
//                 >
//                   {/* File Name */}
//                   <div className="flex items-center justify-between mb-3">
//                     <a
//                       href={file.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline font-medium"
//                     >
//                       {file.name}
//                     </a>
//                   </div>

//                   {/* File Metadata */}
//                   <div className="text-sm text-gray-600 mb-3">
//                     <p>
//                       Uploaded on:{" "}
//                       {new Date(file.created_at).toLocaleDateString()}
//                     </p>
//                   </div>

//                   {/* Status Badge */}
//                   <div className="flex justify-between items-center">
//                     {/* <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         file.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {file.status}
//                     </span> */}

//                     {/* Delete Button */}
//                     {/* <button
//                       onClick={() => handleDeleteFile(file.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No files uploaded yet.</p>
//           )}
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default StudentComplianceUploadWarden;

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UploadCloud, Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

// const StudentComplianceUploadWarden = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedComplianceId, setSelectedComplianceId] = useState(null);
//   const [dueDate, setDueDate] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteFile, setDeleteFile] = useState(null);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/student/getAllFiles"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch files");
//       }
//       const data = await response.json();
//       setUploadedFiles(data.files);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   const handleFileClick = (file) => {
//     setSelectedComplianceId(file.id);
//     setSelectedFile(file);
//     setShowPopup(true);
//   };
//   const handleDeleteCompliance = async () => {
//     try {
//       if (!selectedComplianceId) {
//         toast.error("Please select a file to delete", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         return;
//       }

//       setIsLoading(true);
//       const response = await fetch(
//         `http://localhost:3000/api/warden/delete/pdf/${selectedComplianceId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       toast.success("Compliance deleted successfully", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       // Reset state and close popup
//       setSelectedComplianceId(null);
//       setShowPopup(false);

//       // Optionally refresh the compliance list
//       if (onDeleteSuccess) {
//         onDeleteSuccess();
//       }
//     } catch (error) {
//       console.error("Error deleting compliance:", error);
//       toast.error(
//         error.message || "Failed to delete compliance. Please try again.",
//         {
//           position: "top-right",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendCompliance = async () => {
//     if (!selectedComplianceId || !dueDate) {
//       toast.error("❌ Please select a file and due date.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       let parts = dueDate.split("-");
//       let indDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
//       //   console.log(selectedComplianceId, dueDate, indDate);

//       const response = await fetch(
//         "http://localhost:3000/api/warden/create-compliance",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             complianceId: selectedComplianceId,
//             due_date: indDate,
//           }),
//         }
//       );

//       const result = await response.json(); // Parse JSON response
//       console.log("Response from server:", result); // Log it in the console

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to send compliance");
//       }

//       toast.success("✅ Compliance sent successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       setSelectedComplianceId(null);
//       setDueDate("");
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(`❌ Failed to send compliance: ${error.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   //   const FileUploadPopup = ({
//   //     showPopup,
//   //     setShowPopup,
//   //     selectedFile,
//   //     handleDeleteCompliance,
//   //     handleSendCompliance,
//   //     isLoading,
//   //     dueDate,
//   //     setDueDate
//   //   }) => {
//   const [showUploadForm, setShowUploadForm] = useState(false);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setShowUploadForm(false);
//   };
//   return (
//     <div className="flex min-h-screen">
//       <aside
//         className={`bg-[#1A2A4F] text-white w-64 p-5 space-y-6 transition-transform duration-300 fixed md:relative z-20 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0`}
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Warden Dashboard</h2>
//           <button onClick={() => setSidebarOpen(false)} className="md:hidden">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <nav className="space-y-4">
//           <Link
//             to="/warden-dashboard"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/warden-dashboard/student-compliances"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             Student Compliances
//           </Link>
//         </nav>
//       </aside>

//       <div className="flex-1 p-6">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="md:hidden bg-gray-800 text-white p-2 rounded-lg"
//         >
//           <Menu className="w-6 h-6" />
//         </button>

//         <h1 className="text-2xl font-bold mb-4">Upload Student Compliance</h1>

//         <h2 className="text-xl font-semibold mt-8 mb-4">Uploaded Files</h2>
//         <div className="bg-white shadow-md rounded-lg p-4">
//           {uploadedFiles.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {uploadedFiles.map((file) => (
//                 <div
//                   key={file.id}
//                   className={`bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer`}
//                   onClick={() => handleFileClick(file)}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <a
//                       href={file.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline font-medium"
//                     >
//                       {file.name}
//                     </a>
//                   </div>
//                   <div className="text-sm text-gray-600 mb-3">
//                     <p>
//                       Uploaded on:{" "}
//                       {new Date(file.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No files uploaded yet.</p>
//           )}
//         </div>
//       </div>

//       {/* {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Selected File</h2>
//             <p className="mb-4 text-gray-700">{selectedFile?.name}</p>
//             <label className="block text-gray-700 font-medium mb-2">
//               Select Due Date:
//             </label>
//             <input
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               className="border border-gray-300 p-2 rounded-lg w-full"
//             />
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendCompliance}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Sending..." : "Send Compliance"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Selected File</h2>
//             {selectedFile && (
//               <p className="mb-4 text-gray-700">{selectedFile.name}</p>
//             )}

//             {!showUploadForm ? (
//               <div className="flex justify-end gap-4 mb-4">
//                 <button
//                   onClick={handleDeleteCompliance}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Delete Compliance
//                 </button>
//                 <button
//                   onClick={() => setShowUploadForm(true)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Upload Compliance
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Select Due Date:
//                   </label>
//                   <input
//                     type="date"
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                     className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-4">
//                   <button
//                     onClick={handleClosePopup}
//                     className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendCompliance}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Sending..." : "Send Compliance"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default StudentComplianceUploadWarden;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, X, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";

const StudentComplianceUploadWarden = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedComplianceId, setSelectedComplianceId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = async (event) => {
    event.preventDefault(); // Prevent form reload if inside a form
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("pdf", file);
    console.log(formData);

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

      // setCompliances((prevCompliances) =>
      //   prevCompliances.map((comp) =>
      //     comp.id === selectedFile.id ? { ...comp, pdfUrl: pdfUrl } : comp
      //   )
      // );

      toast.success("✅ File uploaded successfully!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("❌ File upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/student/getAllFiles"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setUploadedFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to fetch files", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleFileClick = (file) => {
    setSelectedComplianceId(file.id);
    setSelectedFile(file);
    setShowPopup(true);
    setShowUploadForm(false);
  };

  const handleDeleteCompliance = async () => {
    try {
      if (!selectedComplianceId) {
        toast.error("Please select a file to delete", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/warden/delete/pdf/${selectedComplianceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      toast.success("Compliance deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      setSelectedComplianceId(null);
      setShowPopup(false);
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error deleting compliance:", error);
      toast.error(
        error.message || "Failed to delete compliance. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCompliance = async () => {
    if (!selectedComplianceId || !dueDate) {
      toast.error("Please select a file and due date", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const [year, month, day] = dueDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      const response = await fetch(
        "http://localhost:3000/api/warden/create-compliance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            complianceId: selectedComplianceId,
            due_date: formattedDate,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send compliance");
      }

      toast.success("Compliance sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setSelectedComplianceId(null);
      setDueDate("");
      setShowPopup(false);
      setShowUploadForm(false);
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to send compliance: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowUploadForm(false);
    setDueDate("");
  };

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* Sidebar */}
      <aside
        className={`bg-[#1A2A4F] text-white w-64 p-5 space-y-6 transition-transform duration-300 fixed md:relative z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Warden Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-4">
          <Link
            to="/warden-dashboard"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            My Compliances
          </Link>
          <Link
            to="/warden-dashboard/student-compliances"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            Student Compliances
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden bg-gray-800 text-white p-2 rounded-lg mb-4"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold mb-4">Upload Student Compliance</h1>
        {/* Upload Section */}
        <div className="flex justify-center p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              {isLoading ? "Uploading..." : "Upload Students Compliance PDF"}
            </label>
            {selectedFile && (
              <p className="text-sm text-gray-700 font-medium">
                Selected File:{" "}
                <span className="text-blue-500">{selectedFile.name}</span>
              </p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Uploaded Files</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {uploadedFiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer"
                  onClick={() => handleFileClick(file)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {file.name}
                    </a>
                  </div>
                  <div className="text-sm text-gray-600">
                    Uploaded on:{" "}
                    {new Date(file.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No files uploaded yet.</p>
          )}
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Selected File</h2>
              {selectedFile && (
                <p className="mb-4 text-gray-700">{selectedFile.name}</p>
              )}

              {!showUploadForm ? (
                <div className="flex justify-end gap-4 mb-4">
                  <button
                    onClick={handleClosePopup}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteCompliance}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    disabled={isLoading}
                  >
                    Delete Compliance
                  </button>
                  <button
                    onClick={() => setShowUploadForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                  >
                    Upload Compliance
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Due Date:
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleClosePopup}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendCompliance}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Compliance"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentComplianceUploadWarden;
