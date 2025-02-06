import { Mail, Lock } from "lucide-react";
import i2it_logo from "../assets/images/i2it logo.png";
const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white w-3/4 max-w-4xl flex rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <a
              href="https://www.isquareit.edu.in/"
              className="flex items-center mb-6 text-2xl font-semibold text-black"
            >
              <img
                className="flex items-center w-20 h-20 mr-2"
                src={i2it_logo}
                alt="i2it Logo"
              />
            </a>
            {/* <div className="text-blue-600 text-3xl font-bold">I²IT</div>
            <p className="text-gray-700 text-sm">Innovation & Leadership</p> */}
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
        <div className="w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h2 className="text-gray-800 text-xl font-semibold mb-4 text-center">
            Sign In as
          </h2>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="UserName"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute right-3 top-3 text-gray-500" />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute right-3 top-3 text-gray-500" />
          </div>
          {/* <div className="mb-4 flex items-center justify-center bg-white border rounded-lg p-2">
            <input type="checkbox" className="mr-2" /> I'm not a robot
          </div> */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            🔒 Login
          </button>
          {/* <div className="mt-4 text-center">
            <a href="#" className="text-blue-500 text-sm">
              Forgot Password?
            </a>
            <br />
            <a href="#" className="text-red-500 text-sm">
              Book Search & Reserve
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
