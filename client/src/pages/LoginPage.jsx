// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import for navigation
// import { Mail, Lock } from "lucide-react";
// import i2it_logo from "../assets/images/i2it logo.png";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("✅ Login successfully!", {
//           position: "top-right",
//           autoClose: 3000, // 3 seconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         console.log(data);
//         localStorage.setItem("token", data.token);

//         // Redirect based on role
//         switch (data.table) {
//           case "Student":
//             navigate("/student-dashboard");
//             break;
//           case "Warden":
//             navigate("/warden-dashboard");
//             break;
//           case "Admin":
//             navigate("/admin-dashboard");
//             break;
//           case "Teacher":
//             navigate("/teacher-dashboard");
//             break;
//           default:
//             setError("Invalid role. Contact admin.");
//         }
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       // setError("An error occurred. Please try again.");
//       toast.error("Login Unsuccessfull!! , Please try again", {
//         position: "top-right",
//         autoClose: 3000, // 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-200 p-4">
//       <div className="bg-white w-full max-w-4xl h-auto md:h-[80%] flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center">
//           <div className="mb-6">
//             <a
//               href="https://www.isquareit.edu.in/"
//               className="flex items-center mb-6 text-2xl font-semibold text-black"
//             >
//               <img
//                 className="w-16 h-16 md:w-20 md:h-20 mr-2"
//                 src={i2it_logo}
//                 alt="i2it Logo"
//               />
//             </a>
//           </div>
//           <h2 className="text-lg font-semibold">Welcome To</h2>
//           <h1 className="text-blue-600 font-bold text-xl">Hope Foundation's</h1>
//           <h2 className="text-gray-800 font-bold text-lg">
//             INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY
//           </h2>
//           <p className="text-gray-700 mt-2">HINJAWADI, PUNE</p>
//           <a
//             href="https://www.isquareit.edu.in"
//             className="text-blue-500 underline mt-2"
//           >
//             www.isquareit.edu.in
//           </a>
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
//           <h2 className="text-gray-800 text-xl font-semibold mb-4 text-center">
//             Sign In as
//           </h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4 relative">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <Mail className="absolute right-3 top-3 text-gray-500" />
//             </div>
//             <div className="mb-4 relative">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <Lock className="absolute right-3 top-3 text-gray-500" />
//             </div>

//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//             <button
//               type="submit"
//               className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//             >
//               🔒 Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import { Mail, Lock } from "lucide-react";
import i2it_logo from "../assets/images/i2it logo.png";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // Default role
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast

      // After successful login, redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        admin: "/admin-dashboard",
        teacher: "/teacher-dashboard",
        warden: "/warden-dashboard",
        student: "/student-dashboard",
      };

      navigate(dashboardRoutes[formData.role]);
      toast.success("Login successful! ");
    } catch (error) {
      console.error("Login failed", error);

      // Show failure toast
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={goBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>
        <a
          href="https://www.isquareit.edu.in/"
          className="flex flex-col items-center mb-3 text-2xl font-semibold text-black hover:text-gray-800"
        >
          <img
            className="w-12 h-12 md:w-16 md:h-16 mb-1"
            src={i2it_logo}
            alt="i2it Logo"
          />
        </a>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          I2IT Compliance System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <Mail className="absolute right-3 top-2 text-gray-500" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <Lock className="absolute right-3 top-2 text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Login as
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="warden">Warden</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in <LogIn className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Need help?
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Contact I2IT IT Support
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
