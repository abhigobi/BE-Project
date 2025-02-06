/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import i2it_logo from "../assets/images/i2it logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., redirect or store token)
        console.log("Login successful:", data);
        alert("Login successful!");

      } else {
        // Handle login error
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 p-4">
      <div className="bg-white w-full max-w-4xl h-auto md:h-[80%] flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <a
              href="https://www.isquareit.edu.in/"
              className="flex items-center mb-6 text-2xl font-semibold text-black"
            >
              <img
                className="w-16 h-16 md:w-20 md:h-20 mr-2"
                src={i2it_logo}
                alt="i2it Logo"
              />
            </a>
          </div>
          <h2 className="text-lg font-semibold">Welcome To</h2>
          <h1 className="text-blue-600 font-bold text-xl">Hope Foundation's</h1>
          <h2 className="text-gray-800 font-bold text-lg">
            INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY
          </h2>
          <p className="text-gray-700 mt-2">HINJAWADI, PUNE</p>
          <a
            href="https://www.isquareit.edu.in"
            className="text-blue-500 underline mt-2"
          >
            www.isquareit.edu.in
          </a>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h2 className="text-gray-800 text-xl font-semibold mb-4 text-center">
            Sign In as
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <Mail className="absolute right-3 top-3 text-gray-500" />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <Lock className="absolute right-3 top-3 text-gray-500" />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              🔒 Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;