// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ClipboardCheck, AlertTriangle, Menu, X } from "lucide-react";

// const StudentCompliancesWarden = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const students = [
//     {
//       id: 1,
//       name: "John Doe",
//       compliances: [
//         { id: 1, name: "Library Clearance", status: "Approved" },
//         { id: 2, name: "Hostel Fees", status: "Pending" },
//         { id: 3, name: "No Dues Certificate", status: "Rejected" },
//         { id: 4, name: "Sports Equipment Return", status: "Approved" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       compliances: [
//         { id: 1, name: "Library Clearance", status: "Pending" },
//         { id: 2, name: "Hostel Fees", status: "Pending" },
//         { id: 3, name: "No Dues Certificate", status: "Pending" },
//         { id: 4, name: "Sports Equipment Return", status: "Pending" },
//       ],
//     },
//     {
//       id: 3,
//       name: "Alice Johnson",
//       compliances: [
//         { id: 1, name: "Library Clearance", status: "Approved" },
//         { id: 2, name: "Hostel Fees", status: "Approved" },
//         { id: 3, name: "No Dues Certificate", status: "Approved" },
//         { id: 4, name: "Sports Equipment Return", status: "Approved" },
//       ],
//     },
//   ];

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-[#1A2A4F] text-white w-64 p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 z-50 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } md:relative md:translate-x-0`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Warden Dashboard</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="md:hidden text-gray-300 hover:text-white"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <nav className="space-y-4">
//           <Link
//             to="/warden-dashboard"
//             className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
//           >
//             <ClipboardCheck className="w-5 h-5" /> My Compliance
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <nav className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="text-gray-600"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <h1 className="text-lg font-semibold">Student Compliances</h1>
//         </nav>
//         <h1 className="text-2xl font-bold mb-4">Student Compliances</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border-b">Student Name</th>
//                 <th className="py-2 px-4 border-b">Compliance</th>
//                 <th className="py-2 px-4 border-b">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <React.Fragment key={student.id}>
//                   {student.compliances.map((compliance, index) => (
//                     <tr key={compliance.id} className="hover:bg-gray-50">
//                       {index === 0 && (
//                         <td
//                           rowSpan={student.compliances.length}
//                           className="py-2 px-4 border-b text-center font-medium"
//                         >
//                           {student.name}
//                         </td>
//                       )}
//                       <td className="py-2 px-4 border-b">{compliance.name}</td>
//                       <td className="py-2 px-4 border-b">
//                         <span
//                           className={`px-2 py-1 rounded text-sm font-medium ${
//                             compliance.status === "Approved"
//                               ? "bg-green-100 text-green-800"
//                               : compliance.status === "Rejected"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {compliance.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentCompliancesWarden;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, Menu, X } from "lucide-react";

const StudentCompliancesWarden = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const students = [
    {
      id: 1,
      name: "John Doe",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Approved" },
        { id: 2, name: "Hostel Fees", status: "Pending" },
        { id: 3, name: "No Dues Certificate", status: "Rejected" },
        { id: 4, name: "Sports Equipment Return", status: "Approved" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Pending" },
        { id: 2, name: "Hostel Fees", status: "Pending" },
        { id: 3, name: "No Dues Certificate", status: "Pending" },
        { id: 4, name: "Sports Equipment Return", status: "Pending" },
      ],
    },
    {
      id: 3,
      name: "Alice Johnson",
      compliances: [
        { id: 1, name: "Library Clearance", status: "Approved" },
        { id: 2, name: "Hostel Fees", status: "Approved" },
        { id: 3, name: "No Dues Certificate", status: "Approved" },
        { id: 4, name: "Sports Equipment Return", status: "Approved" },
      ],
    },
  ];
  const handleFileChange = async (event) => {
    event.preventDefault(); // Prevent form reload if inside a form
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setSelectedFile(file);

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
  const handleDeletePdf = async (complianceId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this PDF?"
    );
    if (!isConfirmed) return;

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
        setCompliances((prevCompliances) =>
          prevCompliances.map((comp) =>
            comp.id === complianceId ? { ...comp, pdfUrl: "" } : comp
          )
        );
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("File deletion failed. Please try again.");
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-[#1A2A4F] text-white w-64 p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 z-50 shadow-lg md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Warden Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            to="/warden-dashboard"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            <ClipboardCheck className="w-5 h-5" /> My Compliance
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Student Compliances</h1>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Student Compliances</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <div className="mt-6 flex flex-col items-center ">
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
          </div>
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-left">Student Name</th>
                <th className="py-3 px-4 border-b text-left">Compliance</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <React.Fragment key={student.id}>
                  {student.compliances.map((compliance, index) => (
                    <tr key={compliance.id} className="hover:bg-gray-100">
                      {index === 0 && (
                        <td
                          rowSpan={student.compliances.length}
                          className="py-3 px-4 border-b font-medium"
                        >
                          {student.name}
                        </td>
                      )}
                      <td className="py-3 px-4 border-b">{compliance.name}</td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            compliance.status === "Approved"
                              ? "bg-green-200 text-green-800"
                              : compliance.status === "Rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {compliance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentCompliancesWarden;
