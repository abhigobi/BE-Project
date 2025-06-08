import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/AuthContext";
import { Menu, UploadCloud ,LogOut} from "lucide-react";
import { motion } from "framer-motion";
import WardenDashboardSidebar from "./Sidebars/WardenDashboardSidebar";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router-dom";

const StudentComplianceUploadWarden = () => {
    const { logout } = useAuth();
  const navigate = useNavigate();
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUpload, setSelectedFileUpload] = useState(null);
  const [selectedComplianceId, setSelectedComplianceId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { userID, userName } = useAuth();
  const [wardenName, setWardenName] = useState("");
  const [wardenID, setWardenID] = useState(null);
  const [submissionMode, setSubmissionMode] = useState("Offline"); // default value

  useEffect(() => {
    fetchFiles();
    setWardenName(userName);
    setWardenID(userID);
  }, [uploadedFiles]);

  const handleFileChange = async (event) => {
    event.preventDefault(); // Prevent form reload if inside a form
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await fetch(
        // "http://localhost:3000/api/warden/upload/pdf",
        `${serverUrl}/api/warden/upload/pdf`,
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
      toast.error("File upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
const userName1 = useAuth().userName;
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        // "http://localhost:3000/api/student/getAllFiles"
        `${serverUrl}/api/student/getAllFiles`
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
    setSelectedFileUpload(file);
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

      setIsLoadingDelete(true);
      const response = await fetch(
        `${serverUrl}/api/warden/delete/pdf/${selectedComplianceId}`,
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
      setIsLoadingDelete(false);
    }
  };
 
  const handleSendCompliance = async () => {
    if (!selectedComplianceId || !dueDate || !submissionMode) {
      toast.error("Please select a file, due date, and submission mode", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoadingUpload(true);
    try {
      const [year, month, day] = dueDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;
      const response = await fetch(
        `${serverUrl}/api/warden/create-compliance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            complianceId: selectedComplianceId,
            due_date: formattedDate,
            wardenId: wardenID,
            wardenName: wardenName,
            submissionMode: submissionMode,
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

      // Reset states
      setSelectedComplianceId(null);
      setDueDate("");
      setSubmissionMode("Online");
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
      setIsLoadingUpload(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowUploadForm(false);
    setDueDate("");
  };

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* Warden Sidebar Component */}
      <WardenDashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        <h1 className="text-2xl font-bold mb-4">Upload Student Compliance</h1>
         <button
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 active:scale-95 transition-all duration-200"
            onClick={() => {
              logout() // Clear authentication tokens or session data
              navigate("/login-page"); // Redirect to login page
            }}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </nav>
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
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border w-auto border-gray-200 cursor-pointer transform hover:scale-105 hover:shadow-lg transition-transform  duration-300 ease-in-out"
                  onClick={() => handleFileClick(file)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline font-medium break-words"
                      style={{ maxWidth: "100%" }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h2
                  className="text-2xl font-bold text-gray-800 break-words truncate max-w-full"
                  style={{
                    maxWidth: "80%", // Ensures the file name doesn't take too much width
                    whiteSpace: "nowrap", // Prevents wrapping
                    overflow: "hidden", // Hides overflowing text
                    textOverflow: "ellipsis", // Adds ellipsis for long names
                  }}
                >
                  {selectedFileUpload?.name}
                </h2>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

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
                    disabled={isLoadingDelete}
                  >
                    {isLoadingDelete ? "Deleting..." : "Delete Compliance"}
                  </button>
                  <button
                    onClick={() => setShowUploadForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={isLoadingUpload}
                  >
                    Upload Compliance
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Due Date Picker */}
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

                  {/* Submission Mode Selection */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Submission Mode:
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Online"
                          checked={submissionMode === "Online"}
                          onChange={(e) => setSubmissionMode(e.target.value)}
                          className="form-radio text-blue-600"
                        />
                        <span>Online</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Offline"
                          checked={submissionMode === "Offline"}
                          onChange={(e) => setSubmissionMode(e.target.value)}
                          className="form-radio text-blue-600"
                        />
                        <span>Offline</span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                      disabled={isLoadingUpload}
                    >
                      {isLoadingUpload ? "Sending..." : "Send Compliance"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentComplianceUploadWarden;
