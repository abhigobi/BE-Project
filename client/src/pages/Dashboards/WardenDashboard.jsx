import { Bell, User, ClipboardCheck, AlertTriangle, FileText } from "lucide-react";
import { useState } from "react";

const  WardenDashboard=() =>{
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    return (
        <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 p-4 space-y-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 fixed md:relative`}>
        <h2 className="text-xl font-semibold">Warden Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <ClipboardCheck className="w-5 h-5" /> Compliance Reports
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <AlertTriangle className="w-5 h-5" /> Pending Issues
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FileText className="w-5 h-5" /> Documents
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="text-lg font-semibold">Warden Compliance Overview</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </nav>

        {/* Dashboard Overview */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Total Compliance</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Pending Issues</h2>
            <p className="text-2xl font-bold text-red-500">15</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Documents Reviewed</h2>
            <p className="text-2xl font-bold">85</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardenDashboard;