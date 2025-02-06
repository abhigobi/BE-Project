import {
  Bell,
  User,
  Menu,
  Home,
  FileText,
  CreditCard,
  BookOpen,
  ClipboardList,
  CalendarDays,
  ClipboardCheck,
} from "lucide-react";
import { useState } from "react";
// import i2it_logo from "../assets/images/i2it logo.png";
// import i2it_logo from "../";
// import

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4">
          <h1
            className={`${
              isSidebarOpen ? "text-xl font-bold" : "hidden"
            } transition-all`}
          >
            Student Portal
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-3 px-3">
          {/* <NavItem icon={<Home />} label="Dashboard" isSidebarOpen={isSidebarOpen} /> */}
          <NavItem
            icon={<ClipboardList />}
            label="Profile"
            isSidebarOpen={isSidebarOpen}
          />
          {/* <NavItem icon={<FileText />} label="Certificates" isSidebarOpen={isSidebarOpen} />
            <NavItem icon={<BookOpen />} label="LMS" isSidebarOpen={isSidebarOpen} />
            <NavItem icon={<CreditCard />} label="Fees" isSidebarOpen={isSidebarOpen} />
            <NavItem icon={<ClipboardCheck />} label="Assignments" isSidebarOpen={isSidebarOpen} />
            <NavItem icon={<CalendarDays />} label="Attendance" isSidebarOpen={isSidebarOpen} /> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header Navbar */}
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          {/* <a
              href="https://www.isquareit.edu.in/"
              className="flex items-center text-2xl font-semibold text-black"
            >
              <img className="w-8 h-8" src={i2it_logo} alt="i2it Logo" />
            </a> */}
          <h1 className="text-xl font-semibold">I2IT Student Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                2
              </span>
            </div>
            <User className="w-6 h-6" />
          </div>
        </nav>

        {/* Content Section */}
        <div className="p-6">
          {/* Thought of the Day */}
          {/* <div className="bg-blue-500 text-white text-lg font-bold p-3 rounded-md shadow-md mb-4">
              "Success is not final, failure is not fatal: It is the courage to continue that counts."
            </div> */}

          {/* Quick Links */}
          {/* <div className="flex gap-4 p-6">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md">
                Upcoming Exams
              </button>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md">
                View Attendance
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md">
                Pending Assignments
              </button>
            </div> */}

          {/* Assignment & Attendance Overview */}
          {/* <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Upcoming Deadlines</h2>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Maths Assignment - Due Feb 10</li>
                  <li>Project Submission - Due Feb 15</li>
                  <li>Final Exam Registration - Feb 20</li>
                </ul>
              </div>
  
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Attendance Overview</h2>
                <p className="text-gray-700">Total Attendance: <span className="font-bold">85%</span></p>
                <p className="text-gray-700">Minimum Required: <span className="font-bold">75%</span></p>
                <p className="text-green-600 font-bold">You are eligible for exams!</p>
              </div>
            </div> */}

          {/* Recent PDFs */}
          <h2 className="text-lg font-semibold mt-6 mb-4">
            Recently Uploaded Study Materials
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-300 p-4 rounded-lg text-center shadow-md"
              >
                <div className="h-40 bg-gray-400 flex items-center justify-center">
                  PDF PREVIEW
                </div>
                <p className="mt-2">Course: Subject {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Navigation Item Component
function NavItem({ icon, label, isSidebarOpen }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all">
      {icon}
      {isSidebarOpen && <span className="text-lg">{label}</span>}
    </div>
  );
}

export default StudentDashboard;
