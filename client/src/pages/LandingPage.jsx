import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import {
  ShieldCheck,
  FileText,
  Users,
  BarChart2,
  ArrowRight,
  Send,
} from "lucide-react";
// import { Mail, Lock } from "lucide-react";
import i2it_logo from "../assets/images/i2it logo.png";
// import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login-Page"); // Navigate to login page when clicked
  };

  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      title: "Multi-Level Compliance Management",
      description:
        "Admin uploads and tracks compliances for wardens and teachers. Wardens and teachers manage student compliances.",
    },
    {
      icon: <FileText className="w-10 h-10 text-green-500" />,
      title: "Role-Specific Dashboards",
      description:
        "Dedicated dashboards for students, teachers, wardens, and admins to handle their specific compliance responsibilities.",
    },
    {
      icon: <Users className="w-10 h-10 text-purple-500" />,
      title: "Student Compliance Completion",
      description:
        "Students can view assigned compliances and complete them as required by their teachers and wardens.",
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-orange-500" />,
      title: "Hierarchical Tracking System",
      description:
        "Clear hierarchy where admin manages staff compliances while staff manages student compliances.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo and Link */}
          <a
            href="https://www.isquareit.edu.in/"
            className="flex flex-col items-center mb-6 text-2xl font-semibold text-black"
          >
            <img
              className="w-14 h-14 md:w-16 md:h-16 mb-2"
              src={i2it_logo}
              alt="i2it Logo"
            />
          </a>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            I2IT Educational Compliance Management System
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white">
            A streamlined platform for International Institute of Information
            Technology (I2IT) where admins manage staff compliances while
            teachers and wardens track student compliances.
          </p>

          {/* Uncomment below sections for buttons */}
          {/*
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      onClick={handleLoginClick}
      className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
    >
      Login <ArrowRight className="w-5 h-5" />
    </button>
    <button className="bg-transparent border-2 border-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 hover:text-white transition flex items-center justify-center gap-2">
      Contact Support <Send className="w-5 h-5" />
    </button>
  </div>
  */}
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">System Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our compliance system creates an efficient workflow between I2IT
            administrators, staff, and students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Understanding the compliance workflow at I2IT
          </p>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              {
                step: "1",
                title: "Admin Uploads Staff Compliances",
                desc: "I2IT Admin uploads and tracks compliance requirements for teachers and wardens through the admin dashboard.",
              },
              {
                step: "2",
                title: "Staff Manages Student Compliances",
                desc: "I2IT Teachers and wardens upload and track compliance requirements for students under their supervision.",
              },
              {
                step: "3",
                title: "Students Complete Compliances",
                desc: "I2IT Students view their assigned compliances and complete them as required by their teachers and wardens.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Streamline I2IT's Compliance Process
          </h2>
          <p className="text-xl mb-8">
            Access your role-specific dashboard to manage compliances
            efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLoginClick}
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2"
            >
              Login to Dashboard <ArrowRight className="w-5 h-5" />
            </button>
            {/* <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              Learn More
            </button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">I2IT Compliance System</h3>
            <p className="text-gray-400">
              A hierarchical compliance management system for International
              Institute of Information Technology (I2IT).
            </p>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-12 pt-8 border-t border-gray-800">
          <p>
            © {new Date().getFullYear()} I2IT Compliance Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
