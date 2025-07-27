import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api.js';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const formHandle = async (e) => {
    e.preventDefault();
    setIsLogin(true);
    try {
      const res = await API.post("/user/login", inputData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userChanged"));
      alert('Login Successful!');
      navigate('/');
    } catch (err) {
      console.error("Error in login page:", err);
      alert(err.response?.data?.message || "Invalid Data");
      setIsLogin(false);
      setInputData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        <form onSubmit={formHandle} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={inputData.email}
              onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
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
              value={inputData.password}
              onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-indigo-600"
            />
            <div className="mt-2 text-right text-sm">
              <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold"
          >
            {isLogin ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
