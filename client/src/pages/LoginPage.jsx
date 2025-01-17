import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#6C5CE7] p-4 flex items-center justify-center">
      <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#45aaf2] to-[#2d98da] p-8 text-white flex flex-col">
          <div className="font-bold text-xl mb-12">COMPANY LOGO</div>
          <div className="my-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome to...</h1>
            <p className="text-white/90 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <p className="mt-auto text-white/80">Lorem ipsum dolor sit amet</p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-8 bg-white">
          <div className="max-w-[400px] mx-auto">
            <h2 className="text-3xl font-semibold text-[#45aaf2] mb-2">Login</h2>
            {/* <p className="text-gray-500 mb-8">
              Welcome! Login to get amazing discounts and offers only for you.
            </p> */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mt-5 text-gray-500 mb-1">User Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#45aaf2]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-500 mb-1">User Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#45aaf2]"
                  placeholder="Enter your password"
                />
              </div>
{/* 
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-500 text-sm">Remember me</label>
              </div> */}

              <button
                type="submit"
                className="w-full bg-[#45aaf2] text-white py-2 rounded-md hover:bg-[#2d98da] transition-colors duration-300"
              >
                LOGIN
              </button>

              <div className="flex justify-between text-sm">
                {/* <p className="text-gray-500">
                  New User? <a href="/signup" className="text-[#45aaf2] hover:underline">Signup</a>
                </p> */}
                <a href="/forgot-password" className="text-gray-400 hover:text-gray-500">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

