import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api.js';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const registerHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", formData);
      alert(res.data.message || "Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.log("Error occurred in register:", err);
      alert(err.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register Here
        </h2>

        <form className="space-y-6" onSubmit={registerHandle}>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              required
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already a member?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
